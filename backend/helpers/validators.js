const { Usuario } = require('../models/model');
const colors = require('colors');

const esAdmin = async (req, res, next) => {

  const { admin } = req.params
  console.log(colors.bgYellow("ES ADMIN"))
    try {
      const user = await Usuario.findOne({where: { usuario: admin }});
      console.log(user.dataValues)
      const usuario = user.dataValues;

      if(usuario.rol === "ADMIN") {
        console.log("Puede acceder a esta seccion")
    
        next();
      } else {
        console.log("No tiene permisos")
        res.status(401).render("error", {
          error: 401
      })
    }
    } catch (error) {
      console.log(error)
    }
  }

const validToken = (req, res, next) => {

}

const rutaInexistente = (req, res) => {
  res.status(401).render("error", {
    error: 404
})
}

module.exports = {
    esAdmin,
    validToken,
    rutaInexistente
}