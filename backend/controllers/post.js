
const colors = require('colors')
const cloudinary = require("cloudinary").v2;
const { Post, Comentario } = require("../models/model")
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
  
      return res.status(200).json({
        registros,
      });
  
    } catch (error) {
      console.log(error)
    }
  }
  
  

  const mostrarPublicacion = async (req, res) => {
    console.log(req.params.url)
    let avatarImage = "";

    function randomImage(min, max) {
      const num = Math.floor((Math.random() * (max - min + 1)) + min);
      avatarImage = `/../img/avatar${num}.png`
      return avatarImage;
    }
  
    randomImage(0,3)
    console.log(colors.bgBlue(avatarImage))
    try {
      // Traer todos las Publicaciones
     const registro = await Post.findOne({where : {url : req.params.url}});
   
     const {id, url, titulo, contenido, imagen, autor, fecha} = registro
     const comentarios = await Comentario.findAll({where : {id_post : id}});
 
    return res.status(200).render("post/publicPost", {
      id: id,
      url,
      titulo: titulo,
      contenido: contenido,
      imagen: imagen,
      autor: autor,
      fecha: fecha,
      comentarios: comentarios,
      avatarImage,
      
  })
   } catch (error) {
     console.log(error)
   }
  }
  

  const agregarComentario = async (req, res) => {
    console.log(colors.bgBlue(req.body))
    const id = Date.now()
    const date = new Date().toLocaleDateString('es-uy', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
    //const fecha =
    try {
       const registro = await Post.findOne({where : {url : req.params.url}});

        const newComentario = new Comentario ({
          id,
          usuario: req.body.usuario,
          mensaje: req.body.mensaje,
          fecha: date,
          id_post: parseInt(registro.id),
        })
        
        await newComentario.save()
  
      
        res.status(200).send("Mensaje enviado!")
    } catch (error) {
        console.log(error)
    }
  }


module.exports = {
    traerPublicaciones,
   
    agregarComentario,
    mostrarPublicacion

}

