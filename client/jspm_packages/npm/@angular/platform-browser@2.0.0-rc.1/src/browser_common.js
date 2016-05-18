/* */ 
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var common_1 = require('@angular/common');
var dom_sanitization_service_1 = require('./security/dom_sanitization_service');
var lang_1 = require('./facade/lang');
var browser_adapter_1 = require('./browser/browser_adapter');
var testability_1 = require('./browser/testability');
var dom_adapter_1 = require('./dom/dom_adapter');
var dom_tokens_1 = require('./dom/dom_tokens');
var event_manager_1 = require('./dom/events/event_manager');
var dom_renderer_1 = require('./dom/dom_renderer');
var shared_styles_host_1 = require('./dom/shared_styles_host');
var key_events_1 = require('./dom/events/key_events');
var ng_probe_1 = require('./dom/debug/ng_probe');
var dom_events_1 = require('./dom/events/dom_events');
var hammer_gestures_1 = require('./dom/events/hammer_gestures');
var shared_styles_host_2 = require('./dom/shared_styles_host');
var animation_builder_1 = require('./animate/animation_builder');
var browser_details_1 = require('./animate/browser_details');
var title_1 = require('./browser/title');
exports.Title = title_1.Title;
var browser_adapter_2 = require('./browser/browser_adapter');
exports.BrowserDomAdapter = browser_adapter_2.BrowserDomAdapter;
var tools_1 = require('./browser/tools/tools');
exports.enableDebugTools = tools_1.enableDebugTools;
exports.disableDebugTools = tools_1.disableDebugTools;
var by_1 = require('./dom/debug/by');
exports.By = by_1.By;
exports.BROWSER_PLATFORM_MARKER = new core_1.OpaqueToken('BrowserPlatformMarker');
exports.BROWSER_PROVIDERS = [{
  provide: exports.BROWSER_PLATFORM_MARKER,
  useValue: true
}, core_1.PLATFORM_COMMON_PROVIDERS, {
  provide: core_1.PLATFORM_INITIALIZER,
  useValue: initDomAdapter,
  multi: true
}];
function _exceptionHandler() {
  return new core_1.ExceptionHandler(dom_adapter_1.getDOM(), !lang_1.IS_DART);
}
function _document() {
  return dom_adapter_1.getDOM().defaultDoc();
}
exports.BROWSER_SANITIZATION_PROVIDERS = [{
  provide: core_private_1.SanitizationService,
  useExisting: dom_sanitization_service_1.DomSanitizationService
}, {
  provide: dom_sanitization_service_1.DomSanitizationService,
  useClass: dom_sanitization_service_1.DomSanitizationServiceImpl
}];
exports.BROWSER_APP_COMMON_PROVIDERS = [core_1.APPLICATION_COMMON_PROVIDERS, common_1.FORM_PROVIDERS, exports.BROWSER_SANITIZATION_PROVIDERS, {
  provide: core_1.PLATFORM_PIPES,
  useValue: common_1.COMMON_PIPES,
  multi: true
}, {
  provide: core_1.PLATFORM_DIRECTIVES,
  useValue: common_1.COMMON_DIRECTIVES,
  multi: true
}, {
  provide: core_1.ExceptionHandler,
  useFactory: _exceptionHandler,
  deps: []
}, {
  provide: dom_tokens_1.DOCUMENT,
  useFactory: _document,
  deps: []
}, {
  provide: event_manager_1.EVENT_MANAGER_PLUGINS,
  useClass: dom_events_1.DomEventsPlugin,
  multi: true
}, {
  provide: event_manager_1.EVENT_MANAGER_PLUGINS,
  useClass: key_events_1.KeyEventsPlugin,
  multi: true
}, {
  provide: event_manager_1.EVENT_MANAGER_PLUGINS,
  useClass: hammer_gestures_1.HammerGesturesPlugin,
  multi: true
}, {
  provide: hammer_gestures_1.HAMMER_GESTURE_CONFIG,
  useClass: hammer_gestures_1.HammerGestureConfig
}, {
  provide: dom_renderer_1.DomRootRenderer,
  useClass: dom_renderer_1.DomRootRenderer_
}, {
  provide: core_1.RootRenderer,
  useExisting: dom_renderer_1.DomRootRenderer
}, {
  provide: shared_styles_host_1.SharedStylesHost,
  useExisting: shared_styles_host_2.DomSharedStylesHost
}, shared_styles_host_2.DomSharedStylesHost, core_1.Testability, browser_details_1.BrowserDetails, animation_builder_1.AnimationBuilder, event_manager_1.EventManager, ng_probe_1.ELEMENT_PROBE_PROVIDERS];
var hammer_gestures_2 = require('./dom/events/hammer_gestures');
exports.HAMMER_GESTURE_CONFIG = hammer_gestures_2.HAMMER_GESTURE_CONFIG;
exports.HammerGestureConfig = hammer_gestures_2.HammerGestureConfig;
function initDomAdapter() {
  browser_adapter_1.BrowserDomAdapter.makeCurrent();
  core_private_1.wtfInit();
  testability_1.BrowserGetTestability.init();
}
exports.initDomAdapter = initDomAdapter;
