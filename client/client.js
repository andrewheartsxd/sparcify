'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var sparcify  = angular.module('sparcify', ['ngRoute', 'base64', 'ngCookies']);

require('./users')(sparcify);

// services
require('./services/resources_routes')(sparcify);

//Controller
require('./controllers/map_controller')(sparcify);
require('./controllers/pictures_controller')(sparcify);
require('./controllers/messages_controller')(sparcify);


//directives
require('./directives/mapDirective')(sparcify);

//Routes
sparcify.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/map', {
    controller:'MapController',
    templateUrl:'./directives/mapDirective.html'
  })
  .when('/pictures/:location/:gender', {
      controller  :'PicturesController',
      templateUrl :'./views/pictures.html'
  })
  .when('/messages/:location/:gender', {
      controller  :'MessagesController',
      templateUrl :'./views/messages.html'
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
  .when('/', {
    redirectTo: '/signin'
  })
  .otherwise({
    templateUrl: './views/four_oh_four.html'
  })
}]);
