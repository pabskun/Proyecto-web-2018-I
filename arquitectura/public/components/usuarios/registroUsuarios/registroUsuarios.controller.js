(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('controllerRegistroUsuarios', controllerRegistroUsuarios);

  controllerRegistroUsuarios.$inject = ['$http', 'servicioUsuarios'];

  function controllerRegistroUsuarios($http, servicioUsuarios){
    const vm = this;

    vm.nuevoUsuario = {};

    vm.provincias = $http({
      method: 'GET',
      url: './sources/data/provincias.json'
    }).then(function (success) {
      console.log(success.datas);
      vm.provincias = success.data;
    }, function (error) {
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
      }, function (error) {
        console.log("Ocurrió un error " + error.data)
      });
    }

    vm.rellenarDistrito = (pidCanton) => {
      console.log(pidCanton);
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
      }, function (error){
        console.log("Ocurrió un error " + error.data)
      });
    }

    vm.registrarUsuario = (pnuevoUsuario) => {

      let objNuevoUsuario = new Cliente(pnuevoUsuario.cedula, pnuevoUsuario.nombre1, pnuevoUsuario.nombre2, pnuevoUsuario.apellido1, pnuevoUsuario.apellido2, pnuevoUsuario.fechaNacimiento, pnuevoUsuario.email, pnuevoUsuario.contrasenna, pnuevoUsuario.provincia.name);

      let registroExitoso = servicioUsuarios.addUsuario(objNuevoUsuario);

      if(registroExitoso == true){
        swal("Registro exitoso", "El usuario ha sido registrado correctamente", "success", {
          button: "Aceptar",
        });
      }

      vm.nuevoUsuario = null;
    }
  }
})();