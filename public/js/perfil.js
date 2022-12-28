const updateImg = document.querySelector(".cambiar-foto")
const inputFoto = document.querySelector("#imagen-post");

if(updateImg){
  updateImg.addEventListener("click", () => {
    
  })
}

inputFoto.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
  
      if (inputTitulo.value && inputTitulo.className == "vacio") {
        inputTitulo.classList.remove("vacio");
        texto = inputTitulo.value;
        preTitulo.textContent = texto;
      } else if (inputAutor.value && inputAutor.className == "vacio") {
        inputAutor.classList.remove("vacio");
        texto = inputAutor.value;
        preAutor.textContent = texto;
      } else if (inputFecha.value && inputFecha.className == "vacio") {
        inputFecha.classList.remove("vacio");
        texto = inputFecha.value;
        preFecha.textContent = texto;
      } 
    }
  });

   
  

