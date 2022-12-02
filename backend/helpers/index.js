const { generarToken } = require ("./generar-tkn");
const { emailRegistro } = require('./emailRegistro');
const { generarJWT } = require("./generar-jwt");



module.exports = {
    generarToken,
    emailRegistro,
    generarJWT
}
