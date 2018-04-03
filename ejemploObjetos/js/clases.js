class Vehiculo{
    constructor(pmatricula,pmarca, pmodelo, panno, pcapacidad, pkilometraje){
        this.matricula = pmatricula;
        this.marca = pmarca;
        this.modelo = pmodelo;
        this.anno = panno;
        this.capacidad = pcapacidad;
        this.kilometraje = pkilometraje;
        this.listaTrabajos = [];
    }
    agregarTrabajo(pobjTrabajo){
        this.listaTrabajos.push(pobjTrabajo);
    }
    

}
class Trabajo{
    constructor(pnombre,pcosto){
        this.nombre = pnombre;
        this.costo = pcosto;
    }
}