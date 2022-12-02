const { Usuario } = require('../model/model');
const colors = require('colors');

const esAdmin = async (req, res, next) => {

  const { admin } = req.params
  console.log(colors.bgYellow("ES ADMIN"))
    try {
      const user = await Usuario.findOne({where: { usuario: admin }});
      console.log(user.dataValues)
      const usuario = user.dataValues;

      if(usuario.rol == "ADMIN") {
        console.log("Puede acceder a esta seccion")
    
        next();
      } else {
        console.log("No tiene permisos para editar y eliminar")
      // 
        next()
    }
    } catch (error) {
      console.log(error)
    }
  }

const validToken = (req, res, next) => {

}

module.exports = {
    esAdmin,
    validToken
}