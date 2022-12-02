const btnEliminar = document.querySelector(".confirm");


btnEliminar.addEventListener("click", () => {
        
        console.log(window.location.href)
        window.location.href = `http://localhost:3000/api/eliminar-post`
        
})