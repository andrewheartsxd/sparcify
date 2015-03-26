'use strict';

var color;

var getColor = function() {
  $.get('http://localhost:3000/api/v1/sparcify/color/capitolhill/true', function(data) {
      console.log(data);
    })
};


var initialize = function() {

  color = getColor();

  var myLatLng = {lat: 47.6229, lng: -122.3165};

        var cityCircle;

        var mapOptions = {
          zoom: 15,
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

var loadScript = function() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '&signed_in=true&callback=initialize';
  document.body.appendChild(script);
};


