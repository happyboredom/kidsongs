'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('phonegapAudioPlayer', ['$compile', '$document',
  		function($compile, $document) {
	    return  {
			restrict:"C",
	    	scope: {
				bind:'=',
				playing:'=',
				media:'='
		    },
	    	template:'<div class="audioplayer" rel="{{bind}}"><a ng-class="{play:!playing, stop:playing}" ng-click="playOrStop()">Play/Stop</a></div>',
	    	link: function ( scope, element, attr ) {
	    		// Media is from Phonegap API

	    		/* Private */
	    		mediaSuccess = function() {
	    		};
	    		mediaError = function () {
	    		};

	    		mediaStatus = function (status) {
	    			if ( status == Media.MEDIA_RUNNING)
			    		scope.playing = true;
			    	else
				    	scope.playing = false;
	    		};
	    		mediaCheck = function (status) {
	    			console.log( status );
	    		};
	    		/* Public */
	    		scope.playOrStop = function () {
	    			if ( scope.playing )
	    			{
				    	scope.playing = false;
		    			scope.media.stop()
	    			} else {
				    	scope.playing = true;
		    			scope.media.play();
	    			}
	    		}

	    		/* execute !! */
	    		if (Media != undefined)
	    		{
		    		scope.media = new Media( scope.bind, mediaSuccess, mediaError, mediaStatus );
	    		}
	    	}
		}
	}])
  .directive('mp3Audio', ['$compile',
  		function($compile) {
	    return  {
			restrict:"AC",
	    	scope: {
				bind:'='
		    },
	    	template:'<audio preload="metadata" controls><source src="{{bind}}" type="audio/mpeg;codecs=\'mp3\'"/></audio>'
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