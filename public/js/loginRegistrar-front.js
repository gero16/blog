import { crearMensaje } from "./helpers/helpers-front.mjs"

const btnLogin = document.querySelector("#login")
const btnRegistro = document.querySelector("#registro")


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
        crearMensaje("El Usuario y/o Contraseña no pueden quedar vacios", ".login")
    }
    const fetchResponse = await fetch(`/auth/login`, settings);
    console.log(fetchResponse)
    const data = await fetchResponse.json();
    console.log(data.msg)
          
    if(fetchResponse.status === 200){
      const dataSesion = [data.correo, data.usuario,  data.token, data.rol]
      localStorage.setItem("sesion", JSON.stringify(dataSesion) );
      window.location.assign(`/`)
      return false;
    } 
    
    if(data.msg === 'El usuario no fue confirmado'){
      crearMensaje("Debe Confirmar su Cuenta!", ".login")
    }
    if (data.msg === 'La contraseña no es correcta') {
      crearMensaje("El Usuario y/o Constraseña son Incorrectos!", ".login")
    }
   
    if(data.msg === 'Su cuenta fue eliminada'){
      crearMensaje( "Su Cuenta fue Eliminada!", ".login")
    }
    if (data.msg === 'El usuario no es correcto') {
      crearMensaje("El Usuario y/o Constraseña son Incorrectos!", ".login")
    }
    console.log(data.msg)
  })  
}


if(btnRegistro){
  const correo = document.querySelector("#email")
  const password = document.querySelector("#password")
  const usuario = document.querySelector("#user")

  btnRegistro.addEventListener("click", () => {
    if(correo.value === "" || password.value === "" || usuario.value === ""){
      crearMensaje("El Usuario y/o Contraseña y/o Usuario no pueden quedar Vacios")
    
    if(data.msg === "El Usuario proporcionado ya existe") {
        crearMensaje( "El Usuario proporcionado ya existe")
    }
  
    if(data.msg === "El Correo proporcionado ya existe") {
        crearMensaje( "El Correo proporcionado ya existe")
    }
      
  } else {
    window.location.assign(`/`)
  }

  })
}

