
const colors = require('colors')
const cloudinary = require("cloudinary").v2;
const { Post, Comentario } = require("../../models/model")
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

  const indexPublic = async (req, res) => {
 
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
  
  const mostrarPublicacion = async (req, res) => {
    console.log(req.params.url)
    let avatarImage = "";

    try {
      // Traer todos las Publicaciones
     const registro = await Post.findOne({where : {url : req.params.url}});
   
     const {id, url, titulo, contenido, imagen, autor, fecha} = registro
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
      numComentarios
      
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
        
        await newComentario.save()
  
        res.status(200).send("Mensaje enviado!")
    } catch (error) {
        console.log(error)
    }
  }


module.exports = {
    traerPublicaciones,
    indexPublic,
    agregarComentario,
    mostrarPublicacion
}

