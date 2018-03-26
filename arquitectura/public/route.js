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
          pageTitle: 'Taller Rapidito'
        }
      })

      .state('registroUsuarios', {
        url: '/registerUser',
        templateUrl: './components/usuarios/registroUsuarios/registroUsuarios.view.html',
        data:{
          pageTitle: 'Registro de usuarios | Taller Rapidito'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/registroUsuarios/registroUsuarios.controller.js')
          }]
        },
        controller: 'registerUserController',
        controllerAs: 'vm'
      })

      .state('inicioSesion', {
        url: '/login',
        templateUrl: './components/inicioSesion/inicioSesion.view.html',
        data:{
          pageTitle: 'Inicio de Sesión | Taller Rapidito'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/inicioSesion/inicioSesion.controller.js')
          }]
        },
        controller: 'loginController',
        controllerAs: 'vm'
      })

      .state('main', {
        url: '/main',
        templateUrl: './components/main/main.view.html',
        data:{
          pageTitle: 'Inicio | Taller Rapidito'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/main.controller.js')
          }]
        },
        controller: 'mainController',
        controllerAs: 'vm'
      })
      
      .state('main.registroVehiculos', {
        url: '/registerCar',
        templateUrl: './components/vehiculos/registrarVehiculos/registroVehiculos.view.html',
        data:{
          pageTitle: 'Registrar vehiculo | Taller Rapidito'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/vehiculos/registrarVehiculos/registroVehiculos.controller.js');
          }]
        },
        controller: 'registerCarController',
        controllerAs: 'vm'
      })
      
      .state('main.listarVehiculos', {
        url: '/viewCars',
        templateUrl: './components/vehiculos/listarVehiclos/listarVehiculos.view.html',
        data:{
          pageTitle: 'Lista de vehiculos | Taller Rapidito'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/vehiculos/listarVehiclos/listraVehiculos.controller.js');
          }]
        },
        controller: 'listCarController',
        controllerAs: 'vm'
      })

      .state('main.listarReparaciones', {
        url: '/listReparation',
        templateUrl: './components/reparaciones/listarReparaciones/listarReparaciones.view.html',
        data:{
          pageTitle: 'Lista de reparaciones | Taller Rapidito'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/reparaciones/listarReparaciones/listarReparaciones.controller.js');
          }]
        },
        params: {
          idVehiculo: ''
        },
        controller: 'listarReparacionesController',
        controllerAs: 'vm'
      })

      .state('main.registroReparaciones', {
        url: '/registerReparation',
        templateUrl: './components/reparaciones/registroReparaciones/registroReparaciones.view.html',
        data:{
          pageTitle: 'Lista de reparaciones | Taller Rapidito'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/reparaciones/registroReparaciones/registroReparaciones.controller.js');
          }]
        },
        params: {
          idVehiculo: ''
        },
        controller: 'registroReparacionesController',
        controllerAs: 'vm'
      })

      .state('main.verPerfil', {
        url: '/viewProfile',
        templateUrl: './components/usuarios/verPerfil/verPerfil.view.html',
        data:{
          pageTitle: 'Vehiculos | Taller Rapidito'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/verPerfil/verPerfil.controller.js');
          }]
        },
        controller: 'verPerfilController',
        controllerAs: 'vm'
      });

      $urlRouterProvider.otherwise('/');
  };
})();