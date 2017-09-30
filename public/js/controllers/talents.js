// Talent-calc controller
wmApp.controller('talentCalcCtrl', ['$scope', 'charHelper', 'talentHelper', '$stateParams', '$state',
  function($scope, charHelper, talentHelper, $stateParams, $state) {
    // vars
    $scope.classes = charHelper.classes;
    $scope.specs = charHelper.specs;
    $scope.urlTalents = $stateParams.talents;
    $scope.classId = $stateParams.class;
    $scope.talentPointsDetails = talentHelper.talentPointsDetails;
    $scope.talentPoints = {};
    // functs
    $scope.changeClass = changeClass;
    $scope.validClassId = validClassId;

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
      validateUrlTalents();
    }

    /* Return filled out talentPoints based on urlTalents iff urlTalents is
     * valid.
     */
    function validateUrlTalents() {
      var classTalentDetails = all_talents[$scope.classId];
      talentHelper.clearTalents($scope.talentPoints, $scope.talentPointsDetails);

      for (var t in classTalentDetails) {
        $scope.talentPoints[t] = 0;
        var amount = parseInt($scope.urlTalents[t]) || 0,
            talent = t,
            talents = $scope.talentPoints,
            details = $scope.talentPointsDetails;

        talentHelper.addPoint(amount, talent, talents, details, classTalentDetails);
      }
      console.log($scope.talentPoints, $scope.talentPointsDetails);
    }

    // Change class and state.
    function changeClass(id) {
      console.log('Changing Class.');
      $state.transitionTo('talent-calculator', { class: id, talents: 0 });
    }

    // Change state to blank state because talents are invalid.
    function invalidTalents() {
      $state.transitionTo('talent-calculator', { class: $scope.classId, talents: 0 });
    }

}]);
