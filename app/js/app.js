'use strict';

/* App Module */

var stashrestApp = angular.module('stashRestApp', [
  'ngRoute',
  //'oauth',
  //'dgAuth',
  'stashrestControllers',
  'stashrestFilters',
  'stashrestServices',
  'infinite-scroll',
  'angucomplete-alt'
  ]);

stashrestApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/index', {
      templateUrl: 'partials/group-user-list.html',
      controller: 'GroupListCtrl'
    }).
    when('/search', {
      templateUrl: 'partials/search-groups-by-user.html',
      controller: 'SearchGroupsByUserCtrl'
    }).
    when('/search/:userDisplayName', {
      templateUrl: 'partials/search-groups-by-user.html',
      controller: 'SearchGroupsByUserCtrl'
    }).
    otherwise({
      redirectTo: '/index'
    });
  }]);