'use strict';

module.exports = function(app){


	app.controller('MapController',['$scope', function($scope){
		$scope.location = {	lat: "47.625305",
							long: "-122.322183"}
		
	}]);



};
