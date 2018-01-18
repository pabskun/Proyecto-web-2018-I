let listaAutomoviles = [];

function registrarAutomovil(pmarca, pmodelo, panno, pcapacidad, pkilometraje, paire){
    let objAutomovil = new Automovil(pmarca, pmodelo, panno, pcapacidad, pkilometraje, paire);
    listaAutomoviles.push(objAutomovil);
}
function obtenerListaAutomoviles(){
    return listaAutomoviles;
}

registrarAutomovil('Nissan', 'Versa', '2017', 5, 0, true);
registrarAutomovil('Nissan', 'Sentra', '2016', 5, 1000, true);
registrarAutomovil('Nissan', 'Kicks', '2018', 5, 0, true);
