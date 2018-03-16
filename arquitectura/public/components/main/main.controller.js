(() =>{
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('mainController', mainController);

  mainController.$inject = ['loginService'];

  function mainController(loginService){
    const vm = this
  };
})();