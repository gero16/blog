const blog = document.querySelector(".blog");

const traerPublicaciones = async () => {
  const resultado = await fetch("/api/publicaciones");
  const data = await resultado.json();
  console.log(data);
  const { registros } = data;

  let post = "";

  registros.forEach((e) => {

    post +=`
    <div class="post" data-id=${e.url}>
        <div class="div-imagen" data-id=${e.url}>
          <img class="post-img" src="${e.imagen}" alt="imagen-del-post" data-id=${e.url}>
        </div>
        <div class="post-div-contenido" data-id=${e.url}>
            <p class="post-fecha">${e.fecha}</p>
            <h2 class="post-titulo">${e.titulo}</h2>
            <div class="post-contenido" data-id=${e.url} >${e.contenido}</div>
            <p class="post-autor data-id=${e.url}">Autor: <STRONG>  ${e.autor} </STRONG> </p>
          </div>
    </div>
`;
    blog.innerHTML = post;
  });
};

window.onload = async function () {
  await traerPublicaciones();

  const urlPost = document.querySelectorAll(".post")//.getAttribute("data-id")
  urlPost.forEach(element => {
  console.log(element.dataset.id);
  element.addEventListener("click", (e) => {
   
   console.log(e.target.parentNode.dataset.id)
   console.log(window.location.href)
   window.location.href = `http://localhost:3000/:${e.target.parentNode.dataset.id}`
  })
  })

};
