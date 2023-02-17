const nodemailer = require("nodemailer")
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const colors = require('colors');

const remitente = "ggrito16@gmail.com"

const emailRegistro = async (datos) => {
    const { correo, nombre, token, usuario } = datos;
  /*
  // Mailtrap de Prueba
  const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
    })

    const info = await transporter.sendMail({
      from: "geronicola1696@gmail.com",
      to: email,
      subject: "Confima tu cuenta!",
      text: "Confirma tu cuenta para poder participar en la comunidad",
      html: ` 
              <p> Hola: ${name}, debe confirmar tu cuenta en el Espacio Luz de Luna </p>
              <p> Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: 
                  <a href="${process.env.URL_FRONTEND}/confirmar/${token}"> Confirmar Cuenta </a> 
              </p>
  
              <p> Si tu no creaste esta cuenta, puedes ignorar este mensaje </p>
            `
    })*/
    //console.log("Mensaje enviado: %s", info.messageId)

    // Con GMAIL funcionando!
    const createTransport = () => {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            type: "OAuth2",
            clientId:  process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
          },
          // Agregando esto me funciono!!!
          tls: {
            rejectUnauthorized: false
          }
        });
        return transporter;
    }
   
  const transporter = createTransport()
  const info = await transporter.sendMail({
          from:  `"Espacio luz de luna" <${ remitente }>`, // sender address
          to: correo,
          subject: "Confirma tu Cuenta! - Espacio Luz de Luna",
          text: "Confirma tu cuenta para poder ser parte de la comunidad",
          html: ` 
              <head>
                <meta charset="utf-8">
                <style>

                  * {
                    font-size: 18px;
                    text-align: center;
                  }

                  button {
                    padding: 10px;
                    background-color: #25064D;
                    color: white; 
                    border-radius: 5px;
                    border: none;
                  }

                  button:hover {
                    cursor: pointer
                  }
             
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
            auth: {
              user: process.env.USER_GOOGLE,
              refreshToken: process.env.REFRESH_TOKEN,
              accessToken: token,
              expires: 1484314697598,
            },
      });
      console.log(info)
      console.log("Mensaje enviado: %s", info.messageId)
  };

  const emailRecuperarPassword = async (datos) => {
    const { correo, nombre, token, usuario } = datos;
    console.log(colors.bgBlue(token))
    // Con GMAIL funcionando!
    const createTransport = ()=> {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            type: "OAuth2",
            clientId:  process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
          },
          // Agregando esto me funciono!!!
          tls: {
            rejectUnauthorized: false
          }
        });
        return transporter;
    }
   
  const transporter = createTransport()
  const info = await transporter.sendMail({
          from: "Espacio Luz de Luna",
          to: correo,
          subject: "Cambiar tu Contraseña! - Espacio Luz de Luna",
          text: "Si usted no ha solicitado cambiar su contraseña, elimine este correo!",
          html: ` 
              <head>
                <meta charset="utf-8">
                <style>

                  * {
                    font-size: 18px;
                    text-align: center;
                  }

                  button {
                    padding: 10px;
                    background-color: #25064D;
                    color: white; 
                    border-radius: 5px;
                    border: none;
                    cursor: pointer
                  }
             
                </style>
              </head>

              <body>
                <p> Hola <strong> ${ nombre } </strong>, para cambiar su contraseña deberá acceder al siguiente enlace: </p>


                <div class="contenedor-button"> 
                <a href="${ process.env.URL_FRONTEND }/auth/${ usuario }/olvide-password/${ token }">
                    <button> Cambiar Contraseña </button>  
                  </a> 
                </div>

              </body>
            `,
            auth: {
              user: process.env.USER_GOOGLE,
              refreshToken: process.env.REFRESH_TOKEN,
              accessToken: token,
              expires: 1484314697598,
            },
      });
      console.log(colors.bgGreen(info))
      console.log("Mensaje enviado: %s", info.messageId)
  };

 
  module.exports = {
    emailRegistro,
    emailRecuperarPassword
  } 