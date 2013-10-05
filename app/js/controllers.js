'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngResource'])
  // Controller 1
  .controller('MyCtrl1', ['$scope', 'Songs', function( $scope, Songs ) {
      Songs.query( {}, function (response) {
          $scope.songs = response;
          console.log( $scope.songs );
      });
  }])

  // Controller 2
  .controller('MyCtrl2', ['$scope', '$routeParams', '$http', 'Songs',
    function( $scope, $routeParams, $http, Songs ) {
      $scope.routeParams = $routeParams;
      $scope.songLoad = 'unknown';

      // get lyrics
      $http.get( '/data/' + $routeParams.slug + '.html')
        .success( function (response) {
          $scope.lyrics = response;
        });


      Songs.query( {}, function (response) {
          $scope.songs = response;
          console.log( $scope.songs );

          angular.forEach($scope.songs, function (val, key) {
            if ($routeParams.slug === val.slug )
            {
              $scope.mp3 = val.mp3;
              $scope.song = val;
            }
          });
      });

  }]);