wmApp.directive('wmTalentPreview', function() {
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

          function getTalentIcon() {
              if (scope.talent.spec) {
                return '/images/spec-icons/' + scope.talent.classId + '/' + scope.talent.spec + '.jpg';
              }

              return '/images/class-icons/' + scope.talent.classId + '.png';
          }
      }
    }
});
  