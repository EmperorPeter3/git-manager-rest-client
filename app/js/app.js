'use strict';

/* App Module */

var stashrestApp = angular.module('stashRestApp', [
  'ngRoute',
  'dgAuth',
  'stashrestControllers',
  'stashrestFilters',
  'stashrestServices',
  'infinite-scroll',
  'angucomplete-alt'
]);

stashrestApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/search', {
        templateUrl: 'partials/search-groups-by-user.html',
        controller: 'SearchGroupsByUserCtrl'
      }).
      when('/index', {
        templateUrl: 'partials/group-user-list.html',
        controller: 'GroupListCtrl'
      }).
      otherwise({
        redirectTo: '/index'
      });
  }]);