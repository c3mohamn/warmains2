(function(window, document, undefined) {
'use strict';

// Source: wm-auth.js
// Authentication controller
wmApp.controller('authCtrl', ['$scope', '$http', '$state', 'authAPI', '$localStorage', '$timeout', 
  function($scope, $http, $state, authAPI, $localStorage, $timeout) {
    $scope.registerUser = registerUser;
    $scope.loginUser = loginUser;
    $scope.auth = {
      username: '',
      pass: '',
      confirmPass: '',
    };

    // Register
    function registerUser() {

      $scope.registeringUser = true;

      if (!validateRegisterForm()) {
        $scope.registeringUser = false;
        return false;
      }
      console.log('Attempting to register user...');

      // registers the user
      authAPI.registerUser($scope.auth.username, $scope.auth.pass).then(
        function successCallback(response) {
          console.log(response);
          $scope.serverSuccess = response.data;

          // Redirect to login page
          $timeout(function() {
            $scope.registeringUser = false;
            $state.go('login');
          }, 500);

        }, function errorCallback(response) {
          console.log(response);
          $scope.serverError = response.data;
          $scope.registeringUser = false;
        }
      );
    }

    function loginUser() {
      $scope.loggingUser = true;

      if (!validateLoginForm()) {
        $scope.loggingUser = false;
        return false;
      }

      authAPI.loginUser($scope.auth.username, $scope.auth.pass).then(
        function successCallback(response) {
          console.log(response);
          $localStorage.currentUser = response.data;
          $scope.loggingUser = false;
          $state.go('home');
        }, function errorCallback(response) {
          console.log(response);
          $scope.serverError = response.data;
          $scope.loggingUser = false;
        }
      );

      $scope.loggingUser = false;
    }

    // Check if user filled registration form out properly.
    function validateRegisterForm() {
      clearErrors();

      if ($scope.auth.username.length === 0) {
        $scope.usernameError = 'Please enter a username.';
        return false;
      }
      if ($scope.auth.username.length < 3) {
        $scope.usernameError = 'Username must be greater than 3 characters long.';
        return false;
      }
      if ($scope.auth.pass.length === 0) {
        $scope.passError = 'Please enter a password.';
        return false;
      }
      if ($scope.auth.pass.length < 5) {
        $scope.passError = 'Password must be greater than 6 characters long.';
        return false;
      }
      if ($scope.auth.confirmPass !== $scope.auth.pass) {
        $scope.confirmPassError = 'Passwords must match.';
        return false;
      }

      return true;
    }

    // Check if user filled login form out properly.
    function validateLoginForm() {
      clearErrors();

      if ($scope.auth.username.length === 0) {
        $scope.usernameError = 'Please enter your username.';
        return false;
      }
      if ($scope.auth.pass.length === 0) {
        $scope.passError = 'Please enter your password.';
        return false;
      }

      return true;
    }

    // Clear all errors
    function clearErrors() {
      $scope.usernameError = null;
      $scope.passError = null;
      $scope.confirmPassError = null;
      $scope.serverError = null;
      $scope.serverSuccess = null;
    }
}]);

// Source: wm-changelog.js
// Devlog page controller
wmApp.controller('changelogCtrl', ['$scope', 'log',
function($scope, log) {
    $scope.logs = log;
}]);

// Source: wm-home.js
// Home page controller
wmApp.controller('homeCtrl', ['$rootScope', '$localStorage', '$scope',
  function($rootScope, $localStorage, $scope) {

    console.log('homeCtrl: ', $rootScope.currentUser);
    // TODO: This will be a home page with widgets where user can see recent stuffs
    // If not online, get information from localStorage
    // 1. Character list (easy access)
    // 2. News
    // 3. Recent characters viewed?
    // 4. Saved talent list
}]);

// Source: wm-index.js
// Index page controller
wmApp.controller('indexCtrl', ['$rootScope', '$scope', '$state', 'authAPI', function($rootScope, $scope, $state, authAPI) {
  $scope.logout = logout;
  $scope.$state = $state;

  function logout() {
    authAPI.logout();
  }
}]);

// Source: wm-planner.js
// Planner page controller
wmApp.controller('plannerCtrl', ['$scope', '$state', function($scope, $state) {
}]);

// Source: wm-styles.js
// Styles controller
wmApp.controller('stylesCtrl', ['$scope', function($scope) {
}]);

// Source: wm-talent-calc.js
// Talent-calc controller
wmApp.controller('talentCalcCtrl', ['$rootScope', '$scope', 'talentHelper', '$stateParams', '$state', 'talentDetails', 'talentTooltips', 'talentGlyphs', 'ModalService', 'Notifications',
  function($rootScope, $scope, talentHelper, $stateParams, $state, talentDetails, talentTooltips, talentGlyphs, ModalService, Notifications) {
    // scope vars
    $scope.classes = classesToString;
    $scope.specs = specsToString;
    $scope.urlTalents = talentHelper.getUrlTalents();
    $scope.urlGlyphs = talentHelper.getUrlGlyphs();
    $scope.classId = $stateParams.class;
    $scope.talentDetails = talentDetails;                            // class talents
    $scope.talentTooltips = talentTooltips;
    $scope.talentsSpentDetails = {};                               // additional info about current talents
    $scope.talentsSpent = {};                                     // stores points used in each talent
    $scope.talentGlyphs = talentGlyphs;
    $scope.curGlyphs = {};
    $scope.savedTalents = [];

    // scope functs
    $scope.changeClass = changeClass;
    $scope.validClassId = validClassId;
    $scope.clearTalents = clearTalents;
    $scope.clearGlyphs = clearGlyphs;
    $scope.showGlyphSelectionModal = showGlyphSelectionModal;
    $scope.getGlyphTooltip = getGlyphTooltip;
    $scope.goToSavedTalent = goToSavedTalent;
    $scope.showSavedTalents = showSavedTalents;

    var saveModalOptions = {
      templateUrl: '/partials/modals/wm-modal-save-talent.html',
      bodyClass: 'modal-open',
      controller: 'modalSaveTalentCtrl',
    };

    var glyphsModalOptions = {
      templateUrl: '/partials/modals/wm-modal-glyphs.html',
      bodyClass: 'modal-open',
      controller: 'modalGlyphsCtrl',
      inputs: { glyphParams: {} }
    };

    function showSavedTalents() {
      if (!$rootScope.currentUser)
        return false;

      ModalService.showModal(saveModalOptions).then(function (modal) {
        modal.close.then(function (result) {

          // if user clicked save, save talent
          if (result) {
            // Create new talent object
            var talent = {
              name: result.name,
              description: result.description,
              classId: $scope.classId,
              talents: result.talents,
              glyphs: result.glyphs,
              preview: getTalentPreviewList($scope.talentsSpentDetails),
              spec: getTalentSpec($scope.classId, $scope.talentsSpentDetails)
            };

            // Save new talent
            talentHelper.saveTalent(talent, $rootScope.currentUser.username).then(
              function successCallback(response) {
                if (response) {
                  console.log(response);
                  talentHelper.addSavedTalent(response.data);
                  $scope.showSlideoutPreview = true;
                  Notifications.Alert('Talent saved successfully.', 'success');
                } else {
                  console.log('No response...');
                }
              }, function errorCallback(response) {
                console.log(response);
                Notifications.Alert(response.statusText, 'error');
              }
            );
          }

        });
      });
    }

    // Load saved talents & glyphs
    function goToSavedTalent(talent) {
      $state.go('talent-calculator', { class: talent.classId, talents: talent.talents, glyphs: talent.glyphs}, {reload: true});
    };

    // Check if the class Id from url is valid.
    function validClassId() {
      if ($scope.classId === '' || !$scope.classId) {
        return false;
      }
      if (!$scope.classes[$scope.classId]) {
        return false;
      }
      return true;
    }

    if ($scope.classId) {
      init();
    }

    // Load saved talents if a user is logged in
    if ($rootScope.currentUser) {
      getSavedTalents($rootScope.currentUser.username);
    }

    // Initialize talents and glyphs
    function init() {
      // Clear talents and glyphs to default values
      clearTalents();
      clearGlyphs();

      if ($scope.urlTalents) {
        talentHelper.initTalents(talentDetails, $scope.urlTalents, $scope.talentsSpent, $scope.talentsSpentDetails);
      }

      if ($scope.urlGlyphs) {
        talentHelper.initGlyphs($scope.urlGlyphs, $scope.curGlyphs, $scope.talentGlyphs);
      }
    }

    function getSavedTalents(username) {
      var talents = talentHelper.getAllSavedTalents();

      if (!username) {
        return false;
      }

      if (talents !== undefined) {
        $scope.savedTalents = talents;
        if ($scope.savedTalents.length > 0) {
          $scope.showSlideoutPreview = true;
        }
        return true;
      }

      // first run, get saved talents from db
      talentHelper.getTalents(username).then(
        function successCallback(response) {
          if (response && response.data) {
            console.log(response);
            talentHelper.initSavedTalents(response.data.talents);
            $scope.savedTalents = response.data.talents;
            if ($scope.savedTalents.length > 0) {
              $scope.showSlideoutPreview = true;
            }
          }
        }, function errorCallback(response) {
          console.log(response);
        }
      );
    }

    function clearTalents(tree) {
      talentHelper.clearTalents($scope.talentsSpent, $scope.talentsSpentDetails, $scope.classId, talentDetails, tree);
    }

    function clearGlyphs() {
      $scope.curGlyphs = talentHelper.clearGlyphs($scope.curGlyphs);
    }

    function getGlyphTooltip(glyph, type) {
      return talentHelper.getGlyphTooltip(glyph, type, talentHelper.getGlyphImgPath(glyph));
    }

    // Change class and state.
    function changeClass(id) {
      $state.go('talent-calculator', { class: id, talents: '', glyphs: '' });
    }

    // Change state to blank state because talents are invalid.
    function invalidTalents() {
      $state.transitionTo('talent-calculator', { class: $scope.classId, talents: '', glyphs: ''});
    }

    // Open glyph selection modal
    function showGlyphSelectionModal(index, type) {
      glyphsModalOptions.inputs.glyphParams.curGlyphs = $scope.curGlyphs;
      glyphsModalOptions.inputs.glyphParams.glyphs = talentGlyphs;
      glyphsModalOptions.inputs.glyphParams.index = index;
      glyphsModalOptions.inputs.glyphParams.type = type;

      ModalService.showModal(glyphsModalOptions).then(function (modal) {
        modal.close.then(function (result) {
          if (result) {
            // Change URL based on result
            talentHelper.changeUrlGlyphs(result.curGlyphs);
          }
        });
      });
    }
}]);

// Source: modals\wm-modal-glyphs.js
// Glyph Selection Modal Controller
wmApp.controller('modalGlyphsCtrl', ['$scope', 'close', 'glyphParams', 
  function($scope, close, glyphParams) {
    //vars
    $scope.modalSearch = '';
    $scope.closeModal = closeModal;
    $scope.curGlyphs = glyphParams.curGlyphs;
    $scope.glyphs = glyphParams.glyphs;
    $scope.type = glyphParams.type;
    $scope.index = glyphParams.index;
    // functs
    $scope.getGlyphIconPath = getGlyphIconPath;
    $scope.selectGlyph = selectGlyph;
    $scope.alreadyUsed = alreadyUsed;

    function getGlyphIconPath(glyph) {
      var iconName = glyph.icon.toLowerCase();

      return 'http://wow.zamimg.com/images/wow/icons/medium/' + iconName + '.jpg';
    }

    function selectGlyph(glyph) {
      $scope.curGlyphs[$scope.index] = glyph;
      if (!$scope.destroying) {
        $scope.destroying = true;
        close({
          curGlyphs: $scope.curGlyphs
        }, 250);
      }
    }

    // return true if glyph is already used by user
    function alreadyUsed(glyph) {
      return $scope.curGlyphs.indexOf(glyph) > -1;
    }

    // Close without saving
    function closeModal() {
      if (!$scope.destroying) {
        $scope.destroying = true;
        close(false, 250);
      }
    }
}]);

// Source: modals\wm-modal-notifications.js
// Notifications Modal controller
wmApp.controller('modalNotificationsCtrl', ['$scope', 'close', '$timeout', 'params', 
  function($scope, close, $timeout, params) {
    $scope.msg = params.msg;
    $scope.type = params.type;
    $scope.index = params.index;
    var destroyTime = $scope.type === 'error' ? 4000 : 2500;

    $scope.closeModal = closeModal;
    $scope.changePosition = changePosition;

    init();

    function init() {
      $timeout(function () {
        closeModal();
      }, destroyTime);
    }

    // Create stacking affect when more than 1 notification on screen
    function changePosition() {
      if ($scope.index > 1) {
        var bottomOffset = 2 + ($scope.index - 1) * 5;
        return { 'bottom': bottomOffset + 'rem' }; 
      }
    }

    // Close without saving
    function closeModal() {
      if (!$scope.destroying) {
        $scope.destroying = true;
        close(false, 250);
      }
    }
}]);

// Source: modals\wm-modal-save-talent.js
// Save Talent Modal controller
wmApp.controller('modalSaveTalentCtrl', ['$scope', 'close', '$location', 'talentHelper', function($scope, close, $location, talentHelper) {
  $scope.name = null;
  $scope.closeModal = closeModal;
  $scope.save = save;
  $scope.savedTalents = talentHelper.getAllSavedTalents();

  // Save current talents
  function save() {
    if (validate() === true && !$scope.destroying) {
      $scope.destroying = true;
      close({
        talents: $location.search().talents,
        glyphs: $location.search().glyphs,
        name: $scope.name,
        description: $scope.description
      }, 250);
    }
  };

  // Close without saving
  function closeModal() {
    if (!$scope.destroying) {
      $scope.destroying = true;
      close(false, 250);
    }
  }

  // Return true of save input is valid
  function validate() {
    if (!$scope.name) {
      $scope.nameError = 'Enter a name please.';
      return false;
    } else if ($scope.name.length < 2 || $scope.name.length > 20) {
      $scope.nameError = 'Name must be between 2 and 20 characters long.';
      return false;
    } else if ($location.search().talents === '') {
      $scope.nameError = 'You cannot save an empty talent tree.';
      return false;
    } else if ($scope.description && $scope.description.length > 100) {
      $scope.descriptionError = 'Description cannot exceed 100 characters.';
      return false;
    }

    return true;
  }
}]);

})(window, document);
