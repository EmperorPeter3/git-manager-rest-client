'use strict';

/* App Module */

var stashrestApp = angular.module('stashRestApp', [
  //'ngRoute',
  'dgAuth',
  'stashrestControllers',
  'stashrestFilters',
  'stashrestServices',
  'infinite-scroll'
]);

/*
stashrestApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/group', {
        templateUrl: 'partials/group-list.html',
        controller: 'GroupListCtrl'
      }).
      when('/group/:userId', {
        templateUrl: 'partials/user-list.html',
        controller: 'UserListCtrl'
      }).
      otherwise({
        redirectTo: '/group'
      });
  }]);
*/