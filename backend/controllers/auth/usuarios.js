
const { Usuario, Usuario_Comentario, Usuario_Sesion } = require("../../models/model.js")
const { generarJWT,emailRegistro, generarToken  } = require("../../helpers/index");

const bcryptjs = require('bcryptjs');
const colors = require('colors');

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
        res.status(200).json({
            newUsuario
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
                msg: 'El Usuario no es correcto'
            });
        }

        if ( !usuario.confirmado ) {
            return res.status(400).json({
                msg: 'El Usuario no fue Confirmado'
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
        
        await usuario.update({
            sesion: true,
            token_sesion: tokenSesion,
        })
             
        await usuario.save()

        res.status(200).header("auth-token", tokenSesion).json({
            token: tokenSesion,
            nombre:  usuario.nombre,
            usuario:  usuario.nombre,
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
}

