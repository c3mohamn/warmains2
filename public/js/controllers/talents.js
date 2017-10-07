// Talent-calc controller
wmApp.controller('talentCalcCtrl', ['$scope', 'talentHelper', '$stateParams', '$state', 'talentDetails', 'talentTooltips',
  function($scope, talentHelper, $stateParams, $state, talentDetails, talentTooltips) {
    // vars
    $scope.classes = classesToString;
    $scope.specs = specsToString;
    $scope.urlTalents = talentHelper.getUrlTalents();
    $scope.classId = $stateParams.class;
    $scope.talentDetails = talentDetails;                            // class talents
    $scope.talentTooltips = talentTooltips;
    $scope.talentPointsDetails = talentHelper.talentPointsDetails; // additional info about current talents
    $scope.talentPoints = {};                                     // stores points used in each talent
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
      // clear and initialize talent point variables
      clearTalents();

      if ($scope.urlTalents) {
        talentHelper.initTalents(talentDetails, $scope.urlTalents, $scope.talentPoints, $scope.talentPointsDetails);
      }
    }

    function clearTalents() {
      talentHelper.clearTalents($scope.talentPoints, $scope.talentPointsDetails, $scope.classId, talentDetails);
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
