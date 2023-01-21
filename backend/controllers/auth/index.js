const {  indexPlantilla, crearPostPlantilla, perfil } = require('./plantillas');

const { getUsuarios, crearUsuario, confirmarCuenta, loginUsuario, infoSesion, logoutUsuario, olvidePassword, comprobarPassword, 
    nuevoPassword , mandarInfoSesion , activeSesion} = require('./usuarios');

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
    activeSesion,
    indexPlantilla,
    crearPostPlantilla,
}