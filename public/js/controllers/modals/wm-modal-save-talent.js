// Save Talent Modal controller
wmApp.controller('modalSaveTalentCtrl', ['$scope', 'close', '$location', 'talentHelper', 'talentInfo', 
  function($scope, close, $location, talentHelper, talentInfo) {
    $scope.name = null;
    $scope.save = save;
    $scope.talentInfo = talentInfo;
    $scope.specsToString = specsToString;
    // Remove null glyph values from list
    $scope.skinnyGlyphs = talentInfo.curGlyphs.filter(function(val) { return val !== null; });

    $scope.closeModal = closeModal;
    $scope.talentImgPath = talentImgPath;
    $scope.getGlyphIconPath = getGlyphIconPath;

    // returns path of talent image.
    function talentImgPath(talentId) {
      var classId = $scope.talentInfo.classId;
      var spec = specsToString[classId][$scope.talentInfo.talentDetails[talentId].tree];      

      return talentHelper.getTalentImgPath(talentId, classId, spec);
    }

    // returns path of glyph image
    function getGlyphIconPath(glyph) {
      var iconName = glyph.icon.toLowerCase();

      return 'http://wow.zamimg.com/images/wow/icons/medium/' + iconName + '.jpg';
    }

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
