/* */ 
"use strict";
var application_tokens_1 = require('./application_tokens');
var application_ref_1 = require('./application_ref');
var change_detection_1 = require('./change_detection/change_detection');
var view_utils_1 = require('./linker/view_utils');
var component_resolver_1 = require('./linker/component_resolver');
var dynamic_component_loader_1 = require('./linker/dynamic_component_loader');
var __unused;
exports.APPLICATION_COMMON_PROVIDERS = [application_ref_1.APPLICATION_CORE_PROVIDERS, {
  provide: component_resolver_1.ComponentResolver,
  useClass: component_resolver_1.ReflectorComponentResolver
}, application_tokens_1.APP_ID_RANDOM_PROVIDER, view_utils_1.ViewUtils, {
  provide: change_detection_1.IterableDiffers,
  useValue: change_detection_1.defaultIterableDiffers
}, {
  provide: change_detection_1.KeyValueDiffers,
  useValue: change_detection_1.defaultKeyValueDiffers
}, {
  provide: dynamic_component_loader_1.DynamicComponentLoader,
  useClass: dynamic_component_loader_1.DynamicComponentLoader_
}];
