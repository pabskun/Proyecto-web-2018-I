(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('registroReparacionesController', registroReparacionesController);

  registroReparacionesController.$inject = ['$state', '$stateParams', 'servicioUsuarios', 'loginService'];

  function registroReparacionesController($state, $stateParams, servicioUsuarios, loginService){
    const vm = this;

    const userAuth = loginService.getAuthUser();

    if(userAuth == undefined){
      $state.go('inicioSesion');
    };

    if (!$stateParams.idVehiculo){
      $state.go('main.listarVehiculos');
    };

    vm.nuevaReparacion = {};


    vm.vehiculo = servicioUsuarios.getInfoVehiculos(userAuth.getcedula(), $stateParams.idVehiculo);

    /**
     * Funcion que recibe una objeto sin formato, crea un objeto de tipo reparación y lo envia al servicio para ser almacenado dentro del vehiculo seleccionado
     * @param {Objeto sin formato de la reparación} pReparacion 
     */
    vm.registrarReparacion = (pReparacion) => {

      let objReparacion = new Reparaciones(pReparacion.costo, pReparacion.descripcion, pReparacion.fechaReparacion),
          registroExitoso;

      registroExitoso = servicioUsuarios.addReparaciones(userAuth.getcedula(), $stateParams.idVehiculo, objReparacion);


      if(registroExitoso == true){
        swal({
          title: "Registro exitoso",
          text: "La reparación ha sido registrada correctamente",
          icon: "success",
          button: "Aceptar",
        });
        vm.nuevaReparacion = null;
      }

    };
    
    vm.volver = () => {
      $state.go('main.listarVehiculos');
    }

    vm.listar = () => {
      $state.go('main.listarReparaciones', {idVehiculo: $stateParams.idVehiculo});
    }
  };
})();