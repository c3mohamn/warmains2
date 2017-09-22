var wmApp = angular.module("wmApp", ['ui.router', 'ngAnimate', 'mm.foundation']);

wmApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/home');
  $locationProvider.hashPrefix('');

  $stateProvider
    .state('home', {
      url: '/',
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
    })
    .state('planner', {
      url: '/planner',
      templateUrl: 'states/planner.html',
      controller: 'plannerCtrl'
    });
});
