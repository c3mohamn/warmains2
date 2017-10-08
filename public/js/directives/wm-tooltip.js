wmApp.directive('wmTooltip', ['$compile', '$document', '$sce', '$window',
  function($compile, $document, $sce, $window) {
    return {
      restrict: 'A',
      scope: {
        position: '@',
        content: '@',
        contentHtml: '=',
      },
      link: function(scope, elem, attrs) {

        scope.trustedHtml = function (plainText) {
          return $sce.trustAsHtml(plainText);
        }

        var position = scope.position || 'top-middle',
            template = $compile("<div class='wm-tooltip' ng-bind-html='trustedHtml(contentHtml) || content'></div>")(scope);

        $document.find('body').append(template);

        elem.on('mouseenter', function() {
          getTooltipPosition();
          template.css('visibility', 'visible');
        });

        elem.on('mouseleave', function() {
          template.css('visibility', 'hidden');
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

          // tooltip positioning for talents based on tree
          if (position == '0') position = 'right-top';
          else if (position == '1') position = 'bottom-middle';
          else if (position == '2') position = 'left-top';

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
            case 'left-top':
              template.css('left', eBounds.left - tWidth - margin + 'px');
              template.css('top', offSetY + eBounds.top - (tHeight) + (eHeight / 2) + 'px');
              break;
            case 'right-middle':
              template.css('left', eBounds.right + margin + 'px');
              template.css('top', offSetY + eBounds.top - (tHeight / 2) + (eHeight / 2) + 'px');
              break;
            case 'right-top':
              template.css('left', eBounds.right + margin + 'px');
              template.css('top', offSetY + eBounds.top - (tHeight) + (eHeight / 2) + 'px');
              break;
            default: // bottom-middle default
              template.css('left', eBounds.left - (tWidth / 2) + (eWidth / 2) + 'px');
              template.css('top', offSetY + eBounds.bottom + margin + 'px');
          }
        }
      }
    }
}]);
