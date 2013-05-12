// This file is config/karma.conf.js.
// Base path, that will be used to resolve files
// (in this case is the root of the project)
basePath = '../';

// list files/patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,

  // !! Put all libs in RequireJS 'paths' config here (included: false).
  // All these files are files that are needed for the tests to run,
  // but Karma is being told explicitly to avoid loading them, as they
  // will be loaded by RequireJS when the main module is loaded.

  // all the sources, tests  // !! all src and test modules (included: false)
  {pattern: 'app/scripts/vendor/*.js', included: false},
  {pattern: 'app/scripts/services/*.js', included: false},
  {pattern: 'test/spec/services/*.js', included: false},

  // !! test main require module last
  'test/spec/main.js'
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

// enable/disable colors in the output (reporters and logs)
colors = true;

// level of logging
logLevel = LOG_INFO;

// enable/disable watching file and executing tests whenever any file changes
autoWatch = true;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari
// - PhantomJS
// - IE if you have a windows box
browsers = ['Chrome'];

// Continuous Integration mode
// if true, it captures browsers, runs tests, and exits
singleRun = false;
