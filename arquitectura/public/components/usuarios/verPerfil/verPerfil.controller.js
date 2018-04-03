(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .controller('verPerfilController', verPerfilController);

  verPerfilController.$inject = ['servicioUsuarios', 'loginService']

  function verPerfilController(servicioUsuarios, loginService){
    const vm = this;

    const userAuth = loginService.getAuthUser();

    if(userAuth == undefined){
      $state.go('inicioSesion');
    }else{
      vm.usuarioActivo = userAuth.getNombre();
    }

    vm.userInfo = userAuth;
  };
})();