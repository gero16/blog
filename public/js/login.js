const btnLogin = document.querySelector("#login")
const correo = document.querySelector("#correo")
const password = document.querySelector("#password")
const divLogin = document.querySelector(".login")
const tituloLogin = document.querySelector(".titulo-login")



btnLogin.addEventListener("click", async (e) => {

  const datos = {
    correo: correo.value,
    password: password.value,
  }

  console.log(datos)
  const settings = {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      };
  
  if(correo.value === "" || password.value === ""){
      const mensaje = document.createElement("span")
      mensaje.classList.add("alert")
      mensaje.textContent = "El Usuario y/o Contraseña no pueden ser vacios"
      divLogin.append(mensaje)
      setTimeout(() => {
        mensaje.remove()
      }, 5000);
  }
  const fetchResponse = await fetch(`/auth/login`, settings);
  console.log(fetchResponse)
  const data = await fetchResponse.json();
  console.log(data.msg)
        
  if(fetchResponse.status === 200){
    const dataSesion = [data.correo, data.usuario,  data.token, data.rol]
    localStorage.setItem("sesion", JSON.stringify(dataSesion) );
    window.location.assign(`/auth/${data.usuario}/index`)
    return false;
    //window.location.assign(`/`)
  } 
  if(data.msg === 'El usuario no fue confirmado'){
    const mensaje = document.createElement("span")
    mensaje.classList.add("alert")
    mensaje.textContent = "Debe Confirmar su Cuenta!"
    divLogin.append(mensaje)
    setTimeout(() => {
      mensaje.remove()
    }, 5000);
  }
  if (data.msg === 'El usuario no es correcto') {
    const mensaje = document.createElement("span")
    mensaje.classList.add("alert")
    mensaje.textContent = "El Usuario y/o la Constraseña son Incorrectos!"
    //divLogin.insertBefore(mensaje, tituloLogin)
    divLogin.append(mensaje)
    setTimeout(() => {
      mensaje.remove()
    }, 5000);
  }
 
  if(data.msg === 'Su cuenta fue eliminada'){
    const mensaje = document.createElement("span")
    mensaje.classList.add("alert")
    mensaje.textContent = "Su Cuenta fue Eliminada!"
     divLogin.append(mensaje)
     setTimeout(() => {
      mensaje.remove()
    }, 5000);
  }
})
const btnRegistro = document.querySelector("#registro")

if(btnRegistro){
  btnRegistro.addEventListener("click", () => {
    window.location.assign(`/`)
  })
}
