wmApp.directive('wmModalGlyphs', ['$rootScope', '$timeout', 'talentHelper',
  function($rootScope, $timeout, talentHelper) {
    return {
      restrict: 'E',
      scope: {
        glyphs: '=',
        curGlyphs: '=',
        type: '=',
        index: '=',
      },
      templateUrl: '/partials/wm-modal-glyphs.html',
      link: function(scope, elem, attrs) {
        // vars
        var index = scope.index;
        // functs
        scope.removeModal = removeModal;
        scope.getGlyphIconPath = getGlyphIconPath;
        scope.selectGlyph = selectGlyph;
        scope.alreadyUsed = alreadyUsed;

        function removeModal() {
          scope.destroying = true;
          $timeout(function() {
            $rootScope.showGlyphSelection = false;
          }, 300);
        }

        function getGlyphIconPath(glyph) {
          var iconName = glyph.icon.toLowerCase();

          return 'http://wow.zamimg.com/images/wow/icons/small/' + iconName + '.jpg';
        }

        function selectGlyph(glyph, urlId) {
          glyph.urlId = urlId;
          scope.curGlyphs[index] = glyph;
          talentHelper.changeUrlGlyphs(scope.curGlyphs);
          removeModal();
        }

        // return true if glyph is already used by user
        function alreadyUsed(glyph) {
          return scope.curGlyphs.indexOf(glyph) > -1;
        }
      }
    }
}]);
