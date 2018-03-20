(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('listCarController', listCarController);

  listCarController.$inject = ['$http', 'servicioUsuarios', 'loginService'];

  function listCarController($http, servicioUsuarios, loginService){

    const userAuth = loginService.getAuthUser();

    if(userAuth == undefined){
      $state.go('inicioSesion');
    }
    
    if(userAuth == undefined){
      $state.go('inicioSesion');
    }

    const vm = this;

    vm.listaVehiculos = servicioUsuarios.getVehiculosPorUsuario(userAuth.getcedula());
  }
})();