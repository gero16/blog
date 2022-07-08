
let autorHTML = document.querySelector(".strong-autor-post");
let textoHTML = document.querySelector(".texto-post");
let tituloHTML = document.querySelector(".titulo-post")
let subtituloHTML = document.querySelector(".subtitulo-post");
let imagenHTML = document.querySelector(".foto-post");
const btnEditar = document.querySelector(".editar")
const iconosEditar = document.querySelectorAll(".ico-editar")

const inputs = document.querySelectorAll(".inputs")
const btnActualizar = document.querySelector(".actualizar")
btnGuardar = document.querySelectorAll(".guardar")

let actualizarHTML = "";
let etiquetaContenido = [];


/*
const traerDatos = async () => {
     try {
        const resultado = await fetch("/api/crear-post");
        const data = await resultado.json();
        console.log(data);
        let {datos} = data;
        let post = datos[0];
        let {id, titulo, contenido, autor, imagen} = post;
        console.log(autor);

        autorHTML.textContent = autor;
        textoHTML.innerHTML = contenido;
        tituloHTML.textContent = titulo;
        imagenHTML.src = imagen;
        
    } catch (error) {
        console.log(error)
    }
}
*/

btnEditar.addEventListener("click", () => {
    inputs.forEach(element => {
        element.style.display ="block"
        console.log(element.classList === "inputs-contenido");
        element.addEventListener("keyup", (e) => {
            console.log(element.value);
            

            let editar = document.querySelector(`.${element.id}-post`);
            editar.textContent = element.value;   
        })
    });
})


btnGuardar.forEach(element => {
    let iterador = 0;
    element.addEventListener("click", (e)=>{
        console.log(e.target)

        iterador++;
    })
});

window.onload = async function () {
   // await traerDatos();
}


