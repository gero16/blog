const blog = document.querySelector(".blog");
const refCrear = document.querySelector(".ref-crear")

window.onload = async function (e) {
  e.preventDefault()

  await traerPublicaciones();

  const urlPost = document.querySelectorAll(".post")

  const sesion = JSON.parse(localStorage.getItem('sesion'));
  console.log(sesion)
  
  if(window.location.pathname == "/") {
    urlPost.forEach(element => {
      element.addEventListener("click", (e) => {
        console.log(e)
        window.location.href = `/publicaciones/${e.target.parentNode.dataset.id}`
    })
  })}
  
  if(sesion && window.location.pathname == "/" && sesion[1] != null) {

    window.location.href = `/auth/${sesion[1]}/index`
  }

  if(sesion) {
    const [correo, usuario, token, rol] = sesion;
/*
    if(correo == null || usuario == null || token == null || rol == null) {
      console.log("Elimino sesion porque sus datos estan en null")
      localStorage.removeItem('sesion');
    }
*/
    if(rol == "ADMIN") {
      console.log("Admin desde index.js")
      const reduceName = usuario.split(" ")
      const miniName = reduceName[0]
      console.log(usuario)
      urlPost.forEach(element => {
        element.addEventListener("click", (e) => {
          console.log(e)
          window.location.href = `/auth/${usuario}/publicaciones/${e.target.parentNode.dataset.id}`
      })
    })
  } else {
    urlPost.forEach(element => {
    
        element.addEventListener("click", (e) => {
        window.location.href = `/auth/publicaciones/${e.target.parentNode.dataset.id}`
      })
    })
  }


  }
}

const traerPublicaciones = async () => {
  const resultado = await fetch("/publicaciones");
  const data = await resultado.json();
  const { registros } = data;

  let post = "";
  registros.forEach((e) => {
    const primerParrafo = e.contenido[0]
    const limpiarParrafo = primerParrafo.slice(1, primerParrafo.length - 1)
    post +=`
            <div class="post" data-id=${ e.url }>
                <div class="div-imagen" data-id=${ e.url }>
                  <img class="post-img" src="${ e.imagen }" alt="imagen-del-post" data-id=${ e.url }>
                </div>
                <div class="post-div-contenido" data-id=${ e.url }>
                  <span class="post-fecha">${ e.fecha }</span>
                    <span class="post-autor data-id=${e.url}">| Autor: <STRONG>  ${ e.autor } </STRONG></span>
                    
                    <h2 class="post-titulo">${ e.titulo }</h2>
                    <div class="post-contenido" data-id=${ e.url }> 
                    
                      ${ e.contenido[0] } 
                    </div> 
                </div>
            </div>
          `;
    blog.innerHTML = post;
  });
};








