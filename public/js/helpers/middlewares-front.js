import { cerrarSesion, getSesion, imgPhoneMenu, logout, menuPhone, sendTokenPlantilla, token, userPublic } from "./helpers-front.mjs"

const btnNotificaciones = document.querySelector(".li-btn-notificaciones")
const modalNotificaciones = document.querySelector(".contenedor-notificaciones")
const notificacionNumero = document.querySelector(".notificacion-numero")
const liNotificacion = document.querySelectorAll(".li-notificacion")

const updateNotificacion = async () => {
  const settings = {method: 'POST', headers: { Accept: 'application/json','Content-Type': 'application/json'}};
  try {
    const fetchResponse = await fetch(`/auth/admin/${ getSesion[1] }/notificaciones`, settings);
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
}
if(getSesion) {

  if(logout) {
    logout.addEventListener("click", cerrarSesion)
  }

  if(btnNotificaciones && getSesion[3] === "ADMIN") {
    btnNotificaciones.addEventListener("click", async () => {
      modalNotificaciones.classList.toggle("active")

      updateNotificacion()
    })
  }

  if(notificacionNumero && getSesion[3] === "ADMIN"){
    if(notificacionNumero.textContent !== 0) {
      const num = Number(notificacionNumero.textContent)
    
      for (let i = 0; i < num; i++) {
            liNotificacion[i].classList.add("notificacion-noleida")
        }
      }
  }
}


imgPhoneMenu.addEventListener("click", () => {
  if(menuPhone.classList.contains("active")) {
    return menuPhone.classList.remove("active")
  } 
  if(menuPhone.className !== "active") {
    return menuPhone.classList.add("active")
  } 
})


if(!userPublic) {
  sendTokenPlantilla()
}