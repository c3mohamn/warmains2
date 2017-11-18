// Save Talent Modal controller
wmApp.controller('modalSaveTalentCtrl', ['$scope', 'close', '$location', 'talentHelper', function($scope, close, $location, talentHelper) {
  $scope.name = null;
  $scope.closeModal = closeModal;
  $scope.save = save;
  $scope.savedTalents = talentHelper.getAllSavedTalents();

  // Save current talents
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

  // Close without saving
  function closeModal() {
    $scope.destroying = true;
    close(false, 250);
  }

  // Return true of save input is valid
  function validate() {
    if (!$scope.name) {
      $scope.nameError = 'Enter a name please.';
      return false;
    } else if ($scope.name.length < 2 || $scope.name.length > 20) {
      $scope.nameError = 'Name must be between 2 and 20 characters long.';
      return false;
    } else if ($location.search().talents === '') {
      $scope.nameError = 'You cannot save an empty talent tree.';
      return false;
    }

    return true;
  }
}]);
