// Glyph Selection Modal Controller
wmApp.controller('modalGlyphsCtrl', ['$scope', 'close', 'glyphParams', 
  function($scope, close, glyphParams) {
    //vars
    $scope.modalSearch = '';
    $scope.closeModal = closeModal;
    $scope.curGlyphs = glyphParams.curGlyphs;
    $scope.glyphs = glyphParams.glyphs;
    $scope.type = glyphParams.type;
    $scope.index = glyphParams.index;
    // functs
    $scope.getGlyphIconPath = getGlyphIconPath;
    $scope.selectGlyph = selectGlyph;
    $scope.alreadyUsed = alreadyUsed;

    function getGlyphIconPath(glyph) {
      var iconName = glyph.icon.toLowerCase();

      return 'http://wow.zamimg.com/images/wow/icons/medium/' + iconName + '.jpg';
    }

    function selectGlyph(glyph) {
      $scope.curGlyphs[$scope.index] = glyph;
      if (!$scope.destroying) {
        $scope.destroying = true;
        close({
          curGlyphs: $scope.curGlyphs
        }, 250);
      }
    }

    // return true if glyph is already used by user
    function alreadyUsed(glyph) {
      return $scope.curGlyphs.indexOf(glyph) > -1;
    }

    // Close without saving
    function closeModal() {
      if (!$scope.destroying) {
        $scope.destroying = true;
        close(false, 250);
      }
    }
}]);
  