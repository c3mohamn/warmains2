// Talent-calc controller
wmApp.controller('talentCalcCtrl', ['$rootScope', '$scope', 'talentHelper', '$stateParams', '$state', 'talentDetails', 'talentTooltips', 'talentGlyphs', 'ModalService', 'Notifications', 'MetaData',
  function($rootScope, $scope, talentHelper, $stateParams, $state, talentDetails, talentTooltips, talentGlyphs, ModalService, Notifications, MetaData) {
    // scope vars
    $scope.classes = classesToString;
    $scope.specs = specsToString;
    $scope.urlTalents = talentHelper.getUrlTalents();
    $scope.urlGlyphs = talentHelper.getUrlGlyphs();
    $scope.classId = $stateParams.class;
    $scope.talentDetails = talentDetails;        // class talents info
    $scope.talentTooltips = talentTooltips;     // class talent tooltips info
    $scope.talentGlyphs = talentGlyphs;        // class glyphs info
    $scope.talentsSpentDetails = {};          // additional info about current talents
    $scope.talentsSpent = {};                // stores points used in each talent
    $scope.curGlyphs = {};                  // stores glyphs currently used
    $scope.savedTalents = [];              // list of saved talents by user
    
    // Set MetaData
    MetaData.setTitle('Talent Calculator | Warmains');

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
      inputs: { talentInfo: {} }
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

      saveModalOptions.inputs.talentInfo.talentDetails = $scope.talentDetails;
      saveModalOptions.inputs.talentInfo.talentsSpent = $scope.talentsSpent;
      saveModalOptions.inputs.talentInfo.talentsSpentDetails = $scope.talentsSpentDetails;
      saveModalOptions.inputs.talentInfo.curGlyphs = $scope.curGlyphs;
      saveModalOptions.inputs.talentInfo.classId = $scope.classId;

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

      MetaData.setTitle(getPageTitleFromTalentDetails($scope.talentsSpentDetails, $scope.classId));
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
}]);
