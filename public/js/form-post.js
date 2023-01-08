const agregar = document.querySelector(`[data-id="agregar"]`);

// inputs del Formulario para crear el POST
const formulario = document.querySelector(".formulario");
const inputFoto = document.querySelector("#imagen-post");
const inputContenido = document.querySelector("#contenido-post");
const inputTitulo = document.querySelector("#titulo-post");
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
const divAgregarInputs = document.querySelector(".div-agregar-inputs")
const btnAgregarSub = document.querySelector(".agregar-subtitulo")
const btnAgregarTexto = document.querySelector("#agregar-texto")
let texto = "";

// Post de Muestra
const textoPost = document.querySelector(".texto-post");

let actualizarHTML = "";
let etiquetaContenido = [];

const traerInfo = async () => {
  const sesion =  JSON.parse(localStorage.getItem("sesion"));

  const token = sesion[2]
  const settings = { 
      method: 'GET', 
      headers: { 
              "Content-Type": "application/json", 
              "auth-token": token 
            },
  };

  try {
    const fetchResponse = await fetch(`/auth/${sesion[1]}/crear-post`, settings);
    console.log(fetchResponse)
   
  } catch (error) {
    console.log(error)
  }
 
}

document.addEventListener("DOMContentLoaded", () => {

  traerInfo()

  document.querySelectorAll(".vacio").forEach((node) =>
    node.addEventListener("keypress", (e) => {
      console.log(document.querySelectorAll(".vacio"))
      console.log(inputTitulo.value.length >1)
      console.log(inputTitulo.classList.contains("vacio"))
      if (e.keyCode == 13) {
        e.preventDefault();

        if (inputTitulo.value.length > 1 && inputTitulo.classList.contains("vacio")) {
          console.log("laputamadre")
          inputTitulo.classList.remove("vacio");
          texto = inputTitulo.value;
          preTitulo.textContent = texto;
        } else if (inputAutor.value.length > 1 && inputAutor.classList.contains("vacio")) {
          inputAutor.classList.remove("vacio");
          texto = inputAutor.value;
          preAutor.textContent = texto;
        } else if (inputFecha.value.length > 1 && inputFecha.classList.contains("vacio")) {
          inputFecha.classList.remove("vacio");
          texto = inputFecha.value;
          preFecha.textContent = texto;
        } else {
          console.log("hola")
        }
      }  
    }));  


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

let contador = 0;

btnAgregarParrafo.addEventListener("click", () => {
  let inputParrafo = document.createElement("textarea")
  const spanParrafo1 = document.createElement("span")
  const spanParrafo2 = document.createElement("span")
  spanParrafo1.textContent = "<p>"
  spanParrafo2.textContent = "</p>"
  inputParrafo.className = "parrafos-post vacio"
  // Encuentro el primer valor vacio, cambio su valor a lleno y termino el bucle
 
  for(valor in orden) {
    if(orden[valor] === "vacio") {
      // primerParrafo
      inputParrafo.name = valor; // Antes - inputSub.name = valor+"Parrafo";
    
      divAgregarInputs.appendChild(inputParrafo)
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
      divAgregarInputs.appendChild(inputSub)
      // Cambio su valor a lleno
      orden[valor] = "lleno";
      inputSub.value = "<h2>   </h2> "
      break;
    } 
  }
})

/* HAY QUE HACERLOOOOOOOOOOOOO 
const btnAgregarLista = document.querySelector(".agregar-lista")
btnAgregarLista.addEventListener("click", () => {

})
*/


btnAgregarTexto.addEventListener("click", () => {
  let elementoAgregar = document.querySelector(".vacio")
  console.log(elementoAgregar)
  if(elementoAgregar.value.length > 1 &&  elementoAgregar.classList.contains("parrafos-post") ) {
      console.log("hola")
      preContenido.innerHTML +=  elementoAgregar.value;
      elementoAgregar.classList.remove("vacio")
  } else if (elementoAgregar.classList.contains("subtitulos-post")) {
    preContenido.innerHTML +=  elementoAgregar.value;
  } 
})



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

