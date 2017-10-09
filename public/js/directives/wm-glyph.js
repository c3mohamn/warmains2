wmApp.directive('wmGlyph', ['talentHelper',
  function(talentHelper) {
    return {
      restrict: 'E',
      scope: {
        glyph: '=',
      },
      templateUrl: '/partials/wm-glyph.html',
      link: function(scope, elem, attrs) {

        // functs
        scope.glyphImgPath = glyphImgPath;

        function glyphImgPath() {
          return talentHelper.getGlyphImgPath(scope.glyph);
        }
      }
    }
}]);
