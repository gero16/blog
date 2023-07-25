import { agregarParrafo, agregarSubtitulo, btnAgregarParrafo, btnAgregarSub, 
         crearMensaje, enviarPost,  inputAutor, inputFecha, inputFoto, inputTitulo, 
         preAutor, preContenido, preFecha, preFoto, preTitulo } 
from "./helpers/helpers-front.mjs";

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
  
  const inputParrafo = document.querySelector(".parrafos-post")
  // Evaluo cuando estoy creando o editando
  if(inputTitulo.value === "" ) crearMensaje("Tiene que agregar un titulo!", ".div-alert")
  else if(preFoto.src ==="" && inputFoto.value === "") crearMensaje("Tiene que agregar una imagen!", ".div-alert")
  else if(!inputParrafo || inputParrafo.value === "") crearMensaje("Tiene que agregar un parrafo!", ".div-alert")
  else if(inputTitulo.value !== "" && inputFoto.value !== "" && inputParrafo.value !== "") enviarPost.disabled = false
})

// Evaluo sobre todo cuando estoy editando
inputTitulo.addEventListener("change", (e) =>{
  if(e.target.value === "") enviarPost.disabled = true
})

// Tambien lo tengo como inputParrafo
const divContenido = document.querySelector(".div-li-contenido")
const btnsQuitar = document.querySelectorAll(".btn-quitar-precargado")
btnsQuitar.forEach(quitar => {
  quitar.addEventListener("click", (e) => {
    console.log("hola")
    e.target.parentNode.className = "inactive"

    const deshabilitarFinalizar = () => {
      console.log(divContenido.children.length === 0)
      if(divContenido.children.length === 0) enviarPost.disabled = true
      return
    }

    let promise = new Promise(function(resolve, reject) {
      setTimeout(() => resolve(e.target.parentNode.remove()), 1300);
    })
    promise.then(() => deshabilitarFinalizar())
  })
});















