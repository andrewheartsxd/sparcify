'use strict';
require('../../client/client');
require('angular-mocks');
describe('messages controller', function() {
	var $ControllerConstructor;
	var $httpBackend;
	var $scope;
	//before
	beforeEach(angular.mock.module('sparcify'));
	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$ControllerConstructor = $controller;
	}));

	it('should be able to create a controller', function() {
		var messagesController = 
					$ControllerConstructor('MessagesController', {$scope: $scope});
		expect(typeof messagesController).toBe('object');
		expect(Array.isArray($scope.messages)).toBe(true);
	});

	describe('REST requests', function() {
		beforeEach(angular.mock.inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should get messages', function() {
		var $routeParams={};
		$routeParams.location = 'capitolhill';
		$routeParams.gender   = 'true';
		$httpBackend.expectGET('/api/v1/sparcify/messages/capitolhill/true').
						respond(200,  {messages:{message:"test message"}});
		var messageController = $ControllerConstructor('MessagesController',
								{$scope: $scope, $routeParams:$routeParams});
		$scope.getResource('capitolhill', 'true');
		$httpBackend.flush();
		expect($scope.messages.messages.message).toBe("test message");
	});

	it('should be able to create a new Message', function() {
      var $routeParams={};
		$routeParams.location = 'capitolhill';
		$routeParams.gender   = 'true';
		$httpBackend.expectPOST('/api/v1/sparcify/messages/capitolhill/true').
						respond(200,  {location:'loc',message:"test message"});
		var messageController = $ControllerConstructor('MessagesController', 
								{$scope: $scope, $routeParams:$routeParams});
      $scope.createMessage({location:'loc',message:"test message"});
      $httpBackend.flush();

      expect($scope.messages[0].message).toBe('test message'); 
      expect($scope.messages[0].location).toBe('loc'); 
    });
  });
});