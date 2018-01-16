

let botonRegistrar = document.querySelector('#btnRegistrar');

botonRegistrar.addEventListener('click', registrarSerie);

let listaSeries = [];

function registrarSerie(){
    let nombre = document.querySelector('#txtSerie').value;
    let anno = document.querySelector('#txtAnno').value;

    let objSerie = new Serie(nombre, anno);
    listaSeries.push(objSerie);
}

// let objSerie2 = new Serie('Saint Seiya', '1986'); 

// let objPersonaje1 = new Personaje('Gokú', 'Saiyan');
// let objPersonaje2 = new Personaje('Bulma', 'Humano');

// let objPersonaje3 = new Personaje('Hyoga', 'Caballero bronce');
// let objPersonaje4 = new Personaje('Shun', 'Caballero dorado');

// objSerie1.agregarPersonaje(objPersonaje1);
// objSerie1.agregarPersonaje(objPersonaje2);

// objSerie2.agregarPersonaje(objPersonaje3);
// objSerie2.agregarPersonaje(objPersonaje4);

// objSerie1.mostrarPersonajes();
// objSerie2.mostrarPersonajes();