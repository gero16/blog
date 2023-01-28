
const colors = require('colors')
const cloudinary = require("cloudinary").v2;
const { Post, Comentario, Notificaciones, Admin_Post, Usuario } = require("../../models/model")
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
      const registros = await Post.findAll();
      const registrosOrdenados = registros.sort((a, b) =>  new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  

      return res.status(200).json({
        registros: registrosOrdenados
      });
  
    } catch (error) {
      console.log(error)
    }
  }

  const indexPublicPlantilla = async (req, res) => {
 
    try {
      const registros = await Post.findAll()
      const registrosOrdenados = registros.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
   
      
      const titulo = "Espacio Luz de Luna"
      res.render("index/indexPublic", {
          registros: registrosOrdenados, 
          titulo,
          usuario: "public",
        })
    } catch (error) {
      console.log(error)
    }}
  
  const postPlantillaPublic = async (req, res) => {
    console.log(req.params.titulo)
    let avatarImage = "";

    try {
      // Traer todos las Publicaciones
     const post = await Post.findOne({where : {url : req.params.titulo}});

     const post_admin = await Admin_Post.findOne({where : { id_post : post.id }})
     const admin = await Usuario.findOne({ where: { id : post_admin.id_admin } })
   
     const {id, url, titulo, contenido, imagen, autor, fecha} = post
     const comentarios = await Comentario.findAll({where : {id_post : id}});
 
     const separar = fecha.split("-")
     const date = [separar[2], separar[1], separar[0]]
     const newDate = date.join("-")

     let numComentarios = 0;

     if(comentarios.length > 1) {
      numComentarios = comentarios.length +1
     }

    return res.status(200).render("post/publicPost", {
      id: id,
      url,
      titulo: titulo,
      contenido: contenido,
      imagen: imagen,
      autor: autor,
      fecha: newDate,
      comentarios: comentarios,
      numComentarios,
      admin_post : admin.usuario,
      
  })
   } catch (error) {
     console.log(error)
   }
  }
  

  const agregarComentario = async (req, res) => {
    console.log(colors.bgBlue(req.body))
    const id = Date.now()
    const date = new Date().toLocaleDateString('es-uy', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
    try {
       const registro = await Post.findOne({where : {url : req.params.url}});

        const newComentario = new Comentario ({
          id,
          usuario: req.body.usuario,
          mensaje: req.body.mensaje,
          fecha: date,
          id_post: parseInt(registro.id),
          imagen_usuario: req.body.imagen_usuario,
        })
        
        console.log(colors.bgRed(req.body.autor_post))
        const notifiaciones = new Notificaciones ({
          id: id + 12 +3,
          nombre_admin: req.body.autor_post,
          nombre_remitente: req.body.usuario,
          url_publicacion: req.body.url_publicacion,
          mensaje: req.body.mensaje,
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

