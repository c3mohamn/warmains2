// Talent-calc controller
wmApp.controller('talentCalcCtrl', ['$scope', 'charHelper', 'talentHelper', '$stateParams', '$state', '$location',
  function($scope, charHelper, talentHelper, $stateParams, $state, $location) {
    // vars
    $scope.classes = charHelper.classes;
    $scope.specs = charHelper.specs;
    $scope.urlTalents = $location.search().talents;
    $scope.classId = $stateParams.class;
    $scope.talentPointsDetails = talentHelper.talentPointsDetails;
    $scope.talentPoints = {};
    // functs
    $scope.changeClass = changeClass;
    $scope.validClassId = validClassId;
    $scope.clearTalents = clearTalents;

    // Check if the class Id from url is valid.
    function validClassId() {
      if ($scope.classId === '' || !$scope.classId) {
        return false;
      }
      if (!$scope.classes[$scope.classId]) {
        return false;
      }
      return true;
    }

    if ($scope.classId) {
      initTalents();
    }

    /* Return filled out talentPoints based on urlTalents iff urlTalents is
     * valid.
     */
    function initTalents() {
      var classTalentDetails = all_talents[$scope.classId];
      // clear and initialize talent point variables
      clearTalents();

      if ($location.search().talents) {
        for (var t in classTalentDetails) {
          $scope.talentPoints[t] = 0;
          var amount = parseInt($scope.urlTalents[t]) || 0,
              talentId = t,
              talents = $scope.talentPoints,
              details = $scope.talentPointsDetails;

          talentHelper.addPoint(amount, talentId, talents, details, classTalentDetails);
        }
      }

      console.log($scope.talentPoints, $scope.talentPointsDetails);
    }

    function clearTalents() {
      talentHelper.clearTalents($scope.talentPoints, $scope.talentPointsDetails, $scope.classId);
    }

    // Change class and state.
    function changeClass(id) {
      console.log('Changing Class.');
      $state.go('talent-calculator', { class: id });
    }

    // Change state to blank state because talents are invalid.
    function invalidTalents() {
      $state.transitionTo('talent-calculator', { class: $scope.classId });
    }

}]);
