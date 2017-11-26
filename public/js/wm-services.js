(function(window, document, undefined) {
'use strict';

// Source: talentHelper.js
// Calculator helper service
wmApp.service('talentHelper', ['$location', '$http', function($location, $http) {

  // List of cached saved talents for logged in user
  var savedTalents = undefined;

  // Initialize saveTalents on first run.
  function initSavedTalents(talents) {
    savedTalents = talents;
  }

  // Get all saved talents
  function getAllSavedTalents() {
    return savedTalents;
  }

  // Add a talent to saved talents
  function addSavedTalent(talent) {
    savedTalents.push(talent);
  }

  // Remove a talent from saved talents
  function removeSavedTalent(id) {
    for (var key in savedTalents) {
      if (savedTalents[key].id === id) {
        savedTalents.splice(key, 1);
      }
    }
  }

  // Get all talents for username from db
  function getTalents(username) {
    return $http.get('/talent/get', { params: {username: username}});
  }

  // Save talent to db
  function saveTalent(talent, username) {
    return $http.post('/talent/save', {
      username: username,
      name: talent.name,
      classId: talent.classId,
      talents: talent.talents,
      glyphs: talent.glyphs,
      preview: talent.preview,
      spec: talent.spec,
      description: talent.description
    });
  }

  // Removes a talent from db
  function deleteTalent(id) {
    return $http.post('/talent/delete', {id: id});
  }

  // initialize talent tree
  function initTalents(talentDetails, urlTalents, talentsSpent, talentsSpentDetails) {

    urlTalents = decodeTalents(reverseMinifyUrl(urlTalents));

    for (var t in talentDetails) {
      var amount = parseInt(urlTalents[t]) || 0,
          talentId = t;

      talentsSpent[t] = 0;

      addPoint(amount, talentId, talentsSpent, talentsSpentDetails, talentDetails);
    }

    changeUrlTalents(talentsSpent);
  }

  // initialize glyphs
  function initGlyphs(urlGlyphs, curGlyphs, talentGlyphs) {
    var urlGlyphsList = getUnique(urlGlyphs.split(':')),
        majorCounter = 0,
        minorCounter = 3;

    for (var key in urlGlyphsList) {
      var uid = urlGlyphsList[key];
      // Find glyph
      var glyph = findGlyph(uid, talentGlyphs);

      // set current glyph list, position based on type
      if (glyph.type == 1) {
        curGlyphs[majorCounter] = glyph;
        majorCounter++;
      } else {
        curGlyphs[minorCounter] = glyph;
        minorCounter++;
      }
    }

    changeUrlGlyphs(curGlyphs);
  }

  // changes the url based on talent points spent
  function changeUrlTalents(talents) {
    $location.search('talents', generateUrlTalents(talents));
  }

  // change the url based on glyphs equipped
  function changeUrlGlyphs(glyphs) {
    $location.search('glyphs', generateUrlGlyphs(glyphs));
  }

  // get talent points from url
  function getUrlTalents() {
    return $location.search().talents;
  }

  // get glyphs from url
  function getUrlGlyphs() {
    return $location.search().glyphs;
  }

  // Adds amount talent points into talent with talentId
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

  // Removes a talent point from talents
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

  // change talents and talentDetails back to default values
  function clearTalents(talents, details, classId, talentDetails, tree) {

    if (tree != undefined) {
      details.remaining = details.remaining + details[tree].total;
      details[tree].total = 0;
      details[tree].lastActiveRow = 0;
      details[tree].row = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0};

      for (var key in talentDetails) {
        if (talentDetails[key].tree == tree)
          talents[key] = 0;
      }
    } else {
      details.remaining = 71;
      details[0] = {}; details[1] = {}; details[2] = {};
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
    }

    changeUrlTalents(talents);

    return true;
  }

  // change glyphs back to default value
  function clearGlyphs() {
    var curGlyphs = [null, null, null, null, null, null];
    changeUrlGlyphs(curGlyphs);

    return curGlyphs;
  }

  // return the path of the talent's image
  function getTalentImgPath(talentId, classId, spec) {
    if (!talentId) {
      return '';
    }
    return '/images/talents/' + classId + '/' + spec + '/' + talentId + '.jpg';
  }

  // return the path of the glyphs image
  function getGlyphImgPath(glyph) {
    if (!glyph) {
      return '/images/empty-slots/UI-EmptyBack.png';
    }
    var iconName = glyph.icon.toLowerCase();

    return 'http://wow.zamimg.com/images/wow/icons/medium/' + iconName + '.jpg';;
  }

  // Return the html for tooltip of talent
  function getTalentTooltip(talentId, talent, talentsSpent, talentImgPath, talentTooltipDescriptions, isInactive) {
    var currentRank = talentsSpent[talentId];
    var maxRank = talent.maxRank;

    var talentName = "<h5>" + talent.name + "</h5>";
    var tooltipRank = "<h5 class='tooltip-ranks'>" + currentRank + " / " + maxRank + "</h5>";
    var currentRankDescription = '';
    var nextRankDescription = '';
    var nextRank = '';
    var clickTo = ''; // learn | remove
    var talentImg = "<img class='tooltip-talent-image' src='" + talentImgPath + "'/>";

    if (currentRank == 0) {
      clickTo = "<span class='tooltip-click-to-learn'>Click or scroll up to learn.</span>";
      currentRankDescription = talentTooltipDescriptions[talentsSpent[talentId]];
    } else if (currentRank < maxRank) {
      currentRankDescription = talentTooltipDescriptions[talentsSpent[talentId] - 1];
      nextRankDescription = talentTooltipDescriptions[talentsSpent[talentId]];
      if (!isInactive) {
        var nextRank = "<div class='tooltip-next-rank'>Next rank:</div>";
      }
    } else {
      clickTo = "<span class='tooltip-click-to-remove'>Right click or scroll down to remove.</span>";
      currentRankDescription = talentTooltipDescriptions[talentsSpent[talentId] - 1];
    }
    return talentImg + "<div class='tooltip-talent'>" + talentName + tooltipRank +
           "<div class='tooltip-description'>" + currentRankDescription + "</div>"
           + nextRank +
           "<div class='tooltip-description'>" + nextRankDescription + "</div>"
           + clickTo + "</div>";
  }

  // return the html for tooltip of glyph
  function getGlyphTooltip(glyph, type, glyphImgPath) {
    if (!glyph) {
      glyph = {};
      glyph.name = "<span style=color:gray;>Empty</span>";
      glyph.description = "<span style=color:#0288FF;font-size:14px;>Left click to add a glyph.</span>";
    }

    var glyphName = "<h5>" + glyph.name + "</h5>";
    var description = "<div class='tooltip-description'>" + glyph.description + "</div>";
    var glyphImg = "<img class='tooltip-talent-image' src='" + glyphImgPath + "'/>";
    var glyphType = '';
    var clickTo = "<div class='tooltip-click-to-remove'>Right click to remove.</div>";

    if (type == 1) glyphType = "<div style=color:#02FF66;>" + "Major Glyph" + "</div>";
    else glyphType = "<div style=color:#02FFA7;>" + "Minor Glyph" + "</div>";
    if (!glyph.id) clickTo = '';

    return glyphImg + "<div class='tooltip-talent'>" + glyphName +
           glyphType + description + clickTo
           + "</div>";
  }

  // returns whether talent is inactive or not
  function isTalentInactive(talentId, talentDetails, talentsSpent, talentsSpentDetails) {
    var talent = talentDetails[talentId];

    // inactive if pre-requisite talent not maxed
    var preReqFulfilled = true;
    if (talent.requires) {
      var maxRank = talentDetails[talent.requires].maxRank;
      var curRank = talentsSpent[talent.requires];
      preReqFulfilled = maxRank == curRank;
    }
    // inactive if row not reached or no remaining talents
    return talent.row * 5 > talentsSpentDetails[talent.tree].total ||
           talentsSpent[talentId] === 0 && talentsSpentDetails.remaining === 0 ||
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
  function generateUrlTalents(talents) {
    var url = [];

    for (var t in talents) {
      url.push(talents[t]);
    }

    return encodeTalents(url.join(''));
  }

  // generate a url for the current glyphs
  function generateUrlGlyphs(glyphs) {
    var url = [];

    for (var g in glyphs) {
      if (glyphs[g]) {
        url.push(glyphs[g].uid);
      }
    }

    return url.join(':');
  }

  // return the glyph with uid
  function findGlyph(uid, talentGlyphs) {
    for (var type in talentGlyphs) {
      for (var g in talentGlyphs[type]) {
        if (g == uid) {
          return talentGlyphs[type][g];
        }
      }
    }
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
    // Getters / Setters
    initSavedTalents: initSavedTalents,
    getAllSavedTalents: getAllSavedTalents,
    addSavedTalent: addSavedTalent,
    removeSavedTalent: removeSavedTalent,

    // Talent functions
    initTalents: initTalents,
    getUrlTalents: getUrlTalents,
    changeUrlTalents: changeUrlTalents,
    addPoint: addPoint,
    removePoint: removePoint,
    clearTalents: clearTalents,
    getTalentImgPath: getTalentImgPath,
    getTalentTooltip: getTalentTooltip,
    isTalentInactive: isTalentInactive,

    // Glyph functions
    initGlyphs: initGlyphs,
    getUrlGlyphs: getUrlGlyphs,
    changeUrlGlyphs: changeUrlGlyphs,
    clearGlyphs: clearGlyphs,
    getGlyphImgPath: getGlyphImgPath,
    getGlyphTooltip: getGlyphTooltip,

    // http requests
    getTalents: getTalents,
    saveTalent: saveTalent,
    deleteTalent: deleteTalent,
  };
}]);

// Source: user.js
// User Authentication Services
wmApp.service('authAPI', ['$http', '$localStorage', '$window', function($http, $localStorage, $window) {

  function registerUser(username, password) {
    return $http.post('/auth/register', { username: username, password: password });
  }

  function loginUser(username, password) {
    return $http.post('/auth/login', { username: username, password: password});
  }

  // log user out and refresh page..
  function logout() {
    delete $localStorage.currentUser;
    $window.location.reload();
  }

  // decrypts the token in localStorage and returns result to be used for currentUser
  function decryptToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var currentUser = JSON.parse($window.atob(base64));

    return currentUser;
  }

  // checks if token is valid then refreshes it.
  function refreshToken(token) {
    return $http.post('/auth/refreshToken', { token: token });
  }

  return {
    // user
    registerUser: registerUser,
    loginUser: loginUser,
    logout: logout,

    // token
    decryptToken: decryptToken,
    refreshToken: refreshToken
  };
}]);

})(window, document);
