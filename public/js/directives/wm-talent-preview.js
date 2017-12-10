wmApp.directive('wmTalentPreview', ['ModalService', 'talentHelper', 'Notifications', 
  function(ModalService, talentHelper, Notifications) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
          talent: '=',
          detailed: '@', // show description or not
      },
      templateUrl: '/partials/wm-talent-preview.html',
      link: function(scope, elem, attrs) {
        scope.getTalentIcon = getTalentIcon;
        scope.deleteSavedTalent = deleteSavedTalent;

        function getTalentIcon() {
            if (scope.talent.spec) {
              return '/images/spec-icons/' + scope.talent.classId + '/' + scope.talent.spec + '.jpg';
            }

            return '/images/class-icons/' + scope.talent.classId + '.png';
        }
        
        function deleteSavedTalent($event) {
          $event.stopPropagation();
          
          var confirmDeleteModal = {
              templateUrl: '/partials/modals/wm-modal-confirm-delete.html',
              bodyClass: 'modal-open',
              controller: 'modalConfirmDeleteCtrl',
          };

          ModalService.showModal(confirmDeleteModal).then(function (modal) {
            modal.close.then(function (result) {

              // Delete talent
              if (result) {
                talentHelper.deleteTalent(scope.talent.id, scope.talent.name).then(
                  function successCallback(response) {
                    console.log(response);
                    Notifications.Alert(response.statusText, 'success');
                    talentHelper.removeSavedTalent(scope.talent.id);
                  }, function errorCallback(response) {
                    console.log(response);
                    Notifications.Alert(response.statusText, 'error');
                  }
                );
              }
            });
          });
        }
      }
    }
}]);
  