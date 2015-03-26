'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var sparcify  = angular.module('sparcify', ['ngRoute', 'base64', 'ngCookies']);

require('./users')(sparcify);

sparcify.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/sparcify', {
    templateUrl:'./views/sparcify.html'
  })

  .when('/about', {
    templateUrl: './views/about.html'
  })
  .when('/signup', {
    templateUrl: './views/signup.html',
    controller: 'signupController'
  })
  .when('/signin', {
    templateUrl: './views/signin.html',
    controller: 'signinController'
  })
  .when('/sparcify/recs/:location/:gender', {
    templateUrl: './views/map.html',
    controller: 'mapController'
  })
  .when('/', {
    redirectTo: '/signin'
  })
  .otherwise({
    templateUrl: './views/four_oh_four.html'
  })
}]);
