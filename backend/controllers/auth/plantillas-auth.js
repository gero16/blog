const { Post, Usuario, Comentario, Admin_Post, Notificaciones } = require("../../models/model.js")

const colors = require('colors');

const perfilPlantilla = async (req, res) => {
  

  try {
    const user = await Usuario.findOne({where: {usuario: req.params.user}})
    const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : req.params.user }});
    
    // console.log(colors.bgRed(notificaciones))
    const notificacion_sinleer = notificaciones.filter(notificacion => notificacion.leida === false)
    const notificacionesOrdenadas = notificaciones.reverse()
    const titulo = "Perfil"
   if(user.rol === "ADMIN") {
  
    res.render("perfil/perfilAdmin", {
      usuario: user.usuario,
      correo: user.correo,
      name: user.nombre,
      imagen: user.imagen,
      titulo,
      notificaciones: notificacionesOrdenadas,
      notificacion_sinleer,
      cantidad_notificaciones : notificacion_sinleer.length
    })

   } else {
    console.log("Es usuario")
    res.render("perfil/perfilUser", {
      usuario: user.usuario,
      correo: user.correo,
      name: user.nombre,
      imagen: user.imagen,
      titulo,
    })
   }

  } catch (error) {
    console.log(error)
  }
  
}

const indexPlantilla = async (req, res) => {

  const usuario = req.params.user
  const titulo = "Espacio Luz de Luna"
  try {

    const registros = await Post.findAll({
      order: [
        ['id', 'DESC'],
    ],
  });
  
    const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : req.params.user }});
    const notificacionesOrdenadas = notificaciones.reverse()

    const notificacion_sinleer = notificaciones.filter(notificacion => notificacion.leida === false)
    //console.log(colors.bgBlue(notificacion_sinleer))

    const user = await Usuario.findOne({ where: { usuario }})

    
    
    if(user){

      const reduceName = user.nombre.split(" ")
            const miniName = reduceName[0]
            if(user.rol === "ADMIN") {
              res.render("index/indexAdmin", {
                    registros: registros,
                    miniName: miniName,
                    usuario: user.usuario,
                    correo: user.correo,
                    name: user.nombre,
                    rol: user.rol,
                    titulo,
                    notificaciones: notificacionesOrdenadas,
                    notificacion_sinleer,
                    cantidad_notificaciones : notificacion_sinleer.length
                })
            
            } else {
                res.render("index/indexUser", {
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
  // Traaer informacion sobre si se valido el token de validate-token

  const date =  new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0'); //obteniendo mes
  const day = String(date.getDate()).padStart(2, '0'); //obteniendo dia
  const year = date.getFullYear(); //obteniendo año
  const fecha = `${year}-${month}-${day}`

  const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : req.params.admin }});
  const notificacionesOrdenadas = notificaciones.reverse()

  const notificacion_sinleer = notificaciones.filter(notificacion => notificacion.leida === false)

  try {
    const titulo = "Crear Publicación"
    res.status(200).header("auth-token", req.user).render("crear", {
      usuario: req.params.admin,
      fecha: fecha,
      titulo,
      notificaciones: notificacionesOrdenadas,
      notificacion_sinleer,
      cantidad_notificaciones : notificacion_sinleer.length
})
  } catch (error) {
    console.log(error)
  }
}

const  userPostPlantilla =  async (req, res) => {

    const usuario = req.params.user
    const url = req.params.titulo

    try {
      const datos = await Post.findOne({ where: { url }})

      if(datos) {
        const {id, titulo, contenido, imagen, autor, fecha}  = datos

        const user = await Usuario.findOne({ where: {usuario} })

        const post_admin = await Admin_Post.findOne({where : { id_post : datos.id }})
        const admin = await Usuario.findOne({ where: { id : post_admin.id_admin } })
         
        const comentarios = await Comentario.findAll({where : {id_post : id}});
        
        const reduceName = user.nombre.split(" ")
        const miniName = reduceName[0]
        let numComentarios = 0;

        if(comentarios.length > 1) {
         numComentarios = comentarios.length +1
        }
        
        const separar = fecha.split("-")
        const date = [separar[2], separar[1], separar[0]]
        const newDate = date.join("-")

        res.render("post/postUser", {
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
          usuario_perfil: user.imagen,
          numComentarios: numComentarios,
          admin_post : admin.usuario,
        })
      } 
  } catch (error) {
    console.log(error) 
  } 
}

const adminPostPlantilla = async (req, res) => {
  const usuario = req.params.admin
  const url = req.params.titulo
  try {
      
    const datos = await Post.findOne({ where: { url }})
    const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : usuario }});
     const notificacionesOrdenadas = notificaciones.reverse()
    const notificacion_sinleer = notificaciones.filter(notificacion => notificacion.leida === false)

    if(datos) {
      const {id, titulo, contenido, imagen, autor, fecha}  = datos

      const user = await Usuario.findOne({ where: { usuario } })

      const post_admin = await Admin_Post.findOne({where : { id_post : datos.id }})
      const admin = await Usuario.findOne({ where: { id : post_admin.id_admin } })
       
      const comentarios = await Comentario.findAll({where : {id_post : id}});
      
      const reduceName = user.nombre.split(" ")
      const miniName = reduceName[0]
      let numComentarios = 0;

      if(comentarios.length > 1) {
       numComentarios = comentarios.length +1
      }
      
      const separar = fecha.split("-")
      const date = [separar[2], separar[1], separar[0]]
      const newDate = date.join("-")

          res.render("post/postAdmin", {
            id: id,
            usuario,
            url : url,
            titulo: titulo,
            miniName: miniName,
            contenido: contenido,
            imagen: imagen,
            autor: autor,
            fecha: newDate,
            comentarios: comentarios,
            usuario_perfil: user.imagen,
            numComentarios: numComentarios,
            admin_post : admin.usuario,
            notificaciones: notificacionesOrdenadas,
            notificacion_sinleer,
            cantidad_notificaciones : notificacion_sinleer.length
        })
    }
   
} catch (error) {
  console.log(error) 
} 
} 

const eliminarPlantilla = async (req, res) => {
  const url = req.params.titulo

  const data = await Post.findOne({where: { url }})
  const { id, titulo, imagen } = data;

  const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : req.params.admin }});
  const notificacion_sinleer = notificaciones.filter(notificacion => notificacion.leida === false)

    res.render("eliminar", {
      usuario: req.params.admin,
      mensaje: `Desea borrar la Publicación: `,
      destino: `${ titulo }`,
      id: id,
      titulo: titulo,
      imagen: imagen,
      notificaciones,
      notificacion_sinleer,
      cantidad_notificaciones : notificacion_sinleer.length
    })
}

const editarPostPlantilla = async (req, res) => {

  try {  
    const user = req.params.admin
    const title = req.params.titulo

    const data = await Post.findOne({where: { url: title }})

    const notificaciones = await Notificaciones.findAll({where : { nombre_admin  : user }});
    const notificacion_sinleer = notificaciones.filter(notificacion => notificacion.leida === false)

    let orden = {
      primer: "vacio",
      segundo: "vacio",
      tercero: "vacio",
      cuarto: "vacio",
      quinto: "vacio",
      sexto: "vacio",
      septimo: "vacio",
      octavo: "vacio",
      noveno: "vacio",
      decimo: "vacio",
      decimoPrimero: "vacio",
      decimoSegundo: "vacio"
    }
    
    if(data){
      const {id, titulo, contenido, imagen, autor, fecha} = data;
    
      const newOrden = {}

      let valores = Object.values(orden)
      let keys = Object.keys(orden)
      
      for(let i=0; i< valores.length; i++){
      
        if(valores[i] === "vacio" && contenido[i]) {
          let key = keys[i]
          newOrden[key] = contenido[i]
          //return nuevoContenido
        }
        
   }
    
    if(imagen){
      const image = imagen.split("https://res.cloudinary.com/geronicola/image/upload/")
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
            nuevoContenido: newOrden,
            notificaciones,
            notificacion_sinleer,
            cantidad_notificaciones : notificacion_sinleer.length
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
            nuevoContenido: newOrden,
            notificaciones,
            notificacion_sinleer,
            cantidad_notificaciones : notificacion_sinleer.length
          })
        }
    } else {
      res.render("editar", {
        id: id,
        url: title,
        titulo: titulo,
        contenido: contenido,
        usuario: user,
        autor: autor,
        fecha: fecha,
        nuevoContenido: newOrden,
        notificaciones,
        notificacion_sinleer,
        cantidad_notificaciones : notificacion_sinleer.length
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
  const { mensaje } = req.body;
  res.status(401).render("error", {
    error: 401,
    mensaje: mensaje,
  })
}

const olvidePasswordPlantilla = (req, res) => {
  res.render("recuperar-password", {
    mensaje: "Recuperar Cuenta",
    mensajeP: "Introduzca su correo electrónico para buscar tu cuenta."
  })
 
}

const cambiarPassword = (req, res) => {
  res.render("recuperar-password", {
    mensaje: "Cambiar Contraseña",
    mensajeP: "Introduzca su correo electrónico para poder cambiar su contraseña."
  })
}

const errorTokenPlantilla = (req, res) => {


  res.status(401).render("error", {
   
  })
}

const usuariosPlantilla = async (req, res) => {
  const { admin } = req.params
  const usuarios = await Usuario.findAll()
  const user = await Usuario.findOne({where : { usuario : admin}})

  res.status(200).render("users", {
      usuario: user.usuario,
      usuarios: usuarios,
    })
  }


const eliminarUsuarioPlantilla = async (req, res) => {
  const user = await Usuario.findOne({ where: { usuario : req.params.user } })
  console.log(colors.bgBlue(user))
  const { id } = user;
  
  res.render("eliminar", {
    usuario: req.params.admin,
    mensaje: `Esta seguro que desea eliminar el Usuario: `,
    destino: `${ req.params.user }`,
    id: id,
  })
}


module.exports = {
    perfilPlantilla,
    crearPostPlantilla,
    indexPlantilla,
    adminPostPlantilla,
    userPostPlantilla,
    eliminarPlantilla,
    editarPostPlantilla,
    errorPlantilla,
    olvidePasswordPlantilla,
    cambiarPassword,
    errorTokenPlantilla,
    usuariosPlantilla,
    eliminarUsuarioPlantilla,
}