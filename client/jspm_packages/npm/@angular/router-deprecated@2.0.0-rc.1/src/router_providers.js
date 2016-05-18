/* */ 
"use strict";
var router_providers_common_1 = require('./router_providers_common');
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
exports.ROUTER_PROVIDERS = [router_providers_common_1.ROUTER_PROVIDERS_COMMON, ({
  provide: common_1.PlatformLocation,
  useClass: platform_browser_1.BrowserPlatformLocation
})];
exports.ROUTER_BINDINGS = exports.ROUTER_PROVIDERS;
