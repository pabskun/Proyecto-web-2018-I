let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatosRegistro);

function obtenerDatosRegistro(){
    let marca = document.querySelector('#txtMarca').value;
    let modelo = document.querySelector('#txtModelo').value;
    let anno = document.querySelector('#txtAnno').value;
    let capacidad = Number(document.querySelector('#txtCapacidad').value);
    let kilometraje = Number(document.querySelector('#txtKilometraje').value);

    let objVehiculo = new Vehiculo(marca, modelo, anno, capacidad, kilometraje);

    registrarVehiculo(objVehiculo);

}
