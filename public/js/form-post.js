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


const traerInfo = async () => {
  
  const sesion =  JSON.parse(localStorage.getItem("sesion"));
  const token = sesion[2]
  const settings = { 
      method: 'GET', 
      headers: { 
              "Content-Type": "application/json", 
              "auth-token": token
            }
          };
  try {
    const fetchResponse = await fetch(`/auth/${sesion[1]}/crear-post`, settings);
   
  } catch (error) {
    console.log(error)
  }
}

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
  console.log(orden)
  let inputParrafo = document.createElement("textarea")
  inputParrafo.className = "parrafos-post vacio"

  const btnQuitar = document.createElement("span")
  //btnQuitar.className = "btn-quitar-contenido"
  btnQuitar.textContent = "Quitar Parrafo"

  // Encuentro el primer valor vacio, cambio su valor a lleno y termino el bucle
  for(valor in orden) {
    if(orden[valor] === "vacio") {
      console.log(orden)
      // primerParrafo
      inputParrafo.name = valor; // Antes - inputSub.name = valor+"Parrafo";
      btnQuitar.className = ` ${ valor } btn-quitar-contenido `
      
      divAgregarInputs.append(inputParrafo, btnQuitar)
      // Cambio su valor a lleno
      orden[valor] = "lleno";
      //inputParrafo.value = `<p>        </p>`
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
      //inputSub.value = "<h2>              </h2> "
      break;
    } 
  }
})

/* HAY QUE HACERLOOOOOOOOOOOOO 
const btnAgregarLista = document.querySelector(".agregar-lista")
btnAgregarLista.addEventListener("click", () => {

})
*/


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


btnAgregarTexto.addEventListener("click", () => {
  console.log(inputFecha.value)
  let elementosVacios = document.querySelectorAll(".vacio")
  const inputParrafo = document.querySelector(".parrafos-post")
  const inputSubtitulo = document.querySelector(".subtitulos-post")
  elementosVacios.forEach(element => {
    console.log(element.name)
    
    if(element.classList.contains("vacio") && element.name === "titulo"){
      inputTitulo.classList.remove("vacio");
      texto = inputTitulo.value;
      preTitulo.textContent = texto;
    } else if (element.classList.contains("vacio") && element.name === "autor") {
      inputAutor.classList.remove("vacio");
      texto = inputAutor.value;
      preAutor.textContent = texto;

    } else if (element.classList.contains("vacio")  && element.name === "fecha") {
      inputFecha.classList.remove("vacio");
      texto = inputFecha.value;
      preFecha.textContent = texto;

    } else if (element.classList.contains("vacio") && element.classList.contains("parrafos-post")) {
      const valueFinal = element.value
      element.value = `<p>     ${valueFinal}     </p>`
      preContenido.innerHTML +=  element.value;
      element.classList.remove("vacio")
      

    } else if (element.classList.contains("vacio") && element.classList.contains("subtitulos-post")) {
      const valueFinal = inputSubtitulo.value
      inputSubtitulo.value = `<h2>     ${valueFinal}     </h2>`
      preContenido.innerHTML +=  inputSubtitulo.value;
      inputSubtitulo.classList.remove("vacio")
    }
    
/*
    if(inputTitulo.value.length > 1 && inputTitulo.classList.contains("vacio")) {
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

    } else if (inputParrafo && inputParrafo.value.length > 1 && inputParrafo.classList.contains("vacio")) {
      const valueFinal = inputParrafo.value
      inputParrafo.value = `<p>     ${valueFinal}     </p>`
      preContenido.innerHTML +=  inputParrafo.value;
      inputParrafo.classList.remove("vacio")

    } else if (inputSubtitulo && inputSubtitulo.value.length > 1 && inputSubtitulo.classList.contains("vacio")) {
      const valueFinal = inputSubtitulo.value
      inputSubtitulo.value = `<h2>     ${valueFinal}     </h2>`
      preContenido.innerHTML +=  inputSubtitulo.value;
      inputSubtitulo.classList.remove("vacio")
    }*/
  });
})

enviarPost.disabled = true
inputTitulo.addEventListener("change", () => {
  console.log("hola")
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
    //console.log(e.target.classList[0])
    let claseOrden = e.target.classList[0]
    const liPadre = document.querySelector(`.li-${claseOrden}`)
    //console.log(liPadre)
    
    //liPadre.innerHTML = "";
    // Lo que tengo 
    reiniciarOrden(claseOrden)
  })
});


document.addEventListener("DOMContentLoaded", () => {

  traerInfo()

  // Solo para el editar
  actualizarOrden();

  document.querySelectorAll(".vacio").forEach((inputsVacios) =>
    inputsVacios.addEventListener("keypress", (e) => {

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





