'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.1')
  .value('platform', 'web')
  .factory('baseurl', function ( $location ) {
  	// return 'http://kidsongs.infoentropy.com';
  	if ( $location.host() === "127.0.0.1")
  	{
	  	return '';
  	} else {
  		return 'http://kidsongs.infoentropy.com';
  	}

  } )
  .factory('Songs', function ( $resource, baseurl ) {
  	return $resource( baseurl + '/data/songlist.json');
  });
