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

    function _setSession(value) {
      let response = true;

      sessionStorage.setItem('session', JSON.stringify(value));

      return response;
    };

    function _closeSession() {
      let response = true;

      sessionStorage.removeItem('session');

      return response;
    };

    function _getSession() {
      let sessionActive = JSON.parse(sessionStorage.getItem('session'));

      return sessionActive;
    }

  }
})();