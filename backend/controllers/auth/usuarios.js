
const { Usuario, Usuario_Comentario, Usuario_Sesion } = require("../../model/model.js")
const { generarJWT,emailRegistro, generarToken  } = require("../../helpers/index");

const bcryptjs = require('bcryptjs');
const colors = require('colors');

const getUsuarios = async (req, res) => {
    const arrayUsuarios = []

    const usuarios = await Usuario.findAll()
    
    usuarios.forEach(element => {
      
        console.log(colors.bgBlue(element.dataValues))
        arrayUsuarios.push(element.dataValues)
    });
    res.status(200).json({
        arrayUsuarios,
    })
}

const crearUsuario = async (req, res = response) => {

    const id = Date.now();
    const { correo, usuario, nombre, password, rol, estado, confirmado } = req.body;
    console.log(req.body)
    
    try {

        const newUsuario = new Usuario ({
            id,
            nombre, 
            correo,
            usuario,
            password,
            rol,
            estado, 
            confirmado
        })

        const token = generarToken()

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

const mandarInfoSesion = (req, res) => {
   
}

const infoSesion = async(req, res) => {
   
}

const loginUsuario = async (req, res) => {

    const { correo, password } = req.body;

    console.log(req.body)
    try {
    
      const usuario = await Usuario.findOne({where : {correo: correo}})
      const { dataValues } = usuario;

 
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

      const validPassword = await bcryptjs.compareSync( password, dataValues.password );

      if ( !validPassword ) {
          return res.status(400).json({
              msg: 'La contraseña no es correcta'
          });
      }

      const tokenSesion = await generarJWT();
      console.log(tokenSesion)

      if(usuario.sesion == false){
            console.log("dale forro")

            const tokenUser = new Usuario_Sesion({
                id: Math.floor(Math.random(2)*1000),
                user_agent: "alguno",
                token: tokenSesion,
                id_usuario: usuario.id
              })
    
              await tokenUser.save()

              await usuario.update({
                sesion: true,
                token_sesion: tokenSesion,
              })

             await usuario.save()
             res.header("auth-token", tokenSesion).redirect(`/auth/${dataValues.usuario}/index`)
        
      } else {
            const tokenUser = new Usuario_Sesion({
                    id: Math.floor(Math.random(2)*1000),
                    user_agent: "otro",
                    token: tokenSesion,
                    id_usuario: usuario.id
            })
    
            await tokenUser.save()

            await usuario.update({
                token_sesion: tokenSesion,
            })

              
            await usuario.save()

            res.header("auth-token", tokenSesion).redirect(`/auth/${dataValues.usuario}/index`)
        
    }
      // Si no existe una sesion desde este navegador/cliente
   

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
        console.log(usuario.dataValues.id)
        const usuario_sesion = await Usuario_Sesion.findOne({where : { id_usuario : usuario.dataValues.id }})
        console.log(usuario_sesion.dataValues)

        await usuario_sesion.destroy()

        //res.redirect("/")
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
    mandarInfoSesion,
    infoSesion,
    activeSesion,
    sesion,
    getSesion,
}

