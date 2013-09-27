'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  // Controller 1
  .controller('MyCtrl1', ['$scope', 'Songs', function( $scope, Songs ) {
    $scope.songs = Songs; 
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

      angular.forEach(Songs, function (val, key) {
        if ($routeParams.slug === val.slug )
        {
          $scope.mp3 = val.mp3;
          $scope.song = val;
        }
      })
  }]);