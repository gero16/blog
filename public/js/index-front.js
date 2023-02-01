const blog = document.querySelector(".blog");
const refCrear = document.querySelector(".ref-crear")
const publicIMG = document.querySelector(".avatar-user")

window.onload = async function (e) {
  e.preventDefault()

  await traerPublicaciones();

  const urlPost = document.querySelectorAll(".post")

  const sesion = JSON.parse(localStorage.getItem('sesion'));
  
  if(window.location.pathname === "/") {
    urlPost.forEach(element => {
      element.addEventListener("click", (e) => {
        window.location.href = `/publicaciones/${e.target.parentNode.dataset.id}`
    })
  })}
  
  if(sesion && window.location.pathname === "/") {
     window.location.href = `/auth/${sesion[1]}/index`
  }
 
  if(sesion) {
    localStorage.removeItem("imagen");
    
    const [correo, usuario, token, rol] = sesion;

    if(correo == null || usuario == null || token == null || rol == null) {
      console.log("Elimino sesion porque sus datos estan en null")
      localStorage.removeItem('sesion');
    }
} else {
    const divImagen = document.querySelector(".img-user")
 
    function randomImage(min, max) {
      const num = Math.floor((Math.random() * (max - min + 1)) + min);
      const imagen =  num;
      const userPublic = localStorage.getItem("imagen");

      if(!userPublic) {
        const data = ["public", imagen]
        const public = localStorage.setItem("imagen", JSON.stringify(data) );
        const avatarImagen = document.createElement("img")
        avatarImagen.src = `/../img/avatar${num}.png`
        divImagen.append(avatarImagen)
      }
  }
  randomImage(0, 6);
  }
}


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





const imgMax = document.querySelector(".imagen-galeria-max")
const seleccionImagen = document.querySelector(".seleccion-imagen")
const imgMin = document.querySelectorAll(".imagen-galeria-mini")
const body = document.querySelector("body")
console.log(imgMin)


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

let posicionActual = 1;
const flechaDer = document.querySelector(".flecha-der")
const flechaIzq = document.querySelector(".flecha-izq")

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









