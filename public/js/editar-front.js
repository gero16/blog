import { agregar, agregarParrafo, agregarSubtitulo, btnAgregarParrafo, btnAgregarSub, btnPrevisualizarCrear, divAgregarInputs, enviarPost, formulario, inputAutor, inputContenido, 
  inputFecha, inputFoto, inputTitulo, preAutor, preContenido, preFecha, preFoto, preTitulo, terminarContenido } from "./helpers-front.mjs";

let texto = "";

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

const arrayEtiquetas = []


// CAPAZ QUE PRECISO UN MODO EDICION = FALSE, en crear, para tener en cuenta los editar mientras creo, que afectarian solo a la previsualizacion

const btnPrevisualizarEditar = document.querySelector("#agregar-texto-editar")

btnPrevisualizarEditar.addEventListener("click", () => {
  const inputSubtitulo = document.querySelector(".subtitulos-post")
  let elementosEditar = document.querySelectorAll(".editar")
  let elementosVacios = document.querySelectorAll(".vacio")
  elementosEditar.forEach(element => {
    if (element.name === "titulo") {
      texto = inputTitulo.value;
      preTitulo.textContent = texto;
    } else if (element.name === "autor") {
      texto = inputAutor.value;
      preAutor.textContent = texto;

    } else if (element.name === "fecha") {
      texto = inputFecha.value;
      preFecha.textContent = texto;
    }
  })
  
  console.log(elementosVacios)
  elementosVacios.forEach(element => {
    if (element.classList.contains("vacio") && element.classList.contains("parrafos-post")) {
        element.value = `<p>       ${element.value}       </p>`
        preContenido.innerHTML +=  element.value;
        element.classList.remove("vacio")
    } else if (element.classList.contains("vacio") && element.classList.contains("subtitulos-post")) {
      element.value = `<h2>       ${element.value}       </h2>`
      preContenido.innerHTML +=  element.value;
      element.classList.remove("vacio")
    }
  })
})
 

const btnQuitarContenido = document.querySelectorAll(".btn-quitar-contenido")
btnQuitarContenido.forEach(elementoQuitar => {
  elementoQuitar.addEventListener("click", (e) => {
    e.target.parentNode.remove()
  })
});

let inputsContenidoPost = document.querySelectorAll(".inputs-contenido-post")

/*
// Solo cambia el PREVIEW
inputsContenidoPost.forEach(element => {
  element.addEventListener("change", () => {
    //const index = fruits.findIndex(fruit => fruit === "blueberries");
    console.log(element)
    
   const cambiar = document.querySelector(`[data-id=${element.name}]`)
   console.log(cambiar)
   cambiar.innerHTML = element.value;
  })
});
*/


const btnsQuitar = document.querySelectorAll(".btn-quitar-precargado")
btnsQuitar.forEach(quitar => {
  quitar.addEventListener("click", (e) => {
    e.target.parentNode.className = "inactive"
    setTimeout(() => {  
      e.target.parentNode.remove()
    }, 1300);
  })
});





