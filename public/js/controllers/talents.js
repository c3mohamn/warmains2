// Talent-calc controller
wmApp.controller('talentCalcCtrl', ['$scope', 'charHelper', '$stateParams', '$state',
  function($scope, charHelper, $stateParams, $state) {
    // vars
    $scope.classes = charHelper.classes;
    $scope.specs = charHelper.specs;
    $scope.talents = $stateParams.talents;
    $scope.classId = $stateParams.class;
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

    // Change class and state.
    function changeClass(id) {
      $scope.classId = id;
      console.log('Changing Class.');
      $state.transitionTo('talent-calculator', {class: $scope.classId, talents: $scope.talents });
    }

}]);
