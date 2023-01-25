const inputFoto = document.querySelector("#imagen-perfil");
const perfilImagen = document.querySelector(".perfil-imagen")


inputFoto.addEventListener("change", (e) => {
  inputFoto.classList.remove("vacio");
  const nameFoto = e.target.files[0].name;
  document.querySelector(".span-foto").innerHTML = nameFoto;

  // Como no se me muestra completa la url, me creo una propia para poder usarla en el preview
  const archivos = inputFoto.files;
  const primerArchivo = archivos[0];
  const objectURL = URL.createObjectURL(primerArchivo);
  console.log(objectURL);
  perfilImagen
  perfilImagen.src = objectURL;
});

const actualizarInfo = document.querySelector(".actualizar-datos-perfil")
const editarPerfil = document.querySelector(".editar-perfil")
const listaPerfil = document.querySelector(".lista-perfil")
const volverMostrarPerfil = document.querySelector(".volver-mostrar-info")

actualizarInfo.addEventListener("click", () => {
  editarPerfil.classList.remove("display-none")
  volverMostrarPerfil.classList.remove("display-none")

  listaPerfil.classList.add("display-none")
  actualizarInfo.classList.add("display-none")

})

volverMostrarPerfil.addEventListener("click", () => {
  listaPerfil.classList.remove("display-none")
  actualizarInfo.classList.remove("display-none")
  
  editarPerfil.classList.add("display-none")
  volverMostrarPerfil.classList.add("display-none")

})
   
  

const cambiarFoto = document.querySelector(".cambiar-foto")
/*
const inputCambiarFoto = document.querySelector(".input-foto")
const labelCambiarFoto = document.querySelector(".label-foto")
const spanCambiarFoto = document.querySelector(".span-foto")
const btnCambiarFoto = document.querySelector(".btn-cambiar-foto")
*/
const liCambiarFoto = document.querySelector(".li-cambiar-foto")
const liBtnCambiarFoto = document.querySelector(".li-btn-cambiar-foto")

cambiarFoto.addEventListener("click", () => {
  editarPerfil.classList.remove("display-none")
  volverMostrarPerfil.classList.remove("display-none")

  listaPerfil.classList.add("display-none")
  actualizarInfo.classList.add("display-none")
})


const btnRecuperarPassword = document.querySelector(".recuperar-password")
btnRecuperarPassword.addEventListener("click", async () => {

  const data = {

  }
  /*
  const settings = {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        body: ""
    }};
  try {
    const fetchResponse = await fetch(`/auth/olvide-password`, settings);
    console.log(fetchResponse)
    if(fetchResponse.ok == true) {
      window.location.href = "/"
    }
   
  
  } catch (error) {
    console.log(error)
  }
  */

})