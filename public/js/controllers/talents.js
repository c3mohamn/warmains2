// Talent-calc controller
wmApp.controller('talentCalcCtrl', ['$rootScope', '$scope', 'talentHelper', '$stateParams', '$state', 'talentDetails', 'talentTooltips', 'talentGlyphs', 'ModalService',
  function($rootScope, $scope, talentHelper, $stateParams, $state, talentDetails, talentTooltips, talentGlyphs, ModalService) {
    // vars
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
    $rootScope.showGlyphSelection = false;
    // functs
    $scope.changeClass = changeClass;
    $scope.validClassId = validClassId;
    $scope.clearTalents = clearTalents;
    $scope.clearGlyphs = clearGlyphs;
    $scope.showGlyphSelectionModal = showGlyphSelectionModal;
    $scope.getGlyphTooltip = getGlyphTooltip;
    $scope.goToSavedTalent = goToSavedTalent;
    $scope.showSavedTalents = showSavedTalents;

    // TODO: REMOVE WHEN YOU HAVE ACTUAL END POINT DATA.
    $scope.savedTalents = [
    ];

    function showSavedTalents() {
      if (!$rootScope.currentUser)
        return false;

      ModalService.showModal(saveModalOptions).then(function (modal) {
        modal.close.then(function (result) {
          // Create new talent object
          var talent = {
            name: result.name,
            classId: $scope.classId,
            talents: result.talents,
            glyphs: result.glyphs,
            preview: [
              $scope.talentsSpentDetails[0].total, 
              $scope.talentsSpentDetails[1].total, 
              $scope.talentsSpentDetails[2].total
            ],
          };

          // Save new talent
          talentHelper.saveTalent(talent, $rootScope.currentUser.username).then(
            function successCallback(response) {
              if (response) {
                console.log(response);
                $scope.savedTalents.push(response.data);
              } else {
                console.log('No response...');
              }
            }, function errorCallback(response) {
              console.log(response);
            }
          );
        });
      });
    }

    var saveModalOptions = {
        templateUrl: '/partials/wm-modal-save-talent.html',
        bodyClass: 'modal-open',
        controller: 'modalSaveTalentCtrl'
    };

    // var id = '59ed5dd8a108a7141a6ba489';
    //
    // $http.post('/talent/delete', {id: id, name: 'blah'}).then(
    //   function successCallback(response) {
    //       console.log(response);
    //     }, function errorCallback(response) {
    //       console.log(response);
    //     }
    // );

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

    // Initialize talents and glyphs
    function init() {
      // Clear talents and glyphs to default values
      clearTalents();
      clearGlyphs();

      // Load saved talents if a user is logged in
      if ($rootScope.currentUser) {
        talentHelper.getTalents($rootScope.currentUser.username).then(
          function successCallback(response) {
            if (response) {
              console.log(response);
              $scope.savedTalents = response.data.talents;
              if (response.data) {
              }
            }
          }, function errorCallback(response) {
            console.log(response);
          }
        );
      }

      if ($scope.urlTalents) {
        talentHelper.initTalents(talentDetails, $scope.urlTalents, $scope.talentsSpent, $scope.talentsSpentDetails);
      }
      if ($scope.urlGlyphs) {
        talentHelper.initGlyphs($scope.urlGlyphs, $scope.curGlyphs, $scope.talentGlyphs);
      }
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

    function showGlyphSelectionModal(index, type) {
      $rootScope.showGlyphSelection = true;
      $scope.glyphSelectionType = type;
      $scope.glyphSelectionIndex = index;
      $rootScope.isModalOpen = true;
    }
}]);
