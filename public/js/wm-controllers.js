!function(e,t,s){"use strict";wmApp.controller("authCtrl",["$scope","$http","$state","authAPI","$localStorage",function(e,t,s,r,n){function a(){return l(),0===e.auth.username.length?(e.usernameError="Please enter a usename.",!1):e.auth.username.length<3?(e.usernameError="Username must be greater than 3 characters long.",!1):0===e.auth.pass.length?(e.passError="Please enter a password.",!1):e.auth.pass.length<5?(e.passError="Password must be greater than 6 characters long.",!1):e.auth.confirmPass===e.auth.pass||(e.confirmPassError="Passwords must match.",!1)}function o(){return l(),0===e.auth.username.length?(e.usernameError="Please enter your username.",!1):0===e.auth.pass.length?(e.passError="Please enter your password.",!1):void 0}function l(){e.usernameError=null,e.passError=null,e.confirmPassError=null,e.serverError=null,e.serverSuccess=null}e.registerUser=function(){if(e.registeringUser=!0,!a())return e.registeringUser=!1,!1;console.log("Attempting to register user..."),r.registerUser(e.auth.username,e.auth.pass).then(function(t){console.log(t),e.serverSuccess=t.data,e.registeringUser=!1},function(t){console.log(t),e.serverError=t.data,e.registeringUser=!1}),e.registeringUser=!1},e.loginUser=function(){e.loggingUser=!0,o(),r.loginUser(e.auth.username,e.auth.pass).then(function(t){console.log(t),n.currentUser=t.data,e.loggingUser=!1,s.go("home")},function(t){console.log(t),e.serverError=t.data,e.loggingUser=!1}),e.loggingUser=!1},e.auth={username:"",pass:"",confirmPass:""}}]),wmApp.controller("homeCtrl",["$rootScope","$localStorage","$scope",function(e,t,s){console.log("homeCtrl: ",e.currentUser)}]),wmApp.controller("indexCtrl",["$rootScope","$scope","$state","authAPI",function(e,t,s,r){t.logout=function(){r.logout()},t.$state=s,console.log(s)}]),wmApp.controller("plannerCtrl",["$scope","$state",function(e,t){e.test="test"}]),wmApp.controller("stylesCtrl",["$scope",function(e){}]),wmApp.controller("talentCalcCtrl",["$scope","talentHelper","$stateParams","$state","talentDetails","talentTooltips",function(e,t,s,r,n,a){function o(){t.clearTalents(e.talentPoints,e.talentPointsDetails,e.classId,n)}e.classes=classesToString,e.specs=specsToString,e.urlTalents=t.getUrlTalents(),e.classId=s.class,e.talentDetails=n,e.talentTooltips=a,e.talentPointsDetails=t.talentPointsDetails,e.talentPoints={},e.changeClass=function(e){r.go("talent-calculator",{class:e})},e.validClassId=function(){return!(""===e.classId||!e.classId||!e.classes[e.classId])},e.clearTalents=o,e.classId&&(o(),e.urlTalents&&t.initTalents(n,e.urlTalents,e.talentPoints,e.talentPointsDetails))}])}(window,document);