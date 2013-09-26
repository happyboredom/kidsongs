'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', 'Songs', function( $scope, Songs ) {
    $scope.songs = Songs; 
  }])
  .controller('MyCtrl2', ['$scope', '$routeParams', 'Songs',
    function( $scope, $routeParams, Songs) {
      $scope.routeParams = $routeParams;
      $scope.songLoad = 'unknown';
      
      angular.forEach(Songs, function (val, key) {
        if ($routeParams.slug === val.slug )
        {
          $scope.mp3 = val.mp3;
        }
      })
  }]);