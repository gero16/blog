
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

let actualizarHTML = "";
let etiquetaContenido = [];

const url = window.location.href;

const inputUsuario = document.querySelector(".input-user-name")
const inputComentario = document.querySelector(".comentario")
const btnComentario = document.querySelector(".btn-comentario")


window.onload = async function () {
 
   const sesion = JSON.parse(localStorage.getItem('sesion'));
   if(sesion) {
      const [user, email, token, rol] = sesion;
      console.log(sesion)

   }
}

btnComentario.addEventListener("click", async () => {
   const urlActual = window.location.href
   let url = `${urlActual}/agregar-comentario`

   const data = {
      usuario: inputUsuario.value,
      mensaje: inputComentario.value
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
       if(fetchResponse.ok === true) {
         console.log("Mensaje agregado Correctamente!")
         window.location.reload()
       }
       
   } catch (error) {
      console.log(error)
   }
})


 
