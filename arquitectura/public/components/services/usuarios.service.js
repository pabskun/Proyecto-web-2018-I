(() => {
  'use strict';
  angular
    .module('tallerRapidito')
    .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$q', '$http', 'dataStorageFactory'];

  /**
   * Función que posee todos los métodos del servicio
   * @param {*} $log
   * @param {Peticiones asincrónicas} $http
   * @param {Factorias que se encarga de ir al local Storage} dataStorageFactory 
   */
  function servicioUsuarios($q, $http, dataStorageFactory) {

    const usuariosLocal = 'usuariosLS';

    const publicAPI = {
      addUsuario: _addUsuario,
      getUsuarios: _getUsuarios,
      addVehiculo : _addVehiculo,
      getVehiculos: _getVehiculos,

      getVehiculosPorUsuario: _getVehiculosPorUsuario,
      getInfoVehiculos: _getInfoVehiculos,
      addReparaciones: _addReparaciones,
      getReparaciones: _getReparaciones
    };
    return publicAPI;

    /**
     * Función que registra al usuario dentro del sistema
     * @param {Objeto de tipo Usuario} pnuevoUsuario 
     */
    function _addUsuario(pnuevoUsuario) {
      let listaUsuarios = _getUsuarios(),
        registroExitoso,
        usuarioRepetido = false;

      for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].getcedula() == pnuevoUsuario.getcedula()) {
          usuarioRepetido = true;
        }
      }

      if (usuarioRepetido === false) {
        registroExitoso = dataStorageFactory.setUserData(pnuevoUsuario);
      } else {
        registroExitoso = false;
      }

      return registroExitoso;
    }

    /**
     * Función que retorna todos los usuarios registrados dentro del sistema
     */
    function _getUsuarios() {
      let listaUsuarios = [],
          listaUsuariosBD = dataStorageFactory.getUsersData();

      listaUsuariosBD.forEach(obj => {
        let tempDate = new Date(obj.fechaNacimiento),
          objUsuarios = new Cliente(obj.cedula, obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, tempDate, obj.correoElectronico, obj.contrasenna, obj.provincia, obj.canton, obj.distrito, obj.photo);

        objUsuarios.setVehiculos(obj.vehiculos);

        listaUsuarios.push(objUsuarios);
      });

      console.log('Datos de la BD convertidos en clases');
      console.log(listaUsuarios);

      return listaUsuarios;
    }

    /**
     * Función que retorna todos los vehiculo, con sus reparaciones registradas dentro del sistema
     */
    function _getVehiculos(pvehiculo) {
      let listaVehiculos = [],
        listaVehiculosBD = dataStorageFactory.getCarsData();

      listaVehiculosBD.forEach(obj => {
        let objVehiculo = new Vehiculo(obj.modelo, obj.matricula, obj.marca, obj.image, obj.idCliente);

        obj.reparaciones.forEach(objRep => {
          let tempDate = new Date(objRep.fechaReparacion),
            objReparacion = new Reparaciones(objRep.costo, objRep.descripcion, tempDate);

          objVehiculo.agregarReparaciones(objReparacion);
        });

        listaVehiculos.push(objVehiculo);
      });

      console.log(listaVehiculos);
      return listaVehiculos;
    }

    /**
     * Función que registra el vehiculo dentro del usuario activo
     * @param {Cédula del usuario activo} pidUsuarioActivo 
     * @param {Objeto de tipo vehiculo} pvehiculo 
     */
    function _addVehiculo(pvehiculo) {
      let listaVehiculos = _getVehiculos(),
          listaUsuarios = _getUsuarios(),
          vehiculoRepetido = false,
          registroValido;

      for(let i = 0; i < listaVehiculos.length; i++){
        if(listaVehiculos[i].getmatricula() == pvehiculo.getmatricula()){
          vehiculoRepetido = true;
        }
      }

      if (vehiculoRepetido == false) {
        for(let i = 0; i < listaUsuarios.length; i++){
          if(listaUsuarios[i].getcedula() == pvehiculo.getCedulaDuenno()){
            listaUsuarios[i].agregarVehiculo(pvehiculo.getmatricula());
          }
        }
        registroValido = dataStorageFactory.setCarData(pvehiculo);
      } else {
        registroValido = false;
      }

      return registroValido;
    }

    /**
     * Función que recibe el número de cédula del usuario activo y retorna los vehiculo registrados para ese usuario
     * @param {Cédula del usuario activo} pidUsuarioActivo 
     */
    function _getVehiculosPorUsuario(pidUsuarioActivo) {
      let listaAllVehiculos = _getVehiculos(),
        listaVehiculos = [];

      for (let i = 0; i < listaAllVehiculos.length; i++) {
        if (pidUsuarioActivo == listaAllVehiculos[i].getCedulaDuenno()) {
          listaVehiculos.push(listaAllVehiculos[i]);
        }
      }
      return listaVehiculos;
    }

    /**
     * Función que obtiene los datos de un vehiculo y los retorno
     * @param {Cédula del usuario activo} pidUsuarioActivo 
     * @param {Matricula del vehiculo} pvehiculoid 
     */
    function _getInfoVehiculos(pidUsuarioActivo, pvehiculoid) {
      let listaVehiculosPorUsuario = _getVehiculosPorUsuario(pidUsuarioActivo),
        vehiculoActivo;

      for (let i = 0; i < listaVehiculosPorUsuario.length; i++) {
        if (listaVehiculosPorUsuario[i].getmatricula() == pvehiculoid) {
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
    function _addReparaciones(pidUsuarioActivo, pvehiculoid, preparacion) {
      let listaUsuarios = _getUsuarios(),
        listaVehiculos = _getVehiculosPorUsuario(pidUsuarioActivo),
        registroExitoso;

      for (let i = 0; i < listaVehiculos.length; i++) {
        if (listaVehiculos[i].getmatricula() == pvehiculoid) {
          listaVehiculos[i].agregarReparaciones(preparacion);
        }
      }

      for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].getcedula() == pidUsuarioActivo) {
          listaUsuarios[i].vehiculos = listaVehiculos;
        }
      }

      registroExitoso = dataStorageFactory.setItem(usuariosLocal, listaUsuarios);

      return registroExitoso;
    }

    /**
     * Función que retorna las reparaciones de los vehiculos por usuario
     * @param {Cédula del usuario activo} pidUsuarioActivo 
     * @param {Matricula del vehiculo} pvehiculoid 
     */
    function _getReparaciones(pidUsuarioActivo, pvehiculoid) {
      let listaVehiculos = _getVehiculosPorUsuario(pidUsuarioActivo),
        reparacionesVehiculos = [];

      for (let i = 0; i < listaVehiculos.length; i++) {
        if (pvehiculoid == listaVehiculos[i].getmatricula()) {
          reparacionesVehiculos = listaVehiculos[i].getReparaciones();
        }
      }
      return reparacionesVehiculos;
    }
  }
})();