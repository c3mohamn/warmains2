// Calculator helper service
wmApp.service('talentHelper', function() {

  var talentPointsDetails = {
    // left tree
    0: { total: 0, lastActiveRow: 0, row: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0} },
    // center tree
    1: { total: 0, lastActiveRow: 0, row: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0} },
    // right tree
    2: { total: 0, lastActiveRow: 0, row: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0} },
    remaining: 71
  };

  /* Adds amount talent points into talents
   *
   * amount: # of points to add.
   * talentId: id of the talent.
   * talents: list of all talentIds and corresponding # of points in each.
   * details: talentPointDetails
   * talentDetails: list of class talents and their details.
   */
  function addPoint(amount, talentId, talents, details, talentDetails) {
    var row = talentDetails[talentId].row,
        tree = talentDetails[talentId].tree,
        pointsUsedInTree = details[tree].total,
        lastActiveRow = details[tree].lastActiveRow;

    // not adding any points on init
    if (amount == 0) return false;
    // only add points to rows that are enabled
    if (pointsUsedInTree < 5 * row) return false;
    // check if we have points remaining
    else if (details.remaining <= 0) return false;
    // check if talent is not already maxed
    else if ((talents[talentId] + amount) > talentDetails[talentId].maxRank) return false;
    // make sure prequisite talents for current talent are fulfilled
    else if (talentDetails[talentId].requires) {
      if (talents[talentDetails[talentId].requires] != talentDetails[talentDetails[talentId].requires].maxRank)
        return false;
    }

    talents[talentId] += amount;
    details[tree].row[row] += amount;
    details[tree].total += amount;
    details.remaining -= amount;
    if (lastActiveRow < row) details[tree].lastActiveRow = row;

    return true;
  }

  /* Removes a talent point from talents
   */
  function removePoint(talentId, talents, details, talentDetails) {
    var row = talentDetails[talentId].row,
        tree = talentDetails[talentId].tree,
        lastActiveRow = details[tree].lastActiveRow;

      // need to have points in there to remove it
      if (talents[talentId] <= 0)
        return false;

      // check it talent is prequisite for any talents down the road we chose
      if (talentDetails[talentId].allows) {
        for (var i=0; i < talentDetails[talentId].allows.length; i+=1) {
          if (talents[talentDetails[talentId].allows[i]] > 0)
            return false;
        }
      }

      // check if talents further down the tree depend on this talent
      if (row != lastActiveRow) {
        var i = 0;
        while (lastActiveRow - i > row) {
          if (sumRows(lastActiveRow - i, details[tree].row) <= (lastActiveRow - i) * 5)
            return false;
          i += 1;
        }
      }

      // update associated variables
      talents[talentId] -= 1;
      details[tree].row[row] -= 1;
      details[tree].total -= 1;
      details.remaining += 1;
      if (row == lastActiveRow && details[tree].row[row] == 0)
        details[tree].lastActiveRow -= 1;

      return true;
  }

  function clearTalents(talents, details, classId, talentDetails) {
    details.remaining = 71;
    details[0].total = 0;
    details[1].total = 0;
    details[2].total = 0;
    details[0].lastActiveRow = 0;
    details[1].lastActiveRow = 0;
    details[2].lastActiveRow = 0;
    details[0].row = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0};
    details[1].row = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0};
    details[2].row = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0};

    for (var key in talentDetails) {
      talents[key] = 0;
    }

    return true;
  }

  // generate a url for the current talents
  function generateUrl(talents) {
    var url = [];

    for (var t in talents) {
      url.push(talents[t]);
    }

    return url.join('');
  }

  // return the path of the talent's image
  function getTalentImgPath(talentId, classId, spec) {
    if (!talentId) {
      return '';
    }
    return '/images/talents/' + classId + '/' + spec + '/' + talentId + '.jpg';
  }

  // Return the html for talent tooltips
  function getTalentTooltip(talentId, talent, talentPoints, talentImgPath, talentTooltipDescriptions, isInactive) {
    var currentRank = talentPoints[talentId];
    var maxRank = talent.maxRank;

    var talentName = "<h5>" + talent.name + "</h5>";
    var tooltipRank = "<h5 class='tooltip-ranks'>Rank " + currentRank + "</h5>";
    var currentRankDescription = '';
    var nextRankDescription = '';
    var nextRank = '';
    var clickTo = ''; // learn | remove
    var talentImg = "<img class='tooltip-image' src='" + talentImgPath + "'/>";

    if (currentRank == 0) {
      clickTo = "<span class='tooltip-click-to-learn'>Click to learn.</span>";
      currentRankDescription = talentTooltipDescriptions[talentPoints[talentId]];
    } else if (currentRank < maxRank) {
      currentRankDescription = talentTooltipDescriptions[talentPoints[talentId] - 1];
      nextRankDescription = talentTooltipDescriptions[talentPoints[talentId]];
      if (!isInactive) {
        var nextRank = "<div class='tooltip-next-rank'>Next rank:</div>";
      }
    } else {
      clickTo = "<span class='tooltip-click-to-remove'>Right click to remove.</span>";
      currentRankDescription = talentTooltipDescriptions[talentPoints[talentId] - 1];
    }
    return talentImg + talentName + tooltipRank +
           "<div class='tooltip-description'>" + currentRankDescription + "</div>"
           + nextRank +
           "<div class='tooltip-description'>" + nextRankDescription + "</div>"
           + clickTo;
  }

  // returns whether talent is inactive or not
  function isTalentInactive(talentId, talentDetails, talentPoints, talentPointsDetails) {
    var talent = talentDetails[talentId];

    // inactive if pre-requisite talent not maxed
    var preReqFulfilled = true;
    if (talent.requires) {
      var maxRank = talentDetails[talent.requires].maxRank;
      var curRank = talentPoints[talent.requires];
      preReqFulfilled = maxRank == curRank;
    }
    // inactive if row not reached or no remaining talents
    return talent.row * 5 > talentPointsDetails[talent.tree].total ||
           talentPoints[talentId] === 0 && talentPointsDetails.remaining === 0 ||
           !preReqFulfilled;
  }

  /* ------- Helper functions ------- */
  // return the sum of talent points spent in all the rows <= lastRow
  function sumRows(lastRow, allRows) {
    var sum = 0,
        i = lastRow - 1;

    // at row 0
    if (i == -1)
      return allRows[0];

    while (i >= 0) {
      sum += allRows[i];
      i -= 1;
    }
    return sum;
  }

  return {
    // vars
    talentPointsDetails: talentPointsDetails,

    // talent functions
    addPoint: addPoint,
    removePoint: removePoint,
    clearTalents: clearTalents,
    generateUrl: generateUrl,
    getTalentImgPath: getTalentImgPath,
    getTalentTooltip: getTalentTooltip,
    isTalentInactive: isTalentInactive,
  };

});
