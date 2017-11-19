'use strict';
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
