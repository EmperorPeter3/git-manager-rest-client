'use strict';

/* Controllers */

var stashrestControllers = angular.module('stashrestControllers', ['base64']);


stashrestControllers.config(['$httpProvider', 'dgAuthServiceProvider', '$base64',
	function($httpProvider, dgAuthServiceProvider,$base64){
			$httpProvider.defaults.withCredentials = true;
			dgAuthServiceProvider.setConfig({
			        login: {
			            method: 'GET',
			            url: 'http://stash.mot-solutions.com:7990'
			        }});
			dgAuthServiceProvider.setHeader('Authorization: Basic ' + $base64.encode('mrj864:Iwb4lvn()66'));
		}
]);

stashrestControllers.controller('GroupListCtrl', ['$scope', '$http', '$base64', 'dgAuthService',
	function($scope, $http, $base64, dgAuthService) {
		dgAuthService.start();
		$http({
			method: 'GET',
			url: 'http://stash.mot-solutions.com:7990/rest/api/1.0/projects/'
		}).success(function(result) {
			$scope.projects = result.values;
		}).then(function successCallback(response) {
			console.log('Success rest request');
		}, function errorCallback(response) {
		    alert ('failed to send xhttp: ' + response);
		});
	
}]);

stashrestControllers.controller('UserDetailCtrl', ['$scope', '$routeParams', 'User',
	function($scope, $routeParams, User ){
		$scope.user = User.get({userId: $routeParams.userId}, function(user){
			$scope.mainImageUrl = user.images[0];
		});

		$scope.setImage = function(imageUrl){
			$scope.mainImageUrl = imageUrl;
		}

		$scope.userId = $routeParams.userId;
	}]);