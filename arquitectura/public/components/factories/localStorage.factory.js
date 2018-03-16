(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .factory('localStorageFactory', localStorageFactory);

  localStorageFactory.$inject = ['$log','$http'];

  function localStorageFactory($log, $http){

    const localAPI = {
      setItem : _setItem,
      getItem : _getItem,
      setSession : _setSession,
      closeSession : _closeSession
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

    function _setSession(key, value) {
      let response = true;

      sessionStorage.setItem(key, JSON.stringify(value));

      return response;
    };

    function _closeSession(key) {
      let response = true;

      sessionStorage.removeItem(key);

      return response;
    };

  }
})();