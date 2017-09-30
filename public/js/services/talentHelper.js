// Calculator helper service
wmApp.service('talentHelper', ['$http', function($http) {

  var talentPointsDetails = {
    0: { // left tree
      total: 0,
      lastActiveRow: 0,
      row: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}
    },
    1: { // center tree
      total: 0,
      lastActiveRow: 0,
      row: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}
    },
    2: { // right tree
      total: 0,
      lastActiveRow: 0,
      row: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}
    },
    remaining: 71
  };

  /* Adds amount talent points into talents
   *
   * amount: # of points to add.
   * talent: id of the talent.
   * talents: list of all talentIds and corresponding # of points in each.
   * details: talentPointDetails
   * classTalents: list of class talents and their details.
   */
  function addPoint(amount, talent, talents, details, classTalents) {
    var row = classTalents[talent].row,
        tree = classTalents[talent].tree,
        pointsUsedInTree = details[tree].total,
        lastActiveRow = details[tree].lastActiveRow;


    // only add points to rows that are enabled
    if (pointsUsedInTree < 5 * row)
      return false;
    // check if we have points remaining
    else if (details.remaining <= 0)
      return false;
    // check if talent is not already maxed
    else if ((talents[talent] + amount) > classTalents[talent].max_rank)
      return false;
    // make sure prequisite talents for current talent are fulfilled
    else if (classTalents[talent].requires) {
      if (talents[classTalents[talent].requires] != classTalents[classTalents[talent].requires].max_rank)
        return false;
    }

    talents[talent] += amount;
    details[tree].row[row] += amount;
    details[tree].total += amount;
    details.remaining -= amount;
    if (lastActiveRow < row) details[tree].lastActiveRow = row;

    return true;
  }

  function clearTalents(talents, details) {
    details = {
      0: { // left tree
        total: 0,
        lastActiveRow: 0,
        row: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}
      },
      1: { // center tree
        total: 0,
        lastActiveRow: 0,
        row: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}
      },
      2: { // right tree
        total: 0,
        lastActiveRow: 0,
        row: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0}
      },
      remaining: 71
    };
    for (var key in talents) {
      talents[key] = 0;
    }
  }

  return {
    talentPointsDetails: talentPointsDetails,

    addPoint: addPoint,
    clearTalents: clearTalents,
  };

}]);
