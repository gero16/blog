
const { Usuario, Usuario_Comentario, Usuario_Sesion } = require("../../models/model.js")
const { generarJWT,emailRegistro, generarToken  } = require("../../helpers/index");
const cloudinary = require("cloudinary").v2;
const bcryptjs = require('bcryptjs');
const colors = require('colors');

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
            token_confirmacion: token,
        })

        
        emailRegistro({
            correo,
            nombre,
            token,
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
  }


const olvidePassword = async (req, res) => {
   
}

const comprobarPassword = async (req,res, next) => {
    const {token} = req.params;

}

const nuevoPassword = async (req, res) => {
   
}

   
const activeSesion = async(req, res) => {
   
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
                token_sesion:null,
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
                token_sesion:null,
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
    activeSesion,
    sesion,
    getSesion,
    editarPerfil
}

