const {DataTypes } = require("sequelize");
const sequelize = require("../db/db")

const Post = sequelize.define('Post', {
  // Model attributes are defined here
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING
  },
  autor: {
    type: DataTypes.STRING
  },
  contenido: {
    type: DataTypes.ARRAY(DataTypes.TEXT)
  },
  fecha: {
    type: DataTypes.DATEONLY 
  },
  imagen: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING
  },
},
{ 
  timestamps: false,
});


const Comentario = sequelize.define('Comentario', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    usuario: {
      type: DataTypes.STRING,
    },
    usuario_registrado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    mensaje: {
        type: DataTypes.TEXT,
    },
    fecha: {
      type: DataTypes.STRING 
    },
    imagen_usuario: {
      type: DataTypes.STRING,
    }
  },
  { 
    timestamps: false,
  })
  
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING
    },
    correo: {
      type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    usuario: {
      type: DataTypes.STRING
    },
    imagen: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_960_720.png"
    },
    estado: {
      type: DataTypes.BOOLEAN,   
      defaultValue: true         
    },
    token_confirmar: {
      type: DataTypes.STRING
    },
    
    sesion: {
      type: DataTypes.BOOLEAN            
    },
    rol: {
      type: DataTypes.STRING,
      defaultValue: 'USER'
    },
    confirmado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
  },
  { 
    timestamps: false,
  })

  const Usuario_Comentario = sequelize.define('Usuario_Comentario', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
  },
  { 
    timestamps: false,
  })

  
Post.hasMany(Comentario,  {
    foreignKey: "id_post",

  })
 
Usuario.belongsToMany(Comentario, {
  foreignKey: "id_usuario",
  otherKey: "id_comentario",
  through: 'Usuario_Comentario',

})


  module.exports = {
    Post,
    Comentario,
    Usuario,
    Usuario_Comentario,
  }