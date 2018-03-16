(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('controladorLogin', controladorLogin);

  controladorLogin.$inject = ['$state', 'loginService'];

  function controladorLogin($state, loginService){
    const vm = this;

    vm.credentials = {};

    vm.login = (pcredentials) => {};
  }
})();