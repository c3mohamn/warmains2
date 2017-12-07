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
  