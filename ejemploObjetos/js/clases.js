class Automovil{
    constructor(pmarca, pmodelo, panno, pcapacidad, pkilometraje, paire){
        this.marca = pmarca;
        this.modelo = pmodelo;
        this.anno = panno;
        this.capacidad = pcapacidad;
        this.kilometraje = pkilometraje;
        this.aire = paire;
    }

    toString(){
        console.log(this.marca + this.modelo + this.anno);
    }
}