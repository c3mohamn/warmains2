// talent directive
wmApp.directive('wmTalent', ['$rootScope', 'charHelper', 'talentHelper', '$location',
  function($rootScope, charHelper, talentHelper, $location) {
    return {
      restrict: 'E',
      scope: {
        classId: '@',
        col: '@',
        row: '@',
        tree: '@',
        talents: '=',
        details: '=',
      },
      templateUrl: '/partials/wm-talent.html',
      link: function(scope, elem, attrs) {
        // vars
        var classTalents = all_talents[scope.classId];
        scope.specs = charHelper.specs;
        // functs
        scope.talentImgPath = talentImgPath;
        scope.addPoint = addPoint;
        scope.removePoint = removePoint;

        initTalent();

        // search for matching talent
        function initTalent() {
          for (var key in classTalents) {
            if (classTalents[key].row == scope.row &&
                classTalents[key].col == scope.col &&
                classTalents[key].tree == scope.tree) {
              scope.talent = classTalents[key];
              scope.talentId = key;

              // get tooltip descriptions
              talentHelper.getClassTooltipDescriptions(scope.classId).then(
                function (response) {
                  if (response) {
                    scope.talentTooltipDescriptions = response.data[scope.talentId];
                    talentTooltip();
                  }
                }
              );

              return true;
            }
          }
        }

        // returns path of talent image.
        function talentImgPath() {
          return talentHelper.getTalentImgPath(scope.talentId, scope.classId, scope.specs[scope.classId][scope.tree]);
        }

        function talentTooltip() {
          var description = scope.talentTooltipDescriptions[scope.talents[scope.talentId]];
          scope.tooltip = "<h4>" + scope.talent.name + "</h4>" +
                          "<div class='tooltip-description'>" + description + "</div>";
        }

        // add 1 talent point to talent
        function addPoint() {
          var pointAdded = talentHelper.addPoint(1, scope.talentId, scope.talents, scope.details, classTalents);
          console.log(scope.talentId, scope.talents, scope.details);

          if (pointAdded) {
            talentTooltip();
            $location.search('talents', talentHelper.generateUrl(scope.talents));
          }
        }

        // remove 1 talent point from talent
        function removePoint() {
          var pointRemoved = talentHelper.removePoint(scope.talentId, scope.talents, scope.details, classTalents);
          console.log(scope.talentId, scope.talents, scope.details);

          if (pointRemoved) {
            talentTooltip()
            $location.search('talents', talentHelper.generateUrl(scope.talents));
          }
        }
      }
    }
}]);
