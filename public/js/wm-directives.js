(function(window, document, undefined) {
'use strict';

// Source: wm-glyph.js
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

// Source: wm-input-field.js
wmApp.directive('wmInputField', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      placeholder: '@',
      bind: '=',
      error: '=',
      maxLength: '@',
      inputType: '@',
    },
    templateUrl: '/partials/wm-input-field.html',
    link: function(scope, elem, attrs) {
    }
  }
});

// Source: wm-input-search.js
wmApp.directive('wmInputSearch', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        placeholder: '@',
        bind: '=',
        maxLength: '@',
      },
      templateUrl: '/partials/wm-input-search.html',
      link: function(scope, elem, attrs) {
      }
    }
  });

// Source: wm-mousewheel.js
// Mouse wheel scroll up / down directives
// http://blog.sodhanalibrary.com/2015/04/angularjs-directive-for-mouse-wheel.html#.WdmjYltSyUk
wmApp.directive('ngMouseWheelUp', function() {
    return function(scope, element, attrs) {
      element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {

        // cross-browser wheel delta
        var event = window.event || event; // old IE support
        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

        if(delta > 0) {
          scope.$apply(function(){
              scope.$eval(attrs.ngMouseWheelUp);
          });

          // for IE
          event.returnValue = false;
          // for Chrome and Firefox
          if(event.preventDefault) {
          	event.preventDefault();
          }
        }
      });
    };
});

wmApp.directive('ngMouseWheelDown', function() {
  return function(scope, element, attrs) {
    element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {

        // cross-browser wheel delta
        var event = window.event || event; // old IE support
        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

        if(delta < 0) {
          scope.$apply(function(){
              scope.$eval(attrs.ngMouseWheelDown);
          });

          // for IE
          event.returnValue = false;
          // for Chrome and Firefox
          if(event.preventDefault)  {
          	event.preventDefault();
          }
        }
    });
  };
});

// Source: wm-right-click.js
// ng-right-click directive
wmApp.directive('ngRightClick', ['$parse', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
}]);

// Source: wm-slideout-list.js
wmApp.directive('wmSlideoutList', ['talentHelper',
function(talentHelper) {
  return {
    restrict: 'E',
    scope: {
      slideoutTitle: '@', // title of slideout
      itemList: '=', // list of items
      delete: '&', // delete function
      showPreview: '=', // show small preview of slideout
      goToItemUrl: '&', // navigate to item
    },
    templateUrl: '/partials/wm-slideout-list.html',
    link: function(scope, elem, attrs) {
      scope.show = false;
      scope.toggleSlideout = toggleSlideout;
      scope.navigateToItem = navigateToItem;

      function navigateToItem(item) {
        scope.goToItemUrl({item: item});
      }

      function toggleSlideout(toggle) {
        if (toggle !== undefined) {
          scope.show = toggle;
        } else {
          scope.show = !scope.show;
        }
        scope.showPreview = false;
      }
    }
  }
}]);

// Source: wm-talent-preview.js
wmApp.directive('wmTalentPreview', ['ModalService', 'talentHelper', 'Notifications', 
  function(ModalService, talentHelper, Notifications) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
          talent: '=',
          detailed: '@', // show description or not
      },
      templateUrl: '/partials/wm-talent-preview.html',
      link: function(scope, elem, attrs) {
        scope.getTalentIcon = getTalentIcon;
        scope.deleteSavedTalent = deleteSavedTalent;

        function getTalentIcon() {
            if (scope.talent.spec) {
              return '/images/spec-icons/' + scope.talent.classId + '/' + scope.talent.spec + '.jpg';
            }

            return '/images/class-icons/' + scope.talent.classId + '.png';
        }
        
        function deleteSavedTalent($event) {
          $event.stopPropagation();
          
          var confirmDeleteModal = {
              templateUrl: '/partials/modals/wm-modal-confirm-delete.html',
              bodyClass: 'modal-open',
              controller: 'modalConfirmDeleteCtrl',
          };

          ModalService.showModal(confirmDeleteModal).then(function (modal) {
            modal.close.then(function (result) {

              // Delete talent
              if (result) {
                talentHelper.deleteTalent(scope.talent.id, scope.talent.name).then(
                  function successCallback(response) {
                    console.log(response);
                    Notifications.Alert(response.statusText, 'success');
                    talentHelper.removeSavedTalent(scope.talent.id);
                  }, function errorCallback(response) {
                    console.log(response);
                    Notifications.Alert(response.statusText, 'error');
                  }
                );
              }
            });
          });
        }
      }
    }
}]);

// Source: wm-talent.js
// talent directive
wmApp.directive('wmTalent', ['MetaData', 'talentHelper',
  function(MetaData, talentHelper) {
    return {
      restrict: 'E',
      scope: {
        classId: '@',
        col: '@',
        row: '@',
        tree: '@',
        talentsSpent: '=',
        talentsSpentDetails: '=',
        talentTooltips: '=',
        talentDetails: '=',
        tooltipPos: '@',
      },
      templateUrl: '/partials/wm-talent.html',
      link: function(scope, elem, attrs) {
        // vars
        scope.specs = specsToString;
        scope.isInactive = isInactive;
        // functs
        scope.talentImgPath = talentImgPath;
        scope.addPoint = addPoint;
        scope.removePoint = removePoint;
        scope.isInactive = isInactive;

        initTalent();

        // search for matching talent
        function initTalent() {

          for (var key in scope.talentDetails) {
            if (scope.talentDetails[key].row == scope.row &&
                scope.talentDetails[key].col == scope.col &&
                scope.talentDetails[key].tree == scope.tree) {
              scope.talent = scope.talentDetails[key];
              scope.talentId = key;

              scope.talentTooltipDescriptions = scope.talentTooltips[key];
              getTalentTooltip();
              return true;
            }
          }
        }

        // return true if talent is currently inactive
        function isInactive(talentId) {
          return talentHelper.isTalentInactive(talentId, scope.talentDetails, scope.talentsSpent, scope.talentsSpentDetails);
        }

        // returns path of talent image.
        function talentImgPath() {
          return talentHelper.getTalentImgPath(scope.talentId, scope.classId, scope.specs[scope.classId][scope.tree]);
        }

        // creates the html content for talents tooltip
        function getTalentTooltip() {
          scope.tooltip = talentHelper.getTalentTooltip(scope.talentId, scope.talent, scope.talentsSpent, talentImgPath(), scope.talentTooltipDescriptions, isInactive(scope.talentId));
        }

        // add 1 talent point to talent
        function addPoint() {
          var pointAdded = talentHelper.addPoint(1, scope.talentId, scope.talentsSpent, scope.talentsSpentDetails, scope.talentDetails);
          update(pointAdded);
        }

        // remove 1 talent point from talent
        function removePoint() {
          var pointRemoved = talentHelper.removePoint(scope.talentId, scope.talentsSpent, scope.talentsSpentDetails, scope.talentDetails);
          update(pointRemoved);
        }

        // Update talent tooltip, Url, Page Title
        function update(changesMade) {
          if (changesMade) {
            getTalentTooltip();
            talentHelper.changeUrlTalents(scope.talentsSpent);

            MetaData.setTitle(getPageTitleFromTalentDetails(scope.talentsSpentDetails, scope.classId));
          }
        }
      }
    }
}]);

// Source: wm-tooltip.js
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
          if (scope.content != '') {
            template.css('visibility', 'visible');
          }
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

})(window, document);
