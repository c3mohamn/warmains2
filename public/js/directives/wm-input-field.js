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
    templateUrl: '/partials/wm-input-fields.html',
    link: function(scope, elem, attrs) {
    }
  }
});
