(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .service('loginService', loginService);

  loginService.$inject = ['$log', '$http', 'servicioUsuarios'];

  function loginService($log, $http, servicioUsuarios){
    const loginAPI = {
      logIn : _login,
      logOut : _logOut
    };

    return loginAPI;

    function _login(){};

    function _logOut(){};
  }
})();