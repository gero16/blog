const btnLogin = document.querySelector("#login")
const correo = document.querySelector("#correo")
const password = document.querySelector("#password")



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

  const fetchResponse = await fetch(`/auth/login`, settings);
  console.log(fetchResponse)
  const data = await fetchResponse.json();
  console.log(data)
        
  if(fetchResponse.status === 200){
    const dataSesion = [data.correo, data.usuario,  data.token, data.rol]
    localStorage.setItem("sesion", JSON.stringify(dataSesion) );
    window.location.assign(`/auth/${data.usuario}/index`)
    return false;
    //window.location.assign(`/`)
  }
})
const btnRegistro = document.querySelector("#registro")
btnRegistro.addEventListener("click", () => {
  window.location.assign(`/`)
})