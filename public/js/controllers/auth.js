'use strict';

// Authentication controller
wmApp.controller('authCtrl', ['$scope', function($scope) {
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
    validateRegisterForm();
    console.log('Attempting to register user...');

    $scope.registeringUser = false;
  }

  // Login
  function loginUser() {
    $scope.loggingUser = true;
    validateLoginForm();

    console.log('Attempting to log user in...');

    $scope.loggingUser = false;
  }

  // Check if user filled registration form out properly.
  function validateRegisterForm() {
    clearErrors();

    if ($scope.auth.username.length === 0) {
      $scope.usernameError = 'Please enter a usename.';
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
  }

  // Clear all errors
  function clearErrors() {
    $scope.usernameError = null;
    $scope.passError = null;
    $scope.confirmPassError = null;
  }
}]);
