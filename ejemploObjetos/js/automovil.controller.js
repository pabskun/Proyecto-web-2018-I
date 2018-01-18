llenarTabla();

function llenarTabla(){
    let tabla =  document.querySelector('#tblVehiculos tbody');
    let listaAutomoviles = obtenerListaAutomoviles();


    for (let i = 0; i < listaAutomoviles.length; i++){
        let fila = tabla.insertRow(i);

        let celdaConfiguracion = fila.insertCell();
        let celdaId = fila.insertCell();

        let celdaMarca = fila.insertCell();
        let celdaModelo = fila.insertCell();
        let celdaAnno = fila.insertCell();
        let celdaCapacidad = fila.insertCell();
        let celdaKilometraje = fila.insertCell();
        let celdaAire = fila.insertCell();

        celdaMarca.innerHTML = listaAutomoviles[i].marca;
        celdaModelo.innerHTML = listaAutomoviles[i].modelo;
        celdaAnno.innerHTML = listaAutomoviles[i].anno;
        celdaCapacidad.innerHTML = listaAutomoviles[i].capacidad;
        celdaKilometraje.innerHTML = listaAutomoviles[i].kilometraje;
        celdaAire.innerHTML = listaAutomoviles[i].aire;
    }
}
