var wmApp = angular.module("wmApp", ['ui.router', 'ngAnimate', 'mm.foundation', 'ngStorage']);

// Capture State Changes
wmApp.run(function ($transitions, $localStorage, $sessionStorage, $rootScope, authAPI) {

  // Validate token in backend and refresh token here.
  // Only on new sessions
  if (!$sessionStorage.oldSession && $localStorage.currentUser) {
    $sessionStorage.oldSession = true;
    if ($localStorage.currentUser.token) {
      authAPI.refreshToken($localStorage.currentUser.token).then(
        function successCallback(response) {
          console.log(response);
          $localStorage.currentUser = response.data;
        }, function errorCallback(response) {
          console.log(response);
          authAPI.logout();
        }
      );
    } else {
      delete $localStorage.currentUser;
    }
  }

  // Log user in if they are not logged in. (For refreshes and first enter)
  if ($localStorage.currentUser && $localStorage.currentUser.token) {
    var currentUser = authAPI.decryptToken($localStorage.currentUser.token);
    $rootScope.currentUser = {
      username: currentUser.username,
      role: currentUser.role
    };
  }

  $transitions.onStart({}, function(trans) {

    // Check for any users logged in on state changes
    if ($localStorage.currentUser) {
      var currentUser = authAPI.decryptToken($localStorage.currentUser.token);
      var currentTime = new Date().getTime() / 1000; // get time in seconds

      // Log user out if token is expired.
      if (currentUser.exp < currentTime) {
        $rootScope.currentUser = null;
        authAPI.logout();
      }

      $rootScope.currentUser = {
        username: currentUser.username,
        role: currentUser.role
      };
    } else {
      // No user in localStorage, so no one logged in.
      $rootScope.currentUser = null;
    }
  });

  $transitions.onStart({ to: ['login', 'register']}, function(trans) {
    // redirect logged in user to home page if they try to come to these pages.
    if ($rootScope.currentUser) {
      return trans.router.stateService.target('home');
    }
  });

  //$transitions.onStart({ to: 'admin'}, function(trans) {
  // TODO: only admins can enter this. (role 2 + )
  //});

  //$transitions.onStart({ to: 'god'}, function(trans) {
  // TODO: only owners can enter this. (role 3)
  //});

  $transitions.onSuccess({}, function(trans) {
    //console.log('State Change Success', trans);
  });


});

// States
wmApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/home');
  $locationProvider.hashPrefix('');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/states/home.html',
      controller: 'homeCtrl'
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
    })
    .state('talent-calculator', {
      url: '/planner/talent-calculator/:class/:talents',
      templateUrl: 'states/talent-calc.html',
      controller: 'talentCalcCtrl'
    });
});
