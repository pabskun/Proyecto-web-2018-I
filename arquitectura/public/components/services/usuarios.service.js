(() => {
  'use strict';
  angular
  .module('arquitectura')
  .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$log','$http'];

  function servicioUsuarios($log, $http){

    let publicAPI = {
      addUsuario : _addUsuario,
      getUsuarios : _getUsuarios,
      addVehiculo : _addVehiculo,
      getVehiculos : _getVehiculos,
      addReparaciones : _addReparaciones,
      getReparaciones : _getReparaciones
    }
    return publicAPI;

    // Funcion que almacena en el localStorage todos los usuarios
    function _addUsuario(pnuevoUsuario){
      let listaUsuarios = _getUsuarios();
      listaUsuarios.push(pnuevoUsuario);
      localStorage.setItem('usuariosLS', JSON.stringify(listaUsuarios));
    }

    // Funcion que trae todos los usuarios del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo usuario
    function _getUsuarios(){
      let listaUsuarios = [];
      let listaUsuariosLocal = JSON.parse(localStorage.getItem("usuariosLS"));

      if(listaUsuariosLocal == null){
        listaUsuarios = [];
      }else{
        listaUsuariosLocal.forEach(obj => {
          
          let objUsuarios = new Cliente(obj.cedula, obj.nombre1, obj.apellido1, obj.edad);

          obj.vehiculos.forEach(objVehiculo => {
            let objTempVehiculo = new Vehiculo(objVehiculo.modelo, objVehiculo.matricula, objVehiculo.marca);

            objUsuarios.agregarVehiculo(objTempVehiculo);

            objVehiculo.reparaciones.forEach(objReparciones => {
              let objTempReparaciones = new Reparaciones(objReparciones.costo, objReparciones.descripcion);

              objTempVehiculo.agregarReparaciones(objTempReparaciones);
            })
          })

          listaUsuarios.push(objUsuarios);
        })
      }

      return listaUsuarios;
    }

    function _addVehiculo(pvehiculo, pusuario){
      let listaUsuarios = _getUsuarios();

      for(let i = 0; i < listaUsuarios.length; i++){
        if (pusuario.getcedula() == listaUsuarios[i].getcedula()){
          listaUsuarios[i].agregarVehiculo(pvehiculo);
        }
      }

      actualizarLocal(listaUsuarios);
    };

    function _getVehiculos(objUsuario){
      let listaUsuarios = _getUsuarios();
      let vehiculosUsuario = [];

      for(let i = 0; i < listaUsuarios.length; i++){
        if (objUsuario.getcedula() == listaUsuarios[i].getcedula()){
          vehiculosUsuario = listaUsuarios[i].getVehiculos();
        }
      }

      return vehiculosUsuario;
    }

    // Funcion que registra las reparaciones dentro de los vehiculos
    function _addReparaciones(pvehiculo, preparacion){
      let listaUsuarios = _getUsuarios();
      let listaVehiculos = [];

      // Ciclo que recorre todos los usuarios
      for(let i = 0; i < listaUsuarios.length; i++){
        
        // Ciclo que recorre todos los vehiculos por usuario
        for(let j=0 ;j < listaUsuarios[i].getVehiculos().length; j++){

          // Si la matricula del vehiculo coincide
          if(listaUsuarios[i].getVehiculos()[j].getmatricula() == pvehiculo.getmatricula()){

            // Le registra la reparación
            listaUsuarios[i].getVehiculos()[j].agregarReparaciones(preparacion);
          }
        }
      }
      actualizarLocal(listaUsuarios);
    }

    // Funcion que obtiene todas las reparaciones de los vehiculos
    function _getReparaciones(objVehiculo){
      let listaUsuarios = _getUsuarios();
      let reparacionesVehiculos = [];

      for(let i = 0; i < listaUsuarios.length; i++){
        for(let j=0 ;j < listaUsuarios[i].getVehiculos().length; j++){

          if (objVehiculo.getmatricula() == listaUsuarios[i].getVehiculos()[j].getmatricula()){
            reparacionesVehiculos = listaUsuarios[i].getVehiculos()[j].getReparaciones();
          }
        }
      }
      return reparacionesVehiculos;
    }

    function actualizarLocal(plistaActualizada){
      localStorage.setItem('usuariosLS', JSON.stringify(plistaActualizada));
    }

  }
})();