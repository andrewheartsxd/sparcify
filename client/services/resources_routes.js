'use strict';
module.exports = function(app){
	var handleError = function(data){
		console.log(data); 
	}; 

app.factory('resource', ['$http','$cookies', function($http,$cookies){
	return function(resourceName){
		$http.defaults.headers.common['eat']=$cookies.eat;
		return{
			getResource:function(location, gender, callback){
				$http({
					method	:'GET', 
					url		:'/api/v1/sparcify/' +resourceName+'/'+ location+'/'+ gender
				})
				.success(callback)
				.error(handleError); 
			},

			createMessage: function(message,location,gender ,callback){
				console.log('Message1 - '+ message.message );
				$http({
					method	: 'POST', 
					url 	:'/api/v1/sparcify/' +resourceName+'/'+ location+'/'+ gender, 
					data	: message
				})
				.success(callback)
				.error(handleError); 
			},
		}
	}

}])

}