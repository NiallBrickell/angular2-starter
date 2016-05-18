/* */ 
"format cjs";
(function(process) {
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject'), require('rxjs/observable/PromiseObservable'), require('rxjs/operator/toPromise'), require('rxjs/Observable')) : typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Subject', 'rxjs/observable/PromiseObservable', 'rxjs/operator/toPromise', 'rxjs/Observable'], factory) : (factory((global.ng = global.ng || {}, global.ng.common = global.ng.common || {}), global.ng.core, global.Rx, global.Rx, global.Rx.Observable.prototype, global.Rx));
  }(this, function(exports, _angular_core, rxjs_Subject, rxjs_observable_PromiseObservable, rxjs_operator_toPromise, rxjs_Observable) {
    'use strict';
    var globalScope;
    if (typeof window === 'undefined') {
      if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        globalScope = self;
      } else {
        globalScope = global;
      }
    } else {
      globalScope = window;
    }
    var global$1 = globalScope;
    function getTypeNameForDebugging(type) {
      if (type['name']) {
        return type['name'];
      }
      return typeof type;
    }
    var Date = global$1.Date;
    global$1.assert = function assert(condition) {};
    function isPresent(obj) {
      return obj !== undefined && obj !== null;
    }
    function isBlank(obj) {
      return obj === undefined || obj === null;
    }
    function isNumber(obj) {
      return typeof obj === "number";
    }
    function isString(obj) {
      return typeof obj === "string";
    }
    function isFunction(obj) {
      return typeof obj === "function";
    }
    function isStringMap(obj) {
      return typeof obj === 'object' && obj !== null;
    }
    function isPromise(obj) {
      return obj instanceof global$1.Promise;
    }
    function isArray(obj) {
      return Array.isArray(obj);
    }
    function isDate(obj) {
      return obj instanceof Date && !isNaN(obj.valueOf());
    }
    function noop() {}
    function stringify(token) {
      if (typeof token === 'string') {
        return token;
      }
      if (token === undefined || token === null) {
        return '' + token;
      }
      if (token.name) {
        return token.name;
      }
      if (token.overriddenName) {
        return token.overriddenName;
      }
      var res = token.toString();
      var newLineIndex = res.indexOf("\n");
      return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
    }
    var StringWrapper = (function() {
      function StringWrapper() {}
      StringWrapper.fromCharCode = function(code) {
        return String.fromCharCode(code);
      };
      StringWrapper.charCodeAt = function(s, index) {
        return s.charCodeAt(index);
      };
      StringWrapper.split = function(s, regExp) {
        return s.split(regExp);
      };
      StringWrapper.equals = function(s, s2) {
        return s === s2;
      };
      StringWrapper.stripLeft = function(s, charVal) {
        if (s && s.length) {
          var pos = 0;
          for (var i = 0; i < s.length; i++) {
            if (s[i] != charVal)
              break;
            pos++;
          }
          s = s.substring(pos);
        }
        return s;
      };
      StringWrapper.stripRight = function(s, charVal) {
        if (s && s.length) {
          var pos = s.length;
          for (var i = s.length - 1; i >= 0; i--) {
            if (s[i] != charVal)
              break;
            pos--;
          }
          s = s.substring(0, pos);
        }
        return s;
      };
      StringWrapper.replace = function(s, from, replace) {
        return s.replace(from, replace);
      };
      StringWrapper.replaceAll = function(s, from, replace) {
        return s.replace(from, replace);
      };
      StringWrapper.slice = function(s, from, to) {
        if (from === void 0) {
          from = 0;
        }
        if (to === void 0) {
          to = null;
        }
        return s.slice(from, to === null ? undefined : to);
      };
      StringWrapper.replaceAllMapped = function(s, from, cb) {
        return s.replace(from, function() {
          var matches = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            matches[_i - 0] = arguments[_i];
          }
          matches.splice(-2, 2);
          return cb(matches);
        });
      };
      StringWrapper.contains = function(s, substr) {
        return s.indexOf(substr) != -1;
      };
      StringWrapper.compare = function(a, b) {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      };
      return StringWrapper;
    }());
    var NumberParseError = (function(_super) {
      __extends(NumberParseError, _super);
      function NumberParseError(message) {
        _super.call(this);
        this.message = message;
      }
      NumberParseError.prototype.toString = function() {
        return this.message;
      };
      return NumberParseError;
    }(Error));
    var NumberWrapper = (function() {
      function NumberWrapper() {}
      NumberWrapper.toFixed = function(n, fractionDigits) {
        return n.toFixed(fractionDigits);
      };
      NumberWrapper.equal = function(a, b) {
        return a === b;
      };
      NumberWrapper.parseIntAutoRadix = function(text) {
        var result = parseInt(text);
        if (isNaN(result)) {
          throw new NumberParseError("Invalid integer literal when parsing " + text);
        }
        return result;
      };
      NumberWrapper.parseInt = function(text, radix) {
        if (radix == 10) {
          if (/^(\-|\+)?[0-9]+$/.test(text)) {
            return parseInt(text, radix);
          }
        } else if (radix == 16) {
          if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
            return parseInt(text, radix);
          }
        } else {
          var result = parseInt(text, radix);
          if (!isNaN(result)) {
            return result;
          }
        }
        throw new NumberParseError("Invalid integer literal when parsing " + text + " in base " + radix);
      };
      NumberWrapper.parseFloat = function(text) {
        return parseFloat(text);
      };
      Object.defineProperty(NumberWrapper, "NaN", {
        get: function() {
          return NaN;
        },
        enumerable: true,
        configurable: true
      });
      NumberWrapper.isNaN = function(value) {
        return isNaN(value);
      };
      NumberWrapper.isInteger = function(value) {
        return Number.isInteger(value);
      };
      return NumberWrapper;
    }());
    var RegExpWrapper = (function() {
      function RegExpWrapper() {}
      RegExpWrapper.create = function(regExpStr, flags) {
        if (flags === void 0) {
          flags = '';
        }
        flags = flags.replace(/g/g, '');
        return new global$1.RegExp(regExpStr, flags + 'g');
      };
      RegExpWrapper.firstMatch = function(regExp, input) {
        regExp.lastIndex = 0;
        return regExp.exec(input);
      };
      RegExpWrapper.test = function(regExp, input) {
        regExp.lastIndex = 0;
        return regExp.test(input);
      };
      RegExpWrapper.matcher = function(regExp, input) {
        regExp.lastIndex = 0;
        return {
          re: regExp,
          input: input
        };
      };
      RegExpWrapper.replaceAll = function(regExp, input, replace) {
        var c = regExp.exec(input);
        var res = '';
        regExp.lastIndex = 0;
        var prev = 0;
        while (c) {
          res += input.substring(prev, c.index);
          res += replace(c);
          prev = c.index + c[0].length;
          regExp.lastIndex = prev;
          c = regExp.exec(input);
        }
        res += input.substring(prev);
        return res;
      };
      return RegExpWrapper;
    }());
    function looseIdentical(a, b) {
      return a === b || typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b);
    }
    function normalizeBlank(obj) {
      return isBlank(obj) ? null : obj;
    }
    function normalizeBool(obj) {
      return isBlank(obj) ? false : obj;
    }
    function isJsObject(o) {
      return o !== null && (typeof o === "function" || typeof o === "object");
    }
    var Json = (function() {
      function Json() {}
      Json.parse = function(s) {
        return global$1.JSON.parse(s);
      };
      Json.stringify = function(data) {
        return global$1.JSON.stringify(data, null, 2);
      };
      return Json;
    }());
    var DateWrapper = (function() {
      function DateWrapper() {}
      DateWrapper.create = function(year, month, day, hour, minutes, seconds, milliseconds) {
        if (month === void 0) {
          month = 1;
        }
        if (day === void 0) {
          day = 1;
        }
        if (hour === void 0) {
          hour = 0;
        }
        if (minutes === void 0) {
          minutes = 0;
        }
        if (seconds === void 0) {
          seconds = 0;
        }
        if (milliseconds === void 0) {
          milliseconds = 0;
        }
        return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
      };
      DateWrapper.fromISOString = function(str) {
        return new Date(str);
      };
      DateWrapper.fromMillis = function(ms) {
        return new Date(ms);
      };
      DateWrapper.toMillis = function(date) {
        return date.getTime();
      };
      DateWrapper.now = function() {
        return new Date();
      };
      DateWrapper.toJson = function(date) {
        return date.toJSON();
      };
      return DateWrapper;
    }());
    var _symbolIterator = null;
    function getSymbolIterator() {
      if (isBlank(_symbolIterator)) {
        if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
          _symbolIterator = Symbol.iterator;
        } else {
          var keys = Object.getOwnPropertyNames(Map.prototype);
          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (key !== 'entries' && key !== 'size' && Map.prototype[key] === Map.prototype['entries']) {
              _symbolIterator = key;
            }
          }
        }
      }
      return _symbolIterator;
    }
    function isPrimitive(obj) {
      return !isJsObject(obj);
    }
    function hasConstructor(value, type) {
      return value.constructor === type;
    }
    var PromiseCompleter = (function() {
      function PromiseCompleter() {
        var _this = this;
        this.promise = new Promise(function(res, rej) {
          _this.resolve = res;
          _this.reject = rej;
        });
      }
      return PromiseCompleter;
    }());
    var PromiseWrapper = (function() {
      function PromiseWrapper() {}
      PromiseWrapper.resolve = function(obj) {
        return Promise.resolve(obj);
      };
      PromiseWrapper.reject = function(obj, _) {
        return Promise.reject(obj);
      };
      PromiseWrapper.catchError = function(promise, onError) {
        return promise.catch(onError);
      };
      PromiseWrapper.all = function(promises) {
        if (promises.length == 0)
          return Promise.resolve([]);
        return Promise.all(promises);
      };
      PromiseWrapper.then = function(promise, success, rejection) {
        return promise.then(success, rejection);
      };
      PromiseWrapper.wrap = function(computation) {
        return new Promise(function(res, rej) {
          try {
            res(computation());
          } catch (e) {
            rej(e);
          }
        });
      };
      PromiseWrapper.scheduleMicrotask = function(computation) {
        PromiseWrapper.then(PromiseWrapper.resolve(null), computation, function(_) {});
      };
      PromiseWrapper.isPromise = function(obj) {
        return obj instanceof Promise;
      };
      PromiseWrapper.completer = function() {
        return new PromiseCompleter();
      };
      return PromiseWrapper;
    }());
    var ObservableWrapper = (function() {
      function ObservableWrapper() {}
      ObservableWrapper.subscribe = function(emitter, onNext, onError, onComplete) {
        if (onComplete === void 0) {
          onComplete = function() {};
        }
        onError = (typeof onError === "function") && onError || noop;
        onComplete = (typeof onComplete === "function") && onComplete || noop;
        return emitter.subscribe({
          next: onNext,
          error: onError,
          complete: onComplete
        });
      };
      ObservableWrapper.isObservable = function(obs) {
        return !!obs.subscribe;
      };
      ObservableWrapper.hasSubscribers = function(obs) {
        return obs.observers.length > 0;
      };
      ObservableWrapper.dispose = function(subscription) {
        subscription.unsubscribe();
      };
      ObservableWrapper.callNext = function(emitter, value) {
        emitter.next(value);
      };
      ObservableWrapper.callEmit = function(emitter, value) {
        emitter.emit(value);
      };
      ObservableWrapper.callError = function(emitter, error) {
        emitter.error(error);
      };
      ObservableWrapper.callComplete = function(emitter) {
        emitter.complete();
      };
      ObservableWrapper.fromPromise = function(promise) {
        return rxjs_observable_PromiseObservable.PromiseObservable.create(promise);
      };
      ObservableWrapper.toPromise = function(obj) {
        return rxjs_operator_toPromise.toPromise.call(obj);
      };
      return ObservableWrapper;
    }());
    var EventEmitter = (function(_super) {
      __extends(EventEmitter, _super);
      function EventEmitter(isAsync) {
        if (isAsync === void 0) {
          isAsync = true;
        }
        _super.call(this);
        this._isAsync = isAsync;
      }
      EventEmitter.prototype.emit = function(value) {
        _super.prototype.next.call(this, value);
      };
      EventEmitter.prototype.next = function(value) {
        _super.prototype.next.call(this, value);
      };
      EventEmitter.prototype.subscribe = function(generatorOrNext, error, complete) {
        var schedulerFn;
        var errorFn = function(err) {
          return null;
        };
        var completeFn = function() {
          return null;
        };
        if (generatorOrNext && typeof generatorOrNext === 'object') {
          schedulerFn = this._isAsync ? function(value) {
            setTimeout(function() {
              return generatorOrNext.next(value);
            });
          } : function(value) {
            generatorOrNext.next(value);
          };
          if (generatorOrNext.error) {
            errorFn = this._isAsync ? function(err) {
              setTimeout(function() {
                return generatorOrNext.error(err);
              });
            } : function(err) {
              generatorOrNext.error(err);
            };
          }
          if (generatorOrNext.complete) {
            completeFn = this._isAsync ? function() {
              setTimeout(function() {
                return generatorOrNext.complete();
              });
            } : function() {
              generatorOrNext.complete();
            };
          }
        } else {
          schedulerFn = this._isAsync ? function(value) {
            setTimeout(function() {
              return generatorOrNext(value);
            });
          } : function(value) {
            generatorOrNext(value);
          };
          if (error) {
            errorFn = this._isAsync ? function(err) {
              setTimeout(function() {
                return error(err);
              });
            } : function(err) {
              error(err);
            };
          }
          if (complete) {
            completeFn = this._isAsync ? function() {
              setTimeout(function() {
                return complete();
              });
            } : function() {
              complete();
            };
          }
        }
        return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
      };
      return EventEmitter;
    }(rxjs_Subject.Subject));
    var Map$1 = global$1.Map;
    var Set$1 = global$1.Set;
    var createMapFromPairs = (function() {
      try {
        if (new Map$1([[1, 2]]).size === 1) {
          return function createMapFromPairs(pairs) {
            return new Map$1(pairs);
          };
        }
      } catch (e) {}
      return function createMapAndPopulateFromPairs(pairs) {
        var map = new Map$1();
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i];
          map.set(pair[0], pair[1]);
        }
        return map;
      };
    })();
    var createMapFromMap = (function() {
      try {
        if (new Map$1(new Map$1())) {
          return function createMapFromMap(m) {
            return new Map$1(m);
          };
        }
      } catch (e) {}
      return function createMapAndPopulateFromMap(m) {
        var map = new Map$1();
        m.forEach(function(v, k) {
          map.set(k, v);
        });
        return map;
      };
    })();
    var _clearValues = (function() {
      if ((new Map$1()).keys().next) {
        return function _clearValues(m) {
          var keyIterator = m.keys();
          var k;
          while (!((k = keyIterator.next()).done)) {
            m.set(k.value, null);
          }
        };
      } else {
        return function _clearValuesWithForeEach(m) {
          m.forEach(function(v, k) {
            m.set(k, null);
          });
        };
      }
    })();
    var _arrayFromMap = (function() {
      try {
        if ((new Map$1()).values().next) {
          return function createArrayFromMap(m, getValues) {
            return getValues ? Array.from(m.values()) : Array.from(m.keys());
          };
        }
      } catch (e) {}
      return function createArrayFromMapWithForeach(m, getValues) {
        var res = ListWrapper.createFixedSize(m.size),
            i = 0;
        m.forEach(function(v, k) {
          res[i] = getValues ? v : k;
          i++;
        });
        return res;
      };
    })();
    var MapWrapper = (function() {
      function MapWrapper() {}
      MapWrapper.clone = function(m) {
        return createMapFromMap(m);
      };
      MapWrapper.createFromStringMap = function(stringMap) {
        var result = new Map$1();
        for (var prop in stringMap) {
          result.set(prop, stringMap[prop]);
        }
        return result;
      };
      MapWrapper.toStringMap = function(m) {
        var r = {};
        m.forEach(function(v, k) {
          return r[k] = v;
        });
        return r;
      };
      MapWrapper.createFromPairs = function(pairs) {
        return createMapFromPairs(pairs);
      };
      MapWrapper.clearValues = function(m) {
        _clearValues(m);
      };
      MapWrapper.iterable = function(m) {
        return m;
      };
      MapWrapper.keys = function(m) {
        return _arrayFromMap(m, false);
      };
      MapWrapper.values = function(m) {
        return _arrayFromMap(m, true);
      };
      return MapWrapper;
    }());
    var StringMapWrapper = (function() {
      function StringMapWrapper() {}
      StringMapWrapper.create = function() {
        return {};
      };
      StringMapWrapper.contains = function(map, key) {
        return map.hasOwnProperty(key);
      };
      StringMapWrapper.get = function(map, key) {
        return map.hasOwnProperty(key) ? map[key] : undefined;
      };
      StringMapWrapper.set = function(map, key, value) {
        map[key] = value;
      };
      StringMapWrapper.keys = function(map) {
        return Object.keys(map);
      };
      StringMapWrapper.values = function(map) {
        return Object.keys(map).reduce(function(r, a) {
          r.push(map[a]);
          return r;
        }, []);
      };
      StringMapWrapper.isEmpty = function(map) {
        for (var prop in map) {
          return false;
        }
        return true;
      };
      StringMapWrapper.delete = function(map, key) {
        delete map[key];
      };
      StringMapWrapper.forEach = function(map, callback) {
        for (var prop in map) {
          if (map.hasOwnProperty(prop)) {
            callback(map[prop], prop);
          }
        }
      };
      StringMapWrapper.merge = function(m1, m2) {
        var m = {};
        for (var attr in m1) {
          if (m1.hasOwnProperty(attr)) {
            m[attr] = m1[attr];
          }
        }
        for (var attr in m2) {
          if (m2.hasOwnProperty(attr)) {
            m[attr] = m2[attr];
          }
        }
        return m;
      };
      StringMapWrapper.equals = function(m1, m2) {
        var k1 = Object.keys(m1);
        var k2 = Object.keys(m2);
        if (k1.length != k2.length) {
          return false;
        }
        var key;
        for (var i = 0; i < k1.length; i++) {
          key = k1[i];
          if (m1[key] !== m2[key]) {
            return false;
          }
        }
        return true;
      };
      return StringMapWrapper;
    }());
    var ListWrapper = (function() {
      function ListWrapper() {}
      ListWrapper.createFixedSize = function(size) {
        return new Array(size);
      };
      ListWrapper.createGrowableSize = function(size) {
        return new Array(size);
      };
      ListWrapper.clone = function(array) {
        return array.slice(0);
      };
      ListWrapper.forEachWithIndex = function(array, fn) {
        for (var i = 0; i < array.length; i++) {
          fn(array[i], i);
        }
      };
      ListWrapper.first = function(array) {
        if (!array)
          return null;
        return array[0];
      };
      ListWrapper.last = function(array) {
        if (!array || array.length == 0)
          return null;
        return array[array.length - 1];
      };
      ListWrapper.indexOf = function(array, value, startIndex) {
        if (startIndex === void 0) {
          startIndex = 0;
        }
        return array.indexOf(value, startIndex);
      };
      ListWrapper.contains = function(list, el) {
        return list.indexOf(el) !== -1;
      };
      ListWrapper.reversed = function(array) {
        var a = ListWrapper.clone(array);
        return a.reverse();
      };
      ListWrapper.concat = function(a, b) {
        return a.concat(b);
      };
      ListWrapper.insert = function(list, index, value) {
        list.splice(index, 0, value);
      };
      ListWrapper.removeAt = function(list, index) {
        var res = list[index];
        list.splice(index, 1);
        return res;
      };
      ListWrapper.removeAll = function(list, items) {
        for (var i = 0; i < items.length; ++i) {
          var index = list.indexOf(items[i]);
          list.splice(index, 1);
        }
      };
      ListWrapper.remove = function(list, el) {
        var index = list.indexOf(el);
        if (index > -1) {
          list.splice(index, 1);
          return true;
        }
        return false;
      };
      ListWrapper.clear = function(list) {
        list.length = 0;
      };
      ListWrapper.isEmpty = function(list) {
        return list.length == 0;
      };
      ListWrapper.fill = function(list, value, start, end) {
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = null;
        }
        list.fill(value, start, end === null ? list.length : end);
      };
      ListWrapper.equals = function(a, b) {
        if (a.length != b.length)
          return false;
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i])
            return false;
        }
        return true;
      };
      ListWrapper.slice = function(l, from, to) {
        if (from === void 0) {
          from = 0;
        }
        if (to === void 0) {
          to = null;
        }
        return l.slice(from, to === null ? undefined : to);
      };
      ListWrapper.splice = function(l, from, length) {
        return l.splice(from, length);
      };
      ListWrapper.sort = function(l, compareFn) {
        if (isPresent(compareFn)) {
          l.sort(compareFn);
        } else {
          l.sort();
        }
      };
      ListWrapper.toString = function(l) {
        return l.toString();
      };
      ListWrapper.toJSON = function(l) {
        return JSON.stringify(l);
      };
      ListWrapper.maximum = function(list, predicate) {
        if (list.length == 0) {
          return null;
        }
        var solution = null;
        var maxValue = -Infinity;
        for (var index = 0; index < list.length; index++) {
          var candidate = list[index];
          if (isBlank(candidate)) {
            continue;
          }
          var candidateValue = predicate(candidate);
          if (candidateValue > maxValue) {
            solution = candidate;
            maxValue = candidateValue;
          }
        }
        return solution;
      };
      ListWrapper.flatten = function(list) {
        var target = [];
        _flattenArray(list, target);
        return target;
      };
      ListWrapper.addAll = function(list, source) {
        for (var i = 0; i < source.length; i++) {
          list.push(source[i]);
        }
      };
      return ListWrapper;
    }());
    function _flattenArray(source, target) {
      if (isPresent(source)) {
        for (var i = 0; i < source.length; i++) {
          var item = source[i];
          if (isArray(item)) {
            _flattenArray(item, target);
          } else {
            target.push(item);
          }
        }
      }
      return target;
    }
    function isListLikeIterable(obj) {
      if (!isJsObject(obj))
        return false;
      return isArray(obj) || (!(obj instanceof Map$1) && getSymbolIterator() in obj);
    }
    var createSetFromList = (function() {
      var test = new Set$1([1, 2, 3]);
      if (test.size === 3) {
        return function createSetFromList(lst) {
          return new Set$1(lst);
        };
      } else {
        return function createSetAndPopulateFromList(lst) {
          var res = new Set$1(lst);
          if (res.size !== lst.length) {
            for (var i = 0; i < lst.length; i++) {
              res.add(lst[i]);
            }
          }
          return res;
        };
      }
    })();
    var BaseException = (function(_super) {
      __extends(BaseException, _super);
      function BaseException(message) {
        if (message === void 0) {
          message = "--";
        }
        _super.call(this, message);
        this.message = message;
        this.stack = (new Error(message)).stack;
      }
      BaseException.prototype.toString = function() {
        return this.message;
      };
      return BaseException;
    }(Error));
    function unimplemented() {
      throw new BaseException('unimplemented');
    }
    var InvalidPipeArgumentException = (function(_super) {
      __extends(InvalidPipeArgumentException, _super);
      function InvalidPipeArgumentException(type, value) {
        _super.call(this, "Invalid argument '" + value + "' for pipe '" + stringify(type) + "'");
      }
      return InvalidPipeArgumentException;
    }(BaseException));
    var ObservableStrategy = (function() {
      function ObservableStrategy() {}
      ObservableStrategy.prototype.createSubscription = function(async, updateLatestValue) {
        return ObservableWrapper.subscribe(async, updateLatestValue, function(e) {
          throw e;
        });
      };
      ObservableStrategy.prototype.dispose = function(subscription) {
        ObservableWrapper.dispose(subscription);
      };
      ObservableStrategy.prototype.onDestroy = function(subscription) {
        ObservableWrapper.dispose(subscription);
      };
      return ObservableStrategy;
    }());
    var PromiseStrategy = (function() {
      function PromiseStrategy() {}
      PromiseStrategy.prototype.createSubscription = function(async, updateLatestValue) {
        return async.then(updateLatestValue);
      };
      PromiseStrategy.prototype.dispose = function(subscription) {};
      PromiseStrategy.prototype.onDestroy = function(subscription) {};
      return PromiseStrategy;
    }());
    var _promiseStrategy = new PromiseStrategy();
    var _observableStrategy = new ObservableStrategy();
    var AsyncPipe = (function() {
      function AsyncPipe(_ref) {
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
        this._strategy = null;
        this._ref = _ref;
      }
      AsyncPipe.prototype.ngOnDestroy = function() {
        if (isPresent(this._subscription)) {
          this._dispose();
        }
      };
      AsyncPipe.prototype.transform = function(obj) {
        if (isBlank(this._obj)) {
          if (isPresent(obj)) {
            this._subscribe(obj);
          }
          this._latestReturnedValue = this._latestValue;
          return this._latestValue;
        }
        if (obj !== this._obj) {
          this._dispose();
          return this.transform(obj);
        }
        if (this._latestValue === this._latestReturnedValue) {
          return this._latestReturnedValue;
        } else {
          this._latestReturnedValue = this._latestValue;
          return _angular_core.WrappedValue.wrap(this._latestValue);
        }
      };
      AsyncPipe.prototype._subscribe = function(obj) {
        var _this = this;
        this._obj = obj;
        this._strategy = this._selectStrategy(obj);
        this._subscription = this._strategy.createSubscription(obj, function(value) {
          return _this._updateLatestValue(obj, value);
        });
      };
      AsyncPipe.prototype._selectStrategy = function(obj) {
        if (isPromise(obj)) {
          return _promiseStrategy;
        } else if (ObservableWrapper.isObservable(obj)) {
          return _observableStrategy;
        } else {
          throw new InvalidPipeArgumentException(AsyncPipe, obj);
        }
      };
      AsyncPipe.prototype._dispose = function() {
        this._strategy.dispose(this._subscription);
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
      };
      AsyncPipe.prototype._updateLatestValue = function(async, value) {
        if (async === this._obj) {
          this._latestValue = value;
          this._ref.markForCheck();
        }
      };
      return AsyncPipe;
    }());
    AsyncPipe.decorators = [{
      type: _angular_core.Pipe,
      args: [{
        name: 'async',
        pure: false
      }]
    }, {type: _angular_core.Injectable}];
    AsyncPipe.ctorParameters = [{type: _angular_core.ChangeDetectorRef}];
    var NumberFormatStyle;
    (function(NumberFormatStyle) {
      NumberFormatStyle[NumberFormatStyle["Decimal"] = 0] = "Decimal";
      NumberFormatStyle[NumberFormatStyle["Percent"] = 1] = "Percent";
      NumberFormatStyle[NumberFormatStyle["Currency"] = 2] = "Currency";
    })(NumberFormatStyle || (NumberFormatStyle = {}));
    var NumberFormatter = (function() {
      function NumberFormatter() {}
      NumberFormatter.format = function(num, locale, style, _a) {
        var _b = _a === void 0 ? {} : _a,
            _c = _b.minimumIntegerDigits,
            minimumIntegerDigits = _c === void 0 ? 1 : _c,
            _d = _b.minimumFractionDigits,
            minimumFractionDigits = _d === void 0 ? 0 : _d,
            _e = _b.maximumFractionDigits,
            maximumFractionDigits = _e === void 0 ? 3 : _e,
            currency = _b.currency,
            _f = _b.currencyAsSymbol,
            currencyAsSymbol = _f === void 0 ? false : _f;
        var intlOptions = {
          minimumIntegerDigits: minimumIntegerDigits,
          minimumFractionDigits: minimumFractionDigits,
          maximumFractionDigits: maximumFractionDigits
        };
        intlOptions.style = NumberFormatStyle[style].toLowerCase();
        if (style == NumberFormatStyle.Currency) {
          intlOptions.currency = currency;
          intlOptions.currencyDisplay = currencyAsSymbol ? 'symbol' : 'code';
        }
        return new Intl.NumberFormat(locale, intlOptions).format(num);
      };
      return NumberFormatter;
    }());
    function digitCondition(len) {
      return len == 2 ? '2-digit' : 'numeric';
    }
    function nameCondition(len) {
      return len < 4 ? 'short' : 'long';
    }
    function extractComponents(pattern) {
      var ret = {};
      var i = 0,
          j;
      while (i < pattern.length) {
        j = i;
        while (j < pattern.length && pattern[j] == pattern[i])
          j++;
        var len = j - i;
        switch (pattern[i]) {
          case 'G':
            ret.era = nameCondition(len);
            break;
          case 'y':
            ret.year = digitCondition(len);
            break;
          case 'M':
            if (len >= 3)
              ret.month = nameCondition(len);
            else
              ret.month = digitCondition(len);
            break;
          case 'd':
            ret.day = digitCondition(len);
            break;
          case 'E':
            ret.weekday = nameCondition(len);
            break;
          case 'j':
            ret.hour = digitCondition(len);
            break;
          case 'h':
            ret.hour = digitCondition(len);
            ret.hour12 = true;
            break;
          case 'H':
            ret.hour = digitCondition(len);
            ret.hour12 = false;
            break;
          case 'm':
            ret.minute = digitCondition(len);
            break;
          case 's':
            ret.second = digitCondition(len);
            break;
          case 'z':
            ret.timeZoneName = 'long';
            break;
          case 'Z':
            ret.timeZoneName = 'short';
            break;
        }
        i = j;
      }
      return ret;
    }
    var dateFormatterCache = new Map();
    var DateFormatter = (function() {
      function DateFormatter() {}
      DateFormatter.format = function(date, locale, pattern) {
        var key = locale + pattern;
        if (dateFormatterCache.has(key)) {
          return dateFormatterCache.get(key).format(date);
        }
        var formatter = new Intl.DateTimeFormat(locale, extractComponents(pattern));
        dateFormatterCache.set(key, formatter);
        return formatter.format(date);
      };
      return DateFormatter;
    }());
    var defaultLocale = 'en-US';
    var DatePipe = (function() {
      function DatePipe() {}
      DatePipe.prototype.transform = function(value, pattern) {
        if (pattern === void 0) {
          pattern = 'mediumDate';
        }
        if (isBlank(value))
          return null;
        if (!this.supports(value)) {
          throw new InvalidPipeArgumentException(DatePipe, value);
        }
        if (isNumber(value)) {
          value = DateWrapper.fromMillis(value);
        }
        if (StringMapWrapper.contains(DatePipe._ALIASES, pattern)) {
          pattern = StringMapWrapper.get(DatePipe._ALIASES, pattern);
        }
        return DateFormatter.format(value, defaultLocale, pattern);
      };
      DatePipe.prototype.supports = function(obj) {
        return isDate(obj) || isNumber(obj);
      };
      return DatePipe;
    }());
    DatePipe._ALIASES = {
      'medium': 'yMMMdjms',
      'short': 'yMdjm',
      'fullDate': 'yMMMMEEEEd',
      'longDate': 'yMMMMd',
      'mediumDate': 'yMMMd',
      'shortDate': 'yMd',
      'mediumTime': 'jms',
      'shortTime': 'jm'
    };
    DatePipe.decorators = [{
      type: _angular_core.Pipe,
      args: [{
        name: 'date',
        pure: true
      }]
    }, {type: _angular_core.Injectable}];
    var JsonPipe = (function() {
      function JsonPipe() {}
      JsonPipe.prototype.transform = function(value) {
        return Json.stringify(value);
      };
      return JsonPipe;
    }());
    JsonPipe.decorators = [{
      type: _angular_core.Pipe,
      args: [{
        name: 'json',
        pure: false
      }]
    }, {type: _angular_core.Injectable}];
    var SlicePipe = (function() {
      function SlicePipe() {}
      SlicePipe.prototype.transform = function(value, start, end) {
        if (end === void 0) {
          end = null;
        }
        if (!this.supports(value)) {
          throw new InvalidPipeArgumentException(SlicePipe, value);
        }
        if (isBlank(value))
          return value;
        if (isString(value)) {
          return StringWrapper.slice(value, start, end);
        }
        return ListWrapper.slice(value, start, end);
      };
      SlicePipe.prototype.supports = function(obj) {
        return isString(obj) || isArray(obj);
      };
      return SlicePipe;
    }());
    SlicePipe.decorators = [{
      type: _angular_core.Pipe,
      args: [{
        name: 'slice',
        pure: false
      }]
    }, {type: _angular_core.Injectable}];
    var LowerCasePipe = (function() {
      function LowerCasePipe() {}
      LowerCasePipe.prototype.transform = function(value) {
        if (isBlank(value))
          return value;
        if (!isString(value)) {
          throw new InvalidPipeArgumentException(LowerCasePipe, value);
        }
        return value.toLowerCase();
      };
      return LowerCasePipe;
    }());
    LowerCasePipe.decorators = [{
      type: _angular_core.Pipe,
      args: [{name: 'lowercase'}]
    }, {type: _angular_core.Injectable}];
    var defaultLocale$1 = 'en-US';
    var _re = RegExpWrapper.create('^(\\d+)?\\.((\\d+)(\\-(\\d+))?)?$');
    var NumberPipe = (function() {
      function NumberPipe() {}
      NumberPipe._format = function(value, style, digits, currency, currencyAsSymbol) {
        if (currency === void 0) {
          currency = null;
        }
        if (currencyAsSymbol === void 0) {
          currencyAsSymbol = false;
        }
        if (isBlank(value))
          return null;
        if (!isNumber(value)) {
          throw new InvalidPipeArgumentException(NumberPipe, value);
        }
        var minInt = 1,
            minFraction = 0,
            maxFraction = 3;
        if (isPresent(digits)) {
          var parts = RegExpWrapper.firstMatch(_re, digits);
          if (isBlank(parts)) {
            throw new BaseException(digits + " is not a valid digit info for number pipes");
          }
          if (isPresent(parts[1])) {
            minInt = NumberWrapper.parseIntAutoRadix(parts[1]);
          }
          if (isPresent(parts[3])) {
            minFraction = NumberWrapper.parseIntAutoRadix(parts[3]);
          }
          if (isPresent(parts[5])) {
            maxFraction = NumberWrapper.parseIntAutoRadix(parts[5]);
          }
        }
        return NumberFormatter.format(value, defaultLocale$1, style, {
          minimumIntegerDigits: minInt,
          minimumFractionDigits: minFraction,
          maximumFractionDigits: maxFraction,
          currency: currency,
          currencyAsSymbol: currencyAsSymbol
        });
      };
      return NumberPipe;
    }());
    NumberPipe.decorators = [{type: _angular_core.Injectable}];
    var DecimalPipe = (function(_super) {
      __extends(DecimalPipe, _super);
      function DecimalPipe() {
        _super.apply(this, arguments);
      }
      DecimalPipe.prototype.transform = function(value, digits) {
        if (digits === void 0) {
          digits = null;
        }
        return NumberPipe._format(value, NumberFormatStyle.Decimal, digits);
      };
      return DecimalPipe;
    }(NumberPipe));
    DecimalPipe.decorators = [{
      type: _angular_core.Pipe,
      args: [{name: 'number'}]
    }, {type: _angular_core.Injectable}];
    var PercentPipe = (function(_super) {
      __extends(PercentPipe, _super);
      function PercentPipe() {
        _super.apply(this, arguments);
      }
      PercentPipe.prototype.transform = function(value, digits) {
        if (digits === void 0) {
          digits = null;
        }
        return NumberPipe._format(value, NumberFormatStyle.Percent, digits);
      };
      return PercentPipe;
    }(NumberPipe));
    PercentPipe.decorators = [{
      type: _angular_core.Pipe,
      args: [{name: 'percent'}]
    }, {type: _angular_core.Injectable}];
    var CurrencyPipe = (function(_super) {
      __extends(CurrencyPipe, _super);
      function CurrencyPipe() {
        _super.apply(this, arguments);
      }
      CurrencyPipe.prototype.transform = function(value, currencyCode, symbolDisplay, digits) {
        if (currencyCode === void 0) {
          currencyCode = 'USD';
        }
        if (symbolDisplay === void 0) {
          symbolDisplay = false;
        }
        if (digits === void 0) {
          digits = null;
        }
        return NumberPipe._format(value, NumberFormatStyle.Currency, digits, currencyCode, symbolDisplay);
      };
      return CurrencyPipe;
    }(NumberPipe));
    CurrencyPipe.decorators = [{
      type: _angular_core.Pipe,
      args: [{name: 'currency'}]
    }, {type: _angular_core.Injectable}];
    var UpperCasePipe = (function() {
      function UpperCasePipe() {}
      UpperCasePipe.prototype.transform = function(value) {
        if (isBlank(value))
          return value;
        if (!isString(value)) {
          throw new InvalidPipeArgumentException(UpperCasePipe, value);
        }
        return value.toUpperCase();
      };
      return UpperCasePipe;
    }());
    UpperCasePipe.decorators = [{
      type: _angular_core.Pipe,
      args: [{name: 'uppercase'}]
    }, {type: _angular_core.Injectable}];
    var ReplacePipe = (function() {
      function ReplacePipe() {}
      ReplacePipe.prototype.transform = function(value, pattern, replacement) {
        if (isBlank(value)) {
          return value;
        }
        if (!this._supportedInput(value)) {
          throw new InvalidPipeArgumentException(ReplacePipe, value);
        }
        var input = value.toString();
        if (!this._supportedPattern(pattern)) {
          throw new InvalidPipeArgumentException(ReplacePipe, pattern);
        }
        if (!this._supportedReplacement(replacement)) {
          throw new InvalidPipeArgumentException(ReplacePipe, replacement);
        }
        if (isFunction(replacement)) {
          var rgxPattern = isString(pattern) ? RegExpWrapper.create(pattern) : pattern;
          return StringWrapper.replaceAllMapped(input, rgxPattern, replacement);
        }
        if (pattern instanceof RegExp) {
          return StringWrapper.replaceAll(input, pattern, replacement);
        }
        return StringWrapper.replace(input, pattern, replacement);
      };
      ReplacePipe.prototype._supportedInput = function(input) {
        return isString(input) || isNumber(input);
      };
      ReplacePipe.prototype._supportedPattern = function(pattern) {
        return isString(pattern) || pattern instanceof RegExp;
      };
      ReplacePipe.prototype._supportedReplacement = function(replacement) {
        return isString(replacement) || isFunction(replacement);
      };
      return ReplacePipe;
    }());
    ReplacePipe.decorators = [{
      type: _angular_core.Pipe,
      args: [{name: 'replace'}]
    }, {type: _angular_core.Injectable}];
    var interpolationExp = RegExpWrapper.create('#');
    var I18nPluralPipe = (function() {
      function I18nPluralPipe() {}
      I18nPluralPipe.prototype.transform = function(value, pluralMap) {
        var key;
        var valueStr;
        if (!isStringMap(pluralMap)) {
          throw new InvalidPipeArgumentException(I18nPluralPipe, pluralMap);
        }
        key = value === 0 || value === 1 ? "=" + value : 'other';
        valueStr = isPresent(value) ? value.toString() : '';
        return StringWrapper.replaceAll(pluralMap[key], interpolationExp, valueStr);
      };
      return I18nPluralPipe;
    }());
    I18nPluralPipe.decorators = [{
      type: _angular_core.Pipe,
      args: [{
        name: 'i18nPlural',
        pure: true
      }]
    }, {type: _angular_core.Injectable}];
    var I18nSelectPipe = (function() {
      function I18nSelectPipe() {}
      I18nSelectPipe.prototype.transform = function(value, mapping) {
        if (!isStringMap(mapping)) {
          throw new InvalidPipeArgumentException(I18nSelectPipe, mapping);
        }
        return StringMapWrapper.contains(mapping, value) ? mapping[value] : mapping['other'];
      };
      return I18nSelectPipe;
    }());
    I18nSelectPipe.decorators = [{
      type: _angular_core.Pipe,
      args: [{
        name: 'i18nSelect',
        pure: true
      }]
    }, {type: _angular_core.Injectable}];
    var COMMON_PIPES = [AsyncPipe, UpperCasePipe, LowerCasePipe, JsonPipe, SlicePipe, DecimalPipe, PercentPipe, CurrencyPipe, DatePipe, ReplacePipe, I18nPluralPipe, I18nSelectPipe];
    var NgClass = (function() {
      function NgClass(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer) {
        this._iterableDiffers = _iterableDiffers;
        this._keyValueDiffers = _keyValueDiffers;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
        this._initialClasses = [];
      }
      Object.defineProperty(NgClass.prototype, "initialClasses", {
        set: function(v) {
          this._applyInitialClasses(true);
          this._initialClasses = isPresent(v) && isString(v) ? v.split(' ') : [];
          this._applyInitialClasses(false);
          this._applyClasses(this._rawClass, false);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgClass.prototype, "rawClass", {
        set: function(v) {
          this._cleanupClasses(this._rawClass);
          if (isString(v)) {
            v = v.split(' ');
          }
          this._rawClass = v;
          this._iterableDiffer = null;
          this._keyValueDiffer = null;
          if (isPresent(v)) {
            if (isListLikeIterable(v)) {
              this._iterableDiffer = this._iterableDiffers.find(v).create(null);
            } else {
              this._keyValueDiffer = this._keyValueDiffers.find(v).create(null);
            }
          }
        },
        enumerable: true,
        configurable: true
      });
      NgClass.prototype.ngDoCheck = function() {
        if (isPresent(this._iterableDiffer)) {
          var changes = this._iterableDiffer.diff(this._rawClass);
          if (isPresent(changes)) {
            this._applyIterableChanges(changes);
          }
        }
        if (isPresent(this._keyValueDiffer)) {
          var changes = this._keyValueDiffer.diff(this._rawClass);
          if (isPresent(changes)) {
            this._applyKeyValueChanges(changes);
          }
        }
      };
      NgClass.prototype.ngOnDestroy = function() {
        this._cleanupClasses(this._rawClass);
      };
      NgClass.prototype._cleanupClasses = function(rawClassVal) {
        this._applyClasses(rawClassVal, true);
        this._applyInitialClasses(false);
      };
      NgClass.prototype._applyKeyValueChanges = function(changes) {
        var _this = this;
        changes.forEachAddedItem(function(record) {
          _this._toggleClass(record.key, record.currentValue);
        });
        changes.forEachChangedItem(function(record) {
          _this._toggleClass(record.key, record.currentValue);
        });
        changes.forEachRemovedItem(function(record) {
          if (record.previousValue) {
            _this._toggleClass(record.key, false);
          }
        });
      };
      NgClass.prototype._applyIterableChanges = function(changes) {
        var _this = this;
        changes.forEachAddedItem(function(record) {
          _this._toggleClass(record.item, true);
        });
        changes.forEachRemovedItem(function(record) {
          _this._toggleClass(record.item, false);
        });
      };
      NgClass.prototype._applyInitialClasses = function(isCleanup) {
        var _this = this;
        this._initialClasses.forEach(function(className) {
          return _this._toggleClass(className, !isCleanup);
        });
      };
      NgClass.prototype._applyClasses = function(rawClassVal, isCleanup) {
        var _this = this;
        if (isPresent(rawClassVal)) {
          if (isArray(rawClassVal)) {
            rawClassVal.forEach(function(className) {
              return _this._toggleClass(className, !isCleanup);
            });
          } else if (rawClassVal instanceof Set) {
            rawClassVal.forEach(function(className) {
              return _this._toggleClass(className, !isCleanup);
            });
          } else {
            StringMapWrapper.forEach(rawClassVal, function(expVal, className) {
              if (isPresent(expVal))
                _this._toggleClass(className, !isCleanup);
            });
          }
        }
      };
      NgClass.prototype._toggleClass = function(className, enabled) {
        className = className.trim();
        if (className.length > 0) {
          if (className.indexOf(' ') > -1) {
            var classes = className.split(/\s+/g);
            for (var i = 0,
                len = classes.length; i < len; i++) {
              this._renderer.setElementClass(this._ngEl.nativeElement, classes[i], enabled);
            }
          } else {
            this._renderer.setElementClass(this._ngEl.nativeElement, className, enabled);
          }
        }
      };
      return NgClass;
    }());
    NgClass.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[ngClass]',
        inputs: ['rawClass: ngClass', 'initialClasses: class']
      }]
    }];
    NgClass.ctorParameters = [{type: _angular_core.IterableDiffers}, {type: _angular_core.KeyValueDiffers}, {type: _angular_core.ElementRef}, {type: _angular_core.Renderer}];
    var NgForRow = (function() {
      function NgForRow($implicit, index, count) {
        this.$implicit = $implicit;
        this.index = index;
        this.count = count;
      }
      Object.defineProperty(NgForRow.prototype, "first", {
        get: function() {
          return this.index === 0;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgForRow.prototype, "last", {
        get: function() {
          return this.index === this.count - 1;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgForRow.prototype, "even", {
        get: function() {
          return this.index % 2 === 0;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgForRow.prototype, "odd", {
        get: function() {
          return !this.even;
        },
        enumerable: true,
        configurable: true
      });
      return NgForRow;
    }());
    var NgFor = (function() {
      function NgFor(_viewContainer, _templateRef, _iterableDiffers, _cdr) {
        this._viewContainer = _viewContainer;
        this._templateRef = _templateRef;
        this._iterableDiffers = _iterableDiffers;
        this._cdr = _cdr;
      }
      Object.defineProperty(NgFor.prototype, "ngForOf", {
        set: function(value) {
          this._ngForOf = value;
          if (isBlank(this._differ) && isPresent(value)) {
            try {
              this._differ = this._iterableDiffers.find(value).create(this._cdr, this._ngForTrackBy);
            } catch (e) {
              throw new BaseException("Cannot find a differ supporting object '" + value + "' of type '" + getTypeNameForDebugging(value) + "'. NgFor only supports binding to Iterables such as Arrays.");
            }
          }
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgFor.prototype, "ngForTemplate", {
        set: function(value) {
          if (isPresent(value)) {
            this._templateRef = value;
          }
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgFor.prototype, "ngForTrackBy", {
        set: function(value) {
          this._ngForTrackBy = value;
        },
        enumerable: true,
        configurable: true
      });
      NgFor.prototype.ngDoCheck = function() {
        if (isPresent(this._differ)) {
          var changes = this._differ.diff(this._ngForOf);
          if (isPresent(changes))
            this._applyChanges(changes);
        }
      };
      NgFor.prototype._applyChanges = function(changes) {
        var _this = this;
        var recordViewTuples = [];
        changes.forEachRemovedItem(function(removedRecord) {
          return recordViewTuples.push(new RecordViewTuple(removedRecord, null));
        });
        changes.forEachMovedItem(function(movedRecord) {
          return recordViewTuples.push(new RecordViewTuple(movedRecord, null));
        });
        var insertTuples = this._bulkRemove(recordViewTuples);
        changes.forEachAddedItem(function(addedRecord) {
          return insertTuples.push(new RecordViewTuple(addedRecord, null));
        });
        this._bulkInsert(insertTuples);
        for (var i = 0; i < insertTuples.length; i++) {
          this._perViewChange(insertTuples[i].view, insertTuples[i].record);
        }
        for (var i = 0,
            ilen = this._viewContainer.length; i < ilen; i++) {
          var viewRef = this._viewContainer.get(i);
          viewRef.context.index = i;
          viewRef.context.count = ilen;
        }
        changes.forEachIdentityChange(function(record) {
          var viewRef = _this._viewContainer.get(record.currentIndex);
          viewRef.context.$implicit = record.item;
        });
      };
      NgFor.prototype._perViewChange = function(view, record) {
        view.context.$implicit = record.item;
      };
      NgFor.prototype._bulkRemove = function(tuples) {
        tuples.sort(function(a, b) {
          return a.record.previousIndex - b.record.previousIndex;
        });
        var movedTuples = [];
        for (var i = tuples.length - 1; i >= 0; i--) {
          var tuple = tuples[i];
          if (isPresent(tuple.record.currentIndex)) {
            tuple.view = this._viewContainer.detach(tuple.record.previousIndex);
            movedTuples.push(tuple);
          } else {
            this._viewContainer.remove(tuple.record.previousIndex);
          }
        }
        return movedTuples;
      };
      NgFor.prototype._bulkInsert = function(tuples) {
        tuples.sort(function(a, b) {
          return a.record.currentIndex - b.record.currentIndex;
        });
        for (var i = 0; i < tuples.length; i++) {
          var tuple = tuples[i];
          if (isPresent(tuple.view)) {
            this._viewContainer.insert(tuple.view, tuple.record.currentIndex);
          } else {
            tuple.view = this._viewContainer.createEmbeddedView(this._templateRef, new NgForRow(null, null, null), tuple.record.currentIndex);
          }
        }
        return tuples;
      };
      return NgFor;
    }());
    NgFor.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForTrackBy', 'ngForOf', 'ngForTemplate']
      }]
    }];
    NgFor.ctorParameters = [{type: _angular_core.ViewContainerRef}, {type: _angular_core.TemplateRef}, {type: _angular_core.IterableDiffers}, {type: _angular_core.ChangeDetectorRef}];
    var RecordViewTuple = (function() {
      function RecordViewTuple(record, view) {
        this.record = record;
        this.view = view;
      }
      return RecordViewTuple;
    }());
    var NgIf = (function() {
      function NgIf(_viewContainer, _templateRef) {
        this._viewContainer = _viewContainer;
        this._templateRef = _templateRef;
        this._prevCondition = null;
      }
      Object.defineProperty(NgIf.prototype, "ngIf", {
        set: function(newCondition) {
          if (newCondition && (isBlank(this._prevCondition) || !this._prevCondition)) {
            this._prevCondition = true;
            this._viewContainer.createEmbeddedView(this._templateRef);
          } else if (!newCondition && (isBlank(this._prevCondition) || this._prevCondition)) {
            this._prevCondition = false;
            this._viewContainer.clear();
          }
        },
        enumerable: true,
        configurable: true
      });
      return NgIf;
    }());
    NgIf.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[ngIf]',
        inputs: ['ngIf']
      }]
    }];
    NgIf.ctorParameters = [{type: _angular_core.ViewContainerRef}, {type: _angular_core.TemplateRef}];
    var NgTemplateOutlet = (function() {
      function NgTemplateOutlet(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
      }
      Object.defineProperty(NgTemplateOutlet.prototype, "ngTemplateOutlet", {
        set: function(templateRef) {
          if (isPresent(this._insertedViewRef)) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._insertedViewRef));
          }
          if (isPresent(templateRef)) {
            this._insertedViewRef = this._viewContainerRef.createEmbeddedView(templateRef);
          }
        },
        enumerable: true,
        configurable: true
      });
      return NgTemplateOutlet;
    }());
    NgTemplateOutlet.decorators = [{
      type: _angular_core.Directive,
      args: [{selector: '[ngTemplateOutlet]'}]
    }];
    NgTemplateOutlet.ctorParameters = [{type: _angular_core.ViewContainerRef}];
    NgTemplateOutlet.propDecorators = {'ngTemplateOutlet': [{type: _angular_core.Input}]};
    var NgStyle = (function() {
      function NgStyle(_differs, _ngEl, _renderer) {
        this._differs = _differs;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
      }
      Object.defineProperty(NgStyle.prototype, "rawStyle", {
        set: function(v) {
          this._rawStyle = v;
          if (isBlank(this._differ) && isPresent(v)) {
            this._differ = this._differs.find(this._rawStyle).create(null);
          }
        },
        enumerable: true,
        configurable: true
      });
      NgStyle.prototype.ngDoCheck = function() {
        if (isPresent(this._differ)) {
          var changes = this._differ.diff(this._rawStyle);
          if (isPresent(changes)) {
            this._applyChanges(changes);
          }
        }
      };
      NgStyle.prototype._applyChanges = function(changes) {
        var _this = this;
        changes.forEachAddedItem(function(record) {
          _this._setStyle(record.key, record.currentValue);
        });
        changes.forEachChangedItem(function(record) {
          _this._setStyle(record.key, record.currentValue);
        });
        changes.forEachRemovedItem(function(record) {
          _this._setStyle(record.key, null);
        });
      };
      NgStyle.prototype._setStyle = function(name, val) {
        this._renderer.setElementStyle(this._ngEl.nativeElement, name, val);
      };
      return NgStyle;
    }());
    NgStyle.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[ngStyle]',
        inputs: ['rawStyle: ngStyle']
      }]
    }];
    NgStyle.ctorParameters = [{type: _angular_core.KeyValueDiffers}, {type: _angular_core.ElementRef}, {type: _angular_core.Renderer}];
    var _WHEN_DEFAULT = new Object();
    var SwitchView = (function() {
      function SwitchView(_viewContainerRef, _templateRef) {
        this._viewContainerRef = _viewContainerRef;
        this._templateRef = _templateRef;
      }
      SwitchView.prototype.create = function() {
        this._viewContainerRef.createEmbeddedView(this._templateRef);
      };
      SwitchView.prototype.destroy = function() {
        this._viewContainerRef.clear();
      };
      return SwitchView;
    }());
    var NgSwitch = (function() {
      function NgSwitch() {
        this._useDefault = false;
        this._valueViews = new Map$1();
        this._activeViews = [];
      }
      Object.defineProperty(NgSwitch.prototype, "ngSwitch", {
        set: function(value) {
          this._emptyAllActiveViews();
          this._useDefault = false;
          var views = this._valueViews.get(value);
          if (isBlank(views)) {
            this._useDefault = true;
            views = normalizeBlank(this._valueViews.get(_WHEN_DEFAULT));
          }
          this._activateViews(views);
          this._switchValue = value;
        },
        enumerable: true,
        configurable: true
      });
      NgSwitch.prototype._onWhenValueChanged = function(oldWhen, newWhen, view) {
        this._deregisterView(oldWhen, view);
        this._registerView(newWhen, view);
        if (oldWhen === this._switchValue) {
          view.destroy();
          ListWrapper.remove(this._activeViews, view);
        } else if (newWhen === this._switchValue) {
          if (this._useDefault) {
            this._useDefault = false;
            this._emptyAllActiveViews();
          }
          view.create();
          this._activeViews.push(view);
        }
        if (this._activeViews.length === 0 && !this._useDefault) {
          this._useDefault = true;
          this._activateViews(this._valueViews.get(_WHEN_DEFAULT));
        }
      };
      NgSwitch.prototype._emptyAllActiveViews = function() {
        var activeContainers = this._activeViews;
        for (var i = 0; i < activeContainers.length; i++) {
          activeContainers[i].destroy();
        }
        this._activeViews = [];
      };
      NgSwitch.prototype._activateViews = function(views) {
        if (isPresent(views)) {
          for (var i = 0; i < views.length; i++) {
            views[i].create();
          }
          this._activeViews = views;
        }
      };
      NgSwitch.prototype._registerView = function(value, view) {
        var views = this._valueViews.get(value);
        if (isBlank(views)) {
          views = [];
          this._valueViews.set(value, views);
        }
        views.push(view);
      };
      NgSwitch.prototype._deregisterView = function(value, view) {
        if (value === _WHEN_DEFAULT)
          return;
        var views = this._valueViews.get(value);
        if (views.length == 1) {
          this._valueViews.delete(value);
        } else {
          ListWrapper.remove(views, view);
        }
      };
      return NgSwitch;
    }());
    NgSwitch.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[ngSwitch]',
        inputs: ['ngSwitch']
      }]
    }];
    var NgSwitchWhen = (function() {
      function NgSwitchWhen(viewContainer, templateRef, ngSwitch) {
        this._value = _WHEN_DEFAULT;
        this._switch = ngSwitch;
        this._view = new SwitchView(viewContainer, templateRef);
      }
      Object.defineProperty(NgSwitchWhen.prototype, "ngSwitchWhen", {
        set: function(value) {
          this._switch._onWhenValueChanged(this._value, value, this._view);
          this._value = value;
        },
        enumerable: true,
        configurable: true
      });
      return NgSwitchWhen;
    }());
    NgSwitchWhen.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[ngSwitchWhen]',
        inputs: ['ngSwitchWhen']
      }]
    }];
    NgSwitchWhen.ctorParameters = [{type: _angular_core.ViewContainerRef}, {type: _angular_core.TemplateRef}, {
      type: NgSwitch,
      decorators: [{type: _angular_core.Host}]
    }];
    var NgSwitchDefault = (function() {
      function NgSwitchDefault(viewContainer, templateRef, sswitch) {
        sswitch._registerView(_WHEN_DEFAULT, new SwitchView(viewContainer, templateRef));
      }
      return NgSwitchDefault;
    }());
    NgSwitchDefault.decorators = [{
      type: _angular_core.Directive,
      args: [{selector: '[ngSwitchDefault]'}]
    }];
    NgSwitchDefault.ctorParameters = [{type: _angular_core.ViewContainerRef}, {type: _angular_core.TemplateRef}, {
      type: NgSwitch,
      decorators: [{type: _angular_core.Host}]
    }];
    var _CATEGORY_DEFAULT = 'other';
    var NgLocalization = (function() {
      function NgLocalization() {}
      return NgLocalization;
    }());
    var NgPluralCase = (function() {
      function NgPluralCase(value, template, viewContainer) {
        this.value = value;
        this._view = new SwitchView(viewContainer, template);
      }
      return NgPluralCase;
    }());
    NgPluralCase.decorators = [{
      type: _angular_core.Directive,
      args: [{selector: '[ngPluralCase]'}]
    }];
    NgPluralCase.ctorParameters = [{
      type: undefined,
      decorators: [{
        type: _angular_core.Attribute,
        args: ['ngPluralCase']
      }]
    }, {type: _angular_core.TemplateRef}, {type: _angular_core.ViewContainerRef}];
    var NgPlural = (function() {
      function NgPlural(_localization) {
        this._localization = _localization;
        this._caseViews = new Map$1();
        this.cases = null;
      }
      Object.defineProperty(NgPlural.prototype, "ngPlural", {
        set: function(value) {
          this._switchValue = value;
          this._updateView();
        },
        enumerable: true,
        configurable: true
      });
      NgPlural.prototype.ngAfterContentInit = function() {
        var _this = this;
        this.cases.forEach(function(pluralCase) {
          _this._caseViews.set(_this._formatValue(pluralCase), pluralCase._view);
        });
        this._updateView();
      };
      NgPlural.prototype._updateView = function() {
        this._clearViews();
        var view = this._caseViews.get(this._switchValue);
        if (!isPresent(view))
          view = this._getCategoryView(this._switchValue);
        this._activateView(view);
      };
      NgPlural.prototype._clearViews = function() {
        if (isPresent(this._activeView))
          this._activeView.destroy();
      };
      NgPlural.prototype._activateView = function(view) {
        if (!isPresent(view))
          return;
        this._activeView = view;
        this._activeView.create();
      };
      NgPlural.prototype._getCategoryView = function(value) {
        var category = this._localization.getPluralCategory(value);
        var categoryView = this._caseViews.get(category);
        return isPresent(categoryView) ? categoryView : this._caseViews.get(_CATEGORY_DEFAULT);
      };
      NgPlural.prototype._isValueView = function(pluralCase) {
        return pluralCase.value[0] === "=";
      };
      NgPlural.prototype._formatValue = function(pluralCase) {
        return this._isValueView(pluralCase) ? this._stripValue(pluralCase.value) : pluralCase.value;
      };
      NgPlural.prototype._stripValue = function(value) {
        return NumberWrapper.parseInt(value.substring(1), 10);
      };
      return NgPlural;
    }());
    NgPlural.decorators = [{
      type: _angular_core.Directive,
      args: [{selector: '[ngPlural]'}]
    }];
    NgPlural.ctorParameters = [{type: NgLocalization}];
    NgPlural.propDecorators = {
      'cases': [{
        type: _angular_core.ContentChildren,
        args: [NgPluralCase]
      }],
      'ngPlural': [{type: _angular_core.Input}]
    };
    var workaround_empty_observable_list_diff;
    var CORE_DIRECTIVES = [NgClass, NgFor, NgIf, NgTemplateOutlet, NgStyle, NgSwitch, NgSwitchWhen, NgSwitchDefault, NgPlural, NgPluralCase];
    var VALID = "VALID";
    var INVALID = "INVALID";
    var PENDING = "PENDING";
    function _find(control, path) {
      if (isBlank(path))
        return null;
      if (!(path instanceof Array)) {
        path = path.split("/");
      }
      if (path instanceof Array && ListWrapper.isEmpty(path))
        return null;
      return path.reduce(function(v, name) {
        if (v instanceof ControlGroup) {
          return isPresent(v.controls[name]) ? v.controls[name] : null;
        } else if (v instanceof ControlArray) {
          var index = name;
          return isPresent(v.at(index)) ? v.at(index) : null;
        } else {
          return null;
        }
      }, control);
    }
    function toObservable(r) {
      return PromiseWrapper.isPromise(r) ? ObservableWrapper.fromPromise(r) : r;
    }
    var AbstractControl = (function() {
      function AbstractControl(validator, asyncValidator) {
        this.validator = validator;
        this.asyncValidator = asyncValidator;
        this._pristine = true;
        this._touched = false;
      }
      Object.defineProperty(AbstractControl.prototype, "value", {
        get: function() {
          return this._value;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControl.prototype, "status", {
        get: function() {
          return this._status;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControl.prototype, "valid", {
        get: function() {
          return this._status === VALID;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControl.prototype, "errors", {
        get: function() {
          return this._errors;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControl.prototype, "pristine", {
        get: function() {
          return this._pristine;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControl.prototype, "dirty", {
        get: function() {
          return !this.pristine;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControl.prototype, "touched", {
        get: function() {
          return this._touched;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControl.prototype, "untouched", {
        get: function() {
          return !this._touched;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControl.prototype, "valueChanges", {
        get: function() {
          return this._valueChanges;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControl.prototype, "statusChanges", {
        get: function() {
          return this._statusChanges;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControl.prototype, "pending", {
        get: function() {
          return this._status == PENDING;
        },
        enumerable: true,
        configurable: true
      });
      AbstractControl.prototype.markAsTouched = function() {
        this._touched = true;
      };
      AbstractControl.prototype.markAsDirty = function(_a) {
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        onlySelf = normalizeBool(onlySelf);
        this._pristine = false;
        if (isPresent(this._parent) && !onlySelf) {
          this._parent.markAsDirty({onlySelf: onlySelf});
        }
      };
      AbstractControl.prototype.markAsPending = function(_a) {
        var onlySelf = (_a === void 0 ? {} : _a).onlySelf;
        onlySelf = normalizeBool(onlySelf);
        this._status = PENDING;
        if (isPresent(this._parent) && !onlySelf) {
          this._parent.markAsPending({onlySelf: onlySelf});
        }
      };
      AbstractControl.prototype.setParent = function(parent) {
        this._parent = parent;
      };
      AbstractControl.prototype.updateValueAndValidity = function(_a) {
        var _b = _a === void 0 ? {} : _a,
            onlySelf = _b.onlySelf,
            emitEvent = _b.emitEvent;
        onlySelf = normalizeBool(onlySelf);
        emitEvent = isPresent(emitEvent) ? emitEvent : true;
        this._updateValue();
        this._errors = this._runValidator();
        this._status = this._calculateStatus();
        if (this._status == VALID || this._status == PENDING) {
          this._runAsyncValidator(emitEvent);
        }
        if (emitEvent) {
          ObservableWrapper.callEmit(this._valueChanges, this._value);
          ObservableWrapper.callEmit(this._statusChanges, this._status);
        }
        if (isPresent(this._parent) && !onlySelf) {
          this._parent.updateValueAndValidity({
            onlySelf: onlySelf,
            emitEvent: emitEvent
          });
        }
      };
      AbstractControl.prototype._runValidator = function() {
        return isPresent(this.validator) ? this.validator(this) : null;
      };
      AbstractControl.prototype._runAsyncValidator = function(emitEvent) {
        var _this = this;
        if (isPresent(this.asyncValidator)) {
          this._status = PENDING;
          this._cancelExistingSubscription();
          var obs = toObservable(this.asyncValidator(this));
          this._asyncValidationSubscription = ObservableWrapper.subscribe(obs, function(res) {
            return _this.setErrors(res, {emitEvent: emitEvent});
          });
        }
      };
      AbstractControl.prototype._cancelExistingSubscription = function() {
        if (isPresent(this._asyncValidationSubscription)) {
          ObservableWrapper.dispose(this._asyncValidationSubscription);
        }
      };
      AbstractControl.prototype.setErrors = function(errors, _a) {
        var emitEvent = (_a === void 0 ? {} : _a).emitEvent;
        emitEvent = isPresent(emitEvent) ? emitEvent : true;
        this._errors = errors;
        this._status = this._calculateStatus();
        if (emitEvent) {
          ObservableWrapper.callEmit(this._statusChanges, this._status);
        }
        if (isPresent(this._parent)) {
          this._parent._updateControlsErrors();
        }
      };
      AbstractControl.prototype.find = function(path) {
        return _find(this, path);
      };
      AbstractControl.prototype.getError = function(errorCode, path) {
        if (path === void 0) {
          path = null;
        }
        var control = isPresent(path) && !ListWrapper.isEmpty(path) ? this.find(path) : this;
        if (isPresent(control) && isPresent(control._errors)) {
          return StringMapWrapper.get(control._errors, errorCode);
        } else {
          return null;
        }
      };
      AbstractControl.prototype.hasError = function(errorCode, path) {
        if (path === void 0) {
          path = null;
        }
        return isPresent(this.getError(errorCode, path));
      };
      Object.defineProperty(AbstractControl.prototype, "root", {
        get: function() {
          var x = this;
          while (isPresent(x._parent)) {
            x = x._parent;
          }
          return x;
        },
        enumerable: true,
        configurable: true
      });
      AbstractControl.prototype._updateControlsErrors = function() {
        this._status = this._calculateStatus();
        if (isPresent(this._parent)) {
          this._parent._updateControlsErrors();
        }
      };
      AbstractControl.prototype._initObservables = function() {
        this._valueChanges = new EventEmitter();
        this._statusChanges = new EventEmitter();
      };
      AbstractControl.prototype._calculateStatus = function() {
        if (isPresent(this._errors))
          return INVALID;
        if (this._anyControlsHaveStatus(PENDING))
          return PENDING;
        if (this._anyControlsHaveStatus(INVALID))
          return INVALID;
        return VALID;
      };
      return AbstractControl;
    }());
    var Control = (function(_super) {
      __extends(Control, _super);
      function Control(value, validator, asyncValidator) {
        if (value === void 0) {
          value = null;
        }
        if (validator === void 0) {
          validator = null;
        }
        if (asyncValidator === void 0) {
          asyncValidator = null;
        }
        _super.call(this, validator, asyncValidator);
        this._value = value;
        this.updateValueAndValidity({
          onlySelf: true,
          emitEvent: false
        });
        this._initObservables();
      }
      Control.prototype.updateValue = function(value, _a) {
        var _b = _a === void 0 ? {} : _a,
            onlySelf = _b.onlySelf,
            emitEvent = _b.emitEvent,
            emitModelToViewChange = _b.emitModelToViewChange;
        emitModelToViewChange = isPresent(emitModelToViewChange) ? emitModelToViewChange : true;
        this._value = value;
        if (isPresent(this._onChange) && emitModelToViewChange)
          this._onChange(this._value);
        this.updateValueAndValidity({
          onlySelf: onlySelf,
          emitEvent: emitEvent
        });
      };
      Control.prototype._updateValue = function() {};
      Control.prototype._anyControlsHaveStatus = function(status) {
        return false;
      };
      Control.prototype.registerOnChange = function(fn) {
        this._onChange = fn;
      };
      return Control;
    }(AbstractControl));
    var ControlGroup = (function(_super) {
      __extends(ControlGroup, _super);
      function ControlGroup(controls, optionals, validator, asyncValidator) {
        if (optionals === void 0) {
          optionals = null;
        }
        if (validator === void 0) {
          validator = null;
        }
        if (asyncValidator === void 0) {
          asyncValidator = null;
        }
        _super.call(this, validator, asyncValidator);
        this.controls = controls;
        this._optionals = isPresent(optionals) ? optionals : {};
        this._initObservables();
        this._setParentForControls();
        this.updateValueAndValidity({
          onlySelf: true,
          emitEvent: false
        });
      }
      ControlGroup.prototype.addControl = function(name, control) {
        this.controls[name] = control;
        control.setParent(this);
      };
      ControlGroup.prototype.removeControl = function(name) {
        StringMapWrapper.delete(this.controls, name);
      };
      ControlGroup.prototype.include = function(controlName) {
        StringMapWrapper.set(this._optionals, controlName, true);
        this.updateValueAndValidity();
      };
      ControlGroup.prototype.exclude = function(controlName) {
        StringMapWrapper.set(this._optionals, controlName, false);
        this.updateValueAndValidity();
      };
      ControlGroup.prototype.contains = function(controlName) {
        var c = StringMapWrapper.contains(this.controls, controlName);
        return c && this._included(controlName);
      };
      ControlGroup.prototype._setParentForControls = function() {
        var _this = this;
        StringMapWrapper.forEach(this.controls, function(control, name) {
          control.setParent(_this);
        });
      };
      ControlGroup.prototype._updateValue = function() {
        this._value = this._reduceValue();
      };
      ControlGroup.prototype._anyControlsHaveStatus = function(status) {
        var _this = this;
        var res = false;
        StringMapWrapper.forEach(this.controls, function(control, name) {
          res = res || (_this.contains(name) && control.status == status);
        });
        return res;
      };
      ControlGroup.prototype._reduceValue = function() {
        return this._reduceChildren({}, function(acc, control, name) {
          acc[name] = control.value;
          return acc;
        });
      };
      ControlGroup.prototype._reduceChildren = function(initValue, fn) {
        var _this = this;
        var res = initValue;
        StringMapWrapper.forEach(this.controls, function(control, name) {
          if (_this._included(name)) {
            res = fn(res, control, name);
          }
        });
        return res;
      };
      ControlGroup.prototype._included = function(controlName) {
        var isOptional = StringMapWrapper.contains(this._optionals, controlName);
        return !isOptional || StringMapWrapper.get(this._optionals, controlName);
      };
      return ControlGroup;
    }(AbstractControl));
    var ControlArray = (function(_super) {
      __extends(ControlArray, _super);
      function ControlArray(controls, validator, asyncValidator) {
        if (validator === void 0) {
          validator = null;
        }
        if (asyncValidator === void 0) {
          asyncValidator = null;
        }
        _super.call(this, validator, asyncValidator);
        this.controls = controls;
        this._initObservables();
        this._setParentForControls();
        this.updateValueAndValidity({
          onlySelf: true,
          emitEvent: false
        });
      }
      ControlArray.prototype.at = function(index) {
        return this.controls[index];
      };
      ControlArray.prototype.push = function(control) {
        this.controls.push(control);
        control.setParent(this);
        this.updateValueAndValidity();
      };
      ControlArray.prototype.insert = function(index, control) {
        ListWrapper.insert(this.controls, index, control);
        control.setParent(this);
        this.updateValueAndValidity();
      };
      ControlArray.prototype.removeAt = function(index) {
        ListWrapper.removeAt(this.controls, index);
        this.updateValueAndValidity();
      };
      Object.defineProperty(ControlArray.prototype, "length", {
        get: function() {
          return this.controls.length;
        },
        enumerable: true,
        configurable: true
      });
      ControlArray.prototype._updateValue = function() {
        this._value = this.controls.map(function(control) {
          return control.value;
        });
      };
      ControlArray.prototype._anyControlsHaveStatus = function(status) {
        return this.controls.some(function(c) {
          return c.status == status;
        });
      };
      ControlArray.prototype._setParentForControls = function() {
        var _this = this;
        this.controls.forEach(function(control) {
          control.setParent(_this);
        });
      };
      return ControlArray;
    }(AbstractControl));
    var AbstractControlDirective = (function() {
      function AbstractControlDirective() {}
      Object.defineProperty(AbstractControlDirective.prototype, "control", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControlDirective.prototype, "value", {
        get: function() {
          return isPresent(this.control) ? this.control.value : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControlDirective.prototype, "valid", {
        get: function() {
          return isPresent(this.control) ? this.control.valid : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControlDirective.prototype, "errors", {
        get: function() {
          return isPresent(this.control) ? this.control.errors : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControlDirective.prototype, "pristine", {
        get: function() {
          return isPresent(this.control) ? this.control.pristine : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControlDirective.prototype, "dirty", {
        get: function() {
          return isPresent(this.control) ? this.control.dirty : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControlDirective.prototype, "touched", {
        get: function() {
          return isPresent(this.control) ? this.control.touched : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControlDirective.prototype, "untouched", {
        get: function() {
          return isPresent(this.control) ? this.control.untouched : null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(AbstractControlDirective.prototype, "path", {
        get: function() {
          return null;
        },
        enumerable: true,
        configurable: true
      });
      return AbstractControlDirective;
    }());
    var ControlContainer = (function(_super) {
      __extends(ControlContainer, _super);
      function ControlContainer() {
        _super.apply(this, arguments);
      }
      Object.defineProperty(ControlContainer.prototype, "formDirective", {
        get: function() {
          return null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(ControlContainer.prototype, "path", {
        get: function() {
          return null;
        },
        enumerable: true,
        configurable: true
      });
      return ControlContainer;
    }(AbstractControlDirective));
    var NgControl = (function(_super) {
      __extends(NgControl, _super);
      function NgControl() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        _super.apply(this, args);
        this.name = null;
        this.valueAccessor = null;
      }
      Object.defineProperty(NgControl.prototype, "validator", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControl.prototype, "asyncValidator", {
        get: function() {
          return unimplemented();
        },
        enumerable: true,
        configurable: true
      });
      return NgControl;
    }(AbstractControlDirective));
    var NG_VALUE_ACCESSOR = new _angular_core.OpaqueToken("NgValueAccessor");
    var NG_VALIDATORS = new _angular_core.OpaqueToken("NgValidators");
    var NG_ASYNC_VALIDATORS = new _angular_core.OpaqueToken("NgAsyncValidators");
    var Validators = (function() {
      function Validators() {}
      Validators.required = function(control) {
        return isBlank(control.value) || (isString(control.value) && control.value == "") ? {"required": true} : null;
      };
      Validators.minLength = function(minLength) {
        return function(control) {
          if (isPresent(Validators.required(control)))
            return null;
          var v = control.value;
          return v.length < minLength ? {"minlength": {
              "requiredLength": minLength,
              "actualLength": v.length
            }} : null;
        };
      };
      Validators.maxLength = function(maxLength) {
        return function(control) {
          if (isPresent(Validators.required(control)))
            return null;
          var v = control.value;
          return v.length > maxLength ? {"maxlength": {
              "requiredLength": maxLength,
              "actualLength": v.length
            }} : null;
        };
      };
      Validators.pattern = function(pattern) {
        return function(control) {
          if (isPresent(Validators.required(control)))
            return null;
          var regex = new RegExp("^" + pattern + "$");
          var v = control.value;
          return regex.test(v) ? null : {"pattern": {
              "requiredPattern": "^" + pattern + "$",
              "actualValue": v
            }};
        };
      };
      Validators.nullValidator = function(c) {
        return null;
      };
      Validators.compose = function(validators) {
        if (isBlank(validators))
          return null;
        var presentValidators = validators.filter(isPresent);
        if (presentValidators.length == 0)
          return null;
        return function(control) {
          return _mergeErrors(_executeValidators(control, presentValidators));
        };
      };
      Validators.composeAsync = function(validators) {
        if (isBlank(validators))
          return null;
        var presentValidators = validators.filter(isPresent);
        if (presentValidators.length == 0)
          return null;
        return function(control) {
          var promises = _executeAsyncValidators(control, presentValidators).map(_convertToPromise);
          return PromiseWrapper.all(promises).then(_mergeErrors);
        };
      };
      return Validators;
    }());
    function _convertToPromise(obj) {
      return PromiseWrapper.isPromise(obj) ? obj : ObservableWrapper.toPromise(obj);
    }
    function _executeValidators(control, validators) {
      return validators.map(function(v) {
        return v(control);
      });
    }
    function _executeAsyncValidators(control, validators) {
      return validators.map(function(v) {
        return v(control);
      });
    }
    function _mergeErrors(arrayOfErrors) {
      var res = arrayOfErrors.reduce(function(res, errors) {
        return isPresent(errors) ? StringMapWrapper.merge(res, errors) : res;
      }, {});
      return StringMapWrapper.isEmpty(res) ? null : res;
    }
    var DEFAULT_VALUE_ACCESSOR = {
      provide: NG_VALUE_ACCESSOR,
      useExisting: _angular_core.forwardRef(function() {
        return DefaultValueAccessor;
      }),
      multi: true
    };
    var DefaultValueAccessor = (function() {
      function DefaultValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = function(_) {};
        this.onTouched = function() {};
      }
      DefaultValueAccessor.prototype.writeValue = function(value) {
        var normalizedValue = isBlank(value) ? '' : value;
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
      };
      DefaultValueAccessor.prototype.registerOnChange = function(fn) {
        this.onChange = fn;
      };
      DefaultValueAccessor.prototype.registerOnTouched = function(fn) {
        this.onTouched = fn;
      };
      return DefaultValueAccessor;
    }());
    DefaultValueAccessor.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: 'input:not([type=checkbox])[ngControl],textarea[ngControl],input:not([type=checkbox])[ngFormControl],textarea[ngFormControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
        host: {
          '(input)': 'onChange($event.target.value)',
          '(blur)': 'onTouched()'
        },
        bindings: [DEFAULT_VALUE_ACCESSOR]
      }]
    }];
    DefaultValueAccessor.ctorParameters = [{type: _angular_core.Renderer}, {type: _angular_core.ElementRef}];
    var NUMBER_VALUE_ACCESSOR = {
      provide: NG_VALUE_ACCESSOR,
      useExisting: _angular_core.forwardRef(function() {
        return NumberValueAccessor;
      }),
      multi: true
    };
    var NumberValueAccessor = (function() {
      function NumberValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = function(_) {};
        this.onTouched = function() {};
      }
      NumberValueAccessor.prototype.writeValue = function(value) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
      };
      NumberValueAccessor.prototype.registerOnChange = function(fn) {
        this.onChange = function(value) {
          fn(value == '' ? null : NumberWrapper.parseFloat(value));
        };
      };
      NumberValueAccessor.prototype.registerOnTouched = function(fn) {
        this.onTouched = fn;
      };
      return NumberValueAccessor;
    }());
    NumberValueAccessor.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: 'input[type=number][ngControl],input[type=number][ngFormControl],input[type=number][ngModel]',
        host: {
          '(change)': 'onChange($event.target.value)',
          '(input)': 'onChange($event.target.value)',
          '(blur)': 'onTouched()'
        },
        bindings: [NUMBER_VALUE_ACCESSOR]
      }]
    }];
    NumberValueAccessor.ctorParameters = [{type: _angular_core.Renderer}, {type: _angular_core.ElementRef}];
    var CHECKBOX_VALUE_ACCESSOR = {
      provide: NG_VALUE_ACCESSOR,
      useExisting: _angular_core.forwardRef(function() {
        return CheckboxControlValueAccessor;
      }),
      multi: true
    };
    var CheckboxControlValueAccessor = (function() {
      function CheckboxControlValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = function(_) {};
        this.onTouched = function() {};
      }
      CheckboxControlValueAccessor.prototype.writeValue = function(value) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', value);
      };
      CheckboxControlValueAccessor.prototype.registerOnChange = function(fn) {
        this.onChange = fn;
      };
      CheckboxControlValueAccessor.prototype.registerOnTouched = function(fn) {
        this.onTouched = fn;
      };
      return CheckboxControlValueAccessor;
    }());
    CheckboxControlValueAccessor.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: 'input[type=checkbox][ngControl],input[type=checkbox][ngFormControl],input[type=checkbox][ngModel]',
        host: {
          '(change)': 'onChange($event.target.checked)',
          '(blur)': 'onTouched()'
        },
        providers: [CHECKBOX_VALUE_ACCESSOR]
      }]
    }];
    CheckboxControlValueAccessor.ctorParameters = [{type: _angular_core.Renderer}, {type: _angular_core.ElementRef}];
    var SELECT_VALUE_ACCESSOR = {
      provide: NG_VALUE_ACCESSOR,
      useExisting: _angular_core.forwardRef(function() {
        return SelectControlValueAccessor;
      }),
      multi: true
    };
    function _buildValueString(id, value) {
      if (isBlank(id))
        return "" + value;
      if (!isPrimitive(value))
        value = "Object";
      return StringWrapper.slice(id + ": " + value, 0, 50);
    }
    function _extractId(valueString) {
      return valueString.split(":")[0];
    }
    var SelectControlValueAccessor = (function() {
      function SelectControlValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._optionMap = new Map();
        this._idCounter = 0;
        this.onChange = function(_) {};
        this.onTouched = function() {};
      }
      SelectControlValueAccessor.prototype.writeValue = function(value) {
        this.value = value;
        var valueString = _buildValueString(this._getOptionId(value), value);
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', valueString);
      };
      SelectControlValueAccessor.prototype.registerOnChange = function(fn) {
        var _this = this;
        this.onChange = function(valueString) {
          fn(_this._getOptionValue(valueString));
        };
      };
      SelectControlValueAccessor.prototype.registerOnTouched = function(fn) {
        this.onTouched = fn;
      };
      SelectControlValueAccessor.prototype._registerOption = function() {
        return (this._idCounter++).toString();
      };
      SelectControlValueAccessor.prototype._getOptionId = function(value) {
        for (var _i = 0,
            _a = MapWrapper.keys(this._optionMap); _i < _a.length; _i++) {
          var id = _a[_i];
          if (looseIdentical(this._optionMap.get(id), value))
            return id;
        }
        return null;
      };
      SelectControlValueAccessor.prototype._getOptionValue = function(valueString) {
        var value = this._optionMap.get(_extractId(valueString));
        return isPresent(value) ? value : valueString;
      };
      return SelectControlValueAccessor;
    }());
    SelectControlValueAccessor.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: 'select[ngControl],select[ngFormControl],select[ngModel]',
        host: {
          '(change)': 'onChange($event.target.value)',
          '(blur)': 'onTouched()'
        },
        providers: [SELECT_VALUE_ACCESSOR]
      }]
    }];
    SelectControlValueAccessor.ctorParameters = [{type: _angular_core.Renderer}, {type: _angular_core.ElementRef}];
    var NgSelectOption = (function() {
      function NgSelectOption(_element, _renderer, _select) {
        this._element = _element;
        this._renderer = _renderer;
        this._select = _select;
        if (isPresent(this._select))
          this.id = this._select._registerOption();
      }
      Object.defineProperty(NgSelectOption.prototype, "ngValue", {
        set: function(value) {
          if (this._select == null)
            return;
          this._select._optionMap.set(this.id, value);
          this._setElementValue(_buildValueString(this.id, value));
          this._select.writeValue(this._select.value);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgSelectOption.prototype, "value", {
        set: function(value) {
          this._setElementValue(value);
          if (isPresent(this._select))
            this._select.writeValue(this._select.value);
        },
        enumerable: true,
        configurable: true
      });
      NgSelectOption.prototype._setElementValue = function(value) {
        this._renderer.setElementProperty(this._element.nativeElement, 'value', value);
      };
      NgSelectOption.prototype.ngOnDestroy = function() {
        if (isPresent(this._select)) {
          this._select._optionMap.delete(this.id);
          this._select.writeValue(this._select.value);
        }
      };
      return NgSelectOption;
    }());
    NgSelectOption.decorators = [{
      type: _angular_core.Directive,
      args: [{selector: 'option'}]
    }];
    NgSelectOption.ctorParameters = [{type: _angular_core.ElementRef}, {type: _angular_core.Renderer}, {
      type: SelectControlValueAccessor,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Host}]
    }];
    NgSelectOption.propDecorators = {
      'ngValue': [{
        type: _angular_core.Input,
        args: ['ngValue']
      }],
      'value': [{
        type: _angular_core.Input,
        args: ['value']
      }]
    };
    var RADIO_VALUE_ACCESSOR = {
      provide: NG_VALUE_ACCESSOR,
      useExisting: _angular_core.forwardRef(function() {
        return RadioControlValueAccessor;
      }),
      multi: true
    };
    var RadioControlRegistry = (function() {
      function RadioControlRegistry() {
        this._accessors = [];
      }
      RadioControlRegistry.prototype.add = function(control, accessor) {
        this._accessors.push([control, accessor]);
      };
      RadioControlRegistry.prototype.remove = function(accessor) {
        var indexToRemove = -1;
        for (var i = 0; i < this._accessors.length; ++i) {
          if (this._accessors[i][1] === accessor) {
            indexToRemove = i;
          }
        }
        ListWrapper.removeAt(this._accessors, indexToRemove);
      };
      RadioControlRegistry.prototype.select = function(accessor) {
        this._accessors.forEach(function(c) {
          if (c[0].control.root === accessor._control.control.root && c[1] !== accessor) {
            c[1].fireUncheck();
          }
        });
      };
      return RadioControlRegistry;
    }());
    RadioControlRegistry.decorators = [{type: _angular_core.Injectable}];
    var RadioButtonState = (function() {
      function RadioButtonState(checked, value) {
        this.checked = checked;
        this.value = value;
      }
      return RadioButtonState;
    }());
    var RadioControlValueAccessor = (function() {
      function RadioControlValueAccessor(_renderer, _elementRef, _registry, _injector) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._registry = _registry;
        this._injector = _injector;
        this.onChange = function() {};
        this.onTouched = function() {};
      }
      RadioControlValueAccessor.prototype.ngOnInit = function() {
        this._control = this._injector.get(NgControl);
        this._registry.add(this._control, this);
      };
      RadioControlValueAccessor.prototype.ngOnDestroy = function() {
        this._registry.remove(this);
      };
      RadioControlValueAccessor.prototype.writeValue = function(value) {
        this._state = value;
        if (isPresent(value) && value.checked) {
          this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', true);
        }
      };
      RadioControlValueAccessor.prototype.registerOnChange = function(fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function() {
          fn(new RadioButtonState(true, _this._state.value));
          _this._registry.select(_this);
        };
      };
      RadioControlValueAccessor.prototype.fireUncheck = function() {
        this._fn(new RadioButtonState(false, this._state.value));
      };
      RadioControlValueAccessor.prototype.registerOnTouched = function(fn) {
        this.onTouched = fn;
      };
      return RadioControlValueAccessor;
    }());
    RadioControlValueAccessor.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: 'input[type=radio][ngControl],input[type=radio][ngFormControl],input[type=radio][ngModel]',
        host: {
          '(change)': 'onChange()',
          '(blur)': 'onTouched()'
        },
        providers: [RADIO_VALUE_ACCESSOR]
      }]
    }];
    RadioControlValueAccessor.ctorParameters = [{type: _angular_core.Renderer}, {type: _angular_core.ElementRef}, {type: RadioControlRegistry}, {type: _angular_core.Injector}];
    RadioControlValueAccessor.propDecorators = {'name': [{type: _angular_core.Input}]};
    function normalizeValidator(validator) {
      if (validator.validate !== undefined) {
        return function(c) {
          return validator.validate(c);
        };
      } else {
        return validator;
      }
    }
    function normalizeAsyncValidator(validator) {
      if (validator.validate !== undefined) {
        return function(c) {
          return Promise.resolve(validator.validate(c));
        };
      } else {
        return validator;
      }
    }
    function controlPath(name, parent) {
      var p = ListWrapper.clone(parent.path);
      p.push(name);
      return p;
    }
    function setUpControl(control, dir) {
      if (isBlank(control))
        _throwError(dir, "Cannot find control");
      if (isBlank(dir.valueAccessor))
        _throwError(dir, "No value accessor for");
      control.validator = Validators.compose([control.validator, dir.validator]);
      control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
      dir.valueAccessor.writeValue(control.value);
      dir.valueAccessor.registerOnChange(function(newValue) {
        dir.viewToModelUpdate(newValue);
        control.updateValue(newValue, {emitModelToViewChange: false});
        control.markAsDirty();
      });
      control.registerOnChange(function(newValue) {
        return dir.valueAccessor.writeValue(newValue);
      });
      dir.valueAccessor.registerOnTouched(function() {
        return control.markAsTouched();
      });
    }
    function setUpControlGroup(control, dir) {
      if (isBlank(control))
        _throwError(dir, "Cannot find control");
      control.validator = Validators.compose([control.validator, dir.validator]);
      control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
    }
    function _throwError(dir, message) {
      var path = dir.path.join(" -> ");
      throw new BaseException(message + " '" + path + "'");
    }
    function composeValidators(validators) {
      return isPresent(validators) ? Validators.compose(validators.map(normalizeValidator)) : null;
    }
    function composeAsyncValidators(validators) {
      return isPresent(validators) ? Validators.composeAsync(validators.map(normalizeAsyncValidator)) : null;
    }
    function isPropertyUpdated(changes, viewModel) {
      if (!StringMapWrapper.contains(changes, "model"))
        return false;
      var change = changes["model"];
      if (change.isFirstChange())
        return true;
      return !looseIdentical(viewModel, change.currentValue);
    }
    function selectValueAccessor(dir, valueAccessors) {
      if (isBlank(valueAccessors))
        return null;
      var defaultAccessor;
      var builtinAccessor;
      var customAccessor;
      valueAccessors.forEach(function(v) {
        if (hasConstructor(v, DefaultValueAccessor)) {
          defaultAccessor = v;
        } else if (hasConstructor(v, CheckboxControlValueAccessor) || hasConstructor(v, NumberValueAccessor) || hasConstructor(v, SelectControlValueAccessor) || hasConstructor(v, RadioControlValueAccessor)) {
          if (isPresent(builtinAccessor))
            _throwError(dir, "More than one built-in value accessor matches");
          builtinAccessor = v;
        } else {
          if (isPresent(customAccessor))
            _throwError(dir, "More than one custom value accessor matches");
          customAccessor = v;
        }
      });
      if (isPresent(customAccessor))
        return customAccessor;
      if (isPresent(builtinAccessor))
        return builtinAccessor;
      if (isPresent(defaultAccessor))
        return defaultAccessor;
      _throwError(dir, "No valid value accessor for");
      return null;
    }
    var controlNameBinding = {
      provide: NgControl,
      useExisting: _angular_core.forwardRef(function() {
        return NgControlName;
      })
    };
    var NgControlName = (function(_super) {
      __extends(NgControlName, _super);
      function NgControlName(_parent, _validators, _asyncValidators, valueAccessors) {
        _super.call(this);
        this._parent = _parent;
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        this.update = new EventEmitter();
        this._added = false;
        this.valueAccessor = selectValueAccessor(this, valueAccessors);
      }
      NgControlName.prototype.ngOnChanges = function(changes) {
        if (!this._added) {
          this.formDirective.addControl(this);
          this._added = true;
        }
        if (isPropertyUpdated(changes, this.viewModel)) {
          this.viewModel = this.model;
          this.formDirective.updateModel(this, this.model);
        }
      };
      NgControlName.prototype.ngOnDestroy = function() {
        this.formDirective.removeControl(this);
      };
      NgControlName.prototype.viewToModelUpdate = function(newValue) {
        this.viewModel = newValue;
        ObservableWrapper.callEmit(this.update, newValue);
      };
      Object.defineProperty(NgControlName.prototype, "path", {
        get: function() {
          return controlPath(this.name, this._parent);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControlName.prototype, "formDirective", {
        get: function() {
          return this._parent.formDirective;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControlName.prototype, "validator", {
        get: function() {
          return composeValidators(this._validators);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControlName.prototype, "asyncValidator", {
        get: function() {
          return composeAsyncValidators(this._asyncValidators);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControlName.prototype, "control", {
        get: function() {
          return this.formDirective.getControl(this);
        },
        enumerable: true,
        configurable: true
      });
      return NgControlName;
    }(NgControl));
    NgControlName.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[ngControl]',
        bindings: [controlNameBinding],
        inputs: ['name: ngControl', 'model: ngModel'],
        outputs: ['update: ngModelChange'],
        exportAs: 'ngForm'
      }]
    }];
    NgControlName.ctorParameters = [{
      type: ControlContainer,
      decorators: [{type: _angular_core.Host}, {type: _angular_core.SkipSelf}]
    }, {
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_VALUE_ACCESSOR]
      }]
    }];
    var formControlBinding = {
      provide: NgControl,
      useExisting: _angular_core.forwardRef(function() {
        return NgFormControl;
      })
    };
    var NgFormControl = (function(_super) {
      __extends(NgFormControl, _super);
      function NgFormControl(_validators, _asyncValidators, valueAccessors) {
        _super.call(this);
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        this.update = new EventEmitter();
        this.valueAccessor = selectValueAccessor(this, valueAccessors);
      }
      NgFormControl.prototype.ngOnChanges = function(changes) {
        if (this._isControlChanged(changes)) {
          setUpControl(this.form, this);
          this.form.updateValueAndValidity({emitEvent: false});
        }
        if (isPropertyUpdated(changes, this.viewModel)) {
          this.form.updateValue(this.model);
          this.viewModel = this.model;
        }
      };
      Object.defineProperty(NgFormControl.prototype, "path", {
        get: function() {
          return [];
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgFormControl.prototype, "validator", {
        get: function() {
          return composeValidators(this._validators);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgFormControl.prototype, "asyncValidator", {
        get: function() {
          return composeAsyncValidators(this._asyncValidators);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgFormControl.prototype, "control", {
        get: function() {
          return this.form;
        },
        enumerable: true,
        configurable: true
      });
      NgFormControl.prototype.viewToModelUpdate = function(newValue) {
        this.viewModel = newValue;
        ObservableWrapper.callEmit(this.update, newValue);
      };
      NgFormControl.prototype._isControlChanged = function(changes) {
        return StringMapWrapper.contains(changes, "form");
      };
      return NgFormControl;
    }(NgControl));
    NgFormControl.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[ngFormControl]',
        bindings: [formControlBinding],
        inputs: ['form: ngFormControl', 'model: ngModel'],
        outputs: ['update: ngModelChange'],
        exportAs: 'ngForm'
      }]
    }];
    NgFormControl.ctorParameters = [{
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_VALUE_ACCESSOR]
      }]
    }];
    var formControlBinding$1 = {
      provide: NgControl,
      useExisting: _angular_core.forwardRef(function() {
        return NgModel;
      })
    };
    var NgModel = (function(_super) {
      __extends(NgModel, _super);
      function NgModel(_validators, _asyncValidators, valueAccessors) {
        _super.call(this);
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        this._control = new Control();
        this._added = false;
        this.update = new EventEmitter();
        this.valueAccessor = selectValueAccessor(this, valueAccessors);
      }
      NgModel.prototype.ngOnChanges = function(changes) {
        if (!this._added) {
          setUpControl(this._control, this);
          this._control.updateValueAndValidity({emitEvent: false});
          this._added = true;
        }
        if (isPropertyUpdated(changes, this.viewModel)) {
          this._control.updateValue(this.model);
          this.viewModel = this.model;
        }
      };
      Object.defineProperty(NgModel.prototype, "control", {
        get: function() {
          return this._control;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgModel.prototype, "path", {
        get: function() {
          return [];
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgModel.prototype, "validator", {
        get: function() {
          return composeValidators(this._validators);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgModel.prototype, "asyncValidator", {
        get: function() {
          return composeAsyncValidators(this._asyncValidators);
        },
        enumerable: true,
        configurable: true
      });
      NgModel.prototype.viewToModelUpdate = function(newValue) {
        this.viewModel = newValue;
        ObservableWrapper.callEmit(this.update, newValue);
      };
      return NgModel;
    }(NgControl));
    NgModel.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[ngModel]:not([ngControl]):not([ngFormControl])',
        bindings: [formControlBinding$1],
        inputs: ['model: ngModel'],
        outputs: ['update: ngModelChange'],
        exportAs: 'ngForm'
      }]
    }];
    NgModel.ctorParameters = [{
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_VALUE_ACCESSOR]
      }]
    }];
    var controlGroupProvider = {
      provide: ControlContainer,
      useExisting: _angular_core.forwardRef(function() {
        return NgControlGroup;
      })
    };
    var NgControlGroup = (function(_super) {
      __extends(NgControlGroup, _super);
      function NgControlGroup(parent, _validators, _asyncValidators) {
        _super.call(this);
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        this._parent = parent;
      }
      NgControlGroup.prototype.ngOnInit = function() {
        this.formDirective.addControlGroup(this);
      };
      NgControlGroup.prototype.ngOnDestroy = function() {
        this.formDirective.removeControlGroup(this);
      };
      Object.defineProperty(NgControlGroup.prototype, "control", {
        get: function() {
          return this.formDirective.getControlGroup(this);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControlGroup.prototype, "path", {
        get: function() {
          return controlPath(this.name, this._parent);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControlGroup.prototype, "formDirective", {
        get: function() {
          return this._parent.formDirective;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControlGroup.prototype, "validator", {
        get: function() {
          return composeValidators(this._validators);
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControlGroup.prototype, "asyncValidator", {
        get: function() {
          return composeAsyncValidators(this._asyncValidators);
        },
        enumerable: true,
        configurable: true
      });
      return NgControlGroup;
    }(ControlContainer));
    NgControlGroup.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[ngControlGroup]',
        providers: [controlGroupProvider],
        inputs: ['name: ngControlGroup'],
        exportAs: 'ngForm'
      }]
    }];
    NgControlGroup.ctorParameters = [{
      type: ControlContainer,
      decorators: [{type: _angular_core.Host}, {type: _angular_core.SkipSelf}]
    }, {
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }];
    var formDirectiveProvider = {
      provide: ControlContainer,
      useExisting: _angular_core.forwardRef(function() {
        return NgFormModel;
      })
    };
    var NgFormModel = (function(_super) {
      __extends(NgFormModel, _super);
      function NgFormModel(_validators, _asyncValidators) {
        _super.call(this);
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        this.form = null;
        this.directives = [];
        this.ngSubmit = new EventEmitter();
      }
      NgFormModel.prototype.ngOnChanges = function(changes) {
        this._checkFormPresent();
        if (StringMapWrapper.contains(changes, "form")) {
          var sync = composeValidators(this._validators);
          this.form.validator = Validators.compose([this.form.validator, sync]);
          var async = composeAsyncValidators(this._asyncValidators);
          this.form.asyncValidator = Validators.composeAsync([this.form.asyncValidator, async]);
          this.form.updateValueAndValidity({
            onlySelf: true,
            emitEvent: false
          });
        }
        this._updateDomValue();
      };
      Object.defineProperty(NgFormModel.prototype, "formDirective", {
        get: function() {
          return this;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgFormModel.prototype, "control", {
        get: function() {
          return this.form;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgFormModel.prototype, "path", {
        get: function() {
          return [];
        },
        enumerable: true,
        configurable: true
      });
      NgFormModel.prototype.addControl = function(dir) {
        var ctrl = this.form.find(dir.path);
        setUpControl(ctrl, dir);
        ctrl.updateValueAndValidity({emitEvent: false});
        this.directives.push(dir);
      };
      NgFormModel.prototype.getControl = function(dir) {
        return this.form.find(dir.path);
      };
      NgFormModel.prototype.removeControl = function(dir) {
        ListWrapper.remove(this.directives, dir);
      };
      NgFormModel.prototype.addControlGroup = function(dir) {
        var ctrl = this.form.find(dir.path);
        setUpControlGroup(ctrl, dir);
        ctrl.updateValueAndValidity({emitEvent: false});
      };
      NgFormModel.prototype.removeControlGroup = function(dir) {};
      NgFormModel.prototype.getControlGroup = function(dir) {
        return this.form.find(dir.path);
      };
      NgFormModel.prototype.updateModel = function(dir, value) {
        var ctrl = this.form.find(dir.path);
        ctrl.updateValue(value);
      };
      NgFormModel.prototype.onSubmit = function() {
        ObservableWrapper.callEmit(this.ngSubmit, null);
        return false;
      };
      NgFormModel.prototype._updateDomValue = function() {
        var _this = this;
        this.directives.forEach(function(dir) {
          var ctrl = _this.form.find(dir.path);
          dir.valueAccessor.writeValue(ctrl.value);
        });
      };
      NgFormModel.prototype._checkFormPresent = function() {
        if (isBlank(this.form)) {
          throw new BaseException("ngFormModel expects a form. Please pass one in. Example: <form [ngFormModel]=\"myCoolForm\">");
        }
      };
      return NgFormModel;
    }(ControlContainer));
    NgFormModel.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[ngFormModel]',
        bindings: [formDirectiveProvider],
        inputs: ['form: ngFormModel'],
        host: {'(submit)': 'onSubmit()'},
        outputs: ['ngSubmit'],
        exportAs: 'ngForm'
      }]
    }];
    NgFormModel.ctorParameters = [{
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }];
    var formDirectiveProvider$1 = {
      provide: ControlContainer,
      useExisting: _angular_core.forwardRef(function() {
        return NgForm;
      })
    };
    var NgForm = (function(_super) {
      __extends(NgForm, _super);
      function NgForm(validators, asyncValidators) {
        _super.call(this);
        this.ngSubmit = new EventEmitter();
        this.form = new ControlGroup({}, null, composeValidators(validators), composeAsyncValidators(asyncValidators));
      }
      Object.defineProperty(NgForm.prototype, "formDirective", {
        get: function() {
          return this;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgForm.prototype, "control", {
        get: function() {
          return this.form;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgForm.prototype, "path", {
        get: function() {
          return [];
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgForm.prototype, "controls", {
        get: function() {
          return this.form.controls;
        },
        enumerable: true,
        configurable: true
      });
      NgForm.prototype.addControl = function(dir) {
        var _this = this;
        PromiseWrapper.scheduleMicrotask(function() {
          var container = _this._findContainer(dir.path);
          var ctrl = new Control();
          setUpControl(ctrl, dir);
          container.addControl(dir.name, ctrl);
          ctrl.updateValueAndValidity({emitEvent: false});
        });
      };
      NgForm.prototype.getControl = function(dir) {
        return this.form.find(dir.path);
      };
      NgForm.prototype.removeControl = function(dir) {
        var _this = this;
        PromiseWrapper.scheduleMicrotask(function() {
          var container = _this._findContainer(dir.path);
          if (isPresent(container)) {
            container.removeControl(dir.name);
            container.updateValueAndValidity({emitEvent: false});
          }
        });
      };
      NgForm.prototype.addControlGroup = function(dir) {
        var _this = this;
        PromiseWrapper.scheduleMicrotask(function() {
          var container = _this._findContainer(dir.path);
          var group = new ControlGroup({});
          setUpControlGroup(group, dir);
          container.addControl(dir.name, group);
          group.updateValueAndValidity({emitEvent: false});
        });
      };
      NgForm.prototype.removeControlGroup = function(dir) {
        var _this = this;
        PromiseWrapper.scheduleMicrotask(function() {
          var container = _this._findContainer(dir.path);
          if (isPresent(container)) {
            container.removeControl(dir.name);
            container.updateValueAndValidity({emitEvent: false});
          }
        });
      };
      NgForm.prototype.getControlGroup = function(dir) {
        return this.form.find(dir.path);
      };
      NgForm.prototype.updateModel = function(dir, value) {
        var _this = this;
        PromiseWrapper.scheduleMicrotask(function() {
          var ctrl = _this.form.find(dir.path);
          ctrl.updateValue(value);
        });
      };
      NgForm.prototype.onSubmit = function() {
        ObservableWrapper.callEmit(this.ngSubmit, null);
        return false;
      };
      NgForm.prototype._findContainer = function(path) {
        path.pop();
        return ListWrapper.isEmpty(path) ? this.form : this.form.find(path);
      };
      return NgForm;
    }(ControlContainer));
    NgForm.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: 'form:not([ngNoForm]):not([ngFormModel]),ngForm,[ngForm]',
        bindings: [formDirectiveProvider$1],
        host: {'(submit)': 'onSubmit()'},
        outputs: ['ngSubmit'],
        exportAs: 'ngForm'
      }]
    }];
    NgForm.ctorParameters = [{
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_VALIDATORS]
      }]
    }, {
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {type: _angular_core.Self}, {
        type: _angular_core.Inject,
        args: [NG_ASYNC_VALIDATORS]
      }]
    }];
    var NgControlStatus = (function() {
      function NgControlStatus(cd) {
        this._cd = cd;
      }
      Object.defineProperty(NgControlStatus.prototype, "ngClassUntouched", {
        get: function() {
          return isPresent(this._cd.control) ? this._cd.control.untouched : false;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControlStatus.prototype, "ngClassTouched", {
        get: function() {
          return isPresent(this._cd.control) ? this._cd.control.touched : false;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControlStatus.prototype, "ngClassPristine", {
        get: function() {
          return isPresent(this._cd.control) ? this._cd.control.pristine : false;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControlStatus.prototype, "ngClassDirty", {
        get: function() {
          return isPresent(this._cd.control) ? this._cd.control.dirty : false;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControlStatus.prototype, "ngClassValid", {
        get: function() {
          return isPresent(this._cd.control) ? this._cd.control.valid : false;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(NgControlStatus.prototype, "ngClassInvalid", {
        get: function() {
          return isPresent(this._cd.control) ? !this._cd.control.valid : false;
        },
        enumerable: true,
        configurable: true
      });
      return NgControlStatus;
    }());
    NgControlStatus.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[ngControl],[ngModel],[ngFormControl]',
        host: {
          '[class.ng-untouched]': 'ngClassUntouched',
          '[class.ng-touched]': 'ngClassTouched',
          '[class.ng-pristine]': 'ngClassPristine',
          '[class.ng-dirty]': 'ngClassDirty',
          '[class.ng-valid]': 'ngClassValid',
          '[class.ng-invalid]': 'ngClassInvalid'
        }
      }]
    }];
    NgControlStatus.ctorParameters = [{
      type: NgControl,
      decorators: [{type: _angular_core.Self}]
    }];
    var REQUIRED = Validators.required;
    var REQUIRED_VALIDATOR = {
      provide: NG_VALIDATORS,
      useValue: REQUIRED,
      multi: true
    };
    var RequiredValidator = (function() {
      function RequiredValidator() {}
      return RequiredValidator;
    }());
    RequiredValidator.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[required][ngControl],[required][ngFormControl],[required][ngModel]',
        providers: [REQUIRED_VALIDATOR]
      }]
    }];
    var MIN_LENGTH_VALIDATOR = {
      provide: NG_VALIDATORS,
      useExisting: _angular_core.forwardRef(function() {
        return MinLengthValidator;
      }),
      multi: true
    };
    var MinLengthValidator = (function() {
      function MinLengthValidator(minLength) {
        this._validator = Validators.minLength(NumberWrapper.parseInt(minLength, 10));
      }
      MinLengthValidator.prototype.validate = function(c) {
        return this._validator(c);
      };
      return MinLengthValidator;
    }());
    MinLengthValidator.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[minlength][ngControl],[minlength][ngFormControl],[minlength][ngModel]',
        providers: [MIN_LENGTH_VALIDATOR]
      }]
    }];
    MinLengthValidator.ctorParameters = [{
      type: undefined,
      decorators: [{
        type: _angular_core.Attribute,
        args: ["minlength"]
      }]
    }];
    var MAX_LENGTH_VALIDATOR = {
      provide: NG_VALIDATORS,
      useExisting: _angular_core.forwardRef(function() {
        return MaxLengthValidator;
      }),
      multi: true
    };
    var MaxLengthValidator = (function() {
      function MaxLengthValidator(maxLength) {
        this._validator = Validators.maxLength(NumberWrapper.parseInt(maxLength, 10));
      }
      MaxLengthValidator.prototype.validate = function(c) {
        return this._validator(c);
      };
      return MaxLengthValidator;
    }());
    MaxLengthValidator.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[maxlength][ngControl],[maxlength][ngFormControl],[maxlength][ngModel]',
        providers: [MAX_LENGTH_VALIDATOR]
      }]
    }];
    MaxLengthValidator.ctorParameters = [{
      type: undefined,
      decorators: [{
        type: _angular_core.Attribute,
        args: ["maxlength"]
      }]
    }];
    var PATTERN_VALIDATOR = {
      provide: NG_VALIDATORS,
      useExisting: _angular_core.forwardRef(function() {
        return PatternValidator;
      }),
      multi: true
    };
    var PatternValidator = (function() {
      function PatternValidator(pattern) {
        this._validator = Validators.pattern(pattern);
      }
      PatternValidator.prototype.validate = function(c) {
        return this._validator(c);
      };
      return PatternValidator;
    }());
    PatternValidator.decorators = [{
      type: _angular_core.Directive,
      args: [{
        selector: '[pattern][ngControl],[pattern][ngFormControl],[pattern][ngModel]',
        providers: [PATTERN_VALIDATOR]
      }]
    }];
    PatternValidator.ctorParameters = [{
      type: undefined,
      decorators: [{
        type: _angular_core.Attribute,
        args: ["pattern"]
      }]
    }];
    var FORM_DIRECTIVES = [NgControlName, NgControlGroup, NgFormControl, NgModel, NgFormModel, NgForm, NgSelectOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, RadioControlValueAccessor, NgControlStatus, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator];
    var FormBuilder = (function() {
      function FormBuilder() {}
      FormBuilder.prototype.group = function(controlsConfig, extra) {
        if (extra === void 0) {
          extra = null;
        }
        var controls = this._reduceControls(controlsConfig);
        var optionals = (isPresent(extra) ? StringMapWrapper.get(extra, "optionals") : null);
        var validator = isPresent(extra) ? StringMapWrapper.get(extra, "validator") : null;
        var asyncValidator = isPresent(extra) ? StringMapWrapper.get(extra, "asyncValidator") : null;
        return new ControlGroup(controls, optionals, validator, asyncValidator);
      };
      FormBuilder.prototype.control = function(value, validator, asyncValidator) {
        if (validator === void 0) {
          validator = null;
        }
        if (asyncValidator === void 0) {
          asyncValidator = null;
        }
        return new Control(value, validator, asyncValidator);
      };
      FormBuilder.prototype.array = function(controlsConfig, validator, asyncValidator) {
        var _this = this;
        if (validator === void 0) {
          validator = null;
        }
        if (asyncValidator === void 0) {
          asyncValidator = null;
        }
        var controls = controlsConfig.map(function(c) {
          return _this._createControl(c);
        });
        return new ControlArray(controls, validator, asyncValidator);
      };
      FormBuilder.prototype._reduceControls = function(controlsConfig) {
        var _this = this;
        var controls = {};
        StringMapWrapper.forEach(controlsConfig, function(controlConfig, controlName) {
          controls[controlName] = _this._createControl(controlConfig);
        });
        return controls;
      };
      FormBuilder.prototype._createControl = function(controlConfig) {
        if (controlConfig instanceof Control || controlConfig instanceof ControlGroup || controlConfig instanceof ControlArray) {
          return controlConfig;
        } else if (isArray(controlConfig)) {
          var value = controlConfig[0];
          var validator = controlConfig.length > 1 ? controlConfig[1] : null;
          var asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
          return this.control(value, validator, asyncValidator);
        } else {
          return this.control(controlConfig);
        }
      };
      return FormBuilder;
    }());
    FormBuilder.decorators = [{type: _angular_core.Injectable}];
    var FORM_PROVIDERS = [FormBuilder, RadioControlRegistry];
    var FORM_BINDINGS = FORM_PROVIDERS;
    var COMMON_DIRECTIVES = [CORE_DIRECTIVES, FORM_DIRECTIVES];
    var PlatformLocation = (function() {
      function PlatformLocation() {}
      Object.defineProperty(PlatformLocation.prototype, "pathname", {
        get: function() {
          return null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PlatformLocation.prototype, "search", {
        get: function() {
          return null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(PlatformLocation.prototype, "hash", {
        get: function() {
          return null;
        },
        enumerable: true,
        configurable: true
      });
      return PlatformLocation;
    }());
    var LocationStrategy = (function() {
      function LocationStrategy() {}
      return LocationStrategy;
    }());
    var APP_BASE_HREF = new _angular_core.OpaqueToken('appBaseHref');
    var Location = (function() {
      function Location(platformStrategy) {
        var _this = this;
        this.platformStrategy = platformStrategy;
        this._subject = new EventEmitter();
        var browserBaseHref = this.platformStrategy.getBaseHref();
        this._baseHref = Location.stripTrailingSlash(_stripIndexHtml(browserBaseHref));
        this.platformStrategy.onPopState(function(ev) {
          ObservableWrapper.callEmit(_this._subject, {
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
        return ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
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
      return Location;
    }());
    Location.decorators = [{type: _angular_core.Injectable}];
    Location.ctorParameters = [{type: LocationStrategy}];
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
    var HashLocationStrategy = (function(_super) {
      __extends(HashLocationStrategy, _super);
      function HashLocationStrategy(_platformLocation, _baseHref) {
        _super.call(this);
        this._platformLocation = _platformLocation;
        this._baseHref = '';
        if (isPresent(_baseHref)) {
          this._baseHref = _baseHref;
        }
      }
      HashLocationStrategy.prototype.onPopState = function(fn) {
        this._platformLocation.onPopState(fn);
        this._platformLocation.onHashChange(fn);
      };
      HashLocationStrategy.prototype.getBaseHref = function() {
        return this._baseHref;
      };
      HashLocationStrategy.prototype.path = function() {
        var path = this._platformLocation.hash;
        if (!isPresent(path))
          path = '#';
        return (path.length > 0 ? path.substring(1) : path);
      };
      HashLocationStrategy.prototype.prepareExternalUrl = function(internal) {
        var url = Location.joinWithSlash(this._baseHref, internal);
        return url.length > 0 ? ('#' + url) : url;
      };
      HashLocationStrategy.prototype.pushState = function(state, title, path, queryParams) {
        var url = this.prepareExternalUrl(path + Location.normalizeQueryParams(queryParams));
        if (url.length == 0) {
          url = this._platformLocation.pathname;
        }
        this._platformLocation.pushState(state, title, url);
      };
      HashLocationStrategy.prototype.replaceState = function(state, title, path, queryParams) {
        var url = this.prepareExternalUrl(path + Location.normalizeQueryParams(queryParams));
        if (url.length == 0) {
          url = this._platformLocation.pathname;
        }
        this._platformLocation.replaceState(state, title, url);
      };
      HashLocationStrategy.prototype.forward = function() {
        this._platformLocation.forward();
      };
      HashLocationStrategy.prototype.back = function() {
        this._platformLocation.back();
      };
      return HashLocationStrategy;
    }(LocationStrategy));
    HashLocationStrategy.decorators = [{type: _angular_core.Injectable}];
    HashLocationStrategy.ctorParameters = [{type: PlatformLocation}, {
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {
        type: _angular_core.Inject,
        args: [APP_BASE_HREF]
      }]
    }];
    var PathLocationStrategy = (function(_super) {
      __extends(PathLocationStrategy, _super);
      function PathLocationStrategy(_platformLocation, href) {
        _super.call(this);
        this._platformLocation = _platformLocation;
        if (isBlank(href)) {
          href = this._platformLocation.getBaseHrefFromDOM();
        }
        if (isBlank(href)) {
          throw new BaseException("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
        }
        this._baseHref = href;
      }
      PathLocationStrategy.prototype.onPopState = function(fn) {
        this._platformLocation.onPopState(fn);
        this._platformLocation.onHashChange(fn);
      };
      PathLocationStrategy.prototype.getBaseHref = function() {
        return this._baseHref;
      };
      PathLocationStrategy.prototype.prepareExternalUrl = function(internal) {
        return Location.joinWithSlash(this._baseHref, internal);
      };
      PathLocationStrategy.prototype.path = function() {
        return this._platformLocation.pathname + Location.normalizeQueryParams(this._platformLocation.search);
      };
      PathLocationStrategy.prototype.pushState = function(state, title, url, queryParams) {
        var externalUrl = this.prepareExternalUrl(url + Location.normalizeQueryParams(queryParams));
        this._platformLocation.pushState(state, title, externalUrl);
      };
      PathLocationStrategy.prototype.replaceState = function(state, title, url, queryParams) {
        var externalUrl = this.prepareExternalUrl(url + Location.normalizeQueryParams(queryParams));
        this._platformLocation.replaceState(state, title, externalUrl);
      };
      PathLocationStrategy.prototype.forward = function() {
        this._platformLocation.forward();
      };
      PathLocationStrategy.prototype.back = function() {
        this._platformLocation.back();
      };
      return PathLocationStrategy;
    }(LocationStrategy));
    PathLocationStrategy.decorators = [{type: _angular_core.Injectable}];
    PathLocationStrategy.ctorParameters = [{type: PlatformLocation}, {
      type: undefined,
      decorators: [{type: _angular_core.Optional}, {
        type: _angular_core.Inject,
        args: [APP_BASE_HREF]
      }]
    }];
    exports.AsyncPipe = AsyncPipe;
    exports.DatePipe = DatePipe;
    exports.JsonPipe = JsonPipe;
    exports.SlicePipe = SlicePipe;
    exports.LowerCasePipe = LowerCasePipe;
    exports.NumberPipe = NumberPipe;
    exports.DecimalPipe = DecimalPipe;
    exports.PercentPipe = PercentPipe;
    exports.CurrencyPipe = CurrencyPipe;
    exports.UpperCasePipe = UpperCasePipe;
    exports.ReplacePipe = ReplacePipe;
    exports.I18nPluralPipe = I18nPluralPipe;
    exports.I18nSelectPipe = I18nSelectPipe;
    exports.COMMON_PIPES = COMMON_PIPES;
    exports.NgClass = NgClass;
    exports.NgFor = NgFor;
    exports.NgIf = NgIf;
    exports.NgTemplateOutlet = NgTemplateOutlet;
    exports.NgStyle = NgStyle;
    exports.NgSwitch = NgSwitch;
    exports.NgSwitchWhen = NgSwitchWhen;
    exports.NgSwitchDefault = NgSwitchDefault;
    exports.NgPlural = NgPlural;
    exports.NgPluralCase = NgPluralCase;
    exports.NgLocalization = NgLocalization;
    exports.CORE_DIRECTIVES = CORE_DIRECTIVES;
    exports.workaround_empty_observable_list_diff = workaround_empty_observable_list_diff;
    exports.FORM_PROVIDERS = FORM_PROVIDERS;
    exports.FORM_BINDINGS = FORM_BINDINGS;
    exports.AbstractControl = AbstractControl;
    exports.Control = Control;
    exports.ControlGroup = ControlGroup;
    exports.ControlArray = ControlArray;
    exports.AbstractControlDirective = AbstractControlDirective;
    exports.ControlContainer = ControlContainer;
    exports.NgControlName = NgControlName;
    exports.NgFormControl = NgFormControl;
    exports.NgModel = NgModel;
    exports.NgControl = NgControl;
    exports.NgControlGroup = NgControlGroup;
    exports.NgFormModel = NgFormModel;
    exports.NgForm = NgForm;
    exports.NG_VALUE_ACCESSOR = NG_VALUE_ACCESSOR;
    exports.DefaultValueAccessor = DefaultValueAccessor;
    exports.NgControlStatus = NgControlStatus;
    exports.CheckboxControlValueAccessor = CheckboxControlValueAccessor;
    exports.NgSelectOption = NgSelectOption;
    exports.SelectControlValueAccessor = SelectControlValueAccessor;
    exports.FORM_DIRECTIVES = FORM_DIRECTIVES;
    exports.RadioButtonState = RadioButtonState;
    exports.NG_VALIDATORS = NG_VALIDATORS;
    exports.NG_ASYNC_VALIDATORS = NG_ASYNC_VALIDATORS;
    exports.Validators = Validators;
    exports.RequiredValidator = RequiredValidator;
    exports.MinLengthValidator = MinLengthValidator;
    exports.MaxLengthValidator = MaxLengthValidator;
    exports.PatternValidator = PatternValidator;
    exports.FormBuilder = FormBuilder;
    exports.COMMON_DIRECTIVES = COMMON_DIRECTIVES;
    exports.PlatformLocation = PlatformLocation;
    exports.LocationStrategy = LocationStrategy;
    exports.APP_BASE_HREF = APP_BASE_HREF;
    exports.HashLocationStrategy = HashLocationStrategy;
    exports.PathLocationStrategy = PathLocationStrategy;
    exports.Location = Location;
  }));
})(require('process'));
