const { Post, Usuario, Comentario, Admin_Post, Notificaciones } = require("../../models/model.js")

const colors = require('colors');

const perfilPlantilla = async (req, res) => {
  try {
    const titulo = "Crear Publicación"
    const user = await Usuario.findOne({where: {usuario: req.params.user}})
    console.log("Es usuario")
    res.render("perfil/perfilUser", {
      usuario: user.usuario,
      correo: user.correo,
      name: user.nombre,
      imagen: user.imagen,
      titulo,
    })

  } catch (error) {
    console.log(error)
  }
  
}

const indexUserPlantilla = async (req, res) => {
  const usuario = req.params.user
  const titulo = "Espacio Luz de Luna"
  
  try {
    const registros = await Post.findAll({
      order: [
        ['id', 'DESC'],
    ],
  });

  const user = await Usuario.findOne({ where: { usuario : usuario }})
  const reduceName = user.nombre.split(" ")
  const miniName = reduceName[0]
  if(user) {
    res.render("index/indexUser", {
      registros: registros,
      miniName: miniName,
      usuario: user.usuario,
      correo: user.correo,
      name: user.nombre,
      rol: user.rol,
      titulo,
      })

  }
    
  } catch (error) {
    console.log(error)
  }
}

const userPostPlantilla =  async (req, res) => {
    const usuario = req.params.user
    const url = req.params.titulo

    try {
      const datos = await Post.findOne({ where: { url }})

      if(datos) {
        const {id, titulo, contenido, imagen, autor, fecha}  = datos

        const user = await Usuario.findOne({ where: {usuario} })
      
        const comentarios = await Comentario.findAll({where : {id_post : id}});
        
        const reduceName = user.nombre.split(" ")
        const miniName = reduceName[0]
        let numComentarios = 0;

        if(comentarios.length > 1) {
         numComentarios = comentarios.length +1
        }
        
        const separar = fecha.split("-")
        const date = [separar[2], separar[1], separar[0]]
        const newDate = date.join("-")

        res.render("post/postUser", {
          id: id,
          usuario,
          url : url,
          titulo: titulo,
          contenido: contenido,
          miniName: miniName,
          imagen: imagen,
          autor: autor,
          fecha: fecha,
          comentarios: comentarios,
          usuario_perfil: user.imagen,
          numComentarios: numComentarios,
        })
      } 
  } catch (error) {
    console.log(error) 
  } 
}

const errorPlantilla = (req, res) => {
  const { mensaje } = req.body;
  res.status(401).render("error", {
    error: 401,
    mensaje: mensaje,
  })
}

const olvidePasswordPlantilla = (req, res) => {
  res.render("recuperar-password", {
    mensaje: "Recuperar Cuenta",
    mensajeP: "Introduzca su correo electrónico para buscar tu cuenta."
  })
 
}

const cambiarPassword = (req, res) => {
  res.render("recuperar-password", {
    mensaje: "Cambiar Contraseña",
    mensajeP: "Introduzca su correo electrónico para poder cambiar su contraseña."
  })
}

const errorTokenPlantilla = (req, res) => {


  res.status(401).render("error", {
   
  })
}

const eliminarUsuarioPlantilla = async (req, res) => {
  const user = await Usuario.findOne({ where: { usuario : req.params.admin } })
  console.log(colors.bgBlue(user))
  const { id } = user;
  
  res.render("eliminar", {
    usuario: req.params.admin,
    mensaje: `Esta seguro que desea eliminar el Usuario: `,
    destino: `${ req.params.user }`,
    id: id,
  })
}


module.exports = {
  indexUserPlantilla,
    perfilPlantilla,
    userPostPlantilla,
    errorPlantilla,
    olvidePasswordPlantilla,
    cambiarPassword,
    errorTokenPlantilla,
    eliminarUsuarioPlantilla,
}