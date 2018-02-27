(() => {
  'use strict';
  angular
  .module('arquitectura')
  .controller('controladorVehiculo', controladorVehiculo);

  controladorVehiculo.$inject = ['$stateParams', '$state', 'servicioUsuarios']

  function controladorVehiculo($stateParams, $state, servicioUsuarios){
    let vm = this;

    let objSinFormatoUsuario = JSON.parse($stateParams.objUsuarioTemp);

    vm.nuevoVehiculo = {};

    vm.registrarVehiculo = (pnuevovehiculo) => {

      let objVehiculoNuevo = new Vehiculo(pnuevovehiculo.modelo, pnuevovehiculo.matricula, pnuevovehiculo.marca);

      let objUsuario = new Cliente(objSinFormatoUsuario.cedula, objSinFormatoUsuario.nombre1, objSinFormatoUsuario.apellido1, objSinFormatoUsuario.edad);

      servicioUsuarios.addVehiculo(objVehiculoNuevo, objUsuario);

      $state.go('usuarios');
    };

  }
})();