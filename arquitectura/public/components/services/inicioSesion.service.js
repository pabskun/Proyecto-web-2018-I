(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .service('loginService', loginService);

  loginService.$inject = ['$log', '$http', 'servicioUsuarios', 'localStorageFactory'];

  function loginService($log, $http, servicioUsuarios, localStorageFactory){

    const sessionList = "session";

    const loginAPI = {
      logIn : _logIn,
      logOut : _logOut,
      isAuth: _isAuth,
      getAuthUser: _getAuthUser
    };
    return loginAPI;

    function _logIn(credentials) {
      
      let allUser = servicioUsuarios.retornarUsuario();
      let incioExitoso = false;

      for(let i = 0; i<allUser.length; i++){
        if(allUser[i].getCorreo() == credentials.correo && allUser[i].getContrasenna() == credentials.contrasenna){
          localStorageFactory.setSession(sessionList, allUser[i].getcedula());
          incioExitoso = true;
        }
      }
      return incioExitoso;
    }

    function _logOut(){
      localStorageFactory.closeSession(sessionList);
    };
  }
})();



    

    function _isAuth(){
      return !!sessionService.session;
    }
    
    function _getAuthUser() {
      if (sessionService.session) {
        return sessionService.session.user;
      }else{
        return undefined;
      }
    }
