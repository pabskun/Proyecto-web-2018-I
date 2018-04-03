(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('registerUserController', registerUserController);

  registerUserController.$inject = ['$http', 'servicioUsuarios'];

  function registerUserController($http, servicioUsuarios){
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

    vm.registrarUsuario = (pnuevoUsuario) => {

      let objNuevoUsuario = new Cliente(pnuevoUsuario.cedula, pnuevoUsuario.nombre1, pnuevoUsuario.nombre2, pnuevoUsuario.apellido1, pnuevoUsuario.apellido2, pnuevoUsuario.fechaNacimiento, pnuevoUsuario.email, pnuevoUsuario.contrasenna, pnuevoUsuario.provincia.name, pnuevoUsuario.canton.name, pnuevoUsuario.distrito.name);

      let registroExitoso = servicioUsuarios.addUsuario(objNuevoUsuario);

      if(registroExitoso == true){
        swal({
          title: "Registro exitoso",
          text: "El usuario ha sido registrado correctamente",
          icon: "success",
          button: "Aceptar",
        });
        vm.nuevoUsuario = null;
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