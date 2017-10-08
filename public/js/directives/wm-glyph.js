wmApp.directive('wmGlyph', ['$compile',
  function($compile) {
    return {
      restrict: 'E',
      scope: {
        glyphs: '=',
        curGlyph: '=',
        type: '=',
      },
      templateUrl: '/partials/wm-glyph.html',
      link: function(scope, elem, attrs) {
      }
    }
}]);
