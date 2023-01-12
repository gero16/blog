const { Usuario_Comentario, Comentario, Post, Usuario } = require("../../models/model");
const colors = require('colors');
const cloudinary = require("cloudinary").v2;
require("multer");
const path = require("path");

cloudinary.config({
  cloud_name: "geronicola",
  api_key: "193984666672594",
  api_secret: "9uOiJVywMUJBjllIpWmrxTj77Hg",
  secure: true,
});

/*** CREACION DEL POST ***/
const crearPost = async (req, res) => {
/*
  const body =  req.body;
  const { titulo, autor, imagen, fecha, primer, segundo, tercero, cuarto, quinto, sexto, septimo, octavo} = body;

  let tituloURL = titulo.toLowerCase().replaceAll(" ","-")
  
  const id = Date.now();

  let contenido = [];
  const filtrarContenido = [primer, segundo, tercero, cuarto, quinto, sexto, septimo, octavo];
  filtrarContenido.forEach(element => {
    if(element != undefined) {
      contenido.push(element)
    }
  });

  console.log(contenido)

  const result = await cloudinary.uploader.upload(
    req.file.path,
    { public_id: `${id}` },
    function (error, result) {
      console.log(result);
    }
  );
  

  const { secure_url } = result;
  console.log(secure_url)
  
  const nuevoPost = new Post({
    id,
    titulo,
    fecha,
    autor: autor,
    contenido,
    imagen: secure_url,
    url: tituloURL,
  });
  
 await nuevoPost.save();

 res.status(200).render("ok", {
  mensaje: "Publicación agregada exitosamente!"
})
*/
};

const authAgregarComentario = async (req, res) => {
    const id = Date.now()
    const date = new Date().toLocaleDateString('es-uy', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
    //console.log(colors.bgGreen(req.body))
    try {
       const post = await Post.findOne({where : {url : req.params.titulo}});
    
       const user = await Usuario.findOne({where : {usuario : req.params.user}})
  
      console.log(post.id)
        const newComentario = new Comentario ({
          id,
          usuario: req.body.usuario,
          mensaje: req.body.mensaje,
          fecha: date,
          usuario_registrado: true,
          imagen_usuario: user.imagen,
          id_post: post.id,
        })
       
        const usuario_comentarios = new Usuario_Comentario ({
            id : id + 103,
            id_usuario: user.id,
            id_comentario: id,
          })
  
        await newComentario.save()
        await usuario_comentarios.save()
  
      
        res.status(200).send("Mensaje enviado!")
    } catch (error) {
        console.log(error)
    }
  }

  const actualizarPost = async (req, res) => {
 
    const body = req.body;
    const {id, titulo, autor, imagen, fecha, primer, segundo, tercero, cuarto, quinto, sexto, septimo, octavo} = body;
    // si se cambio la imagen viene por el req.file, sino es undefined y no hay cambio
    const tituloURL = titulo.toLowerCase().replaceAll(" ","-")
    const newID = Date.now();
  
    let contenido = [];
    const filtrarContenido = [primer, segundo, tercero, cuarto, quinto, sexto, septimo, octavo];
          filtrarContenido.forEach(element => {
              if(element != undefined) {
                contenido.push(element)
              }});
  
    try {

      let post = await Post.findOne({ where  : { id }})
    
      if(req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, { public_id : `${newID}` }, 
        function (error, result) {console.log(result);});
      
        const { secure_url } = result;  
        await post.update({
              titulo,
              fecha,
              autor: autor,
              imagen: req.file.path,
              contenido: contenido,
              imagen: secure_url,
              url: tituloURL
            });
  
      } else {
        await post.update({ 
          titulo,
          fecha,
          autor,
          imagen,
          contenido,
          url: tituloURL
        });   
      }
  
    res.redirect(`/`)
    } catch (error) {
      console.log(error)
    }} 
  

    const eliminarPost = async (req, res) => {
      console.log(req.params.id)

      try {
        const deletePost = await Post.findOne({ where: { id: req.params.id } });
        const deleteComentarios = await Comentario.findOne({ where: { id_post:  req.params.id } });

        if(deleteComentarios) {
          console.log(colors.bgCyan(deleteComentarios))
          const deleteUsuarioComentarios = await Usuario_Comentario.findOne({ where: { id_comentario: deleteComentarios.id} });
          console.log(colors.bgGreen(deleteUsuarioComentarios))
          await deleteComentarios.destroy()
          await deleteUsuarioComentarios.destroy()
        }
      
        await deletePost.destroy();
  
        return res.status(200).render("ok", {
          mensaje: "Publicación eliminada correctamente!"
        })

      } catch (error) {
        console.log(error)
        res.status(400).render("error", {
          error: 404
        })
        
      }
 

    } 

  module.exports = {
    crearPost,
    actualizarPost,
    authAgregarComentario,
    eliminarPost
  }

 