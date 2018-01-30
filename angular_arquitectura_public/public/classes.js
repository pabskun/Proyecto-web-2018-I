class Cliente {
  constructor(pcedula, pnombre, papellidoUno, papellidoDos, ptelefono, pcorreo){
    this.cedula = pcedula;
    this.nombre = pnombre;
    this.apellidoUno = papellidoUno;
    this.apellidoDos = papellidoDos;
    this.telefono = ptelefono;
    this.correo = pcorreo;
    this.vehiculos = [];
  }

  agregarVehiculo(pobjvehiculo){
    this.vehiculos.push(pobjvehiculo);
  }

}

class Vehiculo {
  constructor(pmarca, pmodelo, panno, pcapacidad, pkilometraje) {
    this.marca = pmarca;
    this.modelo = pmodelo;
    this.anno = panno;
    this.capacidad = pcapacidad;
    this.kilonetraje = pkilometraje;
    this.reparaciones = [];
  }

  agregarReparaciones(pobjreparacion){
    this.reparaciones.push(pobjreparacion);
  }
}
