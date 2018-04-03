(() =>{
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('mainController', mainController);

  mainController.$inject = ['$state', 'loginService'];

  function mainController($state, loginService){

    const userAuth = loginService.getAuthUser();

    if(userAuth == undefined){
      $state.go('inicioSesion');
    }

    const vm = this;
  };
})();