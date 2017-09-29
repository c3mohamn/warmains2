wmApp.directive('wmTooltip', ['$compile', '$document', function($compile, $document) {
  return {
    restrict: 'A',
    //transclude: true,
    scope: {
      position: '@',
      content: '@'
    },
    //templateUrl: '/partials/wm-tooltip.html',
    link: function(scope, elem, attrs) {
      var position = scope.position || 'top-middle';
      var template = $compile("<div class='wm-tooltip' ng-show='showHover'>{{content}}</div>")(scope);
      var eWidth = elem.prop('width'),
          eHeight = elem.prop('height');
      scope.showHover = false;

      $document.find('body').append(template);

      var tWidth = template.prop('offsetWidth'),
          tHeight = template.prop('offsetHeight');

      elem.bind('mouseenter', function(e) {
        scope.$apply(function() {
          var pos = e.target.getBoundingClientRect();
          var margin = 10;

          console.log(pos.left, pos.top, eWidth, eHeight, tWidth, tHeight);

          // Position of tooltip
          if (position == 'top-middle') {
            template.css('left', pos.left - (tWidth / 2) + (eWidth / 2) + 'px');
            template.css('top', pos.top - tHeight - margin + 'px');
          } else if (position == 'left-middle') {
            template.css('left', pos.left - tWidth - margin + 'px');
            template.css('top', pos.top - (tHeight / 2) + (eHeight / 2) + 'px');
          } else if (position == 'right-middle') {
            template.css('left', pos.right + margin + 'px');
            template.css('top', pos.top - (tHeight / 2) + (eHeight / 2) + 'px');
          } else if (position == 'bottom-middle') {
            template.css('left', pos.left - (tWidth / 2) + (eWidth / 2) + 'px');
            template.css('top', pos.bottom + margin + 'px');
          }

          scope.showHover = true;
        });
      });

      elem.bind('mouseleave', function() {
        scope.$apply(function() {
            scope.showHover = false;
        });
      });

      // elem.bind('mousedown', function() {
      //   scope.$apply(function() {
      //       scope.showHover = false;
      //   });
      // });
    }
  }
}]);
