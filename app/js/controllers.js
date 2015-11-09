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
			//dgAuthServiceProvider.setHeader('Authorization: Basic ' + $base64.encode('mrj864:Iwb4lvn()66'));
		}
]);

stashrestControllers.controller('navBarCtrl',
	['$scope','dgAuthService',
	function($scope, dgAuthService) {
		dgAuthService.start();
		$scope.menuUIUrl = "partials/navbar-menu.html";
	}]
);

stashrestControllers.controller('GroupListCtrl', 
	['$scope', '$http', '$base64', 'dgAuthService', 'Group', 'User',
	function($scope, $http, $base64, dgAuthService, Group, User) {
		$scope.groupUIUrl = "partials/group-list.html";
		$scope.userUIUrl = "partials/user-list.html";
		$scope.projects = Group.query();
		$scope.getUsersByGroup = function(groupName){
			$scope.activeGroup = groupName;
			$scope.users = User.getByGroup({c:groupName});
		};
		$scope.getListClass = function(groupName){
			if ($scope.activeGroup == groupName) {
				return 'list-group-item active';
			} else {
				return 'list-group-item';
			}
		};
		
	}]
);

