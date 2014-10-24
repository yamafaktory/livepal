(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Polymer('livepal-ui', {
  created: function() {
    this.devices = {};
    this.gifieProgress = 0;
    this.pageTransitionIsActive = false;
    this.watchPagesTransition();
  },
  observe: {'$.username.value': 'test'},
  checkUsername: function() {
    this.$.usernameDecorator.isInvalid = !this.$.username.checkValidity();
  },
  watchPagesTransition: function() {
    var $__0 = this;
    window.addEventListener('core-animated-pages-transition-prepare', (function(event) {
      $__0.pageTransitionIsActive = true;
      console.log('transition');
    }));
    window.addEventListener('core-animated-pages-transition-end', (function(event) {
      $__0.pageTransitionIsActive = false;
      console.log('transition-end');
    }));
  },
  makeGifie: function() {
    var $__0 = this;
    this.gifshot.createGIF({
      'numWorkers': 4,
      'numFrames': 20,
      'sampleInterval': 7,
      'webcamVideoElement': this.$.video,
      'keepCameraOn': true,
      'cameraStream': this.cameraStream || null,
      'gifWidth': 200,
      'gifHeight': 200,
      'progressCallback': (function(step) {
        $__0.gifieProgress = step * 100;
      }),
      'completeCallback': (function() {
        console.log('done');
      })
    }, (function(obj) {
      if (!obj.error) {
        $__0.$.gifie.src = obj.image;
        $__0.gifieData = obj.image;
        $__0.cameraStream = obj.cameraStream;
      }
    }));
  },
  switch: function(event, detail, sender) {
    console.log(event, detail, sender);
    this.$.main.selected = sender.dataset.target;
  },
  zValue: function(isMobile) {
    return isMobile ? 0 : 1;
  }
});


},{}],2:[function(require,module,exports){
"use strict";
var $__peerjs__,
    $__gifshot_47_build_47_gifshot_46_js__,
    $__livepal_45_ui__;
'use strict';
var Peer = ($__peerjs__ = require("peerjs"), $__peerjs__ && $__peerjs__.__esModule && $__peerjs__ || {default: $__peerjs__}).default;
var gifshot = ($__gifshot_47_build_47_gifshot_46_js__ = require("gifshot/build/gifshot.js"), $__gifshot_47_build_47_gifshot_46_js__ && $__gifshot_47_build_47_gifshot_46_js__.__esModule && $__gifshot_47_build_47_gifshot_46_js__ || {default: $__gifshot_47_build_47_gifshot_46_js__}).default;
($__livepal_45_ui__ = require("./livepal-ui"), $__livepal_45_ui__ && $__livepal_45_ui__.__esModule && $__livepal_45_ui__ || {default: $__livepal_45_ui__});
window.addEventListener('polymer-ready', (function(event) {
  var livepal = document.querySelector('livepal-ui');
  livepal.gifshot = gifshot;
}));


},{"./livepal-ui":1,"gifshot/build/gifshot.js":5,"peerjs":10}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],4:[function(require,module,exports){
(function (process,global){
(function(global) {
  'use strict';
  if (global.$traceurRuntime) {
    return;
  }
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $Object.defineProperties;
  var $defineProperty = $Object.defineProperty;
  var $freeze = $Object.freeze;
  var $getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $Object.getOwnPropertyNames;
  var $keys = $Object.keys;
  var $hasOwnProperty = $Object.prototype.hasOwnProperty;
  var $toString = $Object.prototype.toString;
  var $preventExtensions = Object.preventExtensions;
  var $seal = Object.seal;
  var $isExtensible = Object.isExtensible;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var types = {
    void: function voidType() {},
    any: function any() {},
    string: function string() {},
    number: function number() {},
    boolean: function boolean() {}
  };
  var method = nonEnum;
  var counter = 0;
  function newUniqueString() {
    return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++counter + '$__';
  }
  var symbolInternalProperty = newUniqueString();
  var symbolDescriptionProperty = newUniqueString();
  var symbolDataProperty = newUniqueString();
  var symbolValues = $create(null);
  var privateNames = $create(null);
  function createPrivateName() {
    var s = newUniqueString();
    privateNames[s] = true;
    return s;
  }
  function isSymbol(symbol) {
    return typeof symbol === 'object' && symbol instanceof SymbolValue;
  }
  function typeOf(v) {
    if (isSymbol(v))
      return 'symbol';
    return typeof v;
  }
  function Symbol(description) {
    var value = new SymbolValue(description);
    if (!(this instanceof Symbol))
      return value;
    throw new TypeError('Symbol cannot be new\'ed');
  }
  $defineProperty(Symbol.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(Symbol.prototype, 'toString', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    var desc = symbolValue[symbolDescriptionProperty];
    if (desc === undefined)
      desc = '';
    return 'Symbol(' + desc + ')';
  }));
  $defineProperty(Symbol.prototype, 'valueOf', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    return symbolValue;
  }));
  function SymbolValue(description) {
    var key = newUniqueString();
    $defineProperty(this, symbolDataProperty, {value: this});
    $defineProperty(this, symbolInternalProperty, {value: key});
    $defineProperty(this, symbolDescriptionProperty, {value: description});
    freeze(this);
    symbolValues[key] = this;
  }
  $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(SymbolValue.prototype, 'toString', {
    value: Symbol.prototype.toString,
    enumerable: false
  });
  $defineProperty(SymbolValue.prototype, 'valueOf', {
    value: Symbol.prototype.valueOf,
    enumerable: false
  });
  var hashProperty = createPrivateName();
  var hashPropertyDescriptor = {value: undefined};
  var hashObjectProperties = {
    hash: {value: undefined},
    self: {value: undefined}
  };
  var hashCounter = 0;
  function getOwnHashObject(object) {
    var hashObject = object[hashProperty];
    if (hashObject && hashObject.self === object)
      return hashObject;
    if ($isExtensible(object)) {
      hashObjectProperties.hash.value = hashCounter++;
      hashObjectProperties.self.value = object;
      hashPropertyDescriptor.value = $create(null, hashObjectProperties);
      $defineProperty(object, hashProperty, hashPropertyDescriptor);
      return hashPropertyDescriptor.value;
    }
    return undefined;
  }
  function freeze(object) {
    getOwnHashObject(object);
    return $freeze.apply(this, arguments);
  }
  function preventExtensions(object) {
    getOwnHashObject(object);
    return $preventExtensions.apply(this, arguments);
  }
  function seal(object) {
    getOwnHashObject(object);
    return $seal.apply(this, arguments);
  }
  Symbol.iterator = Symbol();
  freeze(SymbolValue.prototype);
  function toProperty(name) {
    if (isSymbol(name))
      return name[symbolInternalProperty];
    return name;
  }
  function getOwnPropertyNames(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (!symbolValues[name] && !privateNames[name])
        rv.push(name);
    }
    return rv;
  }
  function getOwnPropertyDescriptor(object, name) {
    return $getOwnPropertyDescriptor(object, toProperty(name));
  }
  function getOwnPropertySymbols(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var symbol = symbolValues[names[i]];
      if (symbol)
        rv.push(symbol);
    }
    return rv;
  }
  function hasOwnProperty(name) {
    return $hasOwnProperty.call(this, toProperty(name));
  }
  function getOption(name) {
    return global.traceur && global.traceur.options[name];
  }
  function setProperty(object, name, value) {
    var sym,
        desc;
    if (isSymbol(name)) {
      sym = name;
      name = name[symbolInternalProperty];
    }
    object[name] = value;
    if (sym && (desc = $getOwnPropertyDescriptor(object, name)))
      $defineProperty(object, name, {enumerable: false});
    return value;
  }
  function defineProperty(object, name, descriptor) {
    if (isSymbol(name)) {
      if (descriptor.enumerable) {
        descriptor = $create(descriptor, {enumerable: {value: false}});
      }
      name = name[symbolInternalProperty];
    }
    $defineProperty(object, name, descriptor);
    return object;
  }
  function polyfillObject(Object) {
    $defineProperty(Object, 'defineProperty', {value: defineProperty});
    $defineProperty(Object, 'getOwnPropertyNames', {value: getOwnPropertyNames});
    $defineProperty(Object, 'getOwnPropertyDescriptor', {value: getOwnPropertyDescriptor});
    $defineProperty(Object.prototype, 'hasOwnProperty', {value: hasOwnProperty});
    $defineProperty(Object, 'freeze', {value: freeze});
    $defineProperty(Object, 'preventExtensions', {value: preventExtensions});
    $defineProperty(Object, 'seal', {value: seal});
    Object.getOwnPropertySymbols = getOwnPropertySymbols;
  }
  function exportStar(object) {
    for (var i = 1; i < arguments.length; i++) {
      var names = $getOwnPropertyNames(arguments[i]);
      for (var j = 0; j < names.length; j++) {
        var name = names[j];
        if (privateNames[name])
          continue;
        (function(mod, name) {
          $defineProperty(object, name, {
            get: function() {
              return mod[name];
            },
            enumerable: true
          });
        })(arguments[i], names[j]);
      }
    }
    return object;
  }
  function isObject(x) {
    return x != null && (typeof x === 'object' || typeof x === 'function');
  }
  function toObject(x) {
    if (x == null)
      throw $TypeError();
    return $Object(x);
  }
  function checkObjectCoercible(argument) {
    if (argument == null) {
      throw new TypeError('Value cannot be converted to an Object');
    }
    return argument;
  }
  function setupGlobals(global) {
    global.Symbol = Symbol;
    global.Reflect = global.Reflect || {};
    global.Reflect.global = global.Reflect.global || global;
    polyfillObject(global.Object);
  }
  setupGlobals(global);
  global.$traceurRuntime = {
    createPrivateName: createPrivateName,
    exportStar: exportStar,
    getOwnHashObject: getOwnHashObject,
    privateNames: privateNames,
    setProperty: setProperty,
    setupGlobals: setupGlobals,
    toObject: toObject,
    isObject: isObject,
    toProperty: toProperty,
    type: types,
    typeof: typeOf,
    checkObjectCoercible: checkObjectCoercible,
    hasOwnProperty: function(o, p) {
      return hasOwnProperty.call(o, p);
    },
    defineProperties: $defineProperties,
    defineProperty: $defineProperty,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    getOwnPropertyNames: $getOwnPropertyNames,
    keys: $keys
  };
})(typeof global !== 'undefined' ? global : this);
(function() {
  'use strict';
  function spread() {
    var rv = [],
        j = 0,
        iterResult;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = $traceurRuntime.checkObjectCoercible(arguments[i]);
      if (typeof valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)] !== 'function') {
        throw new TypeError('Cannot spread non-iterable object.');
      }
      var iter = valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)]();
      while (!(iterResult = iter.next()).done) {
        rv[j++] = iterResult.value;
      }
    }
    return rv;
  }
  $traceurRuntime.spread = spread;
})();
(function() {
  'use strict';
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $getOwnPropertyDescriptor = $traceurRuntime.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $traceurRuntime.getOwnPropertyNames;
  var $getPrototypeOf = Object.getPrototypeOf;
  function superDescriptor(homeObject, name) {
    var proto = $getPrototypeOf(homeObject);
    do {
      var result = $getOwnPropertyDescriptor(proto, name);
      if (result)
        return result;
      proto = $getPrototypeOf(proto);
    } while (proto);
    return undefined;
  }
  function superCall(self, homeObject, name, args) {
    return superGet(self, homeObject, name).apply(self, args);
  }
  function superGet(self, homeObject, name) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor) {
      if (!descriptor.get)
        return descriptor.value;
      return descriptor.get.call(self);
    }
    return undefined;
  }
  function superSet(self, homeObject, name, value) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor && descriptor.set) {
      descriptor.set.call(self, value);
      return value;
    }
    throw $TypeError("super has no setter '" + name + "'.");
  }
  function getDescriptors(object) {
    var descriptors = {},
        name,
        names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      descriptors[name] = $getOwnPropertyDescriptor(object, name);
    }
    return descriptors;
  }
  function createClass(ctor, object, staticObject, superClass) {
    $defineProperty(object, 'constructor', {
      value: ctor,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (arguments.length > 3) {
      if (typeof superClass === 'function')
        ctor.__proto__ = superClass;
      ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
    } else {
      ctor.prototype = object;
    }
    $defineProperty(ctor, 'prototype', {
      configurable: false,
      writable: false
    });
    return $defineProperties(ctor, getDescriptors(staticObject));
  }
  function getProtoParent(superClass) {
    if (typeof superClass === 'function') {
      var prototype = superClass.prototype;
      if ($Object(prototype) === prototype || prototype === null)
        return superClass.prototype;
      throw new $TypeError('super prototype must be an Object or null');
    }
    if (superClass === null)
      return null;
    throw new $TypeError(("Super expression must either be null or a function, not " + typeof superClass + "."));
  }
  function defaultSuperCall(self, homeObject, args) {
    if ($getPrototypeOf(homeObject) !== null)
      superCall(self, homeObject, 'constructor', args);
  }
  $traceurRuntime.createClass = createClass;
  $traceurRuntime.defaultSuperCall = defaultSuperCall;
  $traceurRuntime.superCall = superCall;
  $traceurRuntime.superGet = superGet;
  $traceurRuntime.superSet = superSet;
})();
(function() {
  'use strict';
  var createPrivateName = $traceurRuntime.createPrivateName;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $create = Object.create;
  var $TypeError = TypeError;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var ST_NEWBORN = 0;
  var ST_EXECUTING = 1;
  var ST_SUSPENDED = 2;
  var ST_CLOSED = 3;
  var END_STATE = -2;
  var RETHROW_STATE = -3;
  function getInternalError(state) {
    return new Error('Traceur compiler bug: invalid state in state machine: ' + state);
  }
  function GeneratorContext() {
    this.state = 0;
    this.GState = ST_NEWBORN;
    this.storedException = undefined;
    this.finallyFallThrough = undefined;
    this.sent_ = undefined;
    this.returnValue = undefined;
    this.tryStack_ = [];
  }
  GeneratorContext.prototype = {
    pushTry: function(catchState, finallyState) {
      if (finallyState !== null) {
        var finallyFallThrough = null;
        for (var i = this.tryStack_.length - 1; i >= 0; i--) {
          if (this.tryStack_[i].catch !== undefined) {
            finallyFallThrough = this.tryStack_[i].catch;
            break;
          }
        }
        if (finallyFallThrough === null)
          finallyFallThrough = RETHROW_STATE;
        this.tryStack_.push({
          finally: finallyState,
          finallyFallThrough: finallyFallThrough
        });
      }
      if (catchState !== null) {
        this.tryStack_.push({catch: catchState});
      }
    },
    popTry: function() {
      this.tryStack_.pop();
    },
    get sent() {
      this.maybeThrow();
      return this.sent_;
    },
    set sent(v) {
      this.sent_ = v;
    },
    get sentIgnoreThrow() {
      return this.sent_;
    },
    maybeThrow: function() {
      if (this.action === 'throw') {
        this.action = 'next';
        throw this.sent_;
      }
    },
    end: function() {
      switch (this.state) {
        case END_STATE:
          return this;
        case RETHROW_STATE:
          throw this.storedException;
        default:
          throw getInternalError(this.state);
      }
    },
    handleException: function(ex) {
      this.GState = ST_CLOSED;
      this.state = END_STATE;
      throw ex;
    }
  };
  function nextOrThrow(ctx, moveNext, action, x) {
    switch (ctx.GState) {
      case ST_EXECUTING:
        throw new Error(("\"" + action + "\" on executing generator"));
      case ST_CLOSED:
        if (action == 'next') {
          return {
            value: undefined,
            done: true
          };
        }
        throw x;
      case ST_NEWBORN:
        if (action === 'throw') {
          ctx.GState = ST_CLOSED;
          throw x;
        }
        if (x !== undefined)
          throw $TypeError('Sent value to newborn generator');
      case ST_SUSPENDED:
        ctx.GState = ST_EXECUTING;
        ctx.action = action;
        ctx.sent = x;
        var value = moveNext(ctx);
        var done = value === ctx;
        if (done)
          value = ctx.returnValue;
        ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
        return {
          value: value,
          done: done
        };
    }
  }
  var ctxName = createPrivateName();
  var moveNextName = createPrivateName();
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  $defineProperty(GeneratorFunctionPrototype, 'constructor', nonEnum(GeneratorFunction));
  GeneratorFunctionPrototype.prototype = {
    constructor: GeneratorFunctionPrototype,
    next: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'next', v);
    },
    throw: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'throw', v);
    }
  };
  $defineProperties(GeneratorFunctionPrototype.prototype, {
    constructor: {enumerable: false},
    next: {enumerable: false},
    throw: {enumerable: false}
  });
  Object.defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator, nonEnum(function() {
    return this;
  }));
  function createGeneratorInstance(innerFunction, functionObject, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new GeneratorContext();
    var object = $create(functionObject.prototype);
    object[ctxName] = ctx;
    object[moveNextName] = moveNext;
    return object;
  }
  function initGeneratorFunction(functionObject) {
    functionObject.prototype = $create(GeneratorFunctionPrototype.prototype);
    functionObject.__proto__ = GeneratorFunctionPrototype;
    return functionObject;
  }
  function AsyncFunctionContext() {
    GeneratorContext.call(this);
    this.err = undefined;
    var ctx = this;
    ctx.result = new Promise(function(resolve, reject) {
      ctx.resolve = resolve;
      ctx.reject = reject;
    });
  }
  AsyncFunctionContext.prototype = $create(GeneratorContext.prototype);
  AsyncFunctionContext.prototype.end = function() {
    switch (this.state) {
      case END_STATE:
        this.resolve(this.returnValue);
        break;
      case RETHROW_STATE:
        this.reject(this.storedException);
        break;
      default:
        this.reject(getInternalError(this.state));
    }
  };
  AsyncFunctionContext.prototype.handleException = function() {
    this.state = RETHROW_STATE;
  };
  function asyncWrap(innerFunction, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new AsyncFunctionContext();
    ctx.createCallback = function(newState) {
      return function(value) {
        ctx.state = newState;
        ctx.value = value;
        moveNext(ctx);
      };
    };
    ctx.errback = function(err) {
      handleCatch(ctx, err);
      moveNext(ctx);
    };
    moveNext(ctx);
    return ctx.result;
  }
  function getMoveNext(innerFunction, self) {
    return function(ctx) {
      while (true) {
        try {
          return innerFunction.call(self, ctx);
        } catch (ex) {
          handleCatch(ctx, ex);
        }
      }
    };
  }
  function handleCatch(ctx, ex) {
    ctx.storedException = ex;
    var last = ctx.tryStack_[ctx.tryStack_.length - 1];
    if (!last) {
      ctx.handleException(ex);
      return;
    }
    ctx.state = last.catch !== undefined ? last.catch : last.finally;
    if (last.finallyFallThrough !== undefined)
      ctx.finallyFallThrough = last.finallyFallThrough;
  }
  $traceurRuntime.asyncWrap = asyncWrap;
  $traceurRuntime.initGeneratorFunction = initGeneratorFunction;
  $traceurRuntime.createGeneratorInstance = createGeneratorInstance;
})();
(function() {
  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];
    if (opt_scheme) {
      out.push(opt_scheme, ':');
    }
    if (opt_domain) {
      out.push('//');
      if (opt_userInfo) {
        out.push(opt_userInfo, '@');
      }
      out.push(opt_domain);
      if (opt_port) {
        out.push(':', opt_port);
      }
    }
    if (opt_path) {
      out.push(opt_path);
    }
    if (opt_queryData) {
      out.push('?', opt_queryData);
    }
    if (opt_fragment) {
      out.push('#', opt_fragment);
    }
    return out.join('');
  }
  ;
  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
  var ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
  };
  function split(uri) {
    return (uri.match(splitRe));
  }
  function removeDotSegments(path) {
    if (path === '/')
      return '/';
    var leadingSlash = path[0] === '/' ? '/' : '';
    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
    var segments = path.split('/');
    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
      var segment = segments[pos];
      switch (segment) {
        case '':
        case '.':
          break;
        case '..':
          if (out.length)
            out.pop();
          else
            up++;
          break;
        default:
          out.push(segment);
      }
    }
    if (!leadingSlash) {
      while (up-- > 0) {
        out.unshift('..');
      }
      if (out.length === 0)
        out.push('.');
    }
    return leadingSlash + out.join('/') + trailingSlash;
  }
  function joinAndCanonicalizePath(parts) {
    var path = parts[ComponentIndex.PATH] || '';
    path = removeDotSegments(path);
    parts[ComponentIndex.PATH] = path;
    return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
  }
  function canonicalizeUrl(url) {
    var parts = split(url);
    return joinAndCanonicalizePath(parts);
  }
  function resolveUrl(base, url) {
    var parts = split(url);
    var baseParts = split(base);
    if (parts[ComponentIndex.SCHEME]) {
      return joinAndCanonicalizePath(parts);
    } else {
      parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
    }
    for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
      if (!parts[i]) {
        parts[i] = baseParts[i];
      }
    }
    if (parts[ComponentIndex.PATH][0] == '/') {
      return joinAndCanonicalizePath(parts);
    }
    var path = baseParts[ComponentIndex.PATH];
    var index = path.lastIndexOf('/');
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
    parts[ComponentIndex.PATH] = path;
    return joinAndCanonicalizePath(parts);
  }
  function isAbsolute(name) {
    if (!name)
      return false;
    if (name[0] === '/')
      return true;
    var parts = split(name);
    if (parts[ComponentIndex.SCHEME])
      return true;
    return false;
  }
  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
  $traceurRuntime.isAbsolute = isAbsolute;
  $traceurRuntime.removeDotSegments = removeDotSegments;
  $traceurRuntime.resolveUrl = resolveUrl;
})();
(function(global) {
  'use strict';
  var $__2 = $traceurRuntime,
      canonicalizeUrl = $__2.canonicalizeUrl,
      resolveUrl = $__2.resolveUrl,
      isAbsolute = $__2.isAbsolute;
  var moduleInstantiators = Object.create(null);
  var baseURL;
  if (global.location && global.location.href)
    baseURL = resolveUrl(global.location.href, './');
  else
    baseURL = '';
  var UncoatedModuleEntry = function UncoatedModuleEntry(url, uncoatedModule) {
    this.url = url;
    this.value_ = uncoatedModule;
  };
  ($traceurRuntime.createClass)(UncoatedModuleEntry, {}, {});
  var ModuleEvaluationError = function ModuleEvaluationError(erroneousModuleName, cause) {
    this.message = this.constructor.name + ': ' + this.stripCause(cause) + ' in ' + erroneousModuleName;
    if (!(cause instanceof $ModuleEvaluationError) && cause.stack)
      this.stack = this.stripStack(cause.stack);
    else
      this.stack = '';
  };
  var $ModuleEvaluationError = ModuleEvaluationError;
  ($traceurRuntime.createClass)(ModuleEvaluationError, {
    stripError: function(message) {
      return message.replace(/.*Error:/, this.constructor.name + ':');
    },
    stripCause: function(cause) {
      if (!cause)
        return '';
      if (!cause.message)
        return cause + '';
      return this.stripError(cause.message);
    },
    loadedBy: function(moduleName) {
      this.stack += '\n loaded by ' + moduleName;
    },
    stripStack: function(causeStack) {
      var stack = [];
      causeStack.split('\n').some((function(frame) {
        if (/UncoatedModuleInstantiator/.test(frame))
          return true;
        stack.push(frame);
      }));
      stack[0] = this.stripError(stack[0]);
      return stack.join('\n');
    }
  }, {}, Error);
  var UncoatedModuleInstantiator = function UncoatedModuleInstantiator(url, func) {
    $traceurRuntime.superCall(this, $UncoatedModuleInstantiator.prototype, "constructor", [url, null]);
    this.func = func;
  };
  var $UncoatedModuleInstantiator = UncoatedModuleInstantiator;
  ($traceurRuntime.createClass)(UncoatedModuleInstantiator, {getUncoatedModule: function() {
      if (this.value_)
        return this.value_;
      try {
        return this.value_ = this.func.call(global);
      } catch (ex) {
        if (ex instanceof ModuleEvaluationError) {
          ex.loadedBy(this.url);
          throw ex;
        }
        throw new ModuleEvaluationError(this.url, ex);
      }
    }}, {}, UncoatedModuleEntry);
  function getUncoatedModuleInstantiator(name) {
    if (!name)
      return;
    var url = ModuleStore.normalize(name);
    return moduleInstantiators[url];
  }
  ;
  var moduleInstances = Object.create(null);
  var liveModuleSentinel = {};
  function Module(uncoatedModule) {
    var isLive = arguments[1];
    var coatedModule = Object.create(null);
    Object.getOwnPropertyNames(uncoatedModule).forEach((function(name) {
      var getter,
          value;
      if (isLive === liveModuleSentinel) {
        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
        if (descr.get)
          getter = descr.get;
      }
      if (!getter) {
        value = uncoatedModule[name];
        getter = function() {
          return value;
        };
      }
      Object.defineProperty(coatedModule, name, {
        get: getter,
        enumerable: true
      });
    }));
    Object.preventExtensions(coatedModule);
    return coatedModule;
  }
  var ModuleStore = {
    normalize: function(name, refererName, refererAddress) {
      if (typeof name !== "string")
        throw new TypeError("module name must be a string, not " + typeof name);
      if (isAbsolute(name))
        return canonicalizeUrl(name);
      if (/[^\.]\/\.\.\//.test(name)) {
        throw new Error('module name embeds /../: ' + name);
      }
      if (name[0] === '.' && refererName)
        return resolveUrl(refererName, name);
      return canonicalizeUrl(name);
    },
    get: function(normalizedName) {
      var m = getUncoatedModuleInstantiator(normalizedName);
      if (!m)
        return undefined;
      var moduleInstance = moduleInstances[m.url];
      if (moduleInstance)
        return moduleInstance;
      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
      return moduleInstances[m.url] = moduleInstance;
    },
    set: function(normalizedName, module) {
      normalizedName = String(normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, (function() {
        return module;
      }));
      moduleInstances[normalizedName] = module;
    },
    get baseURL() {
      return baseURL;
    },
    set baseURL(v) {
      baseURL = String(v);
    },
    registerModule: function(name, func) {
      var normalizedName = ModuleStore.normalize(name);
      if (moduleInstantiators[normalizedName])
        throw new Error('duplicate module named ' + normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
    },
    bundleStore: Object.create(null),
    register: function(name, deps, func) {
      if (!deps || !deps.length && !func.length) {
        this.registerModule(name, func);
      } else {
        this.bundleStore[name] = {
          deps: deps,
          execute: function() {
            var $__0 = arguments;
            var depMap = {};
            deps.forEach((function(dep, index) {
              return depMap[dep] = $__0[index];
            }));
            var registryEntry = func.call(this, depMap);
            registryEntry.execute.call(this);
            return registryEntry.exports;
          }
        };
      }
    },
    getAnonymousModule: function(func) {
      return new Module(func.call(global), liveModuleSentinel);
    },
    getForTesting: function(name) {
      var $__0 = this;
      if (!this.testingPrefix_) {
        Object.keys(moduleInstances).some((function(key) {
          var m = /(traceur@[^\/]*\/)/.exec(key);
          if (m) {
            $__0.testingPrefix_ = m[1];
            return true;
          }
        }));
      }
      return this.get(this.testingPrefix_ + name);
    }
  };
  ModuleStore.set('@traceur/src/runtime/ModuleStore', new Module({ModuleStore: ModuleStore}));
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
  };
  $traceurRuntime.ModuleStore = ModuleStore;
  global.System = {
    register: ModuleStore.register.bind(ModuleStore),
    get: ModuleStore.get,
    set: ModuleStore.set,
    normalize: ModuleStore.normalize
  };
  $traceurRuntime.getModuleImpl = function(name) {
    var instantiator = getUncoatedModuleInstantiator(name);
    return instantiator && instantiator.getUncoatedModule();
  };
})(typeof global !== 'undefined' ? global : this);
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/utils", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/utils";
  var $ceil = Math.ceil;
  var $floor = Math.floor;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $pow = Math.pow;
  var $min = Math.min;
  var toObject = $traceurRuntime.toObject;
  function toUint32(x) {
    return x >>> 0;
  }
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function isCallable(x) {
    return typeof x === 'function';
  }
  function isNumber(x) {
    return typeof x === 'number';
  }
  function toInteger(x) {
    x = +x;
    if ($isNaN(x))
      return 0;
    if (x === 0 || !$isFinite(x))
      return x;
    return x > 0 ? $floor(x) : $ceil(x);
  }
  var MAX_SAFE_LENGTH = $pow(2, 53) - 1;
  function toLength(x) {
    var len = toInteger(x);
    return len < 0 ? 0 : $min(len, MAX_SAFE_LENGTH);
  }
  function checkIterable(x) {
    return !isObject(x) ? undefined : x[Symbol.iterator];
  }
  function isConstructor(x) {
    return isCallable(x);
  }
  function createIteratorResultObject(value, done) {
    return {
      value: value,
      done: done
    };
  }
  function maybeDefine(object, name, descr) {
    if (!(name in object)) {
      Object.defineProperty(object, name, descr);
    }
  }
  function maybeDefineMethod(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  function maybeDefineConst(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  function maybeAddFunctions(object, functions) {
    for (var i = 0; i < functions.length; i += 2) {
      var name = functions[i];
      var value = functions[i + 1];
      maybeDefineMethod(object, name, value);
    }
  }
  function maybeAddConsts(object, consts) {
    for (var i = 0; i < consts.length; i += 2) {
      var name = consts[i];
      var value = consts[i + 1];
      maybeDefineConst(object, name, value);
    }
  }
  function maybeAddIterator(object, func, Symbol) {
    if (!Symbol || !Symbol.iterator || object[Symbol.iterator])
      return;
    if (object['@@iterator'])
      func = object['@@iterator'];
    Object.defineProperty(object, Symbol.iterator, {
      value: func,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  var polyfills = [];
  function registerPolyfill(func) {
    polyfills.push(func);
  }
  function polyfillAll(global) {
    polyfills.forEach((function(f) {
      return f(global);
    }));
  }
  return {
    get toObject() {
      return toObject;
    },
    get toUint32() {
      return toUint32;
    },
    get isObject() {
      return isObject;
    },
    get isCallable() {
      return isCallable;
    },
    get isNumber() {
      return isNumber;
    },
    get toInteger() {
      return toInteger;
    },
    get toLength() {
      return toLength;
    },
    get checkIterable() {
      return checkIterable;
    },
    get isConstructor() {
      return isConstructor;
    },
    get createIteratorResultObject() {
      return createIteratorResultObject;
    },
    get maybeDefine() {
      return maybeDefine;
    },
    get maybeDefineMethod() {
      return maybeDefineMethod;
    },
    get maybeDefineConst() {
      return maybeDefineConst;
    },
    get maybeAddFunctions() {
      return maybeAddFunctions;
    },
    get maybeAddConsts() {
      return maybeAddConsts;
    },
    get maybeAddIterator() {
      return maybeAddIterator;
    },
    get registerPolyfill() {
      return registerPolyfill;
    },
    get polyfillAll() {
      return polyfillAll;
    }
  };
});
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Map", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Map";
  var $__3 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      isObject = $__3.isObject,
      maybeAddIterator = $__3.maybeAddIterator,
      registerPolyfill = $__3.registerPolyfill;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  var deletedSentinel = {};
  function lookupIndex(map, key) {
    if (isObject(key)) {
      var hashObject = getOwnHashObject(key);
      return hashObject && map.objectIndex_[hashObject.hash];
    }
    if (typeof key === 'string')
      return map.stringIndex_[key];
    return map.primitiveIndex_[key];
  }
  function initMap(map) {
    map.entries_ = [];
    map.objectIndex_ = Object.create(null);
    map.stringIndex_ = Object.create(null);
    map.primitiveIndex_ = Object.create(null);
    map.deletedCount_ = 0;
  }
  var Map = function Map() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError('Map called on incompatible type');
    if ($hasOwnProperty.call(this, 'entries_')) {
      throw new TypeError('Map can not be reentrantly initialised');
    }
    initMap(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__5 = iterable[Symbol.iterator](),
          $__6; !($__6 = $__5.next()).done; ) {
        var $__7 = $__6.value,
            key = $__7[0],
            value = $__7[1];
        {
          this.set(key, value);
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Map, {
    get size() {
      return this.entries_.length / 2 - this.deletedCount_;
    },
    get: function(key) {
      var index = lookupIndex(this, key);
      if (index !== undefined)
        return this.entries_[index + 1];
    },
    set: function(key, value) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index = lookupIndex(this, key);
      if (index !== undefined) {
        this.entries_[index + 1] = value;
      } else {
        index = this.entries_.length;
        this.entries_[index] = key;
        this.entries_[index + 1] = value;
        if (objectMode) {
          var hashObject = getOwnHashObject(key);
          var hash = hashObject.hash;
          this.objectIndex_[hash] = index;
        } else if (stringMode) {
          this.stringIndex_[key] = index;
        } else {
          this.primitiveIndex_[key] = index;
        }
      }
      return this;
    },
    has: function(key) {
      return lookupIndex(this, key) !== undefined;
    },
    delete: function(key) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index;
      var hash;
      if (objectMode) {
        var hashObject = getOwnHashObject(key);
        if (hashObject) {
          index = this.objectIndex_[hash = hashObject.hash];
          delete this.objectIndex_[hash];
        }
      } else if (stringMode) {
        index = this.stringIndex_[key];
        delete this.stringIndex_[key];
      } else {
        index = this.primitiveIndex_[key];
        delete this.primitiveIndex_[key];
      }
      if (index !== undefined) {
        this.entries_[index] = deletedSentinel;
        this.entries_[index + 1] = undefined;
        this.deletedCount_++;
        return true;
      }
      return false;
    },
    clear: function() {
      initMap(this);
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      for (var i = 0; i < this.entries_.length; i += 2) {
        var key = this.entries_[i];
        var value = this.entries_[i + 1];
        if (key === deletedSentinel)
          continue;
        callbackFn.call(thisArg, value, key, this);
      }
    },
    entries: $traceurRuntime.initGeneratorFunction(function $__8() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return [key, value];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__8, this);
    }),
    keys: $traceurRuntime.initGeneratorFunction(function $__9() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return key;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__9, this);
    }),
    values: $traceurRuntime.initGeneratorFunction(function $__10() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return value;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__10, this);
    })
  }, {});
  Object.defineProperty(Map.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Map.prototype.entries
  });
  function polyfillMap(global) {
    var $__7 = global,
        Object = $__7.Object,
        Symbol = $__7.Symbol;
    if (!global.Map)
      global.Map = Map;
    var mapPrototype = global.Map.prototype;
    if (mapPrototype.entries) {
      maybeAddIterator(mapPrototype, mapPrototype.entries, Symbol);
      maybeAddIterator(Object.getPrototypeOf(new global.Map().entries()), function() {
        return this;
      }, Symbol);
    }
  }
  registerPolyfill(polyfillMap);
  return {
    get Map() {
      return Map;
    },
    get polyfillMap() {
      return polyfillMap;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Map" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Set", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Set";
  var $__11 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      isObject = $__11.isObject,
      maybeAddIterator = $__11.maybeAddIterator,
      registerPolyfill = $__11.registerPolyfill;
  var Map = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Map").Map;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  function initSet(set) {
    set.map_ = new Map();
  }
  var Set = function Set() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError('Set called on incompatible type');
    if ($hasOwnProperty.call(this, 'map_')) {
      throw new TypeError('Set can not be reentrantly initialised');
    }
    initSet(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__15 = iterable[Symbol.iterator](),
          $__16; !($__16 = $__15.next()).done; ) {
        var item = $__16.value;
        {
          this.add(item);
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Set, {
    get size() {
      return this.map_.size;
    },
    has: function(key) {
      return this.map_.has(key);
    },
    add: function(key) {
      this.map_.set(key, key);
      return this;
    },
    delete: function(key) {
      return this.map_.delete(key);
    },
    clear: function() {
      return this.map_.clear();
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      var $__13 = this;
      return this.map_.forEach((function(value, key) {
        callbackFn.call(thisArg, key, key, $__13);
      }));
    },
    values: $traceurRuntime.initGeneratorFunction(function $__18() {
      var $__19,
          $__20;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__19 = this.map_.keys()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__20 = $__19[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__20.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__20.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__20.value;
            default:
              return $ctx.end();
          }
      }, $__18, this);
    }),
    entries: $traceurRuntime.initGeneratorFunction(function $__21() {
      var $__22,
          $__23;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__22 = this.map_.entries()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__23 = $__22[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__23.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__23.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__23.value;
            default:
              return $ctx.end();
          }
      }, $__21, this);
    })
  }, {});
  Object.defineProperty(Set.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  Object.defineProperty(Set.prototype, 'keys', {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  function polyfillSet(global) {
    var $__17 = global,
        Object = $__17.Object,
        Symbol = $__17.Symbol;
    if (!global.Set)
      global.Set = Set;
    var setPrototype = global.Set.prototype;
    if (setPrototype.values) {
      maybeAddIterator(setPrototype, setPrototype.values, Symbol);
      maybeAddIterator(Object.getPrototypeOf(new global.Set().values()), function() {
        return this;
      }, Symbol);
    }
  }
  registerPolyfill(polyfillSet);
  return {
    get Set() {
      return Set;
    },
    get polyfillSet() {
      return polyfillSet;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Set" + '');
System.register("traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap";
  var len = 0;
  function asap(callback, arg) {
    queue[len] = callback;
    queue[len + 1] = arg;
    len += 2;
    if (len === 2) {
      scheduleFlush();
    }
  }
  var $__default = asap;
  var browserGlobal = (typeof window !== 'undefined') ? window : {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
  function useNextTick() {
    return function() {
      process.nextTick(flush);
    };
  }
  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, {characterData: true});
    return function() {
      node.data = (iterations = ++iterations % 2);
    };
  }
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function() {
      channel.port2.postMessage(0);
    };
  }
  function useSetTimeout() {
    return function() {
      setTimeout(flush, 1);
    };
  }
  var queue = new Array(1000);
  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue[i];
      var arg = queue[i + 1];
      callback(arg);
      queue[i] = undefined;
      queue[i + 1] = undefined;
    }
    len = 0;
  }
  var scheduleFlush;
  if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else {
    scheduleFlush = useSetTimeout();
  }
  return {get default() {
      return $__default;
    }};
});
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Promise", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Promise";
  var async = System.get("traceur-runtime@0.0.62/node_modules/rsvp/lib/rsvp/asap").default;
  var registerPolyfill = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils").registerPolyfill;
  var promiseRaw = {};
  function isPromise(x) {
    return x && typeof x === 'object' && x.status_ !== undefined;
  }
  function idResolveHandler(x) {
    return x;
  }
  function idRejectHandler(x) {
    throw x;
  }
  function chain(promise) {
    var onResolve = arguments[1] !== (void 0) ? arguments[1] : idResolveHandler;
    var onReject = arguments[2] !== (void 0) ? arguments[2] : idRejectHandler;
    var deferred = getDeferred(promise.constructor);
    switch (promise.status_) {
      case undefined:
        throw TypeError;
      case 0:
        promise.onResolve_.push(onResolve, deferred);
        promise.onReject_.push(onReject, deferred);
        break;
      case +1:
        promiseEnqueue(promise.value_, [onResolve, deferred]);
        break;
      case -1:
        promiseEnqueue(promise.value_, [onReject, deferred]);
        break;
    }
    return deferred.promise;
  }
  function getDeferred(C) {
    if (this === $Promise) {
      var promise = promiseInit(new $Promise(promiseRaw));
      return {
        promise: promise,
        resolve: (function(x) {
          promiseResolve(promise, x);
        }),
        reject: (function(r) {
          promiseReject(promise, r);
        })
      };
    } else {
      var result = {};
      result.promise = new C((function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
      }));
      return result;
    }
  }
  function promiseSet(promise, status, value, onResolve, onReject) {
    promise.status_ = status;
    promise.value_ = value;
    promise.onResolve_ = onResolve;
    promise.onReject_ = onReject;
    return promise;
  }
  function promiseInit(promise) {
    return promiseSet(promise, 0, undefined, [], []);
  }
  var Promise = function Promise(resolver) {
    if (resolver === promiseRaw)
      return;
    if (typeof resolver !== 'function')
      throw new TypeError;
    var promise = promiseInit(this);
    try {
      resolver((function(x) {
        promiseResolve(promise, x);
      }), (function(r) {
        promiseReject(promise, r);
      }));
    } catch (e) {
      promiseReject(promise, e);
    }
  };
  ($traceurRuntime.createClass)(Promise, {
    catch: function(onReject) {
      return this.then(undefined, onReject);
    },
    then: function(onResolve, onReject) {
      if (typeof onResolve !== 'function')
        onResolve = idResolveHandler;
      if (typeof onReject !== 'function')
        onReject = idRejectHandler;
      var that = this;
      var constructor = this.constructor;
      return chain(this, function(x) {
        x = promiseCoerce(constructor, x);
        return x === that ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
      }, onReject);
    }
  }, {
    resolve: function(x) {
      if (this === $Promise) {
        if (isPromise(x)) {
          return x;
        }
        return promiseSet(new $Promise(promiseRaw), +1, x);
      } else {
        return new this(function(resolve, reject) {
          resolve(x);
        });
      }
    },
    reject: function(r) {
      if (this === $Promise) {
        return promiseSet(new $Promise(promiseRaw), -1, r);
      } else {
        return new this((function(resolve, reject) {
          reject(r);
        }));
      }
    },
    all: function(values) {
      var deferred = getDeferred(this);
      var resolutions = [];
      try {
        var count = values.length;
        if (count === 0) {
          deferred.resolve(resolutions);
        } else {
          for (var i = 0; i < values.length; i++) {
            this.resolve(values[i]).then(function(i, x) {
              resolutions[i] = x;
              if (--count === 0)
                deferred.resolve(resolutions);
            }.bind(undefined, i), (function(r) {
              deferred.reject(r);
            }));
          }
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    },
    race: function(values) {
      var deferred = getDeferred(this);
      try {
        for (var i = 0; i < values.length; i++) {
          this.resolve(values[i]).then((function(x) {
            deferred.resolve(x);
          }), (function(r) {
            deferred.reject(r);
          }));
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    }
  });
  var $Promise = Promise;
  var $PromiseReject = $Promise.reject;
  function promiseResolve(promise, x) {
    promiseDone(promise, +1, x, promise.onResolve_);
  }
  function promiseReject(promise, r) {
    promiseDone(promise, -1, r, promise.onReject_);
  }
  function promiseDone(promise, status, value, reactions) {
    if (promise.status_ !== 0)
      return;
    promiseEnqueue(value, reactions);
    promiseSet(promise, status, value);
  }
  function promiseEnqueue(value, tasks) {
    async((function() {
      for (var i = 0; i < tasks.length; i += 2) {
        promiseHandle(value, tasks[i], tasks[i + 1]);
      }
    }));
  }
  function promiseHandle(value, handler, deferred) {
    try {
      var result = handler(value);
      if (result === deferred.promise)
        throw new TypeError;
      else if (isPromise(result))
        chain(result, deferred.resolve, deferred.reject);
      else
        deferred.resolve(result);
    } catch (e) {
      try {
        deferred.reject(e);
      } catch (e) {}
    }
  }
  var thenableSymbol = '@@thenable';
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function promiseCoerce(constructor, x) {
    if (!isPromise(x) && isObject(x)) {
      var then;
      try {
        then = x.then;
      } catch (r) {
        var promise = $PromiseReject.call(constructor, r);
        x[thenableSymbol] = promise;
        return promise;
      }
      if (typeof then === 'function') {
        var p = x[thenableSymbol];
        if (p) {
          return p;
        } else {
          var deferred = getDeferred(constructor);
          x[thenableSymbol] = deferred.promise;
          try {
            then.call(x, deferred.resolve, deferred.reject);
          } catch (r) {
            deferred.reject(r);
          }
          return deferred.promise;
        }
      }
    }
    return x;
  }
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
  }
  registerPolyfill(polyfillPromise);
  return {
    get Promise() {
      return Promise;
    },
    get polyfillPromise() {
      return polyfillPromise;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Promise" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator", [], function() {
  "use strict";
  var $__29;
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator";
  var $__27 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      createIteratorResultObject = $__27.createIteratorResultObject,
      isObject = $__27.isObject;
  var $__30 = $traceurRuntime,
      hasOwnProperty = $__30.hasOwnProperty,
      toProperty = $__30.toProperty;
  var iteratedString = Symbol('iteratedString');
  var stringIteratorNextIndex = Symbol('stringIteratorNextIndex');
  var StringIterator = function StringIterator() {};
  ($traceurRuntime.createClass)(StringIterator, ($__29 = {}, Object.defineProperty($__29, "next", {
    value: function() {
      var o = this;
      if (!isObject(o) || !hasOwnProperty(o, iteratedString)) {
        throw new TypeError('this must be a StringIterator object');
      }
      var s = o[toProperty(iteratedString)];
      if (s === undefined) {
        return createIteratorResultObject(undefined, true);
      }
      var position = o[toProperty(stringIteratorNextIndex)];
      var len = s.length;
      if (position >= len) {
        o[toProperty(iteratedString)] = undefined;
        return createIteratorResultObject(undefined, true);
      }
      var first = s.charCodeAt(position);
      var resultString;
      if (first < 0xD800 || first > 0xDBFF || position + 1 === len) {
        resultString = String.fromCharCode(first);
      } else {
        var second = s.charCodeAt(position + 1);
        if (second < 0xDC00 || second > 0xDFFF) {
          resultString = String.fromCharCode(first);
        } else {
          resultString = String.fromCharCode(first) + String.fromCharCode(second);
        }
      }
      o[toProperty(stringIteratorNextIndex)] = position + resultString.length;
      return createIteratorResultObject(resultString, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__29, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__29), {});
  function createStringIterator(string) {
    var s = String(string);
    var iterator = Object.create(StringIterator.prototype);
    iterator[toProperty(iteratedString)] = s;
    iterator[toProperty(stringIteratorNextIndex)] = 0;
    return iterator;
  }
  return {get createStringIterator() {
      return createStringIterator;
    }};
});
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/String", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/String";
  var createStringIterator = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/StringIterator").createStringIterator;
  var $__32 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      maybeAddFunctions = $__32.maybeAddFunctions,
      maybeAddIterator = $__32.maybeAddIterator,
      registerPolyfill = $__32.registerPolyfill;
  var $toString = Object.prototype.toString;
  var $indexOf = String.prototype.indexOf;
  var $lastIndexOf = String.prototype.lastIndexOf;
  function startsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) == start;
  }
  function endsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var pos = stringLength;
    if (arguments.length > 1) {
      var position = arguments[1];
      if (position !== undefined) {
        pos = position ? Number(position) : 0;
        if (isNaN(pos)) {
          pos = 0;
        }
      }
    }
    var end = Math.min(Math.max(pos, 0), stringLength);
    var start = end - searchLength;
    if (start < 0) {
      return false;
    }
    return $lastIndexOf.call(string, searchString, start) == start;
  }
  function contains(search) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) != -1;
  }
  function repeat(count) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var n = count ? Number(count) : 0;
    if (isNaN(n)) {
      n = 0;
    }
    if (n < 0 || n == Infinity) {
      throw RangeError();
    }
    if (n == 0) {
      return '';
    }
    var result = '';
    while (n--) {
      result += string;
    }
    return result;
  }
  function codePointAt(position) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var size = string.length;
    var index = position ? Number(position) : 0;
    if (isNaN(index)) {
      index = 0;
    }
    if (index < 0 || index >= size) {
      return undefined;
    }
    var first = string.charCodeAt(index);
    var second;
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }
  function raw(callsite) {
    var raw = callsite.raw;
    var len = raw.length >>> 0;
    if (len === 0)
      return '';
    var s = '';
    var i = 0;
    while (true) {
      s += raw[i];
      if (i + 1 === len)
        return s;
      s += arguments[++i];
    }
  }
  function fromCodePoint() {
    var codeUnits = [];
    var floor = Math.floor;
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) {
      return '';
    }
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
      if (codePoint <= 0xFFFF) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = (codePoint % 0x400) + 0xDC00;
        codeUnits.push(highSurrogate, lowSurrogate);
      }
    }
    return String.fromCharCode.apply(null, codeUnits);
  }
  function stringPrototypeIterator() {
    var o = $traceurRuntime.checkObjectCoercible(this);
    var s = String(o);
    return createStringIterator(s);
  }
  function polyfillString(global) {
    var String = global.String;
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'contains', contains, 'endsWith', endsWith, 'startsWith', startsWith, 'repeat', repeat]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
    maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
  }
  registerPolyfill(polyfillString);
  return {
    get startsWith() {
      return startsWith;
    },
    get endsWith() {
      return endsWith;
    },
    get contains() {
      return contains;
    },
    get repeat() {
      return repeat;
    },
    get codePointAt() {
      return codePointAt;
    },
    get raw() {
      return raw;
    },
    get fromCodePoint() {
      return fromCodePoint;
    },
    get stringPrototypeIterator() {
      return stringPrototypeIterator;
    },
    get polyfillString() {
      return polyfillString;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/String" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator", [], function() {
  "use strict";
  var $__36;
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator";
  var $__34 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      toObject = $__34.toObject,
      toUint32 = $__34.toUint32,
      createIteratorResultObject = $__34.createIteratorResultObject;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function ArrayIterator() {};
  ($traceurRuntime.createClass)(ArrayIterator, ($__36 = {}, Object.defineProperty($__36, "next", {
    value: function() {
      var iterator = toObject(this);
      var array = iterator.iteratorObject_;
      if (!array) {
        throw new TypeError('Object is not an ArrayIterator');
      }
      var index = iterator.arrayIteratorNextIndex_;
      var itemKind = iterator.arrayIterationKind_;
      var length = toUint32(array.length);
      if (index >= length) {
        iterator.arrayIteratorNextIndex_ = Infinity;
        return createIteratorResultObject(undefined, true);
      }
      iterator.arrayIteratorNextIndex_ = index + 1;
      if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
        return createIteratorResultObject(array[index], false);
      if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
        return createIteratorResultObject([index, array[index]], false);
      return createIteratorResultObject(index, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__36, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__36), {});
  function createArrayIterator(array, kind) {
    var object = toObject(array);
    var iterator = new ArrayIterator;
    iterator.iteratorObject_ = object;
    iterator.arrayIteratorNextIndex_ = 0;
    iterator.arrayIterationKind_ = kind;
    return iterator;
  }
  function entries() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
  }
  function keys() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
  }
  function values() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
  }
  return {
    get entries() {
      return entries;
    },
    get keys() {
      return keys;
    },
    get values() {
      return values;
    }
  };
});
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Array", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Array";
  var $__37 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/ArrayIterator"),
      entries = $__37.entries,
      keys = $__37.keys,
      values = $__37.values;
  var $__38 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      checkIterable = $__38.checkIterable,
      isCallable = $__38.isCallable,
      isConstructor = $__38.isConstructor,
      maybeAddFunctions = $__38.maybeAddFunctions,
      maybeAddIterator = $__38.maybeAddIterator,
      registerPolyfill = $__38.registerPolyfill,
      toInteger = $__38.toInteger,
      toLength = $__38.toLength,
      toObject = $__38.toObject;
  function from(arrLike) {
    var mapFn = arguments[1];
    var thisArg = arguments[2];
    var C = this;
    var items = toObject(arrLike);
    var mapping = mapFn !== undefined;
    var k = 0;
    var arr,
        len;
    if (mapping && !isCallable(mapFn)) {
      throw TypeError();
    }
    if (checkIterable(items)) {
      arr = isConstructor(C) ? new C() : [];
      for (var $__39 = items[Symbol.iterator](),
          $__40; !($__40 = $__39.next()).done; ) {
        var item = $__40.value;
        {
          if (mapping) {
            arr[k] = mapFn.call(thisArg, item, k);
          } else {
            arr[k] = item;
          }
          k++;
        }
      }
      arr.length = k;
      return arr;
    }
    len = toLength(items.length);
    arr = isConstructor(C) ? new C(len) : new Array(len);
    for (; k < len; k++) {
      if (mapping) {
        arr[k] = typeof thisArg === 'undefined' ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
      } else {
        arr[k] = items[k];
      }
    }
    arr.length = len;
    return arr;
  }
  function of() {
    for (var items = [],
        $__41 = 0; $__41 < arguments.length; $__41++)
      items[$__41] = arguments[$__41];
    var C = this;
    var len = items.length;
    var arr = isConstructor(C) ? new C(len) : new Array(len);
    for (var k = 0; k < len; k++) {
      arr[k] = items[k];
    }
    arr.length = len;
    return arr;
  }
  function fill(value) {
    var start = arguments[1] !== (void 0) ? arguments[1] : 0;
    var end = arguments[2];
    var object = toObject(this);
    var len = toLength(object.length);
    var fillStart = toInteger(start);
    var fillEnd = end !== undefined ? toInteger(end) : len;
    fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
    fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
    while (fillStart < fillEnd) {
      object[fillStart] = value;
      fillStart++;
    }
    return object;
  }
  function find(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg);
  }
  function findIndex(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg, true);
  }
  function findHelper(self, predicate) {
    var thisArg = arguments[2];
    var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
    var object = toObject(self);
    var len = toLength(object.length);
    if (!isCallable(predicate)) {
      throw TypeError();
    }
    for (var i = 0; i < len; i++) {
      if (i in object) {
        var value = object[i];
        if (predicate.call(thisArg, value, i, object)) {
          return returnIndex ? i : value;
        }
      }
    }
    return returnIndex ? -1 : undefined;
  }
  function polyfillArray(global) {
    var $__42 = global,
        Array = $__42.Array,
        Object = $__42.Object,
        Symbol = $__42.Symbol;
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
    maybeAddFunctions(Array, ['from', from, 'of', of]);
    maybeAddIterator(Array.prototype, values, Symbol);
    maybeAddIterator(Object.getPrototypeOf([].values()), function() {
      return this;
    }, Symbol);
  }
  registerPolyfill(polyfillArray);
  return {
    get from() {
      return from;
    },
    get of() {
      return of;
    },
    get fill() {
      return fill;
    },
    get find() {
      return find;
    },
    get findIndex() {
      return findIndex;
    },
    get polyfillArray() {
      return polyfillArray;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Array" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Object", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Object";
  var $__43 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      maybeAddFunctions = $__43.maybeAddFunctions,
      registerPolyfill = $__43.registerPolyfill;
  var $__44 = $traceurRuntime,
      defineProperty = $__44.defineProperty,
      getOwnPropertyDescriptor = $__44.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__44.getOwnPropertyNames,
      keys = $__44.keys,
      privateNames = $__44.privateNames;
  function is(left, right) {
    if (left === right)
      return left !== 0 || 1 / left === 1 / right;
    return left !== left && right !== right;
  }
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      var props = keys(source);
      var p,
          length = props.length;
      for (p = 0; p < length; p++) {
        var name = props[p];
        if (privateNames[name])
          continue;
        target[name] = source[name];
      }
    }
    return target;
  }
  function mixin(target, source) {
    var props = getOwnPropertyNames(source);
    var p,
        descriptor,
        length = props.length;
    for (p = 0; p < length; p++) {
      var name = props[p];
      if (privateNames[name])
        continue;
      descriptor = getOwnPropertyDescriptor(source, props[p]);
      defineProperty(target, props[p], descriptor);
    }
    return target;
  }
  function polyfillObject(global) {
    var Object = global.Object;
    maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
  }
  registerPolyfill(polyfillObject);
  return {
    get is() {
      return is;
    },
    get assign() {
      return assign;
    },
    get mixin() {
      return mixin;
    },
    get polyfillObject() {
      return polyfillObject;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Object" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/Number", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/Number";
  var $__46 = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils"),
      isNumber = $__46.isNumber,
      maybeAddConsts = $__46.maybeAddConsts,
      maybeAddFunctions = $__46.maybeAddFunctions,
      registerPolyfill = $__46.registerPolyfill,
      toInteger = $__46.toInteger;
  var $abs = Math.abs;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
  var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
  var EPSILON = Math.pow(2, -52);
  function NumberIsFinite(number) {
    return isNumber(number) && $isFinite(number);
  }
  ;
  function isInteger(number) {
    return NumberIsFinite(number) && toInteger(number) === number;
  }
  function NumberIsNaN(number) {
    return isNumber(number) && $isNaN(number);
  }
  ;
  function isSafeInteger(number) {
    if (NumberIsFinite(number)) {
      var integral = toInteger(number);
      if (integral === number)
        return $abs(integral) <= MAX_SAFE_INTEGER;
    }
    return false;
  }
  function polyfillNumber(global) {
    var Number = global.Number;
    maybeAddConsts(Number, ['MAX_SAFE_INTEGER', MAX_SAFE_INTEGER, 'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER, 'EPSILON', EPSILON]);
    maybeAddFunctions(Number, ['isFinite', NumberIsFinite, 'isInteger', isInteger, 'isNaN', NumberIsNaN, 'isSafeInteger', isSafeInteger]);
  }
  registerPolyfill(polyfillNumber);
  return {
    get MAX_SAFE_INTEGER() {
      return MAX_SAFE_INTEGER;
    },
    get MIN_SAFE_INTEGER() {
      return MIN_SAFE_INTEGER;
    },
    get EPSILON() {
      return EPSILON;
    },
    get isFinite() {
      return NumberIsFinite;
    },
    get isInteger() {
      return isInteger;
    },
    get isNaN() {
      return NumberIsNaN;
    },
    get isSafeInteger() {
      return isSafeInteger;
    },
    get polyfillNumber() {
      return polyfillNumber;
    }
  };
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/Number" + '');
System.register("traceur-runtime@0.0.62/src/runtime/polyfills/polyfills", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.62/src/runtime/polyfills/polyfills";
  var polyfillAll = System.get("traceur-runtime@0.0.62/src/runtime/polyfills/utils").polyfillAll;
  polyfillAll(this);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
    polyfillAll(global);
  };
  return {};
});
System.get("traceur-runtime@0.0.62/src/runtime/polyfills/polyfills" + '');

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":3}],5:[function(require,module,exports){
"use strict";
;
(function(window, document, navigator, undefined) {
  var utils,
      error,
      defaultOptions,
      isSupported,
      isWebCamGIFSupported,
      isExistingImagesGIFSupported,
      isExistingVideoGIFSupported,
      NeuQuant,
      processFrameWorker,
      gifWriter,
      AnimatedGIF,
      getBase64GIF,
      existingImages,
      screenShot,
      videoStream,
      stopVideoStreaming,
      createAndGetGIF,
      existingVideo,
      existingWebcam,
      createGIF,
      takeSnapShot,
      API,
      _index_;
  utils = function() {
    var utils = {
      'URL': window.URL || window.webkitURL || window.mozURL || window.msURL,
      'getUserMedia': function() {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        return getUserMedia ? getUserMedia.bind(navigator) : getUserMedia;
      }(),
      'Blob': window.Blob || window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
      'btoa': function() {
        var btoa = window.btoa || function(input) {
          var output = '',
              i = 0,
              l = input.length,
              key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
              chr1,
              chr2,
              chr3,
              enc1,
              enc2,
              enc3,
              enc4;
          while (i < l) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
            enc4 = chr3 & 63;
            if (isNaN(chr2))
              enc3 = enc4 = 64;
            else if (isNaN(chr3))
              enc4 = 64;
            output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
          }
          return output;
        };
        return btoa ? btoa.bind(window) : function() {};
      }(),
      'isObject': function(obj) {
        return obj && Object.prototype.toString.call(obj) === '[object Object]';
      },
      'isEmptyObject': function(obj) {
        return utils.isObject(obj) && !Object.keys(obj).length;
      },
      'isArray': function(arr) {
        return arr && Array.isArray(arr);
      },
      'isFunction': function(func) {
        return func && typeof func === 'function';
      },
      'isElement': function(elem) {
        return elem && elem.nodeType === 1;
      },
      'isString': function(value) {
        return typeof value === 'string' || Object.prototype.toString.call(value) === '[object String]';
      },
      'isSupported': {
        'canvas': function() {
          var el = document.createElement('canvas');
          return el && el.getContext && el.getContext('2d');
        },
        'webworkers': function() {
          return window.Worker;
        },
        'blob': function() {
          return utils.Blob;
        },
        'Uint8Array': function() {
          return window.Uint8Array;
        },
        'Uint32Array': function() {
          return window.Uint32Array;
        },
        'videoCodecs': function() {
          var testEl = document.createElement('video'),
              supportObj = {
                'mp4': false,
                'h264': false,
                'ogv': false,
                'ogg': false,
                'webm': false
              };
          if (testEl && testEl.canPlayType) {
            supportObj.mp4 = testEl.canPlayType('video/mp4; codecs="mp4v.20.8"') !== '';
            supportObj.h264 = (testEl.canPlayType('video/mp4; codecs="avc1.42E01E"') || testEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')) !== '';
            supportObj.ogv = testEl.canPlayType('video/ogg; codecs="theora"') !== '';
            supportObj.ogg = testEl.canPlayType('video/ogg; codecs="theora"') !== '';
            supportObj.webm = testEl.canPlayType('video/webm; codecs="vp8, vorbis"') !== -1;
          }
          return supportObj;
        }()
      },
      'noop': function() {},
      'each': function(collection, callback) {
        var x,
            len;
        if (utils.isArray(collection)) {
          x = -1;
          len = collection.length;
          while (++x < len) {
            if (callback(x, collection[x]) === false) {
              break;
            }
          }
        } else if (utils.isObject(collection)) {
          for (x in collection) {
            if (collection.hasOwnProperty(x)) {
              if (callback(x, collection[x]) === false) {
                break;
              }
            }
          }
        }
      },
      'mergeOptions': function deepMerge(defaultOptions, userOptions) {
        if (!utils.isObject(defaultOptions) || !utils.isObject(userOptions) || !Object.keys) {
          return;
        }
        var newObj = {};
        utils.each(defaultOptions, function(key, val) {
          newObj[key] = defaultOptions[key];
        });
        utils.each(userOptions, function(key, val) {
          var currentUserOption = userOptions[key];
          if (!utils.isObject(currentUserOption)) {
            newObj[key] = currentUserOption;
          } else {
            if (!defaultOptions[key]) {
              newObj[key] = currentUserOption;
            } else {
              newObj[key] = deepMerge(defaultOptions[key], currentUserOption);
            }
          }
        });
        return newObj;
      },
      'setCSSAttr': function(elem, attr, val) {
        if (!utils.isElement(elem)) {
          return;
        }
        if (utils.isString(attr) && utils.isString(val)) {
          elem.style[attr] = val;
        } else if (utils.isObject(attr)) {
          utils.each(attr, function(key, val) {
            elem.style[key] = val;
          });
        }
      },
      'removeElement': function(node) {
        if (!utils.isElement(node)) {
          return;
        }
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      },
      'createWebWorker': function(content) {
        if (!utils.isString(content)) {
          return {};
        }
        try {
          var blob = new utils.Blob([content], {'type': 'text/javascript'}),
              objectUrl = utils.URL.createObjectURL(blob),
              worker = new Worker(objectUrl);
          return {
            'objectUrl': objectUrl,
            'worker': worker
          };
        } catch (e) {
          return '' + e;
        }
      },
      'getExtension': function(src) {
        return src.substr(src.lastIndexOf('.') + 1, src.length);
      },
      'getFontSize': function(options) {
        options = options || {};
        if (!document.body || options.resizeFont === false) {
          return options.fontSize;
        }
        var text = options.text,
            containerWidth = options.gifWidth,
            fontSize = parseInt(options.fontSize, 10),
            minFontSize = parseInt(options.minFontSize, 10),
            div = document.createElement('div'),
            span = document.createElement('span');
        div.setAttribute('width', containerWidth);
        div.appendChild(span);
        span.innerHTML = text;
        span.style.fontSize = fontSize + 'px';
        span.style.textIndent = '-9999px';
        span.style.visibility = 'hidden';
        document.body.appendChild(span);
        while (span.offsetWidth > containerWidth && fontSize >= minFontSize) {
          span.style.fontSize = --fontSize + 'px';
        }
        document.body.removeChild(span);
        return fontSize + 'px';
      },
      'webWorkerError': false
    };
    return utils;
  }();
  error = function(utils) {
    var error = {
      'validate': function(skipObj) {
        skipObj = utils.isObject(skipObj) ? skipObj : {};
        var errorObj = {};
        utils.each(error.validators, function(indece, currentValidator) {
          var errorCode = currentValidator.errorCode;
          if (!skipObj[errorCode] && !currentValidator.condition) {
            errorObj = currentValidator;
            errorObj.error = true;
            return false;
          }
        });
        delete errorObj.condition;
        return errorObj;
      },
      'isValid': function(skipObj) {
        var errorObj = error.validate(skipObj),
            isValid = errorObj.error !== true ? true : false;
        return isValid;
      },
      'validators': [{
        'condition': utils.isFunction(utils.getUserMedia),
        'errorCode': 'getUserMedia',
        'errorMsg': 'The getUserMedia API is not supported in your browser'
      }, {
        'condition': utils.isSupported.canvas(),
        'errorCode': 'canvas',
        'errorMsg': 'Canvas elements are not supported in your browser'
      }, {
        'condition': utils.isSupported.webworkers(),
        'errorCode': 'webworkers',
        'errorMsg': 'The Web Workers API is not supported in your browser'
      }, {
        'condition': utils.isFunction(utils.URL),
        'errorCode': 'window.URL',
        'errorMsg': 'The window.URL API is not supported in your browser'
      }, {
        'condition': utils.isSupported.blob(),
        'errorCode': 'window.Blob',
        'errorMsg': 'The window.Blob File API is not supported in your browser'
      }, {
        'condition': utils.isSupported.Uint8Array(),
        'errorCode': 'window.Uint8Array',
        'errorMsg': 'The window.Uint8Array function constructor is not supported in your browser'
      }, {
        'condition': utils.isSupported.Uint32Array(),
        'errorCode': 'window.Uint32Array',
        'errorMsg': 'The window.Uint32Array function constructor is not supported in your browser'
      }],
      'messages': {'videoCodecs': {
          'errorCode': 'videocodec',
          'errorMsg': 'The video codec you are trying to use is not supported in your browser'
        }}
    };
    return error;
  }(utils);
  defaultOptions = {
    'sampleInterval': 10,
    'numWorkers': 2,
    'gifWidth': 200,
    'gifHeight': 200,
    'interval': 0.1,
    'numFrames': 10,
    'keepCameraOn': false,
    'images': [],
    'video': null,
    'webcamVideoElement': null,
    'cameraStream': null,
    'text': '',
    'fontWeight': 'normal',
    'fontSize': '16px',
    'minFontSize': '10px',
    'resizeFont': false,
    'fontFamily': 'sans-serif',
    'fontColor': '#ffffff',
    'textAlign': 'center',
    'textBaseline': 'bottom',
    'textXCoordinate': null,
    'textYCoordinate': null,
    'progressCallback': function(captureProgress) {},
    'completeCallback': function() {},
    'saveRenderingContexts': false,
    'savedRenderingContexts': []
  };
  isSupported = function() {
    return error.isValid();
  };
  isWebCamGIFSupported = function() {
    return error.isValid();
  };
  isExistingImagesGIFSupported = function() {
    var skipObj = {'getUserMedia': true};
    return error.isValid(skipObj);
  };
  isExistingVideoGIFSupported = function(codecs) {
    var isSupported = false,
        hasValidCodec = false;
    if (utils.isArray(codecs) && codecs.length) {
      utils.each(codecs, function(indece, currentCodec) {
        if (utils.isSupported.videoCodecs[currentCodec]) {
          hasValidCodec = true;
        }
      });
      if (!hasValidCodec) {
        return false;
      }
    } else if (utils.isString(codecs) && codecs.length) {
      if (!utils.isSupported.videoCodecs[codecs]) {
        return false;
      }
    }
    return error.isValid({'getUserMedia': true});
  };
  NeuQuant = function() {
    function NeuQuant() {
      var netsize = 256;
      var prime1 = 499;
      var prime2 = 491;
      var prime3 = 487;
      var prime4 = 503;
      var minpicturebytes = 3 * prime4;
      var maxnetpos = netsize - 1;
      var netbiasshift = 4;
      var ncycles = 100;
      var intbiasshift = 16;
      var intbias = 1 << intbiasshift;
      var gammashift = 10;
      var gamma = 1 << gammashift;
      var betashift = 10;
      var beta = intbias >> betashift;
      var betagamma = intbias << gammashift - betashift;
      var initrad = netsize >> 3;
      var radiusbiasshift = 6;
      var radiusbias = 1 << radiusbiasshift;
      var initradius = initrad * radiusbias;
      var radiusdec = 30;
      var alphabiasshift = 10;
      var initalpha = 1 << alphabiasshift;
      var alphadec;
      var radbiasshift = 8;
      var radbias = 1 << radbiasshift;
      var alpharadbshift = alphabiasshift + radbiasshift;
      var alpharadbias = 1 << alpharadbshift;
      var thepicture;
      var lengthcount;
      var samplefac;
      var network;
      var netindex = [];
      var bias = [];
      var freq = [];
      var radpower = [];
      function NeuQuantConstructor(thepic, len, sample) {
        var i;
        var p;
        thepicture = thepic;
        lengthcount = len;
        samplefac = sample;
        network = new Array(netsize);
        for (i = 0; i < netsize; i++) {
          network[i] = new Array(4);
          p = network[i];
          p[0] = p[1] = p[2] = (i << netbiasshift + 8) / netsize | 0;
          freq[i] = intbias / netsize | 0;
          bias[i] = 0;
        }
      }
      function colorMap() {
        var map = [];
        var index = new Array(netsize);
        for (var i = 0; i < netsize; i++)
          index[network[i][3]] = i;
        var k = 0;
        for (var l = 0; l < netsize; l++) {
          var j = index[l];
          map[k++] = network[j][0];
          map[k++] = network[j][1];
          map[k++] = network[j][2];
        }
        return map;
      }
      function inxbuild() {
        var i;
        var j;
        var smallpos;
        var smallval;
        var p;
        var q;
        var previouscol;
        var startpos;
        previouscol = 0;
        startpos = 0;
        for (i = 0; i < netsize; i++) {
          p = network[i];
          smallpos = i;
          smallval = p[1];
          for (j = i + 1; j < netsize; j++) {
            q = network[j];
            if (q[1] < smallval) {
              smallpos = j;
              smallval = q[1];
            }
          }
          q = network[smallpos];
          if (i != smallpos) {
            j = q[0];
            q[0] = p[0];
            p[0] = j;
            j = q[1];
            q[1] = p[1];
            p[1] = j;
            j = q[2];
            q[2] = p[2];
            p[2] = j;
            j = q[3];
            q[3] = p[3];
            p[3] = j;
          }
          if (smallval != previouscol) {
            netindex[previouscol] = startpos + i >> 1;
            for (j = previouscol + 1; j < smallval; j++) {
              netindex[j] = i;
            }
            previouscol = smallval;
            startpos = i;
          }
        }
        netindex[previouscol] = startpos + maxnetpos >> 1;
        for (j = previouscol + 1; j < 256; j++) {
          netindex[j] = maxnetpos;
        }
      }
      function learn() {
        var i;
        var j;
        var b;
        var g;
        var r;
        var radius;
        var rad;
        var alpha;
        var step;
        var delta;
        var samplepixels;
        var p;
        var pix;
        var lim;
        if (lengthcount < minpicturebytes) {
          samplefac = 1;
        }
        alphadec = 30 + (samplefac - 1) / 3;
        p = thepicture;
        pix = 0;
        lim = lengthcount;
        samplepixels = lengthcount / (3 * samplefac);
        delta = samplepixels / ncycles | 0;
        alpha = initalpha;
        radius = initradius;
        rad = radius >> radiusbiasshift;
        if (rad <= 1) {
          rad = 0;
        }
        for (i = 0; i < rad; i++) {
          radpower[i] = alpha * ((rad * rad - i * i) * radbias / (rad * rad));
        }
        if (lengthcount < minpicturebytes) {
          step = 3;
        } else if (lengthcount % prime1 !== 0) {
          step = 3 * prime1;
        } else {
          if (lengthcount % prime2 !== 0) {
            step = 3 * prime2;
          } else {
            if (lengthcount % prime3 !== 0) {
              step = 3 * prime3;
            } else {
              step = 3 * prime4;
            }
          }
        }
        i = 0;
        while (i < samplepixels) {
          b = (p[pix + 0] & 255) << netbiasshift;
          g = (p[pix + 1] & 255) << netbiasshift;
          r = (p[pix + 2] & 255) << netbiasshift;
          j = contest(b, g, r);
          altersingle(alpha, j, b, g, r);
          if (rad !== 0) {
            alterneigh(rad, j, b, g, r);
          }
          pix += step;
          if (pix >= lim) {
            pix -= lengthcount;
          }
          i++;
          if (delta === 0) {
            delta = 1;
          }
          if (i % delta === 0) {
            alpha -= alpha / alphadec;
            radius -= radius / radiusdec;
            rad = radius >> radiusbiasshift;
            if (rad <= 1) {
              rad = 0;
            }
            for (j = 0; j < rad; j++) {
              radpower[j] = alpha * ((rad * rad - j * j) * radbias / (rad * rad));
            }
          }
        }
      }
      function map(b, g, r) {
        var i;
        var j;
        var dist;
        var a;
        var bestd;
        var p;
        var best;
        bestd = 1000;
        best = -1;
        i = netindex[g];
        j = i - 1;
        while (i < netsize || j >= 0) {
          if (i < netsize) {
            p = network[i];
            dist = p[1] - g;
            if (dist >= bestd) {
              i = netsize;
            } else {
              i++;
              if (dist < 0) {
                dist = -dist;
              }
              a = p[0] - b;
              if (a < 0) {
                a = -a;
              }
              dist += a;
              if (dist < bestd) {
                a = p[2] - r;
                if (a < 0) {
                  a = -a;
                }
                dist += a;
                if (dist < bestd) {
                  bestd = dist;
                  best = p[3];
                }
              }
            }
          }
          if (j >= 0) {
            p = network[j];
            dist = g - p[1];
            if (dist >= bestd) {
              j = -1;
            } else {
              j--;
              if (dist < 0) {
                dist = -dist;
              }
              a = p[0] - b;
              if (a < 0) {
                a = -a;
              }
              dist += a;
              if (dist < bestd) {
                a = p[2] - r;
                if (a < 0) {
                  a = -a;
                }
                dist += a;
                if (dist < bestd) {
                  bestd = dist;
                  best = p[3];
                }
              }
            }
          }
        }
        return best;
      }
      function process() {
        learn();
        unbiasnet();
        inxbuild();
        return colorMap();
      }
      function unbiasnet() {
        var i;
        var j;
        for (i = 0; i < netsize; i++) {
          network[i][0] >>= netbiasshift;
          network[i][1] >>= netbiasshift;
          network[i][2] >>= netbiasshift;
          network[i][3] = i;
        }
      }
      function alterneigh(rad, i, b, g, r) {
        var j;
        var k;
        var lo;
        var hi;
        var a;
        var m;
        var p;
        lo = i - rad;
        if (lo < -1) {
          lo = -1;
        }
        hi = i + rad;
        if (hi > netsize) {
          hi = netsize;
        }
        j = i + 1;
        k = i - 1;
        m = 1;
        while (j < hi || k > lo) {
          a = radpower[m++];
          if (j < hi) {
            p = network[j++];
            try {
              p[0] -= a * (p[0] - b) / alpharadbias | 0;
              p[1] -= a * (p[1] - g) / alpharadbias | 0;
              p[2] -= a * (p[2] - r) / alpharadbias | 0;
            } catch (e) {}
          }
          if (k > lo) {
            p = network[k--];
            try {
              p[0] -= a * (p[0] - b) / alpharadbias | 0;
              p[1] -= a * (p[1] - g) / alpharadbias | 0;
              p[2] -= a * (p[2] - r) / alpharadbias | 0;
            } catch (e) {}
          }
        }
      }
      function altersingle(alpha, i, b, g, r) {
        var n = network[i];
        var alphaMult = alpha / initalpha;
        n[0] -= alphaMult * (n[0] - b) | 0;
        n[1] -= alphaMult * (n[1] - g) | 0;
        n[2] -= alphaMult * (n[2] - r) | 0;
      }
      function contest(b, g, r) {
        var i;
        var dist;
        var a;
        var biasdist;
        var betafreq;
        var bestpos;
        var bestbiaspos;
        var bestd;
        var bestbiasd;
        var n;
        bestd = ~(1 << 31);
        bestbiasd = bestd;
        bestpos = -1;
        bestbiaspos = bestpos;
        for (i = 0; i < netsize; i++) {
          n = network[i];
          dist = n[0] - b;
          if (dist < 0) {
            dist = -dist;
          }
          a = n[1] - g;
          if (a < 0) {
            a = -a;
          }
          dist += a;
          a = n[2] - r;
          if (a < 0) {
            a = -a;
          }
          dist += a;
          if (dist < bestd) {
            bestd = dist;
            bestpos = i;
          }
          biasdist = dist - (bias[i] >> intbiasshift - netbiasshift);
          if (biasdist < bestbiasd) {
            bestbiasd = biasdist;
            bestbiaspos = i;
          }
          betafreq = freq[i] >> betashift;
          freq[i] -= betafreq;
          bias[i] += betafreq << gammashift;
        }
        freq[bestpos] += beta;
        bias[bestpos] -= betagamma;
        return bestbiaspos;
      }
      NeuQuantConstructor.apply(this, arguments);
      var exports = {};
      exports.map = map;
      exports.process = process;
      return exports;
    }
    return NeuQuant;
  }();
  processFrameWorker = function(NeuQuant) {
    var workerCode = function() {
      try {
        self.onmessage = function(ev) {
          var data = ev.data,
              response = workerMethods.run(data);
          if (data && data.gifshot) {
            postMessage(response);
          }
        };
      } catch (e) {}
      var workerMethods = {
        'dataToRGB': function(data, width, height) {
          var i = 0,
              length = width * height * 4,
              rgb = [];
          while (i < length) {
            rgb.push(data[i++]);
            rgb.push(data[i++]);
            rgb.push(data[i++]);
            i++;
          }
          return rgb;
        },
        'componentizedPaletteToArray': function(paletteRGB) {
          var paletteArray = [],
              i,
              r,
              g,
              b;
          for (i = 0; i < paletteRGB.length; i += 3) {
            r = paletteRGB[i];
            g = paletteRGB[i + 1];
            b = paletteRGB[i + 2];
            paletteArray.push(r << 16 | g << 8 | b);
          }
          return paletteArray;
        },
        'processFrameWithQuantizer': function(imageData, width, height, sampleInterval) {
          var rgbComponents = this.dataToRGB(imageData, width, height),
              nq = new NeuQuant(rgbComponents, rgbComponents.length, sampleInterval),
              paletteRGB = nq.process(),
              paletteArray = new Uint32Array(this.componentizedPaletteToArray(paletteRGB)),
              numberPixels = width * height,
              indexedPixels = new Uint8Array(numberPixels),
              k = 0,
              i,
              r,
              g,
              b;
          for (i = 0; i < numberPixels; i++) {
            r = rgbComponents[k++];
            g = rgbComponents[k++];
            b = rgbComponents[k++];
            indexedPixels[i] = nq.map(r, g, b);
          }
          return {
            pixels: indexedPixels,
            palette: paletteArray
          };
        },
        'run': function(frame) {
          var width = frame.width,
              height = frame.height,
              imageData = frame.data,
              palette = frame.palette,
              sampleInterval = frame.sampleInterval;
          return this.processFrameWithQuantizer(imageData, width, height, sampleInterval);
        }
      };
      return workerMethods;
    };
    return workerCode;
  }(NeuQuant);
  gifWriter = function gifWriter(buf, width, height, gopts) {
    var p = 0;
    gopts = gopts === undefined ? {} : gopts;
    var loop_count = gopts.loop === undefined ? null : gopts.loop;
    var global_palette = gopts.palette === undefined ? null : gopts.palette;
    if (width <= 0 || height <= 0 || width > 65535 || height > 65535)
      throw 'Width/Height invalid.';
    function check_palette_and_num_colors(palette) {
      var num_colors = palette.length;
      if (num_colors < 2 || num_colors > 256 || num_colors & num_colors - 1)
        throw 'Invalid code/color length, must be power of 2 and 2 .. 256.';
      return num_colors;
    }
    buf[p++] = 71;
    buf[p++] = 73;
    buf[p++] = 70;
    buf[p++] = 56;
    buf[p++] = 57;
    buf[p++] = 97;
    var gp_num_colors_pow2 = 0;
    var background = 0;
    buf[p++] = width & 255;
    buf[p++] = width >> 8 & 255;
    buf[p++] = height & 255;
    buf[p++] = height >> 8 & 255;
    buf[p++] = (global_palette !== null ? 128 : 0) | gp_num_colors_pow2;
    buf[p++] = background;
    buf[p++] = 0;
    if (loop_count !== null) {
      if (loop_count < 0 || loop_count > 65535)
        throw 'Loop count invalid.';
      buf[p++] = 33;
      buf[p++] = 255;
      buf[p++] = 11;
      buf[p++] = 78;
      buf[p++] = 69;
      buf[p++] = 84;
      buf[p++] = 83;
      buf[p++] = 67;
      buf[p++] = 65;
      buf[p++] = 80;
      buf[p++] = 69;
      buf[p++] = 50;
      buf[p++] = 46;
      buf[p++] = 48;
      buf[p++] = 3;
      buf[p++] = 1;
      buf[p++] = loop_count & 255;
      buf[p++] = loop_count >> 8 & 255;
      buf[p++] = 0;
    }
    var ended = false;
    this.addFrame = function(x, y, w, h, indexed_pixels, opts) {
      if (ended === true) {
        --p;
        ended = false;
      }
      opts = opts === undefined ? {} : opts;
      if (x < 0 || y < 0 || x > 65535 || y > 65535)
        throw 'x/y invalid.';
      if (w <= 0 || h <= 0 || w > 65535 || h > 65535)
        throw 'Width/Height invalid.';
      if (indexed_pixels.length < w * h)
        throw 'Not enough pixels for the frame size.';
      var using_local_palette = true;
      var palette = opts.palette;
      if (palette === undefined || palette === null) {
        using_local_palette = false;
        palette = global_palette;
      }
      if (palette === undefined || palette === null)
        throw 'Must supply either a local or global palette.';
      var num_colors = check_palette_and_num_colors(palette);
      var min_code_size = 0;
      while (num_colors >>= 1)
        ++min_code_size;
      num_colors = 1 << min_code_size;
      var delay = opts.delay === undefined ? 0 : opts.delay;
      var disposal = opts.disposal === undefined ? 0 : opts.disposal;
      if (disposal < 0 || disposal > 3)
        throw 'Disposal out of range.';
      var use_transparency = false;
      var transparent_index = 0;
      if (opts.transparent !== undefined && opts.transparent !== null) {
        use_transparency = true;
        transparent_index = opts.transparent;
        if (transparent_index < 0 || transparent_index >= num_colors)
          throw 'Transparent color index.';
      }
      if (disposal !== 0 || use_transparency || delay !== 0) {
        buf[p++] = 33;
        buf[p++] = 249;
        buf[p++] = 4;
        buf[p++] = disposal << 2 | (use_transparency === true ? 1 : 0);
        buf[p++] = delay & 255;
        buf[p++] = delay >> 8 & 255;
        buf[p++] = transparent_index;
        buf[p++] = 0;
      }
      buf[p++] = 44;
      buf[p++] = x & 255;
      buf[p++] = x >> 8 & 255;
      buf[p++] = y & 255;
      buf[p++] = y >> 8 & 255;
      buf[p++] = w & 255;
      buf[p++] = w >> 8 & 255;
      buf[p++] = h & 255;
      buf[p++] = h >> 8 & 255;
      buf[p++] = using_local_palette === true ? 128 | min_code_size - 1 : 0;
      if (using_local_palette === true) {
        for (var i = 0,
            il = palette.length; i < il; ++i) {
          var rgb = palette[i];
          buf[p++] = rgb >> 16 & 255;
          buf[p++] = rgb >> 8 & 255;
          buf[p++] = rgb & 255;
        }
      }
      p = GifWriterOutputLZWCodeStream(buf, p, min_code_size < 2 ? 2 : min_code_size, indexed_pixels);
    };
    this.end = function() {
      if (ended === false) {
        buf[p++] = 59;
        ended = true;
      }
      return p;
    };
    function GifWriterOutputLZWCodeStream(buf, p, min_code_size, index_stream) {
      buf[p++] = min_code_size;
      var cur_subblock = p++;
      var clear_code = 1 << min_code_size;
      var code_mask = clear_code - 1;
      var eoi_code = clear_code + 1;
      var next_code = eoi_code + 1;
      var cur_code_size = min_code_size + 1;
      var cur_shift = 0;
      var cur = 0;
      function emit_bytes_to_buffer(bit_block_size) {
        while (cur_shift >= bit_block_size) {
          buf[p++] = cur & 255;
          cur >>= 8;
          cur_shift -= 8;
          if (p === cur_subblock + 256) {
            buf[cur_subblock] = 255;
            cur_subblock = p++;
          }
        }
      }
      function emit_code(c) {
        cur |= c << cur_shift;
        cur_shift += cur_code_size;
        emit_bytes_to_buffer(8);
      }
      var ib_code = index_stream[0] & code_mask;
      var code_table = {};
      emit_code(clear_code);
      for (var i = 1,
          il = index_stream.length; i < il; ++i) {
        var k = index_stream[i] & code_mask;
        var cur_key = ib_code << 8 | k;
        var cur_code = code_table[cur_key];
        if (cur_code === undefined) {
          cur |= ib_code << cur_shift;
          cur_shift += cur_code_size;
          while (cur_shift >= 8) {
            buf[p++] = cur & 255;
            cur >>= 8;
            cur_shift -= 8;
            if (p === cur_subblock + 256) {
              buf[cur_subblock] = 255;
              cur_subblock = p++;
            }
          }
          if (next_code === 4096) {
            emit_code(clear_code);
            next_code = eoi_code + 1;
            cur_code_size = min_code_size + 1;
            code_table = {};
          } else {
            if (next_code >= 1 << cur_code_size)
              ++cur_code_size;
            code_table[cur_key] = next_code++;
          }
          ib_code = k;
        } else {
          ib_code = cur_code;
        }
      }
      emit_code(ib_code);
      emit_code(eoi_code);
      emit_bytes_to_buffer(1);
      if (cur_subblock + 1 === p) {
        buf[cur_subblock] = 0;
      } else {
        buf[cur_subblock] = p - cur_subblock - 1;
        buf[p++] = 0;
      }
      return p;
    }
  };
  AnimatedGIF = function(utils, frameWorkerCode, NeuQuant, GifWriter) {
    var AnimatedGIF = function(options) {
      this.canvas = null;
      this.ctx = null;
      this.repeat = 0;
      this.frames = [];
      this.numRenderedFrames = 0;
      this.onRenderCompleteCallback = utils.noop;
      this.onRenderProgressCallback = utils.noop;
      this.workers = [];
      this.availableWorkers = [];
      this.generatingGIF = false;
      this.options = options;
      this.initializeWebWorkers(options);
    };
    AnimatedGIF.prototype = {
      'workerMethods': frameWorkerCode(),
      'initializeWebWorkers': function(options) {
        var processFrameWorkerCode = NeuQuant.toString() + '(' + frameWorkerCode.toString() + '());',
            webWorkerObj,
            objectUrl,
            webWorker,
            numWorkers,
            x = -1,
            workerError = '';
        numWorkers = options.numWorkers;
        while (++x < numWorkers) {
          webWorkerObj = utils.createWebWorker(processFrameWorkerCode);
          if (utils.isObject(webWorkerObj)) {
            objectUrl = webWorkerObj.objectUrl;
            webWorker = webWorkerObj.worker;
            this.workers.push({
              'worker': webWorker,
              'objectUrl': objectUrl
            });
            this.availableWorkers.push(webWorker);
          } else {
            workerError = webWorkerObj;
            utils.webWorkerError = !!webWorkerObj;
          }
        }
        this.workerError = workerError;
        this.canvas = document.createElement('canvas');
        this.canvas.width = options.gifWidth;
        this.canvas.height = options.gifHeight;
        this.ctx = this.canvas.getContext('2d');
        this.frames = [];
      },
      'getWorker': function() {
        return this.availableWorkers.pop();
      },
      'freeWorker': function(worker) {
        this.availableWorkers.push(worker);
      },
      'byteMap': function() {
        var byteMap = [];
        for (var i = 0; i < 256; i++) {
          byteMap[i] = String.fromCharCode(i);
        }
        return byteMap;
      }(),
      'bufferToString': function(buffer) {
        var numberValues = buffer.length,
            str = '',
            x = -1;
        while (++x < numberValues) {
          str += this.byteMap[buffer[x]];
        }
        return str;
      },
      'onFrameFinished': function() {
        var self = this,
            frames = self.frames,
            allDone = frames.every(function(frame) {
              return !frame.beingProcessed && frame.done;
            });
        self.numRenderedFrames++;
        self.onRenderProgressCallback(self.numRenderedFrames * 0.75 / frames.length);
        if (allDone) {
          if (!self.generatingGIF) {
            self.generateGIF(frames, self.onRenderCompleteCallback);
          }
        } else {
          setTimeout(function() {
            self.processNextFrame();
          }, 1);
        }
      },
      'processFrame': function(position) {
        var AnimatedGifContext = this,
            options = this.options,
            sampleInterval = options.sampleInterval,
            frames = this.frames,
            frame,
            worker,
            done = function(ev) {
              var data = ev.data;
              delete frame.data;
              frame.pixels = Array.prototype.slice.call(data.pixels);
              frame.palette = Array.prototype.slice.call(data.palette);
              frame.done = true;
              frame.beingProcessed = false;
              AnimatedGifContext.freeWorker(worker);
              AnimatedGifContext.onFrameFinished();
            };
        frame = frames[position];
        if (frame.beingProcessed || frame.done) {
          this.onFrameFinished();
          return;
        }
        frame.sampleInterval = sampleInterval;
        frame.beingProcessed = true;
        frame.gifshot = true;
        worker = this.getWorker();
        if (worker) {
          worker.onmessage = done;
          worker.postMessage(frame);
        } else {
          done({'data': AnimatedGifContext.workerMethods.run(frame)});
        }
      },
      'startRendering': function(completeCallback) {
        this.onRenderCompleteCallback = completeCallback;
        for (var i = 0; i < this.options.numWorkers && i < this.frames.length; i++) {
          this.processFrame(i);
        }
      },
      'processNextFrame': function() {
        var position = -1;
        for (var i = 0; i < this.frames.length; i++) {
          var frame = this.frames[i];
          if (!frame.done && !frame.beingProcessed) {
            position = i;
            break;
          }
        }
        if (position >= 0) {
          this.processFrame(position);
        }
      },
      'generateGIF': function(frames, callback) {
        var buffer = [],
            gifOptions = {'loop': this.repeat},
            options = this.options,
            interval = options.interval,
            existingImages = options.images,
            hasExistingImages = !!existingImages.length,
            height = options.gifHeight,
            width = options.gifWidth,
            gifWriter = new GifWriter(buffer, width, height, gifOptions),
            onRenderProgressCallback = this.onRenderProgressCallback,
            delay = hasExistingImages ? interval * 100 : 0,
            bufferToString,
            gif;
        this.generatingGIF = true;
        utils.each(frames, function(iterator, frame) {
          var framePalette = frame.palette;
          onRenderProgressCallback(0.75 + 0.25 * frame.position * 1 / frames.length);
          gifWriter.addFrame(0, 0, width, height, frame.pixels, {
            palette: framePalette,
            delay: delay
          });
        });
        gifWriter.end();
        onRenderProgressCallback(1);
        this.frames = [];
        this.generatingGIF = false;
        if (utils.isFunction(callback)) {
          bufferToString = this.bufferToString(buffer);
          gif = 'data:image/gif;base64,' + utils.btoa(bufferToString);
          callback(gif);
        }
      },
      'setRepeat': function(r) {
        this.repeat = r;
      },
      'addFrame': function(element, gifshotOptions) {
        gifshotOptions = utils.isObject(gifshotOptions) ? gifshotOptions : {};
        var self = this,
            ctx = self.ctx,
            options = self.options,
            width = options.gifWidth,
            height = options.gifHeight,
            gifHeight = gifshotOptions.gifHeight,
            gifWidth = gifshotOptions.gifWidth,
            text = gifshotOptions.text,
            fontWeight = gifshotOptions.fontWeight,
            fontSize = utils.getFontSize(gifshotOptions),
            fontFamily = gifshotOptions.fontFamily,
            fontColor = gifshotOptions.fontColor,
            textAlign = gifshotOptions.textAlign,
            textBaseline = gifshotOptions.textBaseline,
            textXCoordinate = gifshotOptions.textXCoordinate ? gifshotOptions.textXCoordinate : textAlign === 'left' ? 1 : textAlign === 'right' ? width : width / 2,
            textYCoordinate = gifshotOptions.textYCoordinate ? gifshotOptions.textYCoordinate : textBaseline === 'top' ? 1 : textBaseline === 'center' ? height / 2 : height,
            font = fontWeight + ' ' + fontSize + ' ' + fontFamily,
            imageData;
        try {
          ctx.drawImage(element, 0, 0, width, height);
          if (text) {
            ctx.font = font;
            ctx.fillStyle = fontColor;
            ctx.textAlign = textAlign;
            ctx.textBaseline = textBaseline;
            ctx.fillText(text, textXCoordinate, textYCoordinate);
          }
          imageData = ctx.getImageData(0, 0, width, height);
          self.addFrameImageData(imageData);
        } catch (e) {
          return '' + e;
        }
      },
      'addFrameImageData': function(imageData) {
        var frames = this.frames,
            imageDataArray = imageData.data;
        this.frames.push({
          'data': imageDataArray,
          'width': imageData.width,
          'height': imageData.height,
          'palette': null,
          'dithering': null,
          'done': false,
          'beingProcessed': false,
          'position': frames.length
        });
      },
      'onRenderProgress': function(callback) {
        this.onRenderProgressCallback = callback;
      },
      'isRendering': function() {
        return this.generatingGIF;
      },
      'getBase64GIF': function(completeCallback) {
        var self = this,
            onRenderComplete = function(gif) {
              self.destroyWorkers();
              setTimeout(function() {
                completeCallback(gif);
              }, 0);
            };
        self.startRendering(onRenderComplete);
      },
      'destroyWorkers': function() {
        if (this.workerError) {
          return;
        }
        var workers = this.workers;
        utils.each(workers, function(iterator, workerObj) {
          var worker = workerObj.worker,
              objectUrl = workerObj.objectUrl;
          worker.terminate();
          utils.URL.revokeObjectURL(objectUrl);
        });
      }
    };
    return AnimatedGIF;
  }(utils, processFrameWorker, NeuQuant, gifWriter);
  getBase64GIF = function getBase64GIF(animatedGifInstance, callback) {
    animatedGifInstance.getBase64GIF(function(image) {
      callback({
        'error': false,
        'errorCode': '',
        'errorMsg': '',
        'image': image
      });
    });
  };
  existingImages = function(obj) {
    var images = obj.images,
        imagesLength = obj.imagesLength,
        callback = obj.callback,
        options = obj.options,
        skipObj = {
          'getUserMedia': true,
          'window.URL': true
        },
        errorObj = error.validate(skipObj),
        loadedImages = 0,
        tempImage,
        ag;
    if (errorObj.error) {
      return callback(errorObj);
    }
    ag = new AnimatedGIF(options);
    utils.each(images, function(index, currentImage) {
      if (utils.isElement(currentImage)) {
        currentImage.crossOrigin = 'Anonymous';
        ag.addFrame(currentImage, options);
        loadedImages += 1;
        if (loadedImages === imagesLength) {
          getBase64GIF(ag, callback);
        }
      } else if (utils.isString(currentImage)) {
        tempImage = document.createElement('img');
        tempImage.crossOrigin = 'Anonymous';
        tempImage.onerror = function(e) {
          if (imagesLength > 0) {
            imagesLength -= 1;
          }
        };
        tempImage.src = currentImage;
        (function(tempImage) {
          tempImage.onload = function() {
            ag.addFrame(tempImage, options);
            utils.removeElement(tempImage);
            loadedImages += 1;
            if (loadedImages === imagesLength) {
              getBase64GIF(ag, callback);
            }
          };
        }(tempImage));
        utils.setCSSAttr(tempImage, {
          'position': 'fixed',
          'opacity': '0'
        });
        document.body.appendChild(tempImage);
      }
    });
  };
  screenShot = {
    getGIF: function(options, callback) {
      callback = utils.isFunction(callback) ? callback : function() {};
      var canvas = document.createElement('canvas'),
          context,
          existingImages = options.images,
          hasExistingImages = !!existingImages.length,
          videoElement = options.videoElement,
          keepCameraOn = options.keepCameraOn,
          webcamVideoElement = options.webcamVideoElement,
          cameraStream = options.cameraStream,
          gifWidth = +options.gifWidth,
          gifHeight = +options.gifHeight,
          videoWidth = options.videoWidth,
          videoHeight = options.videoHeight,
          sampleInterval = +options.sampleInterval,
          numWorkers = +options.numWorkers,
          crop = options.crop,
          interval = +options.interval,
          waitBetweenFrames = hasExistingImages ? 0 : interval * 1000,
          progressCallback = options.progressCallback,
          savedRenderingContexts = options.savedRenderingContexts,
          saveRenderingContexts = options.saveRenderingContexts,
          renderingContextsToSave = [],
          numFrames = savedRenderingContexts.length ? savedRenderingContexts.length : options.numFrames,
          pendingFrames = numFrames,
          ag = new AnimatedGIF(options),
          text = options.text,
          fontWeight = options.fontWeight,
          fontSize = utils.getFontSize(options),
          fontFamily = options.fontFamily,
          fontColor = options.fontColor,
          textAlign = options.textAlign,
          textBaseline = options.textBaseline,
          textXCoordinate = options.textXCoordinate ? options.textXCoordinate : textAlign === 'left' ? 1 : textAlign === 'right' ? gifWidth : gifWidth / 2,
          textYCoordinate = options.textYCoordinate ? options.textYCoordinate : textBaseline === 'top' ? 1 : textBaseline === 'center' ? gifHeight / 2 : gifHeight,
          font = fontWeight + ' ' + fontSize + ' ' + fontFamily,
          sourceX = crop ? Math.floor(crop.scaledWidth / 2) : 0,
          sourceWidth = crop ? videoWidth - crop.scaledWidth : 0,
          sourceY = crop ? Math.floor(crop.scaledHeight / 2) : 0,
          sourceHeight = crop ? videoHeight - crop.scaledHeight : 0,
          captureFrames = function captureFrame() {
            var framesLeft = pendingFrames - 1;
            if (savedRenderingContexts.length) {
              context.putImageData(savedRenderingContexts[numFrames - pendingFrames], 0, 0);
            } else {
              drawVideo();
            }
            function drawVideo() {
              try {
                if (sourceWidth > videoWidth) {
                  sourceWidth = videoWidth;
                }
                if (sourceHeight > videoHeight) {
                  sourceHeight = videoHeight;
                }
                if (sourceX < 0) {
                  sourceX = 0;
                }
                if (sourceY < 0) {
                  sourceY = 0;
                }
                context.drawImage(videoElement, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, gifWidth, gifHeight);
                finishCapture();
              } catch (e) {
                if (e.name === 'NS_ERROR_NOT_AVAILABLE') {
                  setTimeout(drawVideo, 100);
                } else {
                  throw e;
                }
              }
            }
            function finishCapture() {
              if (saveRenderingContexts) {
                renderingContextsToSave.push(context.getImageData(0, 0, gifWidth, gifHeight));
              }
              if (text) {
                context.font = font;
                context.fillStyle = fontColor;
                context.textAlign = textAlign;
                context.textBaseline = textBaseline;
                context.fillText(text, textXCoordinate, textYCoordinate);
              }
              ag.addFrameImageData(context.getImageData(0, 0, gifWidth, gifHeight));
              pendingFrames = framesLeft;
              progressCallback((numFrames - pendingFrames) / numFrames);
              if (framesLeft > 0) {
                setTimeout(captureFrame, waitBetweenFrames);
              }
              if (!pendingFrames) {
                ag.getBase64GIF(function(image) {
                  callback({
                    'error': false,
                    'errorCode': '',
                    'errorMsg': '',
                    'image': image,
                    'cameraStream': cameraStream,
                    'videoElement': videoElement,
                    'webcamVideoElement': webcamVideoElement,
                    'savedRenderingContexts': renderingContextsToSave,
                    'keepCameraOn': keepCameraOn
                  });
                });
              }
            }
          };
      numFrames = numFrames !== undefined ? numFrames : 10;
      interval = interval !== undefined ? interval : 0.1;
      canvas.width = gifWidth;
      canvas.height = gifHeight;
      context = canvas.getContext('2d');
      (function capture() {
        if (videoElement.currentTime === 0) {
          setTimeout(capture, 100);
          return;
        }
        captureFrames();
      }());
    },
    'getCropDimensions': function(obj) {
      var width = obj.videoWidth,
          height = obj.videoHeight,
          gifWidth = obj.gifWidth,
          gifHeight = obj.gifHeight,
          result = {
            width: 0,
            height: 0,
            scaledWidth: 0,
            scaledHeight: 0
          };
      if (width > height) {
        result.width = Math.round(width * (gifHeight / height)) - gifWidth;
        result.scaledWidth = Math.round(result.width * (height / gifHeight));
      } else {
        result.height = Math.round(height * (gifWidth / width)) - gifHeight;
        result.scaledHeight = Math.round(result.height * (width / gifWidth));
      }
      return result;
    }
  };
  videoStream = {
    'loadedData': false,
    'defaultVideoDimensions': {
      'width': 640,
      'height': 480
    },
    'findVideoSize': function findVideoSizeMethod(obj) {
      findVideoSizeMethod.attempts = findVideoSizeMethod.attempts || 0;
      var self = this,
          videoElement = obj.videoElement,
          cameraStream = obj.cameraStream,
          completedCallback = obj.completedCallback;
      if (!videoElement) {
        return;
      }
      if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {
        videoElement.removeEventListener('loadeddata', self.findVideoSize);
        completedCallback({
          'videoElement': videoElement,
          'cameraStream': cameraStream,
          'videoWidth': videoElement.videoWidth,
          'videoHeight': videoElement.videoHeight
        });
      } else {
        if (findVideoSizeMethod.attempts < 10) {
          findVideoSizeMethod.attempts += 1;
          setTimeout(function() {
            self.findVideoSize(obj);
          }, 200);
        } else {
          completedCallback({
            'videoElement': videoElement,
            'cameraStream': cameraStream,
            'videoWidth': self.defaultVideoDimensions.width,
            'videoHeight': self.defaultVideoDimensions.height
          });
        }
      }
    },
    'onStreamingTimeout': function(callback) {
      if (utils.isFunction(callback)) {
        callback({
          'error': true,
          'errorCode': 'getUserMedia',
          'errorMsg': 'There was an issue with the getUserMedia API - Timed out while trying to start streaming',
          'image': null,
          'cameraStream': {}
        });
      }
    },
    'stream': function(obj) {
      var self = this,
          existingVideo = utils.isArray(obj.existingVideo) ? obj.existingVideo[0] : obj.existingVideo,
          videoElement = obj.videoElement,
          cameraStream = obj.cameraStream,
          streamedCallback = obj.streamedCallback,
          completedCallback = obj.completedCallback;
      if (utils.isFunction(streamedCallback)) {
        streamedCallback();
      }
      if (existingVideo) {
        if (utils.isString(existingVideo)) {
          videoElement.src = existingVideo;
          videoElement.innerHTML = '<source src="' + existingVideo + '" type="video/' + utils.getExtension(existingVideo) + '" />';
        }
      } else if (videoElement.mozSrcObject) {
        videoElement.mozSrcObject = cameraStream;
      } else if (utils.URL) {
        videoElement.src = utils.URL.createObjectURL(cameraStream);
      }
      videoElement.play();
      setTimeout(function checkLoadedData() {
        checkLoadedData.count = checkLoadedData.count || 0;
        if (self.loadedData === true) {
          self.findVideoSize({
            'videoElement': videoElement,
            'cameraStream': cameraStream,
            'completedCallback': completedCallback
          });
          self.loadedData = false;
        } else {
          checkLoadedData.count += 1;
          if (checkLoadedData.count > 10) {
            self.findVideoSize({
              'videoElement': videoElement,
              'cameraStream': cameraStream,
              'completedCallback': completedCallback
            });
          } else {
            checkLoadedData();
          }
        }
      }, 100);
    },
    'startStreaming': function(obj) {
      var self = this,
          errorCallback = utils.isFunction(obj.error) ? obj.error : utils.noop,
          streamedCallback = utils.isFunction(obj.streamed) ? obj.streamed : utils.noop,
          completedCallback = utils.isFunction(obj.completed) ? obj.completed : utils.noop,
          existingVideo = obj.existingVideo,
          webcamVideoElement = obj.webcamVideoElement,
          videoElement = utils.isElement(existingVideo) ? existingVideo : webcamVideoElement ? webcamVideoElement : document.createElement('video'),
          lastCameraStream = obj.lastCameraStream,
          cameraStream;
      videoElement.crossOrigin = 'Anonymous';
      videoElement.autoplay = true;
      videoElement.loop = true;
      videoElement.muted = true;
      videoElement.addEventListener('loadeddata', function(event) {
        self.loadedData = true;
      });
      if (existingVideo) {
        self.stream({
          'videoElement': videoElement,
          'existingVideo': existingVideo,
          'completedCallback': completedCallback
        });
      } else if (lastCameraStream) {
        self.stream({
          'videoElement': videoElement,
          'cameraStream': lastCameraStream,
          'streamedCallback': streamedCallback,
          'completedCallback': completedCallback
        });
      } else {
        utils.getUserMedia({'video': true}, function(stream) {
          self.stream({
            'videoElement': videoElement,
            'cameraStream': stream,
            'streamedCallback': streamedCallback,
            'completedCallback': completedCallback
          });
        }, errorCallback);
      }
    },
    startVideoStreaming: function(callback, options) {
      options = options || {};
      var self = this,
          noGetUserMediaSupportTimeout,
          timeoutLength = options.timeout !== undefined ? options.timeout : 0,
          originalCallback = options.callback,
          webcamVideoElement = options.webcamVideoElement;
      if (timeoutLength > 0) {
        noGetUserMediaSupportTimeout = setTimeout(function() {
          self.onStreamingTimeout(originalCallback);
        }, 10000);
      }
      this.startStreaming({
        'error': function() {
          originalCallback({
            'error': true,
            'errorCode': 'getUserMedia',
            'errorMsg': 'There was an issue with the getUserMedia API - the user probably denied permission',
            'image': null,
            'cameraStream': {}
          });
        },
        'streamed': function() {
          clearTimeout(noGetUserMediaSupportTimeout);
        },
        'completed': function(obj) {
          var cameraStream = obj.cameraStream,
              videoElement = obj.videoElement,
              videoWidth = obj.videoWidth,
              videoHeight = obj.videoHeight;
          callback({
            'cameraStream': cameraStream,
            'videoElement': videoElement,
            'videoWidth': videoWidth,
            'videoHeight': videoHeight
          });
        },
        'lastCameraStream': options.lastCameraStream,
        'webcamVideoElement': webcamVideoElement
      });
    },
    'stopVideoStreaming': function(obj) {
      obj = utils.isObject(obj) ? obj : {};
      var cameraStream = obj.cameraStream,
          videoElement = obj.videoElement,
          keepCameraOn = obj.keepCameraOn,
          webcamVideoElement = obj.webcamVideoElement;
      if (!keepCameraOn && cameraStream && utils.isFunction(cameraStream.stop)) {
        cameraStream.stop();
      }
      if (utils.isElement(videoElement) && !webcamVideoElement) {
        videoElement.pause();
        if (utils.isFunction(utils.URL.revokeObjectURL) && !utils.webWorkerError) {
          if (videoElement.src) {
            utils.URL.revokeObjectURL(videoElement.src);
          }
        }
        utils.removeElement(videoElement);
      }
    }
  };
  stopVideoStreaming = function(obj) {
    obj = utils.isObject(obj) ? obj : {};
    var options = utils.isObject(obj.options) ? obj.options : {},
        cameraStream = obj.cameraStream,
        videoElement = obj.videoElement,
        webcamVideoElement = obj.webcamVideoElement,
        keepCameraOn = obj.keepCameraOn;
    videoStream.stopVideoStreaming({
      'cameraStream': cameraStream,
      'videoElement': videoElement,
      'keepCameraOn': keepCameraOn,
      'webcamVideoElement': webcamVideoElement
    });
  };
  createAndGetGIF = function(obj, callback) {
    var options = obj.options || {},
        images = options.images,
        video = options.video,
        numFrames = +options.numFrames,
        cameraStream = obj.cameraStream,
        videoElement = obj.videoElement,
        videoWidth = obj.videoWidth,
        videoHeight = obj.videoHeight,
        gifWidth = +options.gifWidth,
        gifHeight = +options.gifHeight,
        cropDimensions = screenShot.getCropDimensions({
          'videoWidth': videoWidth,
          'videoHeight': videoHeight,
          'gifHeight': gifHeight,
          'gifWidth': gifWidth
        }),
        completeCallback = callback;
    options.crop = cropDimensions;
    options.videoElement = videoElement;
    options.videoWidth = videoWidth;
    options.videoHeight = videoHeight;
    options.cameraStream = cameraStream;
    if (!utils.isElement(videoElement)) {
      return;
    }
    videoElement.width = gifWidth + cropDimensions.width;
    videoElement.height = gifHeight + cropDimensions.height;
    if (!options.webcamVideoElement) {
      utils.setCSSAttr(videoElement, {
        'position': 'fixed',
        'opacity': '0'
      });
      document.body.appendChild(videoElement);
    }
    videoElement.play();
    screenShot.getGIF(options, function(obj) {
      if ((!images || !images.length) && (!video || !video.length)) {
        stopVideoStreaming(obj);
      }
      completeCallback(obj);
    });
  };
  existingVideo = function(obj) {
    var existingVideo = obj.existingVideo,
        callback = obj.callback,
        options = obj.options,
        skipObj = {
          'getUserMedia': true,
          'window.URL': true
        },
        errorObj = error.validate(skipObj),
        loadedImages = 0,
        videoType,
        videoSrc,
        tempImage,
        ag;
    if (errorObj.error) {
      return callback(errorObj);
    }
    if (utils.isElement(existingVideo) && existingVideo.src) {
      videoSrc = existingVideo.src;
      videoType = utils.getExtension(videoSrc);
      if (!utils.isSupported.videoCodecs[videoType]) {
        return callback(error.messages.videoCodecs);
      }
    } else if (utils.isArray(existingVideo)) {
      utils.each(existingVideo, function(iterator, videoSrc) {
        videoType = videoSrc.substr(videoSrc.lastIndexOf('.') + 1, videoSrc.length);
        if (utils.isSupported.videoCodecs[videoType]) {
          existingVideo = videoSrc;
          return false;
        }
      });
    }
    videoStream.startStreaming({
      'completed': function(obj) {
        obj.options = options || {};
        createAndGetGIF(obj, callback);
      },
      'existingVideo': existingVideo
    });
  };
  existingWebcam = function(obj) {
    var lastCameraStream = obj.lastCameraStream,
        callback = obj.callback,
        webcamVideoElement = obj.webcamVideoElement,
        options = obj.options;
    if (!isWebCamGIFSupported()) {
      return callback(error.validate());
    }
    if (options.savedRenderingContexts.length) {
      screenShot.getWebcamGIF(options, function(obj) {
        callback(obj);
      });
      return;
    }
    videoStream.startVideoStreaming(function(obj) {
      obj.options = options || {};
      createAndGetGIF(obj, callback);
    }, {
      'lastCameraStream': lastCameraStream,
      'callback': callback,
      'webcamVideoElement': webcamVideoElement
    });
  };
  createGIF = function(userOptions, callback) {
    callback = utils.isFunction(userOptions) ? userOptions : callback;
    userOptions = utils.isObject(userOptions) ? userOptions : {};
    if (!utils.isFunction(callback)) {
      return;
    }
    var options = utils.mergeOptions(defaultOptions, userOptions) || {},
        lastCameraStream = userOptions.cameraStream,
        images = options.images,
        imagesLength = images ? images.length : 0,
        video = options.video,
        webcamVideoElement = options.webcamVideoElement;
    if (imagesLength) {
      existingImages({
        'images': images,
        'imagesLength': imagesLength,
        'callback': callback,
        'options': options
      });
    } else if (video) {
      existingVideo({
        'existingVideo': video,
        'callback': callback,
        'options': options
      });
    } else {
      existingWebcam({
        'lastCameraStream': lastCameraStream,
        'callback': callback,
        'webcamVideoElement': webcamVideoElement,
        'options': options
      });
    }
  };
  takeSnapShot = function(userOptions, callback) {
    callback = utils.isFunction(userOptions) ? userOptions : callback;
    userOptions = utils.isObject(userOptions) ? userOptions : {};
    if (!utils.isFunction(callback)) {
      return;
    }
    var mergedOptions = utils.mergeOptions(defaultOptions, userOptions),
        options = utils.mergeOptions(mergedOptions, {
          'interval': 0.1,
          'numFrames': 1
        });
    createGIF(options, callback);
  };
  API = function(utils, error, defaultOptions, isSupported, isWebCamGIFSupported, isExistingImagesGIFSupported, isExistingVideoGIFSupported, createGIF, takeSnapShot, stopVideoStreaming) {
    var gifshot = {
      'utils': utils,
      'error': error,
      'defaultOptions': defaultOptions,
      'createGIF': createGIF,
      'takeSnapShot': takeSnapShot,
      'stopVideoStreaming': stopVideoStreaming,
      'isSupported': isSupported,
      'isWebCamGIFSupported': isWebCamGIFSupported,
      'isExistingVideoGIFSupported': isExistingVideoGIFSupported,
      'isExistingImagesGIFSupported': isExistingImagesGIFSupported,
      'VERSION': '0.1.1'
    };
    return gifshot;
  }(utils, error, defaultOptions, isSupported, isWebCamGIFSupported, isExistingImagesGIFSupported, isExistingVideoGIFSupported, createGIF, takeSnapShot, stopVideoStreaming);
  (function(API) {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return API;
      });
    } else if (typeof exports !== 'undefined') {
      module.exports = API;
    } else {
      window.gifshot = API;
    }
  }(API));
}(typeof window !== "undefined" ? window : {}, typeof document !== "undefined" ? document : {createElement: function() {}}, typeof window !== "undefined" ? window.navigator : {}));


},{}],6:[function(require,module,exports){
"use strict";
module.exports.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;
module.exports.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
module.exports.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate;


},{}],7:[function(require,module,exports){
"use strict";
var util = require('./util');
var EventEmitter = require('eventemitter3');
var Negotiator = require('./negotiator');
var Reliable = require('reliable');
function DataConnection(peer, provider, options) {
  if (!(this instanceof DataConnection))
    return new DataConnection(peer, provider, options);
  EventEmitter.call(this);
  this.options = util.extend({
    serialization: 'binary',
    reliable: false
  }, options);
  this.open = false;
  this.type = 'data';
  this.peer = peer;
  this.provider = provider;
  this.id = this.options.connectionId || DataConnection._idPrefix + util.randomToken();
  this.label = this.options.label || this.id;
  this.metadata = this.options.metadata;
  this.serialization = this.options.serialization;
  this.reliable = this.options.reliable;
  this._buffer = [];
  this._buffering = false;
  this.bufferSize = 0;
  this._chunkedData = {};
  if (this.options._payload) {
    this._peerBrowser = this.options._payload.browser;
  }
  Negotiator.startConnection(this, this.options._payload || {originator: true});
}
util.inherits(DataConnection, EventEmitter);
DataConnection._idPrefix = 'dc_';
DataConnection.prototype.initialize = function(dc) {
  this._dc = this.dataChannel = dc;
  this._configureDataChannel();
};
DataConnection.prototype._configureDataChannel = function() {
  var self = this;
  if (util.supports.sctp) {
    this._dc.binaryType = 'arraybuffer';
  }
  this._dc.onopen = function() {
    util.log('Data channel connection success');
    self.open = true;
    self.emit('open');
  };
  if (!util.supports.sctp && this.reliable) {
    this._reliable = new Reliable(this._dc, util.debug);
  }
  if (this._reliable) {
    this._reliable.onmessage = function(msg) {
      self.emit('data', msg);
    };
  } else {
    this._dc.onmessage = function(e) {
      self._handleDataMessage(e);
    };
  }
  this._dc.onclose = function(e) {
    util.log('DataChannel closed for:', self.peer);
    self.close();
  };
};
DataConnection.prototype._handleDataMessage = function(e) {
  var self = this;
  var data = e.data;
  var datatype = data.constructor;
  if (this.serialization === 'binary' || this.serialization === 'binary-utf8') {
    if (datatype === Blob) {
      util.blobToArrayBuffer(data, function(ab) {
        data = util.unpack(ab);
        self.emit('data', data);
      });
      return;
    } else if (datatype === ArrayBuffer) {
      data = util.unpack(data);
    } else if (datatype === String) {
      var ab = util.binaryStringToArrayBuffer(data);
      data = util.unpack(ab);
    }
  } else if (this.serialization === 'json') {
    data = JSON.parse(data);
  }
  if (data.__peerData) {
    var id = data.__peerData;
    var chunkInfo = this._chunkedData[id] || {
      data: [],
      count: 0,
      total: data.total
    };
    chunkInfo.data[data.n] = data.data;
    chunkInfo.count += 1;
    if (chunkInfo.total === chunkInfo.count) {
      delete this._chunkedData[id];
      data = new Blob(chunkInfo.data);
      this._handleDataMessage({data: data});
    }
    this._chunkedData[id] = chunkInfo;
    return;
  }
  this.emit('data', data);
};
DataConnection.prototype.close = function() {
  if (!this.open) {
    return;
  }
  this.open = false;
  Negotiator.cleanup(this);
  this.emit('close');
};
DataConnection.prototype.send = function(data, chunked) {
  if (!this.open) {
    this.emit('error', new Error('Connection is not open. You should listen for the `open` event before sending messages.'));
    return;
  }
  if (this._reliable) {
    this._reliable.send(data);
    return;
  }
  var self = this;
  if (this.serialization === 'json') {
    this._bufferedSend(JSON.stringify(data));
  } else if (this.serialization === 'binary' || this.serialization === 'binary-utf8') {
    var blob = util.pack(data);
    var needsChunking = util.chunkedBrowsers[this._peerBrowser] || util.chunkedBrowsers[util.browser];
    if (needsChunking && !chunked && blob.size > util.chunkedMTU) {
      this._sendChunks(blob);
      return;
    }
    if (!util.supports.sctp) {
      util.blobToBinaryString(blob, function(str) {
        self._bufferedSend(str);
      });
    } else if (!util.supports.binaryBlob) {
      util.blobToArrayBuffer(blob, function(ab) {
        self._bufferedSend(ab);
      });
    } else {
      this._bufferedSend(blob);
    }
  } else {
    this._bufferedSend(data);
  }
};
DataConnection.prototype._bufferedSend = function(msg) {
  if (this._buffering || !this._trySend(msg)) {
    this._buffer.push(msg);
    this.bufferSize = this._buffer.length;
  }
};
DataConnection.prototype._trySend = function(msg) {
  try {
    this._dc.send(msg);
  } catch (e) {
    this._buffering = true;
    var self = this;
    setTimeout(function() {
      self._buffering = false;
      self._tryBuffer();
    }, 100);
    return false;
  }
  return true;
};
DataConnection.prototype._tryBuffer = function() {
  if (this._buffer.length === 0) {
    return;
  }
  var msg = this._buffer[0];
  if (this._trySend(msg)) {
    this._buffer.shift();
    this.bufferSize = this._buffer.length;
    this._tryBuffer();
  }
};
DataConnection.prototype._sendChunks = function(blob) {
  var blobs = util.chunk(blob);
  for (var i = 0,
      ii = blobs.length; i < ii; i += 1) {
    var blob = blobs[i];
    this.send(blob, true);
  }
};
DataConnection.prototype.handleMessage = function(message) {
  var payload = message.payload;
  switch (message.type) {
    case 'ANSWER':
      this._peerBrowser = payload.browser;
      Negotiator.handleSDP(message.type, this, payload.sdp);
      break;
    case 'CANDIDATE':
      Negotiator.handleCandidate(this, payload.candidate);
      break;
    default:
      util.warn('Unrecognized message type:', message.type, 'from peer:', this.peer);
      break;
  }
};
module.exports = DataConnection;


},{"./negotiator":9,"./util":12,"eventemitter3":13,"reliable":16}],8:[function(require,module,exports){
"use strict";
var util = require('./util');
var EventEmitter = require('eventemitter3');
var Negotiator = require('./negotiator');
function MediaConnection(peer, provider, options) {
  if (!(this instanceof MediaConnection))
    return new MediaConnection(peer, provider, options);
  EventEmitter.call(this);
  this.options = util.extend({}, options);
  this.open = false;
  this.type = 'media';
  this.peer = peer;
  this.provider = provider;
  this.metadata = this.options.metadata;
  this.localStream = this.options._stream;
  this.id = this.options.connectionId || MediaConnection._idPrefix + util.randomToken();
  if (this.localStream) {
    Negotiator.startConnection(this, {
      _stream: this.localStream,
      originator: true
    });
  }
}
;
util.inherits(MediaConnection, EventEmitter);
MediaConnection._idPrefix = 'mc_';
MediaConnection.prototype.addStream = function(remoteStream) {
  util.log('Receiving stream', remoteStream);
  this.remoteStream = remoteStream;
  this.emit('stream', remoteStream);
};
MediaConnection.prototype.handleMessage = function(message) {
  var payload = message.payload;
  switch (message.type) {
    case 'ANSWER':
      Negotiator.handleSDP(message.type, this, payload.sdp);
      this.open = true;
      break;
    case 'CANDIDATE':
      Negotiator.handleCandidate(this, payload.candidate);
      break;
    default:
      util.warn('Unrecognized message type:', message.type, 'from peer:', this.peer);
      break;
  }
};
MediaConnection.prototype.answer = function(stream) {
  if (this.localStream) {
    util.warn('Local stream already exists on this MediaConnection. Are you answering a call twice?');
    return;
  }
  this.options._payload._stream = stream;
  this.localStream = stream;
  Negotiator.startConnection(this, this.options._payload);
  var messages = this.provider._getMessages(this.id);
  for (var i = 0,
      ii = messages.length; i < ii; i += 1) {
    this.handleMessage(messages[i]);
  }
  this.open = true;
};
MediaConnection.prototype.close = function() {
  if (!this.open) {
    return;
  }
  this.open = false;
  Negotiator.cleanup(this);
  this.emit('close');
};
module.exports = MediaConnection;


},{"./negotiator":9,"./util":12,"eventemitter3":13}],9:[function(require,module,exports){
"use strict";
var util = require('./util');
var RTCPeerConnection = require('./adapter').RTCPeerConnection;
var RTCSessionDescription = require('./adapter').RTCSessionDescription;
var RTCIceCandidate = require('./adapter').RTCIceCandidate;
var Negotiator = {
  pcs: {
    data: {},
    media: {}
  },
  queue: []
};
Negotiator._idPrefix = 'pc_';
Negotiator.startConnection = function(connection, options) {
  var pc = Negotiator._getPeerConnection(connection, options);
  if (connection.type === 'media' && options._stream) {
    pc.addStream(options._stream);
  }
  connection.pc = connection.peerConnection = pc;
  if (options.originator) {
    if (connection.type === 'data') {
      var config = {};
      if (!util.supports.sctp) {
        config = {reliable: options.reliable};
      }
      var dc = pc.createDataChannel(connection.label, config);
      connection.initialize(dc);
    }
    if (!util.supports.onnegotiationneeded) {
      Negotiator._makeOffer(connection);
    }
  } else {
    Negotiator.handleSDP('OFFER', connection, options.sdp);
  }
};
Negotiator._getPeerConnection = function(connection, options) {
  if (!Negotiator.pcs[connection.type]) {
    util.error(connection.type + ' is not a valid connection type. Maybe you overrode the `type` property somewhere.');
  }
  if (!Negotiator.pcs[connection.type][connection.peer]) {
    Negotiator.pcs[connection.type][connection.peer] = {};
  }
  var peerConnections = Negotiator.pcs[connection.type][connection.peer];
  var pc;
  if (options.pc) {
    pc = Negotiator.pcs[connection.type][connection.peer][options.pc];
  }
  if (!pc || pc.signalingState !== 'stable') {
    pc = Negotiator._startPeerConnection(connection);
  }
  return pc;
};
Negotiator._startPeerConnection = function(connection) {
  util.log('Creating RTCPeerConnection.');
  var id = Negotiator._idPrefix + util.randomToken();
  var optional = {};
  if (connection.type === 'data' && !util.supports.sctp) {
    optional = {optional: [{RtpDataChannels: true}]};
  } else if (connection.type === 'media') {
    optional = {optional: [{DtlsSrtpKeyAgreement: true}]};
  }
  var pc = new RTCPeerConnection(connection.provider.options.config, optional);
  Negotiator.pcs[connection.type][connection.peer][id] = pc;
  Negotiator._setupListeners(connection, pc, id);
  return pc;
};
Negotiator._setupListeners = function(connection, pc, pc_id) {
  var peerId = connection.peer;
  var connectionId = connection.id;
  var provider = connection.provider;
  util.log('Listening for ICE candidates.');
  pc.onicecandidate = function(evt) {
    if (evt.candidate) {
      util.log('Received ICE candidates for:', connection.peer);
      provider.socket.send({
        type: 'CANDIDATE',
        payload: {
          candidate: evt.candidate,
          type: connection.type,
          connectionId: connection.id
        },
        dst: peerId
      });
    }
  };
  pc.oniceconnectionstatechange = function() {
    switch (pc.iceConnectionState) {
      case 'disconnected':
      case 'failed':
        util.log('iceConnectionState is disconnected, closing connections to ' + peerId);
        connection.close();
        break;
      case 'completed':
        pc.onicecandidate = util.noop;
        break;
    }
  };
  pc.onicechange = pc.oniceconnectionstatechange;
  util.log('Listening for `negotiationneeded`');
  pc.onnegotiationneeded = function() {
    util.log('`negotiationneeded` triggered');
    if (pc.signalingState == 'stable') {
      Negotiator._makeOffer(connection);
    } else {
      util.log('onnegotiationneeded triggered when not stable. Is another connection being established?');
    }
  };
  util.log('Listening for data channel');
  pc.ondatachannel = function(evt) {
    util.log('Received data channel');
    var dc = evt.channel;
    var connection = provider.getConnection(peerId, connectionId);
    connection.initialize(dc);
  };
  util.log('Listening for remote stream');
  pc.onaddstream = function(evt) {
    util.log('Received remote stream');
    var stream = evt.stream;
    var connection = provider.getConnection(peerId, connectionId);
    if (connection.type === 'media') {
      connection.addStream(stream);
    }
  };
};
Negotiator.cleanup = function(connection) {
  util.log('Cleaning up PeerConnection to ' + connection.peer);
  var pc = connection.pc;
  if (!!pc && (pc.readyState !== 'closed' || pc.signalingState !== 'closed')) {
    pc.close();
    connection.pc = null;
  }
};
Negotiator._makeOffer = function(connection) {
  var pc = connection.pc;
  pc.createOffer(function(offer) {
    util.log('Created offer.');
    if (!util.supports.sctp && connection.type === 'data' && connection.reliable) {
      offer.sdp = Reliable.higherBandwidthSDP(offer.sdp);
    }
    pc.setLocalDescription(offer, function() {
      util.log('Set localDescription: offer', 'for:', connection.peer);
      connection.provider.socket.send({
        type: 'OFFER',
        payload: {
          sdp: offer,
          type: connection.type,
          label: connection.label,
          connectionId: connection.id,
          reliable: connection.reliable,
          serialization: connection.serialization,
          metadata: connection.metadata,
          browser: util.browser
        },
        dst: connection.peer
      });
    }, function(err) {
      connection.provider.emitError('webrtc', err);
      util.log('Failed to setLocalDescription, ', err);
    });
  }, function(err) {
    connection.provider.emitError('webrtc', err);
    util.log('Failed to createOffer, ', err);
  }, connection.options.constraints);
};
Negotiator._makeAnswer = function(connection) {
  var pc = connection.pc;
  pc.createAnswer(function(answer) {
    util.log('Created answer.');
    if (!util.supports.sctp && connection.type === 'data' && connection.reliable) {
      answer.sdp = Reliable.higherBandwidthSDP(answer.sdp);
    }
    pc.setLocalDescription(answer, function() {
      util.log('Set localDescription: answer', 'for:', connection.peer);
      connection.provider.socket.send({
        type: 'ANSWER',
        payload: {
          sdp: answer,
          type: connection.type,
          connectionId: connection.id,
          browser: util.browser
        },
        dst: connection.peer
      });
    }, function(err) {
      connection.provider.emitError('webrtc', err);
      util.log('Failed to setLocalDescription, ', err);
    });
  }, function(err) {
    connection.provider.emitError('webrtc', err);
    util.log('Failed to create answer, ', err);
  });
};
Negotiator.handleSDP = function(type, connection, sdp) {
  sdp = new RTCSessionDescription(sdp);
  var pc = connection.pc;
  util.log('Setting remote description', sdp);
  pc.setRemoteDescription(sdp, function() {
    util.log('Set remoteDescription:', type, 'for:', connection.peer);
    if (type === 'OFFER') {
      Negotiator._makeAnswer(connection);
    }
  }, function(err) {
    connection.provider.emitError('webrtc', err);
    util.log('Failed to setRemoteDescription, ', err);
  });
};
Negotiator.handleCandidate = function(connection, ice) {
  var candidate = ice.candidate;
  var sdpMLineIndex = ice.sdpMLineIndex;
  connection.pc.addIceCandidate(new RTCIceCandidate({
    sdpMLineIndex: sdpMLineIndex,
    candidate: candidate
  }));
  util.log('Added ICE candidate for:', connection.peer);
};
module.exports = Negotiator;


},{"./adapter":6,"./util":12}],10:[function(require,module,exports){
"use strict";
var util = require('./util');
var EventEmitter = require('eventemitter3');
var Socket = require('./socket');
var MediaConnection = require('./mediaconnection');
var DataConnection = require('./dataconnection');
function Peer(id, options) {
  if (!(this instanceof Peer))
    return new Peer(id, options);
  EventEmitter.call(this);
  if (id && id.constructor == Object) {
    options = id;
    id = undefined;
  } else if (id) {
    id = id.toString();
  }
  options = util.extend({
    debug: 0,
    host: util.CLOUD_HOST,
    port: util.CLOUD_PORT,
    key: 'peerjs',
    path: '/',
    token: util.randomToken(),
    config: util.defaultConfig
  }, options);
  this.options = options;
  if (options.host === '/') {
    options.host = window.location.hostname;
  }
  if (options.path[0] !== '/') {
    options.path = '/' + options.path;
  }
  if (options.path[options.path.length - 1] !== '/') {
    options.path += '/';
  }
  if (options.secure === undefined && options.host !== util.CLOUD_HOST) {
    options.secure = util.isSecure();
  }
  if (options.logFunction) {
    util.setLogFunction(options.logFunction);
  }
  util.setLogLevel(options.debug);
  if (!util.supports.audioVideo && !util.supports.data) {
    this._delayedAbort('browser-incompatible', 'The current browser does not support WebRTC');
    return;
  }
  if (!util.validateId(id)) {
    this._delayedAbort('invalid-id', 'ID "' + id + '" is invalid');
    return;
  }
  if (!util.validateKey(options.key)) {
    this._delayedAbort('invalid-key', 'API KEY "' + options.key + '" is invalid');
    return;
  }
  if (options.secure && options.host === '0.peerjs.com') {
    this._delayedAbort('ssl-unavailable', 'The cloud server currently does not support HTTPS. Please run your own PeerServer to use HTTPS.');
    return;
  }
  this.destroyed = false;
  this.disconnected = false;
  this.open = false;
  this.connections = {};
  this._lostMessages = {};
  this._initializeServerConnection();
  if (id) {
    this._initialize(id);
  } else {
    this._retrieveId();
  }
}
util.inherits(Peer, EventEmitter);
Peer.prototype._initializeServerConnection = function() {
  var self = this;
  this.socket = new Socket(this.options.secure, this.options.host, this.options.port, this.options.path, this.options.key);
  this.socket.on('message', function(data) {
    self._handleMessage(data);
  });
  this.socket.on('error', function(error) {
    self._abort('socket-error', error);
  });
  this.socket.on('disconnected', function() {
    if (!self.disconnected) {
      self.emitError('network', 'Lost connection to server.');
      self.disconnect();
    }
  });
  this.socket.on('close', function() {
    if (!self.disconnected) {
      self._abort('socket-closed', 'Underlying socket is already closed.');
    }
  });
};
Peer.prototype._retrieveId = function(cb) {
  var self = this;
  var http = new XMLHttpRequest();
  var protocol = this.options.secure ? 'https://' : 'http://';
  var url = protocol + this.options.host + ':' + this.options.port + this.options.path + this.options.key + '/id';
  var queryString = '?ts=' + new Date().getTime() + '' + Math.random();
  url += queryString;
  http.open('get', url, true);
  http.onerror = function(e) {
    util.error('Error retrieving ID', e);
    var pathError = '';
    if (self.options.path === '/' && self.options.host !== util.CLOUD_HOST) {
      pathError = ' If you passed in a `path` to your self-hosted PeerServer, ' + 'you\'ll also need to pass in that same path when creating a new ' + 'Peer.';
    }
    self._abort('server-error', 'Could not get an ID from the server.' + pathError);
  };
  http.onreadystatechange = function() {
    if (http.readyState !== 4) {
      return;
    }
    if (http.status !== 200) {
      http.onerror();
      return;
    }
    self._initialize(http.responseText);
  };
  http.send(null);
};
Peer.prototype._initialize = function(id) {
  this.id = id;
  this.socket.start(this.id, this.options.token);
};
Peer.prototype._handleMessage = function(message) {
  var type = message.type;
  var payload = message.payload;
  var peer = message.src;
  var connection;
  switch (type) {
    case 'OPEN':
      this.emit('open', this.id);
      this.open = true;
      break;
    case 'ERROR':
      this._abort('server-error', payload.msg);
      break;
    case 'ID-TAKEN':
      this._abort('unavailable-id', 'ID `' + this.id + '` is taken');
      break;
    case 'INVALID-KEY':
      this._abort('invalid-key', 'API KEY "' + this.options.key + '" is invalid');
      break;
    case 'LEAVE':
      util.log('Received leave message from', peer);
      this._cleanupPeer(peer);
      break;
    case 'EXPIRE':
      this.emitError('peer-unavailable', 'Could not connect to peer ' + peer);
      break;
    case 'OFFER':
      var connectionId = payload.connectionId;
      connection = this.getConnection(peer, connectionId);
      if (connection) {
        util.warn('Offer received for existing Connection ID:', connectionId);
      } else {
        if (payload.type === 'media') {
          connection = new MediaConnection(peer, this, {
            connectionId: connectionId,
            _payload: payload,
            metadata: payload.metadata
          });
          this._addConnection(peer, connection);
          this.emit('call', connection);
        } else if (payload.type === 'data') {
          connection = new DataConnection(peer, this, {
            connectionId: connectionId,
            _payload: payload,
            metadata: payload.metadata,
            label: payload.label,
            serialization: payload.serialization,
            reliable: payload.reliable
          });
          this._addConnection(peer, connection);
          this.emit('connection', connection);
        } else {
          util.warn('Received malformed connection type:', payload.type);
          return;
        }
        var messages = this._getMessages(connectionId);
        for (var i = 0,
            ii = messages.length; i < ii; i += 1) {
          connection.handleMessage(messages[i]);
        }
      }
      break;
    default:
      if (!payload) {
        util.warn('You received a malformed message from ' + peer + ' of type ' + type);
        return;
      }
      var id = payload.connectionId;
      connection = this.getConnection(peer, id);
      if (connection && connection.pc) {
        connection.handleMessage(message);
      } else if (id) {
        this._storeMessage(id, message);
      } else {
        util.warn('You received an unrecognized message:', message);
      }
      break;
  }
};
Peer.prototype._storeMessage = function(connectionId, message) {
  if (!this._lostMessages[connectionId]) {
    this._lostMessages[connectionId] = [];
  }
  this._lostMessages[connectionId].push(message);
};
Peer.prototype._getMessages = function(connectionId) {
  var messages = this._lostMessages[connectionId];
  if (messages) {
    delete this._lostMessages[connectionId];
    return messages;
  } else {
    return [];
  }
};
Peer.prototype.connect = function(peer, options) {
  if (this.disconnected) {
    util.warn('You cannot connect to a new Peer because you called ' + '.disconnect() on this Peer and ended your connection with the ' + 'server. You can create a new Peer to reconnect, or call reconnect ' + 'on this peer if you believe its ID to still be available.');
    this.emitError('disconnected', 'Cannot connect to new Peer after disconnecting from server.');
    return;
  }
  var connection = new DataConnection(peer, this, options);
  this._addConnection(peer, connection);
  return connection;
};
Peer.prototype.call = function(peer, stream, options) {
  if (this.disconnected) {
    util.warn('You cannot connect to a new Peer because you called ' + '.disconnect() on this Peer and ended your connection with the ' + 'server. You can create a new Peer to reconnect.');
    this.emitError('disconnected', 'Cannot connect to new Peer after disconnecting from server.');
    return;
  }
  if (!stream) {
    util.error('To call a peer, you must provide a stream from your browser\'s `getUserMedia`.');
    return;
  }
  options = options || {};
  options._stream = stream;
  var call = new MediaConnection(peer, this, options);
  this._addConnection(peer, call);
  return call;
};
Peer.prototype._addConnection = function(peer, connection) {
  if (!this.connections[peer]) {
    this.connections[peer] = [];
  }
  this.connections[peer].push(connection);
};
Peer.prototype.getConnection = function(peer, id) {
  var connections = this.connections[peer];
  if (!connections) {
    return null;
  }
  for (var i = 0,
      ii = connections.length; i < ii; i++) {
    if (connections[i].id === id) {
      return connections[i];
    }
  }
  return null;
};
Peer.prototype._delayedAbort = function(type, message) {
  var self = this;
  util.setZeroTimeout(function() {
    self._abort(type, message);
  });
};
Peer.prototype._abort = function(type, message) {
  util.error('Aborting!');
  if (!this._lastServerId) {
    this.destroy();
  } else {
    this.disconnect();
  }
  this.emitError(type, message);
};
Peer.prototype.emitError = function(type, err) {
  util.error('Error:', err);
  if (typeof err === 'string') {
    err = new Error(err);
  }
  err.type = type;
  this.emit('error', err);
};
Peer.prototype.destroy = function() {
  if (!this.destroyed) {
    this._cleanup();
    this.disconnect();
    this.destroyed = true;
  }
};
Peer.prototype._cleanup = function() {
  if (this.connections) {
    var peers = Object.keys(this.connections);
    for (var i = 0,
        ii = peers.length; i < ii; i++) {
      this._cleanupPeer(peers[i]);
    }
  }
  this.emit('close');
};
Peer.prototype._cleanupPeer = function(peer) {
  var connections = this.connections[peer];
  for (var j = 0,
      jj = connections.length; j < jj; j += 1) {
    connections[j].close();
  }
};
Peer.prototype.disconnect = function() {
  var self = this;
  util.setZeroTimeout(function() {
    if (!self.disconnected) {
      self.disconnected = true;
      self.open = false;
      if (self.socket) {
        self.socket.close();
      }
      self.emit('disconnected', self.id);
      self._lastServerId = self.id;
      self.id = null;
    }
  });
};
Peer.prototype.reconnect = function() {
  if (this.disconnected && !this.destroyed) {
    util.log('Attempting reconnection to server with ID ' + this._lastServerId);
    this.disconnected = false;
    this._initializeServerConnection();
    this._initialize(this._lastServerId);
  } else if (this.destroyed) {
    throw new Error('This peer cannot reconnect to the server. It has already been destroyed.');
  } else if (!this.disconnected && !this.open) {
    util.error('In a hurry? We\'re still trying to make the initial connection!');
  } else {
    throw new Error('Peer ' + this.id + ' cannot reconnect because it is not disconnected from the server!');
  }
};
Peer.prototype.listAllPeers = function(cb) {
  cb = cb || function() {};
  var self = this;
  var http = new XMLHttpRequest();
  var protocol = this.options.secure ? 'https://' : 'http://';
  var url = protocol + this.options.host + ':' + this.options.port + this.options.path + this.options.key + '/peers';
  var queryString = '?ts=' + new Date().getTime() + '' + Math.random();
  url += queryString;
  http.open('get', url, true);
  http.onerror = function(e) {
    self._abort('server-error', 'Could not get peers from the server.');
    cb([]);
  };
  http.onreadystatechange = function() {
    if (http.readyState !== 4) {
      return;
    }
    if (http.status === 401) {
      var helpfulError = '';
      if (self.options.host !== util.CLOUD_HOST) {
        helpfulError = 'It looks like you\'re using the cloud server. You can email ' + 'team@peerjs.com to enable peer listing for your API key.';
      } else {
        helpfulError = 'You need to enable `allow_discovery` on your self-hosted ' + 'PeerServer to use this feature.';
      }
      cb([]);
      throw new Error('It doesn\'t look like you have permission to list peers IDs. ' + helpfulError);
    } else if (http.status !== 200) {
      cb([]);
    } else {
      cb(JSON.parse(http.responseText));
    }
  };
  http.send(null);
};
module.exports = Peer;


},{"./dataconnection":7,"./mediaconnection":8,"./socket":11,"./util":12,"eventemitter3":13}],11:[function(require,module,exports){
"use strict";
var util = require('./util');
var EventEmitter = require('eventemitter3');
function Socket(secure, host, port, path, key) {
  if (!(this instanceof Socket))
    return new Socket(secure, host, port, path, key);
  EventEmitter.call(this);
  this.disconnected = false;
  this._queue = [];
  var httpProtocol = secure ? 'https://' : 'http://';
  var wsProtocol = secure ? 'wss://' : 'ws://';
  this._httpUrl = httpProtocol + host + ':' + port + path + key;
  this._wsUrl = wsProtocol + host + ':' + port + path + 'peerjs?key=' + key;
}
util.inherits(Socket, EventEmitter);
Socket.prototype.start = function(id, token) {
  this.id = id;
  this._httpUrl += '/' + id + '/' + token;
  this._wsUrl += '&id=' + id + '&token=' + token;
  this._startXhrStream();
  this._startWebSocket();
};
Socket.prototype._startWebSocket = function(id) {
  var self = this;
  if (this._socket) {
    return;
  }
  this._socket = new WebSocket(this._wsUrl);
  this._socket.onmessage = function(event) {
    try {
      var data = JSON.parse(event.data);
    } catch (e) {
      util.log('Invalid server message', event.data);
      return;
    }
    self.emit('message', data);
  };
  this._socket.onclose = function(event) {
    util.log('Socket closed.');
    self.disconnected = true;
    self.emit('disconnected');
  };
  this._socket.onopen = function() {
    if (self._timeout) {
      clearTimeout(self._timeout);
      setTimeout(function() {
        self._http.abort();
        self._http = null;
      }, 5000);
    }
    self._sendQueuedMessages();
    util.log('Socket open');
  };
};
Socket.prototype._startXhrStream = function(n) {
  try {
    var self = this;
    this._http = new XMLHttpRequest();
    this._http._index = 1;
    this._http._streamIndex = n || 0;
    this._http.open('post', this._httpUrl + '/id?i=' + this._http._streamIndex, true);
    this._http.onerror = function() {
      clearTimeout(self._timeout);
      self.emit('disconnected');
    };
    this._http.onreadystatechange = function() {
      if (this.readyState == 2 && this.old) {
        this.old.abort();
        delete this.old;
      } else if (this.readyState > 2 && this.status === 200 && this.responseText) {
        self._handleStream(this);
      }
    };
    this._http.send(null);
    this._setHTTPTimeout();
  } catch (e) {
    util.log('XMLHttpRequest not available; defaulting to WebSockets');
  }
};
Socket.prototype._handleStream = function(http) {
  var messages = http.responseText.split('\n');
  if (http._buffer) {
    while (http._buffer.length > 0) {
      var index = http._buffer.shift();
      var bufferedMessage = messages[index];
      try {
        bufferedMessage = JSON.parse(bufferedMessage);
      } catch (e) {
        http._buffer.shift(index);
        break;
      }
      this.emit('message', bufferedMessage);
    }
  }
  var message = messages[http._index];
  if (message) {
    http._index += 1;
    if (http._index === messages.length) {
      if (!http._buffer) {
        http._buffer = [];
      }
      http._buffer.push(http._index - 1);
    } else {
      try {
        message = JSON.parse(message);
      } catch (e) {
        util.log('Invalid server message', message);
        return;
      }
      this.emit('message', message);
    }
  }
};
Socket.prototype._setHTTPTimeout = function() {
  var self = this;
  this._timeout = setTimeout(function() {
    var old = self._http;
    if (!self._wsOpen()) {
      self._startXhrStream(old._streamIndex + 1);
      self._http.old = old;
    } else {
      old.abort();
    }
  }, 25000);
};
Socket.prototype._wsOpen = function() {
  return this._socket && this._socket.readyState == 1;
};
Socket.prototype._sendQueuedMessages = function() {
  for (var i = 0,
      ii = this._queue.length; i < ii; i += 1) {
    this.send(this._queue[i]);
  }
};
Socket.prototype.send = function(data) {
  if (this.disconnected) {
    return;
  }
  if (!this.id) {
    this._queue.push(data);
    return;
  }
  if (!data.type) {
    this.emit('error', 'Invalid message');
    return;
  }
  var message = JSON.stringify(data);
  if (this._wsOpen()) {
    this._socket.send(message);
  } else {
    var http = new XMLHttpRequest();
    var url = this._httpUrl + '/' + data.type.toLowerCase();
    http.open('post', url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(message);
  }
};
Socket.prototype.close = function() {
  if (!this.disconnected && this._wsOpen()) {
    this._socket.close();
    this.disconnected = true;
  }
};
module.exports = Socket;


},{"./util":12,"eventemitter3":13}],12:[function(require,module,exports){
"use strict";
var defaultConfig = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};
var dataCount = 1;
var BinaryPack = require('js-binarypack');
var RTCPeerConnection = require('./adapter').RTCPeerConnection;
var util = {
  noop: function() {},
  CLOUD_HOST: '0.peerjs.com',
  CLOUD_PORT: 9000,
  chunkedBrowsers: {'Chrome': 1},
  chunkedMTU: 16300,
  logLevel: 0,
  setLogLevel: function(level) {
    var debugLevel = parseInt(level, 10);
    if (!isNaN(parseInt(level, 10))) {
      util.logLevel = debugLevel;
    } else {
      util.logLevel = level ? 3 : 0;
    }
    util.log = util.warn = util.error = util.noop;
    if (util.logLevel > 0) {
      util.error = util._printWith('ERROR');
    }
    if (util.logLevel > 1) {
      util.warn = util._printWith('WARNING');
    }
    if (util.logLevel > 2) {
      util.log = util._print;
    }
  },
  setLogFunction: function(fn) {
    if (fn.constructor !== Function) {
      util.warn('The log function you passed in is not a function. Defaulting to regular logs.');
    } else {
      util._print = fn;
    }
  },
  _printWith: function(prefix) {
    return function() {
      var copy = Array.prototype.slice.call(arguments);
      copy.unshift(prefix);
      util._print.apply(util, copy);
    };
  },
  _print: function() {
    var err = false;
    var copy = Array.prototype.slice.call(arguments);
    copy.unshift('PeerJS: ');
    for (var i = 0,
        l = copy.length; i < l; i++) {
      if (copy[i] instanceof Error) {
        copy[i] = '(' + copy[i].name + ') ' + copy[i].message;
        err = true;
      }
    }
    err ? console.error.apply(console, copy) : console.log.apply(console, copy);
  },
  defaultConfig: defaultConfig,
  browser: (function() {
    if (window.mozRTCPeerConnection) {
      return 'Firefox';
    } else if (window.webkitRTCPeerConnection) {
      return 'Chrome';
    } else if (window.RTCPeerConnection) {
      return 'Supported';
    } else {
      return 'Unsupported';
    }
  })(),
  supports: (function() {
    if (typeof RTCPeerConnection === 'undefined') {
      return {};
    }
    var data = true;
    var audioVideo = true;
    var binaryBlob = false;
    var sctp = false;
    var onnegotiationneeded = !!window.webkitRTCPeerConnection;
    var pc,
        dc;
    try {
      pc = new RTCPeerConnection(defaultConfig, {optional: [{RtpDataChannels: true}]});
    } catch (e) {
      data = false;
      audioVideo = false;
    }
    if (data) {
      try {
        dc = pc.createDataChannel('_PEERJSTEST');
      } catch (e) {
        data = false;
      }
    }
    if (data) {
      try {
        dc.binaryType = 'blob';
        binaryBlob = true;
      } catch (e) {}
      var reliablePC = new RTCPeerConnection(defaultConfig, {});
      try {
        var reliableDC = reliablePC.createDataChannel('_PEERJSRELIABLETEST', {});
        sctp = reliableDC.reliable;
      } catch (e) {}
      reliablePC.close();
    }
    if (audioVideo) {
      audioVideo = !!pc.addStream;
    }
    if (!onnegotiationneeded && data) {
      var negotiationPC = new RTCPeerConnection(defaultConfig, {optional: [{RtpDataChannels: true}]});
      negotiationPC.onnegotiationneeded = function() {
        onnegotiationneeded = true;
        if (util && util.supports) {
          util.supports.onnegotiationneeded = true;
        }
      };
      negotiationPC.createDataChannel('_PEERJSNEGOTIATIONTEST');
      setTimeout(function() {
        negotiationPC.close();
      }, 1000);
    }
    if (pc) {
      pc.close();
    }
    return {
      audioVideo: audioVideo,
      data: data,
      binaryBlob: binaryBlob,
      binary: sctp,
      reliable: sctp,
      sctp: sctp,
      onnegotiationneeded: onnegotiationneeded
    };
  }()),
  validateId: function(id) {
    return !id || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.exec(id);
  },
  validateKey: function(key) {
    return !key || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.exec(key);
  },
  debug: false,
  inherits: function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }});
  },
  extend: function(dest, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
    return dest;
  },
  pack: BinaryPack.pack,
  unpack: BinaryPack.unpack,
  log: function() {
    if (util.debug) {
      var err = false;
      var copy = Array.prototype.slice.call(arguments);
      copy.unshift('PeerJS: ');
      for (var i = 0,
          l = copy.length; i < l; i++) {
        if (copy[i] instanceof Error) {
          copy[i] = '(' + copy[i].name + ') ' + copy[i].message;
          err = true;
        }
      }
      err ? console.error.apply(console, copy) : console.log.apply(console, copy);
    }
  },
  setZeroTimeout: (function(global) {
    var timeouts = [];
    var messageName = 'zero-timeout-message';
    function setZeroTimeoutPostMessage(fn) {
      timeouts.push(fn);
      global.postMessage(messageName, '*');
    }
    function handleMessage(event) {
      if (event.source == global && event.data == messageName) {
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        if (timeouts.length) {
          timeouts.shift()();
        }
      }
    }
    if (global.addEventListener) {
      global.addEventListener('message', handleMessage, true);
    } else if (global.attachEvent) {
      global.attachEvent('onmessage', handleMessage);
    }
    return setZeroTimeoutPostMessage;
  }(window)),
  chunk: function(bl) {
    var chunks = [];
    var size = bl.size;
    var start = index = 0;
    var total = Math.ceil(size / util.chunkedMTU);
    while (start < size) {
      var end = Math.min(size, start + util.chunkedMTU);
      var b = bl.slice(start, end);
      var chunk = {
        __peerData: dataCount,
        n: index,
        data: b,
        total: total
      };
      chunks.push(chunk);
      start = end;
      index += 1;
    }
    dataCount += 1;
    return chunks;
  },
  blobToArrayBuffer: function(blob, cb) {
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsArrayBuffer(blob);
  },
  blobToBinaryString: function(blob, cb) {
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsBinaryString(blob);
  },
  binaryStringToArrayBuffer: function(binary) {
    var byteArray = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      byteArray[i] = binary.charCodeAt(i) & 0xff;
    }
    return byteArray.buffer;
  },
  randomToken: function() {
    return Math.random().toString(36).substr(2);
  },
  isSecure: function() {
    return location.protocol === 'https:';
  }
};
module.exports = util;


},{"./adapter":6,"js-binarypack":14}],13:[function(require,module,exports){
'use strict';

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];

  for (var i = 0, l = this._events[event].length, ee = []; i < l; i++) {
    ee.push(this._events[event][i].fn);
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , length = listeners.length
    , len = arguments.length
    , ee = listeners[0]
    , args
    , i, j;

  if (1 === length) {
    if (ee.once) this.removeListener(event, ee.fn, true);

    switch (len) {
      case 1: return ee.fn.call(ee.context), true;
      case 2: return ee.fn.call(ee.context, a1), true;
      case 3: return ee.fn.call(ee.context, a1, a2), true;
      case 4: return ee.fn.call(ee.context, a1, a2, a3), true;
      case 5: return ee.fn.call(ee.context, a1, a2, a3, a4), true;
      case 6: return ee.fn.call(ee.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    ee.fn.apply(ee.context, args);
  } else {
    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = [];
  this._events[event].push(new EE( fn, context || this ));

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = [];
  this._events[event].push(new EE(fn, context || this, true ));

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) for (var i = 0, length = listeners.length; i < length; i++) {
    if (listeners[i].fn !== fn && listeners[i].once !== once) {
      events.push(listeners[i]);
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) this._events[event] = events;
  else this._events[event] = null;

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) this._events[event] = null;
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

if ('object' === typeof module && module.exports) {
  module.exports = EventEmitter;
}

},{}],14:[function(require,module,exports){
var BufferBuilder = require('./bufferbuilder').BufferBuilder;
var binaryFeatures = require('./bufferbuilder').binaryFeatures;

var BinaryPack = {
  unpack: function(data){
    var unpacker = new Unpacker(data);
    return unpacker.unpack();
  },
  pack: function(data){
    var packer = new Packer();
    packer.pack(data);
    var buffer = packer.getBuffer();
    return buffer;
  }
};

module.exports = BinaryPack;

function Unpacker (data){
  // Data is ArrayBuffer
  this.index = 0;
  this.dataBuffer = data;
  this.dataView = new Uint8Array(this.dataBuffer);
  this.length = this.dataBuffer.byteLength;
}

Unpacker.prototype.unpack = function(){
  var type = this.unpack_uint8();
  if (type < 0x80){
    var positive_fixnum = type;
    return positive_fixnum;
  } else if ((type ^ 0xe0) < 0x20){
    var negative_fixnum = (type ^ 0xe0) - 0x20;
    return negative_fixnum;
  }
  var size;
  if ((size = type ^ 0xa0) <= 0x0f){
    return this.unpack_raw(size);
  } else if ((size = type ^ 0xb0) <= 0x0f){
    return this.unpack_string(size);
  } else if ((size = type ^ 0x90) <= 0x0f){
    return this.unpack_array(size);
  } else if ((size = type ^ 0x80) <= 0x0f){
    return this.unpack_map(size);
  }
  switch(type){
    case 0xc0:
      return null;
    case 0xc1:
      return undefined;
    case 0xc2:
      return false;
    case 0xc3:
      return true;
    case 0xca:
      return this.unpack_float();
    case 0xcb:
      return this.unpack_double();
    case 0xcc:
      return this.unpack_uint8();
    case 0xcd:
      return this.unpack_uint16();
    case 0xce:
      return this.unpack_uint32();
    case 0xcf:
      return this.unpack_uint64();
    case 0xd0:
      return this.unpack_int8();
    case 0xd1:
      return this.unpack_int16();
    case 0xd2:
      return this.unpack_int32();
    case 0xd3:
      return this.unpack_int64();
    case 0xd4:
      return undefined;
    case 0xd5:
      return undefined;
    case 0xd6:
      return undefined;
    case 0xd7:
      return undefined;
    case 0xd8:
      size = this.unpack_uint16();
      return this.unpack_string(size);
    case 0xd9:
      size = this.unpack_uint32();
      return this.unpack_string(size);
    case 0xda:
      size = this.unpack_uint16();
      return this.unpack_raw(size);
    case 0xdb:
      size = this.unpack_uint32();
      return this.unpack_raw(size);
    case 0xdc:
      size = this.unpack_uint16();
      return this.unpack_array(size);
    case 0xdd:
      size = this.unpack_uint32();
      return this.unpack_array(size);
    case 0xde:
      size = this.unpack_uint16();
      return this.unpack_map(size);
    case 0xdf:
      size = this.unpack_uint32();
      return this.unpack_map(size);
  }
}

Unpacker.prototype.unpack_uint8 = function(){
  var byte = this.dataView[this.index] & 0xff;
  this.index++;
  return byte;
};

Unpacker.prototype.unpack_uint16 = function(){
  var bytes = this.read(2);
  var uint16 =
    ((bytes[0] & 0xff) * 256) + (bytes[1] & 0xff);
  this.index += 2;
  return uint16;
}

Unpacker.prototype.unpack_uint32 = function(){
  var bytes = this.read(4);
  var uint32 =
     ((bytes[0]  * 256 +
       bytes[1]) * 256 +
       bytes[2]) * 256 +
       bytes[3];
  this.index += 4;
  return uint32;
}

Unpacker.prototype.unpack_uint64 = function(){
  var bytes = this.read(8);
  var uint64 =
   ((((((bytes[0]  * 256 +
       bytes[1]) * 256 +
       bytes[2]) * 256 +
       bytes[3]) * 256 +
       bytes[4]) * 256 +
       bytes[5]) * 256 +
       bytes[6]) * 256 +
       bytes[7];
  this.index += 8;
  return uint64;
}


Unpacker.prototype.unpack_int8 = function(){
  var uint8 = this.unpack_uint8();
  return (uint8 < 0x80 ) ? uint8 : uint8 - (1 << 8);
};

Unpacker.prototype.unpack_int16 = function(){
  var uint16 = this.unpack_uint16();
  return (uint16 < 0x8000 ) ? uint16 : uint16 - (1 << 16);
}

Unpacker.prototype.unpack_int32 = function(){
  var uint32 = this.unpack_uint32();
  return (uint32 < Math.pow(2, 31) ) ? uint32 :
    uint32 - Math.pow(2, 32);
}

Unpacker.prototype.unpack_int64 = function(){
  var uint64 = this.unpack_uint64();
  return (uint64 < Math.pow(2, 63) ) ? uint64 :
    uint64 - Math.pow(2, 64);
}

Unpacker.prototype.unpack_raw = function(size){
  if ( this.length < this.index + size){
    throw new Error('BinaryPackFailure: index is out of range'
      + ' ' + this.index + ' ' + size + ' ' + this.length);
  }
  var buf = this.dataBuffer.slice(this.index, this.index + size);
  this.index += size;

    //buf = util.bufferToString(buf);

  return buf;
}

Unpacker.prototype.unpack_string = function(size){
  var bytes = this.read(size);
  var i = 0, str = '', c, code;
  while(i < size){
    c = bytes[i];
    if ( c < 128){
      str += String.fromCharCode(c);
      i++;
    } else if ((c ^ 0xc0) < 32){
      code = ((c ^ 0xc0) << 6) | (bytes[i+1] & 63);
      str += String.fromCharCode(code);
      i += 2;
    } else {
      code = ((c & 15) << 12) | ((bytes[i+1] & 63) << 6) |
        (bytes[i+2] & 63);
      str += String.fromCharCode(code);
      i += 3;
    }
  }
  this.index += size;
  return str;
}

Unpacker.prototype.unpack_array = function(size){
  var objects = new Array(size);
  for(var i = 0; i < size ; i++){
    objects[i] = this.unpack();
  }
  return objects;
}

Unpacker.prototype.unpack_map = function(size){
  var map = {};
  for(var i = 0; i < size ; i++){
    var key  = this.unpack();
    var value = this.unpack();
    map[key] = value;
  }
  return map;
}

Unpacker.prototype.unpack_float = function(){
  var uint32 = this.unpack_uint32();
  var sign = uint32 >> 31;
  var exp  = ((uint32 >> 23) & 0xff) - 127;
  var fraction = ( uint32 & 0x7fffff ) | 0x800000;
  return (sign == 0 ? 1 : -1) *
    fraction * Math.pow(2, exp - 23);
}

Unpacker.prototype.unpack_double = function(){
  var h32 = this.unpack_uint32();
  var l32 = this.unpack_uint32();
  var sign = h32 >> 31;
  var exp  = ((h32 >> 20) & 0x7ff) - 1023;
  var hfrac = ( h32 & 0xfffff ) | 0x100000;
  var frac = hfrac * Math.pow(2, exp - 20) +
    l32   * Math.pow(2, exp - 52);
  return (sign == 0 ? 1 : -1) * frac;
}

Unpacker.prototype.read = function(length){
  var j = this.index;
  if (j + length <= this.length) {
    return this.dataView.subarray(j, j + length);
  } else {
    throw new Error('BinaryPackFailure: read index out of range');
  }
}

function Packer(){
  this.bufferBuilder = new BufferBuilder();
}

Packer.prototype.getBuffer = function(){
  return this.bufferBuilder.getBuffer();
}

Packer.prototype.pack = function(value){
  var type = typeof(value);
  if (type == 'string'){
    this.pack_string(value);
  } else if (type == 'number'){
    if (Math.floor(value) === value){
      this.pack_integer(value);
    } else{
      this.pack_double(value);
    }
  } else if (type == 'boolean'){
    if (value === true){
      this.bufferBuilder.append(0xc3);
    } else if (value === false){
      this.bufferBuilder.append(0xc2);
    }
  } else if (type == 'undefined'){
    this.bufferBuilder.append(0xc0);
  } else if (type == 'object'){
    if (value === null){
      this.bufferBuilder.append(0xc0);
    } else {
      var constructor = value.constructor;
      if (constructor == Array){
        this.pack_array(value);
      } else if (constructor == Blob || constructor == File) {
        this.pack_bin(value);
      } else if (constructor == ArrayBuffer) {
        if(binaryFeatures.useArrayBufferView) {
          this.pack_bin(new Uint8Array(value));
        } else {
          this.pack_bin(value);
        }
      } else if ('BYTES_PER_ELEMENT' in value){
        if(binaryFeatures.useArrayBufferView) {
          this.pack_bin(new Uint8Array(value.buffer));
        } else {
          this.pack_bin(value.buffer);
        }
      } else if (constructor == Object){
        this.pack_object(value);
      } else if (constructor == Date){
        this.pack_string(value.toString());
      } else if (typeof value.toBinaryPack == 'function'){
        this.bufferBuilder.append(value.toBinaryPack());
      } else {
        throw new Error('Type "' + constructor.toString() + '" not yet supported');
      }
    }
  } else {
    throw new Error('Type "' + type + '" not yet supported');
  }
  this.bufferBuilder.flush();
}


Packer.prototype.pack_bin = function(blob){
  var length = blob.length || blob.byteLength || blob.size;
  if (length <= 0x0f){
    this.pack_uint8(0xa0 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xda) ;
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdb);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  this.bufferBuilder.append(blob);
}

Packer.prototype.pack_string = function(str){
  var length = utf8Length(str);

  if (length <= 0x0f){
    this.pack_uint8(0xb0 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xd8) ;
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xd9);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  this.bufferBuilder.append(str);
}

Packer.prototype.pack_array = function(ary){
  var length = ary.length;
  if (length <= 0x0f){
    this.pack_uint8(0x90 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xdc)
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdd);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  for(var i = 0; i < length ; i++){
    this.pack(ary[i]);
  }
}

Packer.prototype.pack_integer = function(num){
  if ( -0x20 <= num && num <= 0x7f){
    this.bufferBuilder.append(num & 0xff);
  } else if (0x00 <= num && num <= 0xff){
    this.bufferBuilder.append(0xcc);
    this.pack_uint8(num);
  } else if (-0x80 <= num && num <= 0x7f){
    this.bufferBuilder.append(0xd0);
    this.pack_int8(num);
  } else if ( 0x0000 <= num && num <= 0xffff){
    this.bufferBuilder.append(0xcd);
    this.pack_uint16(num);
  } else if (-0x8000 <= num && num <= 0x7fff){
    this.bufferBuilder.append(0xd1);
    this.pack_int16(num);
  } else if ( 0x00000000 <= num && num <= 0xffffffff){
    this.bufferBuilder.append(0xce);
    this.pack_uint32(num);
  } else if (-0x80000000 <= num && num <= 0x7fffffff){
    this.bufferBuilder.append(0xd2);
    this.pack_int32(num);
  } else if (-0x8000000000000000 <= num && num <= 0x7FFFFFFFFFFFFFFF){
    this.bufferBuilder.append(0xd3);
    this.pack_int64(num);
  } else if (0x0000000000000000 <= num && num <= 0xFFFFFFFFFFFFFFFF){
    this.bufferBuilder.append(0xcf);
    this.pack_uint64(num);
  } else{
    throw new Error('Invalid integer');
  }
}

Packer.prototype.pack_double = function(num){
  var sign = 0;
  if (num < 0){
    sign = 1;
    num = -num;
  }
  var exp  = Math.floor(Math.log(num) / Math.LN2);
  var frac0 = num / Math.pow(2, exp) - 1;
  var frac1 = Math.floor(frac0 * Math.pow(2, 52));
  var b32   = Math.pow(2, 32);
  var h32 = (sign << 31) | ((exp+1023) << 20) |
      (frac1 / b32) & 0x0fffff;
  var l32 = frac1 % b32;
  this.bufferBuilder.append(0xcb);
  this.pack_int32(h32);
  this.pack_int32(l32);
}

Packer.prototype.pack_object = function(obj){
  var keys = Object.keys(obj);
  var length = keys.length;
  if (length <= 0x0f){
    this.pack_uint8(0x80 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xde);
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdf);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  for(var prop in obj){
    if (obj.hasOwnProperty(prop)){
      this.pack(prop);
      this.pack(obj[prop]);
    }
  }
}

Packer.prototype.pack_uint8 = function(num){
  this.bufferBuilder.append(num);
}

Packer.prototype.pack_uint16 = function(num){
  this.bufferBuilder.append(num >> 8);
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_uint32 = function(num){
  var n = num & 0xffffffff;
  this.bufferBuilder.append((n & 0xff000000) >>> 24);
  this.bufferBuilder.append((n & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((n & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((n & 0x000000ff));
}

Packer.prototype.pack_uint64 = function(num){
  var high = num / Math.pow(2, 32);
  var low  = num % Math.pow(2, 32);
  this.bufferBuilder.append((high & 0xff000000) >>> 24);
  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((high & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((high & 0x000000ff));
  this.bufferBuilder.append((low  & 0xff000000) >>> 24);
  this.bufferBuilder.append((low  & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((low  & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((low  & 0x000000ff));
}

Packer.prototype.pack_int8 = function(num){
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_int16 = function(num){
  this.bufferBuilder.append((num & 0xff00) >> 8);
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_int32 = function(num){
  this.bufferBuilder.append((num >>> 24) & 0xff);
  this.bufferBuilder.append((num & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((num & 0x0000ff00) >>> 8);
  this.bufferBuilder.append((num & 0x000000ff));
}

Packer.prototype.pack_int64 = function(num){
  var high = Math.floor(num / Math.pow(2, 32));
  var low  = num % Math.pow(2, 32);
  this.bufferBuilder.append((high & 0xff000000) >>> 24);
  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((high & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((high & 0x000000ff));
  this.bufferBuilder.append((low  & 0xff000000) >>> 24);
  this.bufferBuilder.append((low  & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((low  & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((low  & 0x000000ff));
}

function _utf8Replace(m){
  var code = m.charCodeAt(0);

  if(code <= 0x7ff) return '00';
  if(code <= 0xffff) return '000';
  if(code <= 0x1fffff) return '0000';
  if(code <= 0x3ffffff) return '00000';
  return '000000';
}

function utf8Length(str){
  if (str.length > 600) {
    // Blob method faster for large strings
    return (new Blob([str])).size;
  } else {
    return str.replace(/[^\u0000-\u007F]/g, _utf8Replace).length;
  }
}

},{"./bufferbuilder":15}],15:[function(require,module,exports){
var binaryFeatures = {};
binaryFeatures.useBlobBuilder = (function(){
  try {
    new Blob([]);
    return false;
  } catch (e) {
    return true;
  }
})();

binaryFeatures.useArrayBufferView = !binaryFeatures.useBlobBuilder && (function(){
  try {
    return (new Blob([new Uint8Array([])])).size === 0;
  } catch (e) {
    return true;
  }
})();

module.exports.binaryFeatures = binaryFeatures;
var BlobBuilder = module.exports.BlobBuilder;
if (typeof window != 'undefined') {
  BlobBuilder = module.exports.BlobBuilder = window.WebKitBlobBuilder ||
    window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;
}

function BufferBuilder(){
  this._pieces = [];
  this._parts = [];
}

BufferBuilder.prototype.append = function(data) {
  if(typeof data === 'number') {
    this._pieces.push(data);
  } else {
    this.flush();
    this._parts.push(data);
  }
};

BufferBuilder.prototype.flush = function() {
  if (this._pieces.length > 0) {
    var buf = new Uint8Array(this._pieces);
    if(!binaryFeatures.useArrayBufferView) {
      buf = buf.buffer;
    }
    this._parts.push(buf);
    this._pieces = [];
  }
};

BufferBuilder.prototype.getBuffer = function() {
  this.flush();
  if(binaryFeatures.useBlobBuilder) {
    var builder = new BlobBuilder();
    for(var i = 0, ii = this._parts.length; i < ii; i++) {
      builder.append(this._parts[i]);
    }
    return builder.getBlob();
  } else {
    return new Blob(this._parts);
  }
};

module.exports.BufferBuilder = BufferBuilder;

},{}],16:[function(require,module,exports){
var util = require('./util');

/**
 * Reliable transfer for Chrome Canary DataChannel impl.
 * Author: @michellebu
 */
function Reliable(dc, debug) {
  if (!(this instanceof Reliable)) return new Reliable(dc);
  this._dc = dc;

  util.debug = debug;

  // Messages sent/received so far.
  // id: { ack: n, chunks: [...] }
  this._outgoing = {};
  // id: { ack: ['ack', id, n], chunks: [...] }
  this._incoming = {};
  this._received = {};

  // Window size.
  this._window = 1000;
  // MTU.
  this._mtu = 500;
  // Interval for setInterval. In ms.
  this._interval = 0;

  // Messages sent.
  this._count = 0;

  // Outgoing message queue.
  this._queue = [];

  this._setupDC();
};

// Send a message reliably.
Reliable.prototype.send = function(msg) {
  // Determine if chunking is necessary.
  var bl = util.pack(msg);
  if (bl.size < this._mtu) {
    this._handleSend(['no', bl]);
    return;
  }

  this._outgoing[this._count] = {
    ack: 0,
    chunks: this._chunk(bl)
  };

  if (util.debug) {
    this._outgoing[this._count].timer = new Date();
  }

  // Send prelim window.
  this._sendWindowedChunks(this._count);
  this._count += 1;
};

// Set up interval for processing queue.
Reliable.prototype._setupInterval = function() {
  // TODO: fail gracefully.

  var self = this;
  this._timeout = setInterval(function() {
    // FIXME: String stuff makes things terribly async.
    var msg = self._queue.shift();
    if (msg._multiple) {
      for (var i = 0, ii = msg.length; i < ii; i += 1) {
        self._intervalSend(msg[i]);
      }
    } else {
      self._intervalSend(msg);
    }
  }, this._interval);
};

Reliable.prototype._intervalSend = function(msg) {
  var self = this;
  msg = util.pack(msg);
  util.blobToBinaryString(msg, function(str) {
    self._dc.send(str);
  });
  if (self._queue.length === 0) {
    clearTimeout(self._timeout);
    self._timeout = null;
    //self._processAcks();
  }
};

// Go through ACKs to send missing pieces.
Reliable.prototype._processAcks = function() {
  for (var id in this._outgoing) {
    if (this._outgoing.hasOwnProperty(id)) {
      this._sendWindowedChunks(id);
    }
  }
};

// Handle sending a message.
// FIXME: Don't wait for interval time for all messages...
Reliable.prototype._handleSend = function(msg) {
  var push = true;
  for (var i = 0, ii = this._queue.length; i < ii; i += 1) {
    var item = this._queue[i];
    if (item === msg) {
      push = false;
    } else if (item._multiple && item.indexOf(msg) !== -1) {
      push = false;
    }
  }
  if (push) {
    this._queue.push(msg);
    if (!this._timeout) {
      this._setupInterval();
    }
  }
};

// Set up DataChannel handlers.
Reliable.prototype._setupDC = function() {
  // Handle various message types.
  var self = this;
  this._dc.onmessage = function(e) {
    var msg = e.data;
    var datatype = msg.constructor;
    // FIXME: msg is String until binary is supported.
    // Once that happens, this will have to be smarter.
    if (datatype === String) {
      var ab = util.binaryStringToArrayBuffer(msg);
      msg = util.unpack(ab);
      self._handleMessage(msg);
    }
  };
};

// Handles an incoming message.
Reliable.prototype._handleMessage = function(msg) {
  var id = msg[1];
  var idata = this._incoming[id];
  var odata = this._outgoing[id];
  var data;
  switch (msg[0]) {
    // No chunking was done.
    case 'no':
      var message = id;
      if (!!message) {
        this.onmessage(util.unpack(message));
      }
      break;
    // Reached the end of the message.
    case 'end':
      data = idata;

      // In case end comes first.
      this._received[id] = msg[2];

      if (!data) {
        break;
      }

      this._ack(id);
      break;
    case 'ack':
      data = odata;
      if (!!data) {
        var ack = msg[2];
        // Take the larger ACK, for out of order messages.
        data.ack = Math.max(ack, data.ack);

        // Clean up when all chunks are ACKed.
        if (data.ack >= data.chunks.length) {
          util.log('Time: ', new Date() - data.timer);
          delete this._outgoing[id];
        } else {
          this._processAcks();
        }
      }
      // If !data, just ignore.
      break;
    // Received a chunk of data.
    case 'chunk':
      // Create a new entry if none exists.
      data = idata;
      if (!data) {
        var end = this._received[id];
        if (end === true) {
          break;
        }
        data = {
          ack: ['ack', id, 0],
          chunks: []
        };
        this._incoming[id] = data;
      }

      var n = msg[2];
      var chunk = msg[3];
      data.chunks[n] = new Uint8Array(chunk);

      // If we get the chunk we're looking for, ACK for next missing.
      // Otherwise, ACK the same N again.
      if (n === data.ack[2]) {
        this._calculateNextAck(id);
      }
      this._ack(id);
      break;
    default:
      // Shouldn't happen, but would make sense for message to just go
      // through as is.
      this._handleSend(msg);
      break;
  }
};

// Chunks BL into smaller messages.
Reliable.prototype._chunk = function(bl) {
  var chunks = [];
  var size = bl.size;
  var start = 0;
  while (start < size) {
    var end = Math.min(size, start + this._mtu);
    var b = bl.slice(start, end);
    var chunk = {
      payload: b
    }
    chunks.push(chunk);
    start = end;
  }
  util.log('Created', chunks.length, 'chunks.');
  return chunks;
};

// Sends ACK N, expecting Nth blob chunk for message ID.
Reliable.prototype._ack = function(id) {
  var ack = this._incoming[id].ack;

  // if ack is the end value, then call _complete.
  if (this._received[id] === ack[2]) {
    this._complete(id);
    this._received[id] = true;
  }

  this._handleSend(ack);
};

// Calculates the next ACK number, given chunks.
Reliable.prototype._calculateNextAck = function(id) {
  var data = this._incoming[id];
  var chunks = data.chunks;
  for (var i = 0, ii = chunks.length; i < ii; i += 1) {
    // This chunk is missing!!! Better ACK for it.
    if (chunks[i] === undefined) {
      data.ack[2] = i;
      return;
    }
  }
  data.ack[2] = chunks.length;
};

// Sends the next window of chunks.
Reliable.prototype._sendWindowedChunks = function(id) {
  util.log('sendWindowedChunks for: ', id);
  var data = this._outgoing[id];
  var ch = data.chunks;
  var chunks = [];
  var limit = Math.min(data.ack + this._window, ch.length);
  for (var i = data.ack; i < limit; i += 1) {
    if (!ch[i].sent || i === data.ack) {
      ch[i].sent = true;
      chunks.push(['chunk', id, i, ch[i].payload]);
    }
  }
  if (data.ack + this._window >= ch.length) {
    chunks.push(['end', id, ch.length])
  }
  chunks._multiple = true;
  this._handleSend(chunks);
};

// Puts together a message from chunks.
Reliable.prototype._complete = function(id) {
  util.log('Completed called for', id);
  var self = this;
  var chunks = this._incoming[id].chunks;
  var bl = new Blob(chunks);
  util.blobToArrayBuffer(bl, function(ab) {
    self.onmessage(util.unpack(ab));
  });
  delete this._incoming[id];
};

// Ups bandwidth limit on SDP. Meant to be called during offer/answer.
Reliable.higherBandwidthSDP = function(sdp) {
  // AS stands for Application-Specific Maximum.
  // Bandwidth number is in kilobits / sec.
  // See RFC for more info: http://www.ietf.org/rfc/rfc2327.txt

  // Chrome 31+ doesn't want us munging the SDP, so we'll let them have their
  // way.
  var version = navigator.appVersion.match(/Chrome\/(.*?) /);
  if (version) {
    version = parseInt(version[1].split('.').shift());
    if (version < 31) {
      var parts = sdp.split('b=AS:30');
      var replace = 'b=AS:102400'; // 100 Mbps
      if (parts.length > 1) {
        return parts[0] + replace + parts[1];
      }
    }
  }

  return sdp;
};

// Overwritten, typically.
Reliable.prototype.onmessage = function(msg) {};

module.exports.Reliable = Reliable;

},{"./util":17}],17:[function(require,module,exports){
var BinaryPack = require('js-binarypack');

var util = {
  debug: false,
  
  inherits: function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  },
  extend: function(dest, source) {
    for(var key in source) {
      if(source.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
    return dest;
  },
  pack: BinaryPack.pack,
  unpack: BinaryPack.unpack,
  
  log: function () {
    if (util.debug) {
      var copy = [];
      for (var i = 0; i < arguments.length; i++) {
        copy[i] = arguments[i];
      }
      copy.unshift('Reliable: ');
      console.log.apply(console, copy);
    }
  },

  setZeroTimeout: (function(global) {
    var timeouts = [];
    var messageName = 'zero-timeout-message';

    // Like setTimeout, but only takes a function argument.	 There's
    // no time argument (always zero) and no arguments (you have to
    // use a closure).
    function setZeroTimeoutPostMessage(fn) {
      timeouts.push(fn);
      global.postMessage(messageName, '*');
    }		

    function handleMessage(event) {
      if (event.source == global && event.data == messageName) {
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        if (timeouts.length) {
          timeouts.shift()();
        }
      }
    }
    if (global.addEventListener) {
      global.addEventListener('message', handleMessage, true);
    } else if (global.attachEvent) {
      global.attachEvent('onmessage', handleMessage);
    }
    return setZeroTimeoutPostMessage;
  }(this)),
  
  blobToArrayBuffer: function(blob, cb){
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsArrayBuffer(blob);
  },
  blobToBinaryString: function(blob, cb){
    var fr = new FileReader();
    fr.onload = function(evt) {
      cb(evt.target.result);
    };
    fr.readAsBinaryString(blob);
  },
  binaryStringToArrayBuffer: function(binary) {
    var byteArray = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      byteArray[i] = binary.charCodeAt(i) & 0xff;
    }
    return byteArray.buffer;
  },
  randomToken: function () {
    return Math.random().toString(36).substr(2);
  }
};

module.exports = util;

},{"js-binarypack":14}]},{},[4,2]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZXBhbC5qcyIsIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzIjpbImxpdmVwYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5Qb2x5bWVyKCdsaXZlcGFsLXVpJywge1xuICBjcmVhdGVkOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmRldmljZXMgPSB7fTtcbiAgICB0aGlzLmdpZmllUHJvZ3Jlc3MgPSAwO1xuICAgIHRoaXMucGFnZVRyYW5zaXRpb25Jc0FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMud2F0Y2hQYWdlc1RyYW5zaXRpb24oKTtcbiAgfSxcbiAgb2JzZXJ2ZTogeyckLnVzZXJuYW1lLnZhbHVlJzogJ3Rlc3QnfSxcbiAgY2hlY2tVc2VybmFtZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kLnVzZXJuYW1lRGVjb3JhdG9yLmlzSW52YWxpZCA9ICF0aGlzLiQudXNlcm5hbWUuY2hlY2tWYWxpZGl0eSgpO1xuICB9LFxuICB3YXRjaFBhZ2VzVHJhbnNpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgdmFyICRfXzAgPSB0aGlzO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb3JlLWFuaW1hdGVkLXBhZ2VzLXRyYW5zaXRpb24tcHJlcGFyZScsIChmdW5jdGlvbihldmVudCkge1xuICAgICAgJF9fMC5wYWdlVHJhbnNpdGlvbklzQWN0aXZlID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUubG9nKCd0cmFuc2l0aW9uJyk7XG4gICAgfSkpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb3JlLWFuaW1hdGVkLXBhZ2VzLXRyYW5zaXRpb24tZW5kJywgKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAkX18wLnBhZ2VUcmFuc2l0aW9uSXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgIGNvbnNvbGUubG9nKCd0cmFuc2l0aW9uLWVuZCcpO1xuICAgIH0pKTtcbiAgfSxcbiAgbWFrZUdpZmllOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgdGhpcy5naWZzaG90LmNyZWF0ZUdJRih7XG4gICAgICAnbnVtV29ya2Vycyc6IDQsXG4gICAgICAnbnVtRnJhbWVzJzogMjAsXG4gICAgICAnc2FtcGxlSW50ZXJ2YWwnOiA3LFxuICAgICAgJ3dlYmNhbVZpZGVvRWxlbWVudCc6IHRoaXMuJC52aWRlbyxcbiAgICAgICdrZWVwQ2FtZXJhT24nOiB0cnVlLFxuICAgICAgJ2NhbWVyYVN0cmVhbSc6IHRoaXMuY2FtZXJhU3RyZWFtIHx8IG51bGwsXG4gICAgICAnZ2lmV2lkdGgnOiAyMDAsXG4gICAgICAnZ2lmSGVpZ2h0JzogMjAwLFxuICAgICAgJ3Byb2dyZXNzQ2FsbGJhY2snOiAoZnVuY3Rpb24oc3RlcCkge1xuICAgICAgICAkX18wLmdpZmllUHJvZ3Jlc3MgPSBzdGVwICogMTAwO1xuICAgICAgfSksXG4gICAgICAnY29tcGxldGVDYWxsYmFjayc6IChmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RvbmUnKTtcbiAgICAgIH0pXG4gICAgfSwgKGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKCFvYmouZXJyb3IpIHtcbiAgICAgICAgJF9fMC4kLmdpZmllLnNyYyA9IG9iai5pbWFnZTtcbiAgICAgICAgJF9fMC5naWZpZURhdGEgPSBvYmouaW1hZ2U7XG4gICAgICAgICRfXzAuY2FtZXJhU3RyZWFtID0gb2JqLmNhbWVyYVN0cmVhbTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH0sXG4gIHN3aXRjaDogZnVuY3Rpb24oZXZlbnQsIGRldGFpbCwgc2VuZGVyKSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQsIGRldGFpbCwgc2VuZGVyKTtcbiAgICB0aGlzLiQubWFpbi5zZWxlY3RlZCA9IHNlbmRlci5kYXRhc2V0LnRhcmdldDtcbiAgfSxcbiAgelZhbHVlOiBmdW5jdGlvbihpc01vYmlsZSkge1xuICAgIHJldHVybiBpc01vYmlsZSA/IDAgOiAxO1xuICB9XG59KTtcblxuXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xudmFyICRfX3BlZXJqc19fLFxuICAgICRfX2dpZnNob3RfNDdfYnVpbGRfNDdfZ2lmc2hvdF80Nl9qc19fLFxuICAgICRfX2xpdmVwYWxfNDVfdWlfXztcbid1c2Ugc3RyaWN0JztcbnZhciBQZWVyID0gKCRfX3BlZXJqc19fID0gcmVxdWlyZShcInBlZXJqc1wiKSwgJF9fcGVlcmpzX18gJiYgJF9fcGVlcmpzX18uX19lc01vZHVsZSAmJiAkX19wZWVyanNfXyB8fCB7ZGVmYXVsdDogJF9fcGVlcmpzX199KS5kZWZhdWx0O1xudmFyIGdpZnNob3QgPSAoJF9fZ2lmc2hvdF80N19idWlsZF80N19naWZzaG90XzQ2X2pzX18gPSByZXF1aXJlKFwiZ2lmc2hvdC9idWlsZC9naWZzaG90LmpzXCIpLCAkX19naWZzaG90XzQ3X2J1aWxkXzQ3X2dpZnNob3RfNDZfanNfXyAmJiAkX19naWZzaG90XzQ3X2J1aWxkXzQ3X2dpZnNob3RfNDZfanNfXy5fX2VzTW9kdWxlICYmICRfX2dpZnNob3RfNDdfYnVpbGRfNDdfZ2lmc2hvdF80Nl9qc19fIHx8IHtkZWZhdWx0OiAkX19naWZzaG90XzQ3X2J1aWxkXzQ3X2dpZnNob3RfNDZfanNfX30pLmRlZmF1bHQ7XG4oJF9fbGl2ZXBhbF80NV91aV9fID0gcmVxdWlyZShcIi4vbGl2ZXBhbC11aVwiKSwgJF9fbGl2ZXBhbF80NV91aV9fICYmICRfX2xpdmVwYWxfNDVfdWlfXy5fX2VzTW9kdWxlICYmICRfX2xpdmVwYWxfNDVfdWlfXyB8fCB7ZGVmYXVsdDogJF9fbGl2ZXBhbF80NV91aV9ffSk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9seW1lci1yZWFkeScsIChmdW5jdGlvbihldmVudCkge1xuICB2YXIgbGl2ZXBhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpdmVwYWwtdWknKTtcbiAgbGl2ZXBhbC5naWZzaG90ID0gZ2lmc2hvdDtcbn0pKTtcblxuXG59LHtcIi4vbGl2ZXBhbC11aVwiOjEsXCJnaWZzaG90L2J1aWxkL2dpZnNob3QuanNcIjo1LFwicGVlcmpzXCI6MTB9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG59LHt9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwpe1xuKGZ1bmN0aW9uKGdsb2JhbCkge1xuICAndXNlIHN0cmljdCc7XG4gIGlmIChnbG9iYWwuJHRyYWNldXJSdW50aW1lKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciAkT2JqZWN0ID0gT2JqZWN0O1xuICB2YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbiAgdmFyICRjcmVhdGUgPSAkT2JqZWN0LmNyZWF0ZTtcbiAgdmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzO1xuICB2YXIgJGRlZmluZVByb3BlcnR5ID0gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbiAgdmFyICRmcmVlemUgPSAkT2JqZWN0LmZyZWV6ZTtcbiAgdmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgdmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gJE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICB2YXIgJGtleXMgPSAkT2JqZWN0LmtleXM7XG4gIHZhciAkaGFzT3duUHJvcGVydHkgPSAkT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyICR0b1N0cmluZyA9ICRPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgJHByZXZlbnRFeHRlbnNpb25zID0gT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zO1xuICB2YXIgJHNlYWwgPSBPYmplY3Quc2VhbDtcbiAgdmFyICRpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlO1xuICBmdW5jdGlvbiBub25FbnVtKHZhbHVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9O1xuICB9XG4gIHZhciB0eXBlcyA9IHtcbiAgICB2b2lkOiBmdW5jdGlvbiB2b2lkVHlwZSgpIHt9LFxuICAgIGFueTogZnVuY3Rpb24gYW55KCkge30sXG4gICAgc3RyaW5nOiBmdW5jdGlvbiBzdHJpbmcoKSB7fSxcbiAgICBudW1iZXI6IGZ1bmN0aW9uIG51bWJlcigpIHt9LFxuICAgIGJvb2xlYW46IGZ1bmN0aW9uIGJvb2xlYW4oKSB7fVxuICB9O1xuICB2YXIgbWV0aG9kID0gbm9uRW51bTtcbiAgdmFyIGNvdW50ZXIgPSAwO1xuICBmdW5jdGlvbiBuZXdVbmlxdWVTdHJpbmcoKSB7XG4gICAgcmV0dXJuICdfXyQnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMWU5KSArICckJyArICsrY291bnRlciArICckX18nO1xuICB9XG4gIHZhciBzeW1ib2xJbnRlcm5hbFByb3BlcnR5ID0gbmV3VW5pcXVlU3RyaW5nKCk7XG4gIHZhciBzeW1ib2xEZXNjcmlwdGlvblByb3BlcnR5ID0gbmV3VW5pcXVlU3RyaW5nKCk7XG4gIHZhciBzeW1ib2xEYXRhUHJvcGVydHkgPSBuZXdVbmlxdWVTdHJpbmcoKTtcbiAgdmFyIHN5bWJvbFZhbHVlcyA9ICRjcmVhdGUobnVsbCk7XG4gIHZhciBwcml2YXRlTmFtZXMgPSAkY3JlYXRlKG51bGwpO1xuICBmdW5jdGlvbiBjcmVhdGVQcml2YXRlTmFtZSgpIHtcbiAgICB2YXIgcyA9IG5ld1VuaXF1ZVN0cmluZygpO1xuICAgIHByaXZhdGVOYW1lc1tzXSA9IHRydWU7XG4gICAgcmV0dXJuIHM7XG4gIH1cbiAgZnVuY3Rpb24gaXNTeW1ib2woc3ltYm9sKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzeW1ib2wgPT09ICdvYmplY3QnICYmIHN5bWJvbCBpbnN0YW5jZW9mIFN5bWJvbFZhbHVlO1xuICB9XG4gIGZ1bmN0aW9uIHR5cGVPZih2KSB7XG4gICAgaWYgKGlzU3ltYm9sKHYpKVxuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIHJldHVybiB0eXBlb2YgdjtcbiAgfVxuICBmdW5jdGlvbiBTeW1ib2woZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgdmFsdWUgPSBuZXcgU3ltYm9sVmFsdWUoZGVzY3JpcHRpb24pO1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTeW1ib2wpKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1N5bWJvbCBjYW5ub3QgYmUgbmV3XFwnZWQnKTtcbiAgfVxuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sLnByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywgbm9uRW51bShTeW1ib2wpKTtcbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbC5wcm90b3R5cGUsICd0b1N0cmluZycsIG1ldGhvZChmdW5jdGlvbigpIHtcbiAgICB2YXIgc3ltYm9sVmFsdWUgPSB0aGlzW3N5bWJvbERhdGFQcm9wZXJ0eV07XG4gICAgaWYgKCFnZXRPcHRpb24oJ3N5bWJvbHMnKSlcbiAgICAgIHJldHVybiBzeW1ib2xWYWx1ZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICBpZiAoIXN5bWJvbFZhbHVlKVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdDb252ZXJzaW9uIGZyb20gc3ltYm9sIHRvIHN0cmluZycpO1xuICAgIHZhciBkZXNjID0gc3ltYm9sVmFsdWVbc3ltYm9sRGVzY3JpcHRpb25Qcm9wZXJ0eV07XG4gICAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZClcbiAgICAgIGRlc2MgPSAnJztcbiAgICByZXR1cm4gJ1N5bWJvbCgnICsgZGVzYyArICcpJztcbiAgfSkpO1xuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sLnByb3RvdHlwZSwgJ3ZhbHVlT2YnLCBtZXRob2QoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN5bWJvbFZhbHVlID0gdGhpc1tzeW1ib2xEYXRhUHJvcGVydHldO1xuICAgIGlmICghc3ltYm9sVmFsdWUpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0NvbnZlcnNpb24gZnJvbSBzeW1ib2wgdG8gc3RyaW5nJyk7XG4gICAgaWYgKCFnZXRPcHRpb24oJ3N5bWJvbHMnKSlcbiAgICAgIHJldHVybiBzeW1ib2xWYWx1ZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICByZXR1cm4gc3ltYm9sVmFsdWU7XG4gIH0pKTtcbiAgZnVuY3Rpb24gU3ltYm9sVmFsdWUoZGVzY3JpcHRpb24pIHtcbiAgICB2YXIga2V5ID0gbmV3VW5pcXVlU3RyaW5nKCk7XG4gICAgJGRlZmluZVByb3BlcnR5KHRoaXMsIHN5bWJvbERhdGFQcm9wZXJ0eSwge3ZhbHVlOiB0aGlzfSk7XG4gICAgJGRlZmluZVByb3BlcnR5KHRoaXMsIHN5bWJvbEludGVybmFsUHJvcGVydHksIHt2YWx1ZToga2V5fSk7XG4gICAgJGRlZmluZVByb3BlcnR5KHRoaXMsIHN5bWJvbERlc2NyaXB0aW9uUHJvcGVydHksIHt2YWx1ZTogZGVzY3JpcHRpb259KTtcbiAgICBmcmVlemUodGhpcyk7XG4gICAgc3ltYm9sVmFsdWVzW2tleV0gPSB0aGlzO1xuICB9XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2xWYWx1ZS5wcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIG5vbkVudW0oU3ltYm9sKSk7XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2xWYWx1ZS5wcm90b3R5cGUsICd0b1N0cmluZycsIHtcbiAgICB2YWx1ZTogU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZyxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICB9KTtcbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbFZhbHVlLnByb3RvdHlwZSwgJ3ZhbHVlT2YnLCB7XG4gICAgdmFsdWU6IFN5bWJvbC5wcm90b3R5cGUudmFsdWVPZixcbiAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICB9KTtcbiAgdmFyIGhhc2hQcm9wZXJ0eSA9IGNyZWF0ZVByaXZhdGVOYW1lKCk7XG4gIHZhciBoYXNoUHJvcGVydHlEZXNjcmlwdG9yID0ge3ZhbHVlOiB1bmRlZmluZWR9O1xuICB2YXIgaGFzaE9iamVjdFByb3BlcnRpZXMgPSB7XG4gICAgaGFzaDoge3ZhbHVlOiB1bmRlZmluZWR9LFxuICAgIHNlbGY6IHt2YWx1ZTogdW5kZWZpbmVkfVxuICB9O1xuICB2YXIgaGFzaENvdW50ZXIgPSAwO1xuICBmdW5jdGlvbiBnZXRPd25IYXNoT2JqZWN0KG9iamVjdCkge1xuICAgIHZhciBoYXNoT2JqZWN0ID0gb2JqZWN0W2hhc2hQcm9wZXJ0eV07XG4gICAgaWYgKGhhc2hPYmplY3QgJiYgaGFzaE9iamVjdC5zZWxmID09PSBvYmplY3QpXG4gICAgICByZXR1cm4gaGFzaE9iamVjdDtcbiAgICBpZiAoJGlzRXh0ZW5zaWJsZShvYmplY3QpKSB7XG4gICAgICBoYXNoT2JqZWN0UHJvcGVydGllcy5oYXNoLnZhbHVlID0gaGFzaENvdW50ZXIrKztcbiAgICAgIGhhc2hPYmplY3RQcm9wZXJ0aWVzLnNlbGYudmFsdWUgPSBvYmplY3Q7XG4gICAgICBoYXNoUHJvcGVydHlEZXNjcmlwdG9yLnZhbHVlID0gJGNyZWF0ZShudWxsLCBoYXNoT2JqZWN0UHJvcGVydGllcyk7XG4gICAgICAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCBoYXNoUHJvcGVydHksIGhhc2hQcm9wZXJ0eURlc2NyaXB0b3IpO1xuICAgICAgcmV0dXJuIGhhc2hQcm9wZXJ0eURlc2NyaXB0b3IudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgZnVuY3Rpb24gZnJlZXplKG9iamVjdCkge1xuICAgIGdldE93bkhhc2hPYmplY3Qob2JqZWN0KTtcbiAgICByZXR1cm4gJGZyZWV6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG4gIGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKG9iamVjdCkge1xuICAgIGdldE93bkhhc2hPYmplY3Qob2JqZWN0KTtcbiAgICByZXR1cm4gJHByZXZlbnRFeHRlbnNpb25zLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbiAgZnVuY3Rpb24gc2VhbChvYmplY3QpIHtcbiAgICBnZXRPd25IYXNoT2JqZWN0KG9iamVjdCk7XG4gICAgcmV0dXJuICRzZWFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbiAgU3ltYm9sLml0ZXJhdG9yID0gU3ltYm9sKCk7XG4gIGZyZWV6ZShTeW1ib2xWYWx1ZS5wcm90b3R5cGUpO1xuICBmdW5jdGlvbiB0b1Byb3BlcnR5KG5hbWUpIHtcbiAgICBpZiAoaXNTeW1ib2wobmFtZSkpXG4gICAgICByZXR1cm4gbmFtZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCkge1xuICAgIHZhciBydiA9IFtdO1xuICAgIHZhciBuYW1lcyA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgIGlmICghc3ltYm9sVmFsdWVzW25hbWVdICYmICFwcml2YXRlTmFtZXNbbmFtZV0pXG4gICAgICAgIHJ2LnB1c2gobmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBydjtcbiAgfVxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBuYW1lKSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCB0b1Byb3BlcnR5KG5hbWUpKTtcbiAgfVxuICBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KSB7XG4gICAgdmFyIHJ2ID0gW107XG4gICAgdmFyIG5hbWVzID0gJGdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc3ltYm9sID0gc3ltYm9sVmFsdWVzW25hbWVzW2ldXTtcbiAgICAgIGlmIChzeW1ib2wpXG4gICAgICAgIHJ2LnB1c2goc3ltYm9sKTtcbiAgICB9XG4gICAgcmV0dXJuIHJ2O1xuICB9XG4gIGZ1bmN0aW9uIGhhc093blByb3BlcnR5KG5hbWUpIHtcbiAgICByZXR1cm4gJGhhc093blByb3BlcnR5LmNhbGwodGhpcywgdG9Qcm9wZXJ0eShuYW1lKSk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0T3B0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gZ2xvYmFsLnRyYWNldXIgJiYgZ2xvYmFsLnRyYWNldXIub3B0aW9uc1tuYW1lXTtcbiAgfVxuICBmdW5jdGlvbiBzZXRQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIHN5bSxcbiAgICAgICAgZGVzYztcbiAgICBpZiAoaXNTeW1ib2wobmFtZSkpIHtcbiAgICAgIHN5bSA9IG5hbWU7XG4gICAgICBuYW1lID0gbmFtZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICB9XG4gICAgb2JqZWN0W25hbWVdID0gdmFsdWU7XG4gICAgaWYgKHN5bSAmJiAoZGVzYyA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBuYW1lKSkpXG4gICAgICAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB7ZW51bWVyYWJsZTogZmFsc2V9KTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCBkZXNjcmlwdG9yKSB7XG4gICAgaWYgKGlzU3ltYm9sKG5hbWUpKSB7XG4gICAgICBpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG4gICAgICAgIGRlc2NyaXB0b3IgPSAkY3JlYXRlKGRlc2NyaXB0b3IsIHtlbnVtZXJhYmxlOiB7dmFsdWU6IGZhbHNlfX0pO1xuICAgICAgfVxuICAgICAgbmFtZSA9IG5hbWVbc3ltYm9sSW50ZXJuYWxQcm9wZXJ0eV07XG4gICAgfVxuICAgICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxPYmplY3QoT2JqZWN0KSB7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2RlZmluZVByb3BlcnR5Jywge3ZhbHVlOiBkZWZpbmVQcm9wZXJ0eX0pO1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QsICdnZXRPd25Qcm9wZXJ0eU5hbWVzJywge3ZhbHVlOiBnZXRPd25Qcm9wZXJ0eU5hbWVzfSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2dldE93blByb3BlcnR5RGVzY3JpcHRvcicsIHt2YWx1ZTogZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yfSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsICdoYXNPd25Qcm9wZXJ0eScsIHt2YWx1ZTogaGFzT3duUHJvcGVydHl9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnZnJlZXplJywge3ZhbHVlOiBmcmVlemV9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAncHJldmVudEV4dGVuc2lvbnMnLCB7dmFsdWU6IHByZXZlbnRFeHRlbnNpb25zfSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ3NlYWwnLCB7dmFsdWU6IHNlYWx9KTtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuICB9XG4gIGZ1bmN0aW9uIGV4cG9ydFN0YXIob2JqZWN0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBuYW1lcyA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3VtZW50c1tpXSk7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5hbWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBuYW1lID0gbmFtZXNbal07XG4gICAgICAgIGlmIChwcml2YXRlTmFtZXNbbmFtZV0pXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIChmdW5jdGlvbihtb2QsIG5hbWUpIHtcbiAgICAgICAgICAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gbW9kW25hbWVdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkoYXJndW1lbnRzW2ldLCBuYW1lc1tqXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICAgIHJldHVybiB4ICE9IG51bGwgJiYgKHR5cGVvZiB4ID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyk7XG4gIH1cbiAgZnVuY3Rpb24gdG9PYmplY3QoeCkge1xuICAgIGlmICh4ID09IG51bGwpXG4gICAgICB0aHJvdyAkVHlwZUVycm9yKCk7XG4gICAgcmV0dXJuICRPYmplY3QoeCk7XG4gIH1cbiAgZnVuY3Rpb24gY2hlY2tPYmplY3RDb2VyY2libGUoYXJndW1lbnQpIHtcbiAgICBpZiAoYXJndW1lbnQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmFsdWUgY2Fubm90IGJlIGNvbnZlcnRlZCB0byBhbiBPYmplY3QnKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyZ3VtZW50O1xuICB9XG4gIGZ1bmN0aW9uIHNldHVwR2xvYmFscyhnbG9iYWwpIHtcbiAgICBnbG9iYWwuU3ltYm9sID0gU3ltYm9sO1xuICAgIGdsb2JhbC5SZWZsZWN0ID0gZ2xvYmFsLlJlZmxlY3QgfHwge307XG4gICAgZ2xvYmFsLlJlZmxlY3QuZ2xvYmFsID0gZ2xvYmFsLlJlZmxlY3QuZ2xvYmFsIHx8IGdsb2JhbDtcbiAgICBwb2x5ZmlsbE9iamVjdChnbG9iYWwuT2JqZWN0KTtcbiAgfVxuICBzZXR1cEdsb2JhbHMoZ2xvYmFsKTtcbiAgZ2xvYmFsLiR0cmFjZXVyUnVudGltZSA9IHtcbiAgICBjcmVhdGVQcml2YXRlTmFtZTogY3JlYXRlUHJpdmF0ZU5hbWUsXG4gICAgZXhwb3J0U3RhcjogZXhwb3J0U3RhcixcbiAgICBnZXRPd25IYXNoT2JqZWN0OiBnZXRPd25IYXNoT2JqZWN0LFxuICAgIHByaXZhdGVOYW1lczogcHJpdmF0ZU5hbWVzLFxuICAgIHNldFByb3BlcnR5OiBzZXRQcm9wZXJ0eSxcbiAgICBzZXR1cEdsb2JhbHM6IHNldHVwR2xvYmFscyxcbiAgICB0b09iamVjdDogdG9PYmplY3QsXG4gICAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICAgIHRvUHJvcGVydHk6IHRvUHJvcGVydHksXG4gICAgdHlwZTogdHlwZXMsXG4gICAgdHlwZW9mOiB0eXBlT2YsXG4gICAgY2hlY2tPYmplY3RDb2VyY2libGU6IGNoZWNrT2JqZWN0Q29lcmNpYmxlLFxuICAgIGhhc093blByb3BlcnR5OiBmdW5jdGlvbihvLCBwKSB7XG4gICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKTtcbiAgICB9LFxuICAgIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAgIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAgIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAgIGtleXM6ICRrZXlzXG4gIH07XG59KSh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHRoaXMpO1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIGZ1bmN0aW9uIHNwcmVhZCgpIHtcbiAgICB2YXIgcnYgPSBbXSxcbiAgICAgICAgaiA9IDAsXG4gICAgICAgIGl0ZXJSZXN1bHQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZVRvU3ByZWFkID0gJHRyYWNldXJSdW50aW1lLmNoZWNrT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50c1tpXSk7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlVG9TcHJlYWRbJHRyYWNldXJSdW50aW1lLnRvUHJvcGVydHkoU3ltYm9sLml0ZXJhdG9yKV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IHNwcmVhZCBub24taXRlcmFibGUgb2JqZWN0LicpO1xuICAgICAgfVxuICAgICAgdmFyIGl0ZXIgPSB2YWx1ZVRvU3ByZWFkWyR0cmFjZXVyUnVudGltZS50b1Byb3BlcnR5KFN5bWJvbC5pdGVyYXRvcildKCk7XG4gICAgICB3aGlsZSAoIShpdGVyUmVzdWx0ID0gaXRlci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgcnZbaisrXSA9IGl0ZXJSZXN1bHQudmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydjtcbiAgfVxuICAkdHJhY2V1clJ1bnRpbWUuc3ByZWFkID0gc3ByZWFkO1xufSkoKTtcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgJE9iamVjdCA9IE9iamVjdDtcbiAgdmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4gIHZhciAkY3JlYXRlID0gJE9iamVjdC5jcmVhdGU7XG4gIHZhciAkZGVmaW5lUHJvcGVydGllcyA9ICR0cmFjZXVyUnVudGltZS5kZWZpbmVQcm9wZXJ0aWVzO1xuICB2YXIgJGRlZmluZVByb3BlcnR5ID0gJHRyYWNldXJSdW50aW1lLmRlZmluZVByb3BlcnR5O1xuICB2YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9ICR0cmFjZXVyUnVudGltZS5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gIHZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9ICR0cmFjZXVyUnVudGltZS5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICB2YXIgJGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICBmdW5jdGlvbiBzdXBlckRlc2NyaXB0b3IoaG9tZU9iamVjdCwgbmFtZSkge1xuICAgIHZhciBwcm90byA9ICRnZXRQcm90b3R5cGVPZihob21lT2JqZWN0KTtcbiAgICBkbyB7XG4gICAgICB2YXIgcmVzdWx0ID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgbmFtZSk7XG4gICAgICBpZiAocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgcHJvdG8gPSAkZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICAgIH0gd2hpbGUgKHByb3RvKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIHN1cGVyQ2FsbChzZWxmLCBob21lT2JqZWN0LCBuYW1lLCBhcmdzKSB7XG4gICAgcmV0dXJuIHN1cGVyR2V0KHNlbGYsIGhvbWVPYmplY3QsIG5hbWUpLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG4gIGZ1bmN0aW9uIHN1cGVyR2V0KHNlbGYsIGhvbWVPYmplY3QsIG5hbWUpIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHN1cGVyRGVzY3JpcHRvcihob21lT2JqZWN0LCBuYW1lKTtcbiAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgaWYgKCFkZXNjcmlwdG9yLmdldClcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICByZXR1cm4gZGVzY3JpcHRvci5nZXQuY2FsbChzZWxmKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBzdXBlclNldChzZWxmLCBob21lT2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBkZXNjcmlwdG9yID0gc3VwZXJEZXNjcmlwdG9yKGhvbWVPYmplY3QsIG5hbWUpO1xuICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldC5jYWxsKHNlbGYsIHZhbHVlKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgdGhyb3cgJFR5cGVFcnJvcihcInN1cGVyIGhhcyBubyBzZXR0ZXIgJ1wiICsgbmFtZSArIFwiJy5cIik7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRvcnMob2JqZWN0KSB7XG4gICAgdmFyIGRlc2NyaXB0b3JzID0ge30sXG4gICAgICAgIG5hbWUsXG4gICAgICAgIG5hbWVzID0gJGdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgZGVzY3JpcHRvcnNbbmFtZV0gPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgbmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBkZXNjcmlwdG9ycztcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVDbGFzcyhjdG9yLCBvYmplY3QsIHN0YXRpY09iamVjdCwgc3VwZXJDbGFzcykge1xuICAgICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsICdjb25zdHJ1Y3RvcicsIHtcbiAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMykge1xuICAgICAgaWYgKHR5cGVvZiBzdXBlckNsYXNzID09PSAnZnVuY3Rpb24nKVxuICAgICAgICBjdG9yLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG4gICAgICBjdG9yLnByb3RvdHlwZSA9ICRjcmVhdGUoZ2V0UHJvdG9QYXJlbnQoc3VwZXJDbGFzcyksIGdldERlc2NyaXB0b3JzKG9iamVjdCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdG9yLnByb3RvdHlwZSA9IG9iamVjdDtcbiAgICB9XG4gICAgJGRlZmluZVByb3BlcnR5KGN0b3IsICdwcm90b3R5cGUnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgfSk7XG4gICAgcmV0dXJuICRkZWZpbmVQcm9wZXJ0aWVzKGN0b3IsIGdldERlc2NyaXB0b3JzKHN0YXRpY09iamVjdCkpO1xuICB9XG4gIGZ1bmN0aW9uIGdldFByb3RvUGFyZW50KHN1cGVyQ2xhc3MpIHtcbiAgICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciBwcm90b3R5cGUgPSBzdXBlckNsYXNzLnByb3RvdHlwZTtcbiAgICAgIGlmICgkT2JqZWN0KHByb3RvdHlwZSkgPT09IHByb3RvdHlwZSB8fCBwcm90b3R5cGUgPT09IG51bGwpXG4gICAgICAgIHJldHVybiBzdXBlckNsYXNzLnByb3RvdHlwZTtcbiAgICAgIHRocm93IG5ldyAkVHlwZUVycm9yKCdzdXBlciBwcm90b3R5cGUgbXVzdCBiZSBhbiBPYmplY3Qgb3IgbnVsbCcpO1xuICAgIH1cbiAgICBpZiAoc3VwZXJDbGFzcyA9PT0gbnVsbClcbiAgICAgIHJldHVybiBudWxsO1xuICAgIHRocm93IG5ldyAkVHlwZUVycm9yKChcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyArIFwiLlwiKSk7XG4gIH1cbiAgZnVuY3Rpb24gZGVmYXVsdFN1cGVyQ2FsbChzZWxmLCBob21lT2JqZWN0LCBhcmdzKSB7XG4gICAgaWYgKCRnZXRQcm90b3R5cGVPZihob21lT2JqZWN0KSAhPT0gbnVsbClcbiAgICAgIHN1cGVyQ2FsbChzZWxmLCBob21lT2JqZWN0LCAnY29uc3RydWN0b3InLCBhcmdzKTtcbiAgfVxuICAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MgPSBjcmVhdGVDbGFzcztcbiAgJHRyYWNldXJSdW50aW1lLmRlZmF1bHRTdXBlckNhbGwgPSBkZWZhdWx0U3VwZXJDYWxsO1xuICAkdHJhY2V1clJ1bnRpbWUuc3VwZXJDYWxsID0gc3VwZXJDYWxsO1xuICAkdHJhY2V1clJ1bnRpbWUuc3VwZXJHZXQgPSBzdXBlckdldDtcbiAgJHRyYWNldXJSdW50aW1lLnN1cGVyU2V0ID0gc3VwZXJTZXQ7XG59KSgpO1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBjcmVhdGVQcml2YXRlTmFtZSA9ICR0cmFjZXVyUnVudGltZS5jcmVhdGVQcml2YXRlTmFtZTtcbiAgdmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gJHRyYWNldXJSdW50aW1lLmRlZmluZVByb3BlcnRpZXM7XG4gIHZhciAkZGVmaW5lUHJvcGVydHkgPSAkdHJhY2V1clJ1bnRpbWUuZGVmaW5lUHJvcGVydHk7XG4gIHZhciAkY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbiAgdmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4gIGZ1bmN0aW9uIG5vbkVudW0odmFsdWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH07XG4gIH1cbiAgdmFyIFNUX05FV0JPUk4gPSAwO1xuICB2YXIgU1RfRVhFQ1VUSU5HID0gMTtcbiAgdmFyIFNUX1NVU1BFTkRFRCA9IDI7XG4gIHZhciBTVF9DTE9TRUQgPSAzO1xuICB2YXIgRU5EX1NUQVRFID0gLTI7XG4gIHZhciBSRVRIUk9XX1NUQVRFID0gLTM7XG4gIGZ1bmN0aW9uIGdldEludGVybmFsRXJyb3Ioc3RhdGUpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKCdUcmFjZXVyIGNvbXBpbGVyIGJ1ZzogaW52YWxpZCBzdGF0ZSBpbiBzdGF0ZSBtYWNoaW5lOiAnICsgc3RhdGUpO1xuICB9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckNvbnRleHQoKSB7XG4gICAgdGhpcy5zdGF0ZSA9IDA7XG4gICAgdGhpcy5HU3RhdGUgPSBTVF9ORVdCT1JOO1xuICAgIHRoaXMuc3RvcmVkRXhjZXB0aW9uID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZmluYWxseUZhbGxUaHJvdWdoID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2VudF8gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRyeVN0YWNrXyA9IFtdO1xuICB9XG4gIEdlbmVyYXRvckNvbnRleHQucHJvdG90eXBlID0ge1xuICAgIHB1c2hUcnk6IGZ1bmN0aW9uKGNhdGNoU3RhdGUsIGZpbmFsbHlTdGF0ZSkge1xuICAgICAgaWYgKGZpbmFsbHlTdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgZmluYWxseUZhbGxUaHJvdWdoID0gbnVsbDtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5U3RhY2tfLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKHRoaXMudHJ5U3RhY2tfW2ldLmNhdGNoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZpbmFsbHlGYWxsVGhyb3VnaCA9IHRoaXMudHJ5U3RhY2tfW2ldLmNhdGNoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmaW5hbGx5RmFsbFRocm91Z2ggPT09IG51bGwpXG4gICAgICAgICAgZmluYWxseUZhbGxUaHJvdWdoID0gUkVUSFJPV19TVEFURTtcbiAgICAgICAgdGhpcy50cnlTdGFja18ucHVzaCh7XG4gICAgICAgICAgZmluYWxseTogZmluYWxseVN0YXRlLFxuICAgICAgICAgIGZpbmFsbHlGYWxsVGhyb3VnaDogZmluYWxseUZhbGxUaHJvdWdoXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGNhdGNoU3RhdGUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy50cnlTdGFja18ucHVzaCh7Y2F0Y2g6IGNhdGNoU3RhdGV9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHBvcFRyeTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnRyeVN0YWNrXy5wb3AoKTtcbiAgICB9LFxuICAgIGdldCBzZW50KCkge1xuICAgICAgdGhpcy5tYXliZVRocm93KCk7XG4gICAgICByZXR1cm4gdGhpcy5zZW50XztcbiAgICB9LFxuICAgIHNldCBzZW50KHYpIHtcbiAgICAgIHRoaXMuc2VudF8gPSB2O1xuICAgIH0sXG4gICAgZ2V0IHNlbnRJZ25vcmVUaHJvdygpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbnRfO1xuICAgIH0sXG4gICAgbWF5YmVUaHJvdzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5hY3Rpb24gPT09ICd0aHJvdycpIHtcbiAgICAgICAgdGhpcy5hY3Rpb24gPSAnbmV4dCc7XG4gICAgICAgIHRocm93IHRoaXMuc2VudF87XG4gICAgICB9XG4gICAgfSxcbiAgICBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgIGNhc2UgRU5EX1NUQVRFOlxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBjYXNlIFJFVEhST1dfU1RBVEU6XG4gICAgICAgICAgdGhyb3cgdGhpcy5zdG9yZWRFeGNlcHRpb247XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgZ2V0SW50ZXJuYWxFcnJvcih0aGlzLnN0YXRlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGhhbmRsZUV4Y2VwdGlvbjogZnVuY3Rpb24oZXgpIHtcbiAgICAgIHRoaXMuR1N0YXRlID0gU1RfQ0xPU0VEO1xuICAgICAgdGhpcy5zdGF0ZSA9IEVORF9TVEFURTtcbiAgICAgIHRocm93IGV4O1xuICAgIH1cbiAgfTtcbiAgZnVuY3Rpb24gbmV4dE9yVGhyb3coY3R4LCBtb3ZlTmV4dCwgYWN0aW9uLCB4KSB7XG4gICAgc3dpdGNoIChjdHguR1N0YXRlKSB7XG4gICAgICBjYXNlIFNUX0VYRUNVVElORzpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKChcIlxcXCJcIiArIGFjdGlvbiArIFwiXFxcIiBvbiBleGVjdXRpbmcgZ2VuZXJhdG9yXCIpKTtcbiAgICAgIGNhc2UgU1RfQ0xPU0VEOlxuICAgICAgICBpZiAoYWN0aW9uID09ICduZXh0Jykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgeDtcbiAgICAgIGNhc2UgU1RfTkVXQk9STjpcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ3Rocm93Jykge1xuICAgICAgICAgIGN0eC5HU3RhdGUgPSBTVF9DTE9TRUQ7XG4gICAgICAgICAgdGhyb3cgeDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRocm93ICRUeXBlRXJyb3IoJ1NlbnQgdmFsdWUgdG8gbmV3Ym9ybiBnZW5lcmF0b3InKTtcbiAgICAgIGNhc2UgU1RfU1VTUEVOREVEOlxuICAgICAgICBjdHguR1N0YXRlID0gU1RfRVhFQ1VUSU5HO1xuICAgICAgICBjdHguYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICBjdHguc2VudCA9IHg7XG4gICAgICAgIHZhciB2YWx1ZSA9IG1vdmVOZXh0KGN0eCk7XG4gICAgICAgIHZhciBkb25lID0gdmFsdWUgPT09IGN0eDtcbiAgICAgICAgaWYgKGRvbmUpXG4gICAgICAgICAgdmFsdWUgPSBjdHgucmV0dXJuVmFsdWU7XG4gICAgICAgIGN0eC5HU3RhdGUgPSBkb25lID8gU1RfQ0xPU0VEIDogU1RfU1VTUEVOREVEO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICBkb25lOiBkb25lXG4gICAgICAgIH07XG4gICAgfVxuICB9XG4gIHZhciBjdHhOYW1lID0gY3JlYXRlUHJpdmF0ZU5hbWUoKTtcbiAgdmFyIG1vdmVOZXh0TmFtZSA9IGNyZWF0ZVByaXZhdGVOYW1lKCk7XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgJGRlZmluZVByb3BlcnR5KEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCAnY29uc3RydWN0b3InLCBub25FbnVtKEdlbmVyYXRvckZ1bmN0aW9uKSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgbmV4dDogZnVuY3Rpb24odikge1xuICAgICAgcmV0dXJuIG5leHRPclRocm93KHRoaXNbY3R4TmFtZV0sIHRoaXNbbW92ZU5leHROYW1lXSwgJ25leHQnLCB2KTtcbiAgICB9LFxuICAgIHRocm93OiBmdW5jdGlvbih2KSB7XG4gICAgICByZXR1cm4gbmV4dE9yVGhyb3codGhpc1tjdHhOYW1lXSwgdGhpc1ttb3ZlTmV4dE5hbWVdLCAndGhyb3cnLCB2KTtcbiAgICB9XG4gIH07XG4gICRkZWZpbmVQcm9wZXJ0aWVzKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7ZW51bWVyYWJsZTogZmFsc2V9LFxuICAgIG5leHQ6IHtlbnVtZXJhYmxlOiBmYWxzZX0sXG4gICAgdGhyb3c6IHtlbnVtZXJhYmxlOiBmYWxzZX1cbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUsIFN5bWJvbC5pdGVyYXRvciwgbm9uRW51bShmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSkpO1xuICBmdW5jdGlvbiBjcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShpbm5lckZ1bmN0aW9uLCBmdW5jdGlvbk9iamVjdCwgc2VsZikge1xuICAgIHZhciBtb3ZlTmV4dCA9IGdldE1vdmVOZXh0KGlubmVyRnVuY3Rpb24sIHNlbGYpO1xuICAgIHZhciBjdHggPSBuZXcgR2VuZXJhdG9yQ29udGV4dCgpO1xuICAgIHZhciBvYmplY3QgPSAkY3JlYXRlKGZ1bmN0aW9uT2JqZWN0LnByb3RvdHlwZSk7XG4gICAgb2JqZWN0W2N0eE5hbWVdID0gY3R4O1xuICAgIG9iamVjdFttb3ZlTmV4dE5hbWVdID0gbW92ZU5leHQ7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBpbml0R2VuZXJhdG9yRnVuY3Rpb24oZnVuY3Rpb25PYmplY3QpIHtcbiAgICBmdW5jdGlvbk9iamVjdC5wcm90b3R5cGUgPSAkY3JlYXRlKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSk7XG4gICAgZnVuY3Rpb25PYmplY3QuX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgcmV0dXJuIGZ1bmN0aW9uT2JqZWN0O1xuICB9XG4gIGZ1bmN0aW9uIEFzeW5jRnVuY3Rpb25Db250ZXh0KCkge1xuICAgIEdlbmVyYXRvckNvbnRleHQuY2FsbCh0aGlzKTtcbiAgICB0aGlzLmVyciA9IHVuZGVmaW5lZDtcbiAgICB2YXIgY3R4ID0gdGhpcztcbiAgICBjdHgucmVzdWx0ID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBjdHgucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICBjdHgucmVqZWN0ID0gcmVqZWN0O1xuICAgIH0pO1xuICB9XG4gIEFzeW5jRnVuY3Rpb25Db250ZXh0LnByb3RvdHlwZSA9ICRjcmVhdGUoR2VuZXJhdG9yQ29udGV4dC5wcm90b3R5cGUpO1xuICBBc3luY0Z1bmN0aW9uQ29udGV4dC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICBjYXNlIEVORF9TVEFURTpcbiAgICAgICAgdGhpcy5yZXNvbHZlKHRoaXMucmV0dXJuVmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUkVUSFJPV19TVEFURTpcbiAgICAgICAgdGhpcy5yZWplY3QodGhpcy5zdG9yZWRFeGNlcHRpb24pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMucmVqZWN0KGdldEludGVybmFsRXJyb3IodGhpcy5zdGF0ZSkpO1xuICAgIH1cbiAgfTtcbiAgQXN5bmNGdW5jdGlvbkNvbnRleHQucHJvdG90eXBlLmhhbmRsZUV4Y2VwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3RhdGUgPSBSRVRIUk9XX1NUQVRFO1xuICB9O1xuICBmdW5jdGlvbiBhc3luY1dyYXAoaW5uZXJGdW5jdGlvbiwgc2VsZikge1xuICAgIHZhciBtb3ZlTmV4dCA9IGdldE1vdmVOZXh0KGlubmVyRnVuY3Rpb24sIHNlbGYpO1xuICAgIHZhciBjdHggPSBuZXcgQXN5bmNGdW5jdGlvbkNvbnRleHQoKTtcbiAgICBjdHguY3JlYXRlQ2FsbGJhY2sgPSBmdW5jdGlvbihuZXdTdGF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGN0eC5zdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICBjdHgudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgbW92ZU5leHQoY3R4KTtcbiAgICAgIH07XG4gICAgfTtcbiAgICBjdHguZXJyYmFjayA9IGZ1bmN0aW9uKGVycikge1xuICAgICAgaGFuZGxlQ2F0Y2goY3R4LCBlcnIpO1xuICAgICAgbW92ZU5leHQoY3R4KTtcbiAgICB9O1xuICAgIG1vdmVOZXh0KGN0eCk7XG4gICAgcmV0dXJuIGN0eC5yZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0TW92ZU5leHQoaW5uZXJGdW5jdGlvbiwgc2VsZikge1xuICAgIHJldHVybiBmdW5jdGlvbihjdHgpIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGlubmVyRnVuY3Rpb24uY2FsbChzZWxmLCBjdHgpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGhhbmRsZUNhdGNoKGN0eCwgZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVDYXRjaChjdHgsIGV4KSB7XG4gICAgY3R4LnN0b3JlZEV4Y2VwdGlvbiA9IGV4O1xuICAgIHZhciBsYXN0ID0gY3R4LnRyeVN0YWNrX1tjdHgudHJ5U3RhY2tfLmxlbmd0aCAtIDFdO1xuICAgIGlmICghbGFzdCkge1xuICAgICAgY3R4LmhhbmRsZUV4Y2VwdGlvbihleCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGN0eC5zdGF0ZSA9IGxhc3QuY2F0Y2ggIT09IHVuZGVmaW5lZCA/IGxhc3QuY2F0Y2ggOiBsYXN0LmZpbmFsbHk7XG4gICAgaWYgKGxhc3QuZmluYWxseUZhbGxUaHJvdWdoICE9PSB1bmRlZmluZWQpXG4gICAgICBjdHguZmluYWxseUZhbGxUaHJvdWdoID0gbGFzdC5maW5hbGx5RmFsbFRocm91Z2g7XG4gIH1cbiAgJHRyYWNldXJSdW50aW1lLmFzeW5jV3JhcCA9IGFzeW5jV3JhcDtcbiAgJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbiA9IGluaXRHZW5lcmF0b3JGdW5jdGlvbjtcbiAgJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlID0gY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2U7XG59KSgpO1xuKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBidWlsZEZyb21FbmNvZGVkUGFydHMob3B0X3NjaGVtZSwgb3B0X3VzZXJJbmZvLCBvcHRfZG9tYWluLCBvcHRfcG9ydCwgb3B0X3BhdGgsIG9wdF9xdWVyeURhdGEsIG9wdF9mcmFnbWVudCkge1xuICAgIHZhciBvdXQgPSBbXTtcbiAgICBpZiAob3B0X3NjaGVtZSkge1xuICAgICAgb3V0LnB1c2gob3B0X3NjaGVtZSwgJzonKTtcbiAgICB9XG4gICAgaWYgKG9wdF9kb21haW4pIHtcbiAgICAgIG91dC5wdXNoKCcvLycpO1xuICAgICAgaWYgKG9wdF91c2VySW5mbykge1xuICAgICAgICBvdXQucHVzaChvcHRfdXNlckluZm8sICdAJyk7XG4gICAgICB9XG4gICAgICBvdXQucHVzaChvcHRfZG9tYWluKTtcbiAgICAgIGlmIChvcHRfcG9ydCkge1xuICAgICAgICBvdXQucHVzaCgnOicsIG9wdF9wb3J0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdF9wYXRoKSB7XG4gICAgICBvdXQucHVzaChvcHRfcGF0aCk7XG4gICAgfVxuICAgIGlmIChvcHRfcXVlcnlEYXRhKSB7XG4gICAgICBvdXQucHVzaCgnPycsIG9wdF9xdWVyeURhdGEpO1xuICAgIH1cbiAgICBpZiAob3B0X2ZyYWdtZW50KSB7XG4gICAgICBvdXQucHVzaCgnIycsIG9wdF9mcmFnbWVudCk7XG4gICAgfVxuICAgIHJldHVybiBvdXQuam9pbignJyk7XG4gIH1cbiAgO1xuICB2YXIgc3BsaXRSZSA9IG5ldyBSZWdFeHAoJ14nICsgJyg/OicgKyAnKFteOi8/Iy5dKyknICsgJzopPycgKyAnKD86Ly8nICsgJyg/OihbXi8/I10qKUApPycgKyAnKFtcXFxcd1xcXFxkXFxcXC1cXFxcdTAxMDAtXFxcXHVmZmZmLiVdKiknICsgJyg/OjooWzAtOV0rKSk/JyArICcpPycgKyAnKFtePyNdKyk/JyArICcoPzpcXFxcPyhbXiNdKikpPycgKyAnKD86IyguKikpPycgKyAnJCcpO1xuICB2YXIgQ29tcG9uZW50SW5kZXggPSB7XG4gICAgU0NIRU1FOiAxLFxuICAgIFVTRVJfSU5GTzogMixcbiAgICBET01BSU46IDMsXG4gICAgUE9SVDogNCxcbiAgICBQQVRIOiA1LFxuICAgIFFVRVJZX0RBVEE6IDYsXG4gICAgRlJBR01FTlQ6IDdcbiAgfTtcbiAgZnVuY3Rpb24gc3BsaXQodXJpKSB7XG4gICAgcmV0dXJuICh1cmkubWF0Y2goc3BsaXRSZSkpO1xuICB9XG4gIGZ1bmN0aW9uIHJlbW92ZURvdFNlZ21lbnRzKHBhdGgpIHtcbiAgICBpZiAocGF0aCA9PT0gJy8nKVxuICAgICAgcmV0dXJuICcvJztcbiAgICB2YXIgbGVhZGluZ1NsYXNoID0gcGF0aFswXSA9PT0gJy8nID8gJy8nIDogJyc7XG4gICAgdmFyIHRyYWlsaW5nU2xhc2ggPSBwYXRoLnNsaWNlKC0xKSA9PT0gJy8nID8gJy8nIDogJyc7XG4gICAgdmFyIHNlZ21lbnRzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgIHZhciBvdXQgPSBbXTtcbiAgICB2YXIgdXAgPSAwO1xuICAgIGZvciAodmFyIHBvcyA9IDA7IHBvcyA8IHNlZ21lbnRzLmxlbmd0aDsgcG9zKyspIHtcbiAgICAgIHZhciBzZWdtZW50ID0gc2VnbWVudHNbcG9zXTtcbiAgICAgIHN3aXRjaCAoc2VnbWVudCkge1xuICAgICAgICBjYXNlICcnOlxuICAgICAgICBjYXNlICcuJzpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnLi4nOlxuICAgICAgICAgIGlmIChvdXQubGVuZ3RoKVxuICAgICAgICAgICAgb3V0LnBvcCgpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHVwKys7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgb3V0LnB1c2goc2VnbWVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghbGVhZGluZ1NsYXNoKSB7XG4gICAgICB3aGlsZSAodXAtLSA+IDApIHtcbiAgICAgICAgb3V0LnVuc2hpZnQoJy4uJyk7XG4gICAgICB9XG4gICAgICBpZiAob3V0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgb3V0LnB1c2goJy4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlYWRpbmdTbGFzaCArIG91dC5qb2luKCcvJykgKyB0cmFpbGluZ1NsYXNoO1xuICB9XG4gIGZ1bmN0aW9uIGpvaW5BbmRDYW5vbmljYWxpemVQYXRoKHBhcnRzKSB7XG4gICAgdmFyIHBhdGggPSBwYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXSB8fCAnJztcbiAgICBwYXRoID0gcmVtb3ZlRG90U2VnbWVudHMocGF0aCk7XG4gICAgcGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF0gPSBwYXRoO1xuICAgIHJldHVybiBidWlsZEZyb21FbmNvZGVkUGFydHMocGFydHNbQ29tcG9uZW50SW5kZXguU0NIRU1FXSwgcGFydHNbQ29tcG9uZW50SW5kZXguVVNFUl9JTkZPXSwgcGFydHNbQ29tcG9uZW50SW5kZXguRE9NQUlOXSwgcGFydHNbQ29tcG9uZW50SW5kZXguUE9SVF0sIHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdLCBwYXJ0c1tDb21wb25lbnRJbmRleC5RVUVSWV9EQVRBXSwgcGFydHNbQ29tcG9uZW50SW5kZXguRlJBR01FTlRdKTtcbiAgfVxuICBmdW5jdGlvbiBjYW5vbmljYWxpemVVcmwodXJsKSB7XG4gICAgdmFyIHBhcnRzID0gc3BsaXQodXJsKTtcbiAgICByZXR1cm4gam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpO1xuICB9XG4gIGZ1bmN0aW9uIHJlc29sdmVVcmwoYmFzZSwgdXJsKSB7XG4gICAgdmFyIHBhcnRzID0gc3BsaXQodXJsKTtcbiAgICB2YXIgYmFzZVBhcnRzID0gc3BsaXQoYmFzZSk7XG4gICAgaWYgKHBhcnRzW0NvbXBvbmVudEluZGV4LlNDSEVNRV0pIHtcbiAgICAgIHJldHVybiBqb2luQW5kQ2Fub25pY2FsaXplUGF0aChwYXJ0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRzW0NvbXBvbmVudEluZGV4LlNDSEVNRV0gPSBiYXNlUGFydHNbQ29tcG9uZW50SW5kZXguU0NIRU1FXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IENvbXBvbmVudEluZGV4LlNDSEVNRTsgaSA8PSBDb21wb25lbnRJbmRleC5QT1JUOyBpKyspIHtcbiAgICAgIGlmICghcGFydHNbaV0pIHtcbiAgICAgICAgcGFydHNbaV0gPSBiYXNlUGFydHNbaV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXVswXSA9PSAnLycpIHtcbiAgICAgIHJldHVybiBqb2luQW5kQ2Fub25pY2FsaXplUGF0aChwYXJ0cyk7XG4gICAgfVxuICAgIHZhciBwYXRoID0gYmFzZVBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdO1xuICAgIHZhciBpbmRleCA9IHBhdGgubGFzdEluZGV4T2YoJy8nKTtcbiAgICBwYXRoID0gcGF0aC5zbGljZSgwLCBpbmRleCArIDEpICsgcGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF07XG4gICAgcGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF0gPSBwYXRoO1xuICAgIHJldHVybiBqb2luQW5kQ2Fub25pY2FsaXplUGF0aChwYXJ0cyk7XG4gIH1cbiAgZnVuY3Rpb24gaXNBYnNvbHV0ZShuYW1lKSB7XG4gICAgaWYgKCFuYW1lKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChuYW1lWzBdID09PSAnLycpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB2YXIgcGFydHMgPSBzcGxpdChuYW1lKTtcbiAgICBpZiAocGFydHNbQ29tcG9uZW50SW5kZXguU0NIRU1FXSlcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAkdHJhY2V1clJ1bnRpbWUuY2Fub25pY2FsaXplVXJsID0gY2Fub25pY2FsaXplVXJsO1xuICAkdHJhY2V1clJ1bnRpbWUuaXNBYnNvbHV0ZSA9IGlzQWJzb2x1dGU7XG4gICR0cmFjZXVyUnVudGltZS5yZW1vdmVEb3RTZWdtZW50cyA9IHJlbW92ZURvdFNlZ21lbnRzO1xuICAkdHJhY2V1clJ1bnRpbWUucmVzb2x2ZVVybCA9IHJlc29sdmVVcmw7XG59KSgpO1xuKGZ1bmN0aW9uKGdsb2JhbCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciAkX18yID0gJHRyYWNldXJSdW50aW1lLFxuICAgICAgY2Fub25pY2FsaXplVXJsID0gJF9fMi5jYW5vbmljYWxpemVVcmwsXG4gICAgICByZXNvbHZlVXJsID0gJF9fMi5yZXNvbHZlVXJsLFxuICAgICAgaXNBYnNvbHV0ZSA9ICRfXzIuaXNBYnNvbHV0ZTtcbiAgdmFyIG1vZHVsZUluc3RhbnRpYXRvcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgYmFzZVVSTDtcbiAgaWYgKGdsb2JhbC5sb2NhdGlvbiAmJiBnbG9iYWwubG9jYXRpb24uaHJlZilcbiAgICBiYXNlVVJMID0gcmVzb2x2ZVVybChnbG9iYWwubG9jYXRpb24uaHJlZiwgJy4vJyk7XG4gIGVsc2VcbiAgICBiYXNlVVJMID0gJyc7XG4gIHZhciBVbmNvYXRlZE1vZHVsZUVudHJ5ID0gZnVuY3Rpb24gVW5jb2F0ZWRNb2R1bGVFbnRyeSh1cmwsIHVuY29hdGVkTW9kdWxlKSB7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy52YWx1ZV8gPSB1bmNvYXRlZE1vZHVsZTtcbiAgfTtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoVW5jb2F0ZWRNb2R1bGVFbnRyeSwge30sIHt9KTtcbiAgdmFyIE1vZHVsZUV2YWx1YXRpb25FcnJvciA9IGZ1bmN0aW9uIE1vZHVsZUV2YWx1YXRpb25FcnJvcihlcnJvbmVvdXNNb2R1bGVOYW1lLCBjYXVzZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZSArICc6ICcgKyB0aGlzLnN0cmlwQ2F1c2UoY2F1c2UpICsgJyBpbiAnICsgZXJyb25lb3VzTW9kdWxlTmFtZTtcbiAgICBpZiAoIShjYXVzZSBpbnN0YW5jZW9mICRNb2R1bGVFdmFsdWF0aW9uRXJyb3IpICYmIGNhdXNlLnN0YWNrKVxuICAgICAgdGhpcy5zdGFjayA9IHRoaXMuc3RyaXBTdGFjayhjYXVzZS5zdGFjayk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5zdGFjayA9ICcnO1xuICB9O1xuICB2YXIgJE1vZHVsZUV2YWx1YXRpb25FcnJvciA9IE1vZHVsZUV2YWx1YXRpb25FcnJvcjtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoTW9kdWxlRXZhbHVhdGlvbkVycm9yLCB7XG4gICAgc3RyaXBFcnJvcjogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UucmVwbGFjZSgvLipFcnJvcjovLCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnOicpO1xuICAgIH0sXG4gICAgc3RyaXBDYXVzZTogZnVuY3Rpb24oY2F1c2UpIHtcbiAgICAgIGlmICghY2F1c2UpXG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIGlmICghY2F1c2UubWVzc2FnZSlcbiAgICAgICAgcmV0dXJuIGNhdXNlICsgJyc7XG4gICAgICByZXR1cm4gdGhpcy5zdHJpcEVycm9yKGNhdXNlLm1lc3NhZ2UpO1xuICAgIH0sXG4gICAgbG9hZGVkQnk6IGZ1bmN0aW9uKG1vZHVsZU5hbWUpIHtcbiAgICAgIHRoaXMuc3RhY2sgKz0gJ1xcbiBsb2FkZWQgYnkgJyArIG1vZHVsZU5hbWU7XG4gICAgfSxcbiAgICBzdHJpcFN0YWNrOiBmdW5jdGlvbihjYXVzZVN0YWNrKSB7XG4gICAgICB2YXIgc3RhY2sgPSBbXTtcbiAgICAgIGNhdXNlU3RhY2suc3BsaXQoJ1xcbicpLnNvbWUoKGZ1bmN0aW9uKGZyYW1lKSB7XG4gICAgICAgIGlmICgvVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IvLnRlc3QoZnJhbWUpKVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBzdGFjay5wdXNoKGZyYW1lKTtcbiAgICAgIH0pKTtcbiAgICAgIHN0YWNrWzBdID0gdGhpcy5zdHJpcEVycm9yKHN0YWNrWzBdKTtcbiAgICAgIHJldHVybiBzdGFjay5qb2luKCdcXG4nKTtcbiAgICB9XG4gIH0sIHt9LCBFcnJvcik7XG4gIHZhciBVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvciA9IGZ1bmN0aW9uIFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKHVybCwgZnVuYykge1xuICAgICR0cmFjZXVyUnVudGltZS5zdXBlckNhbGwodGhpcywgJFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yLnByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCBbdXJsLCBudWxsXSk7XG4gICAgdGhpcy5mdW5jID0gZnVuYztcbiAgfTtcbiAgdmFyICRVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvciA9IFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yO1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvciwge2dldFVuY29hdGVkTW9kdWxlOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlXylcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVfID0gdGhpcy5mdW5jLmNhbGwoZ2xvYmFsKTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGlmIChleCBpbnN0YW5jZW9mIE1vZHVsZUV2YWx1YXRpb25FcnJvcikge1xuICAgICAgICAgIGV4LmxvYWRlZEJ5KHRoaXMudXJsKTtcbiAgICAgICAgICB0aHJvdyBleDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgTW9kdWxlRXZhbHVhdGlvbkVycm9yKHRoaXMudXJsLCBleCk7XG4gICAgICB9XG4gICAgfX0sIHt9LCBVbmNvYXRlZE1vZHVsZUVudHJ5KTtcbiAgZnVuY3Rpb24gZ2V0VW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IobmFtZSkge1xuICAgIGlmICghbmFtZSlcbiAgICAgIHJldHVybjtcbiAgICB2YXIgdXJsID0gTW9kdWxlU3RvcmUubm9ybWFsaXplKG5hbWUpO1xuICAgIHJldHVybiBtb2R1bGVJbnN0YW50aWF0b3JzW3VybF07XG4gIH1cbiAgO1xuICB2YXIgbW9kdWxlSW5zdGFuY2VzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdmFyIGxpdmVNb2R1bGVTZW50aW5lbCA9IHt9O1xuICBmdW5jdGlvbiBNb2R1bGUodW5jb2F0ZWRNb2R1bGUpIHtcbiAgICB2YXIgaXNMaXZlID0gYXJndW1lbnRzWzFdO1xuICAgIHZhciBjb2F0ZWRNb2R1bGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHVuY29hdGVkTW9kdWxlKS5mb3JFYWNoKChmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgZ2V0dGVyLFxuICAgICAgICAgIHZhbHVlO1xuICAgICAgaWYgKGlzTGl2ZSA9PT0gbGl2ZU1vZHVsZVNlbnRpbmVsKSB7XG4gICAgICAgIHZhciBkZXNjciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodW5jb2F0ZWRNb2R1bGUsIG5hbWUpO1xuICAgICAgICBpZiAoZGVzY3IuZ2V0KVxuICAgICAgICAgIGdldHRlciA9IGRlc2NyLmdldDtcbiAgICAgIH1cbiAgICAgIGlmICghZ2V0dGVyKSB7XG4gICAgICAgIHZhbHVlID0gdW5jb2F0ZWRNb2R1bGVbbmFtZV07XG4gICAgICAgIGdldHRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb2F0ZWRNb2R1bGUsIG5hbWUsIHtcbiAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBPYmplY3QucHJldmVudEV4dGVuc2lvbnMoY29hdGVkTW9kdWxlKTtcbiAgICByZXR1cm4gY29hdGVkTW9kdWxlO1xuICB9XG4gIHZhciBNb2R1bGVTdG9yZSA9IHtcbiAgICBub3JtYWxpemU6IGZ1bmN0aW9uKG5hbWUsIHJlZmVyZXJOYW1lLCByZWZlcmVyQWRkcmVzcykge1xuICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwibW9kdWxlIG5hbWUgbXVzdCBiZSBhIHN0cmluZywgbm90IFwiICsgdHlwZW9mIG5hbWUpO1xuICAgICAgaWYgKGlzQWJzb2x1dGUobmFtZSkpXG4gICAgICAgIHJldHVybiBjYW5vbmljYWxpemVVcmwobmFtZSk7XG4gICAgICBpZiAoL1teXFwuXVxcL1xcLlxcLlxcLy8udGVzdChuYW1lKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21vZHVsZSBuYW1lIGVtYmVkcyAvLi4vOiAnICsgbmFtZSk7XG4gICAgICB9XG4gICAgICBpZiAobmFtZVswXSA9PT0gJy4nICYmIHJlZmVyZXJOYW1lKVxuICAgICAgICByZXR1cm4gcmVzb2x2ZVVybChyZWZlcmVyTmFtZSwgbmFtZSk7XG4gICAgICByZXR1cm4gY2Fub25pY2FsaXplVXJsKG5hbWUpO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihub3JtYWxpemVkTmFtZSkge1xuICAgICAgdmFyIG0gPSBnZXRVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcihub3JtYWxpemVkTmFtZSk7XG4gICAgICBpZiAoIW0pXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB2YXIgbW9kdWxlSW5zdGFuY2UgPSBtb2R1bGVJbnN0YW5jZXNbbS51cmxdO1xuICAgICAgaWYgKG1vZHVsZUluc3RhbmNlKVxuICAgICAgICByZXR1cm4gbW9kdWxlSW5zdGFuY2U7XG4gICAgICBtb2R1bGVJbnN0YW5jZSA9IE1vZHVsZShtLmdldFVuY29hdGVkTW9kdWxlKCksIGxpdmVNb2R1bGVTZW50aW5lbCk7XG4gICAgICByZXR1cm4gbW9kdWxlSW5zdGFuY2VzW20udXJsXSA9IG1vZHVsZUluc3RhbmNlO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihub3JtYWxpemVkTmFtZSwgbW9kdWxlKSB7XG4gICAgICBub3JtYWxpemVkTmFtZSA9IFN0cmluZyhub3JtYWxpemVkTmFtZSk7XG4gICAgICBtb2R1bGVJbnN0YW50aWF0b3JzW25vcm1hbGl6ZWROYW1lXSA9IG5ldyBVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcihub3JtYWxpemVkTmFtZSwgKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbW9kdWxlO1xuICAgICAgfSkpO1xuICAgICAgbW9kdWxlSW5zdGFuY2VzW25vcm1hbGl6ZWROYW1lXSA9IG1vZHVsZTtcbiAgICB9LFxuICAgIGdldCBiYXNlVVJMKCkge1xuICAgICAgcmV0dXJuIGJhc2VVUkw7XG4gICAgfSxcbiAgICBzZXQgYmFzZVVSTCh2KSB7XG4gICAgICBiYXNlVVJMID0gU3RyaW5nKHYpO1xuICAgIH0sXG4gICAgcmVnaXN0ZXJNb2R1bGU6IGZ1bmN0aW9uKG5hbWUsIGZ1bmMpIHtcbiAgICAgIHZhciBub3JtYWxpemVkTmFtZSA9IE1vZHVsZVN0b3JlLm5vcm1hbGl6ZShuYW1lKTtcbiAgICAgIGlmIChtb2R1bGVJbnN0YW50aWF0b3JzW25vcm1hbGl6ZWROYW1lXSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkdXBsaWNhdGUgbW9kdWxlIG5hbWVkICcgKyBub3JtYWxpemVkTmFtZSk7XG4gICAgICBtb2R1bGVJbnN0YW50aWF0b3JzW25vcm1hbGl6ZWROYW1lXSA9IG5ldyBVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcihub3JtYWxpemVkTmFtZSwgZnVuYyk7XG4gICAgfSxcbiAgICBidW5kbGVTdG9yZTogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICByZWdpc3RlcjogZnVuY3Rpb24obmFtZSwgZGVwcywgZnVuYykge1xuICAgICAgaWYgKCFkZXBzIHx8ICFkZXBzLmxlbmd0aCAmJiAhZnVuYy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5yZWdpc3Rlck1vZHVsZShuYW1lLCBmdW5jKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYnVuZGxlU3RvcmVbbmFtZV0gPSB7XG4gICAgICAgICAgZGVwczogZGVwcyxcbiAgICAgICAgICBleGVjdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciAkX18wID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgdmFyIGRlcE1hcCA9IHt9O1xuICAgICAgICAgICAgZGVwcy5mb3JFYWNoKChmdW5jdGlvbihkZXAsIGluZGV4KSB7XG4gICAgICAgICAgICAgIHJldHVybiBkZXBNYXBbZGVwXSA9ICRfXzBbaW5kZXhdO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdmFyIHJlZ2lzdHJ5RW50cnkgPSBmdW5jLmNhbGwodGhpcywgZGVwTWFwKTtcbiAgICAgICAgICAgIHJlZ2lzdHJ5RW50cnkuZXhlY3V0ZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlZ2lzdHJ5RW50cnkuZXhwb3J0cztcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRBbm9ueW1vdXNNb2R1bGU6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgIHJldHVybiBuZXcgTW9kdWxlKGZ1bmMuY2FsbChnbG9iYWwpLCBsaXZlTW9kdWxlU2VudGluZWwpO1xuICAgIH0sXG4gICAgZ2V0Rm9yVGVzdGluZzogZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgaWYgKCF0aGlzLnRlc3RpbmdQcmVmaXhfKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKG1vZHVsZUluc3RhbmNlcykuc29tZSgoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgdmFyIG0gPSAvKHRyYWNldXJAW15cXC9dKlxcLykvLmV4ZWMoa2V5KTtcbiAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgJF9fMC50ZXN0aW5nUHJlZml4XyA9IG1bMV07XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmdldCh0aGlzLnRlc3RpbmdQcmVmaXhfICsgbmFtZSk7XG4gICAgfVxuICB9O1xuICBNb2R1bGVTdG9yZS5zZXQoJ0B0cmFjZXVyL3NyYy9ydW50aW1lL01vZHVsZVN0b3JlJywgbmV3IE1vZHVsZSh7TW9kdWxlU3RvcmU6IE1vZHVsZVN0b3JlfSkpO1xuICB2YXIgc2V0dXBHbG9iYWxzID0gJHRyYWNldXJSdW50aW1lLnNldHVwR2xvYmFscztcbiAgJHRyYWNldXJSdW50aW1lLnNldHVwR2xvYmFscyA9IGZ1bmN0aW9uKGdsb2JhbCkge1xuICAgIHNldHVwR2xvYmFscyhnbG9iYWwpO1xuICB9O1xuICAkdHJhY2V1clJ1bnRpbWUuTW9kdWxlU3RvcmUgPSBNb2R1bGVTdG9yZTtcbiAgZ2xvYmFsLlN5c3RlbSA9IHtcbiAgICByZWdpc3RlcjogTW9kdWxlU3RvcmUucmVnaXN0ZXIuYmluZChNb2R1bGVTdG9yZSksXG4gICAgZ2V0OiBNb2R1bGVTdG9yZS5nZXQsXG4gICAgc2V0OiBNb2R1bGVTdG9yZS5zZXQsXG4gICAgbm9ybWFsaXplOiBNb2R1bGVTdG9yZS5ub3JtYWxpemVcbiAgfTtcbiAgJHRyYWNldXJSdW50aW1lLmdldE1vZHVsZUltcGwgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGluc3RhbnRpYXRvciA9IGdldFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKG5hbWUpO1xuICAgIHJldHVybiBpbnN0YW50aWF0b3IgJiYgaW5zdGFudGlhdG9yLmdldFVuY29hdGVkTW9kdWxlKCk7XG4gIH07XG59KSh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHRoaXMpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIjtcbiAgdmFyICRjZWlsID0gTWF0aC5jZWlsO1xuICB2YXIgJGZsb29yID0gTWF0aC5mbG9vcjtcbiAgdmFyICRpc0Zpbml0ZSA9IGlzRmluaXRlO1xuICB2YXIgJGlzTmFOID0gaXNOYU47XG4gIHZhciAkcG93ID0gTWF0aC5wb3c7XG4gIHZhciAkbWluID0gTWF0aC5taW47XG4gIHZhciB0b09iamVjdCA9ICR0cmFjZXVyUnVudGltZS50b09iamVjdDtcbiAgZnVuY3Rpb24gdG9VaW50MzIoeCkge1xuICAgIHJldHVybiB4ID4+PiAwO1xuICB9XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4geCAmJiAodHlwZW9mIHggPT09ICdvYmplY3QnIHx8IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nKTtcbiAgfVxuICBmdW5jdGlvbiBpc0NhbGxhYmxlKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG4gIH1cbiAgZnVuY3Rpb24gaXNOdW1iZXIoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ251bWJlcic7XG4gIH1cbiAgZnVuY3Rpb24gdG9JbnRlZ2VyKHgpIHtcbiAgICB4ID0gK3g7XG4gICAgaWYgKCRpc05hTih4KSlcbiAgICAgIHJldHVybiAwO1xuICAgIGlmICh4ID09PSAwIHx8ICEkaXNGaW5pdGUoeCkpXG4gICAgICByZXR1cm4geDtcbiAgICByZXR1cm4geCA+IDAgPyAkZmxvb3IoeCkgOiAkY2VpbCh4KTtcbiAgfVxuICB2YXIgTUFYX1NBRkVfTEVOR1RIID0gJHBvdygyLCA1MykgLSAxO1xuICBmdW5jdGlvbiB0b0xlbmd0aCh4KSB7XG4gICAgdmFyIGxlbiA9IHRvSW50ZWdlcih4KTtcbiAgICByZXR1cm4gbGVuIDwgMCA/IDAgOiAkbWluKGxlbiwgTUFYX1NBRkVfTEVOR1RIKTtcbiAgfVxuICBmdW5jdGlvbiBjaGVja0l0ZXJhYmxlKHgpIHtcbiAgICByZXR1cm4gIWlzT2JqZWN0KHgpID8gdW5kZWZpbmVkIDogeFtTeW1ib2wuaXRlcmF0b3JdO1xuICB9XG4gIGZ1bmN0aW9uIGlzQ29uc3RydWN0b3IoeCkge1xuICAgIHJldHVybiBpc0NhbGxhYmxlKHgpO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHZhbHVlLCBkb25lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGRvbmU6IGRvbmVcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlRGVmaW5lKG9iamVjdCwgbmFtZSwgZGVzY3IpIHtcbiAgICBpZiAoIShuYW1lIGluIG9iamVjdCkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIGRlc2NyKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVEZWZpbmVNZXRob2Qob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICAgIG1heWJlRGVmaW5lKG9iamVjdCwgbmFtZSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlRGVmaW5lQ29uc3Qob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuICAgIG1heWJlRGVmaW5lKG9iamVjdCwgbmFtZSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVBZGRGdW5jdGlvbnMob2JqZWN0LCBmdW5jdGlvbnMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmN0aW9ucy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgdmFyIG5hbWUgPSBmdW5jdGlvbnNbaV07XG4gICAgICB2YXIgdmFsdWUgPSBmdW5jdGlvbnNbaSArIDFdO1xuICAgICAgbWF5YmVEZWZpbmVNZXRob2Qob2JqZWN0LCBuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1heWJlQWRkQ29uc3RzKG9iamVjdCwgY29uc3RzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25zdHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIHZhciBuYW1lID0gY29uc3RzW2ldO1xuICAgICAgdmFyIHZhbHVlID0gY29uc3RzW2kgKyAxXTtcbiAgICAgIG1heWJlRGVmaW5lQ29uc3Qob2JqZWN0LCBuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1heWJlQWRkSXRlcmF0b3Iob2JqZWN0LCBmdW5jLCBTeW1ib2wpIHtcbiAgICBpZiAoIVN5bWJvbCB8fCAhU3ltYm9sLml0ZXJhdG9yIHx8IG9iamVjdFtTeW1ib2wuaXRlcmF0b3JdKVxuICAgICAgcmV0dXJuO1xuICAgIGlmIChvYmplY3RbJ0BAaXRlcmF0b3InXSlcbiAgICAgIGZ1bmMgPSBvYmplY3RbJ0BAaXRlcmF0b3InXTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBTeW1ib2wuaXRlcmF0b3IsIHtcbiAgICAgIHZhbHVlOiBmdW5jLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIHZhciBwb2x5ZmlsbHMgPSBbXTtcbiAgZnVuY3Rpb24gcmVnaXN0ZXJQb2x5ZmlsbChmdW5jKSB7XG4gICAgcG9seWZpbGxzLnB1c2goZnVuYyk7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxBbGwoZ2xvYmFsKSB7XG4gICAgcG9seWZpbGxzLmZvckVhY2goKGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBmKGdsb2JhbCk7XG4gICAgfSkpO1xuICB9XG4gIHJldHVybiB7XG4gICAgZ2V0IHRvT2JqZWN0KCkge1xuICAgICAgcmV0dXJuIHRvT2JqZWN0O1xuICAgIH0sXG4gICAgZ2V0IHRvVWludDMyKCkge1xuICAgICAgcmV0dXJuIHRvVWludDMyO1xuICAgIH0sXG4gICAgZ2V0IGlzT2JqZWN0KCkge1xuICAgICAgcmV0dXJuIGlzT2JqZWN0O1xuICAgIH0sXG4gICAgZ2V0IGlzQ2FsbGFibGUoKSB7XG4gICAgICByZXR1cm4gaXNDYWxsYWJsZTtcbiAgICB9LFxuICAgIGdldCBpc051bWJlcigpIHtcbiAgICAgIHJldHVybiBpc051bWJlcjtcbiAgICB9LFxuICAgIGdldCB0b0ludGVnZXIoKSB7XG4gICAgICByZXR1cm4gdG9JbnRlZ2VyO1xuICAgIH0sXG4gICAgZ2V0IHRvTGVuZ3RoKCkge1xuICAgICAgcmV0dXJuIHRvTGVuZ3RoO1xuICAgIH0sXG4gICAgZ2V0IGNoZWNrSXRlcmFibGUoKSB7XG4gICAgICByZXR1cm4gY2hlY2tJdGVyYWJsZTtcbiAgICB9LFxuICAgIGdldCBpc0NvbnN0cnVjdG9yKCkge1xuICAgICAgcmV0dXJuIGlzQ29uc3RydWN0b3I7XG4gICAgfSxcbiAgICBnZXQgY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QoKSB7XG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3Q7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVEZWZpbmUoKSB7XG4gICAgICByZXR1cm4gbWF5YmVEZWZpbmU7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVEZWZpbmVNZXRob2QoKSB7XG4gICAgICByZXR1cm4gbWF5YmVEZWZpbmVNZXRob2Q7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVEZWZpbmVDb25zdCgpIHtcbiAgICAgIHJldHVybiBtYXliZURlZmluZUNvbnN0O1xuICAgIH0sXG4gICAgZ2V0IG1heWJlQWRkRnVuY3Rpb25zKCkge1xuICAgICAgcmV0dXJuIG1heWJlQWRkRnVuY3Rpb25zO1xuICAgIH0sXG4gICAgZ2V0IG1heWJlQWRkQ29uc3RzKCkge1xuICAgICAgcmV0dXJuIG1heWJlQWRkQ29uc3RzO1xuICAgIH0sXG4gICAgZ2V0IG1heWJlQWRkSXRlcmF0b3IoKSB7XG4gICAgICByZXR1cm4gbWF5YmVBZGRJdGVyYXRvcjtcbiAgICB9LFxuICAgIGdldCByZWdpc3RlclBvbHlmaWxsKCkge1xuICAgICAgcmV0dXJuIHJlZ2lzdGVyUG9seWZpbGw7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxBbGwoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxBbGw7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9NYXBcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTWFwXCI7XG4gIHZhciAkX18zID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgaXNPYmplY3QgPSAkX18zLmlzT2JqZWN0LFxuICAgICAgbWF5YmVBZGRJdGVyYXRvciA9ICRfXzMubWF5YmVBZGRJdGVyYXRvcixcbiAgICAgIHJlZ2lzdGVyUG9seWZpbGwgPSAkX18zLnJlZ2lzdGVyUG9seWZpbGw7XG4gIHZhciBnZXRPd25IYXNoT2JqZWN0ID0gJHRyYWNldXJSdW50aW1lLmdldE93bkhhc2hPYmplY3Q7XG4gIHZhciAkaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgZGVsZXRlZFNlbnRpbmVsID0ge307XG4gIGZ1bmN0aW9uIGxvb2t1cEluZGV4KG1hcCwga2V5KSB7XG4gICAgaWYgKGlzT2JqZWN0KGtleSkpIHtcbiAgICAgIHZhciBoYXNoT2JqZWN0ID0gZ2V0T3duSGFzaE9iamVjdChrZXkpO1xuICAgICAgcmV0dXJuIGhhc2hPYmplY3QgJiYgbWFwLm9iamVjdEluZGV4X1toYXNoT2JqZWN0Lmhhc2hdO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpXG4gICAgICByZXR1cm4gbWFwLnN0cmluZ0luZGV4X1trZXldO1xuICAgIHJldHVybiBtYXAucHJpbWl0aXZlSW5kZXhfW2tleV07XG4gIH1cbiAgZnVuY3Rpb24gaW5pdE1hcChtYXApIHtcbiAgICBtYXAuZW50cmllc18gPSBbXTtcbiAgICBtYXAub2JqZWN0SW5kZXhfID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBtYXAuc3RyaW5nSW5kZXhfID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBtYXAucHJpbWl0aXZlSW5kZXhfID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBtYXAuZGVsZXRlZENvdW50XyA9IDA7XG4gIH1cbiAgdmFyIE1hcCA9IGZ1bmN0aW9uIE1hcCgpIHtcbiAgICB2YXIgaXRlcmFibGUgPSBhcmd1bWVudHNbMF07XG4gICAgaWYgKCFpc09iamVjdCh0aGlzKSlcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ01hcCBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHR5cGUnKTtcbiAgICBpZiAoJGhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ2VudHJpZXNfJykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ01hcCBjYW4gbm90IGJlIHJlZW50cmFudGx5IGluaXRpYWxpc2VkJyk7XG4gICAgfVxuICAgIGluaXRNYXAodGhpcyk7XG4gICAgaWYgKGl0ZXJhYmxlICE9PSBudWxsICYmIGl0ZXJhYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAodmFyICRfXzUgPSBpdGVyYWJsZVtTeW1ib2wuaXRlcmF0b3JdKCksXG4gICAgICAgICAgJF9fNjsgISgkX182ID0gJF9fNS5uZXh0KCkpLmRvbmU7ICkge1xuICAgICAgICB2YXIgJF9fNyA9ICRfXzYudmFsdWUsXG4gICAgICAgICAgICBrZXkgPSAkX183WzBdLFxuICAgICAgICAgICAgdmFsdWUgPSAkX183WzFdO1xuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKE1hcCwge1xuICAgIGdldCBzaXplKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZW50cmllc18ubGVuZ3RoIC8gMiAtIHRoaXMuZGVsZXRlZENvdW50XztcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICB2YXIgaW5kZXggPSBsb29rdXBJbmRleCh0aGlzLCBrZXkpO1xuICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzLmVudHJpZXNfW2luZGV4ICsgMV07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBvYmplY3RNb2RlID0gaXNPYmplY3Qoa2V5KTtcbiAgICAgIHZhciBzdHJpbmdNb2RlID0gdHlwZW9mIGtleSA9PT0gJ3N0cmluZyc7XG4gICAgICB2YXIgaW5kZXggPSBsb29rdXBJbmRleCh0aGlzLCBrZXkpO1xuICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzX1tpbmRleCArIDFdID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IHRoaXMuZW50cmllc18ubGVuZ3RoO1xuICAgICAgICB0aGlzLmVudHJpZXNfW2luZGV4XSA9IGtleTtcbiAgICAgICAgdGhpcy5lbnRyaWVzX1tpbmRleCArIDFdID0gdmFsdWU7XG4gICAgICAgIGlmIChvYmplY3RNb2RlKSB7XG4gICAgICAgICAgdmFyIGhhc2hPYmplY3QgPSBnZXRPd25IYXNoT2JqZWN0KGtleSk7XG4gICAgICAgICAgdmFyIGhhc2ggPSBoYXNoT2JqZWN0Lmhhc2g7XG4gICAgICAgICAgdGhpcy5vYmplY3RJbmRleF9baGFzaF0gPSBpbmRleDtcbiAgICAgICAgfSBlbHNlIGlmIChzdHJpbmdNb2RlKSB7XG4gICAgICAgICAgdGhpcy5zdHJpbmdJbmRleF9ba2V5XSA9IGluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJpbWl0aXZlSW5kZXhfW2tleV0gPSBpbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBoYXM6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGxvb2t1cEluZGV4KHRoaXMsIGtleSkgIT09IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIGRlbGV0ZTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICB2YXIgb2JqZWN0TW9kZSA9IGlzT2JqZWN0KGtleSk7XG4gICAgICB2YXIgc3RyaW5nTW9kZSA9IHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnO1xuICAgICAgdmFyIGluZGV4O1xuICAgICAgdmFyIGhhc2g7XG4gICAgICBpZiAob2JqZWN0TW9kZSkge1xuICAgICAgICB2YXIgaGFzaE9iamVjdCA9IGdldE93bkhhc2hPYmplY3Qoa2V5KTtcbiAgICAgICAgaWYgKGhhc2hPYmplY3QpIHtcbiAgICAgICAgICBpbmRleCA9IHRoaXMub2JqZWN0SW5kZXhfW2hhc2ggPSBoYXNoT2JqZWN0Lmhhc2hdO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLm9iamVjdEluZGV4X1toYXNoXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzdHJpbmdNb2RlKSB7XG4gICAgICAgIGluZGV4ID0gdGhpcy5zdHJpbmdJbmRleF9ba2V5XTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc3RyaW5nSW5kZXhfW2tleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IHRoaXMucHJpbWl0aXZlSW5kZXhfW2tleV07XG4gICAgICAgIGRlbGV0ZSB0aGlzLnByaW1pdGl2ZUluZGV4X1trZXldO1xuICAgICAgfVxuICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lbnRyaWVzX1tpbmRleF0gPSBkZWxldGVkU2VudGluZWw7XG4gICAgICAgIHRoaXMuZW50cmllc19baW5kZXggKyAxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kZWxldGVkQ291bnRfKys7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgaW5pdE1hcCh0aGlzKTtcbiAgICB9LFxuICAgIGZvckVhY2g6IGZ1bmN0aW9uKGNhbGxiYWNrRm4pIHtcbiAgICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVudHJpZXNfLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIHZhciBrZXkgPSB0aGlzLmVudHJpZXNfW2ldO1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmVudHJpZXNfW2kgKyAxXTtcbiAgICAgICAgaWYgKGtleSA9PT0gZGVsZXRlZFNlbnRpbmVsKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBjYWxsYmFja0ZuLmNhbGwodGhpc0FyZywgdmFsdWUsIGtleSwgdGhpcyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlbnRyaWVzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzgoKSB7XG4gICAgICB2YXIgaSxcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgdmFsdWU7XG4gICAgICByZXR1cm4gJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlKGZ1bmN0aW9uKCRjdHgpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpXG4gICAgICAgICAgc3dpdGNoICgkY3R4LnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChpIDwgdGhpcy5lbnRyaWVzXy5sZW5ndGgpID8gOCA6IC0yO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICBrZXkgPSB0aGlzLmVudHJpZXNfW2ldO1xuICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZW50cmllc19baSArIDFdO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoa2V5ID09PSBkZWxldGVkU2VudGluZWwpID8gNCA6IDY7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMjtcbiAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlXTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgJGN0eC5tYXliZVRocm93KCk7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzgsIHRoaXMpO1xuICAgIH0pLFxuICAgIGtleXM6ICR0cmFjZXVyUnVudGltZS5pbml0R2VuZXJhdG9yRnVuY3Rpb24oZnVuY3Rpb24gJF9fOSgpIHtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICB2YWx1ZTtcbiAgICAgIHJldHVybiAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UoZnVuY3Rpb24oJGN0eCkge1xuICAgICAgICB3aGlsZSAodHJ1ZSlcbiAgICAgICAgICBzd2l0Y2ggKCRjdHguc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKGkgPCB0aGlzLmVudHJpZXNfLmxlbmd0aCkgPyA4IDogLTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgIGtleSA9IHRoaXMuZW50cmllc19baV07XG4gICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5lbnRyaWVzX1tpICsgMV07XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA5O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChrZXkgPT09IGRlbGV0ZWRTZW50aW5lbCkgPyA0IDogNjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAyO1xuICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAkY3R4Lm1heWJlVGhyb3coKTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuICRjdHguZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgfSwgJF9fOSwgdGhpcyk7XG4gICAgfSksXG4gICAgdmFsdWVzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzEwKCkge1xuICAgICAgdmFyIGksXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHZhbHVlO1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoaSA8IHRoaXMuZW50cmllc18ubGVuZ3RoKSA/IDggOiAtMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAga2V5ID0gdGhpcy5lbnRyaWVzX1tpXTtcbiAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmVudHJpZXNfW2kgKyAxXTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKGtleSA9PT0gZGVsZXRlZFNlbnRpbmVsKSA/IDQgOiA2O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgJGN0eC5tYXliZVRocm93KCk7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzEwLCB0aGlzKTtcbiAgICB9KVxuICB9LCB7fSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNYXAucHJvdG90eXBlLCBTeW1ib2wuaXRlcmF0b3IsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6IE1hcC5wcm90b3R5cGUuZW50cmllc1xuICB9KTtcbiAgZnVuY3Rpb24gcG9seWZpbGxNYXAoZ2xvYmFsKSB7XG4gICAgdmFyICRfXzcgPSBnbG9iYWwsXG4gICAgICAgIE9iamVjdCA9ICRfXzcuT2JqZWN0LFxuICAgICAgICBTeW1ib2wgPSAkX183LlN5bWJvbDtcbiAgICBpZiAoIWdsb2JhbC5NYXApXG4gICAgICBnbG9iYWwuTWFwID0gTWFwO1xuICAgIHZhciBtYXBQcm90b3R5cGUgPSBnbG9iYWwuTWFwLnByb3RvdHlwZTtcbiAgICBpZiAobWFwUHJvdG90eXBlLmVudHJpZXMpIHtcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IobWFwUHJvdG90eXBlLCBtYXBQcm90b3R5cGUuZW50cmllcywgU3ltYm9sKTtcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IoT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBnbG9iYWwuTWFwKCkuZW50cmllcygpKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSwgU3ltYm9sKTtcbiAgICB9XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbE1hcCk7XG4gIHJldHVybiB7XG4gICAgZ2V0IE1hcCgpIHtcbiAgICAgIHJldHVybiBNYXA7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxNYXAoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxNYXA7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTWFwXCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TZXRcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU2V0XCI7XG4gIHZhciAkX18xMSA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKSxcbiAgICAgIGlzT2JqZWN0ID0gJF9fMTEuaXNPYmplY3QsXG4gICAgICBtYXliZUFkZEl0ZXJhdG9yID0gJF9fMTEubWF5YmVBZGRJdGVyYXRvcixcbiAgICAgIHJlZ2lzdGVyUG9seWZpbGwgPSAkX18xMS5yZWdpc3RlclBvbHlmaWxsO1xuICB2YXIgTWFwID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL01hcFwiKS5NYXA7XG4gIHZhciBnZXRPd25IYXNoT2JqZWN0ID0gJHRyYWNldXJSdW50aW1lLmdldE93bkhhc2hPYmplY3Q7XG4gIHZhciAkaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICBmdW5jdGlvbiBpbml0U2V0KHNldCkge1xuICAgIHNldC5tYXBfID0gbmV3IE1hcCgpO1xuICB9XG4gIHZhciBTZXQgPSBmdW5jdGlvbiBTZXQoKSB7XG4gICAgdmFyIGl0ZXJhYmxlID0gYXJndW1lbnRzWzBdO1xuICAgIGlmICghaXNPYmplY3QodGhpcykpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTZXQgY2FsbGVkIG9uIGluY29tcGF0aWJsZSB0eXBlJyk7XG4gICAgaWYgKCRoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdtYXBfJykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1NldCBjYW4gbm90IGJlIHJlZW50cmFudGx5IGluaXRpYWxpc2VkJyk7XG4gICAgfVxuICAgIGluaXRTZXQodGhpcyk7XG4gICAgaWYgKGl0ZXJhYmxlICE9PSBudWxsICYmIGl0ZXJhYmxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAodmFyICRfXzE1ID0gaXRlcmFibGVbU3ltYm9sLml0ZXJhdG9yXSgpLFxuICAgICAgICAgICRfXzE2OyAhKCRfXzE2ID0gJF9fMTUubmV4dCgpKS5kb25lOyApIHtcbiAgICAgICAgdmFyIGl0ZW0gPSAkX18xNi52YWx1ZTtcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMuYWRkKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShTZXQsIHtcbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcF8uc2l6ZTtcbiAgICB9LFxuICAgIGhhczogZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBfLmhhcyhrZXkpO1xuICAgIH0sXG4gICAgYWRkOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHRoaXMubWFwXy5zZXQoa2V5LCBrZXkpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBkZWxldGU6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwXy5kZWxldGUoa2V5KTtcbiAgICB9LFxuICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcF8uY2xlYXIoKTtcbiAgICB9LFxuICAgIGZvckVhY2g6IGZ1bmN0aW9uKGNhbGxiYWNrRm4pIHtcbiAgICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgICAgdmFyICRfXzEzID0gdGhpcztcbiAgICAgIHJldHVybiB0aGlzLm1hcF8uZm9yRWFjaCgoZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICBjYWxsYmFja0ZuLmNhbGwodGhpc0FyZywga2V5LCBrZXksICRfXzEzKTtcbiAgICAgIH0pKTtcbiAgICB9LFxuICAgIHZhbHVlczogJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbiAkX18xOCgpIHtcbiAgICAgIHZhciAkX18xOSxcbiAgICAgICAgICAkX18yMDtcbiAgICAgIHJldHVybiAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UoZnVuY3Rpb24oJGN0eCkge1xuICAgICAgICB3aGlsZSAodHJ1ZSlcbiAgICAgICAgICBzd2l0Y2ggKCRjdHguc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgJF9fMTkgPSB0aGlzLm1hcF8ua2V5cygpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICAgICAgICAgICAgJGN0eC5zZW50ID0gdm9pZCAwO1xuICAgICAgICAgICAgICAkY3R4LmFjdGlvbiA9ICduZXh0JztcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICRfXzIwID0gJF9fMTlbJGN0eC5hY3Rpb25dKCRjdHguc2VudElnbm9yZVRocm93KTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKCRfXzIwLmRvbmUpID8gMyA6IDI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAkY3R4LnNlbnQgPSAkX18yMC52YWx1ZTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IC0yO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICByZXR1cm4gJF9fMjAudmFsdWU7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJGN0eC5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICB9LCAkX18xOCwgdGhpcyk7XG4gICAgfSksXG4gICAgZW50cmllczogJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbiAkX18yMSgpIHtcbiAgICAgIHZhciAkX18yMixcbiAgICAgICAgICAkX18yMztcbiAgICAgIHJldHVybiAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UoZnVuY3Rpb24oJGN0eCkge1xuICAgICAgICB3aGlsZSAodHJ1ZSlcbiAgICAgICAgICBzd2l0Y2ggKCRjdHguc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgJF9fMjIgPSB0aGlzLm1hcF8uZW50cmllcygpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgICAgICAgICAgICAgJGN0eC5zZW50ID0gdm9pZCAwO1xuICAgICAgICAgICAgICAkY3R4LmFjdGlvbiA9ICduZXh0JztcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICRfXzIzID0gJF9fMjJbJGN0eC5hY3Rpb25dKCRjdHguc2VudElnbm9yZVRocm93KTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKCRfXzIzLmRvbmUpID8gMyA6IDI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAkY3R4LnNlbnQgPSAkX18yMy52YWx1ZTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IC0yO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICByZXR1cm4gJF9fMjMudmFsdWU7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJGN0eC5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICB9LCAkX18yMSwgdGhpcyk7XG4gICAgfSlcbiAgfSwge30pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2V0LnByb3RvdHlwZSwgU3ltYm9sLml0ZXJhdG9yLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBTZXQucHJvdG90eXBlLnZhbHVlc1xuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNldC5wcm90b3R5cGUsICdrZXlzJywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogU2V0LnByb3RvdHlwZS52YWx1ZXNcbiAgfSk7XG4gIGZ1bmN0aW9uIHBvbHlmaWxsU2V0KGdsb2JhbCkge1xuICAgIHZhciAkX18xNyA9IGdsb2JhbCxcbiAgICAgICAgT2JqZWN0ID0gJF9fMTcuT2JqZWN0LFxuICAgICAgICBTeW1ib2wgPSAkX18xNy5TeW1ib2w7XG4gICAgaWYgKCFnbG9iYWwuU2V0KVxuICAgICAgZ2xvYmFsLlNldCA9IFNldDtcbiAgICB2YXIgc2V0UHJvdG90eXBlID0gZ2xvYmFsLlNldC5wcm90b3R5cGU7XG4gICAgaWYgKHNldFByb3RvdHlwZS52YWx1ZXMpIHtcbiAgICAgIG1heWJlQWRkSXRlcmF0b3Ioc2V0UHJvdG90eXBlLCBzZXRQcm90b3R5cGUudmFsdWVzLCBTeW1ib2wpO1xuICAgICAgbWF5YmVBZGRJdGVyYXRvcihPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IGdsb2JhbC5TZXQoKS52YWx1ZXMoKSksIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sIFN5bWJvbCk7XG4gICAgfVxuICB9XG4gIHJlZ2lzdGVyUG9seWZpbGwocG9seWZpbGxTZXQpO1xuICByZXR1cm4ge1xuICAgIGdldCBTZXQoKSB7XG4gICAgICByZXR1cm4gU2V0O1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsU2V0KCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsU2V0O1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1NldFwiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9ub2RlX21vZHVsZXMvcnN2cC9saWIvcnN2cC9hc2FwXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvbm9kZV9tb2R1bGVzL3JzdnAvbGliL3JzdnAvYXNhcFwiO1xuICB2YXIgbGVuID0gMDtcbiAgZnVuY3Rpb24gYXNhcChjYWxsYmFjaywgYXJnKSB7XG4gICAgcXVldWVbbGVuXSA9IGNhbGxiYWNrO1xuICAgIHF1ZXVlW2xlbiArIDFdID0gYXJnO1xuICAgIGxlbiArPSAyO1xuICAgIGlmIChsZW4gPT09IDIpIHtcbiAgICAgIHNjaGVkdWxlRmx1c2goKTtcbiAgICB9XG4gIH1cbiAgdmFyICRfX2RlZmF1bHQgPSBhc2FwO1xuICB2YXIgYnJvd3Nlckdsb2JhbCA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3cgOiB7fTtcbiAgdmFyIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gYnJvd3Nlckdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGJyb3dzZXJHbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbiAgdmFyIGlzV29ya2VyID0gdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgaW1wb3J0U2NyaXB0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJztcbiAgZnVuY3Rpb24gdXNlTmV4dFRpY2soKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB1c2VNdXRhdGlvbk9ic2VydmVyKCkge1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIoZmx1c2gpO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG9ic2VydmVyLm9ic2VydmUobm9kZSwge2NoYXJhY3RlckRhdGE6IHRydWV9KTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBub2RlLmRhdGEgPSAoaXRlcmF0aW9ucyA9ICsraXRlcmF0aW9ucyAlIDIpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gdXNlTWVzc2FnZUNoYW5uZWwoKSB7XG4gICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZsdXNoO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB1c2VTZXRUaW1lb3V0KCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHNldFRpbWVvdXQoZmx1c2gsIDEpO1xuICAgIH07XG4gIH1cbiAgdmFyIHF1ZXVlID0gbmV3IEFycmF5KDEwMDApO1xuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgICB2YXIgY2FsbGJhY2sgPSBxdWV1ZVtpXTtcbiAgICAgIHZhciBhcmcgPSBxdWV1ZVtpICsgMV07XG4gICAgICBjYWxsYmFjayhhcmcpO1xuICAgICAgcXVldWVbaV0gPSB1bmRlZmluZWQ7XG4gICAgICBxdWV1ZVtpICsgMV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGxlbiA9IDA7XG4gIH1cbiAgdmFyIHNjaGVkdWxlRmx1c2g7XG4gIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYge30udG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgc2NoZWR1bGVGbHVzaCA9IHVzZU5leHRUaWNrKCk7XG4gIH0gZWxzZSBpZiAoQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICBzY2hlZHVsZUZsdXNoID0gdXNlTXV0YXRpb25PYnNlcnZlcigpO1xuICB9IGVsc2UgaWYgKGlzV29ya2VyKSB7XG4gICAgc2NoZWR1bGVGbHVzaCA9IHVzZU1lc3NhZ2VDaGFubmVsKCk7XG4gIH0gZWxzZSB7XG4gICAgc2NoZWR1bGVGbHVzaCA9IHVzZVNldFRpbWVvdXQoKTtcbiAgfVxuICByZXR1cm4ge2dldCBkZWZhdWx0KCkge1xuICAgICAgcmV0dXJuICRfX2RlZmF1bHQ7XG4gICAgfX07XG59KTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1Byb21pc2VcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvUHJvbWlzZVwiO1xuICB2YXIgYXN5bmMgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9ub2RlX21vZHVsZXMvcnN2cC9saWIvcnN2cC9hc2FwXCIpLmRlZmF1bHQ7XG4gIHZhciByZWdpc3RlclBvbHlmaWxsID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLnJlZ2lzdGVyUG9seWZpbGw7XG4gIHZhciBwcm9taXNlUmF3ID0ge307XG4gIGZ1bmN0aW9uIGlzUHJvbWlzZSh4KSB7XG4gICAgcmV0dXJuIHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHguc3RhdHVzXyAhPT0gdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIGlkUmVzb2x2ZUhhbmRsZXIoeCkge1xuICAgIHJldHVybiB4O1xuICB9XG4gIGZ1bmN0aW9uIGlkUmVqZWN0SGFuZGxlcih4KSB7XG4gICAgdGhyb3cgeDtcbiAgfVxuICBmdW5jdGlvbiBjaGFpbihwcm9taXNlKSB7XG4gICAgdmFyIG9uUmVzb2x2ZSA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiBpZFJlc29sdmVIYW5kbGVyO1xuICAgIHZhciBvblJlamVjdCA9IGFyZ3VtZW50c1syXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMl0gOiBpZFJlamVjdEhhbmRsZXI7XG4gICAgdmFyIGRlZmVycmVkID0gZ2V0RGVmZXJyZWQocHJvbWlzZS5jb25zdHJ1Y3Rvcik7XG4gICAgc3dpdGNoIChwcm9taXNlLnN0YXR1c18pIHtcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICB0aHJvdyBUeXBlRXJyb3I7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHByb21pc2Uub25SZXNvbHZlXy5wdXNoKG9uUmVzb2x2ZSwgZGVmZXJyZWQpO1xuICAgICAgICBwcm9taXNlLm9uUmVqZWN0Xy5wdXNoKG9uUmVqZWN0LCBkZWZlcnJlZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSArMTpcbiAgICAgICAgcHJvbWlzZUVucXVldWUocHJvbWlzZS52YWx1ZV8sIFtvblJlc29sdmUsIGRlZmVycmVkXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAtMTpcbiAgICAgICAgcHJvbWlzZUVucXVldWUocHJvbWlzZS52YWx1ZV8sIFtvblJlamVjdCwgZGVmZXJyZWRdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICB9XG4gIGZ1bmN0aW9uIGdldERlZmVycmVkKEMpIHtcbiAgICBpZiAodGhpcyA9PT0gJFByb21pc2UpIHtcbiAgICAgIHZhciBwcm9taXNlID0gcHJvbWlzZUluaXQobmV3ICRQcm9taXNlKHByb21pc2VSYXcpKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByb21pc2U6IHByb21pc2UsXG4gICAgICAgIHJlc29sdmU6IChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgcHJvbWlzZVJlc29sdmUocHJvbWlzZSwgeCk7XG4gICAgICAgIH0pLFxuICAgICAgICByZWplY3Q6IChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgcHJvbWlzZVJlamVjdChwcm9taXNlLCByKTtcbiAgICAgICAgfSlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgIHJlc3VsdC5wcm9taXNlID0gbmV3IEMoKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZXN1bHQucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIHJlc3VsdC5yZWplY3QgPSByZWplY3Q7XG4gICAgICB9KSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlU2V0KHByb21pc2UsIHN0YXR1cywgdmFsdWUsIG9uUmVzb2x2ZSwgb25SZWplY3QpIHtcbiAgICBwcm9taXNlLnN0YXR1c18gPSBzdGF0dXM7XG4gICAgcHJvbWlzZS52YWx1ZV8gPSB2YWx1ZTtcbiAgICBwcm9taXNlLm9uUmVzb2x2ZV8gPSBvblJlc29sdmU7XG4gICAgcHJvbWlzZS5vblJlamVjdF8gPSBvblJlamVjdDtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlSW5pdChwcm9taXNlKSB7XG4gICAgcmV0dXJuIHByb21pc2VTZXQocHJvbWlzZSwgMCwgdW5kZWZpbmVkLCBbXSwgW10pO1xuICB9XG4gIHZhciBQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShyZXNvbHZlcikge1xuICAgIGlmIChyZXNvbHZlciA9PT0gcHJvbWlzZVJhdylcbiAgICAgIHJldHVybjtcbiAgICBpZiAodHlwZW9mIHJlc29sdmVyICE9PSAnZnVuY3Rpb24nKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgICB2YXIgcHJvbWlzZSA9IHByb21pc2VJbml0KHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICByZXNvbHZlcigoZnVuY3Rpb24oeCkge1xuICAgICAgICBwcm9taXNlUmVzb2x2ZShwcm9taXNlLCB4KTtcbiAgICAgIH0pLCAoZnVuY3Rpb24ocikge1xuICAgICAgICBwcm9taXNlUmVqZWN0KHByb21pc2UsIHIpO1xuICAgICAgfSkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHByb21pc2VSZWplY3QocHJvbWlzZSwgZSk7XG4gICAgfVxuICB9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShQcm9taXNlLCB7XG4gICAgY2F0Y2g6IGZ1bmN0aW9uKG9uUmVqZWN0KSB7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3QpO1xuICAgIH0sXG4gICAgdGhlbjogZnVuY3Rpb24ob25SZXNvbHZlLCBvblJlamVjdCkge1xuICAgICAgaWYgKHR5cGVvZiBvblJlc29sdmUgIT09ICdmdW5jdGlvbicpXG4gICAgICAgIG9uUmVzb2x2ZSA9IGlkUmVzb2x2ZUhhbmRsZXI7XG4gICAgICBpZiAodHlwZW9mIG9uUmVqZWN0ICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICBvblJlamVjdCA9IGlkUmVqZWN0SGFuZGxlcjtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBjb25zdHJ1Y3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgICByZXR1cm4gY2hhaW4odGhpcywgZnVuY3Rpb24oeCkge1xuICAgICAgICB4ID0gcHJvbWlzZUNvZXJjZShjb25zdHJ1Y3RvciwgeCk7XG4gICAgICAgIHJldHVybiB4ID09PSB0aGF0ID8gb25SZWplY3QobmV3IFR5cGVFcnJvcikgOiBpc1Byb21pc2UoeCkgPyB4LnRoZW4ob25SZXNvbHZlLCBvblJlamVjdCkgOiBvblJlc29sdmUoeCk7XG4gICAgICB9LCBvblJlamVjdCk7XG4gICAgfVxuICB9LCB7XG4gICAgcmVzb2x2ZTogZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKHRoaXMgPT09ICRQcm9taXNlKSB7XG4gICAgICAgIGlmIChpc1Byb21pc2UoeCkpIHtcbiAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvbWlzZVNldChuZXcgJFByb21pc2UocHJvbWlzZVJhdyksICsxLCB4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyhmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICByZXNvbHZlKHgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlamVjdDogZnVuY3Rpb24ocikge1xuICAgICAgaWYgKHRoaXMgPT09ICRQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlU2V0KG5ldyAkUHJvbWlzZShwcm9taXNlUmF3KSwgLTEsIHIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICByZWplY3Qocik7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbDogZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICB2YXIgZGVmZXJyZWQgPSBnZXREZWZlcnJlZCh0aGlzKTtcbiAgICAgIHZhciByZXNvbHV0aW9ucyA9IFtdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGNvdW50ID0gdmFsdWVzLmxlbmd0aDtcbiAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNvbHV0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSh2YWx1ZXNbaV0pLnRoZW4oZnVuY3Rpb24oaSwgeCkge1xuICAgICAgICAgICAgICByZXNvbHV0aW9uc1tpXSA9IHg7XG4gICAgICAgICAgICAgIGlmICgtLWNvdW50ID09PSAwKVxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzb2x1dGlvbnMpO1xuICAgICAgICAgICAgfS5iaW5kKHVuZGVmaW5lZCwgaSksIChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChyKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfSxcbiAgICByYWNlOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9IGdldERlZmVycmVkKHRoaXMpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnJlc29sdmUodmFsdWVzW2ldKS50aGVuKChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHgpO1xuICAgICAgICAgIH0pLCAoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHIpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QoZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG4gIH0pO1xuICB2YXIgJFByb21pc2UgPSBQcm9taXNlO1xuICB2YXIgJFByb21pc2VSZWplY3QgPSAkUHJvbWlzZS5yZWplY3Q7XG4gIGZ1bmN0aW9uIHByb21pc2VSZXNvbHZlKHByb21pc2UsIHgpIHtcbiAgICBwcm9taXNlRG9uZShwcm9taXNlLCArMSwgeCwgcHJvbWlzZS5vblJlc29sdmVfKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlUmVqZWN0KHByb21pc2UsIHIpIHtcbiAgICBwcm9taXNlRG9uZShwcm9taXNlLCAtMSwgciwgcHJvbWlzZS5vblJlamVjdF8pO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VEb25lKHByb21pc2UsIHN0YXR1cywgdmFsdWUsIHJlYWN0aW9ucykge1xuICAgIGlmIChwcm9taXNlLnN0YXR1c18gIT09IDApXG4gICAgICByZXR1cm47XG4gICAgcHJvbWlzZUVucXVldWUodmFsdWUsIHJlYWN0aW9ucyk7XG4gICAgcHJvbWlzZVNldChwcm9taXNlLCBzdGF0dXMsIHZhbHVlKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlRW5xdWV1ZSh2YWx1ZSwgdGFza3MpIHtcbiAgICBhc3luYygoZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhc2tzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIHByb21pc2VIYW5kbGUodmFsdWUsIHRhc2tzW2ldLCB0YXNrc1tpICsgMV0pO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9taXNlSGFuZGxlKHZhbHVlLCBoYW5kbGVyLCBkZWZlcnJlZCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG4gICAgICBpZiAocmVzdWx0ID09PSBkZWZlcnJlZC5wcm9taXNlKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICAgICAgZWxzZSBpZiAoaXNQcm9taXNlKHJlc3VsdCkpXG4gICAgICAgIGNoYWluKHJlc3VsdCwgZGVmZXJyZWQucmVzb2x2ZSwgZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgIGVsc2VcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdChlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuICB9XG4gIHZhciB0aGVuYWJsZVN5bWJvbCA9ICdAQHRoZW5hYmxlJztcbiAgZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICAgIHJldHVybiB4ICYmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHggPT09ICdmdW5jdGlvbicpO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VDb2VyY2UoY29uc3RydWN0b3IsIHgpIHtcbiAgICBpZiAoIWlzUHJvbWlzZSh4KSAmJiBpc09iamVjdCh4KSkge1xuICAgICAgdmFyIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICB0aGVuID0geC50aGVuO1xuICAgICAgfSBjYXRjaCAocikge1xuICAgICAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlUmVqZWN0LmNhbGwoY29uc3RydWN0b3IsIHIpO1xuICAgICAgICB4W3RoZW5hYmxlU3ltYm9sXSA9IHByb21pc2U7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciBwID0geFt0aGVuYWJsZVN5bWJvbF07XG4gICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGRlZmVycmVkID0gZ2V0RGVmZXJyZWQoY29uc3RydWN0b3IpO1xuICAgICAgICAgIHhbdGhlbmFibGVTeW1ib2xdID0gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHgsIGRlZmVycmVkLnJlc29sdmUsIGRlZmVycmVkLnJlamVjdCk7XG4gICAgICAgICAgfSBjYXRjaCAocikge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geDtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbFByb21pc2UoZ2xvYmFsKSB7XG4gICAgaWYgKCFnbG9iYWwuUHJvbWlzZSlcbiAgICAgIGdsb2JhbC5Qcm9taXNlID0gUHJvbWlzZTtcbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsUHJvbWlzZSk7XG4gIHJldHVybiB7XG4gICAgZ2V0IFByb21pc2UoKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZTtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbFByb21pc2UoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxQcm9taXNlO1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1Byb21pc2VcIiArICcnKTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZ0l0ZXJhdG9yXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkX18yOTtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nSXRlcmF0b3JcIjtcbiAgdmFyICRfXzI3ID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QgPSAkX18yNy5jcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCxcbiAgICAgIGlzT2JqZWN0ID0gJF9fMjcuaXNPYmplY3Q7XG4gIHZhciAkX18zMCA9ICR0cmFjZXVyUnVudGltZSxcbiAgICAgIGhhc093blByb3BlcnR5ID0gJF9fMzAuaGFzT3duUHJvcGVydHksXG4gICAgICB0b1Byb3BlcnR5ID0gJF9fMzAudG9Qcm9wZXJ0eTtcbiAgdmFyIGl0ZXJhdGVkU3RyaW5nID0gU3ltYm9sKCdpdGVyYXRlZFN0cmluZycpO1xuICB2YXIgc3RyaW5nSXRlcmF0b3JOZXh0SW5kZXggPSBTeW1ib2woJ3N0cmluZ0l0ZXJhdG9yTmV4dEluZGV4Jyk7XG4gIHZhciBTdHJpbmdJdGVyYXRvciA9IGZ1bmN0aW9uIFN0cmluZ0l0ZXJhdG9yKCkge307XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKFN0cmluZ0l0ZXJhdG9yLCAoJF9fMjkgPSB7fSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCRfXzI5LCBcIm5leHRcIiwge1xuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBvID0gdGhpcztcbiAgICAgIGlmICghaXNPYmplY3QobykgfHwgIWhhc093blByb3BlcnR5KG8sIGl0ZXJhdGVkU3RyaW5nKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0aGlzIG11c3QgYmUgYSBTdHJpbmdJdGVyYXRvciBvYmplY3QnKTtcbiAgICAgIH1cbiAgICAgIHZhciBzID0gb1t0b1Byb3BlcnR5KGl0ZXJhdGVkU3RyaW5nKV07XG4gICAgICBpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCh1bmRlZmluZWQsIHRydWUpO1xuICAgICAgfVxuICAgICAgdmFyIHBvc2l0aW9uID0gb1t0b1Byb3BlcnR5KHN0cmluZ0l0ZXJhdG9yTmV4dEluZGV4KV07XG4gICAgICB2YXIgbGVuID0gcy5sZW5ndGg7XG4gICAgICBpZiAocG9zaXRpb24gPj0gbGVuKSB7XG4gICAgICAgIG9bdG9Qcm9wZXJ0eShpdGVyYXRlZFN0cmluZyldID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QodW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHZhciBmaXJzdCA9IHMuY2hhckNvZGVBdChwb3NpdGlvbik7XG4gICAgICB2YXIgcmVzdWx0U3RyaW5nO1xuICAgICAgaWYgKGZpcnN0IDwgMHhEODAwIHx8IGZpcnN0ID4gMHhEQkZGIHx8IHBvc2l0aW9uICsgMSA9PT0gbGVuKSB7XG4gICAgICAgIHJlc3VsdFN0cmluZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZmlyc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHNlY29uZCA9IHMuY2hhckNvZGVBdChwb3NpdGlvbiArIDEpO1xuICAgICAgICBpZiAoc2Vjb25kIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRikge1xuICAgICAgICAgIHJlc3VsdFN0cmluZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZmlyc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdFN0cmluZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZmlyc3QpICsgU3RyaW5nLmZyb21DaGFyQ29kZShzZWNvbmQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvW3RvUHJvcGVydHkoc3RyaW5nSXRlcmF0b3JOZXh0SW5kZXgpXSA9IHBvc2l0aW9uICsgcmVzdWx0U3RyaW5nLmxlbmd0aDtcbiAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdChyZXN1bHRTdHJpbmcsIGZhbHNlKTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlXG4gIH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoJF9fMjksIFN5bWJvbC5pdGVyYXRvciwge1xuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksICRfXzI5KSwge30pO1xuICBmdW5jdGlvbiBjcmVhdGVTdHJpbmdJdGVyYXRvcihzdHJpbmcpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhzdHJpbmcpO1xuICAgIHZhciBpdGVyYXRvciA9IE9iamVjdC5jcmVhdGUoU3RyaW5nSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgICBpdGVyYXRvclt0b1Byb3BlcnR5KGl0ZXJhdGVkU3RyaW5nKV0gPSBzO1xuICAgIGl0ZXJhdG9yW3RvUHJvcGVydHkoc3RyaW5nSXRlcmF0b3JOZXh0SW5kZXgpXSA9IDA7XG4gICAgcmV0dXJuIGl0ZXJhdG9yO1xuICB9XG4gIHJldHVybiB7Z2V0IGNyZWF0ZVN0cmluZ0l0ZXJhdG9yKCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZVN0cmluZ0l0ZXJhdG9yO1xuICAgIH19O1xufSk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmdcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nXCI7XG4gIHZhciBjcmVhdGVTdHJpbmdJdGVyYXRvciA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmdJdGVyYXRvclwiKS5jcmVhdGVTdHJpbmdJdGVyYXRvcjtcbiAgdmFyICRfXzMyID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgbWF5YmVBZGRGdW5jdGlvbnMgPSAkX18zMi5tYXliZUFkZEZ1bmN0aW9ucyxcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IgPSAkX18zMi5tYXliZUFkZEl0ZXJhdG9yLFxuICAgICAgcmVnaXN0ZXJQb2x5ZmlsbCA9ICRfXzMyLnJlZ2lzdGVyUG9seWZpbGw7XG4gIHZhciAkdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgJGluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmluZGV4T2Y7XG4gIHZhciAkbGFzdEluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmxhc3RJbmRleE9mO1xuICBmdW5jdGlvbiBzdGFydHNXaXRoKHNlYXJjaCkge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgaWYgKHRoaXMgPT0gbnVsbCB8fCAkdG9TdHJpbmcuY2FsbChzZWFyY2gpID09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgdmFyIHN0cmluZ0xlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gICAgdmFyIHNlYXJjaFN0cmluZyA9IFN0cmluZyhzZWFyY2gpO1xuICAgIHZhciBzZWFyY2hMZW5ndGggPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICAgIHZhciBwb3NpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICAgIHZhciBwb3MgPSBwb3NpdGlvbiA/IE51bWJlcihwb3NpdGlvbikgOiAwO1xuICAgIGlmIChpc05hTihwb3MpKSB7XG4gICAgICBwb3MgPSAwO1xuICAgIH1cbiAgICB2YXIgc3RhcnQgPSBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCBzdHJpbmdMZW5ndGgpO1xuICAgIHJldHVybiAkaW5kZXhPZi5jYWxsKHN0cmluZywgc2VhcmNoU3RyaW5nLCBwb3MpID09IHN0YXJ0O1xuICB9XG4gIGZ1bmN0aW9uIGVuZHNXaXRoKHNlYXJjaCkge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgaWYgKHRoaXMgPT0gbnVsbCB8fCAkdG9TdHJpbmcuY2FsbChzZWFyY2gpID09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgdmFyIHN0cmluZ0xlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gICAgdmFyIHNlYXJjaFN0cmluZyA9IFN0cmluZyhzZWFyY2gpO1xuICAgIHZhciBzZWFyY2hMZW5ndGggPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICAgIHZhciBwb3MgPSBzdHJpbmdMZW5ndGg7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAocG9zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwb3MgPSBwb3NpdGlvbiA/IE51bWJlcihwb3NpdGlvbikgOiAwO1xuICAgICAgICBpZiAoaXNOYU4ocG9zKSkge1xuICAgICAgICAgIHBvcyA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGVuZCA9IE1hdGgubWluKE1hdGgubWF4KHBvcywgMCksIHN0cmluZ0xlbmd0aCk7XG4gICAgdmFyIHN0YXJ0ID0gZW5kIC0gc2VhcmNoTGVuZ3RoO1xuICAgIGlmIChzdGFydCA8IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICRsYXN0SW5kZXhPZi5jYWxsKHN0cmluZywgc2VhcmNoU3RyaW5nLCBzdGFydCkgPT0gc3RhcnQ7XG4gIH1cbiAgZnVuY3Rpb24gY29udGFpbnMoc2VhcmNoKSB7XG4gICAgaWYgKHRoaXMgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgdmFyIHN0cmluZ0xlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gICAgdmFyIHNlYXJjaFN0cmluZyA9IFN0cmluZyhzZWFyY2gpO1xuICAgIHZhciBzZWFyY2hMZW5ndGggPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICAgIHZhciBwb3NpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICAgIHZhciBwb3MgPSBwb3NpdGlvbiA/IE51bWJlcihwb3NpdGlvbikgOiAwO1xuICAgIGlmIChpc05hTihwb3MpKSB7XG4gICAgICBwb3MgPSAwO1xuICAgIH1cbiAgICB2YXIgc3RhcnQgPSBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCBzdHJpbmdMZW5ndGgpO1xuICAgIHJldHVybiAkaW5kZXhPZi5jYWxsKHN0cmluZywgc2VhcmNoU3RyaW5nLCBwb3MpICE9IC0xO1xuICB9XG4gIGZ1bmN0aW9uIHJlcGVhdChjb3VudCkge1xuICAgIGlmICh0aGlzID09IG51bGwpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHRoaXMpO1xuICAgIHZhciBuID0gY291bnQgPyBOdW1iZXIoY291bnQpIDogMDtcbiAgICBpZiAoaXNOYU4obikpIHtcbiAgICAgIG4gPSAwO1xuICAgIH1cbiAgICBpZiAobiA8IDAgfHwgbiA9PSBJbmZpbml0eSkge1xuICAgICAgdGhyb3cgUmFuZ2VFcnJvcigpO1xuICAgIH1cbiAgICBpZiAobiA9PSAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICB3aGlsZSAobi0tKSB7XG4gICAgICByZXN1bHQgKz0gc3RyaW5nO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGZ1bmN0aW9uIGNvZGVQb2ludEF0KHBvc2l0aW9uKSB7XG4gICAgaWYgKHRoaXMgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgdmFyIHNpemUgPSBzdHJpbmcubGVuZ3RoO1xuICAgIHZhciBpbmRleCA9IHBvc2l0aW9uID8gTnVtYmVyKHBvc2l0aW9uKSA6IDA7XG4gICAgaWYgKGlzTmFOKGluZGV4KSkge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHNpemUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHZhciBmaXJzdCA9IHN0cmluZy5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICB2YXIgc2Vjb25kO1xuICAgIGlmIChmaXJzdCA+PSAweEQ4MDAgJiYgZmlyc3QgPD0gMHhEQkZGICYmIHNpemUgPiBpbmRleCArIDEpIHtcbiAgICAgIHNlY29uZCA9IHN0cmluZy5jaGFyQ29kZUF0KGluZGV4ICsgMSk7XG4gICAgICBpZiAoc2Vjb25kID49IDB4REMwMCAmJiBzZWNvbmQgPD0gMHhERkZGKSB7XG4gICAgICAgIHJldHVybiAoZmlyc3QgLSAweEQ4MDApICogMHg0MDAgKyBzZWNvbmQgLSAweERDMDAgKyAweDEwMDAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlyc3Q7XG4gIH1cbiAgZnVuY3Rpb24gcmF3KGNhbGxzaXRlKSB7XG4gICAgdmFyIHJhdyA9IGNhbGxzaXRlLnJhdztcbiAgICB2YXIgbGVuID0gcmF3Lmxlbmd0aCA+Pj4gMDtcbiAgICBpZiAobGVuID09PSAwKVxuICAgICAgcmV0dXJuICcnO1xuICAgIHZhciBzID0gJyc7XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBzICs9IHJhd1tpXTtcbiAgICAgIGlmIChpICsgMSA9PT0gbGVuKVxuICAgICAgICByZXR1cm4gcztcbiAgICAgIHMgKz0gYXJndW1lbnRzWysraV07XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGZyb21Db2RlUG9pbnQoKSB7XG4gICAgdmFyIGNvZGVVbml0cyA9IFtdO1xuICAgIHZhciBmbG9vciA9IE1hdGguZmxvb3I7XG4gICAgdmFyIGhpZ2hTdXJyb2dhdGU7XG4gICAgdmFyIGxvd1N1cnJvZ2F0ZTtcbiAgICB2YXIgaW5kZXggPSAtMTtcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIGNvZGVQb2ludCA9IE51bWJlcihhcmd1bWVudHNbaW5kZXhdKTtcbiAgICAgIGlmICghaXNGaW5pdGUoY29kZVBvaW50KSB8fCBjb2RlUG9pbnQgPCAwIHx8IGNvZGVQb2ludCA+IDB4MTBGRkZGIHx8IGZsb29yKGNvZGVQb2ludCkgIT0gY29kZVBvaW50KSB7XG4gICAgICAgIHRocm93IFJhbmdlRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludDogJyArIGNvZGVQb2ludCk7XG4gICAgICB9XG4gICAgICBpZiAoY29kZVBvaW50IDw9IDB4RkZGRikge1xuICAgICAgICBjb2RlVW5pdHMucHVzaChjb2RlUG9pbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29kZVBvaW50IC09IDB4MTAwMDA7XG4gICAgICAgIGhpZ2hTdXJyb2dhdGUgPSAoY29kZVBvaW50ID4+IDEwKSArIDB4RDgwMDtcbiAgICAgICAgbG93U3Vycm9nYXRlID0gKGNvZGVQb2ludCAlIDB4NDAwKSArIDB4REMwMDtcbiAgICAgICAgY29kZVVuaXRzLnB1c2goaGlnaFN1cnJvZ2F0ZSwgbG93U3Vycm9nYXRlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgY29kZVVuaXRzKTtcbiAgfVxuICBmdW5jdGlvbiBzdHJpbmdQcm90b3R5cGVJdGVyYXRvcigpIHtcbiAgICB2YXIgbyA9ICR0cmFjZXVyUnVudGltZS5jaGVja09iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICB2YXIgcyA9IFN0cmluZyhvKTtcbiAgICByZXR1cm4gY3JlYXRlU3RyaW5nSXRlcmF0b3Iocyk7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxTdHJpbmcoZ2xvYmFsKSB7XG4gICAgdmFyIFN0cmluZyA9IGdsb2JhbC5TdHJpbmc7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoU3RyaW5nLnByb3RvdHlwZSwgWydjb2RlUG9pbnRBdCcsIGNvZGVQb2ludEF0LCAnY29udGFpbnMnLCBjb250YWlucywgJ2VuZHNXaXRoJywgZW5kc1dpdGgsICdzdGFydHNXaXRoJywgc3RhcnRzV2l0aCwgJ3JlcGVhdCcsIHJlcGVhdF0pO1xuICAgIG1heWJlQWRkRnVuY3Rpb25zKFN0cmluZywgWydmcm9tQ29kZVBvaW50JywgZnJvbUNvZGVQb2ludCwgJ3JhdycsIHJhd10pO1xuICAgIG1heWJlQWRkSXRlcmF0b3IoU3RyaW5nLnByb3RvdHlwZSwgc3RyaW5nUHJvdG90eXBlSXRlcmF0b3IsIFN5bWJvbCk7XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbFN0cmluZyk7XG4gIHJldHVybiB7XG4gICAgZ2V0IHN0YXJ0c1dpdGgoKSB7XG4gICAgICByZXR1cm4gc3RhcnRzV2l0aDtcbiAgICB9LFxuICAgIGdldCBlbmRzV2l0aCgpIHtcbiAgICAgIHJldHVybiBlbmRzV2l0aDtcbiAgICB9LFxuICAgIGdldCBjb250YWlucygpIHtcbiAgICAgIHJldHVybiBjb250YWlucztcbiAgICB9LFxuICAgIGdldCByZXBlYXQoKSB7XG4gICAgICByZXR1cm4gcmVwZWF0O1xuICAgIH0sXG4gICAgZ2V0IGNvZGVQb2ludEF0KCkge1xuICAgICAgcmV0dXJuIGNvZGVQb2ludEF0O1xuICAgIH0sXG4gICAgZ2V0IHJhdygpIHtcbiAgICAgIHJldHVybiByYXc7XG4gICAgfSxcbiAgICBnZXQgZnJvbUNvZGVQb2ludCgpIHtcbiAgICAgIHJldHVybiBmcm9tQ29kZVBvaW50O1xuICAgIH0sXG4gICAgZ2V0IHN0cmluZ1Byb3RvdHlwZUl0ZXJhdG9yKCkge1xuICAgICAgcmV0dXJuIHN0cmluZ1Byb3RvdHlwZUl0ZXJhdG9yO1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsU3RyaW5nO1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZ1wiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvQXJyYXlJdGVyYXRvclwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgJF9fMzY7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL0FycmF5SXRlcmF0b3JcIjtcbiAgdmFyICRfXzM0ID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgdG9PYmplY3QgPSAkX18zNC50b09iamVjdCxcbiAgICAgIHRvVWludDMyID0gJF9fMzQudG9VaW50MzIsXG4gICAgICBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCA9ICRfXzM0LmNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0O1xuICB2YXIgQVJSQVlfSVRFUkFUT1JfS0lORF9LRVlTID0gMTtcbiAgdmFyIEFSUkFZX0lURVJBVE9SX0tJTkRfVkFMVUVTID0gMjtcbiAgdmFyIEFSUkFZX0lURVJBVE9SX0tJTkRfRU5UUklFUyA9IDM7XG4gIHZhciBBcnJheUl0ZXJhdG9yID0gZnVuY3Rpb24gQXJyYXlJdGVyYXRvcigpIHt9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShBcnJheUl0ZXJhdG9yLCAoJF9fMzYgPSB7fSwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCRfXzM2LCBcIm5leHRcIiwge1xuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpdGVyYXRvciA9IHRvT2JqZWN0KHRoaXMpO1xuICAgICAgdmFyIGFycmF5ID0gaXRlcmF0b3IuaXRlcmF0b3JPYmplY3RfO1xuICAgICAgaWYgKCFhcnJheSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QgaXMgbm90IGFuIEFycmF5SXRlcmF0b3InKTtcbiAgICAgIH1cbiAgICAgIHZhciBpbmRleCA9IGl0ZXJhdG9yLmFycmF5SXRlcmF0b3JOZXh0SW5kZXhfO1xuICAgICAgdmFyIGl0ZW1LaW5kID0gaXRlcmF0b3IuYXJyYXlJdGVyYXRpb25LaW5kXztcbiAgICAgIHZhciBsZW5ndGggPSB0b1VpbnQzMihhcnJheS5sZW5ndGgpO1xuICAgICAgaWYgKGluZGV4ID49IGxlbmd0aCkge1xuICAgICAgICBpdGVyYXRvci5hcnJheUl0ZXJhdG9yTmV4dEluZGV4XyA9IEluZmluaXR5O1xuICAgICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QodW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGl0ZXJhdG9yLmFycmF5SXRlcmF0b3JOZXh0SW5kZXhfID0gaW5kZXggKyAxO1xuICAgICAgaWYgKGl0ZW1LaW5kID09IEFSUkFZX0lURVJBVE9SX0tJTkRfVkFMVUVTKVxuICAgICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QoYXJyYXlbaW5kZXhdLCBmYWxzZSk7XG4gICAgICBpZiAoaXRlbUtpbmQgPT0gQVJSQVlfSVRFUkFUT1JfS0lORF9FTlRSSUVTKVxuICAgICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QoW2luZGV4LCBhcnJheVtpbmRleF1dLCBmYWxzZSk7XG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QoaW5kZXgsIGZhbHNlKTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlXG4gIH0pLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoJF9fMzYsIFN5bWJvbC5pdGVyYXRvciwge1xuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksICRfXzM2KSwge30pO1xuICBmdW5jdGlvbiBjcmVhdGVBcnJheUl0ZXJhdG9yKGFycmF5LCBraW5kKSB7XG4gICAgdmFyIG9iamVjdCA9IHRvT2JqZWN0KGFycmF5KTtcbiAgICB2YXIgaXRlcmF0b3IgPSBuZXcgQXJyYXlJdGVyYXRvcjtcbiAgICBpdGVyYXRvci5pdGVyYXRvck9iamVjdF8gPSBvYmplY3Q7XG4gICAgaXRlcmF0b3IuYXJyYXlJdGVyYXRvck5leHRJbmRleF8gPSAwO1xuICAgIGl0ZXJhdG9yLmFycmF5SXRlcmF0aW9uS2luZF8gPSBraW5kO1xuICAgIHJldHVybiBpdGVyYXRvcjtcbiAgfVxuICBmdW5jdGlvbiBlbnRyaWVzKCkge1xuICAgIHJldHVybiBjcmVhdGVBcnJheUl0ZXJhdG9yKHRoaXMsIEFSUkFZX0lURVJBVE9SX0tJTkRfRU5UUklFUyk7XG4gIH1cbiAgZnVuY3Rpb24ga2V5cygpIHtcbiAgICByZXR1cm4gY3JlYXRlQXJyYXlJdGVyYXRvcih0aGlzLCBBUlJBWV9JVEVSQVRPUl9LSU5EX0tFWVMpO1xuICB9XG4gIGZ1bmN0aW9uIHZhbHVlcygpIHtcbiAgICByZXR1cm4gY3JlYXRlQXJyYXlJdGVyYXRvcih0aGlzLCBBUlJBWV9JVEVSQVRPUl9LSU5EX1ZBTFVFUyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBnZXQgZW50cmllcygpIHtcbiAgICAgIHJldHVybiBlbnRyaWVzO1xuICAgIH0sXG4gICAgZ2V0IGtleXMoKSB7XG4gICAgICByZXR1cm4ga2V5cztcbiAgICB9LFxuICAgIGdldCB2YWx1ZXMoKSB7XG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvQXJyYXlcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvQXJyYXlcIjtcbiAgdmFyICRfXzM3ID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL0FycmF5SXRlcmF0b3JcIiksXG4gICAgICBlbnRyaWVzID0gJF9fMzcuZW50cmllcyxcbiAgICAgIGtleXMgPSAkX18zNy5rZXlzLFxuICAgICAgdmFsdWVzID0gJF9fMzcudmFsdWVzO1xuICB2YXIgJF9fMzggPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBjaGVja0l0ZXJhYmxlID0gJF9fMzguY2hlY2tJdGVyYWJsZSxcbiAgICAgIGlzQ2FsbGFibGUgPSAkX18zOC5pc0NhbGxhYmxlLFxuICAgICAgaXNDb25zdHJ1Y3RvciA9ICRfXzM4LmlzQ29uc3RydWN0b3IsXG4gICAgICBtYXliZUFkZEZ1bmN0aW9ucyA9ICRfXzM4Lm1heWJlQWRkRnVuY3Rpb25zLFxuICAgICAgbWF5YmVBZGRJdGVyYXRvciA9ICRfXzM4Lm1heWJlQWRkSXRlcmF0b3IsXG4gICAgICByZWdpc3RlclBvbHlmaWxsID0gJF9fMzgucmVnaXN0ZXJQb2x5ZmlsbCxcbiAgICAgIHRvSW50ZWdlciA9ICRfXzM4LnRvSW50ZWdlcixcbiAgICAgIHRvTGVuZ3RoID0gJF9fMzgudG9MZW5ndGgsXG4gICAgICB0b09iamVjdCA9ICRfXzM4LnRvT2JqZWN0O1xuICBmdW5jdGlvbiBmcm9tKGFyckxpa2UpIHtcbiAgICB2YXIgbWFwRm4gPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMl07XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBpdGVtcyA9IHRvT2JqZWN0KGFyckxpa2UpO1xuICAgIHZhciBtYXBwaW5nID0gbWFwRm4gIT09IHVuZGVmaW5lZDtcbiAgICB2YXIgayA9IDA7XG4gICAgdmFyIGFycixcbiAgICAgICAgbGVuO1xuICAgIGlmIChtYXBwaW5nICYmICFpc0NhbGxhYmxlKG1hcEZuKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIGlmIChjaGVja0l0ZXJhYmxlKGl0ZW1zKSkge1xuICAgICAgYXJyID0gaXNDb25zdHJ1Y3RvcihDKSA/IG5ldyBDKCkgOiBbXTtcbiAgICAgIGZvciAodmFyICRfXzM5ID0gaXRlbXNbU3ltYm9sLml0ZXJhdG9yXSgpLFxuICAgICAgICAgICRfXzQwOyAhKCRfXzQwID0gJF9fMzkubmV4dCgpKS5kb25lOyApIHtcbiAgICAgICAgdmFyIGl0ZW0gPSAkX180MC52YWx1ZTtcbiAgICAgICAge1xuICAgICAgICAgIGlmIChtYXBwaW5nKSB7XG4gICAgICAgICAgICBhcnJba10gPSBtYXBGbi5jYWxsKHRoaXNBcmcsIGl0ZW0sIGspO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnJba10gPSBpdGVtO1xuICAgICAgICAgIH1cbiAgICAgICAgICBrKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFyci5sZW5ndGggPSBrO1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG4gICAgbGVuID0gdG9MZW5ndGgoaXRlbXMubGVuZ3RoKTtcbiAgICBhcnIgPSBpc0NvbnN0cnVjdG9yKEMpID8gbmV3IEMobGVuKSA6IG5ldyBBcnJheShsZW4pO1xuICAgIGZvciAoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgIGlmIChtYXBwaW5nKSB7XG4gICAgICAgIGFycltrXSA9IHR5cGVvZiB0aGlzQXJnID09PSAndW5kZWZpbmVkJyA/IG1hcEZuKGl0ZW1zW2tdLCBrKSA6IG1hcEZuLmNhbGwodGhpc0FyZywgaXRlbXNba10sIGspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXJyW2tdID0gaXRlbXNba107XG4gICAgICB9XG4gICAgfVxuICAgIGFyci5sZW5ndGggPSBsZW47XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuICBmdW5jdGlvbiBvZigpIHtcbiAgICBmb3IgKHZhciBpdGVtcyA9IFtdLFxuICAgICAgICAkX180MSA9IDA7ICRfXzQxIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNDErKylcbiAgICAgIGl0ZW1zWyRfXzQxXSA9IGFyZ3VtZW50c1skX180MV07XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBsZW4gPSBpdGVtcy5sZW5ndGg7XG4gICAgdmFyIGFyciA9IGlzQ29uc3RydWN0b3IoQykgPyBuZXcgQyhsZW4pIDogbmV3IEFycmF5KGxlbik7XG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBsZW47IGsrKykge1xuICAgICAgYXJyW2tdID0gaXRlbXNba107XG4gICAgfVxuICAgIGFyci5sZW5ndGggPSBsZW47XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuICBmdW5jdGlvbiBmaWxsKHZhbHVlKSB7XG4gICAgdmFyIHN0YXJ0ID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gICAgdmFyIGVuZCA9IGFyZ3VtZW50c1syXTtcbiAgICB2YXIgb2JqZWN0ID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbiA9IHRvTGVuZ3RoKG9iamVjdC5sZW5ndGgpO1xuICAgIHZhciBmaWxsU3RhcnQgPSB0b0ludGVnZXIoc3RhcnQpO1xuICAgIHZhciBmaWxsRW5kID0gZW5kICE9PSB1bmRlZmluZWQgPyB0b0ludGVnZXIoZW5kKSA6IGxlbjtcbiAgICBmaWxsU3RhcnQgPSBmaWxsU3RhcnQgPCAwID8gTWF0aC5tYXgobGVuICsgZmlsbFN0YXJ0LCAwKSA6IE1hdGgubWluKGZpbGxTdGFydCwgbGVuKTtcbiAgICBmaWxsRW5kID0gZmlsbEVuZCA8IDAgPyBNYXRoLm1heChsZW4gKyBmaWxsRW5kLCAwKSA6IE1hdGgubWluKGZpbGxFbmQsIGxlbik7XG4gICAgd2hpbGUgKGZpbGxTdGFydCA8IGZpbGxFbmQpIHtcbiAgICAgIG9iamVjdFtmaWxsU3RhcnRdID0gdmFsdWU7XG4gICAgICBmaWxsU3RhcnQrKztcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBmaW5kKHByZWRpY2F0ZSkge1xuICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgIHJldHVybiBmaW5kSGVscGVyKHRoaXMsIHByZWRpY2F0ZSwgdGhpc0FyZyk7XG4gIH1cbiAgZnVuY3Rpb24gZmluZEluZGV4KHByZWRpY2F0ZSkge1xuICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgIHJldHVybiBmaW5kSGVscGVyKHRoaXMsIHByZWRpY2F0ZSwgdGhpc0FyZywgdHJ1ZSk7XG4gIH1cbiAgZnVuY3Rpb24gZmluZEhlbHBlcihzZWxmLCBwcmVkaWNhdGUpIHtcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1syXTtcbiAgICB2YXIgcmV0dXJuSW5kZXggPSBhcmd1bWVudHNbM10gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzNdIDogZmFsc2U7XG4gICAgdmFyIG9iamVjdCA9IHRvT2JqZWN0KHNlbGYpO1xuICAgIHZhciBsZW4gPSB0b0xlbmd0aChvYmplY3QubGVuZ3RoKTtcbiAgICBpZiAoIWlzQ2FsbGFibGUocHJlZGljYXRlKSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChpIGluIG9iamVjdCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBvYmplY3RbaV07XG4gICAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgb2JqZWN0KSkge1xuICAgICAgICAgIHJldHVybiByZXR1cm5JbmRleCA/IGkgOiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuSW5kZXggPyAtMSA6IHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbEFycmF5KGdsb2JhbCkge1xuICAgIHZhciAkX180MiA9IGdsb2JhbCxcbiAgICAgICAgQXJyYXkgPSAkX180Mi5BcnJheSxcbiAgICAgICAgT2JqZWN0ID0gJF9fNDIuT2JqZWN0LFxuICAgICAgICBTeW1ib2wgPSAkX180Mi5TeW1ib2w7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoQXJyYXkucHJvdG90eXBlLCBbJ2VudHJpZXMnLCBlbnRyaWVzLCAna2V5cycsIGtleXMsICd2YWx1ZXMnLCB2YWx1ZXMsICdmaWxsJywgZmlsbCwgJ2ZpbmQnLCBmaW5kLCAnZmluZEluZGV4JywgZmluZEluZGV4XSk7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoQXJyYXksIFsnZnJvbScsIGZyb20sICdvZicsIG9mXSk7XG4gICAgbWF5YmVBZGRJdGVyYXRvcihBcnJheS5wcm90b3R5cGUsIHZhbHVlcywgU3ltYm9sKTtcbiAgICBtYXliZUFkZEl0ZXJhdG9yKE9iamVjdC5nZXRQcm90b3R5cGVPZihbXS52YWx1ZXMoKSksIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgU3ltYm9sKTtcbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsQXJyYXkpO1xuICByZXR1cm4ge1xuICAgIGdldCBmcm9tKCkge1xuICAgICAgcmV0dXJuIGZyb207XG4gICAgfSxcbiAgICBnZXQgb2YoKSB7XG4gICAgICByZXR1cm4gb2Y7XG4gICAgfSxcbiAgICBnZXQgZmlsbCgpIHtcbiAgICAgIHJldHVybiBmaWxsO1xuICAgIH0sXG4gICAgZ2V0IGZpbmQoKSB7XG4gICAgICByZXR1cm4gZmluZDtcbiAgICB9LFxuICAgIGdldCBmaW5kSW5kZXgoKSB7XG4gICAgICByZXR1cm4gZmluZEluZGV4O1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsQXJyYXkoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxBcnJheTtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheVwiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvT2JqZWN0XCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL09iamVjdFwiO1xuICB2YXIgJF9fNDMgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBtYXliZUFkZEZ1bmN0aW9ucyA9ICRfXzQzLm1heWJlQWRkRnVuY3Rpb25zLFxuICAgICAgcmVnaXN0ZXJQb2x5ZmlsbCA9ICRfXzQzLnJlZ2lzdGVyUG9seWZpbGw7XG4gIHZhciAkX180NCA9ICR0cmFjZXVyUnVudGltZSxcbiAgICAgIGRlZmluZVByb3BlcnR5ID0gJF9fNDQuZGVmaW5lUHJvcGVydHksXG4gICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSAkX180NC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gICAgICBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gJF9fNDQuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgICAgIGtleXMgPSAkX180NC5rZXlzLFxuICAgICAgcHJpdmF0ZU5hbWVzID0gJF9fNDQucHJpdmF0ZU5hbWVzO1xuICBmdW5jdGlvbiBpcyhsZWZ0LCByaWdodCkge1xuICAgIGlmIChsZWZ0ID09PSByaWdodClcbiAgICAgIHJldHVybiBsZWZ0ICE9PSAwIHx8IDEgLyBsZWZ0ID09PSAxIC8gcmlnaHQ7XG4gICAgcmV0dXJuIGxlZnQgIT09IGxlZnQgJiYgcmlnaHQgIT09IHJpZ2h0O1xuICB9XG4gIGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIHZhciBwcm9wcyA9IGtleXMoc291cmNlKTtcbiAgICAgIHZhciBwLFxuICAgICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcbiAgICAgIGZvciAocCA9IDA7IHAgPCBsZW5ndGg7IHArKykge1xuICAgICAgICB2YXIgbmFtZSA9IHByb3BzW3BdO1xuICAgICAgICBpZiAocHJpdmF0ZU5hbWVzW25hbWVdKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBzb3VyY2VbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgZnVuY3Rpb24gbWl4aW4odGFyZ2V0LCBzb3VyY2UpIHtcbiAgICB2YXIgcHJvcHMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSk7XG4gICAgdmFyIHAsXG4gICAgICAgIGRlc2NyaXB0b3IsXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcbiAgICBmb3IgKHAgPSAwOyBwIDwgbGVuZ3RoOyBwKyspIHtcbiAgICAgIHZhciBuYW1lID0gcHJvcHNbcF07XG4gICAgICBpZiAocHJpdmF0ZU5hbWVzW25hbWVdKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBwcm9wc1twXSk7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BzW3BdLCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbE9iamVjdChnbG9iYWwpIHtcbiAgICB2YXIgT2JqZWN0ID0gZ2xvYmFsLk9iamVjdDtcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhPYmplY3QsIFsnYXNzaWduJywgYXNzaWduLCAnaXMnLCBpcywgJ21peGluJywgbWl4aW5dKTtcbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsT2JqZWN0KTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgaXMoKSB7XG4gICAgICByZXR1cm4gaXM7XG4gICAgfSxcbiAgICBnZXQgYXNzaWduKCkge1xuICAgICAgcmV0dXJuIGFzc2lnbjtcbiAgICB9LFxuICAgIGdldCBtaXhpbigpIHtcbiAgICAgIHJldHVybiBtaXhpbjtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbE9iamVjdCgpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbE9iamVjdDtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9PYmplY3RcIiArICcnKTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL051bWJlclwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9OdW1iZXJcIjtcbiAgdmFyICRfXzQ2ID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgaXNOdW1iZXIgPSAkX180Ni5pc051bWJlcixcbiAgICAgIG1heWJlQWRkQ29uc3RzID0gJF9fNDYubWF5YmVBZGRDb25zdHMsXG4gICAgICBtYXliZUFkZEZ1bmN0aW9ucyA9ICRfXzQ2Lm1heWJlQWRkRnVuY3Rpb25zLFxuICAgICAgcmVnaXN0ZXJQb2x5ZmlsbCA9ICRfXzQ2LnJlZ2lzdGVyUG9seWZpbGwsXG4gICAgICB0b0ludGVnZXIgPSAkX180Ni50b0ludGVnZXI7XG4gIHZhciAkYWJzID0gTWF0aC5hYnM7XG4gIHZhciAkaXNGaW5pdGUgPSBpc0Zpbml0ZTtcbiAgdmFyICRpc05hTiA9IGlzTmFOO1xuICB2YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG4gIHZhciBNSU5fU0FGRV9JTlRFR0VSID0gLU1hdGgucG93KDIsIDUzKSArIDE7XG4gIHZhciBFUFNJTE9OID0gTWF0aC5wb3coMiwgLTUyKTtcbiAgZnVuY3Rpb24gTnVtYmVySXNGaW5pdGUobnVtYmVyKSB7XG4gICAgcmV0dXJuIGlzTnVtYmVyKG51bWJlcikgJiYgJGlzRmluaXRlKG51bWJlcik7XG4gIH1cbiAgO1xuICBmdW5jdGlvbiBpc0ludGVnZXIobnVtYmVyKSB7XG4gICAgcmV0dXJuIE51bWJlcklzRmluaXRlKG51bWJlcikgJiYgdG9JbnRlZ2VyKG51bWJlcikgPT09IG51bWJlcjtcbiAgfVxuICBmdW5jdGlvbiBOdW1iZXJJc05hTihudW1iZXIpIHtcbiAgICByZXR1cm4gaXNOdW1iZXIobnVtYmVyKSAmJiAkaXNOYU4obnVtYmVyKTtcbiAgfVxuICA7XG4gIGZ1bmN0aW9uIGlzU2FmZUludGVnZXIobnVtYmVyKSB7XG4gICAgaWYgKE51bWJlcklzRmluaXRlKG51bWJlcikpIHtcbiAgICAgIHZhciBpbnRlZ3JhbCA9IHRvSW50ZWdlcihudW1iZXIpO1xuICAgICAgaWYgKGludGVncmFsID09PSBudW1iZXIpXG4gICAgICAgIHJldHVybiAkYWJzKGludGVncmFsKSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gcG9seWZpbGxOdW1iZXIoZ2xvYmFsKSB7XG4gICAgdmFyIE51bWJlciA9IGdsb2JhbC5OdW1iZXI7XG4gICAgbWF5YmVBZGRDb25zdHMoTnVtYmVyLCBbJ01BWF9TQUZFX0lOVEVHRVInLCBNQVhfU0FGRV9JTlRFR0VSLCAnTUlOX1NBRkVfSU5URUdFUicsIE1JTl9TQUZFX0lOVEVHRVIsICdFUFNJTE9OJywgRVBTSUxPTl0pO1xuICAgIG1heWJlQWRkRnVuY3Rpb25zKE51bWJlciwgWydpc0Zpbml0ZScsIE51bWJlcklzRmluaXRlLCAnaXNJbnRlZ2VyJywgaXNJbnRlZ2VyLCAnaXNOYU4nLCBOdW1iZXJJc05hTiwgJ2lzU2FmZUludGVnZXInLCBpc1NhZmVJbnRlZ2VyXSk7XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbE51bWJlcik7XG4gIHJldHVybiB7XG4gICAgZ2V0IE1BWF9TQUZFX0lOVEVHRVIoKSB7XG4gICAgICByZXR1cm4gTUFYX1NBRkVfSU5URUdFUjtcbiAgICB9LFxuICAgIGdldCBNSU5fU0FGRV9JTlRFR0VSKCkge1xuICAgICAgcmV0dXJuIE1JTl9TQUZFX0lOVEVHRVI7XG4gICAgfSxcbiAgICBnZXQgRVBTSUxPTigpIHtcbiAgICAgIHJldHVybiBFUFNJTE9OO1xuICAgIH0sXG4gICAgZ2V0IGlzRmluaXRlKCkge1xuICAgICAgcmV0dXJuIE51bWJlcklzRmluaXRlO1xuICAgIH0sXG4gICAgZ2V0IGlzSW50ZWdlcigpIHtcbiAgICAgIHJldHVybiBpc0ludGVnZXI7XG4gICAgfSxcbiAgICBnZXQgaXNOYU4oKSB7XG4gICAgICByZXR1cm4gTnVtYmVySXNOYU47XG4gICAgfSxcbiAgICBnZXQgaXNTYWZlSW50ZWdlcigpIHtcbiAgICAgIHJldHVybiBpc1NhZmVJbnRlZ2VyO1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsTnVtYmVyKCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsTnVtYmVyO1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL051bWJlclwiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvcG9seWZpbGxzXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3BvbHlmaWxsc1wiO1xuICB2YXIgcG9seWZpbGxBbGwgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIikucG9seWZpbGxBbGw7XG4gIHBvbHlmaWxsQWxsKHRoaXMpO1xuICB2YXIgc2V0dXBHbG9iYWxzID0gJHRyYWNldXJSdW50aW1lLnNldHVwR2xvYmFscztcbiAgJHRyYWNldXJSdW50aW1lLnNldHVwR2xvYmFscyA9IGZ1bmN0aW9uKGdsb2JhbCkge1xuICAgIHNldHVwR2xvYmFscyhnbG9iYWwpO1xuICAgIHBvbHlmaWxsQWxsKGdsb2JhbCk7XG4gIH07XG4gIHJldHVybiB7fTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3BvbHlmaWxsc1wiICsgJycpO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCJfcHJvY2Vzc1wiOjN9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuO1xuKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIG5hdmlnYXRvciwgdW5kZWZpbmVkKSB7XG4gIHZhciB1dGlscyxcbiAgICAgIGVycm9yLFxuICAgICAgZGVmYXVsdE9wdGlvbnMsXG4gICAgICBpc1N1cHBvcnRlZCxcbiAgICAgIGlzV2ViQ2FtR0lGU3VwcG9ydGVkLFxuICAgICAgaXNFeGlzdGluZ0ltYWdlc0dJRlN1cHBvcnRlZCxcbiAgICAgIGlzRXhpc3RpbmdWaWRlb0dJRlN1cHBvcnRlZCxcbiAgICAgIE5ldVF1YW50LFxuICAgICAgcHJvY2Vzc0ZyYW1lV29ya2VyLFxuICAgICAgZ2lmV3JpdGVyLFxuICAgICAgQW5pbWF0ZWRHSUYsXG4gICAgICBnZXRCYXNlNjRHSUYsXG4gICAgICBleGlzdGluZ0ltYWdlcyxcbiAgICAgIHNjcmVlblNob3QsXG4gICAgICB2aWRlb1N0cmVhbSxcbiAgICAgIHN0b3BWaWRlb1N0cmVhbWluZyxcbiAgICAgIGNyZWF0ZUFuZEdldEdJRixcbiAgICAgIGV4aXN0aW5nVmlkZW8sXG4gICAgICBleGlzdGluZ1dlYmNhbSxcbiAgICAgIGNyZWF0ZUdJRixcbiAgICAgIHRha2VTbmFwU2hvdCxcbiAgICAgIEFQSSxcbiAgICAgIF9pbmRleF87XG4gIHV0aWxzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHV0aWxzID0ge1xuICAgICAgJ1VSTCc6IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3cubW96VVJMIHx8IHdpbmRvdy5tc1VSTCxcbiAgICAgICdnZXRVc2VyTWVkaWEnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGdldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci5tc0dldFVzZXJNZWRpYTtcbiAgICAgICAgcmV0dXJuIGdldFVzZXJNZWRpYSA/IGdldFVzZXJNZWRpYS5iaW5kKG5hdmlnYXRvcikgOiBnZXRVc2VyTWVkaWE7XG4gICAgICB9KCksXG4gICAgICAnQmxvYic6IHdpbmRvdy5CbG9iIHx8IHdpbmRvdy5CbG9iQnVpbGRlciB8fCB3aW5kb3cuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgd2luZG93Lk1vekJsb2JCdWlsZGVyIHx8IHdpbmRvdy5NU0Jsb2JCdWlsZGVyLFxuICAgICAgJ2J0b2EnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJ0b2EgPSB3aW5kb3cuYnRvYSB8fCBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICAgIHZhciBvdXRwdXQgPSAnJyxcbiAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgIGwgPSBpbnB1dC5sZW5ndGgsXG4gICAgICAgICAgICAgIGtleSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPScsXG4gICAgICAgICAgICAgIGNocjEsXG4gICAgICAgICAgICAgIGNocjIsXG4gICAgICAgICAgICAgIGNocjMsXG4gICAgICAgICAgICAgIGVuYzEsXG4gICAgICAgICAgICAgIGVuYzIsXG4gICAgICAgICAgICAgIGVuYzMsXG4gICAgICAgICAgICAgIGVuYzQ7XG4gICAgICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICAgICBjaHIxID0gaW5wdXQuY2hhckNvZGVBdChpKyspO1xuICAgICAgICAgICAgY2hyMiA9IGlucHV0LmNoYXJDb2RlQXQoaSsrKTtcbiAgICAgICAgICAgIGNocjMgPSBpbnB1dC5jaGFyQ29kZUF0KGkrKyk7XG4gICAgICAgICAgICBlbmMxID0gY2hyMSA+PiAyO1xuICAgICAgICAgICAgZW5jMiA9IChjaHIxICYgMykgPDwgNCB8IGNocjIgPj4gNDtcbiAgICAgICAgICAgIGVuYzMgPSAoY2hyMiAmIDE1KSA8PCAyIHwgY2hyMyA+PiA2O1xuICAgICAgICAgICAgZW5jNCA9IGNocjMgJiA2MztcbiAgICAgICAgICAgIGlmIChpc05hTihjaHIyKSlcbiAgICAgICAgICAgICAgZW5jMyA9IGVuYzQgPSA2NDtcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzTmFOKGNocjMpKVxuICAgICAgICAgICAgICBlbmM0ID0gNjQ7XG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgKyBrZXkuY2hhckF0KGVuYzEpICsga2V5LmNoYXJBdChlbmMyKSArIGtleS5jaGFyQXQoZW5jMykgKyBrZXkuY2hhckF0KGVuYzQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYnRvYSA/IGJ0b2EuYmluZCh3aW5kb3cpIDogZnVuY3Rpb24oKSB7fTtcbiAgICAgIH0oKSxcbiAgICAgICdpc09iamVjdCc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJztcbiAgICAgIH0sXG4gICAgICAnaXNFbXB0eU9iamVjdCc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gdXRpbHMuaXNPYmplY3Qob2JqKSAmJiAhT2JqZWN0LmtleXMob2JqKS5sZW5ndGg7XG4gICAgICB9LFxuICAgICAgJ2lzQXJyYXknOiBmdW5jdGlvbihhcnIpIHtcbiAgICAgICAgcmV0dXJuIGFyciAmJiBBcnJheS5pc0FycmF5KGFycik7XG4gICAgICB9LFxuICAgICAgJ2lzRnVuY3Rpb24nOiBmdW5jdGlvbihmdW5jKSB7XG4gICAgICAgIHJldHVybiBmdW5jICYmIHR5cGVvZiBmdW5jID09PSAnZnVuY3Rpb24nO1xuICAgICAgfSxcbiAgICAgICdpc0VsZW1lbnQnOiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgIHJldHVybiBlbGVtICYmIGVsZW0ubm9kZVR5cGUgPT09IDE7XG4gICAgICB9LFxuICAgICAgJ2lzU3RyaW5nJzogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG4gICAgICB9LFxuICAgICAgJ2lzU3VwcG9ydGVkJzoge1xuICAgICAgICAnY2FudmFzJzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgcmV0dXJuIGVsICYmIGVsLmdldENvbnRleHQgJiYgZWwuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3dlYndvcmtlcnMnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gd2luZG93LldvcmtlcjtcbiAgICAgICAgfSxcbiAgICAgICAgJ2Jsb2InOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdXRpbHMuQmxvYjtcbiAgICAgICAgfSxcbiAgICAgICAgJ1VpbnQ4QXJyYXknOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gd2luZG93LlVpbnQ4QXJyYXk7XG4gICAgICAgIH0sXG4gICAgICAgICdVaW50MzJBcnJheSc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cuVWludDMyQXJyYXk7XG4gICAgICAgIH0sXG4gICAgICAgICd2aWRlb0NvZGVjcyc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB0ZXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpLFxuICAgICAgICAgICAgICBzdXBwb3J0T2JqID0ge1xuICAgICAgICAgICAgICAgICdtcDQnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnaDI2NCc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdvZ3YnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnb2dnJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ3dlYm0nOiBmYWxzZVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgIGlmICh0ZXN0RWwgJiYgdGVzdEVsLmNhblBsYXlUeXBlKSB7XG4gICAgICAgICAgICBzdXBwb3J0T2JqLm1wNCA9IHRlc3RFbC5jYW5QbGF5VHlwZSgndmlkZW8vbXA0OyBjb2RlY3M9XCJtcDR2LjIwLjhcIicpICE9PSAnJztcbiAgICAgICAgICAgIHN1cHBvcnRPYmouaDI2NCA9ICh0ZXN0RWwuY2FuUGxheVR5cGUoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUVcIicpIHx8IHRlc3RFbC5jYW5QbGF5VHlwZSgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSwgbXA0YS40MC4yXCInKSkgIT09ICcnO1xuICAgICAgICAgICAgc3VwcG9ydE9iai5vZ3YgPSB0ZXN0RWwuY2FuUGxheVR5cGUoJ3ZpZGVvL29nZzsgY29kZWNzPVwidGhlb3JhXCInKSAhPT0gJyc7XG4gICAgICAgICAgICBzdXBwb3J0T2JqLm9nZyA9IHRlc3RFbC5jYW5QbGF5VHlwZSgndmlkZW8vb2dnOyBjb2RlY3M9XCJ0aGVvcmFcIicpICE9PSAnJztcbiAgICAgICAgICAgIHN1cHBvcnRPYmoud2VibSA9IHRlc3RFbC5jYW5QbGF5VHlwZSgndmlkZW8vd2VibTsgY29kZWNzPVwidnA4LCB2b3JiaXNcIicpICE9PSAtMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN1cHBvcnRPYmo7XG4gICAgICAgIH0oKVxuICAgICAgfSxcbiAgICAgICdub29wJzogZnVuY3Rpb24oKSB7fSxcbiAgICAgICdlYWNoJzogZnVuY3Rpb24oY29sbGVjdGlvbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHgsXG4gICAgICAgICAgICBsZW47XG4gICAgICAgIGlmICh1dGlscy5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgICAgeCA9IC0xO1xuICAgICAgICAgIGxlbiA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlICgrK3ggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayh4LCBjb2xsZWN0aW9uW3hdKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgICAgZm9yICh4IGluIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uLmhhc093blByb3BlcnR5KHgpKSB7XG4gICAgICAgICAgICAgIGlmIChjYWxsYmFjayh4LCBjb2xsZWN0aW9uW3hdKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdtZXJnZU9wdGlvbnMnOiBmdW5jdGlvbiBkZWVwTWVyZ2UoZGVmYXVsdE9wdGlvbnMsIHVzZXJPcHRpb25zKSB7XG4gICAgICAgIGlmICghdXRpbHMuaXNPYmplY3QoZGVmYXVsdE9wdGlvbnMpIHx8ICF1dGlscy5pc09iamVjdCh1c2VyT3B0aW9ucykgfHwgIU9iamVjdC5rZXlzKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdPYmogPSB7fTtcbiAgICAgICAgdXRpbHMuZWFjaChkZWZhdWx0T3B0aW9ucywgZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICBuZXdPYmpba2V5XSA9IGRlZmF1bHRPcHRpb25zW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgICB1dGlscy5lYWNoKHVzZXJPcHRpb25zLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgIHZhciBjdXJyZW50VXNlck9wdGlvbiA9IHVzZXJPcHRpb25zW2tleV07XG4gICAgICAgICAgaWYgKCF1dGlscy5pc09iamVjdChjdXJyZW50VXNlck9wdGlvbikpIHtcbiAgICAgICAgICAgIG5ld09ialtrZXldID0gY3VycmVudFVzZXJPcHRpb247XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghZGVmYXVsdE9wdGlvbnNba2V5XSkge1xuICAgICAgICAgICAgICBuZXdPYmpba2V5XSA9IGN1cnJlbnRVc2VyT3B0aW9uO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3T2JqW2tleV0gPSBkZWVwTWVyZ2UoZGVmYXVsdE9wdGlvbnNba2V5XSwgY3VycmVudFVzZXJPcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXdPYmo7XG4gICAgICB9LFxuICAgICAgJ3NldENTU0F0dHInOiBmdW5jdGlvbihlbGVtLCBhdHRyLCB2YWwpIHtcbiAgICAgICAgaWYgKCF1dGlscy5pc0VsZW1lbnQoZWxlbSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGF0dHIpICYmIHV0aWxzLmlzU3RyaW5nKHZhbCkpIHtcbiAgICAgICAgICBlbGVtLnN0eWxlW2F0dHJdID0gdmFsO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGF0dHIpKSB7XG4gICAgICAgICAgdXRpbHMuZWFjaChhdHRyLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgZWxlbS5zdHlsZVtrZXldID0gdmFsO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3JlbW92ZUVsZW1lbnQnOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIGlmICghdXRpbHMuaXNFbGVtZW50KG5vZGUpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnY3JlYXRlV2ViV29ya2VyJzogZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgICBpZiAoIXV0aWxzLmlzU3RyaW5nKGNvbnRlbnQpKSB7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIGJsb2IgPSBuZXcgdXRpbHMuQmxvYihbY29udGVudF0sIHsndHlwZSc6ICd0ZXh0L2phdmFzY3JpcHQnfSksXG4gICAgICAgICAgICAgIG9iamVjdFVybCA9IHV0aWxzLlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYiksXG4gICAgICAgICAgICAgIHdvcmtlciA9IG5ldyBXb3JrZXIob2JqZWN0VXJsKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ29iamVjdFVybCc6IG9iamVjdFVybCxcbiAgICAgICAgICAgICd3b3JrZXInOiB3b3JrZXJcbiAgICAgICAgICB9O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuICcnICsgZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdnZXRFeHRlbnNpb24nOiBmdW5jdGlvbihzcmMpIHtcbiAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoc3JjLmxhc3RJbmRleE9mKCcuJykgKyAxLCBzcmMubGVuZ3RoKTtcbiAgICAgIH0sXG4gICAgICAnZ2V0Rm9udFNpemUnOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkgfHwgb3B0aW9ucy5yZXNpemVGb250ID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiBvcHRpb25zLmZvbnRTaXplO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0ZXh0ID0gb3B0aW9ucy50ZXh0LFxuICAgICAgICAgICAgY29udGFpbmVyV2lkdGggPSBvcHRpb25zLmdpZldpZHRoLFxuICAgICAgICAgICAgZm9udFNpemUgPSBwYXJzZUludChvcHRpb25zLmZvbnRTaXplLCAxMCksXG4gICAgICAgICAgICBtaW5Gb250U2l6ZSA9IHBhcnNlSW50KG9wdGlvbnMubWluRm9udFNpemUsIDEwKSxcbiAgICAgICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBjb250YWluZXJXaWR0aCk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgICBzcGFuLnN0eWxlLmZvbnRTaXplID0gZm9udFNpemUgKyAncHgnO1xuICAgICAgICBzcGFuLnN0eWxlLnRleHRJbmRlbnQgPSAnLTk5OTlweCc7XG4gICAgICAgIHNwYW4uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICB3aGlsZSAoc3Bhbi5vZmZzZXRXaWR0aCA+IGNvbnRhaW5lcldpZHRoICYmIGZvbnRTaXplID49IG1pbkZvbnRTaXplKSB7XG4gICAgICAgICAgc3Bhbi5zdHlsZS5mb250U2l6ZSA9IC0tZm9udFNpemUgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc3Bhbik7XG4gICAgICAgIHJldHVybiBmb250U2l6ZSArICdweCc7XG4gICAgICB9LFxuICAgICAgJ3dlYldvcmtlckVycm9yJzogZmFsc2VcbiAgICB9O1xuICAgIHJldHVybiB1dGlscztcbiAgfSgpO1xuICBlcnJvciA9IGZ1bmN0aW9uKHV0aWxzKSB7XG4gICAgdmFyIGVycm9yID0ge1xuICAgICAgJ3ZhbGlkYXRlJzogZnVuY3Rpb24oc2tpcE9iaikge1xuICAgICAgICBza2lwT2JqID0gdXRpbHMuaXNPYmplY3Qoc2tpcE9iaikgPyBza2lwT2JqIDoge307XG4gICAgICAgIHZhciBlcnJvck9iaiA9IHt9O1xuICAgICAgICB1dGlscy5lYWNoKGVycm9yLnZhbGlkYXRvcnMsIGZ1bmN0aW9uKGluZGVjZSwgY3VycmVudFZhbGlkYXRvcikge1xuICAgICAgICAgIHZhciBlcnJvckNvZGUgPSBjdXJyZW50VmFsaWRhdG9yLmVycm9yQ29kZTtcbiAgICAgICAgICBpZiAoIXNraXBPYmpbZXJyb3JDb2RlXSAmJiAhY3VycmVudFZhbGlkYXRvci5jb25kaXRpb24pIHtcbiAgICAgICAgICAgIGVycm9yT2JqID0gY3VycmVudFZhbGlkYXRvcjtcbiAgICAgICAgICAgIGVycm9yT2JqLmVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkZWxldGUgZXJyb3JPYmouY29uZGl0aW9uO1xuICAgICAgICByZXR1cm4gZXJyb3JPYmo7XG4gICAgICB9LFxuICAgICAgJ2lzVmFsaWQnOiBmdW5jdGlvbihza2lwT2JqKSB7XG4gICAgICAgIHZhciBlcnJvck9iaiA9IGVycm9yLnZhbGlkYXRlKHNraXBPYmopLFxuICAgICAgICAgICAgaXNWYWxpZCA9IGVycm9yT2JqLmVycm9yICE9PSB0cnVlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICByZXR1cm4gaXNWYWxpZDtcbiAgICAgIH0sXG4gICAgICAndmFsaWRhdG9ycyc6IFt7XG4gICAgICAgICdjb25kaXRpb24nOiB1dGlscy5pc0Z1bmN0aW9uKHV0aWxzLmdldFVzZXJNZWRpYSksXG4gICAgICAgICdlcnJvckNvZGUnOiAnZ2V0VXNlck1lZGlhJyxcbiAgICAgICAgJ2Vycm9yTXNnJzogJ1RoZSBnZXRVc2VyTWVkaWEgQVBJIGlzIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBicm93c2VyJ1xuICAgICAgfSwge1xuICAgICAgICAnY29uZGl0aW9uJzogdXRpbHMuaXNTdXBwb3J0ZWQuY2FudmFzKCksXG4gICAgICAgICdlcnJvckNvZGUnOiAnY2FudmFzJyxcbiAgICAgICAgJ2Vycm9yTXNnJzogJ0NhbnZhcyBlbGVtZW50cyBhcmUgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXInXG4gICAgICB9LCB7XG4gICAgICAgICdjb25kaXRpb24nOiB1dGlscy5pc1N1cHBvcnRlZC53ZWJ3b3JrZXJzKCksXG4gICAgICAgICdlcnJvckNvZGUnOiAnd2Vid29ya2VycycsXG4gICAgICAgICdlcnJvck1zZyc6ICdUaGUgV2ViIFdvcmtlcnMgQVBJIGlzIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBicm93c2VyJ1xuICAgICAgfSwge1xuICAgICAgICAnY29uZGl0aW9uJzogdXRpbHMuaXNGdW5jdGlvbih1dGlscy5VUkwpLFxuICAgICAgICAnZXJyb3JDb2RlJzogJ3dpbmRvdy5VUkwnLFxuICAgICAgICAnZXJyb3JNc2cnOiAnVGhlIHdpbmRvdy5VUkwgQVBJIGlzIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBicm93c2VyJ1xuICAgICAgfSwge1xuICAgICAgICAnY29uZGl0aW9uJzogdXRpbHMuaXNTdXBwb3J0ZWQuYmxvYigpLFxuICAgICAgICAnZXJyb3JDb2RlJzogJ3dpbmRvdy5CbG9iJyxcbiAgICAgICAgJ2Vycm9yTXNnJzogJ1RoZSB3aW5kb3cuQmxvYiBGaWxlIEFQSSBpcyBub3Qgc3VwcG9ydGVkIGluIHlvdXIgYnJvd3NlcidcbiAgICAgIH0sIHtcbiAgICAgICAgJ2NvbmRpdGlvbic6IHV0aWxzLmlzU3VwcG9ydGVkLlVpbnQ4QXJyYXkoKSxcbiAgICAgICAgJ2Vycm9yQ29kZSc6ICd3aW5kb3cuVWludDhBcnJheScsXG4gICAgICAgICdlcnJvck1zZyc6ICdUaGUgd2luZG93LlVpbnQ4QXJyYXkgZnVuY3Rpb24gY29uc3RydWN0b3IgaXMgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXInXG4gICAgICB9LCB7XG4gICAgICAgICdjb25kaXRpb24nOiB1dGlscy5pc1N1cHBvcnRlZC5VaW50MzJBcnJheSgpLFxuICAgICAgICAnZXJyb3JDb2RlJzogJ3dpbmRvdy5VaW50MzJBcnJheScsXG4gICAgICAgICdlcnJvck1zZyc6ICdUaGUgd2luZG93LlVpbnQzMkFycmF5IGZ1bmN0aW9uIGNvbnN0cnVjdG9yIGlzIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBicm93c2VyJ1xuICAgICAgfV0sXG4gICAgICAnbWVzc2FnZXMnOiB7J3ZpZGVvQ29kZWNzJzoge1xuICAgICAgICAgICdlcnJvckNvZGUnOiAndmlkZW9jb2RlYycsXG4gICAgICAgICAgJ2Vycm9yTXNnJzogJ1RoZSB2aWRlbyBjb2RlYyB5b3UgYXJlIHRyeWluZyB0byB1c2UgaXMgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXInXG4gICAgICAgIH19XG4gICAgfTtcbiAgICByZXR1cm4gZXJyb3I7XG4gIH0odXRpbHMpO1xuICBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAnc2FtcGxlSW50ZXJ2YWwnOiAxMCxcbiAgICAnbnVtV29ya2Vycyc6IDIsXG4gICAgJ2dpZldpZHRoJzogMjAwLFxuICAgICdnaWZIZWlnaHQnOiAyMDAsXG4gICAgJ2ludGVydmFsJzogMC4xLFxuICAgICdudW1GcmFtZXMnOiAxMCxcbiAgICAna2VlcENhbWVyYU9uJzogZmFsc2UsXG4gICAgJ2ltYWdlcyc6IFtdLFxuICAgICd2aWRlbyc6IG51bGwsXG4gICAgJ3dlYmNhbVZpZGVvRWxlbWVudCc6IG51bGwsXG4gICAgJ2NhbWVyYVN0cmVhbSc6IG51bGwsXG4gICAgJ3RleHQnOiAnJyxcbiAgICAnZm9udFdlaWdodCc6ICdub3JtYWwnLFxuICAgICdmb250U2l6ZSc6ICcxNnB4JyxcbiAgICAnbWluRm9udFNpemUnOiAnMTBweCcsXG4gICAgJ3Jlc2l6ZUZvbnQnOiBmYWxzZSxcbiAgICAnZm9udEZhbWlseSc6ICdzYW5zLXNlcmlmJyxcbiAgICAnZm9udENvbG9yJzogJyNmZmZmZmYnLFxuICAgICd0ZXh0QWxpZ24nOiAnY2VudGVyJyxcbiAgICAndGV4dEJhc2VsaW5lJzogJ2JvdHRvbScsXG4gICAgJ3RleHRYQ29vcmRpbmF0ZSc6IG51bGwsXG4gICAgJ3RleHRZQ29vcmRpbmF0ZSc6IG51bGwsXG4gICAgJ3Byb2dyZXNzQ2FsbGJhY2snOiBmdW5jdGlvbihjYXB0dXJlUHJvZ3Jlc3MpIHt9LFxuICAgICdjb21wbGV0ZUNhbGxiYWNrJzogZnVuY3Rpb24oKSB7fSxcbiAgICAnc2F2ZVJlbmRlcmluZ0NvbnRleHRzJzogZmFsc2UsXG4gICAgJ3NhdmVkUmVuZGVyaW5nQ29udGV4dHMnOiBbXVxuICB9O1xuICBpc1N1cHBvcnRlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBlcnJvci5pc1ZhbGlkKCk7XG4gIH07XG4gIGlzV2ViQ2FtR0lGU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGVycm9yLmlzVmFsaWQoKTtcbiAgfTtcbiAgaXNFeGlzdGluZ0ltYWdlc0dJRlN1cHBvcnRlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBza2lwT2JqID0geydnZXRVc2VyTWVkaWEnOiB0cnVlfTtcbiAgICByZXR1cm4gZXJyb3IuaXNWYWxpZChza2lwT2JqKTtcbiAgfTtcbiAgaXNFeGlzdGluZ1ZpZGVvR0lGU3VwcG9ydGVkID0gZnVuY3Rpb24oY29kZWNzKSB7XG4gICAgdmFyIGlzU3VwcG9ydGVkID0gZmFsc2UsXG4gICAgICAgIGhhc1ZhbGlkQ29kZWMgPSBmYWxzZTtcbiAgICBpZiAodXRpbHMuaXNBcnJheShjb2RlY3MpICYmIGNvZGVjcy5sZW5ndGgpIHtcbiAgICAgIHV0aWxzLmVhY2goY29kZWNzLCBmdW5jdGlvbihpbmRlY2UsIGN1cnJlbnRDb2RlYykge1xuICAgICAgICBpZiAodXRpbHMuaXNTdXBwb3J0ZWQudmlkZW9Db2RlY3NbY3VycmVudENvZGVjXSkge1xuICAgICAgICAgIGhhc1ZhbGlkQ29kZWMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICghaGFzVmFsaWRDb2RlYykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1N0cmluZyhjb2RlY3MpICYmIGNvZGVjcy5sZW5ndGgpIHtcbiAgICAgIGlmICghdXRpbHMuaXNTdXBwb3J0ZWQudmlkZW9Db2RlY3NbY29kZWNzXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlcnJvci5pc1ZhbGlkKHsnZ2V0VXNlck1lZGlhJzogdHJ1ZX0pO1xuICB9O1xuICBOZXVRdWFudCA9IGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIE5ldVF1YW50KCkge1xuICAgICAgdmFyIG5ldHNpemUgPSAyNTY7XG4gICAgICB2YXIgcHJpbWUxID0gNDk5O1xuICAgICAgdmFyIHByaW1lMiA9IDQ5MTtcbiAgICAgIHZhciBwcmltZTMgPSA0ODc7XG4gICAgICB2YXIgcHJpbWU0ID0gNTAzO1xuICAgICAgdmFyIG1pbnBpY3R1cmVieXRlcyA9IDMgKiBwcmltZTQ7XG4gICAgICB2YXIgbWF4bmV0cG9zID0gbmV0c2l6ZSAtIDE7XG4gICAgICB2YXIgbmV0Ymlhc3NoaWZ0ID0gNDtcbiAgICAgIHZhciBuY3ljbGVzID0gMTAwO1xuICAgICAgdmFyIGludGJpYXNzaGlmdCA9IDE2O1xuICAgICAgdmFyIGludGJpYXMgPSAxIDw8IGludGJpYXNzaGlmdDtcbiAgICAgIHZhciBnYW1tYXNoaWZ0ID0gMTA7XG4gICAgICB2YXIgZ2FtbWEgPSAxIDw8IGdhbW1hc2hpZnQ7XG4gICAgICB2YXIgYmV0YXNoaWZ0ID0gMTA7XG4gICAgICB2YXIgYmV0YSA9IGludGJpYXMgPj4gYmV0YXNoaWZ0O1xuICAgICAgdmFyIGJldGFnYW1tYSA9IGludGJpYXMgPDwgZ2FtbWFzaGlmdCAtIGJldGFzaGlmdDtcbiAgICAgIHZhciBpbml0cmFkID0gbmV0c2l6ZSA+PiAzO1xuICAgICAgdmFyIHJhZGl1c2JpYXNzaGlmdCA9IDY7XG4gICAgICB2YXIgcmFkaXVzYmlhcyA9IDEgPDwgcmFkaXVzYmlhc3NoaWZ0O1xuICAgICAgdmFyIGluaXRyYWRpdXMgPSBpbml0cmFkICogcmFkaXVzYmlhcztcbiAgICAgIHZhciByYWRpdXNkZWMgPSAzMDtcbiAgICAgIHZhciBhbHBoYWJpYXNzaGlmdCA9IDEwO1xuICAgICAgdmFyIGluaXRhbHBoYSA9IDEgPDwgYWxwaGFiaWFzc2hpZnQ7XG4gICAgICB2YXIgYWxwaGFkZWM7XG4gICAgICB2YXIgcmFkYmlhc3NoaWZ0ID0gODtcbiAgICAgIHZhciByYWRiaWFzID0gMSA8PCByYWRiaWFzc2hpZnQ7XG4gICAgICB2YXIgYWxwaGFyYWRic2hpZnQgPSBhbHBoYWJpYXNzaGlmdCArIHJhZGJpYXNzaGlmdDtcbiAgICAgIHZhciBhbHBoYXJhZGJpYXMgPSAxIDw8IGFscGhhcmFkYnNoaWZ0O1xuICAgICAgdmFyIHRoZXBpY3R1cmU7XG4gICAgICB2YXIgbGVuZ3RoY291bnQ7XG4gICAgICB2YXIgc2FtcGxlZmFjO1xuICAgICAgdmFyIG5ldHdvcms7XG4gICAgICB2YXIgbmV0aW5kZXggPSBbXTtcbiAgICAgIHZhciBiaWFzID0gW107XG4gICAgICB2YXIgZnJlcSA9IFtdO1xuICAgICAgdmFyIHJhZHBvd2VyID0gW107XG4gICAgICBmdW5jdGlvbiBOZXVRdWFudENvbnN0cnVjdG9yKHRoZXBpYywgbGVuLCBzYW1wbGUpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBwO1xuICAgICAgICB0aGVwaWN0dXJlID0gdGhlcGljO1xuICAgICAgICBsZW5ndGhjb3VudCA9IGxlbjtcbiAgICAgICAgc2FtcGxlZmFjID0gc2FtcGxlO1xuICAgICAgICBuZXR3b3JrID0gbmV3IEFycmF5KG5ldHNpemUpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmV0c2l6ZTsgaSsrKSB7XG4gICAgICAgICAgbmV0d29ya1tpXSA9IG5ldyBBcnJheSg0KTtcbiAgICAgICAgICBwID0gbmV0d29ya1tpXTtcbiAgICAgICAgICBwWzBdID0gcFsxXSA9IHBbMl0gPSAoaSA8PCBuZXRiaWFzc2hpZnQgKyA4KSAvIG5ldHNpemUgfCAwO1xuICAgICAgICAgIGZyZXFbaV0gPSBpbnRiaWFzIC8gbmV0c2l6ZSB8IDA7XG4gICAgICAgICAgYmlhc1tpXSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGNvbG9yTWFwKCkge1xuICAgICAgICB2YXIgbWFwID0gW107XG4gICAgICAgIHZhciBpbmRleCA9IG5ldyBBcnJheShuZXRzaXplKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXRzaXplOyBpKyspXG4gICAgICAgICAgaW5kZXhbbmV0d29ya1tpXVszXV0gPSBpO1xuICAgICAgICB2YXIgayA9IDA7XG4gICAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgbmV0c2l6ZTsgbCsrKSB7XG4gICAgICAgICAgdmFyIGogPSBpbmRleFtsXTtcbiAgICAgICAgICBtYXBbaysrXSA9IG5ldHdvcmtbal1bMF07XG4gICAgICAgICAgbWFwW2srK10gPSBuZXR3b3JrW2pdWzFdO1xuICAgICAgICAgIG1hcFtrKytdID0gbmV0d29ya1tqXVsyXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gaW54YnVpbGQoKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgajtcbiAgICAgICAgdmFyIHNtYWxscG9zO1xuICAgICAgICB2YXIgc21hbGx2YWw7XG4gICAgICAgIHZhciBwO1xuICAgICAgICB2YXIgcTtcbiAgICAgICAgdmFyIHByZXZpb3VzY29sO1xuICAgICAgICB2YXIgc3RhcnRwb3M7XG4gICAgICAgIHByZXZpb3VzY29sID0gMDtcbiAgICAgICAgc3RhcnRwb3MgPSAwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmV0c2l6ZTsgaSsrKSB7XG4gICAgICAgICAgcCA9IG5ldHdvcmtbaV07XG4gICAgICAgICAgc21hbGxwb3MgPSBpO1xuICAgICAgICAgIHNtYWxsdmFsID0gcFsxXTtcbiAgICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG5ldHNpemU7IGorKykge1xuICAgICAgICAgICAgcSA9IG5ldHdvcmtbal07XG4gICAgICAgICAgICBpZiAocVsxXSA8IHNtYWxsdmFsKSB7XG4gICAgICAgICAgICAgIHNtYWxscG9zID0gajtcbiAgICAgICAgICAgICAgc21hbGx2YWwgPSBxWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBxID0gbmV0d29ya1tzbWFsbHBvc107XG4gICAgICAgICAgaWYgKGkgIT0gc21hbGxwb3MpIHtcbiAgICAgICAgICAgIGogPSBxWzBdO1xuICAgICAgICAgICAgcVswXSA9IHBbMF07XG4gICAgICAgICAgICBwWzBdID0gajtcbiAgICAgICAgICAgIGogPSBxWzFdO1xuICAgICAgICAgICAgcVsxXSA9IHBbMV07XG4gICAgICAgICAgICBwWzFdID0gajtcbiAgICAgICAgICAgIGogPSBxWzJdO1xuICAgICAgICAgICAgcVsyXSA9IHBbMl07XG4gICAgICAgICAgICBwWzJdID0gajtcbiAgICAgICAgICAgIGogPSBxWzNdO1xuICAgICAgICAgICAgcVszXSA9IHBbM107XG4gICAgICAgICAgICBwWzNdID0gajtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNtYWxsdmFsICE9IHByZXZpb3VzY29sKSB7XG4gICAgICAgICAgICBuZXRpbmRleFtwcmV2aW91c2NvbF0gPSBzdGFydHBvcyArIGkgPj4gMTtcbiAgICAgICAgICAgIGZvciAoaiA9IHByZXZpb3VzY29sICsgMTsgaiA8IHNtYWxsdmFsOyBqKyspIHtcbiAgICAgICAgICAgICAgbmV0aW5kZXhbal0gPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlvdXNjb2wgPSBzbWFsbHZhbDtcbiAgICAgICAgICAgIHN0YXJ0cG9zID0gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbmV0aW5kZXhbcHJldmlvdXNjb2xdID0gc3RhcnRwb3MgKyBtYXhuZXRwb3MgPj4gMTtcbiAgICAgICAgZm9yIChqID0gcHJldmlvdXNjb2wgKyAxOyBqIDwgMjU2OyBqKyspIHtcbiAgICAgICAgICBuZXRpbmRleFtqXSA9IG1heG5ldHBvcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gbGVhcm4oKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgajtcbiAgICAgICAgdmFyIGI7XG4gICAgICAgIHZhciBnO1xuICAgICAgICB2YXIgcjtcbiAgICAgICAgdmFyIHJhZGl1cztcbiAgICAgICAgdmFyIHJhZDtcbiAgICAgICAgdmFyIGFscGhhO1xuICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgdmFyIGRlbHRhO1xuICAgICAgICB2YXIgc2FtcGxlcGl4ZWxzO1xuICAgICAgICB2YXIgcDtcbiAgICAgICAgdmFyIHBpeDtcbiAgICAgICAgdmFyIGxpbTtcbiAgICAgICAgaWYgKGxlbmd0aGNvdW50IDwgbWlucGljdHVyZWJ5dGVzKSB7XG4gICAgICAgICAgc2FtcGxlZmFjID0gMTtcbiAgICAgICAgfVxuICAgICAgICBhbHBoYWRlYyA9IDMwICsgKHNhbXBsZWZhYyAtIDEpIC8gMztcbiAgICAgICAgcCA9IHRoZXBpY3R1cmU7XG4gICAgICAgIHBpeCA9IDA7XG4gICAgICAgIGxpbSA9IGxlbmd0aGNvdW50O1xuICAgICAgICBzYW1wbGVwaXhlbHMgPSBsZW5ndGhjb3VudCAvICgzICogc2FtcGxlZmFjKTtcbiAgICAgICAgZGVsdGEgPSBzYW1wbGVwaXhlbHMgLyBuY3ljbGVzIHwgMDtcbiAgICAgICAgYWxwaGEgPSBpbml0YWxwaGE7XG4gICAgICAgIHJhZGl1cyA9IGluaXRyYWRpdXM7XG4gICAgICAgIHJhZCA9IHJhZGl1cyA+PiByYWRpdXNiaWFzc2hpZnQ7XG4gICAgICAgIGlmIChyYWQgPD0gMSkge1xuICAgICAgICAgIHJhZCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHJhZDsgaSsrKSB7XG4gICAgICAgICAgcmFkcG93ZXJbaV0gPSBhbHBoYSAqICgocmFkICogcmFkIC0gaSAqIGkpICogcmFkYmlhcyAvIChyYWQgKiByYWQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGVuZ3RoY291bnQgPCBtaW5waWN0dXJlYnl0ZXMpIHtcbiAgICAgICAgICBzdGVwID0gMztcbiAgICAgICAgfSBlbHNlIGlmIChsZW5ndGhjb3VudCAlIHByaW1lMSAhPT0gMCkge1xuICAgICAgICAgIHN0ZXAgPSAzICogcHJpbWUxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChsZW5ndGhjb3VudCAlIHByaW1lMiAhPT0gMCkge1xuICAgICAgICAgICAgc3RlcCA9IDMgKiBwcmltZTI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChsZW5ndGhjb3VudCAlIHByaW1lMyAhPT0gMCkge1xuICAgICAgICAgICAgICBzdGVwID0gMyAqIHByaW1lMztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0ZXAgPSAzICogcHJpbWU0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCBzYW1wbGVwaXhlbHMpIHtcbiAgICAgICAgICBiID0gKHBbcGl4ICsgMF0gJiAyNTUpIDw8IG5ldGJpYXNzaGlmdDtcbiAgICAgICAgICBnID0gKHBbcGl4ICsgMV0gJiAyNTUpIDw8IG5ldGJpYXNzaGlmdDtcbiAgICAgICAgICByID0gKHBbcGl4ICsgMl0gJiAyNTUpIDw8IG5ldGJpYXNzaGlmdDtcbiAgICAgICAgICBqID0gY29udGVzdChiLCBnLCByKTtcbiAgICAgICAgICBhbHRlcnNpbmdsZShhbHBoYSwgaiwgYiwgZywgcik7XG4gICAgICAgICAgaWYgKHJhZCAhPT0gMCkge1xuICAgICAgICAgICAgYWx0ZXJuZWlnaChyYWQsIGosIGIsIGcsIHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwaXggKz0gc3RlcDtcbiAgICAgICAgICBpZiAocGl4ID49IGxpbSkge1xuICAgICAgICAgICAgcGl4IC09IGxlbmd0aGNvdW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpKys7XG4gICAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7XG4gICAgICAgICAgICBkZWx0YSA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpICUgZGVsdGEgPT09IDApIHtcbiAgICAgICAgICAgIGFscGhhIC09IGFscGhhIC8gYWxwaGFkZWM7XG4gICAgICAgICAgICByYWRpdXMgLT0gcmFkaXVzIC8gcmFkaXVzZGVjO1xuICAgICAgICAgICAgcmFkID0gcmFkaXVzID4+IHJhZGl1c2JpYXNzaGlmdDtcbiAgICAgICAgICAgIGlmIChyYWQgPD0gMSkge1xuICAgICAgICAgICAgICByYWQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHJhZDsgaisrKSB7XG4gICAgICAgICAgICAgIHJhZHBvd2VyW2pdID0gYWxwaGEgKiAoKHJhZCAqIHJhZCAtIGogKiBqKSAqIHJhZGJpYXMgLyAocmFkICogcmFkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBtYXAoYiwgZywgcikge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIGo7XG4gICAgICAgIHZhciBkaXN0O1xuICAgICAgICB2YXIgYTtcbiAgICAgICAgdmFyIGJlc3RkO1xuICAgICAgICB2YXIgcDtcbiAgICAgICAgdmFyIGJlc3Q7XG4gICAgICAgIGJlc3RkID0gMTAwMDtcbiAgICAgICAgYmVzdCA9IC0xO1xuICAgICAgICBpID0gbmV0aW5kZXhbZ107XG4gICAgICAgIGogPSBpIC0gMTtcbiAgICAgICAgd2hpbGUgKGkgPCBuZXRzaXplIHx8IGogPj0gMCkge1xuICAgICAgICAgIGlmIChpIDwgbmV0c2l6ZSkge1xuICAgICAgICAgICAgcCA9IG5ldHdvcmtbaV07XG4gICAgICAgICAgICBkaXN0ID0gcFsxXSAtIGc7XG4gICAgICAgICAgICBpZiAoZGlzdCA+PSBiZXN0ZCkge1xuICAgICAgICAgICAgICBpID0gbmV0c2l6ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgaWYgKGRpc3QgPCAwKSB7XG4gICAgICAgICAgICAgICAgZGlzdCA9IC1kaXN0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGEgPSBwWzBdIC0gYjtcbiAgICAgICAgICAgICAgaWYgKGEgPCAwKSB7XG4gICAgICAgICAgICAgICAgYSA9IC1hO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc3QgKz0gYTtcbiAgICAgICAgICAgICAgaWYgKGRpc3QgPCBiZXN0ZCkge1xuICAgICAgICAgICAgICAgIGEgPSBwWzJdIC0gcjtcbiAgICAgICAgICAgICAgICBpZiAoYSA8IDApIHtcbiAgICAgICAgICAgICAgICAgIGEgPSAtYTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGlzdCArPSBhO1xuICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgYmVzdGQpIHtcbiAgICAgICAgICAgICAgICAgIGJlc3RkID0gZGlzdDtcbiAgICAgICAgICAgICAgICAgIGJlc3QgPSBwWzNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaiA+PSAwKSB7XG4gICAgICAgICAgICBwID0gbmV0d29ya1tqXTtcbiAgICAgICAgICAgIGRpc3QgPSBnIC0gcFsxXTtcbiAgICAgICAgICAgIGlmIChkaXN0ID49IGJlc3RkKSB7XG4gICAgICAgICAgICAgIGogPSAtMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGotLTtcbiAgICAgICAgICAgICAgaWYgKGRpc3QgPCAwKSB7XG4gICAgICAgICAgICAgICAgZGlzdCA9IC1kaXN0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGEgPSBwWzBdIC0gYjtcbiAgICAgICAgICAgICAgaWYgKGEgPCAwKSB7XG4gICAgICAgICAgICAgICAgYSA9IC1hO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRpc3QgKz0gYTtcbiAgICAgICAgICAgICAgaWYgKGRpc3QgPCBiZXN0ZCkge1xuICAgICAgICAgICAgICAgIGEgPSBwWzJdIC0gcjtcbiAgICAgICAgICAgICAgICBpZiAoYSA8IDApIHtcbiAgICAgICAgICAgICAgICAgIGEgPSAtYTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGlzdCArPSBhO1xuICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgYmVzdGQpIHtcbiAgICAgICAgICAgICAgICAgIGJlc3RkID0gZGlzdDtcbiAgICAgICAgICAgICAgICAgIGJlc3QgPSBwWzNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmVzdDtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHByb2Nlc3MoKSB7XG4gICAgICAgIGxlYXJuKCk7XG4gICAgICAgIHVuYmlhc25ldCgpO1xuICAgICAgICBpbnhidWlsZCgpO1xuICAgICAgICByZXR1cm4gY29sb3JNYXAoKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHVuYmlhc25ldCgpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBqO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmV0c2l6ZTsgaSsrKSB7XG4gICAgICAgICAgbmV0d29ya1tpXVswXSA+Pj0gbmV0Ymlhc3NoaWZ0O1xuICAgICAgICAgIG5ldHdvcmtbaV1bMV0gPj49IG5ldGJpYXNzaGlmdDtcbiAgICAgICAgICBuZXR3b3JrW2ldWzJdID4+PSBuZXRiaWFzc2hpZnQ7XG4gICAgICAgICAgbmV0d29ya1tpXVszXSA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGFsdGVybmVpZ2gocmFkLCBpLCBiLCBnLCByKSB7XG4gICAgICAgIHZhciBqO1xuICAgICAgICB2YXIgaztcbiAgICAgICAgdmFyIGxvO1xuICAgICAgICB2YXIgaGk7XG4gICAgICAgIHZhciBhO1xuICAgICAgICB2YXIgbTtcbiAgICAgICAgdmFyIHA7XG4gICAgICAgIGxvID0gaSAtIHJhZDtcbiAgICAgICAgaWYgKGxvIDwgLTEpIHtcbiAgICAgICAgICBsbyA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGhpID0gaSArIHJhZDtcbiAgICAgICAgaWYgKGhpID4gbmV0c2l6ZSkge1xuICAgICAgICAgIGhpID0gbmV0c2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBqID0gaSArIDE7XG4gICAgICAgIGsgPSBpIC0gMTtcbiAgICAgICAgbSA9IDE7XG4gICAgICAgIHdoaWxlIChqIDwgaGkgfHwgayA+IGxvKSB7XG4gICAgICAgICAgYSA9IHJhZHBvd2VyW20rK107XG4gICAgICAgICAgaWYgKGogPCBoaSkge1xuICAgICAgICAgICAgcCA9IG5ldHdvcmtbaisrXTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHBbMF0gLT0gYSAqIChwWzBdIC0gYikgLyBhbHBoYXJhZGJpYXMgfCAwO1xuICAgICAgICAgICAgICBwWzFdIC09IGEgKiAocFsxXSAtIGcpIC8gYWxwaGFyYWRiaWFzIHwgMDtcbiAgICAgICAgICAgICAgcFsyXSAtPSBhICogKHBbMl0gLSByKSAvIGFscGhhcmFkYmlhcyB8IDA7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoayA+IGxvKSB7XG4gICAgICAgICAgICBwID0gbmV0d29ya1trLS1dO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgcFswXSAtPSBhICogKHBbMF0gLSBiKSAvIGFscGhhcmFkYmlhcyB8IDA7XG4gICAgICAgICAgICAgIHBbMV0gLT0gYSAqIChwWzFdIC0gZykgLyBhbHBoYXJhZGJpYXMgfCAwO1xuICAgICAgICAgICAgICBwWzJdIC09IGEgKiAocFsyXSAtIHIpIC8gYWxwaGFyYWRiaWFzIHwgMDtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBhbHRlcnNpbmdsZShhbHBoYSwgaSwgYiwgZywgcikge1xuICAgICAgICB2YXIgbiA9IG5ldHdvcmtbaV07XG4gICAgICAgIHZhciBhbHBoYU11bHQgPSBhbHBoYSAvIGluaXRhbHBoYTtcbiAgICAgICAgblswXSAtPSBhbHBoYU11bHQgKiAoblswXSAtIGIpIHwgMDtcbiAgICAgICAgblsxXSAtPSBhbHBoYU11bHQgKiAoblsxXSAtIGcpIHwgMDtcbiAgICAgICAgblsyXSAtPSBhbHBoYU11bHQgKiAoblsyXSAtIHIpIHwgMDtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGNvbnRlc3QoYiwgZywgcikge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIGRpc3Q7XG4gICAgICAgIHZhciBhO1xuICAgICAgICB2YXIgYmlhc2Rpc3Q7XG4gICAgICAgIHZhciBiZXRhZnJlcTtcbiAgICAgICAgdmFyIGJlc3Rwb3M7XG4gICAgICAgIHZhciBiZXN0Ymlhc3BvcztcbiAgICAgICAgdmFyIGJlc3RkO1xuICAgICAgICB2YXIgYmVzdGJpYXNkO1xuICAgICAgICB2YXIgbjtcbiAgICAgICAgYmVzdGQgPSB+KDEgPDwgMzEpO1xuICAgICAgICBiZXN0Ymlhc2QgPSBiZXN0ZDtcbiAgICAgICAgYmVzdHBvcyA9IC0xO1xuICAgICAgICBiZXN0Ymlhc3BvcyA9IGJlc3Rwb3M7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuZXRzaXplOyBpKyspIHtcbiAgICAgICAgICBuID0gbmV0d29ya1tpXTtcbiAgICAgICAgICBkaXN0ID0gblswXSAtIGI7XG4gICAgICAgICAgaWYgKGRpc3QgPCAwKSB7XG4gICAgICAgICAgICBkaXN0ID0gLWRpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIGEgPSBuWzFdIC0gZztcbiAgICAgICAgICBpZiAoYSA8IDApIHtcbiAgICAgICAgICAgIGEgPSAtYTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGlzdCArPSBhO1xuICAgICAgICAgIGEgPSBuWzJdIC0gcjtcbiAgICAgICAgICBpZiAoYSA8IDApIHtcbiAgICAgICAgICAgIGEgPSAtYTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGlzdCArPSBhO1xuICAgICAgICAgIGlmIChkaXN0IDwgYmVzdGQpIHtcbiAgICAgICAgICAgIGJlc3RkID0gZGlzdDtcbiAgICAgICAgICAgIGJlc3Rwb3MgPSBpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBiaWFzZGlzdCA9IGRpc3QgLSAoYmlhc1tpXSA+PiBpbnRiaWFzc2hpZnQgLSBuZXRiaWFzc2hpZnQpO1xuICAgICAgICAgIGlmIChiaWFzZGlzdCA8IGJlc3RiaWFzZCkge1xuICAgICAgICAgICAgYmVzdGJpYXNkID0gYmlhc2Rpc3Q7XG4gICAgICAgICAgICBiZXN0Ymlhc3BvcyA9IGk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJldGFmcmVxID0gZnJlcVtpXSA+PiBiZXRhc2hpZnQ7XG4gICAgICAgICAgZnJlcVtpXSAtPSBiZXRhZnJlcTtcbiAgICAgICAgICBiaWFzW2ldICs9IGJldGFmcmVxIDw8IGdhbW1hc2hpZnQ7XG4gICAgICAgIH1cbiAgICAgICAgZnJlcVtiZXN0cG9zXSArPSBiZXRhO1xuICAgICAgICBiaWFzW2Jlc3Rwb3NdIC09IGJldGFnYW1tYTtcbiAgICAgICAgcmV0dXJuIGJlc3RiaWFzcG9zO1xuICAgICAgfVxuICAgICAgTmV1UXVhbnRDb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgdmFyIGV4cG9ydHMgPSB7fTtcbiAgICAgIGV4cG9ydHMubWFwID0gbWFwO1xuICAgICAgZXhwb3J0cy5wcm9jZXNzID0gcHJvY2VzcztcbiAgICAgIHJldHVybiBleHBvcnRzO1xuICAgIH1cbiAgICByZXR1cm4gTmV1UXVhbnQ7XG4gIH0oKTtcbiAgcHJvY2Vzc0ZyYW1lV29ya2VyID0gZnVuY3Rpb24oTmV1UXVhbnQpIHtcbiAgICB2YXIgd29ya2VyQ29kZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldikge1xuICAgICAgICAgIHZhciBkYXRhID0gZXYuZGF0YSxcbiAgICAgICAgICAgICAgcmVzcG9uc2UgPSB3b3JrZXJNZXRob2RzLnJ1bihkYXRhKTtcbiAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmdpZnNob3QpIHtcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlKHJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgdmFyIHdvcmtlck1ldGhvZHMgPSB7XG4gICAgICAgICdkYXRhVG9SR0InOiBmdW5jdGlvbihkYXRhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICBsZW5ndGggPSB3aWR0aCAqIGhlaWdodCAqIDQsXG4gICAgICAgICAgICAgIHJnYiA9IFtdO1xuICAgICAgICAgIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICByZ2IucHVzaChkYXRhW2krK10pO1xuICAgICAgICAgICAgcmdiLnB1c2goZGF0YVtpKytdKTtcbiAgICAgICAgICAgIHJnYi5wdXNoKGRhdGFbaSsrXSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZ2I7XG4gICAgICAgIH0sXG4gICAgICAgICdjb21wb25lbnRpemVkUGFsZXR0ZVRvQXJyYXknOiBmdW5jdGlvbihwYWxldHRlUkdCKSB7XG4gICAgICAgICAgdmFyIHBhbGV0dGVBcnJheSA9IFtdLFxuICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICByLFxuICAgICAgICAgICAgICBnLFxuICAgICAgICAgICAgICBiO1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYWxldHRlUkdCLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgICAgICByID0gcGFsZXR0ZVJHQltpXTtcbiAgICAgICAgICAgIGcgPSBwYWxldHRlUkdCW2kgKyAxXTtcbiAgICAgICAgICAgIGIgPSBwYWxldHRlUkdCW2kgKyAyXTtcbiAgICAgICAgICAgIHBhbGV0dGVBcnJheS5wdXNoKHIgPDwgMTYgfCBnIDw8IDggfCBiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHBhbGV0dGVBcnJheTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2Nlc3NGcmFtZVdpdGhRdWFudGl6ZXInOiBmdW5jdGlvbihpbWFnZURhdGEsIHdpZHRoLCBoZWlnaHQsIHNhbXBsZUludGVydmFsKSB7XG4gICAgICAgICAgdmFyIHJnYkNvbXBvbmVudHMgPSB0aGlzLmRhdGFUb1JHQihpbWFnZURhdGEsIHdpZHRoLCBoZWlnaHQpLFxuICAgICAgICAgICAgICBucSA9IG5ldyBOZXVRdWFudChyZ2JDb21wb25lbnRzLCByZ2JDb21wb25lbnRzLmxlbmd0aCwgc2FtcGxlSW50ZXJ2YWwpLFxuICAgICAgICAgICAgICBwYWxldHRlUkdCID0gbnEucHJvY2VzcygpLFxuICAgICAgICAgICAgICBwYWxldHRlQXJyYXkgPSBuZXcgVWludDMyQXJyYXkodGhpcy5jb21wb25lbnRpemVkUGFsZXR0ZVRvQXJyYXkocGFsZXR0ZVJHQikpLFxuICAgICAgICAgICAgICBudW1iZXJQaXhlbHMgPSB3aWR0aCAqIGhlaWdodCxcbiAgICAgICAgICAgICAgaW5kZXhlZFBpeGVscyA9IG5ldyBVaW50OEFycmF5KG51bWJlclBpeGVscyksXG4gICAgICAgICAgICAgIGsgPSAwLFxuICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICByLFxuICAgICAgICAgICAgICBnLFxuICAgICAgICAgICAgICBiO1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1iZXJQaXhlbHM7IGkrKykge1xuICAgICAgICAgICAgciA9IHJnYkNvbXBvbmVudHNbaysrXTtcbiAgICAgICAgICAgIGcgPSByZ2JDb21wb25lbnRzW2srK107XG4gICAgICAgICAgICBiID0gcmdiQ29tcG9uZW50c1trKytdO1xuICAgICAgICAgICAgaW5kZXhlZFBpeGVsc1tpXSA9IG5xLm1hcChyLCBnLCBiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBpeGVsczogaW5kZXhlZFBpeGVscyxcbiAgICAgICAgICAgIHBhbGV0dGU6IHBhbGV0dGVBcnJheVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgICdydW4nOiBmdW5jdGlvbihmcmFtZSkge1xuICAgICAgICAgIHZhciB3aWR0aCA9IGZyYW1lLndpZHRoLFxuICAgICAgICAgICAgICBoZWlnaHQgPSBmcmFtZS5oZWlnaHQsXG4gICAgICAgICAgICAgIGltYWdlRGF0YSA9IGZyYW1lLmRhdGEsXG4gICAgICAgICAgICAgIHBhbGV0dGUgPSBmcmFtZS5wYWxldHRlLFxuICAgICAgICAgICAgICBzYW1wbGVJbnRlcnZhbCA9IGZyYW1lLnNhbXBsZUludGVydmFsO1xuICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NGcmFtZVdpdGhRdWFudGl6ZXIoaW1hZ2VEYXRhLCB3aWR0aCwgaGVpZ2h0LCBzYW1wbGVJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gd29ya2VyTWV0aG9kcztcbiAgICB9O1xuICAgIHJldHVybiB3b3JrZXJDb2RlO1xuICB9KE5ldVF1YW50KTtcbiAgZ2lmV3JpdGVyID0gZnVuY3Rpb24gZ2lmV3JpdGVyKGJ1Ziwgd2lkdGgsIGhlaWdodCwgZ29wdHMpIHtcbiAgICB2YXIgcCA9IDA7XG4gICAgZ29wdHMgPSBnb3B0cyA9PT0gdW5kZWZpbmVkID8ge30gOiBnb3B0cztcbiAgICB2YXIgbG9vcF9jb3VudCA9IGdvcHRzLmxvb3AgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBnb3B0cy5sb29wO1xuICAgIHZhciBnbG9iYWxfcGFsZXR0ZSA9IGdvcHRzLnBhbGV0dGUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBnb3B0cy5wYWxldHRlO1xuICAgIGlmICh3aWR0aCA8PSAwIHx8IGhlaWdodCA8PSAwIHx8IHdpZHRoID4gNjU1MzUgfHwgaGVpZ2h0ID4gNjU1MzUpXG4gICAgICB0aHJvdyAnV2lkdGgvSGVpZ2h0IGludmFsaWQuJztcbiAgICBmdW5jdGlvbiBjaGVja19wYWxldHRlX2FuZF9udW1fY29sb3JzKHBhbGV0dGUpIHtcbiAgICAgIHZhciBudW1fY29sb3JzID0gcGFsZXR0ZS5sZW5ndGg7XG4gICAgICBpZiAobnVtX2NvbG9ycyA8IDIgfHwgbnVtX2NvbG9ycyA+IDI1NiB8fCBudW1fY29sb3JzICYgbnVtX2NvbG9ycyAtIDEpXG4gICAgICAgIHRocm93ICdJbnZhbGlkIGNvZGUvY29sb3IgbGVuZ3RoLCBtdXN0IGJlIHBvd2VyIG9mIDIgYW5kIDIgLi4gMjU2Lic7XG4gICAgICByZXR1cm4gbnVtX2NvbG9ycztcbiAgICB9XG4gICAgYnVmW3ArK10gPSA3MTtcbiAgICBidWZbcCsrXSA9IDczO1xuICAgIGJ1ZltwKytdID0gNzA7XG4gICAgYnVmW3ArK10gPSA1NjtcbiAgICBidWZbcCsrXSA9IDU3O1xuICAgIGJ1ZltwKytdID0gOTc7XG4gICAgdmFyIGdwX251bV9jb2xvcnNfcG93MiA9IDA7XG4gICAgdmFyIGJhY2tncm91bmQgPSAwO1xuICAgIGJ1ZltwKytdID0gd2lkdGggJiAyNTU7XG4gICAgYnVmW3ArK10gPSB3aWR0aCA+PiA4ICYgMjU1O1xuICAgIGJ1ZltwKytdID0gaGVpZ2h0ICYgMjU1O1xuICAgIGJ1ZltwKytdID0gaGVpZ2h0ID4+IDggJiAyNTU7XG4gICAgYnVmW3ArK10gPSAoZ2xvYmFsX3BhbGV0dGUgIT09IG51bGwgPyAxMjggOiAwKSB8IGdwX251bV9jb2xvcnNfcG93MjtcbiAgICBidWZbcCsrXSA9IGJhY2tncm91bmQ7XG4gICAgYnVmW3ArK10gPSAwO1xuICAgIGlmIChsb29wX2NvdW50ICE9PSBudWxsKSB7XG4gICAgICBpZiAobG9vcF9jb3VudCA8IDAgfHwgbG9vcF9jb3VudCA+IDY1NTM1KVxuICAgICAgICB0aHJvdyAnTG9vcCBjb3VudCBpbnZhbGlkLic7XG4gICAgICBidWZbcCsrXSA9IDMzO1xuICAgICAgYnVmW3ArK10gPSAyNTU7XG4gICAgICBidWZbcCsrXSA9IDExO1xuICAgICAgYnVmW3ArK10gPSA3ODtcbiAgICAgIGJ1ZltwKytdID0gNjk7XG4gICAgICBidWZbcCsrXSA9IDg0O1xuICAgICAgYnVmW3ArK10gPSA4MztcbiAgICAgIGJ1ZltwKytdID0gNjc7XG4gICAgICBidWZbcCsrXSA9IDY1O1xuICAgICAgYnVmW3ArK10gPSA4MDtcbiAgICAgIGJ1ZltwKytdID0gNjk7XG4gICAgICBidWZbcCsrXSA9IDUwO1xuICAgICAgYnVmW3ArK10gPSA0NjtcbiAgICAgIGJ1ZltwKytdID0gNDg7XG4gICAgICBidWZbcCsrXSA9IDM7XG4gICAgICBidWZbcCsrXSA9IDE7XG4gICAgICBidWZbcCsrXSA9IGxvb3BfY291bnQgJiAyNTU7XG4gICAgICBidWZbcCsrXSA9IGxvb3BfY291bnQgPj4gOCAmIDI1NTtcbiAgICAgIGJ1ZltwKytdID0gMDtcbiAgICB9XG4gICAgdmFyIGVuZGVkID0gZmFsc2U7XG4gICAgdGhpcy5hZGRGcmFtZSA9IGZ1bmN0aW9uKHgsIHksIHcsIGgsIGluZGV4ZWRfcGl4ZWxzLCBvcHRzKSB7XG4gICAgICBpZiAoZW5kZWQgPT09IHRydWUpIHtcbiAgICAgICAgLS1wO1xuICAgICAgICBlbmRlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgb3B0cyA9IG9wdHMgPT09IHVuZGVmaW5lZCA/IHt9IDogb3B0cztcbiAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID4gNjU1MzUgfHwgeSA+IDY1NTM1KVxuICAgICAgICB0aHJvdyAneC95IGludmFsaWQuJztcbiAgICAgIGlmICh3IDw9IDAgfHwgaCA8PSAwIHx8IHcgPiA2NTUzNSB8fCBoID4gNjU1MzUpXG4gICAgICAgIHRocm93ICdXaWR0aC9IZWlnaHQgaW52YWxpZC4nO1xuICAgICAgaWYgKGluZGV4ZWRfcGl4ZWxzLmxlbmd0aCA8IHcgKiBoKVxuICAgICAgICB0aHJvdyAnTm90IGVub3VnaCBwaXhlbHMgZm9yIHRoZSBmcmFtZSBzaXplLic7XG4gICAgICB2YXIgdXNpbmdfbG9jYWxfcGFsZXR0ZSA9IHRydWU7XG4gICAgICB2YXIgcGFsZXR0ZSA9IG9wdHMucGFsZXR0ZTtcbiAgICAgIGlmIChwYWxldHRlID09PSB1bmRlZmluZWQgfHwgcGFsZXR0ZSA9PT0gbnVsbCkge1xuICAgICAgICB1c2luZ19sb2NhbF9wYWxldHRlID0gZmFsc2U7XG4gICAgICAgIHBhbGV0dGUgPSBnbG9iYWxfcGFsZXR0ZTtcbiAgICAgIH1cbiAgICAgIGlmIChwYWxldHRlID09PSB1bmRlZmluZWQgfHwgcGFsZXR0ZSA9PT0gbnVsbClcbiAgICAgICAgdGhyb3cgJ011c3Qgc3VwcGx5IGVpdGhlciBhIGxvY2FsIG9yIGdsb2JhbCBwYWxldHRlLic7XG4gICAgICB2YXIgbnVtX2NvbG9ycyA9IGNoZWNrX3BhbGV0dGVfYW5kX251bV9jb2xvcnMocGFsZXR0ZSk7XG4gICAgICB2YXIgbWluX2NvZGVfc2l6ZSA9IDA7XG4gICAgICB3aGlsZSAobnVtX2NvbG9ycyA+Pj0gMSlcbiAgICAgICAgKyttaW5fY29kZV9zaXplO1xuICAgICAgbnVtX2NvbG9ycyA9IDEgPDwgbWluX2NvZGVfc2l6ZTtcbiAgICAgIHZhciBkZWxheSA9IG9wdHMuZGVsYXkgPT09IHVuZGVmaW5lZCA/IDAgOiBvcHRzLmRlbGF5O1xuICAgICAgdmFyIGRpc3Bvc2FsID0gb3B0cy5kaXNwb3NhbCA9PT0gdW5kZWZpbmVkID8gMCA6IG9wdHMuZGlzcG9zYWw7XG4gICAgICBpZiAoZGlzcG9zYWwgPCAwIHx8IGRpc3Bvc2FsID4gMylcbiAgICAgICAgdGhyb3cgJ0Rpc3Bvc2FsIG91dCBvZiByYW5nZS4nO1xuICAgICAgdmFyIHVzZV90cmFuc3BhcmVuY3kgPSBmYWxzZTtcbiAgICAgIHZhciB0cmFuc3BhcmVudF9pbmRleCA9IDA7XG4gICAgICBpZiAob3B0cy50cmFuc3BhcmVudCAhPT0gdW5kZWZpbmVkICYmIG9wdHMudHJhbnNwYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgdXNlX3RyYW5zcGFyZW5jeSA9IHRydWU7XG4gICAgICAgIHRyYW5zcGFyZW50X2luZGV4ID0gb3B0cy50cmFuc3BhcmVudDtcbiAgICAgICAgaWYgKHRyYW5zcGFyZW50X2luZGV4IDwgMCB8fCB0cmFuc3BhcmVudF9pbmRleCA+PSBudW1fY29sb3JzKVxuICAgICAgICAgIHRocm93ICdUcmFuc3BhcmVudCBjb2xvciBpbmRleC4nO1xuICAgICAgfVxuICAgICAgaWYgKGRpc3Bvc2FsICE9PSAwIHx8IHVzZV90cmFuc3BhcmVuY3kgfHwgZGVsYXkgIT09IDApIHtcbiAgICAgICAgYnVmW3ArK10gPSAzMztcbiAgICAgICAgYnVmW3ArK10gPSAyNDk7XG4gICAgICAgIGJ1ZltwKytdID0gNDtcbiAgICAgICAgYnVmW3ArK10gPSBkaXNwb3NhbCA8PCAyIHwgKHVzZV90cmFuc3BhcmVuY3kgPT09IHRydWUgPyAxIDogMCk7XG4gICAgICAgIGJ1ZltwKytdID0gZGVsYXkgJiAyNTU7XG4gICAgICAgIGJ1ZltwKytdID0gZGVsYXkgPj4gOCAmIDI1NTtcbiAgICAgICAgYnVmW3ArK10gPSB0cmFuc3BhcmVudF9pbmRleDtcbiAgICAgICAgYnVmW3ArK10gPSAwO1xuICAgICAgfVxuICAgICAgYnVmW3ArK10gPSA0NDtcbiAgICAgIGJ1ZltwKytdID0geCAmIDI1NTtcbiAgICAgIGJ1ZltwKytdID0geCA+PiA4ICYgMjU1O1xuICAgICAgYnVmW3ArK10gPSB5ICYgMjU1O1xuICAgICAgYnVmW3ArK10gPSB5ID4+IDggJiAyNTU7XG4gICAgICBidWZbcCsrXSA9IHcgJiAyNTU7XG4gICAgICBidWZbcCsrXSA9IHcgPj4gOCAmIDI1NTtcbiAgICAgIGJ1ZltwKytdID0gaCAmIDI1NTtcbiAgICAgIGJ1ZltwKytdID0gaCA+PiA4ICYgMjU1O1xuICAgICAgYnVmW3ArK10gPSB1c2luZ19sb2NhbF9wYWxldHRlID09PSB0cnVlID8gMTI4IHwgbWluX2NvZGVfc2l6ZSAtIDEgOiAwO1xuICAgICAgaWYgKHVzaW5nX2xvY2FsX3BhbGV0dGUgPT09IHRydWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsXG4gICAgICAgICAgICBpbCA9IHBhbGV0dGUubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICAgIHZhciByZ2IgPSBwYWxldHRlW2ldO1xuICAgICAgICAgIGJ1ZltwKytdID0gcmdiID4+IDE2ICYgMjU1O1xuICAgICAgICAgIGJ1ZltwKytdID0gcmdiID4+IDggJiAyNTU7XG4gICAgICAgICAgYnVmW3ArK10gPSByZ2IgJiAyNTU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHAgPSBHaWZXcml0ZXJPdXRwdXRMWldDb2RlU3RyZWFtKGJ1ZiwgcCwgbWluX2NvZGVfc2l6ZSA8IDIgPyAyIDogbWluX2NvZGVfc2l6ZSwgaW5kZXhlZF9waXhlbHMpO1xuICAgIH07XG4gICAgdGhpcy5lbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChlbmRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnVmW3ArK10gPSA1OTtcbiAgICAgICAgZW5kZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHA7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBHaWZXcml0ZXJPdXRwdXRMWldDb2RlU3RyZWFtKGJ1ZiwgcCwgbWluX2NvZGVfc2l6ZSwgaW5kZXhfc3RyZWFtKSB7XG4gICAgICBidWZbcCsrXSA9IG1pbl9jb2RlX3NpemU7XG4gICAgICB2YXIgY3VyX3N1YmJsb2NrID0gcCsrO1xuICAgICAgdmFyIGNsZWFyX2NvZGUgPSAxIDw8IG1pbl9jb2RlX3NpemU7XG4gICAgICB2YXIgY29kZV9tYXNrID0gY2xlYXJfY29kZSAtIDE7XG4gICAgICB2YXIgZW9pX2NvZGUgPSBjbGVhcl9jb2RlICsgMTtcbiAgICAgIHZhciBuZXh0X2NvZGUgPSBlb2lfY29kZSArIDE7XG4gICAgICB2YXIgY3VyX2NvZGVfc2l6ZSA9IG1pbl9jb2RlX3NpemUgKyAxO1xuICAgICAgdmFyIGN1cl9zaGlmdCA9IDA7XG4gICAgICB2YXIgY3VyID0gMDtcbiAgICAgIGZ1bmN0aW9uIGVtaXRfYnl0ZXNfdG9fYnVmZmVyKGJpdF9ibG9ja19zaXplKSB7XG4gICAgICAgIHdoaWxlIChjdXJfc2hpZnQgPj0gYml0X2Jsb2NrX3NpemUpIHtcbiAgICAgICAgICBidWZbcCsrXSA9IGN1ciAmIDI1NTtcbiAgICAgICAgICBjdXIgPj49IDg7XG4gICAgICAgICAgY3VyX3NoaWZ0IC09IDg7XG4gICAgICAgICAgaWYgKHAgPT09IGN1cl9zdWJibG9jayArIDI1Nikge1xuICAgICAgICAgICAgYnVmW2N1cl9zdWJibG9ja10gPSAyNTU7XG4gICAgICAgICAgICBjdXJfc3ViYmxvY2sgPSBwKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBlbWl0X2NvZGUoYykge1xuICAgICAgICBjdXIgfD0gYyA8PCBjdXJfc2hpZnQ7XG4gICAgICAgIGN1cl9zaGlmdCArPSBjdXJfY29kZV9zaXplO1xuICAgICAgICBlbWl0X2J5dGVzX3RvX2J1ZmZlcig4KTtcbiAgICAgIH1cbiAgICAgIHZhciBpYl9jb2RlID0gaW5kZXhfc3RyZWFtWzBdICYgY29kZV9tYXNrO1xuICAgICAgdmFyIGNvZGVfdGFibGUgPSB7fTtcbiAgICAgIGVtaXRfY29kZShjbGVhcl9jb2RlKTtcbiAgICAgIGZvciAodmFyIGkgPSAxLFxuICAgICAgICAgIGlsID0gaW5kZXhfc3RyZWFtLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICAgICAgdmFyIGsgPSBpbmRleF9zdHJlYW1baV0gJiBjb2RlX21hc2s7XG4gICAgICAgIHZhciBjdXJfa2V5ID0gaWJfY29kZSA8PCA4IHwgaztcbiAgICAgICAgdmFyIGN1cl9jb2RlID0gY29kZV90YWJsZVtjdXJfa2V5XTtcbiAgICAgICAgaWYgKGN1cl9jb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjdXIgfD0gaWJfY29kZSA8PCBjdXJfc2hpZnQ7XG4gICAgICAgICAgY3VyX3NoaWZ0ICs9IGN1cl9jb2RlX3NpemU7XG4gICAgICAgICAgd2hpbGUgKGN1cl9zaGlmdCA+PSA4KSB7XG4gICAgICAgICAgICBidWZbcCsrXSA9IGN1ciAmIDI1NTtcbiAgICAgICAgICAgIGN1ciA+Pj0gODtcbiAgICAgICAgICAgIGN1cl9zaGlmdCAtPSA4O1xuICAgICAgICAgICAgaWYgKHAgPT09IGN1cl9zdWJibG9jayArIDI1Nikge1xuICAgICAgICAgICAgICBidWZbY3VyX3N1YmJsb2NrXSA9IDI1NTtcbiAgICAgICAgICAgICAgY3VyX3N1YmJsb2NrID0gcCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobmV4dF9jb2RlID09PSA0MDk2KSB7XG4gICAgICAgICAgICBlbWl0X2NvZGUoY2xlYXJfY29kZSk7XG4gICAgICAgICAgICBuZXh0X2NvZGUgPSBlb2lfY29kZSArIDE7XG4gICAgICAgICAgICBjdXJfY29kZV9zaXplID0gbWluX2NvZGVfc2l6ZSArIDE7XG4gICAgICAgICAgICBjb2RlX3RhYmxlID0ge307XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChuZXh0X2NvZGUgPj0gMSA8PCBjdXJfY29kZV9zaXplKVxuICAgICAgICAgICAgICArK2N1cl9jb2RlX3NpemU7XG4gICAgICAgICAgICBjb2RlX3RhYmxlW2N1cl9rZXldID0gbmV4dF9jb2RlKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGliX2NvZGUgPSBrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGliX2NvZGUgPSBjdXJfY29kZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZW1pdF9jb2RlKGliX2NvZGUpO1xuICAgICAgZW1pdF9jb2RlKGVvaV9jb2RlKTtcbiAgICAgIGVtaXRfYnl0ZXNfdG9fYnVmZmVyKDEpO1xuICAgICAgaWYgKGN1cl9zdWJibG9jayArIDEgPT09IHApIHtcbiAgICAgICAgYnVmW2N1cl9zdWJibG9ja10gPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmW2N1cl9zdWJibG9ja10gPSBwIC0gY3VyX3N1YmJsb2NrIC0gMTtcbiAgICAgICAgYnVmW3ArK10gPSAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICB9O1xuICBBbmltYXRlZEdJRiA9IGZ1bmN0aW9uKHV0aWxzLCBmcmFtZVdvcmtlckNvZGUsIE5ldVF1YW50LCBHaWZXcml0ZXIpIHtcbiAgICB2YXIgQW5pbWF0ZWRHSUYgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG4gICAgICB0aGlzLmN0eCA9IG51bGw7XG4gICAgICB0aGlzLnJlcGVhdCA9IDA7XG4gICAgICB0aGlzLmZyYW1lcyA9IFtdO1xuICAgICAgdGhpcy5udW1SZW5kZXJlZEZyYW1lcyA9IDA7XG4gICAgICB0aGlzLm9uUmVuZGVyQ29tcGxldGVDYWxsYmFjayA9IHV0aWxzLm5vb3A7XG4gICAgICB0aGlzLm9uUmVuZGVyUHJvZ3Jlc3NDYWxsYmFjayA9IHV0aWxzLm5vb3A7XG4gICAgICB0aGlzLndvcmtlcnMgPSBbXTtcbiAgICAgIHRoaXMuYXZhaWxhYmxlV29ya2VycyA9IFtdO1xuICAgICAgdGhpcy5nZW5lcmF0aW5nR0lGID0gZmFsc2U7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgdGhpcy5pbml0aWFsaXplV2ViV29ya2VycyhvcHRpb25zKTtcbiAgICB9O1xuICAgIEFuaW1hdGVkR0lGLnByb3RvdHlwZSA9IHtcbiAgICAgICd3b3JrZXJNZXRob2RzJzogZnJhbWVXb3JrZXJDb2RlKCksXG4gICAgICAnaW5pdGlhbGl6ZVdlYldvcmtlcnMnOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBwcm9jZXNzRnJhbWVXb3JrZXJDb2RlID0gTmV1UXVhbnQudG9TdHJpbmcoKSArICcoJyArIGZyYW1lV29ya2VyQ29kZS50b1N0cmluZygpICsgJygpKTsnLFxuICAgICAgICAgICAgd2ViV29ya2VyT2JqLFxuICAgICAgICAgICAgb2JqZWN0VXJsLFxuICAgICAgICAgICAgd2ViV29ya2VyLFxuICAgICAgICAgICAgbnVtV29ya2VycyxcbiAgICAgICAgICAgIHggPSAtMSxcbiAgICAgICAgICAgIHdvcmtlckVycm9yID0gJyc7XG4gICAgICAgIG51bVdvcmtlcnMgPSBvcHRpb25zLm51bVdvcmtlcnM7XG4gICAgICAgIHdoaWxlICgrK3ggPCBudW1Xb3JrZXJzKSB7XG4gICAgICAgICAgd2ViV29ya2VyT2JqID0gdXRpbHMuY3JlYXRlV2ViV29ya2VyKHByb2Nlc3NGcmFtZVdvcmtlckNvZGUpO1xuICAgICAgICAgIGlmICh1dGlscy5pc09iamVjdCh3ZWJXb3JrZXJPYmopKSB7XG4gICAgICAgICAgICBvYmplY3RVcmwgPSB3ZWJXb3JrZXJPYmoub2JqZWN0VXJsO1xuICAgICAgICAgICAgd2ViV29ya2VyID0gd2ViV29ya2VyT2JqLndvcmtlcjtcbiAgICAgICAgICAgIHRoaXMud29ya2Vycy5wdXNoKHtcbiAgICAgICAgICAgICAgJ3dvcmtlcic6IHdlYldvcmtlcixcbiAgICAgICAgICAgICAgJ29iamVjdFVybCc6IG9iamVjdFVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmF2YWlsYWJsZVdvcmtlcnMucHVzaCh3ZWJXb3JrZXIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3b3JrZXJFcnJvciA9IHdlYldvcmtlck9iajtcbiAgICAgICAgICAgIHV0aWxzLndlYldvcmtlckVycm9yID0gISF3ZWJXb3JrZXJPYmo7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud29ya2VyRXJyb3IgPSB3b3JrZXJFcnJvcjtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSBvcHRpb25zLmdpZldpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBvcHRpb25zLmdpZkhlaWdodDtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLmZyYW1lcyA9IFtdO1xuICAgICAgfSxcbiAgICAgICdnZXRXb3JrZXInOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXZhaWxhYmxlV29ya2Vycy5wb3AoKTtcbiAgICAgIH0sXG4gICAgICAnZnJlZVdvcmtlcic6IGZ1bmN0aW9uKHdvcmtlcikge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVdvcmtlcnMucHVzaCh3b3JrZXIpO1xuICAgICAgfSxcbiAgICAgICdieXRlTWFwJzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBieXRlTWFwID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICAgICAgICBieXRlTWFwW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZShpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnl0ZU1hcDtcbiAgICAgIH0oKSxcbiAgICAgICdidWZmZXJUb1N0cmluZyc6IGZ1bmN0aW9uKGJ1ZmZlcikge1xuICAgICAgICB2YXIgbnVtYmVyVmFsdWVzID0gYnVmZmVyLmxlbmd0aCxcbiAgICAgICAgICAgIHN0ciA9ICcnLFxuICAgICAgICAgICAgeCA9IC0xO1xuICAgICAgICB3aGlsZSAoKyt4IDwgbnVtYmVyVmFsdWVzKSB7XG4gICAgICAgICAgc3RyICs9IHRoaXMuYnl0ZU1hcFtidWZmZXJbeF1dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgICB9LFxuICAgICAgJ29uRnJhbWVGaW5pc2hlZCc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBmcmFtZXMgPSBzZWxmLmZyYW1lcyxcbiAgICAgICAgICAgIGFsbERvbmUgPSBmcmFtZXMuZXZlcnkoZnVuY3Rpb24oZnJhbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICFmcmFtZS5iZWluZ1Byb2Nlc3NlZCAmJiBmcmFtZS5kb25lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHNlbGYubnVtUmVuZGVyZWRGcmFtZXMrKztcbiAgICAgICAgc2VsZi5vblJlbmRlclByb2dyZXNzQ2FsbGJhY2soc2VsZi5udW1SZW5kZXJlZEZyYW1lcyAqIDAuNzUgLyBmcmFtZXMubGVuZ3RoKTtcbiAgICAgICAgaWYgKGFsbERvbmUpIHtcbiAgICAgICAgICBpZiAoIXNlbGYuZ2VuZXJhdGluZ0dJRikge1xuICAgICAgICAgICAgc2VsZi5nZW5lcmF0ZUdJRihmcmFtZXMsIHNlbGYub25SZW5kZXJDb21wbGV0ZUNhbGxiYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYucHJvY2Vzc05leHRGcmFtZSgpO1xuICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3Byb2Nlc3NGcmFtZSc6IGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHZhciBBbmltYXRlZEdpZkNvbnRleHQgPSB0aGlzLFxuICAgICAgICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICAgIHNhbXBsZUludGVydmFsID0gb3B0aW9ucy5zYW1wbGVJbnRlcnZhbCxcbiAgICAgICAgICAgIGZyYW1lcyA9IHRoaXMuZnJhbWVzLFxuICAgICAgICAgICAgZnJhbWUsXG4gICAgICAgICAgICB3b3JrZXIsXG4gICAgICAgICAgICBkb25lID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSBldi5kYXRhO1xuICAgICAgICAgICAgICBkZWxldGUgZnJhbWUuZGF0YTtcbiAgICAgICAgICAgICAgZnJhbWUucGl4ZWxzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZGF0YS5waXhlbHMpO1xuICAgICAgICAgICAgICBmcmFtZS5wYWxldHRlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZGF0YS5wYWxldHRlKTtcbiAgICAgICAgICAgICAgZnJhbWUuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgIGZyYW1lLmJlaW5nUHJvY2Vzc2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgIEFuaW1hdGVkR2lmQ29udGV4dC5mcmVlV29ya2VyKHdvcmtlcik7XG4gICAgICAgICAgICAgIEFuaW1hdGVkR2lmQ29udGV4dC5vbkZyYW1lRmluaXNoZWQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGZyYW1lID0gZnJhbWVzW3Bvc2l0aW9uXTtcbiAgICAgICAgaWYgKGZyYW1lLmJlaW5nUHJvY2Vzc2VkIHx8IGZyYW1lLmRvbmUpIHtcbiAgICAgICAgICB0aGlzLm9uRnJhbWVGaW5pc2hlZCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmcmFtZS5zYW1wbGVJbnRlcnZhbCA9IHNhbXBsZUludGVydmFsO1xuICAgICAgICBmcmFtZS5iZWluZ1Byb2Nlc3NlZCA9IHRydWU7XG4gICAgICAgIGZyYW1lLmdpZnNob3QgPSB0cnVlO1xuICAgICAgICB3b3JrZXIgPSB0aGlzLmdldFdvcmtlcigpO1xuICAgICAgICBpZiAod29ya2VyKSB7XG4gICAgICAgICAgd29ya2VyLm9ubWVzc2FnZSA9IGRvbmU7XG4gICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKGZyYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb25lKHsnZGF0YSc6IEFuaW1hdGVkR2lmQ29udGV4dC53b3JrZXJNZXRob2RzLnJ1bihmcmFtZSl9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdzdGFydFJlbmRlcmluZyc6IGZ1bmN0aW9uKGNvbXBsZXRlQ2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5vblJlbmRlckNvbXBsZXRlQ2FsbGJhY2sgPSBjb21wbGV0ZUNhbGxiYWNrO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5udW1Xb3JrZXJzICYmIGkgPCB0aGlzLmZyYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMucHJvY2Vzc0ZyYW1lKGkpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3Byb2Nlc3NOZXh0RnJhbWUnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gLTE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5mcmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZnJhbWUgPSB0aGlzLmZyYW1lc1tpXTtcbiAgICAgICAgICBpZiAoIWZyYW1lLmRvbmUgJiYgIWZyYW1lLmJlaW5nUHJvY2Vzc2VkKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc2l0aW9uID49IDApIHtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NGcmFtZShwb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnZ2VuZXJhdGVHSUYnOiBmdW5jdGlvbihmcmFtZXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSBbXSxcbiAgICAgICAgICAgIGdpZk9wdGlvbnMgPSB7J2xvb3AnOiB0aGlzLnJlcGVhdH0sXG4gICAgICAgICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICAgICAgaW50ZXJ2YWwgPSBvcHRpb25zLmludGVydmFsLFxuICAgICAgICAgICAgZXhpc3RpbmdJbWFnZXMgPSBvcHRpb25zLmltYWdlcyxcbiAgICAgICAgICAgIGhhc0V4aXN0aW5nSW1hZ2VzID0gISFleGlzdGluZ0ltYWdlcy5sZW5ndGgsXG4gICAgICAgICAgICBoZWlnaHQgPSBvcHRpb25zLmdpZkhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoID0gb3B0aW9ucy5naWZXaWR0aCxcbiAgICAgICAgICAgIGdpZldyaXRlciA9IG5ldyBHaWZXcml0ZXIoYnVmZmVyLCB3aWR0aCwgaGVpZ2h0LCBnaWZPcHRpb25zKSxcbiAgICAgICAgICAgIG9uUmVuZGVyUHJvZ3Jlc3NDYWxsYmFjayA9IHRoaXMub25SZW5kZXJQcm9ncmVzc0NhbGxiYWNrLFxuICAgICAgICAgICAgZGVsYXkgPSBoYXNFeGlzdGluZ0ltYWdlcyA/IGludGVydmFsICogMTAwIDogMCxcbiAgICAgICAgICAgIGJ1ZmZlclRvU3RyaW5nLFxuICAgICAgICAgICAgZ2lmO1xuICAgICAgICB0aGlzLmdlbmVyYXRpbmdHSUYgPSB0cnVlO1xuICAgICAgICB1dGlscy5lYWNoKGZyYW1lcywgZnVuY3Rpb24oaXRlcmF0b3IsIGZyYW1lKSB7XG4gICAgICAgICAgdmFyIGZyYW1lUGFsZXR0ZSA9IGZyYW1lLnBhbGV0dGU7XG4gICAgICAgICAgb25SZW5kZXJQcm9ncmVzc0NhbGxiYWNrKDAuNzUgKyAwLjI1ICogZnJhbWUucG9zaXRpb24gKiAxIC8gZnJhbWVzLmxlbmd0aCk7XG4gICAgICAgICAgZ2lmV3JpdGVyLmFkZEZyYW1lKDAsIDAsIHdpZHRoLCBoZWlnaHQsIGZyYW1lLnBpeGVscywge1xuICAgICAgICAgICAgcGFsZXR0ZTogZnJhbWVQYWxldHRlLFxuICAgICAgICAgICAgZGVsYXk6IGRlbGF5XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBnaWZXcml0ZXIuZW5kKCk7XG4gICAgICAgIG9uUmVuZGVyUHJvZ3Jlc3NDYWxsYmFjaygxKTtcbiAgICAgICAgdGhpcy5mcmFtZXMgPSBbXTtcbiAgICAgICAgdGhpcy5nZW5lcmF0aW5nR0lGID0gZmFsc2U7XG4gICAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgICAgIGJ1ZmZlclRvU3RyaW5nID0gdGhpcy5idWZmZXJUb1N0cmluZyhidWZmZXIpO1xuICAgICAgICAgIGdpZiA9ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsJyArIHV0aWxzLmJ0b2EoYnVmZmVyVG9TdHJpbmcpO1xuICAgICAgICAgIGNhbGxiYWNrKGdpZik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnc2V0UmVwZWF0JzogZnVuY3Rpb24ocikge1xuICAgICAgICB0aGlzLnJlcGVhdCA9IHI7XG4gICAgICB9LFxuICAgICAgJ2FkZEZyYW1lJzogZnVuY3Rpb24oZWxlbWVudCwgZ2lmc2hvdE9wdGlvbnMpIHtcbiAgICAgICAgZ2lmc2hvdE9wdGlvbnMgPSB1dGlscy5pc09iamVjdChnaWZzaG90T3B0aW9ucykgPyBnaWZzaG90T3B0aW9ucyA6IHt9O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBjdHggPSBzZWxmLmN0eCxcbiAgICAgICAgICAgIG9wdGlvbnMgPSBzZWxmLm9wdGlvbnMsXG4gICAgICAgICAgICB3aWR0aCA9IG9wdGlvbnMuZ2lmV2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQgPSBvcHRpb25zLmdpZkhlaWdodCxcbiAgICAgICAgICAgIGdpZkhlaWdodCA9IGdpZnNob3RPcHRpb25zLmdpZkhlaWdodCxcbiAgICAgICAgICAgIGdpZldpZHRoID0gZ2lmc2hvdE9wdGlvbnMuZ2lmV2lkdGgsXG4gICAgICAgICAgICB0ZXh0ID0gZ2lmc2hvdE9wdGlvbnMudGV4dCxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQgPSBnaWZzaG90T3B0aW9ucy5mb250V2VpZ2h0LFxuICAgICAgICAgICAgZm9udFNpemUgPSB1dGlscy5nZXRGb250U2l6ZShnaWZzaG90T3B0aW9ucyksXG4gICAgICAgICAgICBmb250RmFtaWx5ID0gZ2lmc2hvdE9wdGlvbnMuZm9udEZhbWlseSxcbiAgICAgICAgICAgIGZvbnRDb2xvciA9IGdpZnNob3RPcHRpb25zLmZvbnRDb2xvcixcbiAgICAgICAgICAgIHRleHRBbGlnbiA9IGdpZnNob3RPcHRpb25zLnRleHRBbGlnbixcbiAgICAgICAgICAgIHRleHRCYXNlbGluZSA9IGdpZnNob3RPcHRpb25zLnRleHRCYXNlbGluZSxcbiAgICAgICAgICAgIHRleHRYQ29vcmRpbmF0ZSA9IGdpZnNob3RPcHRpb25zLnRleHRYQ29vcmRpbmF0ZSA/IGdpZnNob3RPcHRpb25zLnRleHRYQ29vcmRpbmF0ZSA6IHRleHRBbGlnbiA9PT0gJ2xlZnQnID8gMSA6IHRleHRBbGlnbiA9PT0gJ3JpZ2h0JyA/IHdpZHRoIDogd2lkdGggLyAyLFxuICAgICAgICAgICAgdGV4dFlDb29yZGluYXRlID0gZ2lmc2hvdE9wdGlvbnMudGV4dFlDb29yZGluYXRlID8gZ2lmc2hvdE9wdGlvbnMudGV4dFlDb29yZGluYXRlIDogdGV4dEJhc2VsaW5lID09PSAndG9wJyA/IDEgOiB0ZXh0QmFzZWxpbmUgPT09ICdjZW50ZXInID8gaGVpZ2h0IC8gMiA6IGhlaWdodCxcbiAgICAgICAgICAgIGZvbnQgPSBmb250V2VpZ2h0ICsgJyAnICsgZm9udFNpemUgKyAnICcgKyBmb250RmFtaWx5LFxuICAgICAgICAgICAgaW1hZ2VEYXRhO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoZWxlbWVudCwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgIGN0eC5mb250ID0gZm9udDtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBmb250Q29sb3I7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gdGV4dEFsaWduO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9IHRleHRCYXNlbGluZTtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCB0ZXh0WENvb3JkaW5hdGUsIHRleHRZQ29vcmRpbmF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgc2VsZi5hZGRGcmFtZUltYWdlRGF0YShpbWFnZURhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuICcnICsgZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdhZGRGcmFtZUltYWdlRGF0YSc6IGZ1bmN0aW9uKGltYWdlRGF0YSkge1xuICAgICAgICB2YXIgZnJhbWVzID0gdGhpcy5mcmFtZXMsXG4gICAgICAgICAgICBpbWFnZURhdGFBcnJheSA9IGltYWdlRGF0YS5kYXRhO1xuICAgICAgICB0aGlzLmZyYW1lcy5wdXNoKHtcbiAgICAgICAgICAnZGF0YSc6IGltYWdlRGF0YUFycmF5LFxuICAgICAgICAgICd3aWR0aCc6IGltYWdlRGF0YS53aWR0aCxcbiAgICAgICAgICAnaGVpZ2h0JzogaW1hZ2VEYXRhLmhlaWdodCxcbiAgICAgICAgICAncGFsZXR0ZSc6IG51bGwsXG4gICAgICAgICAgJ2RpdGhlcmluZyc6IG51bGwsXG4gICAgICAgICAgJ2RvbmUnOiBmYWxzZSxcbiAgICAgICAgICAnYmVpbmdQcm9jZXNzZWQnOiBmYWxzZSxcbiAgICAgICAgICAncG9zaXRpb24nOiBmcmFtZXMubGVuZ3RoXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgICdvblJlbmRlclByb2dyZXNzJzogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5vblJlbmRlclByb2dyZXNzQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIH0sXG4gICAgICAnaXNSZW5kZXJpbmcnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGluZ0dJRjtcbiAgICAgIH0sXG4gICAgICAnZ2V0QmFzZTY0R0lGJzogZnVuY3Rpb24oY29tcGxldGVDYWxsYmFjaykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBvblJlbmRlckNvbXBsZXRlID0gZnVuY3Rpb24oZ2lmKSB7XG4gICAgICAgICAgICAgIHNlbGYuZGVzdHJveVdvcmtlcnMoKTtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKGdpZik7XG4gICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgc2VsZi5zdGFydFJlbmRlcmluZyhvblJlbmRlckNvbXBsZXRlKTtcbiAgICAgIH0sXG4gICAgICAnZGVzdHJveVdvcmtlcnMnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMud29ya2VyRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdvcmtlcnMgPSB0aGlzLndvcmtlcnM7XG4gICAgICAgIHV0aWxzLmVhY2god29ya2VycywgZnVuY3Rpb24oaXRlcmF0b3IsIHdvcmtlck9iaikge1xuICAgICAgICAgIHZhciB3b3JrZXIgPSB3b3JrZXJPYmoud29ya2VyLFxuICAgICAgICAgICAgICBvYmplY3RVcmwgPSB3b3JrZXJPYmoub2JqZWN0VXJsO1xuICAgICAgICAgIHdvcmtlci50ZXJtaW5hdGUoKTtcbiAgICAgICAgICB1dGlscy5VUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEFuaW1hdGVkR0lGO1xuICB9KHV0aWxzLCBwcm9jZXNzRnJhbWVXb3JrZXIsIE5ldVF1YW50LCBnaWZXcml0ZXIpO1xuICBnZXRCYXNlNjRHSUYgPSBmdW5jdGlvbiBnZXRCYXNlNjRHSUYoYW5pbWF0ZWRHaWZJbnN0YW5jZSwgY2FsbGJhY2spIHtcbiAgICBhbmltYXRlZEdpZkluc3RhbmNlLmdldEJhc2U2NEdJRihmdW5jdGlvbihpbWFnZSkge1xuICAgICAgY2FsbGJhY2soe1xuICAgICAgICAnZXJyb3InOiBmYWxzZSxcbiAgICAgICAgJ2Vycm9yQ29kZSc6ICcnLFxuICAgICAgICAnZXJyb3JNc2cnOiAnJyxcbiAgICAgICAgJ2ltYWdlJzogaW1hZ2VcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICBleGlzdGluZ0ltYWdlcyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBpbWFnZXMgPSBvYmouaW1hZ2VzLFxuICAgICAgICBpbWFnZXNMZW5ndGggPSBvYmouaW1hZ2VzTGVuZ3RoLFxuICAgICAgICBjYWxsYmFjayA9IG9iai5jYWxsYmFjayxcbiAgICAgICAgb3B0aW9ucyA9IG9iai5vcHRpb25zLFxuICAgICAgICBza2lwT2JqID0ge1xuICAgICAgICAgICdnZXRVc2VyTWVkaWEnOiB0cnVlLFxuICAgICAgICAgICd3aW5kb3cuVVJMJzogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBlcnJvck9iaiA9IGVycm9yLnZhbGlkYXRlKHNraXBPYmopLFxuICAgICAgICBsb2FkZWRJbWFnZXMgPSAwLFxuICAgICAgICB0ZW1wSW1hZ2UsXG4gICAgICAgIGFnO1xuICAgIGlmIChlcnJvck9iai5lcnJvcikge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9yT2JqKTtcbiAgICB9XG4gICAgYWcgPSBuZXcgQW5pbWF0ZWRHSUYob3B0aW9ucyk7XG4gICAgdXRpbHMuZWFjaChpbWFnZXMsIGZ1bmN0aW9uKGluZGV4LCBjdXJyZW50SW1hZ2UpIHtcbiAgICAgIGlmICh1dGlscy5pc0VsZW1lbnQoY3VycmVudEltYWdlKSkge1xuICAgICAgICBjdXJyZW50SW1hZ2UuY3Jvc3NPcmlnaW4gPSAnQW5vbnltb3VzJztcbiAgICAgICAgYWcuYWRkRnJhbWUoY3VycmVudEltYWdlLCBvcHRpb25zKTtcbiAgICAgICAgbG9hZGVkSW1hZ2VzICs9IDE7XG4gICAgICAgIGlmIChsb2FkZWRJbWFnZXMgPT09IGltYWdlc0xlbmd0aCkge1xuICAgICAgICAgIGdldEJhc2U2NEdJRihhZywgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzU3RyaW5nKGN1cnJlbnRJbWFnZSkpIHtcbiAgICAgICAgdGVtcEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHRlbXBJbWFnZS5jcm9zc09yaWdpbiA9ICdBbm9ueW1vdXMnO1xuICAgICAgICB0ZW1wSW1hZ2Uub25lcnJvciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoaW1hZ2VzTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaW1hZ2VzTGVuZ3RoIC09IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0ZW1wSW1hZ2Uuc3JjID0gY3VycmVudEltYWdlO1xuICAgICAgICAoZnVuY3Rpb24odGVtcEltYWdlKSB7XG4gICAgICAgICAgdGVtcEltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWcuYWRkRnJhbWUodGVtcEltYWdlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUVsZW1lbnQodGVtcEltYWdlKTtcbiAgICAgICAgICAgIGxvYWRlZEltYWdlcyArPSAxO1xuICAgICAgICAgICAgaWYgKGxvYWRlZEltYWdlcyA9PT0gaW1hZ2VzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGdldEJhc2U2NEdJRihhZywgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0odGVtcEltYWdlKSk7XG4gICAgICAgIHV0aWxzLnNldENTU0F0dHIodGVtcEltYWdlLCB7XG4gICAgICAgICAgJ3Bvc2l0aW9uJzogJ2ZpeGVkJyxcbiAgICAgICAgICAnb3BhY2l0eSc6ICcwJ1xuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZW1wSW1hZ2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICBzY3JlZW5TaG90ID0ge1xuICAgIGdldEdJRjogZnVuY3Rpb24ob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gdXRpbHMuaXNGdW5jdGlvbihjYWxsYmFjaykgPyBjYWxsYmFjayA6IGZ1bmN0aW9uKCkge307XG4gICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyksXG4gICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICBleGlzdGluZ0ltYWdlcyA9IG9wdGlvbnMuaW1hZ2VzLFxuICAgICAgICAgIGhhc0V4aXN0aW5nSW1hZ2VzID0gISFleGlzdGluZ0ltYWdlcy5sZW5ndGgsXG4gICAgICAgICAgdmlkZW9FbGVtZW50ID0gb3B0aW9ucy52aWRlb0VsZW1lbnQsXG4gICAgICAgICAga2VlcENhbWVyYU9uID0gb3B0aW9ucy5rZWVwQ2FtZXJhT24sXG4gICAgICAgICAgd2ViY2FtVmlkZW9FbGVtZW50ID0gb3B0aW9ucy53ZWJjYW1WaWRlb0VsZW1lbnQsXG4gICAgICAgICAgY2FtZXJhU3RyZWFtID0gb3B0aW9ucy5jYW1lcmFTdHJlYW0sXG4gICAgICAgICAgZ2lmV2lkdGggPSArb3B0aW9ucy5naWZXaWR0aCxcbiAgICAgICAgICBnaWZIZWlnaHQgPSArb3B0aW9ucy5naWZIZWlnaHQsXG4gICAgICAgICAgdmlkZW9XaWR0aCA9IG9wdGlvbnMudmlkZW9XaWR0aCxcbiAgICAgICAgICB2aWRlb0hlaWdodCA9IG9wdGlvbnMudmlkZW9IZWlnaHQsXG4gICAgICAgICAgc2FtcGxlSW50ZXJ2YWwgPSArb3B0aW9ucy5zYW1wbGVJbnRlcnZhbCxcbiAgICAgICAgICBudW1Xb3JrZXJzID0gK29wdGlvbnMubnVtV29ya2VycyxcbiAgICAgICAgICBjcm9wID0gb3B0aW9ucy5jcm9wLFxuICAgICAgICAgIGludGVydmFsID0gK29wdGlvbnMuaW50ZXJ2YWwsXG4gICAgICAgICAgd2FpdEJldHdlZW5GcmFtZXMgPSBoYXNFeGlzdGluZ0ltYWdlcyA/IDAgOiBpbnRlcnZhbCAqIDEwMDAsXG4gICAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjayA9IG9wdGlvbnMucHJvZ3Jlc3NDYWxsYmFjayxcbiAgICAgICAgICBzYXZlZFJlbmRlcmluZ0NvbnRleHRzID0gb3B0aW9ucy5zYXZlZFJlbmRlcmluZ0NvbnRleHRzLFxuICAgICAgICAgIHNhdmVSZW5kZXJpbmdDb250ZXh0cyA9IG9wdGlvbnMuc2F2ZVJlbmRlcmluZ0NvbnRleHRzLFxuICAgICAgICAgIHJlbmRlcmluZ0NvbnRleHRzVG9TYXZlID0gW10sXG4gICAgICAgICAgbnVtRnJhbWVzID0gc2F2ZWRSZW5kZXJpbmdDb250ZXh0cy5sZW5ndGggPyBzYXZlZFJlbmRlcmluZ0NvbnRleHRzLmxlbmd0aCA6IG9wdGlvbnMubnVtRnJhbWVzLFxuICAgICAgICAgIHBlbmRpbmdGcmFtZXMgPSBudW1GcmFtZXMsXG4gICAgICAgICAgYWcgPSBuZXcgQW5pbWF0ZWRHSUYob3B0aW9ucyksXG4gICAgICAgICAgdGV4dCA9IG9wdGlvbnMudGV4dCxcbiAgICAgICAgICBmb250V2VpZ2h0ID0gb3B0aW9ucy5mb250V2VpZ2h0LFxuICAgICAgICAgIGZvbnRTaXplID0gdXRpbHMuZ2V0Rm9udFNpemUob3B0aW9ucyksXG4gICAgICAgICAgZm9udEZhbWlseSA9IG9wdGlvbnMuZm9udEZhbWlseSxcbiAgICAgICAgICBmb250Q29sb3IgPSBvcHRpb25zLmZvbnRDb2xvcixcbiAgICAgICAgICB0ZXh0QWxpZ24gPSBvcHRpb25zLnRleHRBbGlnbixcbiAgICAgICAgICB0ZXh0QmFzZWxpbmUgPSBvcHRpb25zLnRleHRCYXNlbGluZSxcbiAgICAgICAgICB0ZXh0WENvb3JkaW5hdGUgPSBvcHRpb25zLnRleHRYQ29vcmRpbmF0ZSA/IG9wdGlvbnMudGV4dFhDb29yZGluYXRlIDogdGV4dEFsaWduID09PSAnbGVmdCcgPyAxIDogdGV4dEFsaWduID09PSAncmlnaHQnID8gZ2lmV2lkdGggOiBnaWZXaWR0aCAvIDIsXG4gICAgICAgICAgdGV4dFlDb29yZGluYXRlID0gb3B0aW9ucy50ZXh0WUNvb3JkaW5hdGUgPyBvcHRpb25zLnRleHRZQ29vcmRpbmF0ZSA6IHRleHRCYXNlbGluZSA9PT0gJ3RvcCcgPyAxIDogdGV4dEJhc2VsaW5lID09PSAnY2VudGVyJyA/IGdpZkhlaWdodCAvIDIgOiBnaWZIZWlnaHQsXG4gICAgICAgICAgZm9udCA9IGZvbnRXZWlnaHQgKyAnICcgKyBmb250U2l6ZSArICcgJyArIGZvbnRGYW1pbHksXG4gICAgICAgICAgc291cmNlWCA9IGNyb3AgPyBNYXRoLmZsb29yKGNyb3Auc2NhbGVkV2lkdGggLyAyKSA6IDAsXG4gICAgICAgICAgc291cmNlV2lkdGggPSBjcm9wID8gdmlkZW9XaWR0aCAtIGNyb3Auc2NhbGVkV2lkdGggOiAwLFxuICAgICAgICAgIHNvdXJjZVkgPSBjcm9wID8gTWF0aC5mbG9vcihjcm9wLnNjYWxlZEhlaWdodCAvIDIpIDogMCxcbiAgICAgICAgICBzb3VyY2VIZWlnaHQgPSBjcm9wID8gdmlkZW9IZWlnaHQgLSBjcm9wLnNjYWxlZEhlaWdodCA6IDAsXG4gICAgICAgICAgY2FwdHVyZUZyYW1lcyA9IGZ1bmN0aW9uIGNhcHR1cmVGcmFtZSgpIHtcbiAgICAgICAgICAgIHZhciBmcmFtZXNMZWZ0ID0gcGVuZGluZ0ZyYW1lcyAtIDE7XG4gICAgICAgICAgICBpZiAoc2F2ZWRSZW5kZXJpbmdDb250ZXh0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY29udGV4dC5wdXRJbWFnZURhdGEoc2F2ZWRSZW5kZXJpbmdDb250ZXh0c1tudW1GcmFtZXMgLSBwZW5kaW5nRnJhbWVzXSwgMCwgMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkcmF3VmlkZW8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRyYXdWaWRlbygpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlV2lkdGggPiB2aWRlb1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgICBzb3VyY2VXaWR0aCA9IHZpZGVvV2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2VIZWlnaHQgPiB2aWRlb0hlaWdodCkge1xuICAgICAgICAgICAgICAgICAgc291cmNlSGVpZ2h0ID0gdmlkZW9IZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2VYIDwgMCkge1xuICAgICAgICAgICAgICAgICAgc291cmNlWCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2VZIDwgMCkge1xuICAgICAgICAgICAgICAgICAgc291cmNlWSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHZpZGVvRWxlbWVudCwgc291cmNlWCwgc291cmNlWSwgc291cmNlV2lkdGgsIHNvdXJjZUhlaWdodCwgMCwgMCwgZ2lmV2lkdGgsIGdpZkhlaWdodCk7XG4gICAgICAgICAgICAgICAgZmluaXNoQ2FwdHVyZSgpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ05TX0VSUk9SX05PVF9BVkFJTEFCTEUnKSB7XG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGRyYXdWaWRlbywgMTAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGZpbmlzaENhcHR1cmUoKSB7XG4gICAgICAgICAgICAgIGlmIChzYXZlUmVuZGVyaW5nQ29udGV4dHMpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJpbmdDb250ZXh0c1RvU2F2ZS5wdXNoKGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGdpZldpZHRoLCBnaWZIZWlnaHQpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZm9udCA9IGZvbnQ7XG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmb250Q29sb3I7XG4gICAgICAgICAgICAgICAgY29udGV4dC50ZXh0QWxpZ24gPSB0ZXh0QWxpZ247XG4gICAgICAgICAgICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSB0ZXh0QmFzZWxpbmU7XG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dCh0ZXh0LCB0ZXh0WENvb3JkaW5hdGUsIHRleHRZQ29vcmRpbmF0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYWcuYWRkRnJhbWVJbWFnZURhdGEoY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgZ2lmV2lkdGgsIGdpZkhlaWdodCkpO1xuICAgICAgICAgICAgICBwZW5kaW5nRnJhbWVzID0gZnJhbWVzTGVmdDtcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjaygobnVtRnJhbWVzIC0gcGVuZGluZ0ZyYW1lcykgLyBudW1GcmFtZXMpO1xuICAgICAgICAgICAgICBpZiAoZnJhbWVzTGVmdCA+IDApIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNhcHR1cmVGcmFtZSwgd2FpdEJldHdlZW5GcmFtZXMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghcGVuZGluZ0ZyYW1lcykge1xuICAgICAgICAgICAgICAgIGFnLmdldEJhc2U2NEdJRihmdW5jdGlvbihpbWFnZSkge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgICAgICAnZXJyb3InOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgJ2Vycm9yQ29kZSc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAnZXJyb3JNc2cnOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ltYWdlJzogaW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgICdjYW1lcmFTdHJlYW0nOiBjYW1lcmFTdHJlYW0sXG4gICAgICAgICAgICAgICAgICAgICd2aWRlb0VsZW1lbnQnOiB2aWRlb0VsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICd3ZWJjYW1WaWRlb0VsZW1lbnQnOiB3ZWJjYW1WaWRlb0VsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICdzYXZlZFJlbmRlcmluZ0NvbnRleHRzJzogcmVuZGVyaW5nQ29udGV4dHNUb1NhdmUsXG4gICAgICAgICAgICAgICAgICAgICdrZWVwQ2FtZXJhT24nOiBrZWVwQ2FtZXJhT25cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgIG51bUZyYW1lcyA9IG51bUZyYW1lcyAhPT0gdW5kZWZpbmVkID8gbnVtRnJhbWVzIDogMTA7XG4gICAgICBpbnRlcnZhbCA9IGludGVydmFsICE9PSB1bmRlZmluZWQgPyBpbnRlcnZhbCA6IDAuMTtcbiAgICAgIGNhbnZhcy53aWR0aCA9IGdpZldpZHRoO1xuICAgICAgY2FudmFzLmhlaWdodCA9IGdpZkhlaWdodDtcbiAgICAgIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIChmdW5jdGlvbiBjYXB0dXJlKCkge1xuICAgICAgICBpZiAodmlkZW9FbGVtZW50LmN1cnJlbnRUaW1lID09PSAwKSB7XG4gICAgICAgICAgc2V0VGltZW91dChjYXB0dXJlLCAxMDApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYXB0dXJlRnJhbWVzKCk7XG4gICAgICB9KCkpO1xuICAgIH0sXG4gICAgJ2dldENyb3BEaW1lbnNpb25zJzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICB2YXIgd2lkdGggPSBvYmoudmlkZW9XaWR0aCxcbiAgICAgICAgICBoZWlnaHQgPSBvYmoudmlkZW9IZWlnaHQsXG4gICAgICAgICAgZ2lmV2lkdGggPSBvYmouZ2lmV2lkdGgsXG4gICAgICAgICAgZ2lmSGVpZ2h0ID0gb2JqLmdpZkhlaWdodCxcbiAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIHNjYWxlZFdpZHRoOiAwLFxuICAgICAgICAgICAgc2NhbGVkSGVpZ2h0OiAwXG4gICAgICAgICAgfTtcbiAgICAgIGlmICh3aWR0aCA+IGhlaWdodCkge1xuICAgICAgICByZXN1bHQud2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoICogKGdpZkhlaWdodCAvIGhlaWdodCkpIC0gZ2lmV2lkdGg7XG4gICAgICAgIHJlc3VsdC5zY2FsZWRXaWR0aCA9IE1hdGgucm91bmQocmVzdWx0LndpZHRoICogKGhlaWdodCAvIGdpZkhlaWdodCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LmhlaWdodCA9IE1hdGgucm91bmQoaGVpZ2h0ICogKGdpZldpZHRoIC8gd2lkdGgpKSAtIGdpZkhlaWdodDtcbiAgICAgICAgcmVzdWx0LnNjYWxlZEhlaWdodCA9IE1hdGgucm91bmQocmVzdWx0LmhlaWdodCAqICh3aWR0aCAvIGdpZldpZHRoKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcbiAgdmlkZW9TdHJlYW0gPSB7XG4gICAgJ2xvYWRlZERhdGEnOiBmYWxzZSxcbiAgICAnZGVmYXVsdFZpZGVvRGltZW5zaW9ucyc6IHtcbiAgICAgICd3aWR0aCc6IDY0MCxcbiAgICAgICdoZWlnaHQnOiA0ODBcbiAgICB9LFxuICAgICdmaW5kVmlkZW9TaXplJzogZnVuY3Rpb24gZmluZFZpZGVvU2l6ZU1ldGhvZChvYmopIHtcbiAgICAgIGZpbmRWaWRlb1NpemVNZXRob2QuYXR0ZW1wdHMgPSBmaW5kVmlkZW9TaXplTWV0aG9kLmF0dGVtcHRzIHx8IDA7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgdmlkZW9FbGVtZW50ID0gb2JqLnZpZGVvRWxlbWVudCxcbiAgICAgICAgICBjYW1lcmFTdHJlYW0gPSBvYmouY2FtZXJhU3RyZWFtLFxuICAgICAgICAgIGNvbXBsZXRlZENhbGxiYWNrID0gb2JqLmNvbXBsZXRlZENhbGxiYWNrO1xuICAgICAgaWYgKCF2aWRlb0VsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHZpZGVvRWxlbWVudC52aWRlb1dpZHRoID4gMCAmJiB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQgPiAwKSB7XG4gICAgICAgIHZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkZWRkYXRhJywgc2VsZi5maW5kVmlkZW9TaXplKTtcbiAgICAgICAgY29tcGxldGVkQ2FsbGJhY2soe1xuICAgICAgICAgICd2aWRlb0VsZW1lbnQnOiB2aWRlb0VsZW1lbnQsXG4gICAgICAgICAgJ2NhbWVyYVN0cmVhbSc6IGNhbWVyYVN0cmVhbSxcbiAgICAgICAgICAndmlkZW9XaWR0aCc6IHZpZGVvRWxlbWVudC52aWRlb1dpZHRoLFxuICAgICAgICAgICd2aWRlb0hlaWdodCc6IHZpZGVvRWxlbWVudC52aWRlb0hlaWdodFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmaW5kVmlkZW9TaXplTWV0aG9kLmF0dGVtcHRzIDwgMTApIHtcbiAgICAgICAgICBmaW5kVmlkZW9TaXplTWV0aG9kLmF0dGVtcHRzICs9IDE7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuZmluZFZpZGVvU2l6ZShvYmopO1xuICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tcGxldGVkQ2FsbGJhY2soe1xuICAgICAgICAgICAgJ3ZpZGVvRWxlbWVudCc6IHZpZGVvRWxlbWVudCxcbiAgICAgICAgICAgICdjYW1lcmFTdHJlYW0nOiBjYW1lcmFTdHJlYW0sXG4gICAgICAgICAgICAndmlkZW9XaWR0aCc6IHNlbGYuZGVmYXVsdFZpZGVvRGltZW5zaW9ucy53aWR0aCxcbiAgICAgICAgICAgICd2aWRlb0hlaWdodCc6IHNlbGYuZGVmYXVsdFZpZGVvRGltZW5zaW9ucy5oZWlnaHRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgJ29uU3RyZWFtaW5nVGltZW91dCc6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICdlcnJvcic6IHRydWUsXG4gICAgICAgICAgJ2Vycm9yQ29kZSc6ICdnZXRVc2VyTWVkaWEnLFxuICAgICAgICAgICdlcnJvck1zZyc6ICdUaGVyZSB3YXMgYW4gaXNzdWUgd2l0aCB0aGUgZ2V0VXNlck1lZGlhIEFQSSAtIFRpbWVkIG91dCB3aGlsZSB0cnlpbmcgdG8gc3RhcnQgc3RyZWFtaW5nJyxcbiAgICAgICAgICAnaW1hZ2UnOiBudWxsLFxuICAgICAgICAgICdjYW1lcmFTdHJlYW0nOiB7fVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgICdzdHJlYW0nOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICBleGlzdGluZ1ZpZGVvID0gdXRpbHMuaXNBcnJheShvYmouZXhpc3RpbmdWaWRlbykgPyBvYmouZXhpc3RpbmdWaWRlb1swXSA6IG9iai5leGlzdGluZ1ZpZGVvLFxuICAgICAgICAgIHZpZGVvRWxlbWVudCA9IG9iai52aWRlb0VsZW1lbnQsXG4gICAgICAgICAgY2FtZXJhU3RyZWFtID0gb2JqLmNhbWVyYVN0cmVhbSxcbiAgICAgICAgICBzdHJlYW1lZENhbGxiYWNrID0gb2JqLnN0cmVhbWVkQ2FsbGJhY2ssXG4gICAgICAgICAgY29tcGxldGVkQ2FsbGJhY2sgPSBvYmouY29tcGxldGVkQ2FsbGJhY2s7XG4gICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihzdHJlYW1lZENhbGxiYWNrKSkge1xuICAgICAgICBzdHJlYW1lZENhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgICBpZiAoZXhpc3RpbmdWaWRlbykge1xuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZXhpc3RpbmdWaWRlbykpIHtcbiAgICAgICAgICB2aWRlb0VsZW1lbnQuc3JjID0gZXhpc3RpbmdWaWRlbztcbiAgICAgICAgICB2aWRlb0VsZW1lbnQuaW5uZXJIVE1MID0gJzxzb3VyY2Ugc3JjPVwiJyArIGV4aXN0aW5nVmlkZW8gKyAnXCIgdHlwZT1cInZpZGVvLycgKyB1dGlscy5nZXRFeHRlbnNpb24oZXhpc3RpbmdWaWRlbykgKyAnXCIgLz4nO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZpZGVvRWxlbWVudC5tb3pTcmNPYmplY3QpIHtcbiAgICAgICAgdmlkZW9FbGVtZW50Lm1velNyY09iamVjdCA9IGNhbWVyYVN0cmVhbTtcbiAgICAgIH0gZWxzZSBpZiAodXRpbHMuVVJMKSB7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zcmMgPSB1dGlscy5VUkwuY3JlYXRlT2JqZWN0VVJMKGNhbWVyYVN0cmVhbSk7XG4gICAgICB9XG4gICAgICB2aWRlb0VsZW1lbnQucGxheSgpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiBjaGVja0xvYWRlZERhdGEoKSB7XG4gICAgICAgIGNoZWNrTG9hZGVkRGF0YS5jb3VudCA9IGNoZWNrTG9hZGVkRGF0YS5jb3VudCB8fCAwO1xuICAgICAgICBpZiAoc2VsZi5sb2FkZWREYXRhID09PSB0cnVlKSB7XG4gICAgICAgICAgc2VsZi5maW5kVmlkZW9TaXplKHtcbiAgICAgICAgICAgICd2aWRlb0VsZW1lbnQnOiB2aWRlb0VsZW1lbnQsXG4gICAgICAgICAgICAnY2FtZXJhU3RyZWFtJzogY2FtZXJhU3RyZWFtLFxuICAgICAgICAgICAgJ2NvbXBsZXRlZENhbGxiYWNrJzogY29tcGxldGVkQ2FsbGJhY2tcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZWxmLmxvYWRlZERhdGEgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGVja0xvYWRlZERhdGEuY291bnQgKz0gMTtcbiAgICAgICAgICBpZiAoY2hlY2tMb2FkZWREYXRhLmNvdW50ID4gMTApIHtcbiAgICAgICAgICAgIHNlbGYuZmluZFZpZGVvU2l6ZSh7XG4gICAgICAgICAgICAgICd2aWRlb0VsZW1lbnQnOiB2aWRlb0VsZW1lbnQsXG4gICAgICAgICAgICAgICdjYW1lcmFTdHJlYW0nOiBjYW1lcmFTdHJlYW0sXG4gICAgICAgICAgICAgICdjb21wbGV0ZWRDYWxsYmFjayc6IGNvbXBsZXRlZENhbGxiYWNrXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hlY2tMb2FkZWREYXRhKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCAxMDApO1xuICAgIH0sXG4gICAgJ3N0YXJ0U3RyZWFtaW5nJzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgZXJyb3JDYWxsYmFjayA9IHV0aWxzLmlzRnVuY3Rpb24ob2JqLmVycm9yKSA/IG9iai5lcnJvciA6IHV0aWxzLm5vb3AsXG4gICAgICAgICAgc3RyZWFtZWRDYWxsYmFjayA9IHV0aWxzLmlzRnVuY3Rpb24ob2JqLnN0cmVhbWVkKSA/IG9iai5zdHJlYW1lZCA6IHV0aWxzLm5vb3AsXG4gICAgICAgICAgY29tcGxldGVkQ2FsbGJhY2sgPSB1dGlscy5pc0Z1bmN0aW9uKG9iai5jb21wbGV0ZWQpID8gb2JqLmNvbXBsZXRlZCA6IHV0aWxzLm5vb3AsXG4gICAgICAgICAgZXhpc3RpbmdWaWRlbyA9IG9iai5leGlzdGluZ1ZpZGVvLFxuICAgICAgICAgIHdlYmNhbVZpZGVvRWxlbWVudCA9IG9iai53ZWJjYW1WaWRlb0VsZW1lbnQsXG4gICAgICAgICAgdmlkZW9FbGVtZW50ID0gdXRpbHMuaXNFbGVtZW50KGV4aXN0aW5nVmlkZW8pID8gZXhpc3RpbmdWaWRlbyA6IHdlYmNhbVZpZGVvRWxlbWVudCA/IHdlYmNhbVZpZGVvRWxlbWVudCA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyksXG4gICAgICAgICAgbGFzdENhbWVyYVN0cmVhbSA9IG9iai5sYXN0Q2FtZXJhU3RyZWFtLFxuICAgICAgICAgIGNhbWVyYVN0cmVhbTtcbiAgICAgIHZpZGVvRWxlbWVudC5jcm9zc09yaWdpbiA9ICdBbm9ueW1vdXMnO1xuICAgICAgdmlkZW9FbGVtZW50LmF1dG9wbGF5ID0gdHJ1ZTtcbiAgICAgIHZpZGVvRWxlbWVudC5sb29wID0gdHJ1ZTtcbiAgICAgIHZpZGVvRWxlbWVudC5tdXRlZCA9IHRydWU7XG4gICAgICB2aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHNlbGYubG9hZGVkRGF0YSA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIGlmIChleGlzdGluZ1ZpZGVvKSB7XG4gICAgICAgIHNlbGYuc3RyZWFtKHtcbiAgICAgICAgICAndmlkZW9FbGVtZW50JzogdmlkZW9FbGVtZW50LFxuICAgICAgICAgICdleGlzdGluZ1ZpZGVvJzogZXhpc3RpbmdWaWRlbyxcbiAgICAgICAgICAnY29tcGxldGVkQ2FsbGJhY2snOiBjb21wbGV0ZWRDYWxsYmFja1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAobGFzdENhbWVyYVN0cmVhbSkge1xuICAgICAgICBzZWxmLnN0cmVhbSh7XG4gICAgICAgICAgJ3ZpZGVvRWxlbWVudCc6IHZpZGVvRWxlbWVudCxcbiAgICAgICAgICAnY2FtZXJhU3RyZWFtJzogbGFzdENhbWVyYVN0cmVhbSxcbiAgICAgICAgICAnc3RyZWFtZWRDYWxsYmFjayc6IHN0cmVhbWVkQ2FsbGJhY2ssXG4gICAgICAgICAgJ2NvbXBsZXRlZENhbGxiYWNrJzogY29tcGxldGVkQ2FsbGJhY2tcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1dGlscy5nZXRVc2VyTWVkaWEoeyd2aWRlbyc6IHRydWV9LCBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICBzZWxmLnN0cmVhbSh7XG4gICAgICAgICAgICAndmlkZW9FbGVtZW50JzogdmlkZW9FbGVtZW50LFxuICAgICAgICAgICAgJ2NhbWVyYVN0cmVhbSc6IHN0cmVhbSxcbiAgICAgICAgICAgICdzdHJlYW1lZENhbGxiYWNrJzogc3RyZWFtZWRDYWxsYmFjayxcbiAgICAgICAgICAgICdjb21wbGV0ZWRDYWxsYmFjayc6IGNvbXBsZXRlZENhbGxiYWNrXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIGVycm9yQ2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RhcnRWaWRlb1N0cmVhbWluZzogZnVuY3Rpb24oY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgIG5vR2V0VXNlck1lZGlhU3VwcG9ydFRpbWVvdXQsXG4gICAgICAgICAgdGltZW91dExlbmd0aCA9IG9wdGlvbnMudGltZW91dCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy50aW1lb3V0IDogMCxcbiAgICAgICAgICBvcmlnaW5hbENhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjayxcbiAgICAgICAgICB3ZWJjYW1WaWRlb0VsZW1lbnQgPSBvcHRpb25zLndlYmNhbVZpZGVvRWxlbWVudDtcbiAgICAgIGlmICh0aW1lb3V0TGVuZ3RoID4gMCkge1xuICAgICAgICBub0dldFVzZXJNZWRpYVN1cHBvcnRUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLm9uU3RyZWFtaW5nVGltZW91dChvcmlnaW5hbENhbGxiYWNrKTtcbiAgICAgICAgfSwgMTAwMDApO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGFydFN0cmVhbWluZyh7XG4gICAgICAgICdlcnJvcic6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG9yaWdpbmFsQ2FsbGJhY2soe1xuICAgICAgICAgICAgJ2Vycm9yJzogdHJ1ZSxcbiAgICAgICAgICAgICdlcnJvckNvZGUnOiAnZ2V0VXNlck1lZGlhJyxcbiAgICAgICAgICAgICdlcnJvck1zZyc6ICdUaGVyZSB3YXMgYW4gaXNzdWUgd2l0aCB0aGUgZ2V0VXNlck1lZGlhIEFQSSAtIHRoZSB1c2VyIHByb2JhYmx5IGRlbmllZCBwZXJtaXNzaW9uJyxcbiAgICAgICAgICAgICdpbWFnZSc6IG51bGwsXG4gICAgICAgICAgICAnY2FtZXJhU3RyZWFtJzoge31cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3N0cmVhbWVkJzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KG5vR2V0VXNlck1lZGlhU3VwcG9ydFRpbWVvdXQpO1xuICAgICAgICB9LFxuICAgICAgICAnY29tcGxldGVkJzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgdmFyIGNhbWVyYVN0cmVhbSA9IG9iai5jYW1lcmFTdHJlYW0sXG4gICAgICAgICAgICAgIHZpZGVvRWxlbWVudCA9IG9iai52aWRlb0VsZW1lbnQsXG4gICAgICAgICAgICAgIHZpZGVvV2lkdGggPSBvYmoudmlkZW9XaWR0aCxcbiAgICAgICAgICAgICAgdmlkZW9IZWlnaHQgPSBvYmoudmlkZW9IZWlnaHQ7XG4gICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgJ2NhbWVyYVN0cmVhbSc6IGNhbWVyYVN0cmVhbSxcbiAgICAgICAgICAgICd2aWRlb0VsZW1lbnQnOiB2aWRlb0VsZW1lbnQsXG4gICAgICAgICAgICAndmlkZW9XaWR0aCc6IHZpZGVvV2lkdGgsXG4gICAgICAgICAgICAndmlkZW9IZWlnaHQnOiB2aWRlb0hlaWdodFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICAnbGFzdENhbWVyYVN0cmVhbSc6IG9wdGlvbnMubGFzdENhbWVyYVN0cmVhbSxcbiAgICAgICAgJ3dlYmNhbVZpZGVvRWxlbWVudCc6IHdlYmNhbVZpZGVvRWxlbWVudFxuICAgICAgfSk7XG4gICAgfSxcbiAgICAnc3RvcFZpZGVvU3RyZWFtaW5nJzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICBvYmogPSB1dGlscy5pc09iamVjdChvYmopID8gb2JqIDoge307XG4gICAgICB2YXIgY2FtZXJhU3RyZWFtID0gb2JqLmNhbWVyYVN0cmVhbSxcbiAgICAgICAgICB2aWRlb0VsZW1lbnQgPSBvYmoudmlkZW9FbGVtZW50LFxuICAgICAgICAgIGtlZXBDYW1lcmFPbiA9IG9iai5rZWVwQ2FtZXJhT24sXG4gICAgICAgICAgd2ViY2FtVmlkZW9FbGVtZW50ID0gb2JqLndlYmNhbVZpZGVvRWxlbWVudDtcbiAgICAgIGlmICgha2VlcENhbWVyYU9uICYmIGNhbWVyYVN0cmVhbSAmJiB1dGlscy5pc0Z1bmN0aW9uKGNhbWVyYVN0cmVhbS5zdG9wKSkge1xuICAgICAgICBjYW1lcmFTdHJlYW0uc3RvcCgpO1xuICAgICAgfVxuICAgICAgaWYgKHV0aWxzLmlzRWxlbWVudCh2aWRlb0VsZW1lbnQpICYmICF3ZWJjYW1WaWRlb0VsZW1lbnQpIHtcbiAgICAgICAgdmlkZW9FbGVtZW50LnBhdXNlKCk7XG4gICAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHV0aWxzLlVSTC5yZXZva2VPYmplY3RVUkwpICYmICF1dGlscy53ZWJXb3JrZXJFcnJvcikge1xuICAgICAgICAgIGlmICh2aWRlb0VsZW1lbnQuc3JjKSB7XG4gICAgICAgICAgICB1dGlscy5VUkwucmV2b2tlT2JqZWN0VVJMKHZpZGVvRWxlbWVudC5zcmMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1dGlscy5yZW1vdmVFbGVtZW50KHZpZGVvRWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBzdG9wVmlkZW9TdHJlYW1pbmcgPSBmdW5jdGlvbihvYmopIHtcbiAgICBvYmogPSB1dGlscy5pc09iamVjdChvYmopID8gb2JqIDoge307XG4gICAgdmFyIG9wdGlvbnMgPSB1dGlscy5pc09iamVjdChvYmoub3B0aW9ucykgPyBvYmoub3B0aW9ucyA6IHt9LFxuICAgICAgICBjYW1lcmFTdHJlYW0gPSBvYmouY2FtZXJhU3RyZWFtLFxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBvYmoudmlkZW9FbGVtZW50LFxuICAgICAgICB3ZWJjYW1WaWRlb0VsZW1lbnQgPSBvYmoud2ViY2FtVmlkZW9FbGVtZW50LFxuICAgICAgICBrZWVwQ2FtZXJhT24gPSBvYmoua2VlcENhbWVyYU9uO1xuICAgIHZpZGVvU3RyZWFtLnN0b3BWaWRlb1N0cmVhbWluZyh7XG4gICAgICAnY2FtZXJhU3RyZWFtJzogY2FtZXJhU3RyZWFtLFxuICAgICAgJ3ZpZGVvRWxlbWVudCc6IHZpZGVvRWxlbWVudCxcbiAgICAgICdrZWVwQ2FtZXJhT24nOiBrZWVwQ2FtZXJhT24sXG4gICAgICAnd2ViY2FtVmlkZW9FbGVtZW50Jzogd2ViY2FtVmlkZW9FbGVtZW50XG4gICAgfSk7XG4gIH07XG4gIGNyZWF0ZUFuZEdldEdJRiA9IGZ1bmN0aW9uKG9iaiwgY2FsbGJhY2spIHtcbiAgICB2YXIgb3B0aW9ucyA9IG9iai5vcHRpb25zIHx8IHt9LFxuICAgICAgICBpbWFnZXMgPSBvcHRpb25zLmltYWdlcyxcbiAgICAgICAgdmlkZW8gPSBvcHRpb25zLnZpZGVvLFxuICAgICAgICBudW1GcmFtZXMgPSArb3B0aW9ucy5udW1GcmFtZXMsXG4gICAgICAgIGNhbWVyYVN0cmVhbSA9IG9iai5jYW1lcmFTdHJlYW0sXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IG9iai52aWRlb0VsZW1lbnQsXG4gICAgICAgIHZpZGVvV2lkdGggPSBvYmoudmlkZW9XaWR0aCxcbiAgICAgICAgdmlkZW9IZWlnaHQgPSBvYmoudmlkZW9IZWlnaHQsXG4gICAgICAgIGdpZldpZHRoID0gK29wdGlvbnMuZ2lmV2lkdGgsXG4gICAgICAgIGdpZkhlaWdodCA9ICtvcHRpb25zLmdpZkhlaWdodCxcbiAgICAgICAgY3JvcERpbWVuc2lvbnMgPSBzY3JlZW5TaG90LmdldENyb3BEaW1lbnNpb25zKHtcbiAgICAgICAgICAndmlkZW9XaWR0aCc6IHZpZGVvV2lkdGgsXG4gICAgICAgICAgJ3ZpZGVvSGVpZ2h0JzogdmlkZW9IZWlnaHQsXG4gICAgICAgICAgJ2dpZkhlaWdodCc6IGdpZkhlaWdodCxcbiAgICAgICAgICAnZ2lmV2lkdGgnOiBnaWZXaWR0aFxuICAgICAgICB9KSxcbiAgICAgICAgY29tcGxldGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIG9wdGlvbnMuY3JvcCA9IGNyb3BEaW1lbnNpb25zO1xuICAgIG9wdGlvbnMudmlkZW9FbGVtZW50ID0gdmlkZW9FbGVtZW50O1xuICAgIG9wdGlvbnMudmlkZW9XaWR0aCA9IHZpZGVvV2lkdGg7XG4gICAgb3B0aW9ucy52aWRlb0hlaWdodCA9IHZpZGVvSGVpZ2h0O1xuICAgIG9wdGlvbnMuY2FtZXJhU3RyZWFtID0gY2FtZXJhU3RyZWFtO1xuICAgIGlmICghdXRpbHMuaXNFbGVtZW50KHZpZGVvRWxlbWVudCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmlkZW9FbGVtZW50LndpZHRoID0gZ2lmV2lkdGggKyBjcm9wRGltZW5zaW9ucy53aWR0aDtcbiAgICB2aWRlb0VsZW1lbnQuaGVpZ2h0ID0gZ2lmSGVpZ2h0ICsgY3JvcERpbWVuc2lvbnMuaGVpZ2h0O1xuICAgIGlmICghb3B0aW9ucy53ZWJjYW1WaWRlb0VsZW1lbnQpIHtcbiAgICAgIHV0aWxzLnNldENTU0F0dHIodmlkZW9FbGVtZW50LCB7XG4gICAgICAgICdwb3NpdGlvbic6ICdmaXhlZCcsXG4gICAgICAgICdvcGFjaXR5JzogJzAnXG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlkZW9FbGVtZW50KTtcbiAgICB9XG4gICAgdmlkZW9FbGVtZW50LnBsYXkoKTtcbiAgICBzY3JlZW5TaG90LmdldEdJRihvcHRpb25zLCBmdW5jdGlvbihvYmopIHtcbiAgICAgIGlmICgoIWltYWdlcyB8fCAhaW1hZ2VzLmxlbmd0aCkgJiYgKCF2aWRlbyB8fCAhdmlkZW8ubGVuZ3RoKSkge1xuICAgICAgICBzdG9wVmlkZW9TdHJlYW1pbmcob2JqKTtcbiAgICAgIH1cbiAgICAgIGNvbXBsZXRlQ2FsbGJhY2sob2JqKTtcbiAgICB9KTtcbiAgfTtcbiAgZXhpc3RpbmdWaWRlbyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBleGlzdGluZ1ZpZGVvID0gb2JqLmV4aXN0aW5nVmlkZW8sXG4gICAgICAgIGNhbGxiYWNrID0gb2JqLmNhbGxiYWNrLFxuICAgICAgICBvcHRpb25zID0gb2JqLm9wdGlvbnMsXG4gICAgICAgIHNraXBPYmogPSB7XG4gICAgICAgICAgJ2dldFVzZXJNZWRpYSc6IHRydWUsXG4gICAgICAgICAgJ3dpbmRvdy5VUkwnOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yT2JqID0gZXJyb3IudmFsaWRhdGUoc2tpcE9iaiksXG4gICAgICAgIGxvYWRlZEltYWdlcyA9IDAsXG4gICAgICAgIHZpZGVvVHlwZSxcbiAgICAgICAgdmlkZW9TcmMsXG4gICAgICAgIHRlbXBJbWFnZSxcbiAgICAgICAgYWc7XG4gICAgaWYgKGVycm9yT2JqLmVycm9yKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3JPYmopO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNFbGVtZW50KGV4aXN0aW5nVmlkZW8pICYmIGV4aXN0aW5nVmlkZW8uc3JjKSB7XG4gICAgICB2aWRlb1NyYyA9IGV4aXN0aW5nVmlkZW8uc3JjO1xuICAgICAgdmlkZW9UeXBlID0gdXRpbHMuZ2V0RXh0ZW5zaW9uKHZpZGVvU3JjKTtcbiAgICAgIGlmICghdXRpbHMuaXNTdXBwb3J0ZWQudmlkZW9Db2RlY3NbdmlkZW9UeXBlXSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IubWVzc2FnZXMudmlkZW9Db2RlY3MpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShleGlzdGluZ1ZpZGVvKSkge1xuICAgICAgdXRpbHMuZWFjaChleGlzdGluZ1ZpZGVvLCBmdW5jdGlvbihpdGVyYXRvciwgdmlkZW9TcmMpIHtcbiAgICAgICAgdmlkZW9UeXBlID0gdmlkZW9TcmMuc3Vic3RyKHZpZGVvU3JjLmxhc3RJbmRleE9mKCcuJykgKyAxLCB2aWRlb1NyYy5sZW5ndGgpO1xuICAgICAgICBpZiAodXRpbHMuaXNTdXBwb3J0ZWQudmlkZW9Db2RlY3NbdmlkZW9UeXBlXSkge1xuICAgICAgICAgIGV4aXN0aW5nVmlkZW8gPSB2aWRlb1NyYztcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB2aWRlb1N0cmVhbS5zdGFydFN0cmVhbWluZyh7XG4gICAgICAnY29tcGxldGVkJzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIG9iai5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgY3JlYXRlQW5kR2V0R0lGKG9iaiwgY2FsbGJhY2spO1xuICAgICAgfSxcbiAgICAgICdleGlzdGluZ1ZpZGVvJzogZXhpc3RpbmdWaWRlb1xuICAgIH0pO1xuICB9O1xuICBleGlzdGluZ1dlYmNhbSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBsYXN0Q2FtZXJhU3RyZWFtID0gb2JqLmxhc3RDYW1lcmFTdHJlYW0sXG4gICAgICAgIGNhbGxiYWNrID0gb2JqLmNhbGxiYWNrLFxuICAgICAgICB3ZWJjYW1WaWRlb0VsZW1lbnQgPSBvYmoud2ViY2FtVmlkZW9FbGVtZW50LFxuICAgICAgICBvcHRpb25zID0gb2JqLm9wdGlvbnM7XG4gICAgaWYgKCFpc1dlYkNhbUdJRlN1cHBvcnRlZCgpKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IudmFsaWRhdGUoKSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNhdmVkUmVuZGVyaW5nQ29udGV4dHMubGVuZ3RoKSB7XG4gICAgICBzY3JlZW5TaG90LmdldFdlYmNhbUdJRihvcHRpb25zLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgY2FsbGJhY2sob2JqKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2aWRlb1N0cmVhbS5zdGFydFZpZGVvU3RyZWFtaW5nKGZ1bmN0aW9uKG9iaikge1xuICAgICAgb2JqLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgY3JlYXRlQW5kR2V0R0lGKG9iaiwgY2FsbGJhY2spO1xuICAgIH0sIHtcbiAgICAgICdsYXN0Q2FtZXJhU3RyZWFtJzogbGFzdENhbWVyYVN0cmVhbSxcbiAgICAgICdjYWxsYmFjayc6IGNhbGxiYWNrLFxuICAgICAgJ3dlYmNhbVZpZGVvRWxlbWVudCc6IHdlYmNhbVZpZGVvRWxlbWVudFxuICAgIH0pO1xuICB9O1xuICBjcmVhdGVHSUYgPSBmdW5jdGlvbih1c2VyT3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayA9IHV0aWxzLmlzRnVuY3Rpb24odXNlck9wdGlvbnMpID8gdXNlck9wdGlvbnMgOiBjYWxsYmFjaztcbiAgICB1c2VyT3B0aW9ucyA9IHV0aWxzLmlzT2JqZWN0KHVzZXJPcHRpb25zKSA/IHVzZXJPcHRpb25zIDoge307XG4gICAgaWYgKCF1dGlscy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgb3B0aW9ucyA9IHV0aWxzLm1lcmdlT3B0aW9ucyhkZWZhdWx0T3B0aW9ucywgdXNlck9wdGlvbnMpIHx8IHt9LFxuICAgICAgICBsYXN0Q2FtZXJhU3RyZWFtID0gdXNlck9wdGlvbnMuY2FtZXJhU3RyZWFtLFxuICAgICAgICBpbWFnZXMgPSBvcHRpb25zLmltYWdlcyxcbiAgICAgICAgaW1hZ2VzTGVuZ3RoID0gaW1hZ2VzID8gaW1hZ2VzLmxlbmd0aCA6IDAsXG4gICAgICAgIHZpZGVvID0gb3B0aW9ucy52aWRlbyxcbiAgICAgICAgd2ViY2FtVmlkZW9FbGVtZW50ID0gb3B0aW9ucy53ZWJjYW1WaWRlb0VsZW1lbnQ7XG4gICAgaWYgKGltYWdlc0xlbmd0aCkge1xuICAgICAgZXhpc3RpbmdJbWFnZXMoe1xuICAgICAgICAnaW1hZ2VzJzogaW1hZ2VzLFxuICAgICAgICAnaW1hZ2VzTGVuZ3RoJzogaW1hZ2VzTGVuZ3RoLFxuICAgICAgICAnY2FsbGJhY2snOiBjYWxsYmFjayxcbiAgICAgICAgJ29wdGlvbnMnOiBvcHRpb25zXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHZpZGVvKSB7XG4gICAgICBleGlzdGluZ1ZpZGVvKHtcbiAgICAgICAgJ2V4aXN0aW5nVmlkZW8nOiB2aWRlbyxcbiAgICAgICAgJ2NhbGxiYWNrJzogY2FsbGJhY2ssXG4gICAgICAgICdvcHRpb25zJzogb3B0aW9uc1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nV2ViY2FtKHtcbiAgICAgICAgJ2xhc3RDYW1lcmFTdHJlYW0nOiBsYXN0Q2FtZXJhU3RyZWFtLFxuICAgICAgICAnY2FsbGJhY2snOiBjYWxsYmFjayxcbiAgICAgICAgJ3dlYmNhbVZpZGVvRWxlbWVudCc6IHdlYmNhbVZpZGVvRWxlbWVudCxcbiAgICAgICAgJ29wdGlvbnMnOiBvcHRpb25zXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIHRha2VTbmFwU2hvdCA9IGZ1bmN0aW9uKHVzZXJPcHRpb25zLCBjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrID0gdXRpbHMuaXNGdW5jdGlvbih1c2VyT3B0aW9ucykgPyB1c2VyT3B0aW9ucyA6IGNhbGxiYWNrO1xuICAgIHVzZXJPcHRpb25zID0gdXRpbHMuaXNPYmplY3QodXNlck9wdGlvbnMpID8gdXNlck9wdGlvbnMgOiB7fTtcbiAgICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBtZXJnZWRPcHRpb25zID0gdXRpbHMubWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCB1c2VyT3B0aW9ucyksXG4gICAgICAgIG9wdGlvbnMgPSB1dGlscy5tZXJnZU9wdGlvbnMobWVyZ2VkT3B0aW9ucywge1xuICAgICAgICAgICdpbnRlcnZhbCc6IDAuMSxcbiAgICAgICAgICAnbnVtRnJhbWVzJzogMVxuICAgICAgICB9KTtcbiAgICBjcmVhdGVHSUYob3B0aW9ucywgY2FsbGJhY2spO1xuICB9O1xuICBBUEkgPSBmdW5jdGlvbih1dGlscywgZXJyb3IsIGRlZmF1bHRPcHRpb25zLCBpc1N1cHBvcnRlZCwgaXNXZWJDYW1HSUZTdXBwb3J0ZWQsIGlzRXhpc3RpbmdJbWFnZXNHSUZTdXBwb3J0ZWQsIGlzRXhpc3RpbmdWaWRlb0dJRlN1cHBvcnRlZCwgY3JlYXRlR0lGLCB0YWtlU25hcFNob3QsIHN0b3BWaWRlb1N0cmVhbWluZykge1xuICAgIHZhciBnaWZzaG90ID0ge1xuICAgICAgJ3V0aWxzJzogdXRpbHMsXG4gICAgICAnZXJyb3InOiBlcnJvcixcbiAgICAgICdkZWZhdWx0T3B0aW9ucyc6IGRlZmF1bHRPcHRpb25zLFxuICAgICAgJ2NyZWF0ZUdJRic6IGNyZWF0ZUdJRixcbiAgICAgICd0YWtlU25hcFNob3QnOiB0YWtlU25hcFNob3QsXG4gICAgICAnc3RvcFZpZGVvU3RyZWFtaW5nJzogc3RvcFZpZGVvU3RyZWFtaW5nLFxuICAgICAgJ2lzU3VwcG9ydGVkJzogaXNTdXBwb3J0ZWQsXG4gICAgICAnaXNXZWJDYW1HSUZTdXBwb3J0ZWQnOiBpc1dlYkNhbUdJRlN1cHBvcnRlZCxcbiAgICAgICdpc0V4aXN0aW5nVmlkZW9HSUZTdXBwb3J0ZWQnOiBpc0V4aXN0aW5nVmlkZW9HSUZTdXBwb3J0ZWQsXG4gICAgICAnaXNFeGlzdGluZ0ltYWdlc0dJRlN1cHBvcnRlZCc6IGlzRXhpc3RpbmdJbWFnZXNHSUZTdXBwb3J0ZWQsXG4gICAgICAnVkVSU0lPTic6ICcwLjEuMSdcbiAgICB9O1xuICAgIHJldHVybiBnaWZzaG90O1xuICB9KHV0aWxzLCBlcnJvciwgZGVmYXVsdE9wdGlvbnMsIGlzU3VwcG9ydGVkLCBpc1dlYkNhbUdJRlN1cHBvcnRlZCwgaXNFeGlzdGluZ0ltYWdlc0dJRlN1cHBvcnRlZCwgaXNFeGlzdGluZ1ZpZGVvR0lGU3VwcG9ydGVkLCBjcmVhdGVHSUYsIHRha2VTbmFwU2hvdCwgc3RvcFZpZGVvU3RyZWFtaW5nKTtcbiAgKGZ1bmN0aW9uKEFQSSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgIGRlZmluZShbXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBBUEk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBBUEk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5naWZzaG90ID0gQVBJO1xuICAgIH1cbiAgfShBUEkpKTtcbn0odHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LCB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgPyBkb2N1bWVudCA6IHtjcmVhdGVFbGVtZW50OiBmdW5jdGlvbigpIHt9fSwgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5uYXZpZ2F0b3IgOiB7fSkpO1xuXG5cbn0se31dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cy5SVENTZXNzaW9uRGVzY3JpcHRpb24gPSB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIHx8IHdpbmRvdy5tb3pSVENTZXNzaW9uRGVzY3JpcHRpb247XG5tb2R1bGUuZXhwb3J0cy5SVENQZWVyQ29ubmVjdGlvbiA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiB8fCB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24gfHwgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uO1xubW9kdWxlLmV4cG9ydHMuUlRDSWNlQ2FuZGlkYXRlID0gd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSB8fCB3aW5kb3cubW96UlRDSWNlQ2FuZGlkYXRlO1xuXG5cbn0se31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKTtcbnZhciBOZWdvdGlhdG9yID0gcmVxdWlyZSgnLi9uZWdvdGlhdG9yJyk7XG52YXIgUmVsaWFibGUgPSByZXF1aXJlKCdyZWxpYWJsZScpO1xuZnVuY3Rpb24gRGF0YUNvbm5lY3Rpb24ocGVlciwgcHJvdmlkZXIsIG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIERhdGFDb25uZWN0aW9uKSlcbiAgICByZXR1cm4gbmV3IERhdGFDb25uZWN0aW9uKHBlZXIsIHByb3ZpZGVyLCBvcHRpb25zKTtcbiAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG4gIHRoaXMub3B0aW9ucyA9IHV0aWwuZXh0ZW5kKHtcbiAgICBzZXJpYWxpemF0aW9uOiAnYmluYXJ5JyxcbiAgICByZWxpYWJsZTogZmFsc2VcbiAgfSwgb3B0aW9ucyk7XG4gIHRoaXMub3BlbiA9IGZhbHNlO1xuICB0aGlzLnR5cGUgPSAnZGF0YSc7XG4gIHRoaXMucGVlciA9IHBlZXI7XG4gIHRoaXMucHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgdGhpcy5pZCA9IHRoaXMub3B0aW9ucy5jb25uZWN0aW9uSWQgfHwgRGF0YUNvbm5lY3Rpb24uX2lkUHJlZml4ICsgdXRpbC5yYW5kb21Ub2tlbigpO1xuICB0aGlzLmxhYmVsID0gdGhpcy5vcHRpb25zLmxhYmVsIHx8IHRoaXMuaWQ7XG4gIHRoaXMubWV0YWRhdGEgPSB0aGlzLm9wdGlvbnMubWV0YWRhdGE7XG4gIHRoaXMuc2VyaWFsaXphdGlvbiA9IHRoaXMub3B0aW9ucy5zZXJpYWxpemF0aW9uO1xuICB0aGlzLnJlbGlhYmxlID0gdGhpcy5vcHRpb25zLnJlbGlhYmxlO1xuICB0aGlzLl9idWZmZXIgPSBbXTtcbiAgdGhpcy5fYnVmZmVyaW5nID0gZmFsc2U7XG4gIHRoaXMuYnVmZmVyU2l6ZSA9IDA7XG4gIHRoaXMuX2NodW5rZWREYXRhID0ge307XG4gIGlmICh0aGlzLm9wdGlvbnMuX3BheWxvYWQpIHtcbiAgICB0aGlzLl9wZWVyQnJvd3NlciA9IHRoaXMub3B0aW9ucy5fcGF5bG9hZC5icm93c2VyO1xuICB9XG4gIE5lZ290aWF0b3Iuc3RhcnRDb25uZWN0aW9uKHRoaXMsIHRoaXMub3B0aW9ucy5fcGF5bG9hZCB8fCB7b3JpZ2luYXRvcjogdHJ1ZX0pO1xufVxudXRpbC5pbmhlcml0cyhEYXRhQ29ubmVjdGlvbiwgRXZlbnRFbWl0dGVyKTtcbkRhdGFDb25uZWN0aW9uLl9pZFByZWZpeCA9ICdkY18nO1xuRGF0YUNvbm5lY3Rpb24ucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbihkYykge1xuICB0aGlzLl9kYyA9IHRoaXMuZGF0YUNoYW5uZWwgPSBkYztcbiAgdGhpcy5fY29uZmlndXJlRGF0YUNoYW5uZWwoKTtcbn07XG5EYXRhQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NvbmZpZ3VyZURhdGFDaGFubmVsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKHV0aWwuc3VwcG9ydHMuc2N0cCkge1xuICAgIHRoaXMuX2RjLmJpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICB9XG4gIHRoaXMuX2RjLm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xuICAgIHV0aWwubG9nKCdEYXRhIGNoYW5uZWwgY29ubmVjdGlvbiBzdWNjZXNzJyk7XG4gICAgc2VsZi5vcGVuID0gdHJ1ZTtcbiAgICBzZWxmLmVtaXQoJ29wZW4nKTtcbiAgfTtcbiAgaWYgKCF1dGlsLnN1cHBvcnRzLnNjdHAgJiYgdGhpcy5yZWxpYWJsZSkge1xuICAgIHRoaXMuX3JlbGlhYmxlID0gbmV3IFJlbGlhYmxlKHRoaXMuX2RjLCB1dGlsLmRlYnVnKTtcbiAgfVxuICBpZiAodGhpcy5fcmVsaWFibGUpIHtcbiAgICB0aGlzLl9yZWxpYWJsZS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihtc2cpIHtcbiAgICAgIHNlbGYuZW1pdCgnZGF0YScsIG1zZyk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9kYy5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XG4gICAgICBzZWxmLl9oYW5kbGVEYXRhTWVzc2FnZShlKTtcbiAgICB9O1xuICB9XG4gIHRoaXMuX2RjLm9uY2xvc2UgPSBmdW5jdGlvbihlKSB7XG4gICAgdXRpbC5sb2coJ0RhdGFDaGFubmVsIGNsb3NlZCBmb3I6Jywgc2VsZi5wZWVyKTtcbiAgICBzZWxmLmNsb3NlKCk7XG4gIH07XG59O1xuRGF0YUNvbm5lY3Rpb24ucHJvdG90eXBlLl9oYW5kbGVEYXRhTWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgZGF0YSA9IGUuZGF0YTtcbiAgdmFyIGRhdGF0eXBlID0gZGF0YS5jb25zdHJ1Y3RvcjtcbiAgaWYgKHRoaXMuc2VyaWFsaXphdGlvbiA9PT0gJ2JpbmFyeScgfHwgdGhpcy5zZXJpYWxpemF0aW9uID09PSAnYmluYXJ5LXV0ZjgnKSB7XG4gICAgaWYgKGRhdGF0eXBlID09PSBCbG9iKSB7XG4gICAgICB1dGlsLmJsb2JUb0FycmF5QnVmZmVyKGRhdGEsIGZ1bmN0aW9uKGFiKSB7XG4gICAgICAgIGRhdGEgPSB1dGlsLnVucGFjayhhYik7XG4gICAgICAgIHNlbGYuZW1pdCgnZGF0YScsIGRhdGEpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChkYXRhdHlwZSA9PT0gQXJyYXlCdWZmZXIpIHtcbiAgICAgIGRhdGEgPSB1dGlsLnVucGFjayhkYXRhKTtcbiAgICB9IGVsc2UgaWYgKGRhdGF0eXBlID09PSBTdHJpbmcpIHtcbiAgICAgIHZhciBhYiA9IHV0aWwuYmluYXJ5U3RyaW5nVG9BcnJheUJ1ZmZlcihkYXRhKTtcbiAgICAgIGRhdGEgPSB1dGlsLnVucGFjayhhYik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHRoaXMuc2VyaWFsaXphdGlvbiA9PT0gJ2pzb24nKSB7XG4gICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gIH1cbiAgaWYgKGRhdGEuX19wZWVyRGF0YSkge1xuICAgIHZhciBpZCA9IGRhdGEuX19wZWVyRGF0YTtcbiAgICB2YXIgY2h1bmtJbmZvID0gdGhpcy5fY2h1bmtlZERhdGFbaWRdIHx8IHtcbiAgICAgIGRhdGE6IFtdLFxuICAgICAgY291bnQ6IDAsXG4gICAgICB0b3RhbDogZGF0YS50b3RhbFxuICAgIH07XG4gICAgY2h1bmtJbmZvLmRhdGFbZGF0YS5uXSA9IGRhdGEuZGF0YTtcbiAgICBjaHVua0luZm8uY291bnQgKz0gMTtcbiAgICBpZiAoY2h1bmtJbmZvLnRvdGFsID09PSBjaHVua0luZm8uY291bnQpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9jaHVua2VkRGF0YVtpZF07XG4gICAgICBkYXRhID0gbmV3IEJsb2IoY2h1bmtJbmZvLmRhdGEpO1xuICAgICAgdGhpcy5faGFuZGxlRGF0YU1lc3NhZ2Uoe2RhdGE6IGRhdGF9KTtcbiAgICB9XG4gICAgdGhpcy5fY2h1bmtlZERhdGFbaWRdID0gY2h1bmtJbmZvO1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmVtaXQoJ2RhdGEnLCBkYXRhKTtcbn07XG5EYXRhQ29ubmVjdGlvbi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLm9wZW4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5vcGVuID0gZmFsc2U7XG4gIE5lZ290aWF0b3IuY2xlYW51cCh0aGlzKTtcbiAgdGhpcy5lbWl0KCdjbG9zZScpO1xufTtcbkRhdGFDb25uZWN0aW9uLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oZGF0YSwgY2h1bmtlZCkge1xuICBpZiAoIXRoaXMub3Blbikge1xuICAgIHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ0Nvbm5lY3Rpb24gaXMgbm90IG9wZW4uIFlvdSBzaG91bGQgbGlzdGVuIGZvciB0aGUgYG9wZW5gIGV2ZW50IGJlZm9yZSBzZW5kaW5nIG1lc3NhZ2VzLicpKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHRoaXMuX3JlbGlhYmxlKSB7XG4gICAgdGhpcy5fcmVsaWFibGUuc2VuZChkYXRhKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAodGhpcy5zZXJpYWxpemF0aW9uID09PSAnanNvbicpIHtcbiAgICB0aGlzLl9idWZmZXJlZFNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9IGVsc2UgaWYgKHRoaXMuc2VyaWFsaXphdGlvbiA9PT0gJ2JpbmFyeScgfHwgdGhpcy5zZXJpYWxpemF0aW9uID09PSAnYmluYXJ5LXV0ZjgnKSB7XG4gICAgdmFyIGJsb2IgPSB1dGlsLnBhY2soZGF0YSk7XG4gICAgdmFyIG5lZWRzQ2h1bmtpbmcgPSB1dGlsLmNodW5rZWRCcm93c2Vyc1t0aGlzLl9wZWVyQnJvd3Nlcl0gfHwgdXRpbC5jaHVua2VkQnJvd3NlcnNbdXRpbC5icm93c2VyXTtcbiAgICBpZiAobmVlZHNDaHVua2luZyAmJiAhY2h1bmtlZCAmJiBibG9iLnNpemUgPiB1dGlsLmNodW5rZWRNVFUpIHtcbiAgICAgIHRoaXMuX3NlbmRDaHVua3MoYmxvYik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdXRpbC5zdXBwb3J0cy5zY3RwKSB7XG4gICAgICB1dGlsLmJsb2JUb0JpbmFyeVN0cmluZyhibG9iLCBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgc2VsZi5fYnVmZmVyZWRTZW5kKHN0cik7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCF1dGlsLnN1cHBvcnRzLmJpbmFyeUJsb2IpIHtcbiAgICAgIHV0aWwuYmxvYlRvQXJyYXlCdWZmZXIoYmxvYiwgZnVuY3Rpb24oYWIpIHtcbiAgICAgICAgc2VsZi5fYnVmZmVyZWRTZW5kKGFiKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idWZmZXJlZFNlbmQoYmxvYik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX2J1ZmZlcmVkU2VuZChkYXRhKTtcbiAgfVxufTtcbkRhdGFDb25uZWN0aW9uLnByb3RvdHlwZS5fYnVmZmVyZWRTZW5kID0gZnVuY3Rpb24obXNnKSB7XG4gIGlmICh0aGlzLl9idWZmZXJpbmcgfHwgIXRoaXMuX3RyeVNlbmQobXNnKSkge1xuICAgIHRoaXMuX2J1ZmZlci5wdXNoKG1zZyk7XG4gICAgdGhpcy5idWZmZXJTaXplID0gdGhpcy5fYnVmZmVyLmxlbmd0aDtcbiAgfVxufTtcbkRhdGFDb25uZWN0aW9uLnByb3RvdHlwZS5fdHJ5U2VuZCA9IGZ1bmN0aW9uKG1zZykge1xuICB0cnkge1xuICAgIHRoaXMuX2RjLnNlbmQobXNnKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMuX2J1ZmZlcmluZyA9IHRydWU7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLl9idWZmZXJpbmcgPSBmYWxzZTtcbiAgICAgIHNlbGYuX3RyeUJ1ZmZlcigpO1xuICAgIH0sIDEwMCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcbkRhdGFDb25uZWN0aW9uLnByb3RvdHlwZS5fdHJ5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLl9idWZmZXIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtc2cgPSB0aGlzLl9idWZmZXJbMF07XG4gIGlmICh0aGlzLl90cnlTZW5kKG1zZykpIHtcbiAgICB0aGlzLl9idWZmZXIuc2hpZnQoKTtcbiAgICB0aGlzLmJ1ZmZlclNpemUgPSB0aGlzLl9idWZmZXIubGVuZ3RoO1xuICAgIHRoaXMuX3RyeUJ1ZmZlcigpO1xuICB9XG59O1xuRGF0YUNvbm5lY3Rpb24ucHJvdG90eXBlLl9zZW5kQ2h1bmtzID0gZnVuY3Rpb24oYmxvYikge1xuICB2YXIgYmxvYnMgPSB1dGlsLmNodW5rKGJsb2IpO1xuICBmb3IgKHZhciBpID0gMCxcbiAgICAgIGlpID0gYmxvYnMubGVuZ3RoOyBpIDwgaWk7IGkgKz0gMSkge1xuICAgIHZhciBibG9iID0gYmxvYnNbaV07XG4gICAgdGhpcy5zZW5kKGJsb2IsIHRydWUpO1xuICB9XG59O1xuRGF0YUNvbm5lY3Rpb24ucHJvdG90eXBlLmhhbmRsZU1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gIHZhciBwYXlsb2FkID0gbWVzc2FnZS5wYXlsb2FkO1xuICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgIGNhc2UgJ0FOU1dFUic6XG4gICAgICB0aGlzLl9wZWVyQnJvd3NlciA9IHBheWxvYWQuYnJvd3NlcjtcbiAgICAgIE5lZ290aWF0b3IuaGFuZGxlU0RQKG1lc3NhZ2UudHlwZSwgdGhpcywgcGF5bG9hZC5zZHApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQ0FORElEQVRFJzpcbiAgICAgIE5lZ290aWF0b3IuaGFuZGxlQ2FuZGlkYXRlKHRoaXMsIHBheWxvYWQuY2FuZGlkYXRlKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB1dGlsLndhcm4oJ1VucmVjb2duaXplZCBtZXNzYWdlIHR5cGU6JywgbWVzc2FnZS50eXBlLCAnZnJvbSBwZWVyOicsIHRoaXMucGVlcik7XG4gICAgICBicmVhaztcbiAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gRGF0YUNvbm5lY3Rpb247XG5cblxufSx7XCIuL25lZ290aWF0b3JcIjo5LFwiLi91dGlsXCI6MTIsXCJldmVudGVtaXR0ZXIzXCI6MTMsXCJyZWxpYWJsZVwiOjE2fV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpO1xudmFyIE5lZ290aWF0b3IgPSByZXF1aXJlKCcuL25lZ290aWF0b3InKTtcbmZ1bmN0aW9uIE1lZGlhQ29ubmVjdGlvbihwZWVyLCBwcm92aWRlciwgb3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTWVkaWFDb25uZWN0aW9uKSlcbiAgICByZXR1cm4gbmV3IE1lZGlhQ29ubmVjdGlvbihwZWVyLCBwcm92aWRlciwgb3B0aW9ucyk7XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuICB0aGlzLm9wdGlvbnMgPSB1dGlsLmV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gIHRoaXMub3BlbiA9IGZhbHNlO1xuICB0aGlzLnR5cGUgPSAnbWVkaWEnO1xuICB0aGlzLnBlZXIgPSBwZWVyO1xuICB0aGlzLnByb3ZpZGVyID0gcHJvdmlkZXI7XG4gIHRoaXMubWV0YWRhdGEgPSB0aGlzLm9wdGlvbnMubWV0YWRhdGE7XG4gIHRoaXMubG9jYWxTdHJlYW0gPSB0aGlzLm9wdGlvbnMuX3N0cmVhbTtcbiAgdGhpcy5pZCA9IHRoaXMub3B0aW9ucy5jb25uZWN0aW9uSWQgfHwgTWVkaWFDb25uZWN0aW9uLl9pZFByZWZpeCArIHV0aWwucmFuZG9tVG9rZW4oKTtcbiAgaWYgKHRoaXMubG9jYWxTdHJlYW0pIHtcbiAgICBOZWdvdGlhdG9yLnN0YXJ0Q29ubmVjdGlvbih0aGlzLCB7XG4gICAgICBfc3RyZWFtOiB0aGlzLmxvY2FsU3RyZWFtLFxuICAgICAgb3JpZ2luYXRvcjogdHJ1ZVxuICAgIH0pO1xuICB9XG59XG47XG51dGlsLmluaGVyaXRzKE1lZGlhQ29ubmVjdGlvbiwgRXZlbnRFbWl0dGVyKTtcbk1lZGlhQ29ubmVjdGlvbi5faWRQcmVmaXggPSAnbWNfJztcbk1lZGlhQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24ocmVtb3RlU3RyZWFtKSB7XG4gIHV0aWwubG9nKCdSZWNlaXZpbmcgc3RyZWFtJywgcmVtb3RlU3RyZWFtKTtcbiAgdGhpcy5yZW1vdGVTdHJlYW0gPSByZW1vdGVTdHJlYW07XG4gIHRoaXMuZW1pdCgnc3RyZWFtJywgcmVtb3RlU3RyZWFtKTtcbn07XG5NZWRpYUNvbm5lY3Rpb24ucHJvdG90eXBlLmhhbmRsZU1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gIHZhciBwYXlsb2FkID0gbWVzc2FnZS5wYXlsb2FkO1xuICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xuICAgIGNhc2UgJ0FOU1dFUic6XG4gICAgICBOZWdvdGlhdG9yLmhhbmRsZVNEUChtZXNzYWdlLnR5cGUsIHRoaXMsIHBheWxvYWQuc2RwKTtcbiAgICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdDQU5ESURBVEUnOlxuICAgICAgTmVnb3RpYXRvci5oYW5kbGVDYW5kaWRhdGUodGhpcywgcGF5bG9hZC5jYW5kaWRhdGUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHV0aWwud2FybignVW5yZWNvZ25pemVkIG1lc3NhZ2UgdHlwZTonLCBtZXNzYWdlLnR5cGUsICdmcm9tIHBlZXI6JywgdGhpcy5wZWVyKTtcbiAgICAgIGJyZWFrO1xuICB9XG59O1xuTWVkaWFDb25uZWN0aW9uLnByb3RvdHlwZS5hbnN3ZXIgPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgaWYgKHRoaXMubG9jYWxTdHJlYW0pIHtcbiAgICB1dGlsLndhcm4oJ0xvY2FsIHN0cmVhbSBhbHJlYWR5IGV4aXN0cyBvbiB0aGlzIE1lZGlhQ29ubmVjdGlvbi4gQXJlIHlvdSBhbnN3ZXJpbmcgYSBjYWxsIHR3aWNlPycpO1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLm9wdGlvbnMuX3BheWxvYWQuX3N0cmVhbSA9IHN0cmVhbTtcbiAgdGhpcy5sb2NhbFN0cmVhbSA9IHN0cmVhbTtcbiAgTmVnb3RpYXRvci5zdGFydENvbm5lY3Rpb24odGhpcywgdGhpcy5vcHRpb25zLl9wYXlsb2FkKTtcbiAgdmFyIG1lc3NhZ2VzID0gdGhpcy5wcm92aWRlci5fZ2V0TWVzc2FnZXModGhpcy5pZCk7XG4gIGZvciAodmFyIGkgPSAwLFxuICAgICAgaWkgPSBtZXNzYWdlcy5sZW5ndGg7IGkgPCBpaTsgaSArPSAxKSB7XG4gICAgdGhpcy5oYW5kbGVNZXNzYWdlKG1lc3NhZ2VzW2ldKTtcbiAgfVxuICB0aGlzLm9wZW4gPSB0cnVlO1xufTtcbk1lZGlhQ29ubmVjdGlvbi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLm9wZW4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5vcGVuID0gZmFsc2U7XG4gIE5lZ290aWF0b3IuY2xlYW51cCh0aGlzKTtcbiAgdGhpcy5lbWl0KCdjbG9zZScpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gTWVkaWFDb25uZWN0aW9uO1xuXG5cbn0se1wiLi9uZWdvdGlhdG9yXCI6OSxcIi4vdXRpbFwiOjEyLFwiZXZlbnRlbWl0dGVyM1wiOjEzfV0sOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgUlRDUGVlckNvbm5lY3Rpb24gPSByZXF1aXJlKCcuL2FkYXB0ZXInKS5SVENQZWVyQ29ubmVjdGlvbjtcbnZhciBSVENTZXNzaW9uRGVzY3JpcHRpb24gPSByZXF1aXJlKCcuL2FkYXB0ZXInKS5SVENTZXNzaW9uRGVzY3JpcHRpb247XG52YXIgUlRDSWNlQ2FuZGlkYXRlID0gcmVxdWlyZSgnLi9hZGFwdGVyJykuUlRDSWNlQ2FuZGlkYXRlO1xudmFyIE5lZ290aWF0b3IgPSB7XG4gIHBjczoge1xuICAgIGRhdGE6IHt9LFxuICAgIG1lZGlhOiB7fVxuICB9LFxuICBxdWV1ZTogW11cbn07XG5OZWdvdGlhdG9yLl9pZFByZWZpeCA9ICdwY18nO1xuTmVnb3RpYXRvci5zdGFydENvbm5lY3Rpb24gPSBmdW5jdGlvbihjb25uZWN0aW9uLCBvcHRpb25zKSB7XG4gIHZhciBwYyA9IE5lZ290aWF0b3IuX2dldFBlZXJDb25uZWN0aW9uKGNvbm5lY3Rpb24sIG9wdGlvbnMpO1xuICBpZiAoY29ubmVjdGlvbi50eXBlID09PSAnbWVkaWEnICYmIG9wdGlvbnMuX3N0cmVhbSkge1xuICAgIHBjLmFkZFN0cmVhbShvcHRpb25zLl9zdHJlYW0pO1xuICB9XG4gIGNvbm5lY3Rpb24ucGMgPSBjb25uZWN0aW9uLnBlZXJDb25uZWN0aW9uID0gcGM7XG4gIGlmIChvcHRpb25zLm9yaWdpbmF0b3IpIHtcbiAgICBpZiAoY29ubmVjdGlvbi50eXBlID09PSAnZGF0YScpIHtcbiAgICAgIHZhciBjb25maWcgPSB7fTtcbiAgICAgIGlmICghdXRpbC5zdXBwb3J0cy5zY3RwKSB7XG4gICAgICAgIGNvbmZpZyA9IHtyZWxpYWJsZTogb3B0aW9ucy5yZWxpYWJsZX07XG4gICAgICB9XG4gICAgICB2YXIgZGMgPSBwYy5jcmVhdGVEYXRhQ2hhbm5lbChjb25uZWN0aW9uLmxhYmVsLCBjb25maWcpO1xuICAgICAgY29ubmVjdGlvbi5pbml0aWFsaXplKGRjKTtcbiAgICB9XG4gICAgaWYgKCF1dGlsLnN1cHBvcnRzLm9ubmVnb3RpYXRpb25uZWVkZWQpIHtcbiAgICAgIE5lZ290aWF0b3IuX21ha2VPZmZlcihjb25uZWN0aW9uKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgTmVnb3RpYXRvci5oYW5kbGVTRFAoJ09GRkVSJywgY29ubmVjdGlvbiwgb3B0aW9ucy5zZHApO1xuICB9XG59O1xuTmVnb3RpYXRvci5fZ2V0UGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihjb25uZWN0aW9uLCBvcHRpb25zKSB7XG4gIGlmICghTmVnb3RpYXRvci5wY3NbY29ubmVjdGlvbi50eXBlXSkge1xuICAgIHV0aWwuZXJyb3IoY29ubmVjdGlvbi50eXBlICsgJyBpcyBub3QgYSB2YWxpZCBjb25uZWN0aW9uIHR5cGUuIE1heWJlIHlvdSBvdmVycm9kZSB0aGUgYHR5cGVgIHByb3BlcnR5IHNvbWV3aGVyZS4nKTtcbiAgfVxuICBpZiAoIU5lZ290aWF0b3IucGNzW2Nvbm5lY3Rpb24udHlwZV1bY29ubmVjdGlvbi5wZWVyXSkge1xuICAgIE5lZ290aWF0b3IucGNzW2Nvbm5lY3Rpb24udHlwZV1bY29ubmVjdGlvbi5wZWVyXSA9IHt9O1xuICB9XG4gIHZhciBwZWVyQ29ubmVjdGlvbnMgPSBOZWdvdGlhdG9yLnBjc1tjb25uZWN0aW9uLnR5cGVdW2Nvbm5lY3Rpb24ucGVlcl07XG4gIHZhciBwYztcbiAgaWYgKG9wdGlvbnMucGMpIHtcbiAgICBwYyA9IE5lZ290aWF0b3IucGNzW2Nvbm5lY3Rpb24udHlwZV1bY29ubmVjdGlvbi5wZWVyXVtvcHRpb25zLnBjXTtcbiAgfVxuICBpZiAoIXBjIHx8IHBjLnNpZ25hbGluZ1N0YXRlICE9PSAnc3RhYmxlJykge1xuICAgIHBjID0gTmVnb3RpYXRvci5fc3RhcnRQZWVyQ29ubmVjdGlvbihjb25uZWN0aW9uKTtcbiAgfVxuICByZXR1cm4gcGM7XG59O1xuTmVnb3RpYXRvci5fc3RhcnRQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcbiAgdXRpbC5sb2coJ0NyZWF0aW5nIFJUQ1BlZXJDb25uZWN0aW9uLicpO1xuICB2YXIgaWQgPSBOZWdvdGlhdG9yLl9pZFByZWZpeCArIHV0aWwucmFuZG9tVG9rZW4oKTtcbiAgdmFyIG9wdGlvbmFsID0ge307XG4gIGlmIChjb25uZWN0aW9uLnR5cGUgPT09ICdkYXRhJyAmJiAhdXRpbC5zdXBwb3J0cy5zY3RwKSB7XG4gICAgb3B0aW9uYWwgPSB7b3B0aW9uYWw6IFt7UnRwRGF0YUNoYW5uZWxzOiB0cnVlfV19O1xuICB9IGVsc2UgaWYgKGNvbm5lY3Rpb24udHlwZSA9PT0gJ21lZGlhJykge1xuICAgIG9wdGlvbmFsID0ge29wdGlvbmFsOiBbe0R0bHNTcnRwS2V5QWdyZWVtZW50OiB0cnVlfV19O1xuICB9XG4gIHZhciBwYyA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihjb25uZWN0aW9uLnByb3ZpZGVyLm9wdGlvbnMuY29uZmlnLCBvcHRpb25hbCk7XG4gIE5lZ290aWF0b3IucGNzW2Nvbm5lY3Rpb24udHlwZV1bY29ubmVjdGlvbi5wZWVyXVtpZF0gPSBwYztcbiAgTmVnb3RpYXRvci5fc2V0dXBMaXN0ZW5lcnMoY29ubmVjdGlvbiwgcGMsIGlkKTtcbiAgcmV0dXJuIHBjO1xufTtcbk5lZ290aWF0b3IuX3NldHVwTGlzdGVuZXJzID0gZnVuY3Rpb24oY29ubmVjdGlvbiwgcGMsIHBjX2lkKSB7XG4gIHZhciBwZWVySWQgPSBjb25uZWN0aW9uLnBlZXI7XG4gIHZhciBjb25uZWN0aW9uSWQgPSBjb25uZWN0aW9uLmlkO1xuICB2YXIgcHJvdmlkZXIgPSBjb25uZWN0aW9uLnByb3ZpZGVyO1xuICB1dGlsLmxvZygnTGlzdGVuaW5nIGZvciBJQ0UgY2FuZGlkYXRlcy4nKTtcbiAgcGMub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbihldnQpIHtcbiAgICBpZiAoZXZ0LmNhbmRpZGF0ZSkge1xuICAgICAgdXRpbC5sb2coJ1JlY2VpdmVkIElDRSBjYW5kaWRhdGVzIGZvcjonLCBjb25uZWN0aW9uLnBlZXIpO1xuICAgICAgcHJvdmlkZXIuc29ja2V0LnNlbmQoe1xuICAgICAgICB0eXBlOiAnQ0FORElEQVRFJyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIGNhbmRpZGF0ZTogZXZ0LmNhbmRpZGF0ZSxcbiAgICAgICAgICB0eXBlOiBjb25uZWN0aW9uLnR5cGUsXG4gICAgICAgICAgY29ubmVjdGlvbklkOiBjb25uZWN0aW9uLmlkXG4gICAgICAgIH0sXG4gICAgICAgIGRzdDogcGVlcklkXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIHBjLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgc3dpdGNoIChwYy5pY2VDb25uZWN0aW9uU3RhdGUpIHtcbiAgICAgIGNhc2UgJ2Rpc2Nvbm5lY3RlZCc6XG4gICAgICBjYXNlICdmYWlsZWQnOlxuICAgICAgICB1dGlsLmxvZygnaWNlQ29ubmVjdGlvblN0YXRlIGlzIGRpc2Nvbm5lY3RlZCwgY2xvc2luZyBjb25uZWN0aW9ucyB0byAnICsgcGVlcklkKTtcbiAgICAgICAgY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NvbXBsZXRlZCc6XG4gICAgICAgIHBjLm9uaWNlY2FuZGlkYXRlID0gdXRpbC5ub29wO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG4gIHBjLm9uaWNlY2hhbmdlID0gcGMub25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2U7XG4gIHV0aWwubG9nKCdMaXN0ZW5pbmcgZm9yIGBuZWdvdGlhdGlvbm5lZWRlZGAnKTtcbiAgcGMub25uZWdvdGlhdGlvbm5lZWRlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHV0aWwubG9nKCdgbmVnb3RpYXRpb25uZWVkZWRgIHRyaWdnZXJlZCcpO1xuICAgIGlmIChwYy5zaWduYWxpbmdTdGF0ZSA9PSAnc3RhYmxlJykge1xuICAgICAgTmVnb3RpYXRvci5fbWFrZU9mZmVyKGNvbm5lY3Rpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1dGlsLmxvZygnb25uZWdvdGlhdGlvbm5lZWRlZCB0cmlnZ2VyZWQgd2hlbiBub3Qgc3RhYmxlLiBJcyBhbm90aGVyIGNvbm5lY3Rpb24gYmVpbmcgZXN0YWJsaXNoZWQ/Jyk7XG4gICAgfVxuICB9O1xuICB1dGlsLmxvZygnTGlzdGVuaW5nIGZvciBkYXRhIGNoYW5uZWwnKTtcbiAgcGMub25kYXRhY2hhbm5lbCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgIHV0aWwubG9nKCdSZWNlaXZlZCBkYXRhIGNoYW5uZWwnKTtcbiAgICB2YXIgZGMgPSBldnQuY2hhbm5lbDtcbiAgICB2YXIgY29ubmVjdGlvbiA9IHByb3ZpZGVyLmdldENvbm5lY3Rpb24ocGVlcklkLCBjb25uZWN0aW9uSWQpO1xuICAgIGNvbm5lY3Rpb24uaW5pdGlhbGl6ZShkYyk7XG4gIH07XG4gIHV0aWwubG9nKCdMaXN0ZW5pbmcgZm9yIHJlbW90ZSBzdHJlYW0nKTtcbiAgcGMub25hZGRzdHJlYW0gPSBmdW5jdGlvbihldnQpIHtcbiAgICB1dGlsLmxvZygnUmVjZWl2ZWQgcmVtb3RlIHN0cmVhbScpO1xuICAgIHZhciBzdHJlYW0gPSBldnQuc3RyZWFtO1xuICAgIHZhciBjb25uZWN0aW9uID0gcHJvdmlkZXIuZ2V0Q29ubmVjdGlvbihwZWVySWQsIGNvbm5lY3Rpb25JZCk7XG4gICAgaWYgKGNvbm5lY3Rpb24udHlwZSA9PT0gJ21lZGlhJykge1xuICAgICAgY29ubmVjdGlvbi5hZGRTdHJlYW0oc3RyZWFtKTtcbiAgICB9XG4gIH07XG59O1xuTmVnb3RpYXRvci5jbGVhbnVwID0gZnVuY3Rpb24oY29ubmVjdGlvbikge1xuICB1dGlsLmxvZygnQ2xlYW5pbmcgdXAgUGVlckNvbm5lY3Rpb24gdG8gJyArIGNvbm5lY3Rpb24ucGVlcik7XG4gIHZhciBwYyA9IGNvbm5lY3Rpb24ucGM7XG4gIGlmICghIXBjICYmIChwYy5yZWFkeVN0YXRlICE9PSAnY2xvc2VkJyB8fCBwYy5zaWduYWxpbmdTdGF0ZSAhPT0gJ2Nsb3NlZCcpKSB7XG4gICAgcGMuY2xvc2UoKTtcbiAgICBjb25uZWN0aW9uLnBjID0gbnVsbDtcbiAgfVxufTtcbk5lZ290aWF0b3IuX21ha2VPZmZlciA9IGZ1bmN0aW9uKGNvbm5lY3Rpb24pIHtcbiAgdmFyIHBjID0gY29ubmVjdGlvbi5wYztcbiAgcGMuY3JlYXRlT2ZmZXIoZnVuY3Rpb24ob2ZmZXIpIHtcbiAgICB1dGlsLmxvZygnQ3JlYXRlZCBvZmZlci4nKTtcbiAgICBpZiAoIXV0aWwuc3VwcG9ydHMuc2N0cCAmJiBjb25uZWN0aW9uLnR5cGUgPT09ICdkYXRhJyAmJiBjb25uZWN0aW9uLnJlbGlhYmxlKSB7XG4gICAgICBvZmZlci5zZHAgPSBSZWxpYWJsZS5oaWdoZXJCYW5kd2lkdGhTRFAob2ZmZXIuc2RwKTtcbiAgICB9XG4gICAgcGMuc2V0TG9jYWxEZXNjcmlwdGlvbihvZmZlciwgZnVuY3Rpb24oKSB7XG4gICAgICB1dGlsLmxvZygnU2V0IGxvY2FsRGVzY3JpcHRpb246IG9mZmVyJywgJ2ZvcjonLCBjb25uZWN0aW9uLnBlZXIpO1xuICAgICAgY29ubmVjdGlvbi5wcm92aWRlci5zb2NrZXQuc2VuZCh7XG4gICAgICAgIHR5cGU6ICdPRkZFUicsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBzZHA6IG9mZmVyLFxuICAgICAgICAgIHR5cGU6IGNvbm5lY3Rpb24udHlwZSxcbiAgICAgICAgICBsYWJlbDogY29ubmVjdGlvbi5sYWJlbCxcbiAgICAgICAgICBjb25uZWN0aW9uSWQ6IGNvbm5lY3Rpb24uaWQsXG4gICAgICAgICAgcmVsaWFibGU6IGNvbm5lY3Rpb24ucmVsaWFibGUsXG4gICAgICAgICAgc2VyaWFsaXphdGlvbjogY29ubmVjdGlvbi5zZXJpYWxpemF0aW9uLFxuICAgICAgICAgIG1ldGFkYXRhOiBjb25uZWN0aW9uLm1ldGFkYXRhLFxuICAgICAgICAgIGJyb3dzZXI6IHV0aWwuYnJvd3NlclxuICAgICAgICB9LFxuICAgICAgICBkc3Q6IGNvbm5lY3Rpb24ucGVlclxuICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25uZWN0aW9uLnByb3ZpZGVyLmVtaXRFcnJvcignd2VicnRjJywgZXJyKTtcbiAgICAgIHV0aWwubG9nKCdGYWlsZWQgdG8gc2V0TG9jYWxEZXNjcmlwdGlvbiwgJywgZXJyKTtcbiAgICB9KTtcbiAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgY29ubmVjdGlvbi5wcm92aWRlci5lbWl0RXJyb3IoJ3dlYnJ0YycsIGVycik7XG4gICAgdXRpbC5sb2coJ0ZhaWxlZCB0byBjcmVhdGVPZmZlciwgJywgZXJyKTtcbiAgfSwgY29ubmVjdGlvbi5vcHRpb25zLmNvbnN0cmFpbnRzKTtcbn07XG5OZWdvdGlhdG9yLl9tYWtlQW5zd2VyID0gZnVuY3Rpb24oY29ubmVjdGlvbikge1xuICB2YXIgcGMgPSBjb25uZWN0aW9uLnBjO1xuICBwYy5jcmVhdGVBbnN3ZXIoZnVuY3Rpb24oYW5zd2VyKSB7XG4gICAgdXRpbC5sb2coJ0NyZWF0ZWQgYW5zd2VyLicpO1xuICAgIGlmICghdXRpbC5zdXBwb3J0cy5zY3RwICYmIGNvbm5lY3Rpb24udHlwZSA9PT0gJ2RhdGEnICYmIGNvbm5lY3Rpb24ucmVsaWFibGUpIHtcbiAgICAgIGFuc3dlci5zZHAgPSBSZWxpYWJsZS5oaWdoZXJCYW5kd2lkdGhTRFAoYW5zd2VyLnNkcCk7XG4gICAgfVxuICAgIHBjLnNldExvY2FsRGVzY3JpcHRpb24oYW5zd2VyLCBmdW5jdGlvbigpIHtcbiAgICAgIHV0aWwubG9nKCdTZXQgbG9jYWxEZXNjcmlwdGlvbjogYW5zd2VyJywgJ2ZvcjonLCBjb25uZWN0aW9uLnBlZXIpO1xuICAgICAgY29ubmVjdGlvbi5wcm92aWRlci5zb2NrZXQuc2VuZCh7XG4gICAgICAgIHR5cGU6ICdBTlNXRVInLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgc2RwOiBhbnN3ZXIsXG4gICAgICAgICAgdHlwZTogY29ubmVjdGlvbi50eXBlLFxuICAgICAgICAgIGNvbm5lY3Rpb25JZDogY29ubmVjdGlvbi5pZCxcbiAgICAgICAgICBicm93c2VyOiB1dGlsLmJyb3dzZXJcbiAgICAgICAgfSxcbiAgICAgICAgZHN0OiBjb25uZWN0aW9uLnBlZXJcbiAgICAgIH0pO1xuICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgY29ubmVjdGlvbi5wcm92aWRlci5lbWl0RXJyb3IoJ3dlYnJ0YycsIGVycik7XG4gICAgICB1dGlsLmxvZygnRmFpbGVkIHRvIHNldExvY2FsRGVzY3JpcHRpb24sICcsIGVycik7XG4gICAgfSk7XG4gIH0sIGZ1bmN0aW9uKGVycikge1xuICAgIGNvbm5lY3Rpb24ucHJvdmlkZXIuZW1pdEVycm9yKCd3ZWJydGMnLCBlcnIpO1xuICAgIHV0aWwubG9nKCdGYWlsZWQgdG8gY3JlYXRlIGFuc3dlciwgJywgZXJyKTtcbiAgfSk7XG59O1xuTmVnb3RpYXRvci5oYW5kbGVTRFAgPSBmdW5jdGlvbih0eXBlLCBjb25uZWN0aW9uLCBzZHApIHtcbiAgc2RwID0gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihzZHApO1xuICB2YXIgcGMgPSBjb25uZWN0aW9uLnBjO1xuICB1dGlsLmxvZygnU2V0dGluZyByZW1vdGUgZGVzY3JpcHRpb24nLCBzZHApO1xuICBwYy5zZXRSZW1vdGVEZXNjcmlwdGlvbihzZHAsIGZ1bmN0aW9uKCkge1xuICAgIHV0aWwubG9nKCdTZXQgcmVtb3RlRGVzY3JpcHRpb246JywgdHlwZSwgJ2ZvcjonLCBjb25uZWN0aW9uLnBlZXIpO1xuICAgIGlmICh0eXBlID09PSAnT0ZGRVInKSB7XG4gICAgICBOZWdvdGlhdG9yLl9tYWtlQW5zd2VyKGNvbm5lY3Rpb24pO1xuICAgIH1cbiAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgY29ubmVjdGlvbi5wcm92aWRlci5lbWl0RXJyb3IoJ3dlYnJ0YycsIGVycik7XG4gICAgdXRpbC5sb2coJ0ZhaWxlZCB0byBzZXRSZW1vdGVEZXNjcmlwdGlvbiwgJywgZXJyKTtcbiAgfSk7XG59O1xuTmVnb3RpYXRvci5oYW5kbGVDYW5kaWRhdGUgPSBmdW5jdGlvbihjb25uZWN0aW9uLCBpY2UpIHtcbiAgdmFyIGNhbmRpZGF0ZSA9IGljZS5jYW5kaWRhdGU7XG4gIHZhciBzZHBNTGluZUluZGV4ID0gaWNlLnNkcE1MaW5lSW5kZXg7XG4gIGNvbm5lY3Rpb24ucGMuYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoe1xuICAgIHNkcE1MaW5lSW5kZXg6IHNkcE1MaW5lSW5kZXgsXG4gICAgY2FuZGlkYXRlOiBjYW5kaWRhdGVcbiAgfSkpO1xuICB1dGlsLmxvZygnQWRkZWQgSUNFIGNhbmRpZGF0ZSBmb3I6JywgY29ubmVjdGlvbi5wZWVyKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE5lZ290aWF0b3I7XG5cblxufSx7XCIuL2FkYXB0ZXJcIjo2LFwiLi91dGlsXCI6MTJ9XSwxMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpO1xudmFyIFNvY2tldCA9IHJlcXVpcmUoJy4vc29ja2V0Jyk7XG52YXIgTWVkaWFDb25uZWN0aW9uID0gcmVxdWlyZSgnLi9tZWRpYWNvbm5lY3Rpb24nKTtcbnZhciBEYXRhQ29ubmVjdGlvbiA9IHJlcXVpcmUoJy4vZGF0YWNvbm5lY3Rpb24nKTtcbmZ1bmN0aW9uIFBlZXIoaWQsIG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBlZXIpKVxuICAgIHJldHVybiBuZXcgUGVlcihpZCwgb3B0aW9ucyk7XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuICBpZiAoaWQgJiYgaWQuY29uc3RydWN0b3IgPT0gT2JqZWN0KSB7XG4gICAgb3B0aW9ucyA9IGlkO1xuICAgIGlkID0gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKGlkKSB7XG4gICAgaWQgPSBpZC50b1N0cmluZygpO1xuICB9XG4gIG9wdGlvbnMgPSB1dGlsLmV4dGVuZCh7XG4gICAgZGVidWc6IDAsXG4gICAgaG9zdDogdXRpbC5DTE9VRF9IT1NULFxuICAgIHBvcnQ6IHV0aWwuQ0xPVURfUE9SVCxcbiAgICBrZXk6ICdwZWVyanMnLFxuICAgIHBhdGg6ICcvJyxcbiAgICB0b2tlbjogdXRpbC5yYW5kb21Ub2tlbigpLFxuICAgIGNvbmZpZzogdXRpbC5kZWZhdWx0Q29uZmlnXG4gIH0sIG9wdGlvbnMpO1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICBpZiAob3B0aW9ucy5ob3N0ID09PSAnLycpIHtcbiAgICBvcHRpb25zLmhvc3QgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gIH1cbiAgaWYgKG9wdGlvbnMucGF0aFswXSAhPT0gJy8nKSB7XG4gICAgb3B0aW9ucy5wYXRoID0gJy8nICsgb3B0aW9ucy5wYXRoO1xuICB9XG4gIGlmIChvcHRpb25zLnBhdGhbb3B0aW9ucy5wYXRoLmxlbmd0aCAtIDFdICE9PSAnLycpIHtcbiAgICBvcHRpb25zLnBhdGggKz0gJy8nO1xuICB9XG4gIGlmIChvcHRpb25zLnNlY3VyZSA9PT0gdW5kZWZpbmVkICYmIG9wdGlvbnMuaG9zdCAhPT0gdXRpbC5DTE9VRF9IT1NUKSB7XG4gICAgb3B0aW9ucy5zZWN1cmUgPSB1dGlsLmlzU2VjdXJlKCk7XG4gIH1cbiAgaWYgKG9wdGlvbnMubG9nRnVuY3Rpb24pIHtcbiAgICB1dGlsLnNldExvZ0Z1bmN0aW9uKG9wdGlvbnMubG9nRnVuY3Rpb24pO1xuICB9XG4gIHV0aWwuc2V0TG9nTGV2ZWwob3B0aW9ucy5kZWJ1Zyk7XG4gIGlmICghdXRpbC5zdXBwb3J0cy5hdWRpb1ZpZGVvICYmICF1dGlsLnN1cHBvcnRzLmRhdGEpIHtcbiAgICB0aGlzLl9kZWxheWVkQWJvcnQoJ2Jyb3dzZXItaW5jb21wYXRpYmxlJywgJ1RoZSBjdXJyZW50IGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBXZWJSVEMnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCF1dGlsLnZhbGlkYXRlSWQoaWQpKSB7XG4gICAgdGhpcy5fZGVsYXllZEFib3J0KCdpbnZhbGlkLWlkJywgJ0lEIFwiJyArIGlkICsgJ1wiIGlzIGludmFsaWQnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCF1dGlsLnZhbGlkYXRlS2V5KG9wdGlvbnMua2V5KSkge1xuICAgIHRoaXMuX2RlbGF5ZWRBYm9ydCgnaW52YWxpZC1rZXknLCAnQVBJIEtFWSBcIicgKyBvcHRpb25zLmtleSArICdcIiBpcyBpbnZhbGlkJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChvcHRpb25zLnNlY3VyZSAmJiBvcHRpb25zLmhvc3QgPT09ICcwLnBlZXJqcy5jb20nKSB7XG4gICAgdGhpcy5fZGVsYXllZEFib3J0KCdzc2wtdW5hdmFpbGFibGUnLCAnVGhlIGNsb3VkIHNlcnZlciBjdXJyZW50bHkgZG9lcyBub3Qgc3VwcG9ydCBIVFRQUy4gUGxlYXNlIHJ1biB5b3VyIG93biBQZWVyU2VydmVyIHRvIHVzZSBIVFRQUy4nKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZTtcbiAgdGhpcy5kaXNjb25uZWN0ZWQgPSBmYWxzZTtcbiAgdGhpcy5vcGVuID0gZmFsc2U7XG4gIHRoaXMuY29ubmVjdGlvbnMgPSB7fTtcbiAgdGhpcy5fbG9zdE1lc3NhZ2VzID0ge307XG4gIHRoaXMuX2luaXRpYWxpemVTZXJ2ZXJDb25uZWN0aW9uKCk7XG4gIGlmIChpZCkge1xuICAgIHRoaXMuX2luaXRpYWxpemUoaWQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX3JldHJpZXZlSWQoKTtcbiAgfVxufVxudXRpbC5pbmhlcml0cyhQZWVyLCBFdmVudEVtaXR0ZXIpO1xuUGVlci5wcm90b3R5cGUuX2luaXRpYWxpemVTZXJ2ZXJDb25uZWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5zb2NrZXQgPSBuZXcgU29ja2V0KHRoaXMub3B0aW9ucy5zZWN1cmUsIHRoaXMub3B0aW9ucy5ob3N0LCB0aGlzLm9wdGlvbnMucG9ydCwgdGhpcy5vcHRpb25zLnBhdGgsIHRoaXMub3B0aW9ucy5rZXkpO1xuICB0aGlzLnNvY2tldC5vbignbWVzc2FnZScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBzZWxmLl9oYW5kbGVNZXNzYWdlKGRhdGEpO1xuICB9KTtcbiAgdGhpcy5zb2NrZXQub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICBzZWxmLl9hYm9ydCgnc29ja2V0LWVycm9yJywgZXJyb3IpO1xuICB9KTtcbiAgdGhpcy5zb2NrZXQub24oJ2Rpc2Nvbm5lY3RlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGlmICghc2VsZi5kaXNjb25uZWN0ZWQpIHtcbiAgICAgIHNlbGYuZW1pdEVycm9yKCduZXR3b3JrJywgJ0xvc3QgY29ubmVjdGlvbiB0byBzZXJ2ZXIuJyk7XG4gICAgICBzZWxmLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH0pO1xuICB0aGlzLnNvY2tldC5vbignY2xvc2UnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXNlbGYuZGlzY29ubmVjdGVkKSB7XG4gICAgICBzZWxmLl9hYm9ydCgnc29ja2V0LWNsb3NlZCcsICdVbmRlcmx5aW5nIHNvY2tldCBpcyBhbHJlYWR5IGNsb3NlZC4nKTtcbiAgICB9XG4gIH0pO1xufTtcblBlZXIucHJvdG90eXBlLl9yZXRyaWV2ZUlkID0gZnVuY3Rpb24oY2IpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgaHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB2YXIgcHJvdG9jb2wgPSB0aGlzLm9wdGlvbnMuc2VjdXJlID8gJ2h0dHBzOi8vJyA6ICdodHRwOi8vJztcbiAgdmFyIHVybCA9IHByb3RvY29sICsgdGhpcy5vcHRpb25zLmhvc3QgKyAnOicgKyB0aGlzLm9wdGlvbnMucG9ydCArIHRoaXMub3B0aW9ucy5wYXRoICsgdGhpcy5vcHRpb25zLmtleSArICcvaWQnO1xuICB2YXIgcXVlcnlTdHJpbmcgPSAnP3RzPScgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKSArICcnICsgTWF0aC5yYW5kb20oKTtcbiAgdXJsICs9IHF1ZXJ5U3RyaW5nO1xuICBodHRwLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG4gIGh0dHAub25lcnJvciA9IGZ1bmN0aW9uKGUpIHtcbiAgICB1dGlsLmVycm9yKCdFcnJvciByZXRyaWV2aW5nIElEJywgZSk7XG4gICAgdmFyIHBhdGhFcnJvciA9ICcnO1xuICAgIGlmIChzZWxmLm9wdGlvbnMucGF0aCA9PT0gJy8nICYmIHNlbGYub3B0aW9ucy5ob3N0ICE9PSB1dGlsLkNMT1VEX0hPU1QpIHtcbiAgICAgIHBhdGhFcnJvciA9ICcgSWYgeW91IHBhc3NlZCBpbiBhIGBwYXRoYCB0byB5b3VyIHNlbGYtaG9zdGVkIFBlZXJTZXJ2ZXIsICcgKyAneW91XFwnbGwgYWxzbyBuZWVkIHRvIHBhc3MgaW4gdGhhdCBzYW1lIHBhdGggd2hlbiBjcmVhdGluZyBhIG5ldyAnICsgJ1BlZXIuJztcbiAgICB9XG4gICAgc2VsZi5fYWJvcnQoJ3NlcnZlci1lcnJvcicsICdDb3VsZCBub3QgZ2V0IGFuIElEIGZyb20gdGhlIHNlcnZlci4nICsgcGF0aEVycm9yKTtcbiAgfTtcbiAgaHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoaHR0cC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChodHRwLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICBodHRwLm9uZXJyb3IoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2VsZi5faW5pdGlhbGl6ZShodHRwLnJlc3BvbnNlVGV4dCk7XG4gIH07XG4gIGh0dHAuc2VuZChudWxsKTtcbn07XG5QZWVyLnByb3RvdHlwZS5faW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKGlkKSB7XG4gIHRoaXMuaWQgPSBpZDtcbiAgdGhpcy5zb2NrZXQuc3RhcnQodGhpcy5pZCwgdGhpcy5vcHRpb25zLnRva2VuKTtcbn07XG5QZWVyLnByb3RvdHlwZS5faGFuZGxlTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgdmFyIHR5cGUgPSBtZXNzYWdlLnR5cGU7XG4gIHZhciBwYXlsb2FkID0gbWVzc2FnZS5wYXlsb2FkO1xuICB2YXIgcGVlciA9IG1lc3NhZ2Uuc3JjO1xuICB2YXIgY29ubmVjdGlvbjtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnT1BFTic6XG4gICAgICB0aGlzLmVtaXQoJ29wZW4nLCB0aGlzLmlkKTtcbiAgICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdFUlJPUic6XG4gICAgICB0aGlzLl9hYm9ydCgnc2VydmVyLWVycm9yJywgcGF5bG9hZC5tc2cpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnSUQtVEFLRU4nOlxuICAgICAgdGhpcy5fYWJvcnQoJ3VuYXZhaWxhYmxlLWlkJywgJ0lEIGAnICsgdGhpcy5pZCArICdgIGlzIHRha2VuJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdJTlZBTElELUtFWSc6XG4gICAgICB0aGlzLl9hYm9ydCgnaW52YWxpZC1rZXknLCAnQVBJIEtFWSBcIicgKyB0aGlzLm9wdGlvbnMua2V5ICsgJ1wiIGlzIGludmFsaWQnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0xFQVZFJzpcbiAgICAgIHV0aWwubG9nKCdSZWNlaXZlZCBsZWF2ZSBtZXNzYWdlIGZyb20nLCBwZWVyKTtcbiAgICAgIHRoaXMuX2NsZWFudXBQZWVyKHBlZXIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRVhQSVJFJzpcbiAgICAgIHRoaXMuZW1pdEVycm9yKCdwZWVyLXVuYXZhaWxhYmxlJywgJ0NvdWxkIG5vdCBjb25uZWN0IHRvIHBlZXIgJyArIHBlZXIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnT0ZGRVInOlxuICAgICAgdmFyIGNvbm5lY3Rpb25JZCA9IHBheWxvYWQuY29ubmVjdGlvbklkO1xuICAgICAgY29ubmVjdGlvbiA9IHRoaXMuZ2V0Q29ubmVjdGlvbihwZWVyLCBjb25uZWN0aW9uSWQpO1xuICAgICAgaWYgKGNvbm5lY3Rpb24pIHtcbiAgICAgICAgdXRpbC53YXJuKCdPZmZlciByZWNlaXZlZCBmb3IgZXhpc3RpbmcgQ29ubmVjdGlvbiBJRDonLCBjb25uZWN0aW9uSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHBheWxvYWQudHlwZSA9PT0gJ21lZGlhJykge1xuICAgICAgICAgIGNvbm5lY3Rpb24gPSBuZXcgTWVkaWFDb25uZWN0aW9uKHBlZXIsIHRoaXMsIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb25JZDogY29ubmVjdGlvbklkLFxuICAgICAgICAgICAgX3BheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgICAgICBtZXRhZGF0YTogcGF5bG9hZC5tZXRhZGF0YVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX2FkZENvbm5lY3Rpb24ocGVlciwgY29ubmVjdGlvbik7XG4gICAgICAgICAgdGhpcy5lbWl0KCdjYWxsJywgY29ubmVjdGlvbik7XG4gICAgICAgIH0gZWxzZSBpZiAocGF5bG9hZC50eXBlID09PSAnZGF0YScpIHtcbiAgICAgICAgICBjb25uZWN0aW9uID0gbmV3IERhdGFDb25uZWN0aW9uKHBlZXIsIHRoaXMsIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb25JZDogY29ubmVjdGlvbklkLFxuICAgICAgICAgICAgX3BheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgICAgICBtZXRhZGF0YTogcGF5bG9hZC5tZXRhZGF0YSxcbiAgICAgICAgICAgIGxhYmVsOiBwYXlsb2FkLmxhYmVsLFxuICAgICAgICAgICAgc2VyaWFsaXphdGlvbjogcGF5bG9hZC5zZXJpYWxpemF0aW9uLFxuICAgICAgICAgICAgcmVsaWFibGU6IHBheWxvYWQucmVsaWFibGVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLl9hZGRDb25uZWN0aW9uKHBlZXIsIGNvbm5lY3Rpb24pO1xuICAgICAgICAgIHRoaXMuZW1pdCgnY29ubmVjdGlvbicsIGNvbm5lY3Rpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHV0aWwud2FybignUmVjZWl2ZWQgbWFsZm9ybWVkIGNvbm5lY3Rpb24gdHlwZTonLCBwYXlsb2FkLnR5cGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWVzc2FnZXMgPSB0aGlzLl9nZXRNZXNzYWdlcyhjb25uZWN0aW9uSWQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCxcbiAgICAgICAgICAgIGlpID0gbWVzc2FnZXMubGVuZ3RoOyBpIDwgaWk7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbm5lY3Rpb24uaGFuZGxlTWVzc2FnZShtZXNzYWdlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAoIXBheWxvYWQpIHtcbiAgICAgICAgdXRpbC53YXJuKCdZb3UgcmVjZWl2ZWQgYSBtYWxmb3JtZWQgbWVzc2FnZSBmcm9tICcgKyBwZWVyICsgJyBvZiB0eXBlICcgKyB0eXBlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGlkID0gcGF5bG9hZC5jb25uZWN0aW9uSWQ7XG4gICAgICBjb25uZWN0aW9uID0gdGhpcy5nZXRDb25uZWN0aW9uKHBlZXIsIGlkKTtcbiAgICAgIGlmIChjb25uZWN0aW9uICYmIGNvbm5lY3Rpb24ucGMpIHtcbiAgICAgICAgY29ubmVjdGlvbi5oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIGlmIChpZCkge1xuICAgICAgICB0aGlzLl9zdG9yZU1lc3NhZ2UoaWQsIG1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXRpbC53YXJuKCdZb3UgcmVjZWl2ZWQgYW4gdW5yZWNvZ25pemVkIG1lc3NhZ2U6JywgbWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxufTtcblBlZXIucHJvdG90eXBlLl9zdG9yZU1lc3NhZ2UgPSBmdW5jdGlvbihjb25uZWN0aW9uSWQsIG1lc3NhZ2UpIHtcbiAgaWYgKCF0aGlzLl9sb3N0TWVzc2FnZXNbY29ubmVjdGlvbklkXSkge1xuICAgIHRoaXMuX2xvc3RNZXNzYWdlc1tjb25uZWN0aW9uSWRdID0gW107XG4gIH1cbiAgdGhpcy5fbG9zdE1lc3NhZ2VzW2Nvbm5lY3Rpb25JZF0ucHVzaChtZXNzYWdlKTtcbn07XG5QZWVyLnByb3RvdHlwZS5fZ2V0TWVzc2FnZXMgPSBmdW5jdGlvbihjb25uZWN0aW9uSWQpIHtcbiAgdmFyIG1lc3NhZ2VzID0gdGhpcy5fbG9zdE1lc3NhZ2VzW2Nvbm5lY3Rpb25JZF07XG4gIGlmIChtZXNzYWdlcykge1xuICAgIGRlbGV0ZSB0aGlzLl9sb3N0TWVzc2FnZXNbY29ubmVjdGlvbklkXTtcbiAgICByZXR1cm4gbWVzc2FnZXM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG59O1xuUGVlci5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uKHBlZXIsIG9wdGlvbnMpIHtcbiAgaWYgKHRoaXMuZGlzY29ubmVjdGVkKSB7XG4gICAgdXRpbC53YXJuKCdZb3UgY2Fubm90IGNvbm5lY3QgdG8gYSBuZXcgUGVlciBiZWNhdXNlIHlvdSBjYWxsZWQgJyArICcuZGlzY29ubmVjdCgpIG9uIHRoaXMgUGVlciBhbmQgZW5kZWQgeW91ciBjb25uZWN0aW9uIHdpdGggdGhlICcgKyAnc2VydmVyLiBZb3UgY2FuIGNyZWF0ZSBhIG5ldyBQZWVyIHRvIHJlY29ubmVjdCwgb3IgY2FsbCByZWNvbm5lY3QgJyArICdvbiB0aGlzIHBlZXIgaWYgeW91IGJlbGlldmUgaXRzIElEIHRvIHN0aWxsIGJlIGF2YWlsYWJsZS4nKTtcbiAgICB0aGlzLmVtaXRFcnJvcignZGlzY29ubmVjdGVkJywgJ0Nhbm5vdCBjb25uZWN0IHRvIG5ldyBQZWVyIGFmdGVyIGRpc2Nvbm5lY3RpbmcgZnJvbSBzZXJ2ZXIuJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBjb25uZWN0aW9uID0gbmV3IERhdGFDb25uZWN0aW9uKHBlZXIsIHRoaXMsIG9wdGlvbnMpO1xuICB0aGlzLl9hZGRDb25uZWN0aW9uKHBlZXIsIGNvbm5lY3Rpb24pO1xuICByZXR1cm4gY29ubmVjdGlvbjtcbn07XG5QZWVyLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24ocGVlciwgc3RyZWFtLCBvcHRpb25zKSB7XG4gIGlmICh0aGlzLmRpc2Nvbm5lY3RlZCkge1xuICAgIHV0aWwud2FybignWW91IGNhbm5vdCBjb25uZWN0IHRvIGEgbmV3IFBlZXIgYmVjYXVzZSB5b3UgY2FsbGVkICcgKyAnLmRpc2Nvbm5lY3QoKSBvbiB0aGlzIFBlZXIgYW5kIGVuZGVkIHlvdXIgY29ubmVjdGlvbiB3aXRoIHRoZSAnICsgJ3NlcnZlci4gWW91IGNhbiBjcmVhdGUgYSBuZXcgUGVlciB0byByZWNvbm5lY3QuJyk7XG4gICAgdGhpcy5lbWl0RXJyb3IoJ2Rpc2Nvbm5lY3RlZCcsICdDYW5ub3QgY29ubmVjdCB0byBuZXcgUGVlciBhZnRlciBkaXNjb25uZWN0aW5nIGZyb20gc2VydmVyLicpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXN0cmVhbSkge1xuICAgIHV0aWwuZXJyb3IoJ1RvIGNhbGwgYSBwZWVyLCB5b3UgbXVzdCBwcm92aWRlIGEgc3RyZWFtIGZyb20geW91ciBicm93c2VyXFwncyBgZ2V0VXNlck1lZGlhYC4nKTtcbiAgICByZXR1cm47XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMuX3N0cmVhbSA9IHN0cmVhbTtcbiAgdmFyIGNhbGwgPSBuZXcgTWVkaWFDb25uZWN0aW9uKHBlZXIsIHRoaXMsIG9wdGlvbnMpO1xuICB0aGlzLl9hZGRDb25uZWN0aW9uKHBlZXIsIGNhbGwpO1xuICByZXR1cm4gY2FsbDtcbn07XG5QZWVyLnByb3RvdHlwZS5fYWRkQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBlZXIsIGNvbm5lY3Rpb24pIHtcbiAgaWYgKCF0aGlzLmNvbm5lY3Rpb25zW3BlZXJdKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uc1twZWVyXSA9IFtdO1xuICB9XG4gIHRoaXMuY29ubmVjdGlvbnNbcGVlcl0ucHVzaChjb25uZWN0aW9uKTtcbn07XG5QZWVyLnByb3RvdHlwZS5nZXRDb25uZWN0aW9uID0gZnVuY3Rpb24ocGVlciwgaWQpIHtcbiAgdmFyIGNvbm5lY3Rpb25zID0gdGhpcy5jb25uZWN0aW9uc1twZWVyXTtcbiAgaWYgKCFjb25uZWN0aW9ucykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGZvciAodmFyIGkgPSAwLFxuICAgICAgaWkgPSBjb25uZWN0aW9ucy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XG4gICAgaWYgKGNvbm5lY3Rpb25zW2ldLmlkID09PSBpZCkge1xuICAgICAgcmV0dXJuIGNvbm5lY3Rpb25zW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5QZWVyLnByb3RvdHlwZS5fZGVsYXllZEFib3J0ID0gZnVuY3Rpb24odHlwZSwgbWVzc2FnZSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHV0aWwuc2V0WmVyb1RpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgc2VsZi5fYWJvcnQodHlwZSwgbWVzc2FnZSk7XG4gIH0pO1xufTtcblBlZXIucHJvdG90eXBlLl9hYm9ydCA9IGZ1bmN0aW9uKHR5cGUsIG1lc3NhZ2UpIHtcbiAgdXRpbC5lcnJvcignQWJvcnRpbmchJyk7XG4gIGlmICghdGhpcy5fbGFzdFNlcnZlcklkKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gIH1cbiAgdGhpcy5lbWl0RXJyb3IodHlwZSwgbWVzc2FnZSk7XG59O1xuUGVlci5wcm90b3R5cGUuZW1pdEVycm9yID0gZnVuY3Rpb24odHlwZSwgZXJyKSB7XG4gIHV0aWwuZXJyb3IoJ0Vycm9yOicsIGVycik7XG4gIGlmICh0eXBlb2YgZXJyID09PSAnc3RyaW5nJykge1xuICAgIGVyciA9IG5ldyBFcnJvcihlcnIpO1xuICB9XG4gIGVyci50eXBlID0gdHlwZTtcbiAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG59O1xuUGVlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMuZGVzdHJveWVkKSB7XG4gICAgdGhpcy5fY2xlYW51cCgpO1xuICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxufTtcblBlZXIucHJvdG90eXBlLl9jbGVhbnVwID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmNvbm5lY3Rpb25zKSB7XG4gICAgdmFyIHBlZXJzID0gT2JqZWN0LmtleXModGhpcy5jb25uZWN0aW9ucyk7XG4gICAgZm9yICh2YXIgaSA9IDAsXG4gICAgICAgIGlpID0gcGVlcnMubGVuZ3RoOyBpIDwgaWk7IGkrKykge1xuICAgICAgdGhpcy5fY2xlYW51cFBlZXIocGVlcnNbaV0pO1xuICAgIH1cbiAgfVxuICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG59O1xuUGVlci5wcm90b3R5cGUuX2NsZWFudXBQZWVyID0gZnVuY3Rpb24ocGVlcikge1xuICB2YXIgY29ubmVjdGlvbnMgPSB0aGlzLmNvbm5lY3Rpb25zW3BlZXJdO1xuICBmb3IgKHZhciBqID0gMCxcbiAgICAgIGpqID0gY29ubmVjdGlvbnMubGVuZ3RoOyBqIDwgamo7IGogKz0gMSkge1xuICAgIGNvbm5lY3Rpb25zW2pdLmNsb3NlKCk7XG4gIH1cbn07XG5QZWVyLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdXRpbC5zZXRaZXJvVGltZW91dChmdW5jdGlvbigpIHtcbiAgICBpZiAoIXNlbGYuZGlzY29ubmVjdGVkKSB7XG4gICAgICBzZWxmLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gICAgICBzZWxmLm9wZW4gPSBmYWxzZTtcbiAgICAgIGlmIChzZWxmLnNvY2tldCkge1xuICAgICAgICBzZWxmLnNvY2tldC5jbG9zZSgpO1xuICAgICAgfVxuICAgICAgc2VsZi5lbWl0KCdkaXNjb25uZWN0ZWQnLCBzZWxmLmlkKTtcbiAgICAgIHNlbGYuX2xhc3RTZXJ2ZXJJZCA9IHNlbGYuaWQ7XG4gICAgICBzZWxmLmlkID0gbnVsbDtcbiAgICB9XG4gIH0pO1xufTtcblBlZXIucHJvdG90eXBlLnJlY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kaXNjb25uZWN0ZWQgJiYgIXRoaXMuZGVzdHJveWVkKSB7XG4gICAgdXRpbC5sb2coJ0F0dGVtcHRpbmcgcmVjb25uZWN0aW9uIHRvIHNlcnZlciB3aXRoIElEICcgKyB0aGlzLl9sYXN0U2VydmVySWQpO1xuICAgIHRoaXMuZGlzY29ubmVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5faW5pdGlhbGl6ZVNlcnZlckNvbm5lY3Rpb24oKTtcbiAgICB0aGlzLl9pbml0aWFsaXplKHRoaXMuX2xhc3RTZXJ2ZXJJZCk7XG4gIH0gZWxzZSBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgcGVlciBjYW5ub3QgcmVjb25uZWN0IHRvIHRoZSBzZXJ2ZXIuIEl0IGhhcyBhbHJlYWR5IGJlZW4gZGVzdHJveWVkLicpO1xuICB9IGVsc2UgaWYgKCF0aGlzLmRpc2Nvbm5lY3RlZCAmJiAhdGhpcy5vcGVuKSB7XG4gICAgdXRpbC5lcnJvcignSW4gYSBodXJyeT8gV2VcXCdyZSBzdGlsbCB0cnlpbmcgdG8gbWFrZSB0aGUgaW5pdGlhbCBjb25uZWN0aW9uIScpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignUGVlciAnICsgdGhpcy5pZCArICcgY2Fubm90IHJlY29ubmVjdCBiZWNhdXNlIGl0IGlzIG5vdCBkaXNjb25uZWN0ZWQgZnJvbSB0aGUgc2VydmVyIScpO1xuICB9XG59O1xuUGVlci5wcm90b3R5cGUubGlzdEFsbFBlZXJzID0gZnVuY3Rpb24oY2IpIHtcbiAgY2IgPSBjYiB8fCBmdW5jdGlvbigpIHt9O1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHZhciBwcm90b2NvbCA9IHRoaXMub3B0aW9ucy5zZWN1cmUgPyAnaHR0cHM6Ly8nIDogJ2h0dHA6Ly8nO1xuICB2YXIgdXJsID0gcHJvdG9jb2wgKyB0aGlzLm9wdGlvbnMuaG9zdCArICc6JyArIHRoaXMub3B0aW9ucy5wb3J0ICsgdGhpcy5vcHRpb25zLnBhdGggKyB0aGlzLm9wdGlvbnMua2V5ICsgJy9wZWVycyc7XG4gIHZhciBxdWVyeVN0cmluZyA9ICc/dHM9JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgJycgKyBNYXRoLnJhbmRvbSgpO1xuICB1cmwgKz0gcXVlcnlTdHJpbmc7XG4gIGh0dHAub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcbiAgaHR0cC5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xuICAgIHNlbGYuX2Fib3J0KCdzZXJ2ZXItZXJyb3InLCAnQ291bGQgbm90IGdldCBwZWVycyBmcm9tIHRoZSBzZXJ2ZXIuJyk7XG4gICAgY2IoW10pO1xuICB9O1xuICBodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChodHRwLnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGh0dHAuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgIHZhciBoZWxwZnVsRXJyb3IgPSAnJztcbiAgICAgIGlmIChzZWxmLm9wdGlvbnMuaG9zdCAhPT0gdXRpbC5DTE9VRF9IT1NUKSB7XG4gICAgICAgIGhlbHBmdWxFcnJvciA9ICdJdCBsb29rcyBsaWtlIHlvdVxcJ3JlIHVzaW5nIHRoZSBjbG91ZCBzZXJ2ZXIuIFlvdSBjYW4gZW1haWwgJyArICd0ZWFtQHBlZXJqcy5jb20gdG8gZW5hYmxlIHBlZXIgbGlzdGluZyBmb3IgeW91ciBBUEkga2V5Lic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoZWxwZnVsRXJyb3IgPSAnWW91IG5lZWQgdG8gZW5hYmxlIGBhbGxvd19kaXNjb3ZlcnlgIG9uIHlvdXIgc2VsZi1ob3N0ZWQgJyArICdQZWVyU2VydmVyIHRvIHVzZSB0aGlzIGZlYXR1cmUuJztcbiAgICAgIH1cbiAgICAgIGNiKFtdKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSXQgZG9lc25cXCd0IGxvb2sgbGlrZSB5b3UgaGF2ZSBwZXJtaXNzaW9uIHRvIGxpc3QgcGVlcnMgSURzLiAnICsgaGVscGZ1bEVycm9yKTtcbiAgICB9IGVsc2UgaWYgKGh0dHAuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIGNiKFtdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2IoSlNPTi5wYXJzZShodHRwLnJlc3BvbnNlVGV4dCkpO1xuICAgIH1cbiAgfTtcbiAgaHR0cC5zZW5kKG51bGwpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gUGVlcjtcblxuXG59LHtcIi4vZGF0YWNvbm5lY3Rpb25cIjo3LFwiLi9tZWRpYWNvbm5lY3Rpb25cIjo4LFwiLi9zb2NrZXRcIjoxMSxcIi4vdXRpbFwiOjEyLFwiZXZlbnRlbWl0dGVyM1wiOjEzfV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKTtcbmZ1bmN0aW9uIFNvY2tldChzZWN1cmUsIGhvc3QsIHBvcnQsIHBhdGgsIGtleSkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU29ja2V0KSlcbiAgICByZXR1cm4gbmV3IFNvY2tldChzZWN1cmUsIGhvc3QsIHBvcnQsIHBhdGgsIGtleSk7XG4gIEV2ZW50RW1pdHRlci5jYWxsKHRoaXMpO1xuICB0aGlzLmRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xuICB0aGlzLl9xdWV1ZSA9IFtdO1xuICB2YXIgaHR0cFByb3RvY29sID0gc2VjdXJlID8gJ2h0dHBzOi8vJyA6ICdodHRwOi8vJztcbiAgdmFyIHdzUHJvdG9jb2wgPSBzZWN1cmUgPyAnd3NzOi8vJyA6ICd3czovLyc7XG4gIHRoaXMuX2h0dHBVcmwgPSBodHRwUHJvdG9jb2wgKyBob3N0ICsgJzonICsgcG9ydCArIHBhdGggKyBrZXk7XG4gIHRoaXMuX3dzVXJsID0gd3NQcm90b2NvbCArIGhvc3QgKyAnOicgKyBwb3J0ICsgcGF0aCArICdwZWVyanM/a2V5PScgKyBrZXk7XG59XG51dGlsLmluaGVyaXRzKFNvY2tldCwgRXZlbnRFbWl0dGVyKTtcblNvY2tldC5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbihpZCwgdG9rZW4pIHtcbiAgdGhpcy5pZCA9IGlkO1xuICB0aGlzLl9odHRwVXJsICs9ICcvJyArIGlkICsgJy8nICsgdG9rZW47XG4gIHRoaXMuX3dzVXJsICs9ICcmaWQ9JyArIGlkICsgJyZ0b2tlbj0nICsgdG9rZW47XG4gIHRoaXMuX3N0YXJ0WGhyU3RyZWFtKCk7XG4gIHRoaXMuX3N0YXJ0V2ViU29ja2V0KCk7XG59O1xuU29ja2V0LnByb3RvdHlwZS5fc3RhcnRXZWJTb2NrZXQgPSBmdW5jdGlvbihpZCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGlmICh0aGlzLl9zb2NrZXQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5fc29ja2V0ID0gbmV3IFdlYlNvY2tldCh0aGlzLl93c1VybCk7XG4gIHRoaXMuX3NvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdXRpbC5sb2coJ0ludmFsaWQgc2VydmVyIG1lc3NhZ2UnLCBldmVudC5kYXRhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2VsZi5lbWl0KCdtZXNzYWdlJywgZGF0YSk7XG4gIH07XG4gIHRoaXMuX3NvY2tldC5vbmNsb3NlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB1dGlsLmxvZygnU29ja2V0IGNsb3NlZC4nKTtcbiAgICBzZWxmLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gICAgc2VsZi5lbWl0KCdkaXNjb25uZWN0ZWQnKTtcbiAgfTtcbiAgdGhpcy5fc29ja2V0Lm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChzZWxmLl90aW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQoc2VsZi5fdGltZW91dCk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLl9odHRwLmFib3J0KCk7XG4gICAgICAgIHNlbGYuX2h0dHAgPSBudWxsO1xuICAgICAgfSwgNTAwMCk7XG4gICAgfVxuICAgIHNlbGYuX3NlbmRRdWV1ZWRNZXNzYWdlcygpO1xuICAgIHV0aWwubG9nKCdTb2NrZXQgb3BlbicpO1xuICB9O1xufTtcblNvY2tldC5wcm90b3R5cGUuX3N0YXJ0WGhyU3RyZWFtID0gZnVuY3Rpb24obikge1xuICB0cnkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLl9odHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdGhpcy5faHR0cC5faW5kZXggPSAxO1xuICAgIHRoaXMuX2h0dHAuX3N0cmVhbUluZGV4ID0gbiB8fCAwO1xuICAgIHRoaXMuX2h0dHAub3BlbigncG9zdCcsIHRoaXMuX2h0dHBVcmwgKyAnL2lkP2k9JyArIHRoaXMuX2h0dHAuX3N0cmVhbUluZGV4LCB0cnVlKTtcbiAgICB0aGlzLl9odHRwLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNsZWFyVGltZW91dChzZWxmLl90aW1lb3V0KTtcbiAgICAgIHNlbGYuZW1pdCgnZGlzY29ubmVjdGVkJyk7XG4gICAgfTtcbiAgICB0aGlzLl9odHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSAyICYmIHRoaXMub2xkKSB7XG4gICAgICAgIHRoaXMub2xkLmFib3J0KCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLm9sZDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5yZWFkeVN0YXRlID4gMiAmJiB0aGlzLnN0YXR1cyA9PT0gMjAwICYmIHRoaXMucmVzcG9uc2VUZXh0KSB7XG4gICAgICAgIHNlbGYuX2hhbmRsZVN0cmVhbSh0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuX2h0dHAuc2VuZChudWxsKTtcbiAgICB0aGlzLl9zZXRIVFRQVGltZW91dCgpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdXRpbC5sb2coJ1hNTEh0dHBSZXF1ZXN0IG5vdCBhdmFpbGFibGU7IGRlZmF1bHRpbmcgdG8gV2ViU29ja2V0cycpO1xuICB9XG59O1xuU29ja2V0LnByb3RvdHlwZS5faGFuZGxlU3RyZWFtID0gZnVuY3Rpb24oaHR0cCkge1xuICB2YXIgbWVzc2FnZXMgPSBodHRwLnJlc3BvbnNlVGV4dC5zcGxpdCgnXFxuJyk7XG4gIGlmIChodHRwLl9idWZmZXIpIHtcbiAgICB3aGlsZSAoaHR0cC5fYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBpbmRleCA9IGh0dHAuX2J1ZmZlci5zaGlmdCgpO1xuICAgICAgdmFyIGJ1ZmZlcmVkTWVzc2FnZSA9IG1lc3NhZ2VzW2luZGV4XTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGJ1ZmZlcmVkTWVzc2FnZSA9IEpTT04ucGFyc2UoYnVmZmVyZWRNZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaHR0cC5fYnVmZmVyLnNoaWZ0KGluZGV4KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBidWZmZXJlZE1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuICB2YXIgbWVzc2FnZSA9IG1lc3NhZ2VzW2h0dHAuX2luZGV4XTtcbiAgaWYgKG1lc3NhZ2UpIHtcbiAgICBodHRwLl9pbmRleCArPSAxO1xuICAgIGlmIChodHRwLl9pbmRleCA9PT0gbWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICBpZiAoIWh0dHAuX2J1ZmZlcikge1xuICAgICAgICBodHRwLl9idWZmZXIgPSBbXTtcbiAgICAgIH1cbiAgICAgIGh0dHAuX2J1ZmZlci5wdXNoKGh0dHAuX2luZGV4IC0gMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG1lc3NhZ2UgPSBKU09OLnBhcnNlKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB1dGlsLmxvZygnSW52YWxpZCBzZXJ2ZXIgbWVzc2FnZScsIG1lc3NhZ2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBtZXNzYWdlKTtcbiAgICB9XG4gIH1cbn07XG5Tb2NrZXQucHJvdG90eXBlLl9zZXRIVFRQVGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHZhciBvbGQgPSBzZWxmLl9odHRwO1xuICAgIGlmICghc2VsZi5fd3NPcGVuKCkpIHtcbiAgICAgIHNlbGYuX3N0YXJ0WGhyU3RyZWFtKG9sZC5fc3RyZWFtSW5kZXggKyAxKTtcbiAgICAgIHNlbGYuX2h0dHAub2xkID0gb2xkO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbGQuYWJvcnQoKTtcbiAgICB9XG4gIH0sIDI1MDAwKTtcbn07XG5Tb2NrZXQucHJvdG90eXBlLl93c09wZW4gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX3NvY2tldCAmJiB0aGlzLl9zb2NrZXQucmVhZHlTdGF0ZSA9PSAxO1xufTtcblNvY2tldC5wcm90b3R5cGUuX3NlbmRRdWV1ZWRNZXNzYWdlcyA9IGZ1bmN0aW9uKCkge1xuICBmb3IgKHZhciBpID0gMCxcbiAgICAgIGlpID0gdGhpcy5fcXVldWUubGVuZ3RoOyBpIDwgaWk7IGkgKz0gMSkge1xuICAgIHRoaXMuc2VuZCh0aGlzLl9xdWV1ZVtpXSk7XG4gIH1cbn07XG5Tb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKSB7XG4gIGlmICh0aGlzLmRpc2Nvbm5lY3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXRoaXMuaWQpIHtcbiAgICB0aGlzLl9xdWV1ZS5wdXNoKGRhdGEpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIWRhdGEudHlwZSkge1xuICAgIHRoaXMuZW1pdCgnZXJyb3InLCAnSW52YWxpZCBtZXNzYWdlJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gIGlmICh0aGlzLl93c09wZW4oKSkge1xuICAgIHRoaXMuX3NvY2tldC5zZW5kKG1lc3NhZ2UpO1xuICB9IGVsc2Uge1xuICAgIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIHVybCA9IHRoaXMuX2h0dHBVcmwgKyAnLycgKyBkYXRhLnR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICBodHRwLm9wZW4oJ3Bvc3QnLCB1cmwsIHRydWUpO1xuICAgIGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICBodHRwLnNlbmQobWVzc2FnZSk7XG4gIH1cbn07XG5Tb2NrZXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5kaXNjb25uZWN0ZWQgJiYgdGhpcy5fd3NPcGVuKCkpIHtcbiAgICB0aGlzLl9zb2NrZXQuY2xvc2UoKTtcbiAgICB0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNvY2tldDtcblxuXG59LHtcIi4vdXRpbFwiOjEyLFwiZXZlbnRlbWl0dGVyM1wiOjEzfV0sMTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgZGVmYXVsdENvbmZpZyA9IHsnaWNlU2VydmVycyc6IFt7J3VybCc6ICdzdHVuOnN0dW4ubC5nb29nbGUuY29tOjE5MzAyJ31dfTtcbnZhciBkYXRhQ291bnQgPSAxO1xudmFyIEJpbmFyeVBhY2sgPSByZXF1aXJlKCdqcy1iaW5hcnlwYWNrJyk7XG52YXIgUlRDUGVlckNvbm5lY3Rpb24gPSByZXF1aXJlKCcuL2FkYXB0ZXInKS5SVENQZWVyQ29ubmVjdGlvbjtcbnZhciB1dGlsID0ge1xuICBub29wOiBmdW5jdGlvbigpIHt9LFxuICBDTE9VRF9IT1NUOiAnMC5wZWVyanMuY29tJyxcbiAgQ0xPVURfUE9SVDogOTAwMCxcbiAgY2h1bmtlZEJyb3dzZXJzOiB7J0Nocm9tZSc6IDF9LFxuICBjaHVua2VkTVRVOiAxNjMwMCxcbiAgbG9nTGV2ZWw6IDAsXG4gIHNldExvZ0xldmVsOiBmdW5jdGlvbihsZXZlbCkge1xuICAgIHZhciBkZWJ1Z0xldmVsID0gcGFyc2VJbnQobGV2ZWwsIDEwKTtcbiAgICBpZiAoIWlzTmFOKHBhcnNlSW50KGxldmVsLCAxMCkpKSB7XG4gICAgICB1dGlsLmxvZ0xldmVsID0gZGVidWdMZXZlbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXRpbC5sb2dMZXZlbCA9IGxldmVsID8gMyA6IDA7XG4gICAgfVxuICAgIHV0aWwubG9nID0gdXRpbC53YXJuID0gdXRpbC5lcnJvciA9IHV0aWwubm9vcDtcbiAgICBpZiAodXRpbC5sb2dMZXZlbCA+IDApIHtcbiAgICAgIHV0aWwuZXJyb3IgPSB1dGlsLl9wcmludFdpdGgoJ0VSUk9SJyk7XG4gICAgfVxuICAgIGlmICh1dGlsLmxvZ0xldmVsID4gMSkge1xuICAgICAgdXRpbC53YXJuID0gdXRpbC5fcHJpbnRXaXRoKCdXQVJOSU5HJyk7XG4gICAgfVxuICAgIGlmICh1dGlsLmxvZ0xldmVsID4gMikge1xuICAgICAgdXRpbC5sb2cgPSB1dGlsLl9wcmludDtcbiAgICB9XG4gIH0sXG4gIHNldExvZ0Z1bmN0aW9uOiBmdW5jdGlvbihmbikge1xuICAgIGlmIChmbi5jb25zdHJ1Y3RvciAhPT0gRnVuY3Rpb24pIHtcbiAgICAgIHV0aWwud2FybignVGhlIGxvZyBmdW5jdGlvbiB5b3UgcGFzc2VkIGluIGlzIG5vdCBhIGZ1bmN0aW9uLiBEZWZhdWx0aW5nIHRvIHJlZ3VsYXIgbG9ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXRpbC5fcHJpbnQgPSBmbjtcbiAgICB9XG4gIH0sXG4gIF9wcmludFdpdGg6IGZ1bmN0aW9uKHByZWZpeCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjb3B5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIGNvcHkudW5zaGlmdChwcmVmaXgpO1xuICAgICAgdXRpbC5fcHJpbnQuYXBwbHkodXRpbCwgY29weSk7XG4gICAgfTtcbiAgfSxcbiAgX3ByaW50OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZXJyID0gZmFsc2U7XG4gICAgdmFyIGNvcHkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIGNvcHkudW5zaGlmdCgnUGVlckpTOiAnKTtcbiAgICBmb3IgKHZhciBpID0gMCxcbiAgICAgICAgbCA9IGNvcHkubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoY29weVtpXSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGNvcHlbaV0gPSAnKCcgKyBjb3B5W2ldLm5hbWUgKyAnKSAnICsgY29weVtpXS5tZXNzYWdlO1xuICAgICAgICBlcnIgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBlcnIgPyBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGNvcHkpIDogY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgY29weSk7XG4gIH0sXG4gIGRlZmF1bHRDb25maWc6IGRlZmF1bHRDb25maWcsXG4gIGJyb3dzZXI6IChmdW5jdGlvbigpIHtcbiAgICBpZiAod2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICByZXR1cm4gJ0ZpcmVmb3gnO1xuICAgIH0gZWxzZSBpZiAod2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICByZXR1cm4gJ0Nocm9tZSc7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybiAnU3VwcG9ydGVkJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdVbnN1cHBvcnRlZCc7XG4gICAgfVxuICB9KSgpLFxuICBzdXBwb3J0czogKGZ1bmN0aW9uKCkge1xuICAgIGlmICh0eXBlb2YgUlRDUGVlckNvbm5lY3Rpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIHZhciBkYXRhID0gdHJ1ZTtcbiAgICB2YXIgYXVkaW9WaWRlbyA9IHRydWU7XG4gICAgdmFyIGJpbmFyeUJsb2IgPSBmYWxzZTtcbiAgICB2YXIgc2N0cCA9IGZhbHNlO1xuICAgIHZhciBvbm5lZ290aWF0aW9ubmVlZGVkID0gISF3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb247XG4gICAgdmFyIHBjLFxuICAgICAgICBkYztcbiAgICB0cnkge1xuICAgICAgcGMgPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24oZGVmYXVsdENvbmZpZywge29wdGlvbmFsOiBbe1J0cERhdGFDaGFubmVsczogdHJ1ZX1dfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZGF0YSA9IGZhbHNlO1xuICAgICAgYXVkaW9WaWRlbyA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGMgPSBwYy5jcmVhdGVEYXRhQ2hhbm5lbCgnX1BFRVJKU1RFU1QnKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZGF0YSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGMuYmluYXJ5VHlwZSA9ICdibG9iJztcbiAgICAgICAgYmluYXJ5QmxvYiA9IHRydWU7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgdmFyIHJlbGlhYmxlUEMgPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24oZGVmYXVsdENvbmZpZywge30pO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlbGlhYmxlREMgPSByZWxpYWJsZVBDLmNyZWF0ZURhdGFDaGFubmVsKCdfUEVFUkpTUkVMSUFCTEVURVNUJywge30pO1xuICAgICAgICBzY3RwID0gcmVsaWFibGVEQy5yZWxpYWJsZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICByZWxpYWJsZVBDLmNsb3NlKCk7XG4gICAgfVxuICAgIGlmIChhdWRpb1ZpZGVvKSB7XG4gICAgICBhdWRpb1ZpZGVvID0gISFwYy5hZGRTdHJlYW07XG4gICAgfVxuICAgIGlmICghb25uZWdvdGlhdGlvbm5lZWRlZCAmJiBkYXRhKSB7XG4gICAgICB2YXIgbmVnb3RpYXRpb25QQyA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihkZWZhdWx0Q29uZmlnLCB7b3B0aW9uYWw6IFt7UnRwRGF0YUNoYW5uZWxzOiB0cnVlfV19KTtcbiAgICAgIG5lZ290aWF0aW9uUEMub25uZWdvdGlhdGlvbm5lZWRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBvbm5lZ290aWF0aW9ubmVlZGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHV0aWwgJiYgdXRpbC5zdXBwb3J0cykge1xuICAgICAgICAgIHV0aWwuc3VwcG9ydHMub25uZWdvdGlhdGlvbm5lZWRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBuZWdvdGlhdGlvblBDLmNyZWF0ZURhdGFDaGFubmVsKCdfUEVFUkpTTkVHT1RJQVRJT05URVNUJyk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBuZWdvdGlhdGlvblBDLmNsb3NlKCk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9XG4gICAgaWYgKHBjKSB7XG4gICAgICBwYy5jbG9zZSgpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgYXVkaW9WaWRlbzogYXVkaW9WaWRlbyxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBiaW5hcnlCbG9iOiBiaW5hcnlCbG9iLFxuICAgICAgYmluYXJ5OiBzY3RwLFxuICAgICAgcmVsaWFibGU6IHNjdHAsXG4gICAgICBzY3RwOiBzY3RwLFxuICAgICAgb25uZWdvdGlhdGlvbm5lZWRlZDogb25uZWdvdGlhdGlvbm5lZWRlZFxuICAgIH07XG4gIH0oKSksXG4gIHZhbGlkYXRlSWQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgcmV0dXJuICFpZCB8fCAvXltBLVphLXowLTldKyg/OlsgXy1dW0EtWmEtejAtOV0rKSokLy5leGVjKGlkKTtcbiAgfSxcbiAgdmFsaWRhdGVLZXk6IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiAha2V5IHx8IC9eW0EtWmEtejAtOV0rKD86WyBfLV1bQS1aYS16MC05XSspKiQvLmV4ZWMoa2V5KTtcbiAgfSxcbiAgZGVidWc6IGZhbHNlLFxuICBpbmhlcml0czogZnVuY3Rpb24oY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3I7XG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH19KTtcbiAgfSxcbiAgZXh0ZW5kOiBmdW5jdGlvbihkZXN0LCBzb3VyY2UpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgZGVzdFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZXN0O1xuICB9LFxuICBwYWNrOiBCaW5hcnlQYWNrLnBhY2ssXG4gIHVucGFjazogQmluYXJ5UGFjay51bnBhY2ssXG4gIGxvZzogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHV0aWwuZGVidWcpIHtcbiAgICAgIHZhciBlcnIgPSBmYWxzZTtcbiAgICAgIHZhciBjb3B5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIGNvcHkudW5zaGlmdCgnUGVlckpTOiAnKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLFxuICAgICAgICAgIGwgPSBjb3B5Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoY29weVtpXSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgY29weVtpXSA9ICcoJyArIGNvcHlbaV0ubmFtZSArICcpICcgKyBjb3B5W2ldLm1lc3NhZ2U7XG4gICAgICAgICAgZXJyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZXJyID8gY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBjb3B5KSA6IGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGNvcHkpO1xuICAgIH1cbiAgfSxcbiAgc2V0WmVyb1RpbWVvdXQ6IChmdW5jdGlvbihnbG9iYWwpIHtcbiAgICB2YXIgdGltZW91dHMgPSBbXTtcbiAgICB2YXIgbWVzc2FnZU5hbWUgPSAnemVyby10aW1lb3V0LW1lc3NhZ2UnO1xuICAgIGZ1bmN0aW9uIHNldFplcm9UaW1lb3V0UG9zdE1lc3NhZ2UoZm4pIHtcbiAgICAgIHRpbWVvdXRzLnB1c2goZm4pO1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VOYW1lLCAnKicpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuc291cmNlID09IGdsb2JhbCAmJiBldmVudC5kYXRhID09IG1lc3NhZ2VOYW1lKSB7XG4gICAgICAgIGlmIChldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZW91dHMubGVuZ3RoKSB7XG4gICAgICAgICAgdGltZW91dHMuc2hpZnQoKSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5hdHRhY2hFdmVudCkge1xuICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KCdvbm1lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIHNldFplcm9UaW1lb3V0UG9zdE1lc3NhZ2U7XG4gIH0od2luZG93KSksXG4gIGNodW5rOiBmdW5jdGlvbihibCkge1xuICAgIHZhciBjaHVua3MgPSBbXTtcbiAgICB2YXIgc2l6ZSA9IGJsLnNpemU7XG4gICAgdmFyIHN0YXJ0ID0gaW5kZXggPSAwO1xuICAgIHZhciB0b3RhbCA9IE1hdGguY2VpbChzaXplIC8gdXRpbC5jaHVua2VkTVRVKTtcbiAgICB3aGlsZSAoc3RhcnQgPCBzaXplKSB7XG4gICAgICB2YXIgZW5kID0gTWF0aC5taW4oc2l6ZSwgc3RhcnQgKyB1dGlsLmNodW5rZWRNVFUpO1xuICAgICAgdmFyIGIgPSBibC5zbGljZShzdGFydCwgZW5kKTtcbiAgICAgIHZhciBjaHVuayA9IHtcbiAgICAgICAgX19wZWVyRGF0YTogZGF0YUNvdW50LFxuICAgICAgICBuOiBpbmRleCxcbiAgICAgICAgZGF0YTogYixcbiAgICAgICAgdG90YWw6IHRvdGFsXG4gICAgICB9O1xuICAgICAgY2h1bmtzLnB1c2goY2h1bmspO1xuICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgICBpbmRleCArPSAxO1xuICAgIH1cbiAgICBkYXRhQ291bnQgKz0gMTtcbiAgICByZXR1cm4gY2h1bmtzO1xuICB9LFxuICBibG9iVG9BcnJheUJ1ZmZlcjogZnVuY3Rpb24oYmxvYiwgY2IpIHtcbiAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgY2IoZXZ0LnRhcmdldC5yZXN1bHQpO1xuICAgIH07XG4gICAgZnIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYik7XG4gIH0sXG4gIGJsb2JUb0JpbmFyeVN0cmluZzogZnVuY3Rpb24oYmxvYiwgY2IpIHtcbiAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgY2IoZXZ0LnRhcmdldC5yZXN1bHQpO1xuICAgIH07XG4gICAgZnIucmVhZEFzQmluYXJ5U3RyaW5nKGJsb2IpO1xuICB9LFxuICBiaW5hcnlTdHJpbmdUb0FycmF5QnVmZmVyOiBmdW5jdGlvbihiaW5hcnkpIHtcbiAgICB2YXIgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYmluYXJ5Lmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiaW5hcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ5dGVBcnJheVtpXSA9IGJpbmFyeS5jaGFyQ29kZUF0KGkpICYgMHhmZjtcbiAgICB9XG4gICAgcmV0dXJuIGJ5dGVBcnJheS5idWZmZXI7XG4gIH0sXG4gIHJhbmRvbVRva2VuOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIpO1xuICB9LFxuICBpc1NlY3VyZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6JztcbiAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gdXRpbDtcblxuXG59LHtcIi4vYWRhcHRlclwiOjYsXCJqcy1iaW5hcnlwYWNrXCI6MTR9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgYSBzaW5nbGUgRXZlbnRFbWl0dGVyIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEV2ZW50IGhhbmRsZXIgdG8gYmUgY2FsbGVkLlxuICogQHBhcmFtIHtNaXhlZH0gY29udGV4dCBDb250ZXh0IGZvciBmdW5jdGlvbiBleGVjdXRpb24uXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSBlbWl0IG9uY2VcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFRShmbiwgY29udGV4dCwgb25jZSkge1xuICB0aGlzLmZuID0gZm47XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMub25jZSA9IG9uY2UgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogTWluaW1hbCBFdmVudEVtaXR0ZXIgaW50ZXJmYWNlIHRoYXQgaXMgbW9sZGVkIGFnYWluc3QgdGhlIE5vZGUuanNcbiAqIEV2ZW50RW1pdHRlciBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7IC8qIE5vdGhpbmcgdG8gc2V0ICovIH1cblxuLyoqXG4gKiBIb2xkcyB0aGUgYXNzaWduZWQgRXZlbnRFbWl0dGVycyBieSBuYW1lLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5cbi8qKlxuICogUmV0dXJuIGEgbGlzdCBvZiBhc3NpZ25lZCBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBldmVudHMgdGhhdCBzaG91bGQgYmUgbGlzdGVkLlxuICogQHJldHVybnMge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnMoZXZlbnQpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1tldmVudF0pIHJldHVybiBbXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuX2V2ZW50c1tldmVudF0ubGVuZ3RoLCBlZSA9IFtdOyBpIDwgbDsgaSsrKSB7XG4gICAgZWUucHVzaCh0aGlzLl9ldmVudHNbZXZlbnRdW2ldLmZuKTtcbiAgfVxuXG4gIHJldHVybiBlZTtcbn07XG5cbi8qKlxuICogRW1pdCBhbiBldmVudCB0byBhbGwgcmVnaXN0ZXJlZCBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBJbmRpY2F0aW9uIGlmIHdlJ3ZlIGVtaXR0ZWQgYW4gZXZlbnQuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2ZW50LCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1tldmVudF0pIHJldHVybiBmYWxzZTtcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2ZW50XVxuICAgICwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICwgbGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgZWUgPSBsaXN0ZW5lcnNbMF1cbiAgICAsIGFyZ3NcbiAgICAsIGksIGo7XG5cbiAgaWYgKDEgPT09IGxlbmd0aCkge1xuICAgIGlmIChlZS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBlZS5mbiwgdHJ1ZSk7XG5cbiAgICBzd2l0Y2ggKGxlbikge1xuICAgICAgY2FzZSAxOiByZXR1cm4gZWUuZm4uY2FsbChlZS5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGVlLmZuLmNhbGwoZWUuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gZWUuZm4uY2FsbChlZS5jb250ZXh0LCBhMSwgYTIpLCB0cnVlO1xuICAgICAgY2FzZSA0OiByZXR1cm4gZWUuZm4uY2FsbChlZS5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGVlLmZuLmNhbGwoZWUuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gZWUuZm4uY2FsbChlZS5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCwgYTUpLCB0cnVlO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBlZS5mbi5hcHBseShlZS5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChsaXN0ZW5lcnNbaV0ub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzW2ldLmZuLCB0cnVlKTtcblxuICAgICAgc3dpdGNoIChsZW4pIHtcbiAgICAgICAgY2FzZSAxOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCk7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSk7IGJyZWFrO1xuICAgICAgICBjYXNlIDM6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBSZWdpc3RlciBhIG5ldyBFdmVudExpc3RlbmVyIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdG9ufSBmbiBDYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7TWl4ZWR9IGNvbnRleHQgVGhlIGNvbnRleHQgb2YgdGhlIGZ1bmN0aW9uLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICBpZiAoIXRoaXMuX2V2ZW50cykgdGhpcy5fZXZlbnRzID0ge307XG4gIGlmICghdGhpcy5fZXZlbnRzW2V2ZW50XSkgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IFtdO1xuICB0aGlzLl9ldmVudHNbZXZlbnRdLnB1c2gobmV3IEVFKCBmbiwgY29udGV4dCB8fCB0aGlzICkpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGQgYW4gRXZlbnRMaXN0ZW5lciB0aGF0J3Mgb25seSBjYWxsZWQgb25jZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgTmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBDYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7TWl4ZWR9IGNvbnRleHQgVGhlIGNvbnRleHQgb2YgdGhlIGZ1bmN0aW9uLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZShldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMpIHRoaXMuX2V2ZW50cyA9IHt9O1xuICBpZiAoIXRoaXMuX2V2ZW50c1tldmVudF0pIHRoaXMuX2V2ZW50c1tldmVudF0gPSBbXTtcbiAgdGhpcy5fZXZlbnRzW2V2ZW50XS5wdXNoKG5ldyBFRShmbiwgY29udGV4dCB8fCB0aGlzLCB0cnVlICkpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgZXZlbnQgd2Ugd2FudCB0byByZW1vdmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgdGhhdCB3ZSBuZWVkIHRvIGZpbmQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25jZSBsaXN0ZW5lcnMuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBvbmNlKSB7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbZXZlbnRdKSByZXR1cm4gdGhpcztcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2ZW50XVxuICAgICwgZXZlbnRzID0gW107XG5cbiAgaWYgKGZuKSBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gJiYgbGlzdGVuZXJzW2ldLm9uY2UgIT09IG9uY2UpIHtcbiAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVyc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAvL1xuICBpZiAoZXZlbnRzLmxlbmd0aCkgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IGV2ZW50cztcbiAgZWxzZSB0aGlzLl9ldmVudHNbZXZlbnRdID0gbnVsbDtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgb3Igb25seSB0aGUgbGlzdGVuZXJzIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgZXZlbnQgd2FudCB0byByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyhldmVudCkge1xuICBpZiAoIXRoaXMuX2V2ZW50cykgcmV0dXJuIHRoaXM7XG5cbiAgaWYgKGV2ZW50KSB0aGlzLl9ldmVudHNbZXZlbnRdID0gbnVsbDtcbiAgZWxzZSB0aGlzLl9ldmVudHMgPSB7fTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gVGhpcyBmdW5jdGlvbiBkb2Vzbid0IGFwcGx5IGFueW1vcmUuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEV4cG9zZSB0aGUgbW9kdWxlLlxuLy9cbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyMiA9IEV2ZW50RW1pdHRlcjtcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIzID0gRXZlbnRFbWl0dGVyO1xuXG5pZiAoJ29iamVjdCcgPT09IHR5cGVvZiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG59XG5cbn0se31dLDE0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBCdWZmZXJCdWlsZGVyID0gcmVxdWlyZSgnLi9idWZmZXJidWlsZGVyJykuQnVmZmVyQnVpbGRlcjtcclxudmFyIGJpbmFyeUZlYXR1cmVzID0gcmVxdWlyZSgnLi9idWZmZXJidWlsZGVyJykuYmluYXJ5RmVhdHVyZXM7XHJcblxyXG52YXIgQmluYXJ5UGFjayA9IHtcclxuICB1bnBhY2s6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgdmFyIHVucGFja2VyID0gbmV3IFVucGFja2VyKGRhdGEpO1xyXG4gICAgcmV0dXJuIHVucGFja2VyLnVucGFjaygpO1xyXG4gIH0sXHJcbiAgcGFjazogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICB2YXIgcGFja2VyID0gbmV3IFBhY2tlcigpO1xyXG4gICAgcGFja2VyLnBhY2soZGF0YSk7XHJcbiAgICB2YXIgYnVmZmVyID0gcGFja2VyLmdldEJ1ZmZlcigpO1xyXG4gICAgcmV0dXJuIGJ1ZmZlcjtcclxuICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJpbmFyeVBhY2s7XHJcblxyXG5mdW5jdGlvbiBVbnBhY2tlciAoZGF0YSl7XHJcbiAgLy8gRGF0YSBpcyBBcnJheUJ1ZmZlclxyXG4gIHRoaXMuaW5kZXggPSAwO1xyXG4gIHRoaXMuZGF0YUJ1ZmZlciA9IGRhdGE7XHJcbiAgdGhpcy5kYXRhVmlldyA9IG5ldyBVaW50OEFycmF5KHRoaXMuZGF0YUJ1ZmZlcik7XHJcbiAgdGhpcy5sZW5ndGggPSB0aGlzLmRhdGFCdWZmZXIuYnl0ZUxlbmd0aDtcclxufVxyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHR5cGUgPSB0aGlzLnVucGFja191aW50OCgpO1xyXG4gIGlmICh0eXBlIDwgMHg4MCl7XHJcbiAgICB2YXIgcG9zaXRpdmVfZml4bnVtID0gdHlwZTtcclxuICAgIHJldHVybiBwb3NpdGl2ZV9maXhudW07XHJcbiAgfSBlbHNlIGlmICgodHlwZSBeIDB4ZTApIDwgMHgyMCl7XHJcbiAgICB2YXIgbmVnYXRpdmVfZml4bnVtID0gKHR5cGUgXiAweGUwKSAtIDB4MjA7XHJcbiAgICByZXR1cm4gbmVnYXRpdmVfZml4bnVtO1xyXG4gIH1cclxuICB2YXIgc2l6ZTtcclxuICBpZiAoKHNpemUgPSB0eXBlIF4gMHhhMCkgPD0gMHgwZil7XHJcbiAgICByZXR1cm4gdGhpcy51bnBhY2tfcmF3KHNpemUpO1xyXG4gIH0gZWxzZSBpZiAoKHNpemUgPSB0eXBlIF4gMHhiMCkgPD0gMHgwZil7XHJcbiAgICByZXR1cm4gdGhpcy51bnBhY2tfc3RyaW5nKHNpemUpO1xyXG4gIH0gZWxzZSBpZiAoKHNpemUgPSB0eXBlIF4gMHg5MCkgPD0gMHgwZil7XHJcbiAgICByZXR1cm4gdGhpcy51bnBhY2tfYXJyYXkoc2l6ZSk7XHJcbiAgfSBlbHNlIGlmICgoc2l6ZSA9IHR5cGUgXiAweDgwKSA8PSAweDBmKXtcclxuICAgIHJldHVybiB0aGlzLnVucGFja19tYXAoc2l6ZSk7XHJcbiAgfVxyXG4gIHN3aXRjaCh0eXBlKXtcclxuICAgIGNhc2UgMHhjMDpcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICBjYXNlIDB4YzE6XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICBjYXNlIDB4YzI6XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIGNhc2UgMHhjMzpcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBjYXNlIDB4Y2E6XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19mbG9hdCgpO1xyXG4gICAgY2FzZSAweGNiOlxyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfZG91YmxlKCk7XHJcbiAgICBjYXNlIDB4Y2M6XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja191aW50OCgpO1xyXG4gICAgY2FzZSAweGNkOlxyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfdWludDE2KCk7XHJcbiAgICBjYXNlIDB4Y2U6XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja191aW50MzIoKTtcclxuICAgIGNhc2UgMHhjZjpcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX3VpbnQ2NCgpO1xyXG4gICAgY2FzZSAweGQwOlxyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfaW50OCgpO1xyXG4gICAgY2FzZSAweGQxOlxyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfaW50MTYoKTtcclxuICAgIGNhc2UgMHhkMjpcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX2ludDMyKCk7XHJcbiAgICBjYXNlIDB4ZDM6XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19pbnQ2NCgpO1xyXG4gICAgY2FzZSAweGQ0OlxyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgY2FzZSAweGQ1OlxyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgY2FzZSAweGQ2OlxyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgY2FzZSAweGQ3OlxyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgY2FzZSAweGQ4OlxyXG4gICAgICBzaXplID0gdGhpcy51bnBhY2tfdWludDE2KCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19zdHJpbmcoc2l6ZSk7XHJcbiAgICBjYXNlIDB4ZDk6XHJcbiAgICAgIHNpemUgPSB0aGlzLnVucGFja191aW50MzIoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX3N0cmluZyhzaXplKTtcclxuICAgIGNhc2UgMHhkYTpcclxuICAgICAgc2l6ZSA9IHRoaXMudW5wYWNrX3VpbnQxNigpO1xyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfcmF3KHNpemUpO1xyXG4gICAgY2FzZSAweGRiOlxyXG4gICAgICBzaXplID0gdGhpcy51bnBhY2tfdWludDMyKCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19yYXcoc2l6ZSk7XHJcbiAgICBjYXNlIDB4ZGM6XHJcbiAgICAgIHNpemUgPSB0aGlzLnVucGFja191aW50MTYoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX2FycmF5KHNpemUpO1xyXG4gICAgY2FzZSAweGRkOlxyXG4gICAgICBzaXplID0gdGhpcy51bnBhY2tfdWludDMyKCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19hcnJheShzaXplKTtcclxuICAgIGNhc2UgMHhkZTpcclxuICAgICAgc2l6ZSA9IHRoaXMudW5wYWNrX3VpbnQxNigpO1xyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfbWFwKHNpemUpO1xyXG4gICAgY2FzZSAweGRmOlxyXG4gICAgICBzaXplID0gdGhpcy51bnBhY2tfdWludDMyKCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19tYXAoc2l6ZSk7XHJcbiAgfVxyXG59XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX3VpbnQ4ID0gZnVuY3Rpb24oKXtcclxuICB2YXIgYnl0ZSA9IHRoaXMuZGF0YVZpZXdbdGhpcy5pbmRleF0gJiAweGZmO1xyXG4gIHRoaXMuaW5kZXgrKztcclxuICByZXR1cm4gYnl0ZTtcclxufTtcclxuXHJcblVucGFja2VyLnByb3RvdHlwZS51bnBhY2tfdWludDE2ID0gZnVuY3Rpb24oKXtcclxuICB2YXIgYnl0ZXMgPSB0aGlzLnJlYWQoMik7XHJcbiAgdmFyIHVpbnQxNiA9XHJcbiAgICAoKGJ5dGVzWzBdICYgMHhmZikgKiAyNTYpICsgKGJ5dGVzWzFdICYgMHhmZik7XHJcbiAgdGhpcy5pbmRleCArPSAyO1xyXG4gIHJldHVybiB1aW50MTY7XHJcbn1cclxuXHJcblVucGFja2VyLnByb3RvdHlwZS51bnBhY2tfdWludDMyID0gZnVuY3Rpb24oKXtcclxuICB2YXIgYnl0ZXMgPSB0aGlzLnJlYWQoNCk7XHJcbiAgdmFyIHVpbnQzMiA9XHJcbiAgICAgKChieXRlc1swXSAgKiAyNTYgK1xyXG4gICAgICAgYnl0ZXNbMV0pICogMjU2ICtcclxuICAgICAgIGJ5dGVzWzJdKSAqIDI1NiArXHJcbiAgICAgICBieXRlc1szXTtcclxuICB0aGlzLmluZGV4ICs9IDQ7XHJcbiAgcmV0dXJuIHVpbnQzMjtcclxufVxyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja191aW50NjQgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBieXRlcyA9IHRoaXMucmVhZCg4KTtcclxuICB2YXIgdWludDY0ID1cclxuICAgKCgoKCgoYnl0ZXNbMF0gICogMjU2ICtcclxuICAgICAgIGJ5dGVzWzFdKSAqIDI1NiArXHJcbiAgICAgICBieXRlc1syXSkgKiAyNTYgK1xyXG4gICAgICAgYnl0ZXNbM10pICogMjU2ICtcclxuICAgICAgIGJ5dGVzWzRdKSAqIDI1NiArXHJcbiAgICAgICBieXRlc1s1XSkgKiAyNTYgK1xyXG4gICAgICAgYnl0ZXNbNl0pICogMjU2ICtcclxuICAgICAgIGJ5dGVzWzddO1xyXG4gIHRoaXMuaW5kZXggKz0gODtcclxuICByZXR1cm4gdWludDY0O1xyXG59XHJcblxyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja19pbnQ4ID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdWludDggPSB0aGlzLnVucGFja191aW50OCgpO1xyXG4gIHJldHVybiAodWludDggPCAweDgwICkgPyB1aW50OCA6IHVpbnQ4IC0gKDEgPDwgOCk7XHJcbn07XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX2ludDE2ID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdWludDE2ID0gdGhpcy51bnBhY2tfdWludDE2KCk7XHJcbiAgcmV0dXJuICh1aW50MTYgPCAweDgwMDAgKSA/IHVpbnQxNiA6IHVpbnQxNiAtICgxIDw8IDE2KTtcclxufVxyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja19pbnQzMiA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHVpbnQzMiA9IHRoaXMudW5wYWNrX3VpbnQzMigpO1xyXG4gIHJldHVybiAodWludDMyIDwgTWF0aC5wb3coMiwgMzEpICkgPyB1aW50MzIgOlxyXG4gICAgdWludDMyIC0gTWF0aC5wb3coMiwgMzIpO1xyXG59XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX2ludDY0ID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdWludDY0ID0gdGhpcy51bnBhY2tfdWludDY0KCk7XHJcbiAgcmV0dXJuICh1aW50NjQgPCBNYXRoLnBvdygyLCA2MykgKSA/IHVpbnQ2NCA6XHJcbiAgICB1aW50NjQgLSBNYXRoLnBvdygyLCA2NCk7XHJcbn1cclxuXHJcblVucGFja2VyLnByb3RvdHlwZS51bnBhY2tfcmF3ID0gZnVuY3Rpb24oc2l6ZSl7XHJcbiAgaWYgKCB0aGlzLmxlbmd0aCA8IHRoaXMuaW5kZXggKyBzaXplKXtcclxuICAgIHRocm93IG5ldyBFcnJvcignQmluYXJ5UGFja0ZhaWx1cmU6IGluZGV4IGlzIG91dCBvZiByYW5nZSdcclxuICAgICAgKyAnICcgKyB0aGlzLmluZGV4ICsgJyAnICsgc2l6ZSArICcgJyArIHRoaXMubGVuZ3RoKTtcclxuICB9XHJcbiAgdmFyIGJ1ZiA9IHRoaXMuZGF0YUJ1ZmZlci5zbGljZSh0aGlzLmluZGV4LCB0aGlzLmluZGV4ICsgc2l6ZSk7XHJcbiAgdGhpcy5pbmRleCArPSBzaXplO1xyXG5cclxuICAgIC8vYnVmID0gdXRpbC5idWZmZXJUb1N0cmluZyhidWYpO1xyXG5cclxuICByZXR1cm4gYnVmO1xyXG59XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX3N0cmluZyA9IGZ1bmN0aW9uKHNpemUpe1xyXG4gIHZhciBieXRlcyA9IHRoaXMucmVhZChzaXplKTtcclxuICB2YXIgaSA9IDAsIHN0ciA9ICcnLCBjLCBjb2RlO1xyXG4gIHdoaWxlKGkgPCBzaXplKXtcclxuICAgIGMgPSBieXRlc1tpXTtcclxuICAgIGlmICggYyA8IDEyOCl7XHJcbiAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xyXG4gICAgICBpKys7XHJcbiAgICB9IGVsc2UgaWYgKChjIF4gMHhjMCkgPCAzMil7XHJcbiAgICAgIGNvZGUgPSAoKGMgXiAweGMwKSA8PCA2KSB8IChieXRlc1tpKzFdICYgNjMpO1xyXG4gICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcclxuICAgICAgaSArPSAyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29kZSA9ICgoYyAmIDE1KSA8PCAxMikgfCAoKGJ5dGVzW2krMV0gJiA2MykgPDwgNikgfFxyXG4gICAgICAgIChieXRlc1tpKzJdICYgNjMpO1xyXG4gICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcclxuICAgICAgaSArPSAzO1xyXG4gICAgfVxyXG4gIH1cclxuICB0aGlzLmluZGV4ICs9IHNpemU7XHJcbiAgcmV0dXJuIHN0cjtcclxufVxyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja19hcnJheSA9IGZ1bmN0aW9uKHNpemUpe1xyXG4gIHZhciBvYmplY3RzID0gbmV3IEFycmF5KHNpemUpO1xyXG4gIGZvcih2YXIgaSA9IDA7IGkgPCBzaXplIDsgaSsrKXtcclxuICAgIG9iamVjdHNbaV0gPSB0aGlzLnVucGFjaygpO1xyXG4gIH1cclxuICByZXR1cm4gb2JqZWN0cztcclxufVxyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja19tYXAgPSBmdW5jdGlvbihzaXplKXtcclxuICB2YXIgbWFwID0ge307XHJcbiAgZm9yKHZhciBpID0gMDsgaSA8IHNpemUgOyBpKyspe1xyXG4gICAgdmFyIGtleSAgPSB0aGlzLnVucGFjaygpO1xyXG4gICAgdmFyIHZhbHVlID0gdGhpcy51bnBhY2soKTtcclxuICAgIG1hcFtrZXldID0gdmFsdWU7XHJcbiAgfVxyXG4gIHJldHVybiBtYXA7XHJcbn1cclxuXHJcblVucGFja2VyLnByb3RvdHlwZS51bnBhY2tfZmxvYXQgPSBmdW5jdGlvbigpe1xyXG4gIHZhciB1aW50MzIgPSB0aGlzLnVucGFja191aW50MzIoKTtcclxuICB2YXIgc2lnbiA9IHVpbnQzMiA+PiAzMTtcclxuICB2YXIgZXhwICA9ICgodWludDMyID4+IDIzKSAmIDB4ZmYpIC0gMTI3O1xyXG4gIHZhciBmcmFjdGlvbiA9ICggdWludDMyICYgMHg3ZmZmZmYgKSB8IDB4ODAwMDAwO1xyXG4gIHJldHVybiAoc2lnbiA9PSAwID8gMSA6IC0xKSAqXHJcbiAgICBmcmFjdGlvbiAqIE1hdGgucG93KDIsIGV4cCAtIDIzKTtcclxufVxyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja19kb3VibGUgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBoMzIgPSB0aGlzLnVucGFja191aW50MzIoKTtcclxuICB2YXIgbDMyID0gdGhpcy51bnBhY2tfdWludDMyKCk7XHJcbiAgdmFyIHNpZ24gPSBoMzIgPj4gMzE7XHJcbiAgdmFyIGV4cCAgPSAoKGgzMiA+PiAyMCkgJiAweDdmZikgLSAxMDIzO1xyXG4gIHZhciBoZnJhYyA9ICggaDMyICYgMHhmZmZmZiApIHwgMHgxMDAwMDA7XHJcbiAgdmFyIGZyYWMgPSBoZnJhYyAqIE1hdGgucG93KDIsIGV4cCAtIDIwKSArXHJcbiAgICBsMzIgICAqIE1hdGgucG93KDIsIGV4cCAtIDUyKTtcclxuICByZXR1cm4gKHNpZ24gPT0gMCA/IDEgOiAtMSkgKiBmcmFjO1xyXG59XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uKGxlbmd0aCl7XHJcbiAgdmFyIGogPSB0aGlzLmluZGV4O1xyXG4gIGlmIChqICsgbGVuZ3RoIDw9IHRoaXMubGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhVmlldy5zdWJhcnJheShqLCBqICsgbGVuZ3RoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdCaW5hcnlQYWNrRmFpbHVyZTogcmVhZCBpbmRleCBvdXQgb2YgcmFuZ2UnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFBhY2tlcigpe1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlciA9IG5ldyBCdWZmZXJCdWlsZGVyKCk7XHJcbn1cclxuXHJcblBhY2tlci5wcm90b3R5cGUuZ2V0QnVmZmVyID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5idWZmZXJCdWlsZGVyLmdldEJ1ZmZlcigpO1xyXG59XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2sgPSBmdW5jdGlvbih2YWx1ZSl7XHJcbiAgdmFyIHR5cGUgPSB0eXBlb2YodmFsdWUpO1xyXG4gIGlmICh0eXBlID09ICdzdHJpbmcnKXtcclxuICAgIHRoaXMucGFja19zdHJpbmcodmFsdWUpO1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PSAnbnVtYmVyJyl7XHJcbiAgICBpZiAoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlKXtcclxuICAgICAgdGhpcy5wYWNrX2ludGVnZXIodmFsdWUpO1xyXG4gICAgfSBlbHNle1xyXG4gICAgICB0aGlzLnBhY2tfZG91YmxlKHZhbHVlKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGUgPT0gJ2Jvb2xlYW4nKXtcclxuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSl7XHJcbiAgICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhjMyk7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBmYWxzZSl7XHJcbiAgICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhjMik7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICh0eXBlID09ICd1bmRlZmluZWQnKXtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhjMCk7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09ICdvYmplY3QnKXtcclxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCl7XHJcbiAgICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhjMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgY29uc3RydWN0b3IgPSB2YWx1ZS5jb25zdHJ1Y3RvcjtcclxuICAgICAgaWYgKGNvbnN0cnVjdG9yID09IEFycmF5KXtcclxuICAgICAgICB0aGlzLnBhY2tfYXJyYXkodmFsdWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKGNvbnN0cnVjdG9yID09IEJsb2IgfHwgY29uc3RydWN0b3IgPT0gRmlsZSkge1xyXG4gICAgICAgIHRoaXMucGFja19iaW4odmFsdWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKGNvbnN0cnVjdG9yID09IEFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgaWYoYmluYXJ5RmVhdHVyZXMudXNlQXJyYXlCdWZmZXJWaWV3KSB7XHJcbiAgICAgICAgICB0aGlzLnBhY2tfYmluKG5ldyBVaW50OEFycmF5KHZhbHVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucGFja19iaW4odmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICgnQllURVNfUEVSX0VMRU1FTlQnIGluIHZhbHVlKXtcclxuICAgICAgICBpZihiaW5hcnlGZWF0dXJlcy51c2VBcnJheUJ1ZmZlclZpZXcpIHtcclxuICAgICAgICAgIHRoaXMucGFja19iaW4obmV3IFVpbnQ4QXJyYXkodmFsdWUuYnVmZmVyKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMucGFja19iaW4odmFsdWUuYnVmZmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoY29uc3RydWN0b3IgPT0gT2JqZWN0KXtcclxuICAgICAgICB0aGlzLnBhY2tfb2JqZWN0KHZhbHVlKTtcclxuICAgICAgfSBlbHNlIGlmIChjb25zdHJ1Y3RvciA9PSBEYXRlKXtcclxuICAgICAgICB0aGlzLnBhY2tfc3RyaW5nKHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZS50b0JpbmFyeVBhY2sgPT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCh2YWx1ZS50b0JpbmFyeVBhY2soKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUeXBlIFwiJyArIGNvbnN0cnVjdG9yLnRvU3RyaW5nKCkgKyAnXCIgbm90IHlldCBzdXBwb3J0ZWQnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1R5cGUgXCInICsgdHlwZSArICdcIiBub3QgeWV0IHN1cHBvcnRlZCcpO1xyXG4gIH1cclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuZmx1c2goKTtcclxufVxyXG5cclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFja19iaW4gPSBmdW5jdGlvbihibG9iKXtcclxuICB2YXIgbGVuZ3RoID0gYmxvYi5sZW5ndGggfHwgYmxvYi5ieXRlTGVuZ3RoIHx8IGJsb2Iuc2l6ZTtcclxuICBpZiAobGVuZ3RoIDw9IDB4MGYpe1xyXG4gICAgdGhpcy5wYWNrX3VpbnQ4KDB4YTAgKyBsZW5ndGgpO1xyXG4gIH0gZWxzZSBpZiAobGVuZ3RoIDw9IDB4ZmZmZil7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4ZGEpIDtcclxuICAgIHRoaXMucGFja191aW50MTYobGVuZ3RoKTtcclxuICB9IGVsc2UgaWYgKGxlbmd0aCA8PSAweGZmZmZmZmZmKXtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkYik7XHJcbiAgICB0aGlzLnBhY2tfdWludDMyKGxlbmd0aCk7XHJcbiAgfSBlbHNle1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxlbmd0aCcpO1xyXG4gIH1cclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKGJsb2IpO1xyXG59XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfc3RyaW5nID0gZnVuY3Rpb24oc3RyKXtcclxuICB2YXIgbGVuZ3RoID0gdXRmOExlbmd0aChzdHIpO1xyXG5cclxuICBpZiAobGVuZ3RoIDw9IDB4MGYpe1xyXG4gICAgdGhpcy5wYWNrX3VpbnQ4KDB4YjAgKyBsZW5ndGgpO1xyXG4gIH0gZWxzZSBpZiAobGVuZ3RoIDw9IDB4ZmZmZil7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4ZDgpIDtcclxuICAgIHRoaXMucGFja191aW50MTYobGVuZ3RoKTtcclxuICB9IGVsc2UgaWYgKGxlbmd0aCA8PSAweGZmZmZmZmZmKXtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkOSk7XHJcbiAgICB0aGlzLnBhY2tfdWludDMyKGxlbmd0aCk7XHJcbiAgfSBlbHNle1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxlbmd0aCcpO1xyXG4gIH1cclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKHN0cik7XHJcbn1cclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFja19hcnJheSA9IGZ1bmN0aW9uKGFyeSl7XHJcbiAgdmFyIGxlbmd0aCA9IGFyeS5sZW5ndGg7XHJcbiAgaWYgKGxlbmd0aCA8PSAweDBmKXtcclxuICAgIHRoaXMucGFja191aW50OCgweDkwICsgbGVuZ3RoKTtcclxuICB9IGVsc2UgaWYgKGxlbmd0aCA8PSAweGZmZmYpe1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGRjKVxyXG4gICAgdGhpcy5wYWNrX3VpbnQxNihsZW5ndGgpO1xyXG4gIH0gZWxzZSBpZiAobGVuZ3RoIDw9IDB4ZmZmZmZmZmYpe1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGRkKTtcclxuICAgIHRoaXMucGFja191aW50MzIobGVuZ3RoKTtcclxuICB9IGVsc2V7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGVuZ3RoJyk7XHJcbiAgfVxyXG4gIGZvcih2YXIgaSA9IDA7IGkgPCBsZW5ndGggOyBpKyspe1xyXG4gICAgdGhpcy5wYWNrKGFyeVtpXSk7XHJcbiAgfVxyXG59XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfaW50ZWdlciA9IGZ1bmN0aW9uKG51bSl7XHJcbiAgaWYgKCAtMHgyMCA8PSBudW0gJiYgbnVtIDw9IDB4N2Ype1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZChudW0gJiAweGZmKTtcclxuICB9IGVsc2UgaWYgKDB4MDAgPD0gbnVtICYmIG51bSA8PSAweGZmKXtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhjYyk7XHJcbiAgICB0aGlzLnBhY2tfdWludDgobnVtKTtcclxuICB9IGVsc2UgaWYgKC0weDgwIDw9IG51bSAmJiBudW0gPD0gMHg3Zil7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4ZDApO1xyXG4gICAgdGhpcy5wYWNrX2ludDgobnVtKTtcclxuICB9IGVsc2UgaWYgKCAweDAwMDAgPD0gbnVtICYmIG51bSA8PSAweGZmZmYpe1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGNkKTtcclxuICAgIHRoaXMucGFja191aW50MTYobnVtKTtcclxuICB9IGVsc2UgaWYgKC0weDgwMDAgPD0gbnVtICYmIG51bSA8PSAweDdmZmYpe1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGQxKTtcclxuICAgIHRoaXMucGFja19pbnQxNihudW0pO1xyXG4gIH0gZWxzZSBpZiAoIDB4MDAwMDAwMDAgPD0gbnVtICYmIG51bSA8PSAweGZmZmZmZmZmKXtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhjZSk7XHJcbiAgICB0aGlzLnBhY2tfdWludDMyKG51bSk7XHJcbiAgfSBlbHNlIGlmICgtMHg4MDAwMDAwMCA8PSBudW0gJiYgbnVtIDw9IDB4N2ZmZmZmZmYpe1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGQyKTtcclxuICAgIHRoaXMucGFja19pbnQzMihudW0pO1xyXG4gIH0gZWxzZSBpZiAoLTB4ODAwMDAwMDAwMDAwMDAwMCA8PSBudW0gJiYgbnVtIDw9IDB4N0ZGRkZGRkZGRkZGRkZGRil7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4ZDMpO1xyXG4gICAgdGhpcy5wYWNrX2ludDY0KG51bSk7XHJcbiAgfSBlbHNlIGlmICgweDAwMDAwMDAwMDAwMDAwMDAgPD0gbnVtICYmIG51bSA8PSAweEZGRkZGRkZGRkZGRkZGRkYpe1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGNmKTtcclxuICAgIHRoaXMucGFja191aW50NjQobnVtKTtcclxuICB9IGVsc2V7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW50ZWdlcicpO1xyXG4gIH1cclxufVxyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrX2RvdWJsZSA9IGZ1bmN0aW9uKG51bSl7XHJcbiAgdmFyIHNpZ24gPSAwO1xyXG4gIGlmIChudW0gPCAwKXtcclxuICAgIHNpZ24gPSAxO1xyXG4gICAgbnVtID0gLW51bTtcclxuICB9XHJcbiAgdmFyIGV4cCAgPSBNYXRoLmZsb29yKE1hdGgubG9nKG51bSkgLyBNYXRoLkxOMik7XHJcbiAgdmFyIGZyYWMwID0gbnVtIC8gTWF0aC5wb3coMiwgZXhwKSAtIDE7XHJcbiAgdmFyIGZyYWMxID0gTWF0aC5mbG9vcihmcmFjMCAqIE1hdGgucG93KDIsIDUyKSk7XHJcbiAgdmFyIGIzMiAgID0gTWF0aC5wb3coMiwgMzIpO1xyXG4gIHZhciBoMzIgPSAoc2lnbiA8PCAzMSkgfCAoKGV4cCsxMDIzKSA8PCAyMCkgfFxyXG4gICAgICAoZnJhYzEgLyBiMzIpICYgMHgwZmZmZmY7XHJcbiAgdmFyIGwzMiA9IGZyYWMxICUgYjMyO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhjYik7XHJcbiAgdGhpcy5wYWNrX2ludDMyKGgzMik7XHJcbiAgdGhpcy5wYWNrX2ludDMyKGwzMik7XHJcbn1cclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFja19vYmplY3QgPSBmdW5jdGlvbihvYmope1xyXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcclxuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XHJcbiAgaWYgKGxlbmd0aCA8PSAweDBmKXtcclxuICAgIHRoaXMucGFja191aW50OCgweDgwICsgbGVuZ3RoKTtcclxuICB9IGVsc2UgaWYgKGxlbmd0aCA8PSAweGZmZmYpe1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGRlKTtcclxuICAgIHRoaXMucGFja191aW50MTYobGVuZ3RoKTtcclxuICB9IGVsc2UgaWYgKGxlbmd0aCA8PSAweGZmZmZmZmZmKXtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkZik7XHJcbiAgICB0aGlzLnBhY2tfdWludDMyKGxlbmd0aCk7XHJcbiAgfSBlbHNle1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxlbmd0aCcpO1xyXG4gIH1cclxuICBmb3IodmFyIHByb3AgaW4gb2JqKXtcclxuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpe1xyXG4gICAgICB0aGlzLnBhY2socHJvcCk7XHJcbiAgICAgIHRoaXMucGFjayhvYmpbcHJvcF0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrX3VpbnQ4ID0gZnVuY3Rpb24obnVtKXtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKG51bSk7XHJcbn1cclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFja191aW50MTYgPSBmdW5jdGlvbihudW0pe1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQobnVtID4+IDgpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQobnVtICYgMHhmZik7XHJcbn1cclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFja191aW50MzIgPSBmdW5jdGlvbihudW0pe1xyXG4gIHZhciBuID0gbnVtICYgMHhmZmZmZmZmZjtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChuICYgMHhmZjAwMDAwMCkgPj4+IDI0KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChuICYgMHgwMGZmMDAwMCkgPj4+IDE2KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChuICYgMHgwMDAwZmYwMCkgPj4+ICA4KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChuICYgMHgwMDAwMDBmZikpO1xyXG59XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfdWludDY0ID0gZnVuY3Rpb24obnVtKXtcclxuICB2YXIgaGlnaCA9IG51bSAvIE1hdGgucG93KDIsIDMyKTtcclxuICB2YXIgbG93ICA9IG51bSAlIE1hdGgucG93KDIsIDMyKTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChoaWdoICYgMHhmZjAwMDAwMCkgPj4+IDI0KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChoaWdoICYgMHgwMGZmMDAwMCkgPj4+IDE2KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChoaWdoICYgMHgwMDAwZmYwMCkgPj4+ICA4KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChoaWdoICYgMHgwMDAwMDBmZikpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGxvdyAgJiAweGZmMDAwMDAwKSA+Pj4gMjQpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGxvdyAgJiAweDAwZmYwMDAwKSA+Pj4gMTYpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGxvdyAgJiAweDAwMDBmZjAwKSA+Pj4gIDgpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGxvdyAgJiAweDAwMDAwMGZmKSk7XHJcbn1cclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFja19pbnQ4ID0gZnVuY3Rpb24obnVtKXtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKG51bSAmIDB4ZmYpO1xyXG59XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfaW50MTYgPSBmdW5jdGlvbihudW0pe1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKG51bSAmIDB4ZmYwMCkgPj4gOCk7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZChudW0gJiAweGZmKTtcclxufVxyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrX2ludDMyID0gZnVuY3Rpb24obnVtKXtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChudW0gPj4+IDI0KSAmIDB4ZmYpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKG51bSAmIDB4MDBmZjAwMDApID4+PiAxNik7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobnVtICYgMHgwMDAwZmYwMCkgPj4+IDgpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKG51bSAmIDB4MDAwMDAwZmYpKTtcclxufVxyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrX2ludDY0ID0gZnVuY3Rpb24obnVtKXtcclxuICB2YXIgaGlnaCA9IE1hdGguZmxvb3IobnVtIC8gTWF0aC5wb3coMiwgMzIpKTtcclxuICB2YXIgbG93ICA9IG51bSAlIE1hdGgucG93KDIsIDMyKTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChoaWdoICYgMHhmZjAwMDAwMCkgPj4+IDI0KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChoaWdoICYgMHgwMGZmMDAwMCkgPj4+IDE2KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChoaWdoICYgMHgwMDAwZmYwMCkgPj4+ICA4KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChoaWdoICYgMHgwMDAwMDBmZikpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGxvdyAgJiAweGZmMDAwMDAwKSA+Pj4gMjQpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGxvdyAgJiAweDAwZmYwMDAwKSA+Pj4gMTYpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGxvdyAgJiAweDAwMDBmZjAwKSA+Pj4gIDgpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGxvdyAgJiAweDAwMDAwMGZmKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF91dGY4UmVwbGFjZShtKXtcclxuICB2YXIgY29kZSA9IG0uY2hhckNvZGVBdCgwKTtcclxuXHJcbiAgaWYoY29kZSA8PSAweDdmZikgcmV0dXJuICcwMCc7XHJcbiAgaWYoY29kZSA8PSAweGZmZmYpIHJldHVybiAnMDAwJztcclxuICBpZihjb2RlIDw9IDB4MWZmZmZmKSByZXR1cm4gJzAwMDAnO1xyXG4gIGlmKGNvZGUgPD0gMHgzZmZmZmZmKSByZXR1cm4gJzAwMDAwJztcclxuICByZXR1cm4gJzAwMDAwMCc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHV0ZjhMZW5ndGgoc3RyKXtcclxuICBpZiAoc3RyLmxlbmd0aCA+IDYwMCkge1xyXG4gICAgLy8gQmxvYiBtZXRob2QgZmFzdGVyIGZvciBsYXJnZSBzdHJpbmdzXHJcbiAgICByZXR1cm4gKG5ldyBCbG9iKFtzdHJdKSkuc2l6ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXlxcdTAwMDAtXFx1MDA3Rl0vZywgX3V0ZjhSZXBsYWNlKS5sZW5ndGg7XHJcbiAgfVxyXG59XHJcblxufSx7XCIuL2J1ZmZlcmJ1aWxkZXJcIjoxNX1dLDE1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBiaW5hcnlGZWF0dXJlcyA9IHt9O1xyXG5iaW5hcnlGZWF0dXJlcy51c2VCbG9iQnVpbGRlciA9IChmdW5jdGlvbigpe1xyXG4gIHRyeSB7XHJcbiAgICBuZXcgQmxvYihbXSk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59KSgpO1xyXG5cclxuYmluYXJ5RmVhdHVyZXMudXNlQXJyYXlCdWZmZXJWaWV3ID0gIWJpbmFyeUZlYXR1cmVzLnVzZUJsb2JCdWlsZGVyICYmIChmdW5jdGlvbigpe1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gKG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShbXSldKSkuc2l6ZSA9PT0gMDtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn0pKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5iaW5hcnlGZWF0dXJlcyA9IGJpbmFyeUZlYXR1cmVzO1xyXG52YXIgQmxvYkJ1aWxkZXIgPSBtb2R1bGUuZXhwb3J0cy5CbG9iQnVpbGRlcjtcclxuaWYgKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICBCbG9iQnVpbGRlciA9IG1vZHVsZS5leHBvcnRzLkJsb2JCdWlsZGVyID0gd2luZG93LldlYktpdEJsb2JCdWlsZGVyIHx8XHJcbiAgICB3aW5kb3cuTW96QmxvYkJ1aWxkZXIgfHwgd2luZG93Lk1TQmxvYkJ1aWxkZXIgfHwgd2luZG93LkJsb2JCdWlsZGVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWZmZXJCdWlsZGVyKCl7XHJcbiAgdGhpcy5fcGllY2VzID0gW107XHJcbiAgdGhpcy5fcGFydHMgPSBbXTtcclxufVxyXG5cclxuQnVmZmVyQnVpbGRlci5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gIGlmKHR5cGVvZiBkYXRhID09PSAnbnVtYmVyJykge1xyXG4gICAgdGhpcy5fcGllY2VzLnB1c2goZGF0YSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRoaXMuZmx1c2goKTtcclxuICAgIHRoaXMuX3BhcnRzLnB1c2goZGF0YSk7XHJcbiAgfVxyXG59O1xyXG5cclxuQnVmZmVyQnVpbGRlci5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbigpIHtcclxuICBpZiAodGhpcy5fcGllY2VzLmxlbmd0aCA+IDApIHtcclxuICAgIHZhciBidWYgPSBuZXcgVWludDhBcnJheSh0aGlzLl9waWVjZXMpO1xyXG4gICAgaWYoIWJpbmFyeUZlYXR1cmVzLnVzZUFycmF5QnVmZmVyVmlldykge1xyXG4gICAgICBidWYgPSBidWYuYnVmZmVyO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcGFydHMucHVzaChidWYpO1xyXG4gICAgdGhpcy5fcGllY2VzID0gW107XHJcbiAgfVxyXG59O1xyXG5cclxuQnVmZmVyQnVpbGRlci5wcm90b3R5cGUuZ2V0QnVmZmVyID0gZnVuY3Rpb24oKSB7XHJcbiAgdGhpcy5mbHVzaCgpO1xyXG4gIGlmKGJpbmFyeUZlYXR1cmVzLnVzZUJsb2JCdWlsZGVyKSB7XHJcbiAgICB2YXIgYnVpbGRlciA9IG5ldyBCbG9iQnVpbGRlcigpO1xyXG4gICAgZm9yKHZhciBpID0gMCwgaWkgPSB0aGlzLl9wYXJ0cy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XHJcbiAgICAgIGJ1aWxkZXIuYXBwZW5kKHRoaXMuX3BhcnRzW2ldKTtcclxuICAgIH1cclxuICAgIHJldHVybiBidWlsZGVyLmdldEJsb2IoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG5ldyBCbG9iKHRoaXMuX3BhcnRzKTtcclxuICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5CdWZmZXJCdWlsZGVyID0gQnVmZmVyQnVpbGRlcjtcclxuXG59LHt9XSwxNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG4vKipcbiAqIFJlbGlhYmxlIHRyYW5zZmVyIGZvciBDaHJvbWUgQ2FuYXJ5IERhdGFDaGFubmVsIGltcGwuXG4gKiBBdXRob3I6IEBtaWNoZWxsZWJ1XG4gKi9cbmZ1bmN0aW9uIFJlbGlhYmxlKGRjLCBkZWJ1Zykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVsaWFibGUpKSByZXR1cm4gbmV3IFJlbGlhYmxlKGRjKTtcbiAgdGhpcy5fZGMgPSBkYztcblxuICB1dGlsLmRlYnVnID0gZGVidWc7XG5cbiAgLy8gTWVzc2FnZXMgc2VudC9yZWNlaXZlZCBzbyBmYXIuXG4gIC8vIGlkOiB7IGFjazogbiwgY2h1bmtzOiBbLi4uXSB9XG4gIHRoaXMuX291dGdvaW5nID0ge307XG4gIC8vIGlkOiB7IGFjazogWydhY2snLCBpZCwgbl0sIGNodW5rczogWy4uLl0gfVxuICB0aGlzLl9pbmNvbWluZyA9IHt9O1xuICB0aGlzLl9yZWNlaXZlZCA9IHt9O1xuXG4gIC8vIFdpbmRvdyBzaXplLlxuICB0aGlzLl93aW5kb3cgPSAxMDAwO1xuICAvLyBNVFUuXG4gIHRoaXMuX210dSA9IDUwMDtcbiAgLy8gSW50ZXJ2YWwgZm9yIHNldEludGVydmFsLiBJbiBtcy5cbiAgdGhpcy5faW50ZXJ2YWwgPSAwO1xuXG4gIC8vIE1lc3NhZ2VzIHNlbnQuXG4gIHRoaXMuX2NvdW50ID0gMDtcblxuICAvLyBPdXRnb2luZyBtZXNzYWdlIHF1ZXVlLlxuICB0aGlzLl9xdWV1ZSA9IFtdO1xuXG4gIHRoaXMuX3NldHVwREMoKTtcbn07XG5cbi8vIFNlbmQgYSBtZXNzYWdlIHJlbGlhYmx5LlxuUmVsaWFibGUucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihtc2cpIHtcbiAgLy8gRGV0ZXJtaW5lIGlmIGNodW5raW5nIGlzIG5lY2Vzc2FyeS5cbiAgdmFyIGJsID0gdXRpbC5wYWNrKG1zZyk7XG4gIGlmIChibC5zaXplIDwgdGhpcy5fbXR1KSB7XG4gICAgdGhpcy5faGFuZGxlU2VuZChbJ25vJywgYmxdKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLl9vdXRnb2luZ1t0aGlzLl9jb3VudF0gPSB7XG4gICAgYWNrOiAwLFxuICAgIGNodW5rczogdGhpcy5fY2h1bmsoYmwpXG4gIH07XG5cbiAgaWYgKHV0aWwuZGVidWcpIHtcbiAgICB0aGlzLl9vdXRnb2luZ1t0aGlzLl9jb3VudF0udGltZXIgPSBuZXcgRGF0ZSgpO1xuICB9XG5cbiAgLy8gU2VuZCBwcmVsaW0gd2luZG93LlxuICB0aGlzLl9zZW5kV2luZG93ZWRDaHVua3ModGhpcy5fY291bnQpO1xuICB0aGlzLl9jb3VudCArPSAxO1xufTtcblxuLy8gU2V0IHVwIGludGVydmFsIGZvciBwcm9jZXNzaW5nIHF1ZXVlLlxuUmVsaWFibGUucHJvdG90eXBlLl9zZXR1cEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIC8vIFRPRE86IGZhaWwgZ3JhY2VmdWxseS5cblxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX3RpbWVvdXQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAvLyBGSVhNRTogU3RyaW5nIHN0dWZmIG1ha2VzIHRoaW5ncyB0ZXJyaWJseSBhc3luYy5cbiAgICB2YXIgbXNnID0gc2VsZi5fcXVldWUuc2hpZnQoKTtcbiAgICBpZiAobXNnLl9tdWx0aXBsZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlpID0gbXNnLmxlbmd0aDsgaSA8IGlpOyBpICs9IDEpIHtcbiAgICAgICAgc2VsZi5faW50ZXJ2YWxTZW5kKG1zZ1tpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYuX2ludGVydmFsU2VuZChtc2cpO1xuICAgIH1cbiAgfSwgdGhpcy5faW50ZXJ2YWwpO1xufTtcblxuUmVsaWFibGUucHJvdG90eXBlLl9pbnRlcnZhbFNlbmQgPSBmdW5jdGlvbihtc2cpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBtc2cgPSB1dGlsLnBhY2sobXNnKTtcbiAgdXRpbC5ibG9iVG9CaW5hcnlTdHJpbmcobXNnLCBmdW5jdGlvbihzdHIpIHtcbiAgICBzZWxmLl9kYy5zZW5kKHN0cik7XG4gIH0pO1xuICBpZiAoc2VsZi5fcXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgY2xlYXJUaW1lb3V0KHNlbGYuX3RpbWVvdXQpO1xuICAgIHNlbGYuX3RpbWVvdXQgPSBudWxsO1xuICAgIC8vc2VsZi5fcHJvY2Vzc0Fja3MoKTtcbiAgfVxufTtcblxuLy8gR28gdGhyb3VnaCBBQ0tzIHRvIHNlbmQgbWlzc2luZyBwaWVjZXMuXG5SZWxpYWJsZS5wcm90b3R5cGUuX3Byb2Nlc3NBY2tzID0gZnVuY3Rpb24oKSB7XG4gIGZvciAodmFyIGlkIGluIHRoaXMuX291dGdvaW5nKSB7XG4gICAgaWYgKHRoaXMuX291dGdvaW5nLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgdGhpcy5fc2VuZFdpbmRvd2VkQ2h1bmtzKGlkKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIEhhbmRsZSBzZW5kaW5nIGEgbWVzc2FnZS5cbi8vIEZJWE1FOiBEb24ndCB3YWl0IGZvciBpbnRlcnZhbCB0aW1lIGZvciBhbGwgbWVzc2FnZXMuLi5cblJlbGlhYmxlLnByb3RvdHlwZS5faGFuZGxlU2VuZCA9IGZ1bmN0aW9uKG1zZykge1xuICB2YXIgcHVzaCA9IHRydWU7XG4gIGZvciAodmFyIGkgPSAwLCBpaSA9IHRoaXMuX3F1ZXVlLmxlbmd0aDsgaSA8IGlpOyBpICs9IDEpIHtcbiAgICB2YXIgaXRlbSA9IHRoaXMuX3F1ZXVlW2ldO1xuICAgIGlmIChpdGVtID09PSBtc2cpIHtcbiAgICAgIHB1c2ggPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uX211bHRpcGxlICYmIGl0ZW0uaW5kZXhPZihtc2cpICE9PSAtMSkge1xuICAgICAgcHVzaCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAocHVzaCkge1xuICAgIHRoaXMuX3F1ZXVlLnB1c2gobXNnKTtcbiAgICBpZiAoIXRoaXMuX3RpbWVvdXQpIHtcbiAgICAgIHRoaXMuX3NldHVwSW50ZXJ2YWwoKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIFNldCB1cCBEYXRhQ2hhbm5lbCBoYW5kbGVycy5cblJlbGlhYmxlLnByb3RvdHlwZS5fc2V0dXBEQyA9IGZ1bmN0aW9uKCkge1xuICAvLyBIYW5kbGUgdmFyaW91cyBtZXNzYWdlIHR5cGVzLlxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX2RjLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgbXNnID0gZS5kYXRhO1xuICAgIHZhciBkYXRhdHlwZSA9IG1zZy5jb25zdHJ1Y3RvcjtcbiAgICAvLyBGSVhNRTogbXNnIGlzIFN0cmluZyB1bnRpbCBiaW5hcnkgaXMgc3VwcG9ydGVkLlxuICAgIC8vIE9uY2UgdGhhdCBoYXBwZW5zLCB0aGlzIHdpbGwgaGF2ZSB0byBiZSBzbWFydGVyLlxuICAgIGlmIChkYXRhdHlwZSA9PT0gU3RyaW5nKSB7XG4gICAgICB2YXIgYWIgPSB1dGlsLmJpbmFyeVN0cmluZ1RvQXJyYXlCdWZmZXIobXNnKTtcbiAgICAgIG1zZyA9IHV0aWwudW5wYWNrKGFiKTtcbiAgICAgIHNlbGYuX2hhbmRsZU1lc3NhZ2UobXNnKTtcbiAgICB9XG4gIH07XG59O1xuXG4vLyBIYW5kbGVzIGFuIGluY29taW5nIG1lc3NhZ2UuXG5SZWxpYWJsZS5wcm90b3R5cGUuX2hhbmRsZU1lc3NhZ2UgPSBmdW5jdGlvbihtc2cpIHtcbiAgdmFyIGlkID0gbXNnWzFdO1xuICB2YXIgaWRhdGEgPSB0aGlzLl9pbmNvbWluZ1tpZF07XG4gIHZhciBvZGF0YSA9IHRoaXMuX291dGdvaW5nW2lkXTtcbiAgdmFyIGRhdGE7XG4gIHN3aXRjaCAobXNnWzBdKSB7XG4gICAgLy8gTm8gY2h1bmtpbmcgd2FzIGRvbmUuXG4gICAgY2FzZSAnbm8nOlxuICAgICAgdmFyIG1lc3NhZ2UgPSBpZDtcbiAgICAgIGlmICghIW1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5vbm1lc3NhZ2UodXRpbC51bnBhY2sobWVzc2FnZSkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgLy8gUmVhY2hlZCB0aGUgZW5kIG9mIHRoZSBtZXNzYWdlLlxuICAgIGNhc2UgJ2VuZCc6XG4gICAgICBkYXRhID0gaWRhdGE7XG5cbiAgICAgIC8vIEluIGNhc2UgZW5kIGNvbWVzIGZpcnN0LlxuICAgICAgdGhpcy5fcmVjZWl2ZWRbaWRdID0gbXNnWzJdO1xuXG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2FjayhpZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhY2snOlxuICAgICAgZGF0YSA9IG9kYXRhO1xuICAgICAgaWYgKCEhZGF0YSkge1xuICAgICAgICB2YXIgYWNrID0gbXNnWzJdO1xuICAgICAgICAvLyBUYWtlIHRoZSBsYXJnZXIgQUNLLCBmb3Igb3V0IG9mIG9yZGVyIG1lc3NhZ2VzLlxuICAgICAgICBkYXRhLmFjayA9IE1hdGgubWF4KGFjaywgZGF0YS5hY2spO1xuXG4gICAgICAgIC8vIENsZWFuIHVwIHdoZW4gYWxsIGNodW5rcyBhcmUgQUNLZWQuXG4gICAgICAgIGlmIChkYXRhLmFjayA+PSBkYXRhLmNodW5rcy5sZW5ndGgpIHtcbiAgICAgICAgICB1dGlsLmxvZygnVGltZTogJywgbmV3IERhdGUoKSAtIGRhdGEudGltZXIpO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9vdXRnb2luZ1tpZF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcHJvY2Vzc0Fja3MoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gSWYgIWRhdGEsIGp1c3QgaWdub3JlLlxuICAgICAgYnJlYWs7XG4gICAgLy8gUmVjZWl2ZWQgYSBjaHVuayBvZiBkYXRhLlxuICAgIGNhc2UgJ2NodW5rJzpcbiAgICAgIC8vIENyZWF0ZSBhIG5ldyBlbnRyeSBpZiBub25lIGV4aXN0cy5cbiAgICAgIGRhdGEgPSBpZGF0YTtcbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICB2YXIgZW5kID0gdGhpcy5fcmVjZWl2ZWRbaWRdO1xuICAgICAgICBpZiAoZW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICBhY2s6IFsnYWNrJywgaWQsIDBdLFxuICAgICAgICAgIGNodW5rczogW11cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5faW5jb21pbmdbaWRdID0gZGF0YTtcbiAgICAgIH1cblxuICAgICAgdmFyIG4gPSBtc2dbMl07XG4gICAgICB2YXIgY2h1bmsgPSBtc2dbM107XG4gICAgICBkYXRhLmNodW5rc1tuXSA9IG5ldyBVaW50OEFycmF5KGNodW5rKTtcblxuICAgICAgLy8gSWYgd2UgZ2V0IHRoZSBjaHVuayB3ZSdyZSBsb29raW5nIGZvciwgQUNLIGZvciBuZXh0IG1pc3NpbmcuXG4gICAgICAvLyBPdGhlcndpc2UsIEFDSyB0aGUgc2FtZSBOIGFnYWluLlxuICAgICAgaWYgKG4gPT09IGRhdGEuYWNrWzJdKSB7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZU5leHRBY2soaWQpO1xuICAgICAgfVxuICAgICAgdGhpcy5fYWNrKGlkKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBTaG91bGRuJ3QgaGFwcGVuLCBidXQgd291bGQgbWFrZSBzZW5zZSBmb3IgbWVzc2FnZSB0byBqdXN0IGdvXG4gICAgICAvLyB0aHJvdWdoIGFzIGlzLlxuICAgICAgdGhpcy5faGFuZGxlU2VuZChtc2cpO1xuICAgICAgYnJlYWs7XG4gIH1cbn07XG5cbi8vIENodW5rcyBCTCBpbnRvIHNtYWxsZXIgbWVzc2FnZXMuXG5SZWxpYWJsZS5wcm90b3R5cGUuX2NodW5rID0gZnVuY3Rpb24oYmwpIHtcbiAgdmFyIGNodW5rcyA9IFtdO1xuICB2YXIgc2l6ZSA9IGJsLnNpemU7XG4gIHZhciBzdGFydCA9IDA7XG4gIHdoaWxlIChzdGFydCA8IHNpemUpIHtcbiAgICB2YXIgZW5kID0gTWF0aC5taW4oc2l6ZSwgc3RhcnQgKyB0aGlzLl9tdHUpO1xuICAgIHZhciBiID0gYmwuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgdmFyIGNodW5rID0ge1xuICAgICAgcGF5bG9hZDogYlxuICAgIH1cbiAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgc3RhcnQgPSBlbmQ7XG4gIH1cbiAgdXRpbC5sb2coJ0NyZWF0ZWQnLCBjaHVua3MubGVuZ3RoLCAnY2h1bmtzLicpO1xuICByZXR1cm4gY2h1bmtzO1xufTtcblxuLy8gU2VuZHMgQUNLIE4sIGV4cGVjdGluZyBOdGggYmxvYiBjaHVuayBmb3IgbWVzc2FnZSBJRC5cblJlbGlhYmxlLnByb3RvdHlwZS5fYWNrID0gZnVuY3Rpb24oaWQpIHtcbiAgdmFyIGFjayA9IHRoaXMuX2luY29taW5nW2lkXS5hY2s7XG5cbiAgLy8gaWYgYWNrIGlzIHRoZSBlbmQgdmFsdWUsIHRoZW4gY2FsbCBfY29tcGxldGUuXG4gIGlmICh0aGlzLl9yZWNlaXZlZFtpZF0gPT09IGFja1syXSkge1xuICAgIHRoaXMuX2NvbXBsZXRlKGlkKTtcbiAgICB0aGlzLl9yZWNlaXZlZFtpZF0gPSB0cnVlO1xuICB9XG5cbiAgdGhpcy5faGFuZGxlU2VuZChhY2spO1xufTtcblxuLy8gQ2FsY3VsYXRlcyB0aGUgbmV4dCBBQ0sgbnVtYmVyLCBnaXZlbiBjaHVua3MuXG5SZWxpYWJsZS5wcm90b3R5cGUuX2NhbGN1bGF0ZU5leHRBY2sgPSBmdW5jdGlvbihpZCkge1xuICB2YXIgZGF0YSA9IHRoaXMuX2luY29taW5nW2lkXTtcbiAgdmFyIGNodW5rcyA9IGRhdGEuY2h1bmtzO1xuICBmb3IgKHZhciBpID0gMCwgaWkgPSBjaHVua3MubGVuZ3RoOyBpIDwgaWk7IGkgKz0gMSkge1xuICAgIC8vIFRoaXMgY2h1bmsgaXMgbWlzc2luZyEhISBCZXR0ZXIgQUNLIGZvciBpdC5cbiAgICBpZiAoY2h1bmtzW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRhdGEuYWNrWzJdID0gaTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgZGF0YS5hY2tbMl0gPSBjaHVua3MubGVuZ3RoO1xufTtcblxuLy8gU2VuZHMgdGhlIG5leHQgd2luZG93IG9mIGNodW5rcy5cblJlbGlhYmxlLnByb3RvdHlwZS5fc2VuZFdpbmRvd2VkQ2h1bmtzID0gZnVuY3Rpb24oaWQpIHtcbiAgdXRpbC5sb2coJ3NlbmRXaW5kb3dlZENodW5rcyBmb3I6ICcsIGlkKTtcbiAgdmFyIGRhdGEgPSB0aGlzLl9vdXRnb2luZ1tpZF07XG4gIHZhciBjaCA9IGRhdGEuY2h1bmtzO1xuICB2YXIgY2h1bmtzID0gW107XG4gIHZhciBsaW1pdCA9IE1hdGgubWluKGRhdGEuYWNrICsgdGhpcy5fd2luZG93LCBjaC5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gZGF0YS5hY2s7IGkgPCBsaW1pdDsgaSArPSAxKSB7XG4gICAgaWYgKCFjaFtpXS5zZW50IHx8IGkgPT09IGRhdGEuYWNrKSB7XG4gICAgICBjaFtpXS5zZW50ID0gdHJ1ZTtcbiAgICAgIGNodW5rcy5wdXNoKFsnY2h1bmsnLCBpZCwgaSwgY2hbaV0ucGF5bG9hZF0pO1xuICAgIH1cbiAgfVxuICBpZiAoZGF0YS5hY2sgKyB0aGlzLl93aW5kb3cgPj0gY2gubGVuZ3RoKSB7XG4gICAgY2h1bmtzLnB1c2goWydlbmQnLCBpZCwgY2gubGVuZ3RoXSlcbiAgfVxuICBjaHVua3MuX211bHRpcGxlID0gdHJ1ZTtcbiAgdGhpcy5faGFuZGxlU2VuZChjaHVua3MpO1xufTtcblxuLy8gUHV0cyB0b2dldGhlciBhIG1lc3NhZ2UgZnJvbSBjaHVua3MuXG5SZWxpYWJsZS5wcm90b3R5cGUuX2NvbXBsZXRlID0gZnVuY3Rpb24oaWQpIHtcbiAgdXRpbC5sb2coJ0NvbXBsZXRlZCBjYWxsZWQgZm9yJywgaWQpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBjaHVua3MgPSB0aGlzLl9pbmNvbWluZ1tpZF0uY2h1bmtzO1xuICB2YXIgYmwgPSBuZXcgQmxvYihjaHVua3MpO1xuICB1dGlsLmJsb2JUb0FycmF5QnVmZmVyKGJsLCBmdW5jdGlvbihhYikge1xuICAgIHNlbGYub25tZXNzYWdlKHV0aWwudW5wYWNrKGFiKSk7XG4gIH0pO1xuICBkZWxldGUgdGhpcy5faW5jb21pbmdbaWRdO1xufTtcblxuLy8gVXBzIGJhbmR3aWR0aCBsaW1pdCBvbiBTRFAuIE1lYW50IHRvIGJlIGNhbGxlZCBkdXJpbmcgb2ZmZXIvYW5zd2VyLlxuUmVsaWFibGUuaGlnaGVyQmFuZHdpZHRoU0RQID0gZnVuY3Rpb24oc2RwKSB7XG4gIC8vIEFTIHN0YW5kcyBmb3IgQXBwbGljYXRpb24tU3BlY2lmaWMgTWF4aW11bS5cbiAgLy8gQmFuZHdpZHRoIG51bWJlciBpcyBpbiBraWxvYml0cyAvIHNlYy5cbiAgLy8gU2VlIFJGQyBmb3IgbW9yZSBpbmZvOiBodHRwOi8vd3d3LmlldGYub3JnL3JmYy9yZmMyMzI3LnR4dFxuXG4gIC8vIENocm9tZSAzMSsgZG9lc24ndCB3YW50IHVzIG11bmdpbmcgdGhlIFNEUCwgc28gd2UnbGwgbGV0IHRoZW0gaGF2ZSB0aGVpclxuICAvLyB3YXkuXG4gIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLmFwcFZlcnNpb24ubWF0Y2goL0Nocm9tZVxcLyguKj8pIC8pO1xuICBpZiAodmVyc2lvbikge1xuICAgIHZlcnNpb24gPSBwYXJzZUludCh2ZXJzaW9uWzFdLnNwbGl0KCcuJykuc2hpZnQoKSk7XG4gICAgaWYgKHZlcnNpb24gPCAzMSkge1xuICAgICAgdmFyIHBhcnRzID0gc2RwLnNwbGl0KCdiPUFTOjMwJyk7XG4gICAgICB2YXIgcmVwbGFjZSA9ICdiPUFTOjEwMjQwMCc7IC8vIDEwMCBNYnBzXG4gICAgICBpZiAocGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4gcGFydHNbMF0gKyByZXBsYWNlICsgcGFydHNbMV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNkcDtcbn07XG5cbi8vIE92ZXJ3cml0dGVuLCB0eXBpY2FsbHkuXG5SZWxpYWJsZS5wcm90b3R5cGUub25tZXNzYWdlID0gZnVuY3Rpb24obXNnKSB7fTtcblxubW9kdWxlLmV4cG9ydHMuUmVsaWFibGUgPSBSZWxpYWJsZTtcblxufSx7XCIuL3V0aWxcIjoxN31dLDE3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBCaW5hcnlQYWNrID0gcmVxdWlyZSgnanMtYmluYXJ5cGFjaycpO1xuXG52YXIgdXRpbCA9IHtcbiAgZGVidWc6IGZhbHNlLFxuICBcbiAgaW5oZXJpdHM6IGZ1bmN0aW9uKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yO1xuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgZXh0ZW5kOiBmdW5jdGlvbihkZXN0LCBzb3VyY2UpIHtcbiAgICBmb3IodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGRlc3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVzdDtcbiAgfSxcbiAgcGFjazogQmluYXJ5UGFjay5wYWNrLFxuICB1bnBhY2s6IEJpbmFyeVBhY2sudW5wYWNrLFxuICBcbiAgbG9nOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHV0aWwuZGVidWcpIHtcbiAgICAgIHZhciBjb3B5ID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb3B5W2ldID0gYXJndW1lbnRzW2ldO1xuICAgICAgfVxuICAgICAgY29weS51bnNoaWZ0KCdSZWxpYWJsZTogJyk7XG4gICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBjb3B5KTtcbiAgICB9XG4gIH0sXG5cbiAgc2V0WmVyb1RpbWVvdXQ6IChmdW5jdGlvbihnbG9iYWwpIHtcbiAgICB2YXIgdGltZW91dHMgPSBbXTtcbiAgICB2YXIgbWVzc2FnZU5hbWUgPSAnemVyby10aW1lb3V0LW1lc3NhZ2UnO1xuXG4gICAgLy8gTGlrZSBzZXRUaW1lb3V0LCBidXQgb25seSB0YWtlcyBhIGZ1bmN0aW9uIGFyZ3VtZW50Llx0IFRoZXJlJ3NcbiAgICAvLyBubyB0aW1lIGFyZ3VtZW50IChhbHdheXMgemVybykgYW5kIG5vIGFyZ3VtZW50cyAoeW91IGhhdmUgdG9cbiAgICAvLyB1c2UgYSBjbG9zdXJlKS5cbiAgICBmdW5jdGlvbiBzZXRaZXJvVGltZW91dFBvc3RNZXNzYWdlKGZuKSB7XG4gICAgICB0aW1lb3V0cy5wdXNoKGZuKTtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlTmFtZSwgJyonKTtcbiAgICB9XHRcdFxuXG4gICAgZnVuY3Rpb24gaGFuZGxlTWVzc2FnZShldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PSBnbG9iYWwgJiYgZXZlbnQuZGF0YSA9PSBtZXNzYWdlTmFtZSkge1xuICAgICAgICBpZiAoZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpbWVvdXRzLmxlbmd0aCkge1xuICAgICAgICAgIHRpbWVvdXRzLnNoaWZ0KCkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlTWVzc2FnZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChnbG9iYWwuYXR0YWNoRXZlbnQpIHtcbiAgICAgIGdsb2JhbC5hdHRhY2hFdmVudCgnb25tZXNzYWdlJywgaGFuZGxlTWVzc2FnZSk7XG4gICAgfVxuICAgIHJldHVybiBzZXRaZXJvVGltZW91dFBvc3RNZXNzYWdlO1xuICB9KHRoaXMpKSxcbiAgXG4gIGJsb2JUb0FycmF5QnVmZmVyOiBmdW5jdGlvbihibG9iLCBjYil7XG4gICAgdmFyIGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmci5vbmxvYWQgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgIGNiKGV2dC50YXJnZXQucmVzdWx0KTtcbiAgICB9O1xuICAgIGZyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpO1xuICB9LFxuICBibG9iVG9CaW5hcnlTdHJpbmc6IGZ1bmN0aW9uKGJsb2IsIGNiKXtcbiAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgY2IoZXZ0LnRhcmdldC5yZXN1bHQpO1xuICAgIH07XG4gICAgZnIucmVhZEFzQmluYXJ5U3RyaW5nKGJsb2IpO1xuICB9LFxuICBiaW5hcnlTdHJpbmdUb0FycmF5QnVmZmVyOiBmdW5jdGlvbihiaW5hcnkpIHtcbiAgICB2YXIgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYmluYXJ5Lmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiaW5hcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ5dGVBcnJheVtpXSA9IGJpbmFyeS5jaGFyQ29kZUF0KGkpICYgMHhmZjtcbiAgICB9XG4gICAgcmV0dXJuIGJ5dGVBcnJheS5idWZmZXI7XG4gIH0sXG4gIHJhbmRvbVRva2VuOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dGlsO1xuXG59LHtcImpzLWJpbmFyeXBhY2tcIjoxNH1dfSx7fSxbNCwyXSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=