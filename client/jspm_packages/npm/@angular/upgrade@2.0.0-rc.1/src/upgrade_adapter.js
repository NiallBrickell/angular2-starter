/* */ 
"use strict";
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var platform_browser_1 = require('@angular/platform-browser');
var metadata_1 = require('./metadata');
var util_1 = require('./util');
var constants_1 = require('./constants');
var downgrade_ng2_adapter_1 = require('./downgrade_ng2_adapter');
var upgrade_ng1_adapter_1 = require('./upgrade_ng1_adapter');
var angular = require('./angular_js');
var upgradeCount = 0;
var UpgradeAdapter = (function() {
  function UpgradeAdapter() {
    this.idPrefix = "NG2_UPGRADE_" + upgradeCount++ + "_";
    this.upgradedComponents = [];
    this.downgradedComponents = {};
    this.providers = [];
  }
  UpgradeAdapter.prototype.downgradeNg2Component = function(type) {
    this.upgradedComponents.push(type);
    var info = metadata_1.getComponentInfo(type);
    return ng1ComponentDirective(info, "" + this.idPrefix + info.selector + "_c");
  };
  UpgradeAdapter.prototype.upgradeNg1Component = function(name) {
    if (this.downgradedComponents.hasOwnProperty(name)) {
      return this.downgradedComponents[name].type;
    } else {
      return (this.downgradedComponents[name] = new upgrade_ng1_adapter_1.UpgradeNg1ComponentAdapterBuilder(name)).type;
    }
  };
  UpgradeAdapter.prototype.bootstrap = function(element, modules, config) {
    var _this = this;
    var upgrade = new UpgradeAdapterRef();
    var ng1Injector = null;
    var platformRef = platform_browser_1.browserPlatform();
    var applicationRef = core_1.ReflectiveInjector.resolveAndCreate([platform_browser_dynamic_1.BROWSER_APP_DYNAMIC_PROVIDERS, core_1.provide(constants_1.NG1_INJECTOR, {useFactory: function() {
        return ng1Injector;
      }}), core_1.provide(constants_1.NG1_COMPILE, {useFactory: function() {
        return ng1Injector.get(constants_1.NG1_COMPILE);
      }}), this.providers], platformRef.injector).get(core_1.ApplicationRef);
    var injector = applicationRef.injector;
    var ngZone = injector.get(core_1.NgZone);
    var compiler = injector.get(core_1.ComponentResolver);
    var delayApplyExps = [];
    var original$applyFn;
    var rootScopePrototype;
    var rootScope;
    var componentFactoryRefMap = {};
    var ng1Module = angular.module(this.idPrefix, modules);
    var ng1BootstrapPromise = null;
    var ng1compilePromise = null;
    ng1Module.value(constants_1.NG2_INJECTOR, injector).value(constants_1.NG2_ZONE, ngZone).value(constants_1.NG2_COMPILER, compiler).value(constants_1.NG2_COMPONENT_FACTORY_REF_MAP, componentFactoryRefMap).config(['$provide', function(provide) {
      provide.decorator(constants_1.NG1_ROOT_SCOPE, ['$delegate', function(rootScopeDelegate) {
        rootScopePrototype = rootScopeDelegate.constructor.prototype;
        if (rootScopePrototype.hasOwnProperty('$apply')) {
          original$applyFn = rootScopePrototype.$apply;
          rootScopePrototype.$apply = function(exp) {
            return delayApplyExps.push(exp);
          };
        } else {
          throw new Error("Failed to find '$apply' on '$rootScope'!");
        }
        return rootScope = rootScopeDelegate;
      }]);
      provide.decorator(constants_1.NG1_TESTABILITY, ['$delegate', function(testabilityDelegate) {
        var _this = this;
        var ng2Testability = injector.get(core_1.Testability);
        var origonalWhenStable = testabilityDelegate.whenStable;
        var newWhenStable = function(callback) {
          var whenStableContext = _this;
          origonalWhenStable.call(_this, function() {
            if (ng2Testability.isStable()) {
              callback.apply(this, arguments);
            } else {
              ng2Testability.whenStable(newWhenStable.bind(whenStableContext, callback));
            }
          });
        };
        testabilityDelegate.whenStable = newWhenStable;
        return testabilityDelegate;
      }]);
    }]);
    ng1compilePromise = new Promise(function(resolve, reject) {
      ng1Module.run(['$injector', '$rootScope', function(injector, rootScope) {
        ng1Injector = injector;
        ngZone.onMicrotaskEmpty.subscribe({next: function(_) {
            return ngZone.runOutsideAngular(function() {
              return rootScope.$apply();
            });
          }});
        upgrade_ng1_adapter_1.UpgradeNg1ComponentAdapterBuilder.resolve(_this.downgradedComponents, injector).then(resolve, reject);
      }]);
    });
    var windowAngular = window['angular'];
    windowAngular.resumeBootstrap = undefined;
    angular.element(element).data(util_1.controllerKey(constants_1.NG2_INJECTOR), injector);
    ngZone.run(function() {
      angular.bootstrap(element, [_this.idPrefix], config);
    });
    ng1BootstrapPromise = new Promise(function(resolve, reject) {
      if (windowAngular.resumeBootstrap) {
        var originalResumeBootstrap = windowAngular.resumeBootstrap;
        windowAngular.resumeBootstrap = function() {
          windowAngular.resumeBootstrap = originalResumeBootstrap;
          windowAngular.resumeBootstrap.apply(this, arguments);
          resolve();
        };
      } else {
        resolve();
      }
    });
    Promise.all([this.compileNg2Components(compiler, componentFactoryRefMap), ng1BootstrapPromise, ng1compilePromise]).then(function() {
      ngZone.run(function() {
        if (rootScopePrototype) {
          rootScopePrototype.$apply = original$applyFn;
          while (delayApplyExps.length) {
            rootScope.$apply(delayApplyExps.shift());
          }
          upgrade._bootstrapDone(applicationRef, ng1Injector);
          rootScopePrototype = null;
        }
      });
    }, util_1.onError);
    return upgrade;
  };
  UpgradeAdapter.prototype.addProvider = function(provider) {
    this.providers.push(provider);
  };
  UpgradeAdapter.prototype.upgradeNg1Provider = function(name, options) {
    var token = options && options.asToken || name;
    this.providers.push(core_1.provide(token, {
      useFactory: function(ng1Injector) {
        return ng1Injector.get(name);
      },
      deps: [constants_1.NG1_INJECTOR]
    }));
  };
  UpgradeAdapter.prototype.downgradeNg2Provider = function(token) {
    var factory = function(injector) {
      return injector.get(token);
    };
    factory.$inject = [constants_1.NG2_INJECTOR];
    return factory;
  };
  UpgradeAdapter.prototype.compileNg2Components = function(compiler, componentFactoryRefMap) {
    var _this = this;
    var promises = [];
    var types = this.upgradedComponents;
    for (var i = 0; i < types.length; i++) {
      promises.push(compiler.resolveComponent(types[i]));
    }
    return Promise.all(promises).then(function(componentFactories) {
      var types = _this.upgradedComponents;
      for (var i = 0; i < componentFactories.length; i++) {
        componentFactoryRefMap[metadata_1.getComponentInfo(types[i]).selector] = componentFactories[i];
      }
      return componentFactoryRefMap;
    }, util_1.onError);
  };
  return UpgradeAdapter;
}());
exports.UpgradeAdapter = UpgradeAdapter;
function ng1ComponentDirective(info, idPrefix) {
  directiveFactory.$inject = [constants_1.NG2_COMPONENT_FACTORY_REF_MAP, constants_1.NG1_PARSE];
  function directiveFactory(componentFactoryRefMap, parse) {
    var componentFactory = componentFactoryRefMap[info.selector];
    if (!componentFactory)
      throw new Error('Expecting ComponentFactory for: ' + info.selector);
    var idCount = 0;
    return {
      restrict: 'E',
      require: constants_1.REQUIRE_INJECTOR,
      link: {post: function(scope, element, attrs, parentInjector, transclude) {
          var domElement = element[0];
          var facade = new downgrade_ng2_adapter_1.DowngradeNg2ComponentAdapter(idPrefix + (idCount++), info, element, attrs, scope, parentInjector, parse, componentFactory);
          facade.setupInputs();
          facade.bootstrapNg2();
          facade.projectContent();
          facade.setupOutputs();
          facade.registerCleanup();
        }}
    };
  }
  return directiveFactory;
}
var UpgradeAdapterRef = (function() {
  function UpgradeAdapterRef() {
    this._readyFn = null;
    this.ng1RootScope = null;
    this.ng1Injector = null;
    this.ng2ApplicationRef = null;
    this.ng2Injector = null;
  }
  UpgradeAdapterRef.prototype._bootstrapDone = function(applicationRef, ng1Injector) {
    this.ng2ApplicationRef = applicationRef;
    this.ng2Injector = applicationRef.injector;
    this.ng1Injector = ng1Injector;
    this.ng1RootScope = ng1Injector.get(constants_1.NG1_ROOT_SCOPE);
    this._readyFn && this._readyFn(this);
  };
  UpgradeAdapterRef.prototype.ready = function(fn) {
    this._readyFn = fn;
  };
  UpgradeAdapterRef.prototype.dispose = function() {
    this.ng1Injector.get(constants_1.NG1_ROOT_SCOPE).$destroy();
    this.ng2ApplicationRef.dispose();
  };
  return UpgradeAdapterRef;
}());
exports.UpgradeAdapterRef = UpgradeAdapterRef;
