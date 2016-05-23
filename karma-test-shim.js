// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit=Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded - NOTE: jasmine does this for us!
__karma__.loaded = function() {};

//Zone
var zone = require('zone.js');
var zone_async = require('zone.js/dist/async-test.js');
var zone_fasync = require('zone.js/dist/fake-async-test.js');

System.import('test_js/test-helpers/setup')
.then(function() {
    return Promise.all(
        Object.keys(window.__karma__.files)
        .filter(onlySpecFiles)
        .map(file2moduleName)
        .map(importModules)
    );
})
.then(function() {
    // __karma__.start();
}, function(error) {
	throw new Error(error);
    __karma__.error(error.name + ": " + error.message);
});

// Filter spec files
function onlySpecFiles(path) {
  return /\.spec\.js$/.test(path);
}

// Normalize paths to module names.
function file2moduleName(filePath) {
  return filePath.replace(/\\/g, '/')
    .replace(/^\/base\//, '')
    .replace(/\.js/, '');
}

// Import module path
function importModules(path) {
	console.log(path);
    return System.import(path);
}
