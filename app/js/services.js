'use strict';

/* Services */

var stashrestServices = angular.module('stashrestServices', ['ngResource']);

stashrestServices.factory('User', ['$resource',
	function($resource){
		return $resource('group/:userId.json', {}, {
			query: {method:'GET', params:{userId:'group'}, isArray:true}
		});
}]);

/*
stashrestServices.factory('Stash', ['$resource',
	function($resource){
		return $resource('http://stash.mot-solutions.com:7990/rest/api/1.0/projects/', {}, {
			query: {method:'GET', isArray:true}
		});
}]);
*/