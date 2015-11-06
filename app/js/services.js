'use strict';

/* Services */

var stashrestServices = angular.module('gerritrestServices', ['ngResource']);

stashrestServices.factory('User', ['$resource',
	function($resource){
		return $resource('group/:userId.json', {}, {
			query: {method:'GET', params:{userId:'group'}, isArray:true}
		});
}]);

/*
stashrestServices.factory('Gerrit', ['$resource',
	function($resource){
		return $resource('http://zru11ubu01v.spb.mot.com:4000/gerrit/a/projects/', {}, {
			query: {method:'GET', isArray:true}
		});
}]);
*/