/* */ 
"use strict";
var testing_1 = require('@angular/platform-browser/testing');
var index_1 = require('../index');
exports.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = [testing_1.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS];
exports.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS = [index_1.BROWSER_APP_DYNAMIC_PROVIDERS, testing_1.ADDITIONAL_TEST_BROWSER_PROVIDERS];
