(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .directive('navegacionPrincipal', navegacionPrincipal);
  
  function navegacionPrincipal(){
    let navegacion = {
      templateUrl: '/components/directives/header/header.view.html',
      restrict: 'EA'
    };

    return navegacion;
  }
})();