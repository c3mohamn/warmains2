!function(r,e,t){"use strict";wmApp.service("userAPI",["$http",function(r){return{registerUser:function(e,t){return r.post("/auth/register",{username:e,password:t})},loginUser:function(e,t){return r.post("/auth/login",{username:e,password:t})}}}])}(window,document);