/* */ 
"use strict";
var core_1 = require('@angular/core');
var async_1 = require('../src/facade/async');
var SpyLocation = (function() {
  function SpyLocation() {
    this.urlChanges = [];
    this._path = '';
    this._query = '';
    this._subject = new core_1.EventEmitter();
    this._baseHref = '';
    this.platformStrategy = null;
  }
  SpyLocation.prototype.setInitialPath = function(url) {
    this._path = url;
  };
  SpyLocation.prototype.setBaseHref = function(url) {
    this._baseHref = url;
  };
  SpyLocation.prototype.path = function() {
    return this._path;
  };
  SpyLocation.prototype.simulateUrlPop = function(pathname) {
    async_1.ObservableWrapper.callEmit(this._subject, {
      'url': pathname,
      'pop': true
    });
  };
  SpyLocation.prototype.simulateHashChange = function(pathname) {
    this.setInitialPath(pathname);
    this.urlChanges.push('hash: ' + pathname);
    async_1.ObservableWrapper.callEmit(this._subject, {
      'url': pathname,
      'pop': true,
      'type': 'hashchange'
    });
  };
  SpyLocation.prototype.prepareExternalUrl = function(url) {
    if (url.length > 0 && !url.startsWith('/')) {
      url = '/' + url;
    }
    return this._baseHref + url;
  };
  SpyLocation.prototype.go = function(path, query) {
    if (query === void 0) {
      query = '';
    }
    path = this.prepareExternalUrl(path);
    if (this._path == path && this._query == query) {
      return;
    }
    this._path = path;
    this._query = query;
    var url = path + (query.length > 0 ? ('?' + query) : '');
    this.urlChanges.push(url);
  };
  SpyLocation.prototype.replaceState = function(path, query) {
    if (query === void 0) {
      query = '';
    }
    path = this.prepareExternalUrl(path);
    this._path = path;
    this._query = query;
    var url = path + (query.length > 0 ? ('?' + query) : '');
    this.urlChanges.push('replace: ' + url);
  };
  SpyLocation.prototype.forward = function() {};
  SpyLocation.prototype.back = function() {};
  SpyLocation.prototype.subscribe = function(onNext, onThrow, onReturn) {
    if (onThrow === void 0) {
      onThrow = null;
    }
    if (onReturn === void 0) {
      onReturn = null;
    }
    return async_1.ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
  };
  SpyLocation.prototype.normalize = function(url) {
    return null;
  };
  SpyLocation.decorators = [{type: core_1.Injectable}];
  return SpyLocation;
}());
exports.SpyLocation = SpyLocation;
