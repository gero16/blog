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

  const body =  req.body;
  //console.log(colors.bgRed(body))
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
};

const authAgregarComentario = async (req, res) => {
    const id = Date.now()
    const date = new Date().toLocaleDateString('es-uy', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
    console.log(colors.bgGreen(req.body))
    //const fecha =
    try {
       const registro = await Post.findOne({where : {url : req.params.titulo}});
    
       const user = await Usuario.findOne({where : {usuario : req.params.user}})
  
    
        const newComentario = new Comentario ({
          id,
          usuario: req.body.usuario,
          mensaje: req.body.mensaje,
          fecha: date,
          usuario_registrado: true,
          id_post: parseInt(registro.id),
        })

        const usuario_comentarios = new Usuario_Comentario ({
            id : id + 103,
            id_usuario: user.id,
            id_post: parseInt(registro.id),
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
      console.log(req.params)
      const deletePost = await Post.findOne({ where: { id: req.params.id } });
      await deletePost.destroy();

    } 

  module.exports = {
    crearPost,
    actualizarPost,
    authAgregarComentario,
    eliminarPost
  }