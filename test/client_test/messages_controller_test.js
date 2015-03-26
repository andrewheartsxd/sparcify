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
		$httpBackend.expectGET('/api/v1/sparcify/messages/capitolhill/true').respond(200, {messages:[{link:"test message"}]});
		var picturesController = $ControllerConstructor('MessagesController', {$scope: $scope});
		$scope.getResource('capitolhill', 'true');
		$httpBackend.flush();
		expect($scope.pictures[0].link).toBe('test link');
	});
  });
});