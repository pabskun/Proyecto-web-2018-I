
document.querySelector('#btnRegistrarTrabajo').addEventListener('click', obtenerDatosRegistro)

function obtenerDatosRegistro() {
    let matricula = localStorage.getItem('matriculaSeleccionadaLS');
    let nombreTrabajo = document.querySelector('#txtNombre').value;
    let costoTrabajo = document.querySelector('#txtCosto').value;

    let objTrabajo = new Trabajo(nombreTrabajo, costoTrabajo);
    let objVehiculo = buscarVehiculoPorMatricula(matricula);
    
    

    objVehiculo.agregarTrabajo(objTrabajo);
    actualizarVehiculo(objVehiculo);
}
