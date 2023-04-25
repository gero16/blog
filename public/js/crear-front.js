import { agregar, agregarParrafo, agregarSubtitulo, btnAgregarParrafo, btnAgregarSub, btnPrevisualizarCrear, divAgregarInputs, enviarPost, formulario, inputAutor, inputContenido, 
 inputFecha, inputFoto, inputTitulo, preAutor, preContenido, preFecha, preFoto, preTitulo, previsualizar, terminarContenido } from "./helpers-front.mjs";

btnAgregarParrafo.addEventListener("click", agregarParrafo)

btnAgregarSub.addEventListener("click", agregarSubtitulo)


inputFoto.addEventListener("change", (e) => {
  // Esto le hago para poner manualmente el nombre de la foto a la derecha del "input"
  inputFoto.classList.remove("vacio");
  const nameFoto = e.target.files[0].name;
  document.querySelector(".span-foto").innerHTML = nameFoto;

  // Como no se me muestra completa la url, me creo una propia para poder usarla en el preview
  const archivos = inputFoto.files;
  const primerArchivo = archivos[0];
  const objectURL = URL.createObjectURL(primerArchivo);
  console.log(objectURL);
  preFoto.style.display = "block";
  preFoto.src = objectURL;
});


// CAPAZ QUE PRECISO UN MODO EDICION = FALSE, en crear, para tener en cuenta los editar mientras creo, que afectarian solo a la previsualizacion
btnPrevisualizarCrear.addEventListener("click", previsualizar)


const btnQuitarContenido = document.querySelectorAll(".btn-quitar-contenido")
btnQuitarContenido.forEach(elementoQuitar => {
  elementoQuitar.addEventListener("click", (e) => {
    let claseOrden = e.target.classList[0]
    const liPadre = document.querySelector(`.li-${claseOrden}`)

    reiniciarOrden(claseOrden)
  })
});

let inputsContenidoPost = document.querySelectorAll(".inputs-contenido-post")
// Solo cambia el PREVIEW
inputsContenidoPost.forEach(element => {
  element.addEventListener("change", () => {
   console.log(element.name) 
   console.log(element.value) 
   const cambiar = document.querySelector(`[data-id=${element.name}]`)
   cambiar.innerHTML = element.value;
   console.log(cambiar)
  })
});



