wmApp.directive('wmTooltip', ['$compile', function($compile) {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      position: '@',
      content: '@'
    },
    templateUrl: '/partials/wm-tooltip.html',
    link: function(scope, elem, attrs) {

      scope.showHover = false;

      console.log(scope.content);

      elem.bind('mouseenter', function() {
        scope.$apply(function() {
            scope.showHover = true;
        });
      });

      elem.bind('mouseleave', function() {
        scope.$apply(function() {
            scope.showHover = false;
        });
      });

      //$compile(elem);

    }
  }
}]);
