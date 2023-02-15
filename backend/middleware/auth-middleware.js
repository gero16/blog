const jwt = require("jsonwebtoken")

const colors = require('colors');
const { Usuario } = require("../models/model");


const checkEmptyData = (req, res, next) =>{
    const { correo, password } = req.body;
    console.log(colors.bgMagenta(correo))

    if (correo == "" || password == "") {
        console.log("Empty data")
        const err = new Error("Ni el correo ni la contraseña pueden estar vacios")
        res.status(501).json({msg: err.message})  

     } else {
        next();
     }
}

const checkAuth = async (req, res, next) => {
    console.log(req.headers)
    let token;
    // Tengo que mandar el payload del token con el Bearer hacer el verify y comprobar que la firma no cambio

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        console.log("El token comienza con bearer")

        try {
            // Asi separo el Bearer del token
            token = req.headers.authorization.split(" ")[1]
            console.log(colors.bgBlue(token))
            // SECRETORPRIVATEKEY misma para crear el token, como para verificarlo
            const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
            // Obtengo el uid de mi usuario entre otros datos
            console.log(decoded)
    
            // Creamos una sesion de esta forma con dicho usuario
            req.usuario = await Usuario.findById(decoded.uid).select("-password -confirmado")
    
     
            return next();
        } catch (error) {
            if(!token) {
                const err = new Error("Token no valido")
               return res.status(403).json({msg: err.message})   
            }}
    } else {
        const err = new Error("Token no valido o inexistente")
        res.status(403).json({msg: err.message})   
      
    }
    next();
}


// middleware to validate token (rutas protegidas)
const verifyToken = async (req, res, next) => {
        const token = req.header('auth-token')
        console.log(colors.bgWhite(token))
        console.log("hola")

        if (!token) {
     
            return res.status(401).render("error", {
                error: 401,
                mensaje: "No tiene autorización para realizar esta acción"
              })
        }

        try {
          
            const verified = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
            req.user = verified
            req.body = token
     
            next()
        } catch (error) {
            console.log("Se cumple la condicion")
            return res.status(401).render("error", {
                error: 401,
                mensaje: "Token inválido"
              })
        }
}

const verifyTokenPlantillas = async (req, res, next) => {
    const usuario = req.params.admin

    const usuarioToken = await Usuario.findOne({ where : { usuario : usuario }})
   // console.log(colors.bgWhite(usuarioToken.token_sesion))
    const token_sesion = usuarioToken ? usuarioToken.token_sesion : undefined


    if(token_sesion == undefined) {
        return res.status(401).render("error", {
            error: 401,
            mensaje: "No tiene autorización para realizar esta acción"
          })
    }
    
    try {
        console.log("Su token es valido!")
        const verified = jwt.verify(token_sesion, process.env.SECRETORPRIVATEKEY)
        req.user = verified
        req.body = token_sesion
 
        next()
    } catch (error) {
        console.log("Se cumple la condicion")
        return res.status(401).render("error", {
            error: 401,
            mensaje: "Token inválido"
          })
    }
}


const datosExistentes = async (req, res, next) => {
    try {
        const existUsuario = await Usuario.findOne({where : {usuario: req.body.usuario }})
        const existCorreo = await Usuario.findOne({where : {correo: req.body.correo }})
      
        if(existCorreo != null || existUsuario != null ) {
            if(existUsuario) {
                const err = new Error("El Usuario proporcionado ya existe")
                res.status(501).json({msg: err.message})  
            }
            if(existCorreo){
                const err = new Error("El Correo proporcionado ya existe")
                res.status(501).json({msg: err.message})  
            }
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    checkAuth,
    verifyToken,
    verifyTokenPlantillas,
    checkEmptyData,
    datosExistentes
} 