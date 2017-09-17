var wmApp = angular.module("wmApp", ['ui.router', 'ngAnimate', 'mm.foundation']);

wmApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/states/home.html',
      controller: 'homeCtrl'
    })
    .state('styles', {
      url: '/styles',
      templateUrl: 'states/styles.html',
      controller: 'stylesCtrl'
    });
});
