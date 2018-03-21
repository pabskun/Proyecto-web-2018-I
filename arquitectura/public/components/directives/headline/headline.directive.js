(() => {
  'use strict';
  angular
  .module('tallerRapidito')
  .directive('cabeceraPrincipal', cabeceraPrincipal);
  
  function cabeceraPrincipal(){
    
    let headlineController = function () {
      const vm = this;

      
      vm.addItem = function () {
          vm.add();
          vm.items.push({
              name: 'New Directive Controller Item'
          });
      };
    };

    let headline = {
      templateUrl: '/components/directives/headline/headline.view.html',
      restrict: 'EA',
      controller: headlineController,
      controllerAs: 'vm',
    };
    return headline;
  }
})();