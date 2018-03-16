(() =>{
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('mainController', mainController);

  mainController.$inject = ['loginService'];

  function mainController(loginService){

    console.log(loginService.getAuthUser());

    const vm = this
  };
})();