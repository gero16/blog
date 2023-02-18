# Blog 

## Instalación local

$ git clone https://github.com/gero16/blog.git

$ cd blog

$ npm install

$ npm start

## Rutas definidas

1. La ruta "/" (por default) - muestra la pagina principal, con todas las publciaciones disponibles. 

3. La ruta ":user/confirmar/:token" - Es la ruta 

4. La ruta "/login" - Es usada para que un usuario registrado pueda iniciar sesión 

5. La ruta ":user/logout" - Se usa para cerrar la sesion del usuario con sesión activa

6. La ruta "auth/elgero16/confirmar/:token" - Es la ruta a la que se entra una sola vez por usuario para confirmar su registro

7. La ruta "/auth/:user/index" - Es la pagina principal a la que se redirecciona desde "/" en caso de haber iniciado sesión con un usuario.

8. La ruta "/auth/:user/publicaciones/:titulo" - Es la ruta que muestra la publicacion elegida. El usuario puedo agregar comentarios

9. La ruta "/auth/:admin/editar/:titulo" - Es proporcionada al administrador para editar la publicación deseada

10. La ruta "/auth/:admin/eliminar/:titulo" - Se usa para que el administrador pueda eliminar una publicación deseada

11. La ruta "auth/:admin/crear-post" - Se utiliza para la creacion de publicaciones

12. La ruta "auth/:user/perfil" - Muestra la plantilla donde se ve el perfil con la informacion del usuario que inicio sesión

13. La ruta "auth/validate-token" - Es la ruta a donde se enviara el token de sesion del usuario, una vez entre a una de las rutas que requieren autenticación

14. La ruta "/:user/publicaciones/:titulo/agregar-comentario" - Se utiliza para mandar los datos del mensaje agregado en dicha publicación

15. La ruta "/:admin/publicaciones/:titulo/eliminar-comentario/:id" - Se utiliza para que el administrador pueda eliminar comentarios de dicha publicación

16. La ruta "/*" - define a toda ruta distinta a las anteriores. Devuelve una plantilla con el error 404


## Screenshots

### Pagina Principal ###
![App Screenshot](https://res.cloudinary.com/geronicola/image/upload/v1676516350/b4urgrwuuqqhg7yd3isz.jpg)

### Crear Publicación ###
![App Screenshot](https://res.cloudinary.com/geronicola/image/upload/v1676516350/vijgi7e7fh9ydcjm7gb8.jpg)

### Editar Publicación ###
![App Screenshot](https://res.cloudinary.com/geronicola/image/upload/v1676516351/govq5ylrlffqydd2c4hv.jpg)

### Eliminar Publicación ###
![App Screenshot](https://res.cloudinary.com/geronicola/image/upload/v1676516350/ule2dmtkwiiqwmoib3jb.jpg)


## Demo en formato gif
###  Iniciar sesión  ###
![](https://i.imgur.com/r3PB3ma.gif)
###  Crear una publicación  ###
![](https://i.imgur.com/4YGunAP.gif)


## Authors

~ Geronimo Nicola 
