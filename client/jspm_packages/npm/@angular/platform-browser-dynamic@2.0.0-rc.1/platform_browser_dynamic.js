/* */ 
(function(process) {
  "use strict";
  var compiler_1 = require('@angular/compiler');
  var xhr_cache_1 = require('./src/xhr/xhr_cache');
  var lang_1 = require('./src/facade/lang');
  var xhr_impl_1 = require('./src/xhr/xhr_impl');
  var platform_browser_1 = require('@angular/platform-browser');
  var core_1 = require('@angular/core');
  var core_private_1 = require('./core_private');
  exports.CACHED_TEMPLATE_PROVIDER = [{
    provide: compiler_1.XHR,
    useClass: xhr_cache_1.CachedXHR
  }];
  exports.BROWSER_APP_DYNAMIC_PROVIDERS = [platform_browser_1.BROWSER_APP_COMMON_PROVIDERS, compiler_1.COMPILER_PROVIDERS, {
    provide: compiler_1.XHR,
    useClass: xhr_impl_1.XHRImpl
  }];
  function bootstrap(appComponentType, customProviders) {
    core_1.reflector.reflectionCapabilities = new core_private_1.ReflectionCapabilities();
    var appInjector = core_1.ReflectiveInjector.resolveAndCreate([exports.BROWSER_APP_DYNAMIC_PROVIDERS, lang_1.isPresent(customProviders) ? customProviders : []], platform_browser_1.browserPlatform().injector);
    return core_1.coreLoadAndBootstrap(appInjector, appComponentType);
  }
  exports.bootstrap = bootstrap;
})(require('process'));
