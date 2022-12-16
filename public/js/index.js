const blog = document.querySelector(".blog");
const logout = document.querySelector(".logout")
const refCrear = document.querySelector(".ref-crear")


window.onload = async function (e) {
  e.preventDefault()

  await traerPublicaciones();

  const urlPost = document.querySelectorAll(".post")//.getAttribute("data-id")

  const sesion = JSON.parse(localStorage.getItem('sesion'));
  
  if(sesion && window.location.pathname == "/") {
    window.location.href = `/auth/${sesion[1]}/index`
  }

  if(sesion) {
    const [correo, usuario, token, rol] = sesion;

    if(rol == "ADMIN") {
      console.log("Admin desde index.js")
      const reduceName = usuario.split(" ")
      const miniName = reduceName[0]
      console.log(usuario)
      urlPost.forEach(element => {
        console.log(element)
        element.addEventListener("click", (e) => {
          console.log(e)
          window.location.href = `http://localhost:4000/auth/${usuario}/publicaciones/${e.target.parentNode.dataset.id}`
      })
    })
  } else {
    urlPost.forEach(element => {
      console.log(element)
      console.log(e.target)
        element.addEventListener("click", (e) => {
        window.location.href = `http://localhost:4000/auth/publicaciones/${e.target.parentNode.dataset.id}`
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



const cerrarSesion = async (e) => {
    e.preventDefault()   

    const getSesion = JSON.parse(localStorage.getItem('sesion'));
    console.log(getSesion)
    const usuario = getSesion[1]
    
    localStorage.removeItem('sesion');
    
    const data = {
      usuario:usuario,
    }

    console.log(data)
    const settings = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }};
    try {
      const fetchResponse = await fetch(`/auth/${usuario}/logout`, settings);
      const data = await fetchResponse.json();
      if(data) {
        window.location.assign = "/"
      }
     
    
    } catch (error) {
      console.log(error)
    }
  
}

const port = 4000


if(logout) {
  logout.addEventListener("click", cerrarSesion)

}




