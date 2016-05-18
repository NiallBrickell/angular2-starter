/* */ 
"use strict";
var core_1 = require('@angular/core');
var compiler_1 = require('@angular/compiler');
var browser_common_1 = require('../src/browser_common');
var browser_adapter_1 = require('../src/browser/browser_adapter');
var animation_builder_1 = require('../src/animate/animation_builder');
var animation_builder_mock_1 = require('./animation_builder_mock');
var testing_1 = require('@angular/compiler/testing');
var testing_2 = require('@angular/compiler/testing');
var testing_3 = require('@angular/common/testing');
var common_1 = require('@angular/common');
var testing_4 = require('@angular/core/testing');
var testing_5 = require('@angular/compiler/testing');
var browser_util_1 = require('./browser_util');
var testing_6 = require('@angular/core/testing');
var ng_probe_1 = require('../src/dom/debug/ng_probe');
var testing_7 = require('@angular/compiler/testing');
var dom_test_component_renderer_1 = require('./dom_test_component_renderer');
var lang_1 = require('../src/facade/lang');
function initBrowserTests() {
  browser_adapter_1.BrowserDomAdapter.makeCurrent();
  browser_util_1.BrowserDetection.setup();
}
function createNgZone() {
  return lang_1.IS_DART ? new testing_4.MockNgZone() : new core_1.NgZone({enableLongStackTrace: true});
}
var testing_8 = require('@angular/compiler/testing');
exports.TestComponentRenderer = testing_8.TestComponentRenderer;
exports.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS = [core_1.PLATFORM_COMMON_PROVIDERS, {
  provide: core_1.PLATFORM_INITIALIZER,
  useValue: initBrowserTests,
  multi: true
}];
exports.ADDITIONAL_TEST_BROWSER_PROVIDERS = [{
  provide: core_1.APP_ID,
  useValue: 'a'
}, ng_probe_1.ELEMENT_PROBE_PROVIDERS, {
  provide: compiler_1.DirectiveResolver,
  useClass: testing_1.MockDirectiveResolver
}, {
  provide: compiler_1.ViewResolver,
  useClass: testing_2.MockViewResolver
}, testing_6.Log, testing_5.TestComponentBuilder, {
  provide: core_1.NgZone,
  useFactory: createNgZone
}, {
  provide: common_1.LocationStrategy,
  useClass: testing_3.MockLocationStrategy
}, {
  provide: animation_builder_1.AnimationBuilder,
  useClass: animation_builder_mock_1.MockAnimationBuilder
}, {
  provide: testing_7.TestComponentRenderer,
  useClass: dom_test_component_renderer_1.DOMTestComponentRenderer
}];
exports.TEST_BROWSER_STATIC_APPLICATION_PROVIDERS = [browser_common_1.BROWSER_APP_COMMON_PROVIDERS, exports.ADDITIONAL_TEST_BROWSER_PROVIDERS];
