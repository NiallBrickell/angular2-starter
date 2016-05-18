/* */ 
"use strict";
var core_1 = require('@angular/core');
var async_1 = require('../facade/async');
var location_strategy_1 = require('./location_strategy');
var Location = (function() {
  function Location(platformStrategy) {
    var _this = this;
    this.platformStrategy = platformStrategy;
    this._subject = new async_1.EventEmitter();
    var browserBaseHref = this.platformStrategy.getBaseHref();
    this._baseHref = Location.stripTrailingSlash(_stripIndexHtml(browserBaseHref));
    this.platformStrategy.onPopState(function(ev) {
      async_1.ObservableWrapper.callEmit(_this._subject, {
        'url': _this.path(),
        'pop': true,
        'type': ev.type
      });
    });
  }
  Location.prototype.path = function() {
    return this.normalize(this.platformStrategy.path());
  };
  Location.prototype.normalize = function(url) {
    return Location.stripTrailingSlash(_stripBaseHref(this._baseHref, _stripIndexHtml(url)));
  };
  Location.prototype.prepareExternalUrl = function(url) {
    if (url.length > 0 && !url.startsWith('/')) {
      url = '/' + url;
    }
    return this.platformStrategy.prepareExternalUrl(url);
  };
  Location.prototype.go = function(path, query) {
    if (query === void 0) {
      query = '';
    }
    this.platformStrategy.pushState(null, '', path, query);
  };
  Location.prototype.replaceState = function(path, query) {
    if (query === void 0) {
      query = '';
    }
    this.platformStrategy.replaceState(null, '', path, query);
  };
  Location.prototype.forward = function() {
    this.platformStrategy.forward();
  };
  Location.prototype.back = function() {
    this.platformStrategy.back();
  };
  Location.prototype.subscribe = function(onNext, onThrow, onReturn) {
    if (onThrow === void 0) {
      onThrow = null;
    }
    if (onReturn === void 0) {
      onReturn = null;
    }
    return async_1.ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
  };
  Location.normalizeQueryParams = function(params) {
    return (params.length > 0 && params.substring(0, 1) != '?') ? ('?' + params) : params;
  };
  Location.joinWithSlash = function(start, end) {
    if (start.length == 0) {
      return end;
    }
    if (end.length == 0) {
      return start;
    }
    var slashes = 0;
    if (start.endsWith('/')) {
      slashes++;
    }
    if (end.startsWith('/')) {
      slashes++;
    }
    if (slashes == 2) {
      return start + end.substring(1);
    }
    if (slashes == 1) {
      return start + end;
    }
    return start + '/' + end;
  };
  Location.stripTrailingSlash = function(url) {
    if (/\/$/g.test(url)) {
      url = url.substring(0, url.length - 1);
    }
    return url;
  };
  Location.decorators = [{type: core_1.Injectable}];
  Location.ctorParameters = [{type: location_strategy_1.LocationStrategy}];
  return Location;
}());
exports.Location = Location;
function _stripBaseHref(baseHref, url) {
  if (baseHref.length > 0 && url.startsWith(baseHref)) {
    return url.substring(baseHref.length);
  }
  return url;
}
function _stripIndexHtml(url) {
  if (/\/index.html$/g.test(url)) {
    return url.substring(0, url.length - 11);
  }
  return url;
}
