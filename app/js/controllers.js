'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource', 'ngSanitize'])
  // Controller 1
  .controller('MyCtrl1', ['$scope', 'Songs', function( $scope, Songs ) {
      Songs.query( {}, function (response) {
          $scope.songs = response;
      });
  }])

  // Controller 2
  .controller('MyCtrl2', ['$scope', '$routeParams', '$http', '$compile', 'Songs', 'baseurl', 'platform', 'version',
    function( $scope, $routeParams, $http, $compile, Songs, baseurl, platform, version ) {
      $scope.routeParams = $routeParams;
      $scope.songLoad = 'unknown';
      $scope.platform = platform; // ios, Android, web?
      $scope.playing = false;
      $scope.media = null;

      $scope.$on('$destroy', function () {
        try
        {
          $scope.media.stop();
          $scope.media.release();
          $scope.media = null;
        } catch (err) {
          // nothing
        }
      });

      // get lyrics
      $http.get( baseurl + '/data/' + $routeParams.slug + '.html')
        .success( function (response) {
          $scope.lyrics = response;
        });

      // for rendering HTML. Called in html snippet view.
      // Angular currently does not have
      // a filter to output into raw HTML.
      $scope.trustShowdownHtml = function () {
        if ($scope.lyrics)
        {
          var converter = new Showdown.converter();
          var spaced_lyrics = $scope.lyrics;
          spaced_lyrics = spaced_lyrics.split('\n');

          var verses = [];
          var curverse = [];
          var versecount = 0;
          var out = '';

          angular.forEach( spaced_lyrics, function (obj, i) {
            if (obj)
            {
              curverse.push('* ' + obj);
            } else {
              verses.push( curverse.join('\n') );
              curverse = [];
              versecount++;
            }
          });
          angular.forEach(verses, function(value, key){
            out += converter.makeHtml(value);
          });
          return out;
        }
      };

      Songs.query( {}, function (response) {
          $scope.songs = response;
          angular.forEach($scope.songs, function (val, key) {
            if ($routeParams.slug === val.slug )
            {
              $scope.mp3 = val.mp3;
              $scope.song = val;
              var inject;
              if ( $scope.platform === 'web' )
              {
                // need to compile the directive after data
                // because audio object for HTML5 media player needs urldata at time of rendering.
                // inject = $compile( angular.element("<div mp3-audio bind=\"mp3\"></div>") )($scope);
                inject = $compile( angular.element('<div class="phonegapAudioPlayer" bind="mp3" playing="playing" media="media"></div>') )($scope);
              }

              if ( $scope.platform === 'ios' )
              {
                inject = $compile( angular.element('<div class="phonegapAudioPlayer" bind="mp3" playing="playing" media="media"></div>') )($scope);
              }

              if ( $scope.platform === 'android' )
              {
                inject = $compile( angular.element("<div mp3-audio bind=\"mp3\" playing=\"playing\" media=\"media\"></div>") )($scope);
              }
              angular.element( document.getElementById("player") ).append( inject );
            }
          });
      });

  }]);
