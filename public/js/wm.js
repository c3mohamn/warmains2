var wmApp = angular.module("wmApp", ['ui.router', 'ngAnimate', 'mm.foundation', 'ngStorage', 'ngSanitize', 'angular-click-outside']);

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
      data: { title: 'Home' },
      templateUrl: '/states/home.html',
      controller: 'homeCtrl'
    })
    .state('register', {
      url: '/register',
      data: { title: 'Registration' },
      templateUrl: '/states/register.html',
      controller: 'authCtrl'
    })
    .state('login', {
      url: '/login',
      data: { title: 'Login' },
      templateUrl: '/states/login.html',
      controller: 'authCtrl'
    })
    .state('styles', {
      url: '/styles',
      data: { title: 'Styles' },
      templateUrl: 'states/styles.html',
      controller: 'stylesCtrl'
    })
    .state('planner', {
      url: '/planner',
      data: { title: 'Planner' },
      templateUrl: 'states/planner.html',
      controller: 'plannerCtrl'
    })
    .state('talent-calculator', {
      url: '/planner/talent-calculator/:class',
      data: { title: 'Talent Calculator' },
      reloadOnSearch: false,
      templateUrl: 'states/talent-calc.html',
      controller: 'talentCalcCtrl',
      resolve: {
        talentDetails: ['$http', '$stateParams', function($http, $stateParams) {
          if ($stateParams.class) {
            return $http.get('/js/variables/talent-details.json').then(
              function(response) {
                return response.data[$stateParams.class];
              }
            );
          } else {
            return null;
          }
        }],
        talentTooltips: ['$http', '$stateParams', function($http, $stateParams) {
          if ($stateParams.class) {
            return $http.get('/js/variables/talent-tooltips/' + $stateParams.class + '.json').then(
              function(response) {
                return response.data;
              }
            );
          } else {
            return null;
          }
        }],
        talentGlyphs: ['$http', '$stateParams', function($http, $stateParams) {
          if ($stateParams.class) {
            return $http.get('/js/variables/glyphs.json').then(
              function(response) {
                return response.data[$stateParams.class];
              }
            );
          } else {
            return null;
          }
        }],
      }
    });
});
