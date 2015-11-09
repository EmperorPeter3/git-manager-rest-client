'use strict';

/* Services */

var stashrestServices = angular.module('stashrestServices', ['ngResource']);


stashrestServices.factory('User', ['$resource',
	function($resource){
		return $resource('http://stash.mot-solutions.com:7990/rest/api/1.0/admin/groups/more-members?context=:c', {}, {
			getByGroup: {
				method:'GET', 
				isArray:true,
				transformResponse:function(data, responseHeaders) {
					data = JSON.parse(data);
					return data.values;
				}
			}
		});
}]);

stashrestServices.factory('Group', ['$resource',
	function($resource){
		return $resource('http://stash.mot-solutions.com:7990/rest/api/1.0/admin/groups/', {}, {
			query: {
				method:'GET',
				isArray:true,
				transformResponse:function(data, responseHeaders) {
					data = JSON.parse(data);
					return data.values;
				}
			}
		}
		);
}]);
