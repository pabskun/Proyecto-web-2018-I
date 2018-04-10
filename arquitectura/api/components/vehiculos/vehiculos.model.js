//Requerimos mongoose
const mongoose = require('mongoose');

//Esquema de usuarios
var CarSchema = new mongoose.Schema({
  modelo : String,
  matricula : String,
  marca : String,
  image : String,
  idCliente: String,
  reparaciones : Array
});

//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('Car', CarSchema); 
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural