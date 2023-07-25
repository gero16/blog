import { getSesion, userPublic } from "./helpers/helpers-front.mjs"

const eliminarComentario = document.querySelectorAll(".eliminar-comentario")
const editarComentario = document.querySelectorAll(".editar-comentario")

const inputUsuario = document.querySelector(".input-user-name")
const inputComentario = document.querySelector(".comentario")
const inputAutor = document.querySelector(".autor-publicacion")

const btnAddComentario = document.querySelector(".btn-comentario")
const seccionComentarios = document.querySelector(".seccion-comentarios")

const urlPost = window.location.pathname
const tituloP = urlPost.split("/")

const imgUser = document.querySelector(".avatar-user")


const crearMensaje = (msg, anterior) => {
   const mensaje = document.createElement("span")
   mensaje.classList.add("alert")
   mensaje.textContent = msg
   anterior.appendChild(mensaje)
 
   setTimeout(() => {
     mensaje.remove()
   }, 6000)
} 

const urlActual = window.location.href
const adminPost = document.querySelector(".label-admin")

const postComentario = async (url, data) => {
   try {
      const fetchResponse = await (fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
               "Content-Type": "application/json",
            },
         })
       )
       console.log(fetchResponse)
       if(fetchResponse.ok === true) {
         console.log("Mensaje agregado Correctamente!")
         window.location.reload()
       }
       
   } catch (error) {
      console.log(error)
   }
}

btnAddComentario.addEventListener("click", async () => {

   const data = {
              usuario: inputUsuario.value,
              mensaje: inputComentario.value,
          autor_post : inputAutor.value,
      url_publicacion: getSesion ? tituloP[4] : tituloP[2],
               editar: false,
       imagen_usuario: userPublic ? `/img/avatar${userPublic[1]}.png` : imgUser.src,
   }

   let urlAgregarComentario = `${urlActual}/agregar-comentario`
   let urlEditarComentario =`${urlActual}/editar-comentario`

   if(inputComentario.value.length > 249) {
      console.log("Su mensaje es demasaido largo")
      crearMensaje("Su mensaje tiene mas de 250 caracteres", seccionComentarios)
      return 
   }
   
   const comentarioActions = document.querySelector(".comentario-actions")

   if(!btnAddComentario.classList.contains("editar-coment")){
      postComentario(urlAgregarComentario, data)

   } else {
      const idActualizar = comentarioActions.dataset.id;
      const data = {
                usuario: inputUsuario.value,
             autor_post: adminPost.textContent,
                mensaje: inputComentario.value,
             autor_post: inputAutor.value,
                 editar: true,
          id_comentario: idActualizar,
         imagen_usuario: imgUser.src,
      }
      postComentario(urlEditarComentario, data)
   }
})



// Eliminar comentario
if(getSesion && getSesion[3] === "ADMIN") {
   eliminarComentario.forEach(comentario => {
      comentario.addEventListener("click", () => {
         console.log(comentario.parentElement.dataset.id)
         const idComentario = comentario.parentElement.dataset.id
      
         const settings = { 
            method: 'POST', 
            headers: {
               Accept: 'application/json', 'Content-Type': 'application/json',
            }
         }
      
         const mandarInfo = async () => {
            let url = `/auth/admin/${ getSesion[1] }/publicaciones/${ tituloP[4] }/eliminar-comentario/${ idComentario }`
            try {
               const fetchResponse = await fetch(url, settings);
                if(fetchResponse.status === 200) {
                  console.log("Mensaje eliminado Correctamente!")
                  window.location.reload()
                }
                
            } catch (error) {
               console.log(error)
            }
         }
         mandarInfo()
      })   
   });
}

// Editar Comentario
if(getSesion && getSesion[3] === "ADMIN") {
   editarComentario.forEach(comentario => {
      comentario.addEventListener("click", () => {
         const idComentario = comentario.parentElement.dataset.id
         const mensajeComentario = comentario.parentElement.previousElementSibling
         
         if(idComentario == mensajeComentario.dataset.id){
            inputComentario.value = mensajeComentario.textContent
            btnAddComentario.classList.add("editar-coment")
         }
        
      })   
   });
}


if(userPublic) {
   console.log("User public")
   imgUser.src = `/img/avatar${userPublic[1]}.png`
 }

