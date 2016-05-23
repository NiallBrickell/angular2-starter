// 
module.exports = function(config) {
  var dependencies = require('./package.json').dependencies;
  var excludedDependencies = [
    'systemjs', 'zone.js', 'font-awesome'
  ];
  var configuration = {
  	baseURL: '',
    basePath: '',

    frameworks: ['jspm', 'jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],

    preprocessors: {
      'build_dev/app/**/!(*.spec)+(.js)': ['coverage'],
      '**/*.js': ['sourcemap']
    },

    // Generate json used for remap-istanbul
    coverageReporter: {
      dir: 'report/',
      reporters: [
        { type: 'json', subdir: 'report-json' }
      ]
    },

    jspm: {
    	config: '/build_dev/config.js',
    	packages: '/build_dev/jspm_packages/',
    	loadFiles: [
	    	'karma-test-shim.js',
    		'test_js/test-helpers/setup.js',
    		'test_js/!(e2e)/**/*.js'
    	],
    	serveFiles: [
    		'build_dev/app/**/*.*',
    		'build_dev/jspm_packages/**/*.map',
    		'build_dev/*.*'
    	]
    },

    files: [
    	// { pattern: 'test_js/!(e2e)/*.js', included: true, watched: false, served: true},
		// paths to support debugging with source maps in dev tools
		{ pattern: 'client/**/*.ts', included: false, watched: false},
		{ pattern: 'client/**/*.js.map', included: false, watched: false}
    ],

    // proxied base paths
    proxies: {
      "/build_dev/jspm_packages/": "/base/build_dev/jspm_packages/",
      "/jspm_packages/": "/base/build_dev/jspm_packages/",

      "/test_js/": "/base/test_js/",

      "/karma-test-shim.js": "/base/karma-test-shim.js",

      "/client/": "/base/build_dev/",

      "/build_dev/app/": "/base/build_dev/app/",
      "/app/": "/base/build_dev/app/"
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true
  };

  if (process.env.APPVEYOR) {
    configuration.browsers = ['IE'];
    configuration.singleRun = true;
    configuration.browserNoActivityTimeout = 90000; // Note: default value (10000) is not enough
  }

  config.set(configuration);
}
