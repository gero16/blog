const roles = document.querySelectorAll(".usuario-rol")

roles.forEach(rol => {
    console.log(rol)
    if(rol.textContent === "ADMIN") {
    console.log("hola")
       rol.innerHTML = "Administrador"
    } 
    if(rol.textContent ==="USER") {
        rol.innerHTML = "Usuario"
    }
});