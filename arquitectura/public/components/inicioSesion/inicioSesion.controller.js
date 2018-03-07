(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('controladorLogin', controladorLogin);

  controladorLogin.$inject = ['loginService'];

  function controladorLogin(loginService){
    const vm = this;
  }
})();