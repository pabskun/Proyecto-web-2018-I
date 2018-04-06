(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('loginController', loginController);

  loginController.$inject = ['$state', 'loginService'];

  function loginController($state, loginService){
    const vm = this;

    vm.credentials = {};

    vm.login = (pcredentials) => {

      let inicioExitoso = loginService.logIn(pcredentials);

      if(inicioExitoso == true){
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