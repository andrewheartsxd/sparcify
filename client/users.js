'use strict';

module.exports = function(app) {
  app.run(['$rootScope', '$cookies', function($rootScope, $cookies) {
    $rootScope.logOut = function() {
      $cookies.eat = '';
    };

    $rootScope.loggedIn = function() {
      return !!$cookies.eat;
    };
  }]);
  require('./controllers/signup_controller')(app);
  require('./controllers/signin_controller')(app);
};