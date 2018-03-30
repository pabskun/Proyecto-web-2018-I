(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .factory('dataStorageFactory', dataStorageFactory);

  dataStorageFactory.$inject = ['$log','$http'];

  function dataStorageFactory($log, $http){

    const localAPI = {
      setItem : _setItem,
      getItem : _getItem,

      getData : _getData,
      setSession : _setSession,
      closeSession : _closeSession,
      getSession : _getSession
    };
    return localAPI;

    function _setItem(key, value) {
      let response = true;

      localStorage.setItem(key, JSON.stringify(value));

      return response;
    };

    function _getItem(value) {
      let arrayData = JSON.parse(localStorage.getItem(value));

      if (!arrayData){
        arrayData = [];
      };

      return arrayData;
    };

    /**
     * Función que retorna los datos traidos desde el backend
     */
    function _getData(value){
      let data = $http.get(value);
      return data;
    }

    /**
     * Función que almacena las credenciales dentro del session Storage
     * @param {Credenciales} value 
     */
    function _setSession(value) {
      let response = true;
      sessionStorage.setItem('session', JSON.stringify(value));
      return response;
    };

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