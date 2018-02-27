(() => {
  'use strict';
  angular
  .module('arquitectura')
  .controller('controladorVehiculo', controladorVehiculo);

  controladorVehiculo.$inject = ['$stateParams', '$state', 'servicioUsuarios']

  function controladorVehiculo($stateParams, $state, servicioUsuarios){
    let vm = this;

    // aqui validamos que el paramatero exista, en caso de que no exista nos redijirá al estado anterior
    if(!$stateParams.objUsuarioTemp){
      $state.go('usuarios');
    }

    let objSinFormatoUsuario = JSON.parse($stateParams.objUsuarioTemp);

    let objUsuario = new Cliente(objSinFormatoUsuario.cedula, objSinFormatoUsuario.nombre1, objSinFormatoUsuario.apellido1, objSinFormatoUsuario.edad);

    vm.nuevoVehiculo = {};

    vm.usuarioActivo = objUsuario.getNombre();

    listarVehiculos();

    vm.listaVehiculos = servicioUsuarios.getVehiculos(objUsuario);

    vm.registrarVehiculo = (pnuevovehiculo) => {

      let objVehiculoNuevo = new Vehiculo(pnuevovehiculo.modelo, pnuevovehiculo.matricula, pnuevovehiculo.marca);

      servicioUsuarios.addVehiculo(objVehiculoNuevo, objUsuario);

      swal("Registro exitoso", "Se ha registrado correctamente el vehiculo", "success", {
        button: "Aceptar",
      });

      listarVehiculos();

      vm.nuevoVehiculo = null;
    };

    vm.registrarArreglo = (pVehiculo) => {
      console.log(pVehiculo);

      $state.go('reparaciones', {objVehiculoTemp: JSON.stringify(pVehiculo)})
    }

    vm.volver = () => {
      $state.go('usuarios');
    }

    function listarVehiculos() {
      vm.listaVehiculos = servicioUsuarios.getVehiculos(objUsuario);
    }

  }
})();