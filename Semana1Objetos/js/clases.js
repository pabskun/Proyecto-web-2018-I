
class Serie{

    constructor(pnombre, panno){
        this.nombre = pnombre;
        this.anno = panno;
        this.personajes = [];
    }

    agregarPersonaje(pObjPersonaje){
        this.personajes.push(pObjPersonaje);
    }
    
    mostrarPersonajes(){
        for(let i = 0; i < this.personajes.length; i++ ){
            console.log(this.personajes[i].nombre);
        }  
    }  
}

class Personaje{

    constructor(pnombre, praza){
        this.nombre = pnombre;
        this.raza = praza;
    }

    saludar(){
        console.log('Hola me llamo ' + this.nombre);
    }
}