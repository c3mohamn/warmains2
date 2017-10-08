wmApp.directive('wmModalGlyphs', ['$compile',
  function($compile) {
    return {
      restrict: 'E',
      scope: {
        glyphs: '=',
        destroy: '=',
      },
      templateUrl: '/partials/wm-modal-glyphs.html',
      link: function(scope, elem, attrs) {

        scope.majorGlyphs = scope.glyphs[1];
        scope.minorGlyphs = scope.glyphs[2];

        console.log(scope.majorGlyphs);
      }
    }
}]);
