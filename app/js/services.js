'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.1')
  .factory('Songs', function () {
  	return [
	  	{'slug':'alicecamel', 'title':'Alice the Camel', 'mp3':'http://kids.niehs.nih.gov/games/songs/childrens/alicecamel.mp3'},
	  	{'slug':'frere', 'title':'Frere Jacques', 'mp3':'http://kids.niehs.nih.gov/games/songs/childrens/frere.mp3'},
	  	{'slug':'oldmac', 'title':'Old Macdonald', 'mp3':'http://kids.niehs.nih.gov/games/songs/childrens/oldmac.mp3'}
  	];
  });
