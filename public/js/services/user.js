wmApp.service('userAPI', ['$http', function($http) {

  function registerUser(username, password) {
    return $http.post('/auth/register', { username: username, password: password });
  }

  function loginUser(username, password) {
    return $http.post('/auth/login', { username: username, password: password});
  }

  return {
    registerUser: registerUser,
    loginUser: loginUser
  };
}]);
