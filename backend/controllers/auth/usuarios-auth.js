
const { Usuario,  Notificaciones } = require("../../models/model.js")
const { generarJWT, emailRegistro, generarToken  } = require("../../helpers/index");
const cloudinary = require("cloudinary").v2;
const bcryptjs = require('bcryptjs');
const colors = require('colors');
const { emailRecuperarPassword, emailRegistroPrueba } = require("../../helpers/emailRegistro.js");

cloudinary.config({
    cloud_name: "geronicola",
    api_key: "193984666672594",
    api_secret: "9uOiJVywMUJBjllIpWmrxTj77Hg",
    secure: true,
  });
  

const eliminarUsuario = async (req, res) => {
    console.log(colors.bgBlue(req.params.user))
    const deleteUsuario = await Usuario.findOne({ where: { usuario: req.params.user } });

    console.log(colors.bgGreen(deleteUsuario))
    //await deleteUsuario.destroy()

    /*******
        No funciona xq  estoy intentando renderizar en la ruta post de eliminar-usuario y no en la get?
        En registrar un usuario parto de un formulario html que me lleva al post de auth/registrar,
        y es ahi donde tengo el render de la plantilla "ok" y por eso funciona
     *******/

    res.status(200).render("ok", {
        mensaje: "Usuario Eliminado Correctamente!",
  })
}

const crearUsuario = async (req, res = response) => {

    const id = Date.now();
    const { correo, usuario, nombre, password } = req.body;
    console.log(req.body)

        try {
            const token = generarToken()
            const newUsuario = new Usuario ({
                id,
                nombre, 
                correo,
                usuario,
                password,
                rol : "USER",
                estado: true,
                confirmado: false,
                token_confirmar: token,
            })
            
            const salt =  bcryptjs.genSaltSync();
            newUsuario.password =  bcryptjs.hashSync( password, salt );

      
         
        emailRegistro({ correo, nombre, token, usuario })
      
        // Esto deberia depender de si emailRegistro me tira un error o no
        await newUsuario.save() 
          
            res.status(200).render("ok", {
                mensaje: "Usuario Registrado correctamente!",
                usuario: newUsuario,
          })
            
        } catch (error) {
            console.log(colors.bgRed(error))
            res.status(500)
    }
}

const validateToken = (req, res) => {
    console.log("se paso la validacion")
    console.log(colors.bgBlue(req.body.token))
    res.status(200).header("auth-token", req.body.token).json({
        token: req.body.token,
      }) 
      
}


const loginUsuario = async (req, res) => {
    const { correo, password } = req.body;
    const usuario = req.middleware
    try {

    const validPassword = bcryptjs.compareSync( password, usuario.password );

      if ( !validPassword ) {
          return res.status(400).json({
              msg: 'La contraseña no es correcta'
          });
      }

      const tokenSesion = await generarJWT();
      
      await Usuario.update({
        token_sesion : tokenSesion
            }, {
            where: {
                correo: correo,
            }
        });
        
        
        res.status(200).header("auth-token", tokenSesion).json({
            token: tokenSesion,
            nombre:  usuario.nombre,
            usuario:  usuario.usuario,
            correo: usuario.correo,
            rol: usuario.rol
        })
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    
}

const logoutUsuario = async (req, res) => {
    console.log(colors.bgBlue(req.params))
    const { user } = req.params

    try {
        await Usuario.update({
            token_sesion : null
                }, {
                where: {
                    usuario: user,
                }
            });


        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
    
}

const confirmarCuenta = async (req, res) => {
    const { token, user } = req.params
    try {
        const usuario = await Usuario.findOne({where: { usuario : user} });
        console.log(colors.bgBlue(usuario))
        if(token ==  usuario.token_confirmar ) {
            usuario.confirmado = true
            usuario.token_confirmar = null
            await usuario.save();
    
            res.status(200).render("ok", {
                mensaje: "Usuario Confirmado!",
          })
        }
    } catch (error) {
        console.log(error)
    }
  
 
}

const olvidePassword = async (req, res) => {
    const { correo } = req.body;

    const existeUsuario = await Usuario.findOne({where: { correo }});

    if (!existeUsuario) {
        const error = new Error("El Usuario no existe");
        return res.status(400).json({msg: error.message})
    }

    try {
        await existeUsuario.update({
            id: existeUsuario.id,
            nombre : existeUsuario.nombre,
            correo : existeUsuario.correo,
            password: existeUsuario.password,
            usuario: existeUsuario.usuario,
            imagen:existeUsuario.imagen,
            estado: existeUsuario.estado,
            token_confirmar: generarToken(),
            sesion: existeUsuario.sesion,
            rol: existeUsuario.rol,
            confirmado: existeUsuario.confirmado,
          });

          await emailRecuperarPassword({
            correo,
            nombre : existeUsuario.nombre,
            token : existeUsuario.token_confirmar,
            usuario : existeUsuario.usuario,
        })


        //console.log(colors.bgRed(existeUsuario))
        res.status(200).render("ok", {
            mensaje: "Hemos enviado un email con las instrucciones",
        })
    } catch (error) {
        console.log(error)
    }
}

const comprobarPassword = async (req,res, next) => {
    const { token } = req.params;

    // NO ENTIENDO PORQUE CARAJO FUNCIONA
    const tokenValido = await Usuario.findOne({where : { token_confirmar : token }});
    if(tokenValido) {
        console.log("El token es valido")
        res.status(200).render("newPassword", {
            usuario: tokenValido.usuario,
            token: tokenValido.token_confirmar
      })
    } else {
        const error = new Error("Token no valido")
        return res.status(400).json({msg: error.message})
    }

}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    console.log(colors.bgWhite(req.body))
    const user = await Usuario.findOne({where : { token_confirmar : token }});

    if(!user) {
        const error = new Error("Token no valido")
        return res.status(400).json({msg: error.message})
    }

    try {
        const salt = bcryptjs.genSaltSync();
        const newPassword = bcryptjs.hashSync( password, salt );
        // cambiar token
        await user.update({
            id: user.id,
            nombre: user.nombre,
            correo: user.correo,
            password: newPassword,
            usuario: user.usuario,
            imagen: user.secure_url,
            estado: user.estado,
            token_confirmar: null,
            sesion: user.sesion,
            rol: user.rol,
            confirmado: user.confirmado,
          });
        console.log(colors.bgYellow("Password actualizada correctamente!"))
        
        res.status(200).render("ok", {
            mensaje: "Contraseña actualizada correctamente!",
        })
    } catch (error) {
     console.log(error)   
    }
}

const getSesion = (req, res) => {
    console.log(req.body)
}

const editarPerfil = async (req, res) => {
 
    const { correo, usuario, nombre, password } = req.body;
    const newID = Date.now();
    
    try {

        const user = await Usuario.findOne(
            {   
                where : { correo }
            })
        //console.log(colors.bgGreen(user))
   
        if(req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { public_id : `${newID}` }, 
            function (error, result) {console.log(result);});
            const { secure_url } = result;
            console.log(secure_url)

            await user.update({
                id: user.id,
                nombre,
                correo,
                password: user.password,
                usuario,
                imagen: secure_url,
                estado: user.estado,
                token_confirmar: null,
                sesion: user.sesion,
                rol: user.rol,
                confirmado: user.confirmado,
              });
              res.status(200).render("ok", {
                mensaje: "Informacion del usuario actualizada correctamente!",
          })
            
        } else {
            await user.update({
                id: user.id,
                nombre,
                correo,
                password: user.password,
                usuario,
                imagen: user.imagen,
                estado: user.estado,
                token_confirmar: null,
                sesion: user.sesion,
                rol: user.rol,
                confirmado: user.confirmado,
              });
        }  
        res.status(200).render("ok", {
            mensaje: "Informacion del usuario actualizada correctamente!",
      })
        
        
    } catch (error) {
        console.log(error)
        res.status(401).render("error", {
            mensaje: "HA OCURRIDO UN ERROR",
            volver: "atras"
      })
        
    }
}

const adminNotificaciones = async (req, res) => {
    const { admin } = req.params
    const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : admin }});
    console.log(colors.bgRed(notificaciones))
    const notificacionesOrdenadas = notificaciones.reverse()

    return res.status(200).json({
        notificaciones: notificacionesOrdenadas,
      });
}

const actualizarNotificacion = async (req, res) => {
    const { admin } = req.params

    try {
        // const notificaciones_admin = await Notificaciones.findAll({where : { nombre_admin  : admin }});
        await Notificaciones.update({
            leida : true
        }, {
            where: {
                nombre_admin: admin,
            }
        });
    
        res.status(200).json({msg: "Comementario Leido"})
       
    } catch (error) {
        console.log(error)
    }
}

const contacto = (req, res) => {
    // Me pueden llegar desde public y desde auth
    console.log(colors.bgGreen(req.body))
    emailRegistroPrueba(req.body)

    res.status(200).render("ok", {
        mensaje: "Correo de Prueba Enviado Correctamente Papa!",
  })
}


module.exports = {
    eliminarUsuario,
    crearUsuario,
    loginUsuario,
    logoutUsuario,
    confirmarCuenta,
    olvidePassword,
    comprobarPassword,
    nuevoPassword,
    validateToken,
    getSesion,
    editarPerfil,
    adminNotificaciones,
    actualizarNotificacion,
    contacto
}

