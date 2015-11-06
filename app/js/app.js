'use strict';

/* App Module */

var stashrestApp = angular.module('gerritRestApp', [
  'ngRoute',
  'dgAuth',
  'gerritrestControllers',
  'gerritrestFilters',
  'gerritrestServices'
]);

stashrestApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/group', {
        templateUrl: 'partials/group-list.html',
        controller: 'ProjectsListCtrl'
      }).
      when('/group/:userId', {
        templateUrl: 'partials/user-detail.html',
        controller: 'UserDetailCtrl'
      }).
      otherwise({
        redirectTo: '/group'
      });
  }]);

