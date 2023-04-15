

const colors = require('colors');

const bunyan = require('bunyan');
const nodemailer = require('nodemailer');

const emailRegistro2 = async (datos) => {
  const { correo, nombre, token, usuario } = datos;
  
  let logger = bunyan.createLogger({
      name: 'nodemailer'
  });

  logger.level('trace');

  let transporter = nodemailer.createTransport(
      {
          service: 'Gmail',
          auth: {
              type: 'OAuth2',
              user:  process.env.USER_GOOGLE,
              clientId:  process.env.CLIENT_ID,
              clientSecret:  process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
              accessToken: token,
              expires: 12345
          },
          logger,
      },
      {
          from: `"Espacio luz de luna" <${ process.env.USER_GOOGLE }>`
         
      }
  );

  let message = {
      to: correo,
      subject: "Confirma tu Cuenta! - Espacio Luz de Luna",
      text: "Confirma tu cuenta para poder ser parte de la comunidad",
      html: ` 
      <head>
        <meta charset="utf-8">
        <style>
          * { font-size: 18px; text-align: center; }
          button { padding: 10px; background-color: #25064D; color: white; border-radius: 5px; border: none; }
          button:hover { cursor: pointer }
        </style>
      </head>
  
      <body>
        <p> Hola <strong> ${ nombre } </strong>, debe confirmar su cuenta en el Espacio Luz de Luna </p>
  
        <p> Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: </p>
  
        <div class="contenedor-button"> 
          <a href="${ process.env.URL_FRONTEND }/auth/${ usuario }/confirmar/${ token }">
            <button> Confirmar Cuenta </button>  
          </a> 
        </div>
  
        <p> Si tu no creaste una cuenta asociada a este correo electronico puedes ignorar este mensaje </p>
  
      </body>
    `,
  
  };
  
  transporter.sendMail(message, (error, info) => {
      if (error) {
          console.log('Ha ocurrido un Error!');
          console.log(colors.bgRed(error.message));
          return;
      }
      console.log(colors.bgRed('Mensaje enviado correctamente!'));
      //console.log(colors.bgRed(info.response));
      transporter.close();
  });

}


 
module.exports = {
  emailRegistro2,

} 