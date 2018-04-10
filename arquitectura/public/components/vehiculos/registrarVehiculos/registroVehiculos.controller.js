(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('registerCarController', registerCarController);

  registerCarController.$inject = ['servicioUsuarios', 'loginService', 'imageUploadService', 'Upload'];

  function registerCarController(servicioUsuarios, loginService, imageUploadService, Upload){

    const vm = this;

    const userAuth = loginService.getAuthUser();

    console.log(userAuth);

    if(userAuth == undefined){
      $state.go('inicioSesion');
    }else{
      vm.usuarioActivo = userAuth.getNombre();
    }

    vm.nuevoVehiculo = {};

    vm.cloudObj = imageUploadService.getConfiguration();

    vm.preRegistrarVehiculo = (pnuevoVehiculo) => {
      vm.cloudObj.data.file = pnuevoVehiculo.photo[0];
      Upload.upload(vm.cloudObj).success((data) =>{
        vm.registrarVehiculo(pnuevoVehiculo, data.url);
     });
    }

    vm.registrarVehiculo = (pnuevovehiculo, urlImagen) => {
      
      let objVehiculoNuevo = new Vehiculo(pnuevovehiculo.modelo, pnuevovehiculo.matricula, pnuevovehiculo.marca, urlImagen, userAuth.getcedula()),
          registroExitoso;

      console.log(objVehiculoNuevo);

      registroExitoso = servicioUsuarios.addVehiculo(objVehiculoNuevo);

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
    };
  }
})();