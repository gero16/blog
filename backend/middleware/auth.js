const jwt = require("jsonwebtoken")
const Usuario = require('../model/model');
const colors = require('colors')

const sendHeader = (req, res, next) => {
  // 
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
    const verifyToken = (req, res, next) => {
        console.log(colors.bgYellow(req.headers))
        
        const token = req.header('auth-token')

        if (!token) return res.status(401).json({ error: 'Acceso denegado' })

        try {
            const verified = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
            req.user = verified
            console.log(colors.bgRed("token verificado!"))
            next() // continuamos
        } catch (error) {
            res.status(400).json({error: 'Token inválido'})
        }
}



module.exports = {
    checkAuth,
    verifyToken
} 