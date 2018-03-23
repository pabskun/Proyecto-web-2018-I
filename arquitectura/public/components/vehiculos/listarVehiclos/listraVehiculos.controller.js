(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('listCarController', listCarController);

  listCarController.$inject = ['$http', '$state', '$stateParams', 'servicioUsuarios', 'loginService'];

  function listCarController($http, $state, $stateParams, servicioUsuarios, loginService){

    const vm = this;

    const userAuth = loginService.getAuthUser();

    if(userAuth == undefined){
      $state.go('inicioSesion');
    }else{
      vm.usuarioActivo = userAuth.getNombre();
    }

    vm.listaVehiculos = servicioUsuarios.getVehiculosPorUsuario(userAuth.getcedula());

    vm.listaReparaciones = (pidVehiculo) => {
      console.log(pidVehiculo);

      $state.go('main.listarReparaciones', {idVehiculo: pidVehiculo});
    }

    vm.registrarRepacariones = (pidVehiculo) => {
      console.log(pidVehiculo)
    }
  }
})();