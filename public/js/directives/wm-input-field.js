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
