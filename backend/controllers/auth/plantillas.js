const { Post, Usuario, Usuario_Sesion, Comentario } = require("../../model/model.js")
const { generarJWT } = require("../../helpers/generar-jwt.js");
const { generarToken } = require ("../../../account_transport.json");
const { emailRegistro } = require('../../helpers/emailRegistro');

const bcryptjs = require('bcryptjs');
const colors = require('colors');


const indexPrincipal = async (req, res) => {
  let arrayRegistros = []

  try {
    const registros = await Post.findAll()

    registros.forEach(element => {
      arrayRegistros.push(element.dataValues)
    });

    const {url, imagen, fecha, titulo, contenido} = arrayRegistros
  
    res.render("index/index", {
        registros: registros,
                    imagen,
                    fecha,
                    titulo,
                    url, 
                    contenido,
                  })
  } catch (error) {
    console.log(error)
  }}

const perfil = async (req, res) => {
  let arrayRegistros = []  

  try {
    const user = await Usuario.findOne({where: {usuario: req.params.user}})
    console.log(colors.bgRed(user.dataValues))
  
    res.render("perfil", {
      usuario: user.dataValues.usuario,
      correo: user.dataValues.correo,
      name: user.dataValues.nombre,
      imagen: user.dataValues.imagen
    })
  } catch (error) {
    console.log(error)
  }
  
}

const indexPlantilla = async (req, res) => {
  let arrayRegistros = []   

  console.log("Estoy en index Plantilla") 
  const usuario = req.params.user
  try {

    const registros = await Post.findAll()

    registros.forEach(element => {
      arrayRegistros.push(element.dataValues)
    });
            const user = await Usuario.findOne({ where: { usuario }})
      
            const existeUsuario = user.dataValues
            const reduceName = existeUsuario.nombre.split(" ")
            const miniName = reduceName[0]
            //console.log(colors.bgBlue(arrayRegistros))
            if(existeUsuario.rol === "ADMIN") {
                res.render("index/indexAdmin", {
                    url: `/publicaciones/${existeUsuario.usuario}/${arrayRegistros.titulo}`,
                    registros: arrayRegistros,
                    miniName: miniName,
                    usuario: existeUsuario.usuario,
                    correo: existeUsuario.correo,
                    name: existeUsuario.nombre,
                    token: existeUsuario.token_sesion,
                    rol: existeUsuario.rol,
                })
                
            
            } else {
                console.log("En User")  
                    res.render("index/indexUser", {
                        url: `/publicaciones/${titulo}`,
                        registros: arrayRegistros,
                        miniName: miniName,
                        usuario: existeUsuario.usuario,
                        correo: existeUsuario.correo,
                        name: existeUsuario.nombre,
                        token: existeUsuario.token_sesion,
                        rol: existeUsuario.rol,
                      })
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
  try {
  
    res.status(200).render("crear", {
      usuario: req.params.admin,
      fecha: fecha,
})
  } catch (error) {
    console.log(error)
  }
}
    
const postPlantilla =  async (req, res) => {
  const url = req.params.titulo
  
  try {
    // NO SE PORQUE FUNCIONA ESTO CON MONGOOSE SI ESTOY USANDO SEQUELIZE
    const datos = await Post.findOne({where: {url}})
    const {id, titulo, contenido, imagen, autor, fecha}  = datos.dataValues

    res.render("post/publicPost", {
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
 
    const usuario = req.params.admin
    const url = req.params.titulo
    let arrayComentarios = []
    try {
      
      const datos = await Post.findOne({where: {url}})
      
      if(datos){
        const {id, titulo, contenido, imagen, autor, fecha}  = datos.dataValues

        const user = await Usuario.findOne({ where: {usuario} })
        const tokens = await Usuario_Sesion.findOne({where : {id_usuario : user.dataValues.id}})
        
        console.log(colors.bgRed(tokens))
        const comentarios = await Comentario.findAll({where : {id_post : id}});
        comentarios.forEach(element => {
         arrayComentarios.push(element.dataValues)
        });
    
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
              comentarios: arrayComentarios,
              token: tokens.dataValues.token,
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
              comentarios: arrayComentarios,
              token: tokens.dataValues.token,
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
  const datos = data.dataValues

  const {id, titulo, imagen} = datos;
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
    const datos = data.dataValues

    if(datos){
 
    const {id, titulo, contenido, imagen, autor, fecha} = datos;
    
    const image = imagen.split("https://res.cloudinary.com/geronicola/image/upload/")
    const img = image[1].split("/");

    res.render("editar", {
      id: id,
      url: title,
      titulo: titulo,
      contenido: contenido,
      imagenMin: img[1],
      imagen: imagen,
      usuario: user,
      autor: autor,
      fecha: fecha,
    })
  } else {
    return
  }
  
  } catch (error) {
      console.log(colors.red(error))
  }
}



module.exports = {
    indexPrincipal,
    perfil,
    crearPostPlantilla,
    indexPlantilla,
    postPlantilla,
    authPostPlantilla,
    eliminarPlantilla,
    editarPostPlantilla

}