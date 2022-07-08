// Una vez agregue esta linea sin usarla siquiera, recien me creo la BD
const Post = require("../models/post-models");
const CrearPost = require("../models/crear-posts");
const colors = require('colors')
const path = require("path");

const cloudinary = require("cloudinary").v2;
const fs = require("fs-extra");
require("multer");

cloudinary.config({
  cloud_name: "geronicola",
  api_key: "193984666672594",
  api_secret: "9uOiJVywMUJBjllIpWmrxTj77Hg",
  secure: true,
});

const traerPublicaciones = async (req, res) => {
  try {
     // Traer todos las Publicaciones
    const registros = await Post.find().exec();

    return res.status(200).json({
      registros,
    });

  } catch (error) {
    console.log(error)
  }
}

const crearPost = async (req, res) => {
  console.log(req.body);
  const body = req.body;
  const { titulo, contenido, autor, imagen, fecha, etiquetas} = body;
  let tituloURL = titulo.toLowerCase().replaceAll(" ","-")

  const id = Date.now();

  const result = await cloudinary.uploader.upload(
    req.file.path,
    { public_id: `${id}` },
    function (error, result) {
      console.log(result);
    }
  );

  console.log(id);
  const {secure_url} = result;
  const nuevoPost = new Post({
    id,
    titulo,
    fecha,
    autor: autor,
    contenido: etiquetas,
    imagen: secure_url,
    url: tituloURL
  });

  await nuevoPost.save();

  // Este va a ser la referencia para tener el solo el id
  const newPost = new CrearPost({
    id,
    url: tituloURL
  });

  await newPost.save();
  
  res.redirect(`/:${tituloURL}`);
  return tituloURL;
};

const traerPost = (req, res) => {

  setTimeout(async () => {
    // Hay un solo registro, el que tengo cuando creo y luego se elimina
    const reg = await CrearPost.find().exec();
    
    if (reg === true) {
      let [registro] = reg;
      let {id } = registro;
      let msg = "Registros Encontrados";

      await CrearPost.findOneAndDelete({ id: id });

      const datos = await Post.find({ id: id }).exec();
  

      return res.status(200).json({
        msg,
        datos,
      });
    } else {
      msg = "No existen registros";
    }

  }, 1500);
};

const posteo =  async (req, res) => {
  console.log(colors.bgBlue("Primera Iteracion"))
  console.log("hola1")
  try {
    const url = req.params.titulo.split(":")
    console.log(url);
    const datos = await Post.find({ url: url[1] }).exec();
    console.log("hola2");
    console.log(datos);
    const [{id, titulo, contenido, imagen, autor, fecha}] = datos;
    console.log(contenido);
  
    
    res.render("post", {
        id: id,
        url : url[1],
        titulo: titulo,
        contenido: contenido,
        imagen: imagen,
        autor: autor,
        fecha: fecha,
  })
  
  console.log(colors.bgBlue("ultima interacion"))
  } catch (error) {
    console.log(error) 
  }

  
}

const editarPost = async (req, res) => {
    const body = req.body;

    const {id, titulo, contenido, autor, imagen, fecha, etiquetas} = body;
/*
    let tituloURL = titulo.toLowerCase().replaceAll(" ","-")
    */

    const post = await Post.findOneAndUpdate({id: id});
    console.log(post)
    
    res.redirect(`/:${tituloURL}`);
}

module.exports = {
  traerPublicaciones,
  crearPost,
  traerPost,
  posteo,
  editarPost
};
