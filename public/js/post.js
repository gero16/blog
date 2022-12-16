
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

const btnLogout = document.querySelector(".logout")

btnLogout.addEventListener("click", () => {
   localStorage.removeItem('sesion')
   window.location.href="/"
})

window.onload = async function () {
   // await traerDatos();
   const sesion = JSON.parse(localStorage.getItem('sesion'));
   if(sesion) {
      const [user, email, token, rol] = sesion;
      console.log(sesion)

   }
 

   const enviarToken = () => {
      const getSesion = JSON.parse(localStorage.getItem('sesion'));
      const token = getSesion[2]
      const usuario = getSesion[1]

      const myHeader = new Headers({
         'auth-token': `BEARER-${ token }`,
         });

         const myInit = { 
            method: 'GET',
            headers: myHeader,
            mode: 'cors',
            cache: 'default' };
 
 
      const myRequest = new Request(`/auth/${usuario}/editar/one-piece`, myInit);
   
      fetch(myRequest)
         .then (response => response.json())
         .then (data => {
         console.log(data)
      })
   }
   enviarToken()
}

btnComentario.addEventListener("click", async () => {
   const urlActual = window.location.href
   let url = `${urlActual}/agregar-comentario`

   const data = {
      usuario: inputUsuario.value,
      mensaje: inputComentario.value
   }
   
   try {
      await (
         await fetch(url, {
           method: "POST",
           body: JSON.stringify(data),
           headers: {
             "Content-Type": "application/json",
           },
         })
       ).json();
   } catch (error) {
      console.log(error)
   }
})

const editar = document.querySelector(".editar")
editar.addEventListener("click", (e) => {
   console.log(e)
   const getSesion = JSON.parse(localStorage.getItem('sesion'));
   const token = getSesion[2]
   const usuario = getSesion[1]
  
   const myHeader = new Headers({
      'auth-token': `BEARER-${ token }`,
      });

      const myInit = { 
         method: 'GET',
         headers: myHeader,
         mode: 'cors',
         cache: 'default' };


   const myRequest = new Request(`/auth/${usuario}/editar/one-piece`, myInit);

   fetch(myRequest)
      .then (response => response.json())
      .then (data => {
      console.log(data)
     
   })
})
     

 
