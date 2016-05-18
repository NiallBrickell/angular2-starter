/* */ 
"use strict";
var test_injector_1 = require('./test_injector');
var lang_1 = require('../src/facade/lang');
var test_injector_2 = require('./test_injector');
exports.inject = test_injector_2.inject;
exports.async = test_injector_2.async;
exports.injectAsync = test_injector_2.injectAsync;
var _global = (typeof window === 'undefined' ? global : window);
exports.expect = _global.expect;
exports.afterEach = _global.afterEach;
exports.describe = _global.describe;
exports.ddescribe = _global.fdescribe;
exports.fdescribe = _global.fdescribe;
exports.xdescribe = _global.xdescribe;
var jsmBeforeEach = _global.beforeEach;
var jsmIt = _global.it;
var jsmIIt = _global.fit;
var jsmXIt = _global.xit;
var testInjector = test_injector_1.getTestInjector();
jsmBeforeEach(function() {
  testInjector.reset();
});
function beforeEachProviders(fn) {
  jsmBeforeEach(function() {
    var providers = fn();
    if (!providers)
      return;
    try {
      testInjector.addProviders(providers);
    } catch (e) {
      throw new Error('beforeEachProviders was called after the injector had ' + 'been used in a beforeEach or it block. This invalidates the ' + 'test injector');
    }
  });
}
exports.beforeEachProviders = beforeEachProviders;
function _wrapTestFn(fn) {
  return function(done) {
    if (fn.length === 0) {
      var retVal = fn();
      if (lang_1.isPromise(retVal)) {
        retVal.then(done, done.fail);
      } else {
        done();
      }
    } else {
      fn(done);
    }
  };
}
function _it(jsmFn, name, testFn, testTimeOut) {
  jsmFn(name, _wrapTestFn(testFn), testTimeOut);
}
function beforeEach(fn) {
  jsmBeforeEach(_wrapTestFn(fn));
}
exports.beforeEach = beforeEach;
function it(name, fn, timeOut) {
  if (timeOut === void 0) {
    timeOut = null;
  }
  return _it(jsmIt, name, fn, timeOut);
}
exports.it = it;
function xit(name, fn, timeOut) {
  if (timeOut === void 0) {
    timeOut = null;
  }
  return _it(jsmXIt, name, fn, timeOut);
}
exports.xit = xit;
function iit(name, fn, timeOut) {
  if (timeOut === void 0) {
    timeOut = null;
  }
  return _it(jsmIIt, name, fn, timeOut);
}
exports.iit = iit;
function fit(name, fn, timeOut) {
  if (timeOut === void 0) {
    timeOut = null;
  }
  return _it(jsmIIt, name, fn, timeOut);
}
exports.fit = fit;
