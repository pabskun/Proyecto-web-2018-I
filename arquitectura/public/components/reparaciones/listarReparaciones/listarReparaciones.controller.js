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
    };

    if (!$stateParams.idVehiculo){
      $state.go('main.listarVehiculos');
    };

    vm.vehiculo = servicioUsuarios.getInfoVehiculos(userAuth.getcedula(), $stateParams.idVehiculo);

    vm.listaReparaciones = servicioUsuarios.getReparaciones(userAuth.getcedula(), $stateParams.idVehiculo);

    vm.volver = () => {
      $state.go('main.listarVehiculos');
    }

    vm.registrar = () => {
      $state.go('main.registroReparaciones', {idVehiculo: $stateParams.idVehiculo});
    }

  };
})();