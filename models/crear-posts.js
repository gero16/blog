const { Schema, model } = require("mongoose");

const CrearPostSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
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

module.exports = model("crearPost", CrearPostSchema);
