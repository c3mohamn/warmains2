// Save Talent Modal controller
wmApp.controller('modalSaveTalentCtrl', ['$scope', 'close', '$location', function($scope, close, $location) {
  $scope.name = null;

  $scope.save = function() {
    $scope.destroying = true;
    close({
      talents: $location.search().talents,
      glyphs: $location.search().glyphs,
      name: $scope.name,
    }, 250);
  }

  $scope.closeModal = function() {
    $scope.destroying = true;
    close(false, 250);
  };



}]);
