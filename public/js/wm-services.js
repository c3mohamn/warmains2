!function(t,r,e){"use strict";wmApp.service("talentHelper",["$http",function(t){function r(t,r){var e=0,n=t-1;if(-1==n)return r[0];for(;n>=0;)e+=r[n],n-=1;return e}return{talentPointsDetails:{0:{total:0,lastActiveRow:0,row:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0}},1:{total:0,lastActiveRow:0,row:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0}},2:{total:0,lastActiveRow:0,row:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0}},remaining:71},addPoint:function(t,r,e,n,o){var a=o[r].row,i=o[r].tree,l=n[i].total,s=n[i].lastActiveRow;return!(0==t||l<5*a||n.remaining<=0||e[r]+t>o[r].max_rank||o[r].requires&&e[o[r].requires]!=o[o[r].requires].max_rank||(e[r]+=t,n[i].row[a]+=t,n[i].total+=t,n.remaining-=t,s<a&&(n[i].lastActiveRow=a),0))},removePoint:function(t,e,n,o){var a=o[t].row,i=o[t].tree,l=n[i].lastActiveRow;if(e[t]<=0)return!1;if(o[t].allows)for(s=0;s<o[t].allows.length;s+=1)if(e[o[t].allows[s]]>0)return!1;if(a!=l)for(var s=0;l-s>a;){if(r(l-s,n[i].row)<=5*(l-s))return!1;s+=1}return e[t]-=1,n[i].row[a]-=1,n[i].total-=1,n.remaining+=1,a==l&&0==n[i].row[a]&&(n[i].lastActiveRow-=1),!0},clearTalents:function(t,r,e,n){r.remaining=71,r[0].total=0,r[1].total=0,r[2].total=0,r[0].lastActiveRow=0,r[1].lastActiveRow=0,r[2].lastActiveRow=0,r[0].row={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0},r[1].row={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0},r[2].row={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};for(var o in n)t[o]=0;return!0},generateUrl:function(t){var r=[];for(var e in t)r.push(t[e]);return r.join("")},getTalentImgPath:function(t,r,e){return t?"/images/talents/"+r+"/"+e+"/"+t+".jpg":""}}}]),wmApp.service("authAPI",["$http","$localStorage","$window",function(t,r,e){return{registerUser:function(r,e){return t.post("/auth/register",{username:r,password:e})},loginUser:function(r,e){return t.post("/auth/login",{username:r,password:e})},logout:function(){delete r.currentUser,e.location.reload()},decryptToken:function(t){var r=t.split(".")[1].replace("-","+").replace("_","/");return JSON.parse(e.atob(r))},refreshToken:function(r){return t.post("/auth/refreshToken",{token:r})}}}])}(window,document);