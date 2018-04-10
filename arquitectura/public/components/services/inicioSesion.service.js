(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .service('loginService', loginService);

  loginService.$inject = ['$log', '$http', 'servicioUsuarios', 'dataStorageFactory'];

  function loginService($log, $http, servicioUsuarios, dataStorageFactory){

    const loginAPI = {
      logIn : _logIn,
      logOut : _logOut,
      getAuthUser: _getAuthUser
    };
    return loginAPI;

    function _logIn(credentials) {
      
      let listaUsuarios = servicioUsuarios.getUsuarios();
      let incioExitoso = false;

      for(let i = 0; i<listaUsuarios.length; i++){
        if(listaUsuarios[i].getCorreo() == credentials.email && listaUsuarios[i].getContrasenna() == credentials.password){
          dataStorageFactory.setSession(listaUsuarios[i].getcedula());
          incioExitoso = true;
        }
      }
      return incioExitoso;
    };

    function _logOut(){
      let cierreExitoso = dataStorageFactory.closeSession();

      return cierreExitoso;
    };

    function _getAuthUser() {
      let sessionActiva = dataStorageFactory.getSession(),
          usuarioActivo;

      if(!sessionActiva){
        usuarioActivo = undefined;
      }else{
        usuarioActivo = obtenerDatosUsuarioActivo(sessionActiva);
      }

      return usuarioActivo;
    };


    function obtenerDatosUsuarioActivo(pcedula){
      let listaUsuarios = servicioUsuarios.getUsuarios(),
          datosUsuario;

      for(let i = 0; i < listaUsuarios.length; i++){
        if(listaUsuarios[i].getcedula() == pcedula){
          datosUsuario = listaUsuarios[i];
        }
      };

      return datosUsuario;
    }
  }
})();
