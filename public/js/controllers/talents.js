// Talent-calc controller
wmApp.controller('talentCalcCtrl', ['$scope', 'talentHelper', '$stateParams', '$state', 'talentDetails', 'talentTooltips', 'talentGlyphs',
  function($scope, talentHelper, $stateParams, $state, talentDetails, talentTooltips, talentGlyphs) {
    // vars
    $scope.classes = classesToString;
    $scope.specs = specsToString;
    $scope.urlTalents = talentHelper.getUrlTalents();
    $scope.classId = $stateParams.class;
    $scope.talentDetails = talentDetails;                            // class talents
    $scope.talentTooltips = talentTooltips;
    $scope.talentsSpentDetails = talentHelper.talentsSpentDetails; // additional info about current talents
    $scope.talentsSpent = {};                                     // stores points used in each talent
    $scope.talentGlyphs = talentGlyphs;
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

    /* Return filled out talentsSpent based on urlTalents iff urlTalents is
     * valid.
     */
    function initTalents() {
      // clear and initialize talent point variables
      clearTalents();

      if ($scope.urlTalents) {
        talentHelper.initTalents(talentDetails, $scope.urlTalents, $scope.talentsSpent, $scope.talentsSpentDetails);
      }
    }

    function clearTalents(tree) {
      talentHelper.clearTalents($scope.talentsSpent, $scope.talentsSpentDetails, $scope.classId, talentDetails, tree);
    }

    // Change class and state.
    function changeClass(id) {
      $state.go('talent-calculator', { class: id });
    }

    // Change state to blank state because talents are invalid.
    function invalidTalents() {
      $state.transitionTo('talent-calculator', { class: $scope.classId });
    }

}]);
