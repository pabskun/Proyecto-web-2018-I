(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('registerUserController', registerUserController);

  registerUserController.$inject = ['$http','imageUploadService', 'servicioUsuarios', 'Upload'];

  function registerUserController($http, imageUploadService, servicioUsuarios, Upload){
    const vm = this;

    vm.nuevoUsuario = {};

    vm.provincias = $http({
      method: 'GET',
      url: './sources/data/provincias.json'
    }).then( (success) => {
      vm.provincias = success.data;
    }, (error) => {
      console.log("Ocurrió un error " + error.data);
    });

    vm.rellenarCantones = (pidProvincia) => {
      vm.cantones = $http({
        method: 'GET',
        url: './sources/data/cantones.json'
      }).then((success) => {
        let cantones = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidProvincia == success.data[i].idProvincia) {
            cantones.push(success.data[i]);
          }
        }
        vm.cantones = cantones;
      }, (error) => {
        console.log("Ocurrió un error " + error.data)
      });
    }

    vm.rellenarDistrito = (pidCanton) => {
      vm.distritos = $http({
        method: 'GET',
        url: './sources/data/distritos.json'
      }).then((success) => {
        let distritos = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidCanton == success.data[i].idCanton) {
            distritos.push(success.data[i]);
          }
        }
        vm.distritos = distritos;
      }, (error) => {
        console.log("Ocurrió un error " + error.data);
      });
    }

    vm.cloudObj = imageUploadService.getConfiguration();

    vm.preRegistrarUsuario = (pnuevoUsuario) => {
      vm.cloudObj.data.file = pnuevoUsuario.photo[0];
      Upload.upload(vm.cloudObj).success((data) =>{
        vm.registrarUsuario(pnuevoUsuario, data.url);
     });
    }

    vm.registrarUsuario = (pnuevoUsuario, urlImagen) => {
      let objNuevoUsuario = new Cliente(pnuevoUsuario.cedula, pnuevoUsuario.nombre1, pnuevoUsuario.nombre2, pnuevoUsuario.apellido1, pnuevoUsuario.apellido2, pnuevoUsuario.fechaNacimiento, pnuevoUsuario.email, pnuevoUsuario.contrasenna, pnuevoUsuario.provincia.name, pnuevoUsuario.canton.name, pnuevoUsuario.distrito.name, urlImagen);

      let registroExitoso = servicioUsuarios.addUsuario(objNuevoUsuario);

      swal({
        title: "Registro exitoso",
        text: registroExitoso,
        button: "Aceptar",
      }).then((value) => {
        vm.nuevoUsuario = null;
      });
    }
  }
})();