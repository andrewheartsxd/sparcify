'use strict';

module.exports = function(app){


	app.controller('PicturesController',['$scope','resource','$routeParams', 
					'$cookies', '$location',function($scope,resource,$routeParams,
										$cookies, $location){
		if (!$cookies.eat || $cookies.eat.length < 1)
      		$location.path('/signup'); 


		$scope.pictures=[];
		var Pictures = resource('pictures');  
		$scope.getResource = function(){

			var location=$routeParams.location;
			var gender 	=$routeParams.gender; 
			console.log('location gender ->'+ location + ' ' + gender);
			Pictures.getResource(location,gender,function(data){
				$scope.pictures=data;
				console.dir(data[0].link);
		});

	  };

		/*$scope.imgGrid=[
		//{imgpath:'test1'},
		//{imgpath:'test2'},
		//{imgpath:'test3'}
		{imgpath:'http://cliparts.co/cliparts/8Tz/ngq/8TzngqERc.png'},
		{imgpath:'http://images2.fanpop.com/images/polls/283000/283040_1250085244850_full.jpg'},
		{imgpath:'http://thumbs.dreamstime.com/z/cartoon-girl-ice-skates-1550960.jpg'},
		{imgpath:'http://sweetclipart.com/multisite/sweetclipart/files/little_guy_in_suit_2.png'}
		] */
	}]);



};