'use strict';

// USERS //

// password : 123
const bcrypt = require('bcrypt');
const encryptedPassword =  bcrypt.hashSync("123", 10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up:(queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [
      {
        correo: "usuario@prueba.com",
        nombre: "usuario",
        password: encryptedPassword,
        usuario: "usuario",
        imagen: 'https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_960_720.png',
        estado: true,
        rol: 'USER',
        confirmado: true,
      },
      {
        correo: "admin@prueba.com",
        nombre: "admin",
        password: encryptedPassword,
        usuario: "admin",
        imagen: 'https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_960_720.png',
        estado: true,
        rol: 'ADMIN',
        confirmado: true,
      },
      {
        correo: "elgero16@gmail.com",
        nombre: "elgero16",
        password: encryptedPassword,
        usuario: "elgero16",
        imagen: 'https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_960_720.png',
        estado: true,
        rol: 'ADMIN',
        confirmado: true,
      },
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuarios', null, {});
  },
};
