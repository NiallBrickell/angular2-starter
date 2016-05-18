/* */ 
"use strict";
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require('./facade/lang');
var headers_1 = require('./headers');
var enums_1 = require('./enums');
var core_1 = require('@angular/core');
var url_search_params_1 = require('./url_search_params');
var http_utils_1 = require('./http_utils');
var RequestOptions = (function() {
  function RequestOptions(_a) {
    var _b = _a === void 0 ? {} : _a,
        method = _b.method,
        headers = _b.headers,
        body = _b.body,
        url = _b.url,
        search = _b.search;
    this.method = lang_1.isPresent(method) ? http_utils_1.normalizeMethodName(method) : null;
    this.headers = lang_1.isPresent(headers) ? headers : null;
    this.body = lang_1.isPresent(body) ? body : null;
    this.url = lang_1.isPresent(url) ? url : null;
    this.search = lang_1.isPresent(search) ? (lang_1.isString(search) ? new url_search_params_1.URLSearchParams((search)) : (search)) : null;
  }
  RequestOptions.prototype.merge = function(options) {
    return new RequestOptions({
      method: lang_1.isPresent(options) && lang_1.isPresent(options.method) ? options.method : this.method,
      headers: lang_1.isPresent(options) && lang_1.isPresent(options.headers) ? options.headers : this.headers,
      body: lang_1.isPresent(options) && lang_1.isPresent(options.body) ? options.body : this.body,
      url: lang_1.isPresent(options) && lang_1.isPresent(options.url) ? options.url : this.url,
      search: lang_1.isPresent(options) && lang_1.isPresent(options.search) ? (lang_1.isString(options.search) ? new url_search_params_1.URLSearchParams((options.search)) : (options.search).clone()) : this.search
    });
  };
  return RequestOptions;
}());
exports.RequestOptions = RequestOptions;
var BaseRequestOptions = (function(_super) {
  __extends(BaseRequestOptions, _super);
  function BaseRequestOptions() {
    _super.call(this, {
      method: enums_1.RequestMethod.Get,
      headers: new headers_1.Headers()
    });
  }
  BaseRequestOptions.decorators = [{type: core_1.Injectable}];
  BaseRequestOptions.ctorParameters = [];
  return BaseRequestOptions;
}(RequestOptions));
exports.BaseRequestOptions = BaseRequestOptions;
