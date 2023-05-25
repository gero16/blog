const { getUsuarios, crearUsuario, confirmarCuenta, loginUsuario,  logoutUsuario, olvidePassword, comprobarPassword, nuevoPassword } = require('./usuarios-auth');

module.exports = {
    crearUsuario,
    loginUsuario,
    logoutUsuario,
    confirmarCuenta,
    olvidePassword,
    comprobarPassword,
    nuevoPassword,
}