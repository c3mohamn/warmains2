// Index page controller
wmApp.controller('indexCtrl', ['$scope', '$state', 'authAPI', 'MetaData',
  function($scope, $state, authAPI, MetaData) {
    $scope.logout = logout;
    $scope.$state = $state;
    $scope.MetaData = MetaData;

    function logout() {
      authAPI.logout();
    }
}]);
