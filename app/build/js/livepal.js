(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Polymer('livepal-ui', {
  created: function() {
    this.devices = {};
    this.gifieProgress = 0;
    this.pageTransitionIsActive = false;
    this.watchPagesTransition();
  },
  observe: {'devices.mobile': 'updateZ'},
  checkUsername: function() {
    this.$.usernameDecorator.isInvalid = !this.$.username.checkValidity();
  },
  watchPagesTransition: function() {
    var $__0 = this;
    window.addEventListener('core-animated-pages-transition-prepare', (function(event) {
      $__0.pageTransitionIsActive = true;
    }));
    window.addEventListener('core-animated-pages-transition-end', (function(event) {
      $__0.pageTransitionIsActive = false;
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
    this.$.main.selected = sender.dataset.target;
  },
  updateZ: function() {
    var self = this;
    function changeZ(z) {
      var shadowRoot = arguments[1] !== (void 0) ? arguments[1] : self.shadowRoot;
      var paperShadowElements = shadowRoot.querySelectorAll('paper-shadow');
      [].map.call(paperShadowElements, (function(paperElement) {
        paperElement.setZ(z);
      }));
    }
    if (this.devices.mobile) {
      changeZ(0);
    } else {
      changeZ(1);
    }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl2ZXBhbC5qcyIsIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzIjpbImxpdmVwYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5Qb2x5bWVyKCdsaXZlcGFsLXVpJywge1xuICBjcmVhdGVkOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmRldmljZXMgPSB7fTtcbiAgICB0aGlzLmdpZmllUHJvZ3Jlc3MgPSAwO1xuICAgIHRoaXMucGFnZVRyYW5zaXRpb25Jc0FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMud2F0Y2hQYWdlc1RyYW5zaXRpb24oKTtcbiAgfSxcbiAgb2JzZXJ2ZTogeydkZXZpY2VzLm1vYmlsZSc6ICd1cGRhdGVaJ30sXG4gIGNoZWNrVXNlcm5hbWU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuJC51c2VybmFtZURlY29yYXRvci5pc0ludmFsaWQgPSAhdGhpcy4kLnVzZXJuYW1lLmNoZWNrVmFsaWRpdHkoKTtcbiAgfSxcbiAgd2F0Y2hQYWdlc1RyYW5zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY29yZS1hbmltYXRlZC1wYWdlcy10cmFuc2l0aW9uLXByZXBhcmUnLCAoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICRfXzAucGFnZVRyYW5zaXRpb25Jc0FjdGl2ZSA9IHRydWU7XG4gICAgfSkpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjb3JlLWFuaW1hdGVkLXBhZ2VzLXRyYW5zaXRpb24tZW5kJywgKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAkX18wLnBhZ2VUcmFuc2l0aW9uSXNBY3RpdmUgPSBmYWxzZTtcbiAgICB9KSk7XG4gIH0sXG4gIG1ha2VHaWZpZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyICRfXzAgPSB0aGlzO1xuICAgIHRoaXMuZ2lmc2hvdC5jcmVhdGVHSUYoe1xuICAgICAgJ251bVdvcmtlcnMnOiA0LFxuICAgICAgJ251bUZyYW1lcyc6IDIwLFxuICAgICAgJ3NhbXBsZUludGVydmFsJzogNyxcbiAgICAgICd3ZWJjYW1WaWRlb0VsZW1lbnQnOiB0aGlzLiQudmlkZW8sXG4gICAgICAna2VlcENhbWVyYU9uJzogdHJ1ZSxcbiAgICAgICdjYW1lcmFTdHJlYW0nOiB0aGlzLmNhbWVyYVN0cmVhbSB8fCBudWxsLFxuICAgICAgJ2dpZldpZHRoJzogMjAwLFxuICAgICAgJ2dpZkhlaWdodCc6IDIwMCxcbiAgICAgICdwcm9ncmVzc0NhbGxiYWNrJzogKGZ1bmN0aW9uKHN0ZXApIHtcbiAgICAgICAgJF9fMC5naWZpZVByb2dyZXNzID0gc3RlcCAqIDEwMDtcbiAgICAgIH0pLFxuICAgICAgJ2NvbXBsZXRlQ2FsbGJhY2snOiAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkb25lJyk7XG4gICAgICB9KVxuICAgIH0sIChmdW5jdGlvbihvYmopIHtcbiAgICAgIGlmICghb2JqLmVycm9yKSB7XG4gICAgICAgICRfXzAuJC5naWZpZS5zcmMgPSBvYmouaW1hZ2U7XG4gICAgICAgICRfXzAuZ2lmaWVEYXRhID0gb2JqLmltYWdlO1xuICAgICAgICAkX18wLmNhbWVyYVN0cmVhbSA9IG9iai5jYW1lcmFTdHJlYW07XG4gICAgICB9XG4gICAgfSkpO1xuICB9LFxuICBzd2l0Y2g6IGZ1bmN0aW9uKGV2ZW50LCBkZXRhaWwsIHNlbmRlcikge1xuICAgIHRoaXMuJC5tYWluLnNlbGVjdGVkID0gc2VuZGVyLmRhdGFzZXQudGFyZ2V0O1xuICB9LFxuICB1cGRhdGVaOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gY2hhbmdlWih6KSB7XG4gICAgICB2YXIgc2hhZG93Um9vdCA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiBzZWxmLnNoYWRvd1Jvb3Q7XG4gICAgICB2YXIgcGFwZXJTaGFkb3dFbGVtZW50cyA9IHNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvckFsbCgncGFwZXItc2hhZG93Jyk7XG4gICAgICBbXS5tYXAuY2FsbChwYXBlclNoYWRvd0VsZW1lbnRzLCAoZnVuY3Rpb24ocGFwZXJFbGVtZW50KSB7XG4gICAgICAgIHBhcGVyRWxlbWVudC5zZXRaKHopO1xuICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5kZXZpY2VzLm1vYmlsZSkge1xuICAgICAgY2hhbmdlWigwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hhbmdlWigxKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5cbn0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgJF9fcGVlcmpzX18sXG4gICAgJF9fZ2lmc2hvdF80N19idWlsZF80N19naWZzaG90XzQ2X2pzX18sXG4gICAgJF9fbGl2ZXBhbF80NV91aV9fO1xuJ3VzZSBzdHJpY3QnO1xudmFyIFBlZXIgPSAoJF9fcGVlcmpzX18gPSByZXF1aXJlKFwicGVlcmpzXCIpLCAkX19wZWVyanNfXyAmJiAkX19wZWVyanNfXy5fX2VzTW9kdWxlICYmICRfX3BlZXJqc19fIHx8IHtkZWZhdWx0OiAkX19wZWVyanNfX30pLmRlZmF1bHQ7XG52YXIgZ2lmc2hvdCA9ICgkX19naWZzaG90XzQ3X2J1aWxkXzQ3X2dpZnNob3RfNDZfanNfXyA9IHJlcXVpcmUoXCJnaWZzaG90L2J1aWxkL2dpZnNob3QuanNcIiksICRfX2dpZnNob3RfNDdfYnVpbGRfNDdfZ2lmc2hvdF80Nl9qc19fICYmICRfX2dpZnNob3RfNDdfYnVpbGRfNDdfZ2lmc2hvdF80Nl9qc19fLl9fZXNNb2R1bGUgJiYgJF9fZ2lmc2hvdF80N19idWlsZF80N19naWZzaG90XzQ2X2pzX18gfHwge2RlZmF1bHQ6ICRfX2dpZnNob3RfNDdfYnVpbGRfNDdfZ2lmc2hvdF80Nl9qc19ffSkuZGVmYXVsdDtcbigkX19saXZlcGFsXzQ1X3VpX18gPSByZXF1aXJlKFwiLi9saXZlcGFsLXVpXCIpLCAkX19saXZlcGFsXzQ1X3VpX18gJiYgJF9fbGl2ZXBhbF80NV91aV9fLl9fZXNNb2R1bGUgJiYgJF9fbGl2ZXBhbF80NV91aV9fIHx8IHtkZWZhdWx0OiAkX19saXZlcGFsXzQ1X3VpX199KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2x5bWVyLXJlYWR5JywgKGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHZhciBsaXZlcGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGl2ZXBhbC11aScpO1xuICBsaXZlcGFsLmdpZnNob3QgPSBnaWZzaG90O1xufSkpO1xuXG5cbn0se1wiLi9saXZlcGFsLXVpXCI6MSxcImdpZnNob3QvYnVpbGQvZ2lmc2hvdC5qc1wiOjUsXCJwZWVyanNcIjoxMH1dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbn0se31dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCl7XG4oZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKGdsb2JhbC4kdHJhY2V1clJ1bnRpbWUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyICRPYmplY3QgPSBPYmplY3Q7XG4gIHZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuICB2YXIgJGNyZWF0ZSA9ICRPYmplY3QuY3JlYXRlO1xuICB2YXIgJGRlZmluZVByb3BlcnRpZXMgPSAkT2JqZWN0LmRlZmluZVByb3BlcnRpZXM7XG4gIHZhciAkZGVmaW5lUHJvcGVydHkgPSAkT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuICB2YXIgJGZyZWV6ZSA9ICRPYmplY3QuZnJlZXplO1xuICB2YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9ICRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICB2YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSAkT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG4gIHZhciAka2V5cyA9ICRPYmplY3Qua2V5cztcbiAgdmFyICRoYXNPd25Qcm9wZXJ0eSA9ICRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgJHRvU3RyaW5nID0gJE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciAkcHJldmVudEV4dGVuc2lvbnMgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnM7XG4gIHZhciAkc2VhbCA9IE9iamVjdC5zZWFsO1xuICB2YXIgJGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGU7XG4gIGZ1bmN0aW9uIG5vbkVudW0odmFsdWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH07XG4gIH1cbiAgdmFyIHR5cGVzID0ge1xuICAgIHZvaWQ6IGZ1bmN0aW9uIHZvaWRUeXBlKCkge30sXG4gICAgYW55OiBmdW5jdGlvbiBhbnkoKSB7fSxcbiAgICBzdHJpbmc6IGZ1bmN0aW9uIHN0cmluZygpIHt9LFxuICAgIG51bWJlcjogZnVuY3Rpb24gbnVtYmVyKCkge30sXG4gICAgYm9vbGVhbjogZnVuY3Rpb24gYm9vbGVhbigpIHt9XG4gIH07XG4gIHZhciBtZXRob2QgPSBub25FbnVtO1xuICB2YXIgY291bnRlciA9IDA7XG4gIGZ1bmN0aW9uIG5ld1VuaXF1ZVN0cmluZygpIHtcbiAgICByZXR1cm4gJ19fJCcgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxZTkpICsgJyQnICsgKytjb3VudGVyICsgJyRfXyc7XG4gIH1cbiAgdmFyIHN5bWJvbEludGVybmFsUHJvcGVydHkgPSBuZXdVbmlxdWVTdHJpbmcoKTtcbiAgdmFyIHN5bWJvbERlc2NyaXB0aW9uUHJvcGVydHkgPSBuZXdVbmlxdWVTdHJpbmcoKTtcbiAgdmFyIHN5bWJvbERhdGFQcm9wZXJ0eSA9IG5ld1VuaXF1ZVN0cmluZygpO1xuICB2YXIgc3ltYm9sVmFsdWVzID0gJGNyZWF0ZShudWxsKTtcbiAgdmFyIHByaXZhdGVOYW1lcyA9ICRjcmVhdGUobnVsbCk7XG4gIGZ1bmN0aW9uIGNyZWF0ZVByaXZhdGVOYW1lKCkge1xuICAgIHZhciBzID0gbmV3VW5pcXVlU3RyaW5nKCk7XG4gICAgcHJpdmF0ZU5hbWVzW3NdID0gdHJ1ZTtcbiAgICByZXR1cm4gcztcbiAgfVxuICBmdW5jdGlvbiBpc1N5bWJvbChzeW1ib2wpIHtcbiAgICByZXR1cm4gdHlwZW9mIHN5bWJvbCA9PT0gJ29iamVjdCcgJiYgc3ltYm9sIGluc3RhbmNlb2YgU3ltYm9sVmFsdWU7XG4gIH1cbiAgZnVuY3Rpb24gdHlwZU9mKHYpIHtcbiAgICBpZiAoaXNTeW1ib2wodikpXG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgcmV0dXJuIHR5cGVvZiB2O1xuICB9XG4gIGZ1bmN0aW9uIFN5bWJvbChkZXNjcmlwdGlvbikge1xuICAgIHZhciB2YWx1ZSA9IG5ldyBTeW1ib2xWYWx1ZShkZXNjcmlwdGlvbik7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFN5bWJvbCkpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU3ltYm9sIGNhbm5vdCBiZSBuZXdcXCdlZCcpO1xuICB9XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2wucHJvdG90eXBlLCAnY29uc3RydWN0b3InLCBub25FbnVtKFN5bWJvbCkpO1xuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgbWV0aG9kKGZ1bmN0aW9uKCkge1xuICAgIHZhciBzeW1ib2xWYWx1ZSA9IHRoaXNbc3ltYm9sRGF0YVByb3BlcnR5XTtcbiAgICBpZiAoIWdldE9wdGlvbignc3ltYm9scycpKVxuICAgICAgcmV0dXJuIHN5bWJvbFZhbHVlW3N5bWJvbEludGVybmFsUHJvcGVydHldO1xuICAgIGlmICghc3ltYm9sVmFsdWUpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0NvbnZlcnNpb24gZnJvbSBzeW1ib2wgdG8gc3RyaW5nJyk7XG4gICAgdmFyIGRlc2MgPSBzeW1ib2xWYWx1ZVtzeW1ib2xEZXNjcmlwdGlvblByb3BlcnR5XTtcbiAgICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKVxuICAgICAgZGVzYyA9ICcnO1xuICAgIHJldHVybiAnU3ltYm9sKCcgKyBkZXNjICsgJyknO1xuICB9KSk7XG4gICRkZWZpbmVQcm9wZXJ0eShTeW1ib2wucHJvdG90eXBlLCAndmFsdWVPZicsIG1ldGhvZChmdW5jdGlvbigpIHtcbiAgICB2YXIgc3ltYm9sVmFsdWUgPSB0aGlzW3N5bWJvbERhdGFQcm9wZXJ0eV07XG4gICAgaWYgKCFzeW1ib2xWYWx1ZSlcbiAgICAgIHRocm93IFR5cGVFcnJvcignQ29udmVyc2lvbiBmcm9tIHN5bWJvbCB0byBzdHJpbmcnKTtcbiAgICBpZiAoIWdldE9wdGlvbignc3ltYm9scycpKVxuICAgICAgcmV0dXJuIHN5bWJvbFZhbHVlW3N5bWJvbEludGVybmFsUHJvcGVydHldO1xuICAgIHJldHVybiBzeW1ib2xWYWx1ZTtcbiAgfSkpO1xuICBmdW5jdGlvbiBTeW1ib2xWYWx1ZShkZXNjcmlwdGlvbikge1xuICAgIHZhciBrZXkgPSBuZXdVbmlxdWVTdHJpbmcoKTtcbiAgICAkZGVmaW5lUHJvcGVydHkodGhpcywgc3ltYm9sRGF0YVByb3BlcnR5LCB7dmFsdWU6IHRoaXN9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkodGhpcywgc3ltYm9sSW50ZXJuYWxQcm9wZXJ0eSwge3ZhbHVlOiBrZXl9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkodGhpcywgc3ltYm9sRGVzY3JpcHRpb25Qcm9wZXJ0eSwge3ZhbHVlOiBkZXNjcmlwdGlvbn0pO1xuICAgIGZyZWV6ZSh0aGlzKTtcbiAgICBzeW1ib2xWYWx1ZXNba2V5XSA9IHRoaXM7XG4gIH1cbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbFZhbHVlLnByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywgbm9uRW51bShTeW1ib2wpKTtcbiAgJGRlZmluZVByb3BlcnR5KFN5bWJvbFZhbHVlLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywge1xuICAgIHZhbHVlOiBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nLFxuICAgIGVudW1lcmFibGU6IGZhbHNlXG4gIH0pO1xuICAkZGVmaW5lUHJvcGVydHkoU3ltYm9sVmFsdWUucHJvdG90eXBlLCAndmFsdWVPZicsIHtcbiAgICB2YWx1ZTogU3ltYm9sLnByb3RvdHlwZS52YWx1ZU9mLFxuICAgIGVudW1lcmFibGU6IGZhbHNlXG4gIH0pO1xuICB2YXIgaGFzaFByb3BlcnR5ID0gY3JlYXRlUHJpdmF0ZU5hbWUoKTtcbiAgdmFyIGhhc2hQcm9wZXJ0eURlc2NyaXB0b3IgPSB7dmFsdWU6IHVuZGVmaW5lZH07XG4gIHZhciBoYXNoT2JqZWN0UHJvcGVydGllcyA9IHtcbiAgICBoYXNoOiB7dmFsdWU6IHVuZGVmaW5lZH0sXG4gICAgc2VsZjoge3ZhbHVlOiB1bmRlZmluZWR9XG4gIH07XG4gIHZhciBoYXNoQ291bnRlciA9IDA7XG4gIGZ1bmN0aW9uIGdldE93bkhhc2hPYmplY3Qob2JqZWN0KSB7XG4gICAgdmFyIGhhc2hPYmplY3QgPSBvYmplY3RbaGFzaFByb3BlcnR5XTtcbiAgICBpZiAoaGFzaE9iamVjdCAmJiBoYXNoT2JqZWN0LnNlbGYgPT09IG9iamVjdClcbiAgICAgIHJldHVybiBoYXNoT2JqZWN0O1xuICAgIGlmICgkaXNFeHRlbnNpYmxlKG9iamVjdCkpIHtcbiAgICAgIGhhc2hPYmplY3RQcm9wZXJ0aWVzLmhhc2gudmFsdWUgPSBoYXNoQ291bnRlcisrO1xuICAgICAgaGFzaE9iamVjdFByb3BlcnRpZXMuc2VsZi52YWx1ZSA9IG9iamVjdDtcbiAgICAgIGhhc2hQcm9wZXJ0eURlc2NyaXB0b3IudmFsdWUgPSAkY3JlYXRlKG51bGwsIGhhc2hPYmplY3RQcm9wZXJ0aWVzKTtcbiAgICAgICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIGhhc2hQcm9wZXJ0eSwgaGFzaFByb3BlcnR5RGVzY3JpcHRvcik7XG4gICAgICByZXR1cm4gaGFzaFByb3BlcnR5RGVzY3JpcHRvci52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBmcmVlemUob2JqZWN0KSB7XG4gICAgZ2V0T3duSGFzaE9iamVjdChvYmplY3QpO1xuICAgIHJldHVybiAkZnJlZXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbiAgZnVuY3Rpb24gcHJldmVudEV4dGVuc2lvbnMob2JqZWN0KSB7XG4gICAgZ2V0T3duSGFzaE9iamVjdChvYmplY3QpO1xuICAgIHJldHVybiAkcHJldmVudEV4dGVuc2lvbnMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuICBmdW5jdGlvbiBzZWFsKG9iamVjdCkge1xuICAgIGdldE93bkhhc2hPYmplY3Qob2JqZWN0KTtcbiAgICByZXR1cm4gJHNlYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuICBTeW1ib2wuaXRlcmF0b3IgPSBTeW1ib2woKTtcbiAgZnJlZXplKFN5bWJvbFZhbHVlLnByb3RvdHlwZSk7XG4gIGZ1bmN0aW9uIHRvUHJvcGVydHkobmFtZSkge1xuICAgIGlmIChpc1N5bWJvbChuYW1lKSlcbiAgICAgIHJldHVybiBuYW1lW3N5bWJvbEludGVybmFsUHJvcGVydHldO1xuICAgIHJldHVybiBuYW1lO1xuICB9XG4gIGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KSB7XG4gICAgdmFyIHJ2ID0gW107XG4gICAgdmFyIG5hbWVzID0gJGdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgaWYgKCFzeW1ib2xWYWx1ZXNbbmFtZV0gJiYgIXByaXZhdGVOYW1lc1tuYW1lXSlcbiAgICAgICAgcnYucHVzaChuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHJ2O1xuICB9XG4gIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIG5hbWUpIHtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHRvUHJvcGVydHkobmFtZSkpO1xuICB9XG4gIGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpIHtcbiAgICB2YXIgcnYgPSBbXTtcbiAgICB2YXIgbmFtZXMgPSAkZ2V0T3duUHJvcGVydHlOYW1lcyhvYmplY3QpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzeW1ib2wgPSBzeW1ib2xWYWx1ZXNbbmFtZXNbaV1dO1xuICAgICAgaWYgKHN5bWJvbClcbiAgICAgICAgcnYucHVzaChzeW1ib2wpO1xuICAgIH1cbiAgICByZXR1cm4gcnY7XG4gIH1cbiAgZnVuY3Rpb24gaGFzT3duUHJvcGVydHkobmFtZSkge1xuICAgIHJldHVybiAkaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCB0b1Byb3BlcnR5KG5hbWUpKTtcbiAgfVxuICBmdW5jdGlvbiBnZXRPcHRpb24obmFtZSkge1xuICAgIHJldHVybiBnbG9iYWwudHJhY2V1ciAmJiBnbG9iYWwudHJhY2V1ci5vcHRpb25zW25hbWVdO1xuICB9XG4gIGZ1bmN0aW9uIHNldFByb3BlcnR5KG9iamVjdCwgbmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgc3ltLFxuICAgICAgICBkZXNjO1xuICAgIGlmIChpc1N5bWJvbChuYW1lKSkge1xuICAgICAgc3ltID0gbmFtZTtcbiAgICAgIG5hbWUgPSBuYW1lW3N5bWJvbEludGVybmFsUHJvcGVydHldO1xuICAgIH1cbiAgICBvYmplY3RbbmFtZV0gPSB2YWx1ZTtcbiAgICBpZiAoc3ltICYmIChkZXNjID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIG5hbWUpKSlcbiAgICAgICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtlbnVtZXJhYmxlOiBmYWxzZX0pO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgICBpZiAoaXNTeW1ib2wobmFtZSkpIHtcbiAgICAgIGlmIChkZXNjcmlwdG9yLmVudW1lcmFibGUpIHtcbiAgICAgICAgZGVzY3JpcHRvciA9ICRjcmVhdGUoZGVzY3JpcHRvciwge2VudW1lcmFibGU6IHt2YWx1ZTogZmFsc2V9fSk7XG4gICAgICB9XG4gICAgICBuYW1lID0gbmFtZVtzeW1ib2xJbnRlcm5hbFByb3BlcnR5XTtcbiAgICB9XG4gICAgJGRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwgZGVzY3JpcHRvcik7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbE9iamVjdChPYmplY3QpIHtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnZGVmaW5lUHJvcGVydHknLCB7dmFsdWU6IGRlZmluZVByb3BlcnR5fSk7XG4gICAgJGRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2dldE93blByb3BlcnR5TmFtZXMnLCB7dmFsdWU6IGdldE93blByb3BlcnR5TmFtZXN9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJywge3ZhbHVlOiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3J9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ2hhc093blByb3BlcnR5Jywge3ZhbHVlOiBoYXNPd25Qcm9wZXJ0eX0pO1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QsICdmcmVlemUnLCB7dmFsdWU6IGZyZWV6ZX0pO1xuICAgICRkZWZpbmVQcm9wZXJ0eShPYmplY3QsICdwcmV2ZW50RXh0ZW5zaW9ucycsIHt2YWx1ZTogcHJldmVudEV4dGVuc2lvbnN9KTtcbiAgICAkZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnc2VhbCcsIHt2YWx1ZTogc2VhbH0pO1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4gIH1cbiAgZnVuY3Rpb24gZXhwb3J0U3RhcihvYmplY3QpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5hbWVzID0gJGdldE93blByb3BlcnR5TmFtZXMoYXJndW1lbnRzW2ldKTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbmFtZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdmFyIG5hbWUgPSBuYW1lc1tqXTtcbiAgICAgICAgaWYgKHByaXZhdGVOYW1lc1tuYW1lXSlcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgKGZ1bmN0aW9uKG1vZCwgbmFtZSkge1xuICAgICAgICAgICRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBtb2RbbmFtZV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KShhcmd1bWVudHNbaV0sIG5hbWVzW2pdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gICAgcmV0dXJuIHggIT0gbnVsbCAmJiAodHlwZW9mIHggPT09ICdvYmplY3QnIHx8IHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nKTtcbiAgfVxuICBmdW5jdGlvbiB0b09iamVjdCh4KSB7XG4gICAgaWYgKHggPT0gbnVsbClcbiAgICAgIHRocm93ICRUeXBlRXJyb3IoKTtcbiAgICByZXR1cm4gJE9iamVjdCh4KTtcbiAgfVxuICBmdW5jdGlvbiBjaGVja09iamVjdENvZXJjaWJsZShhcmd1bWVudCkge1xuICAgIGlmIChhcmd1bWVudCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBjYW5ub3QgYmUgY29udmVydGVkIHRvIGFuIE9iamVjdCcpO1xuICAgIH1cbiAgICByZXR1cm4gYXJndW1lbnQ7XG4gIH1cbiAgZnVuY3Rpb24gc2V0dXBHbG9iYWxzKGdsb2JhbCkge1xuICAgIGdsb2JhbC5TeW1ib2wgPSBTeW1ib2w7XG4gICAgZ2xvYmFsLlJlZmxlY3QgPSBnbG9iYWwuUmVmbGVjdCB8fCB7fTtcbiAgICBnbG9iYWwuUmVmbGVjdC5nbG9iYWwgPSBnbG9iYWwuUmVmbGVjdC5nbG9iYWwgfHwgZ2xvYmFsO1xuICAgIHBvbHlmaWxsT2JqZWN0KGdsb2JhbC5PYmplY3QpO1xuICB9XG4gIHNldHVwR2xvYmFscyhnbG9iYWwpO1xuICBnbG9iYWwuJHRyYWNldXJSdW50aW1lID0ge1xuICAgIGNyZWF0ZVByaXZhdGVOYW1lOiBjcmVhdGVQcml2YXRlTmFtZSxcbiAgICBleHBvcnRTdGFyOiBleHBvcnRTdGFyLFxuICAgIGdldE93bkhhc2hPYmplY3Q6IGdldE93bkhhc2hPYmplY3QsXG4gICAgcHJpdmF0ZU5hbWVzOiBwcml2YXRlTmFtZXMsXG4gICAgc2V0UHJvcGVydHk6IHNldFByb3BlcnR5LFxuICAgIHNldHVwR2xvYmFsczogc2V0dXBHbG9iYWxzLFxuICAgIHRvT2JqZWN0OiB0b09iamVjdCxcbiAgICBpc09iamVjdDogaXNPYmplY3QsXG4gICAgdG9Qcm9wZXJ0eTogdG9Qcm9wZXJ0eSxcbiAgICB0eXBlOiB0eXBlcyxcbiAgICB0eXBlb2Y6IHR5cGVPZixcbiAgICBjaGVja09iamVjdENvZXJjaWJsZTogY2hlY2tPYmplY3RDb2VyY2libGUsXG4gICAgaGFzT3duUHJvcGVydHk6IGZ1bmN0aW9uKG8sIHApIHtcbiAgICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApO1xuICAgIH0sXG4gICAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gICAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gICAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gICAga2V5czogJGtleXNcbiAgfTtcbn0pKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdGhpcyk7XG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgZnVuY3Rpb24gc3ByZWFkKCkge1xuICAgIHZhciBydiA9IFtdLFxuICAgICAgICBqID0gMCxcbiAgICAgICAgaXRlclJlc3VsdDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlVG9TcHJlYWQgPSAkdHJhY2V1clJ1bnRpbWUuY2hlY2tPYmplY3RDb2VyY2libGUoYXJndW1lbnRzW2ldKTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWVUb1NwcmVhZFskdHJhY2V1clJ1bnRpbWUudG9Qcm9wZXJ0eShTeW1ib2wuaXRlcmF0b3IpXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3Qgc3ByZWFkIG5vbi1pdGVyYWJsZSBvYmplY3QuJyk7XG4gICAgICB9XG4gICAgICB2YXIgaXRlciA9IHZhbHVlVG9TcHJlYWRbJHRyYWNldXJSdW50aW1lLnRvUHJvcGVydHkoU3ltYm9sLml0ZXJhdG9yKV0oKTtcbiAgICAgIHdoaWxlICghKGl0ZXJSZXN1bHQgPSBpdGVyLm5leHQoKSkuZG9uZSkge1xuICAgICAgICBydltqKytdID0gaXRlclJlc3VsdC52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJ2O1xuICB9XG4gICR0cmFjZXVyUnVudGltZS5zcHJlYWQgPSBzcHJlYWQ7XG59KSgpO1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciAkT2JqZWN0ID0gT2JqZWN0O1xuICB2YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbiAgdmFyICRjcmVhdGUgPSAkT2JqZWN0LmNyZWF0ZTtcbiAgdmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gJHRyYWNldXJSdW50aW1lLmRlZmluZVByb3BlcnRpZXM7XG4gIHZhciAkZGVmaW5lUHJvcGVydHkgPSAkdHJhY2V1clJ1bnRpbWUuZGVmaW5lUHJvcGVydHk7XG4gIHZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gJHRyYWNldXJSdW50aW1lLmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgdmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gJHRyYWNldXJSdW50aW1lLmdldE93blByb3BlcnR5TmFtZXM7XG4gIHZhciAkZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIGZ1bmN0aW9uIHN1cGVyRGVzY3JpcHRvcihob21lT2JqZWN0LCBuYW1lKSB7XG4gICAgdmFyIHByb3RvID0gJGdldFByb3RvdHlwZU9mKGhvbWVPYmplY3QpO1xuICAgIGRvIHtcbiAgICAgIHZhciByZXN1bHQgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBuYW1lKTtcbiAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICBwcm90byA9ICRnZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgfSB3aGlsZSAocHJvdG8pO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgZnVuY3Rpb24gc3VwZXJDYWxsKHNlbGYsIGhvbWVPYmplY3QsIG5hbWUsIGFyZ3MpIHtcbiAgICByZXR1cm4gc3VwZXJHZXQoc2VsZiwgaG9tZU9iamVjdCwgbmFtZSkuYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cbiAgZnVuY3Rpb24gc3VwZXJHZXQoc2VsZiwgaG9tZU9iamVjdCwgbmFtZSkge1xuICAgIHZhciBkZXNjcmlwdG9yID0gc3VwZXJEZXNjcmlwdG9yKGhvbWVPYmplY3QsIG5hbWUpO1xuICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICBpZiAoIWRlc2NyaXB0b3IuZ2V0KVxuICAgICAgICByZXR1cm4gZGVzY3JpcHRvci52YWx1ZTtcbiAgICAgIHJldHVybiBkZXNjcmlwdG9yLmdldC5jYWxsKHNlbGYpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIHN1cGVyU2V0KHNlbGYsIGhvbWVPYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBzdXBlckRlc2NyaXB0b3IoaG9tZU9iamVjdCwgbmFtZSk7XG4gICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0LmNhbGwoc2VsZiwgdmFsdWUpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICB0aHJvdyAkVHlwZUVycm9yKFwic3VwZXIgaGFzIG5vIHNldHRlciAnXCIgKyBuYW1lICsgXCInLlwiKTtcbiAgfVxuICBmdW5jdGlvbiBnZXREZXNjcmlwdG9ycyhvYmplY3QpIHtcbiAgICB2YXIgZGVzY3JpcHRvcnMgPSB7fSxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbmFtZXMgPSAkZ2V0T3duUHJvcGVydHlOYW1lcyhvYmplY3QpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBuYW1lID0gbmFtZXNbaV07XG4gICAgICBkZXNjcmlwdG9yc1tuYW1lXSA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc2NyaXB0b3JzO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzKGN0b3IsIG9iamVjdCwgc3RhdGljT2JqZWN0LCBzdXBlckNsYXNzKSB7XG4gICAgJGRlZmluZVByb3BlcnR5KG9iamVjdCwgJ2NvbnN0cnVjdG9yJywge1xuICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAzKSB7XG4gICAgICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgPT09ICdmdW5jdGlvbicpXG4gICAgICAgIGN0b3IuX19wcm90b19fID0gc3VwZXJDbGFzcztcbiAgICAgIGN0b3IucHJvdG90eXBlID0gJGNyZWF0ZShnZXRQcm90b1BhcmVudChzdXBlckNsYXNzKSwgZ2V0RGVzY3JpcHRvcnMob2JqZWN0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0b3IucHJvdG90eXBlID0gb2JqZWN0O1xuICAgIH1cbiAgICAkZGVmaW5lUHJvcGVydHkoY3RvciwgJ3Byb3RvdHlwZScsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gJGRlZmluZVByb3BlcnRpZXMoY3RvciwgZ2V0RGVzY3JpcHRvcnMoc3RhdGljT2JqZWN0KSk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0UHJvdG9QYXJlbnQoc3VwZXJDbGFzcykge1xuICAgIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIHByb3RvdHlwZSA9IHN1cGVyQ2xhc3MucHJvdG90eXBlO1xuICAgICAgaWYgKCRPYmplY3QocHJvdG90eXBlKSA9PT0gcHJvdG90eXBlIHx8IHByb3RvdHlwZSA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIHN1cGVyQ2xhc3MucHJvdG90eXBlO1xuICAgICAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoJ3N1cGVyIHByb3RvdHlwZSBtdXN0IGJlIGFuIE9iamVjdCBvciBudWxsJyk7XG4gICAgfVxuICAgIGlmIChzdXBlckNsYXNzID09PSBudWxsKVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzICsgXCIuXCIpKTtcbiAgfVxuICBmdW5jdGlvbiBkZWZhdWx0U3VwZXJDYWxsKHNlbGYsIGhvbWVPYmplY3QsIGFyZ3MpIHtcbiAgICBpZiAoJGdldFByb3RvdHlwZU9mKGhvbWVPYmplY3QpICE9PSBudWxsKVxuICAgICAgc3VwZXJDYWxsKHNlbGYsIGhvbWVPYmplY3QsICdjb25zdHJ1Y3RvcicsIGFyZ3MpO1xuICB9XG4gICR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcyA9IGNyZWF0ZUNsYXNzO1xuICAkdHJhY2V1clJ1bnRpbWUuZGVmYXVsdFN1cGVyQ2FsbCA9IGRlZmF1bHRTdXBlckNhbGw7XG4gICR0cmFjZXVyUnVudGltZS5zdXBlckNhbGwgPSBzdXBlckNhbGw7XG4gICR0cmFjZXVyUnVudGltZS5zdXBlckdldCA9IHN1cGVyR2V0O1xuICAkdHJhY2V1clJ1bnRpbWUuc3VwZXJTZXQgPSBzdXBlclNldDtcbn0pKCk7XG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIGNyZWF0ZVByaXZhdGVOYW1lID0gJHRyYWNldXJSdW50aW1lLmNyZWF0ZVByaXZhdGVOYW1lO1xuICB2YXIgJGRlZmluZVByb3BlcnRpZXMgPSAkdHJhY2V1clJ1bnRpbWUuZGVmaW5lUHJvcGVydGllcztcbiAgdmFyICRkZWZpbmVQcm9wZXJ0eSA9ICR0cmFjZXVyUnVudGltZS5kZWZpbmVQcm9wZXJ0eTtcbiAgdmFyICRjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuICB2YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbiAgZnVuY3Rpb24gbm9uRW51bSh2YWx1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfTtcbiAgfVxuICB2YXIgU1RfTkVXQk9STiA9IDA7XG4gIHZhciBTVF9FWEVDVVRJTkcgPSAxO1xuICB2YXIgU1RfU1VTUEVOREVEID0gMjtcbiAgdmFyIFNUX0NMT1NFRCA9IDM7XG4gIHZhciBFTkRfU1RBVEUgPSAtMjtcbiAgdmFyIFJFVEhST1dfU1RBVEUgPSAtMztcbiAgZnVuY3Rpb24gZ2V0SW50ZXJuYWxFcnJvcihzdGF0ZSkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoJ1RyYWNldXIgY29tcGlsZXIgYnVnOiBpbnZhbGlkIHN0YXRlIGluIHN0YXRlIG1hY2hpbmU6ICcgKyBzdGF0ZSk7XG4gIH1cbiAgZnVuY3Rpb24gR2VuZXJhdG9yQ29udGV4dCgpIHtcbiAgICB0aGlzLnN0YXRlID0gMDtcbiAgICB0aGlzLkdTdGF0ZSA9IFNUX05FV0JPUk47XG4gICAgdGhpcy5zdG9yZWRFeGNlcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5maW5hbGx5RmFsbFRocm91Z2ggPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zZW50XyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnJldHVyblZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudHJ5U3RhY2tfID0gW107XG4gIH1cbiAgR2VuZXJhdG9yQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgcHVzaFRyeTogZnVuY3Rpb24oY2F0Y2hTdGF0ZSwgZmluYWxseVN0YXRlKSB7XG4gICAgICBpZiAoZmluYWxseVN0YXRlICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBmaW5hbGx5RmFsbFRocm91Z2ggPSBudWxsO1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlTdGFja18ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAodGhpcy50cnlTdGFja19baV0uY2F0Y2ggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZmluYWxseUZhbGxUaHJvdWdoID0gdGhpcy50cnlTdGFja19baV0uY2F0Y2g7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbmFsbHlGYWxsVGhyb3VnaCA9PT0gbnVsbClcbiAgICAgICAgICBmaW5hbGx5RmFsbFRocm91Z2ggPSBSRVRIUk9XX1NUQVRFO1xuICAgICAgICB0aGlzLnRyeVN0YWNrXy5wdXNoKHtcbiAgICAgICAgICBmaW5hbGx5OiBmaW5hbGx5U3RhdGUsXG4gICAgICAgICAgZmluYWxseUZhbGxUaHJvdWdoOiBmaW5hbGx5RmFsbFRocm91Z2hcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoY2F0Y2hTdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnRyeVN0YWNrXy5wdXNoKHtjYXRjaDogY2F0Y2hTdGF0ZX0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgcG9wVHJ5OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMudHJ5U3RhY2tfLnBvcCgpO1xuICAgIH0sXG4gICAgZ2V0IHNlbnQoKSB7XG4gICAgICB0aGlzLm1heWJlVGhyb3coKTtcbiAgICAgIHJldHVybiB0aGlzLnNlbnRfO1xuICAgIH0sXG4gICAgc2V0IHNlbnQodikge1xuICAgICAgdGhpcy5zZW50XyA9IHY7XG4gICAgfSxcbiAgICBnZXQgc2VudElnbm9yZVRocm93KCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2VudF87XG4gICAgfSxcbiAgICBtYXliZVRocm93OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmFjdGlvbiA9PT0gJ3Rocm93Jykge1xuICAgICAgICB0aGlzLmFjdGlvbiA9ICduZXh0JztcbiAgICAgICAgdGhyb3cgdGhpcy5zZW50XztcbiAgICAgIH1cbiAgICB9LFxuICAgIGVuZDogZnVuY3Rpb24oKSB7XG4gICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgY2FzZSBFTkRfU1RBVEU6XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGNhc2UgUkVUSFJPV19TVEFURTpcbiAgICAgICAgICB0aHJvdyB0aGlzLnN0b3JlZEV4Y2VwdGlvbjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBnZXRJbnRlcm5hbEVycm9yKHRoaXMuc3RhdGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlRXhjZXB0aW9uOiBmdW5jdGlvbihleCkge1xuICAgICAgdGhpcy5HU3RhdGUgPSBTVF9DTE9TRUQ7XG4gICAgICB0aGlzLnN0YXRlID0gRU5EX1NUQVRFO1xuICAgICAgdGhyb3cgZXg7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBuZXh0T3JUaHJvdyhjdHgsIG1vdmVOZXh0LCBhY3Rpb24sIHgpIHtcbiAgICBzd2l0Y2ggKGN0eC5HU3RhdGUpIHtcbiAgICAgIGNhc2UgU1RfRVhFQ1VUSU5HOlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKFwiXFxcIlwiICsgYWN0aW9uICsgXCJcXFwiIG9uIGV4ZWN1dGluZyBnZW5lcmF0b3JcIikpO1xuICAgICAgY2FzZSBTVF9DTE9TRUQ6XG4gICAgICAgIGlmIChhY3Rpb24gPT0gJ25leHQnKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBkb25lOiB0cnVlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyB4O1xuICAgICAgY2FzZSBTVF9ORVdCT1JOOlxuICAgICAgICBpZiAoYWN0aW9uID09PSAndGhyb3cnKSB7XG4gICAgICAgICAgY3R4LkdTdGF0ZSA9IFNUX0NMT1NFRDtcbiAgICAgICAgICB0aHJvdyB4O1xuICAgICAgICB9XG4gICAgICAgIGlmICh4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhyb3cgJFR5cGVFcnJvcignU2VudCB2YWx1ZSB0byBuZXdib3JuIGdlbmVyYXRvcicpO1xuICAgICAgY2FzZSBTVF9TVVNQRU5ERUQ6XG4gICAgICAgIGN0eC5HU3RhdGUgPSBTVF9FWEVDVVRJTkc7XG4gICAgICAgIGN0eC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIGN0eC5zZW50ID0geDtcbiAgICAgICAgdmFyIHZhbHVlID0gbW92ZU5leHQoY3R4KTtcbiAgICAgICAgdmFyIGRvbmUgPSB2YWx1ZSA9PT0gY3R4O1xuICAgICAgICBpZiAoZG9uZSlcbiAgICAgICAgICB2YWx1ZSA9IGN0eC5yZXR1cm5WYWx1ZTtcbiAgICAgICAgY3R4LkdTdGF0ZSA9IGRvbmUgPyBTVF9DTE9TRUQgOiBTVF9TVVNQRU5ERUQ7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgIGRvbmU6IGRvbmVcbiAgICAgICAgfTtcbiAgICB9XG4gIH1cbiAgdmFyIGN0eE5hbWUgPSBjcmVhdGVQcml2YXRlTmFtZSgpO1xuICB2YXIgbW92ZU5leHROYW1lID0gY3JlYXRlUHJpdmF0ZU5hbWUoKTtcbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAkZGVmaW5lUHJvcGVydHkoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIG5vbkVudW0oR2VuZXJhdG9yRnVuY3Rpb24pKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICBuZXh0OiBmdW5jdGlvbih2KSB7XG4gICAgICByZXR1cm4gbmV4dE9yVGhyb3codGhpc1tjdHhOYW1lXSwgdGhpc1ttb3ZlTmV4dE5hbWVdLCAnbmV4dCcsIHYpO1xuICAgIH0sXG4gICAgdGhyb3c6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHJldHVybiBuZXh0T3JUaHJvdyh0aGlzW2N0eE5hbWVdLCB0aGlzW21vdmVOZXh0TmFtZV0sICd0aHJvdycsIHYpO1xuICAgIH1cbiAgfTtcbiAgJGRlZmluZVByb3BlcnRpZXMoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtlbnVtZXJhYmxlOiBmYWxzZX0sXG4gICAgbmV4dDoge2VudW1lcmFibGU6IGZhbHNlfSxcbiAgICB0aHJvdzoge2VudW1lcmFibGU6IGZhbHNlfVxuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSwgU3ltYm9sLml0ZXJhdG9yLCBub25FbnVtKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSk7XG4gIGZ1bmN0aW9uIGNyZWF0ZUdlbmVyYXRvckluc3RhbmNlKGlubmVyRnVuY3Rpb24sIGZ1bmN0aW9uT2JqZWN0LCBzZWxmKSB7XG4gICAgdmFyIG1vdmVOZXh0ID0gZ2V0TW92ZU5leHQoaW5uZXJGdW5jdGlvbiwgc2VsZik7XG4gICAgdmFyIGN0eCA9IG5ldyBHZW5lcmF0b3JDb250ZXh0KCk7XG4gICAgdmFyIG9iamVjdCA9ICRjcmVhdGUoZnVuY3Rpb25PYmplY3QucHJvdG90eXBlKTtcbiAgICBvYmplY3RbY3R4TmFtZV0gPSBjdHg7XG4gICAgb2JqZWN0W21vdmVOZXh0TmFtZV0gPSBtb3ZlTmV4dDtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIGZ1bmN0aW9uIGluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbk9iamVjdCkge1xuICAgIGZ1bmN0aW9uT2JqZWN0LnByb3RvdHlwZSA9ICRjcmVhdGUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlKTtcbiAgICBmdW5jdGlvbk9iamVjdC5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICByZXR1cm4gZnVuY3Rpb25PYmplY3Q7XG4gIH1cbiAgZnVuY3Rpb24gQXN5bmNGdW5jdGlvbkNvbnRleHQoKSB7XG4gICAgR2VuZXJhdG9yQ29udGV4dC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuZXJyID0gdW5kZWZpbmVkO1xuICAgIHZhciBjdHggPSB0aGlzO1xuICAgIGN0eC5yZXN1bHQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGN0eC5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIGN0eC5yZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG4gIH1cbiAgQXN5bmNGdW5jdGlvbkNvbnRleHQucHJvdG90eXBlID0gJGNyZWF0ZShHZW5lcmF0b3JDb250ZXh0LnByb3RvdHlwZSk7XG4gIEFzeW5jRnVuY3Rpb25Db250ZXh0LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbigpIHtcbiAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgIGNhc2UgRU5EX1NUQVRFOlxuICAgICAgICB0aGlzLnJlc29sdmUodGhpcy5yZXR1cm5WYWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBSRVRIUk9XX1NUQVRFOlxuICAgICAgICB0aGlzLnJlamVjdCh0aGlzLnN0b3JlZEV4Y2VwdGlvbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5yZWplY3QoZ2V0SW50ZXJuYWxFcnJvcih0aGlzLnN0YXRlKSk7XG4gICAgfVxuICB9O1xuICBBc3luY0Z1bmN0aW9uQ29udGV4dC5wcm90b3R5cGUuaGFuZGxlRXhjZXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdGF0ZSA9IFJFVEhST1dfU1RBVEU7XG4gIH07XG4gIGZ1bmN0aW9uIGFzeW5jV3JhcChpbm5lckZ1bmN0aW9uLCBzZWxmKSB7XG4gICAgdmFyIG1vdmVOZXh0ID0gZ2V0TW92ZU5leHQoaW5uZXJGdW5jdGlvbiwgc2VsZik7XG4gICAgdmFyIGN0eCA9IG5ldyBBc3luY0Z1bmN0aW9uQ29udGV4dCgpO1xuICAgIGN0eC5jcmVhdGVDYWxsYmFjayA9IGZ1bmN0aW9uKG5ld1N0YXRlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgY3R4LnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgIGN0eC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBtb3ZlTmV4dChjdHgpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIGN0eC5lcnJiYWNrID0gZnVuY3Rpb24oZXJyKSB7XG4gICAgICBoYW5kbGVDYXRjaChjdHgsIGVycik7XG4gICAgICBtb3ZlTmV4dChjdHgpO1xuICAgIH07XG4gICAgbW92ZU5leHQoY3R4KTtcbiAgICByZXR1cm4gY3R4LnJlc3VsdDtcbiAgfVxuICBmdW5jdGlvbiBnZXRNb3ZlTmV4dChpbm5lckZ1bmN0aW9uLCBzZWxmKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGN0eCkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gaW5uZXJGdW5jdGlvbi5jYWxsKHNlbGYsIGN0eCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgaGFuZGxlQ2F0Y2goY3R4LCBleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZUNhdGNoKGN0eCwgZXgpIHtcbiAgICBjdHguc3RvcmVkRXhjZXB0aW9uID0gZXg7XG4gICAgdmFyIGxhc3QgPSBjdHgudHJ5U3RhY2tfW2N0eC50cnlTdGFja18ubGVuZ3RoIC0gMV07XG4gICAgaWYgKCFsYXN0KSB7XG4gICAgICBjdHguaGFuZGxlRXhjZXB0aW9uKGV4KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY3R4LnN0YXRlID0gbGFzdC5jYXRjaCAhPT0gdW5kZWZpbmVkID8gbGFzdC5jYXRjaCA6IGxhc3QuZmluYWxseTtcbiAgICBpZiAobGFzdC5maW5hbGx5RmFsbFRocm91Z2ggIT09IHVuZGVmaW5lZClcbiAgICAgIGN0eC5maW5hbGx5RmFsbFRocm91Z2ggPSBsYXN0LmZpbmFsbHlGYWxsVGhyb3VnaDtcbiAgfVxuICAkdHJhY2V1clJ1bnRpbWUuYXN5bmNXcmFwID0gYXN5bmNXcmFwO1xuICAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uID0gaW5pdEdlbmVyYXRvckZ1bmN0aW9uO1xuICAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UgPSBjcmVhdGVHZW5lcmF0b3JJbnN0YW5jZTtcbn0pKCk7XG4oZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIGJ1aWxkRnJvbUVuY29kZWRQYXJ0cyhvcHRfc2NoZW1lLCBvcHRfdXNlckluZm8sIG9wdF9kb21haW4sIG9wdF9wb3J0LCBvcHRfcGF0aCwgb3B0X3F1ZXJ5RGF0YSwgb3B0X2ZyYWdtZW50KSB7XG4gICAgdmFyIG91dCA9IFtdO1xuICAgIGlmIChvcHRfc2NoZW1lKSB7XG4gICAgICBvdXQucHVzaChvcHRfc2NoZW1lLCAnOicpO1xuICAgIH1cbiAgICBpZiAob3B0X2RvbWFpbikge1xuICAgICAgb3V0LnB1c2goJy8vJyk7XG4gICAgICBpZiAob3B0X3VzZXJJbmZvKSB7XG4gICAgICAgIG91dC5wdXNoKG9wdF91c2VySW5mbywgJ0AnKTtcbiAgICAgIH1cbiAgICAgIG91dC5wdXNoKG9wdF9kb21haW4pO1xuICAgICAgaWYgKG9wdF9wb3J0KSB7XG4gICAgICAgIG91dC5wdXNoKCc6Jywgb3B0X3BvcnQpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0X3BhdGgpIHtcbiAgICAgIG91dC5wdXNoKG9wdF9wYXRoKTtcbiAgICB9XG4gICAgaWYgKG9wdF9xdWVyeURhdGEpIHtcbiAgICAgIG91dC5wdXNoKCc/Jywgb3B0X3F1ZXJ5RGF0YSk7XG4gICAgfVxuICAgIGlmIChvcHRfZnJhZ21lbnQpIHtcbiAgICAgIG91dC5wdXNoKCcjJywgb3B0X2ZyYWdtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dC5qb2luKCcnKTtcbiAgfVxuICA7XG4gIHZhciBzcGxpdFJlID0gbmV3IFJlZ0V4cCgnXicgKyAnKD86JyArICcoW146Lz8jLl0rKScgKyAnOik/JyArICcoPzovLycgKyAnKD86KFteLz8jXSopQCk/JyArICcoW1xcXFx3XFxcXGRcXFxcLVxcXFx1MDEwMC1cXFxcdWZmZmYuJV0qKScgKyAnKD86OihbMC05XSspKT8nICsgJyk/JyArICcoW14/I10rKT8nICsgJyg/OlxcXFw/KFteI10qKSk/JyArICcoPzojKC4qKSk/JyArICckJyk7XG4gIHZhciBDb21wb25lbnRJbmRleCA9IHtcbiAgICBTQ0hFTUU6IDEsXG4gICAgVVNFUl9JTkZPOiAyLFxuICAgIERPTUFJTjogMyxcbiAgICBQT1JUOiA0LFxuICAgIFBBVEg6IDUsXG4gICAgUVVFUllfREFUQTogNixcbiAgICBGUkFHTUVOVDogN1xuICB9O1xuICBmdW5jdGlvbiBzcGxpdCh1cmkpIHtcbiAgICByZXR1cm4gKHVyaS5tYXRjaChzcGxpdFJlKSk7XG4gIH1cbiAgZnVuY3Rpb24gcmVtb3ZlRG90U2VnbWVudHMocGF0aCkge1xuICAgIGlmIChwYXRoID09PSAnLycpXG4gICAgICByZXR1cm4gJy8nO1xuICAgIHZhciBsZWFkaW5nU2xhc2ggPSBwYXRoWzBdID09PSAnLycgPyAnLycgOiAnJztcbiAgICB2YXIgdHJhaWxpbmdTbGFzaCA9IHBhdGguc2xpY2UoLTEpID09PSAnLycgPyAnLycgOiAnJztcbiAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnNwbGl0KCcvJyk7XG4gICAgdmFyIG91dCA9IFtdO1xuICAgIHZhciB1cCA9IDA7XG4gICAgZm9yICh2YXIgcG9zID0gMDsgcG9zIDwgc2VnbWVudHMubGVuZ3RoOyBwb3MrKykge1xuICAgICAgdmFyIHNlZ21lbnQgPSBzZWdtZW50c1twb3NdO1xuICAgICAgc3dpdGNoIChzZWdtZW50KSB7XG4gICAgICAgIGNhc2UgJyc6XG4gICAgICAgIGNhc2UgJy4nOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcuLic6XG4gICAgICAgICAgaWYgKG91dC5sZW5ndGgpXG4gICAgICAgICAgICBvdXQucG9wKCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgdXArKztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBvdXQucHVzaChzZWdtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFsZWFkaW5nU2xhc2gpIHtcbiAgICAgIHdoaWxlICh1cC0tID4gMCkge1xuICAgICAgICBvdXQudW5zaGlmdCgnLi4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChvdXQubGVuZ3RoID09PSAwKVxuICAgICAgICBvdXQucHVzaCgnLicpO1xuICAgIH1cbiAgICByZXR1cm4gbGVhZGluZ1NsYXNoICsgb3V0LmpvaW4oJy8nKSArIHRyYWlsaW5nU2xhc2g7XG4gIH1cbiAgZnVuY3Rpb24gam9pbkFuZENhbm9uaWNhbGl6ZVBhdGgocGFydHMpIHtcbiAgICB2YXIgcGF0aCA9IHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdIHx8ICcnO1xuICAgIHBhdGggPSByZW1vdmVEb3RTZWdtZW50cyhwYXRoKTtcbiAgICBwYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXSA9IHBhdGg7XG4gICAgcmV0dXJuIGJ1aWxkRnJvbUVuY29kZWRQYXJ0cyhwYXJ0c1tDb21wb25lbnRJbmRleC5TQ0hFTUVdLCBwYXJ0c1tDb21wb25lbnRJbmRleC5VU0VSX0lORk9dLCBwYXJ0c1tDb21wb25lbnRJbmRleC5ET01BSU5dLCBwYXJ0c1tDb21wb25lbnRJbmRleC5QT1JUXSwgcGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF0sIHBhcnRzW0NvbXBvbmVudEluZGV4LlFVRVJZX0RBVEFdLCBwYXJ0c1tDb21wb25lbnRJbmRleC5GUkFHTUVOVF0pO1xuICB9XG4gIGZ1bmN0aW9uIGNhbm9uaWNhbGl6ZVVybCh1cmwpIHtcbiAgICB2YXIgcGFydHMgPSBzcGxpdCh1cmwpO1xuICAgIHJldHVybiBqb2luQW5kQ2Fub25pY2FsaXplUGF0aChwYXJ0cyk7XG4gIH1cbiAgZnVuY3Rpb24gcmVzb2x2ZVVybChiYXNlLCB1cmwpIHtcbiAgICB2YXIgcGFydHMgPSBzcGxpdCh1cmwpO1xuICAgIHZhciBiYXNlUGFydHMgPSBzcGxpdChiYXNlKTtcbiAgICBpZiAocGFydHNbQ29tcG9uZW50SW5kZXguU0NIRU1FXSkge1xuICAgICAgcmV0dXJuIGpvaW5BbmRDYW5vbmljYWxpemVQYXRoKHBhcnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydHNbQ29tcG9uZW50SW5kZXguU0NIRU1FXSA9IGJhc2VQYXJ0c1tDb21wb25lbnRJbmRleC5TQ0hFTUVdO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gQ29tcG9uZW50SW5kZXguU0NIRU1FOyBpIDw9IENvbXBvbmVudEluZGV4LlBPUlQ7IGkrKykge1xuICAgICAgaWYgKCFwYXJ0c1tpXSkge1xuICAgICAgICBwYXJ0c1tpXSA9IGJhc2VQYXJ0c1tpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhcnRzW0NvbXBvbmVudEluZGV4LlBBVEhdWzBdID09ICcvJykge1xuICAgICAgcmV0dXJuIGpvaW5BbmRDYW5vbmljYWxpemVQYXRoKHBhcnRzKTtcbiAgICB9XG4gICAgdmFyIHBhdGggPSBiYXNlUGFydHNbQ29tcG9uZW50SW5kZXguUEFUSF07XG4gICAgdmFyIGluZGV4ID0gcGF0aC5sYXN0SW5kZXhPZignLycpO1xuICAgIHBhdGggPSBwYXRoLnNsaWNlKDAsIGluZGV4ICsgMSkgKyBwYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXTtcbiAgICBwYXJ0c1tDb21wb25lbnRJbmRleC5QQVRIXSA9IHBhdGg7XG4gICAgcmV0dXJuIGpvaW5BbmRDYW5vbmljYWxpemVQYXRoKHBhcnRzKTtcbiAgfVxuICBmdW5jdGlvbiBpc0Fic29sdXRlKG5hbWUpIHtcbiAgICBpZiAoIW5hbWUpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG5hbWVbMF0gPT09ICcvJylcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIHZhciBwYXJ0cyA9IHNwbGl0KG5hbWUpO1xuICAgIGlmIChwYXJ0c1tDb21wb25lbnRJbmRleC5TQ0hFTUVdKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gICR0cmFjZXVyUnVudGltZS5jYW5vbmljYWxpemVVcmwgPSBjYW5vbmljYWxpemVVcmw7XG4gICR0cmFjZXVyUnVudGltZS5pc0Fic29sdXRlID0gaXNBYnNvbHV0ZTtcbiAgJHRyYWNldXJSdW50aW1lLnJlbW92ZURvdFNlZ21lbnRzID0gcmVtb3ZlRG90U2VnbWVudHM7XG4gICR0cmFjZXVyUnVudGltZS5yZXNvbHZlVXJsID0gcmVzb2x2ZVVybDtcbn0pKCk7XG4oZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyICRfXzIgPSAkdHJhY2V1clJ1bnRpbWUsXG4gICAgICBjYW5vbmljYWxpemVVcmwgPSAkX18yLmNhbm9uaWNhbGl6ZVVybCxcbiAgICAgIHJlc29sdmVVcmwgPSAkX18yLnJlc29sdmVVcmwsXG4gICAgICBpc0Fic29sdXRlID0gJF9fMi5pc0Fic29sdXRlO1xuICB2YXIgbW9kdWxlSW5zdGFudGlhdG9ycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHZhciBiYXNlVVJMO1xuICBpZiAoZ2xvYmFsLmxvY2F0aW9uICYmIGdsb2JhbC5sb2NhdGlvbi5ocmVmKVxuICAgIGJhc2VVUkwgPSByZXNvbHZlVXJsKGdsb2JhbC5sb2NhdGlvbi5ocmVmLCAnLi8nKTtcbiAgZWxzZVxuICAgIGJhc2VVUkwgPSAnJztcbiAgdmFyIFVuY29hdGVkTW9kdWxlRW50cnkgPSBmdW5jdGlvbiBVbmNvYXRlZE1vZHVsZUVudHJ5KHVybCwgdW5jb2F0ZWRNb2R1bGUpIHtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLnZhbHVlXyA9IHVuY29hdGVkTW9kdWxlO1xuICB9O1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShVbmNvYXRlZE1vZHVsZUVudHJ5LCB7fSwge30pO1xuICB2YXIgTW9kdWxlRXZhbHVhdGlvbkVycm9yID0gZnVuY3Rpb24gTW9kdWxlRXZhbHVhdGlvbkVycm9yKGVycm9uZW91c01vZHVsZU5hbWUsIGNhdXNlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJzogJyArIHRoaXMuc3RyaXBDYXVzZShjYXVzZSkgKyAnIGluICcgKyBlcnJvbmVvdXNNb2R1bGVOYW1lO1xuICAgIGlmICghKGNhdXNlIGluc3RhbmNlb2YgJE1vZHVsZUV2YWx1YXRpb25FcnJvcikgJiYgY2F1c2Uuc3RhY2spXG4gICAgICB0aGlzLnN0YWNrID0gdGhpcy5zdHJpcFN0YWNrKGNhdXNlLnN0YWNrKTtcbiAgICBlbHNlXG4gICAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH07XG4gIHZhciAkTW9kdWxlRXZhbHVhdGlvbkVycm9yID0gTW9kdWxlRXZhbHVhdGlvbkVycm9yO1xuICAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKShNb2R1bGVFdmFsdWF0aW9uRXJyb3IsIHtcbiAgICBzdHJpcEVycm9yOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZS5yZXBsYWNlKC8uKkVycm9yOi8sIHRoaXMuY29uc3RydWN0b3IubmFtZSArICc6Jyk7XG4gICAgfSxcbiAgICBzdHJpcENhdXNlOiBmdW5jdGlvbihjYXVzZSkge1xuICAgICAgaWYgKCFjYXVzZSlcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgaWYgKCFjYXVzZS5tZXNzYWdlKVxuICAgICAgICByZXR1cm4gY2F1c2UgKyAnJztcbiAgICAgIHJldHVybiB0aGlzLnN0cmlwRXJyb3IoY2F1c2UubWVzc2FnZSk7XG4gICAgfSxcbiAgICBsb2FkZWRCeTogZnVuY3Rpb24obW9kdWxlTmFtZSkge1xuICAgICAgdGhpcy5zdGFjayArPSAnXFxuIGxvYWRlZCBieSAnICsgbW9kdWxlTmFtZTtcbiAgICB9LFxuICAgIHN0cmlwU3RhY2s6IGZ1bmN0aW9uKGNhdXNlU3RhY2spIHtcbiAgICAgIHZhciBzdGFjayA9IFtdO1xuICAgICAgY2F1c2VTdGFjay5zcGxpdCgnXFxuJykuc29tZSgoZnVuY3Rpb24oZnJhbWUpIHtcbiAgICAgICAgaWYgKC9VbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvci8udGVzdChmcmFtZSkpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHN0YWNrLnB1c2goZnJhbWUpO1xuICAgICAgfSkpO1xuICAgICAgc3RhY2tbMF0gPSB0aGlzLnN0cmlwRXJyb3Ioc3RhY2tbMF0pO1xuICAgICAgcmV0dXJuIHN0YWNrLmpvaW4oJ1xcbicpO1xuICAgIH1cbiAgfSwge30sIEVycm9yKTtcbiAgdmFyIFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yID0gZnVuY3Rpb24gVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IodXJsLCBmdW5jKSB7XG4gICAgJHRyYWNldXJSdW50aW1lLnN1cGVyQ2FsbCh0aGlzLCAkVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IucHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIFt1cmwsIG51bGxdKTtcbiAgICB0aGlzLmZ1bmMgPSBmdW5jO1xuICB9O1xuICB2YXIgJFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yID0gVW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3I7XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yLCB7Z2V0VW5jb2F0ZWRNb2R1bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMudmFsdWVfKVxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV8gPSB0aGlzLmZ1bmMuY2FsbChnbG9iYWwpO1xuICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgaWYgKGV4IGluc3RhbmNlb2YgTW9kdWxlRXZhbHVhdGlvbkVycm9yKSB7XG4gICAgICAgICAgZXgubG9hZGVkQnkodGhpcy51cmwpO1xuICAgICAgICAgIHRocm93IGV4O1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBNb2R1bGVFdmFsdWF0aW9uRXJyb3IodGhpcy51cmwsIGV4KTtcbiAgICAgIH1cbiAgICB9fSwge30sIFVuY29hdGVkTW9kdWxlRW50cnkpO1xuICBmdW5jdGlvbiBnZXRVbmNvYXRlZE1vZHVsZUluc3RhbnRpYXRvcihuYW1lKSB7XG4gICAgaWYgKCFuYW1lKVxuICAgICAgcmV0dXJuO1xuICAgIHZhciB1cmwgPSBNb2R1bGVTdG9yZS5ub3JtYWxpemUobmFtZSk7XG4gICAgcmV0dXJuIG1vZHVsZUluc3RhbnRpYXRvcnNbdXJsXTtcbiAgfVxuICA7XG4gIHZhciBtb2R1bGVJbnN0YW5jZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgbGl2ZU1vZHVsZVNlbnRpbmVsID0ge307XG4gIGZ1bmN0aW9uIE1vZHVsZSh1bmNvYXRlZE1vZHVsZSkge1xuICAgIHZhciBpc0xpdmUgPSBhcmd1bWVudHNbMV07XG4gICAgdmFyIGNvYXRlZE1vZHVsZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModW5jb2F0ZWRNb2R1bGUpLmZvckVhY2goKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBnZXR0ZXIsXG4gICAgICAgICAgdmFsdWU7XG4gICAgICBpZiAoaXNMaXZlID09PSBsaXZlTW9kdWxlU2VudGluZWwpIHtcbiAgICAgICAgdmFyIGRlc2NyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih1bmNvYXRlZE1vZHVsZSwgbmFtZSk7XG4gICAgICAgIGlmIChkZXNjci5nZXQpXG4gICAgICAgICAgZ2V0dGVyID0gZGVzY3IuZ2V0O1xuICAgICAgfVxuICAgICAgaWYgKCFnZXR0ZXIpIHtcbiAgICAgICAgdmFsdWUgPSB1bmNvYXRlZE1vZHVsZVtuYW1lXTtcbiAgICAgICAgZ2V0dGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvYXRlZE1vZHVsZSwgbmFtZSwge1xuICAgICAgICBnZXQ6IGdldHRlcixcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyhjb2F0ZWRNb2R1bGUpO1xuICAgIHJldHVybiBjb2F0ZWRNb2R1bGU7XG4gIH1cbiAgdmFyIE1vZHVsZVN0b3JlID0ge1xuICAgIG5vcm1hbGl6ZTogZnVuY3Rpb24obmFtZSwgcmVmZXJlck5hbWUsIHJlZmVyZXJBZGRyZXNzKSB7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJtb2R1bGUgbmFtZSBtdXN0IGJlIGEgc3RyaW5nLCBub3QgXCIgKyB0eXBlb2YgbmFtZSk7XG4gICAgICBpZiAoaXNBYnNvbHV0ZShuYW1lKSlcbiAgICAgICAgcmV0dXJuIGNhbm9uaWNhbGl6ZVVybChuYW1lKTtcbiAgICAgIGlmICgvW15cXC5dXFwvXFwuXFwuXFwvLy50ZXN0KG5hbWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbW9kdWxlIG5hbWUgZW1iZWRzIC8uLi86ICcgKyBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChuYW1lWzBdID09PSAnLicgJiYgcmVmZXJlck5hbWUpXG4gICAgICAgIHJldHVybiByZXNvbHZlVXJsKHJlZmVyZXJOYW1lLCBuYW1lKTtcbiAgICAgIHJldHVybiBjYW5vbmljYWxpemVVcmwobmFtZSk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKG5vcm1hbGl6ZWROYW1lKSB7XG4gICAgICB2YXIgbSA9IGdldFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKG5vcm1hbGl6ZWROYW1lKTtcbiAgICAgIGlmICghbSlcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIHZhciBtb2R1bGVJbnN0YW5jZSA9IG1vZHVsZUluc3RhbmNlc1ttLnVybF07XG4gICAgICBpZiAobW9kdWxlSW5zdGFuY2UpXG4gICAgICAgIHJldHVybiBtb2R1bGVJbnN0YW5jZTtcbiAgICAgIG1vZHVsZUluc3RhbmNlID0gTW9kdWxlKG0uZ2V0VW5jb2F0ZWRNb2R1bGUoKSwgbGl2ZU1vZHVsZVNlbnRpbmVsKTtcbiAgICAgIHJldHVybiBtb2R1bGVJbnN0YW5jZXNbbS51cmxdID0gbW9kdWxlSW5zdGFuY2U7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKG5vcm1hbGl6ZWROYW1lLCBtb2R1bGUpIHtcbiAgICAgIG5vcm1hbGl6ZWROYW1lID0gU3RyaW5nKG5vcm1hbGl6ZWROYW1lKTtcbiAgICAgIG1vZHVsZUluc3RhbnRpYXRvcnNbbm9ybWFsaXplZE5hbWVdID0gbmV3IFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKG5vcm1hbGl6ZWROYW1lLCAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgICB9KSk7XG4gICAgICBtb2R1bGVJbnN0YW5jZXNbbm9ybWFsaXplZE5hbWVdID0gbW9kdWxlO1xuICAgIH0sXG4gICAgZ2V0IGJhc2VVUkwoKSB7XG4gICAgICByZXR1cm4gYmFzZVVSTDtcbiAgICB9LFxuICAgIHNldCBiYXNlVVJMKHYpIHtcbiAgICAgIGJhc2VVUkwgPSBTdHJpbmcodik7XG4gICAgfSxcbiAgICByZWdpc3Rlck1vZHVsZTogZnVuY3Rpb24obmFtZSwgZnVuYykge1xuICAgICAgdmFyIG5vcm1hbGl6ZWROYW1lID0gTW9kdWxlU3RvcmUubm9ybWFsaXplKG5hbWUpO1xuICAgICAgaWYgKG1vZHVsZUluc3RhbnRpYXRvcnNbbm9ybWFsaXplZE5hbWVdKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2R1cGxpY2F0ZSBtb2R1bGUgbmFtZWQgJyArIG5vcm1hbGl6ZWROYW1lKTtcbiAgICAgIG1vZHVsZUluc3RhbnRpYXRvcnNbbm9ybWFsaXplZE5hbWVdID0gbmV3IFVuY29hdGVkTW9kdWxlSW5zdGFudGlhdG9yKG5vcm1hbGl6ZWROYW1lLCBmdW5jKTtcbiAgICB9LFxuICAgIGJ1bmRsZVN0b3JlOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIHJlZ2lzdGVyOiBmdW5jdGlvbihuYW1lLCBkZXBzLCBmdW5jKSB7XG4gICAgICBpZiAoIWRlcHMgfHwgIWRlcHMubGVuZ3RoICYmICFmdW5jLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyTW9kdWxlKG5hbWUsIGZ1bmMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5idW5kbGVTdG9yZVtuYW1lXSA9IHtcbiAgICAgICAgICBkZXBzOiBkZXBzLFxuICAgICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyICRfXzAgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICB2YXIgZGVwTWFwID0ge307XG4gICAgICAgICAgICBkZXBzLmZvckVhY2goKGZ1bmN0aW9uKGRlcCwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRlcE1hcFtkZXBdID0gJF9fMFtpbmRleF07XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB2YXIgcmVnaXN0cnlFbnRyeSA9IGZ1bmMuY2FsbCh0aGlzLCBkZXBNYXApO1xuICAgICAgICAgICAgcmVnaXN0cnlFbnRyeS5leGVjdXRlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVnaXN0cnlFbnRyeS5leHBvcnRzO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldEFub255bW91c01vZHVsZTogZnVuY3Rpb24oZnVuYykge1xuICAgICAgcmV0dXJuIG5ldyBNb2R1bGUoZnVuYy5jYWxsKGdsb2JhbCksIGxpdmVNb2R1bGVTZW50aW5lbCk7XG4gICAgfSxcbiAgICBnZXRGb3JUZXN0aW5nOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICBpZiAoIXRoaXMudGVzdGluZ1ByZWZpeF8pIHtcbiAgICAgICAgT2JqZWN0LmtleXMobW9kdWxlSW5zdGFuY2VzKS5zb21lKChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICB2YXIgbSA9IC8odHJhY2V1ckBbXlxcL10qXFwvKS8uZXhlYyhrZXkpO1xuICAgICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgICAkX18wLnRlc3RpbmdQcmVmaXhfID0gbVsxXTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMudGVzdGluZ1ByZWZpeF8gKyBuYW1lKTtcbiAgICB9XG4gIH07XG4gIE1vZHVsZVN0b3JlLnNldCgnQHRyYWNldXIvc3JjL3J1bnRpbWUvTW9kdWxlU3RvcmUnLCBuZXcgTW9kdWxlKHtNb2R1bGVTdG9yZTogTW9kdWxlU3RvcmV9KSk7XG4gIHZhciBzZXR1cEdsb2JhbHMgPSAkdHJhY2V1clJ1bnRpbWUuc2V0dXBHbG9iYWxzO1xuICAkdHJhY2V1clJ1bnRpbWUuc2V0dXBHbG9iYWxzID0gZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICAgc2V0dXBHbG9iYWxzKGdsb2JhbCk7XG4gIH07XG4gICR0cmFjZXVyUnVudGltZS5Nb2R1bGVTdG9yZSA9IE1vZHVsZVN0b3JlO1xuICBnbG9iYWwuU3lzdGVtID0ge1xuICAgIHJlZ2lzdGVyOiBNb2R1bGVTdG9yZS5yZWdpc3Rlci5iaW5kKE1vZHVsZVN0b3JlKSxcbiAgICBnZXQ6IE1vZHVsZVN0b3JlLmdldCxcbiAgICBzZXQ6IE1vZHVsZVN0b3JlLnNldCxcbiAgICBub3JtYWxpemU6IE1vZHVsZVN0b3JlLm5vcm1hbGl6ZVxuICB9O1xuICAkdHJhY2V1clJ1bnRpbWUuZ2V0TW9kdWxlSW1wbCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgaW5zdGFudGlhdG9yID0gZ2V0VW5jb2F0ZWRNb2R1bGVJbnN0YW50aWF0b3IobmFtZSk7XG4gICAgcmV0dXJuIGluc3RhbnRpYXRvciAmJiBpbnN0YW50aWF0b3IuZ2V0VW5jb2F0ZWRNb2R1bGUoKTtcbiAgfTtcbn0pKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogdGhpcyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiO1xuICB2YXIgJGNlaWwgPSBNYXRoLmNlaWw7XG4gIHZhciAkZmxvb3IgPSBNYXRoLmZsb29yO1xuICB2YXIgJGlzRmluaXRlID0gaXNGaW5pdGU7XG4gIHZhciAkaXNOYU4gPSBpc05hTjtcbiAgdmFyICRwb3cgPSBNYXRoLnBvdztcbiAgdmFyICRtaW4gPSBNYXRoLm1pbjtcbiAgdmFyIHRvT2JqZWN0ID0gJHRyYWNldXJSdW50aW1lLnRvT2JqZWN0O1xuICBmdW5jdGlvbiB0b1VpbnQzMih4KSB7XG4gICAgcmV0dXJuIHggPj4+IDA7XG4gIH1cbiAgZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICAgIHJldHVybiB4ICYmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHggPT09ICdmdW5jdGlvbicpO1xuICB9XG4gIGZ1bmN0aW9uIGlzQ2FsbGFibGUoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuICBmdW5jdGlvbiBpc051bWJlcih4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnbnVtYmVyJztcbiAgfVxuICBmdW5jdGlvbiB0b0ludGVnZXIoeCkge1xuICAgIHggPSAreDtcbiAgICBpZiAoJGlzTmFOKHgpKVxuICAgICAgcmV0dXJuIDA7XG4gICAgaWYgKHggPT09IDAgfHwgISRpc0Zpbml0ZSh4KSlcbiAgICAgIHJldHVybiB4O1xuICAgIHJldHVybiB4ID4gMCA/ICRmbG9vcih4KSA6ICRjZWlsKHgpO1xuICB9XG4gIHZhciBNQVhfU0FGRV9MRU5HVEggPSAkcG93KDIsIDUzKSAtIDE7XG4gIGZ1bmN0aW9uIHRvTGVuZ3RoKHgpIHtcbiAgICB2YXIgbGVuID0gdG9JbnRlZ2VyKHgpO1xuICAgIHJldHVybiBsZW4gPCAwID8gMCA6ICRtaW4obGVuLCBNQVhfU0FGRV9MRU5HVEgpO1xuICB9XG4gIGZ1bmN0aW9uIGNoZWNrSXRlcmFibGUoeCkge1xuICAgIHJldHVybiAhaXNPYmplY3QoeCkgPyB1bmRlZmluZWQgOiB4W1N5bWJvbC5pdGVyYXRvcl07XG4gIH1cbiAgZnVuY3Rpb24gaXNDb25zdHJ1Y3Rvcih4KSB7XG4gICAgcmV0dXJuIGlzQ2FsbGFibGUoeCk7XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3QodmFsdWUsIGRvbmUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZG9uZTogZG9uZVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVEZWZpbmUob2JqZWN0LCBuYW1lLCBkZXNjcikge1xuICAgIGlmICghKG5hbWUgaW4gb2JqZWN0KSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwgZGVzY3IpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBtYXliZURlZmluZU1ldGhvZChvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gICAgbWF5YmVEZWZpbmUob2JqZWN0LCBuYW1lLCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVEZWZpbmVDb25zdChvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG4gICAgbWF5YmVEZWZpbmUob2JqZWN0LCBuYW1lLCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2VcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZUFkZEZ1bmN0aW9ucyhvYmplY3QsIGZ1bmN0aW9ucykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3Rpb25zLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICB2YXIgbmFtZSA9IGZ1bmN0aW9uc1tpXTtcbiAgICAgIHZhciB2YWx1ZSA9IGZ1bmN0aW9uc1tpICsgMV07XG4gICAgICBtYXliZURlZmluZU1ldGhvZChvYmplY3QsIG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVBZGRDb25zdHMob2JqZWN0LCBjb25zdHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnN0cy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgdmFyIG5hbWUgPSBjb25zdHNbaV07XG4gICAgICB2YXIgdmFsdWUgPSBjb25zdHNbaSArIDFdO1xuICAgICAgbWF5YmVEZWZpbmVDb25zdChvYmplY3QsIG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVBZGRJdGVyYXRvcihvYmplY3QsIGZ1bmMsIFN5bWJvbCkge1xuICAgIGlmICghU3ltYm9sIHx8ICFTeW1ib2wuaXRlcmF0b3IgfHwgb2JqZWN0W1N5bWJvbC5pdGVyYXRvcl0pXG4gICAgICByZXR1cm47XG4gICAgaWYgKG9iamVjdFsnQEBpdGVyYXRvciddKVxuICAgICAgZnVuYyA9IG9iamVjdFsnQEBpdGVyYXRvciddO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIFN5bWJvbC5pdGVyYXRvciwge1xuICAgICAgdmFsdWU6IGZ1bmMsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgdmFyIHBvbHlmaWxscyA9IFtdO1xuICBmdW5jdGlvbiByZWdpc3RlclBvbHlmaWxsKGZ1bmMpIHtcbiAgICBwb2x5ZmlsbHMucHVzaChmdW5jKTtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbEFsbChnbG9iYWwpIHtcbiAgICBwb2x5ZmlsbHMuZm9yRWFjaCgoZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIGYoZ2xvYmFsKTtcbiAgICB9KSk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBnZXQgdG9PYmplY3QoKSB7XG4gICAgICByZXR1cm4gdG9PYmplY3Q7XG4gICAgfSxcbiAgICBnZXQgdG9VaW50MzIoKSB7XG4gICAgICByZXR1cm4gdG9VaW50MzI7XG4gICAgfSxcbiAgICBnZXQgaXNPYmplY3QoKSB7XG4gICAgICByZXR1cm4gaXNPYmplY3Q7XG4gICAgfSxcbiAgICBnZXQgaXNDYWxsYWJsZSgpIHtcbiAgICAgIHJldHVybiBpc0NhbGxhYmxlO1xuICAgIH0sXG4gICAgZ2V0IGlzTnVtYmVyKCkge1xuICAgICAgcmV0dXJuIGlzTnVtYmVyO1xuICAgIH0sXG4gICAgZ2V0IHRvSW50ZWdlcigpIHtcbiAgICAgIHJldHVybiB0b0ludGVnZXI7XG4gICAgfSxcbiAgICBnZXQgdG9MZW5ndGgoKSB7XG4gICAgICByZXR1cm4gdG9MZW5ndGg7XG4gICAgfSxcbiAgICBnZXQgY2hlY2tJdGVyYWJsZSgpIHtcbiAgICAgIHJldHVybiBjaGVja0l0ZXJhYmxlO1xuICAgIH0sXG4gICAgZ2V0IGlzQ29uc3RydWN0b3IoKSB7XG4gICAgICByZXR1cm4gaXNDb25zdHJ1Y3RvcjtcbiAgICB9LFxuICAgIGdldCBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCgpIHtcbiAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdDtcbiAgICB9LFxuICAgIGdldCBtYXliZURlZmluZSgpIHtcbiAgICAgIHJldHVybiBtYXliZURlZmluZTtcbiAgICB9LFxuICAgIGdldCBtYXliZURlZmluZU1ldGhvZCgpIHtcbiAgICAgIHJldHVybiBtYXliZURlZmluZU1ldGhvZDtcbiAgICB9LFxuICAgIGdldCBtYXliZURlZmluZUNvbnN0KCkge1xuICAgICAgcmV0dXJuIG1heWJlRGVmaW5lQ29uc3Q7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVBZGRGdW5jdGlvbnMoKSB7XG4gICAgICByZXR1cm4gbWF5YmVBZGRGdW5jdGlvbnM7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVBZGRDb25zdHMoKSB7XG4gICAgICByZXR1cm4gbWF5YmVBZGRDb25zdHM7XG4gICAgfSxcbiAgICBnZXQgbWF5YmVBZGRJdGVyYXRvcigpIHtcbiAgICAgIHJldHVybiBtYXliZUFkZEl0ZXJhdG9yO1xuICAgIH0sXG4gICAgZ2V0IHJlZ2lzdGVyUG9seWZpbGwoKSB7XG4gICAgICByZXR1cm4gcmVnaXN0ZXJQb2x5ZmlsbDtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbEFsbCgpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbEFsbDtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL01hcFwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9NYXBcIjtcbiAgdmFyICRfXzMgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBpc09iamVjdCA9ICRfXzMuaXNPYmplY3QsXG4gICAgICBtYXliZUFkZEl0ZXJhdG9yID0gJF9fMy5tYXliZUFkZEl0ZXJhdG9yLFxuICAgICAgcmVnaXN0ZXJQb2x5ZmlsbCA9ICRfXzMucmVnaXN0ZXJQb2x5ZmlsbDtcbiAgdmFyIGdldE93bkhhc2hPYmplY3QgPSAkdHJhY2V1clJ1bnRpbWUuZ2V0T3duSGFzaE9iamVjdDtcbiAgdmFyICRoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciBkZWxldGVkU2VudGluZWwgPSB7fTtcbiAgZnVuY3Rpb24gbG9va3VwSW5kZXgobWFwLCBrZXkpIHtcbiAgICBpZiAoaXNPYmplY3Qoa2V5KSkge1xuICAgICAgdmFyIGhhc2hPYmplY3QgPSBnZXRPd25IYXNoT2JqZWN0KGtleSk7XG4gICAgICByZXR1cm4gaGFzaE9iamVjdCAmJiBtYXAub2JqZWN0SW5kZXhfW2hhc2hPYmplY3QuaGFzaF07XG4gICAgfVxuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJylcbiAgICAgIHJldHVybiBtYXAuc3RyaW5nSW5kZXhfW2tleV07XG4gICAgcmV0dXJuIG1hcC5wcmltaXRpdmVJbmRleF9ba2V5XTtcbiAgfVxuICBmdW5jdGlvbiBpbml0TWFwKG1hcCkge1xuICAgIG1hcC5lbnRyaWVzXyA9IFtdO1xuICAgIG1hcC5vYmplY3RJbmRleF8gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIG1hcC5zdHJpbmdJbmRleF8gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIG1hcC5wcmltaXRpdmVJbmRleF8gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIG1hcC5kZWxldGVkQ291bnRfID0gMDtcbiAgfVxuICB2YXIgTWFwID0gZnVuY3Rpb24gTWFwKCkge1xuICAgIHZhciBpdGVyYWJsZSA9IGFyZ3VtZW50c1swXTtcbiAgICBpZiAoIWlzT2JqZWN0KHRoaXMpKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTWFwIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgdHlwZScpO1xuICAgIGlmICgkaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCAnZW50cmllc18nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTWFwIGNhbiBub3QgYmUgcmVlbnRyYW50bHkgaW5pdGlhbGlzZWQnKTtcbiAgICB9XG4gICAgaW5pdE1hcCh0aGlzKTtcbiAgICBpZiAoaXRlcmFibGUgIT09IG51bGwgJiYgaXRlcmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yICh2YXIgJF9fNSA9IGl0ZXJhYmxlW1N5bWJvbC5pdGVyYXRvcl0oKSxcbiAgICAgICAgICAkX182OyAhKCRfXzYgPSAkX181Lm5leHQoKSkuZG9uZTsgKSB7XG4gICAgICAgIHZhciAkX183ID0gJF9fNi52YWx1ZSxcbiAgICAgICAgICAgIGtleSA9ICRfXzdbMF0sXG4gICAgICAgICAgICB2YWx1ZSA9ICRfXzdbMV07XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoTWFwLCB7XG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbnRyaWVzXy5sZW5ndGggLyAyIC0gdGhpcy5kZWxldGVkQ291bnRfO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBpbmRleCA9IGxvb2t1cEluZGV4KHRoaXMsIGtleSk7XG4gICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50cmllc19baW5kZXggKyAxXTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIG9iamVjdE1vZGUgPSBpc09iamVjdChrZXkpO1xuICAgICAgdmFyIHN0cmluZ01vZGUgPSB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJztcbiAgICAgIHZhciBpbmRleCA9IGxvb2t1cEluZGV4KHRoaXMsIGtleSk7XG4gICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmVudHJpZXNfW2luZGV4ICsgMV0gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0gdGhpcy5lbnRyaWVzXy5sZW5ndGg7XG4gICAgICAgIHRoaXMuZW50cmllc19baW5kZXhdID0ga2V5O1xuICAgICAgICB0aGlzLmVudHJpZXNfW2luZGV4ICsgMV0gPSB2YWx1ZTtcbiAgICAgICAgaWYgKG9iamVjdE1vZGUpIHtcbiAgICAgICAgICB2YXIgaGFzaE9iamVjdCA9IGdldE93bkhhc2hPYmplY3Qoa2V5KTtcbiAgICAgICAgICB2YXIgaGFzaCA9IGhhc2hPYmplY3QuaGFzaDtcbiAgICAgICAgICB0aGlzLm9iamVjdEluZGV4X1toYXNoXSA9IGluZGV4O1xuICAgICAgICB9IGVsc2UgaWYgKHN0cmluZ01vZGUpIHtcbiAgICAgICAgICB0aGlzLnN0cmluZ0luZGV4X1trZXldID0gaW5kZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcmltaXRpdmVJbmRleF9ba2V5XSA9IGluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGhhczogZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gbG9va3VwSW5kZXgodGhpcywga2V5KSAhPT0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgZGVsZXRlOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBvYmplY3RNb2RlID0gaXNPYmplY3Qoa2V5KTtcbiAgICAgIHZhciBzdHJpbmdNb2RlID0gdHlwZW9mIGtleSA9PT0gJ3N0cmluZyc7XG4gICAgICB2YXIgaW5kZXg7XG4gICAgICB2YXIgaGFzaDtcbiAgICAgIGlmIChvYmplY3RNb2RlKSB7XG4gICAgICAgIHZhciBoYXNoT2JqZWN0ID0gZ2V0T3duSGFzaE9iamVjdChrZXkpO1xuICAgICAgICBpZiAoaGFzaE9iamVjdCkge1xuICAgICAgICAgIGluZGV4ID0gdGhpcy5vYmplY3RJbmRleF9baGFzaCA9IGhhc2hPYmplY3QuaGFzaF07XG4gICAgICAgICAgZGVsZXRlIHRoaXMub2JqZWN0SW5kZXhfW2hhc2hdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHN0cmluZ01vZGUpIHtcbiAgICAgICAgaW5kZXggPSB0aGlzLnN0cmluZ0luZGV4X1trZXldO1xuICAgICAgICBkZWxldGUgdGhpcy5zdHJpbmdJbmRleF9ba2V5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0gdGhpcy5wcmltaXRpdmVJbmRleF9ba2V5XTtcbiAgICAgICAgZGVsZXRlIHRoaXMucHJpbWl0aXZlSW5kZXhfW2tleV07XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmVudHJpZXNfW2luZGV4XSA9IGRlbGV0ZWRTZW50aW5lbDtcbiAgICAgICAgdGhpcy5lbnRyaWVzX1tpbmRleCArIDFdID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRlbGV0ZWRDb3VudF8rKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICBpbml0TWFwKHRoaXMpO1xuICAgIH0sXG4gICAgZm9yRWFjaDogZnVuY3Rpb24oY2FsbGJhY2tGbikge1xuICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZW50cmllc18ubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgdmFyIGtleSA9IHRoaXMuZW50cmllc19baV07XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZW50cmllc19baSArIDFdO1xuICAgICAgICBpZiAoa2V5ID09PSBkZWxldGVkU2VudGluZWwpXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIGNhbGxiYWNrRm4uY2FsbCh0aGlzQXJnLCB2YWx1ZSwga2V5LCB0aGlzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVudHJpZXM6ICR0cmFjZXVyUnVudGltZS5pbml0R2VuZXJhdG9yRnVuY3Rpb24oZnVuY3Rpb24gJF9fOCgpIHtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGtleSxcbiAgICAgICAgICB2YWx1ZTtcbiAgICAgIHJldHVybiAkdHJhY2V1clJ1bnRpbWUuY3JlYXRlR2VuZXJhdG9ySW5zdGFuY2UoZnVuY3Rpb24oJGN0eCkge1xuICAgICAgICB3aGlsZSAodHJ1ZSlcbiAgICAgICAgICBzd2l0Y2ggKCRjdHguc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKGkgPCB0aGlzLmVudHJpZXNfLmxlbmd0aCkgPyA4IDogLTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAxMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgIGtleSA9IHRoaXMuZW50cmllc19baV07XG4gICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5lbnRyaWVzX1tpICsgMV07XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSA5O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChrZXkgPT09IGRlbGV0ZWRTZW50aW5lbCkgPyA0IDogNjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAyO1xuICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVdO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAkY3R4Lm1heWJlVGhyb3coKTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuICRjdHguZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgfSwgJF9fOCwgdGhpcyk7XG4gICAgfSksXG4gICAga2V5czogJHRyYWNldXJSdW50aW1lLmluaXRHZW5lcmF0b3JGdW5jdGlvbihmdW5jdGlvbiAkX185KCkge1xuICAgICAgdmFyIGksXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHZhbHVlO1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoaSA8IHRoaXMuZW50cmllc18ubGVuZ3RoKSA/IDggOiAtMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDEyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAga2V5ID0gdGhpcy5lbnRyaWVzX1tpXTtcbiAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmVudHJpZXNfW2kgKyAxXTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gKGtleSA9PT0gZGVsZXRlZFNlbnRpbmVsKSA/IDQgOiA2O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDI7XG4gICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICRjdHgubWF5YmVUaHJvdygpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gNDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gJGN0eC5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICB9LCAkX185LCB0aGlzKTtcbiAgICB9KSxcbiAgICB2YWx1ZXM6ICR0cmFjZXVyUnVudGltZS5pbml0R2VuZXJhdG9yRnVuY3Rpb24oZnVuY3Rpb24gJF9fMTAoKSB7XG4gICAgICB2YXIgaSxcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgdmFsdWU7XG4gICAgICByZXR1cm4gJHRyYWNldXJSdW50aW1lLmNyZWF0ZUdlbmVyYXRvckluc3RhbmNlKGZ1bmN0aW9uKCRjdHgpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpXG4gICAgICAgICAgc3dpdGNoICgkY3R4LnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IChpIDwgdGhpcy5lbnRyaWVzXy5sZW5ndGgpID8gOCA6IC0yO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICBrZXkgPSB0aGlzLmVudHJpZXNfW2ldO1xuICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZW50cmllc19baSArIDFdO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoa2V5ID09PSBkZWxldGVkU2VudGluZWwpID8gNCA6IDY7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMjtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAkY3R4Lm1heWJlVGhyb3coKTtcbiAgICAgICAgICAgICAgJGN0eC5zdGF0ZSA9IDQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuICRjdHguZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgfSwgJF9fMTAsIHRoaXMpO1xuICAgIH0pXG4gIH0sIHt9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1hcC5wcm90b3R5cGUsIFN5bWJvbC5pdGVyYXRvciwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogTWFwLnByb3RvdHlwZS5lbnRyaWVzXG4gIH0pO1xuICBmdW5jdGlvbiBwb2x5ZmlsbE1hcChnbG9iYWwpIHtcbiAgICB2YXIgJF9fNyA9IGdsb2JhbCxcbiAgICAgICAgT2JqZWN0ID0gJF9fNy5PYmplY3QsXG4gICAgICAgIFN5bWJvbCA9ICRfXzcuU3ltYm9sO1xuICAgIGlmICghZ2xvYmFsLk1hcClcbiAgICAgIGdsb2JhbC5NYXAgPSBNYXA7XG4gICAgdmFyIG1hcFByb3RvdHlwZSA9IGdsb2JhbC5NYXAucHJvdG90eXBlO1xuICAgIGlmIChtYXBQcm90b3R5cGUuZW50cmllcykge1xuICAgICAgbWF5YmVBZGRJdGVyYXRvcihtYXBQcm90b3R5cGUsIG1hcFByb3RvdHlwZS5lbnRyaWVzLCBTeW1ib2wpO1xuICAgICAgbWF5YmVBZGRJdGVyYXRvcihPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IGdsb2JhbC5NYXAoKS5lbnRyaWVzKCkpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LCBTeW1ib2wpO1xuICAgIH1cbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsTWFwKTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgTWFwKCkge1xuICAgICAgcmV0dXJuIE1hcDtcbiAgICB9LFxuICAgIGdldCBwb2x5ZmlsbE1hcCgpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbE1hcDtcbiAgICB9XG4gIH07XG59KTtcblN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9NYXBcIiArICcnKTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1NldFwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TZXRcIjtcbiAgdmFyICRfXzExID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL3V0aWxzXCIpLFxuICAgICAgaXNPYmplY3QgPSAkX18xMS5pc09iamVjdCxcbiAgICAgIG1heWJlQWRkSXRlcmF0b3IgPSAkX18xMS5tYXliZUFkZEl0ZXJhdG9yLFxuICAgICAgcmVnaXN0ZXJQb2x5ZmlsbCA9ICRfXzExLnJlZ2lzdGVyUG9seWZpbGw7XG4gIHZhciBNYXAgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTWFwXCIpLk1hcDtcbiAgdmFyIGdldE93bkhhc2hPYmplY3QgPSAkdHJhY2V1clJ1bnRpbWUuZ2V0T3duSGFzaE9iamVjdDtcbiAgdmFyICRoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIGZ1bmN0aW9uIGluaXRTZXQoc2V0KSB7XG4gICAgc2V0Lm1hcF8gPSBuZXcgTWFwKCk7XG4gIH1cbiAgdmFyIFNldCA9IGZ1bmN0aW9uIFNldCgpIHtcbiAgICB2YXIgaXRlcmFibGUgPSBhcmd1bWVudHNbMF07XG4gICAgaWYgKCFpc09iamVjdCh0aGlzKSlcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1NldCBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHR5cGUnKTtcbiAgICBpZiAoJGhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ21hcF8nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2V0IGNhbiBub3QgYmUgcmVlbnRyYW50bHkgaW5pdGlhbGlzZWQnKTtcbiAgICB9XG4gICAgaW5pdFNldCh0aGlzKTtcbiAgICBpZiAoaXRlcmFibGUgIT09IG51bGwgJiYgaXRlcmFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yICh2YXIgJF9fMTUgPSBpdGVyYWJsZVtTeW1ib2wuaXRlcmF0b3JdKCksXG4gICAgICAgICAgJF9fMTY7ICEoJF9fMTYgPSAkX18xNS5uZXh0KCkpLmRvbmU7ICkge1xuICAgICAgICB2YXIgaXRlbSA9ICRfXzE2LnZhbHVlO1xuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5hZGQoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKFNldCwge1xuICAgIGdldCBzaXplKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwXy5zaXplO1xuICAgIH0sXG4gICAgaGFzOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcF8uaGFzKGtleSk7XG4gICAgfSxcbiAgICBhZGQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgdGhpcy5tYXBfLnNldChrZXksIGtleSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGRlbGV0ZTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBfLmRlbGV0ZShrZXkpO1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwXy5jbGVhcigpO1xuICAgIH0sXG4gICAgZm9yRWFjaDogZnVuY3Rpb24oY2FsbGJhY2tGbikge1xuICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgICB2YXIgJF9fMTMgPSB0aGlzO1xuICAgICAgcmV0dXJuIHRoaXMubWFwXy5mb3JFYWNoKChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIGNhbGxiYWNrRm4uY2FsbCh0aGlzQXJnLCBrZXksIGtleSwgJF9fMTMpO1xuICAgICAgfSkpO1xuICAgIH0sXG4gICAgdmFsdWVzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzE4KCkge1xuICAgICAgdmFyICRfXzE5LFxuICAgICAgICAgICRfXzIwO1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAkX18xOSA9IHRoaXMubWFwXy5rZXlzKClbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgICAgICAgICAgICAkY3R4LnNlbnQgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICRjdHguYWN0aW9uID0gJ25leHQnO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgJF9fMjAgPSAkX18xOVskY3R4LmFjdGlvbl0oJGN0eC5zZW50SWdub3JlVGhyb3cpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoJF9fMjAuZG9uZSkgPyAzIDogMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICRjdHguc2VudCA9ICRfXzIwLnZhbHVlO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gLTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIHJldHVybiAkX18yMC52YWx1ZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzE4LCB0aGlzKTtcbiAgICB9KSxcbiAgICBlbnRyaWVzOiAkdHJhY2V1clJ1bnRpbWUuaW5pdEdlbmVyYXRvckZ1bmN0aW9uKGZ1bmN0aW9uICRfXzIxKCkge1xuICAgICAgdmFyICRfXzIyLFxuICAgICAgICAgICRfXzIzO1xuICAgICAgcmV0dXJuICR0cmFjZXVyUnVudGltZS5jcmVhdGVHZW5lcmF0b3JJbnN0YW5jZShmdW5jdGlvbigkY3R4KSB7XG4gICAgICAgIHdoaWxlICh0cnVlKVxuICAgICAgICAgIHN3aXRjaCAoJGN0eC5zdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAkX18yMiA9IHRoaXMubWFwXy5lbnRyaWVzKClbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgICAgICAgICAgICAkY3R4LnNlbnQgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICRjdHguYWN0aW9uID0gJ25leHQnO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgJF9fMjMgPSAkX18yMlskY3R4LmFjdGlvbl0oJGN0eC5zZW50SWdub3JlVGhyb3cpO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gOTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICRjdHguc3RhdGUgPSAoJF9fMjMuZG9uZSkgPyAzIDogMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICRjdHguc2VudCA9ICRfXzIzLnZhbHVlO1xuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gLTI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAkY3R4LnN0YXRlID0gMTI7XG4gICAgICAgICAgICAgIHJldHVybiAkX18yMy52YWx1ZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAkY3R4LmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgIH0sICRfXzIxLCB0aGlzKTtcbiAgICB9KVxuICB9LCB7fSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTZXQucHJvdG90eXBlLCBTeW1ib2wuaXRlcmF0b3IsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgdmFsdWU6IFNldC5wcm90b3R5cGUudmFsdWVzXG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2V0LnByb3RvdHlwZSwgJ2tleXMnLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBTZXQucHJvdG90eXBlLnZhbHVlc1xuICB9KTtcbiAgZnVuY3Rpb24gcG9seWZpbGxTZXQoZ2xvYmFsKSB7XG4gICAgdmFyICRfXzE3ID0gZ2xvYmFsLFxuICAgICAgICBPYmplY3QgPSAkX18xNy5PYmplY3QsXG4gICAgICAgIFN5bWJvbCA9ICRfXzE3LlN5bWJvbDtcbiAgICBpZiAoIWdsb2JhbC5TZXQpXG4gICAgICBnbG9iYWwuU2V0ID0gU2V0O1xuICAgIHZhciBzZXRQcm90b3R5cGUgPSBnbG9iYWwuU2V0LnByb3RvdHlwZTtcbiAgICBpZiAoc2V0UHJvdG90eXBlLnZhbHVlcykge1xuICAgICAgbWF5YmVBZGRJdGVyYXRvcihzZXRQcm90b3R5cGUsIHNldFByb3RvdHlwZS52YWx1ZXMsIFN5bWJvbCk7XG4gICAgICBtYXliZUFkZEl0ZXJhdG9yKE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgZ2xvYmFsLlNldCgpLnZhbHVlcygpKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSwgU3ltYm9sKTtcbiAgICB9XG4gIH1cbiAgcmVnaXN0ZXJQb2x5ZmlsbChwb2x5ZmlsbFNldCk7XG4gIHJldHVybiB7XG4gICAgZ2V0IFNldCgpIHtcbiAgICAgIHJldHVybiBTZXQ7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxTZXQoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxTZXQ7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU2V0XCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL25vZGVfbW9kdWxlcy9yc3ZwL2xpYi9yc3ZwL2FzYXBcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9ub2RlX21vZHVsZXMvcnN2cC9saWIvcnN2cC9hc2FwXCI7XG4gIHZhciBsZW4gPSAwO1xuICBmdW5jdGlvbiBhc2FwKGNhbGxiYWNrLCBhcmcpIHtcbiAgICBxdWV1ZVtsZW5dID0gY2FsbGJhY2s7XG4gICAgcXVldWVbbGVuICsgMV0gPSBhcmc7XG4gICAgbGVuICs9IDI7XG4gICAgaWYgKGxlbiA9PT0gMikge1xuICAgICAgc2NoZWR1bGVGbHVzaCgpO1xuICAgIH1cbiAgfVxuICB2YXIgJF9fZGVmYXVsdCA9IGFzYXA7XG4gIHZhciBicm93c2VyR2xvYmFsID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSA/IHdpbmRvdyA6IHt9O1xuICB2YXIgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBicm93c2VyR2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgYnJvd3Nlckdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xuICB2YXIgaXNXb3JrZXIgPSB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBpbXBvcnRTY3JpcHRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgTWVzc2FnZUNoYW5uZWwgIT09ICd1bmRlZmluZWQnO1xuICBmdW5jdGlvbiB1c2VOZXh0VGljaygpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHVzZU11dGF0aW9uT2JzZXJ2ZXIoKSB7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIHZhciBvYnNlcnZlciA9IG5ldyBCcm93c2VyTXV0YXRpb25PYnNlcnZlcihmbHVzaCk7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIG5vZGUuZGF0YSA9IChpdGVyYXRpb25zID0gKytpdGVyYXRpb25zICUgMik7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiB1c2VNZXNzYWdlQ2hhbm5lbCgpIHtcbiAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZmx1c2g7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHVzZVNldFRpbWVvdXQoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgc2V0VGltZW91dChmbHVzaCwgMSk7XG4gICAgfTtcbiAgfVxuICB2YXIgcXVldWUgPSBuZXcgQXJyYXkoMTAwMCk7XG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICAgIHZhciBjYWxsYmFjayA9IHF1ZXVlW2ldO1xuICAgICAgdmFyIGFyZyA9IHF1ZXVlW2kgKyAxXTtcbiAgICAgIGNhbGxiYWNrKGFyZyk7XG4gICAgICBxdWV1ZVtpXSA9IHVuZGVmaW5lZDtcbiAgICAgIHF1ZXVlW2kgKyAxXSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgbGVuID0gMDtcbiAgfVxuICB2YXIgc2NoZWR1bGVGbHVzaDtcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiB7fS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICBzY2hlZHVsZUZsdXNoID0gdXNlTmV4dFRpY2soKTtcbiAgfSBlbHNlIGlmIChCcm93c2VyTXV0YXRpb25PYnNlcnZlcikge1xuICAgIHNjaGVkdWxlRmx1c2ggPSB1c2VNdXRhdGlvbk9ic2VydmVyKCk7XG4gIH0gZWxzZSBpZiAoaXNXb3JrZXIpIHtcbiAgICBzY2hlZHVsZUZsdXNoID0gdXNlTWVzc2FnZUNoYW5uZWwoKTtcbiAgfSBlbHNlIHtcbiAgICBzY2hlZHVsZUZsdXNoID0gdXNlU2V0VGltZW91dCgpO1xuICB9XG4gIHJldHVybiB7Z2V0IGRlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gJF9fZGVmYXVsdDtcbiAgICB9fTtcbn0pO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvUHJvbWlzZVwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9Qcm9taXNlXCI7XG4gIHZhciBhc3luYyA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL25vZGVfbW9kdWxlcy9yc3ZwL2xpYi9yc3ZwL2FzYXBcIikuZGVmYXVsdDtcbiAgdmFyIHJlZ2lzdGVyUG9seWZpbGwgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIikucmVnaXN0ZXJQb2x5ZmlsbDtcbiAgdmFyIHByb21pc2VSYXcgPSB7fTtcbiAgZnVuY3Rpb24gaXNQcm9taXNlKHgpIHtcbiAgICByZXR1cm4geCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeC5zdGF0dXNfICE9PSB1bmRlZmluZWQ7XG4gIH1cbiAgZnVuY3Rpb24gaWRSZXNvbHZlSGFuZGxlcih4KSB7XG4gICAgcmV0dXJuIHg7XG4gIH1cbiAgZnVuY3Rpb24gaWRSZWplY3RIYW5kbGVyKHgpIHtcbiAgICB0aHJvdyB4O1xuICB9XG4gIGZ1bmN0aW9uIGNoYWluKHByb21pc2UpIHtcbiAgICB2YXIgb25SZXNvbHZlID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IGlkUmVzb2x2ZUhhbmRsZXI7XG4gICAgdmFyIG9uUmVqZWN0ID0gYXJndW1lbnRzWzJdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1syXSA6IGlkUmVqZWN0SGFuZGxlcjtcbiAgICB2YXIgZGVmZXJyZWQgPSBnZXREZWZlcnJlZChwcm9taXNlLmNvbnN0cnVjdG9yKTtcbiAgICBzd2l0Y2ggKHByb21pc2Uuc3RhdHVzXykge1xuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHRocm93IFR5cGVFcnJvcjtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcHJvbWlzZS5vblJlc29sdmVfLnB1c2gob25SZXNvbHZlLCBkZWZlcnJlZCk7XG4gICAgICAgIHByb21pc2Uub25SZWplY3RfLnB1c2gob25SZWplY3QsIGRlZmVycmVkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICsxOlxuICAgICAgICBwcm9taXNlRW5xdWV1ZShwcm9taXNlLnZhbHVlXywgW29uUmVzb2x2ZSwgZGVmZXJyZWRdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIC0xOlxuICAgICAgICBwcm9taXNlRW5xdWV1ZShwcm9taXNlLnZhbHVlXywgW29uUmVqZWN0LCBkZWZlcnJlZF0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0RGVmZXJyZWQoQykge1xuICAgIGlmICh0aGlzID09PSAkUHJvbWlzZSkge1xuICAgICAgdmFyIHByb21pc2UgPSBwcm9taXNlSW5pdChuZXcgJFByb21pc2UocHJvbWlzZVJhdykpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvbWlzZTogcHJvbWlzZSxcbiAgICAgICAgcmVzb2x2ZTogKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICBwcm9taXNlUmVzb2x2ZShwcm9taXNlLCB4KTtcbiAgICAgICAgfSksXG4gICAgICAgIHJlamVjdDogKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICBwcm9taXNlUmVqZWN0KHByb21pc2UsIHIpO1xuICAgICAgICB9KVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgcmVzdWx0LnByb21pc2UgPSBuZXcgQygoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJlc3VsdC5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgcmVzdWx0LnJlamVjdCA9IHJlamVjdDtcbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VTZXQocHJvbWlzZSwgc3RhdHVzLCB2YWx1ZSwgb25SZXNvbHZlLCBvblJlamVjdCkge1xuICAgIHByb21pc2Uuc3RhdHVzXyA9IHN0YXR1cztcbiAgICBwcm9taXNlLnZhbHVlXyA9IHZhbHVlO1xuICAgIHByb21pc2Uub25SZXNvbHZlXyA9IG9uUmVzb2x2ZTtcbiAgICBwcm9taXNlLm9uUmVqZWN0XyA9IG9uUmVqZWN0O1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VJbml0KHByb21pc2UpIHtcbiAgICByZXR1cm4gcHJvbWlzZVNldChwcm9taXNlLCAwLCB1bmRlZmluZWQsIFtdLCBbXSk7XG4gIH1cbiAgdmFyIFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKHJlc29sdmVyKSB7XG4gICAgaWYgKHJlc29sdmVyID09PSBwcm9taXNlUmF3KVxuICAgICAgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgcmVzb2x2ZXIgIT09ICdmdW5jdGlvbicpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICAgIHZhciBwcm9taXNlID0gcHJvbWlzZUluaXQodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIHJlc29sdmVyKChmdW5jdGlvbih4KSB7XG4gICAgICAgIHByb21pc2VSZXNvbHZlKHByb21pc2UsIHgpO1xuICAgICAgfSksIChmdW5jdGlvbihyKSB7XG4gICAgICAgIHByb21pc2VSZWplY3QocHJvbWlzZSwgcik7XG4gICAgICB9KSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcHJvbWlzZVJlamVjdChwcm9taXNlLCBlKTtcbiAgICB9XG4gIH07XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKFByb21pc2UsIHtcbiAgICBjYXRjaDogZnVuY3Rpb24ob25SZWplY3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdCk7XG4gICAgfSxcbiAgICB0aGVuOiBmdW5jdGlvbihvblJlc29sdmUsIG9uUmVqZWN0KSB7XG4gICAgICBpZiAodHlwZW9mIG9uUmVzb2x2ZSAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgb25SZXNvbHZlID0gaWRSZXNvbHZlSGFuZGxlcjtcbiAgICAgIGlmICh0eXBlb2Ygb25SZWplY3QgIT09ICdmdW5jdGlvbicpXG4gICAgICAgIG9uUmVqZWN0ID0gaWRSZWplY3RIYW5kbGVyO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGNvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICAgIHJldHVybiBjaGFpbih0aGlzLCBmdW5jdGlvbih4KSB7XG4gICAgICAgIHggPSBwcm9taXNlQ29lcmNlKGNvbnN0cnVjdG9yLCB4KTtcbiAgICAgICAgcmV0dXJuIHggPT09IHRoYXQgPyBvblJlamVjdChuZXcgVHlwZUVycm9yKSA6IGlzUHJvbWlzZSh4KSA/IHgudGhlbihvblJlc29sdmUsIG9uUmVqZWN0KSA6IG9uUmVzb2x2ZSh4KTtcbiAgICAgIH0sIG9uUmVqZWN0KTtcbiAgICB9XG4gIH0sIHtcbiAgICByZXNvbHZlOiBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAodGhpcyA9PT0gJFByb21pc2UpIHtcbiAgICAgICAgaWYgKGlzUHJvbWlzZSh4KSkge1xuICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9taXNlU2V0KG5ldyAkUHJvbWlzZShwcm9taXNlUmF3KSwgKzEsIHgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHJlc29sdmUoeCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVqZWN0OiBmdW5jdGlvbihyKSB7XG4gICAgICBpZiAodGhpcyA9PT0gJFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VTZXQobmV3ICRQcm9taXNlKHByb21pc2VSYXcpLCAtMSwgcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHJlamVjdChyKTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYWxsOiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHZhciBkZWZlcnJlZCA9IGdldERlZmVycmVkKHRoaXMpO1xuICAgICAgdmFyIHJlc29sdXRpb25zID0gW107XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgY291bnQgPSB2YWx1ZXMubGVuZ3RoO1xuICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc29sdXRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlKHZhbHVlc1tpXSkudGhlbihmdW5jdGlvbihpLCB4KSB7XG4gICAgICAgICAgICAgIHJlc29sdXRpb25zW2ldID0geDtcbiAgICAgICAgICAgICAgaWYgKC0tY291bnQgPT09IDApXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNvbHV0aW9ucyk7XG4gICAgICAgICAgICB9LmJpbmQodW5kZWZpbmVkLCBpKSwgKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHIpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QoZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9LFxuICAgIHJhY2U6IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgdmFyIGRlZmVycmVkID0gZ2V0RGVmZXJyZWQodGhpcyk7XG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMucmVzb2x2ZSh2YWx1ZXNbaV0pLnRoZW4oKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoeCk7XG4gICAgICAgICAgfSksIChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qocik7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdChlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH1cbiAgfSk7XG4gIHZhciAkUHJvbWlzZSA9IFByb21pc2U7XG4gIHZhciAkUHJvbWlzZVJlamVjdCA9ICRQcm9taXNlLnJlamVjdDtcbiAgZnVuY3Rpb24gcHJvbWlzZVJlc29sdmUocHJvbWlzZSwgeCkge1xuICAgIHByb21pc2VEb25lKHByb21pc2UsICsxLCB4LCBwcm9taXNlLm9uUmVzb2x2ZV8pO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VSZWplY3QocHJvbWlzZSwgcikge1xuICAgIHByb21pc2VEb25lKHByb21pc2UsIC0xLCByLCBwcm9taXNlLm9uUmVqZWN0Xyk7XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZURvbmUocHJvbWlzZSwgc3RhdHVzLCB2YWx1ZSwgcmVhY3Rpb25zKSB7XG4gICAgaWYgKHByb21pc2Uuc3RhdHVzXyAhPT0gMClcbiAgICAgIHJldHVybjtcbiAgICBwcm9taXNlRW5xdWV1ZSh2YWx1ZSwgcmVhY3Rpb25zKTtcbiAgICBwcm9taXNlU2V0KHByb21pc2UsIHN0YXR1cywgdmFsdWUpO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VFbnF1ZXVlKHZhbHVlLCB0YXNrcykge1xuICAgIGFzeW5jKChmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza3MubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgcHJvbWlzZUhhbmRsZSh2YWx1ZSwgdGFza3NbaV0sIHRhc2tzW2kgKyAxXSk7XG4gICAgICB9XG4gICAgfSkpO1xuICB9XG4gIGZ1bmN0aW9uIHByb21pc2VIYW5kbGUodmFsdWUsIGhhbmRsZXIsIGRlZmVycmVkKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTtcbiAgICAgIGlmIChyZXN1bHQgPT09IGRlZmVycmVkLnByb21pc2UpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gICAgICBlbHNlIGlmIChpc1Byb21pc2UocmVzdWx0KSlcbiAgICAgICAgY2hhaW4ocmVzdWx0LCBkZWZlcnJlZC5yZXNvbHZlLCBkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgZWxzZVxuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KGUpO1xuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG4gIH1cbiAgdmFyIHRoZW5hYmxlU3ltYm9sID0gJ0BAdGhlbmFibGUnO1xuICBmdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gICAgcmV0dXJuIHggJiYgKHR5cGVvZiB4ID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJyk7XG4gIH1cbiAgZnVuY3Rpb24gcHJvbWlzZUNvZXJjZShjb25zdHJ1Y3RvciwgeCkge1xuICAgIGlmICghaXNQcm9taXNlKHgpICYmIGlzT2JqZWN0KHgpKSB7XG4gICAgICB2YXIgdGhlbjtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoZW4gPSB4LnRoZW47XG4gICAgICB9IGNhdGNoIChyKSB7XG4gICAgICAgIHZhciBwcm9taXNlID0gJFByb21pc2VSZWplY3QuY2FsbChjb25zdHJ1Y3Rvciwgcik7XG4gICAgICAgIHhbdGhlbmFibGVTeW1ib2xdID0gcHJvbWlzZTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFyIHAgPSB4W3RoZW5hYmxlU3ltYm9sXTtcbiAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBnZXREZWZlcnJlZChjb25zdHJ1Y3Rvcik7XG4gICAgICAgICAgeFt0aGVuYWJsZVN5bWJvbF0gPSBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGVuLmNhbGwoeCwgZGVmZXJyZWQucmVzb2x2ZSwgZGVmZXJyZWQucmVqZWN0KTtcbiAgICAgICAgICB9IGNhdGNoIChyKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qocik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB4O1xuICB9XG4gIGZ1bmN0aW9uIHBvbHlmaWxsUHJvbWlzZShnbG9iYWwpIHtcbiAgICBpZiAoIWdsb2JhbC5Qcm9taXNlKVxuICAgICAgZ2xvYmFsLlByb21pc2UgPSBQcm9taXNlO1xuICB9XG4gIHJlZ2lzdGVyUG9seWZpbGwocG9seWZpbGxQcm9taXNlKTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgUHJvbWlzZSgpIHtcbiAgICAgIHJldHVybiBQcm9taXNlO1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsUHJvbWlzZSgpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbFByb21pc2U7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvUHJvbWlzZVwiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nSXRlcmF0b3JcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRfXzI5O1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmdJdGVyYXRvclwiO1xuICB2YXIgJF9fMjcgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCA9ICRfXzI3LmNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0LFxuICAgICAgaXNPYmplY3QgPSAkX18yNy5pc09iamVjdDtcbiAgdmFyICRfXzMwID0gJHRyYWNldXJSdW50aW1lLFxuICAgICAgaGFzT3duUHJvcGVydHkgPSAkX18zMC5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgIHRvUHJvcGVydHkgPSAkX18zMC50b1Byb3BlcnR5O1xuICB2YXIgaXRlcmF0ZWRTdHJpbmcgPSBTeW1ib2woJ2l0ZXJhdGVkU3RyaW5nJyk7XG4gIHZhciBzdHJpbmdJdGVyYXRvck5leHRJbmRleCA9IFN5bWJvbCgnc3RyaW5nSXRlcmF0b3JOZXh0SW5kZXgnKTtcbiAgdmFyIFN0cmluZ0l0ZXJhdG9yID0gZnVuY3Rpb24gU3RyaW5nSXRlcmF0b3IoKSB7fTtcbiAgKCR0cmFjZXVyUnVudGltZS5jcmVhdGVDbGFzcykoU3RyaW5nSXRlcmF0b3IsICgkX18yOSA9IHt9LCBPYmplY3QuZGVmaW5lUHJvcGVydHkoJF9fMjksIFwibmV4dFwiLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG8gPSB0aGlzO1xuICAgICAgaWYgKCFpc09iamVjdChvKSB8fCAhaGFzT3duUHJvcGVydHkobywgaXRlcmF0ZWRTdHJpbmcpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RoaXMgbXVzdCBiZSBhIFN0cmluZ0l0ZXJhdG9yIG9iamVjdCcpO1xuICAgICAgfVxuICAgICAgdmFyIHMgPSBvW3RvUHJvcGVydHkoaXRlcmF0ZWRTdHJpbmcpXTtcbiAgICAgIGlmIChzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICB2YXIgcG9zaXRpb24gPSBvW3RvUHJvcGVydHkoc3RyaW5nSXRlcmF0b3JOZXh0SW5kZXgpXTtcbiAgICAgIHZhciBsZW4gPSBzLmxlbmd0aDtcbiAgICAgIGlmIChwb3NpdGlvbiA+PSBsZW4pIHtcbiAgICAgICAgb1t0b1Byb3BlcnR5KGl0ZXJhdGVkU3RyaW5nKV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCh1bmRlZmluZWQsIHRydWUpO1xuICAgICAgfVxuICAgICAgdmFyIGZpcnN0ID0gcy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICAgIHZhciByZXN1bHRTdHJpbmc7XG4gICAgICBpZiAoZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBsZW4pIHtcbiAgICAgICAgcmVzdWx0U3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZShmaXJzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc2Vjb25kID0gcy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSk7XG4gICAgICAgIGlmIChzZWNvbmQgPCAweERDMDAgfHwgc2Vjb25kID4gMHhERkZGKSB7XG4gICAgICAgICAgcmVzdWx0U3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZShmaXJzdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0U3RyaW5nID0gU3RyaW5nLmZyb21DaGFyQ29kZShmaXJzdCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKHNlY29uZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9bdG9Qcm9wZXJ0eShzdHJpbmdJdGVyYXRvck5leHRJbmRleCldID0gcG9zaXRpb24gKyByZXN1bHRTdHJpbmcubGVuZ3RoO1xuICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0KHJlc3VsdFN0cmluZywgZmFsc2UpO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgkX18yOSwgU3ltYm9sLml0ZXJhdG9yLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZVxuICB9KSwgJF9fMjkpLCB7fSk7XG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmluZ0l0ZXJhdG9yKHN0cmluZykge1xuICAgIHZhciBzID0gU3RyaW5nKHN0cmluZyk7XG4gICAgdmFyIGl0ZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShTdHJpbmdJdGVyYXRvci5wcm90b3R5cGUpO1xuICAgIGl0ZXJhdG9yW3RvUHJvcGVydHkoaXRlcmF0ZWRTdHJpbmcpXSA9IHM7XG4gICAgaXRlcmF0b3JbdG9Qcm9wZXJ0eShzdHJpbmdJdGVyYXRvck5leHRJbmRleCldID0gMDtcbiAgICByZXR1cm4gaXRlcmF0b3I7XG4gIH1cbiAgcmV0dXJuIHtnZXQgY3JlYXRlU3RyaW5nSXRlcmF0b3IoKSB7XG4gICAgICByZXR1cm4gY3JlYXRlU3RyaW5nSXRlcmF0b3I7XG4gICAgfX07XG59KTtcblN5c3RlbS5yZWdpc3RlcihcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZ1wiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9TdHJpbmdcIjtcbiAgdmFyIGNyZWF0ZVN0cmluZ0l0ZXJhdG9yID0gU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL1N0cmluZ0l0ZXJhdG9yXCIpLmNyZWF0ZVN0cmluZ0l0ZXJhdG9yO1xuICB2YXIgJF9fMzIgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBtYXliZUFkZEZ1bmN0aW9ucyA9ICRfXzMyLm1heWJlQWRkRnVuY3Rpb25zLFxuICAgICAgbWF5YmVBZGRJdGVyYXRvciA9ICRfXzMyLm1heWJlQWRkSXRlcmF0b3IsXG4gICAgICByZWdpc3RlclBvbHlmaWxsID0gJF9fMzIucmVnaXN0ZXJQb2x5ZmlsbDtcbiAgdmFyICR0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciAkaW5kZXhPZiA9IFN0cmluZy5wcm90b3R5cGUuaW5kZXhPZjtcbiAgdmFyICRsYXN0SW5kZXhPZiA9IFN0cmluZy5wcm90b3R5cGUubGFzdEluZGV4T2Y7XG4gIGZ1bmN0aW9uIHN0YXJ0c1dpdGgoc2VhcmNoKSB7XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICBpZiAodGhpcyA9PSBudWxsIHx8ICR0b1N0cmluZy5jYWxsKHNlYXJjaCkgPT0gJ1tvYmplY3QgUmVnRXhwXScpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICB2YXIgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgc2VhcmNoU3RyaW5nID0gU3RyaW5nKHNlYXJjaCk7XG4gICAgdmFyIHNlYXJjaExlbmd0aCA9IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gICAgdmFyIHBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIHBvcyA9IHBvc2l0aW9uID8gTnVtYmVyKHBvc2l0aW9uKSA6IDA7XG4gICAgaWYgKGlzTmFOKHBvcykpIHtcbiAgICAgIHBvcyA9IDA7XG4gICAgfVxuICAgIHZhciBzdGFydCA9IE1hdGgubWluKE1hdGgubWF4KHBvcywgMCksIHN0cmluZ0xlbmd0aCk7XG4gICAgcmV0dXJuICRpbmRleE9mLmNhbGwoc3RyaW5nLCBzZWFyY2hTdHJpbmcsIHBvcykgPT0gc3RhcnQ7XG4gIH1cbiAgZnVuY3Rpb24gZW5kc1dpdGgoc2VhcmNoKSB7XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICBpZiAodGhpcyA9PSBudWxsIHx8ICR0b1N0cmluZy5jYWxsKHNlYXJjaCkgPT0gJ1tvYmplY3QgUmVnRXhwXScpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgIH1cbiAgICB2YXIgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgc2VhcmNoU3RyaW5nID0gU3RyaW5nKHNlYXJjaCk7XG4gICAgdmFyIHNlYXJjaExlbmd0aCA9IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gICAgdmFyIHBvcyA9IHN0cmluZ0xlbmd0aDtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBwb3NpdGlvbiA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChwb3NpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBvcyA9IHBvc2l0aW9uID8gTnVtYmVyKHBvc2l0aW9uKSA6IDA7XG4gICAgICAgIGlmIChpc05hTihwb3MpKSB7XG4gICAgICAgICAgcG9zID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB2YXIgZW5kID0gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgc3RyaW5nTGVuZ3RoKTtcbiAgICB2YXIgc3RhcnQgPSBlbmQgLSBzZWFyY2hMZW5ndGg7XG4gICAgaWYgKHN0YXJ0IDwgMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gJGxhc3RJbmRleE9mLmNhbGwoc3RyaW5nLCBzZWFyY2hTdHJpbmcsIHN0YXJ0KSA9PSBzdGFydDtcbiAgfVxuICBmdW5jdGlvbiBjb250YWlucyhzZWFyY2gpIHtcbiAgICBpZiAodGhpcyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICB2YXIgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgICB2YXIgc2VhcmNoU3RyaW5nID0gU3RyaW5nKHNlYXJjaCk7XG4gICAgdmFyIHNlYXJjaExlbmd0aCA9IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gICAgdmFyIHBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIHBvcyA9IHBvc2l0aW9uID8gTnVtYmVyKHBvc2l0aW9uKSA6IDA7XG4gICAgaWYgKGlzTmFOKHBvcykpIHtcbiAgICAgIHBvcyA9IDA7XG4gICAgfVxuICAgIHZhciBzdGFydCA9IE1hdGgubWluKE1hdGgubWF4KHBvcywgMCksIHN0cmluZ0xlbmd0aCk7XG4gICAgcmV0dXJuICRpbmRleE9mLmNhbGwoc3RyaW5nLCBzZWFyY2hTdHJpbmcsIHBvcykgIT0gLTE7XG4gIH1cbiAgZnVuY3Rpb24gcmVwZWF0KGNvdW50KSB7XG4gICAgaWYgKHRoaXMgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgfVxuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgdmFyIG4gPSBjb3VudCA/IE51bWJlcihjb3VudCkgOiAwO1xuICAgIGlmIChpc05hTihuKSkge1xuICAgICAgbiA9IDA7XG4gICAgfVxuICAgIGlmIChuIDwgMCB8fCBuID09IEluZmluaXR5KSB7XG4gICAgICB0aHJvdyBSYW5nZUVycm9yKCk7XG4gICAgfVxuICAgIGlmIChuID09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHdoaWxlIChuLS0pIHtcbiAgICAgIHJlc3VsdCArPSBzdHJpbmc7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gY29kZVBvaW50QXQocG9zaXRpb24pIHtcbiAgICBpZiAodGhpcyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICB2YXIgc2l6ZSA9IHN0cmluZy5sZW5ndGg7XG4gICAgdmFyIGluZGV4ID0gcG9zaXRpb24gPyBOdW1iZXIocG9zaXRpb24pIDogMDtcbiAgICBpZiAoaXNOYU4oaW5kZXgpKSB7XG4gICAgICBpbmRleCA9IDA7XG4gICAgfVxuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gc2l6ZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdmFyIGZpcnN0ID0gc3RyaW5nLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgIHZhciBzZWNvbmQ7XG4gICAgaWYgKGZpcnN0ID49IDB4RDgwMCAmJiBmaXJzdCA8PSAweERCRkYgJiYgc2l6ZSA+IGluZGV4ICsgMSkge1xuICAgICAgc2Vjb25kID0gc3RyaW5nLmNoYXJDb2RlQXQoaW5kZXggKyAxKTtcbiAgICAgIGlmIChzZWNvbmQgPj0gMHhEQzAwICYmIHNlY29uZCA8PSAweERGRkYpIHtcbiAgICAgICAgcmV0dXJuIChmaXJzdCAtIDB4RDgwMCkgKiAweDQwMCArIHNlY29uZCAtIDB4REMwMCArIDB4MTAwMDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaXJzdDtcbiAgfVxuICBmdW5jdGlvbiByYXcoY2FsbHNpdGUpIHtcbiAgICB2YXIgcmF3ID0gY2FsbHNpdGUucmF3O1xuICAgIHZhciBsZW4gPSByYXcubGVuZ3RoID4+PiAwO1xuICAgIGlmIChsZW4gPT09IDApXG4gICAgICByZXR1cm4gJyc7XG4gICAgdmFyIHMgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHMgKz0gcmF3W2ldO1xuICAgICAgaWYgKGkgKyAxID09PSBsZW4pXG4gICAgICAgIHJldHVybiBzO1xuICAgICAgcyArPSBhcmd1bWVudHNbKytpXTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZnJvbUNvZGVQb2ludCgpIHtcbiAgICB2YXIgY29kZVVuaXRzID0gW107XG4gICAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbiAgICB2YXIgaGlnaFN1cnJvZ2F0ZTtcbiAgICB2YXIgbG93U3Vycm9nYXRlO1xuICAgIHZhciBpbmRleCA9IC0xO1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgY29kZVBvaW50ID0gTnVtYmVyKGFyZ3VtZW50c1tpbmRleF0pO1xuICAgICAgaWYgKCFpc0Zpbml0ZShjb2RlUG9pbnQpIHx8IGNvZGVQb2ludCA8IDAgfHwgY29kZVBvaW50ID4gMHgxMEZGRkYgfHwgZmxvb3IoY29kZVBvaW50KSAhPSBjb2RlUG9pbnQpIHtcbiAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcignSW52YWxpZCBjb2RlIHBvaW50OiAnICsgY29kZVBvaW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2RlUG9pbnQgPD0gMHhGRkZGKSB7XG4gICAgICAgIGNvZGVVbml0cy5wdXNoKGNvZGVQb2ludCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMDtcbiAgICAgICAgaGlnaFN1cnJvZ2F0ZSA9IChjb2RlUG9pbnQgPj4gMTApICsgMHhEODAwO1xuICAgICAgICBsb3dTdXJyb2dhdGUgPSAoY29kZVBvaW50ICUgMHg0MDApICsgMHhEQzAwO1xuICAgICAgICBjb2RlVW5pdHMucHVzaChoaWdoU3Vycm9nYXRlLCBsb3dTdXJyb2dhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBjb2RlVW5pdHMpO1xuICB9XG4gIGZ1bmN0aW9uIHN0cmluZ1Byb3RvdHlwZUl0ZXJhdG9yKCkge1xuICAgIHZhciBvID0gJHRyYWNldXJSdW50aW1lLmNoZWNrT2JqZWN0Q29lcmNpYmxlKHRoaXMpO1xuICAgIHZhciBzID0gU3RyaW5nKG8pO1xuICAgIHJldHVybiBjcmVhdGVTdHJpbmdJdGVyYXRvcihzKTtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbFN0cmluZyhnbG9iYWwpIHtcbiAgICB2YXIgU3RyaW5nID0gZ2xvYmFsLlN0cmluZztcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhTdHJpbmcucHJvdG90eXBlLCBbJ2NvZGVQb2ludEF0JywgY29kZVBvaW50QXQsICdjb250YWlucycsIGNvbnRhaW5zLCAnZW5kc1dpdGgnLCBlbmRzV2l0aCwgJ3N0YXJ0c1dpdGgnLCBzdGFydHNXaXRoLCAncmVwZWF0JywgcmVwZWF0XSk7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoU3RyaW5nLCBbJ2Zyb21Db2RlUG9pbnQnLCBmcm9tQ29kZVBvaW50LCAncmF3JywgcmF3XSk7XG4gICAgbWF5YmVBZGRJdGVyYXRvcihTdHJpbmcucHJvdG90eXBlLCBzdHJpbmdQcm90b3R5cGVJdGVyYXRvciwgU3ltYm9sKTtcbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsU3RyaW5nKTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgc3RhcnRzV2l0aCgpIHtcbiAgICAgIHJldHVybiBzdGFydHNXaXRoO1xuICAgIH0sXG4gICAgZ2V0IGVuZHNXaXRoKCkge1xuICAgICAgcmV0dXJuIGVuZHNXaXRoO1xuICAgIH0sXG4gICAgZ2V0IGNvbnRhaW5zKCkge1xuICAgICAgcmV0dXJuIGNvbnRhaW5zO1xuICAgIH0sXG4gICAgZ2V0IHJlcGVhdCgpIHtcbiAgICAgIHJldHVybiByZXBlYXQ7XG4gICAgfSxcbiAgICBnZXQgY29kZVBvaW50QXQoKSB7XG4gICAgICByZXR1cm4gY29kZVBvaW50QXQ7XG4gICAgfSxcbiAgICBnZXQgcmF3KCkge1xuICAgICAgcmV0dXJuIHJhdztcbiAgICB9LFxuICAgIGdldCBmcm9tQ29kZVBvaW50KCkge1xuICAgICAgcmV0dXJuIGZyb21Db2RlUG9pbnQ7XG4gICAgfSxcbiAgICBnZXQgc3RyaW5nUHJvdG90eXBlSXRlcmF0b3IoKSB7XG4gICAgICByZXR1cm4gc3RyaW5nUHJvdG90eXBlSXRlcmF0b3I7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxTdHJpbmcoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxTdHJpbmc7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvU3RyaW5nXCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheUl0ZXJhdG9yXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkX18zNjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvQXJyYXlJdGVyYXRvclwiO1xuICB2YXIgJF9fMzQgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICB0b09iamVjdCA9ICRfXzM0LnRvT2JqZWN0LFxuICAgICAgdG9VaW50MzIgPSAkX18zNC50b1VpbnQzMixcbiAgICAgIGNyZWF0ZUl0ZXJhdG9yUmVzdWx0T2JqZWN0ID0gJF9fMzQuY3JlYXRlSXRlcmF0b3JSZXN1bHRPYmplY3Q7XG4gIHZhciBBUlJBWV9JVEVSQVRPUl9LSU5EX0tFWVMgPSAxO1xuICB2YXIgQVJSQVlfSVRFUkFUT1JfS0lORF9WQUxVRVMgPSAyO1xuICB2YXIgQVJSQVlfSVRFUkFUT1JfS0lORF9FTlRSSUVTID0gMztcbiAgdmFyIEFycmF5SXRlcmF0b3IgPSBmdW5jdGlvbiBBcnJheUl0ZXJhdG9yKCkge307XG4gICgkdHJhY2V1clJ1bnRpbWUuY3JlYXRlQ2xhc3MpKEFycmF5SXRlcmF0b3IsICgkX18zNiA9IHt9LCBPYmplY3QuZGVmaW5lUHJvcGVydHkoJF9fMzYsIFwibmV4dFwiLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGl0ZXJhdG9yID0gdG9PYmplY3QodGhpcyk7XG4gICAgICB2YXIgYXJyYXkgPSBpdGVyYXRvci5pdGVyYXRvck9iamVjdF87XG4gICAgICBpZiAoIWFycmF5KSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdCBpcyBub3QgYW4gQXJyYXlJdGVyYXRvcicpO1xuICAgICAgfVxuICAgICAgdmFyIGluZGV4ID0gaXRlcmF0b3IuYXJyYXlJdGVyYXRvck5leHRJbmRleF87XG4gICAgICB2YXIgaXRlbUtpbmQgPSBpdGVyYXRvci5hcnJheUl0ZXJhdGlvbktpbmRfO1xuICAgICAgdmFyIGxlbmd0aCA9IHRvVWludDMyKGFycmF5Lmxlbmd0aCk7XG4gICAgICBpZiAoaW5kZXggPj0gbGVuZ3RoKSB7XG4gICAgICAgIGl0ZXJhdG9yLmFycmF5SXRlcmF0b3JOZXh0SW5kZXhfID0gSW5maW5pdHk7XG4gICAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdCh1bmRlZmluZWQsIHRydWUpO1xuICAgICAgfVxuICAgICAgaXRlcmF0b3IuYXJyYXlJdGVyYXRvck5leHRJbmRleF8gPSBpbmRleCArIDE7XG4gICAgICBpZiAoaXRlbUtpbmQgPT0gQVJSQVlfSVRFUkFUT1JfS0lORF9WQUxVRVMpXG4gICAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdChhcnJheVtpbmRleF0sIGZhbHNlKTtcbiAgICAgIGlmIChpdGVtS2luZCA9PSBBUlJBWV9JVEVSQVRPUl9LSU5EX0VOVFJJRVMpXG4gICAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdChbaW5kZXgsIGFycmF5W2luZGV4XV0sIGZhbHNlKTtcbiAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvclJlc3VsdE9iamVjdChpbmRleCwgZmFsc2UpO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWVcbiAgfSksIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgkX18zNiwgU3ltYm9sLml0ZXJhdG9yLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB3cml0YWJsZTogdHJ1ZVxuICB9KSwgJF9fMzYpLCB7fSk7XG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5SXRlcmF0b3IoYXJyYXksIGtpbmQpIHtcbiAgICB2YXIgb2JqZWN0ID0gdG9PYmplY3QoYXJyYXkpO1xuICAgIHZhciBpdGVyYXRvciA9IG5ldyBBcnJheUl0ZXJhdG9yO1xuICAgIGl0ZXJhdG9yLml0ZXJhdG9yT2JqZWN0XyA9IG9iamVjdDtcbiAgICBpdGVyYXRvci5hcnJheUl0ZXJhdG9yTmV4dEluZGV4XyA9IDA7XG4gICAgaXRlcmF0b3IuYXJyYXlJdGVyYXRpb25LaW5kXyA9IGtpbmQ7XG4gICAgcmV0dXJuIGl0ZXJhdG9yO1xuICB9XG4gIGZ1bmN0aW9uIGVudHJpZXMoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUFycmF5SXRlcmF0b3IodGhpcywgQVJSQVlfSVRFUkFUT1JfS0lORF9FTlRSSUVTKTtcbiAgfVxuICBmdW5jdGlvbiBrZXlzKCkge1xuICAgIHJldHVybiBjcmVhdGVBcnJheUl0ZXJhdG9yKHRoaXMsIEFSUkFZX0lURVJBVE9SX0tJTkRfS0VZUyk7XG4gIH1cbiAgZnVuY3Rpb24gdmFsdWVzKCkge1xuICAgIHJldHVybiBjcmVhdGVBcnJheUl0ZXJhdG9yKHRoaXMsIEFSUkFZX0lURVJBVE9SX0tJTkRfVkFMVUVTKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGdldCBlbnRyaWVzKCkge1xuICAgICAgcmV0dXJuIGVudHJpZXM7XG4gICAgfSxcbiAgICBnZXQga2V5cygpIHtcbiAgICAgIHJldHVybiBrZXlzO1xuICAgIH0sXG4gICAgZ2V0IHZhbHVlcygpIHtcbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheVwiLCBbXSwgZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgX19tb2R1bGVOYW1lID0gXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9BcnJheVwiO1xuICB2YXIgJF9fMzcgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvQXJyYXlJdGVyYXRvclwiKSxcbiAgICAgIGVudHJpZXMgPSAkX18zNy5lbnRyaWVzLFxuICAgICAga2V5cyA9ICRfXzM3LmtleXMsXG4gICAgICB2YWx1ZXMgPSAkX18zNy52YWx1ZXM7XG4gIHZhciAkX18zOCA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKSxcbiAgICAgIGNoZWNrSXRlcmFibGUgPSAkX18zOC5jaGVja0l0ZXJhYmxlLFxuICAgICAgaXNDYWxsYWJsZSA9ICRfXzM4LmlzQ2FsbGFibGUsXG4gICAgICBpc0NvbnN0cnVjdG9yID0gJF9fMzguaXNDb25zdHJ1Y3RvcixcbiAgICAgIG1heWJlQWRkRnVuY3Rpb25zID0gJF9fMzgubWF5YmVBZGRGdW5jdGlvbnMsXG4gICAgICBtYXliZUFkZEl0ZXJhdG9yID0gJF9fMzgubWF5YmVBZGRJdGVyYXRvcixcbiAgICAgIHJlZ2lzdGVyUG9seWZpbGwgPSAkX18zOC5yZWdpc3RlclBvbHlmaWxsLFxuICAgICAgdG9JbnRlZ2VyID0gJF9fMzgudG9JbnRlZ2VyLFxuICAgICAgdG9MZW5ndGggPSAkX18zOC50b0xlbmd0aCxcbiAgICAgIHRvT2JqZWN0ID0gJF9fMzgudG9PYmplY3Q7XG4gIGZ1bmN0aW9uIGZyb20oYXJyTGlrZSkge1xuICAgIHZhciBtYXBGbiA9IGFyZ3VtZW50c1sxXTtcbiAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1syXTtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGl0ZW1zID0gdG9PYmplY3QoYXJyTGlrZSk7XG4gICAgdmFyIG1hcHBpbmcgPSBtYXBGbiAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBrID0gMDtcbiAgICB2YXIgYXJyLFxuICAgICAgICBsZW47XG4gICAgaWYgKG1hcHBpbmcgJiYgIWlzQ2FsbGFibGUobWFwRm4pKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgaWYgKGNoZWNrSXRlcmFibGUoaXRlbXMpKSB7XG4gICAgICBhcnIgPSBpc0NvbnN0cnVjdG9yKEMpID8gbmV3IEMoKSA6IFtdO1xuICAgICAgZm9yICh2YXIgJF9fMzkgPSBpdGVtc1tTeW1ib2wuaXRlcmF0b3JdKCksXG4gICAgICAgICAgJF9fNDA7ICEoJF9fNDAgPSAkX18zOS5uZXh0KCkpLmRvbmU7ICkge1xuICAgICAgICB2YXIgaXRlbSA9ICRfXzQwLnZhbHVlO1xuICAgICAgICB7XG4gICAgICAgICAgaWYgKG1hcHBpbmcpIHtcbiAgICAgICAgICAgIGFycltrXSA9IG1hcEZuLmNhbGwodGhpc0FyZywgaXRlbSwgayk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFycltrXSA9IGl0ZW07XG4gICAgICAgICAgfVxuICAgICAgICAgIGsrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXJyLmxlbmd0aCA9IGs7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgICBsZW4gPSB0b0xlbmd0aChpdGVtcy5sZW5ndGgpO1xuICAgIGFyciA9IGlzQ29uc3RydWN0b3IoQykgPyBuZXcgQyhsZW4pIDogbmV3IEFycmF5KGxlbik7XG4gICAgZm9yICg7IGsgPCBsZW47IGsrKykge1xuICAgICAgaWYgKG1hcHBpbmcpIHtcbiAgICAgICAgYXJyW2tdID0gdHlwZW9mIHRoaXNBcmcgPT09ICd1bmRlZmluZWQnID8gbWFwRm4oaXRlbXNba10sIGspIDogbWFwRm4uY2FsbCh0aGlzQXJnLCBpdGVtc1trXSwgayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJba10gPSBpdGVtc1trXTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXJyLmxlbmd0aCA9IGxlbjtcbiAgICByZXR1cm4gYXJyO1xuICB9XG4gIGZ1bmN0aW9uIG9mKCkge1xuICAgIGZvciAodmFyIGl0ZW1zID0gW10sXG4gICAgICAgICRfXzQxID0gMDsgJF9fNDEgPCBhcmd1bWVudHMubGVuZ3RoOyAkX180MSsrKVxuICAgICAgaXRlbXNbJF9fNDFdID0gYXJndW1lbnRzWyRfXzQxXTtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGxlbiA9IGl0ZW1zLmxlbmd0aDtcbiAgICB2YXIgYXJyID0gaXNDb25zdHJ1Y3RvcihDKSA/IG5ldyBDKGxlbikgOiBuZXcgQXJyYXkobGVuKTtcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IGxlbjsgaysrKSB7XG4gICAgICBhcnJba10gPSBpdGVtc1trXTtcbiAgICB9XG4gICAgYXJyLmxlbmd0aCA9IGxlbjtcbiAgICByZXR1cm4gYXJyO1xuICB9XG4gIGZ1bmN0aW9uIGZpbGwodmFsdWUpIHtcbiAgICB2YXIgc3RhcnQgPSBhcmd1bWVudHNbMV0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzFdIDogMDtcbiAgICB2YXIgZW5kID0gYXJndW1lbnRzWzJdO1xuICAgIHZhciBvYmplY3QgPSB0b09iamVjdCh0aGlzKTtcbiAgICB2YXIgbGVuID0gdG9MZW5ndGgob2JqZWN0Lmxlbmd0aCk7XG4gICAgdmFyIGZpbGxTdGFydCA9IHRvSW50ZWdlcihzdGFydCk7XG4gICAgdmFyIGZpbGxFbmQgPSBlbmQgIT09IHVuZGVmaW5lZCA/IHRvSW50ZWdlcihlbmQpIDogbGVuO1xuICAgIGZpbGxTdGFydCA9IGZpbGxTdGFydCA8IDAgPyBNYXRoLm1heChsZW4gKyBmaWxsU3RhcnQsIDApIDogTWF0aC5taW4oZmlsbFN0YXJ0LCBsZW4pO1xuICAgIGZpbGxFbmQgPSBmaWxsRW5kIDwgMCA/IE1hdGgubWF4KGxlbiArIGZpbGxFbmQsIDApIDogTWF0aC5taW4oZmlsbEVuZCwgbGVuKTtcbiAgICB3aGlsZSAoZmlsbFN0YXJ0IDwgZmlsbEVuZCkge1xuICAgICAgb2JqZWN0W2ZpbGxTdGFydF0gPSB2YWx1ZTtcbiAgICAgIGZpbGxTdGFydCsrO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIGZ1bmN0aW9uIGZpbmQocHJlZGljYXRlKSB7XG4gICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgcmV0dXJuIGZpbmRIZWxwZXIodGhpcywgcHJlZGljYXRlLCB0aGlzQXJnKTtcbiAgfVxuICBmdW5jdGlvbiBmaW5kSW5kZXgocHJlZGljYXRlKSB7XG4gICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgcmV0dXJuIGZpbmRIZWxwZXIodGhpcywgcHJlZGljYXRlLCB0aGlzQXJnLCB0cnVlKTtcbiAgfVxuICBmdW5jdGlvbiBmaW5kSGVscGVyKHNlbGYsIHByZWRpY2F0ZSkge1xuICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzJdO1xuICAgIHZhciByZXR1cm5JbmRleCA9IGFyZ3VtZW50c1szXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbM10gOiBmYWxzZTtcbiAgICB2YXIgb2JqZWN0ID0gdG9PYmplY3Qoc2VsZik7XG4gICAgdmFyIGxlbiA9IHRvTGVuZ3RoKG9iamVjdC5sZW5ndGgpO1xuICAgIGlmICghaXNDYWxsYWJsZShwcmVkaWNhdGUpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGkgaW4gb2JqZWN0KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IG9iamVjdFtpXTtcbiAgICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBvYmplY3QpKSB7XG4gICAgICAgICAgcmV0dXJuIHJldHVybkluZGV4ID8gaSA6IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5JbmRleCA/IC0xIDogdW5kZWZpbmVkO1xuICB9XG4gIGZ1bmN0aW9uIHBvbHlmaWxsQXJyYXkoZ2xvYmFsKSB7XG4gICAgdmFyICRfXzQyID0gZ2xvYmFsLFxuICAgICAgICBBcnJheSA9ICRfXzQyLkFycmF5LFxuICAgICAgICBPYmplY3QgPSAkX180Mi5PYmplY3QsXG4gICAgICAgIFN5bWJvbCA9ICRfXzQyLlN5bWJvbDtcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhBcnJheS5wcm90b3R5cGUsIFsnZW50cmllcycsIGVudHJpZXMsICdrZXlzJywga2V5cywgJ3ZhbHVlcycsIHZhbHVlcywgJ2ZpbGwnLCBmaWxsLCAnZmluZCcsIGZpbmQsICdmaW5kSW5kZXgnLCBmaW5kSW5kZXhdKTtcbiAgICBtYXliZUFkZEZ1bmN0aW9ucyhBcnJheSwgWydmcm9tJywgZnJvbSwgJ29mJywgb2ZdKTtcbiAgICBtYXliZUFkZEl0ZXJhdG9yKEFycmF5LnByb3RvdHlwZSwgdmFsdWVzLCBTeW1ib2wpO1xuICAgIG1heWJlQWRkSXRlcmF0b3IoT2JqZWN0LmdldFByb3RvdHlwZU9mKFtdLnZhbHVlcygpKSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBTeW1ib2wpO1xuICB9XG4gIHJlZ2lzdGVyUG9seWZpbGwocG9seWZpbGxBcnJheSk7XG4gIHJldHVybiB7XG4gICAgZ2V0IGZyb20oKSB7XG4gICAgICByZXR1cm4gZnJvbTtcbiAgICB9LFxuICAgIGdldCBvZigpIHtcbiAgICAgIHJldHVybiBvZjtcbiAgICB9LFxuICAgIGdldCBmaWxsKCkge1xuICAgICAgcmV0dXJuIGZpbGw7XG4gICAgfSxcbiAgICBnZXQgZmluZCgpIHtcbiAgICAgIHJldHVybiBmaW5kO1xuICAgIH0sXG4gICAgZ2V0IGZpbmRJbmRleCgpIHtcbiAgICAgIHJldHVybiBmaW5kSW5kZXg7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxBcnJheSgpIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbEFycmF5O1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL0FycmF5XCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9PYmplY3RcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvT2JqZWN0XCI7XG4gIHZhciAkX180MyA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKSxcbiAgICAgIG1heWJlQWRkRnVuY3Rpb25zID0gJF9fNDMubWF5YmVBZGRGdW5jdGlvbnMsXG4gICAgICByZWdpc3RlclBvbHlmaWxsID0gJF9fNDMucmVnaXN0ZXJQb2x5ZmlsbDtcbiAgdmFyICRfXzQ0ID0gJHRyYWNldXJSdW50aW1lLFxuICAgICAgZGVmaW5lUHJvcGVydHkgPSAkX180NC5kZWZpbmVQcm9wZXJ0eSxcbiAgICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9ICRfXzQ0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgICAgIGdldE93blByb3BlcnR5TmFtZXMgPSAkX180NC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAgICAga2V5cyA9ICRfXzQ0LmtleXMsXG4gICAgICBwcml2YXRlTmFtZXMgPSAkX180NC5wcml2YXRlTmFtZXM7XG4gIGZ1bmN0aW9uIGlzKGxlZnQsIHJpZ2h0KSB7XG4gICAgaWYgKGxlZnQgPT09IHJpZ2h0KVxuICAgICAgcmV0dXJuIGxlZnQgIT09IDAgfHwgMSAvIGxlZnQgPT09IDEgLyByaWdodDtcbiAgICByZXR1cm4gbGVmdCAhPT0gbGVmdCAmJiByaWdodCAhPT0gcmlnaHQ7XG4gIH1cbiAgZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgdmFyIHByb3BzID0ga2V5cyhzb3VyY2UpO1xuICAgICAgdmFyIHAsXG4gICAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuICAgICAgZm9yIChwID0gMDsgcCA8IGxlbmd0aDsgcCsrKSB7XG4gICAgICAgIHZhciBuYW1lID0gcHJvcHNbcF07XG4gICAgICAgIGlmIChwcml2YXRlTmFtZXNbbmFtZV0pXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHNvdXJjZVtuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBmdW5jdGlvbiBtaXhpbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIHZhciBwcm9wcyA9IGdldE93blByb3BlcnR5TmFtZXMoc291cmNlKTtcbiAgICB2YXIgcCxcbiAgICAgICAgZGVzY3JpcHRvcixcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuICAgIGZvciAocCA9IDA7IHAgPCBsZW5ndGg7IHArKykge1xuICAgICAgdmFyIG5hbWUgPSBwcm9wc1twXTtcbiAgICAgIGlmIChwcml2YXRlTmFtZXNbbmFtZV0pXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHByb3BzW3BdKTtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcHNbcF0sIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG4gIGZ1bmN0aW9uIHBvbHlmaWxsT2JqZWN0KGdsb2JhbCkge1xuICAgIHZhciBPYmplY3QgPSBnbG9iYWwuT2JqZWN0O1xuICAgIG1heWJlQWRkRnVuY3Rpb25zKE9iamVjdCwgWydhc3NpZ24nLCBhc3NpZ24sICdpcycsIGlzLCAnbWl4aW4nLCBtaXhpbl0pO1xuICB9XG4gIHJlZ2lzdGVyUG9seWZpbGwocG9seWZpbGxPYmplY3QpO1xuICByZXR1cm4ge1xuICAgIGdldCBpcygpIHtcbiAgICAgIHJldHVybiBpcztcbiAgICB9LFxuICAgIGdldCBhc3NpZ24oKSB7XG4gICAgICByZXR1cm4gYXNzaWduO1xuICAgIH0sXG4gICAgZ2V0IG1peGluKCkge1xuICAgICAgcmV0dXJuIG1peGluO1xuICAgIH0sXG4gICAgZ2V0IHBvbHlmaWxsT2JqZWN0KCkge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsT2JqZWN0O1xuICAgIH1cbiAgfTtcbn0pO1xuU3lzdGVtLmdldChcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL09iamVjdFwiICsgJycpO1xuU3lzdGVtLnJlZ2lzdGVyKFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTnVtYmVyXCIsIFtdLCBmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBfX21vZHVsZU5hbWUgPSBcInRyYWNldXItcnVudGltZUAwLjAuNjIvc3JjL3J1bnRpbWUvcG9seWZpbGxzL051bWJlclwiO1xuICB2YXIgJF9fNDYgPSBTeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvdXRpbHNcIiksXG4gICAgICBpc051bWJlciA9ICRfXzQ2LmlzTnVtYmVyLFxuICAgICAgbWF5YmVBZGRDb25zdHMgPSAkX180Ni5tYXliZUFkZENvbnN0cyxcbiAgICAgIG1heWJlQWRkRnVuY3Rpb25zID0gJF9fNDYubWF5YmVBZGRGdW5jdGlvbnMsXG4gICAgICByZWdpc3RlclBvbHlmaWxsID0gJF9fNDYucmVnaXN0ZXJQb2x5ZmlsbCxcbiAgICAgIHRvSW50ZWdlciA9ICRfXzQ2LnRvSW50ZWdlcjtcbiAgdmFyICRhYnMgPSBNYXRoLmFicztcbiAgdmFyICRpc0Zpbml0ZSA9IGlzRmluaXRlO1xuICB2YXIgJGlzTmFOID0gaXNOYU47XG4gIHZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcbiAgdmFyIE1JTl9TQUZFX0lOVEVHRVIgPSAtTWF0aC5wb3coMiwgNTMpICsgMTtcbiAgdmFyIEVQU0lMT04gPSBNYXRoLnBvdygyLCAtNTIpO1xuICBmdW5jdGlvbiBOdW1iZXJJc0Zpbml0ZShudW1iZXIpIHtcbiAgICByZXR1cm4gaXNOdW1iZXIobnVtYmVyKSAmJiAkaXNGaW5pdGUobnVtYmVyKTtcbiAgfVxuICA7XG4gIGZ1bmN0aW9uIGlzSW50ZWdlcihudW1iZXIpIHtcbiAgICByZXR1cm4gTnVtYmVySXNGaW5pdGUobnVtYmVyKSAmJiB0b0ludGVnZXIobnVtYmVyKSA9PT0gbnVtYmVyO1xuICB9XG4gIGZ1bmN0aW9uIE51bWJlcklzTmFOKG51bWJlcikge1xuICAgIHJldHVybiBpc051bWJlcihudW1iZXIpICYmICRpc05hTihudW1iZXIpO1xuICB9XG4gIDtcbiAgZnVuY3Rpb24gaXNTYWZlSW50ZWdlcihudW1iZXIpIHtcbiAgICBpZiAoTnVtYmVySXNGaW5pdGUobnVtYmVyKSkge1xuICAgICAgdmFyIGludGVncmFsID0gdG9JbnRlZ2VyKG51bWJlcik7XG4gICAgICBpZiAoaW50ZWdyYWwgPT09IG51bWJlcilcbiAgICAgICAgcmV0dXJuICRhYnMoaW50ZWdyYWwpIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBwb2x5ZmlsbE51bWJlcihnbG9iYWwpIHtcbiAgICB2YXIgTnVtYmVyID0gZ2xvYmFsLk51bWJlcjtcbiAgICBtYXliZUFkZENvbnN0cyhOdW1iZXIsIFsnTUFYX1NBRkVfSU5URUdFUicsIE1BWF9TQUZFX0lOVEVHRVIsICdNSU5fU0FGRV9JTlRFR0VSJywgTUlOX1NBRkVfSU5URUdFUiwgJ0VQU0lMT04nLCBFUFNJTE9OXSk7XG4gICAgbWF5YmVBZGRGdW5jdGlvbnMoTnVtYmVyLCBbJ2lzRmluaXRlJywgTnVtYmVySXNGaW5pdGUsICdpc0ludGVnZXInLCBpc0ludGVnZXIsICdpc05hTicsIE51bWJlcklzTmFOLCAnaXNTYWZlSW50ZWdlcicsIGlzU2FmZUludGVnZXJdKTtcbiAgfVxuICByZWdpc3RlclBvbHlmaWxsKHBvbHlmaWxsTnVtYmVyKTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgTUFYX1NBRkVfSU5URUdFUigpIHtcbiAgICAgIHJldHVybiBNQVhfU0FGRV9JTlRFR0VSO1xuICAgIH0sXG4gICAgZ2V0IE1JTl9TQUZFX0lOVEVHRVIoKSB7XG4gICAgICByZXR1cm4gTUlOX1NBRkVfSU5URUdFUjtcbiAgICB9LFxuICAgIGdldCBFUFNJTE9OKCkge1xuICAgICAgcmV0dXJuIEVQU0lMT047XG4gICAgfSxcbiAgICBnZXQgaXNGaW5pdGUoKSB7XG4gICAgICByZXR1cm4gTnVtYmVySXNGaW5pdGU7XG4gICAgfSxcbiAgICBnZXQgaXNJbnRlZ2VyKCkge1xuICAgICAgcmV0dXJuIGlzSW50ZWdlcjtcbiAgICB9LFxuICAgIGdldCBpc05hTigpIHtcbiAgICAgIHJldHVybiBOdW1iZXJJc05hTjtcbiAgICB9LFxuICAgIGdldCBpc1NhZmVJbnRlZ2VyKCkge1xuICAgICAgcmV0dXJuIGlzU2FmZUludGVnZXI7XG4gICAgfSxcbiAgICBnZXQgcG9seWZpbGxOdW1iZXIoKSB7XG4gICAgICByZXR1cm4gcG9seWZpbGxOdW1iZXI7XG4gICAgfVxuICB9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvTnVtYmVyXCIgKyAnJyk7XG5TeXN0ZW0ucmVnaXN0ZXIoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy9wb2x5ZmlsbHNcIiwgW10sIGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIF9fbW9kdWxlTmFtZSA9IFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvcG9seWZpbGxzXCI7XG4gIHZhciBwb2x5ZmlsbEFsbCA9IFN5c3RlbS5nZXQoXCJ0cmFjZXVyLXJ1bnRpbWVAMC4wLjYyL3NyYy9ydW50aW1lL3BvbHlmaWxscy91dGlsc1wiKS5wb2x5ZmlsbEFsbDtcbiAgcG9seWZpbGxBbGwodGhpcyk7XG4gIHZhciBzZXR1cEdsb2JhbHMgPSAkdHJhY2V1clJ1bnRpbWUuc2V0dXBHbG9iYWxzO1xuICAkdHJhY2V1clJ1bnRpbWUuc2V0dXBHbG9iYWxzID0gZnVuY3Rpb24oZ2xvYmFsKSB7XG4gICAgc2V0dXBHbG9iYWxzKGdsb2JhbCk7XG4gICAgcG9seWZpbGxBbGwoZ2xvYmFsKTtcbiAgfTtcbiAgcmV0dXJuIHt9O1xufSk7XG5TeXN0ZW0uZ2V0KFwidHJhY2V1ci1ydW50aW1lQDAuMC42Mi9zcmMvcnVudGltZS9wb2x5ZmlsbHMvcG9seWZpbGxzXCIgKyAnJyk7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHtcIl9wcm9jZXNzXCI6M31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG47XG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgbmF2aWdhdG9yLCB1bmRlZmluZWQpIHtcbiAgdmFyIHV0aWxzLFxuICAgICAgZXJyb3IsXG4gICAgICBkZWZhdWx0T3B0aW9ucyxcbiAgICAgIGlzU3VwcG9ydGVkLFxuICAgICAgaXNXZWJDYW1HSUZTdXBwb3J0ZWQsXG4gICAgICBpc0V4aXN0aW5nSW1hZ2VzR0lGU3VwcG9ydGVkLFxuICAgICAgaXNFeGlzdGluZ1ZpZGVvR0lGU3VwcG9ydGVkLFxuICAgICAgTmV1UXVhbnQsXG4gICAgICBwcm9jZXNzRnJhbWVXb3JrZXIsXG4gICAgICBnaWZXcml0ZXIsXG4gICAgICBBbmltYXRlZEdJRixcbiAgICAgIGdldEJhc2U2NEdJRixcbiAgICAgIGV4aXN0aW5nSW1hZ2VzLFxuICAgICAgc2NyZWVuU2hvdCxcbiAgICAgIHZpZGVvU3RyZWFtLFxuICAgICAgc3RvcFZpZGVvU3RyZWFtaW5nLFxuICAgICAgY3JlYXRlQW5kR2V0R0lGLFxuICAgICAgZXhpc3RpbmdWaWRlbyxcbiAgICAgIGV4aXN0aW5nV2ViY2FtLFxuICAgICAgY3JlYXRlR0lGLFxuICAgICAgdGFrZVNuYXBTaG90LFxuICAgICAgQVBJLFxuICAgICAgX2luZGV4XztcbiAgdXRpbHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdXRpbHMgPSB7XG4gICAgICAnVVJMJzogd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMIHx8IHdpbmRvdy5tb3pVUkwgfHwgd2luZG93Lm1zVVJMLFxuICAgICAgJ2dldFVzZXJNZWRpYSc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLmdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1zR2V0VXNlck1lZGlhO1xuICAgICAgICByZXR1cm4gZ2V0VXNlck1lZGlhID8gZ2V0VXNlck1lZGlhLmJpbmQobmF2aWdhdG9yKSA6IGdldFVzZXJNZWRpYTtcbiAgICAgIH0oKSxcbiAgICAgICdCbG9iJzogd2luZG93LkJsb2IgfHwgd2luZG93LkJsb2JCdWlsZGVyIHx8IHdpbmRvdy5XZWJLaXRCbG9iQnVpbGRlciB8fCB3aW5kb3cuTW96QmxvYkJ1aWxkZXIgfHwgd2luZG93Lk1TQmxvYkJ1aWxkZXIsXG4gICAgICAnYnRvYSc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYnRvYSA9IHdpbmRvdy5idG9hIHx8IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgICAgdmFyIG91dHB1dCA9ICcnLFxuICAgICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgICAgbCA9IGlucHV0Lmxlbmd0aCxcbiAgICAgICAgICAgICAga2V5ID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JyxcbiAgICAgICAgICAgICAgY2hyMSxcbiAgICAgICAgICAgICAgY2hyMixcbiAgICAgICAgICAgICAgY2hyMyxcbiAgICAgICAgICAgICAgZW5jMSxcbiAgICAgICAgICAgICAgZW5jMixcbiAgICAgICAgICAgICAgZW5jMyxcbiAgICAgICAgICAgICAgZW5jNDtcbiAgICAgICAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgICAgICAgIGNocjEgPSBpbnB1dC5jaGFyQ29kZUF0KGkrKyk7XG4gICAgICAgICAgICBjaHIyID0gaW5wdXQuY2hhckNvZGVBdChpKyspO1xuICAgICAgICAgICAgY2hyMyA9IGlucHV0LmNoYXJDb2RlQXQoaSsrKTtcbiAgICAgICAgICAgIGVuYzEgPSBjaHIxID4+IDI7XG4gICAgICAgICAgICBlbmMyID0gKGNocjEgJiAzKSA8PCA0IHwgY2hyMiA+PiA0O1xuICAgICAgICAgICAgZW5jMyA9IChjaHIyICYgMTUpIDw8IDIgfCBjaHIzID4+IDY7XG4gICAgICAgICAgICBlbmM0ID0gY2hyMyAmIDYzO1xuICAgICAgICAgICAgaWYgKGlzTmFOKGNocjIpKVxuICAgICAgICAgICAgICBlbmMzID0gZW5jNCA9IDY0O1xuICAgICAgICAgICAgZWxzZSBpZiAoaXNOYU4oY2hyMykpXG4gICAgICAgICAgICAgIGVuYzQgPSA2NDtcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dCArIGtleS5jaGFyQXQoZW5jMSkgKyBrZXkuY2hhckF0KGVuYzIpICsga2V5LmNoYXJBdChlbmMzKSArIGtleS5jaGFyQXQoZW5jNCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBidG9hID8gYnRvYS5iaW5kKHdpbmRvdykgOiBmdW5jdGlvbigpIHt9O1xuICAgICAgfSgpLFxuICAgICAgJ2lzT2JqZWN0JzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuICAgICAgfSxcbiAgICAgICdpc0VtcHR5T2JqZWN0JzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiB1dGlscy5pc09iamVjdChvYmopICYmICFPYmplY3Qua2V5cyhvYmopLmxlbmd0aDtcbiAgICAgIH0sXG4gICAgICAnaXNBcnJheSc6IGZ1bmN0aW9uKGFycikge1xuICAgICAgICByZXR1cm4gYXJyICYmIEFycmF5LmlzQXJyYXkoYXJyKTtcbiAgICAgIH0sXG4gICAgICAnaXNGdW5jdGlvbic6IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMgJiYgdHlwZW9mIGZ1bmMgPT09ICdmdW5jdGlvbic7XG4gICAgICB9LFxuICAgICAgJ2lzRWxlbWVudCc6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIGVsZW0gJiYgZWxlbS5ub2RlVHlwZSA9PT0gMTtcbiAgICAgIH0sXG4gICAgICAnaXNTdHJpbmcnOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBTdHJpbmddJztcbiAgICAgIH0sXG4gICAgICAnaXNTdXBwb3J0ZWQnOiB7XG4gICAgICAgICdjYW52YXMnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICByZXR1cm4gZWwgJiYgZWwuZ2V0Q29udGV4dCAmJiBlbC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB9LFxuICAgICAgICAnd2Vid29ya2Vycyc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cuV29ya2VyO1xuICAgICAgICB9LFxuICAgICAgICAnYmxvYic6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB1dGlscy5CbG9iO1xuICAgICAgICB9LFxuICAgICAgICAnVWludDhBcnJheSc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cuVWludDhBcnJheTtcbiAgICAgICAgfSxcbiAgICAgICAgJ1VpbnQzMkFycmF5JzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5VaW50MzJBcnJheTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3ZpZGVvQ29kZWNzJzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHRlc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyksXG4gICAgICAgICAgICAgIHN1cHBvcnRPYmogPSB7XG4gICAgICAgICAgICAgICAgJ21wNCc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdoMjY0JzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ29ndic6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdvZ2cnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnd2VibSc6IGZhbHNlXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKHRlc3RFbCAmJiB0ZXN0RWwuY2FuUGxheVR5cGUpIHtcbiAgICAgICAgICAgIHN1cHBvcnRPYmoubXA0ID0gdGVzdEVsLmNhblBsYXlUeXBlKCd2aWRlby9tcDQ7IGNvZGVjcz1cIm1wNHYuMjAuOFwiJykgIT09ICcnO1xuICAgICAgICAgICAgc3VwcG9ydE9iai5oMjY0ID0gKHRlc3RFbC5jYW5QbGF5VHlwZSgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRVwiJykgfHwgdGVzdEVsLmNhblBsYXlUeXBlKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFLCBtcDRhLjQwLjJcIicpKSAhPT0gJyc7XG4gICAgICAgICAgICBzdXBwb3J0T2JqLm9ndiA9IHRlc3RFbC5jYW5QbGF5VHlwZSgndmlkZW8vb2dnOyBjb2RlY3M9XCJ0aGVvcmFcIicpICE9PSAnJztcbiAgICAgICAgICAgIHN1cHBvcnRPYmoub2dnID0gdGVzdEVsLmNhblBsYXlUeXBlKCd2aWRlby9vZ2c7IGNvZGVjcz1cInRoZW9yYVwiJykgIT09ICcnO1xuICAgICAgICAgICAgc3VwcG9ydE9iai53ZWJtID0gdGVzdEVsLmNhblBsYXlUeXBlKCd2aWRlby93ZWJtOyBjb2RlY3M9XCJ2cDgsIHZvcmJpc1wiJykgIT09IC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3VwcG9ydE9iajtcbiAgICAgICAgfSgpXG4gICAgICB9LFxuICAgICAgJ25vb3AnOiBmdW5jdGlvbigpIHt9LFxuICAgICAgJ2VhY2gnOiBmdW5jdGlvbihjb2xsZWN0aW9uLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgeCxcbiAgICAgICAgICAgIGxlbjtcbiAgICAgICAgaWYgKHV0aWxzLmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgICB4ID0gLTE7XG4gICAgICAgICAgbGVuID0gY29sbGVjdGlvbi5sZW5ndGg7XG4gICAgICAgICAgd2hpbGUgKCsreCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKHgsIGNvbGxlY3Rpb25beF0pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QoY29sbGVjdGlvbikpIHtcbiAgICAgICAgICBmb3IgKHggaW4gY29sbGVjdGlvbikge1xuICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb24uaGFzT3duUHJvcGVydHkoeCkpIHtcbiAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKHgsIGNvbGxlY3Rpb25beF0pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ21lcmdlT3B0aW9ucyc6IGZ1bmN0aW9uIGRlZXBNZXJnZShkZWZhdWx0T3B0aW9ucywgdXNlck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCF1dGlscy5pc09iamVjdChkZWZhdWx0T3B0aW9ucykgfHwgIXV0aWxzLmlzT2JqZWN0KHVzZXJPcHRpb25zKSB8fCAhT2JqZWN0LmtleXMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld09iaiA9IHt9O1xuICAgICAgICB1dGlscy5lYWNoKGRlZmF1bHRPcHRpb25zLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgIG5ld09ialtrZXldID0gZGVmYXVsdE9wdGlvbnNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICAgIHV0aWxzLmVhY2godXNlck9wdGlvbnMsIGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgdmFyIGN1cnJlbnRVc2VyT3B0aW9uID0gdXNlck9wdGlvbnNba2V5XTtcbiAgICAgICAgICBpZiAoIXV0aWxzLmlzT2JqZWN0KGN1cnJlbnRVc2VyT3B0aW9uKSkge1xuICAgICAgICAgICAgbmV3T2JqW2tleV0gPSBjdXJyZW50VXNlck9wdGlvbjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFkZWZhdWx0T3B0aW9uc1trZXldKSB7XG4gICAgICAgICAgICAgIG5ld09ialtrZXldID0gY3VycmVudFVzZXJPcHRpb247XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdPYmpba2V5XSA9IGRlZXBNZXJnZShkZWZhdWx0T3B0aW9uc1trZXldLCBjdXJyZW50VXNlck9wdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld09iajtcbiAgICAgIH0sXG4gICAgICAnc2V0Q1NTQXR0cic6IGZ1bmN0aW9uKGVsZW0sIGF0dHIsIHZhbCkge1xuICAgICAgICBpZiAoIXV0aWxzLmlzRWxlbWVudChlbGVtKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoYXR0cikgJiYgdXRpbHMuaXNTdHJpbmcodmFsKSkge1xuICAgICAgICAgIGVsZW0uc3R5bGVbYXR0cl0gPSB2YWw7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QoYXR0cikpIHtcbiAgICAgICAgICB1dGlscy5lYWNoKGF0dHIsIGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICBlbGVtLnN0eWxlW2tleV0gPSB2YWw7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAncmVtb3ZlRWxlbWVudCc6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgaWYgKCF1dGlscy5pc0VsZW1lbnQobm9kZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdjcmVhdGVXZWJXb3JrZXInOiBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgIGlmICghdXRpbHMuaXNTdHJpbmcoY29udGVudCkpIHtcbiAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgYmxvYiA9IG5ldyB1dGlscy5CbG9iKFtjb250ZW50XSwgeyd0eXBlJzogJ3RleHQvamF2YXNjcmlwdCd9KSxcbiAgICAgICAgICAgICAgb2JqZWN0VXJsID0gdXRpbHMuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSxcbiAgICAgICAgICAgICAgd29ya2VyID0gbmV3IFdvcmtlcihvYmplY3RVcmwpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnb2JqZWN0VXJsJzogb2JqZWN0VXJsLFxuICAgICAgICAgICAgJ3dvcmtlcic6IHdvcmtlclxuICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gJycgKyBlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ2dldEV4dGVuc2lvbic6IGZ1bmN0aW9uKHNyYykge1xuICAgICAgICByZXR1cm4gc3JjLnN1YnN0cihzcmMubGFzdEluZGV4T2YoJy4nKSArIDEsIHNyYy5sZW5ndGgpO1xuICAgICAgfSxcbiAgICAgICdnZXRGb250U2l6ZSc6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIGlmICghZG9jdW1lbnQuYm9keSB8fCBvcHRpb25zLnJlc2l6ZUZvbnQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZm9udFNpemU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRleHQgPSBvcHRpb25zLnRleHQsXG4gICAgICAgICAgICBjb250YWluZXJXaWR0aCA9IG9wdGlvbnMuZ2lmV2lkdGgsXG4gICAgICAgICAgICBmb250U2l6ZSA9IHBhcnNlSW50KG9wdGlvbnMuZm9udFNpemUsIDEwKSxcbiAgICAgICAgICAgIG1pbkZvbnRTaXplID0gcGFyc2VJbnQob3B0aW9ucy5taW5Gb250U2l6ZSwgMTApLFxuICAgICAgICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGNvbnRhaW5lcldpZHRoKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICBzcGFuLmlubmVySFRNTCA9IHRleHQ7XG4gICAgICAgIHNwYW4uc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZSArICdweCc7XG4gICAgICAgIHNwYW4uc3R5bGUudGV4dEluZGVudCA9ICctOTk5OXB4JztcbiAgICAgICAgc3Bhbi5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIHdoaWxlIChzcGFuLm9mZnNldFdpZHRoID4gY29udGFpbmVyV2lkdGggJiYgZm9udFNpemUgPj0gbWluRm9udFNpemUpIHtcbiAgICAgICAgICBzcGFuLnN0eWxlLmZvbnRTaXplID0gLS1mb250U2l6ZSArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzcGFuKTtcbiAgICAgICAgcmV0dXJuIGZvbnRTaXplICsgJ3B4JztcbiAgICAgIH0sXG4gICAgICAnd2ViV29ya2VyRXJyb3InOiBmYWxzZVxuICAgIH07XG4gICAgcmV0dXJuIHV0aWxzO1xuICB9KCk7XG4gIGVycm9yID0gZnVuY3Rpb24odXRpbHMpIHtcbiAgICB2YXIgZXJyb3IgPSB7XG4gICAgICAndmFsaWRhdGUnOiBmdW5jdGlvbihza2lwT2JqKSB7XG4gICAgICAgIHNraXBPYmogPSB1dGlscy5pc09iamVjdChza2lwT2JqKSA/IHNraXBPYmogOiB7fTtcbiAgICAgICAgdmFyIGVycm9yT2JqID0ge307XG4gICAgICAgIHV0aWxzLmVhY2goZXJyb3IudmFsaWRhdG9ycywgZnVuY3Rpb24oaW5kZWNlLCBjdXJyZW50VmFsaWRhdG9yKSB7XG4gICAgICAgICAgdmFyIGVycm9yQ29kZSA9IGN1cnJlbnRWYWxpZGF0b3IuZXJyb3JDb2RlO1xuICAgICAgICAgIGlmICghc2tpcE9ialtlcnJvckNvZGVdICYmICFjdXJyZW50VmFsaWRhdG9yLmNvbmRpdGlvbikge1xuICAgICAgICAgICAgZXJyb3JPYmogPSBjdXJyZW50VmFsaWRhdG9yO1xuICAgICAgICAgICAgZXJyb3JPYmouZXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRlbGV0ZSBlcnJvck9iai5jb25kaXRpb247XG4gICAgICAgIHJldHVybiBlcnJvck9iajtcbiAgICAgIH0sXG4gICAgICAnaXNWYWxpZCc6IGZ1bmN0aW9uKHNraXBPYmopIHtcbiAgICAgICAgdmFyIGVycm9yT2JqID0gZXJyb3IudmFsaWRhdGUoc2tpcE9iaiksXG4gICAgICAgICAgICBpc1ZhbGlkID0gZXJyb3JPYmouZXJyb3IgIT09IHRydWUgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgICAgfSxcbiAgICAgICd2YWxpZGF0b3JzJzogW3tcbiAgICAgICAgJ2NvbmRpdGlvbic6IHV0aWxzLmlzRnVuY3Rpb24odXRpbHMuZ2V0VXNlck1lZGlhKSxcbiAgICAgICAgJ2Vycm9yQ29kZSc6ICdnZXRVc2VyTWVkaWEnLFxuICAgICAgICAnZXJyb3JNc2cnOiAnVGhlIGdldFVzZXJNZWRpYSBBUEkgaXMgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXInXG4gICAgICB9LCB7XG4gICAgICAgICdjb25kaXRpb24nOiB1dGlscy5pc1N1cHBvcnRlZC5jYW52YXMoKSxcbiAgICAgICAgJ2Vycm9yQ29kZSc6ICdjYW52YXMnLFxuICAgICAgICAnZXJyb3JNc2cnOiAnQ2FudmFzIGVsZW1lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluIHlvdXIgYnJvd3NlcidcbiAgICAgIH0sIHtcbiAgICAgICAgJ2NvbmRpdGlvbic6IHV0aWxzLmlzU3VwcG9ydGVkLndlYndvcmtlcnMoKSxcbiAgICAgICAgJ2Vycm9yQ29kZSc6ICd3ZWJ3b3JrZXJzJyxcbiAgICAgICAgJ2Vycm9yTXNnJzogJ1RoZSBXZWIgV29ya2VycyBBUEkgaXMgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXInXG4gICAgICB9LCB7XG4gICAgICAgICdjb25kaXRpb24nOiB1dGlscy5pc0Z1bmN0aW9uKHV0aWxzLlVSTCksXG4gICAgICAgICdlcnJvckNvZGUnOiAnd2luZG93LlVSTCcsXG4gICAgICAgICdlcnJvck1zZyc6ICdUaGUgd2luZG93LlVSTCBBUEkgaXMgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXInXG4gICAgICB9LCB7XG4gICAgICAgICdjb25kaXRpb24nOiB1dGlscy5pc1N1cHBvcnRlZC5ibG9iKCksXG4gICAgICAgICdlcnJvckNvZGUnOiAnd2luZG93LkJsb2InLFxuICAgICAgICAnZXJyb3JNc2cnOiAnVGhlIHdpbmRvdy5CbG9iIEZpbGUgQVBJIGlzIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBicm93c2VyJ1xuICAgICAgfSwge1xuICAgICAgICAnY29uZGl0aW9uJzogdXRpbHMuaXNTdXBwb3J0ZWQuVWludDhBcnJheSgpLFxuICAgICAgICAnZXJyb3JDb2RlJzogJ3dpbmRvdy5VaW50OEFycmF5JyxcbiAgICAgICAgJ2Vycm9yTXNnJzogJ1RoZSB3aW5kb3cuVWludDhBcnJheSBmdW5jdGlvbiBjb25zdHJ1Y3RvciBpcyBub3Qgc3VwcG9ydGVkIGluIHlvdXIgYnJvd3NlcidcbiAgICAgIH0sIHtcbiAgICAgICAgJ2NvbmRpdGlvbic6IHV0aWxzLmlzU3VwcG9ydGVkLlVpbnQzMkFycmF5KCksXG4gICAgICAgICdlcnJvckNvZGUnOiAnd2luZG93LlVpbnQzMkFycmF5JyxcbiAgICAgICAgJ2Vycm9yTXNnJzogJ1RoZSB3aW5kb3cuVWludDMyQXJyYXkgZnVuY3Rpb24gY29uc3RydWN0b3IgaXMgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXInXG4gICAgICB9XSxcbiAgICAgICdtZXNzYWdlcyc6IHsndmlkZW9Db2RlY3MnOiB7XG4gICAgICAgICAgJ2Vycm9yQ29kZSc6ICd2aWRlb2NvZGVjJyxcbiAgICAgICAgICAnZXJyb3JNc2cnOiAnVGhlIHZpZGVvIGNvZGVjIHlvdSBhcmUgdHJ5aW5nIHRvIHVzZSBpcyBub3Qgc3VwcG9ydGVkIGluIHlvdXIgYnJvd3NlcidcbiAgICAgICAgfX1cbiAgICB9O1xuICAgIHJldHVybiBlcnJvcjtcbiAgfSh1dGlscyk7XG4gIGRlZmF1bHRPcHRpb25zID0ge1xuICAgICdzYW1wbGVJbnRlcnZhbCc6IDEwLFxuICAgICdudW1Xb3JrZXJzJzogMixcbiAgICAnZ2lmV2lkdGgnOiAyMDAsXG4gICAgJ2dpZkhlaWdodCc6IDIwMCxcbiAgICAnaW50ZXJ2YWwnOiAwLjEsXG4gICAgJ251bUZyYW1lcyc6IDEwLFxuICAgICdrZWVwQ2FtZXJhT24nOiBmYWxzZSxcbiAgICAnaW1hZ2VzJzogW10sXG4gICAgJ3ZpZGVvJzogbnVsbCxcbiAgICAnd2ViY2FtVmlkZW9FbGVtZW50JzogbnVsbCxcbiAgICAnY2FtZXJhU3RyZWFtJzogbnVsbCxcbiAgICAndGV4dCc6ICcnLFxuICAgICdmb250V2VpZ2h0JzogJ25vcm1hbCcsXG4gICAgJ2ZvbnRTaXplJzogJzE2cHgnLFxuICAgICdtaW5Gb250U2l6ZSc6ICcxMHB4JyxcbiAgICAncmVzaXplRm9udCc6IGZhbHNlLFxuICAgICdmb250RmFtaWx5JzogJ3NhbnMtc2VyaWYnLFxuICAgICdmb250Q29sb3InOiAnI2ZmZmZmZicsXG4gICAgJ3RleHRBbGlnbic6ICdjZW50ZXInLFxuICAgICd0ZXh0QmFzZWxpbmUnOiAnYm90dG9tJyxcbiAgICAndGV4dFhDb29yZGluYXRlJzogbnVsbCxcbiAgICAndGV4dFlDb29yZGluYXRlJzogbnVsbCxcbiAgICAncHJvZ3Jlc3NDYWxsYmFjayc6IGZ1bmN0aW9uKGNhcHR1cmVQcm9ncmVzcykge30sXG4gICAgJ2NvbXBsZXRlQ2FsbGJhY2snOiBmdW5jdGlvbigpIHt9LFxuICAgICdzYXZlUmVuZGVyaW5nQ29udGV4dHMnOiBmYWxzZSxcbiAgICAnc2F2ZWRSZW5kZXJpbmdDb250ZXh0cyc6IFtdXG4gIH07XG4gIGlzU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGVycm9yLmlzVmFsaWQoKTtcbiAgfTtcbiAgaXNXZWJDYW1HSUZTdXBwb3J0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZXJyb3IuaXNWYWxpZCgpO1xuICB9O1xuICBpc0V4aXN0aW5nSW1hZ2VzR0lGU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNraXBPYmogPSB7J2dldFVzZXJNZWRpYSc6IHRydWV9O1xuICAgIHJldHVybiBlcnJvci5pc1ZhbGlkKHNraXBPYmopO1xuICB9O1xuICBpc0V4aXN0aW5nVmlkZW9HSUZTdXBwb3J0ZWQgPSBmdW5jdGlvbihjb2RlY3MpIHtcbiAgICB2YXIgaXNTdXBwb3J0ZWQgPSBmYWxzZSxcbiAgICAgICAgaGFzVmFsaWRDb2RlYyA9IGZhbHNlO1xuICAgIGlmICh1dGlscy5pc0FycmF5KGNvZGVjcykgJiYgY29kZWNzLmxlbmd0aCkge1xuICAgICAgdXRpbHMuZWFjaChjb2RlY3MsIGZ1bmN0aW9uKGluZGVjZSwgY3VycmVudENvZGVjKSB7XG4gICAgICAgIGlmICh1dGlscy5pc1N1cHBvcnRlZC52aWRlb0NvZGVjc1tjdXJyZW50Q29kZWNdKSB7XG4gICAgICAgICAgaGFzVmFsaWRDb2RlYyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKCFoYXNWYWxpZENvZGVjKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzU3RyaW5nKGNvZGVjcykgJiYgY29kZWNzLmxlbmd0aCkge1xuICAgICAgaWYgKCF1dGlscy5pc1N1cHBvcnRlZC52aWRlb0NvZGVjc1tjb2RlY3NdKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVycm9yLmlzVmFsaWQoeydnZXRVc2VyTWVkaWEnOiB0cnVlfSk7XG4gIH07XG4gIE5ldVF1YW50ID0gZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gTmV1UXVhbnQoKSB7XG4gICAgICB2YXIgbmV0c2l6ZSA9IDI1NjtcbiAgICAgIHZhciBwcmltZTEgPSA0OTk7XG4gICAgICB2YXIgcHJpbWUyID0gNDkxO1xuICAgICAgdmFyIHByaW1lMyA9IDQ4NztcbiAgICAgIHZhciBwcmltZTQgPSA1MDM7XG4gICAgICB2YXIgbWlucGljdHVyZWJ5dGVzID0gMyAqIHByaW1lNDtcbiAgICAgIHZhciBtYXhuZXRwb3MgPSBuZXRzaXplIC0gMTtcbiAgICAgIHZhciBuZXRiaWFzc2hpZnQgPSA0O1xuICAgICAgdmFyIG5jeWNsZXMgPSAxMDA7XG4gICAgICB2YXIgaW50Ymlhc3NoaWZ0ID0gMTY7XG4gICAgICB2YXIgaW50YmlhcyA9IDEgPDwgaW50Ymlhc3NoaWZ0O1xuICAgICAgdmFyIGdhbW1hc2hpZnQgPSAxMDtcbiAgICAgIHZhciBnYW1tYSA9IDEgPDwgZ2FtbWFzaGlmdDtcbiAgICAgIHZhciBiZXRhc2hpZnQgPSAxMDtcbiAgICAgIHZhciBiZXRhID0gaW50YmlhcyA+PiBiZXRhc2hpZnQ7XG4gICAgICB2YXIgYmV0YWdhbW1hID0gaW50YmlhcyA8PCBnYW1tYXNoaWZ0IC0gYmV0YXNoaWZ0O1xuICAgICAgdmFyIGluaXRyYWQgPSBuZXRzaXplID4+IDM7XG4gICAgICB2YXIgcmFkaXVzYmlhc3NoaWZ0ID0gNjtcbiAgICAgIHZhciByYWRpdXNiaWFzID0gMSA8PCByYWRpdXNiaWFzc2hpZnQ7XG4gICAgICB2YXIgaW5pdHJhZGl1cyA9IGluaXRyYWQgKiByYWRpdXNiaWFzO1xuICAgICAgdmFyIHJhZGl1c2RlYyA9IDMwO1xuICAgICAgdmFyIGFscGhhYmlhc3NoaWZ0ID0gMTA7XG4gICAgICB2YXIgaW5pdGFscGhhID0gMSA8PCBhbHBoYWJpYXNzaGlmdDtcbiAgICAgIHZhciBhbHBoYWRlYztcbiAgICAgIHZhciByYWRiaWFzc2hpZnQgPSA4O1xuICAgICAgdmFyIHJhZGJpYXMgPSAxIDw8IHJhZGJpYXNzaGlmdDtcbiAgICAgIHZhciBhbHBoYXJhZGJzaGlmdCA9IGFscGhhYmlhc3NoaWZ0ICsgcmFkYmlhc3NoaWZ0O1xuICAgICAgdmFyIGFscGhhcmFkYmlhcyA9IDEgPDwgYWxwaGFyYWRic2hpZnQ7XG4gICAgICB2YXIgdGhlcGljdHVyZTtcbiAgICAgIHZhciBsZW5ndGhjb3VudDtcbiAgICAgIHZhciBzYW1wbGVmYWM7XG4gICAgICB2YXIgbmV0d29yaztcbiAgICAgIHZhciBuZXRpbmRleCA9IFtdO1xuICAgICAgdmFyIGJpYXMgPSBbXTtcbiAgICAgIHZhciBmcmVxID0gW107XG4gICAgICB2YXIgcmFkcG93ZXIgPSBbXTtcbiAgICAgIGZ1bmN0aW9uIE5ldVF1YW50Q29uc3RydWN0b3IodGhlcGljLCBsZW4sIHNhbXBsZSkge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIHA7XG4gICAgICAgIHRoZXBpY3R1cmUgPSB0aGVwaWM7XG4gICAgICAgIGxlbmd0aGNvdW50ID0gbGVuO1xuICAgICAgICBzYW1wbGVmYWMgPSBzYW1wbGU7XG4gICAgICAgIG5ldHdvcmsgPSBuZXcgQXJyYXkobmV0c2l6ZSk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuZXRzaXplOyBpKyspIHtcbiAgICAgICAgICBuZXR3b3JrW2ldID0gbmV3IEFycmF5KDQpO1xuICAgICAgICAgIHAgPSBuZXR3b3JrW2ldO1xuICAgICAgICAgIHBbMF0gPSBwWzFdID0gcFsyXSA9IChpIDw8IG5ldGJpYXNzaGlmdCArIDgpIC8gbmV0c2l6ZSB8IDA7XG4gICAgICAgICAgZnJlcVtpXSA9IGludGJpYXMgLyBuZXRzaXplIHwgMDtcbiAgICAgICAgICBiaWFzW2ldID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gY29sb3JNYXAoKSB7XG4gICAgICAgIHZhciBtYXAgPSBbXTtcbiAgICAgICAgdmFyIGluZGV4ID0gbmV3IEFycmF5KG5ldHNpemUpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ldHNpemU7IGkrKylcbiAgICAgICAgICBpbmRleFtuZXR3b3JrW2ldWzNdXSA9IGk7XG4gICAgICAgIHZhciBrID0gMDtcbiAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCBuZXRzaXplOyBsKyspIHtcbiAgICAgICAgICB2YXIgaiA9IGluZGV4W2xdO1xuICAgICAgICAgIG1hcFtrKytdID0gbmV0d29ya1tqXVswXTtcbiAgICAgICAgICBtYXBbaysrXSA9IG5ldHdvcmtbal1bMV07XG4gICAgICAgICAgbWFwW2srK10gPSBuZXR3b3JrW2pdWzJdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBpbnhidWlsZCgpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBqO1xuICAgICAgICB2YXIgc21hbGxwb3M7XG4gICAgICAgIHZhciBzbWFsbHZhbDtcbiAgICAgICAgdmFyIHA7XG4gICAgICAgIHZhciBxO1xuICAgICAgICB2YXIgcHJldmlvdXNjb2w7XG4gICAgICAgIHZhciBzdGFydHBvcztcbiAgICAgICAgcHJldmlvdXNjb2wgPSAwO1xuICAgICAgICBzdGFydHBvcyA9IDA7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuZXRzaXplOyBpKyspIHtcbiAgICAgICAgICBwID0gbmV0d29ya1tpXTtcbiAgICAgICAgICBzbWFsbHBvcyA9IGk7XG4gICAgICAgICAgc21hbGx2YWwgPSBwWzFdO1xuICAgICAgICAgIGZvciAoaiA9IGkgKyAxOyBqIDwgbmV0c2l6ZTsgaisrKSB7XG4gICAgICAgICAgICBxID0gbmV0d29ya1tqXTtcbiAgICAgICAgICAgIGlmIChxWzFdIDwgc21hbGx2YWwpIHtcbiAgICAgICAgICAgICAgc21hbGxwb3MgPSBqO1xuICAgICAgICAgICAgICBzbWFsbHZhbCA9IHFbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHEgPSBuZXR3b3JrW3NtYWxscG9zXTtcbiAgICAgICAgICBpZiAoaSAhPSBzbWFsbHBvcykge1xuICAgICAgICAgICAgaiA9IHFbMF07XG4gICAgICAgICAgICBxWzBdID0gcFswXTtcbiAgICAgICAgICAgIHBbMF0gPSBqO1xuICAgICAgICAgICAgaiA9IHFbMV07XG4gICAgICAgICAgICBxWzFdID0gcFsxXTtcbiAgICAgICAgICAgIHBbMV0gPSBqO1xuICAgICAgICAgICAgaiA9IHFbMl07XG4gICAgICAgICAgICBxWzJdID0gcFsyXTtcbiAgICAgICAgICAgIHBbMl0gPSBqO1xuICAgICAgICAgICAgaiA9IHFbM107XG4gICAgICAgICAgICBxWzNdID0gcFszXTtcbiAgICAgICAgICAgIHBbM10gPSBqO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc21hbGx2YWwgIT0gcHJldmlvdXNjb2wpIHtcbiAgICAgICAgICAgIG5ldGluZGV4W3ByZXZpb3VzY29sXSA9IHN0YXJ0cG9zICsgaSA+PiAxO1xuICAgICAgICAgICAgZm9yIChqID0gcHJldmlvdXNjb2wgKyAxOyBqIDwgc21hbGx2YWw7IGorKykge1xuICAgICAgICAgICAgICBuZXRpbmRleFtqXSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aW91c2NvbCA9IHNtYWxsdmFsO1xuICAgICAgICAgICAgc3RhcnRwb3MgPSBpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBuZXRpbmRleFtwcmV2aW91c2NvbF0gPSBzdGFydHBvcyArIG1heG5ldHBvcyA+PiAxO1xuICAgICAgICBmb3IgKGogPSBwcmV2aW91c2NvbCArIDE7IGogPCAyNTY7IGorKykge1xuICAgICAgICAgIG5ldGluZGV4W2pdID0gbWF4bmV0cG9zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBsZWFybigpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBqO1xuICAgICAgICB2YXIgYjtcbiAgICAgICAgdmFyIGc7XG4gICAgICAgIHZhciByO1xuICAgICAgICB2YXIgcmFkaXVzO1xuICAgICAgICB2YXIgcmFkO1xuICAgICAgICB2YXIgYWxwaGE7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICB2YXIgZGVsdGE7XG4gICAgICAgIHZhciBzYW1wbGVwaXhlbHM7XG4gICAgICAgIHZhciBwO1xuICAgICAgICB2YXIgcGl4O1xuICAgICAgICB2YXIgbGltO1xuICAgICAgICBpZiAobGVuZ3RoY291bnQgPCBtaW5waWN0dXJlYnl0ZXMpIHtcbiAgICAgICAgICBzYW1wbGVmYWMgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGFscGhhZGVjID0gMzAgKyAoc2FtcGxlZmFjIC0gMSkgLyAzO1xuICAgICAgICBwID0gdGhlcGljdHVyZTtcbiAgICAgICAgcGl4ID0gMDtcbiAgICAgICAgbGltID0gbGVuZ3RoY291bnQ7XG4gICAgICAgIHNhbXBsZXBpeGVscyA9IGxlbmd0aGNvdW50IC8gKDMgKiBzYW1wbGVmYWMpO1xuICAgICAgICBkZWx0YSA9IHNhbXBsZXBpeGVscyAvIG5jeWNsZXMgfCAwO1xuICAgICAgICBhbHBoYSA9IGluaXRhbHBoYTtcbiAgICAgICAgcmFkaXVzID0gaW5pdHJhZGl1cztcbiAgICAgICAgcmFkID0gcmFkaXVzID4+IHJhZGl1c2JpYXNzaGlmdDtcbiAgICAgICAgaWYgKHJhZCA8PSAxKSB7XG4gICAgICAgICAgcmFkID0gMDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmFkOyBpKyspIHtcbiAgICAgICAgICByYWRwb3dlcltpXSA9IGFscGhhICogKChyYWQgKiByYWQgLSBpICogaSkgKiByYWRiaWFzIC8gKHJhZCAqIHJhZCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsZW5ndGhjb3VudCA8IG1pbnBpY3R1cmVieXRlcykge1xuICAgICAgICAgIHN0ZXAgPSAzO1xuICAgICAgICB9IGVsc2UgaWYgKGxlbmd0aGNvdW50ICUgcHJpbWUxICE9PSAwKSB7XG4gICAgICAgICAgc3RlcCA9IDMgKiBwcmltZTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGxlbmd0aGNvdW50ICUgcHJpbWUyICE9PSAwKSB7XG4gICAgICAgICAgICBzdGVwID0gMyAqIHByaW1lMjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGxlbmd0aGNvdW50ICUgcHJpbWUzICE9PSAwKSB7XG4gICAgICAgICAgICAgIHN0ZXAgPSAzICogcHJpbWUzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RlcCA9IDMgKiBwcmltZTQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHNhbXBsZXBpeGVscykge1xuICAgICAgICAgIGIgPSAocFtwaXggKyAwXSAmIDI1NSkgPDwgbmV0Ymlhc3NoaWZ0O1xuICAgICAgICAgIGcgPSAocFtwaXggKyAxXSAmIDI1NSkgPDwgbmV0Ymlhc3NoaWZ0O1xuICAgICAgICAgIHIgPSAocFtwaXggKyAyXSAmIDI1NSkgPDwgbmV0Ymlhc3NoaWZ0O1xuICAgICAgICAgIGogPSBjb250ZXN0KGIsIGcsIHIpO1xuICAgICAgICAgIGFsdGVyc2luZ2xlKGFscGhhLCBqLCBiLCBnLCByKTtcbiAgICAgICAgICBpZiAocmFkICE9PSAwKSB7XG4gICAgICAgICAgICBhbHRlcm5laWdoKHJhZCwgaiwgYiwgZywgcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBpeCArPSBzdGVwO1xuICAgICAgICAgIGlmIChwaXggPj0gbGltKSB7XG4gICAgICAgICAgICBwaXggLT0gbGVuZ3RoY291bnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGkrKztcbiAgICAgICAgICBpZiAoZGVsdGEgPT09IDApIHtcbiAgICAgICAgICAgIGRlbHRhID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGkgJSBkZWx0YSA9PT0gMCkge1xuICAgICAgICAgICAgYWxwaGEgLT0gYWxwaGEgLyBhbHBoYWRlYztcbiAgICAgICAgICAgIHJhZGl1cyAtPSByYWRpdXMgLyByYWRpdXNkZWM7XG4gICAgICAgICAgICByYWQgPSByYWRpdXMgPj4gcmFkaXVzYmlhc3NoaWZ0O1xuICAgICAgICAgICAgaWYgKHJhZCA8PSAxKSB7XG4gICAgICAgICAgICAgIHJhZCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgcmFkOyBqKyspIHtcbiAgICAgICAgICAgICAgcmFkcG93ZXJbal0gPSBhbHBoYSAqICgocmFkICogcmFkIC0gaiAqIGopICogcmFkYmlhcyAvIChyYWQgKiByYWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG1hcChiLCBnLCByKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgajtcbiAgICAgICAgdmFyIGRpc3Q7XG4gICAgICAgIHZhciBhO1xuICAgICAgICB2YXIgYmVzdGQ7XG4gICAgICAgIHZhciBwO1xuICAgICAgICB2YXIgYmVzdDtcbiAgICAgICAgYmVzdGQgPSAxMDAwO1xuICAgICAgICBiZXN0ID0gLTE7XG4gICAgICAgIGkgPSBuZXRpbmRleFtnXTtcbiAgICAgICAgaiA9IGkgLSAxO1xuICAgICAgICB3aGlsZSAoaSA8IG5ldHNpemUgfHwgaiA+PSAwKSB7XG4gICAgICAgICAgaWYgKGkgPCBuZXRzaXplKSB7XG4gICAgICAgICAgICBwID0gbmV0d29ya1tpXTtcbiAgICAgICAgICAgIGRpc3QgPSBwWzFdIC0gZztcbiAgICAgICAgICAgIGlmIChkaXN0ID49IGJlc3RkKSB7XG4gICAgICAgICAgICAgIGkgPSBuZXRzaXplO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICBpZiAoZGlzdCA8IDApIHtcbiAgICAgICAgICAgICAgICBkaXN0ID0gLWRpc3Q7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYSA9IHBbMF0gLSBiO1xuICAgICAgICAgICAgICBpZiAoYSA8IDApIHtcbiAgICAgICAgICAgICAgICBhID0gLWE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzdCArPSBhO1xuICAgICAgICAgICAgICBpZiAoZGlzdCA8IGJlc3RkKSB7XG4gICAgICAgICAgICAgICAgYSA9IHBbMl0gLSByO1xuICAgICAgICAgICAgICAgIGlmIChhIDwgMCkge1xuICAgICAgICAgICAgICAgICAgYSA9IC1hO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkaXN0ICs9IGE7XG4gICAgICAgICAgICAgICAgaWYgKGRpc3QgPCBiZXN0ZCkge1xuICAgICAgICAgICAgICAgICAgYmVzdGQgPSBkaXN0O1xuICAgICAgICAgICAgICAgICAgYmVzdCA9IHBbM107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChqID49IDApIHtcbiAgICAgICAgICAgIHAgPSBuZXR3b3JrW2pdO1xuICAgICAgICAgICAgZGlzdCA9IGcgLSBwWzFdO1xuICAgICAgICAgICAgaWYgKGRpc3QgPj0gYmVzdGQpIHtcbiAgICAgICAgICAgICAgaiA9IC0xO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgai0tO1xuICAgICAgICAgICAgICBpZiAoZGlzdCA8IDApIHtcbiAgICAgICAgICAgICAgICBkaXN0ID0gLWRpc3Q7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYSA9IHBbMF0gLSBiO1xuICAgICAgICAgICAgICBpZiAoYSA8IDApIHtcbiAgICAgICAgICAgICAgICBhID0gLWE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGlzdCArPSBhO1xuICAgICAgICAgICAgICBpZiAoZGlzdCA8IGJlc3RkKSB7XG4gICAgICAgICAgICAgICAgYSA9IHBbMl0gLSByO1xuICAgICAgICAgICAgICAgIGlmIChhIDwgMCkge1xuICAgICAgICAgICAgICAgICAgYSA9IC1hO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkaXN0ICs9IGE7XG4gICAgICAgICAgICAgICAgaWYgKGRpc3QgPCBiZXN0ZCkge1xuICAgICAgICAgICAgICAgICAgYmVzdGQgPSBkaXN0O1xuICAgICAgICAgICAgICAgICAgYmVzdCA9IHBbM107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZXN0O1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcHJvY2VzcygpIHtcbiAgICAgICAgbGVhcm4oKTtcbiAgICAgICAgdW5iaWFzbmV0KCk7XG4gICAgICAgIGlueGJ1aWxkKCk7XG4gICAgICAgIHJldHVybiBjb2xvck1hcCgpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gdW5iaWFzbmV0KCkge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIGo7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuZXRzaXplOyBpKyspIHtcbiAgICAgICAgICBuZXR3b3JrW2ldWzBdID4+PSBuZXRiaWFzc2hpZnQ7XG4gICAgICAgICAgbmV0d29ya1tpXVsxXSA+Pj0gbmV0Ymlhc3NoaWZ0O1xuICAgICAgICAgIG5ldHdvcmtbaV1bMl0gPj49IG5ldGJpYXNzaGlmdDtcbiAgICAgICAgICBuZXR3b3JrW2ldWzNdID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gYWx0ZXJuZWlnaChyYWQsIGksIGIsIGcsIHIpIHtcbiAgICAgICAgdmFyIGo7XG4gICAgICAgIHZhciBrO1xuICAgICAgICB2YXIgbG87XG4gICAgICAgIHZhciBoaTtcbiAgICAgICAgdmFyIGE7XG4gICAgICAgIHZhciBtO1xuICAgICAgICB2YXIgcDtcbiAgICAgICAgbG8gPSBpIC0gcmFkO1xuICAgICAgICBpZiAobG8gPCAtMSkge1xuICAgICAgICAgIGxvID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgaGkgPSBpICsgcmFkO1xuICAgICAgICBpZiAoaGkgPiBuZXRzaXplKSB7XG4gICAgICAgICAgaGkgPSBuZXRzaXplO1xuICAgICAgICB9XG4gICAgICAgIGogPSBpICsgMTtcbiAgICAgICAgayA9IGkgLSAxO1xuICAgICAgICBtID0gMTtcbiAgICAgICAgd2hpbGUgKGogPCBoaSB8fCBrID4gbG8pIHtcbiAgICAgICAgICBhID0gcmFkcG93ZXJbbSsrXTtcbiAgICAgICAgICBpZiAoaiA8IGhpKSB7XG4gICAgICAgICAgICBwID0gbmV0d29ya1tqKytdO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgcFswXSAtPSBhICogKHBbMF0gLSBiKSAvIGFscGhhcmFkYmlhcyB8IDA7XG4gICAgICAgICAgICAgIHBbMV0gLT0gYSAqIChwWzFdIC0gZykgLyBhbHBoYXJhZGJpYXMgfCAwO1xuICAgICAgICAgICAgICBwWzJdIC09IGEgKiAocFsyXSAtIHIpIC8gYWxwaGFyYWRiaWFzIHwgMDtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChrID4gbG8pIHtcbiAgICAgICAgICAgIHAgPSBuZXR3b3JrW2stLV07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBwWzBdIC09IGEgKiAocFswXSAtIGIpIC8gYWxwaGFyYWRiaWFzIHwgMDtcbiAgICAgICAgICAgICAgcFsxXSAtPSBhICogKHBbMV0gLSBnKSAvIGFscGhhcmFkYmlhcyB8IDA7XG4gICAgICAgICAgICAgIHBbMl0gLT0gYSAqIChwWzJdIC0gcikgLyBhbHBoYXJhZGJpYXMgfCAwO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGFsdGVyc2luZ2xlKGFscGhhLCBpLCBiLCBnLCByKSB7XG4gICAgICAgIHZhciBuID0gbmV0d29ya1tpXTtcbiAgICAgICAgdmFyIGFscGhhTXVsdCA9IGFscGhhIC8gaW5pdGFscGhhO1xuICAgICAgICBuWzBdIC09IGFscGhhTXVsdCAqIChuWzBdIC0gYikgfCAwO1xuICAgICAgICBuWzFdIC09IGFscGhhTXVsdCAqIChuWzFdIC0gZykgfCAwO1xuICAgICAgICBuWzJdIC09IGFscGhhTXVsdCAqIChuWzJdIC0gcikgfCAwO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gY29udGVzdChiLCBnLCByKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgZGlzdDtcbiAgICAgICAgdmFyIGE7XG4gICAgICAgIHZhciBiaWFzZGlzdDtcbiAgICAgICAgdmFyIGJldGFmcmVxO1xuICAgICAgICB2YXIgYmVzdHBvcztcbiAgICAgICAgdmFyIGJlc3RiaWFzcG9zO1xuICAgICAgICB2YXIgYmVzdGQ7XG4gICAgICAgIHZhciBiZXN0Ymlhc2Q7XG4gICAgICAgIHZhciBuO1xuICAgICAgICBiZXN0ZCA9IH4oMSA8PCAzMSk7XG4gICAgICAgIGJlc3RiaWFzZCA9IGJlc3RkO1xuICAgICAgICBiZXN0cG9zID0gLTE7XG4gICAgICAgIGJlc3RiaWFzcG9zID0gYmVzdHBvcztcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5ldHNpemU7IGkrKykge1xuICAgICAgICAgIG4gPSBuZXR3b3JrW2ldO1xuICAgICAgICAgIGRpc3QgPSBuWzBdIC0gYjtcbiAgICAgICAgICBpZiAoZGlzdCA8IDApIHtcbiAgICAgICAgICAgIGRpc3QgPSAtZGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYSA9IG5bMV0gLSBnO1xuICAgICAgICAgIGlmIChhIDwgMCkge1xuICAgICAgICAgICAgYSA9IC1hO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkaXN0ICs9IGE7XG4gICAgICAgICAgYSA9IG5bMl0gLSByO1xuICAgICAgICAgIGlmIChhIDwgMCkge1xuICAgICAgICAgICAgYSA9IC1hO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkaXN0ICs9IGE7XG4gICAgICAgICAgaWYgKGRpc3QgPCBiZXN0ZCkge1xuICAgICAgICAgICAgYmVzdGQgPSBkaXN0O1xuICAgICAgICAgICAgYmVzdHBvcyA9IGk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJpYXNkaXN0ID0gZGlzdCAtIChiaWFzW2ldID4+IGludGJpYXNzaGlmdCAtIG5ldGJpYXNzaGlmdCk7XG4gICAgICAgICAgaWYgKGJpYXNkaXN0IDwgYmVzdGJpYXNkKSB7XG4gICAgICAgICAgICBiZXN0Ymlhc2QgPSBiaWFzZGlzdDtcbiAgICAgICAgICAgIGJlc3RiaWFzcG9zID0gaTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYmV0YWZyZXEgPSBmcmVxW2ldID4+IGJldGFzaGlmdDtcbiAgICAgICAgICBmcmVxW2ldIC09IGJldGFmcmVxO1xuICAgICAgICAgIGJpYXNbaV0gKz0gYmV0YWZyZXEgPDwgZ2FtbWFzaGlmdDtcbiAgICAgICAgfVxuICAgICAgICBmcmVxW2Jlc3Rwb3NdICs9IGJldGE7XG4gICAgICAgIGJpYXNbYmVzdHBvc10gLT0gYmV0YWdhbW1hO1xuICAgICAgICByZXR1cm4gYmVzdGJpYXNwb3M7XG4gICAgICB9XG4gICAgICBOZXVRdWFudENvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB2YXIgZXhwb3J0cyA9IHt9O1xuICAgICAgZXhwb3J0cy5tYXAgPSBtYXA7XG4gICAgICBleHBvcnRzLnByb2Nlc3MgPSBwcm9jZXNzO1xuICAgICAgcmV0dXJuIGV4cG9ydHM7XG4gICAgfVxuICAgIHJldHVybiBOZXVRdWFudDtcbiAgfSgpO1xuICBwcm9jZXNzRnJhbWVXb3JrZXIgPSBmdW5jdGlvbihOZXVRdWFudCkge1xuICAgIHZhciB3b3JrZXJDb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBldi5kYXRhLFxuICAgICAgICAgICAgICByZXNwb25zZSA9IHdvcmtlck1ldGhvZHMucnVuKGRhdGEpO1xuICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuZ2lmc2hvdCkge1xuICAgICAgICAgICAgcG9zdE1lc3NhZ2UocmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB2YXIgd29ya2VyTWV0aG9kcyA9IHtcbiAgICAgICAgJ2RhdGFUb1JHQic6IGZ1bmN0aW9uKGRhdGEsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgICAgIGxlbmd0aCA9IHdpZHRoICogaGVpZ2h0ICogNCxcbiAgICAgICAgICAgICAgcmdiID0gW107XG4gICAgICAgICAgd2hpbGUgKGkgPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIHJnYi5wdXNoKGRhdGFbaSsrXSk7XG4gICAgICAgICAgICByZ2IucHVzaChkYXRhW2krK10pO1xuICAgICAgICAgICAgcmdiLnB1c2goZGF0YVtpKytdKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJnYjtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvbXBvbmVudGl6ZWRQYWxldHRlVG9BcnJheSc6IGZ1bmN0aW9uKHBhbGV0dGVSR0IpIHtcbiAgICAgICAgICB2YXIgcGFsZXR0ZUFycmF5ID0gW10sXG4gICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgIHIsXG4gICAgICAgICAgICAgIGcsXG4gICAgICAgICAgICAgIGI7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhbGV0dGVSR0IubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgICAgIHIgPSBwYWxldHRlUkdCW2ldO1xuICAgICAgICAgICAgZyA9IHBhbGV0dGVSR0JbaSArIDFdO1xuICAgICAgICAgICAgYiA9IHBhbGV0dGVSR0JbaSArIDJdO1xuICAgICAgICAgICAgcGFsZXR0ZUFycmF5LnB1c2gociA8PCAxNiB8IGcgPDwgOCB8IGIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcGFsZXR0ZUFycmF5O1xuICAgICAgICB9LFxuICAgICAgICAncHJvY2Vzc0ZyYW1lV2l0aFF1YW50aXplcic6IGZ1bmN0aW9uKGltYWdlRGF0YSwgd2lkdGgsIGhlaWdodCwgc2FtcGxlSW50ZXJ2YWwpIHtcbiAgICAgICAgICB2YXIgcmdiQ29tcG9uZW50cyA9IHRoaXMuZGF0YVRvUkdCKGltYWdlRGF0YSwgd2lkdGgsIGhlaWdodCksXG4gICAgICAgICAgICAgIG5xID0gbmV3IE5ldVF1YW50KHJnYkNvbXBvbmVudHMsIHJnYkNvbXBvbmVudHMubGVuZ3RoLCBzYW1wbGVJbnRlcnZhbCksXG4gICAgICAgICAgICAgIHBhbGV0dGVSR0IgPSBucS5wcm9jZXNzKCksXG4gICAgICAgICAgICAgIHBhbGV0dGVBcnJheSA9IG5ldyBVaW50MzJBcnJheSh0aGlzLmNvbXBvbmVudGl6ZWRQYWxldHRlVG9BcnJheShwYWxldHRlUkdCKSksXG4gICAgICAgICAgICAgIG51bWJlclBpeGVscyA9IHdpZHRoICogaGVpZ2h0LFxuICAgICAgICAgICAgICBpbmRleGVkUGl4ZWxzID0gbmV3IFVpbnQ4QXJyYXkobnVtYmVyUGl4ZWxzKSxcbiAgICAgICAgICAgICAgayA9IDAsXG4gICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgIHIsXG4gICAgICAgICAgICAgIGcsXG4gICAgICAgICAgICAgIGI7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bWJlclBpeGVsczsgaSsrKSB7XG4gICAgICAgICAgICByID0gcmdiQ29tcG9uZW50c1trKytdO1xuICAgICAgICAgICAgZyA9IHJnYkNvbXBvbmVudHNbaysrXTtcbiAgICAgICAgICAgIGIgPSByZ2JDb21wb25lbnRzW2srK107XG4gICAgICAgICAgICBpbmRleGVkUGl4ZWxzW2ldID0gbnEubWFwKHIsIGcsIGIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGl4ZWxzOiBpbmRleGVkUGl4ZWxzLFxuICAgICAgICAgICAgcGFsZXR0ZTogcGFsZXR0ZUFycmF5XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3J1bic6IGZ1bmN0aW9uKGZyYW1lKSB7XG4gICAgICAgICAgdmFyIHdpZHRoID0gZnJhbWUud2lkdGgsXG4gICAgICAgICAgICAgIGhlaWdodCA9IGZyYW1lLmhlaWdodCxcbiAgICAgICAgICAgICAgaW1hZ2VEYXRhID0gZnJhbWUuZGF0YSxcbiAgICAgICAgICAgICAgcGFsZXR0ZSA9IGZyYW1lLnBhbGV0dGUsXG4gICAgICAgICAgICAgIHNhbXBsZUludGVydmFsID0gZnJhbWUuc2FtcGxlSW50ZXJ2YWw7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc0ZyYW1lV2l0aFF1YW50aXplcihpbWFnZURhdGEsIHdpZHRoLCBoZWlnaHQsIHNhbXBsZUludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiB3b3JrZXJNZXRob2RzO1xuICAgIH07XG4gICAgcmV0dXJuIHdvcmtlckNvZGU7XG4gIH0oTmV1UXVhbnQpO1xuICBnaWZXcml0ZXIgPSBmdW5jdGlvbiBnaWZXcml0ZXIoYnVmLCB3aWR0aCwgaGVpZ2h0LCBnb3B0cykge1xuICAgIHZhciBwID0gMDtcbiAgICBnb3B0cyA9IGdvcHRzID09PSB1bmRlZmluZWQgPyB7fSA6IGdvcHRzO1xuICAgIHZhciBsb29wX2NvdW50ID0gZ29wdHMubG9vcCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGdvcHRzLmxvb3A7XG4gICAgdmFyIGdsb2JhbF9wYWxldHRlID0gZ29wdHMucGFsZXR0ZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGdvcHRzLnBhbGV0dGU7XG4gICAgaWYgKHdpZHRoIDw9IDAgfHwgaGVpZ2h0IDw9IDAgfHwgd2lkdGggPiA2NTUzNSB8fCBoZWlnaHQgPiA2NTUzNSlcbiAgICAgIHRocm93ICdXaWR0aC9IZWlnaHQgaW52YWxpZC4nO1xuICAgIGZ1bmN0aW9uIGNoZWNrX3BhbGV0dGVfYW5kX251bV9jb2xvcnMocGFsZXR0ZSkge1xuICAgICAgdmFyIG51bV9jb2xvcnMgPSBwYWxldHRlLmxlbmd0aDtcbiAgICAgIGlmIChudW1fY29sb3JzIDwgMiB8fCBudW1fY29sb3JzID4gMjU2IHx8IG51bV9jb2xvcnMgJiBudW1fY29sb3JzIC0gMSlcbiAgICAgICAgdGhyb3cgJ0ludmFsaWQgY29kZS9jb2xvciBsZW5ndGgsIG11c3QgYmUgcG93ZXIgb2YgMiBhbmQgMiAuLiAyNTYuJztcbiAgICAgIHJldHVybiBudW1fY29sb3JzO1xuICAgIH1cbiAgICBidWZbcCsrXSA9IDcxO1xuICAgIGJ1ZltwKytdID0gNzM7XG4gICAgYnVmW3ArK10gPSA3MDtcbiAgICBidWZbcCsrXSA9IDU2O1xuICAgIGJ1ZltwKytdID0gNTc7XG4gICAgYnVmW3ArK10gPSA5NztcbiAgICB2YXIgZ3BfbnVtX2NvbG9yc19wb3cyID0gMDtcbiAgICB2YXIgYmFja2dyb3VuZCA9IDA7XG4gICAgYnVmW3ArK10gPSB3aWR0aCAmIDI1NTtcbiAgICBidWZbcCsrXSA9IHdpZHRoID4+IDggJiAyNTU7XG4gICAgYnVmW3ArK10gPSBoZWlnaHQgJiAyNTU7XG4gICAgYnVmW3ArK10gPSBoZWlnaHQgPj4gOCAmIDI1NTtcbiAgICBidWZbcCsrXSA9IChnbG9iYWxfcGFsZXR0ZSAhPT0gbnVsbCA/IDEyOCA6IDApIHwgZ3BfbnVtX2NvbG9yc19wb3cyO1xuICAgIGJ1ZltwKytdID0gYmFja2dyb3VuZDtcbiAgICBidWZbcCsrXSA9IDA7XG4gICAgaWYgKGxvb3BfY291bnQgIT09IG51bGwpIHtcbiAgICAgIGlmIChsb29wX2NvdW50IDwgMCB8fCBsb29wX2NvdW50ID4gNjU1MzUpXG4gICAgICAgIHRocm93ICdMb29wIGNvdW50IGludmFsaWQuJztcbiAgICAgIGJ1ZltwKytdID0gMzM7XG4gICAgICBidWZbcCsrXSA9IDI1NTtcbiAgICAgIGJ1ZltwKytdID0gMTE7XG4gICAgICBidWZbcCsrXSA9IDc4O1xuICAgICAgYnVmW3ArK10gPSA2OTtcbiAgICAgIGJ1ZltwKytdID0gODQ7XG4gICAgICBidWZbcCsrXSA9IDgzO1xuICAgICAgYnVmW3ArK10gPSA2NztcbiAgICAgIGJ1ZltwKytdID0gNjU7XG4gICAgICBidWZbcCsrXSA9IDgwO1xuICAgICAgYnVmW3ArK10gPSA2OTtcbiAgICAgIGJ1ZltwKytdID0gNTA7XG4gICAgICBidWZbcCsrXSA9IDQ2O1xuICAgICAgYnVmW3ArK10gPSA0ODtcbiAgICAgIGJ1ZltwKytdID0gMztcbiAgICAgIGJ1ZltwKytdID0gMTtcbiAgICAgIGJ1ZltwKytdID0gbG9vcF9jb3VudCAmIDI1NTtcbiAgICAgIGJ1ZltwKytdID0gbG9vcF9jb3VudCA+PiA4ICYgMjU1O1xuICAgICAgYnVmW3ArK10gPSAwO1xuICAgIH1cbiAgICB2YXIgZW5kZWQgPSBmYWxzZTtcbiAgICB0aGlzLmFkZEZyYW1lID0gZnVuY3Rpb24oeCwgeSwgdywgaCwgaW5kZXhlZF9waXhlbHMsIG9wdHMpIHtcbiAgICAgIGlmIChlbmRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAtLXA7XG4gICAgICAgIGVuZGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBvcHRzID0gb3B0cyA9PT0gdW5kZWZpbmVkID8ge30gOiBvcHRzO1xuICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPiA2NTUzNSB8fCB5ID4gNjU1MzUpXG4gICAgICAgIHRocm93ICd4L3kgaW52YWxpZC4nO1xuICAgICAgaWYgKHcgPD0gMCB8fCBoIDw9IDAgfHwgdyA+IDY1NTM1IHx8IGggPiA2NTUzNSlcbiAgICAgICAgdGhyb3cgJ1dpZHRoL0hlaWdodCBpbnZhbGlkLic7XG4gICAgICBpZiAoaW5kZXhlZF9waXhlbHMubGVuZ3RoIDwgdyAqIGgpXG4gICAgICAgIHRocm93ICdOb3QgZW5vdWdoIHBpeGVscyBmb3IgdGhlIGZyYW1lIHNpemUuJztcbiAgICAgIHZhciB1c2luZ19sb2NhbF9wYWxldHRlID0gdHJ1ZTtcbiAgICAgIHZhciBwYWxldHRlID0gb3B0cy5wYWxldHRlO1xuICAgICAgaWYgKHBhbGV0dGUgPT09IHVuZGVmaW5lZCB8fCBwYWxldHRlID09PSBudWxsKSB7XG4gICAgICAgIHVzaW5nX2xvY2FsX3BhbGV0dGUgPSBmYWxzZTtcbiAgICAgICAgcGFsZXR0ZSA9IGdsb2JhbF9wYWxldHRlO1xuICAgICAgfVxuICAgICAgaWYgKHBhbGV0dGUgPT09IHVuZGVmaW5lZCB8fCBwYWxldHRlID09PSBudWxsKVxuICAgICAgICB0aHJvdyAnTXVzdCBzdXBwbHkgZWl0aGVyIGEgbG9jYWwgb3IgZ2xvYmFsIHBhbGV0dGUuJztcbiAgICAgIHZhciBudW1fY29sb3JzID0gY2hlY2tfcGFsZXR0ZV9hbmRfbnVtX2NvbG9ycyhwYWxldHRlKTtcbiAgICAgIHZhciBtaW5fY29kZV9zaXplID0gMDtcbiAgICAgIHdoaWxlIChudW1fY29sb3JzID4+PSAxKVxuICAgICAgICArK21pbl9jb2RlX3NpemU7XG4gICAgICBudW1fY29sb3JzID0gMSA8PCBtaW5fY29kZV9zaXplO1xuICAgICAgdmFyIGRlbGF5ID0gb3B0cy5kZWxheSA9PT0gdW5kZWZpbmVkID8gMCA6IG9wdHMuZGVsYXk7XG4gICAgICB2YXIgZGlzcG9zYWwgPSBvcHRzLmRpc3Bvc2FsID09PSB1bmRlZmluZWQgPyAwIDogb3B0cy5kaXNwb3NhbDtcbiAgICAgIGlmIChkaXNwb3NhbCA8IDAgfHwgZGlzcG9zYWwgPiAzKVxuICAgICAgICB0aHJvdyAnRGlzcG9zYWwgb3V0IG9mIHJhbmdlLic7XG4gICAgICB2YXIgdXNlX3RyYW5zcGFyZW5jeSA9IGZhbHNlO1xuICAgICAgdmFyIHRyYW5zcGFyZW50X2luZGV4ID0gMDtcbiAgICAgIGlmIChvcHRzLnRyYW5zcGFyZW50ICE9PSB1bmRlZmluZWQgJiYgb3B0cy50cmFuc3BhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICB1c2VfdHJhbnNwYXJlbmN5ID0gdHJ1ZTtcbiAgICAgICAgdHJhbnNwYXJlbnRfaW5kZXggPSBvcHRzLnRyYW5zcGFyZW50O1xuICAgICAgICBpZiAodHJhbnNwYXJlbnRfaW5kZXggPCAwIHx8IHRyYW5zcGFyZW50X2luZGV4ID49IG51bV9jb2xvcnMpXG4gICAgICAgICAgdGhyb3cgJ1RyYW5zcGFyZW50IGNvbG9yIGluZGV4Lic7XG4gICAgICB9XG4gICAgICBpZiAoZGlzcG9zYWwgIT09IDAgfHwgdXNlX3RyYW5zcGFyZW5jeSB8fCBkZWxheSAhPT0gMCkge1xuICAgICAgICBidWZbcCsrXSA9IDMzO1xuICAgICAgICBidWZbcCsrXSA9IDI0OTtcbiAgICAgICAgYnVmW3ArK10gPSA0O1xuICAgICAgICBidWZbcCsrXSA9IGRpc3Bvc2FsIDw8IDIgfCAodXNlX3RyYW5zcGFyZW5jeSA9PT0gdHJ1ZSA/IDEgOiAwKTtcbiAgICAgICAgYnVmW3ArK10gPSBkZWxheSAmIDI1NTtcbiAgICAgICAgYnVmW3ArK10gPSBkZWxheSA+PiA4ICYgMjU1O1xuICAgICAgICBidWZbcCsrXSA9IHRyYW5zcGFyZW50X2luZGV4O1xuICAgICAgICBidWZbcCsrXSA9IDA7XG4gICAgICB9XG4gICAgICBidWZbcCsrXSA9IDQ0O1xuICAgICAgYnVmW3ArK10gPSB4ICYgMjU1O1xuICAgICAgYnVmW3ArK10gPSB4ID4+IDggJiAyNTU7XG4gICAgICBidWZbcCsrXSA9IHkgJiAyNTU7XG4gICAgICBidWZbcCsrXSA9IHkgPj4gOCAmIDI1NTtcbiAgICAgIGJ1ZltwKytdID0gdyAmIDI1NTtcbiAgICAgIGJ1ZltwKytdID0gdyA+PiA4ICYgMjU1O1xuICAgICAgYnVmW3ArK10gPSBoICYgMjU1O1xuICAgICAgYnVmW3ArK10gPSBoID4+IDggJiAyNTU7XG4gICAgICBidWZbcCsrXSA9IHVzaW5nX2xvY2FsX3BhbGV0dGUgPT09IHRydWUgPyAxMjggfCBtaW5fY29kZV9zaXplIC0gMSA6IDA7XG4gICAgICBpZiAodXNpbmdfbG9jYWxfcGFsZXR0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCxcbiAgICAgICAgICAgIGlsID0gcGFsZXR0ZS5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgICAgdmFyIHJnYiA9IHBhbGV0dGVbaV07XG4gICAgICAgICAgYnVmW3ArK10gPSByZ2IgPj4gMTYgJiAyNTU7XG4gICAgICAgICAgYnVmW3ArK10gPSByZ2IgPj4gOCAmIDI1NTtcbiAgICAgICAgICBidWZbcCsrXSA9IHJnYiAmIDI1NTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcCA9IEdpZldyaXRlck91dHB1dExaV0NvZGVTdHJlYW0oYnVmLCBwLCBtaW5fY29kZV9zaXplIDwgMiA/IDIgOiBtaW5fY29kZV9zaXplLCBpbmRleGVkX3BpeGVscyk7XG4gICAgfTtcbiAgICB0aGlzLmVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGVuZGVkID09PSBmYWxzZSkge1xuICAgICAgICBidWZbcCsrXSA9IDU5O1xuICAgICAgICBlbmRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcDtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIEdpZldyaXRlck91dHB1dExaV0NvZGVTdHJlYW0oYnVmLCBwLCBtaW5fY29kZV9zaXplLCBpbmRleF9zdHJlYW0pIHtcbiAgICAgIGJ1ZltwKytdID0gbWluX2NvZGVfc2l6ZTtcbiAgICAgIHZhciBjdXJfc3ViYmxvY2sgPSBwKys7XG4gICAgICB2YXIgY2xlYXJfY29kZSA9IDEgPDwgbWluX2NvZGVfc2l6ZTtcbiAgICAgIHZhciBjb2RlX21hc2sgPSBjbGVhcl9jb2RlIC0gMTtcbiAgICAgIHZhciBlb2lfY29kZSA9IGNsZWFyX2NvZGUgKyAxO1xuICAgICAgdmFyIG5leHRfY29kZSA9IGVvaV9jb2RlICsgMTtcbiAgICAgIHZhciBjdXJfY29kZV9zaXplID0gbWluX2NvZGVfc2l6ZSArIDE7XG4gICAgICB2YXIgY3VyX3NoaWZ0ID0gMDtcbiAgICAgIHZhciBjdXIgPSAwO1xuICAgICAgZnVuY3Rpb24gZW1pdF9ieXRlc190b19idWZmZXIoYml0X2Jsb2NrX3NpemUpIHtcbiAgICAgICAgd2hpbGUgKGN1cl9zaGlmdCA+PSBiaXRfYmxvY2tfc2l6ZSkge1xuICAgICAgICAgIGJ1ZltwKytdID0gY3VyICYgMjU1O1xuICAgICAgICAgIGN1ciA+Pj0gODtcbiAgICAgICAgICBjdXJfc2hpZnQgLT0gODtcbiAgICAgICAgICBpZiAocCA9PT0gY3VyX3N1YmJsb2NrICsgMjU2KSB7XG4gICAgICAgICAgICBidWZbY3VyX3N1YmJsb2NrXSA9IDI1NTtcbiAgICAgICAgICAgIGN1cl9zdWJibG9jayA9IHArKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGVtaXRfY29kZShjKSB7XG4gICAgICAgIGN1ciB8PSBjIDw8IGN1cl9zaGlmdDtcbiAgICAgICAgY3VyX3NoaWZ0ICs9IGN1cl9jb2RlX3NpemU7XG4gICAgICAgIGVtaXRfYnl0ZXNfdG9fYnVmZmVyKDgpO1xuICAgICAgfVxuICAgICAgdmFyIGliX2NvZGUgPSBpbmRleF9zdHJlYW1bMF0gJiBjb2RlX21hc2s7XG4gICAgICB2YXIgY29kZV90YWJsZSA9IHt9O1xuICAgICAgZW1pdF9jb2RlKGNsZWFyX2NvZGUpO1xuICAgICAgZm9yICh2YXIgaSA9IDEsXG4gICAgICAgICAgaWwgPSBpbmRleF9zdHJlYW0ubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICB2YXIgayA9IGluZGV4X3N0cmVhbVtpXSAmIGNvZGVfbWFzaztcbiAgICAgICAgdmFyIGN1cl9rZXkgPSBpYl9jb2RlIDw8IDggfCBrO1xuICAgICAgICB2YXIgY3VyX2NvZGUgPSBjb2RlX3RhYmxlW2N1cl9rZXldO1xuICAgICAgICBpZiAoY3VyX2NvZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGN1ciB8PSBpYl9jb2RlIDw8IGN1cl9zaGlmdDtcbiAgICAgICAgICBjdXJfc2hpZnQgKz0gY3VyX2NvZGVfc2l6ZTtcbiAgICAgICAgICB3aGlsZSAoY3VyX3NoaWZ0ID49IDgpIHtcbiAgICAgICAgICAgIGJ1ZltwKytdID0gY3VyICYgMjU1O1xuICAgICAgICAgICAgY3VyID4+PSA4O1xuICAgICAgICAgICAgY3VyX3NoaWZ0IC09IDg7XG4gICAgICAgICAgICBpZiAocCA9PT0gY3VyX3N1YmJsb2NrICsgMjU2KSB7XG4gICAgICAgICAgICAgIGJ1ZltjdXJfc3ViYmxvY2tdID0gMjU1O1xuICAgICAgICAgICAgICBjdXJfc3ViYmxvY2sgPSBwKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChuZXh0X2NvZGUgPT09IDQwOTYpIHtcbiAgICAgICAgICAgIGVtaXRfY29kZShjbGVhcl9jb2RlKTtcbiAgICAgICAgICAgIG5leHRfY29kZSA9IGVvaV9jb2RlICsgMTtcbiAgICAgICAgICAgIGN1cl9jb2RlX3NpemUgPSBtaW5fY29kZV9zaXplICsgMTtcbiAgICAgICAgICAgIGNvZGVfdGFibGUgPSB7fTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG5leHRfY29kZSA+PSAxIDw8IGN1cl9jb2RlX3NpemUpXG4gICAgICAgICAgICAgICsrY3VyX2NvZGVfc2l6ZTtcbiAgICAgICAgICAgIGNvZGVfdGFibGVbY3VyX2tleV0gPSBuZXh0X2NvZGUrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWJfY29kZSA9IGs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWJfY29kZSA9IGN1cl9jb2RlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbWl0X2NvZGUoaWJfY29kZSk7XG4gICAgICBlbWl0X2NvZGUoZW9pX2NvZGUpO1xuICAgICAgZW1pdF9ieXRlc190b19idWZmZXIoMSk7XG4gICAgICBpZiAoY3VyX3N1YmJsb2NrICsgMSA9PT0gcCkge1xuICAgICAgICBidWZbY3VyX3N1YmJsb2NrXSA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWZbY3VyX3N1YmJsb2NrXSA9IHAgLSBjdXJfc3ViYmxvY2sgLSAxO1xuICAgICAgICBidWZbcCsrXSA9IDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG4gIH07XG4gIEFuaW1hdGVkR0lGID0gZnVuY3Rpb24odXRpbHMsIGZyYW1lV29ya2VyQ29kZSwgTmV1UXVhbnQsIEdpZldyaXRlcikge1xuICAgIHZhciBBbmltYXRlZEdJRiA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuY2FudmFzID0gbnVsbDtcbiAgICAgIHRoaXMuY3R4ID0gbnVsbDtcbiAgICAgIHRoaXMucmVwZWF0ID0gMDtcbiAgICAgIHRoaXMuZnJhbWVzID0gW107XG4gICAgICB0aGlzLm51bVJlbmRlcmVkRnJhbWVzID0gMDtcbiAgICAgIHRoaXMub25SZW5kZXJDb21wbGV0ZUNhbGxiYWNrID0gdXRpbHMubm9vcDtcbiAgICAgIHRoaXMub25SZW5kZXJQcm9ncmVzc0NhbGxiYWNrID0gdXRpbHMubm9vcDtcbiAgICAgIHRoaXMud29ya2VycyA9IFtdO1xuICAgICAgdGhpcy5hdmFpbGFibGVXb3JrZXJzID0gW107XG4gICAgICB0aGlzLmdlbmVyYXRpbmdHSUYgPSBmYWxzZTtcbiAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICB0aGlzLmluaXRpYWxpemVXZWJXb3JrZXJzKG9wdGlvbnMpO1xuICAgIH07XG4gICAgQW5pbWF0ZWRHSUYucHJvdG90eXBlID0ge1xuICAgICAgJ3dvcmtlck1ldGhvZHMnOiBmcmFtZVdvcmtlckNvZGUoKSxcbiAgICAgICdpbml0aWFsaXplV2ViV29ya2Vycyc6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHByb2Nlc3NGcmFtZVdvcmtlckNvZGUgPSBOZXVRdWFudC50b1N0cmluZygpICsgJygnICsgZnJhbWVXb3JrZXJDb2RlLnRvU3RyaW5nKCkgKyAnKCkpOycsXG4gICAgICAgICAgICB3ZWJXb3JrZXJPYmosXG4gICAgICAgICAgICBvYmplY3RVcmwsXG4gICAgICAgICAgICB3ZWJXb3JrZXIsXG4gICAgICAgICAgICBudW1Xb3JrZXJzLFxuICAgICAgICAgICAgeCA9IC0xLFxuICAgICAgICAgICAgd29ya2VyRXJyb3IgPSAnJztcbiAgICAgICAgbnVtV29ya2VycyA9IG9wdGlvbnMubnVtV29ya2VycztcbiAgICAgICAgd2hpbGUgKCsreCA8IG51bVdvcmtlcnMpIHtcbiAgICAgICAgICB3ZWJXb3JrZXJPYmogPSB1dGlscy5jcmVhdGVXZWJXb3JrZXIocHJvY2Vzc0ZyYW1lV29ya2VyQ29kZSk7XG4gICAgICAgICAgaWYgKHV0aWxzLmlzT2JqZWN0KHdlYldvcmtlck9iaikpIHtcbiAgICAgICAgICAgIG9iamVjdFVybCA9IHdlYldvcmtlck9iai5vYmplY3RVcmw7XG4gICAgICAgICAgICB3ZWJXb3JrZXIgPSB3ZWJXb3JrZXJPYmoud29ya2VyO1xuICAgICAgICAgICAgdGhpcy53b3JrZXJzLnB1c2goe1xuICAgICAgICAgICAgICAnd29ya2VyJzogd2ViV29ya2VyLFxuICAgICAgICAgICAgICAnb2JqZWN0VXJsJzogb2JqZWN0VXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlV29ya2Vycy5wdXNoKHdlYldvcmtlcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdvcmtlckVycm9yID0gd2ViV29ya2VyT2JqO1xuICAgICAgICAgICAgdXRpbHMud2ViV29ya2VyRXJyb3IgPSAhIXdlYldvcmtlck9iajtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53b3JrZXJFcnJvciA9IHdvcmtlckVycm9yO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IG9wdGlvbnMuZ2lmV2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IG9wdGlvbnMuZ2lmSGVpZ2h0O1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuZnJhbWVzID0gW107XG4gICAgICB9LFxuICAgICAgJ2dldFdvcmtlcic6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdmFpbGFibGVXb3JrZXJzLnBvcCgpO1xuICAgICAgfSxcbiAgICAgICdmcmVlV29ya2VyJzogZnVuY3Rpb24od29ya2VyKSB7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlV29ya2Vycy5wdXNoKHdvcmtlcik7XG4gICAgICB9LFxuICAgICAgJ2J5dGVNYXAnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJ5dGVNYXAgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICAgICAgICAgIGJ5dGVNYXBbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBieXRlTWFwO1xuICAgICAgfSgpLFxuICAgICAgJ2J1ZmZlclRvU3RyaW5nJzogZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgICAgIHZhciBudW1iZXJWYWx1ZXMgPSBidWZmZXIubGVuZ3RoLFxuICAgICAgICAgICAgc3RyID0gJycsXG4gICAgICAgICAgICB4ID0gLTE7XG4gICAgICAgIHdoaWxlICgrK3ggPCBudW1iZXJWYWx1ZXMpIHtcbiAgICAgICAgICBzdHIgKz0gdGhpcy5ieXRlTWFwW2J1ZmZlclt4XV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIH0sXG4gICAgICAnb25GcmFtZUZpbmlzaGVkJzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIGZyYW1lcyA9IHNlbGYuZnJhbWVzLFxuICAgICAgICAgICAgYWxsRG9uZSA9IGZyYW1lcy5ldmVyeShmdW5jdGlvbihmcmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gIWZyYW1lLmJlaW5nUHJvY2Vzc2VkICYmIGZyYW1lLmRvbmU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5udW1SZW5kZXJlZEZyYW1lcysrO1xuICAgICAgICBzZWxmLm9uUmVuZGVyUHJvZ3Jlc3NDYWxsYmFjayhzZWxmLm51bVJlbmRlcmVkRnJhbWVzICogMC43NSAvIGZyYW1lcy5sZW5ndGgpO1xuICAgICAgICBpZiAoYWxsRG9uZSkge1xuICAgICAgICAgIGlmICghc2VsZi5nZW5lcmF0aW5nR0lGKSB7XG4gICAgICAgICAgICBzZWxmLmdlbmVyYXRlR0lGKGZyYW1lcywgc2VsZi5vblJlbmRlckNvbXBsZXRlQ2FsbGJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5wcm9jZXNzTmV4dEZyYW1lKCk7XG4gICAgICAgICAgfSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAncHJvY2Vzc0ZyYW1lJzogZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICAgICAgdmFyIEFuaW1hdGVkR2lmQ29udGV4dCA9IHRoaXMsXG4gICAgICAgICAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICAgICAgc2FtcGxlSW50ZXJ2YWwgPSBvcHRpb25zLnNhbXBsZUludGVydmFsLFxuICAgICAgICAgICAgZnJhbWVzID0gdGhpcy5mcmFtZXMsXG4gICAgICAgICAgICBmcmFtZSxcbiAgICAgICAgICAgIHdvcmtlcixcbiAgICAgICAgICAgIGRvbmUgPSBmdW5jdGlvbihldikge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IGV2LmRhdGE7XG4gICAgICAgICAgICAgIGRlbGV0ZSBmcmFtZS5kYXRhO1xuICAgICAgICAgICAgICBmcmFtZS5waXhlbHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhLnBpeGVscyk7XG4gICAgICAgICAgICAgIGZyYW1lLnBhbGV0dGUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhLnBhbGV0dGUpO1xuICAgICAgICAgICAgICBmcmFtZS5kb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgZnJhbWUuYmVpbmdQcm9jZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgQW5pbWF0ZWRHaWZDb250ZXh0LmZyZWVXb3JrZXIod29ya2VyKTtcbiAgICAgICAgICAgICAgQW5pbWF0ZWRHaWZDb250ZXh0Lm9uRnJhbWVGaW5pc2hlZCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgZnJhbWUgPSBmcmFtZXNbcG9zaXRpb25dO1xuICAgICAgICBpZiAoZnJhbWUuYmVpbmdQcm9jZXNzZWQgfHwgZnJhbWUuZG9uZSkge1xuICAgICAgICAgIHRoaXMub25GcmFtZUZpbmlzaGVkKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZyYW1lLnNhbXBsZUludGVydmFsID0gc2FtcGxlSW50ZXJ2YWw7XG4gICAgICAgIGZyYW1lLmJlaW5nUHJvY2Vzc2VkID0gdHJ1ZTtcbiAgICAgICAgZnJhbWUuZ2lmc2hvdCA9IHRydWU7XG4gICAgICAgIHdvcmtlciA9IHRoaXMuZ2V0V29ya2VyKCk7XG4gICAgICAgIGlmICh3b3JrZXIpIHtcbiAgICAgICAgICB3b3JrZXIub25tZXNzYWdlID0gZG9uZTtcbiAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoZnJhbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvbmUoeydkYXRhJzogQW5pbWF0ZWRHaWZDb250ZXh0Lndvcmtlck1ldGhvZHMucnVuKGZyYW1lKX0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ3N0YXJ0UmVuZGVyaW5nJzogZnVuY3Rpb24oY29tcGxldGVDYWxsYmFjaykge1xuICAgICAgICB0aGlzLm9uUmVuZGVyQ29tcGxldGVDYWxsYmFjayA9IGNvbXBsZXRlQ2FsbGJhY2s7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLm51bVdvcmtlcnMgJiYgaSA8IHRoaXMuZnJhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzRnJhbWUoaSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAncHJvY2Vzc05leHRGcmFtZSc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcG9zaXRpb24gPSAtMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmZyYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBmcmFtZSA9IHRoaXMuZnJhbWVzW2ldO1xuICAgICAgICAgIGlmICghZnJhbWUuZG9uZSAmJiAhZnJhbWUuYmVpbmdQcm9jZXNzZWQpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zaXRpb24gPj0gMCkge1xuICAgICAgICAgIHRoaXMucHJvY2Vzc0ZyYW1lKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdnZW5lcmF0ZUdJRic6IGZ1bmN0aW9uKGZyYW1lcywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IFtdLFxuICAgICAgICAgICAgZ2lmT3B0aW9ucyA9IHsnbG9vcCc6IHRoaXMucmVwZWF0fSxcbiAgICAgICAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgICBpbnRlcnZhbCA9IG9wdGlvbnMuaW50ZXJ2YWwsXG4gICAgICAgICAgICBleGlzdGluZ0ltYWdlcyA9IG9wdGlvbnMuaW1hZ2VzLFxuICAgICAgICAgICAgaGFzRXhpc3RpbmdJbWFnZXMgPSAhIWV4aXN0aW5nSW1hZ2VzLmxlbmd0aCxcbiAgICAgICAgICAgIGhlaWdodCA9IG9wdGlvbnMuZ2lmSGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGggPSBvcHRpb25zLmdpZldpZHRoLFxuICAgICAgICAgICAgZ2lmV3JpdGVyID0gbmV3IEdpZldyaXRlcihidWZmZXIsIHdpZHRoLCBoZWlnaHQsIGdpZk9wdGlvbnMpLFxuICAgICAgICAgICAgb25SZW5kZXJQcm9ncmVzc0NhbGxiYWNrID0gdGhpcy5vblJlbmRlclByb2dyZXNzQ2FsbGJhY2ssXG4gICAgICAgICAgICBkZWxheSA9IGhhc0V4aXN0aW5nSW1hZ2VzID8gaW50ZXJ2YWwgKiAxMDAgOiAwLFxuICAgICAgICAgICAgYnVmZmVyVG9TdHJpbmcsXG4gICAgICAgICAgICBnaWY7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGluZ0dJRiA9IHRydWU7XG4gICAgICAgIHV0aWxzLmVhY2goZnJhbWVzLCBmdW5jdGlvbihpdGVyYXRvciwgZnJhbWUpIHtcbiAgICAgICAgICB2YXIgZnJhbWVQYWxldHRlID0gZnJhbWUucGFsZXR0ZTtcbiAgICAgICAgICBvblJlbmRlclByb2dyZXNzQ2FsbGJhY2soMC43NSArIDAuMjUgKiBmcmFtZS5wb3NpdGlvbiAqIDEgLyBmcmFtZXMubGVuZ3RoKTtcbiAgICAgICAgICBnaWZXcml0ZXIuYWRkRnJhbWUoMCwgMCwgd2lkdGgsIGhlaWdodCwgZnJhbWUucGl4ZWxzLCB7XG4gICAgICAgICAgICBwYWxldHRlOiBmcmFtZVBhbGV0dGUsXG4gICAgICAgICAgICBkZWxheTogZGVsYXlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdpZldyaXRlci5lbmQoKTtcbiAgICAgICAgb25SZW5kZXJQcm9ncmVzc0NhbGxiYWNrKDEpO1xuICAgICAgICB0aGlzLmZyYW1lcyA9IFtdO1xuICAgICAgICB0aGlzLmdlbmVyYXRpbmdHSUYgPSBmYWxzZTtcbiAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICAgICAgYnVmZmVyVG9TdHJpbmcgPSB0aGlzLmJ1ZmZlclRvU3RyaW5nKGJ1ZmZlcik7XG4gICAgICAgICAgZ2lmID0gJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCwnICsgdXRpbHMuYnRvYShidWZmZXJUb1N0cmluZyk7XG4gICAgICAgICAgY2FsbGJhY2soZ2lmKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdzZXRSZXBlYXQnOiBmdW5jdGlvbihyKSB7XG4gICAgICAgIHRoaXMucmVwZWF0ID0gcjtcbiAgICAgIH0sXG4gICAgICAnYWRkRnJhbWUnOiBmdW5jdGlvbihlbGVtZW50LCBnaWZzaG90T3B0aW9ucykge1xuICAgICAgICBnaWZzaG90T3B0aW9ucyA9IHV0aWxzLmlzT2JqZWN0KGdpZnNob3RPcHRpb25zKSA/IGdpZnNob3RPcHRpb25zIDoge307XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIGN0eCA9IHNlbGYuY3R4LFxuICAgICAgICAgICAgb3B0aW9ucyA9IHNlbGYub3B0aW9ucyxcbiAgICAgICAgICAgIHdpZHRoID0gb3B0aW9ucy5naWZXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodCA9IG9wdGlvbnMuZ2lmSGVpZ2h0LFxuICAgICAgICAgICAgZ2lmSGVpZ2h0ID0gZ2lmc2hvdE9wdGlvbnMuZ2lmSGVpZ2h0LFxuICAgICAgICAgICAgZ2lmV2lkdGggPSBnaWZzaG90T3B0aW9ucy5naWZXaWR0aCxcbiAgICAgICAgICAgIHRleHQgPSBnaWZzaG90T3B0aW9ucy50ZXh0LFxuICAgICAgICAgICAgZm9udFdlaWdodCA9IGdpZnNob3RPcHRpb25zLmZvbnRXZWlnaHQsXG4gICAgICAgICAgICBmb250U2l6ZSA9IHV0aWxzLmdldEZvbnRTaXplKGdpZnNob3RPcHRpb25zKSxcbiAgICAgICAgICAgIGZvbnRGYW1pbHkgPSBnaWZzaG90T3B0aW9ucy5mb250RmFtaWx5LFxuICAgICAgICAgICAgZm9udENvbG9yID0gZ2lmc2hvdE9wdGlvbnMuZm9udENvbG9yLFxuICAgICAgICAgICAgdGV4dEFsaWduID0gZ2lmc2hvdE9wdGlvbnMudGV4dEFsaWduLFxuICAgICAgICAgICAgdGV4dEJhc2VsaW5lID0gZ2lmc2hvdE9wdGlvbnMudGV4dEJhc2VsaW5lLFxuICAgICAgICAgICAgdGV4dFhDb29yZGluYXRlID0gZ2lmc2hvdE9wdGlvbnMudGV4dFhDb29yZGluYXRlID8gZ2lmc2hvdE9wdGlvbnMudGV4dFhDb29yZGluYXRlIDogdGV4dEFsaWduID09PSAnbGVmdCcgPyAxIDogdGV4dEFsaWduID09PSAncmlnaHQnID8gd2lkdGggOiB3aWR0aCAvIDIsXG4gICAgICAgICAgICB0ZXh0WUNvb3JkaW5hdGUgPSBnaWZzaG90T3B0aW9ucy50ZXh0WUNvb3JkaW5hdGUgPyBnaWZzaG90T3B0aW9ucy50ZXh0WUNvb3JkaW5hdGUgOiB0ZXh0QmFzZWxpbmUgPT09ICd0b3AnID8gMSA6IHRleHRCYXNlbGluZSA9PT0gJ2NlbnRlcicgPyBoZWlnaHQgLyAyIDogaGVpZ2h0LFxuICAgICAgICAgICAgZm9udCA9IGZvbnRXZWlnaHQgKyAnICcgKyBmb250U2l6ZSArICcgJyArIGZvbnRGYW1pbHksXG4gICAgICAgICAgICBpbWFnZURhdGE7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY3R4LmRyYXdJbWFnZShlbGVtZW50LCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgY3R4LmZvbnQgPSBmb250O1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZvbnRDb2xvcjtcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSB0ZXh0QWxpZ247XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gdGV4dEJhc2VsaW5lO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQsIHRleHRYQ29vcmRpbmF0ZSwgdGV4dFlDb29yZGluYXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICBzZWxmLmFkZEZyYW1lSW1hZ2VEYXRhKGltYWdlRGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gJycgKyBlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ2FkZEZyYW1lSW1hZ2VEYXRhJzogZnVuY3Rpb24oaW1hZ2VEYXRhKSB7XG4gICAgICAgIHZhciBmcmFtZXMgPSB0aGlzLmZyYW1lcyxcbiAgICAgICAgICAgIGltYWdlRGF0YUFycmF5ID0gaW1hZ2VEYXRhLmRhdGE7XG4gICAgICAgIHRoaXMuZnJhbWVzLnB1c2goe1xuICAgICAgICAgICdkYXRhJzogaW1hZ2VEYXRhQXJyYXksXG4gICAgICAgICAgJ3dpZHRoJzogaW1hZ2VEYXRhLndpZHRoLFxuICAgICAgICAgICdoZWlnaHQnOiBpbWFnZURhdGEuaGVpZ2h0LFxuICAgICAgICAgICdwYWxldHRlJzogbnVsbCxcbiAgICAgICAgICAnZGl0aGVyaW5nJzogbnVsbCxcbiAgICAgICAgICAnZG9uZSc6IGZhbHNlLFxuICAgICAgICAgICdiZWluZ1Byb2Nlc3NlZCc6IGZhbHNlLFxuICAgICAgICAgICdwb3NpdGlvbic6IGZyYW1lcy5sZW5ndGhcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgJ29uUmVuZGVyUHJvZ3Jlc3MnOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICB0aGlzLm9uUmVuZGVyUHJvZ3Jlc3NDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgfSxcbiAgICAgICdpc1JlbmRlcmluZyc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0aW5nR0lGO1xuICAgICAgfSxcbiAgICAgICdnZXRCYXNlNjRHSUYnOiBmdW5jdGlvbihjb21wbGV0ZUNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIG9uUmVuZGVyQ29tcGxldGUgPSBmdW5jdGlvbihnaWYpIHtcbiAgICAgICAgICAgICAgc2VsZi5kZXN0cm95V29ya2VycygpO1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2soZ2lmKTtcbiAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBzZWxmLnN0YXJ0UmVuZGVyaW5nKG9uUmVuZGVyQ29tcGxldGUpO1xuICAgICAgfSxcbiAgICAgICdkZXN0cm95V29ya2Vycyc6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy53b3JrZXJFcnJvcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd29ya2VycyA9IHRoaXMud29ya2VycztcbiAgICAgICAgdXRpbHMuZWFjaCh3b3JrZXJzLCBmdW5jdGlvbihpdGVyYXRvciwgd29ya2VyT2JqKSB7XG4gICAgICAgICAgdmFyIHdvcmtlciA9IHdvcmtlck9iai53b3JrZXIsXG4gICAgICAgICAgICAgIG9iamVjdFVybCA9IHdvcmtlck9iai5vYmplY3RVcmw7XG4gICAgICAgICAgd29ya2VyLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgIHV0aWxzLlVSTC5yZXZva2VPYmplY3RVUkwob2JqZWN0VXJsKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQW5pbWF0ZWRHSUY7XG4gIH0odXRpbHMsIHByb2Nlc3NGcmFtZVdvcmtlciwgTmV1UXVhbnQsIGdpZldyaXRlcik7XG4gIGdldEJhc2U2NEdJRiA9IGZ1bmN0aW9uIGdldEJhc2U2NEdJRihhbmltYXRlZEdpZkluc3RhbmNlLCBjYWxsYmFjaykge1xuICAgIGFuaW1hdGVkR2lmSW5zdGFuY2UuZ2V0QmFzZTY0R0lGKGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICBjYWxsYmFjayh7XG4gICAgICAgICdlcnJvcic6IGZhbHNlLFxuICAgICAgICAnZXJyb3JDb2RlJzogJycsXG4gICAgICAgICdlcnJvck1zZyc6ICcnLFxuICAgICAgICAnaW1hZ2UnOiBpbWFnZVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG4gIGV4aXN0aW5nSW1hZ2VzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGltYWdlcyA9IG9iai5pbWFnZXMsXG4gICAgICAgIGltYWdlc0xlbmd0aCA9IG9iai5pbWFnZXNMZW5ndGgsXG4gICAgICAgIGNhbGxiYWNrID0gb2JqLmNhbGxiYWNrLFxuICAgICAgICBvcHRpb25zID0gb2JqLm9wdGlvbnMsXG4gICAgICAgIHNraXBPYmogPSB7XG4gICAgICAgICAgJ2dldFVzZXJNZWRpYSc6IHRydWUsXG4gICAgICAgICAgJ3dpbmRvdy5VUkwnOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yT2JqID0gZXJyb3IudmFsaWRhdGUoc2tpcE9iaiksXG4gICAgICAgIGxvYWRlZEltYWdlcyA9IDAsXG4gICAgICAgIHRlbXBJbWFnZSxcbiAgICAgICAgYWc7XG4gICAgaWYgKGVycm9yT2JqLmVycm9yKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3JPYmopO1xuICAgIH1cbiAgICBhZyA9IG5ldyBBbmltYXRlZEdJRihvcHRpb25zKTtcbiAgICB1dGlscy5lYWNoKGltYWdlcywgZnVuY3Rpb24oaW5kZXgsIGN1cnJlbnRJbWFnZSkge1xuICAgICAgaWYgKHV0aWxzLmlzRWxlbWVudChjdXJyZW50SW1hZ2UpKSB7XG4gICAgICAgIGN1cnJlbnRJbWFnZS5jcm9zc09yaWdpbiA9ICdBbm9ueW1vdXMnO1xuICAgICAgICBhZy5hZGRGcmFtZShjdXJyZW50SW1hZ2UsIG9wdGlvbnMpO1xuICAgICAgICBsb2FkZWRJbWFnZXMgKz0gMTtcbiAgICAgICAgaWYgKGxvYWRlZEltYWdlcyA9PT0gaW1hZ2VzTGVuZ3RoKSB7XG4gICAgICAgICAgZ2V0QmFzZTY0R0lGKGFnLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNTdHJpbmcoY3VycmVudEltYWdlKSkge1xuICAgICAgICB0ZW1wSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgdGVtcEltYWdlLmNyb3NzT3JpZ2luID0gJ0Fub255bW91cyc7XG4gICAgICAgIHRlbXBJbWFnZS5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChpbWFnZXNMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpbWFnZXNMZW5ndGggLT0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRlbXBJbWFnZS5zcmMgPSBjdXJyZW50SW1hZ2U7XG4gICAgICAgIChmdW5jdGlvbih0ZW1wSW1hZ2UpIHtcbiAgICAgICAgICB0ZW1wSW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhZy5hZGRGcmFtZSh0ZW1wSW1hZ2UsIG9wdGlvbnMpO1xuICAgICAgICAgICAgdXRpbHMucmVtb3ZlRWxlbWVudCh0ZW1wSW1hZ2UpO1xuICAgICAgICAgICAgbG9hZGVkSW1hZ2VzICs9IDE7XG4gICAgICAgICAgICBpZiAobG9hZGVkSW1hZ2VzID09PSBpbWFnZXNMZW5ndGgpIHtcbiAgICAgICAgICAgICAgZ2V0QmFzZTY0R0lGKGFnLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSh0ZW1wSW1hZ2UpKTtcbiAgICAgICAgdXRpbHMuc2V0Q1NTQXR0cih0ZW1wSW1hZ2UsIHtcbiAgICAgICAgICAncG9zaXRpb24nOiAnZml4ZWQnLFxuICAgICAgICAgICdvcGFjaXR5JzogJzAnXG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRlbXBJbWFnZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIHNjcmVlblNob3QgPSB7XG4gICAgZ2V0R0lGOiBmdW5jdGlvbihvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSB1dGlscy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSA/IGNhbGxiYWNrIDogZnVuY3Rpb24oKSB7fTtcbiAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSxcbiAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgIGV4aXN0aW5nSW1hZ2VzID0gb3B0aW9ucy5pbWFnZXMsXG4gICAgICAgICAgaGFzRXhpc3RpbmdJbWFnZXMgPSAhIWV4aXN0aW5nSW1hZ2VzLmxlbmd0aCxcbiAgICAgICAgICB2aWRlb0VsZW1lbnQgPSBvcHRpb25zLnZpZGVvRWxlbWVudCxcbiAgICAgICAgICBrZWVwQ2FtZXJhT24gPSBvcHRpb25zLmtlZXBDYW1lcmFPbixcbiAgICAgICAgICB3ZWJjYW1WaWRlb0VsZW1lbnQgPSBvcHRpb25zLndlYmNhbVZpZGVvRWxlbWVudCxcbiAgICAgICAgICBjYW1lcmFTdHJlYW0gPSBvcHRpb25zLmNhbWVyYVN0cmVhbSxcbiAgICAgICAgICBnaWZXaWR0aCA9ICtvcHRpb25zLmdpZldpZHRoLFxuICAgICAgICAgIGdpZkhlaWdodCA9ICtvcHRpb25zLmdpZkhlaWdodCxcbiAgICAgICAgICB2aWRlb1dpZHRoID0gb3B0aW9ucy52aWRlb1dpZHRoLFxuICAgICAgICAgIHZpZGVvSGVpZ2h0ID0gb3B0aW9ucy52aWRlb0hlaWdodCxcbiAgICAgICAgICBzYW1wbGVJbnRlcnZhbCA9ICtvcHRpb25zLnNhbXBsZUludGVydmFsLFxuICAgICAgICAgIG51bVdvcmtlcnMgPSArb3B0aW9ucy5udW1Xb3JrZXJzLFxuICAgICAgICAgIGNyb3AgPSBvcHRpb25zLmNyb3AsXG4gICAgICAgICAgaW50ZXJ2YWwgPSArb3B0aW9ucy5pbnRlcnZhbCxcbiAgICAgICAgICB3YWl0QmV0d2VlbkZyYW1lcyA9IGhhc0V4aXN0aW5nSW1hZ2VzID8gMCA6IGludGVydmFsICogMTAwMCxcbiAgICAgICAgICBwcm9ncmVzc0NhbGxiYWNrID0gb3B0aW9ucy5wcm9ncmVzc0NhbGxiYWNrLFxuICAgICAgICAgIHNhdmVkUmVuZGVyaW5nQ29udGV4dHMgPSBvcHRpb25zLnNhdmVkUmVuZGVyaW5nQ29udGV4dHMsXG4gICAgICAgICAgc2F2ZVJlbmRlcmluZ0NvbnRleHRzID0gb3B0aW9ucy5zYXZlUmVuZGVyaW5nQ29udGV4dHMsXG4gICAgICAgICAgcmVuZGVyaW5nQ29udGV4dHNUb1NhdmUgPSBbXSxcbiAgICAgICAgICBudW1GcmFtZXMgPSBzYXZlZFJlbmRlcmluZ0NvbnRleHRzLmxlbmd0aCA/IHNhdmVkUmVuZGVyaW5nQ29udGV4dHMubGVuZ3RoIDogb3B0aW9ucy5udW1GcmFtZXMsXG4gICAgICAgICAgcGVuZGluZ0ZyYW1lcyA9IG51bUZyYW1lcyxcbiAgICAgICAgICBhZyA9IG5ldyBBbmltYXRlZEdJRihvcHRpb25zKSxcbiAgICAgICAgICB0ZXh0ID0gb3B0aW9ucy50ZXh0LFxuICAgICAgICAgIGZvbnRXZWlnaHQgPSBvcHRpb25zLmZvbnRXZWlnaHQsXG4gICAgICAgICAgZm9udFNpemUgPSB1dGlscy5nZXRGb250U2l6ZShvcHRpb25zKSxcbiAgICAgICAgICBmb250RmFtaWx5ID0gb3B0aW9ucy5mb250RmFtaWx5LFxuICAgICAgICAgIGZvbnRDb2xvciA9IG9wdGlvbnMuZm9udENvbG9yLFxuICAgICAgICAgIHRleHRBbGlnbiA9IG9wdGlvbnMudGV4dEFsaWduLFxuICAgICAgICAgIHRleHRCYXNlbGluZSA9IG9wdGlvbnMudGV4dEJhc2VsaW5lLFxuICAgICAgICAgIHRleHRYQ29vcmRpbmF0ZSA9IG9wdGlvbnMudGV4dFhDb29yZGluYXRlID8gb3B0aW9ucy50ZXh0WENvb3JkaW5hdGUgOiB0ZXh0QWxpZ24gPT09ICdsZWZ0JyA/IDEgOiB0ZXh0QWxpZ24gPT09ICdyaWdodCcgPyBnaWZXaWR0aCA6IGdpZldpZHRoIC8gMixcbiAgICAgICAgICB0ZXh0WUNvb3JkaW5hdGUgPSBvcHRpb25zLnRleHRZQ29vcmRpbmF0ZSA/IG9wdGlvbnMudGV4dFlDb29yZGluYXRlIDogdGV4dEJhc2VsaW5lID09PSAndG9wJyA/IDEgOiB0ZXh0QmFzZWxpbmUgPT09ICdjZW50ZXInID8gZ2lmSGVpZ2h0IC8gMiA6IGdpZkhlaWdodCxcbiAgICAgICAgICBmb250ID0gZm9udFdlaWdodCArICcgJyArIGZvbnRTaXplICsgJyAnICsgZm9udEZhbWlseSxcbiAgICAgICAgICBzb3VyY2VYID0gY3JvcCA/IE1hdGguZmxvb3IoY3JvcC5zY2FsZWRXaWR0aCAvIDIpIDogMCxcbiAgICAgICAgICBzb3VyY2VXaWR0aCA9IGNyb3AgPyB2aWRlb1dpZHRoIC0gY3JvcC5zY2FsZWRXaWR0aCA6IDAsXG4gICAgICAgICAgc291cmNlWSA9IGNyb3AgPyBNYXRoLmZsb29yKGNyb3Auc2NhbGVkSGVpZ2h0IC8gMikgOiAwLFxuICAgICAgICAgIHNvdXJjZUhlaWdodCA9IGNyb3AgPyB2aWRlb0hlaWdodCAtIGNyb3Auc2NhbGVkSGVpZ2h0IDogMCxcbiAgICAgICAgICBjYXB0dXJlRnJhbWVzID0gZnVuY3Rpb24gY2FwdHVyZUZyYW1lKCkge1xuICAgICAgICAgICAgdmFyIGZyYW1lc0xlZnQgPSBwZW5kaW5nRnJhbWVzIC0gMTtcbiAgICAgICAgICAgIGlmIChzYXZlZFJlbmRlcmluZ0NvbnRleHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBjb250ZXh0LnB1dEltYWdlRGF0YShzYXZlZFJlbmRlcmluZ0NvbnRleHRzW251bUZyYW1lcyAtIHBlbmRpbmdGcmFtZXNdLCAwLCAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRyYXdWaWRlbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZHJhd1ZpZGVvKCkge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2VXaWR0aCA+IHZpZGVvV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgIHNvdXJjZVdpZHRoID0gdmlkZW9XaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZUhlaWdodCA+IHZpZGVvSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICBzb3VyY2VIZWlnaHQgPSB2aWRlb0hlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZVggPCAwKSB7XG4gICAgICAgICAgICAgICAgICBzb3VyY2VYID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZVkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICBzb3VyY2VZID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodmlkZW9FbGVtZW50LCBzb3VyY2VYLCBzb3VyY2VZLCBzb3VyY2VXaWR0aCwgc291cmNlSGVpZ2h0LCAwLCAwLCBnaWZXaWR0aCwgZ2lmSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBmaW5pc2hDYXB0dXJlKCk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5uYW1lID09PSAnTlNfRVJST1JfTk9UX0FWQUlMQUJMRScpIHtcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZHJhd1ZpZGVvLCAxMDApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZmluaXNoQ2FwdHVyZSgpIHtcbiAgICAgICAgICAgICAgaWYgKHNhdmVSZW5kZXJpbmdDb250ZXh0cykge1xuICAgICAgICAgICAgICAgIHJlbmRlcmluZ0NvbnRleHRzVG9TYXZlLnB1c2goY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgZ2lmV2lkdGgsIGdpZkhlaWdodCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5mb250ID0gZm9udDtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZvbnRDb2xvcjtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRleHRBbGlnbiA9IHRleHRBbGlnbjtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9IHRleHRCYXNlbGluZTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHRleHQsIHRleHRYQ29vcmRpbmF0ZSwgdGV4dFlDb29yZGluYXRlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhZy5hZGRGcmFtZUltYWdlRGF0YShjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBnaWZXaWR0aCwgZ2lmSGVpZ2h0KSk7XG4gICAgICAgICAgICAgIHBlbmRpbmdGcmFtZXMgPSBmcmFtZXNMZWZ0O1xuICAgICAgICAgICAgICBwcm9ncmVzc0NhbGxiYWNrKChudW1GcmFtZXMgLSBwZW5kaW5nRnJhbWVzKSAvIG51bUZyYW1lcyk7XG4gICAgICAgICAgICAgIGlmIChmcmFtZXNMZWZ0ID4gMCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2FwdHVyZUZyYW1lLCB3YWl0QmV0d2VlbkZyYW1lcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFwZW5kaW5nRnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgYWcuZ2V0QmFzZTY0R0lGKGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgICdlcnJvcic6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAnZXJyb3JDb2RlJzogJycsXG4gICAgICAgICAgICAgICAgICAgICdlcnJvck1zZyc6ICcnLFxuICAgICAgICAgICAgICAgICAgICAnaW1hZ2UnOiBpbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgJ2NhbWVyYVN0cmVhbSc6IGNhbWVyYVN0cmVhbSxcbiAgICAgICAgICAgICAgICAgICAgJ3ZpZGVvRWxlbWVudCc6IHZpZGVvRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgJ3dlYmNhbVZpZGVvRWxlbWVudCc6IHdlYmNhbVZpZGVvRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgJ3NhdmVkUmVuZGVyaW5nQ29udGV4dHMnOiByZW5kZXJpbmdDb250ZXh0c1RvU2F2ZSxcbiAgICAgICAgICAgICAgICAgICAgJ2tlZXBDYW1lcmFPbic6IGtlZXBDYW1lcmFPblxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgbnVtRnJhbWVzID0gbnVtRnJhbWVzICE9PSB1bmRlZmluZWQgPyBudW1GcmFtZXMgOiAxMDtcbiAgICAgIGludGVydmFsID0gaW50ZXJ2YWwgIT09IHVuZGVmaW5lZCA/IGludGVydmFsIDogMC4xO1xuICAgICAgY2FudmFzLndpZHRoID0gZ2lmV2lkdGg7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gZ2lmSGVpZ2h0O1xuICAgICAgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgKGZ1bmN0aW9uIGNhcHR1cmUoKSB7XG4gICAgICAgIGlmICh2aWRlb0VsZW1lbnQuY3VycmVudFRpbWUgPT09IDApIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGNhcHR1cmUsIDEwMCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNhcHR1cmVGcmFtZXMoKTtcbiAgICAgIH0oKSk7XG4gICAgfSxcbiAgICAnZ2V0Q3JvcERpbWVuc2lvbnMnOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHZhciB3aWR0aCA9IG9iai52aWRlb1dpZHRoLFxuICAgICAgICAgIGhlaWdodCA9IG9iai52aWRlb0hlaWdodCxcbiAgICAgICAgICBnaWZXaWR0aCA9IG9iai5naWZXaWR0aCxcbiAgICAgICAgICBnaWZIZWlnaHQgPSBvYmouZ2lmSGVpZ2h0LFxuICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgc2NhbGVkV2lkdGg6IDAsXG4gICAgICAgICAgICBzY2FsZWRIZWlnaHQ6IDBcbiAgICAgICAgICB9O1xuICAgICAgaWYgKHdpZHRoID4gaGVpZ2h0KSB7XG4gICAgICAgIHJlc3VsdC53aWR0aCA9IE1hdGgucm91bmQod2lkdGggKiAoZ2lmSGVpZ2h0IC8gaGVpZ2h0KSkgLSBnaWZXaWR0aDtcbiAgICAgICAgcmVzdWx0LnNjYWxlZFdpZHRoID0gTWF0aC5yb3VuZChyZXN1bHQud2lkdGggKiAoaGVpZ2h0IC8gZ2lmSGVpZ2h0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQuaGVpZ2h0ID0gTWF0aC5yb3VuZChoZWlnaHQgKiAoZ2lmV2lkdGggLyB3aWR0aCkpIC0gZ2lmSGVpZ2h0O1xuICAgICAgICByZXN1bHQuc2NhbGVkSGVpZ2h0ID0gTWF0aC5yb3VuZChyZXN1bHQuaGVpZ2h0ICogKHdpZHRoIC8gZ2lmV2lkdGgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9O1xuICB2aWRlb1N0cmVhbSA9IHtcbiAgICAnbG9hZGVkRGF0YSc6IGZhbHNlLFxuICAgICdkZWZhdWx0VmlkZW9EaW1lbnNpb25zJzoge1xuICAgICAgJ3dpZHRoJzogNjQwLFxuICAgICAgJ2hlaWdodCc6IDQ4MFxuICAgIH0sXG4gICAgJ2ZpbmRWaWRlb1NpemUnOiBmdW5jdGlvbiBmaW5kVmlkZW9TaXplTWV0aG9kKG9iaikge1xuICAgICAgZmluZFZpZGVvU2l6ZU1ldGhvZC5hdHRlbXB0cyA9IGZpbmRWaWRlb1NpemVNZXRob2QuYXR0ZW1wdHMgfHwgMDtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICB2aWRlb0VsZW1lbnQgPSBvYmoudmlkZW9FbGVtZW50LFxuICAgICAgICAgIGNhbWVyYVN0cmVhbSA9IG9iai5jYW1lcmFTdHJlYW0sXG4gICAgICAgICAgY29tcGxldGVkQ2FsbGJhY2sgPSBvYmouY29tcGxldGVkQ2FsbGJhY2s7XG4gICAgICBpZiAoIXZpZGVvRWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodmlkZW9FbGVtZW50LnZpZGVvV2lkdGggPiAwICYmIHZpZGVvRWxlbWVudC52aWRlb0hlaWdodCA+IDApIHtcbiAgICAgICAgdmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWRlZGRhdGEnLCBzZWxmLmZpbmRWaWRlb1NpemUpO1xuICAgICAgICBjb21wbGV0ZWRDYWxsYmFjayh7XG4gICAgICAgICAgJ3ZpZGVvRWxlbWVudCc6IHZpZGVvRWxlbWVudCxcbiAgICAgICAgICAnY2FtZXJhU3RyZWFtJzogY2FtZXJhU3RyZWFtLFxuICAgICAgICAgICd2aWRlb1dpZHRoJzogdmlkZW9FbGVtZW50LnZpZGVvV2lkdGgsXG4gICAgICAgICAgJ3ZpZGVvSGVpZ2h0JzogdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZpbmRWaWRlb1NpemVNZXRob2QuYXR0ZW1wdHMgPCAxMCkge1xuICAgICAgICAgIGZpbmRWaWRlb1NpemVNZXRob2QuYXR0ZW1wdHMgKz0gMTtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5maW5kVmlkZW9TaXplKG9iaik7XG4gICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21wbGV0ZWRDYWxsYmFjayh7XG4gICAgICAgICAgICAndmlkZW9FbGVtZW50JzogdmlkZW9FbGVtZW50LFxuICAgICAgICAgICAgJ2NhbWVyYVN0cmVhbSc6IGNhbWVyYVN0cmVhbSxcbiAgICAgICAgICAgICd2aWRlb1dpZHRoJzogc2VsZi5kZWZhdWx0VmlkZW9EaW1lbnNpb25zLndpZHRoLFxuICAgICAgICAgICAgJ3ZpZGVvSGVpZ2h0Jzogc2VsZi5kZWZhdWx0VmlkZW9EaW1lbnNpb25zLmhlaWdodFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAnb25TdHJlYW1pbmdUaW1lb3V0JzogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgJ2Vycm9yJzogdHJ1ZSxcbiAgICAgICAgICAnZXJyb3JDb2RlJzogJ2dldFVzZXJNZWRpYScsXG4gICAgICAgICAgJ2Vycm9yTXNnJzogJ1RoZXJlIHdhcyBhbiBpc3N1ZSB3aXRoIHRoZSBnZXRVc2VyTWVkaWEgQVBJIC0gVGltZWQgb3V0IHdoaWxlIHRyeWluZyB0byBzdGFydCBzdHJlYW1pbmcnLFxuICAgICAgICAgICdpbWFnZSc6IG51bGwsXG4gICAgICAgICAgJ2NhbWVyYVN0cmVhbSc6IHt9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgJ3N0cmVhbSc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgIGV4aXN0aW5nVmlkZW8gPSB1dGlscy5pc0FycmF5KG9iai5leGlzdGluZ1ZpZGVvKSA/IG9iai5leGlzdGluZ1ZpZGVvWzBdIDogb2JqLmV4aXN0aW5nVmlkZW8sXG4gICAgICAgICAgdmlkZW9FbGVtZW50ID0gb2JqLnZpZGVvRWxlbWVudCxcbiAgICAgICAgICBjYW1lcmFTdHJlYW0gPSBvYmouY2FtZXJhU3RyZWFtLFxuICAgICAgICAgIHN0cmVhbWVkQ2FsbGJhY2sgPSBvYmouc3RyZWFtZWRDYWxsYmFjayxcbiAgICAgICAgICBjb21wbGV0ZWRDYWxsYmFjayA9IG9iai5jb21wbGV0ZWRDYWxsYmFjaztcbiAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHN0cmVhbWVkQ2FsbGJhY2spKSB7XG4gICAgICAgIHN0cmVhbWVkQ2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICAgIGlmIChleGlzdGluZ1ZpZGVvKSB7XG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhleGlzdGluZ1ZpZGVvKSkge1xuICAgICAgICAgIHZpZGVvRWxlbWVudC5zcmMgPSBleGlzdGluZ1ZpZGVvO1xuICAgICAgICAgIHZpZGVvRWxlbWVudC5pbm5lckhUTUwgPSAnPHNvdXJjZSBzcmM9XCInICsgZXhpc3RpbmdWaWRlbyArICdcIiB0eXBlPVwidmlkZW8vJyArIHV0aWxzLmdldEV4dGVuc2lvbihleGlzdGluZ1ZpZGVvKSArICdcIiAvPic7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmlkZW9FbGVtZW50Lm1velNyY09iamVjdCkge1xuICAgICAgICB2aWRlb0VsZW1lbnQubW96U3JjT2JqZWN0ID0gY2FtZXJhU3RyZWFtO1xuICAgICAgfSBlbHNlIGlmICh1dGlscy5VUkwpIHtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNyYyA9IHV0aWxzLlVSTC5jcmVhdGVPYmplY3RVUkwoY2FtZXJhU3RyZWFtKTtcbiAgICAgIH1cbiAgICAgIHZpZGVvRWxlbWVudC5wbGF5KCk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIGNoZWNrTG9hZGVkRGF0YSgpIHtcbiAgICAgICAgY2hlY2tMb2FkZWREYXRhLmNvdW50ID0gY2hlY2tMb2FkZWREYXRhLmNvdW50IHx8IDA7XG4gICAgICAgIGlmIChzZWxmLmxvYWRlZERhdGEgPT09IHRydWUpIHtcbiAgICAgICAgICBzZWxmLmZpbmRWaWRlb1NpemUoe1xuICAgICAgICAgICAgJ3ZpZGVvRWxlbWVudCc6IHZpZGVvRWxlbWVudCxcbiAgICAgICAgICAgICdjYW1lcmFTdHJlYW0nOiBjYW1lcmFTdHJlYW0sXG4gICAgICAgICAgICAnY29tcGxldGVkQ2FsbGJhY2snOiBjb21wbGV0ZWRDYWxsYmFja1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNlbGYubG9hZGVkRGF0YSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoZWNrTG9hZGVkRGF0YS5jb3VudCArPSAxO1xuICAgICAgICAgIGlmIChjaGVja0xvYWRlZERhdGEuY291bnQgPiAxMCkge1xuICAgICAgICAgICAgc2VsZi5maW5kVmlkZW9TaXplKHtcbiAgICAgICAgICAgICAgJ3ZpZGVvRWxlbWVudCc6IHZpZGVvRWxlbWVudCxcbiAgICAgICAgICAgICAgJ2NhbWVyYVN0cmVhbSc6IGNhbWVyYVN0cmVhbSxcbiAgICAgICAgICAgICAgJ2NvbXBsZXRlZENhbGxiYWNrJzogY29tcGxldGVkQ2FsbGJhY2tcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja0xvYWRlZERhdGEoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIDEwMCk7XG4gICAgfSxcbiAgICAnc3RhcnRTdHJlYW1pbmcnOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICBlcnJvckNhbGxiYWNrID0gdXRpbHMuaXNGdW5jdGlvbihvYmouZXJyb3IpID8gb2JqLmVycm9yIDogdXRpbHMubm9vcCxcbiAgICAgICAgICBzdHJlYW1lZENhbGxiYWNrID0gdXRpbHMuaXNGdW5jdGlvbihvYmouc3RyZWFtZWQpID8gb2JqLnN0cmVhbWVkIDogdXRpbHMubm9vcCxcbiAgICAgICAgICBjb21wbGV0ZWRDYWxsYmFjayA9IHV0aWxzLmlzRnVuY3Rpb24ob2JqLmNvbXBsZXRlZCkgPyBvYmouY29tcGxldGVkIDogdXRpbHMubm9vcCxcbiAgICAgICAgICBleGlzdGluZ1ZpZGVvID0gb2JqLmV4aXN0aW5nVmlkZW8sXG4gICAgICAgICAgd2ViY2FtVmlkZW9FbGVtZW50ID0gb2JqLndlYmNhbVZpZGVvRWxlbWVudCxcbiAgICAgICAgICB2aWRlb0VsZW1lbnQgPSB1dGlscy5pc0VsZW1lbnQoZXhpc3RpbmdWaWRlbykgPyBleGlzdGluZ1ZpZGVvIDogd2ViY2FtVmlkZW9FbGVtZW50ID8gd2ViY2FtVmlkZW9FbGVtZW50IDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKSxcbiAgICAgICAgICBsYXN0Q2FtZXJhU3RyZWFtID0gb2JqLmxhc3RDYW1lcmFTdHJlYW0sXG4gICAgICAgICAgY2FtZXJhU3RyZWFtO1xuICAgICAgdmlkZW9FbGVtZW50LmNyb3NzT3JpZ2luID0gJ0Fub255bW91cyc7XG4gICAgICB2aWRlb0VsZW1lbnQuYXV0b3BsYXkgPSB0cnVlO1xuICAgICAgdmlkZW9FbGVtZW50Lmxvb3AgPSB0cnVlO1xuICAgICAgdmlkZW9FbGVtZW50Lm11dGVkID0gdHJ1ZTtcbiAgICAgIHZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRkYXRhJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgc2VsZi5sb2FkZWREYXRhID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGV4aXN0aW5nVmlkZW8pIHtcbiAgICAgICAgc2VsZi5zdHJlYW0oe1xuICAgICAgICAgICd2aWRlb0VsZW1lbnQnOiB2aWRlb0VsZW1lbnQsXG4gICAgICAgICAgJ2V4aXN0aW5nVmlkZW8nOiBleGlzdGluZ1ZpZGVvLFxuICAgICAgICAgICdjb21wbGV0ZWRDYWxsYmFjayc6IGNvbXBsZXRlZENhbGxiYWNrXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChsYXN0Q2FtZXJhU3RyZWFtKSB7XG4gICAgICAgIHNlbGYuc3RyZWFtKHtcbiAgICAgICAgICAndmlkZW9FbGVtZW50JzogdmlkZW9FbGVtZW50LFxuICAgICAgICAgICdjYW1lcmFTdHJlYW0nOiBsYXN0Q2FtZXJhU3RyZWFtLFxuICAgICAgICAgICdzdHJlYW1lZENhbGxiYWNrJzogc3RyZWFtZWRDYWxsYmFjayxcbiAgICAgICAgICAnY29tcGxldGVkQ2FsbGJhY2snOiBjb21wbGV0ZWRDYWxsYmFja1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHV0aWxzLmdldFVzZXJNZWRpYSh7J3ZpZGVvJzogdHJ1ZX0sIGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgIHNlbGYuc3RyZWFtKHtcbiAgICAgICAgICAgICd2aWRlb0VsZW1lbnQnOiB2aWRlb0VsZW1lbnQsXG4gICAgICAgICAgICAnY2FtZXJhU3RyZWFtJzogc3RyZWFtLFxuICAgICAgICAgICAgJ3N0cmVhbWVkQ2FsbGJhY2snOiBzdHJlYW1lZENhbGxiYWNrLFxuICAgICAgICAgICAgJ2NvbXBsZXRlZENhbGxiYWNrJzogY29tcGxldGVkQ2FsbGJhY2tcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZXJyb3JDYWxsYmFjayk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGFydFZpZGVvU3RyZWFtaW5nOiBmdW5jdGlvbihjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgbm9HZXRVc2VyTWVkaWFTdXBwb3J0VGltZW91dCxcbiAgICAgICAgICB0aW1lb3V0TGVuZ3RoID0gb3B0aW9ucy50aW1lb3V0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnRpbWVvdXQgOiAwLFxuICAgICAgICAgIG9yaWdpbmFsQ2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrLFxuICAgICAgICAgIHdlYmNhbVZpZGVvRWxlbWVudCA9IG9wdGlvbnMud2ViY2FtVmlkZW9FbGVtZW50O1xuICAgICAgaWYgKHRpbWVvdXRMZW5ndGggPiAwKSB7XG4gICAgICAgIG5vR2V0VXNlck1lZGlhU3VwcG9ydFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYub25TdHJlYW1pbmdUaW1lb3V0KG9yaWdpbmFsQ2FsbGJhY2spO1xuICAgICAgICB9LCAxMDAwMCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YXJ0U3RyZWFtaW5nKHtcbiAgICAgICAgJ2Vycm9yJzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgb3JpZ2luYWxDYWxsYmFjayh7XG4gICAgICAgICAgICAnZXJyb3InOiB0cnVlLFxuICAgICAgICAgICAgJ2Vycm9yQ29kZSc6ICdnZXRVc2VyTWVkaWEnLFxuICAgICAgICAgICAgJ2Vycm9yTXNnJzogJ1RoZXJlIHdhcyBhbiBpc3N1ZSB3aXRoIHRoZSBnZXRVc2VyTWVkaWEgQVBJIC0gdGhlIHVzZXIgcHJvYmFibHkgZGVuaWVkIHBlcm1pc3Npb24nLFxuICAgICAgICAgICAgJ2ltYWdlJzogbnVsbCxcbiAgICAgICAgICAgICdjYW1lcmFTdHJlYW0nOiB7fVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICAnc3RyZWFtZWQnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQobm9HZXRVc2VyTWVkaWFTdXBwb3J0VGltZW91dCk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb21wbGV0ZWQnOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICB2YXIgY2FtZXJhU3RyZWFtID0gb2JqLmNhbWVyYVN0cmVhbSxcbiAgICAgICAgICAgICAgdmlkZW9FbGVtZW50ID0gb2JqLnZpZGVvRWxlbWVudCxcbiAgICAgICAgICAgICAgdmlkZW9XaWR0aCA9IG9iai52aWRlb1dpZHRoLFxuICAgICAgICAgICAgICB2aWRlb0hlaWdodCA9IG9iai52aWRlb0hlaWdodDtcbiAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAnY2FtZXJhU3RyZWFtJzogY2FtZXJhU3RyZWFtLFxuICAgICAgICAgICAgJ3ZpZGVvRWxlbWVudCc6IHZpZGVvRWxlbWVudCxcbiAgICAgICAgICAgICd2aWRlb1dpZHRoJzogdmlkZW9XaWR0aCxcbiAgICAgICAgICAgICd2aWRlb0hlaWdodCc6IHZpZGVvSGVpZ2h0XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgICdsYXN0Q2FtZXJhU3RyZWFtJzogb3B0aW9ucy5sYXN0Q2FtZXJhU3RyZWFtLFxuICAgICAgICAnd2ViY2FtVmlkZW9FbGVtZW50Jzogd2ViY2FtVmlkZW9FbGVtZW50XG4gICAgICB9KTtcbiAgICB9LFxuICAgICdzdG9wVmlkZW9TdHJlYW1pbmcnOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIG9iaiA9IHV0aWxzLmlzT2JqZWN0KG9iaikgPyBvYmogOiB7fTtcbiAgICAgIHZhciBjYW1lcmFTdHJlYW0gPSBvYmouY2FtZXJhU3RyZWFtLFxuICAgICAgICAgIHZpZGVvRWxlbWVudCA9IG9iai52aWRlb0VsZW1lbnQsXG4gICAgICAgICAga2VlcENhbWVyYU9uID0gb2JqLmtlZXBDYW1lcmFPbixcbiAgICAgICAgICB3ZWJjYW1WaWRlb0VsZW1lbnQgPSBvYmoud2ViY2FtVmlkZW9FbGVtZW50O1xuICAgICAgaWYgKCFrZWVwQ2FtZXJhT24gJiYgY2FtZXJhU3RyZWFtICYmIHV0aWxzLmlzRnVuY3Rpb24oY2FtZXJhU3RyZWFtLnN0b3ApKSB7XG4gICAgICAgIGNhbWVyYVN0cmVhbS5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodXRpbHMuaXNFbGVtZW50KHZpZGVvRWxlbWVudCkgJiYgIXdlYmNhbVZpZGVvRWxlbWVudCkge1xuICAgICAgICB2aWRlb0VsZW1lbnQucGF1c2UoKTtcbiAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24odXRpbHMuVVJMLnJldm9rZU9iamVjdFVSTCkgJiYgIXV0aWxzLndlYldvcmtlckVycm9yKSB7XG4gICAgICAgICAgaWYgKHZpZGVvRWxlbWVudC5zcmMpIHtcbiAgICAgICAgICAgIHV0aWxzLlVSTC5yZXZva2VPYmplY3RVUkwodmlkZW9FbGVtZW50LnNyYyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHV0aWxzLnJlbW92ZUVsZW1lbnQodmlkZW9FbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHN0b3BWaWRlb1N0cmVhbWluZyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIG9iaiA9IHV0aWxzLmlzT2JqZWN0KG9iaikgPyBvYmogOiB7fTtcbiAgICB2YXIgb3B0aW9ucyA9IHV0aWxzLmlzT2JqZWN0KG9iai5vcHRpb25zKSA/IG9iai5vcHRpb25zIDoge30sXG4gICAgICAgIGNhbWVyYVN0cmVhbSA9IG9iai5jYW1lcmFTdHJlYW0sXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IG9iai52aWRlb0VsZW1lbnQsXG4gICAgICAgIHdlYmNhbVZpZGVvRWxlbWVudCA9IG9iai53ZWJjYW1WaWRlb0VsZW1lbnQsXG4gICAgICAgIGtlZXBDYW1lcmFPbiA9IG9iai5rZWVwQ2FtZXJhT247XG4gICAgdmlkZW9TdHJlYW0uc3RvcFZpZGVvU3RyZWFtaW5nKHtcbiAgICAgICdjYW1lcmFTdHJlYW0nOiBjYW1lcmFTdHJlYW0sXG4gICAgICAndmlkZW9FbGVtZW50JzogdmlkZW9FbGVtZW50LFxuICAgICAgJ2tlZXBDYW1lcmFPbic6IGtlZXBDYW1lcmFPbixcbiAgICAgICd3ZWJjYW1WaWRlb0VsZW1lbnQnOiB3ZWJjYW1WaWRlb0VsZW1lbnRcbiAgICB9KTtcbiAgfTtcbiAgY3JlYXRlQW5kR2V0R0lGID0gZnVuY3Rpb24ob2JqLCBjYWxsYmFjaykge1xuICAgIHZhciBvcHRpb25zID0gb2JqLm9wdGlvbnMgfHwge30sXG4gICAgICAgIGltYWdlcyA9IG9wdGlvbnMuaW1hZ2VzLFxuICAgICAgICB2aWRlbyA9IG9wdGlvbnMudmlkZW8sXG4gICAgICAgIG51bUZyYW1lcyA9ICtvcHRpb25zLm51bUZyYW1lcyxcbiAgICAgICAgY2FtZXJhU3RyZWFtID0gb2JqLmNhbWVyYVN0cmVhbSxcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gb2JqLnZpZGVvRWxlbWVudCxcbiAgICAgICAgdmlkZW9XaWR0aCA9IG9iai52aWRlb1dpZHRoLFxuICAgICAgICB2aWRlb0hlaWdodCA9IG9iai52aWRlb0hlaWdodCxcbiAgICAgICAgZ2lmV2lkdGggPSArb3B0aW9ucy5naWZXaWR0aCxcbiAgICAgICAgZ2lmSGVpZ2h0ID0gK29wdGlvbnMuZ2lmSGVpZ2h0LFxuICAgICAgICBjcm9wRGltZW5zaW9ucyA9IHNjcmVlblNob3QuZ2V0Q3JvcERpbWVuc2lvbnMoe1xuICAgICAgICAgICd2aWRlb1dpZHRoJzogdmlkZW9XaWR0aCxcbiAgICAgICAgICAndmlkZW9IZWlnaHQnOiB2aWRlb0hlaWdodCxcbiAgICAgICAgICAnZ2lmSGVpZ2h0JzogZ2lmSGVpZ2h0LFxuICAgICAgICAgICdnaWZXaWR0aCc6IGdpZldpZHRoXG4gICAgICAgIH0pLFxuICAgICAgICBjb21wbGV0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgb3B0aW9ucy5jcm9wID0gY3JvcERpbWVuc2lvbnM7XG4gICAgb3B0aW9ucy52aWRlb0VsZW1lbnQgPSB2aWRlb0VsZW1lbnQ7XG4gICAgb3B0aW9ucy52aWRlb1dpZHRoID0gdmlkZW9XaWR0aDtcbiAgICBvcHRpb25zLnZpZGVvSGVpZ2h0ID0gdmlkZW9IZWlnaHQ7XG4gICAgb3B0aW9ucy5jYW1lcmFTdHJlYW0gPSBjYW1lcmFTdHJlYW07XG4gICAgaWYgKCF1dGlscy5pc0VsZW1lbnQodmlkZW9FbGVtZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2aWRlb0VsZW1lbnQud2lkdGggPSBnaWZXaWR0aCArIGNyb3BEaW1lbnNpb25zLndpZHRoO1xuICAgIHZpZGVvRWxlbWVudC5oZWlnaHQgPSBnaWZIZWlnaHQgKyBjcm9wRGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgaWYgKCFvcHRpb25zLndlYmNhbVZpZGVvRWxlbWVudCkge1xuICAgICAgdXRpbHMuc2V0Q1NTQXR0cih2aWRlb0VsZW1lbnQsIHtcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ2ZpeGVkJyxcbiAgICAgICAgJ29wYWNpdHknOiAnMCdcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWRlb0VsZW1lbnQpO1xuICAgIH1cbiAgICB2aWRlb0VsZW1lbnQucGxheSgpO1xuICAgIHNjcmVlblNob3QuZ2V0R0lGKG9wdGlvbnMsIGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKCghaW1hZ2VzIHx8ICFpbWFnZXMubGVuZ3RoKSAmJiAoIXZpZGVvIHx8ICF2aWRlby5sZW5ndGgpKSB7XG4gICAgICAgIHN0b3BWaWRlb1N0cmVhbWluZyhvYmopO1xuICAgICAgfVxuICAgICAgY29tcGxldGVDYWxsYmFjayhvYmopO1xuICAgIH0pO1xuICB9O1xuICBleGlzdGluZ1ZpZGVvID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGV4aXN0aW5nVmlkZW8gPSBvYmouZXhpc3RpbmdWaWRlbyxcbiAgICAgICAgY2FsbGJhY2sgPSBvYmouY2FsbGJhY2ssXG4gICAgICAgIG9wdGlvbnMgPSBvYmoub3B0aW9ucyxcbiAgICAgICAgc2tpcE9iaiA9IHtcbiAgICAgICAgICAnZ2V0VXNlck1lZGlhJzogdHJ1ZSxcbiAgICAgICAgICAnd2luZG93LlVSTCc6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JPYmogPSBlcnJvci52YWxpZGF0ZShza2lwT2JqKSxcbiAgICAgICAgbG9hZGVkSW1hZ2VzID0gMCxcbiAgICAgICAgdmlkZW9UeXBlLFxuICAgICAgICB2aWRlb1NyYyxcbiAgICAgICAgdGVtcEltYWdlLFxuICAgICAgICBhZztcbiAgICBpZiAoZXJyb3JPYmouZXJyb3IpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnJvck9iaik7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0VsZW1lbnQoZXhpc3RpbmdWaWRlbykgJiYgZXhpc3RpbmdWaWRlby5zcmMpIHtcbiAgICAgIHZpZGVvU3JjID0gZXhpc3RpbmdWaWRlby5zcmM7XG4gICAgICB2aWRlb1R5cGUgPSB1dGlscy5nZXRFeHRlbnNpb24odmlkZW9TcmMpO1xuICAgICAgaWYgKCF1dGlscy5pc1N1cHBvcnRlZC52aWRlb0NvZGVjc1t2aWRlb1R5cGVdKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnJvci5tZXNzYWdlcy52aWRlb0NvZGVjcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KGV4aXN0aW5nVmlkZW8pKSB7XG4gICAgICB1dGlscy5lYWNoKGV4aXN0aW5nVmlkZW8sIGZ1bmN0aW9uKGl0ZXJhdG9yLCB2aWRlb1NyYykge1xuICAgICAgICB2aWRlb1R5cGUgPSB2aWRlb1NyYy5zdWJzdHIodmlkZW9TcmMubGFzdEluZGV4T2YoJy4nKSArIDEsIHZpZGVvU3JjLmxlbmd0aCk7XG4gICAgICAgIGlmICh1dGlscy5pc1N1cHBvcnRlZC52aWRlb0NvZGVjc1t2aWRlb1R5cGVdKSB7XG4gICAgICAgICAgZXhpc3RpbmdWaWRlbyA9IHZpZGVvU3JjO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHZpZGVvU3RyZWFtLnN0YXJ0U3RyZWFtaW5nKHtcbiAgICAgICdjb21wbGV0ZWQnOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgb2JqLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBjcmVhdGVBbmRHZXRHSUYob2JqLCBjYWxsYmFjayk7XG4gICAgICB9LFxuICAgICAgJ2V4aXN0aW5nVmlkZW8nOiBleGlzdGluZ1ZpZGVvXG4gICAgfSk7XG4gIH07XG4gIGV4aXN0aW5nV2ViY2FtID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGxhc3RDYW1lcmFTdHJlYW0gPSBvYmoubGFzdENhbWVyYVN0cmVhbSxcbiAgICAgICAgY2FsbGJhY2sgPSBvYmouY2FsbGJhY2ssXG4gICAgICAgIHdlYmNhbVZpZGVvRWxlbWVudCA9IG9iai53ZWJjYW1WaWRlb0VsZW1lbnQsXG4gICAgICAgIG9wdGlvbnMgPSBvYmoub3B0aW9ucztcbiAgICBpZiAoIWlzV2ViQ2FtR0lGU3VwcG9ydGVkKCkpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnJvci52YWxpZGF0ZSgpKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2F2ZWRSZW5kZXJpbmdDb250ZXh0cy5sZW5ndGgpIHtcbiAgICAgIHNjcmVlblNob3QuZ2V0V2ViY2FtR0lGKG9wdGlvbnMsIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBjYWxsYmFjayhvYmopO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZpZGVvU3RyZWFtLnN0YXJ0VmlkZW9TdHJlYW1pbmcoZnVuY3Rpb24ob2JqKSB7XG4gICAgICBvYmoub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICBjcmVhdGVBbmRHZXRHSUYob2JqLCBjYWxsYmFjayk7XG4gICAgfSwge1xuICAgICAgJ2xhc3RDYW1lcmFTdHJlYW0nOiBsYXN0Q2FtZXJhU3RyZWFtLFxuICAgICAgJ2NhbGxiYWNrJzogY2FsbGJhY2ssXG4gICAgICAnd2ViY2FtVmlkZW9FbGVtZW50Jzogd2ViY2FtVmlkZW9FbGVtZW50XG4gICAgfSk7XG4gIH07XG4gIGNyZWF0ZUdJRiA9IGZ1bmN0aW9uKHVzZXJPcHRpb25zLCBjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrID0gdXRpbHMuaXNGdW5jdGlvbih1c2VyT3B0aW9ucykgPyB1c2VyT3B0aW9ucyA6IGNhbGxiYWNrO1xuICAgIHVzZXJPcHRpb25zID0gdXRpbHMuaXNPYmplY3QodXNlck9wdGlvbnMpID8gdXNlck9wdGlvbnMgOiB7fTtcbiAgICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBvcHRpb25zID0gdXRpbHMubWVyZ2VPcHRpb25zKGRlZmF1bHRPcHRpb25zLCB1c2VyT3B0aW9ucykgfHwge30sXG4gICAgICAgIGxhc3RDYW1lcmFTdHJlYW0gPSB1c2VyT3B0aW9ucy5jYW1lcmFTdHJlYW0sXG4gICAgICAgIGltYWdlcyA9IG9wdGlvbnMuaW1hZ2VzLFxuICAgICAgICBpbWFnZXNMZW5ndGggPSBpbWFnZXMgPyBpbWFnZXMubGVuZ3RoIDogMCxcbiAgICAgICAgdmlkZW8gPSBvcHRpb25zLnZpZGVvLFxuICAgICAgICB3ZWJjYW1WaWRlb0VsZW1lbnQgPSBvcHRpb25zLndlYmNhbVZpZGVvRWxlbWVudDtcbiAgICBpZiAoaW1hZ2VzTGVuZ3RoKSB7XG4gICAgICBleGlzdGluZ0ltYWdlcyh7XG4gICAgICAgICdpbWFnZXMnOiBpbWFnZXMsXG4gICAgICAgICdpbWFnZXNMZW5ndGgnOiBpbWFnZXNMZW5ndGgsXG4gICAgICAgICdjYWxsYmFjayc6IGNhbGxiYWNrLFxuICAgICAgICAnb3B0aW9ucyc6IG9wdGlvbnNcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodmlkZW8pIHtcbiAgICAgIGV4aXN0aW5nVmlkZW8oe1xuICAgICAgICAnZXhpc3RpbmdWaWRlbyc6IHZpZGVvLFxuICAgICAgICAnY2FsbGJhY2snOiBjYWxsYmFjayxcbiAgICAgICAgJ29wdGlvbnMnOiBvcHRpb25zXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmdXZWJjYW0oe1xuICAgICAgICAnbGFzdENhbWVyYVN0cmVhbSc6IGxhc3RDYW1lcmFTdHJlYW0sXG4gICAgICAgICdjYWxsYmFjayc6IGNhbGxiYWNrLFxuICAgICAgICAnd2ViY2FtVmlkZW9FbGVtZW50Jzogd2ViY2FtVmlkZW9FbGVtZW50LFxuICAgICAgICAnb3B0aW9ucyc6IG9wdGlvbnNcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgdGFrZVNuYXBTaG90ID0gZnVuY3Rpb24odXNlck9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sgPSB1dGlscy5pc0Z1bmN0aW9uKHVzZXJPcHRpb25zKSA/IHVzZXJPcHRpb25zIDogY2FsbGJhY2s7XG4gICAgdXNlck9wdGlvbnMgPSB1dGlscy5pc09iamVjdCh1c2VyT3B0aW9ucykgPyB1c2VyT3B0aW9ucyA6IHt9O1xuICAgIGlmICghdXRpbHMuaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG1lcmdlZE9wdGlvbnMgPSB1dGlscy5tZXJnZU9wdGlvbnMoZGVmYXVsdE9wdGlvbnMsIHVzZXJPcHRpb25zKSxcbiAgICAgICAgb3B0aW9ucyA9IHV0aWxzLm1lcmdlT3B0aW9ucyhtZXJnZWRPcHRpb25zLCB7XG4gICAgICAgICAgJ2ludGVydmFsJzogMC4xLFxuICAgICAgICAgICdudW1GcmFtZXMnOiAxXG4gICAgICAgIH0pO1xuICAgIGNyZWF0ZUdJRihvcHRpb25zLCBjYWxsYmFjayk7XG4gIH07XG4gIEFQSSA9IGZ1bmN0aW9uKHV0aWxzLCBlcnJvciwgZGVmYXVsdE9wdGlvbnMsIGlzU3VwcG9ydGVkLCBpc1dlYkNhbUdJRlN1cHBvcnRlZCwgaXNFeGlzdGluZ0ltYWdlc0dJRlN1cHBvcnRlZCwgaXNFeGlzdGluZ1ZpZGVvR0lGU3VwcG9ydGVkLCBjcmVhdGVHSUYsIHRha2VTbmFwU2hvdCwgc3RvcFZpZGVvU3RyZWFtaW5nKSB7XG4gICAgdmFyIGdpZnNob3QgPSB7XG4gICAgICAndXRpbHMnOiB1dGlscyxcbiAgICAgICdlcnJvcic6IGVycm9yLFxuICAgICAgJ2RlZmF1bHRPcHRpb25zJzogZGVmYXVsdE9wdGlvbnMsXG4gICAgICAnY3JlYXRlR0lGJzogY3JlYXRlR0lGLFxuICAgICAgJ3Rha2VTbmFwU2hvdCc6IHRha2VTbmFwU2hvdCxcbiAgICAgICdzdG9wVmlkZW9TdHJlYW1pbmcnOiBzdG9wVmlkZW9TdHJlYW1pbmcsXG4gICAgICAnaXNTdXBwb3J0ZWQnOiBpc1N1cHBvcnRlZCxcbiAgICAgICdpc1dlYkNhbUdJRlN1cHBvcnRlZCc6IGlzV2ViQ2FtR0lGU3VwcG9ydGVkLFxuICAgICAgJ2lzRXhpc3RpbmdWaWRlb0dJRlN1cHBvcnRlZCc6IGlzRXhpc3RpbmdWaWRlb0dJRlN1cHBvcnRlZCxcbiAgICAgICdpc0V4aXN0aW5nSW1hZ2VzR0lGU3VwcG9ydGVkJzogaXNFeGlzdGluZ0ltYWdlc0dJRlN1cHBvcnRlZCxcbiAgICAgICdWRVJTSU9OJzogJzAuMS4xJ1xuICAgIH07XG4gICAgcmV0dXJuIGdpZnNob3Q7XG4gIH0odXRpbHMsIGVycm9yLCBkZWZhdWx0T3B0aW9ucywgaXNTdXBwb3J0ZWQsIGlzV2ViQ2FtR0lGU3VwcG9ydGVkLCBpc0V4aXN0aW5nSW1hZ2VzR0lGU3VwcG9ydGVkLCBpc0V4aXN0aW5nVmlkZW9HSUZTdXBwb3J0ZWQsIGNyZWF0ZUdJRiwgdGFrZVNuYXBTaG90LCBzdG9wVmlkZW9TdHJlYW1pbmcpO1xuICAoZnVuY3Rpb24oQVBJKSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEFQSTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IEFQSTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmdpZnNob3QgPSBBUEk7XG4gICAgfVxuICB9KEFQSSkpO1xufSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30sIHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiA/IGRvY3VtZW50IDoge2NyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uKCkge319LCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93Lm5hdmlnYXRvciA6IHt9KSk7XG5cblxufSx7fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbm1vZHVsZS5leHBvcnRzLlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24gfHwgd2luZG93Lm1velJUQ1Nlc3Npb25EZXNjcmlwdGlvbjtcbm1vZHVsZS5leHBvcnRzLlJUQ1BlZXJDb25uZWN0aW9uID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8IHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbiB8fCB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb247XG5tb2R1bGUuZXhwb3J0cy5SVENJY2VDYW5kaWRhdGUgPSB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlIHx8IHdpbmRvdy5tb3pSVENJY2VDYW5kaWRhdGU7XG5cblxufSx7fV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpO1xudmFyIE5lZ290aWF0b3IgPSByZXF1aXJlKCcuL25lZ290aWF0b3InKTtcbnZhciBSZWxpYWJsZSA9IHJlcXVpcmUoJ3JlbGlhYmxlJyk7XG5mdW5jdGlvbiBEYXRhQ29ubmVjdGlvbihwZWVyLCBwcm92aWRlciwgb3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRGF0YUNvbm5lY3Rpb24pKVxuICAgIHJldHVybiBuZXcgRGF0YUNvbm5lY3Rpb24ocGVlciwgcHJvdmlkZXIsIG9wdGlvbnMpO1xuICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcbiAgdGhpcy5vcHRpb25zID0gdXRpbC5leHRlbmQoe1xuICAgIHNlcmlhbGl6YXRpb246ICdiaW5hcnknLFxuICAgIHJlbGlhYmxlOiBmYWxzZVxuICB9LCBvcHRpb25zKTtcbiAgdGhpcy5vcGVuID0gZmFsc2U7XG4gIHRoaXMudHlwZSA9ICdkYXRhJztcbiAgdGhpcy5wZWVyID0gcGVlcjtcbiAgdGhpcy5wcm92aWRlciA9IHByb3ZpZGVyO1xuICB0aGlzLmlkID0gdGhpcy5vcHRpb25zLmNvbm5lY3Rpb25JZCB8fCBEYXRhQ29ubmVjdGlvbi5faWRQcmVmaXggKyB1dGlsLnJhbmRvbVRva2VuKCk7XG4gIHRoaXMubGFiZWwgPSB0aGlzLm9wdGlvbnMubGFiZWwgfHwgdGhpcy5pZDtcbiAgdGhpcy5tZXRhZGF0YSA9IHRoaXMub3B0aW9ucy5tZXRhZGF0YTtcbiAgdGhpcy5zZXJpYWxpemF0aW9uID0gdGhpcy5vcHRpb25zLnNlcmlhbGl6YXRpb247XG4gIHRoaXMucmVsaWFibGUgPSB0aGlzLm9wdGlvbnMucmVsaWFibGU7XG4gIHRoaXMuX2J1ZmZlciA9IFtdO1xuICB0aGlzLl9idWZmZXJpbmcgPSBmYWxzZTtcbiAgdGhpcy5idWZmZXJTaXplID0gMDtcbiAgdGhpcy5fY2h1bmtlZERhdGEgPSB7fTtcbiAgaWYgKHRoaXMub3B0aW9ucy5fcGF5bG9hZCkge1xuICAgIHRoaXMuX3BlZXJCcm93c2VyID0gdGhpcy5vcHRpb25zLl9wYXlsb2FkLmJyb3dzZXI7XG4gIH1cbiAgTmVnb3RpYXRvci5zdGFydENvbm5lY3Rpb24odGhpcywgdGhpcy5vcHRpb25zLl9wYXlsb2FkIHx8IHtvcmlnaW5hdG9yOiB0cnVlfSk7XG59XG51dGlsLmluaGVyaXRzKERhdGFDb25uZWN0aW9uLCBFdmVudEVtaXR0ZXIpO1xuRGF0YUNvbm5lY3Rpb24uX2lkUHJlZml4ID0gJ2RjXyc7XG5EYXRhQ29ubmVjdGlvbi5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKGRjKSB7XG4gIHRoaXMuX2RjID0gdGhpcy5kYXRhQ2hhbm5lbCA9IGRjO1xuICB0aGlzLl9jb25maWd1cmVEYXRhQ2hhbm5lbCgpO1xufTtcbkRhdGFDb25uZWN0aW9uLnByb3RvdHlwZS5fY29uZmlndXJlRGF0YUNoYW5uZWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAodXRpbC5zdXBwb3J0cy5zY3RwKSB7XG4gICAgdGhpcy5fZGMuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gIH1cbiAgdGhpcy5fZGMub25vcGVuID0gZnVuY3Rpb24oKSB7XG4gICAgdXRpbC5sb2coJ0RhdGEgY2hhbm5lbCBjb25uZWN0aW9uIHN1Y2Nlc3MnKTtcbiAgICBzZWxmLm9wZW4gPSB0cnVlO1xuICAgIHNlbGYuZW1pdCgnb3BlbicpO1xuICB9O1xuICBpZiAoIXV0aWwuc3VwcG9ydHMuc2N0cCAmJiB0aGlzLnJlbGlhYmxlKSB7XG4gICAgdGhpcy5fcmVsaWFibGUgPSBuZXcgUmVsaWFibGUodGhpcy5fZGMsIHV0aWwuZGVidWcpO1xuICB9XG4gIGlmICh0aGlzLl9yZWxpYWJsZSkge1xuICAgIHRoaXMuX3JlbGlhYmxlLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1zZykge1xuICAgICAgc2VsZi5lbWl0KCdkYXRhJywgbXNnKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2RjLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHNlbGYuX2hhbmRsZURhdGFNZXNzYWdlKGUpO1xuICAgIH07XG4gIH1cbiAgdGhpcy5fZGMub25jbG9zZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICB1dGlsLmxvZygnRGF0YUNoYW5uZWwgY2xvc2VkIGZvcjonLCBzZWxmLnBlZXIpO1xuICAgIHNlbGYuY2xvc2UoKTtcbiAgfTtcbn07XG5EYXRhQ29ubmVjdGlvbi5wcm90b3R5cGUuX2hhbmRsZURhdGFNZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBkYXRhID0gZS5kYXRhO1xuICB2YXIgZGF0YXR5cGUgPSBkYXRhLmNvbnN0cnVjdG9yO1xuICBpZiAodGhpcy5zZXJpYWxpemF0aW9uID09PSAnYmluYXJ5JyB8fCB0aGlzLnNlcmlhbGl6YXRpb24gPT09ICdiaW5hcnktdXRmOCcpIHtcbiAgICBpZiAoZGF0YXR5cGUgPT09IEJsb2IpIHtcbiAgICAgIHV0aWwuYmxvYlRvQXJyYXlCdWZmZXIoZGF0YSwgZnVuY3Rpb24oYWIpIHtcbiAgICAgICAgZGF0YSA9IHV0aWwudW5wYWNrKGFiKTtcbiAgICAgICAgc2VsZi5lbWl0KCdkYXRhJywgZGF0YSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGRhdGF0eXBlID09PSBBcnJheUJ1ZmZlcikge1xuICAgICAgZGF0YSA9IHV0aWwudW5wYWNrKGRhdGEpO1xuICAgIH0gZWxzZSBpZiAoZGF0YXR5cGUgPT09IFN0cmluZykge1xuICAgICAgdmFyIGFiID0gdXRpbC5iaW5hcnlTdHJpbmdUb0FycmF5QnVmZmVyKGRhdGEpO1xuICAgICAgZGF0YSA9IHV0aWwudW5wYWNrKGFiKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodGhpcy5zZXJpYWxpemF0aW9uID09PSAnanNvbicpIHtcbiAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgfVxuICBpZiAoZGF0YS5fX3BlZXJEYXRhKSB7XG4gICAgdmFyIGlkID0gZGF0YS5fX3BlZXJEYXRhO1xuICAgIHZhciBjaHVua0luZm8gPSB0aGlzLl9jaHVua2VkRGF0YVtpZF0gfHwge1xuICAgICAgZGF0YTogW10sXG4gICAgICBjb3VudDogMCxcbiAgICAgIHRvdGFsOiBkYXRhLnRvdGFsXG4gICAgfTtcbiAgICBjaHVua0luZm8uZGF0YVtkYXRhLm5dID0gZGF0YS5kYXRhO1xuICAgIGNodW5rSW5mby5jb3VudCArPSAxO1xuICAgIGlmIChjaHVua0luZm8udG90YWwgPT09IGNodW5rSW5mby5jb3VudCkge1xuICAgICAgZGVsZXRlIHRoaXMuX2NodW5rZWREYXRhW2lkXTtcbiAgICAgIGRhdGEgPSBuZXcgQmxvYihjaHVua0luZm8uZGF0YSk7XG4gICAgICB0aGlzLl9oYW5kbGVEYXRhTWVzc2FnZSh7ZGF0YTogZGF0YX0pO1xuICAgIH1cbiAgICB0aGlzLl9jaHVua2VkRGF0YVtpZF0gPSBjaHVua0luZm87XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZW1pdCgnZGF0YScsIGRhdGEpO1xufTtcbkRhdGFDb25uZWN0aW9uLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMub3Blbikge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgTmVnb3RpYXRvci5jbGVhbnVwKHRoaXMpO1xuICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG59O1xuRGF0YUNvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhLCBjaHVua2VkKSB7XG4gIGlmICghdGhpcy5vcGVuKSB7XG4gICAgdGhpcy5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignQ29ubmVjdGlvbiBpcyBub3Qgb3Blbi4gWW91IHNob3VsZCBsaXN0ZW4gZm9yIHRoZSBgb3BlbmAgZXZlbnQgYmVmb3JlIHNlbmRpbmcgbWVzc2FnZXMuJykpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodGhpcy5fcmVsaWFibGUpIHtcbiAgICB0aGlzLl9yZWxpYWJsZS5zZW5kKGRhdGEpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGlmICh0aGlzLnNlcmlhbGl6YXRpb24gPT09ICdqc29uJykge1xuICAgIHRoaXMuX2J1ZmZlcmVkU2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIH0gZWxzZSBpZiAodGhpcy5zZXJpYWxpemF0aW9uID09PSAnYmluYXJ5JyB8fCB0aGlzLnNlcmlhbGl6YXRpb24gPT09ICdiaW5hcnktdXRmOCcpIHtcbiAgICB2YXIgYmxvYiA9IHV0aWwucGFjayhkYXRhKTtcbiAgICB2YXIgbmVlZHNDaHVua2luZyA9IHV0aWwuY2h1bmtlZEJyb3dzZXJzW3RoaXMuX3BlZXJCcm93c2VyXSB8fCB1dGlsLmNodW5rZWRCcm93c2Vyc1t1dGlsLmJyb3dzZXJdO1xuICAgIGlmIChuZWVkc0NodW5raW5nICYmICFjaHVua2VkICYmIGJsb2Iuc2l6ZSA+IHV0aWwuY2h1bmtlZE1UVSkge1xuICAgICAgdGhpcy5fc2VuZENodW5rcyhibG9iKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF1dGlsLnN1cHBvcnRzLnNjdHApIHtcbiAgICAgIHV0aWwuYmxvYlRvQmluYXJ5U3RyaW5nKGJsb2IsIGZ1bmN0aW9uKHN0cikge1xuICAgICAgICBzZWxmLl9idWZmZXJlZFNlbmQoc3RyKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWwuc3VwcG9ydHMuYmluYXJ5QmxvYikge1xuICAgICAgdXRpbC5ibG9iVG9BcnJheUJ1ZmZlcihibG9iLCBmdW5jdGlvbihhYikge1xuICAgICAgICBzZWxmLl9idWZmZXJlZFNlbmQoYWIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2J1ZmZlcmVkU2VuZChibG9iKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fYnVmZmVyZWRTZW5kKGRhdGEpO1xuICB9XG59O1xuRGF0YUNvbm5lY3Rpb24ucHJvdG90eXBlLl9idWZmZXJlZFNlbmQgPSBmdW5jdGlvbihtc2cpIHtcbiAgaWYgKHRoaXMuX2J1ZmZlcmluZyB8fCAhdGhpcy5fdHJ5U2VuZChtc2cpKSB7XG4gICAgdGhpcy5fYnVmZmVyLnB1c2gobXNnKTtcbiAgICB0aGlzLmJ1ZmZlclNpemUgPSB0aGlzLl9idWZmZXIubGVuZ3RoO1xuICB9XG59O1xuRGF0YUNvbm5lY3Rpb24ucHJvdG90eXBlLl90cnlTZW5kID0gZnVuY3Rpb24obXNnKSB7XG4gIHRyeSB7XG4gICAgdGhpcy5fZGMuc2VuZChtc2cpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdGhpcy5fYnVmZmVyaW5nID0gdHJ1ZTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuX2J1ZmZlcmluZyA9IGZhbHNlO1xuICAgICAgc2VsZi5fdHJ5QnVmZmVyKCk7XG4gICAgfSwgMTAwKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuRGF0YUNvbm5lY3Rpb24ucHJvdG90eXBlLl90cnlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuX2J1ZmZlci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1zZyA9IHRoaXMuX2J1ZmZlclswXTtcbiAgaWYgKHRoaXMuX3RyeVNlbmQobXNnKSkge1xuICAgIHRoaXMuX2J1ZmZlci5zaGlmdCgpO1xuICAgIHRoaXMuYnVmZmVyU2l6ZSA9IHRoaXMuX2J1ZmZlci5sZW5ndGg7XG4gICAgdGhpcy5fdHJ5QnVmZmVyKCk7XG4gIH1cbn07XG5EYXRhQ29ubmVjdGlvbi5wcm90b3R5cGUuX3NlbmRDaHVua3MgPSBmdW5jdGlvbihibG9iKSB7XG4gIHZhciBibG9icyA9IHV0aWwuY2h1bmsoYmxvYik7XG4gIGZvciAodmFyIGkgPSAwLFxuICAgICAgaWkgPSBibG9icy5sZW5ndGg7IGkgPCBpaTsgaSArPSAxKSB7XG4gICAgdmFyIGJsb2IgPSBibG9ic1tpXTtcbiAgICB0aGlzLnNlbmQoYmxvYiwgdHJ1ZSk7XG4gIH1cbn07XG5EYXRhQ29ubmVjdGlvbi5wcm90b3R5cGUuaGFuZGxlTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgdmFyIHBheWxvYWQgPSBtZXNzYWdlLnBheWxvYWQ7XG4gIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XG4gICAgY2FzZSAnQU5TV0VSJzpcbiAgICAgIHRoaXMuX3BlZXJCcm93c2VyID0gcGF5bG9hZC5icm93c2VyO1xuICAgICAgTmVnb3RpYXRvci5oYW5kbGVTRFAobWVzc2FnZS50eXBlLCB0aGlzLCBwYXlsb2FkLnNkcCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdDQU5ESURBVEUnOlxuICAgICAgTmVnb3RpYXRvci5oYW5kbGVDYW5kaWRhdGUodGhpcywgcGF5bG9hZC5jYW5kaWRhdGUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHV0aWwud2FybignVW5yZWNvZ25pemVkIG1lc3NhZ2UgdHlwZTonLCBtZXNzYWdlLnR5cGUsICdmcm9tIHBlZXI6JywgdGhpcy5wZWVyKTtcbiAgICAgIGJyZWFrO1xuICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBEYXRhQ29ubmVjdGlvbjtcblxuXG59LHtcIi4vbmVnb3RpYXRvclwiOjksXCIuL3V0aWxcIjoxMixcImV2ZW50ZW1pdHRlcjNcIjoxMyxcInJlbGlhYmxlXCI6MTZ9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIzJyk7XG52YXIgTmVnb3RpYXRvciA9IHJlcXVpcmUoJy4vbmVnb3RpYXRvcicpO1xuZnVuY3Rpb24gTWVkaWFDb25uZWN0aW9uKHBlZXIsIHByb3ZpZGVyLCBvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNZWRpYUNvbm5lY3Rpb24pKVxuICAgIHJldHVybiBuZXcgTWVkaWFDb25uZWN0aW9uKHBlZXIsIHByb3ZpZGVyLCBvcHRpb25zKTtcbiAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG4gIHRoaXMub3B0aW9ucyA9IHV0aWwuZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgdGhpcy5vcGVuID0gZmFsc2U7XG4gIHRoaXMudHlwZSA9ICdtZWRpYSc7XG4gIHRoaXMucGVlciA9IHBlZXI7XG4gIHRoaXMucHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgdGhpcy5tZXRhZGF0YSA9IHRoaXMub3B0aW9ucy5tZXRhZGF0YTtcbiAgdGhpcy5sb2NhbFN0cmVhbSA9IHRoaXMub3B0aW9ucy5fc3RyZWFtO1xuICB0aGlzLmlkID0gdGhpcy5vcHRpb25zLmNvbm5lY3Rpb25JZCB8fCBNZWRpYUNvbm5lY3Rpb24uX2lkUHJlZml4ICsgdXRpbC5yYW5kb21Ub2tlbigpO1xuICBpZiAodGhpcy5sb2NhbFN0cmVhbSkge1xuICAgIE5lZ290aWF0b3Iuc3RhcnRDb25uZWN0aW9uKHRoaXMsIHtcbiAgICAgIF9zdHJlYW06IHRoaXMubG9jYWxTdHJlYW0sXG4gICAgICBvcmlnaW5hdG9yOiB0cnVlXG4gICAgfSk7XG4gIH1cbn1cbjtcbnV0aWwuaW5oZXJpdHMoTWVkaWFDb25uZWN0aW9uLCBFdmVudEVtaXR0ZXIpO1xuTWVkaWFDb25uZWN0aW9uLl9pZFByZWZpeCA9ICdtY18nO1xuTWVkaWFDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihyZW1vdGVTdHJlYW0pIHtcbiAgdXRpbC5sb2coJ1JlY2VpdmluZyBzdHJlYW0nLCByZW1vdGVTdHJlYW0pO1xuICB0aGlzLnJlbW90ZVN0cmVhbSA9IHJlbW90ZVN0cmVhbTtcbiAgdGhpcy5lbWl0KCdzdHJlYW0nLCByZW1vdGVTdHJlYW0pO1xufTtcbk1lZGlhQ29ubmVjdGlvbi5wcm90b3R5cGUuaGFuZGxlTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgdmFyIHBheWxvYWQgPSBtZXNzYWdlLnBheWxvYWQ7XG4gIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XG4gICAgY2FzZSAnQU5TV0VSJzpcbiAgICAgIE5lZ290aWF0b3IuaGFuZGxlU0RQKG1lc3NhZ2UudHlwZSwgdGhpcywgcGF5bG9hZC5zZHApO1xuICAgICAgdGhpcy5vcGVuID0gdHJ1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0NBTkRJREFURSc6XG4gICAgICBOZWdvdGlhdG9yLmhhbmRsZUNhbmRpZGF0ZSh0aGlzLCBwYXlsb2FkLmNhbmRpZGF0ZSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdXRpbC53YXJuKCdVbnJlY29nbml6ZWQgbWVzc2FnZSB0eXBlOicsIG1lc3NhZ2UudHlwZSwgJ2Zyb20gcGVlcjonLCB0aGlzLnBlZXIpO1xuICAgICAgYnJlYWs7XG4gIH1cbn07XG5NZWRpYUNvbm5lY3Rpb24ucHJvdG90eXBlLmFuc3dlciA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICBpZiAodGhpcy5sb2NhbFN0cmVhbSkge1xuICAgIHV0aWwud2FybignTG9jYWwgc3RyZWFtIGFscmVhZHkgZXhpc3RzIG9uIHRoaXMgTWVkaWFDb25uZWN0aW9uLiBBcmUgeW91IGFuc3dlcmluZyBhIGNhbGwgdHdpY2U/Jyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMub3B0aW9ucy5fcGF5bG9hZC5fc3RyZWFtID0gc3RyZWFtO1xuICB0aGlzLmxvY2FsU3RyZWFtID0gc3RyZWFtO1xuICBOZWdvdGlhdG9yLnN0YXJ0Q29ubmVjdGlvbih0aGlzLCB0aGlzLm9wdGlvbnMuX3BheWxvYWQpO1xuICB2YXIgbWVzc2FnZXMgPSB0aGlzLnByb3ZpZGVyLl9nZXRNZXNzYWdlcyh0aGlzLmlkKTtcbiAgZm9yICh2YXIgaSA9IDAsXG4gICAgICBpaSA9IG1lc3NhZ2VzLmxlbmd0aDsgaSA8IGlpOyBpICs9IDEpIHtcbiAgICB0aGlzLmhhbmRsZU1lc3NhZ2UobWVzc2FnZXNbaV0pO1xuICB9XG4gIHRoaXMub3BlbiA9IHRydWU7XG59O1xuTWVkaWFDb25uZWN0aW9uLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMub3Blbikge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgTmVnb3RpYXRvci5jbGVhbnVwKHRoaXMpO1xuICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBNZWRpYUNvbm5lY3Rpb247XG5cblxufSx7XCIuL25lZ290aWF0b3JcIjo5LFwiLi91dGlsXCI6MTIsXCJldmVudGVtaXR0ZXIzXCI6MTN9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBSVENQZWVyQ29ubmVjdGlvbiA9IHJlcXVpcmUoJy4vYWRhcHRlcicpLlJUQ1BlZXJDb25uZWN0aW9uO1xudmFyIFJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IHJlcXVpcmUoJy4vYWRhcHRlcicpLlJUQ1Nlc3Npb25EZXNjcmlwdGlvbjtcbnZhciBSVENJY2VDYW5kaWRhdGUgPSByZXF1aXJlKCcuL2FkYXB0ZXInKS5SVENJY2VDYW5kaWRhdGU7XG52YXIgTmVnb3RpYXRvciA9IHtcbiAgcGNzOiB7XG4gICAgZGF0YToge30sXG4gICAgbWVkaWE6IHt9XG4gIH0sXG4gIHF1ZXVlOiBbXVxufTtcbk5lZ290aWF0b3IuX2lkUHJlZml4ID0gJ3BjXyc7XG5OZWdvdGlhdG9yLnN0YXJ0Q29ubmVjdGlvbiA9IGZ1bmN0aW9uKGNvbm5lY3Rpb24sIG9wdGlvbnMpIHtcbiAgdmFyIHBjID0gTmVnb3RpYXRvci5fZ2V0UGVlckNvbm5lY3Rpb24oY29ubmVjdGlvbiwgb3B0aW9ucyk7XG4gIGlmIChjb25uZWN0aW9uLnR5cGUgPT09ICdtZWRpYScgJiYgb3B0aW9ucy5fc3RyZWFtKSB7XG4gICAgcGMuYWRkU3RyZWFtKG9wdGlvbnMuX3N0cmVhbSk7XG4gIH1cbiAgY29ubmVjdGlvbi5wYyA9IGNvbm5lY3Rpb24ucGVlckNvbm5lY3Rpb24gPSBwYztcbiAgaWYgKG9wdGlvbnMub3JpZ2luYXRvcikge1xuICAgIGlmIChjb25uZWN0aW9uLnR5cGUgPT09ICdkYXRhJykge1xuICAgICAgdmFyIGNvbmZpZyA9IHt9O1xuICAgICAgaWYgKCF1dGlsLnN1cHBvcnRzLnNjdHApIHtcbiAgICAgICAgY29uZmlnID0ge3JlbGlhYmxlOiBvcHRpb25zLnJlbGlhYmxlfTtcbiAgICAgIH1cbiAgICAgIHZhciBkYyA9IHBjLmNyZWF0ZURhdGFDaGFubmVsKGNvbm5lY3Rpb24ubGFiZWwsIGNvbmZpZyk7XG4gICAgICBjb25uZWN0aW9uLmluaXRpYWxpemUoZGMpO1xuICAgIH1cbiAgICBpZiAoIXV0aWwuc3VwcG9ydHMub25uZWdvdGlhdGlvbm5lZWRlZCkge1xuICAgICAgTmVnb3RpYXRvci5fbWFrZU9mZmVyKGNvbm5lY3Rpb24pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBOZWdvdGlhdG9yLmhhbmRsZVNEUCgnT0ZGRVInLCBjb25uZWN0aW9uLCBvcHRpb25zLnNkcCk7XG4gIH1cbn07XG5OZWdvdGlhdG9yLl9nZXRQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKGNvbm5lY3Rpb24sIG9wdGlvbnMpIHtcbiAgaWYgKCFOZWdvdGlhdG9yLnBjc1tjb25uZWN0aW9uLnR5cGVdKSB7XG4gICAgdXRpbC5lcnJvcihjb25uZWN0aW9uLnR5cGUgKyAnIGlzIG5vdCBhIHZhbGlkIGNvbm5lY3Rpb24gdHlwZS4gTWF5YmUgeW91IG92ZXJyb2RlIHRoZSBgdHlwZWAgcHJvcGVydHkgc29tZXdoZXJlLicpO1xuICB9XG4gIGlmICghTmVnb3RpYXRvci5wY3NbY29ubmVjdGlvbi50eXBlXVtjb25uZWN0aW9uLnBlZXJdKSB7XG4gICAgTmVnb3RpYXRvci5wY3NbY29ubmVjdGlvbi50eXBlXVtjb25uZWN0aW9uLnBlZXJdID0ge307XG4gIH1cbiAgdmFyIHBlZXJDb25uZWN0aW9ucyA9IE5lZ290aWF0b3IucGNzW2Nvbm5lY3Rpb24udHlwZV1bY29ubmVjdGlvbi5wZWVyXTtcbiAgdmFyIHBjO1xuICBpZiAob3B0aW9ucy5wYykge1xuICAgIHBjID0gTmVnb3RpYXRvci5wY3NbY29ubmVjdGlvbi50eXBlXVtjb25uZWN0aW9uLnBlZXJdW29wdGlvbnMucGNdO1xuICB9XG4gIGlmICghcGMgfHwgcGMuc2lnbmFsaW5nU3RhdGUgIT09ICdzdGFibGUnKSB7XG4gICAgcGMgPSBOZWdvdGlhdG9yLl9zdGFydFBlZXJDb25uZWN0aW9uKGNvbm5lY3Rpb24pO1xuICB9XG4gIHJldHVybiBwYztcbn07XG5OZWdvdGlhdG9yLl9zdGFydFBlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24oY29ubmVjdGlvbikge1xuICB1dGlsLmxvZygnQ3JlYXRpbmcgUlRDUGVlckNvbm5lY3Rpb24uJyk7XG4gIHZhciBpZCA9IE5lZ290aWF0b3IuX2lkUHJlZml4ICsgdXRpbC5yYW5kb21Ub2tlbigpO1xuICB2YXIgb3B0aW9uYWwgPSB7fTtcbiAgaWYgKGNvbm5lY3Rpb24udHlwZSA9PT0gJ2RhdGEnICYmICF1dGlsLnN1cHBvcnRzLnNjdHApIHtcbiAgICBvcHRpb25hbCA9IHtvcHRpb25hbDogW3tSdHBEYXRhQ2hhbm5lbHM6IHRydWV9XX07XG4gIH0gZWxzZSBpZiAoY29ubmVjdGlvbi50eXBlID09PSAnbWVkaWEnKSB7XG4gICAgb3B0aW9uYWwgPSB7b3B0aW9uYWw6IFt7RHRsc1NydHBLZXlBZ3JlZW1lbnQ6IHRydWV9XX07XG4gIH1cbiAgdmFyIHBjID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKGNvbm5lY3Rpb24ucHJvdmlkZXIub3B0aW9ucy5jb25maWcsIG9wdGlvbmFsKTtcbiAgTmVnb3RpYXRvci5wY3NbY29ubmVjdGlvbi50eXBlXVtjb25uZWN0aW9uLnBlZXJdW2lkXSA9IHBjO1xuICBOZWdvdGlhdG9yLl9zZXR1cExpc3RlbmVycyhjb25uZWN0aW9uLCBwYywgaWQpO1xuICByZXR1cm4gcGM7XG59O1xuTmVnb3RpYXRvci5fc2V0dXBMaXN0ZW5lcnMgPSBmdW5jdGlvbihjb25uZWN0aW9uLCBwYywgcGNfaWQpIHtcbiAgdmFyIHBlZXJJZCA9IGNvbm5lY3Rpb24ucGVlcjtcbiAgdmFyIGNvbm5lY3Rpb25JZCA9IGNvbm5lY3Rpb24uaWQ7XG4gIHZhciBwcm92aWRlciA9IGNvbm5lY3Rpb24ucHJvdmlkZXI7XG4gIHV0aWwubG9nKCdMaXN0ZW5pbmcgZm9yIElDRSBjYW5kaWRhdGVzLicpO1xuICBwYy5vbmljZWNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGV2dCkge1xuICAgIGlmIChldnQuY2FuZGlkYXRlKSB7XG4gICAgICB1dGlsLmxvZygnUmVjZWl2ZWQgSUNFIGNhbmRpZGF0ZXMgZm9yOicsIGNvbm5lY3Rpb24ucGVlcik7XG4gICAgICBwcm92aWRlci5zb2NrZXQuc2VuZCh7XG4gICAgICAgIHR5cGU6ICdDQU5ESURBVEUnLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgY2FuZGlkYXRlOiBldnQuY2FuZGlkYXRlLFxuICAgICAgICAgIHR5cGU6IGNvbm5lY3Rpb24udHlwZSxcbiAgICAgICAgICBjb25uZWN0aW9uSWQ6IGNvbm5lY3Rpb24uaWRcbiAgICAgICAgfSxcbiAgICAgICAgZHN0OiBwZWVySWRcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgcGMub25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBzd2l0Y2ggKHBjLmljZUNvbm5lY3Rpb25TdGF0ZSkge1xuICAgICAgY2FzZSAnZGlzY29ubmVjdGVkJzpcbiAgICAgIGNhc2UgJ2ZhaWxlZCc6XG4gICAgICAgIHV0aWwubG9nKCdpY2VDb25uZWN0aW9uU3RhdGUgaXMgZGlzY29ubmVjdGVkLCBjbG9zaW5nIGNvbm5lY3Rpb25zIHRvICcgKyBwZWVySWQpO1xuICAgICAgICBjb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY29tcGxldGVkJzpcbiAgICAgICAgcGMub25pY2VjYW5kaWRhdGUgPSB1dGlsLm5vb3A7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcbiAgcGMub25pY2VjaGFuZ2UgPSBwYy5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZTtcbiAgdXRpbC5sb2coJ0xpc3RlbmluZyBmb3IgYG5lZ290aWF0aW9ubmVlZGVkYCcpO1xuICBwYy5vbm5lZ290aWF0aW9ubmVlZGVkID0gZnVuY3Rpb24oKSB7XG4gICAgdXRpbC5sb2coJ2BuZWdvdGlhdGlvbm5lZWRlZGAgdHJpZ2dlcmVkJyk7XG4gICAgaWYgKHBjLnNpZ25hbGluZ1N0YXRlID09ICdzdGFibGUnKSB7XG4gICAgICBOZWdvdGlhdG9yLl9tYWtlT2ZmZXIoY29ubmVjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHV0aWwubG9nKCdvbm5lZ290aWF0aW9ubmVlZGVkIHRyaWdnZXJlZCB3aGVuIG5vdCBzdGFibGUuIElzIGFub3RoZXIgY29ubmVjdGlvbiBiZWluZyBlc3RhYmxpc2hlZD8nKTtcbiAgICB9XG4gIH07XG4gIHV0aWwubG9nKCdMaXN0ZW5pbmcgZm9yIGRhdGEgY2hhbm5lbCcpO1xuICBwYy5vbmRhdGFjaGFubmVsID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgdXRpbC5sb2coJ1JlY2VpdmVkIGRhdGEgY2hhbm5lbCcpO1xuICAgIHZhciBkYyA9IGV2dC5jaGFubmVsO1xuICAgIHZhciBjb25uZWN0aW9uID0gcHJvdmlkZXIuZ2V0Q29ubmVjdGlvbihwZWVySWQsIGNvbm5lY3Rpb25JZCk7XG4gICAgY29ubmVjdGlvbi5pbml0aWFsaXplKGRjKTtcbiAgfTtcbiAgdXRpbC5sb2coJ0xpc3RlbmluZyBmb3IgcmVtb3RlIHN0cmVhbScpO1xuICBwYy5vbmFkZHN0cmVhbSA9IGZ1bmN0aW9uKGV2dCkge1xuICAgIHV0aWwubG9nKCdSZWNlaXZlZCByZW1vdGUgc3RyZWFtJyk7XG4gICAgdmFyIHN0cmVhbSA9IGV2dC5zdHJlYW07XG4gICAgdmFyIGNvbm5lY3Rpb24gPSBwcm92aWRlci5nZXRDb25uZWN0aW9uKHBlZXJJZCwgY29ubmVjdGlvbklkKTtcbiAgICBpZiAoY29ubmVjdGlvbi50eXBlID09PSAnbWVkaWEnKSB7XG4gICAgICBjb25uZWN0aW9uLmFkZFN0cmVhbShzdHJlYW0pO1xuICAgIH1cbiAgfTtcbn07XG5OZWdvdGlhdG9yLmNsZWFudXAgPSBmdW5jdGlvbihjb25uZWN0aW9uKSB7XG4gIHV0aWwubG9nKCdDbGVhbmluZyB1cCBQZWVyQ29ubmVjdGlvbiB0byAnICsgY29ubmVjdGlvbi5wZWVyKTtcbiAgdmFyIHBjID0gY29ubmVjdGlvbi5wYztcbiAgaWYgKCEhcGMgJiYgKHBjLnJlYWR5U3RhdGUgIT09ICdjbG9zZWQnIHx8IHBjLnNpZ25hbGluZ1N0YXRlICE9PSAnY2xvc2VkJykpIHtcbiAgICBwYy5jbG9zZSgpO1xuICAgIGNvbm5lY3Rpb24ucGMgPSBudWxsO1xuICB9XG59O1xuTmVnb3RpYXRvci5fbWFrZU9mZmVyID0gZnVuY3Rpb24oY29ubmVjdGlvbikge1xuICB2YXIgcGMgPSBjb25uZWN0aW9uLnBjO1xuICBwYy5jcmVhdGVPZmZlcihmdW5jdGlvbihvZmZlcikge1xuICAgIHV0aWwubG9nKCdDcmVhdGVkIG9mZmVyLicpO1xuICAgIGlmICghdXRpbC5zdXBwb3J0cy5zY3RwICYmIGNvbm5lY3Rpb24udHlwZSA9PT0gJ2RhdGEnICYmIGNvbm5lY3Rpb24ucmVsaWFibGUpIHtcbiAgICAgIG9mZmVyLnNkcCA9IFJlbGlhYmxlLmhpZ2hlckJhbmR3aWR0aFNEUChvZmZlci5zZHApO1xuICAgIH1cbiAgICBwYy5zZXRMb2NhbERlc2NyaXB0aW9uKG9mZmVyLCBmdW5jdGlvbigpIHtcbiAgICAgIHV0aWwubG9nKCdTZXQgbG9jYWxEZXNjcmlwdGlvbjogb2ZmZXInLCAnZm9yOicsIGNvbm5lY3Rpb24ucGVlcik7XG4gICAgICBjb25uZWN0aW9uLnByb3ZpZGVyLnNvY2tldC5zZW5kKHtcbiAgICAgICAgdHlwZTogJ09GRkVSJyxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIHNkcDogb2ZmZXIsXG4gICAgICAgICAgdHlwZTogY29ubmVjdGlvbi50eXBlLFxuICAgICAgICAgIGxhYmVsOiBjb25uZWN0aW9uLmxhYmVsLFxuICAgICAgICAgIGNvbm5lY3Rpb25JZDogY29ubmVjdGlvbi5pZCxcbiAgICAgICAgICByZWxpYWJsZTogY29ubmVjdGlvbi5yZWxpYWJsZSxcbiAgICAgICAgICBzZXJpYWxpemF0aW9uOiBjb25uZWN0aW9uLnNlcmlhbGl6YXRpb24sXG4gICAgICAgICAgbWV0YWRhdGE6IGNvbm5lY3Rpb24ubWV0YWRhdGEsXG4gICAgICAgICAgYnJvd3NlcjogdXRpbC5icm93c2VyXG4gICAgICAgIH0sXG4gICAgICAgIGRzdDogY29ubmVjdGlvbi5wZWVyXG4gICAgICB9KTtcbiAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbm5lY3Rpb24ucHJvdmlkZXIuZW1pdEVycm9yKCd3ZWJydGMnLCBlcnIpO1xuICAgICAgdXRpbC5sb2coJ0ZhaWxlZCB0byBzZXRMb2NhbERlc2NyaXB0aW9uLCAnLCBlcnIpO1xuICAgIH0pO1xuICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICBjb25uZWN0aW9uLnByb3ZpZGVyLmVtaXRFcnJvcignd2VicnRjJywgZXJyKTtcbiAgICB1dGlsLmxvZygnRmFpbGVkIHRvIGNyZWF0ZU9mZmVyLCAnLCBlcnIpO1xuICB9LCBjb25uZWN0aW9uLm9wdGlvbnMuY29uc3RyYWludHMpO1xufTtcbk5lZ290aWF0b3IuX21ha2VBbnN3ZXIgPSBmdW5jdGlvbihjb25uZWN0aW9uKSB7XG4gIHZhciBwYyA9IGNvbm5lY3Rpb24ucGM7XG4gIHBjLmNyZWF0ZUFuc3dlcihmdW5jdGlvbihhbnN3ZXIpIHtcbiAgICB1dGlsLmxvZygnQ3JlYXRlZCBhbnN3ZXIuJyk7XG4gICAgaWYgKCF1dGlsLnN1cHBvcnRzLnNjdHAgJiYgY29ubmVjdGlvbi50eXBlID09PSAnZGF0YScgJiYgY29ubmVjdGlvbi5yZWxpYWJsZSkge1xuICAgICAgYW5zd2VyLnNkcCA9IFJlbGlhYmxlLmhpZ2hlckJhbmR3aWR0aFNEUChhbnN3ZXIuc2RwKTtcbiAgICB9XG4gICAgcGMuc2V0TG9jYWxEZXNjcmlwdGlvbihhbnN3ZXIsIGZ1bmN0aW9uKCkge1xuICAgICAgdXRpbC5sb2coJ1NldCBsb2NhbERlc2NyaXB0aW9uOiBhbnN3ZXInLCAnZm9yOicsIGNvbm5lY3Rpb24ucGVlcik7XG4gICAgICBjb25uZWN0aW9uLnByb3ZpZGVyLnNvY2tldC5zZW5kKHtcbiAgICAgICAgdHlwZTogJ0FOU1dFUicsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBzZHA6IGFuc3dlcixcbiAgICAgICAgICB0eXBlOiBjb25uZWN0aW9uLnR5cGUsXG4gICAgICAgICAgY29ubmVjdGlvbklkOiBjb25uZWN0aW9uLmlkLFxuICAgICAgICAgIGJyb3dzZXI6IHV0aWwuYnJvd3NlclxuICAgICAgICB9LFxuICAgICAgICBkc3Q6IGNvbm5lY3Rpb24ucGVlclxuICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25uZWN0aW9uLnByb3ZpZGVyLmVtaXRFcnJvcignd2VicnRjJywgZXJyKTtcbiAgICAgIHV0aWwubG9nKCdGYWlsZWQgdG8gc2V0TG9jYWxEZXNjcmlwdGlvbiwgJywgZXJyKTtcbiAgICB9KTtcbiAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgY29ubmVjdGlvbi5wcm92aWRlci5lbWl0RXJyb3IoJ3dlYnJ0YycsIGVycik7XG4gICAgdXRpbC5sb2coJ0ZhaWxlZCB0byBjcmVhdGUgYW5zd2VyLCAnLCBlcnIpO1xuICB9KTtcbn07XG5OZWdvdGlhdG9yLmhhbmRsZVNEUCA9IGZ1bmN0aW9uKHR5cGUsIGNvbm5lY3Rpb24sIHNkcCkge1xuICBzZHAgPSBuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHNkcCk7XG4gIHZhciBwYyA9IGNvbm5lY3Rpb24ucGM7XG4gIHV0aWwubG9nKCdTZXR0aW5nIHJlbW90ZSBkZXNjcmlwdGlvbicsIHNkcCk7XG4gIHBjLnNldFJlbW90ZURlc2NyaXB0aW9uKHNkcCwgZnVuY3Rpb24oKSB7XG4gICAgdXRpbC5sb2coJ1NldCByZW1vdGVEZXNjcmlwdGlvbjonLCB0eXBlLCAnZm9yOicsIGNvbm5lY3Rpb24ucGVlcik7XG4gICAgaWYgKHR5cGUgPT09ICdPRkZFUicpIHtcbiAgICAgIE5lZ290aWF0b3IuX21ha2VBbnN3ZXIoY29ubmVjdGlvbik7XG4gICAgfVxuICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICBjb25uZWN0aW9uLnByb3ZpZGVyLmVtaXRFcnJvcignd2VicnRjJywgZXJyKTtcbiAgICB1dGlsLmxvZygnRmFpbGVkIHRvIHNldFJlbW90ZURlc2NyaXB0aW9uLCAnLCBlcnIpO1xuICB9KTtcbn07XG5OZWdvdGlhdG9yLmhhbmRsZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGNvbm5lY3Rpb24sIGljZSkge1xuICB2YXIgY2FuZGlkYXRlID0gaWNlLmNhbmRpZGF0ZTtcbiAgdmFyIHNkcE1MaW5lSW5kZXggPSBpY2Uuc2RwTUxpbmVJbmRleDtcbiAgY29ubmVjdGlvbi5wYy5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZSh7XG4gICAgc2RwTUxpbmVJbmRleDogc2RwTUxpbmVJbmRleCxcbiAgICBjYW5kaWRhdGU6IGNhbmRpZGF0ZVxuICB9KSk7XG4gIHV0aWwubG9nKCdBZGRlZCBJQ0UgY2FuZGlkYXRlIGZvcjonLCBjb25uZWN0aW9uLnBlZXIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gTmVnb3RpYXRvcjtcblxuXG59LHtcIi4vYWRhcHRlclwiOjYsXCIuL3V0aWxcIjoxMn1dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIzJyk7XG52YXIgU29ja2V0ID0gcmVxdWlyZSgnLi9zb2NrZXQnKTtcbnZhciBNZWRpYUNvbm5lY3Rpb24gPSByZXF1aXJlKCcuL21lZGlhY29ubmVjdGlvbicpO1xudmFyIERhdGFDb25uZWN0aW9uID0gcmVxdWlyZSgnLi9kYXRhY29ubmVjdGlvbicpO1xuZnVuY3Rpb24gUGVlcihpZCwgb3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUGVlcikpXG4gICAgcmV0dXJuIG5ldyBQZWVyKGlkLCBvcHRpb25zKTtcbiAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG4gIGlmIChpZCAmJiBpZC5jb25zdHJ1Y3RvciA9PSBPYmplY3QpIHtcbiAgICBvcHRpb25zID0gaWQ7XG4gICAgaWQgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAoaWQpIHtcbiAgICBpZCA9IGlkLnRvU3RyaW5nKCk7XG4gIH1cbiAgb3B0aW9ucyA9IHV0aWwuZXh0ZW5kKHtcbiAgICBkZWJ1ZzogMCxcbiAgICBob3N0OiB1dGlsLkNMT1VEX0hPU1QsXG4gICAgcG9ydDogdXRpbC5DTE9VRF9QT1JULFxuICAgIGtleTogJ3BlZXJqcycsXG4gICAgcGF0aDogJy8nLFxuICAgIHRva2VuOiB1dGlsLnJhbmRvbVRva2VuKCksXG4gICAgY29uZmlnOiB1dGlsLmRlZmF1bHRDb25maWdcbiAgfSwgb3B0aW9ucyk7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIGlmIChvcHRpb25zLmhvc3QgPT09ICcvJykge1xuICAgIG9wdGlvbnMuaG9zdCA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgfVxuICBpZiAob3B0aW9ucy5wYXRoWzBdICE9PSAnLycpIHtcbiAgICBvcHRpb25zLnBhdGggPSAnLycgKyBvcHRpb25zLnBhdGg7XG4gIH1cbiAgaWYgKG9wdGlvbnMucGF0aFtvcHRpb25zLnBhdGgubGVuZ3RoIC0gMV0gIT09ICcvJykge1xuICAgIG9wdGlvbnMucGF0aCArPSAnLyc7XG4gIH1cbiAgaWYgKG9wdGlvbnMuc2VjdXJlID09PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5ob3N0ICE9PSB1dGlsLkNMT1VEX0hPU1QpIHtcbiAgICBvcHRpb25zLnNlY3VyZSA9IHV0aWwuaXNTZWN1cmUoKTtcbiAgfVxuICBpZiAob3B0aW9ucy5sb2dGdW5jdGlvbikge1xuICAgIHV0aWwuc2V0TG9nRnVuY3Rpb24ob3B0aW9ucy5sb2dGdW5jdGlvbik7XG4gIH1cbiAgdXRpbC5zZXRMb2dMZXZlbChvcHRpb25zLmRlYnVnKTtcbiAgaWYgKCF1dGlsLnN1cHBvcnRzLmF1ZGlvVmlkZW8gJiYgIXV0aWwuc3VwcG9ydHMuZGF0YSkge1xuICAgIHRoaXMuX2RlbGF5ZWRBYm9ydCgnYnJvd3Nlci1pbmNvbXBhdGlibGUnLCAnVGhlIGN1cnJlbnQgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFdlYlJUQycpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXV0aWwudmFsaWRhdGVJZChpZCkpIHtcbiAgICB0aGlzLl9kZWxheWVkQWJvcnQoJ2ludmFsaWQtaWQnLCAnSUQgXCInICsgaWQgKyAnXCIgaXMgaW52YWxpZCcpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXV0aWwudmFsaWRhdGVLZXkob3B0aW9ucy5rZXkpKSB7XG4gICAgdGhpcy5fZGVsYXllZEFib3J0KCdpbnZhbGlkLWtleScsICdBUEkgS0VZIFwiJyArIG9wdGlvbnMua2V5ICsgJ1wiIGlzIGludmFsaWQnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKG9wdGlvbnMuc2VjdXJlICYmIG9wdGlvbnMuaG9zdCA9PT0gJzAucGVlcmpzLmNvbScpIHtcbiAgICB0aGlzLl9kZWxheWVkQWJvcnQoJ3NzbC11bmF2YWlsYWJsZScsICdUaGUgY2xvdWQgc2VydmVyIGN1cnJlbnRseSBkb2VzIG5vdCBzdXBwb3J0IEhUVFBTLiBQbGVhc2UgcnVuIHlvdXIgb3duIFBlZXJTZXJ2ZXIgdG8gdXNlIEhUVFBTLicpO1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmRlc3Ryb3llZCA9IGZhbHNlO1xuICB0aGlzLmRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xuICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgdGhpcy5jb25uZWN0aW9ucyA9IHt9O1xuICB0aGlzLl9sb3N0TWVzc2FnZXMgPSB7fTtcbiAgdGhpcy5faW5pdGlhbGl6ZVNlcnZlckNvbm5lY3Rpb24oKTtcbiAgaWYgKGlkKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZShpZCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fcmV0cmlldmVJZCgpO1xuICB9XG59XG51dGlsLmluaGVyaXRzKFBlZXIsIEV2ZW50RW1pdHRlcik7XG5QZWVyLnByb3RvdHlwZS5faW5pdGlhbGl6ZVNlcnZlckNvbm5lY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLnNvY2tldCA9IG5ldyBTb2NrZXQodGhpcy5vcHRpb25zLnNlY3VyZSwgdGhpcy5vcHRpb25zLmhvc3QsIHRoaXMub3B0aW9ucy5wb3J0LCB0aGlzLm9wdGlvbnMucGF0aCwgdGhpcy5vcHRpb25zLmtleSk7XG4gIHRoaXMuc29ja2V0Lm9uKCdtZXNzYWdlJywgZnVuY3Rpb24oZGF0YSkge1xuICAgIHNlbGYuX2hhbmRsZU1lc3NhZ2UoZGF0YSk7XG4gIH0pO1xuICB0aGlzLnNvY2tldC5vbignZXJyb3InLCBmdW5jdGlvbihlcnJvcikge1xuICAgIHNlbGYuX2Fib3J0KCdzb2NrZXQtZXJyb3InLCBlcnJvcik7XG4gIH0pO1xuICB0aGlzLnNvY2tldC5vbignZGlzY29ubmVjdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFzZWxmLmRpc2Nvbm5lY3RlZCkge1xuICAgICAgc2VsZi5lbWl0RXJyb3IoJ25ldHdvcmsnLCAnTG9zdCBjb25uZWN0aW9uIHRvIHNlcnZlci4nKTtcbiAgICAgIHNlbGYuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfSk7XG4gIHRoaXMuc29ja2V0Lm9uKCdjbG9zZScsIGZ1bmN0aW9uKCkge1xuICAgIGlmICghc2VsZi5kaXNjb25uZWN0ZWQpIHtcbiAgICAgIHNlbGYuX2Fib3J0KCdzb2NrZXQtY2xvc2VkJywgJ1VuZGVybHlpbmcgc29ja2V0IGlzIGFscmVhZHkgY2xvc2VkLicpO1xuICAgIH1cbiAgfSk7XG59O1xuUGVlci5wcm90b3R5cGUuX3JldHJpZXZlSWQgPSBmdW5jdGlvbihjYikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHZhciBwcm90b2NvbCA9IHRoaXMub3B0aW9ucy5zZWN1cmUgPyAnaHR0cHM6Ly8nIDogJ2h0dHA6Ly8nO1xuICB2YXIgdXJsID0gcHJvdG9jb2wgKyB0aGlzLm9wdGlvbnMuaG9zdCArICc6JyArIHRoaXMub3B0aW9ucy5wb3J0ICsgdGhpcy5vcHRpb25zLnBhdGggKyB0aGlzLm9wdGlvbnMua2V5ICsgJy9pZCc7XG4gIHZhciBxdWVyeVN0cmluZyA9ICc/dHM9JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgJycgKyBNYXRoLnJhbmRvbSgpO1xuICB1cmwgKz0gcXVlcnlTdHJpbmc7XG4gIGh0dHAub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcbiAgaHR0cC5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xuICAgIHV0aWwuZXJyb3IoJ0Vycm9yIHJldHJpZXZpbmcgSUQnLCBlKTtcbiAgICB2YXIgcGF0aEVycm9yID0gJyc7XG4gICAgaWYgKHNlbGYub3B0aW9ucy5wYXRoID09PSAnLycgJiYgc2VsZi5vcHRpb25zLmhvc3QgIT09IHV0aWwuQ0xPVURfSE9TVCkge1xuICAgICAgcGF0aEVycm9yID0gJyBJZiB5b3UgcGFzc2VkIGluIGEgYHBhdGhgIHRvIHlvdXIgc2VsZi1ob3N0ZWQgUGVlclNlcnZlciwgJyArICd5b3VcXCdsbCBhbHNvIG5lZWQgdG8gcGFzcyBpbiB0aGF0IHNhbWUgcGF0aCB3aGVuIGNyZWF0aW5nIGEgbmV3ICcgKyAnUGVlci4nO1xuICAgIH1cbiAgICBzZWxmLl9hYm9ydCgnc2VydmVyLWVycm9yJywgJ0NvdWxkIG5vdCBnZXQgYW4gSUQgZnJvbSB0aGUgc2VydmVyLicgKyBwYXRoRXJyb3IpO1xuICB9O1xuICBodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChodHRwLnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGh0dHAuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIGh0dHAub25lcnJvcigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZWxmLl9pbml0aWFsaXplKGh0dHAucmVzcG9uc2VUZXh0KTtcbiAgfTtcbiAgaHR0cC5zZW5kKG51bGwpO1xufTtcblBlZXIucHJvdG90eXBlLl9pbml0aWFsaXplID0gZnVuY3Rpb24oaWQpIHtcbiAgdGhpcy5pZCA9IGlkO1xuICB0aGlzLnNvY2tldC5zdGFydCh0aGlzLmlkLCB0aGlzLm9wdGlvbnMudG9rZW4pO1xufTtcblBlZXIucHJvdG90eXBlLl9oYW5kbGVNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICB2YXIgdHlwZSA9IG1lc3NhZ2UudHlwZTtcbiAgdmFyIHBheWxvYWQgPSBtZXNzYWdlLnBheWxvYWQ7XG4gIHZhciBwZWVyID0gbWVzc2FnZS5zcmM7XG4gIHZhciBjb25uZWN0aW9uO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdPUEVOJzpcbiAgICAgIHRoaXMuZW1pdCgnb3BlbicsIHRoaXMuaWQpO1xuICAgICAgdGhpcy5vcGVuID0gdHJ1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0VSUk9SJzpcbiAgICAgIHRoaXMuX2Fib3J0KCdzZXJ2ZXItZXJyb3InLCBwYXlsb2FkLm1zZyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdJRC1UQUtFTic6XG4gICAgICB0aGlzLl9hYm9ydCgndW5hdmFpbGFibGUtaWQnLCAnSUQgYCcgKyB0aGlzLmlkICsgJ2AgaXMgdGFrZW4nKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0lOVkFMSUQtS0VZJzpcbiAgICAgIHRoaXMuX2Fib3J0KCdpbnZhbGlkLWtleScsICdBUEkgS0VZIFwiJyArIHRoaXMub3B0aW9ucy5rZXkgKyAnXCIgaXMgaW52YWxpZCcpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTEVBVkUnOlxuICAgICAgdXRpbC5sb2coJ1JlY2VpdmVkIGxlYXZlIG1lc3NhZ2UgZnJvbScsIHBlZXIpO1xuICAgICAgdGhpcy5fY2xlYW51cFBlZXIocGVlcik7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdFWFBJUkUnOlxuICAgICAgdGhpcy5lbWl0RXJyb3IoJ3BlZXItdW5hdmFpbGFibGUnLCAnQ291bGQgbm90IGNvbm5lY3QgdG8gcGVlciAnICsgcGVlcik7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdPRkZFUic6XG4gICAgICB2YXIgY29ubmVjdGlvbklkID0gcGF5bG9hZC5jb25uZWN0aW9uSWQ7XG4gICAgICBjb25uZWN0aW9uID0gdGhpcy5nZXRDb25uZWN0aW9uKHBlZXIsIGNvbm5lY3Rpb25JZCk7XG4gICAgICBpZiAoY29ubmVjdGlvbikge1xuICAgICAgICB1dGlsLndhcm4oJ09mZmVyIHJlY2VpdmVkIGZvciBleGlzdGluZyBDb25uZWN0aW9uIElEOicsIGNvbm5lY3Rpb25JZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocGF5bG9hZC50eXBlID09PSAnbWVkaWEnKSB7XG4gICAgICAgICAgY29ubmVjdGlvbiA9IG5ldyBNZWRpYUNvbm5lY3Rpb24ocGVlciwgdGhpcywge1xuICAgICAgICAgICAgY29ubmVjdGlvbklkOiBjb25uZWN0aW9uSWQsXG4gICAgICAgICAgICBfcGF5bG9hZDogcGF5bG9hZCxcbiAgICAgICAgICAgIG1ldGFkYXRhOiBwYXlsb2FkLm1ldGFkYXRhXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fYWRkQ29ubmVjdGlvbihwZWVyLCBjb25uZWN0aW9uKTtcbiAgICAgICAgICB0aGlzLmVtaXQoJ2NhbGwnLCBjb25uZWN0aW9uKTtcbiAgICAgICAgfSBlbHNlIGlmIChwYXlsb2FkLnR5cGUgPT09ICdkYXRhJykge1xuICAgICAgICAgIGNvbm5lY3Rpb24gPSBuZXcgRGF0YUNvbm5lY3Rpb24ocGVlciwgdGhpcywge1xuICAgICAgICAgICAgY29ubmVjdGlvbklkOiBjb25uZWN0aW9uSWQsXG4gICAgICAgICAgICBfcGF5bG9hZDogcGF5bG9hZCxcbiAgICAgICAgICAgIG1ldGFkYXRhOiBwYXlsb2FkLm1ldGFkYXRhLFxuICAgICAgICAgICAgbGFiZWw6IHBheWxvYWQubGFiZWwsXG4gICAgICAgICAgICBzZXJpYWxpemF0aW9uOiBwYXlsb2FkLnNlcmlhbGl6YXRpb24sXG4gICAgICAgICAgICByZWxpYWJsZTogcGF5bG9hZC5yZWxpYWJsZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX2FkZENvbm5lY3Rpb24ocGVlciwgY29ubmVjdGlvbik7XG4gICAgICAgICAgdGhpcy5lbWl0KCdjb25uZWN0aW9uJywgY29ubmVjdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXRpbC53YXJuKCdSZWNlaXZlZCBtYWxmb3JtZWQgY29ubmVjdGlvbiB0eXBlOicsIHBheWxvYWQudHlwZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtZXNzYWdlcyA9IHRoaXMuX2dldE1lc3NhZ2VzKGNvbm5lY3Rpb25JZCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLFxuICAgICAgICAgICAgaWkgPSBtZXNzYWdlcy5sZW5ndGg7IGkgPCBpaTsgaSArPSAxKSB7XG4gICAgICAgICAgY29ubmVjdGlvbi5oYW5kbGVNZXNzYWdlKG1lc3NhZ2VzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmICghcGF5bG9hZCkge1xuICAgICAgICB1dGlsLndhcm4oJ1lvdSByZWNlaXZlZCBhIG1hbGZvcm1lZCBtZXNzYWdlIGZyb20gJyArIHBlZXIgKyAnIG9mIHR5cGUgJyArIHR5cGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgaWQgPSBwYXlsb2FkLmNvbm5lY3Rpb25JZDtcbiAgICAgIGNvbm5lY3Rpb24gPSB0aGlzLmdldENvbm5lY3Rpb24ocGVlciwgaWQpO1xuICAgICAgaWYgKGNvbm5lY3Rpb24gJiYgY29ubmVjdGlvbi5wYykge1xuICAgICAgICBjb25uZWN0aW9uLmhhbmRsZU1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICB9IGVsc2UgaWYgKGlkKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlTWVzc2FnZShpZCwgbWVzc2FnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1dGlsLndhcm4oJ1lvdSByZWNlaXZlZCBhbiB1bnJlY29nbml6ZWQgbWVzc2FnZTonLCBtZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG59O1xuUGVlci5wcm90b3R5cGUuX3N0b3JlTWVzc2FnZSA9IGZ1bmN0aW9uKGNvbm5lY3Rpb25JZCwgbWVzc2FnZSkge1xuICBpZiAoIXRoaXMuX2xvc3RNZXNzYWdlc1tjb25uZWN0aW9uSWRdKSB7XG4gICAgdGhpcy5fbG9zdE1lc3NhZ2VzW2Nvbm5lY3Rpb25JZF0gPSBbXTtcbiAgfVxuICB0aGlzLl9sb3N0TWVzc2FnZXNbY29ubmVjdGlvbklkXS5wdXNoKG1lc3NhZ2UpO1xufTtcblBlZXIucHJvdG90eXBlLl9nZXRNZXNzYWdlcyA9IGZ1bmN0aW9uKGNvbm5lY3Rpb25JZCkge1xuICB2YXIgbWVzc2FnZXMgPSB0aGlzLl9sb3N0TWVzc2FnZXNbY29ubmVjdGlvbklkXTtcbiAgaWYgKG1lc3NhZ2VzKSB7XG4gICAgZGVsZXRlIHRoaXMuX2xvc3RNZXNzYWdlc1tjb25uZWN0aW9uSWRdO1xuICAgIHJldHVybiBtZXNzYWdlcztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn07XG5QZWVyLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24ocGVlciwgb3B0aW9ucykge1xuICBpZiAodGhpcy5kaXNjb25uZWN0ZWQpIHtcbiAgICB1dGlsLndhcm4oJ1lvdSBjYW5ub3QgY29ubmVjdCB0byBhIG5ldyBQZWVyIGJlY2F1c2UgeW91IGNhbGxlZCAnICsgJy5kaXNjb25uZWN0KCkgb24gdGhpcyBQZWVyIGFuZCBlbmRlZCB5b3VyIGNvbm5lY3Rpb24gd2l0aCB0aGUgJyArICdzZXJ2ZXIuIFlvdSBjYW4gY3JlYXRlIGEgbmV3IFBlZXIgdG8gcmVjb25uZWN0LCBvciBjYWxsIHJlY29ubmVjdCAnICsgJ29uIHRoaXMgcGVlciBpZiB5b3UgYmVsaWV2ZSBpdHMgSUQgdG8gc3RpbGwgYmUgYXZhaWxhYmxlLicpO1xuICAgIHRoaXMuZW1pdEVycm9yKCdkaXNjb25uZWN0ZWQnLCAnQ2Fubm90IGNvbm5lY3QgdG8gbmV3IFBlZXIgYWZ0ZXIgZGlzY29ubmVjdGluZyBmcm9tIHNlcnZlci4nKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGNvbm5lY3Rpb24gPSBuZXcgRGF0YUNvbm5lY3Rpb24ocGVlciwgdGhpcywgb3B0aW9ucyk7XG4gIHRoaXMuX2FkZENvbm5lY3Rpb24ocGVlciwgY29ubmVjdGlvbik7XG4gIHJldHVybiBjb25uZWN0aW9uO1xufTtcblBlZXIucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbihwZWVyLCBzdHJlYW0sIG9wdGlvbnMpIHtcbiAgaWYgKHRoaXMuZGlzY29ubmVjdGVkKSB7XG4gICAgdXRpbC53YXJuKCdZb3UgY2Fubm90IGNvbm5lY3QgdG8gYSBuZXcgUGVlciBiZWNhdXNlIHlvdSBjYWxsZWQgJyArICcuZGlzY29ubmVjdCgpIG9uIHRoaXMgUGVlciBhbmQgZW5kZWQgeW91ciBjb25uZWN0aW9uIHdpdGggdGhlICcgKyAnc2VydmVyLiBZb3UgY2FuIGNyZWF0ZSBhIG5ldyBQZWVyIHRvIHJlY29ubmVjdC4nKTtcbiAgICB0aGlzLmVtaXRFcnJvcignZGlzY29ubmVjdGVkJywgJ0Nhbm5vdCBjb25uZWN0IHRvIG5ldyBQZWVyIGFmdGVyIGRpc2Nvbm5lY3RpbmcgZnJvbSBzZXJ2ZXIuJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghc3RyZWFtKSB7XG4gICAgdXRpbC5lcnJvcignVG8gY2FsbCBhIHBlZXIsIHlvdSBtdXN0IHByb3ZpZGUgYSBzdHJlYW0gZnJvbSB5b3VyIGJyb3dzZXJcXCdzIGBnZXRVc2VyTWVkaWFgLicpO1xuICAgIHJldHVybjtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5fc3RyZWFtID0gc3RyZWFtO1xuICB2YXIgY2FsbCA9IG5ldyBNZWRpYUNvbm5lY3Rpb24ocGVlciwgdGhpcywgb3B0aW9ucyk7XG4gIHRoaXMuX2FkZENvbm5lY3Rpb24ocGVlciwgY2FsbCk7XG4gIHJldHVybiBjYWxsO1xufTtcblBlZXIucHJvdG90eXBlLl9hZGRDb25uZWN0aW9uID0gZnVuY3Rpb24ocGVlciwgY29ubmVjdGlvbikge1xuICBpZiAoIXRoaXMuY29ubmVjdGlvbnNbcGVlcl0pIHtcbiAgICB0aGlzLmNvbm5lY3Rpb25zW3BlZXJdID0gW107XG4gIH1cbiAgdGhpcy5jb25uZWN0aW9uc1twZWVyXS5wdXNoKGNvbm5lY3Rpb24pO1xufTtcblBlZXIucHJvdG90eXBlLmdldENvbm5lY3Rpb24gPSBmdW5jdGlvbihwZWVyLCBpZCkge1xuICB2YXIgY29ubmVjdGlvbnMgPSB0aGlzLmNvbm5lY3Rpb25zW3BlZXJdO1xuICBpZiAoIWNvbm5lY3Rpb25zKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDAsXG4gICAgICBpaSA9IGNvbm5lY3Rpb25zLmxlbmd0aDsgaSA8IGlpOyBpKyspIHtcbiAgICBpZiAoY29ubmVjdGlvbnNbaV0uaWQgPT09IGlkKSB7XG4gICAgICByZXR1cm4gY29ubmVjdGlvbnNbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblBlZXIucHJvdG90eXBlLl9kZWxheWVkQWJvcnQgPSBmdW5jdGlvbih0eXBlLCBtZXNzYWdlKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdXRpbC5zZXRaZXJvVGltZW91dChmdW5jdGlvbigpIHtcbiAgICBzZWxmLl9hYm9ydCh0eXBlLCBtZXNzYWdlKTtcbiAgfSk7XG59O1xuUGVlci5wcm90b3R5cGUuX2Fib3J0ID0gZnVuY3Rpb24odHlwZSwgbWVzc2FnZSkge1xuICB1dGlsLmVycm9yKCdBYm9ydGluZyEnKTtcbiAgaWYgKCF0aGlzLl9sYXN0U2VydmVySWQpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgfVxuICB0aGlzLmVtaXRFcnJvcih0eXBlLCBtZXNzYWdlKTtcbn07XG5QZWVyLnByb3RvdHlwZS5lbWl0RXJyb3IgPSBmdW5jdGlvbih0eXBlLCBlcnIpIHtcbiAgdXRpbC5lcnJvcignRXJyb3I6JywgZXJyKTtcbiAgaWYgKHR5cGVvZiBlcnIgPT09ICdzdHJpbmcnKSB7XG4gICAgZXJyID0gbmV3IEVycm9yKGVycik7XG4gIH1cbiAgZXJyLnR5cGUgPSB0eXBlO1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbn07XG5QZWVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5kZXN0cm95ZWQpIHtcbiAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICB9XG59O1xuUGVlci5wcm90b3R5cGUuX2NsZWFudXAgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuY29ubmVjdGlvbnMpIHtcbiAgICB2YXIgcGVlcnMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbm5lY3Rpb25zKTtcbiAgICBmb3IgKHZhciBpID0gMCxcbiAgICAgICAgaWkgPSBwZWVycy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XG4gICAgICB0aGlzLl9jbGVhbnVwUGVlcihwZWVyc1tpXSk7XG4gICAgfVxuICB9XG4gIHRoaXMuZW1pdCgnY2xvc2UnKTtcbn07XG5QZWVyLnByb3RvdHlwZS5fY2xlYW51cFBlZXIgPSBmdW5jdGlvbihwZWVyKSB7XG4gIHZhciBjb25uZWN0aW9ucyA9IHRoaXMuY29ubmVjdGlvbnNbcGVlcl07XG4gIGZvciAodmFyIGogPSAwLFxuICAgICAgamogPSBjb25uZWN0aW9ucy5sZW5ndGg7IGogPCBqajsgaiArPSAxKSB7XG4gICAgY29ubmVjdGlvbnNbal0uY2xvc2UoKTtcbiAgfVxufTtcblBlZXIucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB1dGlsLnNldFplcm9UaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGlmICghc2VsZi5kaXNjb25uZWN0ZWQpIHtcbiAgICAgIHNlbGYuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgIHNlbGYub3BlbiA9IGZhbHNlO1xuICAgICAgaWYgKHNlbGYuc29ja2V0KSB7XG4gICAgICAgIHNlbGYuc29ja2V0LmNsb3NlKCk7XG4gICAgICB9XG4gICAgICBzZWxmLmVtaXQoJ2Rpc2Nvbm5lY3RlZCcsIHNlbGYuaWQpO1xuICAgICAgc2VsZi5fbGFzdFNlcnZlcklkID0gc2VsZi5pZDtcbiAgICAgIHNlbGYuaWQgPSBudWxsO1xuICAgIH1cbiAgfSk7XG59O1xuUGVlci5wcm90b3R5cGUucmVjb25uZWN0ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmRpc2Nvbm5lY3RlZCAmJiAhdGhpcy5kZXN0cm95ZWQpIHtcbiAgICB1dGlsLmxvZygnQXR0ZW1wdGluZyByZWNvbm5lY3Rpb24gdG8gc2VydmVyIHdpdGggSUQgJyArIHRoaXMuX2xhc3RTZXJ2ZXJJZCk7XG4gICAgdGhpcy5kaXNjb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9pbml0aWFsaXplU2VydmVyQ29ubmVjdGlvbigpO1xuICAgIHRoaXMuX2luaXRpYWxpemUodGhpcy5fbGFzdFNlcnZlcklkKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlc3Ryb3llZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBwZWVyIGNhbm5vdCByZWNvbm5lY3QgdG8gdGhlIHNlcnZlci4gSXQgaGFzIGFscmVhZHkgYmVlbiBkZXN0cm95ZWQuJyk7XG4gIH0gZWxzZSBpZiAoIXRoaXMuZGlzY29ubmVjdGVkICYmICF0aGlzLm9wZW4pIHtcbiAgICB1dGlsLmVycm9yKCdJbiBhIGh1cnJ5PyBXZVxcJ3JlIHN0aWxsIHRyeWluZyB0byBtYWtlIHRoZSBpbml0aWFsIGNvbm5lY3Rpb24hJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQZWVyICcgKyB0aGlzLmlkICsgJyBjYW5ub3QgcmVjb25uZWN0IGJlY2F1c2UgaXQgaXMgbm90IGRpc2Nvbm5lY3RlZCBmcm9tIHRoZSBzZXJ2ZXIhJyk7XG4gIH1cbn07XG5QZWVyLnByb3RvdHlwZS5saXN0QWxsUGVlcnMgPSBmdW5jdGlvbihjYikge1xuICBjYiA9IGNiIHx8IGZ1bmN0aW9uKCkge307XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgdmFyIHByb3RvY29sID0gdGhpcy5vcHRpb25zLnNlY3VyZSA/ICdodHRwczovLycgOiAnaHR0cDovLyc7XG4gIHZhciB1cmwgPSBwcm90b2NvbCArIHRoaXMub3B0aW9ucy5ob3N0ICsgJzonICsgdGhpcy5vcHRpb25zLnBvcnQgKyB0aGlzLm9wdGlvbnMucGF0aCArIHRoaXMub3B0aW9ucy5rZXkgKyAnL3BlZXJzJztcbiAgdmFyIHF1ZXJ5U3RyaW5nID0gJz90cz0nICsgbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAnJyArIE1hdGgucmFuZG9tKCk7XG4gIHVybCArPSBxdWVyeVN0cmluZztcbiAgaHR0cC5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuICBodHRwLm9uZXJyb3IgPSBmdW5jdGlvbihlKSB7XG4gICAgc2VsZi5fYWJvcnQoJ3NlcnZlci1lcnJvcicsICdDb3VsZCBub3QgZ2V0IHBlZXJzIGZyb20gdGhlIHNlcnZlci4nKTtcbiAgICBjYihbXSk7XG4gIH07XG4gIGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKGh0dHAucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaHR0cC5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgdmFyIGhlbHBmdWxFcnJvciA9ICcnO1xuICAgICAgaWYgKHNlbGYub3B0aW9ucy5ob3N0ICE9PSB1dGlsLkNMT1VEX0hPU1QpIHtcbiAgICAgICAgaGVscGZ1bEVycm9yID0gJ0l0IGxvb2tzIGxpa2UgeW91XFwncmUgdXNpbmcgdGhlIGNsb3VkIHNlcnZlci4gWW91IGNhbiBlbWFpbCAnICsgJ3RlYW1AcGVlcmpzLmNvbSB0byBlbmFibGUgcGVlciBsaXN0aW5nIGZvciB5b3VyIEFQSSBrZXkuJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhlbHBmdWxFcnJvciA9ICdZb3UgbmVlZCB0byBlbmFibGUgYGFsbG93X2Rpc2NvdmVyeWAgb24geW91ciBzZWxmLWhvc3RlZCAnICsgJ1BlZXJTZXJ2ZXIgdG8gdXNlIHRoaXMgZmVhdHVyZS4nO1xuICAgICAgfVxuICAgICAgY2IoW10pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJdCBkb2VzblxcJ3QgbG9vayBsaWtlIHlvdSBoYXZlIHBlcm1pc3Npb24gdG8gbGlzdCBwZWVycyBJRHMuICcgKyBoZWxwZnVsRXJyb3IpO1xuICAgIH0gZWxzZSBpZiAoaHR0cC5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgY2IoW10pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYihKU09OLnBhcnNlKGh0dHAucmVzcG9uc2VUZXh0KSk7XG4gICAgfVxuICB9O1xuICBodHRwLnNlbmQobnVsbCk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBQZWVyO1xuXG5cbn0se1wiLi9kYXRhY29ubmVjdGlvblwiOjcsXCIuL21lZGlhY29ubmVjdGlvblwiOjgsXCIuL3NvY2tldFwiOjExLFwiLi91dGlsXCI6MTIsXCJldmVudGVtaXR0ZXIzXCI6MTN9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpO1xuZnVuY3Rpb24gU29ja2V0KHNlY3VyZSwgaG9zdCwgcG9ydCwgcGF0aCwga2V5KSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTb2NrZXQpKVxuICAgIHJldHVybiBuZXcgU29ja2V0KHNlY3VyZSwgaG9zdCwgcG9ydCwgcGF0aCwga2V5KTtcbiAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG4gIHRoaXMuZGlzY29ubmVjdGVkID0gZmFsc2U7XG4gIHRoaXMuX3F1ZXVlID0gW107XG4gIHZhciBodHRwUHJvdG9jb2wgPSBzZWN1cmUgPyAnaHR0cHM6Ly8nIDogJ2h0dHA6Ly8nO1xuICB2YXIgd3NQcm90b2NvbCA9IHNlY3VyZSA/ICd3c3M6Ly8nIDogJ3dzOi8vJztcbiAgdGhpcy5faHR0cFVybCA9IGh0dHBQcm90b2NvbCArIGhvc3QgKyAnOicgKyBwb3J0ICsgcGF0aCArIGtleTtcbiAgdGhpcy5fd3NVcmwgPSB3c1Byb3RvY29sICsgaG9zdCArICc6JyArIHBvcnQgKyBwYXRoICsgJ3BlZXJqcz9rZXk9JyArIGtleTtcbn1cbnV0aWwuaW5oZXJpdHMoU29ja2V0LCBFdmVudEVtaXR0ZXIpO1xuU29ja2V0LnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKGlkLCB0b2tlbikge1xuICB0aGlzLmlkID0gaWQ7XG4gIHRoaXMuX2h0dHBVcmwgKz0gJy8nICsgaWQgKyAnLycgKyB0b2tlbjtcbiAgdGhpcy5fd3NVcmwgKz0gJyZpZD0nICsgaWQgKyAnJnRva2VuPScgKyB0b2tlbjtcbiAgdGhpcy5fc3RhcnRYaHJTdHJlYW0oKTtcbiAgdGhpcy5fc3RhcnRXZWJTb2NrZXQoKTtcbn07XG5Tb2NrZXQucHJvdG90eXBlLl9zdGFydFdlYlNvY2tldCA9IGZ1bmN0aW9uKGlkKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKHRoaXMuX3NvY2tldCkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLl9zb2NrZXQgPSBuZXcgV2ViU29ja2V0KHRoaXMuX3dzVXJsKTtcbiAgdGhpcy5fc29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB1dGlsLmxvZygnSW52YWxpZCBzZXJ2ZXIgbWVzc2FnZScsIGV2ZW50LmRhdGEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZWxmLmVtaXQoJ21lc3NhZ2UnLCBkYXRhKTtcbiAgfTtcbiAgdGhpcy5fc29ja2V0Lm9uY2xvc2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHV0aWwubG9nKCdTb2NrZXQgY2xvc2VkLicpO1xuICAgIHNlbGYuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgICBzZWxmLmVtaXQoJ2Rpc2Nvbm5lY3RlZCcpO1xuICB9O1xuICB0aGlzLl9zb2NrZXQub25vcGVuID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHNlbGYuX3RpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dChzZWxmLl90aW1lb3V0KTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuX2h0dHAuYWJvcnQoKTtcbiAgICAgICAgc2VsZi5faHR0cCA9IG51bGw7XG4gICAgICB9LCA1MDAwKTtcbiAgICB9XG4gICAgc2VsZi5fc2VuZFF1ZXVlZE1lc3NhZ2VzKCk7XG4gICAgdXRpbC5sb2coJ1NvY2tldCBvcGVuJyk7XG4gIH07XG59O1xuU29ja2V0LnByb3RvdHlwZS5fc3RhcnRYaHJTdHJlYW0gPSBmdW5jdGlvbihuKSB7XG4gIHRyeSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX2h0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB0aGlzLl9odHRwLl9pbmRleCA9IDE7XG4gICAgdGhpcy5faHR0cC5fc3RyZWFtSW5kZXggPSBuIHx8IDA7XG4gICAgdGhpcy5faHR0cC5vcGVuKCdwb3N0JywgdGhpcy5faHR0cFVybCArICcvaWQ/aT0nICsgdGhpcy5faHR0cC5fc3RyZWFtSW5kZXgsIHRydWUpO1xuICAgIHRoaXMuX2h0dHAub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3RpbWVvdXQpO1xuICAgICAgc2VsZi5lbWl0KCdkaXNjb25uZWN0ZWQnKTtcbiAgICB9O1xuICAgIHRoaXMuX2h0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDIgJiYgdGhpcy5vbGQpIHtcbiAgICAgICAgdGhpcy5vbGQuYWJvcnQoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMub2xkO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnJlYWR5U3RhdGUgPiAyICYmIHRoaXMuc3RhdHVzID09PSAyMDAgJiYgdGhpcy5yZXNwb25zZVRleHQpIHtcbiAgICAgICAgc2VsZi5faGFuZGxlU3RyZWFtKHRoaXMpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5faHR0cC5zZW5kKG51bGwpO1xuICAgIHRoaXMuX3NldEhUVFBUaW1lb3V0KCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB1dGlsLmxvZygnWE1MSHR0cFJlcXVlc3Qgbm90IGF2YWlsYWJsZTsgZGVmYXVsdGluZyB0byBXZWJTb2NrZXRzJyk7XG4gIH1cbn07XG5Tb2NrZXQucHJvdG90eXBlLl9oYW5kbGVTdHJlYW0gPSBmdW5jdGlvbihodHRwKSB7XG4gIHZhciBtZXNzYWdlcyA9IGh0dHAucmVzcG9uc2VUZXh0LnNwbGl0KCdcXG4nKTtcbiAgaWYgKGh0dHAuX2J1ZmZlcikge1xuICAgIHdoaWxlIChodHRwLl9idWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIGluZGV4ID0gaHR0cC5fYnVmZmVyLnNoaWZ0KCk7XG4gICAgICB2YXIgYnVmZmVyZWRNZXNzYWdlID0gbWVzc2FnZXNbaW5kZXhdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYnVmZmVyZWRNZXNzYWdlID0gSlNPTi5wYXJzZShidWZmZXJlZE1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBodHRwLl9idWZmZXIuc2hpZnQoaW5kZXgpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIGJ1ZmZlcmVkTWVzc2FnZSk7XG4gICAgfVxuICB9XG4gIHZhciBtZXNzYWdlID0gbWVzc2FnZXNbaHR0cC5faW5kZXhdO1xuICBpZiAobWVzc2FnZSkge1xuICAgIGh0dHAuX2luZGV4ICs9IDE7XG4gICAgaWYgKGh0dHAuX2luZGV4ID09PSBtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIGlmICghaHR0cC5fYnVmZmVyKSB7XG4gICAgICAgIGh0dHAuX2J1ZmZlciA9IFtdO1xuICAgICAgfVxuICAgICAgaHR0cC5fYnVmZmVyLnB1c2goaHR0cC5faW5kZXggLSAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbWVzc2FnZSA9IEpTT04ucGFyc2UobWVzc2FnZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHV0aWwubG9nKCdJbnZhbGlkIHNlcnZlciBtZXNzYWdlJywgbWVzc2FnZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufTtcblNvY2tldC5wcm90b3R5cGUuX3NldEhUVFBUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5fdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9sZCA9IHNlbGYuX2h0dHA7XG4gICAgaWYgKCFzZWxmLl93c09wZW4oKSkge1xuICAgICAgc2VsZi5fc3RhcnRYaHJTdHJlYW0ob2xkLl9zdHJlYW1JbmRleCArIDEpO1xuICAgICAgc2VsZi5faHR0cC5vbGQgPSBvbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9sZC5hYm9ydCgpO1xuICAgIH1cbiAgfSwgMjUwMDApO1xufTtcblNvY2tldC5wcm90b3R5cGUuX3dzT3BlbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fc29ja2V0ICYmIHRoaXMuX3NvY2tldC5yZWFkeVN0YXRlID09IDE7XG59O1xuU29ja2V0LnByb3RvdHlwZS5fc2VuZFF1ZXVlZE1lc3NhZ2VzID0gZnVuY3Rpb24oKSB7XG4gIGZvciAodmFyIGkgPSAwLFxuICAgICAgaWkgPSB0aGlzLl9xdWV1ZS5sZW5ndGg7IGkgPCBpaTsgaSArPSAxKSB7XG4gICAgdGhpcy5zZW5kKHRoaXMuX3F1ZXVlW2ldKTtcbiAgfVxufTtcblNvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgaWYgKHRoaXMuZGlzY29ubmVjdGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghdGhpcy5pZCkge1xuICAgIHRoaXMuX3F1ZXVlLnB1c2goZGF0YSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghZGF0YS50eXBlKSB7XG4gICAgdGhpcy5lbWl0KCdlcnJvcicsICdJbnZhbGlkIG1lc3NhZ2UnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgaWYgKHRoaXMuX3dzT3BlbigpKSB7XG4gICAgdGhpcy5fc29ja2V0LnNlbmQobWVzc2FnZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIgdXJsID0gdGhpcy5faHR0cFVybCArICcvJyArIGRhdGEudHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgIGh0dHAub3BlbigncG9zdCcsIHVybCwgdHJ1ZSk7XG4gICAgaHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIGh0dHAuc2VuZChtZXNzYWdlKTtcbiAgfVxufTtcblNvY2tldC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLmRpc2Nvbm5lY3RlZCAmJiB0aGlzLl93c09wZW4oKSkge1xuICAgIHRoaXMuX3NvY2tldC5jbG9zZSgpO1xuICAgIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gU29ja2V0O1xuXG5cbn0se1wiLi91dGlsXCI6MTIsXCJldmVudGVtaXR0ZXIzXCI6MTN9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcbnZhciBkZWZhdWx0Q29uZmlnID0geydpY2VTZXJ2ZXJzJzogW3sndXJsJzogJ3N0dW46c3R1bi5sLmdvb2dsZS5jb206MTkzMDInfV19O1xudmFyIGRhdGFDb3VudCA9IDE7XG52YXIgQmluYXJ5UGFjayA9IHJlcXVpcmUoJ2pzLWJpbmFyeXBhY2snKTtcbnZhciBSVENQZWVyQ29ubmVjdGlvbiA9IHJlcXVpcmUoJy4vYWRhcHRlcicpLlJUQ1BlZXJDb25uZWN0aW9uO1xudmFyIHV0aWwgPSB7XG4gIG5vb3A6IGZ1bmN0aW9uKCkge30sXG4gIENMT1VEX0hPU1Q6ICcwLnBlZXJqcy5jb20nLFxuICBDTE9VRF9QT1JUOiA5MDAwLFxuICBjaHVua2VkQnJvd3NlcnM6IHsnQ2hyb21lJzogMX0sXG4gIGNodW5rZWRNVFU6IDE2MzAwLFxuICBsb2dMZXZlbDogMCxcbiAgc2V0TG9nTGV2ZWw6IGZ1bmN0aW9uKGxldmVsKSB7XG4gICAgdmFyIGRlYnVnTGV2ZWwgPSBwYXJzZUludChsZXZlbCwgMTApO1xuICAgIGlmICghaXNOYU4ocGFyc2VJbnQobGV2ZWwsIDEwKSkpIHtcbiAgICAgIHV0aWwubG9nTGV2ZWwgPSBkZWJ1Z0xldmVsO1xuICAgIH0gZWxzZSB7XG4gICAgICB1dGlsLmxvZ0xldmVsID0gbGV2ZWwgPyAzIDogMDtcbiAgICB9XG4gICAgdXRpbC5sb2cgPSB1dGlsLndhcm4gPSB1dGlsLmVycm9yID0gdXRpbC5ub29wO1xuICAgIGlmICh1dGlsLmxvZ0xldmVsID4gMCkge1xuICAgICAgdXRpbC5lcnJvciA9IHV0aWwuX3ByaW50V2l0aCgnRVJST1InKTtcbiAgICB9XG4gICAgaWYgKHV0aWwubG9nTGV2ZWwgPiAxKSB7XG4gICAgICB1dGlsLndhcm4gPSB1dGlsLl9wcmludFdpdGgoJ1dBUk5JTkcnKTtcbiAgICB9XG4gICAgaWYgKHV0aWwubG9nTGV2ZWwgPiAyKSB7XG4gICAgICB1dGlsLmxvZyA9IHV0aWwuX3ByaW50O1xuICAgIH1cbiAgfSxcbiAgc2V0TG9nRnVuY3Rpb246IGZ1bmN0aW9uKGZuKSB7XG4gICAgaWYgKGZuLmNvbnN0cnVjdG9yICE9PSBGdW5jdGlvbikge1xuICAgICAgdXRpbC53YXJuKCdUaGUgbG9nIGZ1bmN0aW9uIHlvdSBwYXNzZWQgaW4gaXMgbm90IGEgZnVuY3Rpb24uIERlZmF1bHRpbmcgdG8gcmVndWxhciBsb2dzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1dGlsLl9wcmludCA9IGZuO1xuICAgIH1cbiAgfSxcbiAgX3ByaW50V2l0aDogZnVuY3Rpb24ocHJlZml4KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNvcHkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgY29weS51bnNoaWZ0KHByZWZpeCk7XG4gICAgICB1dGlsLl9wcmludC5hcHBseSh1dGlsLCBjb3B5KTtcbiAgICB9O1xuICB9LFxuICBfcHJpbnQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlcnIgPSBmYWxzZTtcbiAgICB2YXIgY29weSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgY29weS51bnNoaWZ0KCdQZWVySlM6ICcpO1xuICAgIGZvciAodmFyIGkgPSAwLFxuICAgICAgICBsID0gY29weS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChjb3B5W2ldIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgY29weVtpXSA9ICcoJyArIGNvcHlbaV0ubmFtZSArICcpICcgKyBjb3B5W2ldLm1lc3NhZ2U7XG4gICAgICAgIGVyciA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGVyciA/IGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgY29weSkgOiBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBjb3B5KTtcbiAgfSxcbiAgZGVmYXVsdENvbmZpZzogZGVmYXVsdENvbmZpZyxcbiAgYnJvd3NlcjogKGZ1bmN0aW9uKCkge1xuICAgIGlmICh3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybiAnRmlyZWZveCc7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybiAnQ2hyb21lJztcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgcmV0dXJuICdTdXBwb3J0ZWQnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1Vuc3VwcG9ydGVkJztcbiAgICB9XG4gIH0pKCksXG4gIHN1cHBvcnRzOiAoZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZiBSVENQZWVyQ29ubmVjdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgdmFyIGRhdGEgPSB0cnVlO1xuICAgIHZhciBhdWRpb1ZpZGVvID0gdHJ1ZTtcbiAgICB2YXIgYmluYXJ5QmxvYiA9IGZhbHNlO1xuICAgIHZhciBzY3RwID0gZmFsc2U7XG4gICAgdmFyIG9ubmVnb3RpYXRpb25uZWVkZWQgPSAhIXdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbjtcbiAgICB2YXIgcGMsXG4gICAgICAgIGRjO1xuICAgIHRyeSB7XG4gICAgICBwYyA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihkZWZhdWx0Q29uZmlnLCB7b3B0aW9uYWw6IFt7UnRwRGF0YUNoYW5uZWxzOiB0cnVlfV19KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBkYXRhID0gZmFsc2U7XG4gICAgICBhdWRpb1ZpZGVvID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChkYXRhKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYyA9IHBjLmNyZWF0ZURhdGFDaGFubmVsKCdfUEVFUkpTVEVTVCcpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBkYXRhID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkYXRhKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYy5iaW5hcnlUeXBlID0gJ2Jsb2InO1xuICAgICAgICBiaW5hcnlCbG9iID0gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB2YXIgcmVsaWFibGVQQyA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihkZWZhdWx0Q29uZmlnLCB7fSk7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVsaWFibGVEQyA9IHJlbGlhYmxlUEMuY3JlYXRlRGF0YUNoYW5uZWwoJ19QRUVSSlNSRUxJQUJMRVRFU1QnLCB7fSk7XG4gICAgICAgIHNjdHAgPSByZWxpYWJsZURDLnJlbGlhYmxlO1xuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIHJlbGlhYmxlUEMuY2xvc2UoKTtcbiAgICB9XG4gICAgaWYgKGF1ZGlvVmlkZW8pIHtcbiAgICAgIGF1ZGlvVmlkZW8gPSAhIXBjLmFkZFN0cmVhbTtcbiAgICB9XG4gICAgaWYgKCFvbm5lZ290aWF0aW9ubmVlZGVkICYmIGRhdGEpIHtcbiAgICAgIHZhciBuZWdvdGlhdGlvblBDID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKGRlZmF1bHRDb25maWcsIHtvcHRpb25hbDogW3tSdHBEYXRhQ2hhbm5lbHM6IHRydWV9XX0pO1xuICAgICAgbmVnb3RpYXRpb25QQy5vbm5lZ290aWF0aW9ubmVlZGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIG9ubmVnb3RpYXRpb25uZWVkZWQgPSB0cnVlO1xuICAgICAgICBpZiAodXRpbCAmJiB1dGlsLnN1cHBvcnRzKSB7XG4gICAgICAgICAgdXRpbC5zdXBwb3J0cy5vbm5lZ290aWF0aW9ubmVlZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIG5lZ290aWF0aW9uUEMuY3JlYXRlRGF0YUNoYW5uZWwoJ19QRUVSSlNORUdPVElBVElPTlRFU1QnKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIG5lZ290aWF0aW9uUEMuY2xvc2UoKTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgICBpZiAocGMpIHtcbiAgICAgIHBjLmNsb3NlKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBhdWRpb1ZpZGVvOiBhdWRpb1ZpZGVvLFxuICAgICAgZGF0YTogZGF0YSxcbiAgICAgIGJpbmFyeUJsb2I6IGJpbmFyeUJsb2IsXG4gICAgICBiaW5hcnk6IHNjdHAsXG4gICAgICByZWxpYWJsZTogc2N0cCxcbiAgICAgIHNjdHA6IHNjdHAsXG4gICAgICBvbm5lZ290aWF0aW9ubmVlZGVkOiBvbm5lZ290aWF0aW9ubmVlZGVkXG4gICAgfTtcbiAgfSgpKSxcbiAgdmFsaWRhdGVJZDogZnVuY3Rpb24oaWQpIHtcbiAgICByZXR1cm4gIWlkIHx8IC9eW0EtWmEtejAtOV0rKD86WyBfLV1bQS1aYS16MC05XSspKiQvLmV4ZWMoaWQpO1xuICB9LFxuICB2YWxpZGF0ZUtleTogZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuICFrZXkgfHwgL15bQS1aYS16MC05XSsoPzpbIF8tXVtBLVphLXowLTldKykqJC8uZXhlYyhrZXkpO1xuICB9LFxuICBkZWJ1ZzogZmFsc2UsXG4gIGluaGVyaXRzOiBmdW5jdGlvbihjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvcjtcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge2NvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfX0pO1xuICB9LFxuICBleHRlbmQ6IGZ1bmN0aW9uKGRlc3QsIHNvdXJjZSkge1xuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBkZXN0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRlc3Q7XG4gIH0sXG4gIHBhY2s6IEJpbmFyeVBhY2sucGFjayxcbiAgdW5wYWNrOiBCaW5hcnlQYWNrLnVucGFjayxcbiAgbG9nOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodXRpbC5kZWJ1Zykge1xuICAgICAgdmFyIGVyciA9IGZhbHNlO1xuICAgICAgdmFyIGNvcHkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgY29weS51bnNoaWZ0KCdQZWVySlM6ICcpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsXG4gICAgICAgICAgbCA9IGNvcHkubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmIChjb3B5W2ldIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICBjb3B5W2ldID0gJygnICsgY29weVtpXS5uYW1lICsgJykgJyArIGNvcHlbaV0ubWVzc2FnZTtcbiAgICAgICAgICBlcnIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlcnIgPyBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGNvcHkpIDogY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgY29weSk7XG4gICAgfVxuICB9LFxuICBzZXRaZXJvVGltZW91dDogKGZ1bmN0aW9uKGdsb2JhbCkge1xuICAgIHZhciB0aW1lb3V0cyA9IFtdO1xuICAgIHZhciBtZXNzYWdlTmFtZSA9ICd6ZXJvLXRpbWVvdXQtbWVzc2FnZSc7XG4gICAgZnVuY3Rpb24gc2V0WmVyb1RpbWVvdXRQb3N0TWVzc2FnZShmbikge1xuICAgICAgdGltZW91dHMucHVzaChmbik7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZU5hbWUsICcqJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2UoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5zb3VyY2UgPT0gZ2xvYmFsICYmIGV2ZW50LmRhdGEgPT0gbWVzc2FnZU5hbWUpIHtcbiAgICAgICAgaWYgKGV2ZW50LnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aW1lb3V0cy5sZW5ndGgpIHtcbiAgICAgICAgICB0aW1lb3V0cy5zaGlmdCgpKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZU1lc3NhZ2UsIHRydWUpO1xuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLmF0dGFjaEV2ZW50KSB7XG4gICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoJ29ubWVzc2FnZScsIGhhbmRsZU1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gc2V0WmVyb1RpbWVvdXRQb3N0TWVzc2FnZTtcbiAgfSh3aW5kb3cpKSxcbiAgY2h1bms6IGZ1bmN0aW9uKGJsKSB7XG4gICAgdmFyIGNodW5rcyA9IFtdO1xuICAgIHZhciBzaXplID0gYmwuc2l6ZTtcbiAgICB2YXIgc3RhcnQgPSBpbmRleCA9IDA7XG4gICAgdmFyIHRvdGFsID0gTWF0aC5jZWlsKHNpemUgLyB1dGlsLmNodW5rZWRNVFUpO1xuICAgIHdoaWxlIChzdGFydCA8IHNpemUpIHtcbiAgICAgIHZhciBlbmQgPSBNYXRoLm1pbihzaXplLCBzdGFydCArIHV0aWwuY2h1bmtlZE1UVSk7XG4gICAgICB2YXIgYiA9IGJsLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgICAgdmFyIGNodW5rID0ge1xuICAgICAgICBfX3BlZXJEYXRhOiBkYXRhQ291bnQsXG4gICAgICAgIG46IGluZGV4LFxuICAgICAgICBkYXRhOiBiLFxuICAgICAgICB0b3RhbDogdG90YWxcbiAgICAgIH07XG4gICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICBzdGFydCA9IGVuZDtcbiAgICAgIGluZGV4ICs9IDE7XG4gICAgfVxuICAgIGRhdGFDb3VudCArPSAxO1xuICAgIHJldHVybiBjaHVua3M7XG4gIH0sXG4gIGJsb2JUb0FycmF5QnVmZmVyOiBmdW5jdGlvbihibG9iLCBjYikge1xuICAgIHZhciBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgZnIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBjYihldnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgfTtcbiAgICBmci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKTtcbiAgfSxcbiAgYmxvYlRvQmluYXJ5U3RyaW5nOiBmdW5jdGlvbihibG9iLCBjYikge1xuICAgIHZhciBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgZnIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBjYihldnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgfTtcbiAgICBmci5yZWFkQXNCaW5hcnlTdHJpbmcoYmxvYik7XG4gIH0sXG4gIGJpbmFyeVN0cmluZ1RvQXJyYXlCdWZmZXI6IGZ1bmN0aW9uKGJpbmFyeSkge1xuICAgIHZhciBieXRlQXJyYXkgPSBuZXcgVWludDhBcnJheShiaW5hcnkubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJpbmFyeS5sZW5ndGg7IGkrKykge1xuICAgICAgYnl0ZUFycmF5W2ldID0gYmluYXJ5LmNoYXJDb2RlQXQoaSkgJiAweGZmO1xuICAgIH1cbiAgICByZXR1cm4gYnl0ZUFycmF5LmJ1ZmZlcjtcbiAgfSxcbiAgcmFuZG9tVG9rZW46IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMik7XG4gIH0sXG4gIGlzU2VjdXJlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonO1xuICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSB1dGlsO1xuXG5cbn0se1wiLi9hZGFwdGVyXCI6NixcImpzLWJpbmFyeXBhY2tcIjoxNH1dLDEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBFdmVudEVtaXR0ZXIgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRXZlbnQgaGFuZGxlciB0byBiZSBjYWxsZWQuXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IENvbnRleHQgZm9yIGZ1bmN0aW9uIGV4ZWN1dGlvbi5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IGVtaXQgb25jZVxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEVFKGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHRoaXMuZm4gPSBmbjtcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5vbmNlID0gb25jZSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIEV2ZW50RW1pdHRlciBpbnRlcmZhY2UgdGhhdCBpcyBtb2xkZWQgYWdhaW5zdCB0aGUgTm9kZS5qc1xuICogRXZlbnRFbWl0dGVyIGludGVyZmFjZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHsgLyogTm90aGluZyB0byBzZXQgKi8gfVxuXG4vKipcbiAqIEhvbGRzIHRoZSBhc3NpZ25lZCBFdmVudEVtaXR0ZXJzIGJ5IG5hbWUuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBSZXR1cm4gYSBsaXN0IG9mIGFzc2lnbmVkIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIGV2ZW50cyB0aGF0IHNob3VsZCBiZSBsaXN0ZWQuXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyhldmVudCkge1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW2V2ZW50XSkgcmV0dXJuIFtdO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5fZXZlbnRzW2V2ZW50XS5sZW5ndGgsIGVlID0gW107IGkgPCBsOyBpKyspIHtcbiAgICBlZS5wdXNoKHRoaXMuX2V2ZW50c1tldmVudF1baV0uZm4pO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBFbWl0IGFuIGV2ZW50IHRvIGFsbCByZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHJldHVybnMge0Jvb2xlYW59IEluZGljYXRpb24gaWYgd2UndmUgZW1pdHRlZCBhbiBldmVudC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW2V2ZW50XSkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG4gICAgLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBlZSA9IGxpc3RlbmVyc1swXVxuICAgICwgYXJnc1xuICAgICwgaSwgajtcblxuICBpZiAoMSA9PT0gbGVuZ3RoKSB7XG4gICAgaWYgKGVlLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGVlLmZuLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBlZS5mbi5jYWxsKGVlLmNvbnRleHQpLCB0cnVlO1xuICAgICAgY2FzZSAyOiByZXR1cm4gZWUuZm4uY2FsbChlZS5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBlZS5mbi5jYWxsKGVlLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBlZS5mbi5jYWxsKGVlLmNvbnRleHQsIGExLCBhMiwgYTMpLCB0cnVlO1xuICAgICAgY2FzZSA1OiByZXR1cm4gZWUuZm4uY2FsbChlZS5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBlZS5mbi5jYWxsKGVlLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGVlLmZuLmFwcGx5KGVlLmNvbnRleHQsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHRydWUpO1xuXG4gICAgICBzd2l0Y2ggKGxlbikge1xuICAgICAgICBjYXNlIDE6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0KTsgYnJlYWs7XG4gICAgICAgIGNhc2UgMjogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgMzogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMik7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICghYXJncykgZm9yIChqID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaiAtIDFdID0gYXJndW1lbnRzW2pdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpc3RlbmVyc1tpXS5mbi5hcHBseShsaXN0ZW5lcnNbaV0uY29udGV4dCwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIFJlZ2lzdGVyIGEgbmV3IEV2ZW50TGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgTmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcGFyYW0ge0Z1bmN0b259IGZuIENhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtNaXhlZH0gY29udGV4dCBUaGUgY29udGV4dCBvZiB0aGUgZnVuY3Rpb24uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIGlmICghdGhpcy5fZXZlbnRzKSB0aGlzLl9ldmVudHMgPSB7fTtcbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZlbnRdKSB0aGlzLl9ldmVudHNbZXZlbnRdID0gW107XG4gIHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChuZXcgRUUoIGZuLCBjb250ZXh0IHx8IHRoaXMgKSk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZCBhbiBFdmVudExpc3RlbmVyIHRoYXQncyBvbmx5IGNhbGxlZCBvbmNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIENhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtNaXhlZH0gY29udGV4dCBUaGUgY29udGV4dCBvZiB0aGUgZnVuY3Rpb24uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICBpZiAoIXRoaXMuX2V2ZW50cykgdGhpcy5fZXZlbnRzID0ge307XG4gIGlmICghdGhpcy5fZXZlbnRzW2V2ZW50XSkgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IFtdO1xuICB0aGlzLl9ldmVudHNbZXZlbnRdLnB1c2gobmV3IEVFKGZuLCBjb250ZXh0IHx8IHRoaXMsIHRydWUgKSk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBldmVudCB3ZSB3YW50IHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciB0aGF0IHdlIG5lZWQgdG8gZmluZC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmNlIGxpc3RlbmVycy5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgZm4sIG9uY2UpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1tldmVudF0pIHJldHVybiB0aGlzO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG4gICAgLCBldmVudHMgPSBbXTtcblxuICBpZiAoZm4pIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobGlzdGVuZXJzW2ldLmZuICE9PSBmbiAmJiBsaXN0ZW5lcnNbaV0ub25jZSAhPT0gb25jZSkge1xuICAgICAgZXZlbnRzLnB1c2gobGlzdGVuZXJzW2ldKTtcbiAgICB9XG4gIH1cblxuICAvL1xuICAvLyBSZXNldCB0aGUgYXJyYXksIG9yIHJlbW92ZSBpdCBjb21wbGV0ZWx5IGlmIHdlIGhhdmUgbm8gbW9yZSBsaXN0ZW5lcnMuXG4gIC8vXG4gIGlmIChldmVudHMubGVuZ3RoKSB0aGlzLl9ldmVudHNbZXZlbnRdID0gZXZlbnRzO1xuICBlbHNlIHRoaXMuX2V2ZW50c1tldmVudF0gPSBudWxsO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycyBvciBvbmx5IHRoZSBsaXN0ZW5lcnMgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBldmVudCB3YW50IHRvIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvci5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50KSB7XG4gIGlmICghdGhpcy5fZXZlbnRzKSByZXR1cm4gdGhpcztcblxuICBpZiAoZXZlbnQpIHRoaXMuX2V2ZW50c1tldmVudF0gPSBudWxsO1xuICBlbHNlIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbi8vXG4vLyBUaGlzIGZ1bmN0aW9uIGRvZXNuJ3QgYXBwbHkgYW55bW9yZS5cbi8vXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIyID0gRXZlbnRFbWl0dGVyO1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlcjMgPSBFdmVudEVtaXR0ZXI7XG5cbmlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbn1cblxufSx7fV0sMTQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIEJ1ZmZlckJ1aWxkZXIgPSByZXF1aXJlKCcuL2J1ZmZlcmJ1aWxkZXInKS5CdWZmZXJCdWlsZGVyO1xyXG52YXIgYmluYXJ5RmVhdHVyZXMgPSByZXF1aXJlKCcuL2J1ZmZlcmJ1aWxkZXInKS5iaW5hcnlGZWF0dXJlcztcclxuXHJcbnZhciBCaW5hcnlQYWNrID0ge1xyXG4gIHVucGFjazogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICB2YXIgdW5wYWNrZXIgPSBuZXcgVW5wYWNrZXIoZGF0YSk7XHJcbiAgICByZXR1cm4gdW5wYWNrZXIudW5wYWNrKCk7XHJcbiAgfSxcclxuICBwYWNrOiBmdW5jdGlvbihkYXRhKXtcclxuICAgIHZhciBwYWNrZXIgPSBuZXcgUGFja2VyKCk7XHJcbiAgICBwYWNrZXIucGFjayhkYXRhKTtcclxuICAgIHZhciBidWZmZXIgPSBwYWNrZXIuZ2V0QnVmZmVyKCk7XHJcbiAgICByZXR1cm4gYnVmZmVyO1xyXG4gIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQmluYXJ5UGFjaztcclxuXHJcbmZ1bmN0aW9uIFVucGFja2VyIChkYXRhKXtcclxuICAvLyBEYXRhIGlzIEFycmF5QnVmZmVyXHJcbiAgdGhpcy5pbmRleCA9IDA7XHJcbiAgdGhpcy5kYXRhQnVmZmVyID0gZGF0YTtcclxuICB0aGlzLmRhdGFWaWV3ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5kYXRhQnVmZmVyKTtcclxuICB0aGlzLmxlbmd0aCA9IHRoaXMuZGF0YUJ1ZmZlci5ieXRlTGVuZ3RoO1xyXG59XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdHlwZSA9IHRoaXMudW5wYWNrX3VpbnQ4KCk7XHJcbiAgaWYgKHR5cGUgPCAweDgwKXtcclxuICAgIHZhciBwb3NpdGl2ZV9maXhudW0gPSB0eXBlO1xyXG4gICAgcmV0dXJuIHBvc2l0aXZlX2ZpeG51bTtcclxuICB9IGVsc2UgaWYgKCh0eXBlIF4gMHhlMCkgPCAweDIwKXtcclxuICAgIHZhciBuZWdhdGl2ZV9maXhudW0gPSAodHlwZSBeIDB4ZTApIC0gMHgyMDtcclxuICAgIHJldHVybiBuZWdhdGl2ZV9maXhudW07XHJcbiAgfVxyXG4gIHZhciBzaXplO1xyXG4gIGlmICgoc2l6ZSA9IHR5cGUgXiAweGEwKSA8PSAweDBmKXtcclxuICAgIHJldHVybiB0aGlzLnVucGFja19yYXcoc2l6ZSk7XHJcbiAgfSBlbHNlIGlmICgoc2l6ZSA9IHR5cGUgXiAweGIwKSA8PSAweDBmKXtcclxuICAgIHJldHVybiB0aGlzLnVucGFja19zdHJpbmcoc2l6ZSk7XHJcbiAgfSBlbHNlIGlmICgoc2l6ZSA9IHR5cGUgXiAweDkwKSA8PSAweDBmKXtcclxuICAgIHJldHVybiB0aGlzLnVucGFja19hcnJheShzaXplKTtcclxuICB9IGVsc2UgaWYgKChzaXplID0gdHlwZSBeIDB4ODApIDw9IDB4MGYpe1xyXG4gICAgcmV0dXJuIHRoaXMudW5wYWNrX21hcChzaXplKTtcclxuICB9XHJcbiAgc3dpdGNoKHR5cGUpe1xyXG4gICAgY2FzZSAweGMwOlxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIGNhc2UgMHhjMTpcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIGNhc2UgMHhjMjpcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgY2FzZSAweGMzOlxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIGNhc2UgMHhjYTpcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX2Zsb2F0KCk7XHJcbiAgICBjYXNlIDB4Y2I6XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19kb3VibGUoKTtcclxuICAgIGNhc2UgMHhjYzpcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX3VpbnQ4KCk7XHJcbiAgICBjYXNlIDB4Y2Q6XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja191aW50MTYoKTtcclxuICAgIGNhc2UgMHhjZTpcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX3VpbnQzMigpO1xyXG4gICAgY2FzZSAweGNmOlxyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfdWludDY0KCk7XHJcbiAgICBjYXNlIDB4ZDA6XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19pbnQ4KCk7XHJcbiAgICBjYXNlIDB4ZDE6XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19pbnQxNigpO1xyXG4gICAgY2FzZSAweGQyOlxyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfaW50MzIoKTtcclxuICAgIGNhc2UgMHhkMzpcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX2ludDY0KCk7XHJcbiAgICBjYXNlIDB4ZDQ6XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICBjYXNlIDB4ZDU6XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICBjYXNlIDB4ZDY6XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICBjYXNlIDB4ZDc6XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICBjYXNlIDB4ZDg6XHJcbiAgICAgIHNpemUgPSB0aGlzLnVucGFja191aW50MTYoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX3N0cmluZyhzaXplKTtcclxuICAgIGNhc2UgMHhkOTpcclxuICAgICAgc2l6ZSA9IHRoaXMudW5wYWNrX3VpbnQzMigpO1xyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfc3RyaW5nKHNpemUpO1xyXG4gICAgY2FzZSAweGRhOlxyXG4gICAgICBzaXplID0gdGhpcy51bnBhY2tfdWludDE2KCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19yYXcoc2l6ZSk7XHJcbiAgICBjYXNlIDB4ZGI6XHJcbiAgICAgIHNpemUgPSB0aGlzLnVucGFja191aW50MzIoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX3JhdyhzaXplKTtcclxuICAgIGNhc2UgMHhkYzpcclxuICAgICAgc2l6ZSA9IHRoaXMudW5wYWNrX3VpbnQxNigpO1xyXG4gICAgICByZXR1cm4gdGhpcy51bnBhY2tfYXJyYXkoc2l6ZSk7XHJcbiAgICBjYXNlIDB4ZGQ6XHJcbiAgICAgIHNpemUgPSB0aGlzLnVucGFja191aW50MzIoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX2FycmF5KHNpemUpO1xyXG4gICAgY2FzZSAweGRlOlxyXG4gICAgICBzaXplID0gdGhpcy51bnBhY2tfdWludDE2KCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnVucGFja19tYXAoc2l6ZSk7XHJcbiAgICBjYXNlIDB4ZGY6XHJcbiAgICAgIHNpemUgPSB0aGlzLnVucGFja191aW50MzIoKTtcclxuICAgICAgcmV0dXJuIHRoaXMudW5wYWNrX21hcChzaXplKTtcclxuICB9XHJcbn1cclxuXHJcblVucGFja2VyLnByb3RvdHlwZS51bnBhY2tfdWludDggPSBmdW5jdGlvbigpe1xyXG4gIHZhciBieXRlID0gdGhpcy5kYXRhVmlld1t0aGlzLmluZGV4XSAmIDB4ZmY7XHJcbiAgdGhpcy5pbmRleCsrO1xyXG4gIHJldHVybiBieXRlO1xyXG59O1xyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja191aW50MTYgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBieXRlcyA9IHRoaXMucmVhZCgyKTtcclxuICB2YXIgdWludDE2ID1cclxuICAgICgoYnl0ZXNbMF0gJiAweGZmKSAqIDI1NikgKyAoYnl0ZXNbMV0gJiAweGZmKTtcclxuICB0aGlzLmluZGV4ICs9IDI7XHJcbiAgcmV0dXJuIHVpbnQxNjtcclxufVxyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja191aW50MzIgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBieXRlcyA9IHRoaXMucmVhZCg0KTtcclxuICB2YXIgdWludDMyID1cclxuICAgICAoKGJ5dGVzWzBdICAqIDI1NiArXHJcbiAgICAgICBieXRlc1sxXSkgKiAyNTYgK1xyXG4gICAgICAgYnl0ZXNbMl0pICogMjU2ICtcclxuICAgICAgIGJ5dGVzWzNdO1xyXG4gIHRoaXMuaW5kZXggKz0gNDtcclxuICByZXR1cm4gdWludDMyO1xyXG59XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX3VpbnQ2NCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGJ5dGVzID0gdGhpcy5yZWFkKDgpO1xyXG4gIHZhciB1aW50NjQgPVxyXG4gICAoKCgoKChieXRlc1swXSAgKiAyNTYgK1xyXG4gICAgICAgYnl0ZXNbMV0pICogMjU2ICtcclxuICAgICAgIGJ5dGVzWzJdKSAqIDI1NiArXHJcbiAgICAgICBieXRlc1szXSkgKiAyNTYgK1xyXG4gICAgICAgYnl0ZXNbNF0pICogMjU2ICtcclxuICAgICAgIGJ5dGVzWzVdKSAqIDI1NiArXHJcbiAgICAgICBieXRlc1s2XSkgKiAyNTYgK1xyXG4gICAgICAgYnl0ZXNbN107XHJcbiAgdGhpcy5pbmRleCArPSA4O1xyXG4gIHJldHVybiB1aW50NjQ7XHJcbn1cclxuXHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX2ludDggPSBmdW5jdGlvbigpe1xyXG4gIHZhciB1aW50OCA9IHRoaXMudW5wYWNrX3VpbnQ4KCk7XHJcbiAgcmV0dXJuICh1aW50OCA8IDB4ODAgKSA/IHVpbnQ4IDogdWludDggLSAoMSA8PCA4KTtcclxufTtcclxuXHJcblVucGFja2VyLnByb3RvdHlwZS51bnBhY2tfaW50MTYgPSBmdW5jdGlvbigpe1xyXG4gIHZhciB1aW50MTYgPSB0aGlzLnVucGFja191aW50MTYoKTtcclxuICByZXR1cm4gKHVpbnQxNiA8IDB4ODAwMCApID8gdWludDE2IDogdWludDE2IC0gKDEgPDwgMTYpO1xyXG59XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX2ludDMyID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdWludDMyID0gdGhpcy51bnBhY2tfdWludDMyKCk7XHJcbiAgcmV0dXJuICh1aW50MzIgPCBNYXRoLnBvdygyLCAzMSkgKSA/IHVpbnQzMiA6XHJcbiAgICB1aW50MzIgLSBNYXRoLnBvdygyLCAzMik7XHJcbn1cclxuXHJcblVucGFja2VyLnByb3RvdHlwZS51bnBhY2tfaW50NjQgPSBmdW5jdGlvbigpe1xyXG4gIHZhciB1aW50NjQgPSB0aGlzLnVucGFja191aW50NjQoKTtcclxuICByZXR1cm4gKHVpbnQ2NCA8IE1hdGgucG93KDIsIDYzKSApID8gdWludDY0IDpcclxuICAgIHVpbnQ2NCAtIE1hdGgucG93KDIsIDY0KTtcclxufVxyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja19yYXcgPSBmdW5jdGlvbihzaXplKXtcclxuICBpZiAoIHRoaXMubGVuZ3RoIDwgdGhpcy5pbmRleCArIHNpemUpe1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdCaW5hcnlQYWNrRmFpbHVyZTogaW5kZXggaXMgb3V0IG9mIHJhbmdlJ1xyXG4gICAgICArICcgJyArIHRoaXMuaW5kZXggKyAnICcgKyBzaXplICsgJyAnICsgdGhpcy5sZW5ndGgpO1xyXG4gIH1cclxuICB2YXIgYnVmID0gdGhpcy5kYXRhQnVmZmVyLnNsaWNlKHRoaXMuaW5kZXgsIHRoaXMuaW5kZXggKyBzaXplKTtcclxuICB0aGlzLmluZGV4ICs9IHNpemU7XHJcblxyXG4gICAgLy9idWYgPSB1dGlsLmJ1ZmZlclRvU3RyaW5nKGJ1Zik7XHJcblxyXG4gIHJldHVybiBidWY7XHJcbn1cclxuXHJcblVucGFja2VyLnByb3RvdHlwZS51bnBhY2tfc3RyaW5nID0gZnVuY3Rpb24oc2l6ZSl7XHJcbiAgdmFyIGJ5dGVzID0gdGhpcy5yZWFkKHNpemUpO1xyXG4gIHZhciBpID0gMCwgc3RyID0gJycsIGMsIGNvZGU7XHJcbiAgd2hpbGUoaSA8IHNpemUpe1xyXG4gICAgYyA9IGJ5dGVzW2ldO1xyXG4gICAgaWYgKCBjIDwgMTI4KXtcclxuICAgICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XHJcbiAgICAgIGkrKztcclxuICAgIH0gZWxzZSBpZiAoKGMgXiAweGMwKSA8IDMyKXtcclxuICAgICAgY29kZSA9ICgoYyBeIDB4YzApIDw8IDYpIHwgKGJ5dGVzW2krMV0gJiA2Myk7XHJcbiAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xyXG4gICAgICBpICs9IDI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb2RlID0gKChjICYgMTUpIDw8IDEyKSB8ICgoYnl0ZXNbaSsxXSAmIDYzKSA8PCA2KSB8XHJcbiAgICAgICAgKGJ5dGVzW2krMl0gJiA2Myk7XHJcbiAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xyXG4gICAgICBpICs9IDM7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRoaXMuaW5kZXggKz0gc2l6ZTtcclxuICByZXR1cm4gc3RyO1xyXG59XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX2FycmF5ID0gZnVuY3Rpb24oc2l6ZSl7XHJcbiAgdmFyIG9iamVjdHMgPSBuZXcgQXJyYXkoc2l6ZSk7XHJcbiAgZm9yKHZhciBpID0gMDsgaSA8IHNpemUgOyBpKyspe1xyXG4gICAgb2JqZWN0c1tpXSA9IHRoaXMudW5wYWNrKCk7XHJcbiAgfVxyXG4gIHJldHVybiBvYmplY3RzO1xyXG59XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX21hcCA9IGZ1bmN0aW9uKHNpemUpe1xyXG4gIHZhciBtYXAgPSB7fTtcclxuICBmb3IodmFyIGkgPSAwOyBpIDwgc2l6ZSA7IGkrKyl7XHJcbiAgICB2YXIga2V5ICA9IHRoaXMudW5wYWNrKCk7XHJcbiAgICB2YXIgdmFsdWUgPSB0aGlzLnVucGFjaygpO1xyXG4gICAgbWFwW2tleV0gPSB2YWx1ZTtcclxuICB9XHJcbiAgcmV0dXJuIG1hcDtcclxufVxyXG5cclxuVW5wYWNrZXIucHJvdG90eXBlLnVucGFja19mbG9hdCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHVpbnQzMiA9IHRoaXMudW5wYWNrX3VpbnQzMigpO1xyXG4gIHZhciBzaWduID0gdWludDMyID4+IDMxO1xyXG4gIHZhciBleHAgID0gKCh1aW50MzIgPj4gMjMpICYgMHhmZikgLSAxMjc7XHJcbiAgdmFyIGZyYWN0aW9uID0gKCB1aW50MzIgJiAweDdmZmZmZiApIHwgMHg4MDAwMDA7XHJcbiAgcmV0dXJuIChzaWduID09IDAgPyAxIDogLTEpICpcclxuICAgIGZyYWN0aW9uICogTWF0aC5wb3coMiwgZXhwIC0gMjMpO1xyXG59XHJcblxyXG5VbnBhY2tlci5wcm90b3R5cGUudW5wYWNrX2RvdWJsZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGgzMiA9IHRoaXMudW5wYWNrX3VpbnQzMigpO1xyXG4gIHZhciBsMzIgPSB0aGlzLnVucGFja191aW50MzIoKTtcclxuICB2YXIgc2lnbiA9IGgzMiA+PiAzMTtcclxuICB2YXIgZXhwICA9ICgoaDMyID4+IDIwKSAmIDB4N2ZmKSAtIDEwMjM7XHJcbiAgdmFyIGhmcmFjID0gKCBoMzIgJiAweGZmZmZmICkgfCAweDEwMDAwMDtcclxuICB2YXIgZnJhYyA9IGhmcmFjICogTWF0aC5wb3coMiwgZXhwIC0gMjApICtcclxuICAgIGwzMiAgICogTWF0aC5wb3coMiwgZXhwIC0gNTIpO1xyXG4gIHJldHVybiAoc2lnbiA9PSAwID8gMSA6IC0xKSAqIGZyYWM7XHJcbn1cclxuXHJcblVucGFja2VyLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24obGVuZ3RoKXtcclxuICB2YXIgaiA9IHRoaXMuaW5kZXg7XHJcbiAgaWYgKGogKyBsZW5ndGggPD0gdGhpcy5sZW5ndGgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFWaWV3LnN1YmFycmF5KGosIGogKyBsZW5ndGgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0JpbmFyeVBhY2tGYWlsdXJlOiByZWFkIGluZGV4IG91dCBvZiByYW5nZScpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gUGFja2VyKCl7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyID0gbmV3IEJ1ZmZlckJ1aWxkZXIoKTtcclxufVxyXG5cclxuUGFja2VyLnByb3RvdHlwZS5nZXRCdWZmZXIgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmJ1ZmZlckJ1aWxkZXIuZ2V0QnVmZmVyKCk7XHJcbn1cclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFjayA9IGZ1bmN0aW9uKHZhbHVlKXtcclxuICB2YXIgdHlwZSA9IHR5cGVvZih2YWx1ZSk7XHJcbiAgaWYgKHR5cGUgPT0gJ3N0cmluZycpe1xyXG4gICAgdGhpcy5wYWNrX3N0cmluZyh2YWx1ZSk7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09ICdudW1iZXInKXtcclxuICAgIGlmIChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUpe1xyXG4gICAgICB0aGlzLnBhY2tfaW50ZWdlcih2YWx1ZSk7XHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIHRoaXMucGFja19kb3VibGUodmFsdWUpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAodHlwZSA9PSAnYm9vbGVhbicpe1xyXG4gICAgaWYgKHZhbHVlID09PSB0cnVlKXtcclxuICAgICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGMzKTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IGZhbHNlKXtcclxuICAgICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGMyKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHR5cGUgPT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGMwKTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT0gJ29iamVjdCcpe1xyXG4gICAgaWYgKHZhbHVlID09PSBudWxsKXtcclxuICAgICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGMwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBjb25zdHJ1Y3RvciA9IHZhbHVlLmNvbnN0cnVjdG9yO1xyXG4gICAgICBpZiAoY29uc3RydWN0b3IgPT0gQXJyYXkpe1xyXG4gICAgICAgIHRoaXMucGFja19hcnJheSh2YWx1ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29uc3RydWN0b3IgPT0gQmxvYiB8fCBjb25zdHJ1Y3RvciA9PSBGaWxlKSB7XHJcbiAgICAgICAgdGhpcy5wYWNrX2Jpbih2YWx1ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29uc3RydWN0b3IgPT0gQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICBpZihiaW5hcnlGZWF0dXJlcy51c2VBcnJheUJ1ZmZlclZpZXcpIHtcclxuICAgICAgICAgIHRoaXMucGFja19iaW4obmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5wYWNrX2Jpbih2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKCdCWVRFU19QRVJfRUxFTUVOVCcgaW4gdmFsdWUpe1xyXG4gICAgICAgIGlmKGJpbmFyeUZlYXR1cmVzLnVzZUFycmF5QnVmZmVyVmlldykge1xyXG4gICAgICAgICAgdGhpcy5wYWNrX2JpbihuZXcgVWludDhBcnJheSh2YWx1ZS5idWZmZXIpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5wYWNrX2Jpbih2YWx1ZS5idWZmZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChjb25zdHJ1Y3RvciA9PSBPYmplY3Qpe1xyXG4gICAgICAgIHRoaXMucGFja19vYmplY3QodmFsdWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKGNvbnN0cnVjdG9yID09IERhdGUpe1xyXG4gICAgICAgIHRoaXMucGFja19zdHJpbmcodmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlLnRvQmluYXJ5UGFjayA9PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKHZhbHVlLnRvQmluYXJ5UGFjaygpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1R5cGUgXCInICsgY29uc3RydWN0b3IudG9TdHJpbmcoKSArICdcIiBub3QgeWV0IHN1cHBvcnRlZCcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignVHlwZSBcIicgKyB0eXBlICsgJ1wiIG5vdCB5ZXQgc3VwcG9ydGVkJyk7XHJcbiAgfVxyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5mbHVzaCgpO1xyXG59XHJcblxyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrX2JpbiA9IGZ1bmN0aW9uKGJsb2Ipe1xyXG4gIHZhciBsZW5ndGggPSBibG9iLmxlbmd0aCB8fCBibG9iLmJ5dGVMZW5ndGggfHwgYmxvYi5zaXplO1xyXG4gIGlmIChsZW5ndGggPD0gMHgwZil7XHJcbiAgICB0aGlzLnBhY2tfdWludDgoMHhhMCArIGxlbmd0aCk7XHJcbiAgfSBlbHNlIGlmIChsZW5ndGggPD0gMHhmZmZmKXtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkYSkgO1xyXG4gICAgdGhpcy5wYWNrX3VpbnQxNihsZW5ndGgpO1xyXG4gIH0gZWxzZSBpZiAobGVuZ3RoIDw9IDB4ZmZmZmZmZmYpe1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGRiKTtcclxuICAgIHRoaXMucGFja191aW50MzIobGVuZ3RoKTtcclxuICB9IGVsc2V7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGVuZ3RoJyk7XHJcbiAgfVxyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoYmxvYik7XHJcbn1cclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFja19zdHJpbmcgPSBmdW5jdGlvbihzdHIpe1xyXG4gIHZhciBsZW5ndGggPSB1dGY4TGVuZ3RoKHN0cik7XHJcblxyXG4gIGlmIChsZW5ndGggPD0gMHgwZil7XHJcbiAgICB0aGlzLnBhY2tfdWludDgoMHhiMCArIGxlbmd0aCk7XHJcbiAgfSBlbHNlIGlmIChsZW5ndGggPD0gMHhmZmZmKXtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkOCkgO1xyXG4gICAgdGhpcy5wYWNrX3VpbnQxNihsZW5ndGgpO1xyXG4gIH0gZWxzZSBpZiAobGVuZ3RoIDw9IDB4ZmZmZmZmZmYpe1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGQ5KTtcclxuICAgIHRoaXMucGFja191aW50MzIobGVuZ3RoKTtcclxuICB9IGVsc2V7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGVuZ3RoJyk7XHJcbiAgfVxyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoc3RyKTtcclxufVxyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrX2FycmF5ID0gZnVuY3Rpb24oYXJ5KXtcclxuICB2YXIgbGVuZ3RoID0gYXJ5Lmxlbmd0aDtcclxuICBpZiAobGVuZ3RoIDw9IDB4MGYpe1xyXG4gICAgdGhpcy5wYWNrX3VpbnQ4KDB4OTAgKyBsZW5ndGgpO1xyXG4gIH0gZWxzZSBpZiAobGVuZ3RoIDw9IDB4ZmZmZil7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4ZGMpXHJcbiAgICB0aGlzLnBhY2tfdWludDE2KGxlbmd0aCk7XHJcbiAgfSBlbHNlIGlmIChsZW5ndGggPD0gMHhmZmZmZmZmZil7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4ZGQpO1xyXG4gICAgdGhpcy5wYWNrX3VpbnQzMihsZW5ndGgpO1xyXG4gIH0gZWxzZXtcclxuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsZW5ndGgnKTtcclxuICB9XHJcbiAgZm9yKHZhciBpID0gMDsgaSA8IGxlbmd0aCA7IGkrKyl7XHJcbiAgICB0aGlzLnBhY2soYXJ5W2ldKTtcclxuICB9XHJcbn1cclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFja19pbnRlZ2VyID0gZnVuY3Rpb24obnVtKXtcclxuICBpZiAoIC0weDIwIDw9IG51bSAmJiBudW0gPD0gMHg3Zil7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKG51bSAmIDB4ZmYpO1xyXG4gIH0gZWxzZSBpZiAoMHgwMCA8PSBudW0gJiYgbnVtIDw9IDB4ZmYpe1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGNjKTtcclxuICAgIHRoaXMucGFja191aW50OChudW0pO1xyXG4gIH0gZWxzZSBpZiAoLTB4ODAgPD0gbnVtICYmIG51bSA8PSAweDdmKXtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkMCk7XHJcbiAgICB0aGlzLnBhY2tfaW50OChudW0pO1xyXG4gIH0gZWxzZSBpZiAoIDB4MDAwMCA8PSBudW0gJiYgbnVtIDw9IDB4ZmZmZil7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4Y2QpO1xyXG4gICAgdGhpcy5wYWNrX3VpbnQxNihudW0pO1xyXG4gIH0gZWxzZSBpZiAoLTB4ODAwMCA8PSBudW0gJiYgbnVtIDw9IDB4N2ZmZil7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4ZDEpO1xyXG4gICAgdGhpcy5wYWNrX2ludDE2KG51bSk7XHJcbiAgfSBlbHNlIGlmICggMHgwMDAwMDAwMCA8PSBudW0gJiYgbnVtIDw9IDB4ZmZmZmZmZmYpe1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGNlKTtcclxuICAgIHRoaXMucGFja191aW50MzIobnVtKTtcclxuICB9IGVsc2UgaWYgKC0weDgwMDAwMDAwIDw9IG51bSAmJiBudW0gPD0gMHg3ZmZmZmZmZil7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4ZDIpO1xyXG4gICAgdGhpcy5wYWNrX2ludDMyKG51bSk7XHJcbiAgfSBlbHNlIGlmICgtMHg4MDAwMDAwMDAwMDAwMDAwIDw9IG51bSAmJiBudW0gPD0gMHg3RkZGRkZGRkZGRkZGRkZGKXtcclxuICAgIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoMHhkMyk7XHJcbiAgICB0aGlzLnBhY2tfaW50NjQobnVtKTtcclxuICB9IGVsc2UgaWYgKDB4MDAwMDAwMDAwMDAwMDAwMCA8PSBudW0gJiYgbnVtIDw9IDB4RkZGRkZGRkZGRkZGRkZGRil7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4Y2YpO1xyXG4gICAgdGhpcy5wYWNrX3VpbnQ2NChudW0pO1xyXG4gIH0gZWxzZXtcclxuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnRlZ2VyJyk7XHJcbiAgfVxyXG59XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfZG91YmxlID0gZnVuY3Rpb24obnVtKXtcclxuICB2YXIgc2lnbiA9IDA7XHJcbiAgaWYgKG51bSA8IDApe1xyXG4gICAgc2lnbiA9IDE7XHJcbiAgICBudW0gPSAtbnVtO1xyXG4gIH1cclxuICB2YXIgZXhwICA9IE1hdGguZmxvb3IoTWF0aC5sb2cobnVtKSAvIE1hdGguTE4yKTtcclxuICB2YXIgZnJhYzAgPSBudW0gLyBNYXRoLnBvdygyLCBleHApIC0gMTtcclxuICB2YXIgZnJhYzEgPSBNYXRoLmZsb29yKGZyYWMwICogTWF0aC5wb3coMiwgNTIpKTtcclxuICB2YXIgYjMyICAgPSBNYXRoLnBvdygyLCAzMik7XHJcbiAgdmFyIGgzMiA9IChzaWduIDw8IDMxKSB8ICgoZXhwKzEwMjMpIDw8IDIwKSB8XHJcbiAgICAgIChmcmFjMSAvIGIzMikgJiAweDBmZmZmZjtcclxuICB2YXIgbDMyID0gZnJhYzEgJSBiMzI7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGNiKTtcclxuICB0aGlzLnBhY2tfaW50MzIoaDMyKTtcclxuICB0aGlzLnBhY2tfaW50MzIobDMyKTtcclxufVxyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrX29iamVjdCA9IGZ1bmN0aW9uKG9iail7XHJcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xyXG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcclxuICBpZiAobGVuZ3RoIDw9IDB4MGYpe1xyXG4gICAgdGhpcy5wYWNrX3VpbnQ4KDB4ODAgKyBsZW5ndGgpO1xyXG4gIH0gZWxzZSBpZiAobGVuZ3RoIDw9IDB4ZmZmZil7XHJcbiAgICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKDB4ZGUpO1xyXG4gICAgdGhpcy5wYWNrX3VpbnQxNihsZW5ndGgpO1xyXG4gIH0gZWxzZSBpZiAobGVuZ3RoIDw9IDB4ZmZmZmZmZmYpe1xyXG4gICAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgweGRmKTtcclxuICAgIHRoaXMucGFja191aW50MzIobGVuZ3RoKTtcclxuICB9IGVsc2V7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGVuZ3RoJyk7XHJcbiAgfVxyXG4gIGZvcih2YXIgcHJvcCBpbiBvYmope1xyXG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSl7XHJcbiAgICAgIHRoaXMucGFjayhwcm9wKTtcclxuICAgICAgdGhpcy5wYWNrKG9ialtwcm9wXSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfdWludDggPSBmdW5jdGlvbihudW0pe1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQobnVtKTtcclxufVxyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrX3VpbnQxNiA9IGZ1bmN0aW9uKG51bSl7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZChudW0gPj4gOCk7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZChudW0gJiAweGZmKTtcclxufVxyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrX3VpbnQzMiA9IGZ1bmN0aW9uKG51bSl7XHJcbiAgdmFyIG4gPSBudW0gJiAweGZmZmZmZmZmO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKG4gJiAweGZmMDAwMDAwKSA+Pj4gMjQpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKG4gJiAweDAwZmYwMDAwKSA+Pj4gMTYpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKG4gJiAweDAwMDBmZjAwKSA+Pj4gIDgpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKG4gJiAweDAwMDAwMGZmKSk7XHJcbn1cclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFja191aW50NjQgPSBmdW5jdGlvbihudW0pe1xyXG4gIHZhciBoaWdoID0gbnVtIC8gTWF0aC5wb3coMiwgMzIpO1xyXG4gIHZhciBsb3cgID0gbnVtICUgTWF0aC5wb3coMiwgMzIpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGhpZ2ggJiAweGZmMDAwMDAwKSA+Pj4gMjQpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGhpZ2ggJiAweDAwZmYwMDAwKSA+Pj4gMTYpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGhpZ2ggJiAweDAwMDBmZjAwKSA+Pj4gIDgpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGhpZ2ggJiAweDAwMDAwMGZmKSk7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobG93ICAmIDB4ZmYwMDAwMDApID4+PiAyNCk7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobG93ICAmIDB4MDBmZjAwMDApID4+PiAxNik7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobG93ICAmIDB4MDAwMGZmMDApID4+PiAgOCk7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobG93ICAmIDB4MDAwMDAwZmYpKTtcclxufVxyXG5cclxuUGFja2VyLnByb3RvdHlwZS5wYWNrX2ludDggPSBmdW5jdGlvbihudW0pe1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQobnVtICYgMHhmZik7XHJcbn1cclxuXHJcblBhY2tlci5wcm90b3R5cGUucGFja19pbnQxNiA9IGZ1bmN0aW9uKG51bSl7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobnVtICYgMHhmZjAwKSA+PiA4KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKG51bSAmIDB4ZmYpO1xyXG59XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfaW50MzIgPSBmdW5jdGlvbihudW0pe1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKG51bSA+Pj4gMjQpICYgMHhmZik7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobnVtICYgMHgwMGZmMDAwMCkgPj4+IDE2KTtcclxuICB0aGlzLmJ1ZmZlckJ1aWxkZXIuYXBwZW5kKChudW0gJiAweDAwMDBmZjAwKSA+Pj4gOCk7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobnVtICYgMHgwMDAwMDBmZikpO1xyXG59XHJcblxyXG5QYWNrZXIucHJvdG90eXBlLnBhY2tfaW50NjQgPSBmdW5jdGlvbihudW0pe1xyXG4gIHZhciBoaWdoID0gTWF0aC5mbG9vcihudW0gLyBNYXRoLnBvdygyLCAzMikpO1xyXG4gIHZhciBsb3cgID0gbnVtICUgTWF0aC5wb3coMiwgMzIpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGhpZ2ggJiAweGZmMDAwMDAwKSA+Pj4gMjQpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGhpZ2ggJiAweDAwZmYwMDAwKSA+Pj4gMTYpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGhpZ2ggJiAweDAwMDBmZjAwKSA+Pj4gIDgpO1xyXG4gIHRoaXMuYnVmZmVyQnVpbGRlci5hcHBlbmQoKGhpZ2ggJiAweDAwMDAwMGZmKSk7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobG93ICAmIDB4ZmYwMDAwMDApID4+PiAyNCk7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobG93ICAmIDB4MDBmZjAwMDApID4+PiAxNik7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobG93ICAmIDB4MDAwMGZmMDApID4+PiAgOCk7XHJcbiAgdGhpcy5idWZmZXJCdWlsZGVyLmFwcGVuZCgobG93ICAmIDB4MDAwMDAwZmYpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gX3V0ZjhSZXBsYWNlKG0pe1xyXG4gIHZhciBjb2RlID0gbS5jaGFyQ29kZUF0KDApO1xyXG5cclxuICBpZihjb2RlIDw9IDB4N2ZmKSByZXR1cm4gJzAwJztcclxuICBpZihjb2RlIDw9IDB4ZmZmZikgcmV0dXJuICcwMDAnO1xyXG4gIGlmKGNvZGUgPD0gMHgxZmZmZmYpIHJldHVybiAnMDAwMCc7XHJcbiAgaWYoY29kZSA8PSAweDNmZmZmZmYpIHJldHVybiAnMDAwMDAnO1xyXG4gIHJldHVybiAnMDAwMDAwJztcclxufVxyXG5cclxuZnVuY3Rpb24gdXRmOExlbmd0aChzdHIpe1xyXG4gIGlmIChzdHIubGVuZ3RoID4gNjAwKSB7XHJcbiAgICAvLyBCbG9iIG1ldGhvZCBmYXN0ZXIgZm9yIGxhcmdlIHN0cmluZ3NcclxuICAgIHJldHVybiAobmV3IEJsb2IoW3N0cl0pKS5zaXplO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1teXFx1MDAwMC1cXHUwMDdGXS9nLCBfdXRmOFJlcGxhY2UpLmxlbmd0aDtcclxuICB9XHJcbn1cclxuXG59LHtcIi4vYnVmZmVyYnVpbGRlclwiOjE1fV0sMTU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIGJpbmFyeUZlYXR1cmVzID0ge307XHJcbmJpbmFyeUZlYXR1cmVzLnVzZUJsb2JCdWlsZGVyID0gKGZ1bmN0aW9uKCl7XHJcbiAgdHJ5IHtcclxuICAgIG5ldyBCbG9iKFtdKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn0pKCk7XHJcblxyXG5iaW5hcnlGZWF0dXJlcy51c2VBcnJheUJ1ZmZlclZpZXcgPSAhYmluYXJ5RmVhdHVyZXMudXNlQmxvYkJ1aWxkZXIgJiYgKGZ1bmN0aW9uKCl7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiAobmV3IEJsb2IoW25ldyBVaW50OEFycmF5KFtdKV0pKS5zaXplID09PSAwO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufSkoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLmJpbmFyeUZlYXR1cmVzID0gYmluYXJ5RmVhdHVyZXM7XHJcbnZhciBCbG9iQnVpbGRlciA9IG1vZHVsZS5leHBvcnRzLkJsb2JCdWlsZGVyO1xyXG5pZiAodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJykge1xyXG4gIEJsb2JCdWlsZGVyID0gbW9kdWxlLmV4cG9ydHMuQmxvYkJ1aWxkZXIgPSB3aW5kb3cuV2ViS2l0QmxvYkJ1aWxkZXIgfHxcclxuICAgIHdpbmRvdy5Nb3pCbG9iQnVpbGRlciB8fCB3aW5kb3cuTVNCbG9iQnVpbGRlciB8fCB3aW5kb3cuQmxvYkJ1aWxkZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1ZmZlckJ1aWxkZXIoKXtcclxuICB0aGlzLl9waWVjZXMgPSBbXTtcclxuICB0aGlzLl9wYXJ0cyA9IFtdO1xyXG59XHJcblxyXG5CdWZmZXJCdWlsZGVyLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgaWYodHlwZW9mIGRhdGEgPT09ICdudW1iZXInKSB7XHJcbiAgICB0aGlzLl9waWVjZXMucHVzaChkYXRhKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy5mbHVzaCgpO1xyXG4gICAgdGhpcy5fcGFydHMucHVzaChkYXRhKTtcclxuICB9XHJcbn07XHJcblxyXG5CdWZmZXJCdWlsZGVyLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmICh0aGlzLl9waWVjZXMubGVuZ3RoID4gMCkge1xyXG4gICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMuX3BpZWNlcyk7XHJcbiAgICBpZighYmluYXJ5RmVhdHVyZXMudXNlQXJyYXlCdWZmZXJWaWV3KSB7XHJcbiAgICAgIGJ1ZiA9IGJ1Zi5idWZmZXI7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9wYXJ0cy5wdXNoKGJ1Zik7XHJcbiAgICB0aGlzLl9waWVjZXMgPSBbXTtcclxuICB9XHJcbn07XHJcblxyXG5CdWZmZXJCdWlsZGVyLnByb3RvdHlwZS5nZXRCdWZmZXIgPSBmdW5jdGlvbigpIHtcclxuICB0aGlzLmZsdXNoKCk7XHJcbiAgaWYoYmluYXJ5RmVhdHVyZXMudXNlQmxvYkJ1aWxkZXIpIHtcclxuICAgIHZhciBidWlsZGVyID0gbmV3IEJsb2JCdWlsZGVyKCk7XHJcbiAgICBmb3IodmFyIGkgPSAwLCBpaSA9IHRoaXMuX3BhcnRzLmxlbmd0aDsgaSA8IGlpOyBpKyspIHtcclxuICAgICAgYnVpbGRlci5hcHBlbmQodGhpcy5fcGFydHNbaV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJ1aWxkZXIuZ2V0QmxvYigpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gbmV3IEJsb2IodGhpcy5fcGFydHMpO1xyXG4gIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzLkJ1ZmZlckJ1aWxkZXIgPSBCdWZmZXJCdWlsZGVyO1xyXG5cbn0se31dLDE2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbi8qKlxuICogUmVsaWFibGUgdHJhbnNmZXIgZm9yIENocm9tZSBDYW5hcnkgRGF0YUNoYW5uZWwgaW1wbC5cbiAqIEF1dGhvcjogQG1pY2hlbGxlYnVcbiAqL1xuZnVuY3Rpb24gUmVsaWFibGUoZGMsIGRlYnVnKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZWxpYWJsZSkpIHJldHVybiBuZXcgUmVsaWFibGUoZGMpO1xuICB0aGlzLl9kYyA9IGRjO1xuXG4gIHV0aWwuZGVidWcgPSBkZWJ1ZztcblxuICAvLyBNZXNzYWdlcyBzZW50L3JlY2VpdmVkIHNvIGZhci5cbiAgLy8gaWQ6IHsgYWNrOiBuLCBjaHVua3M6IFsuLi5dIH1cbiAgdGhpcy5fb3V0Z29pbmcgPSB7fTtcbiAgLy8gaWQ6IHsgYWNrOiBbJ2FjaycsIGlkLCBuXSwgY2h1bmtzOiBbLi4uXSB9XG4gIHRoaXMuX2luY29taW5nID0ge307XG4gIHRoaXMuX3JlY2VpdmVkID0ge307XG5cbiAgLy8gV2luZG93IHNpemUuXG4gIHRoaXMuX3dpbmRvdyA9IDEwMDA7XG4gIC8vIE1UVS5cbiAgdGhpcy5fbXR1ID0gNTAwO1xuICAvLyBJbnRlcnZhbCBmb3Igc2V0SW50ZXJ2YWwuIEluIG1zLlxuICB0aGlzLl9pbnRlcnZhbCA9IDA7XG5cbiAgLy8gTWVzc2FnZXMgc2VudC5cbiAgdGhpcy5fY291bnQgPSAwO1xuXG4gIC8vIE91dGdvaW5nIG1lc3NhZ2UgcXVldWUuXG4gIHRoaXMuX3F1ZXVlID0gW107XG5cbiAgdGhpcy5fc2V0dXBEQygpO1xufTtcblxuLy8gU2VuZCBhIG1lc3NhZ2UgcmVsaWFibHkuXG5SZWxpYWJsZS5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKG1zZykge1xuICAvLyBEZXRlcm1pbmUgaWYgY2h1bmtpbmcgaXMgbmVjZXNzYXJ5LlxuICB2YXIgYmwgPSB1dGlsLnBhY2sobXNnKTtcbiAgaWYgKGJsLnNpemUgPCB0aGlzLl9tdHUpIHtcbiAgICB0aGlzLl9oYW5kbGVTZW5kKFsnbm8nLCBibF0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuX291dGdvaW5nW3RoaXMuX2NvdW50XSA9IHtcbiAgICBhY2s6IDAsXG4gICAgY2h1bmtzOiB0aGlzLl9jaHVuayhibClcbiAgfTtcblxuICBpZiAodXRpbC5kZWJ1Zykge1xuICAgIHRoaXMuX291dGdvaW5nW3RoaXMuX2NvdW50XS50aW1lciA9IG5ldyBEYXRlKCk7XG4gIH1cblxuICAvLyBTZW5kIHByZWxpbSB3aW5kb3cuXG4gIHRoaXMuX3NlbmRXaW5kb3dlZENodW5rcyh0aGlzLl9jb3VudCk7XG4gIHRoaXMuX2NvdW50ICs9IDE7XG59O1xuXG4vLyBTZXQgdXAgaW50ZXJ2YWwgZm9yIHByb2Nlc3NpbmcgcXVldWUuXG5SZWxpYWJsZS5wcm90b3R5cGUuX3NldHVwSW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgLy8gVE9ETzogZmFpbCBncmFjZWZ1bGx5LlxuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5fdGltZW91dCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIC8vIEZJWE1FOiBTdHJpbmcgc3R1ZmYgbWFrZXMgdGhpbmdzIHRlcnJpYmx5IGFzeW5jLlxuICAgIHZhciBtc2cgPSBzZWxmLl9xdWV1ZS5zaGlmdCgpO1xuICAgIGlmIChtc2cuX211bHRpcGxlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWkgPSBtc2cubGVuZ3RoOyBpIDwgaWk7IGkgKz0gMSkge1xuICAgICAgICBzZWxmLl9pbnRlcnZhbFNlbmQobXNnW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi5faW50ZXJ2YWxTZW5kKG1zZyk7XG4gICAgfVxuICB9LCB0aGlzLl9pbnRlcnZhbCk7XG59O1xuXG5SZWxpYWJsZS5wcm90b3R5cGUuX2ludGVydmFsU2VuZCA9IGZ1bmN0aW9uKG1zZykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIG1zZyA9IHV0aWwucGFjayhtc2cpO1xuICB1dGlsLmJsb2JUb0JpbmFyeVN0cmluZyhtc2csIGZ1bmN0aW9uKHN0cikge1xuICAgIHNlbGYuX2RjLnNlbmQoc3RyKTtcbiAgfSk7XG4gIGlmIChzZWxmLl9xdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICBjbGVhclRpbWVvdXQoc2VsZi5fdGltZW91dCk7XG4gICAgc2VsZi5fdGltZW91dCA9IG51bGw7XG4gICAgLy9zZWxmLl9wcm9jZXNzQWNrcygpO1xuICB9XG59O1xuXG4vLyBHbyB0aHJvdWdoIEFDS3MgdG8gc2VuZCBtaXNzaW5nIHBpZWNlcy5cblJlbGlhYmxlLnByb3RvdHlwZS5fcHJvY2Vzc0Fja3MgPSBmdW5jdGlvbigpIHtcbiAgZm9yICh2YXIgaWQgaW4gdGhpcy5fb3V0Z29pbmcpIHtcbiAgICBpZiAodGhpcy5fb3V0Z29pbmcuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgICB0aGlzLl9zZW5kV2luZG93ZWRDaHVua3MoaWQpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gSGFuZGxlIHNlbmRpbmcgYSBtZXNzYWdlLlxuLy8gRklYTUU6IERvbid0IHdhaXQgZm9yIGludGVydmFsIHRpbWUgZm9yIGFsbCBtZXNzYWdlcy4uLlxuUmVsaWFibGUucHJvdG90eXBlLl9oYW5kbGVTZW5kID0gZnVuY3Rpb24obXNnKSB7XG4gIHZhciBwdXNoID0gdHJ1ZTtcbiAgZm9yICh2YXIgaSA9IDAsIGlpID0gdGhpcy5fcXVldWUubGVuZ3RoOyBpIDwgaWk7IGkgKz0gMSkge1xuICAgIHZhciBpdGVtID0gdGhpcy5fcXVldWVbaV07XG4gICAgaWYgKGl0ZW0gPT09IG1zZykge1xuICAgICAgcHVzaCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5fbXVsdGlwbGUgJiYgaXRlbS5pbmRleE9mKG1zZykgIT09IC0xKSB7XG4gICAgICBwdXNoID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChwdXNoKSB7XG4gICAgdGhpcy5fcXVldWUucHVzaChtc2cpO1xuICAgIGlmICghdGhpcy5fdGltZW91dCkge1xuICAgICAgdGhpcy5fc2V0dXBJbnRlcnZhbCgpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gU2V0IHVwIERhdGFDaGFubmVsIGhhbmRsZXJzLlxuUmVsaWFibGUucHJvdG90eXBlLl9zZXR1cERDID0gZnVuY3Rpb24oKSB7XG4gIC8vIEhhbmRsZSB2YXJpb3VzIG1lc3NhZ2UgdHlwZXMuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5fZGMub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciBtc2cgPSBlLmRhdGE7XG4gICAgdmFyIGRhdGF0eXBlID0gbXNnLmNvbnN0cnVjdG9yO1xuICAgIC8vIEZJWE1FOiBtc2cgaXMgU3RyaW5nIHVudGlsIGJpbmFyeSBpcyBzdXBwb3J0ZWQuXG4gICAgLy8gT25jZSB0aGF0IGhhcHBlbnMsIHRoaXMgd2lsbCBoYXZlIHRvIGJlIHNtYXJ0ZXIuXG4gICAgaWYgKGRhdGF0eXBlID09PSBTdHJpbmcpIHtcbiAgICAgIHZhciBhYiA9IHV0aWwuYmluYXJ5U3RyaW5nVG9BcnJheUJ1ZmZlcihtc2cpO1xuICAgICAgbXNnID0gdXRpbC51bnBhY2soYWIpO1xuICAgICAgc2VsZi5faGFuZGxlTWVzc2FnZShtc2cpO1xuICAgIH1cbiAgfTtcbn07XG5cbi8vIEhhbmRsZXMgYW4gaW5jb21pbmcgbWVzc2FnZS5cblJlbGlhYmxlLnByb3RvdHlwZS5faGFuZGxlTWVzc2FnZSA9IGZ1bmN0aW9uKG1zZykge1xuICB2YXIgaWQgPSBtc2dbMV07XG4gIHZhciBpZGF0YSA9IHRoaXMuX2luY29taW5nW2lkXTtcbiAgdmFyIG9kYXRhID0gdGhpcy5fb3V0Z29pbmdbaWRdO1xuICB2YXIgZGF0YTtcbiAgc3dpdGNoIChtc2dbMF0pIHtcbiAgICAvLyBObyBjaHVua2luZyB3YXMgZG9uZS5cbiAgICBjYXNlICdubyc6XG4gICAgICB2YXIgbWVzc2FnZSA9IGlkO1xuICAgICAgaWYgKCEhbWVzc2FnZSkge1xuICAgICAgICB0aGlzLm9ubWVzc2FnZSh1dGlsLnVucGFjayhtZXNzYWdlKSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICAvLyBSZWFjaGVkIHRoZSBlbmQgb2YgdGhlIG1lc3NhZ2UuXG4gICAgY2FzZSAnZW5kJzpcbiAgICAgIGRhdGEgPSBpZGF0YTtcblxuICAgICAgLy8gSW4gY2FzZSBlbmQgY29tZXMgZmlyc3QuXG4gICAgICB0aGlzLl9yZWNlaXZlZFtpZF0gPSBtc2dbMl07XG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdGhpcy5fYWNrKGlkKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Fjayc6XG4gICAgICBkYXRhID0gb2RhdGE7XG4gICAgICBpZiAoISFkYXRhKSB7XG4gICAgICAgIHZhciBhY2sgPSBtc2dbMl07XG4gICAgICAgIC8vIFRha2UgdGhlIGxhcmdlciBBQ0ssIGZvciBvdXQgb2Ygb3JkZXIgbWVzc2FnZXMuXG4gICAgICAgIGRhdGEuYWNrID0gTWF0aC5tYXgoYWNrLCBkYXRhLmFjayk7XG5cbiAgICAgICAgLy8gQ2xlYW4gdXAgd2hlbiBhbGwgY2h1bmtzIGFyZSBBQ0tlZC5cbiAgICAgICAgaWYgKGRhdGEuYWNrID49IGRhdGEuY2h1bmtzLmxlbmd0aCkge1xuICAgICAgICAgIHV0aWwubG9nKCdUaW1lOiAnLCBuZXcgRGF0ZSgpIC0gZGF0YS50aW1lcik7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX291dGdvaW5nW2lkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9wcm9jZXNzQWNrcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBJZiAhZGF0YSwganVzdCBpZ25vcmUuXG4gICAgICBicmVhaztcbiAgICAvLyBSZWNlaXZlZCBhIGNodW5rIG9mIGRhdGEuXG4gICAgY2FzZSAnY2h1bmsnOlxuICAgICAgLy8gQ3JlYXRlIGEgbmV3IGVudHJ5IGlmIG5vbmUgZXhpc3RzLlxuICAgICAgZGF0YSA9IGlkYXRhO1xuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIHZhciBlbmQgPSB0aGlzLl9yZWNlaXZlZFtpZF07XG4gICAgICAgIGlmIChlbmQgPT09IHRydWUpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgIGFjazogWydhY2snLCBpZCwgMF0sXG4gICAgICAgICAgY2h1bmtzOiBbXVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9pbmNvbWluZ1tpZF0gPSBkYXRhO1xuICAgICAgfVxuXG4gICAgICB2YXIgbiA9IG1zZ1syXTtcbiAgICAgIHZhciBjaHVuayA9IG1zZ1szXTtcbiAgICAgIGRhdGEuY2h1bmtzW25dID0gbmV3IFVpbnQ4QXJyYXkoY2h1bmspO1xuXG4gICAgICAvLyBJZiB3ZSBnZXQgdGhlIGNodW5rIHdlJ3JlIGxvb2tpbmcgZm9yLCBBQ0sgZm9yIG5leHQgbWlzc2luZy5cbiAgICAgIC8vIE90aGVyd2lzZSwgQUNLIHRoZSBzYW1lIE4gYWdhaW4uXG4gICAgICBpZiAobiA9PT0gZGF0YS5hY2tbMl0pIHtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlTmV4dEFjayhpZCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9hY2soaWQpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIFNob3VsZG4ndCBoYXBwZW4sIGJ1dCB3b3VsZCBtYWtlIHNlbnNlIGZvciBtZXNzYWdlIHRvIGp1c3QgZ29cbiAgICAgIC8vIHRocm91Z2ggYXMgaXMuXG4gICAgICB0aGlzLl9oYW5kbGVTZW5kKG1zZyk7XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuLy8gQ2h1bmtzIEJMIGludG8gc21hbGxlciBtZXNzYWdlcy5cblJlbGlhYmxlLnByb3RvdHlwZS5fY2h1bmsgPSBmdW5jdGlvbihibCkge1xuICB2YXIgY2h1bmtzID0gW107XG4gIHZhciBzaXplID0gYmwuc2l6ZTtcbiAgdmFyIHN0YXJ0ID0gMDtcbiAgd2hpbGUgKHN0YXJ0IDwgc2l6ZSkge1xuICAgIHZhciBlbmQgPSBNYXRoLm1pbihzaXplLCBzdGFydCArIHRoaXMuX210dSk7XG4gICAgdmFyIGIgPSBibC5zbGljZShzdGFydCwgZW5kKTtcbiAgICB2YXIgY2h1bmsgPSB7XG4gICAgICBwYXlsb2FkOiBiXG4gICAgfVxuICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgICBzdGFydCA9IGVuZDtcbiAgfVxuICB1dGlsLmxvZygnQ3JlYXRlZCcsIGNodW5rcy5sZW5ndGgsICdjaHVua3MuJyk7XG4gIHJldHVybiBjaHVua3M7XG59O1xuXG4vLyBTZW5kcyBBQ0sgTiwgZXhwZWN0aW5nIE50aCBibG9iIGNodW5rIGZvciBtZXNzYWdlIElELlxuUmVsaWFibGUucHJvdG90eXBlLl9hY2sgPSBmdW5jdGlvbihpZCkge1xuICB2YXIgYWNrID0gdGhpcy5faW5jb21pbmdbaWRdLmFjaztcblxuICAvLyBpZiBhY2sgaXMgdGhlIGVuZCB2YWx1ZSwgdGhlbiBjYWxsIF9jb21wbGV0ZS5cbiAgaWYgKHRoaXMuX3JlY2VpdmVkW2lkXSA9PT0gYWNrWzJdKSB7XG4gICAgdGhpcy5fY29tcGxldGUoaWQpO1xuICAgIHRoaXMuX3JlY2VpdmVkW2lkXSA9IHRydWU7XG4gIH1cblxuICB0aGlzLl9oYW5kbGVTZW5kKGFjayk7XG59O1xuXG4vLyBDYWxjdWxhdGVzIHRoZSBuZXh0IEFDSyBudW1iZXIsIGdpdmVuIGNodW5rcy5cblJlbGlhYmxlLnByb3RvdHlwZS5fY2FsY3VsYXRlTmV4dEFjayA9IGZ1bmN0aW9uKGlkKSB7XG4gIHZhciBkYXRhID0gdGhpcy5faW5jb21pbmdbaWRdO1xuICB2YXIgY2h1bmtzID0gZGF0YS5jaHVua3M7XG4gIGZvciAodmFyIGkgPSAwLCBpaSA9IGNodW5rcy5sZW5ndGg7IGkgPCBpaTsgaSArPSAxKSB7XG4gICAgLy8gVGhpcyBjaHVuayBpcyBtaXNzaW5nISEhIEJldHRlciBBQ0sgZm9yIGl0LlxuICAgIGlmIChjaHVua3NbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGF0YS5hY2tbMl0gPSBpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBkYXRhLmFja1syXSA9IGNodW5rcy5sZW5ndGg7XG59O1xuXG4vLyBTZW5kcyB0aGUgbmV4dCB3aW5kb3cgb2YgY2h1bmtzLlxuUmVsaWFibGUucHJvdG90eXBlLl9zZW5kV2luZG93ZWRDaHVua3MgPSBmdW5jdGlvbihpZCkge1xuICB1dGlsLmxvZygnc2VuZFdpbmRvd2VkQ2h1bmtzIGZvcjogJywgaWQpO1xuICB2YXIgZGF0YSA9IHRoaXMuX291dGdvaW5nW2lkXTtcbiAgdmFyIGNoID0gZGF0YS5jaHVua3M7XG4gIHZhciBjaHVua3MgPSBbXTtcbiAgdmFyIGxpbWl0ID0gTWF0aC5taW4oZGF0YS5hY2sgKyB0aGlzLl93aW5kb3csIGNoLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSBkYXRhLmFjazsgaSA8IGxpbWl0OyBpICs9IDEpIHtcbiAgICBpZiAoIWNoW2ldLnNlbnQgfHwgaSA9PT0gZGF0YS5hY2spIHtcbiAgICAgIGNoW2ldLnNlbnQgPSB0cnVlO1xuICAgICAgY2h1bmtzLnB1c2goWydjaHVuaycsIGlkLCBpLCBjaFtpXS5wYXlsb2FkXSk7XG4gICAgfVxuICB9XG4gIGlmIChkYXRhLmFjayArIHRoaXMuX3dpbmRvdyA+PSBjaC5sZW5ndGgpIHtcbiAgICBjaHVua3MucHVzaChbJ2VuZCcsIGlkLCBjaC5sZW5ndGhdKVxuICB9XG4gIGNodW5rcy5fbXVsdGlwbGUgPSB0cnVlO1xuICB0aGlzLl9oYW5kbGVTZW5kKGNodW5rcyk7XG59O1xuXG4vLyBQdXRzIHRvZ2V0aGVyIGEgbWVzc2FnZSBmcm9tIGNodW5rcy5cblJlbGlhYmxlLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbihpZCkge1xuICB1dGlsLmxvZygnQ29tcGxldGVkIGNhbGxlZCBmb3InLCBpZCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGNodW5rcyA9IHRoaXMuX2luY29taW5nW2lkXS5jaHVua3M7XG4gIHZhciBibCA9IG5ldyBCbG9iKGNodW5rcyk7XG4gIHV0aWwuYmxvYlRvQXJyYXlCdWZmZXIoYmwsIGZ1bmN0aW9uKGFiKSB7XG4gICAgc2VsZi5vbm1lc3NhZ2UodXRpbC51bnBhY2soYWIpKTtcbiAgfSk7XG4gIGRlbGV0ZSB0aGlzLl9pbmNvbWluZ1tpZF07XG59O1xuXG4vLyBVcHMgYmFuZHdpZHRoIGxpbWl0IG9uIFNEUC4gTWVhbnQgdG8gYmUgY2FsbGVkIGR1cmluZyBvZmZlci9hbnN3ZXIuXG5SZWxpYWJsZS5oaWdoZXJCYW5kd2lkdGhTRFAgPSBmdW5jdGlvbihzZHApIHtcbiAgLy8gQVMgc3RhbmRzIGZvciBBcHBsaWNhdGlvbi1TcGVjaWZpYyBNYXhpbXVtLlxuICAvLyBCYW5kd2lkdGggbnVtYmVyIGlzIGluIGtpbG9iaXRzIC8gc2VjLlxuICAvLyBTZWUgUkZDIGZvciBtb3JlIGluZm86IGh0dHA6Ly93d3cuaWV0Zi5vcmcvcmZjL3JmYzIzMjcudHh0XG5cbiAgLy8gQ2hyb21lIDMxKyBkb2Vzbid0IHdhbnQgdXMgbXVuZ2luZyB0aGUgU0RQLCBzbyB3ZSdsbCBsZXQgdGhlbSBoYXZlIHRoZWlyXG4gIC8vIHdheS5cbiAgdmFyIHZlcnNpb24gPSBuYXZpZ2F0b3IuYXBwVmVyc2lvbi5tYXRjaCgvQ2hyb21lXFwvKC4qPykgLyk7XG4gIGlmICh2ZXJzaW9uKSB7XG4gICAgdmVyc2lvbiA9IHBhcnNlSW50KHZlcnNpb25bMV0uc3BsaXQoJy4nKS5zaGlmdCgpKTtcbiAgICBpZiAodmVyc2lvbiA8IDMxKSB7XG4gICAgICB2YXIgcGFydHMgPSBzZHAuc3BsaXQoJ2I9QVM6MzAnKTtcbiAgICAgIHZhciByZXBsYWNlID0gJ2I9QVM6MTAyNDAwJzsgLy8gMTAwIE1icHNcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybiBwYXJ0c1swXSArIHJlcGxhY2UgKyBwYXJ0c1sxXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2RwO1xufTtcblxuLy8gT3ZlcndyaXR0ZW4sIHR5cGljYWxseS5cblJlbGlhYmxlLnByb3RvdHlwZS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihtc2cpIHt9O1xuXG5tb2R1bGUuZXhwb3J0cy5SZWxpYWJsZSA9IFJlbGlhYmxlO1xuXG59LHtcIi4vdXRpbFwiOjE3fV0sMTc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIEJpbmFyeVBhY2sgPSByZXF1aXJlKCdqcy1iaW5hcnlwYWNrJyk7XG5cbnZhciB1dGlsID0ge1xuICBkZWJ1ZzogZmFsc2UsXG4gIFxuICBpbmhlcml0czogZnVuY3Rpb24oY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3I7XG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBleHRlbmQ6IGZ1bmN0aW9uKGRlc3QsIHNvdXJjZSkge1xuICAgIGZvcih2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYoc291cmNlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgZGVzdFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZXN0O1xuICB9LFxuICBwYWNrOiBCaW5hcnlQYWNrLnBhY2ssXG4gIHVucGFjazogQmluYXJ5UGFjay51bnBhY2ssXG4gIFxuICBsb2c6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodXRpbC5kZWJ1Zykge1xuICAgICAgdmFyIGNvcHkgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvcHlbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICB9XG4gICAgICBjb3B5LnVuc2hpZnQoJ1JlbGlhYmxlOiAnKTtcbiAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGNvcHkpO1xuICAgIH1cbiAgfSxcblxuICBzZXRaZXJvVGltZW91dDogKGZ1bmN0aW9uKGdsb2JhbCkge1xuICAgIHZhciB0aW1lb3V0cyA9IFtdO1xuICAgIHZhciBtZXNzYWdlTmFtZSA9ICd6ZXJvLXRpbWVvdXQtbWVzc2FnZSc7XG5cbiAgICAvLyBMaWtlIHNldFRpbWVvdXQsIGJ1dCBvbmx5IHRha2VzIGEgZnVuY3Rpb24gYXJndW1lbnQuXHQgVGhlcmUnc1xuICAgIC8vIG5vIHRpbWUgYXJndW1lbnQgKGFsd2F5cyB6ZXJvKSBhbmQgbm8gYXJndW1lbnRzICh5b3UgaGF2ZSB0b1xuICAgIC8vIHVzZSBhIGNsb3N1cmUpLlxuICAgIGZ1bmN0aW9uIHNldFplcm9UaW1lb3V0UG9zdE1lc3NhZ2UoZm4pIHtcbiAgICAgIHRpbWVvdXRzLnB1c2goZm4pO1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VOYW1lLCAnKicpO1xuICAgIH1cdFx0XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuc291cmNlID09IGdsb2JhbCAmJiBldmVudC5kYXRhID09IG1lc3NhZ2VOYW1lKSB7XG4gICAgICAgIGlmIChldmVudC5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZW91dHMubGVuZ3RoKSB7XG4gICAgICAgICAgdGltZW91dHMuc2hpZnQoKSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5hdHRhY2hFdmVudCkge1xuICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KCdvbm1lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIHNldFplcm9UaW1lb3V0UG9zdE1lc3NhZ2U7XG4gIH0odGhpcykpLFxuICBcbiAgYmxvYlRvQXJyYXlCdWZmZXI6IGZ1bmN0aW9uKGJsb2IsIGNiKXtcbiAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgY2IoZXZ0LnRhcmdldC5yZXN1bHQpO1xuICAgIH07XG4gICAgZnIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYik7XG4gIH0sXG4gIGJsb2JUb0JpbmFyeVN0cmluZzogZnVuY3Rpb24oYmxvYiwgY2Ipe1xuICAgIHZhciBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgZnIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBjYihldnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgfTtcbiAgICBmci5yZWFkQXNCaW5hcnlTdHJpbmcoYmxvYik7XG4gIH0sXG4gIGJpbmFyeVN0cmluZ1RvQXJyYXlCdWZmZXI6IGZ1bmN0aW9uKGJpbmFyeSkge1xuICAgIHZhciBieXRlQXJyYXkgPSBuZXcgVWludDhBcnJheShiaW5hcnkubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJpbmFyeS5sZW5ndGg7IGkrKykge1xuICAgICAgYnl0ZUFycmF5W2ldID0gYmluYXJ5LmNoYXJDb2RlQXQoaSkgJiAweGZmO1xuICAgIH1cbiAgICByZXR1cm4gYnl0ZUFycmF5LmJ1ZmZlcjtcbiAgfSxcbiAgcmFuZG9tVG9rZW46IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWw7XG5cbn0se1wianMtYmluYXJ5cGFja1wiOjE0fV19LHt9LFs0LDJdKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==