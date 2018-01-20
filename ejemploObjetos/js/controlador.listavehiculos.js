mostrarDatosTabla();
function mostrarDatosTabla(){
    let vehiculos = getVehiculos();
    let tbody = document.querySelector('#tblVehiculos tbody');
    tbody.innerHTML = '';

    vehiculos.forEach(objVehiculo => {
        let fila = tbody.insertRow();
        fila.insertCell();
        fila.insertCell();
        fila.insertCell().innerHTML = objVehiculo.marca;
        fila.insertCell().innerHTML = objVehiculo.modelo;
        fila.insertCell().innerHTML = objVehiculo.anno;
        fila.insertCell().innerHTML = objVehiculo.capacidad;
        fila.insertCell().innerHTML = objVehiculo.kilometraje;
    });
}


// function buscarClienteporCedula(pcedula){
//     let clientes = getClientes();
//     let clienteEncontrado;

//     clientes.forEach(obj => {
//         if(obj.cedula == pcedula){
//             clienteEncontrado = obj;
//         }
//     })

//     return clienteEncontrado;
// }


