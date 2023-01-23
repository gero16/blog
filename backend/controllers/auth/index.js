const {  indexPlantilla, crearPostPlantilla, perfil } = require('./plantillas');

const { getUsuarios, crearUsuario, confirmarCuenta, loginUsuario,  logoutUsuario, olvidePassword, comprobarPassword, nuevoPassword } = require('./usuarios');

module.exports = {
    getUsuarios,
    crearUsuario,
    loginUsuario,
    logoutUsuario,
    confirmarCuenta,
    olvidePassword,
    comprobarPassword,
    nuevoPassword,
    perfil,
    indexPlantilla,
    crearPostPlantilla,
}