(function(window, document, undefined) {
'use strict';

// Source: wm-object-filter.js
// Reference: https://stackoverflow.com/questions/19849806/angular-filter-a-object-by-its-properties
wmApp.filter('objectFilter', function () {
return function (input, filterKey, filterVal) {
  var filteredInput = {};
  var filterVal = filterVal.toLowerCase();

  angular.forEach(input, function(value, key){
   if(value[filterKey] && value[filterKey].toLowerCase().indexOf(filterVal) > -1){
      filteredInput[key] = value;
    }
  });
  return filteredInput;
}});

})(window, document);
