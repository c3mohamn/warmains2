!function(t,e,n){"use strict";wmApp.directive("ngRightClick",function(t){return function(e,n,o){var c=t(o.ngRightClick);n.bind("contextmenu",function(t){e.$apply(function(){t.preventDefault(),c(e,{$event:t})})})}}),wmApp.directive("wmTalent",["charHelper",function(t){return{restrict:"E",scope:{classId:"@",col:"@",row:"@",tree:"@"},templateUrl:"/partials/wm-talent.html",link:function(e,n,o){e.specs=t.specs;var c=all_talents[e.classId];e.talentBg=function(){return!!e.talent&&{"background-image":"url(/images/talents/"+e.classId+"/"+e.specs[e.classId][e.tree]+"/"+e.talentId+".jpg)"}};for(var i in c)c[i].row==e.row&&c[i].col==e.col&&c[i].tree==e.tree&&(e.talent=c[i],e.talentId=i)}}}]),wmApp.directive("wmTooltip",["$compile",function(t){return{restrict:"A",transclude:!0,scope:{position:"@",content:"@"},templateUrl:"/partials/wm-tooltip.html",link:function(t,e,n){t.showHover=!1,console.log(t.content),e.bind("mouseenter",function(){t.$apply(function(){t.showHover=!0})}),e.bind("mouseleave",function(){t.$apply(function(){t.showHover=!1})})}}}])}(window,document);