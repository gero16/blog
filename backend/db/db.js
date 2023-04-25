require('dotenv').config()

const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect:  'postgres', 
  port: process.env.DB_PORT,
});


const conectarBD = async () => {
  try {
      await sequelize.authenticate();
      console.log('Conexion establecida');
      await sequelize.sync();

    } catch (error) {
      console.error('No se pudo conectar a la base', error);
    }
}

 

  module.exports = {
    sequelize,
    conectarBD
  }