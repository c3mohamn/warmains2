// talent directive
wmApp.directive('wmTalent', ['$rootScope', 'talentHelper', '$location',
  function($rootScope, talentHelper, $location) {
    return {
      restrict: 'E',
      scope: {
        classId: '@',
        col: '@',
        row: '@',
        tree: '@',
        talentPoints: '=',
        talentPointsDetails: '=',
        talentTooltips: '=',
        talentDetails: '=',
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
          return talentHelper.isTalentInactive(scope.talentId, scope.talentDetails, scope.talentPoints, scope.talentPointsDetails);
        }

        // returns path of talent image.
        function talentImgPath() {
          return talentHelper.getTalentImgPath(scope.talentId, scope.classId, scope.specs[scope.classId][scope.tree]);
        }

        // creates the html content for talents tooltip
        function getTalentTooltip() {
          scope.tooltip = talentHelper.getTalentTooltip(scope.talentId, scope.talent, scope.talentPoints, talentImgPath(), scope.talentTooltipDescriptions, isInactive(scope.talentId));
        }

        // add 1 talent point to talent
        function addPoint() {
          var pointAdded = talentHelper.addPoint(1, scope.talentId, scope.talentPoints, scope.talentPointsDetails, scope.talentDetails);
          update(pointAdded);
        }

        // remove 1 talent point from talent
        function removePoint() {
          var pointRemoved = talentHelper.removePoint(scope.talentId, scope.talentPoints, scope.talentPointsDetails, scope.talentDetails);
          update(pointRemoved)
        }

        // Update tooltip and change Url if changes are made
        function update(changesMade) {
          if (changesMade) {
            getTalentTooltip();
            $location.search('talents', talentHelper.generateUrl(scope.talentPoints));
          }
        }
      }
    }
}]);
