// Devlog page controller
wmApp.controller('changelogCtrl', ['$scope', 'log',
function($scope, log) {
    $scope.logs = log;
}]);
