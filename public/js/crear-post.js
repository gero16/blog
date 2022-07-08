const etiquetas = document.querySelector(".etiquetas");
const btnIMG = document.querySelector(".foto-contenido");
const btnH2 = document.querySelector("#h2");
const btnParrafo = document.querySelector("#p");
const btnNegrita = document.querySelector("#strong");

const agregar = document.querySelector(`[data-id="agregar"]`);

// Datos del Formulario para crear el POST
const formulario = document.querySelector(".formulario");
const inputFoto = document.querySelector("#imagen-post");
const inputTitulo = document.querySelector("#titulo-post");
const inputContenido = document.querySelector("#contenido-post");
const inputAutor = document.querySelector("#autor-post");
const inputFecha = document.querySelector("#fecha-post");
const enviarPost = document.querySelector("#enviar-post");
const terminarContenido = document.querySelector("#terminar");

const preTitulo = document.querySelector(".pre-titulo");
const preAutor = document.querySelector(".pre-autor");
const preContenido = document.querySelector(".pre-contenido");
const preFecha = document.querySelector(".pre-fecha");
const preFoto = document.querySelector(".pre-img");

// Post de Muestra
const textoPost = document.querySelector(".texto-post");

let actualizarHTML = "";
let etiquetaContenido = [];

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll("input[type=text]").forEach((node) =>
    node.addEventListener("keypress", (e) => {
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
          texto = inputContenido.value;
          inputContenido.value = "";
          // Si selectEtiqueta no es undefined
          if (selectEtiqueta) {
            agregarTexto(selectEtiqueta, texto);
            preContenido.innerHTML = actualizarHTML;
            console.log(actualizarHTML);
          }
        }
      }
    })
  );

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
      } else {
        texto = inputContenido.value;
        inputContenido.value = "";
        // Si selectEtiqueta no es undefined
        if (selectEtiqueta) {
          agregarTexto(selectEtiqueta, texto);
          preContenido.innerHTML = actualizarHTML;
          console.log(actualizarHTML);
        }
      }
    }
  });
});

const agregarTexto = function (etiqueta, texto, iterador) {
  actualizarHTML += `<${etiqueta} data-id='${etiqueta}${iterador}'> ${texto} </${etiqueta}>`;

  etiquetaContenido = `<${etiqueta} data-id='${etiqueta}${iterador}'> ${texto} </${etiqueta}> `;
};

let selectEtiqueta;

let texto = "";

let Contador = {
  seleccionado: 1,
  nseleccionado: 0,
};

etiquetas.addEventListener("dblclick", (e) => {
  console.log(e.target.id);
  selectEtiqueta = e.target.id;

  let etiqueta = document.querySelector(`#${selectEtiqueta}`);
  etiqueta.dataset.id = Contador.seleccionado;

  etiqueta.classList.add("select-etiqueta");
});

// const body = document.querySelector("body");
etiquetas.addEventListener("click", (e) => {
  console.log(e.target.id);
  let sEtiqueta = e.target.id;

  let etiqueta = document.querySelector(`#${sEtiqueta}`);
  etiqueta.dataset.id = Contador.nseleccionado;
  etiqueta.classList.remove("select-etiqueta");
});

inputFoto.addEventListener("change", (e) => {
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

const arrayEtiquetas = []
agregar.addEventListener("click", (e) => {
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
    texto = inputContenido.value;
    inputContenido.value = "";
    // Si selectEtiqueta no es undefined
    if (selectEtiqueta) {
      inputContenido.textContent = "";
      let iterador = arrayEtiquetas.length
      agregarTexto(selectEtiqueta, texto, iterador);
      // Etiqueta individual
      arrayEtiquetas.push(etiquetaContenido)
      // Conjunto de etiquetas en el contenidoFinal
      preContenido.innerHTML = actualizarHTML;
      console.log(arrayEtiquetas)
      console.log(actualizarHTML);
    }
  }
});
const inputsContenido = document.querySelectorAll(".etiquetas-post")

terminarContenido.addEventListener("click", () => {
  inputContenido.value = actualizarHTML;
  console.log(arrayEtiquetas[0])
  for (let i = 0; i <  inputsContenido.length; i++) {
    inputsContenido[i].value =  arrayEtiquetas[i];
    inputsContenido[i].textContent =  arrayEtiquetas[i];
    console.log(inputsContenido[i])

  }
});
