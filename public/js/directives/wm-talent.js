// talent directive
wmApp.directive('wmTalent', ['$rootScope', 'talentHelper',
  function($rootScope, talentHelper) {
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

        // Update tooltip and change Url if changes are made
        function update(changesMade) {
          if (changesMade) {
            getTalentTooltip();
            talentHelper.changeUrl(scope.talentsSpent);
          }
        }
      }
    }
}]);
