
const colors = require('colors')
const cloudinary = require("cloudinary").v2;
const { Post, Comentario, Notificaciones, Admin_Post, Usuario } = require("../../models/model");
const { dateActual } = require('../../middleware/auth-middleware');
require("multer");

cloudinary.config({
  cloud_name: "geronicola",
  api_key: "193984666672594",
  api_secret: "9uOiJVywMUJBjllIpWmrxTj77Hg",
  secure: true,
});


/**  TRAER PUBLICACIONES EN EL INDEX  **/
const traerPublicaciones = async (req, res) => {
    try {
       // Traer todos las Publicaciones
       const registros = await Post.findAll({
        order: [
          ['id', 'DESC'],
      ],
      });
      
  
      return res.status(200).json({
        registros: registros,
      });
  
    } catch (error) {
      console.log(error)
    }
  }

  const indexPublicPlantilla = async (req, res) => {
 
    try {
      const registros = await Post.findAll({
        order: [
          ['id', 'DESC'],
      ],
      });
       
      const titulo = "Espacio Luz de Luna"
      res.render("index/indexPublic", {
          registros: registros, 
          titulo,
          usuario: "public",
        })
    } catch (error) {
      console.log(error)
    }}
  
  const postPlantillaPublic = async (req, res) => {
    console.log(req.params.titulo)

    try {
      // Traer todos las Publicaciones
     const post = await Post.findOne({where : {url : req.params.titulo}});
     console.log(colors.bgRed(post))

     const {id, url, titulo, contenido, imagen, autor, fecha} = post
     const comentarios = await Comentario.findAll({where : {id_post : id}});
 
     const separar = fecha.split("-")
     const date = [separar[2], separar[1], separar[0]]
     const newDate = date.join("-")

     let numComentarios = 0;

     if(comentarios.length > 1) {
      numComentarios = comentarios.length +1
     }

    return res.status(200).render("post/postPublic", {
      id: id,
      url,
      titulo: titulo,
      contenido: contenido,
      imagen: imagen,
      autor: autor,
      fecha: newDate,
      comentarios: comentarios,
      numComentarios,
      
  })
   } catch (error) {
     console.log(error)
   }
  }
  

  const agregarComentario = async (req, res) => {
    const id = Date.now()
    const {fecha, actual } = dateActual()
    
    try {
       const registro = await Post.findOne({where : {url : req.params.url}});

        const newComentario = new Comentario ({
          id,
          usuario: req.body.usuario,
          mensaje: req.body.mensaje,
          fecha: fecha,
          hora: actual,
          id_post: parseInt(registro.id),
          imagen_usuario: req.body.imagen_usuario,
        })
        

        const notifiaciones = new Notificaciones ({
          id: id + 12 +3,
          nombre_admin: req.body.autor_post,
          nombre_remitente: req.body.usuario,
          url_publicacion: req.body.url_publicacion,
          fecha : fecha,
          hora: actual,
          mensaje: req.body.mensaje,
          imagen_remitente: req.body.imagen_usuario,
        })
        
        await notifiaciones.save()
        await newComentario.save()
  
        res.status(200).send("Mensaje enviado!")
    } catch (error) {
        console.log(error)
    }
    
  }


module.exports = {
    traerPublicaciones,
    indexPublicPlantilla,
    agregarComentario,
    postPlantillaPublic
}

