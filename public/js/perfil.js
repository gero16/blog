const inputFoto = document.querySelector("#imagen-perfil");
const perfilImagen = document.querySelector(".perfil-imagen")


console.log(inputFoto)
inputFoto.addEventListener("change", (e) => {
  console.log(e)
  // Esto le hago para poner manualmente el nombre de la foto a la derecha del "input"
  const nameFoto = e.target.files[0].name;
  console.log(nameFoto)
  document.querySelector(".span-foto").innerHTML = nameFoto;

  // Como no se me muestra completa la url, me creo una propia para poder usarla en el preview
  const archivos = inputFoto.files;
  const primerArchivo = archivos[0];
  const objectURL = URL.createObjectURL(primerArchivo);
  console.log(objectURL);
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
   
  

