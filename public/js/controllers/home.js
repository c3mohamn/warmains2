// Home page controller
wmApp.controller('homeCtrl', ['$rootScope', '$localStorage', '$scope',
  function($rootScope, $localStorage, $scope) {

    console.log('homeCtrl: ', $rootScope.currentUser);
    // TODO: This will be a home page with widgets where user can see recent stuffs
    // If not online, get information from localStorage
    // 1. Character list (easy access)
    // 2. News
    // 3. Recent characters viewed?
}]);
