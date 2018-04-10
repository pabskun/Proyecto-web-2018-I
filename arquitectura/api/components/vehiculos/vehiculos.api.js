const carModel = require('./vehiculos.model');

module.exports.registrar = (req, res) => {
  var newCar = new carModel({
    modelo : req.body.modelo,
    matricula : req.body.matricula,
    marca : req.body.marca,
    image : req.body.image,
    idCliente : req.body.idCliente,
    reparaciones : req.body.reparaciones
  });

  newCar.save((err) => {
    if(err){
      res.json({success:false, msg: 'Ha ocurrido un error en el registro del vehiculo' + err});
    }else{
      res.json({success:true, msg:'Se registró el vehiculo correctamente'});
    }
  });
};

module.exports.listarTodos = (req,res) => {
  carModel.find().then((car) => {
    res.send(car);
  });
};

module.exports.actualizar = (req,res) => {
  carModel.findByIdAndUpdate(req.body.matricula, { $set: req.body}, (err, user) => {
    if (err){
      res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});

    } else{
      res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
    }
  });
};