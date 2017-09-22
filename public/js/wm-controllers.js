!function(r,e,s){"use strict";wmApp.controller("authCtrl",["$rootScope","$scope","$http","$state",function(r,e,s,t){function n(){return a(),0===e.auth.username.length?(e.usernameError="Please enter a usename.",!1):e.auth.username.length<3?(e.usernameError="Username must be greater than 3 characters long.",!1):0===e.auth.pass.length?(e.passError="Please enter a password.",!1):e.auth.pass.length<5?(e.passError="Password must be greater than 6 characters long.",!1):e.auth.confirmPass===e.auth.pass||(e.confirmPassError="Passwords must match.",!1)}function o(){return a(),0===e.auth.username.length?(e.usernameError="Please enter your username.",!1):0===e.auth.pass.length?(e.passError="Please enter your password.",!1):void 0}function a(){e.usernameError=null,e.passError=null,e.confirmPassError=null,e.serverError=null,e.serverSuccess=null}e.registerUser=function(){if(e.registeringUser=!0,!n())return e.registeringUser=!1,!1;console.log("Attempting to register user..."),s.post("/auth/register",{username:e.auth.username,password:e.auth.pass}).then(function(r){console.log(r),e.serverSuccess=r.statusText,e.registeringUser=!1},function(r){console.log(r),e.serverError=r.statusText,e.registeringUser=!1})},e.loginUser=function(){e.loggingUser=!0,o(),console.log("Attempting to log user in..."),s.post("/auth/login",{username:e.auth.username,password:e.auth.pass}).then(function(e){console.log(e),r.currentUser=e.data},function(r){console.log(r)}),e.loggingUser=!1,t.go("home")},e.auth={username:"",pass:"",confirmPass:""}}]),wmApp.controller("homeCtrl",["$scope",function(r){}]),wmApp.controller("indexCtrl",["$scope","$rootScope","$state",function(r,e,s){}]),wmApp.controller("stylesCtrl",["$scope",function(r){}])}(window,document);