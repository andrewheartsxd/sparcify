
module.exports = function(config) {
		config.set({

		basePath: '',

		frameworks: ['jasmine'],

		files: [
		'test/client_test/karma_test_bundle.js'
		],

		exclude: [
		],

		preprocessors: {
		},
		reporters: ['progress'],
		port: 9876,
		colors: true,

		logLevel: config.LOG_INFO,

		autoWatch: false,

		browsers: ['PhantomJS'],

		singleRun: true
	});
};
