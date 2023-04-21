const { Usuario_Comentario, Admin_Post, Comentario, Post, Usuario, Notificaciones } = require("../../models/model");
const colors = require('colors');
const cloudinary = require("cloudinary").v2;
require("multer");
const path = require("path");
const { dateActual } = require("../../middleware/auth-middleware");

cloudinary.config({
  cloud_name: "geronicola",
  api_key: "193984666672594",
  api_secret: "9uOiJVywMUJBjllIpWmrxTj77Hg",
  secure: true,
});

/*** CREACION DEL POST ***/
const crearPost = async (req, res) => {
 
  const body =  req.body;
  const { admin } = req.params
  let { titulo, autor, imagen, fecha, contenido } = body;

  if(!titulo || !contenido) {
    res.status(400).render("error", {
      error: 400,
      mensaje: "Tiene que haber un titulo"
    })
    return
  }
  
  if(typeof(contenido) === "string" ) {
    contenido = [contenido]
  }

  let tituloURL = titulo.toLowerCase().replaceAll(" ","-")

  const adminUser = await Usuario.findOne({ where : { usuario : admin }})
  const existePost = await Post.findOne({where : {url : tituloURL}});

  if(existePost) {
    res.status(400).render("error", {
      error: 400,
      mensaje: "Ya existe una Publicación con el mismo título"
    })
    
  } else {
  const id = Date.now();
  const idAdmin = (Date.now() + 113 + 4 + 2 )

  try {
    if(req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path,
        { public_id : `blog-luz-de-luna/${ id }` },
        function (error, result) {
          console.log(colors.bgBlue(result));
        });

      const { secure_url } = result;
    
      const nuevoPost = new Post({
        id,
        titulo,
        fecha,
        autor: autor,
        contenido,
        imagen: secure_url,
        url: tituloURL,
      });

      const admin_post = new Admin_Post({ id: id +12134, id_admin: adminUser.id, id_post: id })
      
     await nuevoPost.save();
      await admin_post.save();

    } else {
      const nuevoPost = new Post({
        id,
        titulo,
        fecha,
        autor: autor,
        contenido,
        imagen,
        url: tituloURL,
      });

      const admin_post = new Admin_Post ({ id: idAdmin, id_admin: adminUser.id, id_post: id })
      await nuevoPost.save();
      await admin_post.save();
    }
    
   res.status(200).render("ok", {
    mensaje: "Publicación agregada exitosamente!"
  })
  } catch (error) {
    console.log(error)
  }}
};

const authAgregarComentario = async (req, res) => {
    const { editar, id_comentario } = req.body
    const id = Date.now()
    const {fecha, actual } = dateActual()

    try {
       const post = await Post.findOne({where : {url : req.params.titulo}});
    
       const user = await Usuario.findOne({where : {usuario : req.params.user}})

      if(editar === false) {
        const newComentario = new Comentario ({
          id,
          usuario: req.body.usuario,
          mensaje: req.body.mensaje,
          fecha : fecha,
          hora: actual,
          usuario_registrado: true,
          imagen_usuario: user.imagen,
          id_post: post.id,
        })
       
        const usuario_comentarios = new Usuario_Comentario ({ id : id + 103, id_usuario: user.id, id_comentario: id })
        
          const notifiaciones = new Notificaciones ({
            id: id + 12 +3,
            nombre_admin: req.body.autor_post,
            nombre_remitente: req.body.usuario,
            url_publicacion: req.body.url_publicacion,
            fecha: fecha,
            hora: actual,
            mensaje: req.body.mensaje,
            imagen_remitente: user.imagen
          })
        
        await newComentario.save()
        await usuario_comentarios.save()
        await notifiaciones.save()

        res.status(200).send("Mensaje Agregado!")

      } else {
          const comentario = await Comentario.findOne({where : {id : id_comentario}})
          const usuario_comentario = await Usuario_Comentario.findOne({where : {id_comentario : id_comentario}})

          const mensajeNotificacion = req.body.mensaje.slice(0, 21)
      
          await comentario.update({
            id : id_comentario,
            usuario: req.body.usuario,
            mensaje: req.body.mensaje,
            fecha: comentario.fecha,
            hora: actual,
            usuario_registrado: comentario.usuario_registrado,
            imagen_usuario: comentario.imagen_usuario,
            id_post: comentario.id_post
          });
          
          const notifiaciones = new Notificaciones ({
            id: id + 12 +3,
            nombre_admin: req.body.autor_post,
            nombre_remitente: req.body.usuario,
            url_publicacion: req.body.url_publicacion,
            mensaje: mensajeNotificacion,
            hora: actual,
            fecha: fecha,
            imagen_remitente: req.body.imagen_usuario
          })

          await notifiaciones.save()

          res.status(200).send("Mensaje Actualizado!")
      }
       
    } catch (error) {
        console.log(error)
    }
  }

  const actualizarPost = async (req, res) => {
 
    const body = req.body;
    let {id, titulo, autor, imagen, fecha, contenido } = body;
    console.log(colors.bgCyan(body))
    
    if(typeof(contenido) === "string" ) {
      contenido = [contenido]
    }

    // si se cambio la imagen viene por el req.file, sino es undefined y no hay cambio
    const tituloURL = titulo.toLowerCase().replaceAll(" ","-")
    const newID = Date.now();


    try {

      let post = await Post.findOne({ where  : { id }})
    
      if(req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, { public_id : `blog-luz-de-luna/${newID}` }, 
        function (error, result) {console.log(result);});
      
        const { secure_url } = result;  
          
        const extraerImagen = post.imagen.split("/")
        const imagenId = extraerImagen[8].split(".")
        const publicId = `${ extraerImagen[7] }/${ imagenId[0] }`
        const resultEliminar = await cloudinary.uploader.destroy(`${ publicId }`, function(error, result) {
          console.log(result, error) 
        });
        
        console.log(colors.bgCyan(publicId))
          await post.update({
              titulo,
              fecha,
              autor: autor,
              imagen: req.file.path,
              contenido,
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
  
      console.log(colors.bgBlue("Publicacion Actualizada!!!"))
      return res.status(200).render("ok", {
        mensaje: "Publicación actualizada correctamente!"
      })
    

    } catch (error) {
      console.log(error)
      res.status(401).render("error", {
        error: 401
      })
      
    }
  } 
  

    const eliminarPost = async (req, res) => {
      console.log(colors.bgBlue(req.params.id))
     
      try {
        const deletePost = await Post.findOne({ where: { id: req.params.id } });
        const deleteComentarios = await Comentario.findOne({ where: { id_post:  req.params.id } });

        if(deleteComentarios) {
          //console.log(colors.bgCyan(deleteComentarios))
          const deleteUsuarioComentarios = await Usuario_Comentario.findOne({ where: { id_comentario: deleteComentarios.id} });
          //console.log(colors.bgGreen(deleteUsuarioComentarios))
          await deleteComentarios.destroy()
          await deleteUsuarioComentarios.destroy()
        }

         const extraerImagen = deletePost.imagen.split("/")

         // Por si la foto se llega a subir en la raiz de cloudinary [7], o si se sube bien en la carpeta blog-luz-de-luna
         const imagenId = extraerImagen[8] ? extraerImagen[8].split(".") : extraerImagen[7].split(".")
         const publicId = `${ extraerImagen[7] }/${ imagenId[0] }`
         const result = await cloudinary.uploader.destroy(`${ publicId }`, function(error, result) {
           console.log(result, error) 
         });
     
        await deletePost.destroy();

        res.status(200).render("ok", {
          mensaje: "Publicación eliminada correctamente!"
        })

      } catch (error) {
        console.log(error)
        res.status(400).render("error", {
          error: 404
        })
      }
    } 

  const eliminarComentario = async (req, res) => {
  
    try {
      const comentario = await Comentario.findOne({ where : { id: req.params.id }})
      const usuario_comentario = await Usuario_Comentario.findOne({ where : {id_comentario : req.params.id }})

 
      await comentario.destroy();
      if(usuario_comentario) {
        await usuario_comentario.destroy();
      }
      res.status(200).json({mensaje: "Mensaje Eliminado Correctamente"})
  
    } catch (error) {
      console.log(error)
    }
  }


  module.exports = {
    crearPost,
    actualizarPost,
    authAgregarComentario,
    eliminarPost,
    eliminarComentario,
    
  }

 