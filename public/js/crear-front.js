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
  let liContenedor = document.createElement("li")
  liContenedor.className = "inactive li-parrafos"
  
  let inputParrafo = document.createElement("textarea")
  inputParrafo.name = "contenido"
  inputParrafo.className = "parrafos-post contenidos-post vacio input-crear active-parrafos"
  
  const btnQuitar = document.createElement("span")
  btnQuitar.className = "btn-quitar-contenido"
  btnQuitar.textContent = "Quitar Parrafo"
  
  liContenedor.append(divVacio1, inputParrafo, divVacio2, btnQuitar)
  divLiContenido.append(liContenedor)

  // Preciso este setTimeout para que funcione esto
  setTimeout(() => {  
    liContenedor.className = "active"
  }, 300);


  btnQuitar.addEventListener("click", (e) => {
    liContenedor.className = "inactive"
    // liContenedor queda invisible, pero sus datos persisten
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


// CAPAZ QUE PRECISO UN MODO EDICION = FALSE, en crear, para tener en cuenta los editar mientras creo, que afectarian solo a la previsualizacion
btnPrevisualizarCrear.addEventListener("click", () => {
  let inputsCrear = document.querySelectorAll(".input-crear")
  const inputSubtitulo = document.querySelector(".subtitulos-post")

  inputsCrear.forEach(element => {
    if(element.classList.contains("vacio") && element.name === "titulo") {
      inputTitulo.classList.remove("vacio");
      texto = inputTitulo.value;
      preTitulo.textContent = texto;
    } 

    if(element.classList.contains("vacio") && element.name === "autor") {
      inputAutor.classList.remove("vacio");
      texto = inputAutor.value;
      preAutor.textContent = texto;
    } 

    if(element.classList.contains("vacio") && element.name === "fecha") {
      inputFecha.classList.remove("vacio");
      texto = inputFecha.value;
      preFecha.textContent = texto;
    } 
    
    if(element.classList.contains("vacio") && element.classList.contains("parrafos-post")) {
      const valueFinal = element.value
      element.name ="contenido"
      element.value = `<p>       ${ valueFinal }       </p>`
      // no se porque no funciona el innerHTML con el nuevoElemento
      let nuevoElemento = `<div class="contenido-post> ${element.value}  </div>`
      console.log(nuevoElemento)
      preContenido.innerHTML += element.value;
      element.classList.remove("vacio")
    } 

    if(element.classList.contains("vacio") && element.classList.contains("subtitulos-post")) {
      const valueFinal = inputSubtitulo.value
      element.name ="contenido"
      inputSubtitulo.value = `<h2>       ${ valueFinal }       </h2>`
      preContenido.innerHTML += inputSubtitulo.value;
      inputSubtitulo.classList.remove("vacio")
    }
  });
})

enviarPost.disabled = true
inputTitulo.addEventListener("change", () => {
  if(inputTitulo) {
    enviarPost.disabled = false
  }
})

// en editar plantilla
if(inputTitulo) {
  enviarPost.disabled = false
}

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



