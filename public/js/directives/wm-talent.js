// talent directive
wmApp.directive('wmTalent', ['charHelper', 'talentHelper', '$location',
  function(charHelper, talentHelper, $location) {
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
        var classTalents = all_talents[scope.classId];
        scope.specs = charHelper.specs;
        scope.talentBg = talentBg;
        scope.addPoint = addPoint;

        // search for matching talent
        for (var key in classTalents) {
          if (classTalents[key].row == scope.row &&
              classTalents[key].col == scope.col &&
              classTalents[key].tree == scope.tree) {
            scope.talent = classTalents[key];
            scope.talentId = key;
            scope.points = scope.talents[key];
          }
        }

        // Gets image for talent
        function talentBg() {
          if (!scope.talent) {
            return false;
          }
          return {
            'background-image': 'url(/images/talents/' + scope.classId + '/' +
                                scope.specs[scope.classId][scope.tree] + '/' +
                                scope.talentId + '.jpg)'
          };
        }

        // add 1 talent point to talent
        function addPoint() {
          console.log(scope.talentId, scope.talents, scope.details);
          var pointAdded = talentHelper.addPoint(1, scope.talentId, scope.talents, scope.details, classTalents);

          if (pointAdded) {
            scope.points += 1;
          }
        }

        // generate a url
        function generateUrl() {
          var newUrl = [];

          for (var t in scope.talents) {
            newUrl.push(scope.talents[t]);
          }

          return newUrl.join('');

          //$location.path('/planner/talent-calculator/' + scope.classId + '/' + newUrl.join(''));
        }
      }
    }
}]);
