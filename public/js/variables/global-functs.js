// Returns a list with duplicate values removed.
function getUnique(arr) {
  return arr.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
}
