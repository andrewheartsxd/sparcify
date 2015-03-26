'use strict';

module.exports = function(app) {
  app.controller('signupController', [ '$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
    $scope.createNewUser = function() {
      $http({
        method: 'POST',
        url: '/api/v1/sparcify/create_user',
        data: $scope.newUser
      })
      .error(function(data) {
        console.log(data);
      })
      .success(function(data) {
        $cookies.eat = data.eat;
        $location.path('/map');
      });
    };
  }]);
};