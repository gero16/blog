const btnLogin = document.querySelector("#login")
const divLogin = document.querySelector(".login")
const tituloLogin = document.querySelector(".titulo-login")
const btnRegistro = document.querySelector("#registro")

const crearMensaje = (msg) => {
  const mensaje = document.createElement("span")
  mensaje.classList.add("alert")
  mensaje.textContent = msg
  divLogin.append(mensaje)

  setTimeout(() => {
    mensaje.remove()
  }, 6000)
  
}

if(btnLogin){
  btnLogin.addEventListener("click", async (e) => {
    const correo = document.querySelector("#correo")
    const password = document.querySelector("#password")
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
        crearMensaje("El Usuario y/o Contraseña no pueden quedar vacios")
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
    } 
    if(data.msg === 'El usuario no fue confirmado'){
      crearMensaje("Debe Confirmar su Cuenta!")
    }
    if (data.msg === 'La contraseña no es correcta') {
      crearMensaje("El Usuario y/o Constraseña son Incorrectos!")
    }
   
    if(data.msg === 'Su cuenta fue eliminada'){
      crearMensaje( "Su Cuenta fue Eliminada!")
    }
  })  
}


if(btnRegistro){
  const correo = document.querySelector("#email")
  const password = document.querySelector("#password")
  const usuario = document.querySelector("#user")


  const datos = {
    correo: correo.value,
    usuario: usuario.value,
    password: password.value,
  }

  btnRegistro.addEventListener("click", () => {
    if(correo.value === "" || password.value === "" || usuario.value === ""){
      crearMensaje("El Usuario y/o Contraseña y/o Usuario no pueden quedar Vacios")
      
  } else {
    window.location.assign(`/`)
  }

  })
}
