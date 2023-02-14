



window.onload = async function (e) {
  const titulo = document.querySelector(".titulo-post")
  const editar = document.querySelector(".editar")
  const eliminar = document.querySelector(".eliminar")
  const logout = document.querySelector(".logout")
  
  const getSesion = JSON.parse(localStorage.getItem('sesion'));
  
  const cerrarSesion = async (e) => {
      e.preventDefault()   
  
      const usuario = getSesion[1]
      
      localStorage.removeItem('sesion');
      
      const data = {
        usuario:usuario,
      }
  
      const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }};
      try {
        const fetchResponse = await fetch(`/auth/${usuario}/logout`, settings);
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
  
  console.log(window.location.pathname)

  const sendTokenGet = async () => {
  
    const token = getSesion ? getSesion[2] : "fsdsdf"
    const settings = { 
        method: 'GET', 
        headers: { 
          "Content-Type": "application/json", 
          "auth-token": token },
    };
    
    try {
        const fetchResponse = await fetch(`/auth/validate-token`, settings);
        console.log(fetchResponse)

      
    } catch (e) {
        return e;
    } 
  }
  sendTokenGet()

  
  const sendToken = async () => {
  
      const token = getSesion ? getSesion[2] : null
      console.log(token)
      const settings = { 
          method: 'POST', 
          headers: { 
            "Content-Type": "application/json", 
            "auth-token": token },
      };
      
      try {
          const fetchResponse = await fetch(`/auth/validate-token`, settings);
          console.log(fetchResponse)

        
      } catch (e) {
          return e;
      } 
    }
    
  
  sendToken()
  
  
  const updateImg = document.querySelector(".cambiar-foto")
  if(updateImg){
    updateImg.addEventListener("click", () => {
      
    })
  }
  
  
  const btnNotificaciones = document.querySelector(".li-btn-notificaciones")
  const btnSalirNotificaciones = document.querySelector(".salir-notificaciones")
  const modalNotificaciones = document.querySelector(".contenedor-notificaciones")
  const divNotificacion = document.querySelector(".notificacion-noleida")
  
  if(btnNotificaciones){
    const sesion = JSON.parse(localStorage.getItem('sesion'));
  
    btnNotificaciones.addEventListener("click", async () => {
      modalNotificaciones.classList.toggle("active")
  
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
          if(!modalNotificaciones.classList.contains("active")) {
            window.location.reload()
            document.querySelector(".notificacion-numero").innerHTML = "0"
          }
        }
      } catch (error) {
        console.log(error)
      }
  
     
    })
  }
  
  const notificacionNumero = document.querySelector(".notificacion-numero")
  const liNotificacion = document.querySelectorAll(".li-notificacion")
  const arrayNotificaciones = Array.apply(null, liNotificacion);
  
  if(notificacionNumero){
    if(notificacionNumero.textContent !== 0) {
      const num = Number(notificacionNumero.textContent)
    
      for (let i = 0; i < num; i++) {
           liNotificacion[i].classList.add("notificacion-noleida")
        
      }
    }
  }
  
  const imgPhoneMenu = document.querySelector(".img-menu") 
  imgPhoneMenu.addEventListener("click", () => {
    const menuPhone = document.querySelector(".ocultar-transition") 
    console.log(menuPhone)
    if(menuPhone.classList.contains("active")) {
      return menuPhone.classList.remove("active")
    } 
    if(menuPhone.className !== "active") {
      return menuPhone.classList.add("active")
    } 
    
  })
  
}