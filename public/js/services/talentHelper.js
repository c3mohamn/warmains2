// Calculator helper service
wmApp.service('talentHelper', ['$location', function($location) {

  var talentPointsDetails = {
    // left tree
    0: { total: 0, lastActiveRow: 0, row: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0} },
    // center tree
    1: { total: 0, lastActiveRow: 0, row: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0} },
    // right tree
    2: { total: 0, lastActiveRow: 0, row: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0} },
    remaining: 71
  };

  // initialize talent tree
  function initTalents(talentDetails, urlTalents, talentPoints, talentPointsDetails) {

    urlTalents = decodeTalents(reverseMinifyUrl(urlTalents));

    for (var t in talentDetails) {
      var amount = parseInt(urlTalents[t]) || 0,
          talentId = t;

      talentPoints[t] = 0;

      addPoint(amount, talentId, talentPoints, talentPointsDetails, talentDetails);
    }

    changeUrl(talentPoints);
  }

  // changes the url based on talent points spent
  function changeUrl(talents) {
    $location.search('talents', generateUrl(talents));
  }

  function getUrlTalents() {
    return $location.search().talents;
  }

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

    changeUrl(talents);

    return true;
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

            /* ------- Helper variables ------- */


  // Url Mapping
  var urlMap = {
    toChar: {
            "00": "I","01": "V","02": "W","03": "X","04": "Y","05": "Z",
            "10": "a","11": "f","12": "k","13": "p","14": "u","15": "z",
            "20": "b","21": "g","22": "l","23": "q","24": "v","25": "A",
            "30": "c","31": "h","32": "m","33": "r","34": "w","35": "B",
            "40": "d","41": "i","42": "n","43": "s","44": "x","45": "C",
            "50": "e","51": "j","52": "o","53": "t","54": "y","55": "D"},
    toInt : {
            "I": "00","V": "01","W": "02","X": "03","Y": "04","Z": "05",
            "z": "15", "A": "25","B": "35","C": "45","D": "55",
            "a": "10","b": "20","c": "30","d": "40","e": "50",
            "f": "11","g": "21","h": "31","i": "41","j": "51",
            "k": "12","l": "22","m": "32","n": "42","o": "52",
            "p": "13","q": "23","r": "33","s": "43","t": "53",
            "u": "14","v": "24","w": "34","x": "44","y": "54",}};


            /* ------- Helper functions ------- */


  // generate a url for the current talents
  function generateUrl(talents) {
    var url = [];

    for (var t in talents) {
      url.push(talents[t]);
    }

    return encodeTalents(url.join(''));
  }

  // takes list of talent point values and converts them in to char url
  function encodeTalents(t) {
    var result = '';

    for (var i = 0; i < t.length; i = i + 2) {
      var t_first = t[i];
      var t_sec = t[i + 1] || '0';

      var t_comb = t_first + t_sec;

      result = result + urlMap.toChar[t_comb];
    }

    var trimmedResult = removeTrailingZeros(result);

    return minifyUrl(trimmedResult);
  }

  // takes an encoded url and converts it to usable talents
  function decodeTalents(t) {
    if (!t) return '';
    var result = '';

    for (var i = 0; i < t.length; i++) {
      result = result + urlMap.toInt[t[i]];
    }

    return result;
  }

  // further minify url by grouping I's
  function minifyUrl(e) {
    var result = '';
    var counter = 0;

    for (var i = 0; i < e.length; i++) {
      if (e[i] !== 'I') {
        result = result + e[i];
        counter = 0;
      } else {
        counter++;
        if (counter === 1) {
          result = result + e[i];
        } else if (counter === 2) {
          result = result + counter;
        } else if (counter < 11){
          result = result.substring(0, result.length - 1) + counter;
        } else {
          result = result.substring(0, result.length - 2) + counter;
        }
      }
    }

    return result;
  }

  // reverse the minifyEncoded result
  function reverseMinifyUrl(e) {
    var result = '';

    for (var i = 0; i < e.length; i++) {
      if (e[i] !== 'I') {
        result = result + e[i];
      } else {
        if (isNaN(e[i + 1])) { // only 1 I
          result = result + e[i];
        } else {
          var count_I = e[i + 1];
          if (!isNaN(e[i + 2])) {
            count_I = count_I + e[i + 2];
            i++;
          }
          i++;

          result = result + Array(parseInt(count_I) + 1).join('I') ;
        }
      }
    }

    return result;
  }

  // removes the trailing I's at the end of url, that are not needed.
  function removeTrailingZeros(s) {
    if (!s) return '';
    var len = s.length;
    var i = len - 1;

    while ( i >= 0 && s[i] === 'I') {
      i--;
    }

    return s.substring(0 , i + 1);
  }

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
    initTalents: initTalents,

    getUrlTalents: getUrlTalents,
    changeUrl: changeUrl,

    addPoint: addPoint,
    removePoint: removePoint,
    clearTalents: clearTalents,
    getTalentImgPath: getTalentImgPath,
    getTalentTooltip: getTalentTooltip,
    isTalentInactive: isTalentInactive,
  };

}]);
