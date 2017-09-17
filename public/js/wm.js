var wmApp = angular.module("wmApp", ['ui.router', 'ngAnimate', 'mm.foundation']);

wmApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/states/home.html',
      controller: 'indexCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/states/register.html',
      controller: 'authCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/states/login.html',
      controller: 'authCtrl'
    })
    .state('styles', {
      url: '/styles',
      templateUrl: 'states/styles.html',
      controller: 'stylesCtrl'
    });
});
