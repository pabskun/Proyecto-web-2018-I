(() => {
  'use strict';
  angular
    .module('tallerRapidito')
    .factory('dataStorageFactory', dataStorageFactory);

  dataStorageFactory.$inject = ['$q', '$log', '$http'];

  function dataStorageFactory($q, $log, $http) {

    const localAPI = {
      getUsersData: _getUsersData,
      setUserData: _setUserData,
      updateUserData: _updateUserData,
      getCarsData: _getCarsData,
      setCarData: _setCarData,
      setSession: _setSession,
      closeSession: _closeSession,
      getSession: _getSession
    };
    return localAPI;

    /**
     * Funcion que obtiene los datos de los usuarios del back end y los retorna
     */
    function _getUsersData() {
      let listaUsuarios = [];

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_users',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {}
      });

      peticion.done((usuarios) => {
        console.log('Datos que vienen desde la base de datos')
        console.log(usuarios);
        listaUsuarios = usuarios;
      });
      peticion.fail(() => {
        listaUsuarios = [];
        console.log('Ocurrió un error');
      });

      return listaUsuarios;
    }

    function _setUserData(data) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_user',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'cedula': data.cedula,
          'primerNombre': data.primerNombre,
          'segundoNombre': data.segundoNombre,
          'primerApellido': data.primerApellido,
          'segundoApellido': data.segundoApellido,
          'fechaNacimiento': data.fechaNacimiento,
          'correoElectronico': data.correoElectronico,
          'contrasenna': data.contrasenna,
          'provincia': data.provincia,
          'canton': data.canton,
          'distrito': data.distrito,
          'photo': data.photo,
          'vehiculos': data.vehiculos
        }
      });

      peticion.done((datos) => {
        response = datos.msj;
        console.log('Petición realizada con éxito');
      });
      peticion.fail((error) => {
        response = error;
        console.log('Ocurrió un error');
      });

      return response;
    }

    function _updateUserData(data) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/update_user',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'cedula': data.cedula,
          'primerNombre': data.primerNombre,
          'segundoNombre': data.segundoNombre,
          'primerApellido': data.primerApellido,
          'segundoApellido': data.segundoApellido,
          'fechaNacimiento': data.fechaNacimiento,
          'correoElectronico': data.correoElectronico,
          'contrasenna': data.contrasenna,
          'provincia': data.provincia,
          'canton': data.canton,
          'distrito': data.distrito,
          'photo': data.photo,
          'vehiculos': data.vehiculos
        }
      });

      peticion.done((datos) => {
        response = datos.msj;
        console.log('Petición realizada con éxito');
      });
      peticion.fail((error) => {
        response = error;
        console.log('Ocurrió un error');
      });

      return response;
    }

    /**
     * Funcion que obtiene los datos de los vehiculos del back end y los retorna
     * @param {Objeto Vehiculo} pobjvehiculo 
     */
    function _getCarsData(pobjvehiculo) {
      let listaVehiculos = [];

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_cars',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
      });

      peticion.done((datos) => {
        listaVehiculos = datos;
        console.log('Petición realizada con éxito');
      });
      peticion.fail(() => {
        listaVehiculos = [];
        console.log('Ocurrió un error');
      });

      return listaVehiculos;
    }

    /**
     * Esta funcion envia como peticion los datos del vehiculo para ser guardados en la base de datos
     * @param {Objeto de tipo vehiculo} pnuevovehiculo 
     */
    function _setCarData(pnuevovehiculo) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_car',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          modelo: pnuevovehiculo.modelo,
          matricula: pnuevovehiculo.matricula,
          marca: pnuevovehiculo.marca,
          image: pnuevovehiculo.image,
          idCliente: pnuevovehiculo.idCliente,
          reparaciones: pnuevovehiculo.reparaciones
        }
      });

      peticion.done((datos) => {
        response = datos.msj;
        console.log('Petición realizada con éxito');
      });
      peticion.fail((error) => {
        response = error;
        console.log('Ocurrió un error');
      });

      return response;
    }

    /**
     * Función que almacena las credenciales dentro del session Storage
     * @param {Credenciales} value 
     */
    function _setSession(value) {
      let response = true;
      sessionStorage.setItem('session', JSON.stringify(value));
      return response;
    }

    /**
     * Función que elimina los datos de la sesión activa
     */
    function _closeSession() {
      let response = true;
      sessionStorage.removeItem('session');
      return response;
    };

    /**
     * Función que retorna los datos almacenados dentro del sessionStorage
     */
    function _getSession() {
      let sessionActive = JSON.parse(sessionStorage.getItem('session'));

      return sessionActive;
    }

  }
})();