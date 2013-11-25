'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('phonegapAudioPlayer', ['$compile', '$document', '$timeout',
  		function($compile, $document, $timeout) {
	    return  {
			restrict:"C",
	    	scope: {
				bind:'=',
				playing:'=',
				media:'=',
                position:'='
		    },
	    	template:'<div class="audioplayer" rel="{{bind}}"><a ng-class="{play:!playing, stop:playing}" ng-click="playOrStop()">Play/Stop</a></div>',
	    	link: function ( scope, element, attr ) {
	    		// Media is from Phonegap API

	    		/* Private */
	    		var mediaSuccess = function() {
	    		};
	    		var mediaError = function () {
	    		};


                /* watcher */
                var myIntervalFunction = function() {
                    cancelRefresh = $timeout(function myFunction() {
                        scope.media.getCurrentPosition();
                        cancelRefresh = $timeout(myFunction, 1000);
                    },1000);
                };
                var mediaTimer = $timeout(myIntervalFunction, 1000);

                scope.$on('$destroy', function(e) {
                    console.log('destroy timer');
                    $timeout.cancel(cancelRefresh);
                });
                /* end watcher */

	    		mediaStatus = function (status) {
	    			if ( status == Media.MEDIA_RUNNING)
			    		scope.playing = 1;
			    	else
				    	scope.playing = 0;
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
                        scope.loading = true;
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