'use strict';

/* Services */

var stashrestServices = angular.module('stashrestServices', ['ngResource']);

stashrestServices.factory('Login', ['$resource', '$base64',
	function($resource, $base64){
		return $resource('http://stash.mot-solutions.com:7990', {}, {
			query: {
				method:'POST',
				headers: {
					"Authorization":'Basic ' + $base64.encode('mrj864:Iwb4lvn()66')
				},
				isArray:false,
				transformRequest:function(data, headersGetter){
					var headers = headersGetter();
					headers['Authorization'] = 'Basic ' + $base64.encode('mrj864:Iwb4lvn()66');
					return data;
				},
				transformResponse:function(data, headersGetter, status) {
					//data = JSON.parse(data);
					var headers = headersGetter();
					console.log(headers);
					//return data.values;
					return data;
				},
				interceptor: {
	                response: function (data) {
	                    console.log('Login response in interceptor', data);
	                    return data;
	                },
	                responseError: function (data) {
	                    console.log('Login error in interceptor', data);
	                }
				}
			}
		});
	}]);



stashrestServices.factory('Group', ['$resource', '$base64', 'Login',
	function($resource, $base64, Login){
		return $resource('http://stash.mot-solutions.com:7990/rest/api/1.0/admin/groups/', {}, {
			query: {
				method:'GET',
				isArray:false,
				headers: {
					"Authorization":'Basic ' + $base64.encode('mrj864:Iwb4lvn()66')
				},
				transformResponse:function(data, responseHeaders) {
					data = JSON.parse(data);
					console.log('======= Groups get responce headers ==========')
					console.log(responseHeaders())
					console.log('==============================================')
					//responseHeaders()['www-authenticate'] = responseHeaders()['www-authenticate'].replace(/OAuth/i, "Basic");
					
					//console.log('======= modified responce headers ==========')
					//console.log(responseHeaders())
					//console.log('==============================================')

					return data.values;
				},
				transformRequest:function(data, headersGetter){
					var headers = headersGetter();
					//headers['Authorization'] = 'Basic ' + $base64.encode('mrj864:Iwb4lvn()66');
					return data;
				},
				interceptor: {
	                response: function (data) {
	                    console.log('Group response in interceptor', data);
	                    return data;
	                },
	                responseError: function (data) {
	                    console.log('Group error in interceptor', data);
	                    $resource('http://@stash.mot-solutions.com:7990/rest/api/1.0/admin/groups/', {}, {
	                    			query: {
	                    				method:'GET',
	                    				isArray:false
	                    				}}).query()
	                }
				}
			}
		});
	}]);

stashrestServices.factory('User', ['$resource', '$base64',
	function($resource, $base64){
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

stashrestServices.factory('GetAllUsers', ['$resource',
	function($resource){
		var resource = $resource('http://stash.mot-solutions.com:7990/rest/api/1.0/admin/users');
		return resource.get(
			{optionalParameter: 'fake'}, 
			function(data){
				console.log("data: " + data);
			},
			function(httpResponse){
				console.log("httpResponse: " + httpResponse);
			});
	}]);

stashrestServices.factory('GroupsByUser', ['$resource', '$base64',
	function($resource, $base64){
		return $resource('http://stash.mot-solutions.com:7990/rest/api/1.0/admin/users/more-members?context=:ct', {}, {
			getByUser: {
				method:'GET',
				isArray:true,
				transformResponse:function(data, responseHeaders) {
					data = JSON.parse(data);
					return data.values;
				},
				transformRequest:function(data, headersGetter){
					var headers = headersGetter();
					headers['Authorization'] = 'Basic ' + $base64.encode('mrj864:Iwb4lvn()66');
					//$http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode('mrj864:Iwb4lvn()66');
					return data;
				}
			}
		}
		);
	}]);