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
        const data = await fetchResponse.json();
        console.log(data)
        
        if(data){
          const dataSesion = [data.correo, data.usuario,  data.token, data.rol]
          console.log(dataSesion)
          localStorage.setItem("sesion", JSON.stringify(dataSesion) );

          window.location.assign("/")
        }
        
})
