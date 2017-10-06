wmApp.directive('wmTooltip', ['$compile', '$document', '$sce', '$window', '$timeout',
  function($compile, $document, $sce, $window, $timeout) {
    return {
      restrict: 'A',
      scope: {
        position: '@',
        content: '@',
        contentHtml: '=',
        hideTooltip: '@',
      },
      link: function(scope, elem, attrs) {

        scope.trustedHtml = function (plainText) {
          return $sce.trustAsHtml(plainText);
        }

        var position = scope.position || 'top-middle',
            template = $compile("<div class='wm-tooltip' ng-bind-html='trustedHtml(contentHtml) || content'></div>")(scope);

        $document.find('body').append(template);

        elem.on('mouseenter', function() {
          if (!scope.hideTooltip) {
            getTooltipPosition();
            template.css('visibility', 'visible');
          }
        });

        elem.on('mouseleave', function() {
          template.css('visibility', 'hidden');
        });

        elem.on('mouseup', function() {
          console.log('click happens');
          $timeout(function() {
            getTooltipPosition();
          });
        });

        elem.on('$destroy', function () { scope.$destroy(); });
        scope.$on('$destroy', cleanUp);

        function cleanUp() {
          template.remove();
        }

        function getTooltipPosition() {
          // element and tooltip demensions
          var eBounds = elem[0].getBoundingClientRect(),
              tBounds = template[0].getBoundingClientRect(),
              eWidth = eBounds.width,
              eHeight = eBounds.height,
              tWidth = tBounds.width,
              tHeight = tBounds.height,
              margin = 20,
              offSetX = $window.scrollX,
              offSetY = $window.scrollY;

          //console.log(eBounds.left, eBounds.top, tWidth, tHeight);

          // Position of tooltip
          switch (position) {
            case 'top-middle':
              template.css('left', eBounds.left - (tWidth / 2) + (eWidth / 2) + 'px');
              template.css('top', offSetY + eBounds.top - tHeight - margin + 'px');
              break;
            case 'left-middle':
              template.css('left', eBounds.left - tWidth - margin + 'px');
              template.css('top', offSetY + eBounds.top - (tHeight / 2) + (eHeight / 2) + 'px');
              break;
            case 'right-middle':
              template.css('left', eBounds.right + margin + 'px');
              template.css('top', offSetY + eBounds.top - (tHeight / 2) + (eHeight / 2) + 'px');
              break;
            default: // bottom-middle default
              template.css('left', eBounds.left - (tWidth / 2) + (eWidth / 2) + 'px');
              template.css('top', offSetY + eBounds.bottom + margin + 'px');
          }
        }
      }
    }
}]);
