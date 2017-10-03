!function(t,e,n){"use strict";wmApp.directive("ngRightClick",["$parse",function(t){return function(e,n,i){var o=t(i.ngRightClick);n.bind("contextmenu",function(t){e.$apply(function(){t.preventDefault(),o(e,{$event:t})})})}}]),wmApp.directive("wmTalent",["$rootScope","talentHelper","$location",function(t,e,n){return{restrict:"E",scope:{classId:"@",col:"@",row:"@",tree:"@",talentPoints:"=",talentPointsDetails:"=",talentTooltips:"=",talentDetails:"="},templateUrl:"/partials/wm-talent.html",link:function(t,i,o){function l(){return 5*t.talent.row>t.talentPointsDetails[t.talent.tree].total||0===t.talentPoints[t.talentId]&&0===t.talentPointsDetails.remaining}function s(){return e.getTalentImgPath(t.talentId,t.classId,t.specs[t.classId][t.tree])}function a(){var e=t.talentPoints[t.talentId],n=t.talent.max_rank,i="<h5>"+t.talent.name+"</h5>",o="<h5 class='tooltip-ranks'>Rank "+e+"</h5>",a="",c="",r="",p="",d="<img class='tooltip-image' src='"+s()+"'/>";if(0==e)p="<span class='tooltip-click-to-learn'>Click to learn.</span>",a=t.talentTooltipDescriptions[t.talentPoints[t.talentId]];else if(e<n){if(a=t.talentTooltipDescriptions[t.talentPoints[t.talentId]-1],c=t.talentTooltipDescriptions[t.talentPoints[t.talentId]],!l())r="<div class='tooltip-next-rank'>Next rank:</div>"}else p="<span class='tooltip-click-to-remove'>Right click to remove.</span>",a=t.talentTooltipDescriptions[t.talentPoints[t.talentId]-1];t.tooltip=d+i+o+"<div class='tooltip-description'>"+a+"</div>"+r+"<div class='tooltip-description'>"+c+"</div>"+p}var c=t.talentDetails;t.specs=specsToString,t.isInactive=l,t.talentImgPath=s,t.addPoint=function(){var i=e.addPoint(1,t.talentId,t.talentPoints,t.talentPointsDetails,c);console.log(t.talentId,t.talentPoints,t.talentPointsDetails),i&&(a(),n.search("talents",e.generateUrl(t.talentPoints)))},t.removePoint=function(){var i=e.removePoint(t.talentId,t.talentPoints,t.talentPointsDetails,c);console.log(t.talentId,t.talentPoints,t.talentPointsDetails),i&&(a(),n.search("talents",e.generateUrl(t.talentPoints)))},t.isInactive=l,function(){for(var e in c)if(c[e].row==t.row&&c[e].col==t.col&&c[e].tree==t.tree)return t.talent=c[e],t.talentId=e,t.talentTooltipDescriptions=t.talentTooltips[e],a(),!0}()}}}]),wmApp.directive("wmTooltip",["$compile","$document","$sce",function(t,e,n){return{restrict:"A",scope:{position:"@",content:"@",contentHtml:"=",hideTooltip:"@"},link:function(i,o,l){i.trustedHtml=function(t){return n.trustAsHtml(t)};var s=i.position||"top-middle",a=t("<div class='wm-tooltip' ng-bind-html='trustedHtml(contentHtml) || content'></div>")(i);e.find("body").append(a),i.hideTooltip||o.bind("mouseenter",function(){var t=o[0].getBoundingClientRect(),e=a[0].getBoundingClientRect(),n=t.width,i=t.height,l=e.width,c=e.height;switch(s){case"top-middle":a.css("left",t.left-l/2+n/2+"px"),a.css("top",t.top-c-10+"px");break;case"left-middle":a.css("left",t.left-l-10+"px"),a.css("top",t.top-c/2+i/2+"px");break;case"right-middle":a.css("left",t.right+10+"px"),a.css("top",t.top-c/2+i/2+"px");break;default:a.css("left",t.left-l/2+n/2+"px"),a.css("top",t.bottom+10+"px")}a.css("visibility","visible")}),o.bind("mouseleave",function(){a.css("visibility","hidden")}),o.on("$destroy",function(){i.$destroy()}),i.$on("$destroy",function(){a.remove()})}}}])}(window,document);