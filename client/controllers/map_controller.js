'use strict';

module.exports = function (app) {
    app.controller('MapController', ['$rootScope', '$scope', '$http', '$cookies', function ($rootScope, $scope, $http, $cookies) {
        $scope.getColor = function() {

          $scope.color = "";

          $http({
            method: "GET",
            url: "/api/v1/sparcify/color/capitolhill/true"
          })
          .success(function(data) {
            $scope.color = data;
          })
          .error(function(data) {
            console.log(data);
          });
        };

        $scope.initMap = function () {

        var myLatLng = {lat: 47.6229, lng: -122.3165};

        var cityCircle;

        var mapOptions = {
          zoom: 13,
          center: myLatLng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        var populationOptions = {
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: myLatLng,
          radius: 1000
        };

      cityCircle = new google.maps.Circle(populationOptions);

      };



    }]);
};
