"use strict";

module.exports = function(app) {
  app.controller('mapController', ['$scope', '$http', function($scope, $http) {
    $scope.color = '';

    $scope.getColor = function() {
      $http({
        method: "GET",
        url: '/sparcify/recs/:location/:gender'
      })
      .success(function(data) {
        $scope.color = data;
      })
      .error(function(data) {
        console.log(data);
      })
    }
  }])
}

