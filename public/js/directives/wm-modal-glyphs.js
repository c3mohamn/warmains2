wmApp.directive('wmModalGlyphs', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      restrict: 'E',
      scope: {
        glyphs: '=',
      },
      templateUrl: '/partials/wm-modal-glyphs.html',
      link: function(scope, elem, attrs) {
        scope.removeModal = removeModal;

        function removeModal() {
          scope.destroying = true;
          $timeout(function() {
            $rootScope.showGlyphSelection = false;
          }, 300);
        }

        console.log(scope.glyphs);
      }
    }
}]);
