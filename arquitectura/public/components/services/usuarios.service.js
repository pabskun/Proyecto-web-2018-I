(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$log', '$http', 'localStorageFactory'];

  function servicioUsuarios($log, $http, localStorageFactory){

    const usuariosLocal = "usuariosLS";

    const publicAPI = {
      addUsuario : _addUsuario,
      getUsuarios : _getUsuarios,
      addVehiculo : _addVehiculo,
      getVehiculos : _getVehiculos,
      addReparaciones : _addReparaciones,
      getReparaciones : _getReparaciones
    };
    return publicAPI;

    function _addUsuario(pnuevoUsuario){
      let listaUsuarios = _getUsuarios(),
          registroExitoso = false;

      listaUsuarios.push(pnuevoUsuario);

      registroExitoso = localStorageFactory.setItem(usuariosLocal, listaUsuarios);

      return registroExitoso;
    }

    function _getUsuarios(){
      let listaUsuarios = [];
      let listaUsuariosLocal = localStorageFactory.getItem(usuariosLocal);

      if(listaUsuariosLocal == null){
        listaUsuarios = [];
      }else{
        listaUsuariosLocal.forEach(obj => {
          
          let tempDate = new Date (obj.fechaNacimiento),
              objUsuarios = new Cliente(obj.cedula, obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, tempDate, obj.correoElectronico, obj.contrasenna, obj.provincia, obj.canton, obj.distrito);

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

    function _addReparaciones(pvehiculo, preparacion){
      let listaUsuarios = _getUsuarios(),
          listaVehiculos = [];

      for(let i = 0; i < listaUsuarios.length; i++){
        for(let j=0 ;j < listaUsuarios[i].getVehiculos().length; j++){
          if(listaUsuarios[i].getVehiculos()[j].getmatricula() == pvehiculo.getmatricula()){
            listaUsuarios[i].getVehiculos()[j].agregarReparaciones(preparacion);
          }
        }
      }
      actualizarLocal(listaUsuarios);
    }

    function _getReparaciones(objVehiculo){
      let listaUsuarios = _getUsuarios(),
          reparacionesVehiculos = [];

      for(let i = 0; i < listaUsuarios.length; i++){
        for(let j=0 ;j < listaUsuarios[i].getVehiculos().length; j++) {
          if (objVehiculo.getmatricula() == listaUsuarios[i].getVehiculos()[j].getmatricula()){
            reparacionesVehiculos = listaUsuarios[i].getVehiculos()[j].getReparaciones();
          }
        }
      }
      return reparacionesVehiculos;
    }
  }
})();