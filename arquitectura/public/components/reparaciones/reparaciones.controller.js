(() => {
  'use strict';
  angular
  .module('arquitectura')
  .controller('controladorReparaciones', controladorReparaciones);

  controladorReparaciones.$inject = ['$stateParams', '$state', 'servicioUsuarios']

  function controladorReparaciones($stateParams, $state, servicioUsuarios){
    let vm = this;

    // aqui validamos que el paramatero exista, en caso de que no exista nos redijirá al estado anterior
    if(!$stateParams.objVehiculoTemp){
      $state.go('vehiculos');
    }

    let objSinFormatoVehiculo = JSON.parse($stateParams.objVehiculoTemp);

    let objVehiculo = new Vehiculo (objSinFormatoVehiculo.modelo, objSinFormatoVehiculo.matricula, objSinFormatoVehiculo.marca);

    vm.infoVehiculos = objVehiculo.getInfoVehiculo();

    listaReparaciones();

    vm.nuevaReparacion = {};

    vm.listaReparaciones = servicioUsuarios.getReparaciones(objVehiculo);

    vm.registrarReparacion = (pnuevaReparacion) => {

      let objReparacion = new Reparaciones(pnuevaReparacion.costo, pnuevaReparacion.descripcion)

      servicioUsuarios.addReparaciones(objVehiculo, objReparacion);

      listaReparaciones();

      swal("Registro exitoso", "Se ha registrado correctamente la reparación", "success", {
        button: "Aceptar",
      });

      vm.nuevaReparacion = null;
    }

    vm.volver = () => {
      $state.go('usuarios');
    }

    function listaReparaciones(){
      vm.listaReparaciones = servicioUsuarios.getReparaciones(objVehiculo);
    }
  }
})();