const btnEliminar = document.querySelector(".confirm");
const id = document.querySelector(".id-borrar")
console.log(id.textContent)

if(btnEliminar) {
  btnEliminar.addEventListener("click", async () => {
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
            const fetchResponse = await fetch(`/auth/eliminar-post/${id.textContent}`, settings);
            console.log(fetchResponse)
            if(fetchResponse.status === 200) {
              console.log("Mensaje Eliminado Correctamente!")
              window.location.assign("/")
            }
            
          } catch (error) {
            console.log(error)
          }
        })
      }



const btnEliminarUsuario = document.querySelector(".img-eliminar-usuario")
if(btnEliminarUsuario) {

}