!function(n,t,i){"use strict";wmApp.directive("ngRightClick",function(n){return function(t,i,e){var c=n(e.ngRightClick);i.bind("contextmenu",function(n){t.$apply(function(){n.preventDefault(),c(t,{$event:n})})})}})}(window,document);