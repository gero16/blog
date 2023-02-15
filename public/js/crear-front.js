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
  decimoSegundo: "vacio",
  ultimo: "vacio"
}

// Voy llenando los inputs, y luego actualizo el objeto
const actualizarOrden = () => {
  const llenos = document.querySelectorAll(".lleno")
  let i = 1
  for (let clave in orden){
     if(i <= llenos.length) {
      orden[clave] = "lleno"
    }
     i++;
  }
}


btnAgregarParrafo.addEventListener("click", () => {

  const arrayOrden = Object.entries(orden)
  const indexValor = arrayOrden.findIndex(element => element[1] == "vacio")
  console.log(indexValor)
  const divLiContenido = document.querySelector(".div-li-contenido")
  const liContenedor = document.createElement("li")
  liContenedor.classList.add(`li-${ arrayOrden[5][0] }`,"li-parrafos")
  console.log(orden)
  
  const divVacio1 = document.createElement("div")
  const divVacio2 = document.createElement("div")

  let inputParrafo = document.createElement("textarea")
  inputParrafo.className = "parrafos-post vacio contenidos-post"

  const btnQuitar = document.createElement("span")
  //btnQuitar.className = "btn-quitar-contenido"
  btnQuitar.textContent = "Quitar Parrafo"
 

  // Encuentro el primer valor vacio, cambio su valor a lleno y termino el bucle
  for(valor in orden) {
    if(orden[valor] === "vacio") {
      // primerParrafo
      inputParrafo.name = valor; // Antes - inputSub.name = valor+"Parrafo";
      btnQuitar.className = ` ${ valor } btn-quitar-contenido `
      
      liContenedor.append(divVacio1, inputParrafo, divVacio2, btnQuitar)
      divLiContenido.append(liContenedor)

      // Cambio el valor del objeto a lleno
      orden[valor] = "lleno";
      break;
    } 
  }  

  btnQuitar.addEventListener("click", (e) => {
    let contenedorParrafos = document.querySelectorAll(".li-parrafos")
    // const arrayOrden = Object.entries(orden)
    console.log(e.target.classList[0])
    const claveVaciar = e.target.classList[0]
    console.log(e.target.parentNode)
    contenedorParrafos[contenedorParrafos.length -1].remove();
    orden[claveVaciar] = "vacio"
    console.log(orden)
  })
 
})


btnAgregarSub.addEventListener("click", () => { 
  const arrayOrden = Object.entries(orden)
  const indexValor = arrayOrden.findIndex(element => element[1] == "vacio")
  console.log(indexValor)
  const divLiContenido = document.querySelector(".div-li-contenido")
  const liContenedor = document.createElement("li")
  liContenedor.classList.add(`li-${ arrayOrden[5][0] }`,"li-parrafos")
  console.log(orden)
  
  const divVacio1 = document.createElement("div")
  const divVacio2 = document.createElement("div")

  let inputSubtitulo = document.createElement("textarea")
  inputSubtitulo.className = "subtitulos-post vacio contenidos-post"

  const btnQuitar = document.createElement("span")
  //btnQuitar.className = "btn-quitar-contenido"
  btnQuitar.textContent = "Quitar Subtitulo"
 

  // Encuentro el primer valor vacio, cambio su valor a lleno y termino el bucle
  for(valor in orden) {
    if(orden[valor] === "vacio") {
      // primerParrafo
      inputSubtitulo.name = valor; // Antes - inputSub.name = valor+"Parrafo";
      btnQuitar.className = ` ${ valor } btn-quitar-contenido `
      
      liContenedor.append(divVacio1, inputSubtitulo, divVacio2, btnQuitar)
      divLiContenido.append(liContenedor)

      // Cambio el valor del objeto a lleno
      orden[valor] = "lleno";
      break;
    } 
  }  

  btnQuitar.addEventListener("click", (e) => {
    let contenedorParrafos = document.querySelectorAll(".li-parrafos")
    // const arrayOrden = Object.entries(orden)
    console.log(e.target.classList[0])
    const claveVaciar = e.target.classList[0]
    console.log(e.target.parentNode)
    contenedorParrafos[contenedorParrafos.length -1].remove();
    orden[claveVaciar] = "vacio"
    console.log(orden)
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

  let elementosVacios = document.querySelectorAll(".vacio")
  const inputSubtitulo = document.querySelector(".subtitulos-post")

  elementosVacios.forEach(element => {

    if (element.classList.contains("vacio") && element.name === "titulo") {
      inputTitulo.classList.remove("vacio");
      texto = inputTitulo.value;
      preTitulo.textContent = texto;
    } else if (element.classList.contains("vacio") && element.name === "autor") {
      inputAutor.classList.remove("vacio");
      texto = inputAutor.value;
      preAutor.textContent = texto;

    } else if (element.classList.contains("vacio") && element.name === "fecha") {
      inputFecha.classList.remove("vacio");
      texto = inputFecha.value;
      preFecha.textContent = texto;

    } else if (element.classList.contains("vacio") && element.classList.contains("parrafos-post")) {
      const valueFinal = element.value
      element.value = `<p>       ${valueFinal}       </p>`
      // no se porque no funciona el innerHTML con el nuevoElemento
      let nuevoElemento = `<div class="contenido-post> ${element.value}  </div>`
      console.log(nuevoElemento)
      preContenido.innerHTML += element.value;
      element.classList.remove("vacio")

    } else if (element.classList.contains("vacio") && element.classList.contains("subtitulos-post")) {
      const valueFinal = inputSubtitulo.value
      inputSubtitulo.value = `<h2>       ${valueFinal}       </h2>`
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


const reiniciarOrden = (valorEliminar) => {
  const separarValorEliminar = valorEliminar.split("-")
  
  const arrayOrden = Object.entries(orden)

  const valor = arrayOrden.findIndex(element => element[0] ==  separarValorEliminar[1])
  console.log(valor)

  let contenedorParrafos = document.querySelectorAll(".li-parrafos")
  let liParrafos =  Array.apply(null, contenedorParrafos);  

  let parrafos = document.querySelectorAll(`.parrafos-post`)
  let listaParrafos =  Array.apply(null, parrafos);  

  if(valor == 0) {
    for ( let i = 0; i < listaParrafos.length -1; i++) {
      listaParrafos[i].value = listaParrafos[i+1].value  
  }
    arrayOrden[liParrafos.length -1][1] = "vacio"
    contenedorParrafos[contenedorParrafos.length -1].remove();

} else if (valor >= 1 && valor != liParrafos.length-1) {
   for ( let i = valor; i < listaParrafos.length -1; i++) {
    listaParrafos[i].value = listaParrafos[i+1].value
  }
    contenedorParrafos[contenedorParrafos.length -1].remove();
    arrayOrden[liParrafos.length -1][1] = "vacio"

} else if (valor == liParrafos.length-1) {

    contenedorParrafos[contenedorParrafos.length -1].remove();
    arrayOrden[liParrafos.length -1][1] = "vacio"
}
/*
  const object = Object.fromEntries(arrayOrden);
  console.log(object)
  */
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


/*
const sendTokenPlantilla = async () => {
  const url = window.location.pathname
  const token = getSesion ? getSesion[2] : undefined
  console.log(token)
  const settings = { 
      method: 'POST', 
      headers: { 
        "Content-Type": "application/json", 
        "auth-token": token },
  };
  
  try {


      const fetchResponse = await fetch(url, settings);
      console.log(fetchResponse)
  

    
  } catch (e) {
      return e;
  } 
}

sendTokenPlantilla()
*/