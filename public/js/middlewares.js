const titulo = document.querySelector("titulo-post")
const editar = document.querySelector(".editar")
const eliminar = document.querySelector(".eliminar")

const getSesion = JSON.parse(localStorage.getItem('sesion'));

//const url = titulo.value.toLowerCase().replaceAll(" ","-")

//const urlEditar = `http://localhost:4000/auth/${getSesion[1]}/editar/${url}`
//const urlEliminar = `http://localhost:4000/auth/${getSesion[1]}/eliminar/${publicacion}`






/*

editar.addEventListener("click", () => {
    sendToken(urlEditar)
})

editar.addEventListener("click", () => {
    sendToken(urlEliminar)
})
*/

const sendToken = async () => {
  const sesion =  JSON.parse(localStorage.getItem('sesion'));
  const token = sesion[2]

  const settings = { 
      method: 'GET', 
      headers: { 
        "Content-Type": "application/json", 
        "auth-token": token },
  };
  
  try {
      const fetchResponse = await fetch(`/auth/validate-token`, settings);
      console.log(fetchResponse)
      if(fetchResponse.ok === false){
         const data = await fetchResponse.json();
         console.log(data)
         window.location.assign("/error/401")
      }
     
      console.log(data)
  } catch (e) {
      return e;
  }    
}

sendToken()