// Save Talent Modal controller
wmApp.controller('modalSaveTalentCtrl', ['$scope', 'close', '$location', function($scope, close, $location) {
  $scope.name = null;
  $scope.closeModal = closeModal;
  $scope.save = save;

  function save() {
    if (validate() === true) {
      $scope.destroying = true;
      close({
        talents: $location.search().talents,
        glyphs: $location.search().glyphs,
        name: $scope.name,
      }, 250);
    }
  };

  function closeModal() {
    $scope.destroying = true;
    close(false, 250);

  }

  // return true of input is valid
  function validate() {
    if (!$scope.name) {
      $scope.nameError = 'Enter a name please.';
      return false;
    }
    else if ($scope.name.length < 2 || $scope.name.length > 20) {
      $scope.nameError = 'Name must be between 2 and 20 characters long.';
      return false;
    }
    return true;
  }
}]);
