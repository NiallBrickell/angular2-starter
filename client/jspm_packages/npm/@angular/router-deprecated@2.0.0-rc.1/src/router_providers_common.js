/* */ 
"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('./router');
var route_registry_1 = require('./route_registry');
var exceptions_1 = require('./facade/exceptions');
exports.ROUTER_PROVIDERS_COMMON = [route_registry_1.RouteRegistry, {
  provide: common_1.LocationStrategy,
  useClass: common_1.PathLocationStrategy
}, common_1.Location, {
  provide: router_1.Router,
  useFactory: routerFactory,
  deps: [route_registry_1.RouteRegistry, common_1.Location, route_registry_1.ROUTER_PRIMARY_COMPONENT, core_1.ApplicationRef]
}, {
  provide: route_registry_1.ROUTER_PRIMARY_COMPONENT,
  useFactory: routerPrimaryComponentFactory,
  deps: ([core_1.ApplicationRef])
}];
function routerFactory(registry, location, primaryComponent, appRef) {
  var rootRouter = new router_1.RootRouter(registry, location, primaryComponent);
  appRef.registerDisposeListener(function() {
    return rootRouter.dispose();
  });
  return rootRouter;
}
function routerPrimaryComponentFactory(app) {
  if (app.componentTypes.length == 0) {
    throw new exceptions_1.BaseException("Bootstrap at least one component before injecting Router.");
  }
  return app.componentTypes[0];
}
