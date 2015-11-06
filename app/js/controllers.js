'use strict';

/* Controllers */

var gerritrestControllers = angular.module('gerritrestControllers', ['base64']);


gerritrestControllers.config(['$httpProvider', 'dgAuthServiceProvider', '$base64',
	function($httpProvider, dgAuthServiceProvider,$base64){
			$httpProvider.defaults.withCredentials = true;
			dgAuthServiceProvider.setConfig({
			        login: {
			            method: 'GET',
			            url: 'http://zru11ubu01v.spb.mot.com:4000/gerrit/a/projects/'
			        }});
			dgAuthServiceProvider.setHeader('Authorization: Basic ' + $base64.encode('rvjp46:9eKjqCbypHAR'));
		}
]);

gerritrestControllers.controller('ProjectsListCtrl', ['$scope', '$http', '$base64', 'dgAuthService',
	function($scope, $http, $base64, dgAuthService) {
		dgAuthService.start();
		$http({
			method: 'GET',
			url: 'http://zru11ubu01v.spb.mot.com:4000/gerrit/projects/'
		}).success(function(result) {
			var dataArray = [];
			for (var proj in result){
				//if (data.hasOwnProperty(proj)) {console.log("proj: " + proj + " value: " + result[proj]);}
				result[proj]['name'] = proj;
				dataArray.push(result[proj]);
			}
			$scope.projects = dataArray;
		}).then(function successCallback(response) {
			console.log('Success rest request');
		}, function errorCallback(response) {
		    alert ('failed to send xhttp: ' + response);
		});
	
}]);

gerritrestControllers.controller('UserDetailCtrl', ['$scope', '$routeParams', 'User',
	function($scope, $routeParams, User ){
		$scope.user = User.get({userId: $routeParams.userId}, function(user){
			$scope.mainImageUrl = user.images[0];
		});

		$scope.setImage = function(imageUrl){
			$scope.mainImageUrl = imageUrl;
		}

		$scope.userId = $routeParams.userId;
	}]);