(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('registerCarController', registerCarController);

  registerCarController.$inject = ['$http', 'servicioUsuarios', 'loginService'];

  function registerCarController($http, servicioUsuarios, loginService){

    const vm = this;

    const userAuth = loginService.getAuthUser();

    if(userAuth == undefined){
      $state.go('inicioSesion');
    }else{
      vm.usuarioActivo = userAuth.getNombre();
    }

    vm.nuevoVehiculo = {};

    vm.registrarVehiculo = (pnuevovehiculo) => {

      let objVehiculoNuevo = new Vehiculo(pnuevovehiculo.modelo, pnuevovehiculo.matricula, pnuevovehiculo.marca),
          registroExitoso;

      console.log(objVehiculoNuevo);

      registroExitoso = servicioUsuarios.addVehiculoPorUsuario(userAuth.getcedula(), objVehiculoNuevo);

      if(registroExitoso == true){
        swal({
          title: "Registro exitoso",
          text: "El vehiculo se ha registrado correctamente",
          icon: "success",
          button: "Aceptar",
        });
        vm.nuevoVehiculo = null
      }else{
        swal({
          title: "Hubo un error",
          text: "Ha ocurrido un error, inténtelo más tarde",
          icon: "error",
          button: "Aceptar",
        });
      }
    }
  }
})();