'use strict';
require('../../client/client');
require('angular-mocks');
describe('pictures controller', function() {
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
		var picturesController = 
					$ControllerConstructor('PicturesController', {$scope: $scope});
		expect(typeof picturesController).toBe('object');
		expect(Array.isArray($scope.pictures)).toBe(true);
	});

	describe('REST requests', function() {
		beforeEach(angular.mock.inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should get pictures', function() {
		$httpBackend.expectGET('/api/v1/pictures/capitolhill/true').respond(200, {pictures:[{link:"test link"}]});
		var picturesController = $ControllerConstructor('PicturesController', {$scope: $scope});
		$scope.getResource();
		$httpBackend.flush();
		expect($scope.pictures[0].link).toBe('test link');
	});
  });
});