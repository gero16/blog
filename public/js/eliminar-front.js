const btnEliminar = document.querySelector(".confirm");
const id = document.querySelector(".id-borrar")

const newLocation = window.location.pathname.split("/")
console.log(newLocation)
const usuarioEliminar = newLocation[4]
const categoriaEliminar = newLocation[4]

if(btnEliminar) {
  btnEliminar.addEventListener("click", async () => {
    // Porque sino me afecta con el js de los middlewares
    const sesion =  JSON.parse(localStorage.getItem('sesion'));
    const token = sesion[2]
    const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "auth-token": token 
            }};
          try {
            console.log("hola")
            console.log(window.location.pathname)
            console.log(categoriaEliminar)
            if(categoriaEliminar === "eliminar-post") {
              const fetchResponse = await fetch(`/auth/${ sesion[1] }/eliminar-post/${ id.textContent }`, settings);
              console.log(fetchResponse)
              if(fetchResponse.status === 200) {
                console.log("Publicacion eliminada Correctamente!")
                window.location.assign("/")
              }
            } 
            if (categoriaEliminar === "eliminar-usuario") {
              const fetchResponse = await fetch(`/auth/${ newLocation[2] }/eliminar-usuario/${usuarioEliminar }`, settings);
              console.log(fetchResponse)
              if(fetchResponse.status === 200) {
                console.log("Usuario Eliminado Correctamente!")
                window.location.assign("/")
              }
            }
            
          } catch (error) {
            console.log(error)
          }
        })
      }

