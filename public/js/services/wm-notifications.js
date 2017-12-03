wmApp.service('Notifications', ['ModalService', '$timeout', function(ModalService, $timeout) {
  // Keeps track of active notifications on the screen
  var count = 0;

  var notificationsModalOptions = {
    templateUrl: '/partials/modals/wm-modal-notifications.html',
    bodyClass: 'modal-open',
    controller: 'modalNotificationsCtrl',
    inputs: { params: {} }
  };

  function Alert(msg, type) {
    count = count + 1;
    notificationsModalOptions.inputs.params.msg = msg;
    notificationsModalOptions.inputs.params.type = type;
    notificationsModalOptions.inputs.params.index = count;

    ModalService.showModal(notificationsModalOptions).then(function (modal) {
      modal.close.then(function (result) {
        count = count - 1;
      });
    });
  }

  return {
    Alert: Alert
  }
}]);