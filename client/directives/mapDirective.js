'use strict';

module.exports = function(app) {
    app.directive('mapDirective', function() {
        return {
            restrict: 'A',
            templateUrl: './directives/mapDirective.html',
            replace: true
        }
    });
};
