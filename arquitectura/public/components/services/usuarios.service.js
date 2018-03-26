(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$log', '$http', 'localStorageFactory'];

  /**
   * Función que posee todos los métodos del servicio
   * @param {*} $log
   * @param {Peticiones asincrónicas} $http
   * @param {Factorias que se encarga de ir al local Storage} localStorageFactory 
   */
  function servicioUsuarios($log, $http, localStorageFactory){

    const usuariosLocal = "usuariosLS";

    const publicAPI = {
      addUsuario : _addUsuario,
      getUsuarios : _getUsuarios,
      addVehiculoPorUsuario : _addVehiculoPorUsuario,
      getVehiculosPorUsuario : _getVehiculosPorUsuario,
      getInfoVehiculos : _getInfoVehiculos,
      addReparaciones : _addReparaciones,
      getReparaciones : _getReparaciones
    };
    return publicAPI;

    /**
     * Función que registra al usuario dentro del sistema
     * @param {Objeto de tipo Usuario} pnuevoUsuario 
     */
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

    /**
     * Función que retorna todos los usuarios, con sus vehiculos y reparaciones registrados dentro del sistema
     */
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
              let objTempReparaciones = new Reparaciones(objReparciones.costo, objReparciones.descripcion, objReparciones.fechaReparacion);

              objTempVehiculo.agregarReparaciones(objTempReparaciones);
            });
          });

          listaUsuarios.push(objUsuarios);
        });
      }

      return listaUsuarios;
    }

    /**
     * Función que registra el vehiculo dentro del usuario activo
     * @param {Cédula del usuario activo} pidUsuarioActivo 
     * @param {Objeto de tipo vehiculo} pvehiculo 
     */
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

    /**
     * Función que recibe el número de cédula del usuario activo y retorna los vehiculo registrados para ese usuario
     * @param {Cédula del usuario activo} pidUsuarioActivo 
     */
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

    /**
     * Función que obtiene los datos de un vehiculo y los retorno
     * @param {Cédula del usuario activo} pidUsuarioActivo 
     * @param {Matricula del vehiculo} pvehiculoid 
     */
    function _getInfoVehiculos(pidUsuarioActivo, pvehiculoid){
      let listaVehiculosPorUsuario = _getVehiculosPorUsuario(pidUsuarioActivo),
          vehiculoActivo;

      for(let i = 0; i < listaVehiculosPorUsuario.length; i++){
        if(listaVehiculosPorUsuario[i].getmatricula() == pvehiculoid){
          vehiculoActivo = listaVehiculosPorUsuario[i];
        }
      }

      return vehiculoActivo;
    }

    /**
     * Funcion que registra las reparaciones dentro de los vehiculos
     * @param {Cédula del usuario activo} pidUsuarioActivo 
     * @param {Matricula del vehiculo} pvehiculoid 
     * @param {Objeto de tipo reparación} preparacion 
     */
    function _addReparaciones(pidUsuarioActivo, pvehiculoid, preparacion){
      let listaUsuarios = _getUsuarios(),
          listaVehiculos = _getVehiculosPorUsuario(pidUsuarioActivo),
          registroExitoso;

      for(let i = 0; i < listaVehiculos.length; i++){
        if(listaVehiculos[i].getmatricula() == pvehiculoid){
          listaVehiculos[i].agregarReparaciones(preparacion);
        }
      }

      for(let i = 0; i < listaUsuarios.length; i++){
        if(listaUsuarios[i].getcedula() == pidUsuarioActivo){
          listaUsuarios[i].vehiculos = listaVehiculos;
        }
      }

      registroExitoso = localStorageFactory.setItem(usuariosLocal, listaUsuarios);

      return registroExitoso;
    }

    /**
     * Función que retorna las reparaciones de los vehiculos por usuario
     * @param {Cédula del usuario activo} pidUsuarioActivo 
     * @param {Matricula del vehiculo} pvehiculoid 
     */
    function _getReparaciones(pidUsuarioActivo, pvehiculoid){
      let listaVehiculos = _getVehiculosPorUsuario(pidUsuarioActivo),
          reparacionesVehiculos = [];

      for(let i = 0; i < listaVehiculos.length; i++){
        if (pvehiculoid == listaVehiculos[i].getmatricula()){
          reparacionesVehiculos = listaVehiculos[i].getReparaciones();
        }
      }
      return reparacionesVehiculos;
    }
  }
})();