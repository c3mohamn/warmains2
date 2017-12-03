wmApp.directive('wmSlideoutList', ['talentHelper',
function(talentHelper) {
  return {
    restrict: 'E',
    scope: {
      slideoutTitle: '@', // title of slideout
      itemList: '=', // list of items
      delete: '&', // delete function
      showPreview: '=', // show small preview of slideout
      goToItemUrl: '&', // navigate to item
    },
    templateUrl: '/partials/wm-slideout-list.html',
    link: function(scope, elem, attrs) {
      scope.show = false;
      scope.toggleSlideout = toggleSlideout;
      scope.navigateToItem = navigateToItem;

      function navigateToItem(item) {
        scope.goToItemUrl({item: item});
      }

      function toggleSlideout(toggle) {
        if (toggle !== undefined) {
          scope.show = toggle;
        } else {
          scope.show = !scope.show;
        }
        scope.showPreview = false;
      }
    }
  }
}]);
