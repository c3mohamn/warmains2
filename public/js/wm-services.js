!function(t,r,n){"use strict";wmApp.service("talentHelper",["$location",function(t){function r(r){t.search("talents",e(r))}function n(t,r,n,e,o){var i=o[r].row,a=o[r].tree,l=e[a].total,s=e[a].lastActiveRow;return 0!=t&&(!(l<5*i)&&(!(e.remaining<=0)&&(!(n[r]+t>o[r].maxRank)&&((!o[r].requires||n[o[r].requires]==o[o[r].requires].maxRank)&&(n[r]+=t,e[a].row[i]+=t,e[a].total+=t,e.remaining-=t,s<i&&(e[a].lastActiveRow=i),!0)))))}function e(t){var r=[];for(var n in t)r.push(t[n]);return o(r.join(""))}function o(t){for(var r="",n=0;n<t.length;n+=2){var e=t[n]+(t[n+1]||"0");r+=c.toChar[e]}return a(s(r))}function i(t){if(!t)return"";for(var r="",n=0;n<t.length;n++)r+=c.toInt[t[n]];return r}function a(t){for(var r="",n=0,e=0;e<t.length;e++)"I"!==t[e]?(r+=t[e],n=0):1===++n?r+=t[e]:2===n?r+=n:r=n<11?r.substring(0,r.length-1)+n:r.substring(0,r.length-2)+n;return r}function l(t){for(var r="",n=0;n<t.length;n++)if("I"!==t[n])r+=t[n];else if(isNaN(t[n+1]))r+=t[n];else{var e=t[n+1];isNaN(t[n+2])||(e+=t[n+2],n++),n++,r+=Array(parseInt(e)+1).join("I")}return r}function s(t){if(!t)return"";for(var r=t.length-1;r>=0&&"I"===t[r];)r--;return t.substring(0,r+1)}function u(t,r){var n=0,e=t-1;if(-1==e)return r[0];for(;e>=0;)n+=r[e],e-=1;return n}var c={toChar:{"00":"I","01":"V","02":"W","03":"X","04":"Y","05":"Z",10:"a",11:"f",12:"k",13:"p",14:"u",15:"z",20:"b",21:"g",22:"l",23:"q",24:"v",25:"A",30:"c",31:"h",32:"m",33:"r",34:"w",35:"B",40:"d",41:"i",42:"n",43:"s",44:"x",45:"C",50:"e",51:"j",52:"o",53:"t",54:"y",55:"D"},toInt:{I:"00",V:"01",W:"02",X:"03",Y:"04",Z:"05",z:"15",A:"25",B:"35",C:"45",D:"55",a:"10",b:"20",c:"30",d:"40",e:"50",f:"11",g:"21",h:"31",i:"41",j:"51",k:"12",l:"22",m:"32",n:"42",o:"52",p:"13",q:"23",r:"33",s:"43",t:"53",u:"14",v:"24",w:"34",x:"44",y:"54"}};return{talentPointsDetails:{0:{total:0,lastActiveRow:0,row:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0}},1:{total:0,lastActiveRow:0,row:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0}},2:{total:0,lastActiveRow:0,row:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0}},remaining:71},initTalents:function(t,e,o,a){e=i(l(e));for(var s in t){var u=parseInt(e[s])||0,c=s;o[s]=0,n(u,c,o,a,t)}r(o)},getUrlTalents:function(){return t.search().talents},changeUrl:r,addPoint:n,removePoint:function(t,r,n,e){var o=e[t].row,i=e[t].tree,a=n[i].lastActiveRow;if(r[t]<=0)return!1;if(e[t].allows)for(l=0;l<e[t].allows.length;l+=1)if(r[e[t].allows[l]]>0)return!1;if(o!=a)for(var l=0;a-l>o;){if(u(a-l,n[i].row)<=5*(a-l))return!1;l+=1}return r[t]-=1,n[i].row[o]-=1,n[i].total-=1,n.remaining+=1,o==a&&0==n[i].row[o]&&(n[i].lastActiveRow-=1),!0},clearTalents:function(t,n,e,o,i){if(i){n.remaining=n.remaining+n[i].total,n[i].total=0,n[i].lastActiveRow=0,n[i].row={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};for(var a in o)o[a].tree==i&&(t[a]=0)}else{n.remaining=71,n[0].total=0,n[1].total=0,n[2].total=0,n[0].lastActiveRow=0,n[1].lastActiveRow=0,n[2].lastActiveRow=0,n[0].row={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0},n[1].row={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0},n[2].row={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};for(var a in o)t[a]=0}return r(t),!0},getTalentImgPath:function(t,r,n){return t?"/images/talents/"+r+"/"+n+"/"+t+".jpg":""},getTalentTooltip:function(t,r,n,e,o,i){var a=n[t],l=r.maxRank,s="<h5>"+r.name+"</h5>",u="<h5 class='tooltip-ranks'>"+a+" / "+l+"</h5>",c="",f="",v="",w="",g="<img class='tooltip-image' src='"+e+"'/>";0==a?(w="<span class='tooltip-click-to-learn'>Click or scroll up to learn.</span>",c=o[n[t]]):a<l?(c=o[n[t]-1],f=o[n[t]],i||(v="<div class='tooltip-next-rank'>Next rank:</div>")):(w="<span class='tooltip-click-to-remove'>Right click or scroll down to remove.</span>",c=o[n[t]-1]);return g+"<div>"+s+u+"</div><div class='tooltip-description'>"+c+"</div>"+v+"<div class='tooltip-description'>"+f+"</div>"+w},isTalentInactive:function(t,r,n,e){var o=r[t],i=!0;return o.requires&&(i=r[o.requires].maxRank==n[o.requires]),5*o.row>e[o.tree].total||0===n[t]&&0===e.remaining||!i}}}]),wmApp.service("authAPI",["$http","$localStorage","$window",function(t,r,n){return{registerUser:function(r,n){return t.post("/auth/register",{username:r,password:n})},loginUser:function(r,n){return t.post("/auth/login",{username:r,password:n})},logout:function(){delete r.currentUser,n.location.reload()},decryptToken:function(t){var r=t.split(".")[1].replace("-","+").replace("_","/");return JSON.parse(n.atob(r))},refreshToken:function(r){return t.post("/auth/refreshToken",{token:r})}}}])}(window,document);