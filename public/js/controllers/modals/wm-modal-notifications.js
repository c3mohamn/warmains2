// Notifications Modal controller
wmApp.controller('modalNotificationsCtrl', ['$scope', 'close', '$timeout', 'params', 
  function($scope, close, $timeout, params) {
    $scope.msg = params.msg;
    $scope.type = params.type;
    $scope.index = params.index;
    var destroyTime = $scope.type === 'error' ? 4000 : 2500;

    $scope.closeModal = closeModal;
    $scope.changePosition = changePosition;

    init();

    function init() {
      $timeout(function () {
        closeModal();
      }, destroyTime);
    }

    // Create stacking affect when more than 1 notification on screen
    function changePosition() {
      if ($scope.index > 1) {
        var bottomOffset = 2 + ($scope.index - 1) * 5;
        return { 'bottom': bottomOffset + 'rem' }; 
      }
    }

    // Close without saving
    function closeModal() {
      if (!$scope.destroying) {
        $scope.destroying = true;
        close(false, 250);
      }
    }
}]);