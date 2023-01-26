
let autorHTML = document.querySelector(".strong-autor-post");
let textoHTML = document.querySelector(".texto-post");
let tituloHTML = document.querySelector(".titulo-post")
let subtituloHTML = document.querySelector(".subtitulo-post");
let imagenHTML = document.querySelector(".foto-post");
const btnEditar = document.querySelector(".editar")
const iconosEditar = document.querySelectorAll(".ico-editar")


const inputs = document.querySelectorAll(".inputs")
const btnActualizar = document.querySelector(".actualizar")
const btnGuardar = document.querySelectorAll(".guardar")

const eliminarComentario = document.querySelectorAll(".eliminar-comentario")
const editarComentario = document.querySelectorAll(".editar-comentario")

let actualizarHTML = "";
let etiquetaContenido = [];

const url = window.location.href;
console.log(url)

const inputUsuario = document.querySelector(".input-user-name")
const inputComentario = document.querySelector(".comentario")
const btnAddComentario = document.querySelector(".btn-comentario")

const urlPost = window.location.pathname
const tituloP = urlPost.split("/")
console.log(tituloP)
const tituloPost = tituloP[4]

const imgUser = document.querySelector(".avatar-user")
const userPublic = JSON.parse(localStorage.getItem("imagen"));

window.onload = async function () {
 
   const sesion = JSON.parse(localStorage.getItem('sesion'));
   if(sesion) {
      const [user, email, token, rol] = sesion;
      console.log(sesion)

   }
}

if(userPublic) {
   console.log(userPublic[1])
   imgUser.src = `/../img/avatar${userPublic[1]}.png`
 }

const urlActual = window.location.href

const adminPost = document.querySelector(".label-admin")
console.log(adminPost)

btnAddComentario.addEventListener("click", async () => {
   let imagen_usuario = " ";
   const data = {
      usuario: inputUsuario.value,
      autor_post: adminPost.textContent,
      mensaje: inputComentario.value,
      url_publicacion: tituloPost,
      editar: false,
      imagen_usuario: userPublic ? `/../img/avatar${userPublic[1]}.png` : " ",
   }

   let url = `${urlActual}/agregar-comentario`
   
   const comentarioActions = document.querySelector(".comentario-actions")
   if(!btnAddComentario.classList.contains("editar-coment")){

    
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
   } else {
      const idActualizar = comentarioActions.dataset.id;
      const data = {
         usuario: inputUsuario.value,
         autor_post: adminPost.textContent,
         mensaje: inputComentario.value,
         editar: true,
         id_comentario: idActualizar
      }

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
          if(fetchResponse.status === 200) {
            console.log("Mensaje Actualizado Correctamente!")

            window.location.reload()
          }
          
      } catch (error) {
         console.log(error)
      }
   }
})



eliminarComentario.forEach(comentario => {
   const sesion = JSON.parse(localStorage.getItem('sesion'));
   const admin = sesion[1]

   comentario.addEventListener("click", () => {
      console.log(comentario.parentElement.dataset.id)
      const idComentario = comentario.parentElement.dataset.id
   
      const settings = {
         method: 'POST',
         headers: {
           Accept: 'application/json',
             'Content-Type': 'application/json',
           }
         };
         
      const mandarInfo = async () => {
         try {
            const fetchResponse = await fetch(`/auth/${ admin }/publicaciones/${ tituloPost}/eliminar-comentario/${ idComentario }`, settings);
           
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

editarComentario.forEach(comentario => {
   const sesion = JSON.parse(localStorage.getItem('sesion'));
   const admin = sesion[1]

   comentario.addEventListener("click", () => {
      const idComentario = comentario.parentElement.dataset.id
      console.log(comentario.parentNode.parentElement.children[2])
      inputComentario.value = comentario.parentNode.parentElement.children[2].textContent
      btnAddComentario.classList.add("editar-coment")
   })   
});