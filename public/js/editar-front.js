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
let preContenido = document.querySelector(".pre-contenido");
const preFecha = document.querySelector(".pre-fecha");
const preFoto = document.querySelector(".pre-img");

// Botones para agregar el CONTENIDO
const btnAgregarParrafo = document.querySelector(".agregar-parrafo")
const divAgregarInputs = document.querySelector(".div-agregar-inputs")
const btnAgregarSub = document.querySelector(".agregar-subtitulo")
const btnPrevisualizarCrear = document.querySelector("#agregar-texto-crear")

let texto = "";

btnAgregarParrafo.addEventListener("click", () => {
  const divLiContenido = document.querySelector(".div-li-contenido")
  const divVacio1 = document.createElement("div")
  const divVacio2 = document.createElement("div")
  const liContenedor = document.createElement("li")
  liContenedor.classList.add("li-parrafos")
  let inputParrafo = document.createElement("textarea")
  inputParrafo.name = "contenido"
  inputParrafo.className = "parrafos-post contenidos-post vacio input-crear active-parrafos"

  const btnQuitar = document.createElement("span")
  btnQuitar.className = "btn-quitar-contenido"
  btnQuitar.textContent = "Quitar Parrafo"

  liContenedor.append(divVacio1, inputParrafo, divVacio2, btnQuitar)
  divLiContenido.append(liContenedor)

  setTimeout(() => {  
    liContenedor.className = "active"
  }, 300);

  btnQuitar.addEventListener("click", (e) => {
    liContenedor.className = "inactive"
    setTimeout(() => {  
      console.log(e.target.parentNode)
      e.target.parentNode.remove()
    }, 1300);
  })
})


btnAgregarSub.addEventListener("click", () => { 
  const divLiContenido = document.querySelector(".div-li-contenido")
  const divVacio1 = document.createElement("div")
  const divVacio2 = document.createElement("div")
  let liContenedor = document.createElement("li")
  liContenedor.className = "inactive li-subtitulos"

  let inputSubtitulo = document.createElement("textarea")
  inputSubtitulo.name = "contenido"
  inputSubtitulo.className = "subtitulos-post contenidos-post vacio input-crear active-subtitulos"

  setTimeout(() => {  
    liContenedor.className = "active"
  }, 300);

  const btnQuitar = document.createElement("span")
  btnQuitar.className = "btn-quitar-contenido"
  btnQuitar.textContent = "Quitar Subtitulo"

  liContenedor.append(divVacio1, inputSubtitulo, divVacio2, btnQuitar)
  divLiContenido.append(liContenedor)
 
  btnQuitar.addEventListener("click", (e) => {
    liContenedor.className = "inactive"
    // liContenedor queda invisible, pero sus datos persisten
    setTimeout(() => {  
      console.log(e.target.parentNode)
      e.target.parentNode.remove()
    }, 1300);
  })
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





