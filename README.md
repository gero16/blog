# Blog 

## Instalación local

$ git clone https://github.com/gero16/blog.git

$ cd blog

$ npm install

$ npm start

## Rutas definidas

Configuradas en App.js

1. La ruta "/" (por default) - muestra la pagina principal, con todas las publciaciones disponibles. 

2. La ruta "/auth/:user/index" - Es la pagina principal a la que se redirecciona desde "/" en caso de haber iniciado una sesión por el usuario.

3. La ruta "/auth/:user/publicaciones/:titulo" - Es la ruta que muestra la publicacion elegida, y donde el usuario puede interactuar haciendo comentarios.

4. La ruta "/auth/:admin/editar/:titulo" - Es la proporcionada al administrador para editar una publicacion

5. La ruta "/auth/:admin/eliminar/:titulo" - Es la proporcionada al administrador para eliminar una publicacion

6. La ruta "auth/:admin/crear-post" - Se utiliza para la creacion de publicaciones

8. La ruta "auth/:user/perfil" - Muestra la plantilla donde se ve el perfil del usuario logeado.

9. La ruta "*" define que toda ruta a la que se quiera acceder mediante el navegador, y no este registrada devuelva una plantilla con el error 404


## Screenshots

![App Screenshot](https://res.cloudinary.com/geronicola/image/upload/v1674170555/hnafei5gqfkabswtjgxr.jpg


## Demo en formato gif


## Authors

Geronimo Nicola 
