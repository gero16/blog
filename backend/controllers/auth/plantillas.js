const { Post, Usuario, Usuario_Sesion, Comentario } = require("../../models/model.js")
const { generarJWT } = require("../../helpers/generar-jwt.js");
const { generarToken } = require ("../../../account_transport.json");
const { emailRegistro } = require('../../helpers/emailRegistro');

const bcryptjs = require('bcryptjs');
const colors = require('colors');


const indexPrincipal = async (req, res) => {

  try {
    const registros = await Post.findAll()
    const titulo = "Espacio Luz de Luna"
    res.render("index/index", {
        registros: registros, titulo
      })
  } catch (error) {
    console.log(error)
  }}

const perfil = async (req, res) => {
  let arrayRegistros = []  

  try {
    const user = await Usuario.findOne({where: {usuario: req.params.user}})
    // console.log(colors.bgRed(user.dataValues))
   const titulo = "Perfil"
    res.render("perfil", {
      usuario: user.usuario,
      correo: user.correo,
      name: user.nombre,
      imagen: user.imagen,
      titulo,
    })
  } catch (error) {
    console.log(error)
  }
  
}

const indexPlantilla = async (req, res) => {

  console.log("Estoy en index Plantilla") 
  const usuario = req.params.user
  console.log(colors.bgBlue(usuario))
  const titulo = "Espacio Luz de Luna"
  try {

    const registros = await Post.findAll()

    const user = await Usuario.findOne({ where: { usuario }})
    if(user){
      const reduceName = user.nombre.split(" ")
            const miniName = reduceName[0]
            if(user.rol === "ADMIN") {
              res.render("index/indexAdmin", {
                    url: `/publicaciones/${registros.titulo}`,
                    registros: registros,
                    miniName: miniName,
                    usuario: user.usuario,
                    correo: user.correo,
                    name: user.nombre,
                    rol: user.rol,
                    titulo,
                })
            
            } else {
                res.render("index/indexUser", {
                      url: `/publicaciones/${registros.titulo}`,
                      registros: registros,
                      miniName: miniName,
                      usuario: user.usuario,
                      correo: user.correo,
                      name: user.nombre,
                      rol: user.rol,
                      titulo,
                      })
                    } 
    }
  } catch (error) {
    console.log(error)
  } 
}

const crearPostPlantilla = async (req, res) => {
  console.log(colors.bgCyan("crear post"))
  const date =  new Date();
  const month = date.getMonth()+1; //obteniendo mes
  const day = date.getDate(); //obteniendo dia
  const year = date.getFullYear(); //obteniendo año
  const fecha = `${day}/${month}/${year}`
  console.log(fecha)
  console.log(req.user)
  try {
    const titulo = "Crear Publicación"
    res.status(200).header("auth-token", req.user).render("crear", {
      usuario: req.params.admin,
      fecha: fecha,
      titulo,
})
  } catch (error) {
    console.log(error)
  }
}
    
const postPlantilla =  async (req, res) => {
  const url = req.params.titulo
  console.log(req.body)


  try {
    const datos = await Post.findOne({where: {url}})
    const {id, titulo, contenido, imagen, autor, fecha, tokenSesion}  = datos

    

    res.status(200).header("auth-token", tokenSesion).render("post/publicPost", {
      url,
      id: id,
      url,
      titulo: titulo,
      contenido: contenido,
      imagen: imagen,
      autor: autor,
      fecha: fecha,
  })
  } catch (error) {
    console.log(error)
  }
}

const authPostPlantilla =  async (req, res) => {
 
    const usuario = req.params.user
    const url = req.params.titulo
    let arrayComentarios = []
    try {
      
      const datos = await Post.findOne({where: {url}})
      
      if(datos){
        const {id, titulo, contenido, imagen, autor, fecha}  = datos

        const user = await Usuario.findOne({ where: {usuario} })
         
        const comentarios = await Comentario.findAll({where : {id_post : id}});
      
        const reduceName = user.nombre.split(" ")
        const miniName = reduceName[0]
   
        if(user.rol == "ADMIN") {
            console.log("En Admin")
            res.render("post/adminPost", {
              id: id,
              usuario,
              url : url,
              titulo: titulo,
              miniName: miniName,
              contenido: contenido,
              imagen: imagen,
              autor: autor,
              fecha: fecha,
              comentarios: comentarios,
          })
        } else {
            res.render("post/userPost", {
              id: id,
              usuario,
              url : url,
              titulo: titulo,
              contenido: contenido,
              miniName: miniName,
              imagen: imagen,
              autor: autor,
              fecha: fecha,
              comentarios: comentarios,
          })
      } 
      }
     
  } catch (error) {
    console.log(error) 
  }
}

const eliminarPlantilla = async (req, res) => {
  const url = req.params.titulo

  
  const data = await Post.findOne({where: { url }})
  const {id, titulo, imagen} = data;
    res.render("eliminar", {
      usuario: req.params.admin,
      id: id,
      titulo: titulo,
      imagen: imagen,
    })
}

const editarPostPlantilla = async (req, res) => {
  console.log(colors.bgBlue("En editarPost Plantilla"))
  try {  
    console.log(colors.bgBlue(req.params))
    const user = req.params.admin
    const title = req.params.titulo

    const data = await Post.findOne({where: { url: title }})

    if(data){
    const {id, titulo, contenido, imagen, autor, fecha} = data;
    console.log(imagen)
    
    const image = imagen.split("https://res.cloudinary.com/geronicola/image/upload/")
    console.log(image)
    // Puede que no la haya subido a cloudinary
      if(image[1]){
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
        })
      } else {
        res.render("editar", {
          id: id,
          url: title,
          titulo: titulo,
          contenido: contenido,
          imagenMin: "imagen",
          imagen: imagen,
          usuario: user,
          autor: autor,
          fecha: fecha,
        })
      }
  

   
  } else {
    return
  }
  
  } catch (error) {
      console.log(colors.red(error))
  }
}
const errorPlantilla = (req, res) => {
 
  res.render("error")
}



module.exports = {
    indexPrincipal,
    perfil,
    crearPostPlantilla,
    indexPlantilla,
    postPlantilla,
    authPostPlantilla,
    eliminarPlantilla,
    editarPostPlantilla,
    errorPlantilla

}