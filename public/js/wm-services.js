!function(e,r,t){"use strict";wmApp.service("charHelper",["$http",function(e){return{classes:{1:"Warrior",2:"Paladin",3:"Hunter",4:"Rogue",5:"Priest",6:"Deathknight",7:"Shaman",8:"Mage",9:"Warlock",11:"Druid"},specs:{1:["arms","fury","protection"],2:["holy","protection","retribution"],3:["beastmastery","marksmanship","survival"],4:["assassination","combat","subtlety"],5:["discipline","holy","shadow"],6:["blood","frost","unholy"],7:["elemental","enhancement","restoration"],8:["arcane","fire","frost"],9:["affliction","demonology","destruction"],11:["balance","feral","restoration"]}}}]),wmApp.service("authAPI",["$http","$localStorage","$window",function(e,r,t){return{registerUser:function(r,t){return e.post("/auth/register",{username:r,password:t})},loginUser:function(r,t){return e.post("/auth/login",{username:r,password:t})},logout:function(){delete r.currentUser,t.location.reload()},decryptToken:function(e){var r=e.split(".")[1].replace("-","+").replace("_","/");return JSON.parse(t.atob(r))},refreshToken:function(r){return e.post("/auth/refreshToken",{token:r})}}}])}(window,document);