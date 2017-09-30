wmApp.directive('wmTooltip', ['$compile', '$document', function($compile, $document) {
  return {
    restrict: 'A',
    //transclude: true,
    scope: {
      position: '@',
      content: '@',
      hideTooltip: '@',
    },
    //templateUrl: '/partials/wm-tooltip.html',
    link: function(scope, elem, attrs) {
      var position = scope.position || 'top-middle',
          template = $compile("<div class='wm-tooltip' ng-show='showHover'>{{content}}</div>")(scope),
          // element demensions
          eBounds = elem[0].getBoundingClientRect(),
          eWidth = eBounds.width,
          eHeight = eBounds.height;
      scope.showHover = false;

      $document.find('body').append(template);

      // Tooltip demensions
      var tBounds = template[0].getBoundingClientRect(),
          tWidth = tBounds.width,
          tHeight = tBounds.height;

      if (!scope.hideTooltip) {
        elem.bind('mouseenter', function(e) {
          scope.$apply(function() {
            var pos = e.target.getBoundingClientRect();
            var margin = 10;

            //console.log(pos.left, pos.top, eWidth, eHeight, tWidth, tHeight);

            // Position of tooltip
            switch (position) {
              case 'top-middle':
                template.css('left', pos.left - (tWidth / 2) + (eWidth / 2) + 'px');
                template.css('top', pos.top - tHeight - margin + 'px');
                break;
              case 'left-middle':
                template.css('left', pos.left - tWidth - margin + 'px');
                template.css('top', pos.top - (tHeight / 2) + (eHeight / 2) + 'px');
                break;
              case 'right-middle':
                template.css('left', pos.right + margin + 'px');
                template.css('top', pos.top - (tHeight / 2) + (eHeight / 2) + 'px');
                break;
              default: // bottom-middle default
                template.css('left', pos.left - (tWidth / 2) + (eWidth / 2) + 'px');
                template.css('top', pos.bottom + margin + 'px');
            }

            scope.showHover = true;
          });
        });
      }

      elem.bind('mouseleave', function() {
        scope.$apply(function() {
            scope.showHover = false;
        });
      });

      elem.on('$destroy', function () { scope.$destroy(); });
      scope.$on('$destroy', cleanUp);

      function cleanUp() {
        template.remove();
      }
    }
  }
}]);
