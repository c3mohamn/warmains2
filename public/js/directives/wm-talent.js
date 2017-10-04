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
          var talent = scope.talentDetails[talentId];

          // inactive if pre-requisite talent not maxed
          var preReqFulfilled = true;
          if (talent.requires) {
            var maxRank = scope.talentDetails[talent.requires].max_rank;
            var curRank = scope.talentPoints[talent.requires];
            preReqFulfilled = maxRank == curRank;
          }
          // inactive if row not reached or no remaining talents
          return talent.row * 5 > scope.talentPointsDetails[talent.tree].total ||
                 scope.talentPoints[scope.talentId] === 0 && scope.talentPointsDetails.remaining === 0 ||
                 !preReqFulfilled;
        }

        // returns path of talent image.
        function talentImgPath() {
          return talentHelper.getTalentImgPath(scope.talentId, scope.classId, scope.specs[scope.classId][scope.tree]);
        }

        // creates the talents tooltips
        function getTalentTooltip() {
          var currentRank = scope.talentPoints[scope.talentId];
          var maxRank = scope.talent.max_rank;

          var talentName = "<h5>" + scope.talent.name + "</h5>";
          var tooltipRank = "<h5 class='tooltip-ranks'>Rank " + currentRank + "</h5>";
          var currentRankDescription = '';
          var nextRankDescription = '';
          var nextRank = '';
          var clickTo = ''; // learn | remove
          var talentImg = "<img class='tooltip-image' src='" + talentImgPath()+  "'/>";

          if (currentRank == 0) {
            clickTo = "<span class='tooltip-click-to-learn'>Click to learn.</span>";
            currentRankDescription = scope.talentTooltipDescriptions[scope.talentPoints[scope.talentId]];
          } else if (currentRank < maxRank) {
            currentRankDescription = scope.talentTooltipDescriptions[scope.talentPoints[scope.talentId] - 1];
            nextRankDescription = scope.talentTooltipDescriptions[scope.talentPoints[scope.talentId]];
            if (!isInactive(scope.talentId)) {
              var nextRank = "<div class='tooltip-next-rank'>Next rank:</div>";
            }
          } else {
            clickTo = "<span class='tooltip-click-to-remove'>Right click to remove.</span>";
            currentRankDescription = scope.talentTooltipDescriptions[scope.talentPoints[scope.talentId] - 1];
          }
          scope.tooltip = talentImg + talentName + tooltipRank +
                          "<div class='tooltip-description'>" + currentRankDescription + "</div>"
                          + nextRank +
                          "<div class='tooltip-description'>" + nextRankDescription + "</div>"
                          + clickTo;
        }

        // add 1 talent point to talent
        function addPoint() {
          var pointAdded = talentHelper.addPoint(1, scope.talentId, scope.talentPoints, scope.talentPointsDetails, scope.talentDetails);
          console.log(scope.talentId, scope.talentPoints, scope.talentPointsDetails);

          if (pointAdded) {
            getTalentTooltip();
            $location.search('talents', talentHelper.generateUrl(scope.talentPoints));
          }
        }

        // remove 1 talent point from talent
        function removePoint() {
          var pointRemoved = talentHelper.removePoint(scope.talentId, scope.talentPoints, scope.talentPointsDetails, scope.talentDetails);
          console.log(scope.talentId, scope.talentPoints, scope.talentPointsDetails);

          if (pointRemoved) {
            getTalentTooltip()
            $location.search('talents', talentHelper.generateUrl(scope.talentPoints));
          }
        }
      }
    }
}]);
