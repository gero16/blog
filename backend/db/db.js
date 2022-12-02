const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('blog', 'postgres', 'root', {
    host: 'localhost',
    dialect:  'postgres' 
  });

  module.exports = sequelize