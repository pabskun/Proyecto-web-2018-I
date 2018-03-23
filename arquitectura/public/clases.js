class Cliente{
  constructor(pcedula, pnombre1, pnombre2, papellido1, papellido2, pfechanacimiento, pemail, pcontrasenna, pprovincia, pcanton, pdistrito, pphoto){
    this.cedula = pcedula;
    this.primerNombre = pnombre1;
    this.segundoNombre = pnombre2
    this.primerApellido = papellido1;
    this.segundoApellido = papellido2;
    this.fechaNacimiento = pfechanacimiento;
    this.correoElectronico = pemail;
    this.contrasenna = pcontrasenna;
    this.provincia = pprovincia;
    this.canton = pcanton;
    this.distrito = pdistrito;
    this.photo = pphoto;
    this.vehiculos = [];
  }

  agregarVehiculo(pnuevoVehiculo) {
    this.vehiculos.push(pnuevoVehiculo);
  }

  getCantidadVehiculos(){
    return this.vehiculos.length;
  }

  getVehiculos(){
    return this.vehiculos;
  }

  getcedula(){
    return this.cedula;
  }

  getContrasenna(){
    return this.contrasenna;
  }

  getCorreo(){
    return this.correoElectronico;
  }

  getFecha(){
    return this.fechaNacimiento;
  }

  getNombre(){
    return `${this.primerNombre} ${this.primerApellido}`;
  }

  getNombreCompleto(){
    return `${this.primerNombre} ${this.segundoNombre} ${this.primerApellido} ${this.segundoApellido}`;
  }

  getDireccion(){
    return `${this.provincia}, ${this.canton}, ${this.distrito}`;
  }
  getPhoto(){
    return this.photo;
  }
}

class Vehiculo{
  constructor(pmodelo, pmatricula, pmarca, pimage){
    this.modelo = pmodelo;
    this.matricula = pmatricula;
    this.marca = pmarca;
    this.image = pimage;
    this.reparaciones = [];
  }

  agregarReparaciones(pnuevaReparacion){
    this.reparaciones.push(pnuevaReparacion);
  }

  getReparaciones(){
    return this.reparaciones;
  }

  getMarca(){
    return this.marca;
  }

  getModelo(){
    return this.modelo;
  }

  getmatricula(){
    return this.matricula;
  }

  getInfoVehiculo(){
    return `${this.marca} ${this.modelo}`;
  }

  getImage(){
    return this.image;
  }
}

class Reparaciones{
  constructor(pcosto, pdescripcion, pfechareparacion){
    this.costo = pcosto;
    this.descripcion = pdescripcion;
    this.fechaReparacion = pfechareparacion;
  }

  getCosto(){
    return this.costo;
  }

  getDescripcion(){
    return this.descripcion;
  }

  getFechaReparacion(){
    return this.fechaReparacion;
  }
}