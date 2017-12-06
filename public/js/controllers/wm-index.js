// Index page controller
wmApp.controller('indexCtrl', ['$scope', '$state', 'authAPI', function($scope, $state, authAPI) {
  $scope.logout = logout;
  $scope.$state = $state;
  $scope.title = "Warmains | Wotlk Character, Talent & Raid Planner";

  function logout() {
    authAPI.logout();
  }
}]);
