var citymap = {};
var myLatLng = {lat: 47.6229, lng: -122.3165};

citymap['capitolHill'] = {
  center: myLatLng,
  ratio: .55
};

var cityCircle;

function initialize() {

    var mapOptions = {
      zoom: 14,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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
}
