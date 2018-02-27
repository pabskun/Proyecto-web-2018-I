// TODO Dentro de este archivo se crean los objetos con sus respectivos métodos
class Cliente{
  constructor(pCedula, pNombre1, pApellido1, pEdad){
    this.cedula = pCedula;
    this.nombre1 = pNombre1;
    this.apellido1 = pApellido1;
    this.edad = pEdad;
    this.vehiculos = [];
  }

  agregarVehiculo(pnuevoVehiculo) {
    this.vehiculos.push(pnuevoVehiculo);
  }

  getVehiculos(){
    return this.vehiculos;
  }

  getcedula(){
    return this.cedula;
  }

  getNombre(){
    return `${this.nombre1} ${this.apellido1}`;
  }
}

class Vehiculo{
  constructor(pmodelo, pmatricula, pmarca){
    this.modelo = pmodelo;
    this.matricula = pmatricula;
    this.marca = pmarca;
    this.reparaciones = [];
  }

  agregarReparaciones(pnuevaReparacion){
    this.reparaciones.push(pnuevaReparacion);
  }

  getReparaciones(){
    return this.reparaciones;
  }

  getmatricula(){
    return this.matricula;
  }

  getInfoVehiculo(){
    return `${this.marca} ${this.modelo}`;
  }
}

class Reparaciones{
  constructor(pcosto, pdescripcion){
    this.costo = pcosto;
    this.descripcion = pdescripcion;
  }
}