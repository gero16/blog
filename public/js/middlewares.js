const titulo = document.querySelector(".titulo-post")
const editar = document.querySelector(".editar")
const eliminar = document.querySelector(".eliminar")
const logout = document.querySelector(".logout")

const getSesion = JSON.parse(localStorage.getItem('sesion'));

const cerrarSesion = async (e) => {
    e.preventDefault()   
    console.log("cerrar sesion")
    const getSesion = JSON.parse(localStorage.getItem('sesion'));
    const usuario = getSesion[1]
    
    localStorage.removeItem('sesion');
    
    const data = {
      usuario:usuario,
    }

    console.log(data)
    const settings = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }};
    try {
      const fetchResponse = await fetch(`/auth/${usuario}/logout`, settings);
      console.log(fetchResponse)
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

console.log("hola")

const sendToken = async () => {
  if(getSesion) {
    const sesion =  JSON.parse(localStorage.getItem('sesion'));
    const token = sesion[2]

    const settings = { 
        method: 'POST', 
        headers: { 
          "Content-Type": "application/json", 
          "auth-token": token },
    };
    
    try {
        const fetchResponse = await fetch(`/auth/validate-token`, settings);
        if(fetchResponse.ok === false){
           const data = await fetchResponse.json();
           console.log(data)
           window.location.assign("/error/401")
        }
       
        console.log(data)
    } catch (e) {
        return e;
    } 
  }
    
}

sendToken()


const updateImg = document.querySelector(".cambiar-foto")
if(updateImg){
  updateImg.addEventListener("click", () => {
    
  })
}

const listaNotificaciones = document.querySelector(".lista-notificaciones")

const notificaciones = async () => {

  const getSesion = JSON.parse(localStorage.getItem('sesion'));

  const resultado = await fetch(`/auth/${ getSesion[1] }/notificaciones`);
  const data = await resultado.json();
  const { notificaciones } = data;
  console.log(notificaciones)
  let notificacionNueva;

  notificaciones.forEach(notificacion => {
    notificacionNueva += ` 
    <li>
      <a(href="/auth/elgero16/publicaciones/el-gran-oceano")>  
        <div(class="li-notificacion flex-between")> 
            <div(class="img-user")>
                img(src="/img/avatar1.png", alt="" class="avatar-notificacion")
            </div>
            <div(class="div-mensaje-notificacion")>
                <p(class="mensaje-notificacion")> ${ notificacion.nombre_remitente } ha comentado tu Publicación  </p>
                <span(class="fecha-mensaje-notificacion")> 12 de Julio, 2023 </span>
            </div>
        </div>
      </a>
    </li>
    `
  });
  //listaNotificaciones.append(notificacionNueva)
 
}


 
  notificaciones();
