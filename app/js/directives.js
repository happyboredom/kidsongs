'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('mp3Audio', [function() {
	    return  {
			restrict:"A",
	    	scope: {
				bind:'='
		    },
	    	template:'<audio controls><source src="{{bind}}" type="audio/mpeg; codecs=\'mp3\'"/></audio>'
		}
	}])
	.directive('markdown', [function () {
    var converter = new Showdown.converter();
    return {
        restrict: 'A',
        link: function (scope, element, attrs) 
        	{
	            var htmlText = converter.makeHtml(element.text());
	            element.html(htmlText);
	        }
	    };
	}]);