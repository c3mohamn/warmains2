// Index page controller
wmApp.controller('indexCtrl', ['$rootScope', '$scope', '$state', 'authAPI', function($rootScope, $scope, $state, authAPI) {
  $scope.logout = logout;
  $scope.$state = $state;
  console.log($state);

  function logout() {
    authAPI.logout();
  }
}]);
