const { Post, Usuario, Comentario, Notificaciones } = require("../../models/model.js")
const colors = require('colors');


class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = "ValidationError"
  }
}

const indexAdminPlantilla = async (req, res) => {
    const admin = req.params.admin
    const titulo = "Espacio Luz de Luna"
  
    try {
      const registros = await Post.findAll({
        order: [
          ['id', 'DESC'],
      ],
    });
    
      const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : admin }});

      const notificacionesOrdenadas = notificaciones.reverse()
      const notificacion_sinleer = notificaciones.filter(notificacion => notificacion.leida === false)
  
      const user = await Usuario.findOne({ where: { usuario : admin }})
      
      const reduceName = user.nombre.split(" ")
      const miniName = reduceName[0]
      res.render("index/indexAdmin", {
            registros: registros,
            miniName: miniName,
            usuario: user.usuario,
            correo: user.correo,
            name: user.nombre,
            rol: user.rol,
            titulo,
            notificaciones: notificacionesOrdenadas,
            notificacion_sinleer,
            cantidad_notificaciones : notificacion_sinleer.length
        })    
    } catch (error) {
      res.status(400).render("error", {
        mensaje: "Ha ocurrido un error al renderizar la pagina principal",
        error: 400,
        volver: "inicio"
      })
    } 
}
  
const perfilAdmin = async (req, res) => {
    try {
      const user = await Usuario.findOne({where: {usuario: req.params.admin}})
      const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : req.params.admin }});
      
      // console.log(colors.bgRed(notificaciones))
      const notificacion_sinleer = notificaciones.filter(notificacion => notificacion.leida === false)
      const notificacionesOrdenadas = notificaciones.reverse()
      const titulo = "Perfil"
    
      res.render("perfil/perfilAdmin", {
        usuario: user.usuario,
        correo: user.correo,
        name: user.nombre,
        imagen: user.imagen,
        titulo,
        notificaciones: notificacionesOrdenadas,
        notificacion_sinleer,
        cantidad_notificaciones : notificacion_sinleer.length
      })
      
    } catch (error) {
      console.log(error)
      res.status(400).render("error", {
        mensaje: "Ha ocurrido un error al renderizar el perfil",
        error: 400,
        volver: "inicio"
      })
    }
  
}

const crearPostPlantilla = async (req, res) => {
    // Traaer informacion sobre si se valido el token de validate-token
    const date =  new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0'); //obteniendo mes
    const day = String(date.getDate()).padStart(2, '0'); //obteniendo dia
    const year = date.getFullYear(); //obteniendo año
    const fecha = `${year}-${month}-${day}`
  
    const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : req.params.admin }});
    const notificacionesOrdenadas = notificaciones.reverse()
  
    const notificacion_sinleer = notificaciones.filter(notificacion => notificacion.leida === false)
  
    try {
      const titulo = "Crear Publicación"
      res.status(200).header("auth-token", req.user).render("crear", {
        usuario: req.params.admin,
        fecha: fecha,
        titulo,
        notificaciones: notificacionesOrdenadas,
        notificacion_sinleer,
        cantidad_notificaciones : notificacion_sinleer.length
  })
    } catch (error) {
      console.log(error)
      res.status(400).render("error", {
        mensaje: "Ha ocurrido un error al renderizar el perfil",
        error: 400,
        volver: "inicio",
      })
    }
}

const adminPostPlantilla = async (req, res) => {
    const usuario = req.params.admin
    const url = req.params.titulo
    try {
        
      const datos = await Post.findOne({ where: { url }})
     
      const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : usuario }});
       const notificacionesOrdenadas = notificaciones.reverse()
      const notificacion_sinleer = notificaciones.filter(notificacion => notificacion.leida === false)
  
      if(datos) {
        const {id, titulo, contenido, imagen, autor, fecha}  = datos
  
        const user = await Usuario.findOne({ where: { usuario } })
   
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
  
        res.render("post/postAdmin", {
          id: id,
          usuario,
          url : url,
          titulo: titulo,
          miniName: miniName,
          contenido: contenido,
          imagen: imagen,
          autor: autor,
          fecha: newDate,
          comentarios: comentarios,
          usuario_perfil: user.imagen,
          numComentarios: numComentarios,
          notificaciones: notificacionesOrdenadas,
          notificacion_sinleer,
          cantidad_notificaciones : notificacion_sinleer.length
        })
      }
     
  } catch (error) {
    console.log(error) 
    res.status(400).render("error", {
      mensaje: "Ha ocurrido un error al renderizar el perfil",
      error: 400,
      volver: "inicio",
    })
  } 
} 

const eliminarPlantilla = async (req, res) => {
    const url = req.params.titulo
  try {
    const data = await Post.findOne({where: { url }})
    const { id, titulo, imagen } = data;
  
    const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : req.params.admin }});
    const notificacion_sinleer = notificaciones.filter(notificacion => notificacion.leida === false)
  
      res.render("eliminar", {
        usuario: req.params.admin,
        mensaje: `Desea borrar la Publicación: `,
        destino: `${ titulo }`,
        id: id,
        titulo: titulo,
        imagen: imagen,
        notificaciones,
        notificacion_sinleer,
        cantidad_notificaciones : notificacion_sinleer.length
      })
    
  } catch (error) {
    res.status(400).render("error", {
      mensaje: "Ha ocurrido un error al renderizar la plantilla",
      error: 400,
      volver: "inicio",
    })
  }
}
  
const editarPostPlantilla = async (req, res) => {

  try {  
    const user = req.params.admin
    const title = req.params.titulo

    const data = await Post.findOne({where: { url: title }})
    const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : user }});
    const notificacion_sinleer = notificaciones.filter(notificacion => notificacion.leida === false)
    
    if(data){
      const {id, titulo, contenido, imagen, autor, fecha} = data;
      if(imagen){
        const image = imagen.split("https://res.cloudinary.com/geronicola/image/upload/")
        console.log(colors.bgYellow(image))
   
        const img = image[1].split("/");
        res.render("editar", {
          id: id,
          url: title,
          titulo: titulo,
          contenido: contenido,
          imagenMin: img[1] || null,
          imagen: imagen,
          usuario: user,
          autor: autor,
          fecha: fecha,
          notificaciones,
          notificacion_sinleer,
          cantidad_notificaciones : notificacion_sinleer.length
        })  
    } 
  }
  
  } catch (error) {
      res.status(400).render("error", {
        mensaje: "Ha ocurrido un error",
        error: 400,
        volver: "inicio",
      })
  }
}
  
const usuariosPlantilla = async (req, res) => {
  const { admin } = req.params
  try {
    const usuarios = await Usuario.findAll()
    const user = await Usuario.findOne({where : { usuario : admin}})

    const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : admin }});
    const notificacionesOrdenadas = notificaciones.reverse()
    const notificacion_sinleer = notificaciones.filter(notificacion => notificacion.leida === false)

    //console.log(colors.bgBlue(notificacionesOrdenadas))
  
    res.status(200).render("usuarios", {
        titulo: "Espacio Luz de Luna",
        usuario: user.usuario,
        usuarios: usuarios,
        css2: "usuarios",
        css: "perfil",
        notificaciones: notificacionesOrdenadas,
        notificacion_sinleer,
        cantidad_notificaciones : notificacion_sinleer.length
      })
    
  } catch (error) {
    res.status(400).render("error", {
      mensaje: "Ha ocurrido un error al renderizar la plantilla",
      error: 400,
      volver: "inicio",
    })
  }
}
  
  module.exports = {
    indexAdminPlantilla,
    perfilAdmin,
    crearPostPlantilla,
    adminPostPlantilla,
    eliminarPlantilla,
    editarPostPlantilla,
    usuariosPlantilla

  }