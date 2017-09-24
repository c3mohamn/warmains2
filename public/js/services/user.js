// User Authentication Services
wmApp.service('authAPI', ['$http', '$localStorage', '$window', function($http, $localStorage, $window) {

  function registerUser(username, password) {
    return $http.post('/auth/register', { username: username, password: password });
  }

  function loginUser(username, password) {
    return $http.post('/auth/login', { username: username, password: password});
  }

  // log user out and refresh page..
  function logout() {
    delete $localStorage.currentUser;
    $window.location.reload();
  }

  // decrypts the token in localStorage and returns result to be used for currentUser
  function decryptToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var currentUser = JSON.parse($window.atob(base64));
    //console.log('(authAPI) - currentUser: ', currentUser);

    return currentUser;
  }

  // checks if token is valid then refreshes it.
  function refreshToken(token) {
    return $http.post('/auth/refreshToken', { token: token });
  }

  return {
    // user
    registerUser: registerUser,
    loginUser: loginUser,
    logout: logout,

    // token
    decryptToken: decryptToken,
    refreshToken: refreshToken
  };
}]);
