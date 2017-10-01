wmApp.directive('wmTooltip', ['$compile', '$document', '$sce',
  function($compile, $document, $sce) {
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

        if (!scope.hideTooltip) {
          elem.bind('mouseenter', function() {
            // element and tooltip demensions
            var eBounds = elem[0].getBoundingClientRect(),
                tBounds = template[0].getBoundingClientRect(),
                eWidth = eBounds.width,
                eHeight = eBounds.height,
                tWidth = tBounds.width,
                tHeight = tBounds.height,
                margin = 10;

            //console.log(eBounds.left, eBounds.top, tWidth, tHeight);

            // Position of tooltip
            switch (position) {
              case 'top-middle':
                template.css('left', eBounds.left - (tWidth / 2) + (eWidth / 2) + 'px');
                template.css('top', eBounds.top - tHeight - margin + 'px');
                break;
              case 'left-middle':
                template.css('left', eBounds.left - tWidth - margin + 'px');
                template.css('top', eBounds.top - (tHeight / 2) + (eHeight / 2) + 'px');
                break;
              case 'right-middle':
                template.css('left', eBounds.right + margin + 'px');
                template.css('top', eBounds.top - (tHeight / 2) + (eHeight / 2) + 'px');
                break;
              default: // bottom-middle default
                template.css('left', eBounds.left - (tWidth / 2) + (eWidth / 2) + 'px');
                template.css('top', eBounds.bottom + margin + 'px');
            }

            template.css('visibility', 'visible');
          });
        }

        elem.bind('mouseleave', function() {
          template.css('visibility', 'hidden');
        });

        elem.on('$destroy', function () { scope.$destroy(); });
        scope.$on('$destroy', cleanUp);

        function cleanUp() {
          template.remove();
        }
      }
    }
}]);
