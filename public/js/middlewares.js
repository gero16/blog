const titulo = document.querySelector(".titulo-post")
const editar = document.querySelector(".editar")
const eliminar = document.querySelector(".eliminar")
const logout = document.querySelector(".logout")

const getSesion = JSON.parse(localStorage.getItem('sesion'));

const cerrarSesion = async (e) => {
    e.preventDefault()   
    console.log("cerrar sesion")
    const getSesion = JSON.parse(localStorage.getItem('sesion'));
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
      console.log(fetchResponse)
      if(fetchResponse.ok == true) {
        window.location.href = "/"
      }
     
    
    } catch (error) {
      console.log(error)
    }
  
}


if(logout) {
  logout.addEventListener("click", cerrarSesion)

}

console.log("hola")

const sendToken = async () => {
  if(getSesion) {
    const sesion =  JSON.parse(localStorage.getItem('sesion'));
    const token = sesion[2]

    const settings = { 
        method: 'POST', 
        headers: { 
          "Content-Type": "application/json", 
          "auth-token": token },
    };
    
    try {
        const fetchResponse = await fetch(`/auth/validate-token`, settings);
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
    
}

sendToken()


const updateImg = document.querySelector(".cambiar-foto")
if(updateImg){
  updateImg.addEventListener("click", () => {
    
  })
}


 

const btnNotificaciones = document.querySelector(".li-notificaciones")
const btnSalirNotificaciones = document.querySelector(".salir-notificaciones")
const modalNotificaciones = document.querySelector(".contenedor-notificaciones")

if(btnNotificaciones){
  const sesion = JSON.parse(localStorage.getItem('sesion'));

  btnNotificaciones.addEventListener("click", async () => {
    modalNotificaciones.style.display = "block"
    // Hacer un POST para cambiar el estado de las notifaciones de leido a true
    const data = {
      notificacion : true,
    }

    console.log(data)
    const settings = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }};
    try {
      const fetchResponse = await fetch(`/auth/${ sesion[1] }/notificaciones`, settings);
      console.log(fetchResponse)
       if(fetchResponse.status === 200) {
        document.querySelector(".notificacion-numero").innerHTML = "0"
      }
    } catch (error) {
      console.log(error)
    }
  
  })
}

if(btnSalirNotificaciones) {
  btnSalirNotificaciones.addEventListener("click", () => {
    modalNotificaciones.style.display = "none"
    location.reload();
  })  
}
