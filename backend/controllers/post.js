
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
    let arrayComentarios = []
    try {
      // Traer todos las Publicaciones
     const registro = await Post.findOne({where : {url : req.params.url}});
     const { dataValues } = registro
     const {id, url, titulo, contenido, imagen, autor, fecha} = dataValues
     const comentarios = await Comentario.findAll({where : {id_post : id}});
     comentarios.forEach(element => {
      arrayComentarios.push(element.dataValues)
     });
     //const comentarios = await Comentario.findOne({where: {id : post_comentarios.dataValues.id_comentario}})
    console.log(arrayComentarios)
    return res.status(200).render("post/publicPost", {
      id: id,
      url,
      titulo: titulo,
      contenido: contenido,
      imagen: imagen,
      autor: autor,
      fecha: fecha,
      comentarios: arrayComentarios,
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
       const { dataValues } = registro

        const newComentario = new Comentario ({
          id,
          usuario: req.body.usuario,
          mensaje: req.body.mensaje,
          fecha: date,
          id_post: parseInt(dataValues.id),
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

