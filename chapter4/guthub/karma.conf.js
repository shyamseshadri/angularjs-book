// Testacular configuration

module.exports = function (config) {
  config.set({

	// base path, that will be used to resolve files and exclude
	basePath : '',

    // Fix for "JASMINE is not supported anymore" warning
    frameworks : ["jasmine"],

	// list of files / patterns to load in the browser
	files : [
	  'app/scripts/vendor/angular.min.js',
	  'app/scripts/vendor/angular-resource.min.js',
	  'test/vendor/angular-mocks.js',
	  'app/scripts/controllers/*.js',
	  'app/scripts/services/*.js',
	  'app/scripts/directives/*.js',
	  'test/spec/*.js'
	],


	// list of files to exclude
	exclude : [

	],


	// test results reporter to use
	// possible values: 'dots', 'progress', 'junit'
	reporters : ['progress'],


	// web server port
	port : 8080,


	// cli runner port
	runnerPort : 9100,


	// enable / disable colors in the output (reporters and logs)
	colors : true,


	// level of logging
	// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
	logLevel : config.LOG_INFO,


	// enable / disable watching file and executing tests whenever any file changes
	autoWatch : true,


	// Start these browsers, currently available:
	// - Chrome
	// - ChromeCanary
	// - Firefox
	// - Opera
	// - Safari (only Mac)
	// - PhantomJS
	// - IE (only Windows)
	browsers : ['Chrome'],


	// If browser does not capture in given timeout [ms], kill it
	captureTimeout : 5000,


	// Continuous Integration mode
	// if true, it capture browsers, run tests and exit
	singleRun : false
 
  });
}