// Mouse wheel scroll up / down directives
// http://blog.sodhanalibrary.com/2015/04/angularjs-directive-for-mouse-wheel.html#.WdmjYltSyUk
wmApp.directive('ngMouseWheelUp', function() {
    return function(scope, element, attrs) {
      element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {

        // cross-browser wheel delta
        var event = window.event || event; // old IE support
        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

        if(delta > 0) {
          scope.$apply(function(){
              scope.$eval(attrs.ngMouseWheelUp);
          });

          // for IE
          event.returnValue = false;
          // for Chrome and Firefox
          if(event.preventDefault) {
          	event.preventDefault();
          }
        }
      });
    };
});

wmApp.directive('ngMouseWheelDown', function() {
  return function(scope, element, attrs) {
    element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {

        // cross-browser wheel delta
        var event = window.event || event; // old IE support
        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

        if(delta < 0) {
          scope.$apply(function(){
              scope.$eval(attrs.ngMouseWheelDown);
          });

          // for IE
          event.returnValue = false;
          // for Chrome and Firefox
          if(event.preventDefault)  {
          	event.preventDefault();
          }
        }
    });
  };
});
