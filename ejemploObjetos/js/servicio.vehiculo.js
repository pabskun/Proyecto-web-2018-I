function registrarVehiculo(pobjVehiculo){
    let listaVehiculos = getVehiculos();

    listaVehiculos.push(pobjVehiculo);
    localStorage.setItem('listaVehiculosLS', JSON.stringify(listaVehiculos));
}


function getVehiculos(){
    let listaVehiculos = JSON.parse(localStorage.getItem('listaVehiculosLS'));
    let vehiculos = [];

    if(listaVehiculos == null){
        vehiculos = [];
    }else{
        listaVehiculos.forEach(obj =>{
            let objVehiculo = new Vehiculo(obj.matricula,obj.marca, obj.modelo,obj.anno,obj.capacidad,obj.kilometraje);

            obj.listaTrabajos.forEach(objTrabajoTemp =>{
                let objTrabajo = new Trabajo(objTrabajoTemp.nombre, objTrabajoTemp.costo);
                objVehiculo.agregarTrabajo(objTrabajo); 
            });
            
            vehiculos.push(objVehiculo);
        })
    }

    return vehiculos;
}

function buscarVehiculoPorMatricula(pmatricula){
   let listaVehiculos =  getVehiculos();
   let vehiculoEncontrado;

   listaVehiculos.forEach(objVehiculoTemp => {
    if(pmatricula == objVehiculoTemp.matricula){
        vehiculoEncontrado = objVehiculoTemp;
        
    }
   });
   
    return vehiculoEncontrado;
    
}
function actualizarVehiculo(pobjVehiculo){
    let listaVehiculos = getVehiculos();

    for(let i = 0 ; i<listaVehiculos.length;i++ ){
        if(listaVehiculos[i].matricula == pobjVehiculo.matricula){
            listaVehiculos[i] = pobjVehiculo;
            localStorage.setItem('listaVehiculosLS', JSON.stringify(listaVehiculos));

        }
    }
}