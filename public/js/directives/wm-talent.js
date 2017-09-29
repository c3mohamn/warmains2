// talent directive
wmApp.directive('wmTalent', ['charHelper', function(charHelper) {
  return {
    restrict: 'E',
    scope: {
      classId: '@',
      col: '@',
      row: '@',
      tree: '@'
    },
    templateUrl: '/partials/wm-talent.html',
    link: function(scope, elem, attrs) {
      var class_talents = all_talents[scope.classId];
      scope.specs = charHelper.specs;
      scope.talentBg = talentBg;

      // search for matching talent
      for (var key in class_talents) {
        if (class_talents[key].row == scope.row &&
            class_talents[key].col == scope.col &&
            class_talents[key].tree == scope.tree) {
          scope.talent = class_talents[key];
          scope.talentId = key;
        }
      }

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


    }
  }
}]);
