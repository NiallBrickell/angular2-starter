module.exports = function(config) {
  var dependencies = require('./package.json').dependencies;
  var excludedDependencies = [
    'systemjs', 'zone.js', 'font-awesome', 'bootswatch'
  ];
  var configuration = {
    basePath: '',

    frameworks: ['jspm', 'jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],

    preprocessors: {
      'build_dev/app/**/!(*.spec)+(.js)': ['coverage'],
      'build_dev/app/**/*.js': ['sourcemap']
    },

    // Generate json used for remap-istanbul
    coverageReporter: {
      dir: 'report/',
      reporters: [
        { type: 'json', subdir: 'report-json' }
      ]
    },

    jspm: {
    	config: 'build_dev/config.js',
    	packages: 'build_dev/jspm_packages',
    	loadFiles: [
    		'test_js/**/*.js',
	    	'karma-test-shim.js'
    	],
    	sourceFiles: [
    		'build_dev/**/*.js',
    		'client/**/*.js'
    		//'node_modules/**/*.js'
    	]
    },

    // files: [
    //   // paths to support debugging with source maps in dev tools
    //   { pattern: 'client/**/*.ts', included: false, watched: false},
    //   { pattern: 'client/**/*.js.map', included: false, watched: false}
    // ],

    // proxied base paths
    proxies: {
      // required for component assests fetched by Angular's compiler
      // rootOnLocal : /base/ServeLocation
      // As Karma serves everything from base, so we need to map the dirs from . (hs/frontend/) to it's serve location (/base)
      // "/build_dev/": "/base/", //TODO: WHY NOT WORKING
      // "/build_dev/": "/base/client/", //NOTE: THIS might say /client/.. cannot be found - but it doesn't mean build_dev isn't mapping to client! Maybe try include a file at the root of build_dev / client in a test file and see if ALL the sub-dirs are proxies or just the files in the specified folder, ie:
      // "/build_dev/app/": "/base/client/app/",
      // "/build_dev/app/blocks/": "/base/client/app/blocks/",

      "/base/jspm_packages/": "/build_dev/jspm_packages/",
      // "/base/client/": "/client/", //TODO: Or other way around? (and above)
      //with this? :
      "/build_dev/": "/base/",
      // "/base/client/": "/base/", //TODO: NEED ALIAS!! Can this be done with proxy?? Or is the error we're getting strange and it's not really there? YES!!!!! JS IS NOT IN CLIENT!!!! NEW!!!!!********* Need to alias client to jspm packages! should be /build_dev but doesn't seem to like two paths in proxy (old /client/: /base/client/. Does redirecting (if it is at all) /base/client to /base (/ the other way rouhd - need to figure out how it works) work?? Or does it just freeze it? Yes, it just freezes it. Does it work differently redirecting base to base/something? DOES THIS JUST CAUSE LOOPS??
      //OR::
      "/build_dev/app/": "/base/client/app" //DOES THIS JUST LOOP AND BREAK EVERYTHING? TRY SEE IF WE GET SOCKET ERRORS WITH IT TAKEN OUT!

      // "/build_dev/app/": "/base/app/",
      // "/build_dev/jspm_packages/": "/base/jspm_packages/"
      // "/jspm_packages/": "/base/jspm_packages/",
      // "/node_modules/": "/base/node_modules/",
      // "/test_js/": "/base/test_js/",
      // "client/": "build_dev/"
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: false, //DEV
  };

  // Object.keys(dependencies).forEach(function(key) {
  //   if(excludedDependencies.indexOf(key) >= 0) { return; }

  //   configuration.files.push({
  //       pattern: 'node_modules/' + key + '/**/*.js',
  //       included: false,
  //       watched: false
  //   });
  // });

  if (process.env.APPVEYOR) {
    configuration.browsers = ['IE'];
    configuration.singleRun = true;
    configuration.browserNoActivityTimeout = 90000; // Note: default value (10000) is not enough
  }

  config.set(configuration);
}
