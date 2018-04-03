mostrarDatosTabla();
function mostrarDatosTabla(){
    let vehiculos = getVehiculos();
    let tbody = document.querySelector('#tblVehiculos tbody');
    tbody.innerHTML = '';

    vehiculos.forEach(objVehiculo => {
        let fila = tbody.insertRow();
        let celdaAgregarTrabajo = fila.insertCell();
        let botonTrabajo = document.createElement('button');
        botonTrabajo.type = 'button';
        botonTrabajo.innerHTML = 'Registrar trabajo';
        botonTrabajo.dataset.matriculaVehiculo = objVehiculo.matricula;//Guarda la matrícula dentro de la propiedad matriculaVehiculo del botón

        celdaAgregarTrabajo.appendChild(botonTrabajo);

        fila.insertCell().innerHTML = objVehiculo.matricula;
        fila.insertCell().innerHTML = objVehiculo.marca;
        fila.insertCell().innerHTML = objVehiculo.modelo;
        fila.insertCell().innerHTML = objVehiculo.anno;
        fila.insertCell().innerHTML = objVehiculo.capacidad;
        fila.insertCell().innerHTML = objVehiculo.kilometraje;

        botonTrabajo.addEventListener('click', asignarTrabajoVehiculo );
    });
}

function asignarTrabajoVehiculo(){
    let matricula = this.dataset.matriculaVehiculo; //saca la matricula asociada al botón
    localStorage.setItem('matriculaSeleccionadaLS',matricula );

    window.location.href = 'registrarTrabajo.html';
}

