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
            let objVehiculo = new Vehiculo(obj.marca, obj.modelo,obj.anno,obj.capacidad,obj.kilometraje);
            
            vehiculos.push(objVehiculo);
        })
    }

    return vehiculos;
}