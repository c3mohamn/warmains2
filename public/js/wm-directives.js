!function(t,e,n){"use strict";wmApp.directive("ngRightClick",["$parse",function(t){return function(e,n,i){var l=t(i.ngRightClick);n.bind("contextmenu",function(t){e.$apply(function(){t.preventDefault(),l(e,{$event:t})})})}}]),wmApp.directive("wmTalent",["$rootScope","talentHelper","$location",function(t,e,n){return{restrict:"E",scope:{classId:"@",col:"@",row:"@",tree:"@",talentPoints:"=",talentPointsDetails:"=",talentTooltips:"=",talentDetails:"="},templateUrl:"/partials/wm-talent.html",link:function(t,i,l){function o(n){return e.isTalentInactive(t.talentId,t.talentDetails,t.talentPoints,t.talentPointsDetails)}function s(){return e.getTalentImgPath(t.talentId,t.classId,t.specs[t.classId][t.tree])}function a(){t.tooltip=e.getTalentTooltip(t.talentId,t.talent,t.talentPoints,s(),t.talentTooltipDescriptions,o(t.talentId))}t.specs=specsToString,t.isInactive=o,t.talentImgPath=s,t.addPoint=function(){e.addPoint(1,t.talentId,t.talentPoints,t.talentPointsDetails,t.talentDetails)&&(a(),n.search("talents",e.generateUrl(t.talentPoints)))},t.removePoint=function(){e.removePoint(t.talentId,t.talentPoints,t.talentPointsDetails,t.talentDetails)&&(a(),n.search("talents",e.generateUrl(t.talentPoints)))},t.isInactive=o,function(){for(var e in t.talentDetails)if(t.talentDetails[e].row==t.row&&t.talentDetails[e].col==t.col&&t.talentDetails[e].tree==t.tree)return t.talent=t.talentDetails[e],t.talentId=e,t.talentTooltipDescriptions=t.talentTooltips[e],a(),!0}()}}}]),wmApp.directive("wmTooltip",["$compile","$document","$sce","$window",function(t,e,n,i){return{restrict:"A",scope:{position:"@",content:"@",contentHtml:"=",hideTooltip:"@"},link:function(l,o,s){function a(){var t=o[0].getBoundingClientRect(),e=r[0].getBoundingClientRect(),n=t.width,l=t.height,s=e.width,a=e.height,d=(i.scrollX,i.scrollY);switch(c){case"top-middle":r.css("left",t.left-s/2+n/2+"px"),r.css("top",d+t.top-a-20+"px");break;case"left-middle":r.css("left",t.left-s-20+"px"),r.css("top",d+t.top-a/2+l/2+"px");break;case"right-middle":r.css("left",t.right+20+"px"),r.css("top",d+t.top-a/2+l/2+"px");break;default:r.css("left",t.left-s/2+n/2+"px"),r.css("top",d+t.bottom+20+"px")}r.css("visibility","visible")}l.trustedHtml=function(t){return n.trustAsHtml(t)};var c=l.position||"top-middle",r=t("<div class='wm-tooltip' ng-bind-html='trustedHtml(contentHtml) || content'></div>")(l);e.find("body").append(r),l.hideTooltip||o.bind("mouseenter",function(){a()}),o.bind("mouseleave",function(){r.css("visibility","hidden")}),o.bind("$destroy",function(){l.$destroy()}),l.$on("$destroy",function(){r.remove()})}}}])}(window,document);