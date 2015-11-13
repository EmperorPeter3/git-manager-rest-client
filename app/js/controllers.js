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
	['$scope', '$http', '$base64', 'dgAuthService', 'Group', 'User', '$routeParams',
	function($scope, $http, $base64, dgAuthService, Group, User, $routeParams) {
		$scope.groupUIUrl = "partials/group-list.html";
		$scope.userUIUrl = "partials/user-list.html";
		$scope.getGroupsByUserUIUrl = "partials/search-groups-by-user.html"
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

stashrestControllers.controller('SearchGroupsByUserCtrl', 
	['$scope', 'GetAllUsers', 'GroupsByUser', '$routeParams',
	function($scope, GetAllUsers, GroupsByUser, $routeParams){
		$scope.allUsers = GetAllUsers.getUsers();
		var uNameCID = $routeParams.userDisplayName;
		var uCID = uNameCID.split('-')[1];
		$scope.getGroupsByUser = function(userName){
			console.log(userName);
			$scope.groupsByUser = GroupsByUser.getByUser({ct:userName});
		};
		$scope.getAllUserFilter = function(str) {
			return {filter: str};
		};
		$scope.selectedUser = function (selected) {
			if (selected) {
				$scope.userDisplayName = selected.originalObject.displayName;
				$scope.getGroupsByUser(selected.originalObject.name);
			}
		};
		if (uNameCID.length != 0){
			$scope.userDisplayName = uNameCID;
			$scope.getGroupsByUser(uCID);
		}
	}]);

