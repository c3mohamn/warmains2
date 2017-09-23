// Index page controller
wmApp.controller('indexCtrl', ['$rootScope', '$scope', '$state', 'authAPI', function($rootScope, $scope, $state, authAPI) {
  $scope.logout = logout;

  function logout() {
    authAPI.logout();
  }
}]);
