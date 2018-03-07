(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('controladorLogin', controladorLogin);

  controladorLogin.$inject = ['loginService'];

  function controladorLogin(loginService){
    let vm = this;
  }
})();