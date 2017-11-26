// Returns a list with duplicate values removed.
function getUnique(arr) {
  return arr.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
}

// Return the specialization of a talent
function getTalentSpec(classId, talentDetails) {
  var preview = getTalentPreviewList(talentDetails);
  var max = Math.max.apply(Math, preview);

  // Have spent more than 36 talent points in  1 tree
  if (max > 36) {
    return specsToString[classId][indexOfMax(preview)];
  }

  // No specialization
  return null;
}

// Return preview of talents using talent Details
function getTalentPreviewList(talentDetails) {
  var preview = [
    talentDetails[0].total,
    talentDetails[1].total,
    talentDetails[2].total
  ];

  return preview;
}

// https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
function indexOfMax(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}