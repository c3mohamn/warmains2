// Talent-calc controller
wmApp.controller('talentCalcCtrl', ['$rootScope', '$scope', 'talentHelper', '$stateParams', '$state', 'talentDetails', 'talentTooltips', 'talentGlyphs',
  function($rootScope, $scope, talentHelper, $stateParams, $state, talentDetails, talentTooltips, talentGlyphs) {
    // vars
    $scope.classes = classesToString;
    $scope.specs = specsToString;
    $scope.urlTalents = talentHelper.getUrlTalents();
    $scope.urlGlyphs = talentHelper.getUrlGlyphs();
    $scope.classId = $stateParams.class;
    $scope.talentDetails = talentDetails;                            // class talents
    $scope.talentTooltips = talentTooltips;
    $scope.talentsSpentDetails = {};//= talentHelper.talentsSpentDetails; // additional info about current talents
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
    $scope.goToSavedChar = goToSavedChar;

    // TODO: REMOVE WHEN YOU HAVE ACTUAL END POINT DATA.
    $scope.savedChars = [
        {name: 'Hunter MM', classId: 3, talents: 'I27W', glyphs: '2', preview: [0, 0, 2]},
        {name: 'Some war spec', classId: 1, talents: 'rbI14qI13c', glyphs: '7:2', preview: [8, 5, 3]},
        {name: 'Holy pala Dsac', classId: 2, talents: 'a', glyphs: '1:2:3', preview: [1, 0, 0]},
        {name: 'Idk', classId: 3, talents: 'a', glyphs: '1:2:3', preview: [1, 0, 0]},
        {name: 'fok', classId: 4, talents: 'a', glyphs: '1:2:3', preview: [1, 0, 0]},
        {name: 'dang man', classId: 5, talents: 'a', glyphs: '1:2:3', preview: [1, 0, 0]},
        {name: 'something something really long name here', classId: 6, talents: 'a', glyphs: '1:2:3', preview: [1, 0, 0]},
        {name: 'beep', classId: 7, talents: 'a', glyphs: '1:2:3', preview: [1, 0, 0]},
        {name: 'Boop', classId: 8, talents: 'a', glyphs: '1:2:3', preview: [1, 0, 0]},
    ];

    // Load saved characters talents & glyphs
    function goToSavedChar(char) {
      $state.go('talent-calculator', { class: char.classId, talents: char.talents, glyphs: char.glyphs}, {reload: true});
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
