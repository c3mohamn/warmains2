// Confirm Delete Modal Controller
wmApp.controller('modalConfirmDeleteCtrl', ['$scope', 'close', 
  function($scope, close) {
    $scope.closeModal = closeModal;

    function closeModal(confirmation) {
        if (!$scope.destroying) {
          $scope.destroying = true;
          close(confirmation, 250);
        }
    }
}]);