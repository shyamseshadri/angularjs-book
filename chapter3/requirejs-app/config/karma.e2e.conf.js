// base path, that will be used to resolve files
// (in this case is the root of the project
basePath = '../';

// list of files / patterns to load in the browser
files = [
  'test/vendor/angular-scenario.js',
  ANGULAR_SCENARIO_ADAPTER,
  'test/e2e/*.js'
];

// list of files to exclude
exclude = [];

// test results reporter to use
// possible values: dots || progress
reporter = 'progress';

// web server port
port = 8989;

// cli runner port
runnerPort = 9898;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;

urlRoot = '/_karma_/';

proxies = {
  '/': 'http://localhost:8000/'
};

// Start these browsers, currently available:
browsers = ['Chrome'];

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
