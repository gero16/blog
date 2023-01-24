
const { Usuario, Usuario_Comentario, Usuario_Sesion } = require("../../models/model.js")
const { generarJWT,emailRegistro, generarToken  } = require("../../helpers/index");
const cloudinary = require("cloudinary").v2;
const bcryptjs = require('bcryptjs');
const colors = require('colors');
const { emailRecuperarPassword } = require("../../helpers/emailRegistro.js");

cloudinary.config({
    cloud_name: "geronicola",
    api_key: "193984666672594",
    api_secret: "9uOiJVywMUJBjllIpWmrxTj77Hg",
    secure: true,
  });
  
const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll()
    
    usuarios.forEach(element => {
        console.log(colors.bgBlue(element))
    });
    res.status(200).json({
        usuarios,
    })}

const crearUsuario = async (req, res = response) => {

    const id = Date.now();
    const { correo, usuario, nombre, password } = req.body;
    console.log(req.body)

    const existEmail = await Usuario.findOne({where : {correo: correo}})
    const existUser = await Usuario.findOne({where : {usuario: usuario}})

    if(existEmail) {
        res.status(401).json({
            mensaje: "El email proporcionado ya esta registrado"
        })
    } else if (existUser) {
        res.status(401).json({
            mensaje: "El usuario proporcionado ya esta registrado"
        })
    }
    else {
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
    
            
            emailRegistro({
                correo,
                nombre,
                token,
                usuario,
            })
    
            const salt =  bcryptjs.genSaltSync();
            newUsuario.password =  bcryptjs.hashSync( password, salt );
           // newUsuario.token = token
           await newUsuario.save()
          
            res.status(200).render("ok", {
                mensaje: "Usuario Registrado correctamente!",
                usuario: newUsuario,
          })
            
        } catch (error) {
            console.log(error)
            res.status(500)
        }
    }
}

const validateToken = (req, res) => {
    console.log("se paso la validacion")
    res.status(200).header("auth-token", req.body).json({
        token: req.body,
      }) 
}


const loginUsuario = async (req, res) => {

    const { correo, password } = req.body;
    
    try {
    
      const usuario = await Usuario.findOne({where : {correo: correo}})
 
          // console.log(colors.bgBlue(usuario.id))
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'El usuario no es correcto'
            });
        }

        if ( !usuario.confirmado ) {
            return res.status(400).json({
                msg: 'El usuario no fue confirmado'
            });
        }

        // SI el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Su cuenta fue eliminada'
            });
        }

      const validPassword = bcryptjs.compareSync( password, usuario.password );

      if ( !validPassword ) {
          return res.status(400).json({
              msg: 'La contraseña no es correcta'
          });
      }

      const tokenSesion = await generarJWT();
      console.log(tokenSesion)
        
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
        const usuario = await Usuario.findOne({where: { usuario : user} });
        console.log(usuario.id)


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
     
        emailRecuperarPassword({
            correo,
            nombre : existeUsuario.nombre,
            token : existeUsuario.token_confirmar,
            usuario : existeUsuario.usuario,
        })

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

        console.log(colors.bgRed(existeUsuario))
        res.json({msg: "Hemos enviado un email con las instrucciones"})
    } catch (error) {
        
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
    const usuario = await Usuario.findOne({where : { token_confirmar : token }});

    if(!usuario) {
        const error = new Error("Token no valido")
        return res.status(400).json({msg: error.message})
    }

    try {
        // cambiar token
        usuario.token = null;
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );
        await usuario.save();
        res.json({msg: "Password modificado correctamente"})
    } catch (error) {
        
    }
}

const sesion = (req, res) => {
    const token = req.body.token
    console.log(colors.red(req.body.token))
    res.status(200).json({
        token,
    })
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
      })
        
    }


}



module.exports = {
    getUsuarios,
    crearUsuario,
    loginUsuario,
    logoutUsuario,
    confirmarCuenta,
    olvidePassword,
    comprobarPassword,
    nuevoPassword,
    validateToken,
    sesion,
    getSesion,
    editarPerfil
}

