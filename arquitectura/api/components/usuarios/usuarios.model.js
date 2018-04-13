//Requerimos mongoose
const mongoose = require('mongoose');

//Esquema de usuarios
var UserSchema = new mongoose.Schema({
  cedula : {type : String, required : true},
  primerNombre : {type : String, required : true},
  segundoNombre : {type : String},
  primerApellido : {type : String, required : true},
  segundoApellido : {type : String},
  fechaNacimiento : {type : String, required : true},
  correoElectronico : {type : String, required : true},
  contrasenna : {type : String, required : true},
  provincia : {type : String, required : true},
  canton : {type : String, required : true},
  distrito : {type : String, required : true},
  photo : {type : String, required : true},
  vehiculos : {type : Array, required : true}
});

// encriptacion en proceso para los futuros proyectos :)
// UserSchema.method.encriptar = () => {}

//nombre del modelo dentro del back end y el userSchema es el nombre dentro de mongoose
module.exports = mongoose.model('User', UserSchema); 
//User va en mayúscula y singular aunque en la bd todo se pone en minúscula y plural