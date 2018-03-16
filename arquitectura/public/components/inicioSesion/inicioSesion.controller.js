(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('controladorLogin', controladorLogin);

  controladorLogin.$inject = ['$state', 'loginService'];

  function controladorLogin($state, loginService){
    const vm = this;

    vm.credentials = {};

    vm.login = (pcredentials) => {

      let inicioExitoso = loginService.logIn(pcredentials);

      if(inicioExitoso == true){
        swal({
          title: "Inicio de sesión exitoso",
          text: "Bienvenido",
          icon: "success",
          button: "Aceptar",
        });
        $state.go('main');
      }else{
        swal({
          title: "Inicio de sesión fallido",
          text: "Los datos ingresados son incorrectos",
          icon: "error",
          button: "Aceptar",
        });
      }
    };
  }
})();