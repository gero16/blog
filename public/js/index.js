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
    urlPost.forEach(element => {
      element.addEventListener("click", (e) => {
        window.location.href = `/auth/${usuario}/publicaciones/${e.target.parentNode.dataset.id}`
    })
  })

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


  let post = "";

  registros.forEach((e) => {
    const separar = e.fecha.split("-")
    const date = [separar[2], separar[1], separar[0]]
    const newDate = date.join("-")
    const fechas = document.querySelectorAll(".post-fecha")
    fechas.forEach(element => {
      element.textContent = newDate;
    });
    /*
    const primerParrafo = e.contenido[0]

    post +=`
            <div class="post" data-id=${i}>

                <div class="div-imagen" data-id=${ e.url }>
                  <img class="post-img" src="${ e.imagen }" alt="imagen-del-post" data-id=${ e.url }>
                </div>

                <div class="post-div-contenido" data-id=${ e.url }>
                  <span class="post-autor data-id=${e.url}">Autor: <STRONG>  ${ e.autor } </STRONG> | </span>
                  <span class="post-fecha">${ newDate } </span>
                  <h2 class="post-titulo">${ e.titulo } </h2>
                  <div class="post-contenido" data-id=${ e.url }>  ${ primerParrafo } </div> 
                </div>

            </div>
          `;
          console.log(post)
    blog.innerHTML = post;
    */
  });
};









