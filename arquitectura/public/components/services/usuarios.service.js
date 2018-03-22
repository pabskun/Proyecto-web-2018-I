(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$log', '$http', 'localStorageFactory'];

  function servicioUsuarios($log, $http, localStorageFactory){

    const usuariosLocal = "usuariosLS";

    const publicAPI = {
      addUsuario             : _addUsuario,
      getUsuarios            : _getUsuarios,
      addVehiculoPorUsuario  : _addVehiculoPorUsuario,
      getVehiculosPorUsuario : _getVehiculosPorUsuario,

      addReparaciones : _addReparaciones,
      getReparaciones : _getReparaciones
    };
    return publicAPI;

    function _addUsuario(pnuevoUsuario){
      let listaUsuarios = _getUsuarios(),
          registroExitoso,
          usuarioRepetido = false;

      for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].getcedula() == pnuevoUsuario.getcedula()) {
          usuarioRepetido = true;
        }
      }

      if(usuarioRepetido === false){
        listaUsuarios.push(pnuevoUsuario);
        registroExitoso = localStorageFactory.setItem(usuariosLocal, listaUsuarios);
      }else{
        registroExitoso = false;
      }

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
              objUsuarios = new Cliente(obj.cedula, obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, tempDate, obj.correoElectronico, obj.contrasenna, obj.provincia, obj.canton, obj.distrito, obj.photo);

          obj.vehiculos.forEach(objVehiculo => {
            let objTempVehiculo = new Vehiculo(objVehiculo.modelo, objVehiculo.matricula, objVehiculo.marca, objVehiculo.image);

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

    function _addVehiculoPorUsuario(pidUsuarioActivo, pvehiculo){
      let listaVehiculosPorUsuario = _getVehiculosPorUsuario(pidUsuarioActivo),
          listaUsuarios = _getUsuarios(),
          vehiculoRepetido = false,
          registroValido;

      for (let i = 0; i < listaVehiculosPorUsuario.length; i++) {
        if(pvehiculo.getmatricula() == listaVehiculosPorUsuario[i].getmatricula()){
          vehiculoRepetido = true;
        }
      }

      if(vehiculoRepetido == false){
        for(let i = 0; i < listaUsuarios.length; i++){
          if (pidUsuarioActivo == listaUsuarios[i].getcedula()){
            listaUsuarios[i].agregarVehiculo(pvehiculo);
          }
        }
        registroValido = localStorageFactory.setItem(usuariosLocal, listaUsuarios);
      }else{
        registroValido = false;
      }

      return registroValido;
    }

    function _getVehiculosPorUsuario(pidUsuarioActivo){
      let listaUsuarios = _getUsuarios(),
          listaVehiculos = [];

      for (let i = 0; i < listaUsuarios.length; i++) {
        if(pidUsuarioActivo == listaUsuarios[i].getcedula()){
          listaVehiculos = listaUsuarios[i].getVehiculos();
        }
      }
      return listaVehiculos;
    }
// viejas
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