(() => {
  // Se utiliza el modo estricto de JavaScript introducido en el ES5
  'use strict';
  // Por medio de una creacion de un modulo cuyo nombre es "appRoutes" se inyectan las dependencias de ui-roter, oc-lazyLoad y angular css
  angular
  .module('appRoutes', ['ui.router','oc.lazyLoad','angularCSS'])
  // asi mismo se configura el routing de la aplicacion
  .config(routing);

  // Se inyectan los stateProvider y urlRouterProvider quienes se encargan de cambiar las vistas con sus respectivos controladores y hojas de  estlos
  routing.$inject = ['$stateProvider', '$urlRouterProvider'];

  // Se crea la funcion routing (se debe llamar igual que el que está dentro del config)
  function routing($stateProvider, $urlRouterProvider, $ocLazyLoad){

    $stateProvider

    // se configran todos los estados (vistas) por medio del atributo .state que es una funcion dentro del stateProvider
    .state('landing', {
      // Se le crea un url (por el cual se va a accesar a el medio de la ruta en el navegador)
      url: '/',
      // Se convoca al html
      templateUrl: './components/landing-page/landing-page.view.html',
      // se convoca el css
      css: './components/landing-page/landing-page.style.css'
    })

    .state('users', {
      // Se le crea un url (por el cual se va a accesar a el medio de la ruta en el navegador)
      url: '/users',
      // Se convoca al html
      templateUrl: './components/usuarios/usuarios.view.html',
      // se convoca el controlador
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('./components/usuarios/usuarios.controller.js')
        }]
      },
      // se convoca el css
      css: './components/usuarios/usuarios.styles.css',
      controller: 'controladorUsuarios',
		  controllerAs: 'vm'
    })

    .state('cars', {
      url: '/cars',
      templateUrl: './components/automoviles/autos.view.html',
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('./components/automoviles/autos.controller.js')
        }]
      },
      css: './components/automoviles/autos.style.css'
    })

    $urlRouterProvider.otherwise('/');
  }

})();