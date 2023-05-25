import { getSesion } from "./helpers-front.mjs";

const imagenes = document.querySelectorAll(".post-img")

let posicionActual = 1;
const flechaDer = document.querySelector(".flecha-der")
const flechaIzq = document.querySelector(".flecha-izq")

const imgMax = document.querySelector(".imagen-galeria-max")
const seleccionImagen = document.querySelector(".seleccion-imagen")
const imgMin = document.querySelectorAll(".imagen-galeria-mini")

const traerPublicaciones = async () => {
  const resultado = await fetch("/publicaciones");
  const data = await resultado.json();
  const { registros } = data;

  const fechas = document.querySelectorAll(".post-fecha")

  for (let index = 0; index < registros.length; index++) {
    let separar = registros[index].fecha.split("-")
    let date = [separar[2], separar[1], separar[0]]
    let newDate = date.join("-")
    fechas[index].textContent = newDate;
  }
};

imgMin.forEach(imagen => {
  imagen.addEventListener("click", (e) => {
    let separar = e.target.src.split("/")
    console.log(separar)
    const imagen = separar[4]
    imgMax.src = `/img/${ imagen }`
    console.log(e.target.classList.contains("flechas") )
    if(!e.target.classList.contains("flechas")) {
      seleccionImagen.classList.toggle("mostrar-imagen")
      seleccionImagen.classList.toggle("ocultar-imagen")
      
    } else if (e.target.classList.contains("flecha-izq")){
      
    }
  })
});

flechaDer.addEventListener("click", () => {
  if(posicionActual === 4) {
    console.log(posicionActual)
    posicionActual = 1;
    imgMax.src = `/img/foto${ posicionActual}.jpg`
  } else {
    console.log(posicionActual)
    posicionActual++;
    imgMax.src = `/img/foto${ posicionActual }.jpg`

}
})

flechaIzq.addEventListener("click", () => {
  if(posicionActual === 1) {
    console.log(posicionActual)
    posicionActual = 4;
    imgMax.src = `/img/foto${ posicionActual}.jpg`
  } else {
    posicionActual--;
    console.log(posicionActual)
    imgMax.src = `/img/foto${ posicionActual }.jpg`
}
})

seleccionImagen.addEventListener("click", (e) => {
  if(!e.target.classList.contains("flechas")) {
    seleccionImagen.classList.toggle("mostrar-imagen")
    seleccionImagen.classList.toggle("ocultar-imagen")
  }
})

window.onload = async function (e) {
  e.preventDefault()

  await traerPublicaciones();

  const urlPost = document.querySelectorAll(".post")


    urlPost.forEach(element => {
      element.addEventListener("click", (e) => {
        window.location.href = `/publicaciones/${e.target.parentNode.dataset.id}`
      })
    })

  
  if(getSesion && window.location.pathname === "/" && getSesion[3] ==="ADMIN") {
     window.location.href = `/auth/admin/${getSesion[1]}/index`
  }

  if(getSesion && window.location.pathname === "/" && getSesion[3] ==="USER") {
    window.location.href = `/auth/index/usuario/${getSesion[1]}`
 }
 
  if(getSesion) {
    localStorage.removeItem("imagen");
    
    const [correo, usuario, token, rol] = getSesion;

    if(correo == null || usuario == null || token == null || rol == null) {
      console.log("Elimino sesion porque sus datos estan en null")
      localStorage.removeItem('sesion');
    }
  }

  if(!getSesion) {

    const randomImage = (min, max) => {
      const num = Math.floor((Math.random() * (max - min + 1)) + min);
      const imagen =  num;
      const userPublic = localStorage.getItem("imagen");

      // Esto lo hago la primera vez que entro a la pagina
      if(!userPublic  &&  window.location.pathname === "/") {
        const data = ["public", imagen]
        localStorage.setItem("imagen", JSON.stringify(data) );
      }

      // Por si hubo algun error y se borro, lo agrego devuelta
      if(!userPublic  &&  window.location.pathname !== "/") {
        const data = ["public", imagen]
        localStorage.setItem("imagen", JSON.stringify(data) );
      }
    
      const user = window.location.pathname.split("/")
      if(userPublic &&  user[3] && user[3] === "index") {
     
        console.log("No deberia estar aqui")
        window.location.href = "/"
      }
    
    }
    randomImage(0, 6);
  }

}

const getAspectRatio = (w, h) => {
  let rem;
  let newW = w;
  let newH = h;

  while (h != 0) {
      rem = w % h;
      w = h;
      h = rem;
  }

  newH = newH / w;
  newW = newW / w;

  //console.log("Aspect Ratio: " + newW + ":" + newH);
  return
}

imagenes.forEach(element => {
  let foto= new Image();
  foto.src= element.src
  getAspectRatio(foto.width, foto.height)
  if(foto.width < foto.height  ) {
    element.classList.add("img-more-width")
    element.parentNode.classList.add("post-more-width")
  }
});

