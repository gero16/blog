// inputs del Formulario para crear el POST
const formulario = document.querySelector(".formulario");
const inputFoto = document.querySelector("#imagen-post");
const optionFoto = document.querySelector(".option-foto")
const inputTitulo = document.querySelector("#titulo-post");
const inputContenido = document.querySelector("#contenido-post");
const inputAutor = document.querySelector("#autor-post");
const inputFecha = document.querySelector("#fecha-post");
const enviarPost = document.querySelector("#enviar-post");
const terminarContenido = document.querySelector("#terminar");
// etiquetas donde previsualizar del Contenido
const preTitulo = document.querySelector(".pre-titulo");
const preAutor = document.querySelector(".pre-autor");
const preContenido = document.querySelector(".pre-contenido");
const preFecha = document.querySelector(".pre-fecha");
const preFoto = document.querySelector(".pre-img");
// Botones para agregar el CONTENIDO
const btnAgregarParrafo = document.querySelector(".agregar-parrafo")
const divAgregarParrafos = document.querySelector(".div-agregar-parrafos")
const btnAgregarSub = document.querySelector(".agregar-subtitulo")
const divAgregarSub = document.querySelector(".div-agregar-subtitulo")
const btnAgregarTexto = document.querySelector("#agregar-texto")


document.addEventListener("DOMContentLoaded", () => {

  
  document.querySelectorAll(".vacio").forEach((node) =>
    node.addEventListener("keypress", (e) => {
      console.log(document.querySelectorAll(".vacio"))
      if (e.keyCode == 13) {
        e.preventDefault();

        if (inputTitulo.value && inputTitulo.className == "vacio") {
          inputTitulo.classList.remove("vacio");
          texto = inputTitulo.value;
          preTitulo.textContent = texto;
        } else if (inputAutor.value && inputAutor.className == "vacio") {
          inputAutor.classList.remove("vacio");
          texto = inputAutor.value;
          preAutor.textContent = texto;
        } else if (inputFecha.value && inputFecha.className == "vacio") {
          inputFecha.classList.remove("vacio");
          texto = inputFecha.value;
          preFecha.textContent = texto;
        } else {
          console.log("hola")
        }
      }  
    })
)});  

inputFoto.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();

    if (inputTitulo.value && inputTitulo.className == "vacio") {
      inputTitulo.classList.remove("vacio");
      texto = inputTitulo.value;
      preTitulo.textContent = texto;
    } else if (inputAutor.value && inputAutor.className == "vacio") {
      inputAutor.classList.remove("vacio");
      texto = inputAutor.value;
      preAutor.textContent = texto;
    } else if (inputFecha.value && inputFecha.className == "vacio") {
      inputFecha.classList.remove("vacio");
      texto = inputFecha.value;
      preFecha.textContent = texto;
    } 
  }
});


/** Seccion de contenido para Agregar parrafos y/o subtitulos **/
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

  
let ordenInputs = document.querySelectorAll(".parrafos-post")
console.log(ordenInputs.length)
ordenInputs.forEach(input => {
  for(valor in orden) {
    if(orden[valor] === "vacio"){
      input.name = valor
      orden[valor] = "lleno";
      break;
    }
  } 
 });


btnAgregarParrafo.addEventListener("click", () => {
     console.log(orden);
    let inputParrafo = document.createElement("textarea")
    inputParrafo.className = "parrafos-post vacio"
    // Encuentro el primer valor vacio, cambio su valor a lleno y termino el bucle

    for(valor in orden) {
      if(orden[valor] === "vacio") {
        // primerParrafo
        inputParrafo.name = valor; // Antes - inputSub.name = valor+"Parrafo";
      
        divAgregarParrafos.append(inputParrafo)
        // Cambio su valor a lleno
        orden[valor] = "lleno";
        inputParrafo.value = "<p>   </p>"
        break;
      } 
    }  
   
  })
  
  btnAgregarSub.addEventListener("click", () => {
    let inputSub = document.createElement("input")
    inputSub.className = "subtitulos-post vacio";
    console.log(orden)
    for(valor in orden) {
      console.log(orden[valor] === "vacio")
      if(orden[valor] === "vacio") {
        inputSub.name = valor; // Antes - inputSub.name = valor+"Subtitulo";
        let contadorInputs = document.querySelectorAll(".subtitulos-post").length
        inputSub.dataset.id = `subtitulo-${contadorInputs}`
        divAgregarSub.append(inputSub)
        // Cambio su valor a lleno
        orden[valor] = "lleno";
        inputSub.value = "<h2>   </h2> "
        break;
      } 
    }
  })


  inputFoto.addEventListener("change", (e) => {
    console.log(e.target)
    console.log(e.target.files[0].name);
    const nameFoto = e.target.files[0].name;
    document.querySelector(".span-foto").innerHTML = nameFoto;
  
    const archivos = inputFoto.files;
    const primerArchivo = archivos[0];
    const objectURL = URL.createObjectURL(primerArchivo);
    console.log(objectURL);
    preFoto.style.display = "block";
    preFoto.src = objectURL;

  
  });