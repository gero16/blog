const {DataTypes } = require("sequelize");
const {sequelize} = require("../db/db")

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
        type: DataTypes.TEXT('long')
    },
    fecha: {
      type: DataTypes.STRING 
    },
    hora: {
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
    
    token_sesion: {
      type: DataTypes.STRING        
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

  const Admin_Post = sequelize.define('Admin_Post', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
  },
  { 
    timestamps: false,
  })

  const Notificaciones = sequelize.define('Notificaciones', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    nombre_admin: {
      type: DataTypes.STRING,
    },
    nombre_remitente: {
      type: DataTypes.STRING,
    },
    mensaje: {
      type: DataTypes.STRING,
    },
    url_publicacion: {
      type: DataTypes.STRING,
    },
    leida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fecha: {
      type: DataTypes.STRING,
    },
    hora: {
      type: DataTypes.STRING,
    },
    imagen_remitente : {
      type: DataTypes.STRING,
    }
  },
  { 
    timestamps: false,
  })

// En comentarios - tengo un solo idPost
Post.hasMany(Comentario,  {
    foreignKey: "id_post",

  })
 

// Tabla Nueva con id_usuario y id_comentario |||| Esta en realidad no esta funcionando  -  en sql es Usuairo_Comentario y la de arriba es Usuario_Comentarios
Usuario.belongsToMany(Comentario, {
  foreignKey: "id_usuario",
  otherKey: "id_comentario",
  through: 'Usuario_Comentario',
})

  // Solo para el admin
Usuario.belongsToMany(Post, {
    foreignKey: "id_admin",
    otherKey: "id_post",
    through: 'Admin_Post',
  
})


  module.exports = {
    Post,
    Comentario,
    Usuario,
    Usuario_Comentario,
    Admin_Post,
    Notificaciones
  }