(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('listarReparacionesController', listarReparacionesController);

  listarReparacionesController.$inject = ['$state', '$stateParams', 'servicioUsuarios', 'loginService'];

  function listarReparacionesController($state, $stateParams, servicioUsuarios, loginService){
    const vm = this;

    const userAuth = loginService.getAuthUser();

    if(userAuth == undefined){
      $state.go('inicioSesion');
    }

  };
})();