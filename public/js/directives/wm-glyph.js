wmApp.directive('wmGlyph', ['talentHelper',
  function(talentHelper) {
    return {
      restrict: 'E',
      scope: {
        curGlyphs: '=',
        index: '=',
      },
      templateUrl: '/partials/wm-glyph.html',
      link: function(scope, elem, attrs) {
        // vars
        var index = scope.index;
        var type = 1;

        // functs
        scope.glyphImgPath = glyphImgPath;
        scope.removeGlyph = removeGlyph;

        function glyphImgPath() {
          return talentHelper.getGlyphImgPath(scope.curGlyphs[index]);
        }

        function removeGlyph() {
          scope.curGlyphs[index] = null;
          talentHelper.changeUrlGlyphs(scope.curGlyphs);
        }
      }
    }
}]);
