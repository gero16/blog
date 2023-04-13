
const { emailRegistro } = require('./emailRegistro');
const { generarJWT , generarToken} = require("./generar-token");



module.exports = {
    generarToken,
    emailRegistro,
    generarJWT
}
