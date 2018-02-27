(() => {
  'use strict';
  angular
    .module('appRoutes', ['ui.router', 'oc.lazyLoad', 'uiRouterTitle'])
    .config(routing);
  routing.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routing($stateProvider, $urlRouterProvider, $oclazyLoad) {

    $stateProvider
      .state('landingPage', {
        url: '/',
        templateUrl: './components/landingPage/landingPage.view.html',
        data:{
          pageTitle: 'Inicio | Ejemplo Arquitectura'
        }
      })

      .state('usuarios', {
        url: '/users',
        templateUrl: './components/usuarios/usuarios.view.html',
        data:{
          pageTitle: 'Registro usuarios | Ejemplo Arquitectura'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/usuarios.controller.js')
          }]
        },
        controller: 'controladorUsuarios',
        controllerAs: 'vm'
      })

      .state('vehiculos', {
        url: '/cars',
        templateUrl: './components/vehiculos/vehiculo.view.html',
        data:{
          pageTitle: 'Registro vehiculos | Ejemplo Arquitectura'
        },
        params: {
          objUsuarioTemp: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/vehiculos/vehiculo.controller.js')
          }]
        },
        controller: 'controladorVehiculo',
        controllerAs: 'vm'
      })

      .state('reparaciones', {
        url: '/works',
        templateUrl: 'components/reparaciones/reparaciones.view.html',
        data:{
          pageTitle: 'Registro reparaciones | Ejemplo Arquitectura'
        },
        params: {
          objVehiculoTemp: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/reparaciones/reparaciones.controller.js')
          }]
        },
        controller: 'controladorReparaciones',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/users');
  };
})();