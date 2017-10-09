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
    $scope.talentsSpentDetails = talentHelper.talentsSpentDetails; // additional info about current talents
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

    /* Return filled out talentsSpent based on urlTalents iff urlTalents is
     * valid.
     */
    function init() {
      // clear and initialize talent point variables
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
      $state.go('talent-calculator', { class: id });
    }

    // Change state to blank state because talents are invalid.
    function invalidTalents() {
      $state.transitionTo('talent-calculator', { class: $scope.classId });
    }

    function showGlyphSelectionModal(index, type) {
      $rootScope.showGlyphSelection = true;
      $scope.glyphSelectionType = type;
      $scope.glyphSelectionIndex = index;
    }
}]);
