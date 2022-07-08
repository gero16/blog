const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  titulo: {
    type: String,
    required: [true, "El Titulo es obligatorio"],
  },
  autor: {
    type: String,
    required: true,
  },
  contenido: {
    type: Array,
    required: true,
  },
  imagen: {
    type: String,
  },
  fecha: {
    type: String,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
});
/*
PostSchema.methods.toJSON = function () {
  const { post } = this.toObject();
  return post;
};
*/

module.exports = model("post", PostSchema);
