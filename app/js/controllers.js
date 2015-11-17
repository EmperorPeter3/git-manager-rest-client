'use strict';

/* Controllers */

var stashrestControllers = angular.module('stashrestControllers', ['base64']);

stashrestControllers.config(['$httpProvider',
	function($httpProvider){
		$httpProvider.defaults.withCredentials = true;
		$httpProvider.defaults.useXDomain = true;
		//delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}
]);

stashrestControllers.controller('navBarCtrl', 
	['$scope', 'Login',
	function($scope, Login) {
		//dgAuthService.start();
		$scope.menuUIUrl = "partials/navbar-menu.html";
		Login.query();
	}]
	);

stashrestControllers.controller('GroupListCtrl', 
	['$scope', '$http', '$base64', 'Group', 'User', '$routeParams',
	function($scope, $http, $base64, Group, User, $routeParams) {
		$scope.groupUIUrl = "partials/group-list.html";
		$scope.userUIUrl = "partials/user-list.html";
		$scope.getGroupsByUserUIUrl = "partials/search-groups-by-user.html"
		$scope.groups = Group.query();
		//scope.groups='';
		//$scope.groups = Group.get;
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
		//$scope.allUsers = GetAllUsers.getUsers();
		$scope.allUsers = GetAllUsers;
		
		$scope.getGroupsByUser = function(userName){
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
		if ($routeParams.userDisplayName != undefined){
			var uNameCID = $routeParams.userDisplayName;
			var uCID = uNameCID.split('-')[1];
			$scope.userDisplayName = uNameCID;
			$scope.getGroupsByUser(uCID);
		}
	}]);

