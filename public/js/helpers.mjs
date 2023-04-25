export const agregar = document.querySelector(`[data-id="agregar"]`);

// inputs del Formulario para crear el POST
export const formulario = document.querySelector(".formulario");
export const inputFoto = document.querySelector("#imagen-post");
export const inputContenido = document.querySelector("#contenido-post");
export const inputTitulo = document.querySelector("#titulo-post");
export const inputAutor = document.querySelector("#autor-post");
export const inputFecha = document.querySelector("#fecha-post");
export const enviarPost = document.querySelector("#enviar-post");
export const terminarContenido = document.querySelector("#terminar");

// etiquetas donde previsualizar del Contenido
export const preTitulo = document.querySelector(".pre-titulo");
export const preAutor = document.querySelector(".pre-autor");
export let preContenido = document.querySelector(".pre-contenido");
export const preFecha = document.querySelector(".pre-fecha");
export const preFoto = document.querySelector(".pre-img");

// Botones para agregar el CONTENIDO
export const btnAgregarParrafo = document.querySelector(".agregar-parrafo")
export const divAgregarInputs = document.querySelector(".div-agregar-inputs")
export const btnAgregarSub = document.querySelector(".agregar-subtitulo")
export const btnPrevisualizarCrear = document.querySelector("#agregar-texto-crear")


export const agregarParrafo = () => {
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


inputParrafo.addEventListener("change", () => {
  if(inputTitulo.value !== "")
    enviarPost.disabled = false
  })
}

export const agregarSubtitulo = () => {
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
}

export const previsualizar = () => {
let texto = "";
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
}