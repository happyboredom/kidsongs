'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngResource', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/songs', {templateUrl: 'views/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/song/:slug', {templateUrl: 'views/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/songs'});
  }]);
