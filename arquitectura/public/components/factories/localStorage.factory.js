(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .factory('localStorageFactory', localStorageFactory);

  localStorageFactory.$inject = ['$log','$http'];

  function localStorageFactory($log, $http){

    let localAPI = {
      setItem : _setItem,
      getItem : _getItem
    };
    return localAPI;

    function _setItem(key, value) {
      let response = true;

      localStorage.setItem(key, JSON.stringify(value));

      return response
    };

    function _getItem(value) {
      let arrayData = JSON.parse(localStorage.getItem(value));

      if (!arrayData){
        arrayData = [];
      };

      return arrayData;
    };

  }
})();