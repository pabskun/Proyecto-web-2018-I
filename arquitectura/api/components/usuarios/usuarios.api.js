const UserModel = require('./usuarios.model');

module.exports.registrar = (req, res) => {
  var newUser = new UserModel({
    cedula              :  req.body.cedula,
    primerNombre        :  req.body.primerNombre,
    segundoNombre       :  req.body.segundoNombre,
    primerApellido      :  req.body.primerApellido,
    segundoApellido     :  req.body.segundoApellido,
    fechaNacimiento     :  req.body.fechaNacimiento,
    correoElectronico   :  req.body.correoElectronico,
    contrasenna         :  req.body.contrasenna,
    provincia           :  req.body.provincia,
    canton              :  req.body.canton,
    distrito            :  req.body.distrito,
    photo               :  req.body.photo,
    vehiculos           :  req.body.vehiculos,
  });

  newUser. ((err) => {
    if(err){
      res.json({success:false, msj: 'Ha ocurrido un error en el registro de usuarios' + err});
    }else{
      res.json({success:true, msj:'Se registró el usuario correctamente'});
    }
  });
};

module.exports.listarTodos = (req,res) => {
  UserModel.find().then((usuarios) => {
    res.send(usuarios);
  });
};

module.exports.actualizar = (req,res) => {
  UserModel.findByIdAndUpdate(req.body._id, { $set: req.body}, (err, user) => {
    if (err){
      res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
};