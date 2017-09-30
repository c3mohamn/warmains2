!function(e,s,r){"use strict";wmApp.controller("authCtrl",["$scope","$http","$state","authAPI","$localStorage",function(e,s,r,t,n){function o(){return l(),0===e.auth.username.length?(e.usernameError="Please enter a usename.",!1):e.auth.username.length<3?(e.usernameError="Username must be greater than 3 characters long.",!1):0===e.auth.pass.length?(e.passError="Please enter a password.",!1):e.auth.pass.length<5?(e.passError="Password must be greater than 6 characters long.",!1):e.auth.confirmPass===e.auth.pass||(e.confirmPassError="Passwords must match.",!1)}function a(){return l(),0===e.auth.username.length?(e.usernameError="Please enter your username.",!1):0===e.auth.pass.length?(e.passError="Please enter your password.",!1):void 0}function l(){e.usernameError=null,e.passError=null,e.confirmPassError=null,e.serverError=null,e.serverSuccess=null}e.registerUser=function(){if(e.registeringUser=!0,!o())return e.registeringUser=!1,!1;console.log("Attempting to register user..."),t.registerUser(e.auth.username,e.auth.pass).then(function(s){console.log(s),e.serverSuccess=s.data,e.registeringUser=!1},function(s){console.log(s),e.serverError=s.data,e.registeringUser=!1}),e.registeringUser=!1},e.loginUser=function(){e.loggingUser=!0,a(),t.loginUser(e.auth.username,e.auth.pass).then(function(s){console.log(s),n.currentUser=s.data,e.loggingUser=!1,r.go("home")},function(s){console.log(s),e.serverError=s.data,e.loggingUser=!1}),e.loggingUser=!1},e.auth={username:"",pass:"",confirmPass:""}}]),wmApp.controller("homeCtrl",["$rootScope","$localStorage","$scope",function(e,s,r){console.log("homeCtrl: ",e.currentUser)}]),wmApp.controller("indexCtrl",["$rootScope","$scope","$state","authAPI",function(e,s,r,t){s.logout=function(){t.logout()},s.$state=r,console.log(r)}]),wmApp.controller("plannerCtrl",["$scope","$state",function(e,s){e.test="test"}]),wmApp.controller("stylesCtrl",["$scope",function(e){}]),wmApp.controller("talentCalcCtrl",["$scope","charHelper","$stateParams","$state",function(e,s,r,t){e.classes=s.classes,e.specs=s.specs,e.talents=r.talents,e.classId=r.class;all_talents[e.classId];e.changeClass=function(s){e.classId=s,console.log("Changing Class."),t.transitionTo("talent-calculator",{class:e.classId,talents:e.talents})},e.validClassId=function(){return!(""===e.classId||!e.classId||!e.classes[e.classId])}}])}(window,document);