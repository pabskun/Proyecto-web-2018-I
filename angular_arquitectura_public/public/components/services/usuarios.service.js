(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$log','$http'];

  function servicioUsuarios($log, $http){

    let allClientes =[];

    let publicAPI = {
      addUsuario : _addUsuario,
      getUsuarios : _getUsuarios
    }
    return publicAPI;

    // Funcion que almacena en el localStorage todos los usuarios
    function _addUsuario(pnuevocliente){
      allClientes = _getUsuarios();
      allClientes.push(pnuevocliente);
      localStorage.setItem('lsClientes', JSON.stringify(allClientes));
    }

    // Funcion que trae todos los usuarios del localStorage y a partir de esos datos vuelve a crear un arreglo con todos los objetos de tipo cliente
    function _getUsuarios(){
      let listaUsuarios = JSON.parse(localStorage.getItem("lsClientes"));

      if(listaUsuarios == null){
        allClientes = [];
      }else{
        listaUsuarios.forEach(obj => {
          
          let objUsuarios = new Cliente(obj.cedula, obj.nombre, obj.apellidoUno, obj.apellidoDos,obj.telefono, obj.correo);

          allClientes.push(objUsuarios)
        })
      }

      return allClientes
    }
  }
})();