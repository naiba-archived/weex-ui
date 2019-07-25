// { "framework": "Vue" }

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["npm/weex-ui/index"] = factory();
	else
		root["npm/weex-ui/index"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(293)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/'+'*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/'+'*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */"
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                                * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
                                                                                                                                                                                                                                                                                * Created by Tw93 on 17/11/01
                                                                                                                                                                                                                                                                                */

var _urlParse = __webpack_require__(158);

var _urlParse2 = _interopRequireDefault(_urlParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Utils = {
  UrlParser: _urlParse2.default,
  _typeof: function _typeof(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  },
  isPlainObject: function isPlainObject(obj) {
    return Utils._typeof(obj) === 'object';
  },
  isString: function isString(obj) {
    return typeof obj === 'string';
  },
  isNonEmptyArray: function isNonEmptyArray() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
  },
  isObject: function isObject(item) {
    return item && (typeof item === 'undefined' ? 'undefined' : _typeof2(item)) === 'object' && !Array.isArray(item);
  },
  isEmptyObject: function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },
  decodeIconFont: function decodeIconFont(text) {
    // 正则匹配 图标和文字混排 eg: 我去上学校&#xe600;,天天不&#xe600;迟到
    var regExp = /&#x[a-z|0-9]{4,5};?/g;
    if (regExp.test(text)) {
      return text.replace(new RegExp(regExp, 'g'), function (iconText) {
        var replace = iconText.replace(/&#x/, '0x').replace(/;$/, '');
        return String.fromCharCode(replace);
      });
    } else {
      return text;
    }
  },
  mergeDeep: function mergeDeep(target) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    if (!sources.length) return target;
    var source = sources.shift();
    if (Utils.isObject(target) && Utils.isObject(source)) {
      for (var key in source) {
        if (Utils.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, _defineProperty({}, key, {}));
          }
          Utils.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, _defineProperty({}, key, source[key]));
        }
      }
    }
    return Utils.mergeDeep.apply(Utils, [target].concat(sources));
  },
  appendProtocol: function appendProtocol(url) {
    if (/^\/\//.test(url)) {
      var bundleUrl = weex.config.bundleUrl;

      return 'http' + (/^https:/.test(bundleUrl) ? 's' : '') + ':' + url;
    }
    return url;
  },
  encodeURLParams: function encodeURLParams(url) {
    var parsedUrl = new _urlParse2.default(url, true);
    return parsedUrl.toString();
  },
  goToH5Page: function goToH5Page(jumpUrl) {
    var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var Navigator = weex.requireModule('navigator');
    var jumpUrlObj = new Utils.UrlParser(jumpUrl, true);
    var url = Utils.appendProtocol(jumpUrlObj.toString());
    Navigator.push({
      url: Utils.encodeURLParams(url),
      animated: animated.toString()
    }, callback);
  },

  env: {
    isTaobao: function isTaobao() {
      var appName = weex.config.env.appName;

      return (/(tb|taobao|淘宝)/i.test(appName)
      );
    },
    isTrip: function isTrip() {
      var appName = weex.config.env.appName;

      return appName === 'LX';
    },
    isBoat: function isBoat() {
      var appName = weex.config.env.appName;

      return appName === 'Boat' || appName === 'BoatPlayground';
    },
    isWeb: function isWeb() {
      var platform = weex.config.env.platform;

      return (typeof window === 'undefined' ? 'undefined' : _typeof2(window)) === 'object' && platform.toLowerCase() === 'web';
    },
    isIOS: function isIOS() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'ios';
    },

    /**
     * 是否为 iPhone X or iPhoneXS or iPhoneXR or iPhoneXS Max
     * @returns {boolean}
     */
    isIPhoneX: function isIPhoneX() {
      var deviceHeight = weex.config.env.deviceHeight;

      if (Utils.env.isWeb()) {
        return (typeof window === 'undefined' ? 'undefined' : _typeof2(window)) !== undefined && window.screen && window.screen.width && window.screen.height && (parseInt(window.screen.width, 10) === 375 && parseInt(window.screen.height, 10) === 812 || parseInt(window.screen.width, 10) === 414 && parseInt(window.screen.height, 10) === 896);
      }
      return Utils.env.isIOS() && (deviceHeight === 2436 || deviceHeight === 2688 || deviceHeight === 1792 || deviceHeight === 1624);
    },
    isAndroid: function isAndroid() {
      var platform = weex.config.env.platform;

      return platform.toLowerCase() === 'android';
    },
    isAlipay: function isAlipay() {
      var appName = weex.config.env.appName;

      return appName === 'AP';
    },
    isTmall: function isTmall() {
      var appName = weex.config.env.appName;

      return (/(tm|tmall|天猫)/i.test(appName)
      );
    },
    isAliWeex: function isAliWeex() {
      return Utils.env.isTmall() || Utils.env.isTrip() || Utils.env.isTaobao();
    },

    /**
     * 获取weex屏幕真实的设置高度，需要减去导航栏高度
     * @returns {Number}
     */
    getPageHeight: function getPageHeight() {
      var env = weex.config.env;

      var navHeight = Utils.env.isWeb() ? 0 : Utils.env.isIPhoneX() ? 176 : 132;
      return env.deviceHeight / env.deviceWidth * 750 - navHeight;
    },

    /**
     * 获取weex屏幕真实的设置高度
     * @returns {Number}
     */
    getScreenHeight: function getScreenHeight() {
      var env = weex.config.env;

      return env.deviceHeight / env.deviceWidth * 750;
    }
  },

  /**
   * 版本号比较
   * @memberOf Utils
   * @param currVer {string}
   * @param promoteVer {string}
   * @returns {boolean}
   * @example
   *
   * const { Utils } = require('@ali/wx-bridge');
   * const { compareVersion } = Utils;
   * console.log(compareVersion('0.1.100', '0.1.11')); // 'true'
   */
  compareVersion: function compareVersion() {
    var currVer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0.0.0';
    var promoteVer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0.0.0';

    if (currVer === promoteVer) return true;
    var currVerArr = currVer.split('.');
    var promoteVerArr = promoteVer.split('.');
    var len = Math.max(currVerArr.length, promoteVerArr.length);
    for (var i = 0; i < len; i++) {
      var proVal = ~~promoteVerArr[i];
      var curVal = ~~currVerArr[i];
      if (proVal < curVal) {
        return true;
      } else if (proVal > curVal) {
        return false;
      }
    }
    return false;
  },

  /**
   * 分割数组
   * @param arr 被分割数组
   * @param size 分割数组的长度
   * @returns {Array}
   */
  arrayChunk: function arrayChunk() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

    var groups = [];
    if (arr && arr.length > 0) {
      groups = arr.map(function (e, i) {
        return i % size === 0 ? arr.slice(i, i + size) : null;
      }).filter(function (e) {
        return e;
      });
    }
    return groups;
  },

  /*
   * 截断字符串
   * @param str 传入字符串
   * @param len 截断长度
   * @param hasDot 末尾是否...
   * @returns {String}
   */
  truncateString: function truncateString(str, len) {
    var hasDot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var newLength = 0;
    var newStr = '';
    var singleChar = '';
    var chineseRegex = /[^\x00-\xff]/g;
    var strLength = str.replace(chineseRegex, '**').length;
    for (var i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) !== null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (hasDot && strLength > len) {
      newStr += '...';
    }
    return newStr;
  },

  /*
   * 转换 obj 为 url params参数
   * @param obj 传入字符串
   * @returns {String}
   */
  objToParams: function objToParams(obj) {
    var str = "";
    for (var key in obj) {
      if (str !== "") {
        str += "&";
      }
      str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
  },

  /*
   * 转换 url params参数为obj
   * @param str 传入url参数字符串
   * @returns {Object}
   */
  paramsToObj: function paramsToObj(str) {
    var obj = {};
    try {
      obj = JSON.parse('{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    } catch (e) {
      console.log(e);
    }
    return obj;
  },

  animation: {
    /**
     * 返回定义页面转场动画起初的位置
     * @param ref
     * @param transform 运动类型
     * @param status
     * @param callback 回调函数
     */
    pageTransitionAnimation: function pageTransitionAnimation(ref, transform, status, callback) {
      var animation = weex.requireModule('animation');
      animation.transition(ref, {
        styles: {
          transform: transform
        },
        duration: status ? 250 : 300, // ms
        timingFunction: status ? 'ease-in' : 'ease-out',
        delay: 0 // ms
      }, function () {
        callback && callback();
      });
    }
  },
  uiStyle: {
    /**
     * 返回定义页面转场动画起初的位置
     * @param animationType 页面转场动画的类型 push，model
     * @param size 分割数组的长度
     * @returns {}
     */
    pageTransitionAnimationStyle: function pageTransitionAnimationStyle(animationType) {
      if (animationType === 'push') {
        return {
          left: '750px',
          top: '0px',
          height: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px'
        };
      } else if (animationType === 'model') {
        return {
          top: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px',
          left: '0px',
          height: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px'
        };
      }
      return {};
    }
  }
};

exports.default = Utils;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


  ;(function(fn) {
    if (true) {
      module.exports = fn();
    } else if (typeof define === "function") {
      define("index", function(require, exports, module){
        module.exports = fn();
      });
    } else {
      var root;
      if (typeof window !== "undefined") {
        root = window;
      } else if (typeof self !== "undefined") {
        root = self;
      } else if (typeof global !== "undefined") {
        root = global;
      } else {
        // NOTICE: In JavaScript strict mode, this is null
        root = this;
      }
      root["index"] = fn();
    }
  })(function(){
    return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 Copyright 2018 Alibaba Group

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _bindingxParser = __webpack_require__(1);

var isWeb = false;
var isWeex = true;

function requireModule(moduleName) {
  try {
    if ((typeof weex === 'undefined' ? 'undefined' : _typeof(weex)) !== undefined && weex.requireModule) {
      // eslint-disable-line
      return weex.requireModule(moduleName); // eslint-disable-line
    }
  } catch (err) {}
  return window.require('@weex-module/' + moduleName);
}

var isSupportNewBinding = true;
var isSupportBinding = true;
var WeexBinding = void 0;
var WebBinding = {};

try {
  WeexBinding = requireModule('bindingx');
  isSupportNewBinding = true;
} catch (e) {
  isSupportNewBinding = false;
}
if (!WeexBinding || !WeexBinding.bind) {
  try {
    WeexBinding = requireModule('binding');
    isSupportNewBinding = true;
  } catch (e) {
    isSupportNewBinding = false;
  }
}
isSupportNewBinding = !!(WeexBinding && WeexBinding.bind && WeexBinding.unbind);
if (!isSupportNewBinding) {
  try {
    WeexBinding = requireModule('expressionBinding');
    isSupportBinding = true;
  } catch (err) {
    isSupportBinding = false;
  }
}
isSupportBinding = !!(WeexBinding && (WeexBinding.bind || WeexBinding.createBinding));


function formatExpression(expression) {
  if (expression === undefined) return;
  try {
    expression = JSON.parse(expression);
  } catch (err) {}
  var resultExpression = {};
  if (typeof expression === 'string') {
    resultExpression.origin = expression;
  } else if (expression) {
    resultExpression.origin = expression.origin;
    resultExpression.transformed = expression.transformed;
  }
  if (!resultExpression.transformed && !resultExpression.origin) return;
  resultExpression.transformed = resultExpression.transformed || (0, _bindingxParser.parse)(resultExpression.origin);
  return resultExpression;
}

// 统一回调参数
function fixCallback(callback) {
  return function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (typeof callback === 'function') {
      return callback({
        state: params.state === 'end' ? 'exit' : params.state,
        t: params.t !== undefined ? params.t : params.deltaT
      });
    }
  };
}

exports.default = {
  // 是否支持新版本的binding
  isSupportNewBinding: isSupportNewBinding,
  // 是否支持binding
  isSupportBinding: isSupportBinding,
  _bindingInstances: [],
  /**
   * 绑定
   * @param options 参数
   * @example
   {
     anchor:blockRef,
     eventType:'pan',
     props: [
     {
       element:blockRef,
       property:'transform.translateX',
       expression:{
         origin:"x+1",
         transformed:"{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":1}]}"
       }
     }
    ]
   }
   */
  bind: function bind(options) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    if (!options) {
      throw new Error('should pass options for binding');
    }

    options.exitExpression = formatExpression(options.exitExpression);

    if (options.props) {
      options.props.forEach(function (prop) {
        prop.expression = formatExpression(prop.expression);
      });
    }

    if (WeexBinding && isSupportBinding) {
      if (isSupportNewBinding) {
        return WeexBinding.bind(options, options && options.eventType === 'timing' ? fixCallback(callback) : callback);
      } else {
        WeexBinding.enableBinding(options.anchor, options.eventType);
        // 处理expression的参数格式
        var expressionArgs = options.props.map(function (prop) {
          return {
            element: prop.element,
            property: prop.property,
            expression: prop.expression.transformed
          };
        });
        WeexBinding.createBinding(options.anchor, options.eventType, '', expressionArgs, callback);
      }
    }
  },

  /**
   *  @param {object} options
   *  @example
   *  {eventType:'pan',
   *   token:self.gesToken}
   */
  unbind: function unbind(options) {
    if (!options) {
      throw new Error('should pass options for binding');
    }

    if (WeexBinding && isSupportBinding) {
      if (isSupportNewBinding) {
        return WeexBinding.unbind(options);
      } else {
        return WeexBinding.disableBinding(options.anchor, options.eventType);
      }
    }
  },
  unbindAll: function unbindAll() {
    if (WeexBinding && isSupportBinding) {
      if (isSupportNewBinding) {
        return WeexBinding.unbindAll();
      } else {
        return WeexBinding.disableAll();
      }
    }
  },
  prepare: function prepare(options) {
    if (WeexBinding && isSupportBinding) {
      if (isSupportNewBinding) {
        return WeexBinding.prepare(options);
      } else {
        return WeexBinding.enableBinding(options.anchor, options.eventType);
      }
    }
  },
  getComputedStyle: function getComputedStyle(el) {
    if (isSupportNewBinding) {
      return WeexBinding.getComputedStyle(el);
    } else {
      return {};
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lex = {
  InputElementDiv: '<WhiteSpace>|<LineTerminator>|<ReservedWord>|<Identifier>|<NumericLiteral>|<Punctuator>|<StringLiteral>',
  InputElementRegExp: '<WhiteSpace>|<LineTerminator>|<ReservedWord>|<Identifier>|<NumericLiteral>|<Punctuator>|<StringLiteral>',
  ReservedWord: '<Keyword>|<NullLiteral>|<BooleanLiteral>',
  WhiteSpace: /[\t\v\f\u0020\u00A0\u1680\u180E\u2000-\u200A\u202F\u205f\u3000\uFEFF]/,
  LineTerminator: /[\n\r\u2028\u2029]/,
  Keyword: /new(?![_$a-zA-Z0-9])|void(?![_$a-zA-Z0-9])|delete(?![_$a-zA-Z0-9])|in(?![_$a-zA-Z0-9])|instanceof(?![_$a-zA-Z0-9])|typeof(?![_$a-zA-Z0-9])/,
  NullLiteral: /null(?![_$a-zA-Z0-9])/,
  BooleanLiteral: /(?:true|false)(?![_$a-zA-Z0-9])/,
  Identifier: /[_$a-zA-Z][_$a-zA-Z0-9]*/,
  Punctuator: /\/|=>|\*\*|>>>=|>>=|<<=|===|!==|>>>|<<|%=|\*=|-=|\+=|<=|>=|==|!=|\^=|\|=|\|\||&&|&=|>>|\+\+|--|\:|}|\*|&|\||\^|!|~|-|\+|\?|%|=|>|<|,|;|\.(?![0-9])|\]|\[|\)|\(|{/,
  DivPunctuator: /\/=|\//,
  NumericLiteral: /(?:0[xX][0-9a-fA-F]*|\.[0-9]+|(?:[1-9]+[0-9]*|0)(?:\.[0-9]*|\.)?)(?:[eE][+-]{0,1}[0-9]+)?(?![_$a-zA-Z0-9])/,
  StringLiteral: /"(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*"|'(?:[^'\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*'/,
  RegularExpressionLiteral: /\/(?:\[(?:\\[\s\S]|[^\]])*\]|[^*\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])(?:\[(?:\\[\s\S]|[^\]])*\]|[^\/\\\n\r\u2028\u2029]|\\[^\n\r\u2028\u2029])*\/[0-9a-zA-Z]*/
};

function XRegExp(xregexps, rootname, flag) {
  var expnames = [rootname];

  function buildRegExp(source) {
    var regexp = new RegExp;
    regexp.compile(source.replace(/<([^>]+)>/g,
      function (all, expname) {
        if (!xregexps[expname])
          return '';
        expnames.push(expname);
        if (xregexps[expname] instanceof RegExp)
          return '(' + xregexps[expname].source + ')';
        return '(' + buildRegExp(xregexps[expname]).source + ')';
      }), flag);
    return regexp;
  }

  var regexp = buildRegExp(xregexps[rootname]);
  this.exec = function (string) {
    var matches = regexp.exec(string);
    if (matches == null)
      return null;
    var result = new String(matches[0]);
    for (var i = 0; i < expnames.length; i++)
      if (matches[i])
        result[expnames[i]] = matches[i];
    return result;
  };
  Object.defineProperty(this, 'lastIndex',
    {
      'get': function () {
        return regexp.lastIndex;
      },
      'set': function (v) {
        regexp.lastIndex = v;
      }
    });
}

function LexicalParser() {
  var inputElementDiv = new XRegExp(lex, 'InputElementDiv', 'g');
  var inputElementRegExp = new XRegExp(lex, 'InputElementRegExp', 'g');
  var source;
  Object.defineProperty(this, 'source', {
    'get': function () {
      return source;
    },
    'set': function (v) {
      source = v;
      inputElementDiv.lastIndex = 0;
      inputElementRegExp.lastIndex = 0;
    }
  });
  this.reset = function () {
    inputElementDiv.lastIndex = 0;
    inputElementRegExp.lastIndex = 0;
  };
  this.getNextToken = function (useDiv) {
    var lastIndex = inputElementDiv.lastIndex;
    var inputElement;
    if (useDiv)
      inputElement = inputElementDiv;
    else
      inputElement = inputElementRegExp;
    var token = inputElement.exec(source);
    if (token && inputElement.lastIndex - lastIndex > token.length) {
      throw new SyntaxError('Unexpected token ILLEGAL');
    }
    inputElementDiv.lastIndex = inputElement.lastIndex;
    inputElementRegExp.lastIndex = inputElement.lastIndex;
    return token;
  };
}

var rules = {
  'IdentifierName': [['Identifier']],
  'Literal': [['NullLiteral'], ['BooleanLiteral'], ['NumericLiteral'], ['StringLiteral'], ['RegularExpressionLiteral']],
  'PrimaryExpression': [['Identifier'], ['Literal'], ['(', 'Expression', ')']],
  'CallExpression': [['PrimaryExpression', 'Arguments'], ['CallExpression', 'Arguments']],
  'Arguments': [['(', ')'], ['(', 'ArgumentList', ')']],
  'ArgumentList': [['ConditionalExpression'], ['ArgumentList', ',', 'ConditionalExpression']],
  'LeftHandSideExpression': [['PrimaryExpression'], ['CallExpression']],
  'UnaryExpression': [['LeftHandSideExpression'], ['void', 'UnaryExpression'], ['+', 'UnaryExpression'], ['-', 'UnaryExpression'], ['~', 'UnaryExpression'], ['!', 'UnaryExpression']],
  'ExponentiationExpression': [['UnaryExpression'], ['ExponentiationExpression', '**', 'UnaryExpression']],
  'MultiplicativeExpression': [['MultiplicativeExpression', '/', 'ExponentiationExpression'], ['ExponentiationExpression'], ['MultiplicativeExpression', '*', 'ExponentiationExpression'], ['MultiplicativeExpression', '%', 'ExponentiationExpression']],
  'AdditiveExpression': [['MultiplicativeExpression'], ['AdditiveExpression', '+', 'MultiplicativeExpression'], ['AdditiveExpression', '-', 'MultiplicativeExpression']],
  'ShiftExpression': [['AdditiveExpression'], ['ShiftExpression', '<<', 'AdditiveExpression'], ['ShiftExpression', '>>', 'AdditiveExpression'], ['ShiftExpression', '>>>', 'AdditiveExpression']],
  'RelationalExpression': [['ShiftExpression'], ['RelationalExpression', '<', 'ShiftExpression'], ['RelationalExpression', '>', 'ShiftExpression'], ['RelationalExpression', '<=', 'ShiftExpression'], ['RelationalExpression', '>=', 'ShiftExpression'], ['RelationalExpression', 'instanceof', 'ShiftExpression'], ['RelationalExpression', 'in', 'ShiftExpression']],
  'EqualityExpression': [['RelationalExpression'], ['EqualityExpression', '==', 'RelationalExpression'], ['EqualityExpression', '!=', 'RelationalExpression'], ['EqualityExpression', '===', 'RelationalExpression'], ['EqualityExpression', '!==', 'RelationalExpression']],
  'BitwiseANDExpression': [['EqualityExpression'], ['BitwiseANDExpression', '&', 'EqualityExpression']],
  'BitwiseXORExpression': [['BitwiseANDExpression'], ['BitwiseXORExpression', '^', 'BitwiseANDExpression']],
  'BitwiseORExpression': [['BitwiseXORExpression'], ['BitwiseORExpression', '|', 'BitwiseXORExpression']],
  'LogicalANDExpression': [['BitwiseORExpression'], ['LogicalANDExpression', '&&', 'BitwiseORExpression']],
  'LogicalORExpression': [['LogicalANDExpression'], ['LogicalORExpression', '||', 'LogicalANDExpression']],
  'ConditionalExpression': [['LogicalORExpression'], ['LogicalORExpression', '?', 'LogicalORExpression', ':', 'LogicalORExpression']],
  'Expression': [['ConditionalExpression'], ['Expression', ',', 'ConditionalExpression']],
  'Program': [['Expression']]

};

function Symbol(symbolName, token) {
  this.name = symbolName;
  this.token = token;
  this.childNodes = [];
  this.toString = function (indent) {
    if (!indent)
      indent = '';
    if (this.childNodes.length == 1)
      return this.childNodes[0].toString(indent);
    var str = indent + this.name + (this.token != undefined && this.name != this.token ? ':' + this.token : '') + '\n';
    for (var i = 0; i < this.childNodes.length; i++)
      str += this.childNodes[i].toString(indent + '    ');
    return str;
  };
}

function SyntacticalParser() {
  var currentRule;
  var root = {
    Program: '$'
  };
  var hash = {};

  function closureNode(node) {

    hash[JSON.stringify(node)] = node;

    var queue = Object.getOwnPropertyNames(node);
    while (queue.length) {
      var symbolName = queue.shift();
      if (!rules[symbolName])
        continue;
      rules[symbolName].forEach(function (rule) {
        if (!node[rule[0]])
          queue.push(rule[0]);
        var rulenode = node;
        var lastnode = null;
        rule.forEach(function (symbol) {
          if (!rulenode[symbol])
            rulenode[symbol] = {};
          lastnode = rulenode;
          rulenode = rulenode[symbol];
        });
        if (node[symbolName].$div)
          rulenode.$div = true;
        rulenode.$reduce = symbolName;
        rulenode.$count = rule.length;
      });
    }

    for (var p in node) {
      if (typeof node[p] != 'object' || p.charAt(0) == '$' || node[p].$closure)
        continue;
      if (hash[JSON.stringify(node[p])])
        node[p] = hash[JSON.stringify(node[p])];
      else {
        closureNode(node[p]);
      }
    }
    node.$closure = true;
  }

  closureNode(root);
  var symbolStack = [];
  var statusStack = [root];
  var current = root;
  this.insertSymbol = function insertSymbol(symbol, haveLineTerminator) {
    while (!current[symbol.name] && current.$reduce) {
      var count = current.$count;
      var newsymbol = new Symbol(current.$reduce);
      while (count--)
        newsymbol.childNodes.push(symbolStack.pop()), statusStack.pop();
      current = statusStack[statusStack.length - 1];
      this.insertSymbol(newsymbol);
    }
    current = current[symbol.name];
    symbolStack.push(symbol), statusStack.push(current);
    if (!current)
      throw new Error();
    return current.$div;
  };
  this.reset = function () {
    current = root;
    symbolStack = [];
    statusStack = [root];
  };
  Object.defineProperty(this, 'grammarTree', {
    'get': function () {
      try {
        while (current.$reduce) {
          var count = current.$count;
          var newsymbol = new Symbol(current.$reduce);
          while (count--)
            newsymbol.childNodes.push(symbolStack.pop()), statusStack.pop();
          current = statusStack[statusStack.length - 1];
          this.insertSymbol(newsymbol);
        }
        if (symbolStack.length > 0 && current[';']) {
          this.insertSymbol(new Symbol(';', ';'));
          return this.grammarTree;
        }
        if (symbolStack.length != 1 || symbolStack[0].name != 'Program')
          throw new Error();
      } catch (e) {
        throw new SyntaxError('Unexpected end of input');
      }
      return symbolStack[0];
    }
  });
}

function Parser() {
  this.lexicalParser = new LexicalParser();
  this.syntacticalParser = new SyntacticalParser();
  var terminalSymbols = ['NullLiteral', 'BooleanLiteral', 'NumericLiteral', 'StringLiteral', 'RegularExpressionLiteral', 'Identifier', '**', '=>', '{', '}', '(', ')', '[', ']', '.', ';', ',', '<', '>', '<=', '>=', '==', '!=', '===', '!==', '+', '-', '*', '%', '++', '--', '<<', '>>', '>>>', '&', '|', '^', '!', '~', '&&', '||', '?', ':', '=', '+=', '-=', '*=', '%=', '<<=', '>>=', '>>>=', '&=', '|=', '^=', '/', '/=', 'instanceof', 'typeof', 'new', 'void', 'debugger', 'this', 'delete', 'in'];
  var terminalSymbolIndex = {};
  terminalSymbols.forEach(function (e) {
    Object.defineProperty(terminalSymbolIndex, e, {});
  });
  this.reset = function () {
    this.lexicalParser.reset();
    this.syntacticalParser.reset();
  };
  this.parse = function (source, onInputElement) {
    var token;
    var haveLineTerminator = false;
    this.lexicalParser.source = source;
    var useDiv = false;
    while (token = this.lexicalParser.getNextToken(useDiv)) {
      if (onInputElement)
        onInputElement(token);
      try {
        if (Object.getOwnPropertyNames(token).some(
            (e) => {
              if (terminalSymbolIndex.hasOwnProperty(e)) {
                useDiv = this.syntacticalParser.insertSymbol(new Symbol(e, token), haveLineTerminator);
                haveLineTerminator = false;
                return true;
              } else
                return false;
            }))
          continue;
        if ((token.Keyword || token.Punctuator || token.DivPunctuator) && terminalSymbolIndex.hasOwnProperty(token.toString())) {
          useDiv = this.syntacticalParser.insertSymbol(new Symbol(token.toString(), token), haveLineTerminator);
        }
      } catch (e) {
        throw new SyntaxError('Unexpected token ' + token);
      }
    }
    return this.syntacticalParser.grammarTree;
  };
}

var parser = new Parser();

function JavaScriptExpression(text) {
  parser.reset();
  this.tree = (parser.parse(text));
  this.paths = [];
  var context = Object.create(null);
  var me = this;
  var pathIndex = Object.create(null);
  this.isSimple;
  this.isConst;
  walk(this.tree);
  checkSimple(this.tree);
  if (this.paths.length === 0) {
    this.isConst = true;
  }
  this.setter = function (path) {
    var curr = context;
    for (var i = 0; i < path.length - 1; i++) {
      if (!curr[path[i]])
        curr[path[i]] = Object.create(null);
      curr = curr[path[i]];
    }
    return {
      isCompleted: function () {
        for (var p in pathIndex)
          if (!pathIndex[p])
            return false;
        return true;
      },
      set: function (value) {
        if (!pathIndex[path.join('.')]) {
          pathIndex[path.join('.')] = true;
        }
        curr[path[i]] = (value);
        if (this.isCompleted()) {
          return me.exec();
        } else {
          return undefined;
        }
      }
    };
  };

  this.valueOf = this.exec = function () {
    try {
      return function () {
        return eval(text);
      }.call(context);
    } catch (e) {
    }
  };

  function checkSimple(symbol) {

    var curr = symbol;
    while (curr.childNodes.length <= 1 && curr.name !== 'MemberExpression') {
      curr = curr.childNodes[0];
    }
    // TODO: need to point out "[……]"
    if (curr.name === 'MemberExpression') {
      me.isSimple = true;
    } else {
      me.isSimple = false;
    }
  }

  function walk(symbol) {
    if (symbol.name === 'CallExpression' && symbol.childNodes[symbol.childNodes.length - 1].name !== 'CallExpression') {
      var path = getPath(symbol.childNodes[1]);
      walk(symbol.childNodes[0]);
    } else if (symbol.name === 'NewExpression' && symbol.childNodes.length === 1) {
      var path = getPath(symbol.childNodes[0]);
    } else if (symbol.name === 'MemberExpression' && symbol.childNodes.length === 1) {
      var path = getPath(symbol);
    } else {
      for (var i = 0; i < symbol.childNodes.length; i++)
        walk(symbol.childNodes[i]);
    }

  }


  function getPath(symbol) {
    // [["PrimaryExpression"], ["MemberExpression", "[", "Expression", "]"], ["MemberExpression", ".", "IdentifierName"], ["new", "MemberExpression", "Arguments"]],

    if (symbol.childNodes[0].name === 'IdentifierName') { // MemberExpression : MemberExpression "." IdentifierName
      var path = getPath(symbol.childNodes[2]);
      if (path)
        path = path.concat(symbol.childNodes[0].childNodes[0].token.toString());
      createPath(path);
      return path;

    } else if (symbol.childNodes[0].name === 'PrimaryExpression') { // MemberExpression : PrimaryExpression
      if (symbol.childNodes[0].childNodes[0].name === 'Identifier') {
        var path = [symbol.childNodes[0].childNodes[0].token.toString()];
        createPath(path);
        return path;
      } else {
        return null;
      }
    } else if (symbol.childNodes[0].name === ']') { // MemberExpression : MemberExpression "[" Expression "]"
      getPath(symbol.childNodes[3]);
      walk(symbol.childNodes[1]);
      return null;

    } else if (symbol.childNodes[0].name === 'Arguments') { // MemberExpression : "new" MemberExpression Arguments
      walk(symbol.childNodes[0]);
      walk(symbol.childNodes[1]);
      return null;
    } else {
      for (var i = 0; i < symbol.childNodes.length; i++)
        walk(symbol.childNodes[i]);
    }
  }


  function createPath(path) {
    var curr = context;
    for (var i = 0; i < path.length - 1; i++) {
      if (!curr[path[i]])
        curr[path[i]] = Object.create(null);
      curr = curr[path[i]];
    }
    me.paths.push(path);
    pathIndex[path.join('.')] = false;
  }
}

function visit(tree) {
  var childNodes = tree.childNodes.slice().reverse();
  var children = childNodes.filter(e =>
    !e.token || !e.token.Punctuator);
  if (tree.name === 'UnaryExpression') {
    // negative number support
    if (childNodes.length === 2 && childNodes[0].name === '-' && children.length === 1) {
      var res = visit(children[0]);
      res.value = -res.value;
      return res;
    }
  }

  if (tree.name === 'Arguments') {
    var argumentList = [];
    var listNode = children[0];
    while (listNode) {
      if (listNode.childNodes.length === 3) {
        argumentList.unshift(listNode.childNodes[0]);
        listNode = listNode.childNodes[2];
      }
      if (listNode.childNodes.length === 1) {
        argumentList.unshift(listNode.childNodes[0]);
        listNode = null;
      }
    }
    return {
      type: 'Arguments',
      children: argumentList.map(e => visit(e))
    };
  }


  if (children && children.length === 1) {
    var res = visit(children[0]);
    return res;
  }

  if (tree.token && ['NullLiteral', 'BooleanLiteral', 'NumericLiteral', 'StringLiteral', 'Identifier'].some(e => tree.token[e])) {
    var type = Object.keys(tree.token).filter(e => e.match(/Literal/) || e.match(/Identifier/))[0];
    var value = {
      'NullLiteral': null,
      'BooleanLiteral': Boolean(tree.token),
      'NumericLiteral': Number(tree.token),
      'StringLiteral': tree.token,
      'Identifier': tree.token,
    }[type];

    return {
      type: type,
      value: value
    };
  }

  if (tree.name === 'CallExpression')
    return {
      type: 'CallExpression',
      children: [visit(childNodes[0]), visit(childNodes[1])]
    };

  return {
    type: childNodes.filter(e => e.token && e.token.Punctuator)[0].name,
    children: childNodes.filter(e => !e.token || !e.token.Punctuator).map(e => visit(e))
  };
}

function parse(originExp) {
  let exp = new JavaScriptExpression(originExp);
  return JSON.stringify(visit(exp.tree), null);
}

module.exports = {
  parse: parse
};

/***/ })
/******/ ])});;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _indexWeex = __webpack_require__(4);

var _indexWeex2 = _interopRequireDefault(_indexWeex);

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 18/03/22
 */
var BindEnv = {
  supportsEB: function supportsEB() {
    return _indexWeex2.default.isSupportBinding && !_index2.default.env.isWeb();
  },


  /**
   * 判断Android容器是否支持是否支持expressionBinding(处理方式很不一致)
   * @returns {boolean}
   */
  supportsEBForAndroid: function supportsEBForAndroid() {
    return _index2.default.env.isAndroid() && BindEnv.supportsEB();
  },


  /**
   * 判断IOS容器是否支持是否支持expressionBinding
   * @returns {boolean}
   */
  supportsEBForIos: function supportsEBForIos() {
    return _index2.default.env.isIOS() && BindEnv.supportsEB();
  }
};

exports.default = BindEnv;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(178);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(160);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(278)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(130),
  /* template */
  __webpack_require__(234),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-72879af8",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-text.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] wxc-rich-text-text.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-72879af8", Component.options)
  } else {
    hotAPI.reload("data-v-72879af8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WxcTag = exports.WxcTabPage = exports.WxcTabBar = exports.WxcSwipeAction = exports.WxcStepper = exports.WxcSpecialRichText = exports.WxcSliderBar = exports.WxcSlideNav = exports.WxcSimpleFlow = exports.WxcSearchbar = exports.WxcRichText = exports.WxcResult = exports.WxcRefresher = exports.WxcRadio = exports.WxcProgress = exports.WxcPopup = exports.WxcPopover = exports.WxcPartLoading = exports.WxcPanItem = exports.WxcPageCalendar = exports.WxcOverlay = exports.WxcNoticebar = exports.WxcMinibar = exports.WxcMask = exports.WxcLotteryRain = exports.WxcLoading = exports.WxcLightbox = exports.WxcIndexlist = exports.WxcIcon = exports.WxcGridSelect = exports.WxcFullPage = exports.WxcEpSlider = exports.WxcDialog = exports.WxcCountdown = exports.WxcCity = exports.WxcCheckboxList = exports.WxcCheckbox = exports.WxcCell = exports.WxcButton = exports.Utils = exports.BindEnv = undefined;

var _bindEnv = __webpack_require__(19);

var _bindEnv2 = _interopRequireDefault(_bindEnv);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _wxcButton = __webpack_require__(20);

var _wxcButton2 = _interopRequireDefault(_wxcButton);

var _wxcCell = __webpack_require__(7);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _wxcCheckbox = __webpack_require__(22);

var _wxcCheckbox2 = _interopRequireDefault(_wxcCheckbox);

var _wxcCheckboxList = __webpack_require__(21);

var _wxcCheckboxList2 = _interopRequireDefault(_wxcCheckboxList);

var _wxcCity = __webpack_require__(23);

var _wxcCity2 = _interopRequireDefault(_wxcCity);

var _wxcCountdown = __webpack_require__(24);

var _wxcCountdown2 = _interopRequireDefault(_wxcCountdown);

var _wxcDialog = __webpack_require__(25);

var _wxcDialog2 = _interopRequireDefault(_wxcDialog);

var _wxcEpSlider = __webpack_require__(26);

var _wxcEpSlider2 = _interopRequireDefault(_wxcEpSlider);

var _wxcFullPage = __webpack_require__(27);

var _wxcFullPage2 = _interopRequireDefault(_wxcFullPage);

var _wxcGridSelect = __webpack_require__(28);

var _wxcGridSelect2 = _interopRequireDefault(_wxcGridSelect);

var _wxcIcon = __webpack_require__(29);

var _wxcIcon2 = _interopRequireDefault(_wxcIcon);

var _wxcIndexlist = __webpack_require__(10);

var _wxcIndexlist2 = _interopRequireDefault(_wxcIndexlist);

var _wxcLightbox = __webpack_require__(30);

var _wxcLightbox2 = _interopRequireDefault(_wxcLightbox);

var _wxcLoading = __webpack_require__(31);

var _wxcLoading2 = _interopRequireDefault(_wxcLoading);

var _wxcLotteryRain = __webpack_require__(32);

var _wxcLotteryRain2 = _interopRequireDefault(_wxcLotteryRain);

var _wxcMask = __webpack_require__(11);

var _wxcMask2 = _interopRequireDefault(_wxcMask);

var _wxcMinibar = __webpack_require__(12);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

var _wxcNoticebar = __webpack_require__(33);

var _wxcNoticebar2 = _interopRequireDefault(_wxcNoticebar);

var _wxcOverlay = __webpack_require__(6);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

var _wxcPageCalendar = __webpack_require__(34);

var _wxcPageCalendar2 = _interopRequireDefault(_wxcPageCalendar);

var _wxcPanItem = __webpack_require__(35);

var _wxcPanItem2 = _interopRequireDefault(_wxcPanItem);

var _wxcPartLoading = __webpack_require__(36);

var _wxcPartLoading2 = _interopRequireDefault(_wxcPartLoading);

var _wxcPopover = __webpack_require__(37);

var _wxcPopover2 = _interopRequireDefault(_wxcPopover);

var _wxcPopup = __webpack_require__(38);

var _wxcPopup2 = _interopRequireDefault(_wxcPopup);

var _wxcProgress = __webpack_require__(39);

var _wxcProgress2 = _interopRequireDefault(_wxcProgress);

var _wxcRadio = __webpack_require__(40);

var _wxcRadio2 = _interopRequireDefault(_wxcRadio);

var _wxcRefresher = __webpack_require__(41);

var _wxcRefresher2 = _interopRequireDefault(_wxcRefresher);

var _wxcResult = __webpack_require__(13);

var _wxcResult2 = _interopRequireDefault(_wxcResult);

var _wxcRichText = __webpack_require__(42);

var _wxcRichText2 = _interopRequireDefault(_wxcRichText);

var _wxcSearchbar = __webpack_require__(14);

var _wxcSearchbar2 = _interopRequireDefault(_wxcSearchbar);

var _wxcSimpleFlow = __webpack_require__(43);

var _wxcSimpleFlow2 = _interopRequireDefault(_wxcSimpleFlow);

var _wxcSlideNav = __webpack_require__(44);

var _wxcSlideNav2 = _interopRequireDefault(_wxcSlideNav);

var _wxcSliderBar = __webpack_require__(45);

var _wxcSliderBar2 = _interopRequireDefault(_wxcSliderBar);

var _wxcSpecialRichText = __webpack_require__(46);

var _wxcSpecialRichText2 = _interopRequireDefault(_wxcSpecialRichText);

var _wxcStepper = __webpack_require__(47);

var _wxcStepper2 = _interopRequireDefault(_wxcStepper);

var _wxcSwipeAction = __webpack_require__(48);

var _wxcSwipeAction2 = _interopRequireDefault(_wxcSwipeAction);

var _wxcTabBar = __webpack_require__(49);

var _wxcTabBar2 = _interopRequireDefault(_wxcTabBar);

var _wxcTabPage = __webpack_require__(50);

var _wxcTabPage2 = _interopRequireDefault(_wxcTabPage);

var _wxcTag = __webpack_require__(51);

var _wxcTag2 = _interopRequireDefault(_wxcTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.BindEnv = _bindEnv2.default;
exports.Utils = _utils2.default;
exports.WxcButton = _wxcButton2.default;
exports.WxcCell = _wxcCell2.default;
exports.WxcCheckbox = _wxcCheckbox2.default;
exports.WxcCheckboxList = _wxcCheckboxList2.default;
exports.WxcCity = _wxcCity2.default;
exports.WxcCountdown = _wxcCountdown2.default;
exports.WxcDialog = _wxcDialog2.default;
exports.WxcEpSlider = _wxcEpSlider2.default;
exports.WxcFullPage = _wxcFullPage2.default;
exports.WxcGridSelect = _wxcGridSelect2.default;
exports.WxcIcon = _wxcIcon2.default;
exports.WxcIndexlist = _wxcIndexlist2.default;
exports.WxcLightbox = _wxcLightbox2.default;
exports.WxcLoading = _wxcLoading2.default;
exports.WxcLotteryRain = _wxcLotteryRain2.default;
exports.WxcMask = _wxcMask2.default;
exports.WxcMinibar = _wxcMinibar2.default;
exports.WxcNoticebar = _wxcNoticebar2.default;
exports.WxcOverlay = _wxcOverlay2.default;
exports.WxcPageCalendar = _wxcPageCalendar2.default;
exports.WxcPanItem = _wxcPanItem2.default;
exports.WxcPartLoading = _wxcPartLoading2.default;
exports.WxcPopover = _wxcPopover2.default;
exports.WxcPopup = _wxcPopup2.default;
exports.WxcProgress = _wxcProgress2.default;
exports.WxcRadio = _wxcRadio2.default;
exports.WxcRefresher = _wxcRefresher2.default;
exports.WxcResult = _wxcResult2.default;
exports.WxcRichText = _wxcRichText2.default;
exports.WxcSearchbar = _wxcSearchbar2.default;
exports.WxcSimpleFlow = _wxcSimpleFlow2.default;
exports.WxcSlideNav = _wxcSlideNav2.default;
exports.WxcSliderBar = _wxcSliderBar2.default;
exports.WxcSpecialRichText = _wxcSpecialRichText2.default;
exports.WxcStepper = _wxcStepper2.default;
exports.WxcSwipeAction = _wxcSwipeAction2.default;
exports.WxcTabBar = _wxcTabBar2.default;
exports.WxcTabPage = _wxcTabPage2.default;
exports.WxcTag = _wxcTag2.default; /**
                                    * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
                                    * Created by Tw93 on 17/09/25
                                    */

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(170);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(175);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(176);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(188);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(192);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by Tw93 on 2016/10/29.
 */

var GIF = exports.GIF = 'https://img.alicdn.com/tfs/TB1aks3PpXXXXcXXFXXXXXXXXXX-150-150.gif';
var BLACK_GIF = exports.BLACK_GIF = 'https://img.alicdn.com/tfs/TB1Ep_9NVXXXXb8XVXXXXXXXXXX-74-74.gif';
var PART = exports.PART = 'https://gtms02.alicdn.com/tfs/TB1y4QbSXXXXXbgapXXXXXXXXXX-50-50.gif';

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(277)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(98),
  /* template */
  __webpack_require__(233),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-702739a6",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-checkbox/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-702739a6", Component.options)
  } else {
    hotAPI.reload("data-v-702739a6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(283)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(129),
  /* template */
  __webpack_require__(240),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8c80ddc2",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-tag.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] wxc-rich-text-tag.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8c80ddc2", Component.options)
  } else {
    hotAPI.reload("data-v-8c80ddc2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCities = getCities;
exports.query = query;

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCities(list) {
  var showDesc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (list && list.length > 0) {
    var result = list.map(function (v) {
      var o = Object.assign({}, v);

      if (o.suggestName) {
        o.name = o.suggestName;
      }

      if (o.stationName && !o.name) {
        o.name = o.stationName;
      }

      if (o.cityName && !o.name) {
        o.name = o.cityName;
      }

      if (o.code && showDesc) {
        o.desc = o.code;
      }
      return o;
    });
    return result;
  } else {
    return [];
  }
}

function query(source, text) {
  var res = [];
  res = source.filter(function (item) {
    var arr = [];
    var isHave = false;
    Object.keys(item).forEach(function (prop) {
      var itemStr = item[prop];
      _utils2.default.isString(itemStr) && itemStr.split(',').forEach(function (val) {
        arr.push(val);
      });
    });
    arr.some(function (val) {
      isHave = new RegExp('^' + text).test(val);
      return isHave;
    });
    return isHave;
  });
  return res;
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bindEnv = __webpack_require__(5);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_bindEnv).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(159);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(161);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(16);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(162);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(164);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(165);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(166);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fullPage = __webpack_require__(200);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_fullPage).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(167);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(169);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(171);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(172);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(173);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(177);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(179);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(180);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(181);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(182);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(183);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(184);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(185);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(187);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(189);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(193);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(194);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(195);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(196);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(197);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(198);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(199);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(201);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(202);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.tab-box[data-v-00002f91] {\n  width: 10rem;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.tab-item[data-v-00002f91] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  height: 1.2rem;\n  background-color: #ffffff;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.tab-item-text[data-v-00002f91] {\n  text-align: center;\n  color: #000000;\n  font-size: 0.37333rem;\n}\n.text-selected[data-v-00002f91] {\n  font-weight: bold;\n}\n.tab-item-selected-bar[data-v-00002f91] {\n  width: 10rem;\n  background-color: #f2f3f4;\n}\n.tab-item-selected-bar-in[data-v-00002f91] {\n  width: 5rem;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  height: 0.08rem;\n}\n.tab-item-active[data-v-00002f91] {\n  background-color: #ffb200;\n  width: 1.22667rem;\n  height: 0.08rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-city/tab.vue?3b2dbd40"],"names":[],"mappings":";AAmBA;EACA,aAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,eAAA;EACA,0BAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;CACA;AAEA;EACA,mBAAA;EACA,eAAA;EACA,sBAAA;CACA;AAEA;EACA,kBAAA;CACA;AAEA;EACA,aAAA;EACA,0BAAA;CACA;AAEA;EACA,YAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,gBAAA;CACA;AAEA;EACA,0BAAA;EACA,kBAAA;EACA,gBAAA;CACA","file":"tab.vue","sourcesContent":["<template>\n  <div>\n    <div class=\"tab-box\">\n      <div class=\"tab-item\"\n           v-for=\"(name,i) in ['国内','国际']\"\n           :key=\"i\"\n           @click=\"switchTab(i)\">\n        <p class=\"['tab-item-text', i===checkedIndex && 'text-selected']\">{{name}}</p>\n      </div>\n    </div>\n    <div class=\"tab-item-selected-bar\">\n      <div class=\"tab-item-selected-bar-in\"\n           ref=\"tab-bar\">\n        <div class=\"tab-item-active\"></div>\n      </div>\n    </div>\n  </div>\n</template>\n<style scoped>\n  .tab-box {\n    width: 750px;\n    flex-direction: row;\n    justify-content: center;\n  }\n\n  .tab-item {\n    flex: 1;\n    height: 90px;\n    background-color: #ffffff;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .tab-item-text {\n    text-align: center;\n    color: #000000;\n    font-size: 28px;\n  }\n\n  .text-selected {\n    font-weight: bold;\n  }\n\n  .tab-item-selected-bar {\n    width: 750px;\n    background-color: #f2f3f4;\n  }\n\n  .tab-item-selected-bar-in {\n    width: 375px;\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n    height: 6px;\n  }\n\n  .tab-item-active {\n    background-color: #ffb200;\n    width: 92px;\n    height: 6px;\n  }\n</style>\n\n<script>\n  export default {\n    props: {},\n    data: () => ({\n      checkedIndex: 0\n    }),\n    methods: {\n      switchTab (index) {\n        const animation = weex.requireModule('animation');\n        this.checkedIndex = index;\n        this.$emit('wxcTabSwitch', {\n          index\n        });\n        animation.transition(this.$refs['tab-bar'], {\n          styles: {\n            transform: `translateX(${index * 375}px)`\n          },\n          duration: 150, // ms\n          timingFunction: 'ease',\n          delay: 0 // ms\n        }, function () {\n        });\n      },\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.container[data-v-0acdc68c] {\n  background-color: #dddddd;\n  border-top-width: 1px;\n  border-top-color: #dddddd;\n}\n.border[data-v-0acdc68c] {\n  border-bottom-width: 1px;\n  border-bottom-color: #dddddd;\n}\n.wxc-skid[data-v-0acdc68c] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  background-color: #FFFFFF;\n}\n.swipe-action-right[data-v-0acdc68c] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.swipe-action-center[data-v-0acdc68c] {\n  width: 10rem;\n}\n\n/* .box-center {\n  width: 735px;\n  line-height: 90px;\n  background-color: #FFFFFF;\n  margin-left: 15px !important;\n  margin-left: 15px;\n}\n.box-center-last {\n  width: 750px;\n  margin-left: 0 !important;\n  padding-left: 15px !important;\n  margin-left: 0;\n  padding-left: 15px;\n} */\n.swipe-action-child[data-v-0acdc68c] {\n  width: 1.33333rem;\n  text-align: center;\n  color: #FFFFFF;\n  background-color: #dddddd;\n  line-height: 1.2rem;\n}\n.swipe-action-text[data-v-0acdc68c] {\n  font-size: 0.4rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-swipe-action/index.vue?213084a5"],"names":[],"mappings":";AAkBA;EACA,0BAAA;EACA,sBAAA;EACA,0BAAA;CACA;AACA;EACA,yBAAA;EACA,6BAAA;CACA;AACA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;CACA;AACA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,aAAA;CACA;;AAEA;;;;;;;;;;;;;IAaA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,eAAA;EACA,0BAAA;EACA,oBAAA;CACA;AACA;EACA,kBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by wjun94 on 19/05/14. -->\n\n<template>\n<div class=\"container\">\n  <div ref=\"skid\" v-for=\"(item, i) of data\" @click=\"onNodeClick(item, i)\" :key=\"'skid-' + i\" class=\"wxc-skid\" :style=\"{width: (750 + item.right.length * 100) + 'px', height: height + 'px'}\" @touchstart=\"(e) => !isAndroid && onPanStart(e, item, i)\" @horizontalpan=\"(e) => isAndroid && onPanStart(e, item, i)\" @touchend=\"(e) => onPanEnd(e, item, i)\">\n    <div :style='styles' class=\"swipe-action-center border\">\n      <slot :val='{item: item, index: i}'/>\n    </div>\n    <!-- <p :style=\"{lineHeight: height + 'px'}\" :class=\"['box-center', 'border', 'text', i + 1 === data.length && 'box-center-last']\">{{item.title}}</p> -->\n    <div class=\"swipe-action-right\">\n      <p class=\"swipe-action-child swipe-action-text\" @click=\"onRightNode(item, child, i)\" v-for=\"(child, childIdx) of item.right\" :style=\"Object.assign({lineHeight: height + 'px'}, child.style || {})\" :key=\"'child-' + childIdx\">{{child.text}}</p>\n    </div>\n  </div>\n</div>\n</template>\n\n<style scoped>\n.container {\n  background-color: #dddddd;\n  border-top-width: 1px;\n  border-top-color: #dddddd;\n}\n.border {\n  border-bottom-width: 1px;\n  border-bottom-color: #dddddd;\n}\n.wxc-skid {\n  flex-direction: row;\n  background-color: #FFFFFF;\n}\n.swipe-action-right {\n  flex-direction: row;\n  align-items: center;\n}\n\n.swipe-action-center {\n  width: 750px;\n}\n\n/* .box-center {\n  width: 735px;\n  line-height: 90px;\n  background-color: #FFFFFF;\n  margin-left: 15px !important;\n  margin-left: 15px;\n}\n.box-center-last {\n  width: 750px;\n  margin-left: 0 !important;\n  padding-left: 15px !important;\n  margin-left: 0;\n  padding-left: 15px;\n} */\n\n.swipe-action-child {\n  width: 100px;\n  text-align: center;\n  color: #FFFFFF;\n  background-color: #dddddd;\n  line-height: 90px;\n}\n.swipe-action-text {\n  font-size: 30px;\n}\n</style>\n\n<script>\nimport Binding from \"weex-bindingx/lib/index.weex.js\";\nconst animation = weex.requireModule(\"animation\");\nimport Utils from \"../utils\";\n\nexport default {\n  props: {\n    data: {\n      type: Array,\n      default: []\n    },\n    height: {\n      type: Number,\n      default: 90\n    },\n    styles: {\n      type: Object,\n      default: {}\n    }\n  },\n  data() {\n    return {\n      mobileX: 0,\n      webStarX: 0,\n      saveIdx: null,\n      isAndroid: Utils.env.isAndroid()\n    };\n  },\n  methods: {\n    special(dom, styles) {\n      animation.transition(dom, {\n        styles,\n        duration: 200, //ms\n        timingFunction: \"ease\",\n        delay: 100 //ms\n      });\n    },\n    onRightNode(pNode, node, i) {\n      node.onPress();\n      if (pNode.autoClose)\n        this.special(this.$refs.skid[i], {\n          transform: `translate(0, 0)`\n        });\n    },\n    onNodeClick(node, i) {\n      if (this.mobileX < 0) {\n        this.mobileX = 0;\n        this.special(this.$refs.skid[this.saveIdx], {\n          transform: `translate(0, 0)`\n        });\n        this.isAndroid &&\n          this.special(this.$refs.skid[i], {\n            transform: `translate(0, 0)`\n          });\n      } else {\n        this.$emit(\"onNodeClick\", node, i);\n      }\n    },\n\n    onPanEnd(e, node, i) {\n      if (Utils.env.isWeb()) {\n        const webEndX = e.changedTouches[0].pageX;\n        this.movingDistance(webEndX - this.webStarX, node, this.$refs.skid[i]);\n      }\n    },\n    onPanStart: function(e, node, i) {\n      const { saveIdx } = this;\n      if (saveIdx !== i && saveIdx !== null && this.$refs.skid[saveIdx]) {\n        this.special(this.$refs.skid[saveIdx], {\n          transform: `translate(0, 0)`\n        });\n        this.mobileX = 0;\n      }\n      this.saveIdx = i;\n      !Utils.env.isWeb() ? this.mobile(e, node, i) : this.web(e, node, i);\n      e.stopPropagation();\n    },\n    web(e, node, i) {\n      this.webStarX = e.changedTouches[0].pageX;\n    },\n    mobile(e, node, i) {\n      var el = this.$refs[\"skid\"][i];\n      Binding.bind(\n        {\n          anchor: el.ref,\n          eventType: \"pan\",\n          props: [\n            {\n              element: el.ref,\n              property: \"transform.translateX\",\n              expression: `x+${this.isAndroid ? 0 : this.mobileX}`\n            }\n          ]\n        },\n        e => {\n          const { state, deltaX } = e;\n          if (state === \"end\") {\n            this.mobileX += deltaX;\n            this.movingDistance(this.mobileX, node, el);\n          }\n        }\n      );\n    },\n    movingDistance(scope, node, el) {\n      const len = node.right ? node.right.length : 0;\n      const distance = len * -100;\n      if (scope < -30) {\n        this.special(el, {\n          transform: `translate(${distance}px, 0)`\n        });\n        this.mobileX = distance;\n      } else {\n        this.special(el, {\n          transform: `translate(0, 0)`\n        });\n        this.mobileX = 0;\n      }\n    }\n  }\n};\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-progress[data-v-0f8938e0] {\n  background-color: #f2f3f4;\n}\n.progress[data-v-0f8938e0] {\n  position: absolute;\n  background-color: #FFC900;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-progress/index.vue?1708f692"],"names":[],"mappings":";AAaA;EACA,0BAAA;CACA;AAEA;EACA,mBAAA;EACA,0BAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div class=\"wxc-progress\"\n       :style=\"runWayStyle\"\n       :accessible=\"true\"\n       :aria-label=\"`进度为百分之${value}`\">\n    <div class=\"progress\" :style=\"progressStyle\"></div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-progress {\n    background-color: #f2f3f4;\n  }\n\n  .progress {\n    position: absolute;\n    background-color: #FFC900;\n  }\n</style>\n\n<script>\n  export default {\n    props: {\n      barColor: {\n        type: String,\n        default: '#FFC900'\n      },\n      barWidth: {\n        type: Number,\n        default: 600\n      },\n      barHeight: {\n        type: Number,\n        default: 8\n      },\n      barRadius: {\n        type: Number,\n        default: 0\n      },\n      value: {\n        type: Number,\n        default: 0\n      },\n      backgroundColor: {\n        type: String,\n        default: '#f2f3f4'\n      }\n    },\n    computed: {\n      runWayStyle () {\n        const { barWidth, barHeight, barRadius, backgroundColor } = this;\n        return {\n          width: barWidth + 'px',\n          height: barHeight + 'px',\n          borderRadius: barRadius + 'px',\n          backgroundColor\n        }\n      },\n      progressStyle () {\n        const { value, barWidth, barHeight, barColor,barRadius } = this;\n        const newValue = value < 0 ? 0 : (value > 100 ? 100 : value);\n        return {\n          backgroundColor: barColor,\n          borderRadius: barRadius + 'px',\n          height: barHeight + 'px',\n          width: newValue / 100 * barWidth + 'px'\n        }\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.slider[data-v-15fdfbd4] {\n  position: absolute;\n  top: 0;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-ep-slider/index.vue?350d69a3"],"names":[],"mappings":";AAuBA;EACA,mBAAA;EACA,OAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div :style=\"containerS\">\n    <div :ref=\"`sliderCtn_${sliderId}`\"\n         :style=\"{width:cardWidth+'px',height:cardS.height+'px',transform: `translateX(-${currentIndex * (cardS.width + cardS.spacing)}px)`}\"\n         @panstart=\"onPanStart\"\n         @panmove=\"onPanMove\"\n         @panend=\"onPanEnd\"\n         @horizontalpan=\"onEpPanStart\">\n      <div class=\"slider\"\n           v-for=\"(v,index) in cardList\"\n           :ref=\"`card${index}_${sliderId}`\"\n           :style=\"{transform: `scale(${index===currentIndex ? 1 : cardS.scale})`,left: `${index * (cardS.width+cardS.spacing)}px`,marginLeft:`${(containerS.width - cardS.width) / 2}px`,width: cardS.width+'px', height: cardS.height+'px'}\">\n        <slot :name=\"`card${index}_${sliderId}`\"></slot>\n      </div>\n      <slot name=\"pull-more\"></slot>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .slider {\n    position: absolute;\n    top: 0;\n  }\n</style>\n\n<script>\n  const swipeBack = weex.requireModule('swipeBack');\n  const animation = weex.requireModule('animation');\n  import Utils from '../utils';\n  import BindEnv from '../utils/bind-env';\n  import Binding from 'weex-bindingx/lib/index.weex.js';\n\n  export default {\n    props: {\n      sliderId: {\n        type: [String, Number],\n        default: 1\n      },\n      panOffset: {\n        type: Number,\n        default: 80\n      },\n      cardLength: {\n        type: Number,\n        default: 1\n      },\n      selectIndex: {\n        type: Number,\n        default: 0\n      },\n      enableSwipe: {\n        type: Boolean,\n        default: true\n      },\n      containerS: {\n        type: Object,\n        default: () => ({\n          position: 'relative',\n          width: 750,\n          height: 352\n        })\n      },\n      cardS: {\n        type: Object,\n        default: () => ({\n          width: 360,\n          height: 300,\n          spacing: 0,\n          scale: 0.75\n        })\n      },\n      autoPlay: {\n        type: Boolean,\n        default: false\n      },\n      interval: {\n        type: [Number, String],\n        default: 1200\n      }\n    },\n    data: () => ({\n      isMoving: false,\n      gesToken: 0,\n      startX: 0,\n      startTime: 0,\n      currentIndex: 0,\n      autoPlayTimer: null\n    }),\n    computed: {\n      cardList () {\n        return new Array(this.cardLength + 1).join().split('');\n      },\n      cardWidth () {\n        return (this.cardLength - 1) * this.cardS.width + this.containerS.width + 235;\n      }\n    },\n    created () {\n      this.currentIndex = this.selectIndex;\n    },\n    mounted () {\n      // ios和页面返回冲突，组件里面将ios系统横滑返回禁止\n      if (swipeBack && swipeBack.forbidSwipeBack) {\n        swipeBack.forbidSwipeBack(true);\n      }\n\n      setTimeout(() => {\n        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];\n        if (BindEnv.supportsEB() && sliderCtn && sliderCtn.ref) {\n          Binding.prepare && Binding.prepare({\n            anchor: sliderCtn.ref,\n            eventType: 'pan'\n          });\n        }\n      }, 20);\n      this.checkNeedAutoPlay();\n    },\n    methods: {\n      onPanStart (e) {\n        if (BindEnv.supportsEB()) {\n          return;\n        }\n        this.clearAutoPlay();\n        this.startX = e.changedTouches[0].clientX;\n        this.startTime = Date.now();\n      },\n      onPanMove (e) {\n        if (BindEnv.supportsEB()) {\n          return;\n        }\n        const moveX = e.changedTouches[0].clientX - this.startX;\n        const index = this.loopedIndex(this.currentIndex, this.cardLength);\n        const cardLength = this.cardLength;\n        const currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);\n\n        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];\n        sliderCtn && animation.transition(sliderCtn, {\n          styles: {\n            transform: `translateX(${moveX - currentCardLeft}px)`\n          },\n          timingFunction: 'ease',\n          delay: 0,\n          duration: 0\n        }, () => {\n        });\n\n        if (this.cardS.scale !== 1) {\n          const currentCard = this.$refs[`card${this.loopedIndex(index, cardLength)}_${this.sliderId}`][0];\n          currentCard && animation.transition(currentCard, {\n            styles: {\n              transform: `scale(${1 - Math.abs(moveX) / (this.cardS.width) * (1 - this.cardS.scale)})`\n            },\n            timingFunction: 'ease',\n            delay: 0,\n            duration: 0\n          }, () => {\n          });\n          // 左边的卡片\n          const leftCard = this.$refs[`card${this.loopedIndex(index - 1, cardLength)}_${this.sliderId}`][0];\n          // loop 函数负数返回 0，这里有点冲突\n          if (leftCard && index !== 0) {\n            animation.transition(leftCard, {\n              styles: {\n                transform: `scale(${1 - Math.abs(moveX - this.cardS.width) / (this.cardS.width) * (1 - this.cardS.scale)})`\n              },\n              timingFunction: 'ease',\n              delay: 0,\n              duration: 0\n            }, () => {\n            });\n          }\n          // 右边卡片\n          const rightCard = this.$refs[`card${this.loopedIndex(index + 1, cardLength)}_${this.sliderId}`][0];\n          rightCard && animation.transition(rightCard, {\n            styles: {\n              transform: `scale(${1 - Math.abs(this.cardS.width + moveX) / (this.cardS.width) * (1 - this.cardS.scale)})`\n            },\n            timingFunction: 'ease',\n            delay: 0,\n            duration: 0\n          }, () => {\n          });\n        }\n      },\n      onEpPanStart (e) {\n        if (BindEnv.supportsEB() && e.state === 'start') {\n          this.clearAutoPlay();\n          setTimeout(() => {\n            const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];\n            this.bindExp(sliderCtn);\n          }, 0)\n        }\n      },\n      onPanEnd (e) {\n        if (BindEnv.supportsEB()) {\n          return;\n        }\n        this.panEnd(e);\n      },\n      panEnd (e) {\n        this.isMoving = true;\n        let moveX = e.deltaX;\n\n        if (Utils.env.isWeb()) {\n          moveX = e.changedTouches[0].clientX - this.startX;\n        }\n\n        const originIndex = this.currentIndex;\n        let selectIndex = originIndex;\n        const duration = Date.now() - this.startTime;\n        const panOffset = this.panOffset || (this.cardS.width / 2);\n        const isPullMore = (selectIndex === this.cardLength - 1 && (moveX < -68 || (moveX < -10 && duration < 200)));\n\n        if (isPullMore) {\n          this.$emit('wxcEpSliderPullMore', { currentIndex: selectIndex });\n        }\n\n        if (moveX < -panOffset || (moveX < -10 && duration < 200)) {\n          if (selectIndex !== this.cardLength - 1) {\n            selectIndex++;\n          }\n        } else if (moveX > panOffset || (moveX > 10 && duration < 500)) {\n          if (selectIndex !== 0) {\n            selectIndex--;\n          }\n        }\n\n        this.slideTo(originIndex, selectIndex);\n        setTimeout(() => { this.checkNeedAutoPlay() }, 3000);\n      },\n      slideTo (originIndex, selectIndex) {\n        let currentCardScale = 1;\n        let rightCardScale = this.cardS.scale;\n        let leftCardScale = this.cardS.scale;\n        const duration = (selectIndex === 0 && originIndex === this.cardLength - 1 && this.cardLength !== 2) ? 0.00001 : 300;\n        this.$emit('wxcEpSliderCurrentIndexSelected', { currentIndex: selectIndex });\n        if (originIndex < selectIndex) {\n          currentCardScale = this.cardS.scale;\n          rightCardScale = 1;\n        } else if (originIndex > selectIndex) {\n          currentCardScale = this.cardS.scale;\n          leftCardScale = 1;\n        }\n        const currentCard = this.$refs[`card${this.loopedIndex(originIndex, this.cardLength)}_${this.sliderId}`][0];\n        currentCard && animation.transition(currentCard, {\n          styles: {\n            transform: `scale(${currentCardScale})`\n          },\n          timingFunction: 'ease',\n          duration\n        }, () => {\n        });\n\n        const leftCard = this.$refs[`card${this.loopedIndex(originIndex - 1, this.cardLength)}_${this.sliderId}`][0];\n        if (this.isMoving && leftCard && originIndex !== 0) {\n          animation.transition(leftCard, {\n            styles: {\n              transform: `scale(${leftCardScale})`\n            },\n            timingFunction: 'ease',\n            duration\n          }, () => {\n          });\n        }\n        const rightCard = this.$refs[`card${this.loopedIndex(originIndex + 1, this.cardLength)}_${this.sliderId}`][0];\n        if (rightCard && originIndex !== this.cardLength - 1) {\n          animation.transition(rightCard, {\n            styles: {\n              transform: `scale(${rightCardScale})`\n            },\n            timingFunction: 'ease',\n            duration\n          }, () => {\n          });\n        }\n\n        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];\n        sliderCtn && animation.transition(sliderCtn, {\n          styles: {\n            transform: `translateX(-${selectIndex * (this.cardS.width + this.cardS.spacing)}px)`\n          },\n          timingFunction: 'ease',\n          duration\n        }, () => {\n          this.isMoving = false;\n          if (originIndex !== selectIndex) {\n            this.currentIndex = selectIndex;\n          }\n        });\n      },\n      // 使index维持在0-length之间循环\n      loopedIndex (index, total) {\n        if (index < 0) {\n          index = index + (1 - index / total) * total;\n        }\n        return parseInt(index % total);\n      },\n      bindExp (element) {\n        if (element && element.ref) {\n          if (this.isMoving && this.gesToken !== 0) {\n            Binding.unbind({\n              eventType: 'pan',\n              token: this.gesToken\n            })\n            this.gesToken = 0;\n            return;\n          }\n\n          this.startTime = Date.now();\n          const index = this.loopedIndex(this.currentIndex, this.cardLength);\n          const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];\n          const currentCard = this.$refs[`card${index}_${this.sliderId}`][0];\n          let rightCard = null;\n          let leftCard = null;\n          const currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);\n\n          // 卡片容器\n          const sliderCtnExp = `x - ${currentCardLeft}`;\n          const args = [\n            {\n              element: sliderCtn.ref,\n              property: 'transform.translateX',\n              expression: sliderCtnExp\n            }\n          ];\n\n          if (this.cardS.scale !== 1) {\n            const currentCardExp = `1-abs(x)/${this.cardS.width}*${1 - this.cardS.scale}`;\n            const leftCardExp = `1-abs(x-${this.cardS.width})/${this.cardS.width}*${1 - this.cardS.scale}`;\n            const rightCardExp = `1-abs(${this.cardS.width}+x)/${this.cardS.width}*${1 - this.cardS.scale}`;\n\n            args.push({\n              element: currentCard.ref,\n              property: 'transform.scale',\n              expression: currentCardExp\n            });\n\n            if (index === 0 && this.$refs[`card${index + 1}_${this.sliderId}`]) {\n              rightCard = this.$refs[`card${index + 1}_${this.sliderId}`][0];\n              args.push({\n                element: rightCard.ref,\n                property: 'transform.scale',\n                expression: rightCardExp\n              });\n            } else if (index === this.cardLength - 1 && this.$refs[`card${index - 1}_${this.sliderId}`]) {\n              leftCard = this.$refs[`card${index - 1}_${this.sliderId}`][0];\n              args.push({\n                element: leftCard.ref,\n                property: 'transform.scale',\n                expression: leftCardExp\n              });\n            } else if (this.$refs[`card${index - 1}_${this.sliderId}`]) {\n              // 左边卡片\n              leftCard = this.$refs[`card${index - 1}_${this.sliderId}`][0];\n              args.push({\n                element: leftCard.ref,\n                property: 'transform.scale',\n                expression: leftCardExp\n              });\n              // 右边卡片\n              rightCard = this.$refs[`card${index + 1}_${this.sliderId}`][0];\n              args.push({\n                element: rightCard.ref,\n                property: 'transform.scale',\n                expression: rightCardExp\n              });\n            }\n          }\n\n          const gesTokenObj = Binding.bind({\n            anchor: element.ref,\n            eventType: 'pan',\n            props: args\n          }, (e) => {\n            if (!this.isMoving && (e.state === 'end' || e.state === 'cancel' || e.state === 'exit')) {\n              this.panEnd(e);\n            }\n          });\n\n          this.gesToken = gesTokenObj.token;\n        }\n      },\n      checkNeedAutoPlay () {\n        if (this.autoPlay) {\n          this.clearAutoPlay();\n          this.autoPlayTimer = setInterval(() => {\n            this.slideTo(this.currentIndex, this.loopedIndex(this.currentIndex + 1, this.cardLength));\n          }, parseInt(this.interval));\n        }\n      },\n      clearAutoPlay () {\n        this.autoPlayTimer && clearInterval(this.autoPlayTimer);\n      },\n      rebind () {\n        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];\n        if (sliderCtn && sliderCtn.ref) {\n          Binding.unbind({\n            eventType: 'pan',\n            token: this.gesToken\n          });\n          this.gesToken = 0;\n          this.bindExp(sliderCtn);\n        }\n      },\n      manualSetPage (selectIndex) {\n        this.clearAutoPlay();\n        const step = this.currentIndex < selectIndex ? 1 : -1;\n        this.slideTo(this.loopedIndex(selectIndex - step, this.cardLength), selectIndex);\n        setTimeout(() => {\n          this.checkNeedAutoPlay()\n        }, 3000);\n      }\n    }\n  }\n</script>\n\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-overlay[data-v-16b9703a] {\n  width: 10rem;\n  position: fixed;\n  bottom: 0;\n  right: 0;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-overlay/index.vue?3a653564"],"names":[],"mappings":";AAiBA;EACA,aAAA;EACA,gBAAA;EACA,UAAA;EACA,SAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A gray overlay mask-->\n\n<template>\n  <div>\n    <div class=\"wxc-overlay\"\n         ref=\"wxc-overlay\"\n         v-if=\"show\"\n         :hack=\"shouldShow\"\n         @click=\"overlayClicked\"\n         :style=\"overlayStyle\">\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-overlay {\n    width: 750px;\n    position: fixed;\n    bottom: 0;\n    right: 0;\n  }\n</style>\n\n<script>\n  const animation = weex.requireModule('animation');\n  import Utils from '../utils';\n\n  export default {\n    props: {\n      show: {\n        type: Boolean,\n        default: true\n      },\n      top: {\n        type: Number,\n        default: 0\n      },\n      left: {\n        default: Number,\n        default: 0\n      },\n      hasAnimation: {\n        type: Boolean,\n        default: true\n      },\n      duration: {\n        type: [Number, String],\n        default: 300\n      },\n      timingFunction: {\n        type: Array,\n        default: () => (['ease-in', 'ease-out'])\n      },\n      opacity: {\n        type: [Number, String],\n        default: 0.6\n      },\n      canAutoClose: {\n        type: Boolean,\n        default: true\n      }\n    },\n    computed: {\n      overlayStyle () {\n        return {\n          opacity: this.hasAnimation ? 0 : 1,\n          backgroundColor: `rgba(0, 0, 0,${this.opacity})`,\n          left: Utils.env.isWeb() ? this.left + 'px' : 0,\n          top: this.top\n        }\n      },\n      shouldShow () {\n        const { show, hasAnimation } = this;\n        hasAnimation && setTimeout(() => {\n          this.appearOverlay(show);\n        }, 50);\n        return show;\n      }\n    },\n    methods: {\n      overlayClicked (e) {\n        this.canAutoClose ? this.appearOverlay(false) : this.$emit('wxcOverlayBodyClicked', {});\n      },\n      appearOverlay (bool, duration = this.duration) {\n        const { hasAnimation, timingFunction, canAutoClose } = this;\n        const needEmit = !bool && canAutoClose;\n        needEmit && (this.$emit('wxcOverlayBodyClicking', {}));\n        const overlayEl = this.$refs['wxc-overlay'];\n        if (hasAnimation && overlayEl) {\n          animation.transition(overlayEl, {\n            styles: {\n              opacity: bool ? 1 : 0\n            },\n            duration,\n            timingFunction: timingFunction[bool ? 0 : 1],\n            delay: 0\n          }, () => {\n            needEmit && (this.$emit('wxcOverlayBodyClicked', {}));\n          });\n        } else {\n          needEmit && (this.$emit('wxcOverlayBodyClicked', {}));\n        }\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.slider-bar-container[data-v-1797400a] {\n  height: 0.74667rem;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  overflow: hidden;\n}\n.range-bar[data-v-1797400a]{\n  overflow: hidden;\n}\n.value-bar[data-v-1797400a] {\n  height: 0.05333rem;\n  overflow: hidden;\n}\n.slide-block[data-v-1797400a] {\n  width: 0.74667rem;\n  height: 0.74667rem;\n  background-color: #ffffff;\n  border-radius: 0.37333rem;\n  border-width: 1px;\n  border-color: rgba(0, 0, 0, 0.1);\n  position: absolute;\n  left: 0;\n  bottom: 0;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-slider-bar/index.vue?06df98e0"],"names":[],"mappings":";AA0jBA;EACA,mBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,iBAAA;CACA;AAGA;EACA,iBAAA;CACA;AAEA;EACA,mBAAA;EACA,iBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;EACA,0BAAA;EACA,kBAAA;EACA,iCAAA;EACA,mBAAA;EACA,QAAA;EACA,UAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by zweipix on 2017-05-09. -->\n<!-- Updated by zweipix on 2018-03-07. -->\n\n<template>\n  <div\n    ref=\"bar-container\"\n    class=\"slider-bar-container\"\n    :style=\"containerStyle\">\n    <div\n      class=\"range-bar\"\n      :style=\"rangeBarStyle\">\n      <div\n        ref=\"value-bar\"\n        class=\"value-bar\"\n        :style=\"valueBarStyle\">\n        <div></div>\n      </div>\n    </div>\n    <div\n      ref=\"slide-block-1\"\n      class=\"slide-block\"\n      @panstart=\"webStartHandler\"\n      @panmove=\"webMoveHandler1\"\n      @touchstart=\"weexStartHandler1\"\n      @touchend=\"weexEndHandler\"\n      @horizontalpan=\"weexHandler1\"\n      :prevent-move-event=\"preventMoveEvent\"\n      :style=\"blockStyle1\">\n      <div></div>\n    </div>\n    <div\n      v-if=\"range\"\n      ref=\"slide-block-2\"\n      class=\"slide-block\"\n      @panstart=\"webStartHandler\"\n      @panmove=\"webMoveHandler2\"\n      @touchstart=\"weexStartHandler2\"\n      @touchend=\"weexEndHandler\"\n      @horizontalpan=\"weexHandler2\"\n      :prevent-move-event=\"preventMoveEvent\"\n      :style=\"blockStyle2\">\n      <div></div>\n    </div>\n  </div>\n</template>\n\n<script>\n  import Utils from '../utils';\n  import BindEnv from '../utils/bind-env';\n  import Binding from 'weex-bindingx/lib/index.weex.js';\n\n  const animation = weex.requireModule('animation');\n  const dom = weex.requireModule('dom');\n\n  export default {\n    data: () => ({\n      env: 'weex',\n      diffX1: 0,\n      diffX2: 0,\n      barWidth: 0,\n      preventMoveEvent: true,\n      minDist: 0,\n      // selectRange: [0, 0],\n      blockRadius: 28,\n      DPR: 1,\n      timeout: 100,\n      isAndroid: Utils.env.isAndroid()\n    }),\n    props: {\n      selectRange: {\n        type: Array,\n        default: [0, 0]\n      },\n      length: {\n        type: Number,\n        default: 500\n      },\n      height: {\n        type: Number,\n        default: 4\n      },\n      // 是否双滑块模式\n      range: {\n        type: Boolean,\n        default: false\n      },\n      // 最小值\n      min: {\n        type: Number,\n        default: 0\n      },\n      // 最大值\n      max: {\n        type: Number,\n        default: 100\n      },\n      // 最小取值范围，用于范围选择范围最小差值\n      minDiff: {\n        type: Number,\n        default: 5\n      },\n      // 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number]\n      value: {\n        type: [Number, Array],\n        default: 0\n      },\n      // 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number]\n      defaultValue: {\n        type: [Number, Array],\n        default: 0\n      },\n      // 值为 true 时，滑块为禁用状态\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      invalidColor: {\n        type: String,\n        default: '#E0E0E0'\n      },\n      validColor: {\n        type: String,\n        default: '#EE9900'\n      },\n      disabledColor: {\n        type: String,\n        default: '#AAA'\n      }\n    },\n    watch: {\n      value(e) {\n        if (!this.range) {\n          this.diffX1 = this._getDiffX(e || this.defaultValue);\n        } else {\n          this.diffX1 = this._getDiffX(e[0] || this.defaultValue[0]);\n          this.diffX2 = this._getDiffX(e[1] || this.defaultValue[1]);\n          this.barWidth = this.diffX2 - this.diffX1;\n        }\n      }\n    },\n    created() {\n      if (Utils.env.isWeb()) {\n        this.env = 'web';\n        this.DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;\n      } else {\n        this.DPR = weex.config.env.scale;\n      }\n    },\n    mounted() {\n      this.block1 = this.$refs['slide-block-1'];        // 左侧滑块\n      this.block2 = this.$refs['slide-block-2'];        // 右侧滑块\n      this.valueBar = this.$refs['value-bar'];          // 黄色值条\n      this.barContainer = this.$refs['bar-container'];  // 滚动条容器\n\n      if (!this.range) {\n        this.diffX1 = this._getDiffX(this.value || this.defaultValue);\n      } else {\n        this.diffX1 = this._getDiffX(this.value[0] || this.defaultValue[0]);\n        this.diffX2 = this._getDiffX(this.value[1] || this.defaultValue[1]);\n        this.barWidth = this.diffX2 - this.diffX1;\n      }\n\n      // 是否支持expresstionBinding\n      if (BindEnv.supportsEB() && Binding.prepare) {\n        this.block1 && Binding.prepare({\n          anchor: this.block1.ref,\n          eventType: 'pan'\n        });\n        this.block2 && Binding.prepare({\n          anchor: this.block2.ref,\n          eventType: 'pan'\n        });\n        this.valueBar && Binding.prepare({\n          anchor: this.valueBar.ref,\n          eventType: 'pan'\n        });\n      }\n\n      if (this.range) {\n        this.selectRange = this.value || this.defaultValue;                    // 初始化范围选择返回数据\n        this.minDist = (this.minDiff / (this.max - this.min)) * this.length;  // 滑块1、2之前最小间距\n      }\n\n      // 由于weex在mounted后渲染是异步的不能确保元素渲染完成，需要异步执行\n      setTimeout(() => {\n        dom.getComponentRect(this.barContainer, option => {\n          const { left } = option.size;\n          this.leftDiffX = left;\n        });\n      }, 100);\n    },\n\n    computed: {\n      containerStyle() {\n        return {\n          width: `${this.length + 56}px`,\n          height: '56px'\n        };\n      },\n      rangeBarStyle() {\n        return {\n          width: `${this.length}px`,\n          height: `${this.height}px`,\n          flexDirection: 'row',\n          backgroundColor: this.invalidColor\n        };\n      },\n      valueBarStyle() {\n        let left = 0;\n        let width = 0;\n\n        if (!this.range) {\n          left = this.diffX1 - this.length;\n          width = this.length;\n        } else {\n          left = this.diffX1;\n          width = this.diffX2 - this.diffX1;\n        }\n\n        return {\n          width: width + 'px',\n          height: this.height + 'px',\n          transform: `translateX(${left}px)`,\n          backgroundColor: this.disabled ? this.disabledColor : this.validColor\n        };\n      },\n      blockStyle1() {\n        let left = this.diffX1;\n        return {\n          transform: `translateX(${left}px)`\n        };\n      },\n      blockStyle2() {\n        return {\n          transform: `translateX(${this.diffX2}px)`\n        }\n      }\n    },\n    methods: {\n\n      // 更新单选值或最小值\n      weexHandler1(e) {\n        const self = this;\n        switch (e.state) {\n          case 'start':\n            self.bindBlock1();\n            break;\n          case 'move':\n            dom.getComponentRect(this.block1, option => {\n              const { left } = option.size;\n              const value = this._getValue(left - this.leftDiffX);\n              if (!this.range) {\n                this.$emit('updateValue', value);\n              } else {\n                this.selectRange[0] = value;\n                this.$emit('updateValue', this.selectRange);\n              }\n            });\n            break;\n          case 'end':\n            break;\n          default:\n            break;\n        }\n      },\n\n      // 更新最大值\n      weexHandler2(e) {\n        const self = this;\n\n        switch (e.state) {\n          case 'start':\n            self.bindBlock2();\n            break;\n          case 'move':\n            dom.getComponentRect(this.block2, option => {\n              const { left } = option.size;\n              this.selectRange[1] = this._getValue(left - this.leftDiffX);\n              this.$emit('updateValue', this.selectRange);\n            });\n            break;\n          case 'end':\n            break;\n          default:\n            break;\n        }\n      },\n\n      weexStartHandler1() {\n        // 由于android端不支持 horizontalpan 的move事件，使用setInterval hack方案\n        if (!this.isAndroid) {\n          return;\n        }\n        this.firstInterval = setInterval(() => {\n          dom.getComponentRect(this.block1, option => {\n            const { left } = option.size;\n            const value = this._getValue(left - this.leftDiffX);\n            if (!this.range) {\n              this.$emit('updateValue', value);\n            } else {\n              this.selectRange[0] = value;\n              this.$emit('updateValue', this.selectRange);\n            }\n          });\n        }, this.timeout);\n      },\n\n      weexStartHandler2() {\n        if (!this.isAndroid) {\n          return;\n        }\n        // 由于android端不支持 horizontalpan 的move事件，使用setInterval hack方案\n        this.secondInterval = setInterval(() => {\n          dom.getComponentRect(this.block2, option => {\n            const { left } = option.size;\n            this.selectRange[1] = this._getValue(left - this.leftDiffX);\n            this.$emit('updateValue', this.selectRange);\n          });\n        }, this.timeout);\n      },\n\n      // 清除定时器\n      weexEndHandler() {\n        if (!this.isAndroid) {\n          return;\n        }\n        this.firstInterval && clearInterval(this.firstInterval);\n        this.secondInterval && clearInterval(this.secondInterval);\n      },\n\n      webStartHandler(e) {\n        if (this.env === 'weex') {\n          return;\n        }\n        this.startX = e.touch.clientX;\n        this.startDiffX1 = this.diffX1;\n        this.startDiffX2 = this.diffX2;\n      },\n\n      webMoveHandler1(e) {\n        if (this.env === 'weex' || this.disabled) {\n          return;\n        }\n\n        const deltaX = (e.touch.clientX - this.startX) * this.DPR;\n        const diff = this.startDiffX1 + deltaX;\n\n        let max = this.length;\n        if (this.range) {\n          max = this.diffX2 - this.minDist;\n        }\n\n        if (diff > 0 && diff < max) {\n          this.diffX1 = diff;\n          animation.transition(this.block1, {\n            styles: {\n              transform: `translateX(${this.diffX1}px)`\n            }\n          }, () => {});\n          if (!this.range) {\n            this.$emit('updateValue', this._getValue(this.diffX1));\n          } else {\n            this.selectRange[0] = this._getValue(this.diffX1);\n            this.$emit('updateValue', this.selectRange);\n          }\n        }\n      },\n\n      webMoveHandler2(e) {\n        if (this.env === 'weex' || this.disabled) {\n          return;\n        }\n\n        const deltaX = (e.touch.clientX - this.startX) * this.DPR;\n        const diff = this.startDiffX2 + deltaX;\n        const min = this.diffX1 + this.minDist;\n        const max = this.length;\n\n        if (diff > min && diff < max) {\n          this.diffX2 = diff;\n          animation.transition(this.block2, {\n            styles: {\n              transform: `translateX(${this.diffX2}px)`\n            }\n          }, () => {});\n          if (!this.range) {\n            this.$emit('updateValue', this._getValue(this.diffX2));\n          } else {\n            this.selectRange[1] = this._getValue(this.diffX2);\n            this.$emit('updateValue', this.selectRange);\n          }\n        }\n      },\n\n      bindBlock1() {\n        const self = this;\n\n        // 如果禁用，不行进行表达式绑定\n        if (self.disabled) {\n          Binding.unbind({\n            token: this.gesToken1,\n            eventType: 'pan',\n          })\n          this.gesToken1 = 0;\n          return;\n        }\n\n        // 初始化按钮&条的大小范围\n        let blockMax1 = 0;\n        if (self.range) {\n          blockMax1 = self.diffX2 - self.minDist;\n        } else {\n          blockMax1 = self.length;\n        }\n\n        const barMax1 = self.diffX2;\n\n        if (!self.range) {\n\n          const startLeft = self.diffX1 - blockMax1 - self.minDist;\n\n          const props = [{\n            element: self.block1.ref,\n            property: 'transform.translateX',\n            expression: `min(${blockMax1}, max(x + ${self.diffX1}, 0))`\n          }, {\n            element: self.valueBar.ref,\n            property: 'transform.translateX',\n            expression: `min(0, max(x + ${startLeft}, -${blockMax1}))`\n          }];\n\n          const gesTokenObj = Binding.bind({\n            anchor: self.block1.ref,\n            eventType: 'pan',\n            props\n          }, (e) => {\n            if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {\n              const range = self.getRange();\n              // 限制diffX1范围\n              self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);\n              self.bindBlock1();\n            }\n          });\n          this.gesToken1 = gesTokenObj.token;\n        } else {\n\n          // 选范围\n          const props = [{\n            element: self.block1.ref,\n            property: 'transform.translateX',\n            expression: `min(${blockMax1}, max(x + ${self.diffX1}, 0))`\n          }, {\n            element: self.valueBar.ref,\n            property: 'transform.translateX',\n            expression: `min(${blockMax1}, max(x + ${self.diffX1}, 0))`\n          }, {\n            element: self.valueBar.ref,\n            property: 'width',\n            expression: `min(${barMax1}, max(0, ${self.barWidth} - x))`\n          }];\n\n          const gesTokenObj = Binding.bind({\n            anchor: self.block1.ref,\n            eventType: 'pan',\n            props\n          }, (e) => {\n            if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {\n              const range = self.getRange();\n              self.barWidth = self._restrictValue(range.rangeX1, self.barWidth - e.deltaX);\n              self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);\n              self.bindBlock1();\n            }\n          });\n          this.gesToken1 = gesTokenObj.token;\n        }\n      },\n\n      bindBlock2() {\n        const self = this;\n\n        // 如果禁用，不行进行表达式绑定\n        if (self.disabled) {\n          Binding.unbind({\n            token: this.gesToken2,\n            eventType: 'pan',\n          });\n          this.gesToken2 = 0;\n          return;\n        }\n\n        // 初始化按钮&条的大小范围\n        let blockMax1 = 0;\n        if (self.range) {\n          blockMax1 = self.diffX2 - self.minDist;\n        } else {\n          blockMax1 = self.length;\n        }\n\n        const blockMax2 = self.length;\n        const blockMin2 = self.diffX1 + self.minDist;\n        const barMax2 = self.length - self.diffX1;\n\n        const props = [{\n          element: self.block2.ref,\n          property: 'transform.translateX',\n          expression: `min(${blockMax2}, max(x + ${self.diffX2}, ${blockMin2}))`\n        }, {\n          element: self.valueBar.ref,\n          property: 'width',\n          expression: `min(${barMax2}, max(0, x + ${self.barWidth}))`\n        }];\n\n        const gesTokenObj = Binding.bind({\n          anchor: self.block2.ref,\n          eventType: 'pan',\n          props\n        }, (e) => {\n          if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {\n            const range = self.getRange();\n            self.barWidth = self._restrictValue([0, self.length - self.diffX1], self.barWidth + e.deltaX);\n            self.diffX2 = self._restrictValue(range.rangeX2, self.diffX2 + e.deltaX);\n            self.bindBlock2();\n          }\n        });\n        this.gesToken2 = gesTokenObj.token;\n      },\n\n      // 获取diffx1 diffx2 取值范围\n      getRange() {\n        if (!this.range) {\n          return {\n            rangeX1: [0, this.length]\n          }\n        } else {\n          return {\n            rangeX1: [0, this.diffX2 - this.minDist],\n            rangeX2: [this.diffX1 + this.minDist, this.length]\n          }\n        }\n      },\n\n      // 限制取值范围\n      _restrictValue(range, value) {\n        if (range && range.length && range.length === 2) {\n          if (value < range[0]) {\n            return range[0];\n          } else if (value > range[1]) {\n            return range[1];\n          } else {\n            return value;\n          }\n        }\n        return;\n      },\n\n      // 根据x方向偏移量计算value\n      _getValue(diffX) {\n        return Math.round((diffX / this.length) * (this.max - this.min) + this.min);\n      },\n\n      // 根据value和length计算x方向偏移值\n      _getDiffX(value) {\n        return ((value - this.min) / (this.max - this.min)) * this.length;\n      }\n    }\n  }\n</script>\n\n<style scoped>\n  .slider-bar-container {\n    height: 56px;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n  }\n\n\n  .range-bar{\n    overflow: hidden;\n  }\n\n  .value-bar {\n    height: 4px;\n    overflow: hidden;\n  }\n\n  .slide-block {\n    width: 56px;\n    height: 56px;\n    background-color: #ffffff;\n    border-radius: 28px;\n    border-width: 1px;\n    border-color: rgba(0, 0, 0, 0.1);\n    position: absolute;\n    left: 0;\n    bottom: 0;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.slide-nav[data-v-1983b04c] {\n  position: absolute;\n  z-index: 1000;\n}\n\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-slide-nav/index.vue?05270afd"],"names":[],"mappings":";AAUA;EACA,mBAAA;EACA,cAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by 虎牙 on 17/07/28. -->\n\n<template>\n  <div class=\"slide-nav\" ref=\"wrapper\">\n    <slot></slot>\n  </div>\n</template>\n\n<style scoped>\n  .slide-nav {\n    position: absolute;\n    z-index: 1000;\n  }\n\n</style>\n\n<script>\n  const DOM = weex.requireModule('dom');\n  const Animation = weex.requireModule('animation');\n  const OFFSET_ACCURACY = 10;\n  const SCALE = weex.config.env.platform.toLowerCase() === 'web' ? 2 : 1;\n\n  function _toNum (str) {\n    return typeof str === 'number' ? str : parseFloat((str || '').replace(/px$/i, ''));\n  }\n\n  function _getHeight (element, callback) {\n    if (!element) {\n      return;\n    }\n    if (element.__cacheHeight) {\n      element.__cacheHeight && callback && callback(element.__cacheHeight);\n    } else {\n      DOM.getComponentRect(element, (res) => {\n        let height = (parseFloat(res && res.size && res.size.height) || 0) / SCALE;\n        height && callback && callback((element.__cacheHeight = height));\n      });\n    }\n  }\n\n  export default {\n\n    props: {\n      position: {\n        'type': String,\n        'default': 'top'\n      },\n\n      height: [String, Number]\n    },\n\n    data () {\n      return {\n        visible: true\n      }\n    },\n\n    watch: {\n      visible (newVal) {\n        newVal ? this._slideIn() : this._slideOut();\n      }\n    },\n\n    created () {\n      this._height = _toNum(this.height) || 0;\n      this._isBottom = this.position === 'bottom';\n      this._direction = this._isBottom ? 1 : -1;\n    },\n\n    methods: {\n\n      _slideOut () {\n        this.getHeight((height) => {\n          this.$emit('slideOut');\n          this.slideY(height * this._direction * SCALE, () => {\n            this.$emit('slideOutEnd');\n          });\n        });\n      },\n\n      _slideIn () {\n        this.getHeight((height) => {\n          this.$emit('slideIn');\n          this.slideY(0, () => {\n            this.$emit('slideInEnd');\n          });\n        });\n      },\n\n      getHeight (callback) {\n        return _getHeight(this.$refs.wrapper, callback);\n      },\n\n      slideOut () {\n        this.visible = false;\n      },\n\n      slideIn () {\n        this.visible = true;\n      },\n\n      slideY (y, callback) {\n        Animation.transition(this.$refs.wrapper, {\n          styles: { transform: 'translateY(' + y + 'px)' },\n          duration: 150, //ms\n          timingFunction: 'ease',\n          delay: 0 //ms\n        }, callback);\n      }\n    },\n\n    handleTouchStart (e) {\n      let touch = e.changedTouches[0];\n      this._touchParams = {\n        pageY: touch.screenY,\n        startY: touch.screenY,\n        lastPageY: touch.screenY,\n        timeStamp: e.timeStamp,\n        direction: -1\n      };\n    },\n\n    handleTouchMove (e, bottomNav) {\n      let tp = this._touchParams;\n      let touch = e.changedTouches[0];\n      let offsetY;\n\n      // 安卓下滚动的时候经常不触发touchstart事件\n      if (!tp || tp.hasEnd) {\n        return (this._touchParams = {\n          pageY: touch.screenY,\n          startY: touch.screenY,\n          lastPageY: touch.screenY,\n          timeStamp: e.timeStamp,\n          direction: -1\n        });\n      }\n\n      offsetY = touch.screenY - tp.pageY;\n\n      tp.lastPageY = tp.pageY;\n      tp.lastDirection = tp.direction;\n      tp.direction = offsetY > 0 ? 1 : -1;\n\n      if (tp.lastDirection !== tp.direction) {\n        tp.startY = tp.lastPageY;\n      }\n\n      tp.pageY = touch.screenY;\n      tp.offsetY = tp.pageY - tp.startY;\n\n      if (!this.__scrollable && bottomNav) {\n        if (tp.offsetY <= -OFFSET_ACCURACY) {\n          bottomNav.slideOut();\n        } else if (tp.offsetY >= OFFSET_ACCURACY) {\n          bottomNav.slideIn();\n        }\n      }\n    },\n\n    handleTouchEnd () {\n      let tp = this._touchParams;\n      tp && (tp.hasEnd = true);\n    },\n\n    handleScroll (e, scroller, topNav, bottomNav, startThreshold, moveThreshold = 5) {\n      let scrollY = e.contentOffset.y;\n      let nav = topNav || bottomNav;\n      let scrollFn = (maxScrollY) => {\n        if (-scrollY > maxScrollY) {\n          return;\n        }\n        maxScrollY = Math.abs(maxScrollY);\n        if (Math.abs(scrollY) < startThreshold) {\n          if (Math.abs(scrollY) >= maxScrollY - OFFSET_ACCURACY) {\n            let tp = this._touchParams;\n            if (!tp) {\n              return;\n            }\n            let offsetY = tp.offsetY;\n            if (offsetY < -OFFSET_ACCURACY) {\n              bottomNav && bottomNav.slideOut();\n            } else if (offsetY > OFFSET_ACCURACY) {\n              bottomNav && bottomNav.slideIn();\n            }\n          } else {\n            topNav && topNav.slideIn();\n            bottomNav && bottomNav.slideIn();\n          }\n        } else {\n          let tp = this._touchParams;\n          if (!tp) {\n            return;\n          }\n          let offsetY = tp.offsetY;\n          if (Math.abs(offsetY) >= moveThreshold) {\n            if (offsetY > 0) {\n              topNav && topNav.slideIn();\n              bottomNav && bottomNav.slideIn();\n            } else {\n              topNav && topNav.slideOut();\n              bottomNav && bottomNav.slideOut();\n            }\n          }\n        }\n      };\n\n      let maxScrollYCheck = (maxScrollY) => {\n        if (!this.__scrollable) {\n          return;\n        }\n        if (startThreshold) {\n          scrollFn(maxScrollY);\n        } else {\n          nav.getHeight((navHeight) => {\n            startThreshold = navHeight;\n            scrollFn(maxScrollY);\n          });\n        }\n      };\n\n      if (!nav) {\n        return;\n      }\n\n      _getHeight(scroller, (scrollerHeight) => {\n        let maxScrollY = e.contentSize.height - scrollerHeight;\n        this.__scrollable = maxScrollY >= OFFSET_ACCURACY;\n\n        if (bottomNav) {\n          bottomNav.getHeight((height) => {\n            this.__scrollable = maxScrollY >= height;\n            maxScrollYCheck(maxScrollY);\n          });\n        } else {\n          maxScrollYCheck(maxScrollY);\n        }\n      });\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.indicator[data-v-1f2af058] {\n  position: absolute;\n  item-color: rgba(255, 195, 0, .5);\n  item-selected-color: #ffc300;\n  item-size: 0.26667rem;\n  height: 0.26667rem;\n  bottom: 0.32rem;\n}\n.indicator .weex-indicator-item[data-v-1f2af058] {\n  width: 0.26667rem;\n  height: 0.26667rem;\n}\n.indicator .weex-indicator-item.weex-indicator-item-active[data-v-1f2af058] {\n  background-color: #ffc300;\n}\n.indicator .weex-indicator-item[data-v-1f2af058] {\n  background-color: rgba(255, 195, 0, .5);\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-lightbox/index.vue?7d93da24","/Users/Tw93/www/github/weex-ui/packages/wxc-lightbox/<input css 6>","/Users/Tw93/www/github/weex-ui/packages/wxc-lightbox/<input css 5>","/Users/Tw93/www/github/weex-ui/packages/wxc-lightbox/<input css 4>"],"names":[],"mappings":";AAgCA;EACA,mBAAA;EACA,kCAAA;EACA,6BAAA;EACA,sBAAA;EACA,mBAAA;EACA,gBAAA;CACA;ACtCA;EACE,kBAAY;EACZ,mBAAa;CACd;ACHD;EACE,0BAA0B;CAC3B;ACFD;EACE,wCAAwC;CACzC","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <wxc-mask :width=\"width\"\n            :height=\"height\"\n            aria-hidden=\"true\"\n            mask-bg-color=\"transparent\"\n            overlay-opacity=\"0.8\"\n            :show=\"show\"\n            :opacity='opacity'\n            :show-close=\"false\"\n            @wxcMaskSetHidden=\"maskOverlayClick\">\n    <slider auto-play=\"false\"\n            v-if=\"show\"\n            :index=\"index\"\n            :interval=\"interval\"\n            :style=\"{ height: height  + 'px'}\">\n      <div v-for=\"(v,index) in imageList\"\n           :style=\"{ height: height  + 'px'}\"\n           :key=\"index\">\n        <image resize=\"cover\"\n               :src=\"v.src\"\n               :style=\"{ height: height + 'px', width: width  + 'px'}\"></image>\n      </div>\n      <indicator class=\"indicator\"\n                 :style=\"indicatorStyle\"></indicator>\n    </slider>\n  </wxc-mask>\n</template>\n\n<style scoped>\n  .indicator {\n    position: absolute;\n    item-color: rgba(255, 195, 0, .5);\n    item-selected-color: #ffc300;\n    item-size: 20px;\n    height: 20px;\n    bottom: 24px;\n  }\n</style>\n\n<script>\n  import WxcMask from '../wxc-mask';\n\n  export default {\n    components: {\n      WxcMask\n    },\n    props: {\n      width: {\n        type: [Number, String],\n        default: 750\n      },\n      height: {\n        type: [Number, String],\n        default: 750\n      },\n      show: {\n        type: Boolean,\n        default: false\n      },\n      imageList: Array,\n      indicatorColor: {\n        type: Object,\n        default: () => ({\n          'item-color': 'rgba(255, 195, 0, .5)',\n          'item-selected-color': '#ffc300',\n          'item-size': '20px'\n        })\n      },\n      index: {\n        type: [Number, String],\n        default: 0\n      },\n      interval:{\n        type: [Number, String],\n        default: 3000\n      },\n      opacity: {\n        type: [Number, String],\n        default: 0.6\n      },\n    },\n    computed: {\n      indicatorStyle () {\n        return {\n          width: this.width + 'px',\n          ...this.indicatorColor\n        }\n      }\n    },\n    methods: {\n      maskOverlayClick () {\n        this.$emit('wxcLightboxOverlayClicked', {});\n      }\n    }\n  };\n</script>\n","\n.indicator .weex-indicator-item {\n  width: 20px;\n  height: 20px;\n}","\n.indicator .weex-indicator-item.weex-indicator-item-active {\n  background-color: #ffc300;\n}","\n.indicator .weex-indicator-item {\n  background-color: rgba(255, 195, 0, .5);\n}"],"sourceRoot":""}]);

// exports


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-refresher[data-v-2059e45b] {\n  height: 1.86667rem;\n  width: 10rem;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  /* flex-wrap: nowrap; */\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  padding-top: 0.66667rem;\n}\n.cycle-container[data-v-2059e45b] {\n  position: relative;\n  width: 0.8rem;\n  height: 0.8rem;\n}\n.u-cover[data-v-2059e45b] {\n  position: absolute;\n  width: 0.4rem;\n  height: 0.8rem;\n  top: 0;\n  background-color: #ffffff;\n  overflow: hidden;\n  right: 0;\n}\n.c1[data-v-2059e45b] {\n  z-index: 1;\n}\n.c2[data-v-2059e45b] {\n  z-index: 2;\n  -webkit-transform-origin: left center;\n          transform-origin: left center;\n  -webkit-transform: rotateZ(0deg);\n          transform: rotateZ(0deg);\n}\n.u-cover-cycle[data-v-2059e45b] {\n  position: absolute;\n  width: 0.8rem;\n  height: 0.8rem;\n  right: 0;\n  top: 0;\n  /* box-sizing: border-box; */\n  border-width: 0.02667rem;\n  border-color: #666666;\n  border-style: solid;\n  border-radius: 0.4rem;\n  opacity: 0;\n}\n.cover1[data-v-2059e45b] {\n  opacity: 1;\n}\n.indicator[data-v-2059e45b] {\n  margin-right: 0.26667rem;\n  height: 0.8rem;\n  width: 0.8rem;\n  color: #666666;\n}\n.arrow-down[data-v-2059e45b] {\n  position: relative;\n  top: 0.2rem;\n  left: -0.6rem;\n  width: 0.4rem;\n  height: 0.4rem;\n}\n.u-txt[data-v-2059e45b] {\n  font-size: 0.32rem;\n  line-height: 0.53333rem;\n  color: #999999;\n  margin-top: 0.13333rem;\n  margin-left: 0.13333rem;\n  height: 0.53333rem;\n  lines: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 1;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-refresher/index.vue?4bbd415d","/Users/Tw93/www/github/weex-ui/packages/wxc-refresher/<no source>"],"names":[],"mappings":";AAqNA;EACA,mBAAA;EACA,aAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,wBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,wBAAA;CACA;AAEA;EACA,mBAAA;EACA,cAAA;EACA,eAAA;CACA;AAEA;EACA,mBAAA;EACA,cAAA;EACA,eAAA;EACA,OAAA;EACA,0BAAA;EACA,iBAAA;EACA,SAAA;CACA;AAEA;EACA,WAAA;CACA;AAEA;EACA,WAAA;EACA,sCAAA;UAAA,8BAAA;EACA,iCAAA;UAAA,yBAAA;CACA;AAEA;EACA,mBAAA;EACA,cAAA;EACA,eAAA;EACA,SAAA;EACA,OAAA;EACA,6BAAA;EACA,yBAAA;EACA,sBAAA;EACA,oBAAA;EACA,sBAAA;EACA,WAAA;CACA;AAEA;EACA,WAAA;CACA;AAEA;EACA,yBAAA;EACA,eAAA;EACA,cAAA;EACA,eAAA;CACA;AAEA;EACA,mBAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;EACA,eAAA;CACA;AAEA;EACA,mBAAA;EACA,wBAAA;EACA,eAAA;EACA,uBAAA;EACA,wBAAA;EACA,mBAAA;EACA,SAAA;EChSA,iBAAA;EAAA,wBAAA;EAAA,sBAAA;CDiSA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 WeexUI Group Holding Limited. -->\n<!-- Created by git@zwwill on 18/02/08. -->\n<template>\n  <refresh class=\"wxc-refresher\"\n           @refresh=\"onRefresh\"\n           @pullingdown=\"onPullingDown\"\n           :display=\"refreshing ? 'show' : 'hide'\">\n    <div v-if=\"newStyleFlag\" class=\"cycle-container\" ref=\"cycle\">\n      <div class=\"u-cover c1\" ref=\"cover1\">\n        <div class=\"u-cover-cycle cover1\"></div>\n      </div>\n      <div class=\"u-cover c2\" ref=\"cover2\">\n        <div class=\"u-cover-cycle\" ref=\"cover-cycle\"></div>\n      </div>\n    </div>\n    <image v-if=\"newStyleFlag\"\n           class=\"arrow-down\"\n           ref=\"arrow\"\n           :src=\"ICON_ARROW_DOWN\"\n           resize=\"contain\"></image>\n    <loading-indicator v-else class=\"indicator\"></loading-indicator>\n    <p class=\"u-txt\" :style=\"{width:`${textWidth}px`}\">{{refresherText}}</p>\n  </refresh>\n</template>\n<script>\n  const animation = weex.requireModule('animation');\n\n  // 减少打包体积\n  import bindingx from 'weex-bindingx/lib/index.weex';\n  import BindEnv  from '../utils/bind-env';\n  import Utils from '../utils';\n\n  const ICON_ARROW_DOWN = 'https://img.alicdn.com/tfs/TB1A8faeTtYBeNjy1XdXXXXyVXa-48-48.png';\n\n  export default {\n    props: {\n      scrollerRef: String,\n      maxTime: {\n        type: Number,\n        default: 0\n      },\n      mainText: {\n        type: String,\n        default: '下拉即可刷新...'\n      },\n      pullingText: {\n        type: String,\n        default: '释放即可刷新...'\n      },\n      refreshingText: {\n        type: String,\n        default: '加载中...'\n      },\n      textWidth: {\n        type: Number,\n        default: 200\n      }\n    },\n    data () {\n      return {\n        ICON_ARROW_DOWN,\n        refreshing: false,\n        couldUnLash: false\n      }\n    },\n    computed: {\n      newStyleFlag () {\n        return this.scrollerRef && BindEnv.supportsEBForIos();\n      },\n      refresherText () {\n        return this.refreshing ? this.refreshingText : this.pText;\n      },\n      pText () {\n        return this.couldUnLash ? this.pullingText : this.mainText;\n      }\n    },\n    created () {\n      this.newStyleFlag && this.animationBinding();\n    },\n    beforeDestroy () {\n      this.bindingsDestroy();\n    },\n    methods: {\n      onRefresh (event) {\n        this.$emit('wxcRefresh', event);\n        this.refreshing = true;\n        this.newStyleFlag && this.cycleGoRound();\n        if (this.maxTime <= 0) return;\n        this.timeoutSto && clearTimeout(this.timeoutSto);\n        this.timeoutSto = setTimeout(() => {\n          this.$emit('wxcTimeout');\n          this.wxcCancel();\n        }, this.maxTime);\n      },\n      /**\n       * 取消 refreshing\n       */\n      wxcCancel () {\n        this.refreshing = false;\n        this.timeoutSto && clearTimeout(this.timeoutSto);\n        this.roundingDestroy();\n      },\n      /**\n       * 下拉事件\n       */\n      onPullingDown (event) {\n        this.$emit('wxcPullingDown',event);\n        let pd = event.pullingDistance * (Utils.env.isIOS() ? -1 : 1);\n        pd > (Utils.env.isAndroid() ? 200 : 140) ? (this.couldUnLash = true) : (this.couldUnLash = false);\n        if (this.refreshing && pd < 20) {\n          this.timeoutSto && clearTimeout(this.timeoutSto);\n          this.refreshing = false;\n          this.roundingDestroy();\n        }\n      },\n      /**\n       * 注册 bindingx\n       */\n      animationBinding () {\n        setTimeout(() => {\n          // 降级版本取不到，需要注意\n          const scroller = this.$parent.$refs[this.scrollerRef].ref;\n          const cover2 = this.$refs['cover2'].ref;\n          const coverCycle = this.$refs['cover-cycle'].ref;\n\n          const bindingResult = bindingx.bind({\n            eventType: 'scroll',\n            anchor: scroller,\n            props: [\n              {\n                element: cover2,\n                property: 'transform.rotateZ',\n                expression: 'y>-140?(y%75/150*-360):156'\n              },\n              {\n                element: coverCycle,\n                property: 'opacity',\n                expression: 'y<-75 ?1:0'\n              }\n            ]\n          }, (e) => {});\n          this.bindingToken = bindingResult.token;\n        }, 300);\n      },\n      /**\n       * 旋转动作\n       */\n      cycleGoRound () {\n        if (Utils.env.isAndroid()) return;\n        let cycle = this.$refs['cycle'].ref;\n        this.arrowShow(false);\n        if (!cycle) {\n          return;\n        }\n        const roundingResult = bindingx.bind({\n          eventType: 'timing',\n          props: [\n            {\n              element: cycle,\n              property: 'transform.rotateZ',\n              expression: 't*0.72'\n            }\n          ]\n        }, (e) => {\n        });\n        this.roundingToken = roundingResult.token;\n      },\n      /**\n       * 箭头显隐控制\n       */\n      arrowShow (_show = true) {\n        const arrow = this.$refs['arrow'];\n        arrow && animation.transition(arrow, {\n          styles: {\n            opacity: _show ? 1 : 0,\n            transform: _show ? \"scale(1)\" : \"scale(0.5)\"\n          },\n          duration: 300,\n          delay: 0\n        }, () => {\n        });\n      },\n      /**\n       * 完整 bindingx 销毁\n       */\n      bindingsDestroy () {\n        if (this.bindingToken !== 0) {\n          bindingx && bindingx.unbind({\n            eventType: 'scroll',\n            token: this.bindingToken\n          });\n          this.bindingToken = 0;\n        }\n        this.roundingDestroy();\n      },\n      /**\n       * 旋转 bindingx 销毁\n       */\n      roundingDestroy () {\n        if (this.roundingToken !== 0) {\n          bindingx && bindingx.unbind({\n            eventType: 'timing',\n            token: this.roundingToken\n          });\n          this.roundingToken = 0;\n        }\n        this.arrowShow(true);\n      }\n    }\n  }\n</script>\n<style scoped>\n\n  .wxc-refresher {\n    height: 140px;\n    width: 750px;\n    flex-direction: row;\n    /* flex-wrap: nowrap; */\n    justify-content: center;\n    padding-top: 50px;\n  }\n\n  .cycle-container {\n    position: relative;\n    width: 60px;\n    height: 60px;\n  }\n\n  .u-cover {\n    position: absolute;\n    width: 30px;\n    height: 60px;\n    top: 0;\n    background-color: #ffffff;\n    overflow: hidden;\n    right: 0;\n  }\n\n  .c1 {\n    z-index: 1;\n  }\n\n  .c2 {\n    z-index: 2;\n    transform-origin: left center;\n    transform: rotateZ(0deg);\n  }\n\n  .u-cover-cycle {\n    position: absolute;\n    width: 60px;\n    height: 60px;\n    right: 0;\n    top: 0;\n    /* box-sizing: border-box; */\n    border-width: 2px;\n    border-color: #666666;\n    border-style: solid;\n    border-radius: 30px;\n    opacity: 0;\n  }\n\n  .cover1 {\n    opacity: 1;\n  }\n\n  .indicator {\n    margin-right: 20px;\n    height: 60px;\n    width: 60px;\n    color: #666666;\n  }\n\n  .arrow-down {\n    position: relative;\n    top: 15px;\n    left: -45px;\n    width: 30px;\n    height: 30px;\n  }\n\n  .u-txt {\n    font-size: 24px;\n    line-height: 40px;\n    color: #999999;\n    margin-top: 10px;\n    margin-left: 10px;\n    height: 40px;\n    lines: 1;\n  }\n</style>\n",null],"sourceRoot":""}]);

// exports


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.grid-option[data-v-2289217e] {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  border-radius: 0.10667rem;\n  border-width: 0.02667rem;\n  padding-left: 0.08rem;\n  padding-right: 0.08rem;\n}\n.text-title[data-v-2289217e] {\n  lines: 2;\n  line-height: 0.4rem;\n  text-overflow: ellipsis;\n  text-align: center;\n  font-size: 0.34667rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 2;\n}\n.image-checked[data-v-2289217e] {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  width: 0.50667rem;\n  height: 0.45333rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-grid-select/option.vue?9501fc96","/Users/Tw93/www/github/weex-ui/packages/wxc-grid-select/<no source>"],"names":[],"mappings":";AA4HA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EACA,yBAAA;EACA,sBAAA;EACA,uBAAA;CACA;AAEA;EACA,SAAA;EACA,oBAAA;EACA,wBAAA;EACA,mBAAA;EACA,sBAAA;ECzIA,iBAAA;EAAA,wBAAA;EAAA,sBAAA;CD0IA;AAEA;EACA,mBAAA;EACA,SAAA;EACA,UAAA;EACA,kBAAA;EACA,mBAAA;CACA","file":"option.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by 南麓 on 2017/8/10. -->\n\n<template>\n  <div class=\"grid-option\"\n       :style=\"cWrapperStyle\"\n       @click=\"onClick\"\n       :accessible=\"true\"\n       :aria-label=\"`${title},${checked?'已选中':'未选中'}`\">\n    <p v-if=\"title\" class=\"text-title\" :style=\"cTitleStyle\">{{title}}</p>\n\n    <image v-if=\"checked && icon\" class=\"image-checked\" :src=\"icon\"></image>\n  </div>\n</template>\n\n<script>\n  export default {\n    props: {\n      index: {\n        type: Number,\n        default: -1\n      },\n      // 是否选中\n      checked: {\n        type: Boolean,\n        default: false\n      },\n      // 是否可选\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      // 标题\n      title: {\n        type: String,\n        default: ''\n      },\n      width: {\n        type: String,\n        default: '166px'\n      },\n      height: {\n        type: String,\n        default: '72px'\n      },\n      // 默认 x\n      icon: {\n        type: String,\n        default: 'https://gw.alicdn.com/tfs/TB1IAByhgMPMeJjy1XdXXasrXXa-38-34.png'\n      },\n      // 正常状态文字色值\n      color: {\n        type: String,\n        default: '#3d3d3d'\n      },\n      // 选中状态文字色值\n      checkedColor: {\n        type: String,\n        default: '#3d3d3d'\n      },\n      // 不可选状态文字色值\n      disabledColor: {\n        type: String,\n        default: '#9b9b9b'\n      },\n      // 正常状态边框色值\n      borderColor: {\n        type: String,\n        default: 'transparent'\n      },\n      // 选中状态边框色值\n      checkedBorderColor: {\n        type: String,\n        default: '#ffb200'\n      },\n      // 不可选状态边框色值\n      disabledBorderColor: {\n        type: String,\n        default: 'transparent'\n      },\n      // 正常状态背景色值\n      backgroundColor: {\n        type: String,\n        default: '#f6f6f6'\n      },\n      // 选中状态背景色值\n      checkedBackgroundColor: {\n        type: String,\n        default: '#ffffff'\n      },\n      // 不可选状态背景色值\n      disabledBackgroundColor: {\n        type: String,\n        default: '#f6f6f6'\n      }\n    },\n    computed: {\n      cWrapperStyle () {\n        const { checked, disabled, width, height, borderColor, checkedBorderColor, disabledBorderColor, backgroundColor, checkedBackgroundColor, disabledBackgroundColor } = this;\n        return {\n          width,\n          height,\n          borderColor: disabled ? disabledBorderColor : checked ? checkedBorderColor : borderColor,\n          backgroundColor: disabled ? disabledBackgroundColor : checked ? checkedBackgroundColor : backgroundColor\n        }\n      },\n      cTitleStyle () {\n        const { checked, disabled, color, checkedColor, disabledColor } = this;\n        return {\n          color: disabled ? disabledColor : checked ? checkedColor : color\n        }\n      }\n    },\n    methods: {\n      onClick () {\n        if (!this.disabled) {\n          this.$emit('select', this.index);\n        }\n      }\n    }\n  }\n</script>\n\n<style scoped>\n  .grid-option {\n    justify-content: center;\n    border-radius: 8px;\n    border-width: 2px;\n    padding-left: 6px;\n    padding-right: 6px;\n  }\n\n  .text-title {\n    lines: 2;\n    line-height: 30px;\n    text-overflow: ellipsis;\n    text-align: center;\n    font-size: 26px;\n  }\n\n  .image-checked {\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    width: 38px;\n    height: 34px;\n  }\n</style>\n",null],"sourceRoot":""}]);

// exports


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wrap[data-v-254bbf80] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.wxc-result[data-v-254bbf80] {\n  width: 10rem;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  background-color: #f2f3f4;\n}\n.result-image[data-v-254bbf80] {\n  width: 4.26667rem;\n  height: 4.26667rem;\n}\n.result-content[data-v-254bbf80] {\n  margin-top: 0.48rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.content-text[data-v-254bbf80] {\n  font-size: 0.4rem;\n  color: #A5A5A5;\n  height: 0.56rem;\n  line-height: 0.56rem;\n  text-align: center;\n}\n.content-desc[data-v-254bbf80] {\n  margin-top: 0.13333rem;\n}\n.result-button[data-v-254bbf80] {\n  margin-top: 0.8rem;\n  border-width: 1px;\n  border-color: #979797;\n  background-color: #FFFFFF;\n  border-radius: 0.08rem;\n  width: 3.2rem;\n  height: 0.96rem;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.button-text[data-v-254bbf80] {\n  color: #666666;\n  font-size: 0.4rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-result/index.vue?7c699e77"],"names":[],"mappings":";AA0BA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;CACA;AAEA;EACA,aAAA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,qBAAA;EACA,mBAAA;CACA;AAEA;EACA,uBAAA;CACA;AAEA;EACA,mBAAA;EACA,kBAAA;EACA,sBAAA;EACA,0BAAA;EACA,uBAAA;EACA,cAAA;EACA,gBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;CACA;AAEA;EACA,eAAA;EACA,kBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A  result page-->\n\n<template>\n  <div class=\"wrap\" v-if=\"show\" :style=\"wrapStyle\">\n    <div class=\"wxc-result\" :style=\"{paddingTop: setPaddingTop }\">\n      <image class=\"result-image\"\n             :aria-hidden=\"true\"\n             :src=\"resultType.pic\"></image>\n      <div class=\"result-content\" v-if=\"resultType.content\">\n        <p class=\"content-text\">{{resultType.content}}</p>\n        <p class=\"content-text content-desc\"\n              v-if=\"resultType.desc\">{{resultType.desc}}</p>\n      </div>\n      <div class=\"result-button\"\n           v-if=\"resultType.button\"\n           @touchend=\"handleTouchEnd\"\n           @click=\"onClick\">\n        <p class=\"button-text\">{{resultType.button}}</p>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wrap {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n\n  .wxc-result {\n    width: 750px;\n    flex: 1;\n    align-items: center;\n    background-color: #f2f3f4;\n  }\n\n  .result-image {\n    width: 320px;\n    height: 320px;\n  }\n\n  .result-content {\n    margin-top: 36px;\n    align-items: center;\n  }\n\n  .content-text {\n    font-size: 30px;\n    color: #A5A5A5;\n    height: 42px;\n    line-height: 42px;\n    text-align: center;\n  }\n\n  .content-desc {\n    margin-top: 10px;\n  }\n\n  .result-button {\n    margin-top: 60px;\n    border-width: 1px;\n    border-color: #979797;\n    background-color: #FFFFFF;\n    border-radius: 6px;\n    width: 240px;\n    height: 72px;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .button-text {\n    color: #666666;\n    font-size: 30px;\n  }\n</style>\n\n<script>\n  import TYPES from './type';\n  import Utils from '../utils';\n\n  export default {\n    props: {\n      type: {\n        type: String,\n        default: 'errorPage'\n      },\n      show: {\n        type: Boolean,\n        default: true\n      },\n      wrapStyle: Object,\n      paddingTop: {\n        type: [Number, String],\n        default: 232\n      },\n      customSet: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    computed: {\n      resultType () {\n        const { type, customSet } = this;\n        const allTypes = Utils.isEmptyObject(customSet) ? TYPES : Utils.mergeDeep(TYPES, customSet);\n        let types = allTypes['errorPage'];\n        if (Object.keys(allTypes).indexOf(type) > -1) {\n          types = allTypes[type];\n        }\n        return types;\n      },\n      setPaddingTop () {\n        const paddingTop = this.paddingTop;\n        return `${paddingTop}px`\n      }\n    },\n    methods: {\n      handleTouchEnd (e) {\n        // web上面有点击穿透问题\n        const { platform } = weex.config.env;\n        platform === 'Web' && e.preventDefault && e.preventDefault();\n      },\n      onClick () {\n        const type = this.type;\n        this.$emit('wxcResultButtonClicked', { type })\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-tab-page[data-v-26056765] {\n  width: 10rem;\n  background-color: #f2f3f4;\n}\n.tab-title-list[data-v-26056765] {\n  width: 10rem;\n  position: absolute;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n.title-item[data-v-26056765] {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  border-bottom-style: solid;\n}\n.border-bottom[data-v-26056765] {\n  position: absolute;\n  bottom: 0;\n}\n.tab-page-wrap[data-v-26056765] {\n  width: 10rem;\n}\n.tab-container[data-v-26056765] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  position: absolute;\n}\n.tab-text[data-v-26056765] {\n  lines: 1;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 1;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-tab-page/full-page.vue?65d4199b","/Users/Tw93/www/github/weex-ui/packages/wxc-tab-page/<no source>"],"names":[],"mappings":";AAmDA;EACA,aAAA;EACA,0BAAA;CACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,2BAAA;CACA;AAEA;EACA,mBAAA;EACA,UAAA;CACA;AAEA;EACA,aAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,mBAAA;CACA;AAEA;EACA,SAAA;EACA,wBAAA;ECrFA,iBAAA;EAAA,wBAAA;EAAA,sBAAA;CDsFA","file":"full-page.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n<!-- Updated by Tw93 on 18/04/10. -->\n\n<template>\n  <div class=\"wxc-tab-page\"\n       :style=\"{ height: (tabPageHeight)+'px' }\">\n    <div class=\"tab-page-wrap\"\n         ref=\"tab-page-wrap\"\n         :prevent-move-event=\"true\"\n         @horizontalpan=\"startHandler\"\n         :style=\"{ height: tabPageHeight+'px' }\">\n      <div ref=\"tab-container\"\n           class=\"tab-container\">\n        <slot></slot>\n      </div>\n    </div>\n    <scroller class=\"tab-title-list\"\n              ref=\"tab-title-list\"\n              :show-scrollbar=\"false\"\n              scroll-direction=\"horizontal\"\n              :data-spm=\"spmC\"\n              :style=\"{ backgroundColor: tabStyles.bgColor, height: (tabStyles.height)+'px',top:tabStyles.top+'px' }\">\n      <div class=\"title-item\"\n           v-for=\"(v,index) in tabTitles\"\n           :key=\"index\"\n           :ref=\"'wxc-tab-title-'+index\"\n           @click=\"setPage(index,v.url)\"\n           :style=\"{ width: tabStyles.width +'px', height: tabStyles.height +'px', backgroundColor: currentPage == index ? tabStyles.activeBgColor : tabStyles.bgColor }\"\n           :accessible=\"true\"\n           :aria-label=\"`${v.title?v.title:'标签'+index}`\">\n\n        <image :src=\"currentPage == index ? v.activeIcon : v.icon\"\n               v-if=\"titleType == 'icon'\"\n               :style=\"{ width: tabStyles.iconWidth + 'px', height:tabStyles.iconHeight+'px'}\"></image>\n\n        <p\n          :style=\"{ fontSize: tabStyles.fontSize+'px', fontWeight: (currentPage == index && tabStyles.isActiveTitleBold)? 'bold' : 'normal', color: currentPage == index ? tabStyles.activeTitleColor : tabStyles.titleColor, paddingLeft:(tabStyles.textPaddingLeft?tabStyles.textPaddingLeft:10)+'px', paddingRight:(tabStyles.textPaddingRight?tabStyles.textPaddingRight:10)+'px'}\"\n          class=\"tab-text\">{{v.title}}</p>\n\n        <div class=\"border-bottom\"\n             v-if=\"tabStyles.hasActiveBottom\"\n             :style=\"{ width: tabStyles.activeBottomWidth+'px', left: (tabStyles.width-tabStyles.activeBottomWidth)/2+'px', height: tabStyles.activeBottomHeight+'px', backgroundColor: currentPage == index ? tabStyles.activeBottomColor : 'transparent' }\"></div>\n\n      </div>\n    </scroller>\n\n  </div>\n</template>\n\n<style scoped>\n  .wxc-tab-page {\n    width: 750px;\n    background-color: #f2f3f4;\n  }\n\n  .tab-title-list {\n    width: 750px;\n    position: absolute;\n    flex-direction: row;\n  }\n\n  .title-item {\n    justify-content: center;\n    align-items: center;\n    border-bottom-style: solid;\n  }\n\n  .border-bottom {\n    position: absolute;\n    bottom: 0;\n  }\n\n  .tab-page-wrap {\n    width: 750px;\n  }\n\n  .tab-container {\n    flex: 1;\n    flex-direction: row;\n    position: absolute;\n  }\n\n  .tab-text {\n    lines: 1;\n    text-overflow: ellipsis;\n  }\n</style>\n\n<script>\n  const dom = weex.requireModule('dom');\n  const animation = weex.requireModule('animation');\n  const swipeBack = weex.requireModule('swipeBack');\n  const expressionBinding = weex.requireModule('expressionBinding');\n\n  import Utils from '../utils';\n  import BindEnv from '../utils/bind-env';\n  import Binding from 'weex-bindingx/lib/index.weex.js';\n\n  const isIos = Utils.env.isIOS();\n\n  export default {\n    props: {\n      tabTitles: {\n        type: Array,\n        default: () => ([])\n      },\n      panDist: {\n        type: Number,\n        default: 200\n      },\n      spmC: {\n        type: [String, Number],\n        default: ''\n      },\n      tabStyles: {\n        type: Object,\n        default: () => ({\n          titleColor: '#666666',\n          activeTitleColor: '#3D3D3D',\n          isActiveTitleBold: true,\n          width: 160,\n          height: 40,\n          fontSize: 24,\n          textPaddingLeft: 10,\n          textPaddingRight: 10\n        })\n      },\n      titleType: {\n        type: String,\n        default: 'icon'\n      },\n      tabPageHeight: {\n        type: [String, Number],\n        default: 1334\n      },\n      needSlider: {\n        type: Boolean,\n        default: true\n      },\n      duration: {\n        type: [Number, String],\n        default: 300\n      },\n      timingFunction: {\n        type: String,\n        default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'\n      }\n    },\n    data: () => ({\n      currentPage: 0,\n      isMoving: false,\n      deltaX: 0\n    }),\n    mounted() {\n      // ios 下面禁止左滑出去\n      if (swipeBack && swipeBack.forbidSwipeBack) {\n        swipeBack.forbidSwipeBack(true);\n      }\n      if (BindEnv.supportsEBForIos() && this.needSlider) {\n        const tabPageEl = this.$refs['tab-page-wrap'];\n        Binding.prepare && Binding.prepare({\n          anchor: tabPageEl.ref,\n          eventType: 'pan'\n        });\n      }\n    },\n    methods: {\n      next() {\n        let page = this.currentPage;\n        if (page < this.tabTitles.length - 1) {\n          page++;\n        }\n        this.setPage(page);\n      },\n      prev() {\n        let page = this.currentPage;\n        if (page > 0) {\n          page--;\n        }\n        this.setPage(page);\n      },\n      startHandler(e) {\n        if (BindEnv.supportsEBForIos() && this.isTabView && this.needSlider) {\n          this.bindExp(this.$refs['tab-page-wrap']);\n        }\n      },\n      bindExp(element) {\n        if (element && element.ref) {\n\n          if (this.isMoving && this.gesToken !== 0) {\n            Binding.unbind({\n              eventType: 'pan',\n              token: this.gesToken\n            })\n            this.gesToken = 0;\n            return;\n          }\n\n          const tabElement = this.$refs['tab-container'];\n          const { currentPage, panDist } = this;\n          const dist = currentPage * 750;\n\n          // x-dist\n\n          const props = [{\n            element: tabElement.ref,\n            property: 'transform.translateX',\n            expression: `{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"min\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":0},{\\\"type\\\":\\\"CallExpression\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"max\\\"},{\\\"type\\\":\\\"Arguments\\\",\\\"children\\\":[{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${-(tabTitles.length - 1) * 750}},{\\\"type\\\":\\\"-\\\",\\\"children\\\":[{\\\"type\\\":\\\"Identifier\\\",\\\"value\\\":\\\"x\\\"},{\\\"type\\\":\\\"NumericLiteral\\\",\\\"value\\\":${dist}}]}]}]}]}]}`\n          }];\n\n          const gesTokenObj = Binding.bind({\n            anchor: element.ref,\n            eventType: 'pan',\n            props\n          }, (e) => {\n            const { deltaX, state } = e;\n            if (state === 'end') {\n              if (deltaX < -panDist) {\n                this.next();\n              } else if (deltaX > panDist) {\n                this.prev();\n              } else {\n                this.setPage(currentPage);\n              }\n            }\n          });\n          this.gesToken = gesTokenObj.token;\n        }\n      },\n      setPage(page) {\n        if (this.isMoving === true) {\n          return;\n        }\n        this.isMoving = true;\n        const previousPage = this.currentPage;\n        const currentTabEl = this.$refs[`wxc-tab-title-${page}`][0];\n        const { width } = this.tabStyles;\n        const appearNum = parseInt(750 / width);\n        const tabsNum = this.tabTitles.length;\n        const computedPage = tabsNum > appearNum ? 2 : page\n        const offset = page > appearNum ? -(750 - width) / 2 : -width * computedPage;\n\n        (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {\n          offset\n        });\n\n        page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {\n          offset: -width * page\n        });\n        this._animateTransformX(page);\n        this.isMoving = false;\n        this.currentPage = page;\n        this.$emit('wxcTabPageCurrentTabSelected', { page });\n      },\n      _animateTransformX(page) {\n        const { duration, timingFunction } = this;\n        const containerEl = this.$refs[`tab-container`];\n        const dist = page * 750;\n        animation.transition(containerEl, {\n          styles: {\n            transform: `translateX(${-dist}px)`\n          },\n          duration,\n          timingFunction,\n          delay: 0\n        }, () => {\n        });\n      }\n    }\n  };\n</script>\n",null],"sourceRoot":""}]);

// exports


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-cell[data-v-289df085] {\n  /*height: 100px;*/\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  padding-left: 0.32rem;\n  padding-right: 0.32rem;\n  background-color: #ffffff;\n}\n.cell-margin[data-v-289df085] {\n  margin-bottom: 0.32rem;\n}\n.cell-title[data-v-289df085] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n}\n.cell-indent[data-v-289df085] {\n  padding-bottom: 0.4rem;\n  padding-top: 0.4rem;\n}\n.has-desc[data-v-289df085] {\n  padding-bottom: 0.24rem;\n  padding-top: 0.24rem;\n}\n.cell-top-border[data-v-289df085] {\n  border-top-color: #e2e2e2;\n  border-top-width: 1px;\n}\n.cell-bottom-border[data-v-289df085] {\n  border-bottom-color: #e2e2e2;\n  border-bottom-width: 1px;\n}\n.cell-label-text[data-v-289df085] {\n  font-size: 0.4rem;\n  color: #666666;\n  width: 2.50667rem;\n  margin-right: 0.13333rem;\n}\n.cell-arrow-icon[data-v-289df085] {\n  width: 0.29333rem;\n  height: 0.29333rem;\n}\n.cell-content[data-v-289df085] {\n  color: #333333;\n  font-size: 0.4rem;\n  line-height: 0.53333rem;\n}\n.cell-desc-text[data-v-289df085] {\n  color: #999999;\n  font-size: 0.32rem;\n  line-height: 0.4rem;\n  margin-top: 0.05333rem;\n  margin-right: 0.4rem;\n}\n.extra-content-text[data-v-289df085] {\n  font-size: 0.37333rem;\n  color: #999999;\n  margin-right: 0.05333rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-cell/index.vue?4eb2b49e"],"names":[],"mappings":";AAkCA;EACA,kBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,sBAAA;EACA,uBAAA;EACA,0BAAA;CACA;AAEA;EACA,uBAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;CACA;AAEA;EACA,uBAAA;EACA,oBAAA;CACA;AAEA;EACA,wBAAA;EACA,qBAAA;CACA;AAEA;EACA,0BAAA;EACA,sBAAA;CACA;AAEA;EACA,6BAAA;EACA,yBAAA;CACA;AAEA;EACA,kBAAA;EACA,eAAA;EACA,kBAAA;EACA,yBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,eAAA;EACA,kBAAA;EACA,wBAAA;CACA;AAEA;EACA,eAAA;EACA,mBAAA;EACA,oBAAA;EACA,uBAAA;EACA,qBAAA;CACA;AACA;EACA,sBAAA;EACA,eAAA;EACA,yBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/09/25. -->\n<!--A Cell -->\n\n<template>\n  <div :class=\"['wxc-cell', hasTopBorder && 'cell-top-border', hasBottomBorder && 'cell-bottom-border', hasMargin && 'cell-margin', hasVerticalIndent && 'cell-indent', desc && 'has-desc']\"\n    :style=\"cellStyle\"\n    :accessible=\"autoAccessible\"\n    :aria-label=\"`${label},${title},${desc}`\"\n    @click=\"cellClicked\">\n    <slot name=\"label\">\n      <div v-if=\"label\">\n        <p class=\"cell-label-text\">{{label}}</p>\n      </div>\n    </slot>\n    <div class=\"cell-title\">\n      <slot name=\"title\">\n        <p class=\"cell-content\">{{title}}</p>\n        <p class=\"cell-desc-text\"\n              v-if=\"desc\">{{desc}}</p>\n      </slot>\n    </div>\n    <slot name=\"value\"></slot>\n    <slot></slot>\n    <p class=\"extra-content-text\" v-if=\"extraContent\">{{extraContent}}</p>\n    <image :src=\"arrowIcon\"\n           class=\"cell-arrow-icon\"\n           :aria-hidden=\"true\"\n           v-if=\"hasArrow\"></image>\n\n  </div>\n</template>\n\n<style scoped>\n  .wxc-cell {\n    /*height: 100px;*/\n    flex-direction: row;\n    align-items: center;\n    padding-left: 24px;\n    padding-right: 24px;\n    background-color: #ffffff;\n  }\n\n  .cell-margin {\n    margin-bottom: 24px;\n  }\n\n  .cell-title {\n    flex: 1;\n  }\n\n  .cell-indent {\n    padding-bottom: 30px;\n    padding-top: 30px;\n  }\n\n  .has-desc {\n    padding-bottom: 18px;\n    padding-top: 18px;\n  }\n\n  .cell-top-border {\n    border-top-color: #e2e2e2;\n    border-top-width: 1px;\n  }\n\n  .cell-bottom-border {\n    border-bottom-color: #e2e2e2;\n    border-bottom-width: 1px;\n  }\n\n  .cell-label-text {\n    font-size: 30px;\n    color: #666666;\n    width: 188px;\n    margin-right: 10px;\n  }\n\n  .cell-arrow-icon {\n    width: 22px;\n    height: 22px;\n  }\n\n  .cell-content {\n    color: #333333;\n    font-size: 30px;\n    line-height: 40px;\n  }\n\n  .cell-desc-text {\n    color: #999999;\n    font-size: 24px;\n    line-height: 30px;\n    margin-top: 4px;\n    margin-right: 30px;\n  }\n  .extra-content-text {\n    font-size: 28px;\n    color: #999999;\n    margin-right: 4px;\n  }\n</style>\n\n<script>\n  import Utils from '../utils';\n\n  export default {\n    props: {\n      label: {\n        type: String,\n        default: ''\n      },\n      title: {\n        type: String,\n        default: ''\n      },\n      extraContent: {\n        type: String,\n        default: ''\n      },\n      desc: {\n        type: String,\n        default: ''\n      },\n      link: {\n        type: String,\n        default: ''\n      },\n      hasTopBorder: {\n        type: Boolean,\n        default: false\n      },\n      hasMargin: {\n        type: Boolean,\n        default: false\n      },\n      hasBottomBorder: {\n        type: Boolean,\n        default: true\n      },\n      hasArrow: {\n        type: Boolean,\n        default: false\n      },\n      arrowIcon: {\n        type: String,\n        default: 'https://gw.alicdn.com/tfs/TB11zBUpwMPMeJjy1XbXXcwxVXa-22-22.png'\n      },\n      hasVerticalIndent: {\n        type: Boolean,\n        default: true\n      },\n      cellStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      autoAccessible: {\n        type: Boolean,\n        default: true\n      }\n    },\n    methods: {\n      cellClicked (e) {\n        const link = this.link;\n        this.$emit('wxcCellClicked', { e });\n        link && Utils.goToH5Page(link, true);\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-page-calendar[data-v-3472bf4f] {\n  position: fixed;\n  width: 10rem;\n  color: #333333;\n  background-color: #ffffff;\n}\n.flex-item[data-v-3472bf4f] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  text-align: center;\n}\n.calendar-weekday[data-v-3472bf4f] {\n  height: 0.8rem;\n  background-color: #ffffff;\n  border-bottom-width: 1px;\n  border-top-width: 1px;\n  border-color: #e2e2e2;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.weekday-text[data-v-3472bf4f] {\n  color: #000000;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  font-size: 0.32rem;\n  text-align: center;\n}\n.calendar-list[data-v-3472bf4f] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n}\n.month-text[data-v-3472bf4f] {\n  font-size: 0.42667rem;\n  height: 0.8rem;\n  line-height: 0.8rem;\n  width: 10rem;\n  text-align: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  background-color: #f2f3f4;\n}\n.calendar-row[data-v-3472bf4f] {\n  height: 1.86667rem;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  background-color: #ffffff;\n  border-bottom-width: 1px;\n  border-color: #f2f3f4;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n}\n.row-item[data-v-3472bf4f] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  height: 1.86667rem;\n  padding-top: 0.13333rem;\n  padding-bottom: 0.13333rem;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.iphone-x[data-v-3472bf4f] {\n  height: 0.90667rem;\n}\n.calendar-note[data-v-3472bf4f] {\n  height: 0.48rem;\n  line-height: 0.48rem;\n  font-size: 0.32rem;\n  color: #000000;\n  text-align: center;\n}\n.calendar-day[data-v-3472bf4f] {\n  height: 0.64rem;\n  line-height: 0.64rem;\n  font-size: 0.48rem;\n  color: #000000;\n  text-align: center;\n}\n.calendar-ext[data-v-3472bf4f] {\n  height: 0.48rem;\n  line-height: 0.48rem;\n  color: #999999;\n  text-align: center;\n  font-size: 0.32rem;\n  text-overflow: ellipsis;\n}\n.calendar-holiday[data-v-3472bf4f] {\n  color: #FF5000;\n}\n.calendar-rest[data-v-3472bf4f] {\n  color: #FF5000;\n}\n.item-row-selected[data-v-3472bf4f] {\n  color: #ffffff;\n  background-color: #FFC900;\n  text-align: center;\n}\n.item-text-selected[data-v-3472bf4f] {\n  color: #3d3d3d;\n  text-align: center;\n}\n.calendar-disabled[data-v-3472bf4f] {\n  color: #CCCCCC;\n}\n.cell-disabled[data-v-3472bf4f] {\n  background-color: #FBFBFB;\n}\n.calendar-day-include[data-v-3472bf4f] {\n  background-color: #FFF7D6;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-page-calendar/index.vue?35eca699"],"names":[],"mappings":";AA6OA;EACA,gBAAA;EACA,aAAA;EACA,eAAA;EACA,0BAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,mBAAA;CACA;AAEA;EACA,eAAA;EACA,0BAAA;EACA,yBAAA;EACA,sBAAA;EACA,sBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,sCAAA;UAAA,8BAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,eAAA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,mBAAA;EACA,mBAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;CACA;AAEA;EACA,sBAAA;EACA,eAAA;EACA,oBAAA;EACA,aAAA;EACA,mBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;CACA;AAEA;EACA,mBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EACA,yBAAA;EACA,sBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,mBAAA;EACA,wBAAA;EACA,2BAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,mBAAA;CACA;AAEA;EACA,gBAAA;EACA,qBAAA;EACA,mBAAA;EACA,eAAA;EACA,mBAAA;CACA;AAEA;EACA,gBAAA;EACA,qBAAA;EACA,mBAAA;EACA,eAAA;EACA,mBAAA;CACA;AAEA;EACA,gBAAA;EACA,qBAAA;EACA,eAAA;EACA,mBAAA;EACA,mBAAA;EACA,wBAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;EACA,0BAAA;EACA,mBAAA;CACA;AAEA;EACA,eAAA;EACA,mBAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,0BAAA;CACA;AAEA;EACA,0BAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n<!-- Updated by Tw93 on 17/11/22. -->\n\n<template>\n  <div class=\"wxc-page-calendar\" ref=\"pageCalendar\" :style=\"calendarExtendStyle\">\n    <wxc-minibar :show=\"showTitle\"\n                 v-bind=\"minibarCfg\"\n                 :use-default-return=\"false\"\n                 @wxcMinibarLeftButtonClicked=\"minibarLeftButtonClick\"></wxc-minibar>\n    <div class=\"calendar-weekday\" v-if=\"isShow\">\n      <p class=\"flex-item weekday-text\"\n            :key=\"k\"\n            :aria-label=\"`周${week}`\"\n            v-for=\"(week,k) in ['日','一','二','三','四','五','六']\">{{week}}</p>\n    </div>\n    <list class=\"calendar-list\"\n          v-if=\"isShow\">\n      <cell v-for=\"(month,index) in monthsArray\"\n            :key=\"index\"\n            :class=\"[!month.title && 'calendar-row']\">\n        <p class=\"month-text\"\n              v-if=\"month.title\">{{month.title}}</p>\n        <div v-else\n             v-for=\"(cell,rowIndex) in month\"\n             :key=\"`${index}-${rowIndex}`\"\n             :ref=\"cell.ref\"\n             :class=\"['row-item', cell.cellClass]\"\n             :style=\"cell.isSelected ? selectedCellStyle:{}\"\n             :accessible=\"true\"\n             :aria-label=\"`${cell.text?cell.text:''},${cell.note?cell.note:''},${cell.ext?cell.ext:''}`\"\n             @click=\"onClickDate(cell)\">\n          <p :class=\"['calendar-note', cell.cls]\"\n                :style=\"cell.isSelected ? selectedTextStyle:{}\">{{cell.note}}</p>\n          <p :class=\"['calendar-day', cell.cls]\"\n                :style=\"cell.isSelected ? selectedTextStyle:{}\">{{cell.text}}</p>\n          <p :class=\"['calendar-ext', cell.cls]\"\n                :style=\"cell.isSelected ? selectedTextStyle:{}\">{{cell.ext}}</p>\n        </div>\n      </cell>\n      <cell class=\"iphone-x\" v-if=\"isIPhoneX\"></cell>\n    </list>\n  </div>\n</template>\n\n<script>\n  import * as Format from './format';\n  import Utils from '../utils';\n\n  const isWeb = Utils.env.isWeb();\n\n  const dom = weex.requireModule('dom');\n\n  import WxcMinibar from '../wxc-minibar'\n\n  export default {\n    components: { WxcMinibar },\n    props: {\n      selectedDate: Array,\n      animationType: {\n        type: String,\n        default: 'push'\n      },\n      dateRange: {\n        type: Array,\n        required: true,\n        default: () => ([])\n      },\n      minibarCfg: {\n        type: Object,\n        default: () => ({\n          'title': '选择日期',\n          'background-color': '#FFC900',\n          'text-color': '#3D3D3D'\n        })\n      },\n      showHeader: {\n        type: Boolean,\n        default: false\n      },\n      selectedNote: {\n        type: Array,\n        default: () => (['开始', '到达', '往返'])\n      },\n      isRange: {\n        type: Boolean,\n        default: false\n      },\n      needDestroy: {\n        type: Boolean,\n        default: false\n      },\n      descList: {\n        type: Array,\n        default: () => ([])\n      },\n      selectedCellStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      selectedTextStyle: {\n        type: Object,\n        default: () => ({})\n      },\n    },\n    data: () => ({\n      isShow: false,\n      reSelect: true,\n      today: Format.getToDay(),\n      departDate: '',\n      arriveDate: ''\n    }),\n    computed: {\n      calendarExtendStyle () {\n        return Utils.uiStyle.pageTransitionAnimationStyle(this.animationType)\n      },\n      monthsArray () {\n        const { dateRange: range, today, departDate, arriveDate, selectedNote, descList } = this;\n        const param = { range, today, departDate, arriveDate, selectedNote, descList }\n        return Format.generateDateCell(param);\n      }\n    },\n    created () {\n      this.isIPhoneX = Utils.env.isIPhoneX();\n      this.showTitle = isWeb || this.showHeader;\n      this.detectShow();\n    },\n    mounted () {\n      const { needDestroy } = this;\n      const hold = isWeb ? 700 : 100;\n      !needDestroy && setTimeout(() => {\n        this.isShow = true;\n        this.scrollToDate();\n      }, hold);\n    },\n    watch: {\n      needDestroy (newVal, preVal) {\n        if (!newVal && newVal !== preVal) {\n          setTimeout(() => {\n            this.isShow = true;\n          }, 200)\n        }\n      }\n    },\n    methods: {\n      minibarLeftButtonClick () {\n        setTimeout(() => {\n          this.hide();\n          this.$emit('wxcPageCalendarBackClicked', {});\n        }, 100);\n      },\n      onClickDate (datConfig) {\n        const self = this;\n        if (datConfig.disabled || datConfig.isEmpty) return;\n\n        if (self.reSelect) {\n          self.departDate = '';\n          self.arriveDate = '';\n          self.reSelect = false;\n        }\n\n        if (self.isRange) {\n          if (self.departDate && Date.parse(self.departDate) <= Date.parse(datConfig.date)) {\n            self.arriveDate = datConfig.date;\n          } else {\n            self.departDate = datConfig.date;\n          }\n          if (self.departDate && self.arriveDate) {\n            self.dispatchDateChange([self.departDate, self.arriveDate]);\n          }\n        } else {\n          self.departDate = datConfig.date;\n          self.dispatchDateChange([self.departDate]);\n        }\n      },\n      scrollToDate () {\n        setTimeout(() => {\n          if (this.departDate) {\n            const el = this.$refs.departDate[0];\n            el && dom.getComponentRect && dom.getComponentRect(el, (e) => {\n              if (e && e.result) {\n                const { bottom } = e.size;\n                const { env } = weex.config;\n                // 误差\n                const height = env.deviceHeight / env.deviceWidth * 750 - 50;\n                if (bottom > height || bottom === 0) {\n                  dom.scrollToElement(el, { offset: -146, animated: false });\n                }\n              }\n            })\n          }\n        }, 10);\n      },\n      dispatchDateChange (dateArr) {\n        const duration = isWeb ? 400 : 600;\n        setTimeout(() => {\n          this.hide();\n        }, duration);\n        this.$emit('wxcPageCalendarDateSelected', {\n          date: dateArr\n        });\n      },\n      detectShow () {\n        if (this.isRange && this.selectedDate.length >= 2) {\n          this.departDate = this.selectedDate[0];\n          this.arriveDate = this.selectedDate[1];\n        } else if (this.selectedDate.length >= 1) {\n          this.departDate = this.selectedDate[0];\n          this.arriveDate = '';\n        }\n      },\n      _animate (status, callback = null) {\n        var ref = this.$refs.pageCalendar\n        if (this.animationType === 'push') {\n          Utils.animation.pageTransitionAnimation(ref, `translateX(${status ? -750 : 750}px)`, status, callback)\n        } else if (this.animationType === 'model') {\n          Utils.animation.pageTransitionAnimation(ref, `translateY(${status ? -Utils.env.getScreenHeight() : Utils.env.getScreenHeight()}px)`, status, callback)\n        }\n      },\n      show () {\n        const { needDestroy } = this;\n        needDestroy && (this.isShow = true);\n        this.reSelect = true;\n        this.detectShow();\n        this._animate(true);\n        needDestroy && this.scrollToDate();\n      },\n      hide () {\n        this.needDestroy && (this.isShow = false);\n        this.reSelect = false;\n        this._animate(false);\n        this.$emit('wxcPageCalendarHide', {});\n      }\n    }\n  };\n</script>\n<style scoped>\n  .wxc-page-calendar {\n    position: fixed;\n    width: 750px;\n    color: #333333;\n    background-color: #ffffff;\n  }\n\n  .flex-item {\n    flex: 1;\n    text-align: center;\n  }\n\n  .calendar-weekday {\n    height: 60px;\n    background-color: #ffffff;\n    border-bottom-width: 1px;\n    border-top-width: 1px;\n    border-color: #e2e2e2;\n    flex-direction: row;\n    justify-content: space-around;\n    align-items: center;\n  }\n\n  .weekday-text {\n    color: #000000;\n    flex: 1;\n    font-size: 24px;\n    text-align: center;\n  }\n\n  .calendar-list {\n    flex: 1;\n  }\n\n  .month-text {\n    font-size: 32px;\n    height: 60px;\n    line-height: 60px;\n    width: 750px;\n    text-align: center;\n    align-items: center;\n    background-color: #f2f3f4;\n  }\n\n  .calendar-row {\n    height: 140px;\n    flex-direction: row;\n    background-color: #ffffff;\n    border-bottom-width: 1px;\n    border-color: #f2f3f4;\n    align-items: center;\n    justify-content: space-between;\n  }\n\n  .row-item {\n    flex: 1;\n    height: 140px;\n    padding-top: 10px;\n    padding-bottom: 10px;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .iphone-x {\n    height: 68px;\n  }\n\n  .calendar-note {\n    height: 36px;\n    line-height: 36px;\n    font-size: 24px;\n    color: #000000;\n    text-align: center;\n  }\n\n  .calendar-day {\n    height: 48px;\n    line-height: 48px;\n    font-size: 36px;\n    color: #000000;\n    text-align: center;\n  }\n\n  .calendar-ext {\n    height: 36px;\n    line-height: 36px;\n    color: #999999;\n    text-align: center;\n    font-size: 24px;\n    text-overflow: ellipsis;\n  }\n\n  .calendar-holiday {\n    color: #FF5000;\n  }\n\n  .calendar-rest {\n    color: #FF5000;\n  }\n\n  .item-row-selected {\n    color: #ffffff;\n    background-color: #FFC900;\n    text-align: center;\n  }\n\n  .item-text-selected {\n    color: #3d3d3d;\n    text-align: center;\n  }\n\n  .calendar-disabled {\n    color: #CCCCCC;\n  }\n\n  .cell-disabled {\n    background-color: #FBFBFB;\n  }\n\n  .calendar-day-include {\n    background-color: #FFF7D6;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.loading-container[data-v-3681adcf]{\n\t\tposition: relative;\n}\n.loading-need-mask[data-v-3681adcf] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: rgba(0, 0, 0, 0.2);\n}\n.wxc-loading[data-v-3681adcf] {\n    position: fixed;\n    left: 3.82667rem;\n    top: 6.66667rem;\n    z-index: 9999;\n}\n.loading-box[data-v-3681adcf] {\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n            justify-content: center;\n    border-radius: 0.26667rem;\n    width: 2.33333rem;\n    height: 2.33333rem;\n    background-color: rgba(0, 0, 0, 0.8);\n}\n.trip-loading[data-v-3681adcf] {\n    background-color: rgba(0, 0, 0, .2);\n}\n.loading-trip-image[data-v-3681adcf] {\n    height: 1rem;\n    width: 1rem;\n}\n.loading-text[data-v-3681adcf] {\n    color: #ffffff;\n    font-size: 0.32rem;\n    line-height: 0.4rem;\n    height: 0.4rem;\n    margin-top: 0.10667rem;\n    text-overflow: ellipsis;\n    width: 1.86667rem;\n    text-align: center;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-loading/index.vue?96af98c4"],"names":[],"mappings":";AAsBA;EACA,mBAAA;CACA;AAEA;IACA,mBAAA;IACA,OAAA;IACA,QAAA;IACA,SAAA;IACA,UAAA;IACA,qCAAA;CACA;AAEA;IACA,gBAAA;IACA,iBAAA;IACA,gBAAA;IACA,cAAA;CACA;AAEA;IACA,0BAAA;IAAA,4BAAA;YAAA,oBAAA;IACA,yBAAA;IAAA,gCAAA;YAAA,wBAAA;IACA,0BAAA;IACA,kBAAA;IACA,mBAAA;IACA,qCAAA;CACA;AAEA;IACA,oCAAA;CACA;AAEA;IACA,aAAA;IACA,YAAA;CACA;AAEA;IACA,eAAA;IACA,mBAAA;IACA,oBAAA;IACA,eAAA;IACA,uBAAA;IACA,wBAAA;IACA,kBAAA;IACA,mBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/26. -->\n<!--A loading indicator. Custom text supported. -->\n\n<template>\n  <div :class=\"['loading-container',showLoading && needMask && 'loading-need-mask']\"\n       @click=\"maskClicked\"\n       :style=\"maskStyle\">\n    <div class=\"wxc-loading\" :style=\"{ top: topPosition +'px'}\" v-if=\"showLoading\">\n      <div :class=\"['loading-box',loading.class]\" :aria-hidden=\"true\">\n        <image :src=\"loading.url\"\n               class=\"loading-trip-image\"\n               resize=\"contain\"\n               quality=\"original\"></image>\n        <p v-if=\"loadingText\"\n              class=\"loading-text\">{{loadingText}}</p>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n\t.loading-container{\n\t\tposition: relative;\n\t}\n\n  .loading-need-mask {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: rgba(0, 0, 0, 0.2);\n  }\n\n  .wxc-loading {\n    position: fixed;\n    left: 287px;\n    top: 500px;\n    z-index: 9999;\n  }\n\n  .loading-box {\n    align-items: center;\n    justify-content: center;\n    border-radius: 20px;\n    width: 175px;\n    height: 175px;\n    background-color: rgba(0, 0, 0, 0.8);\n  }\n\n  .trip-loading {\n    background-color: rgba(0, 0, 0, .2);\n  }\n\n  .loading-trip-image {\n    height: 75px;\n    width: 75px;\n  }\n\n  .loading-text {\n    color: #ffffff;\n    font-size: 24px;\n    line-height: 30px;\n    height: 30px;\n    margin-top: 8px;\n    text-overflow: ellipsis;\n    width: 140px;\n    text-align: center;\n  }\n</style>\n\n<script>\n  import { GIF, BLACK_GIF } from './type';\n  import Utils from '../utils';\n\n  export default {\n    props: {\n      show: {\n        type: Boolean,\n        default: false\n      },\n      loadingText: {\n        type: String,\n        default: ''\n      },\n      type: {\n        type: String,\n        default: 'default'\n      },\n      interval: {\n        type: [Number, String],\n        default: 0\n      },\n      needMask: {\n        type: Boolean,\n        default: false\n      },\n      maskStyle: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    data: () => ({\n      showLoading: false,\n      tid: 0\n    }),\n    watch: {\n      show () {\n        this.setShow();\n      }\n    },\n    computed: {\n      loading () {\n        let loading = {};\n        switch (this.type) {\n          case 'trip':\n            loading = {\n              url: GIF,\n              class: 'trip-loading'\n            };\n            break;\n          default:\n            loading = {\n              url: BLACK_GIF,\n              class: 'default-loading'\n            }\n        }\n        return loading;\n      },\n      topPosition () {\n        return (Utils.env.getPageHeight() - 200) / 2;\n      }\n    },\n    created () {\n      this.setShow();\n    },\n    methods: {\n      maskClicked () {\n        this.needMask && (this.$emit('wxcLoadingMaskClicked', {}));\n      },\n      setShow () {\n        const { interval, show, showLoading } = this;\n        const stInterval = parseInt(interval);\n        clearTimeout(this.tid);\n        if (show) {\n          if (showLoading) {\n            return;\n          }\n          if (stInterval === 0) {\n            this.showLoading = true;\n          } else {\n            this.tid = setTimeout(() => {\n              this.showLoading = true;\n            }, stInterval);\n          }\n        } else {\n          this.showLoading = false;\n        }\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-btn[data-v-36f80855] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  border-radius: 0.16rem;\n  opacity: 1;\n}\n.wxc-btn-highlight[data-v-36f80855]:active {\n  opacity: .8;\n}\n.btn-text[data-v-36f80855] {\n  text-overflow: ellipsis;\n  lines: 1;\n  color: #ffffff;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 1;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-button/index.vue?394741c4","/Users/Tw93/www/github/weex-ui/packages/wxc-button/<no source>"],"names":[],"mappings":";AAgFA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,uBAAA;EACA,WAAA;CACA;AAEA;EACA,YAAA;CACA;AAEA;EACA,wBAAA;EACA,SAAA;EACA,eAAA;EC9FA,iBAAA;EAAA,wBAAA;EAAA,sBAAA;CD+FA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div :class=\"['wxc-btn', isHighlight && !disabled && 'wxc-btn-highlight']\"\n       :style=\"mrBtnStyle\"\n       @click=\"onClicked\"\n       :accessible=\"true\"\n       :aria-label=\"text\">\n    <p class=\"btn-text\" :style=\"mrTextStyle\">{{text}}</p>\n  </div>\n</template>\n\n<script>\n  import { STYLE_MAP, TEXT_STYLE_MAP, BUTTON_STYLE_MAP, TEXT_FONTSIZE_STYLE_MAP } from './type';\n\n  export default {\n    props: {\n      text: {\n        type: String,\n        default: '确认'\n      },\n      size: {\n        type: String,\n        default: 'full'\n      },\n      type: {\n        type: String,\n        default: 'red'\n      },\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      isHighlight: {\n        type: Boolean,\n        default: false\n      },\n      btnStyle: Object,\n      textStyle: Object,\n      disabledStyle: Object\n    },\n    computed: {\n      mrBtnStyle () {\n        const { type, disabled, btnStyle, size, disabledStyle } = this;\n\n        const mrBtnStyle = {\n          ...STYLE_MAP[type],\n          ...BUTTON_STYLE_MAP[size],\n          ...btnStyle\n        };\n\n        let disabledInStyle = { opacity: 0.2 };\n        if (type === 'white') {\n          disabledInStyle = { backgroundColor: 'rgba(0, 0, 0, 0.1)' };\n        }\n\n        return disabled ? {\n          ...mrBtnStyle,\n          ...disabledInStyle,\n          ...disabledStyle,\n          borderWidth: 0\n        } : mrBtnStyle;\n      },\n      mrTextStyle () {\n        const { type, disabled, textStyle, size } = this;\n        const mrTextStyle = { ...TEXT_STYLE_MAP[type], ...TEXT_FONTSIZE_STYLE_MAP[size], ...textStyle };\n        return disabled ? { ...mrTextStyle, color: '#FFFFFF' } : mrTextStyle;\n      }\n    },\n    methods: {\n      onClicked (e) {\n        const { type, disabled } = this;\n        this.$emit('wxcButtonClicked', { e, type, disabled });\n      }\n    }\n  };\n</script>\n\n<style scoped>\n  .wxc-btn {\n    align-items: center;\n    justify-content: center;\n    border-radius: 12px;\n    opacity: 1;\n  }\n\n  .wxc-btn-highlight:active {\n    opacity: .8;\n  }\n\n  .btn-text {\n    text-overflow: ellipsis;\n    lines: 1;\n    color: #ffffff;\n  }\n</style>\n",null],"sourceRoot":""}]);

// exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.container[data-v-3b9aece2] {\n  position: fixed;\n  width: 10rem;\n  /*兼容H5异常*/\n  z-index: 99999;\n}\n.wxc-mask[data-v-3b9aece2] {\n  position: fixed;\n  top: 4rem;\n  left: 0.8rem;\n  width: 9.36rem;\n  height: 10.66667rem;\n}\n.mask-bottom[data-v-3b9aece2] {\n  width: 1.33333rem;\n  height: 1.33333rem;\n  background-color: transparent;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.mask-close-icon[data-v-3b9aece2] {\n  width: 0.85333rem;\n  height: 0.85333rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-mask/index.vue?76fa8c2c"],"names":[],"mappings":";AAmCA;EACA,gBAAA;EACA,aAAA;EACA,UAAA;EACA,eAAA;CACA;AAEA;EACA,gBAAA;EACA,UAAA;EACA,aAAA;EACA,eAAA;EACA,oBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,8BAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!-- Updated by Tw93 on 17/01/06. -->\n<!--A Mask.-->\n\n<template>\n  <div class=\"container\">\n    <wxc-overlay :show=\"show && hasOverlay\"\n                 v-if=\"show\"\n                 v-bind=\"mergeOverlayCfg\"\n                 :can-auto-close=\"overlayCanClose\"\n                 :opacity='opacity'\n                 @wxcOverlayBodyClicking=\"wxcOverlayBodyClicking\"\n                 @wxcOverlayBodyClicked=\"wxcOverlayBodyClicked\"></wxc-overlay>\n    <div ref=\"wxc-mask\"\n         class=\"wxc-mask\"\n         v-if=\"show\"\n         :hack=\"shouldShow\"\n         :style=\"maskStyle\">\n      <div :style=\"contentStyle\">\n        <slot></slot>\n      </div>\n      <div class=\"mask-bottom\"\n           :style=\"{ width: width + 'px' }\"\n           @click=\"closeIconClicked\"\n           v-if=\"showClose\">\n        <image :src=\"closeIcon\"\n               aria-label=\"关闭\"\n               class=\"mask-close-icon\"></image>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .container {\n    position: fixed;\n    width: 750px;\n    /*兼容H5异常*/\n    z-index: 99999;\n  }\n\n  .wxc-mask {\n    position: fixed;\n    top: 300px;\n    left: 60px;\n    width: 702px;\n    height: 800px;\n  }\n\n  .mask-bottom {\n    width: 100px;\n    height: 100px;\n    background-color: transparent;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .mask-close-icon {\n    width: 64px;\n    height: 64px;\n  }\n</style>\n\n<script>\n  const animation = weex.requireModule('animation');\n  import WxcOverlay from '../wxc-overlay';\n\n  export default {\n    components: { WxcOverlay },\n    props: {\n      height: {\n        type: [String, Number],\n        default: 800\n      },\n      width: {\n        type: [String, Number],\n        default: 702\n      },\n      top: {\n        type: Number,\n        default: 0\n      },\n      show: {\n        type: Boolean,\n        default: false\n      },\n      showClose: {\n        type: Boolean,\n        default: false\n      },\n      duration: {\n        type: [String, Number],\n        default: 300\n      },\n      hasOverlay: {\n        type: Boolean,\n        default: true\n      },\n      hasAnimation: {\n        type: Boolean,\n        default: true\n      },\n      timingFunction: {\n        type: Array,\n        default: () => (['ease-in', 'ease-out'])\n      },\n      overlayCfg: {\n        type: Object,\n        default: () => ({\n          hasAnimation: true,\n          timingFunction: ['ease-in', 'ease-out'],\n          canAutoClose: true,\n          duration: 300,\n          opacity: 0.6\n        })\n      },\n      borderRadius: {\n        type: [String, Number],\n        default: 0\n      },\n      overlayCanClose: {\n        type: Boolean,\n        default: true\n      },\n      maskBgColor: {\n        type: String,\n        default: '#ffffff'\n      },\n      opacity: {\n        type: [Number, String],\n        default: 0.6\n      },\n    },\n    data: () => ({\n      closeIcon: 'https://gw.alicdn.com/tfs/TB1qDJUpwMPMeJjy1XdXXasrXXa-64-64.png',\n      maskTop: 264,\n      opened: false\n    }),\n    computed: {\n      mergeOverlayCfg () {\n        return {\n          ...this.overlayCfg,\n          hasAnimation: this.hasAnimation\n        }\n      },\n      maskStyle () {\n        const { width, height, showClose, hasAnimation, opened, top } = this;\n        const newHeight = showClose ? height - 0 + 100 : height;\n        const { deviceHeight, deviceWidth, platform } = weex.config.env;\n        const _deviceHeight = deviceHeight || 1334;\n        const isWeb = typeof (window) === 'object' && platform.toLowerCase() === 'web';\n        const navHeight = isWeb ? 0 : 130;\n        const pageHeight = _deviceHeight / deviceWidth * 750 - navHeight;\n        return {\n          width: width + 'px',\n          height: newHeight + 'px',\n          left: (750 - width) / 2 + 'px',\n          top: (top || (pageHeight - height) / 2) + 'px',\n          opacity: hasAnimation && !opened ? 0 : 1\n        }\n      },\n      contentStyle () {\n        return {\n          width: this.width + 'px',\n          backgroundColor: this.maskBgColor,\n          height: this.height + 'px',\n          borderRadius: this.borderRadius + 'px'\n        }\n      },\n      shouldShow () {\n        const { show, hasAnimation } = this;\n        hasAnimation && setTimeout(() => {\n          this.appearMask(show);\n        }, 50);\n        return show;\n      }\n    },\n    methods: {\n      closeIconClicked () {\n        this.appearMask(false);\n      },\n      wxcOverlayBodyClicking () {\n        if (this.hasAnimation) {\n          this.appearMask(false);\n          this.$emit('wxcOverlayBodyClicking', {});\n        }\n      },\n      wxcOverlayBodyClicked () {\n        if (!this.hasAnimation) {\n          this.appearMask(false);\n          this.$emit('wxcOverlayBodyClicked', {});\n        }\n      },\n      needEmit (bool = false) {\n        this.opened = bool;\n        !bool && this.$emit('wxcMaskSetHidden', {});\n      },\n      appearMask (bool, duration = this.duration) {\n        const { hasAnimation, timingFunction } = this;\n        const maskEl = this.$refs['wxc-mask'];\n        if (hasAnimation && maskEl) {\n          animation.transition(maskEl, {\n            styles: {\n              opacity: bool ? 1 : 0\n            },\n            duration,\n            timingFunction: timingFunction[bool ? 0 : 1],\n            delay: 0\n          }, () => {\n            this.needEmit(bool);\n          });\n        } else {\n          this.needEmit(bool);\n        }\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.tag-item[data-v-3c51aaad] {\n  height: 0.32rem;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  /* hack高度不居中问题，后续版本升级去掉 */\n  padding-bottom: 0.02667rem;\n}\n.tag-border[data-v-3c51aaad] {\n  border-bottom-left-radius: 0.05333rem;\n  border-bottom-right-radius: 0.05333rem;\n  border-top-left-radius: 0.05333rem;\n  border-top-right-radius: 0.05333rem;\n}\n.tag-hollow[data-v-3c51aaad] {\n  border-width: 1px;\n}\n.tag-image[data-v-3c51aaad] {\n  height: 0.32rem;\n}\n.tag-special[data-v-3c51aaad] {\n  border-width: 1px;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n.left-image[data-v-3c51aaad] {\n  width: 0.26667rem;\n  height: 0.26667rem;\n}\n.tag-left[data-v-3c51aaad] {\n  width: 0.32rem;\n  height: 0.32rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.tag-text[data-v-3c51aaad] {\n  font-size: 0.26667rem;\n  height: 0.29333rem;\n  line-height: 0.29333rem;\n  padding-left: 0.08rem;\n  padding-right: 0.08rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-tag/index.vue?64a6f399"],"names":[],"mappings":";AA8BA;EACA,gBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EACA,2BAAA;CACA;AAEA;EACA,sCAAA;EACA,uCAAA;EACA,mCAAA;EACA,oCAAA;CACA;AAEA;EACA,kBAAA;CACA;AAEA;EACA,gBAAA;CACA;AAEA;EACA,kBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;CACA;AAEA;EACA,sBAAA;EACA,mBAAA;EACA,wBAAA;EACA,sBAAA;EACA,uBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div>\n    <div v-if=\"showSolid || showHollow\"\n         :class=\"['tag-item','tag-border',showHollow && 'tag-hollow']\"\n         :style=\"tagTextStyle\">\n      <p class=\"tag-text\" :style=\"{color:fontColor}\">{{value}}</p>\n    </div>\n    <image v-if=\"showImage\"\n           :src=\"img\"\n           @load=\"onLoad\"\n           :aria-hidden=\"true\"\n           :style=\"{ width: imgWidth+'px'}\"\n           class=\"tag-image\"></image>\n    <div class=\"tag-special tag-border\"\n         :style=\"{borderColor:tagColor}\"\n         :accessible=\"true\"\n         :aria-label=\"value\"\n         v-if=\"showSpecial\">\n      <div class=\"tag-left\" :style=\"{backgroundColor:tagColor}\">\n        <image :src=\"specialIcon\" class=\"left-image\"></image>\n      </div>\n      <p class=\"tag-text\" :style=\"{color:fontColor}\">{{value}}</p>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .tag-item {\n    height: 24px;\n    justify-content: center;\n    align-items: center;\n    /* hack高度不居中问题，后续版本升级去掉 */\n    padding-bottom: 2px;\n  }\n\n  .tag-border {\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n  }\n\n  .tag-hollow {\n    border-width: 1px;\n  }\n\n  .tag-image {\n    height: 24px;\n  }\n\n  .tag-special {\n    border-width: 1px;\n    flex-direction: row;\n  }\n\n  .left-image {\n    width: 20px;\n    height: 20px;\n  }\n\n  .tag-left {\n    width: 24px;\n    height: 24px;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .tag-text {\n    font-size: 20px;\n    height: 22px;\n    line-height: 22px;\n    padding-left: 6px;\n    padding-right: 6px;\n  }\n</style>\n\n<script>\n  export default {\n    props: {\n      type: {\n        type: String,\n        default: 'solid'\n      },\n      value: {\n        type: [String, Number],\n        default: '测试测试'\n      },\n      tagColor: {\n        type: String,\n        default: '#ff5000'\n      },\n      fontColor: {\n        type: String,\n        default: '#333333'\n      },\n      specialIcon: {\n        type: String,\n        default: ''\n      },\n      img: {\n        type: String,\n        default: ''\n      }\n    },\n    computed: {\n      showSolid () {\n        const { type, value } = this;\n        return type === 'solid' && value !== '';\n      },\n      showHollow () {\n        const { type, value } = this;\n        return type === 'hollow' && value !== '';\n      },\n      showSpecial () {\n        const { type, value, specialIcon } = this;\n        return type === 'special' && value !== '' && specialIcon !== '';\n      },\n      showImage () {\n        const { type, img } = this;\n        return type === 'image' && img !== ''\n      },\n      tagTextStyle () {\n        const { tagColor, showSolid } = this;\n        return showSolid ? { backgroundColor: tagColor } : { borderColor: tagColor }\n      }\n    },\n    data: () => ({\n      imgWidth: 90\n    }),\n    methods: {\n      onLoad (e) {\n        if (e.success && e.size && e.size.naturalWidth > 0) {\n          const width = e.size.naturalWidth;\n          const height = e.size.naturalHeight;\n          this.imgWidth = width * (24 / height);\n        }\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-search-bar[data-v-3c9bb53e] {\n  padding-left: 0.26667rem;\n  padding-right: 0.26667rem;\n  background-color: #ffffff;\n  width: 10rem;\n  height: 1.12rem;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n.wxc-search-bar-yellow[data-v-3c9bb53e] {\n  background-color: #ffc900;\n}\n.search-bar-input[data-v-3c9bb53e] {\n  position: absolute;\n  top: 0.13333rem;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-right: 0.53333rem;\n  padding-left: 0.8rem;\n  font-size: 0.34667rem;\n  width: 8.32rem;\n  height: 0.85333rem;\n  line-height: 0.85333rem;\n  background-color: #E5E5E5;\n  border-radius: 0.08rem;\n}\n.search-bar-input-yellow[data-v-3c9bb53e] {\n  background-color: #fff6d6;\n}\n.search-bar-icon[data-v-3c9bb53e] {\n  position: absolute;\n  width: 0.4rem;\n  height: 0.4rem;\n  left: 0.45333rem;\n  top: 0.37333rem;\n}\n.search-bar-close[data-v-3c9bb53e] {\n  position: absolute;\n  width: 0.4rem;\n  height: 0.4rem;\n  right: 1.6rem;\n  top: 0.37333rem;\n}\n.search-bar-button[data-v-3c9bb53e] {\n  width: 1.25333rem;\n  height: 0.48rem;\n  font-size: 0.4rem;\n  text-align: center;\n  background-color: #ffffff;\n  margin-top: 0.21333rem;\n  margin-right: 0;\n  color: #333333;\n  position: absolute;\n  right: 0.10667rem;\n  top: 0.12rem;\n}\n.search-bar-button-yellow[data-v-3c9bb53e] {\n  background-color: #FFC900;\n}\n.input-has-dep[data-v-3c9bb53e] {\n  padding-left: 3.2rem;\n  width: 9.46667rem;\n}\n.bar-dep[data-v-3c9bb53e] {\n  width: 2.26667rem;\n  padding-right: 0.16rem;\n  padding-left: 0.16rem;\n  height: 0.56rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  position: absolute;\n  left: 0.32rem;\n  top: 0.29333rem;\n  border-right-style: solid;\n  border-right-width: 1px;\n  border-right-color: #C7C7C7;\n}\n.bar-dep-yellow[data-v-3c9bb53e] {\n  border-right-color: #C7C7C7;\n}\n.dep-text[data-v-3c9bb53e] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  text-align: center;\n  font-size: 0.34667rem;\n  color: #666666;\n  margin-right: 0.08rem;\n  lines: 1;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 1;\n}\n.dep-arrow[data-v-3c9bb53e] {\n  width: 0.32rem;\n  height: 0.32rem;\n}\n.icon-has-dep[data-v-3c9bb53e] {\n  left: 2.85333rem;\n}\n.disabled-input[data-v-3c9bb53e] {\n  width: 10rem;\n  height: 0.85333rem;\n  position: absolute;\n  left: 0;\n  background-color: transparent;\n}\n.has-dep-disabled[data-v-3c9bb53e] {\n  width: 7.33333rem;\n  left: 2.66667rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-searchbar/index.vue?954ea16c","/Users/Tw93/www/github/weex-ui/packages/wxc-searchbar/<no source>"],"names":[],"mappings":";AAsEA;EACA,yBAAA;EACA,0BAAA;EACA,0BAAA;EACA,aAAA;EACA,gBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,0BAAA;CACA;AAEA;EACA,mBAAA;EACA,gBAAA;EACA,eAAA;EACA,kBAAA;EACA,0BAAA;EACA,qBAAA;EACA,sBAAA;EACA,eAAA;EACA,mBAAA;EACA,wBAAA;EACA,0BAAA;EACA,uBAAA;CACA;AAEA;EACA,0BAAA;CACA;AAEA;EACA,mBAAA;EACA,cAAA;EACA,eAAA;EACA,iBAAA;EACA,gBAAA;CACA;AAEA;EACA,mBAAA;EACA,cAAA;EACA,eAAA;EACA,cAAA;EACA,gBAAA;CACA;AAEA;EACA,kBAAA;EACA,gBAAA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;EACA,uBAAA;EACA,gBAAA;EACA,eAAA;EACA,mBAAA;EACA,kBAAA;EACA,aAAA;CACA;AAEA;EACA,0BAAA;CACA;AAEA;EACA,qBAAA;EACA,kBAAA;CACA;AAEA;EACA,kBAAA;EACA,uBAAA;EACA,sBAAA;EACA,gBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,mBAAA;EACA,cAAA;EACA,gBAAA;EACA,0BAAA;EACA,wBAAA;EACA,4BAAA;CACA;AAEA;EACA,4BAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,mBAAA;EACA,sBAAA;EACA,eAAA;EACA,sBAAA;EACA,SAAA;EACA,wBAAA;ECvKA,iBAAA;EAAA,wBAAA;EAAA,sBAAA;CDwKA;AAEA;EACA,eAAA;EACA,gBAAA;CACA;AAEA;EACA,iBAAA;CACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,QAAA;EACA,8BAAA;CACA;AAEA;EACA,kBAAA;EACA,iBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A Search bar for city Search-->\n\n<template>\n  <div>\n    <div :class=\"['wxc-search-bar','wxc-search-bar-'+theme]\"\n         :style=\"barStyle\"\n         v-if=\"mod==='default'\">\n      <input @blur=\"onBlur\"\n             @focus=\"onFocus\"\n             @input=\"onInput\"\n             @return=\"onSubmit\"\n             :return-key-type=\"returnKeyType\"\n             :autofocus=\"autofocus\"\n             :disabled=\"disabled\"\n             :value=\"value\"\n             ref=\"search-input\"\n             :type=\"inputType\"\n             :placeholder=\"placeholder\"\n             :style=\"{ width: needShowCancel ? '624px' : '710px' }\"\n             :class=\"['search-bar-input','search-bar-input-'+theme]\" />\n      <div v-if=\"disabled\"\n           @click=\"inputDisabledClicked\"\n           class=\"disabled-input\"></div>\n      <image class=\"search-bar-icon\"\n             :aria-hidden=\"true\"\n             :src=\"inputIcon\"></image>\n      <image class=\"search-bar-close\"\n             v-if=\"showClose\"\n             :aria-hidden=\"true\"\n             @click=\"closeClicked\"\n             :src=\"closeIcon\"></image>\n      <p :class=\"['search-bar-button','search-bar-button-'+theme]\"\n            :style=\"buttonStyle\"\n            v-if=\"needShowCancel\"\n            @click=\"cancelClicked\">{{cancelLabel}}</p>\n    </div>\n    <div :class=\"['wxc-search-bar','wxc-search-bar-'+theme]\"\n         :style=\"barStyle\"\n         v-if=\"mod==='hasDep'\">\n      <input @blur=\"onBlur\"\n             @focus=\"onFocus\"\n             @input=\"onInput\"\n             @return=\"onSubmit\"\n             :disabled=\"disabled\"\n             :autofocus=\"autofocus\"\n             :return-key-type=\"returnKeyType\"\n             :value=\"value\"\n             :type=\"inputType\"\n             :placeholder=\"placeholder\"\n             :class=\"['search-bar-input','input-has-dep','search-bar-input-'+theme]\" />\n      <div v-if=\"disabled\"\n           @click=\"inputDisabledClicked\"\n           class=\"disabled-input has-dep-disabled\"></div>\n      <div :class=\"['bar-dep','.bar-dep-'+theme]\"\n           @click=\"depClicked\">\n        <p class=\"dep-text\">{{depName}}</p>\n        <image :src=\"arrowIcon\"\n               :aria-hidden=\"true\"\n               class=\"dep-arrow\"></image>\n      </div>\n      <image class=\"search-bar-icon icon-has-dep\"\n             :aria-hidden=\"true\"\n             :src=\"inputIcon\"></image>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-search-bar {\n    padding-left: 20px;\n    padding-right: 20px;\n    background-color: #ffffff;\n    width: 750px;\n    height: 84px;\n    flex-direction: row;\n  }\n\n  .wxc-search-bar-yellow {\n    background-color: #ffc900;\n  }\n\n  .search-bar-input {\n    position: absolute;\n    top: 10px;\n    padding-top: 0;\n    padding-bottom: 0;\n    padding-right: 40px;\n    padding-left: 60px;\n    font-size: 26px;\n    width: 624px;\n    height: 64px;\n    line-height: 64px;\n    background-color: #E5E5E5;\n    border-radius: 6px;\n  }\n\n  .search-bar-input-yellow {\n    background-color: #fff6d6;\n  }\n\n  .search-bar-icon {\n    position: absolute;\n    width: 30px;\n    height: 30px;\n    left: 34px;\n    top: 28px;\n  }\n\n  .search-bar-close {\n    position: absolute;\n    width: 30px;\n    height: 30px;\n    right: 120px;\n    top: 28px;\n  }\n\n  .search-bar-button {\n    width: 94px;\n    height: 36px;\n    font-size: 30px;\n    text-align: center;\n    background-color: #ffffff;\n    margin-top: 16px;\n    margin-right: 0;\n    color: #333333;\n    position: absolute;\n    right: 8px;\n    top: 9px;\n  }\n\n  .search-bar-button-yellow {\n    background-color: #FFC900;\n  }\n\n  .input-has-dep {\n    padding-left: 240px;\n    width: 710px;\n  }\n\n  .bar-dep {\n    width: 170px;\n    padding-right: 12px;\n    padding-left: 12px;\n    height: 42px;\n    align-items: center;\n    flex-direction: row;\n    position: absolute;\n    left: 24px;\n    top: 22px;\n    border-right-style: solid;\n    border-right-width: 1px;\n    border-right-color: #C7C7C7;\n  }\n\n  .bar-dep-yellow {\n    border-right-color: #C7C7C7;\n  }\n\n  .dep-text {\n    flex: 1;\n    text-align: center;\n    font-size: 26px;\n    color: #666666;\n    margin-right: 6px;\n    lines: 1;\n    text-overflow: ellipsis;\n  }\n\n  .dep-arrow {\n    width: 24px;\n    height: 24px;\n  }\n\n  .icon-has-dep {\n    left: 214px;\n  }\n\n  .disabled-input {\n    width: 750px;\n    height: 64px;\n    position: absolute;\n    left: 0;\n    background-color: transparent;\n  }\n\n  .has-dep-disabled {\n    width: 550px;\n    left: 200px;\n  }\n</style>\n\n<script>\n  import { INPUT_ICON, ARROW_ICON, CLOSE_ICON } from './type';\n\n  export default {\n    props: {\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      alwaysShowCancel: {\n        type: Boolean,\n        default: false\n      },\n      inputType: {\n        type: String,\n        default: 'text'\n      },\n      returnKeyType: {\n        type: String,\n        default: 'default'\n      },\n      mod: {\n        type: String,\n        default: 'default'\n      },\n      autofocus: {\n        type: Boolean,\n        default: false\n      },\n      theme: {\n        type: String,\n        default: 'gray'\n      },\n      barStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      defaultValue: {\n        type: String,\n        default: ''\n      },\n      placeholder: {\n        type: String,\n        default: '搜索'\n      },\n      cancelLabel: {\n        type: String,\n        default: '取消 '\n      },\n      depName: {\n        type: String,\n        default: '杭州'\n      }\n    },\n    computed: {\n      needShowCancel() {\n        return this.alwaysShowCancel || this.showCancel;\n      },\n      buttonStyle() {\n        const { barStyle } = this;\n        if (barStyle.backgroundColor) {\n          return { backgroundColor: barStyle.backgroundColor }\n        }\n        return {}\n      }\n    },\n    data: () => ({\n      inputIcon: INPUT_ICON,\n      closeIcon: CLOSE_ICON,\n      arrowIcon: ARROW_ICON,\n      showCancel: false,\n      showClose: false,\n      value: ''\n\n    }),\n    created() {\n      this.defaultValue && (this.value = this.defaultValue);\n      if (this.disabled) {\n        this.showCancel = false;\n        this.showClose = false;\n      }\n    },\n    methods: {\n      onBlur() {\n        const self = this;\n        setTimeout(() => {\n          self.showCancel = false;\n          self.detectShowClose();\n          self.$emit('wxcSearchbarInputOnBlur', { value: self.value });\n        }, 10);\n      },\n      autoBlur() {\n        this.$refs['search-input'].blur();\n      },\n      onFocus() {\n        if (this.isDisabled) {\n          return;\n        }\n        this.showCancel = true;\n        this.detectShowClose();\n        this.$emit('wxcSearchbarInputOnFocus', { value: this.value });\n      },\n      closeClicked() {\n        this.value = '';\n        this.showCancel && (this.showCancel = false);\n        this.showClose && (this.showClose = false);\n        this.$emit('wxcSearchbarCloseClicked', { value: this.value });\n        this.$emit('wxcSearchbarInputOnInput', { value: this.value });\n      },\n      onInput(e) {\n        this.value = e.value;\n        this.showCancel = true;\n        this.detectShowClose();\n        this.$emit('wxcSearchbarInputOnInput', { value: this.value });\n      },\n      onSubmit(e) {\n        this.onBlur();\n        this.value = e.value;\n        this.showCancel = true;\n        this.detectShowClose();\n        this.$emit('wxcSearchbarInputReturned', { value: this.value });\n      },\n      cancelClicked() {\n        this.showCancel && (this.showCancel = false);\n        this.showClose && (this.showClose = false);\n        this.$emit('wxcSearchbarCancelClicked', { value: this.value });\n      },\n      detectShowClose() {\n        this.showClose = (this.value.length > 0) && this.showCancel;\n      },\n      depClicked() {\n        this.$emit('wxcSearchbarDepChooseClicked', {});\n      },\n      inputDisabledClicked() {\n        this.$emit('wxcSearchbarInputDisabledClicked', {});\n      },\n      setValue(value) {\n        this.value = value;\n      }\n    }\n  };\n</script>\n",null],"sourceRoot":""}]);

// exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-tab-page[data-v-3f00baac] {\n  width: 10rem;\n}\n.tab-title-list[data-v-3f00baac] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n.title-item[data-v-3f00baac] {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  border-bottom-style: solid;\n}\n.border-bottom[data-v-3f00baac] {\n  position: absolute;\n  bottom: 0;\n}\n.tab-page-wrap[data-v-3f00baac] {\n  width: 10rem;\n  /* overflow: hidden; */\n}\n.tab-container[data-v-3f00baac] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  position: absolute;\n}\n.tab-text[data-v-3f00baac] {\n  lines: 1;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 1;\n}\n.rightIcon[data-v-3f00baac] {\n  position: fixed;\n  background-color: #ffffff;\n  box-shadow: -0.66667rem 0 0.26667rem #ffffff;\n}\n\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-tab-page/index.vue?2de03e0a","/Users/Tw93/www/github/weex-ui/packages/wxc-tab-page/<no source>"],"names":[],"mappings":";AA6EA;EACA,aAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,2BAAA;CACA;AAEA;EACA,mBAAA;EACA,UAAA;CACA;AAEA;EACA,aAAA;EACA,uBAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,mBAAA;CACA;AAEA;EACA,SAAA;EACA,wBAAA;EC7GA,iBAAA;EAAA,wBAAA;EAAA,sBAAA;CD8GA;AAEA;EACA,gBAAA;EACA,0BAAA;EACA,6CAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n<!-- Updated by Tw93 on 17/11/16.-->\n\n<template>\n  <div class=\"wxc-tab-page\"\n       :style=\"{ height: (tabPageHeight)+'px', backgroundColor:wrapBgColor }\">\n    <scroller class=\"tab-title-list\"\n              ref=\"tab-title-list\"\n              :show-scrollbar=\"false\"\n              scroll-direction=\"horizontal\"\n              :data-spm=\"spmC\"\n              :style=\"{\n                backgroundColor: tabStyles.bgColor,\n                height: (tabStyles.height)+'px',\n                paddingLeft:(tabStyles.leftOffset?tabStyles.leftOffset:0)+'px',\n                paddingRight: tabStyles.rightOffset\n              }\">\n\n      <div class=\"title-item\"\n           v-for=\"(v,index) in tabTitles\"\n           :key=\"index\"\n           :ref=\"'wxc-tab-title-'+index\"\n           @click=\"setPage(index,v.url, clickAnimation)\"\n           :style=\"{\n             width: tabStyles.width +'px',\n             height: tabStyles.height +'px',\n             backgroundColor: currentPage === index ? tabStyles.activeBgColor : tabStyles.bgColor,\n             borderBottomWidth: tabStyles.normalBottomHeight,\n             borderBottomColor: tabStyles.normalBottomColor\n           }\"\n           :accessible=\"true\"\n           :aria-label=\"`${v.title?v.title:'标签'+index}`\">\n\n        <image :src=\"currentPage === index ? v.activeIcon : v.icon\"\n               v-if=\"titleType === 'icon' && !titleUseSlot\"\n               :style=\"{ width: tabStyles.iconWidth + 'px', height:tabStyles.iconHeight+'px'}\"></image>\n\n        <p class=\"icon-font\"\n              v-if=\"titleType === 'iconFont' && v.codePoint && !titleUseSlot\"\n              :style=\"{fontFamily: 'wxcIconFont',fontSize: tabStyles.iconFontSize+'px', color: currentPage === index ? tabStyles.activeIconFontColor : tabStyles.iconFontColor}\">{{v.codePoint}}</p>\n\n        <p\n          v-if=\"!titleUseSlot\"\n          :style=\"{ fontSize: tabStyles.fontSize+'px', fontWeight: (currentPage === index && tabStyles.isActiveTitleBold)? 'bold' : 'normal', color: currentPage === index ? tabStyles.activeTitleColor : tabStyles.titleColor, paddingLeft:(tabStyles.textPaddingLeft?tabStyles.textPaddingLeft:10)+'px', paddingRight:(tabStyles.textPaddingRight?tabStyles.textPaddingRight:10)+'px'}\"\n          class=\"tab-text\">{{v.title}}</p>\n        <div class=\"border-bottom\"\n             v-if=\"tabStyles.hasActiveBottom && !titleUseSlot\"\n             :style=\"{ width: tabStyles.activeBottomWidth+'px', left: (tabStyles.width-tabStyles.activeBottomWidth)/2+'px', height: tabStyles.activeBottomHeight+'px', backgroundColor: currentPage === index ? tabStyles.activeBottomColor : 'transparent' }\"></div>\n        <slot :name=\"`tab-title-${index}`\" v-if=\"titleUseSlot\"></slot>\n      </div>\n\n      <div v-if=\"tabStyles.hasRightIcon\"\n           class=\"rightIcon\"\n           :style=\"{\n            top: rightIconStyle.top,\n            right: rightIconStyle.right,\n            paddingLeft: rightIconStyle.paddingLeft,\n            paddingRight: rightIconStyle.paddingRight\n           }\">\n        <slot name=\"rightIcon\"></slot>\n      </div>\n\n    </scroller>\n    <div class=\"tab-page-wrap\"\n         ref=\"tab-page-wrap\"\n         @horizontalpan=\"startHandler\"\n         :style=\"{ height: (tabPageHeight-tabStyles.height)+'px' }\">\n      <div ref=\"tab-container\"\n           class=\"tab-container\">\n        <slot></slot>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-tab-page {\n    width: 750px;\n  }\n\n  .tab-title-list {\n    flex-direction: row;\n  }\n\n  .title-item {\n    justify-content: center;\n    align-items: center;\n    border-bottom-style: solid;\n  }\n\n  .border-bottom {\n    position: absolute;\n    bottom: 0;\n  }\n\n  .tab-page-wrap {\n    width: 750px;\n    /* overflow: hidden; */\n  }\n\n  .tab-container {\n    flex: 1;\n    flex-direction: row;\n    position: absolute;\n  }\n\n  .tab-text {\n    lines: 1;\n    text-overflow: ellipsis;\n  }\n\n  .rightIcon {\n    position: fixed;\n    background-color: #ffffff;\n    box-shadow: -50px 0 20px #ffffff;\n  }\n\n</style>\n\n<script>\n  const dom = weex.requireModule('dom');\n  const animation = weex.requireModule('animation');\n  const swipeBack = weex.requireModule('swipeBack');\n\n  import Utils from '../utils';\n  import BindEnv from '../utils/bind-env';\n  import Binding from 'weex-bindingx/lib/index.weex.js';\n\n  export default {\n    props: {\n      tabTitles: {\n        type: Array,\n        default: () => ([])\n      },\n      panDist: {\n        type: Number,\n        default: 200\n      },\n      spmC: {\n        type: [String, Number],\n        default: ''\n      },\n      titleUseSlot: {\n        type: Boolean,\n        default: false\n      },\n      tabStyles: {\n        type: Object,\n        default: () => ({\n          bgColor: '#FFFFFF',\n          titleColor: '#666666',\n          activeTitleColor: '#3D3D3D',\n          activeBgColor: '#FFFFFF',\n          isActiveTitleBold: true,\n          iconWidth: 70,\n          iconHeight: 70,\n          width: 160,\n          height: 120,\n          fontSize: 24,\n          hasActiveBottom: true,\n          activeBottomColor: '#FFC900',\n          activeBottomWidth: 120,\n          activeBottomHeight: 6,\n          textPaddingLeft: 10,\n          textPaddingRight: 10,\n          leftOffset: 0,\n          rightOffset: 0,\n          normalBottomColor: '#F2F2F2',\n          normalBottomHeight: 0,\n          hasRightIcon: false\n        })\n      },\n      titleType: {\n        type: String,\n        default: 'icon'\n      },\n      tabPageHeight: {\n        type: [String, Number],\n        default: 1334\n      },\n      needSlider: {\n        type: Boolean,\n        default: true\n      },\n      isTabView: {\n        type: Boolean,\n        default: true\n      },\n      duration: {\n        type: [Number, String],\n        default: 300\n      },\n      timingFunction: {\n        type: String,\n        default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'\n      },\n      wrapBgColor: {\n        type: String,\n        default: '#f2f3f4'\n      },\n      clickAnimation: {\n        type: Boolean,\n        default: true\n      },\n      rightIconStyle: {\n        type: Object,\n        default: () => ({\n          top: 0,\n          right: 0,\n          paddingLeft: 20,\n          paddingRight: 20\n        })\n      }\n    },\n    data: () => ({\n      currentPage: 0,\n      gesToken: 0,\n      isMoving: false,\n      startTime: 0,\n      deltaX: 0,\n      translateX: 0\n    }),\n    created () {\n      const { titleType, tabStyles } = this;\n      if (titleType === 'iconFont' && tabStyles.iconFontUrl) {\n        dom.addRule('fontFace', {\n          'fontFamily': 'wxcIconFont',\n          'src': `url(${tabStyles.iconFontUrl})`\n        });\n      }\n    },\n    mounted () {\n      if (swipeBack && swipeBack.forbidSwipeBack) {\n        swipeBack.forbidSwipeBack(true);\n      }\n      if (BindEnv.supportsEBForIos() && this.isTabView && this.needSlider) {\n        const tabPageEl = this.$refs['tab-page-wrap'];\n        Binding.prepare && Binding.prepare({\n          anchor: tabPageEl.ref,\n          eventType: 'pan'\n        });\n      }\n    },\n    methods: {\n      next () {\n        let page = this.currentPage;\n        if (page < this.tabTitles.length - 1) {\n          page++;\n        }\n        this.setPage(page);\n      },\n      prev () {\n        let page = this.currentPage;\n        if (page > 0) {\n          page--;\n        }\n        this.setPage(page);\n      },\n      startHandler () {\n        if (BindEnv.supportsEBForIos() && this.isTabView && this.needSlider) {\n          this.bindExp(this.$refs['tab-page-wrap']);\n        }\n      },\n      bindExp (element) {\n        if (element && element.ref) {\n          if (this.isMoving && this.gesToken !== 0) {\n            Binding.unbind({\n              eventType: 'pan',\n              token: this.gesToken\n            })\n            this.gesToken = 0;\n            return;\n          }\n\n          const tabElement = this.$refs['tab-container'];\n          const { currentPage, panDist } = this;\n          const dist = currentPage * 750;\n\n          // x-dist\n          const props = [{\n            element: tabElement.ref,\n            property: 'transform.translateX',\n            expression: `x-${dist}`\n          }];\n\n          const gesTokenObj = Binding.bind({\n            anchor: element.ref,\n            eventType: 'pan',\n            props\n          }, (e) => {\n            const { deltaX, state } = e;\n            if (state === 'end') {\n              if (deltaX < -panDist) {\n                this.next();\n              } else if (deltaX > panDist) {\n                this.prev();\n              } else {\n                this.setPage(currentPage);\n              }\n            }\n          });\n          this.gesToken = gesTokenObj.token;\n        }\n      },\n      setPage (page, url = null, animated = true) {\n        if (!this.isTabView) {\n          this.jumpOut(url);\n          return;\n        }\n        if (this.isMoving === true) {\n          return;\n        }\n        this.isMoving = true;\n        const previousPage = this.currentPage;\n        const currentTabEl = this.$refs[`wxc-tab-title-${page}`][0];\n        const { width } = this.tabStyles;\n        const appearNum = parseInt(750 / width);\n        const tabsNum = this.tabTitles.length;\n        const offset = page > appearNum ? -(750 - width) / 2 : -width * 2;\n\n        if (appearNum < tabsNum) {\n          (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {\n            offset, animated\n          });\n\n          page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {\n            offset: -width * page,\n            animated\n          });\n        }\n\n        this.isMoving = false;\n        this.currentPage = page;\n        this._animateTransformX(page, animated);\n        this.$emit('wxcTabPageCurrentTabSelected', { page });\n      },\n      jumpOut (url) {\n        url && Utils.goToH5Page(url)\n      },\n      _animateTransformX (page, animated) {\n        const { duration, timingFunction } = this;\n        const computedDur = animated ? duration : 0.00001;\n        const containerEl = this.$refs[`tab-container`];\n        const dist = page * 750;\n        animation.transition(containerEl, {\n          styles: {\n            transform: `translateX(${-dist}px)`\n          },\n          duration: computedDur,\n          timingFunction,\n          delay: 0\n        }, () => {\n        });\n      }\n    }\n  };\n</script>\n",null],"sourceRoot":""}]);

// exports


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-noticebar[data-v-4edbf20e] {\n  width: 10rem;\n  padding-top: 0.13333rem;\n  padding-bottom: 0.13333rem;\n  padding-left: 0.32rem;\n  background-color: #FFF7D6;\n  border-bottom-width: 1px;\n  border-top-width: 1px;\n  border-color: #FFEEAE;\n  border-style: solid;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.noticebar-content[data-v-4edbf20e] {\n  color: #EE9900;\n  font-size: 0.34667rem;\n  line-height: 0.48rem;\n  width: 7.89333rem;\n  text-overflow: ellipsis;\n}\n.more-click-content[data-v-4edbf20e] {\n  width: 0.85333rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.mode-ICON[data-v-4edbf20e],\n.type-ICON[data-v-4edbf20e] {\n  width: 0.42667rem;\n  height: 0.42667rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-noticebar/index.vue?c1875f30"],"names":[],"mappings":";AA0BA;EACA,aAAA;EACA,wBAAA;EACA,2BAAA;EACA,sBAAA;EACA,0BAAA;EACA,yBAAA;EACA,sBAAA;EACA,sBAAA;EACA,oBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,eAAA;EACA,sBAAA;EACA,qBAAA;EACA,kBAAA;EACA,wBAAA;CACA;AAEA;EACA,kBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;CACA;AAEA;;EAEA,kBAAA;EACA,mBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/28. -->\n<!--A notice bar.-->\n\n<template>\n  <div class=\"wxc-noticebar\"\n       v-if=\"show\"\n       @click=\"noticeBarClicked\"\n       :accessible=\"true\"\n       :aria-label=\"notice\">\n    <image class=\"type-ICON\"\n           v-if=\"typeIcon\"\n           :src=\"typeIcon\"></image>\n    <p class=\"noticebar-content\"\n          :style=\"{ width: contentWidth + 'px',lines:lines}\">{{notice}}</p>\n    <div class=\"more-click-content\"\n         @click=\"noticeIconClicked\"\n         v-if=\"modeIcon\"\n         :mode=\"mode\">\n      <image class=\"mode-ICON\"\n             :src=\"modeIcon\"></image>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-noticebar {\n    width: 750px;\n    padding-top: 10px;\n    padding-bottom: 10px;\n    padding-left: 24px;\n    background-color: #FFF7D6;\n    border-bottom-width: 1px;\n    border-top-width: 1px;\n    border-color: #FFEEAE;\n    border-style: solid;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n  }\n\n  .noticebar-content {\n    color: #EE9900;\n    font-size: 26px;\n    line-height: 36px;\n    width: 592px;\n    text-overflow: ellipsis;\n  }\n\n  .more-click-content {\n    width: 64px;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .mode-ICON,\n  .type-ICON {\n    width: 32px;\n    height: 32px;\n  }\n</style>\n\n<script>\n  import ICON from './type';\n  import Utils from '../utils';\n\n  export default {\n    props: {\n      notice: {\n        type: String,\n        default: ''\n      },\n      noticeUrl: {\n        type: String,\n        default: ''\n      },\n      mode: {\n        type: String,\n        default: ''\n      },\n      lines: {\n        type: [Number, String],\n        default: 1\n      },\n      type: {\n        type: String,\n        default: ''\n      },\n      spm: {\n        type: String,\n        default: ''\n      }\n    },\n    computed: {\n      contentWidth () {\n        return this.mode ? 605 : 683;\n      },\n      modeIcon () {\n        let modeIcon;\n        switch (this.mode) {\n          case 'link':\n            modeIcon = ICON.linkIcon;\n            break;\n          case 'closable':\n            modeIcon = ICON.closeIcon;\n            break;\n          default:\n            modeIcon = '';\n        }\n        return modeIcon;\n      },\n      typeIcon () {\n        let typeIcon;\n        switch (this.type) {\n          case 'success':\n            typeIcon = ICON.successIcon;\n            break;\n          case 'error':\n            typeIcon = ICON.errorIcon;\n            break;\n          case 'info':\n            typeIcon = ICON.infoIcon;\n            break;\n          case 'question':\n            typeIcon = ICON.questionIcon;\n            break;\n          case 'warn':\n            typeIcon = ICON.warnIcon;\n            break;\n          case 'time':\n            typeIcon = ICON.timeIcon;\n            break;\n          case 'redbag':\n            typeIcon = ICON.redbag;\n            break;\n          default:\n            typeIcon = '';\n        }\n        return typeIcon;\n      }\n    },\n    data: () => ({\n      show: true\n    }),\n    methods: {\n      noticeBarClicked () {\n        const { mode, noticeUrl, spm } = this;\n        if (mode === 'link' && noticeUrl) {\n          const { ttid } = weex.config.env;\n          Utils.goToH5Page(noticeUrl, spm, ttid, true);\n          this.$emit('wxcNoticebarLinkClicked', { url: noticeUrl });\n        }\n      },\n      noticeIconClicked () {\n        const { mode } = this;\n        if (mode === 'closable') {\n          this.show = false;\n          this.$emit('wxcNoticebarCloseClicked', {});\n        } else {\n          this.noticeBarClicked();\n        }\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.icon-font[data-v-50ae1a48] {\n  color: #666666;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-icon/index.vue?6fd18b90"],"names":[],"mappings":";AAQA;EACA,eAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/12/25. -->\n\n<template>\n  <p class=\"icon-font\" :style=\"mergeStyle\" @click=\"itemClicked(name)\">{{Icon[name]}}</p>\n</template>\n\n<style scoped>\n  .icon-font {\n    color: #666666;\n  }\n</style>\n\n<script>\n  import Icon from './type';\n\n  const dom = weex.requireModule('dom');\n\n  export default {\n    props: {\n      name: {\n        default: 'success',\n        type: String\n      },\n      size: {\n        default: 'small',\n        type: String\n      },\n      iconStyle: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    data: () => ({\n      Icon\n    }),\n    beforeCreate () {\n      dom.addRule('fontFace', {\n        'fontFamily': \"weexUiIconFont\",\n        'src': \"url('https://at.alicdn.com/t/font_520368_r89ekv69euahsemi.ttf')\"\n      });\n    },\n    computed: {\n      mergeStyle () {\n        const { iconStyle, size } = this;\n        let fontSize = '48px';\n        switch (size) {\n          case 'xs':\n            fontSize = '24px';\n            break;\n          case 'small':\n            fontSize = '48px';\n            break;\n          case 'medium':\n            fontSize = '72px';\n            break;\n          case 'big':\n            fontSize = '128px';\n            break;\n          default:\n            fontSize = '48px';\n        }\n        return {\n          fontFamily: 'weexUiIconFont',\n          fontSize,\n          ...iconStyle\n        }\n      }\n    },\n    methods: {\n      itemClicked (name) {\n        this.$emit('wxcIconClicked', {\n          name\n        });\n      }\n    },\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.grid-select[data-v-50bc0536] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n  -webkit-flex-wrap: wrap;\n          flex-wrap: wrap;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-grid-select/index.vue?952cc782"],"names":[],"mappings":";AAqIA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;EACA,wBAAA;UAAA,gBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by 南麓 on 2017/8/10. -->\n\n<template>\n  <div class=\"grid-select\">\n    <option\n      v-for=\"(item, index) in dList\"\n      v-bind=\"Object.assign({}, customStyles, item)\"\n      :key=\"index\"\n      :index=\"index\"\n      :style=\"{marginTop: index >= cols ? lineSpacing : null}\"\n      @select=\"onSelect(index)\"></option>\n\n    <option\n      v-for=\"(item, index) in cHackList\"\n      v-bind=\"Object.assign({}, customStyles, item)\"\n      :key=\"id + index\"\n      :style=\"{opacity: 0, marginTop: dList.length >= cols ? lineSpacing : null}\"></option>\n  </div>\n</template>\n\n<script>\n  import Option from './option.vue';\n\n  export default {\n    components: { Option },\n    props: {\n      // 标识, 当界面展示多个grid, 防止v-for :key重复\n      id: {\n        type: String,\n        default: 'one'\n      },\n      // 列数\n      cols: {\n        type: Number,\n        default: 4\n      },\n      // 是否单选\n      single: {\n        type: Boolean,\n        default: false\n      },\n      // 数据\n      list: {\n        type: Array,\n        default: () => ([])\n      },\n      // 选择个数限制\n      limit: {\n        type: Number\n      },\n      // 用户自定义样式，用于个性化设置option样式\n      customStyles: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    data () {\n      return {\n        dList: this.initList()\n      }\n    },\n    computed: {\n      cHackList () {\n        const { list, cols } = this;\n        const remainder = list.length % cols;\n        const len = remainder ? cols - remainder : 0;\n\n        return Array.apply(null, { length: len });\n      }\n    },\n    watch: {\n      list () {\n        this.dList = this.initList();\n      }\n    },\n    created () {\n      // 行间距\n      this.lineSpacing = this.customStyles.lineSpacing || '12px';\n    },\n    methods: {\n      onSelect (index) {\n        const checked = this.dList[index].checked;\n        if (this.limit <= this.checkedCount && !checked) {\n          this.$emit('overLimit', this.limit);\n        } else {\n          this.updateList(index);\n          this.$emit('select', {\n            selectIndex: index,\n            checked: !checked,\n            checkedList: this.dList.filter(item => item.checked)\n          });\n        }\n      },\n      initList () {\n        const single = this.single;\n        let checkedCount = 0;\n\n        const dList = this.list.map((item, i) => {\n          let { checked, disabled } = item;\n          disabled = !!disabled;\n          // disabled为true时认为checked无效，同时单选模式下只认为第一个checked为true的为有效值\n          checked = !disabled && !!checked && (!single || checkedCount === 0);\n          if (item.checked) checkedCount += 1;\n          return {\n            ...item,\n            checked,\n            disabled\n          }\n        });\n\n        this.checkedCount = checkedCount;\n        return dList;\n      },\n      updateList (index) {\n        const single = this.single;\n        let checkedCount = 0;\n        this.dList = this.dList.map((item, i) => {\n          if (single) {\n            item.checked = index === i && !item.checked;\n          } else {\n            if (i === index) item.checked = !item.checked;\n          }\n          if (item.checked) checkedCount += 1;\n          return item;\n        });\n        this.checkedCount = checkedCount;\n      }\n    }\n  };\n</script>\n\n<style scoped>\n  .grid-select {\n    flex-direction: row;\n    justify-content: space-between;\n    flex-wrap: wrap;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.flex-row[data-v-61efacbc] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n.full-rest[data-v-61efacbc] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n}\n.root[data-v-61efacbc] {\n  padding-top: 0.37333rem;\n  padding-bottom: 0.32rem;\n  background-color: #ffffff;\n}\n.content[data-v-61efacbc] {\n  padding-top: 0.12rem;\n  padding-bottom: 0.56rem;\n}\n.last-one-content[data-v-61efacbc] {\n  padding-bottom: 0;\n}\n.title[data-v-61efacbc],\n.content[data-v-61efacbc] {\n  padding-left: 0.93333rem;\n  padding-right: 0.93333rem;\n}\n.line[data-v-61efacbc] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0.50667rem;\n  width: 0.02667rem;\n  background-color: #FFC300;\n}\n.first-one-title-line[data-v-61efacbc] {\n  top: 0.26667rem;\n}\n.last-one-title-line[data-v-61efacbc] {\n  bottom: 0.26667rem;\n}\n.last-one-content-line[data-v-61efacbc] {\n  width: 0;\n}\n.point[data-v-61efacbc] {\n  position: absolute;\n  top: 0.17333rem;\n  left: 0.42667rem;\n  width: 0.18667rem;\n  height: 0.18667rem;\n  background-color: #FFF0BD;\n  border-style: solid;\n  border-width: 0.02667rem;\n  border-color: #EE9900;\n  border-radius: 1.33333rem;\n}\n.highlight-point[data-v-61efacbc] {\n  top: 0.09333rem;\n  left: 0.34667rem;\n  width: 0.34667rem;\n  height: 0.34667rem;\n  background-color: #EE9900;\n  border-style: solid;\n  border-width: 0.08rem;\n  border-color: #FFE78D;\n}\n.text-title[data-v-61efacbc] {\n  font-size: 0.4rem;\n  color: #3d3d3d;\n}\n.text-highlight-title[data-v-61efacbc] {\n  color: #EE9900;\n}\n.text-desc[data-v-61efacbc],\n.text-date[data-v-61efacbc] {\n  font-size: 0.32rem;\n  color: #a5a5a5;\n}\n.text-desc[data-v-61efacbc] {\n  margin-bottom: 0.16rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-simple-flow/index.vue?a2968494"],"names":[],"mappings":";AAgCA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;CACA;AAEA;EACA,wBAAA;EACA,wBAAA;EACA,0BAAA;CACA;AAEA;EACA,qBAAA;EACA,wBAAA;CACA;AAEA;EACA,kBAAA;CACA;AAEA;;EAEA,yBAAA;EACA,0BAAA;CACA;AAEA;EACA,mBAAA;EACA,OAAA;EACA,UAAA;EACA,iBAAA;EACA,kBAAA;EACA,0BAAA;CACA;AAEA;EACA,gBAAA;CACA;AAEA;EACA,mBAAA;CACA;AAEA;EACA,SAAA;CACA;AAEA;EACA,mBAAA;EACA,gBAAA;EACA,iBAAA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;EACA,oBAAA;EACA,yBAAA;EACA,sBAAA;EACA,0BAAA;CACA;AAEA;EACA,gBAAA;EACA,iBAAA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;EACA,oBAAA;EACA,sBAAA;EACA,sBAAA;CACA;AAEA;EACA,kBAAA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;;EAEA,mBAAA;EACA,eAAA;CACA;AAEA;EACA,uBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by 南麓 on 2017/5/25. -->\n\n<template>\n  <div class=\"root\">\n    <div v-for=\"(item, index) in cItems\"\n         :key=\"item.key\"\n         :accessible=\"true\"\n         :aria-label=\"`${item.title},${item.desc?item.desc:''},${item.date?item.date:''},${item.highlight?'已完成':'等待完成'}`\">\n      <div class=\"title flex-row\">\n        <div class=\"line\" :class=\"item.__titleLineClass__\" :style=\"item.__lineStyle__\"></div>\n\n        <div class=\"point\" :class=\"item.__pointClass__\" :style=\"item.__pointStyle__\"></div>\n\n        <p class=\"text-title full-rest\" :class=\"item.__titleTextClass__\"\n              :style=\"item.__titleStyle__\">{{item.title}}</p>\n      </div>\n\n      <div class=\"content flex-row\" :class=\"item.__contentClass__\">\n        <div class=\"line\" :class=\"item.__contentLineClass__\" :style=\"item.__lineStyle__\"></div>\n\n        <div class=\"full-rest\">\n          <p v-if=\"item.desc\" class=\"text-desc\">{{item.desc}}</p>\n\n          <p v-if=\"item.date\" class=\"text-date\">{{item.date}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .flex-row {\n    flex-direction: row;\n  }\n\n  .full-rest {\n    flex: 1;\n  }\n\n  .root {\n    padding-top: 28px;\n    padding-bottom: 24px;\n    background-color: #ffffff;\n  }\n\n  .content {\n    padding-top: 9px;\n    padding-bottom: 42px;\n  }\n\n  .last-one-content {\n    padding-bottom: 0;\n  }\n\n  .title,\n  .content {\n    padding-left: 70px;\n    padding-right: 70px;\n  }\n\n  .line {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 38px;\n    width: 2px;\n    background-color: #FFC300;\n  }\n\n  .first-one-title-line {\n    top: 20px;\n  }\n\n  .last-one-title-line {\n    bottom: 20px;\n  }\n\n  .last-one-content-line {\n    width: 0;\n  }\n\n  .point {\n    position: absolute;\n    top: 13px;\n    left: 32px;\n    width: 14px;\n    height: 14px;\n    background-color: #FFF0BD;\n    border-style: solid;\n    border-width: 2px;\n    border-color: #EE9900;\n    border-radius: 100px;\n  }\n\n  .highlight-point {\n    top: 7px;\n    left: 26px;\n    width: 26px;\n    height: 26px;\n    background-color: #EE9900;\n    border-style: solid;\n    border-width: 6px;\n    border-color: #FFE78D;\n  }\n\n  .text-title {\n    font-size: 30px;\n    color: #3d3d3d;\n  }\n\n  .text-highlight-title {\n    color: #EE9900;\n  }\n\n  .text-desc,\n  .text-date {\n    font-size: 24px;\n    color: #a5a5a5;\n  }\n\n  .text-desc {\n    margin-bottom: 12px;\n  }\n</style>\n\n<script>\n  export default {\n    props: {\n      list: {\n        type: Array,\n        required: true\n      },\n      themeColor: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    computed: {\n      cItems () {\n        return this.adapter(this.list);\n      }\n    },\n    methods: {\n      adapter (items) {\n        const {\n          lineColor,\n          pointInnerColor,\n          pointBorderColor,\n          highlightTitleColor,\n          highlightPointInnerColor,\n          highlightPointBorderColor\n        } = this.themeColor;\n        const len = items.length;\n        const pre = Date.now();\n\n        return items.map((item, index) => {\n          item.key = `${pre}_${index}`;\n          item.__titleLineClass__ = [];\n          item.__contentClass__ = [];\n          item.__contentLineClass__ = [];\n          item.__pointClass__ = [];\n          item.__titleTextClass__ = [];\n          item.__pointStyle__ = {};\n          item.__lineStyle__ = {};\n          item.__titleStyle__ = {};\n\n          if (lineColor) item.__lineStyle__.backgroundColor = lineColor;\n          if (pointInnerColor) item.__pointStyle__.backgroundColor = pointInnerColor;\n          if (pointBorderColor) item.__pointStyle__.borderColor = pointBorderColor;\n\n          if (index === 0) {\n            item.__titleLineClass__.push('first-one-title-line');\n          }\n\n          if (index === len - 1) {\n            item.__titleLineClass__.push('last-one-title-line');\n            item.__contentClass__.push('last-one-content');\n            item.__contentLineClass__.push('last-one-content-line');\n          }\n\n          if (item.highlight) {\n            item.__pointClass__.push('highlight-point');\n            item.__titleTextClass__.push('text-highlight-title');\n            if (highlightTitleColor) item.__titleStyle__.color = highlightTitleColor;\n            if (highlightPointInnerColor) item.__pointStyle__.backgroundColor = highlightPointInnerColor;\n            if (highlightPointBorderColor) item.__pointStyle__.borderColor = highlightPointBorderColor;\n          }\n          return item;\n        });\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-special-rich-text[data-v-6f52a706] {\n  position: relative;\n}\n.tag-div[data-v-6f52a706] {\n  position: absolute;\n  top: 0;\n  color: #A5A5A5;\n  font-size: 0.32rem;\n  line-height: 0.4rem;\n}\n.wxc-text[data-v-6f52a706] {\n  font-size: 0.32rem;\n  line-height: 0.45333rem;\n  color: #3d3d3d;\n  lines: 2;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 2;\n}\n.black[data-v-6f52a706] {\n  color: #3D3D3D;\n}\n.yellow[data-v-6f52a706] {\n  color: #EE9900;\n}\n.blue[data-v-6f52a706] {\n  color: #30A0FF;\n}\n.gray[data-v-6f52a706] {\n  color: #A5A5A5;\n}\n.red[data-v-6f52a706] {\n  color: #FF5000;\n}\n.margin-text[data-v-6f52a706] {\n  margin-right: 0.08rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-special-rich-text/index.vue?44515482","/Users/Tw93/www/github/weex-ui/packages/wxc-special-rich-text/<no source>"],"names":[],"mappings":";AAiCA;EACA,mBAAA;CACA;AAEA;EACA,mBAAA;EACA,OAAA;EACA,eAAA;EACA,mBAAA;EACA,oBAAA;CACA;AAEA;EACA,mBAAA;EACA,wBAAA;EACA,eAAA;EACA,SAAA;EACA,wBAAA;EACA,iBAAA;ECnDA,iBAAA;EAAA,wBAAA;EAAA,sBAAA;CDoDA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,sBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n<!-- just hack for babel-plugin-component !!!-->\n\n<template>\n  <div class=\"wxc-special-rich-text\" @click=\"$emit('wxcSpecialRichTextClick')\">\n    <div class=\"tag-div\"\n         :style=\"Object.assign({top:top+'px'}, newList[0].tagDivStyle)\">\n      <image class=\"wxc-image\"\n             v-if=\"newList[0] && newList[0].type === 'icon' && newList[0].src\"\n             :src=\"newList[0].src\"\n             quality=\"original\"\n             :original=\"true\"\n             @load=\"onLoad\"\n             :style=\"newList[0].style\"\n             :aria-hidden=\"true\">\n      </image>\n      <wxc-rich-text-tag v-if=\"newList[0] && newList[0].type === 'tag' && newList[0].value\"\n                         :tag-value=\"newList[0].value\"\n                         :tag-theme=\"newList[0].theme\"\n                         :tag-style=\"newList[0].style\"></wxc-rich-text-tag>\n    </div>\n    <p :class=\"['wxc-text', newList[0].theme]\"\n          :style=\"newList[0].style\"\n          v-if=\"newList[0] && newList[0].type === 'text' && newList[0].value\">{{newList[0].value}}</p>\n\n    <p :class=\"['wxc-text', newList[1].theme]\"\n          :style=\"newList[1].style\"\n          v-if=\"newList[1] && newList[1].value\">{{newList[1].value}}</p>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-special-rich-text {\n    position: relative;\n  }\n\n  .tag-div {\n    position: absolute;\n    top: 0;\n    color: #A5A5A5;\n    font-size: 24px;\n    line-height: 30px;\n  }\n\n  .wxc-text {\n    font-size: 24px;\n    line-height: 34px;\n    color: #3d3d3d;\n    lines: 2;\n    text-overflow: ellipsis;\n    overflow: hidden;\n  }\n\n  .black {\n    color: #3D3D3D;\n  }\n\n  .yellow {\n    color: #EE9900;\n  }\n\n  .blue {\n    color: #30A0FF;\n  }\n\n  .gray {\n    color: #A5A5A5;\n  }\n\n  .red {\n    color: #FF5000;\n  }\n\n  .margin-text {\n    margin-right: 6px;\n  }\n</style>\n\n<script>\n  import Utils from '../utils';\n\n  const { appName, osName, deviceWidth } = weex.config.env;\n  const needHack = ((Utils.env.isAlipay() || appName === 'UC' || appName === 'TUnionSDK') && osName !== 'iOS') || Utils.env.isAndroid();\n  const isPad = osName === 'iOS' && deviceWidth > 1300;\n\n  import WxcRichTextText from '../wxc-rich-text/wxc-rich-text-text.vue';\n  import WxcRichTextTag from '../wxc-rich-text/wxc-rich-text-tag.vue'\n\n  export default {\n    components: {\n      WxcRichTextText,\n      WxcRichTextTag,\n    },\n    props: {\n      configList: {\n        type: [Array, String],\n        default: () => ({})\n      }\n    },\n    data: () => ({\n      iconWidth: 90,\n      iconHeight: 24,\n      needHack\n    }),\n    computed: {\n      newList () {\n        const { configList, iconHeight, iconWidth, needHack } = this;\n        if (Utils.isNonEmptyArray(configList) && configList.length === 2) {\n          let r1 = configList[0];\n          let r2 = configList[1];\n          const iconStyle = r1.style;\n          const textStyle = r2.style;\n          let style = {};\n          let fontSize = 24;\n          let tagWidth = iconStyle && iconStyle.width ? iconStyle.width : 24;\n\n          if (textStyle && textStyle.fontSize && !isNaN(textStyle.fontSize)) {\n            fontSize = textStyle.fontSize;\n            style = {\n              fontSize: `${textStyle.fontSize}px`,\n              lineHeight: `${Number(textStyle.fontSize * 1.4).toFixed(2)}px`\n            }\n          }\n\n          if (textStyle && textStyle.color) {\n            style = {\n              ...style,\n              color: textStyle.color\n            }\n          }\n\n          if (textStyle && textStyle.lines) {\n            style = {\n              ...style,\n              lines: textStyle.lines\n            }\n          }\n\n          if (r1.type === 'icon' && iconStyle && iconStyle.height && !iconStyle.width) {\n            tagWidth = parseInt(iconWidth * (iconStyle.height / iconHeight));\n            r1 = {\n              ...r1,\n              style: {\n                width: tagWidth + 'px',\n                height: iconStyle.height + 'px'\n              }\n            }\n          }\n\n          if (r1.type === 'icon' && !(iconStyle && iconStyle.height)) {\n            r1 = {\n              ...r1,\n              style: {\n                width: iconWidth + 'px',\n                height: iconHeight + 'px'\n              }\n            }\n          }\n\n          if (r1.type === 'tag' && iconStyle && iconStyle.width) {\n            r1 = {\n              ...r1,\n              style: { ...iconStyle, width: null }\n            }\n          }\n\n          let blank = '';\n          let num = Math.ceil(tagWidth / fontSize) + 1;\n\n          if (r1.type === 'tag' && r1.value) {\n            num = this.countString(r1.value);\n          }\n\n          const tagMoreBlank = ((!isPad && num < 7) ? '  ' : '') + (needHack ? '  ' : '') + ((isPad && num < 3) ? '    ' : '');\n          const iconMoreBlank = num > 2 ? (needHack ? '     ' : '   ') : ' ';\n          if (r1.type === 'tag') {\n            blank = new Array(num).join('  ') + tagMoreBlank;\n          } else if (r1.type === 'icon') {\n            blank = new Array(num).join('  ') + iconMoreBlank;\n          }\n          blank += (isPad && num > 2) ? '     ' : '';\n          const newValue = r2.value ? blank + ` ${r2.value}` : '';\n\n          r2 = {\n            ...r2,\n            style,\n            value: newValue\n          };\n\n          return [r1, r2];\n        } else {\n          return configList;\n        }\n      },\n      top () {\n        const { configList, needHack } = this;\n        if (Utils.isNonEmptyArray(configList) && configList.length === 2) {\n          const iconStyle = configList[0].style;\n          const textStyle = configList[1].style;\n          let fontSize = 24;\n          const tagHeight = iconStyle && iconStyle.height ? iconStyle.height : 26;\n          if (textStyle && textStyle.fontSize) {\n            fontSize = textStyle.fontSize;\n          }\n          const d = needHack ? 1.1 : 1.4;\n          return Math.ceil((fontSize * d - tagHeight) / 2);\n        } else {\n          return 0;\n        }\n      }\n    },\n    methods: {\n      onLoad (e) {\n        if (e.success && e.size && e.size.naturalWidth > 0) {\n          const { naturalWidth, naturalHeight } = e.size;\n          this.iconWidth = naturalWidth;\n          this.iconHeight = naturalHeight;\n        } else {\n          const { configList } = this;\n          if (Utils.isNonEmptyArray(configList) && configList.length === 2) {\n            const { style } = configList[0];\n            if (style && style.height && style.width) {\n              this.iconWidth = style.width;\n              this.iconHeight = style.height;\n            }\n          }\n        }\n      },\n      countString (str) {\n        const chineseRegex = /[^ -~]/g;\n        return str.replace(chineseRegex, '**').length;\n      }\n    }\n  };\n</script>\n",null],"sourceRoot":""}]);

// exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.radio[data-v-6f935647] {\n  width: 0.48rem;\n  height: 0.48rem;\n}\n.title-text[data-v-6f935647] {\n  font-size: 0.4rem;\n  height: 0.53333rem;\n  line-height: 0.53333rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-radio/item.vue?15b77af8"],"names":[],"mappings":";AAoBA;EACA,eAAA;EACA,gBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,wBAAA;CACA","file":"item.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <wxc-cell :has-top-border=\"hasTopBorder\"\n            :cell-style=\"{backgroundColor:backgroundColor}\"\n            @wxcCellClicked=\"wxcCellClicked\"\n            :accessible=\"true\"\n            :aria-label=\"`${title},状态为${checked?'已选中':'未选中'},${disabled?'不可更改':''}`\">\n    <p :style=\"{color:color}\"\n          class=\"title-text\"\n          slot=\"title\">{{title}}</p>\n    <image :src=\"radioIcon\"\n           v-if=\"radioIcon\"\n           slot=\"value\"\n           class=\"radio\"></image>\n  </wxc-cell>\n</template>\n\n<style scoped>\n  .radio {\n    width: 36px;\n    height: 36px;\n  }\n\n  .title-text {\n    font-size: 30px;\n    height: 40px;\n    line-height: 40px;\n  }\n</style>\n\n<script>\n  import WxcCell from '../wxc-cell';\n  import { CHECKED, DISABLED } from './type.js'\n\n  export default {\n    components: { WxcCell },\n    props: {\n      hasTopBorder: {\n        type: Boolean,\n        default: false\n      },\n      title: {\n        type: String,\n        require: true\n      },\n      value: {\n        type: [String, Number, Object],\n        require: true\n      },\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      checked: {\n        type: Boolean,\n        default: false\n      },\n      config: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    data: () => ({\n      icon: [CHECKED, DISABLED]\n    }),\n    computed: {\n      radioIcon () {\n        const { icon, disabled, checked, config } = this;\n        const mergeIcon = icon;\n        config.checkedIcon && (mergeIcon[0] = config.checkedIcon);\n        config.disabledIcon && (mergeIcon[1] = config.disabledIcon);\n        return checked ? mergeIcon[disabled ? 1 : 0] : '';\n      },\n      backgroundColor () {\n        const { disabled } = this;\n        return disabled ? '#F2F3F4' : '#FFFFFF';\n      },\n      color () {\n        const { disabled, checked, config } = this;\n        let checkedColor = '#EE9900';\n        config.checkedColor && (checkedColor = config.checkedColor);\n        return checked && !disabled ? checkedColor : '#3D3D3D';\n      }\n    },\n    methods: {\n      wxcCellClicked () {\n        const { disabled, value } = this;\n        if (!disabled) {\n          this.$emit('wxcRadioItemChecked', { value, disabled })\n        }\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.checkbox[data-v-702739a6] {\n  width: 0.64rem;\n  height: 0.64rem;\n}\n.title-text[data-v-702739a6] {\n  font-size: 0.4rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-checkbox/index.vue?4b629d9e"],"names":[],"mappings":";AAmBA;EACA,eAAA;EACA,gBAAA;CACA;AAEA;EACA,kBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <wxc-cell :has-top-border=\"hasTopBorder\"\n            :has-bottom-border=\"hasBottomBorder\"\n            @wxcCellClicked=\"wxcCellClicked\"\n            :accessible=\"true\"\n            :aria-label=\"`${title},状态为${checked ? '已选中' : '未选中'},${disabled ? '不可更改' : '点击可切换'}`\">\n    <p :style=\"{color:textColor}\"\n          class=\"title-text\"\n          slot=\"title\">{{title}}</p>\n    <image :src=\"checkIcon\"\n           slot=\"value\"\n           class=\"checkbox\"></image>\n  </wxc-cell>\n</template>\n\n<style scoped>\n  .checkbox {\n    width: 48px;\n    height: 48px;\n  }\n\n  .title-text {\n    font-size: 30px;\n  }\n</style>\n\n<script>\n  import WxcCell from '../wxc-cell';\n  import { CHECKED, UNCHECKED, CHECKED_DISABLED, UNCHECKED_DISABLED } from './type'\n\n  export default {\n    components: { WxcCell },\n    props: {\n      hasTopBorder: {\n        type: Boolean,\n        default: false\n      },\n      hasBottomBorder: {\n        type: Boolean,\n        default: true\n      },\n      title: {\n        type: String,\n        require: true\n      },\n      value: {\n        type: [String, Number, Object],\n        require: true\n      },\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      checked: {\n        type: Boolean,\n        default: false\n      },\n      config: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    data: () => ({\n      icon: [CHECKED, UNCHECKED, CHECKED_DISABLED, UNCHECKED_DISABLED],\n      color: '#3D3D3D',\n      innerChecked: false\n    }),\n    computed: {\n      checkIcon () {\n        const { icon, disabled, innerChecked, config } = this;\n        const mergeIcon = [...icon];\n        config.checkedIcon && (mergeIcon[0] = config.checkedIcon);\n        config.unCheckedIcon && (mergeIcon[1] = config.unCheckedIcon);\n        config.checkedDisabledIcon && (mergeIcon[2] = config.checkedDisabledIcon);\n        config.unCheckedDisabledIcon && (mergeIcon[3] = config.unCheckedDisabledIcon);\n        if (disabled) {\n          return mergeIcon[innerChecked ? 2 : 3];\n        } else {\n          return mergeIcon[innerChecked ? 0 : 1];\n        }\n      },\n      textColor () {\n        const { innerChecked, disabled, config } = this;\n        const checkedColor = config.checkedColor ? config.checkedColor : '#EE9900';\n        return innerChecked && !disabled ? checkedColor : '#3D3D3D';\n      }\n    },\n    watch: {\n      checked (newChecked) {\n        this.innerChecked = newChecked;\n      }\n    },\n    created () {\n      const { checked } = this;\n      this.innerChecked = checked;\n    },\n    methods: {\n      wxcCellClicked () {\n        const { disabled, innerChecked, value } = this;\n        if (!disabled) {\n          this.innerChecked = !innerChecked;\n          this.$emit('wxcCheckBoxItemChecked', { value, checked: this.innerChecked })\n        }\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-text[data-v-72879af8] {\n  font-size: 0.32rem;\n  color: #3d3d3d;\n}\n.black[data-v-72879af8] {\n  color: #3D3D3D;\n}\n.yellow[data-v-72879af8] {\n  color: #EE9900;\n}\n.blue[data-v-72879af8] {\n  color: #30A0FF;\n}\n.gray[data-v-72879af8] {\n  color: #A5A5A5;\n}\n.red[data-v-72879af8] {\n  color: #FF5000;\n}\n.margin-text[data-v-72879af8] {\n  margin-right: 0.08rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-text.vue?066066cf"],"names":[],"mappings":";AAQA;EACA,mBAAA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,sBAAA;CACA","file":"wxc-rich-text-text.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <p :class=\"['wxc-text', textTheme,hasTextMargin ? 'margin-text' : '']\" :style=\"themeStyle\">{{textValue}}</p>\n</template>\n\n<style scoped>\n  .wxc-text {\n    font-size: 24px;\n    color: #3d3d3d;\n  }\n\n  .black {\n    color: #3D3D3D;\n  }\n\n  .yellow {\n    color: #EE9900;\n  }\n\n  .blue {\n    color: #30A0FF;\n  }\n\n  .gray {\n    color: #A5A5A5;\n  }\n\n  .red {\n    color: #FF5000;\n  }\n\n  .margin-text {\n    margin-right: 6px;\n  }\n</style>\n\n<script>\n  export default {\n    props: {\n      textValue: {\n        type: String,\n        default: ''\n      },\n      textTheme: {\n        type: String,\n        default: 'gray'\n      },\n      textStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      hasTextMargin: {\n        type: Boolean,\n        default: true\n      }\n    },\n    computed: {\n      themeStyle () {\n        let style = { ...this.textStyle };\n        if (style && (style.fontSize || style['font-size'])) {\n          style = {\n            ...style,\n            fontSize: `${style.fontSize || style['font-size']}px`,\n            height: `${(style.fontSize || style['font-size']) * 1.2}px`\n          }\n        }\n        return style;\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.rain-item[data-v-7513c695] {\n  position: absolute;\n  opacity: 0;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-lottery-rain/rain-item.vue?0df3bc54"],"names":[],"mappings":";AAcA;EACA,mBAAA;EACA,WAAA;CACA","file":"rain-item.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/09/06. -->\n<!--A weex lottery rain game,this is an item-->\n\n<template>\n  <image :src=\"src\"\n         :style=\"pos\"\n         @click=\"caught\"\n         class=\"rain-item\"\n         v-if=\"showItem && src\"\n         :ref=\"`rain-item-${rainId}`\"></image>\n</template>\n\n<style scoped>\n  .rain-item {\n    position: absolute;\n    opacity: 0;\n  }\n</style>\n\n<script>\n  import * as Ani from './libs/animate.js';\n  import * as  CFG from './libs/config.js';\n  import Region from './libs/region.js';\n\n  export default {\n    props: {\n      src: String,\n      rainId: [String, Number],\n      config: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    computed: {\n      // 合并用户配置和默认\n      cfg () {\n        return {\n          ...CFG.DEFAULT,\n          ...this.config\n        }\n      }\n    },\n    data: () => ({\n      showItem: false,\n      hiding: false,\n      pos: {},\n      showTimer: null,\n      hideTimer: null,\n      intervalTimer: null\n    }),\n    created () {\n      const { width, height } = this.cfg;\n      this.pos = Region.get(width, height);\n    },\n    mounted () {\n      this.start();\n    },\n    methods: {\n      start () {\n        const { cfg } = this;\n        const random = Math.round(Math.random() * cfg.randomTime);\n        const showTime = cfg.showTime + random;\n        const intervalTime = Math.max(cfg.intervalTime, cfg.showAniTime + showTime + cfg.hideAniTime) + random;\n\n        this.onShow = () => {\n          this.hideTimer = setTimeout(() => {\n            this.hide();\n          }, showTime);\n        };\n\n        this.onHide = () => {\n          Region.remove(this.pos);\n          this.pos = {};\n          this.showItem = false;\n          this.hiding = false;\n          const { width, height } = this.cfg;\n          this.pos = Region.get(width, height);\n        };\n\n        this.showTimer = setTimeout(() => {\n          this.show();\n        }, random);\n\n        this.intervalTimer = setInterval(() => {\n          this.show();\n        }, intervalTime);\n      },\n\n      hide () {\n        const { cfg, rainId } = this;\n        this.hiding = true;\n        clearTimeout(this.showTimer);\n        clearTimeout(this.hideTimer);\n        Ani.hidePig(this.$refs[`rain-item-${rainId}`], cfg.hideAniTime, this.onHide);\n      },\n\n      show () {\n        const { cfg, rainId } = this;\n        this.showItem = true;\n        Ani.showPig(this.$refs[`rain-item-${rainId}`], cfg.showAniTime, this.onShow);\n      },\n\n      caught () {\n        const { rainId, hiding } = this;\n        if (hiding) return;\n        clearTimeout(this.showTimer);\n        clearTimeout(this.hideTimer);\n        Ani.shakePig(this.$refs[`rain-item-${rainId}`], () => {\n          this.hide();\n        });\n        this.$emit('wxcLotteryRainCaught', { rainId });\n      },\n\n      destroy () {\n        Region.remove(this.pos);\n        clearTimeout(this.showTimer);\n        clearTimeout(this.hideTimer);\n        clearInterval(this.intervalTimer);\n        this.showItem = false;\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-stepper[data-v-76fd3d24] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n.stepper-plus[data-v-76fd3d24], .stepper-minus[data-v-76fd3d24] {\n  width: 0.74667rem;\n  height: 0.74667rem;\n  background-color: #ededed;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  border-radius: 0.08rem;\n}\n.stepper-input[data-v-76fd3d24] {\n  border-width: 0;\n  text-align: center;\n  color: #3d3d3d;\n  font-size: 0.4rem;\n  line-height: 0.74667rem;\n  height: 0.74667rem;\n  width: 1.14667rem;\n}\n.stepper-icon[data-v-76fd3d24] {\n  font-size: 0.48rem;\n  color: #666666;\n  margin-top: -0.05333rem;\n}\n\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-stepper/index.vue?703bc11a"],"names":[],"mappings":";AA6BA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,0BAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,uBAAA;CACA;AAEA;EACA,gBAAA;EACA,mBAAA;EACA,eAAA;EACA,kBAAA;EACA,wBAAA;EACA,mBAAA;EACA,kBAAA;CACA;AAEA;EACA,mBAAA;EACA,eAAA;EACA,wBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A Stepper-->\n\n<template>\n  <div class=\"wxc-stepper\">\n    <div class=\"stepper-minus\"\n         @click=\"minusClicked\"\n         aria-label=\"减数\"\n         :accessible=\"true\">\n      <p class=\"stepper-icon\" :style=\"{ color: isLess?'#cccccc':'#666666' }\">-</p>\n    </div>\n    <input class=\"stepper-input\"\n           type=\"number\"\n           :value=\"valueString\"\n           @input=\"onInput\"\n           @blur=\"onBlur\"\n           :style=\"disableStyle\"\n           :disabled=\"disabled||readOnly\"/>\n    <div class=\"stepper-plus\"\n         @click=\"plusClicked\"\n         aria-label=\"加数\"\n         :accessible=\"true\">\n      <p class=\"stepper-icon\" :style=\"{ color: isOver ? '#cccccc': '#666666' }\">+</p>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-stepper {\n    flex-direction: row;\n  }\n\n  .stepper-plus, .stepper-minus {\n    width: 56px;\n    height: 56px;\n    background-color: #ededed;\n    align-items: center;\n    justify-content: center;\n    border-radius: 6px;\n  }\n\n  .stepper-input {\n    border-width: 0;\n    text-align: center;\n    color: #3d3d3d;\n    font-size: 30px;\n    line-height: 56px;\n    height: 56px;\n    width: 86px;\n  }\n\n  .stepper-icon {\n    font-size: 36px;\n    color: #666666;\n    margin-top: -4px;\n  }\n\n</style>\n\n<script>\n  export default {\n    props: {\n      min: {\n        type: [String, Number],\n        default: 1\n      },\n      max: {\n        type: [String, Number],\n        default: 100\n      },\n      step: {\n        type: [String, Number],\n        default: 1\n      },\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      defaultValue: {\n        type: [String, Number],\n        default: 1\n      },\n      readOnly: {\n        type: Boolean,\n        default: false\n      }\n    },\n    computed: {\n      disableStyle () {\n        if (this.disabled) {\n          return {\n            color: '#cccccc'\n          }\n        }\n      },\n      valueString () {\n        return this.value.toString();\n      }\n    },\n    data: () => ({\n      value: 1,\n      isLess: false,\n      isOver: false\n    }),\n    watch: {\n      defaultValue (newNum) {\n        this.value = newNum;\n      }\n    },\n    created () {\n      this.value = parseInt(this.defaultValue, 10);\n      if (this.disabled) {\n        this.isLess = true;\n        this.isOver = true;\n      }\n    },\n    methods: {\n      minusClicked () {\n        if (this.disabled) {\n          return;\n        }\n        const isMinOver = this.value <= this.min;\n        const nowNum = this.value - parseInt(this.step, 10);\n        if (isMinOver) {\n          this.$emit('wxcStepperValueIsMinOver', { value: this.value });\n        } else {\n          this.value = nowNum;\n          this.resetDisabledStyle();\n        }\n        // 由于此处已经减step\n        if (nowNum <= this.min) {\n          this.value = parseInt(this.min, 10);\n          this.isLess = true;\n        }\n        this.$emit('wxcStepperValueChanged', { value: this.value });\n      },\n      plusClicked () {\n        if (this.disabled) {\n          return;\n        }\n        const isMaxOver = this.value >= this.max;\n        const nowNum = this.value + parseInt(this.step, 10);\n        if (isMaxOver) {\n          this.$emit('wxcStepperValueIsMaxOver', { value: this.value });\n        } else {\n          this.value = nowNum;\n          this.resetDisabledStyle();\n        }\n        // 由于此处已经加step\n        if (nowNum >= this.max) {\n          this.value = parseInt(this.max, 10);\n          this.isOver = true;\n        }\n        this.$emit('wxcStepperValueChanged', { value: this.value });\n      },\n      onInput (e) {\n        this.correctInputValue(e.value);\n      },\n      onBlur (e) {\n        this.correctInputValue(e.value);\n      },\n      correctInputValue (v) {\n        const lastValue = this.value;\n        if (/^[1-9]\\d{0,}$/.test(v) && parseInt(v, 10) >= this.min && parseInt(v, 10) <= this.max) {\n          this.value = parseInt(v, 10);\n        } else {\n          this.value = '';\n          setTimeout(() => {\n            this.value = lastValue;\n          }, 1);\n        }\n        this.$emit('wxcStepperValueChanged', { value: this.value });\n      },\n\n      resetDisabledStyle () {\n        this.isLess = false;\n        this.isOver = false;\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.container[data-v-7a03baeb] {\n  position: fixed;\n  width: 10rem;\n  /*兼容H5异常*/\n  z-index: 99999;\n}\n.dialog-box[data-v-7a03baeb] {\n  position: fixed;\n  left: 1.28rem;\n  width: 7.44rem;\n  background-color: #FFFFFF;\n}\n.dialog-content[data-v-7a03baeb] {\n  padding-top: 0.48rem;\n  padding-bottom: 0.48rem;\n  padding-left: 0.48rem;\n  padding-right: 0.48rem;\n}\n.content-title[data-v-7a03baeb] {\n  color: #333333;\n  font-size: 0.48rem;\n  text-align: center;\n  margin-bottom: 0.32rem;\n}\n.content-subtext[data-v-7a03baeb] {\n  color: #666666;\n  font-size: 0.34667rem;\n  line-height: 0.48rem;\n  text-align: center;\n}\n.dialog-footer[data-v-7a03baeb] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  border-top-color: #F3F3F3;\n  border-top-width: 1px;\n}\n.footer-btn[data-v-7a03baeb] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  height: 1.2rem;\n}\n.cancel[data-v-7a03baeb] {\n  border-right-color: #F3F3F3;\n  border-right-width: 1px;\n}\n.btn-text[data-v-7a03baeb] {\n  font-size: 0.48rem;\n  color: #666666;\n}\n.no-prompt[data-v-7a03baeb] {\n  width: 6.48rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  margin-top: 0.32rem;\n}\n.no-prompt-icon[data-v-7a03baeb] {\n  width: 0.32rem;\n  height: 0.32rem;\n  margin-right: 0.16rem;\n}\n.no-prompt-text[data-v-7a03baeb] {\n  font-size: 0.32rem;\n  color: #A5A5A5;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-dialog/index.vue?15d4f2c6"],"names":[],"mappings":";AAqCA;EACA,gBAAA;EACA,aAAA;EACA,UAAA;EACA,eAAA;CACA;AAEA;EACA,gBAAA;EACA,cAAA;EACA,eAAA;EACA,0BAAA;CACA;AAEA;EACA,qBAAA;EACA,wBAAA;EACA,sBAAA;EACA,uBAAA;CACA;AAEA;EACA,eAAA;EACA,mBAAA;EACA,mBAAA;EACA,uBAAA;CACA;AAEA;EACA,eAAA;EACA,sBAAA;EACA,qBAAA;EACA,mBAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EACA,sBAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,eAAA;CACA;AAEA;EACA,4BAAA;EACA,wBAAA;CACA;AAEA;EACA,mBAAA;EACA,eAAA;CACA;AAEA;EACA,eAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,oBAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;EACA,sBAAA;CACA;AAEA;EACA,mBAAA;EACA,eAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/11/07. -->\n<!--A dialog. -->\n\n<template>\n  <div class=\"container\">\n    <wxc-overlay :left='left' v-if=\"show\" :show=\"true\" :hasAnimation=\"false\"></wxc-overlay>\n    <div class=\"dialog-box\" v-if=\"show\" :style=\"{top:top+'px', left: ((isWeb ? left : 0) + 96) + 'px'}\">\n      <div class=\"dialog-content\">\n        <slot name=\"title\">\n          <p class=\"content-title\">{{title}}</p>\n        </slot>\n        <slot name=\"content\">\n          <p class=\"content-subtext\">{{content}}</p>\n        </slot>\n        <div class=\"no-prompt\"\n             v-if=\"showNoPrompt\"\n             @click=\"noPromptClicked\">\n          <image :src=\"noPromptIcon\" class=\"no-prompt-icon\"></image>\n          <p class=\"no-prompt-text\">{{noPromptText}}</p>\n        </div>\n      </div>\n      <div class=\"dialog-footer\">\n        <div class=\"footer-btn cancel\"\n             v-if=\"!single\"\n             @click=\"secondaryClicked\">\n          <p class=\"btn-text\" :style=\"{ color: secondBtnColor }\">{{cancelText}}</p>\n        </div>\n        <div class=\"footer-btn confirm\" @click=\"primaryClicked\">\n          <p class=\"btn-text\" :style=\"{ color: mainBtnColor }\">{{confirmText}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .container {\n    position: fixed;\n    width: 750px;\n    /*兼容H5异常*/\n    z-index: 99999;\n  }\n\n  .dialog-box {\n    position: fixed;\n    left: 96px;\n    width: 558px;\n    background-color: #FFFFFF;\n  }\n\n  .dialog-content {\n    padding-top: 36px;\n    padding-bottom: 36px;\n    padding-left: 36px;\n    padding-right: 36px;\n  }\n\n  .content-title {\n    color: #333333;\n    font-size: 36px;\n    text-align: center;\n    margin-bottom: 24px;\n  }\n\n  .content-subtext {\n    color: #666666;\n    font-size: 26px;\n    line-height: 36px;\n    text-align: center;\n  }\n\n  .dialog-footer {\n    flex-direction: row;\n    align-items: center;\n    border-top-color: #F3F3F3;\n    border-top-width: 1px;\n  }\n\n  .footer-btn {\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    flex: 1;\n    height: 90px;\n  }\n\n  .cancel {\n    border-right-color: #F3F3F3;\n    border-right-width: 1px;\n  }\n\n  .btn-text {\n    font-size: 36px;\n    color: #666666;\n  }\n\n  .no-prompt {\n    width: 486px;\n    align-items: center;\n    justify-content: center;\n    flex-direction: row;\n    margin-top: 24px;\n  }\n\n  .no-prompt-icon {\n    width: 24px;\n    height: 24px;\n    margin-right: 12px;\n  }\n\n  .no-prompt-text {\n    font-size: 24px;\n    color: #A5A5A5;\n  }\n</style>\n\n<script>\n  import WxcOverlay from '../wxc-overlay'\n  import { CHECKED, UN_CHECKED } from './type';\n  import Utils from '../utils';\n\n  export default {\n    components: { WxcOverlay },\n    props: {\n      show: {\n        type: Boolean,\n        default: false\n      },\n      single: {\n        type: Boolean,\n        default: false\n      },\n      title: {\n        type: String,\n        default: ''\n      },\n      content: {\n        type: String,\n        default: ''\n      },\n      top: {\n        type: Number,\n        default: 400\n      },\n      cancelText: {\n        type: String,\n        default: '取消'\n      },\n      confirmText: {\n        type: String,\n        default: '确定'\n      },\n      mainBtnColor: {\n        type: String,\n        default: '#EE9900'\n      },\n      secondBtnColor: {\n        type: String,\n        default: '#666666'\n      },\n      showNoPrompt: {\n        type: Boolean,\n        default: false\n      },\n      noPromptText: {\n        type: String,\n        default: '不再提示'\n      },\n      isChecked: {\n        type: Boolean,\n        default: false\n      },\n      left: {\n        type: Number,\n        default: 0\n      }\n    },\n    data: () => ({\n      noPromptIcon: UN_CHECKED,\n      pageHeight: 1334,\n      isWeb: Utils.env.isWeb()\n    }),\n    created () {\n      const { env: { deviceHeight, deviceWidth } } = weex.config;\n      this.pageHeight = deviceHeight / deviceWidth * 750;\n    },\n    methods: {\n      secondaryClicked () {\n        this.$emit('wxcDialogCancelBtnClicked', {\n          type: 'cancel'\n        });\n      },\n      primaryClicked (e) {\n        this.$emit('wxcDialogConfirmBtnClicked', {\n          type: 'confirm'\n        });\n      },\n      noPromptClicked (e) {\n        const isChecked = !this.isChecked;\n        this.noPromptIcon = isChecked ? CHECKED : UN_CHECKED;\n        this.$emit('wxcDialogNoPromptClicked', { isChecked });\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.index-list[data-v-8a0583fa] {\n  width: 10rem;\n  height: 17.78667rem;\n}\n.index-list-title[data-v-8a0583fa] {\n  border-bottom-width: 1px;\n  border-bottom-color: rgba(32, 35, 37, 0.15);\n  background-color: #FBFBFB;\n  font-size: 0.32rem;\n  color: #666666;\n  height: 0.64rem;\n  line-height: 0.64rem;\n  padding-left: 0.32rem;\n  width: 10rem;\n}\n.group-title[data-v-8a0583fa] {\n  border-bottom-width: 0;\n  padding-bottom: 0;\n  height: 0.8rem;\n  padding-top: 0.32rem;\n}\n.index-list-item[data-v-8a0583fa] {\n  width: 10rem;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  border-bottom-width: 1px;\n  border-bottom-color: #e0e0e0;\n  height: 1.22667rem;\n  padding-left: 0.32rem;\n  padding-right: 0.32rem;\n  background-color: #FFFFFF;\n}\n.iphone-x[data-v-8a0583fa] {\n  height: 0.90667rem;\n}\n.title[data-v-8a0583fa] {\n  font-size: 0.42667rem;\n  color: #3D3D3D;\n}\n.desc[data-v-8a0583fa] {\n  font-size: 0.32rem;\n  color: #A5A5A5;\n  margin-left: 0.4rem;\n}\n.index-list-nav[data-v-8a0583fa] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  margin-bottom: 0.8rem;\n  margin-top: 0.8rem;\n  padding-bottom: 0.26667rem;\n  padding-top: 0.26667rem;\n  width: 0.93333rem;\n}\n.list-nav-key[data-v-8a0583fa] {\n  text-align: center;\n  font-size: 0.32rem;\n  height: 0.53333rem;\n  color: #666666;\n}\n.index-list-pop[data-v-8a0583fa] {\n  position: fixed;\n  top: 7.33333rem;\n  left: 4.21333rem;\n  width: 1.6rem;\n  height: 1.6rem;\n  text-align: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  background-color: rgba(32, 35, 37, .6);\n  border-bottom-left-radius: 0.8rem;\n  border-bottom-right-radius: 0.8rem;\n  border-top-left-radius: 0.8rem;\n  border-top-right-radius: 0.8rem;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0.46667rem;\n  padding-bottom: 0.46667rem;\n  color: #ffffff;\n}\n.list-pop-text[data-v-8a0583fa] {\n  font-size: 0.53333rem;\n  text-align: center;\n  color: #ffffff;\n}\n.group[data-v-8a0583fa] {\n  padding-bottom: 0.24rem;\n  padding-right: 0.93333rem;\n  background-color: #FBFBFB;\n}\n.group-list[data-v-8a0583fa] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  margin-left: 0.24rem;\n  margin-top: 0.24rem;\n}\n.group-item[data-v-8a0583fa] {\n  width: 1.94667rem;\n  height: 0.85333rem;\n  border-width: 1px;\n  border-color: #e0e0e0;\n  margin-right: 0.24rem;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  background-color: #ffffff;\n}\n.item-name[data-v-8a0583fa] {\n  font-size: 0.32rem;\n  line-height: 0.34667rem;\n  color: #333333;\n}\n.item-desc[data-v-8a0583fa] {\n  margin-top: 0.02667rem;\n  color: #999999;\n  font-size: 0.26667rem;\n  text-align: center;\n}\n.location-icon[data-v-8a0583fa] {\n  width: 0.42667rem;\n  height: 0.42667rem;\n  margin-right: 0.10667rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-indexlist/index.vue?78b69dbe"],"names":[],"mappings":";AAwMA;EACA,aAAA;EACA,oBAAA;CACA;AAEA;EACA,yBAAA;EACA,4CAAA;EACA,0BAAA;EACA,mBAAA;EACA,eAAA;EACA,gBAAA;EACA,qBAAA;EACA,sBAAA;EACA,aAAA;CACA;AAEA;EACA,uBAAA;EACA,kBAAA;EACA,eAAA;EACA,qBAAA;CACA;AAEA;EACA,aAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EACA,6BAAA;EACA,mBAAA;EACA,sBAAA;EACA,uBAAA;EACA,0BAAA;CACA;AAEA;EACA,mBAAA;CACA;AAEA;EACA,sBAAA;EACA,eAAA;CACA;AAEA;EACA,mBAAA;EACA,eAAA;EACA,oBAAA;CACA;AAEA;EACA,mBAAA;EACA,OAAA;EACA,SAAA;EACA,sBAAA;EACA,mBAAA;EACA,2BAAA;EACA,wBAAA;EACA,kBAAA;CACA;AAEA;EACA,mBAAA;EACA,mBAAA;EACA,mBAAA;EACA,eAAA;CACA;AAEA;EACA,gBAAA;EACA,gBAAA;EACA,iBAAA;EACA,cAAA;EACA,eAAA;EACA,mBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,uCAAA;EACA,kCAAA;EACA,mCAAA;EACA,+BAAA;EACA,gCAAA;EACA,gBAAA;EACA,iBAAA;EACA,wBAAA;EACA,2BAAA;EACA,eAAA;CACA;AAEA;EACA,sBAAA;EACA,mBAAA;EACA,eAAA;CACA;AAEA;EACA,wBAAA;EACA,0BAAA;EACA,0BAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,qBAAA;EACA,oBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,kBAAA;EACA,sBAAA;EACA,sBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;CACA;AAEA;EACA,mBAAA;EACA,wBAAA;EACA,eAAA;CACA;AAEA;EACA,uBAAA;EACA,eAAA;EACA,sBAAA;EACA,mBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;EACA,yBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/11/02. -->\n<!-- Update by Tw93 on 17/10/13. -->\n<!--A index list. -->\n\n<template>\n  <div>\n    <list class=\"index-list\"\n          :style=\"{height: height+'px'}\">\n      <cell>\n        <slot name=\"head\"></slot>\n      </cell>\n      <cell v-for=\"(v,i) in formatList\"\n            :key=\"i\"\n            :ref=\"'index-item-title-' + v.title\">\n        <p :class=\"['index-list-title',v.type && v.type=='group' && 'group-title']\"\n              :style=\"headerStyle\"\n              v-if=\"!onlyShowList\">{{v.title}}</p>\n        <div v-if=\"v.type && v.type === 'group' && !onlyShowList\"\n             :style=\"groupWrapStyle\"\n             class=\"group\">\n          <div v-for=\"(group,index) in v.data\"\n               :key=\"index\"\n               class=\"group-list\">\n            <div v-for=\"(item,i) in group\"\n                 :key=\"i\"\n                 @click=\"itemClicked(item)\"\n                 class=\"group-item\"\n                 :style=\"groupItemStyle\"\n                 :accessible=\"true\"\n                 :aria-label=\"`${item.name},${item.desc?item.desc:''}`\">\n              <image v-if=\"item.isLocation\"\n                     class=\"location-icon\"\n                     src=\"https://gw.alicdn.com/tfs/TB1JUiUPFXXXXXUXXXXXXXXXXXX-32-32.png\"></image>\n              <div>\n                <p class=\"item-name\"\n                      :style=\"groupItemTextStyle\">{{item.name}}</p>\n                <p class=\"item-desc\" v-if=\"item.desc\"\n                      :style=\"groupItemDescStyle\">{{item.desc}}</p>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div v-if=\"v.type ==='list'\">\n          <div class=\"index-list-item\"\n               v-for=\"(item,index) in v.data\"\n               :key=\"index\"\n               :style=\"itemStyle\"\n               @click=\"itemClicked(item)\"\n               :accessible=\"true\"\n               :aria-label=\"`${item.name},${item.desc?item.desc:''}`\">\n            <p class=\"title\" :style=\"itemTextStyle\">{{item.name}}</p>\n            <p class=\"desc\" :style=\"itemDescStyle\">{{item.desc}}</p>\n          </div>\n        </div>\n      </cell>\n      <cell class=\"iphone-x\" v-if=\"isIPhoneX\"></cell>\n    </list>\n    <div class=\"index-list-nav\"\n         :style=\"navStyle\"\n         v-if=\"showIndex && !onlyShowList\">\n      <p v-for=\"(item,index) in formatList\"\n            :key=\"index\"\n            :style=\"navTextStyle\"\n            :title=\"item.title\"\n            @click=\"go2Key(item.title)\"\n            class=\"list-nav-key\">{{item.title}}</p>\n    </div>\n    <div class=\"index-list-pop\"\n         :style=\"popStyle\"\n         v-if=\"popKeyShow\">\n      <p class=\"list-pop-text\" :style=\"popTextStyle\">{{popKey}}</p>\n    </div>\n  </div>\n</template>\n\n<script>\n  const dom = weex.requireModule('dom');\n  import * as Format from './format';\n  import Utils from '../utils';\n\n  export default {\n    props: {\n      height: {\n        type: [Number, String],\n        default: Utils.env.getPageHeight()\n      },\n      normalList: {\n        type: Array,\n        default: () => ([])\n      },\n      onlyShowList: {\n        type: Boolean,\n        default: false\n      },\n      showIndex: {\n        type: Boolean,\n        default: true\n      },\n      needAnimation: {\n        type: Boolean,\n        default: true\n      },\n      hotListConfig: {\n        type: Object,\n        default: () => ({})\n      },\n      // 城市选择子组件 特殊情况支持\n      cityLocationConfig: {\n        type: Object,\n        default: () => ({})\n      },\n      headerStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      navStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      navTextStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      popStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      popTextStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      itemStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      itemTextStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      itemDescStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      groupWrapStyle: {\n        type: Object,\n        default: () => ({})\n      },\n      groupItemStyle:{\n        type: Object,\n        default: () => ({})\n      },\n      groupItemTextStyle:{\n        type: Object,\n        default: () => ({})\n      },\n      groupItemDescStyle:{\n        type: Object,\n        default: () => ({})\n      }\n    },\n    created () {\n      this.isIPhoneX = Utils.env.isIPhoneX();\n    },\n    computed: {\n      formatList () {\n        const { normalList, hotListConfig, cityLocationConfig } = this;\n        return Format.totalList(normalList, hotListConfig, cityLocationConfig);\n      }\n    },\n    data: () => ({\n      popKeyShow: false,\n      popKey: '',\n      navOffsetY: 0,\n      timer: null\n    }),\n    methods: {\n      itemClicked (item) {\n        this.$emit('wxcIndexlistItemClicked', {\n          item\n        });\n      },\n      go2Key (key) {\n        const keyEl = this.$refs['index-item-title-' + key][0];\n        keyEl && dom.scrollToElement(keyEl, {\n          offset: 0,\n          animated: this.needAnimation\n        });\n        this.popKey = key;\n        this.popKeyShow = true;\n        this.timer && clearTimeout(this.timer);\n        this.timer = setTimeout(() => {\n          this.popKeyShow = false;\n        }, 600);\n      }\n    }\n  };\n</script>\n\n<style scoped>\n  .index-list {\n    width: 750px;\n    height: 1334px;\n  }\n\n  .index-list-title {\n    border-bottom-width: 1px;\n    border-bottom-color: rgba(32, 35, 37, 0.15);\n    background-color: #FBFBFB;\n    font-size: 24px;\n    color: #666666;\n    height: 48px;\n    line-height: 48px;\n    padding-left: 24px;\n    width: 750px;\n  }\n\n  .group-title {\n    border-bottom-width: 0;\n    padding-bottom: 0;\n    height: 60px;\n    padding-top: 24px;\n  }\n\n  .index-list-item {\n    width: 750px;\n    flex-direction: row;\n    align-items: center;\n    border-bottom-width: 1px;\n    border-bottom-color: #e0e0e0;\n    height: 92px;\n    padding-left: 24px;\n    padding-right: 24px;\n    background-color: #FFFFFF;\n  }\n\n  .iphone-x {\n    height: 68px;\n  }\n\n  .title {\n    font-size: 32px;\n    color: #3D3D3D;\n  }\n\n  .desc {\n    font-size: 24px;\n    color: #A5A5A5;\n    margin-left: 30px;\n  }\n\n  .index-list-nav {\n    position: absolute;\n    top: 0;\n    right: 0;\n    margin-bottom: 60px;\n    margin-top: 60px;\n    padding-bottom: 20px;\n    padding-top: 20px;\n    width: 70px;\n  }\n\n  .list-nav-key {\n    text-align: center;\n    font-size: 24px;\n    height: 40px;\n    color: #666666;\n  }\n\n  .index-list-pop {\n    position: fixed;\n    top: 550px;\n    left: 316px;\n    width: 120px;\n    height: 120px;\n    text-align: center;\n    justify-content: center;\n    background-color: rgba(32, 35, 37, .6);\n    border-bottom-left-radius: 60px;\n    border-bottom-right-radius: 60px;\n    border-top-left-radius: 60px;\n    border-top-right-radius: 60px;\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 35px;\n    padding-bottom: 35px;\n    color: #ffffff;\n  }\n\n  .list-pop-text {\n    font-size: 40px;\n    text-align: center;\n    color: #ffffff;\n  }\n\n  .group {\n    padding-bottom: 18px;\n    padding-right: 70px;\n    background-color: #FBFBFB;\n  }\n\n  .group-list {\n    flex-direction: row;\n    margin-left: 18px;\n    margin-top: 18px;\n  }\n\n  .group-item {\n    width: 146px;\n    height: 64px;\n    border-width: 1px;\n    border-color: #e0e0e0;\n    margin-right: 18px;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    background-color: #ffffff;\n  }\n\n  .item-name {\n    font-size: 24px;\n    line-height: 26px;\n    color: #333333;\n  }\n\n  .item-desc {\n    margin-top: 2px;\n    color: #999999;\n    font-size: 20px;\n    text-align: center;\n  }\n\n  .location-icon {\n    width: 32px;\n    height: 32px;\n    margin-right: 8px;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-tag[data-v-8c80ddc2] {\n  border-color: #3d3d3d;\n  border-width: 0.02667rem;\n  border-radius: 0.05333rem;\n  margin-right: 0.08rem;\n  background-color: transparent;\n  padding-left: 0.08rem;\n  padding-right: 0.08rem;\n  height: 0.34667rem;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.tag-text[data-v-8c80ddc2] {\n  font-size: 0.26667rem;\n  color: #3d3d3d;\n}\n.black[data-v-8c80ddc2] {\n  color: #3D3D3D;\n}\n.yellow[data-v-8c80ddc2] {\n  color: #EE9900;\n}\n.blue[data-v-8c80ddc2] {\n  color: #30A0FF;\n}\n.gray[data-v-8c80ddc2] {\n  color: #A5A5A5;\n}\n.red[data-v-8c80ddc2] {\n  color: #FF5000;\n}\n.border-black[data-v-8c80ddc2] {\n  border-color: #A5A5A5;\n}\n.border-yellow[data-v-8c80ddc2] {\n  border-color: #EE9900;\n}\n.border-blue[data-v-8c80ddc2] {\n  border-color: #30A0FF;\n}\n.border-gray[data-v-8c80ddc2] {\n  border-color: #A5A5A5;\n}\n.border-red[data-v-8c80ddc2] {\n  border-color: #FF5000;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-tag.vue?492ecccc"],"names":[],"mappings":";AAYA;EACA,sBAAA;EACA,yBAAA;EACA,0BAAA;EACA,sBAAA;EACA,8BAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,sBAAA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,sBAAA;CACA","file":"wxc-rich-text-tag.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div :class=\"['wxc-tag', 'border-' + tagTheme]\"\n       :style=\"newTheme.divStyle\">\n    <p :class=\"['tag-text', tagTheme]\"\n          :style=\"newTheme.textStyle\">{{tagValue}}</p>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-tag {\n    border-color: #3d3d3d;\n    border-width: 2px;\n    border-radius: 4px;\n    margin-right: 6px;\n    background-color: transparent;\n    padding-left: 6px;\n    padding-right: 6px;\n    height: 26px;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .tag-text {\n    font-size: 20px;\n    color: #3d3d3d;\n  }\n\n  .black {\n    color: #3D3D3D;\n  }\n\n  .yellow {\n    color: #EE9900;\n  }\n\n  .blue {\n    color: #30A0FF;\n  }\n\n  .gray {\n    color: #A5A5A5;\n  }\n\n  .red {\n    color: #FF5000;\n  }\n\n  .border-black {\n    border-color: #A5A5A5;\n  }\n\n  .border-yellow {\n    border-color: #EE9900;\n  }\n\n  .border-blue {\n    border-color: #30A0FF;\n  }\n\n  .border-gray {\n    border-color: #A5A5A5;\n  }\n\n  .border-red {\n    border-color: #FF5000;\n  }\n</style>\n\n<script>\n  export default {\n    props: {\n      tagValue: {\n        type: [String, Number],\n        default: ''\n      },\n      tagTheme: {\n        type: String,\n        default: 'blue'\n      },\n      tagStyle: {\n        type: Object,\n        default: () => ({})\n      }\n    },\n    computed: {\n      newTheme () {\n        const tagStyle = this.tagStyle;\n        const tagValue = this.tagValue;\n        let divStyle = {};\n        let textStyle = {};\n        if (tagStyle && tagStyle.fontSize) {\n          textStyle = {\n            ...textStyle,\n            fontSize: `${tagStyle.fontSize}px`\n          }\n        }\n        if (tagStyle && tagStyle.color) {\n          textStyle = {\n            ...textStyle,\n            color: tagStyle.color\n          }\n        }\n\n        if (tagStyle && tagStyle.borderColor) {\n          divStyle = {\n            ...divStyle,\n            borderColor: tagStyle.borderColor\n          }\n        }\n\n        if (tagStyle && tagStyle.borderWidth) {\n          divStyle = {\n            ...divStyle,\n            borderWidth: `${tagStyle.borderWidth}px`\n          }\n        }\n\n        if (tagStyle && tagStyle.borderRadius) {\n          divStyle = {\n            ...divStyle,\n            borderRadius: `${tagStyle.borderRadius}px`\n          }\n        }\n\n        if (tagStyle && tagStyle.backgroundColor) {\n          divStyle = {\n            ...divStyle,\n            backgroundColor: tagStyle.backgroundColor\n          }\n        }\n\n        if (tagStyle && tagStyle.height) {\n          divStyle = {\n            ...divStyle,\n            height: `${tagStyle.height}px`\n          };\n        }\n\n        if (tagStyle && tagStyle.width) {\n          divStyle = {\n            ...divStyle,\n            width: `${tagStyle.width}px`\n          };\n        }\n\n        if (tagValue && tagValue.length === 1) {\n          divStyle = {\n            ...divStyle,\n            paddingLeft: 0,\n            paddingRight: 0\n          };\n        }\n\n        return {\n          divStyle,\n          textStyle\n        };\n      }\n    }\n  };\n</script>\n\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.time-dot-wrap[data-v-8dcc12f8] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-countdown/index.vue?99349d28"],"names":[],"mappings":";AAiDA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by 提隐 on 17/07/28. -->\n\n<template>\n  <div :style=\"mrTimeWrapStyle\">\n    <div class=\"time-dot-wrap\">\n      <div :style=\"mrTimeBoxStyle\"\n           v-if=\"tplIndexOfDays !== -1\"\n           :accessible=\"true\"\n           :aria-label=\"`${countDownData.day}天`\">\n        <p :style=\"mrTimeTextStyle\">{{countDownData.day}}</p>\n      </div>\n      <div :style=\"mrDotBoxStyle\" v-if=\"tplIndexOfDays !== -1\" :aria-hidden=\"true\">\n        <p :style=\"mrDotTextStyle\">{{getDot(tplIndexOfDays, tplIndexOfHours)}}</p>\n      </div>\n\n      <div :style=\"mrTimeBoxStyle\"\n           v-if=\"tplIndexOfHours !== -1\"\n           :accessible=\"true\"\n           :aria-label=\"`${countDownData.hour}时`\">\n        <p :style=\"mrTimeTextStyle\">{{countDownData.hour}}</p>\n      </div>\n      <div :style=\"mrDotBoxStyle\" v-if=\"tplIndexOfHours !== -1\" :aria-hidden=\"true\">\n        <p :style=\"mrDotTextStyle\">{{getDot(tplIndexOfHours, tplIndexOfMinutes)}}</p>\n      </div>\n\n      <div :style=\"mrTimeBoxStyle\" v-if=\"tplIndexOfMinutes !== -1\"\n           :accessible=\"true\"\n           :aria-label=\"`${countDownData.minute}分`\">\n        <p :style=\"mrTimeTextStyle\">{{countDownData.minute}}</p>\n      </div>\n      <div :style=\"mrDotBoxStyle\" v-if=\"tplIndexOfMinutes !== -1\" :aria-hidden=\"true\">\n        <p :style=\"mrDotTextStyle\">{{getDot(tplIndexOfMinutes, tplIndexOfSeconds)}}</p>\n      </div>\n\n      <div :style=\"mrTimeBoxStyle\"\n           v-if=\"tplIndexOfSeconds !== -1\"\n           :accessible=\"true\"\n           :aria-label=\"`${countDownData.second}秒`\">\n        <p :style=\"mrTimeTextStyle\">{{countDownData.second}}</p>\n      </div>\n      <div :style=\"mrDotBoxStyle\" v-if=\"tplIndexOfSeconds !== -1\" :aria-hidden=\"true\">\n        <p :style=\"mrDotTextStyle\">{{getDot(tplIndexOfSeconds, -1)}}</p>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .time-dot-wrap {\n    flex-direction: row;\n    align-items: center;\n  }\n</style>\n\n<script>\n  export default {\n    props: {\n      // 时间戳\n      time: {\n        type: Number,\n        default: 1501200000000\n      },\n      // 倒计时的间隔,单位为\"毫秒\"\n      interval: {\n        type: Number,\n        default: 1000\n      },\n      tpl: {\n        type: String,\n        default: '{h}:{m}:{s}'\n      },\n      // 最外层包裹 style\n      timeWrapStyle: Object,\n      // 数字盒子 style\n      timeBoxStyle: Object,\n      // : 盒子Style\n      dotBoxStyle: Object,\n      // 数字文字 Style\n      timeTextStyle: Object,\n      // : 文字Style\n      dotTextStyle: Object\n    },\n    data: () => ({\n      NOW_DATE: new Date().getTime(),\n      completed: false,\n      tplIndexOfDays: -1,\n      tplIndexOfHours: -1,\n      tplIndexOfMinutes: -1,\n      tplIndexOfSeconds: -1,\n      TIME_WRAP_STYLE: {\n        flexDirection: 'row',\n        alignItems: 'center',\n        marginLeft: '12px',\n        marginRight: '12px'\n      },\n      TIME_BOX_STYLE: {\n        flexDirection: 'row',\n        justifyContent: 'center',\n        alignItems: 'center',\n        backgroundColor: '#333333',\n        height: '30px',\n        width: '30px'\n      },\n      DOT_BOX_STYLE: {\n        width: '18px',\n        flexDirection: 'row',\n        justifyContent: 'center',\n        alignItems: 'center'\n      },\n      TIME_TEXT_STYLE: {\n        color: '#FFCC80',\n        fontSize: '18px'\n      },\n      DOT_TEXT_STYLE: {\n        color: '#333333',\n        fontSize: '18px',\n        fontWeight: 'bold'\n      }\n    }),\n    mounted () {\n      setInterval(() => {\n        this.NOW_DATE = new Date().getTime();\n      }, this.interval);\n\n      this.tplIndexOfDays = this.tpl.indexOf('d');\n      this.tplIndexOfHours = this.tpl.indexOf('h');\n      this.tplIndexOfMinutes = this.tpl.indexOf('m');\n      this.tplIndexOfSeconds = this.tpl.indexOf('s');\n    },\n    computed: {\n      mrTimeWrapStyle () {\n        return {\n          ...this.TIME_WRAP_STYLE,\n          ...this.timeWrapStyle\n        }\n      },\n      mrTimeBoxStyle () {\n        return {\n          ...this.TIME_BOX_STYLE,\n          ...this.timeBoxStyle\n        }\n      },\n      mrDotBoxStyle () {\n        return {\n          ...this.DOT_BOX_STYLE,\n          ...this.dotBoxStyle\n        }\n      },\n      mrTimeTextStyle () {\n        return {\n          ...this.TIME_TEXT_STYLE,\n          ...this.timeTextStyle\n        }\n      },\n      mrDotTextStyle () {\n        return {\n          ...this.DOT_TEXT_STYLE,\n          ...this.dotTextStyle\n        }\n      },\n\n      countDownData () {\n        const timeSpacing = this.time - this.NOW_DATE;\n\n        // 倒计时结束了\n        if (timeSpacing < 0) {\n          if (this.completed === false) {\n            this.$emit('wxcOnComplete');\n          }\n          this.completed = true;\n          return {\n            day: '00',\n            hour: '00',\n            minute: '00',\n            second: '00'\n          }\n        }\n\n        let day = 0;\n        let hour = 0;\n        let minute = 0;\n        let second = 0;\n\n        if (this.tplIndexOfDays !== -1) {\n          day = Math.floor(timeSpacing / (24 * 60 * 60 * 1000));\n          hour = Math.floor(timeSpacing % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));\n        } else {\n          day = 0;\n          hour = Math.floor(timeSpacing / (60 * 60 * 1000));\n        }\n\n        if (this.tplIndexOfHours !== -1) {\n          hour = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));\n          minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000));\n        } else {\n          hour = 0;\n          minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 1000));\n        }\n\n        if (this.tplIndexOfMinutes !== -1) {\n          minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / (60 * 1000));\n          second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) % (60 * 1000) / 1000);\n        } else {\n          minute = 0;\n          second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / 1000);\n        }\n\n        return {\n          day: day < 10 ? '0' + day : '' + day,\n          hour: hour < 10 ? '0' + hour : '' + hour,\n          minute: minute < 10 ? '0' + minute : '' + minute,\n          second: second < 10 ? '0' + second : '' + second\n        }\n      }\n    },\n\n    methods: {\n      getDot (prevTagIndex, nextTagIndex = -1) {\n        if (nextTagIndex === -1) {\n          return this.tpl.slice(prevTagIndex + 2)\n        }\n        return this.tpl.slice(prevTagIndex + 2, nextTagIndex - 1)\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-tab-page[data-v-9576a0a4] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.tab-title-list[data-v-9576a0a4] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n}\n.title-item[data-v-9576a0a4] {\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  border-bottom-style: solid;\n}\n.tab-page-wrap[data-v-9576a0a4] {\n  width: 10rem;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  /* overflow: hidden; */\n}\n.tab-container[data-v-9576a0a4] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  position: absolute;\n}\n.tab-text[data-v-9576a0a4] {\n  lines: 1;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-line-clamp: 1;\n}\n.desc-tag[data-v-9576a0a4] {\n  position: absolute;\n  top: 0.13333rem;\n  right: 0.26667rem;\n  border-bottom-right-radius: 0.18667rem;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0.18667rem;\n  border-top-right-radius: 0.18667rem;\n  background-color: #FF5E00;\n  height: 0.34667rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  padding-left: 0.08rem;\n  padding-right: 0.08rem;\n}\n.dot[data-v-9576a0a4] {\n  width: 0.16rem;\n  height: 0.16rem;\n  border-bottom-right-radius: 0.16rem;\n  border-bottom-left-radius: 0.16rem;\n  border-top-left-radius: 0.16rem;\n  border-top-right-radius: 0.16rem;\n  position: absolute;\n  top: 0.13333rem;\n  right: 0.53333rem;\n  background-color: #FF5E00;\n}\n.desc-text[data-v-9576a0a4] {\n  font-size: 0.24rem;\n  color: #ffffff;\n}\n\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-tab-bar/index.vue?70ae98d7","/Users/Tw93/www/github/weex-ui/packages/wxc-tab-bar/<no source>"],"names":[],"mappings":";AA6CA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;CACA;AAEA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,sCAAA;UAAA,8BAAA;CACA;AAEA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,2BAAA;CACA;AAEA;EACA,aAAA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,uBAAA;CACA;AAEA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,mBAAA;CACA;AAEA;EACA,SAAA;EACA,wBAAA;EC9EA,iBAAA;EAAA,wBAAA;EAAA,sBAAA;CD+EA;AAEA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;EACA,uCAAA;EACA,6BAAA;EACA,mCAAA;EACA,oCAAA;EACA,0BAAA;EACA,mBAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,yBAAA;EAAA,gCAAA;UAAA,wBAAA;EACA,sBAAA;EACA,uBAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;EACA,oCAAA;EACA,mCAAA;EACA,gCAAA;EACA,iCAAA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;EACA,0BAAA;CACA;AAEA;EACA,mBAAA;EACA,eAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n<!-- Updated by Tw93 on 18/01/22.-->\n\n<template>\n  <div class=\"wxc-tab-page\"\n       :style=\"{backgroundColor:wrapBgColor }\">\n    <div class=\"tab-page-wrap\" ref=\"tab-page-wrap\">\n      <div ref=\"tab-container\"\n           class=\"tab-container\">\n        <slot></slot>\n      </div>\n    </div>\n    <div class=\"tab-title-list\"\n         :style=\"{ backgroundColor: tabStyles.bgColor, height: (tabStyles.height + (isIPhoneX ? 78 : 0))+'px',paddingBottom:isIPhoneX?'78px':'0'}\">\n      <div class=\"title-item\"\n           v-for=\"(v,index) in tabTitles\"\n           :key=\"index\"\n           :ref=\"'wxc-tab-title-'+index\"\n           @click=\"setPage(index,v.url)\"\n           :style=\"{ width: tabStyles.width +'px', height: tabStyles.height +'px', backgroundColor: currentPage == index ? tabStyles.activeBgColor : tabStyles.bgColor }\"\n           :accessible=\"true\"\n           :aria-label=\"`${v.title?v.title:'标签'+index}`\">\n\n        <image :src=\"currentPage == index ? v.activeIcon : v.icon\"\n               v-if=\"titleType === 'icon' && !titleUseSlot\"\n               :style=\"{ width: tabStyles.iconWidth + 'px', height:tabStyles.iconHeight+'px'}\"></image>\n\n        <p v-if=\"titleType === 'iconFont' && v.codePoint && !titleUseSlot\"\n              :style=\"{fontFamily: 'wxcIconFont',fontSize: tabStyles.iconFontSize+'px', marginBottom:tabStyles.iconFontMarginBottom ? (tabStyles.iconFontMarginBottom +'px') : '8px', color: currentPage == index ? tabStyles.activeIconFontColor : tabStyles.iconFontColor}\">{{v.codePoint}}</p>\n        <p\n          v-if=\"!titleUseSlot\"\n          :style=\"{ fontSize: tabStyles.fontSize+'px', fontWeight: (currentPage == index && tabStyles.isActiveTitleBold)? 'bold' : 'normal', color: currentPage == index ? tabStyles.activeTitleColor : tabStyles.titleColor, paddingLeft:tabStyles.textPaddingLeft+'px', paddingRight:tabStyles.textPaddingRight+'px'}\"\n          class=\"tab-text\">{{v.title}}</p>\n        <div class=\"desc-tag\" v-if=\"v.badge && !titleUseSlot\">\n          <p class=\"desc-text\">{{v.badge}}</p>\n        </div>\n        <div v-if=\"v.dot && !v.badge && !titleUseSlot\" class=\"dot\"></div>\n        <slot :name=\"`tab-title-${index}`\" v-if=\"titleUseSlot\"></slot>\n      </div>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-tab-page {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n\n  .tab-title-list {\n    flex-direction: row;\n    justify-content: space-around;\n  }\n\n  .title-item {\n    justify-content: center;\n    align-items: center;\n    border-bottom-style: solid;\n  }\n\n  .tab-page-wrap {\n    width: 750px;\n    flex: 1;\n    /* overflow: hidden; */\n  }\n\n  .tab-container {\n    flex: 1;\n    flex-direction: row;\n    position: absolute;\n  }\n\n  .tab-text {\n    lines: 1;\n    text-overflow: ellipsis;\n  }\n\n  .desc-tag {\n    position: absolute;\n    top: 10px;\n    right: 20px;\n    border-bottom-right-radius: 14px;\n    border-bottom-left-radius: 0;\n    border-top-left-radius: 14px;\n    border-top-right-radius: 14px;\n    background-color: #FF5E00;\n    height: 26px;\n    align-items: center;\n    justify-content: center;\n    padding-left: 6px;\n    padding-right: 6px;\n  }\n\n  .dot {\n    width: 12px;\n    height: 12px;\n    border-bottom-right-radius: 12px;\n    border-bottom-left-radius: 12px;\n    border-top-left-radius: 12px;\n    border-top-right-radius: 12px;\n    position: absolute;\n    top: 10px;\n    right: 40px;\n    background-color: #FF5E00;\n  }\n\n  .desc-text {\n    font-size: 18px;\n    color: #ffffff;\n  }\n\n</style>\n\n<script>\n  const dom = weex.requireModule('dom');\n  const animation = weex.requireModule('animation');\n  import Utils from '../utils'\n\n  export default {\n    props: {\n      tabTitles: {\n        type: Array,\n        default: () => ([])\n      },\n      tabStyles: {\n        type: Object,\n        default: () => ({\n          bgColor: '#FFFFFF',\n          titleColor: '#666666',\n          activeTitleColor: '#3D3D3D',\n          activeBgColor: '#FFFFFF',\n          isActiveTitleBold: true,\n          iconWidth: 70,\n          iconHeight: 70,\n          width: 160,\n          height: 120,\n          fontSize: 24,\n          activeBottomColor: '#FFC900',\n          activeBottomWidth: 120,\n          activeBottomHeight: 6,\n          textPaddingLeft: 10,\n          textPaddingRight: 10\n        })\n      },\n      titleType: {\n        type: String,\n        default: 'icon'\n      },\n      titleUseSlot: {\n        type: Boolean,\n        default: false\n      },\n      isTabView: {\n        type: Boolean,\n        default: true\n      },\n      duration: {\n        type: [Number, String],\n        default: 300\n      },\n      timingFunction: {\n        type: String,\n        default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'\n      },\n      wrapBgColor: {\n        type: String,\n        default: '#f2f3f4'\n      }\n    },\n    data: () => ({\n      currentPage: 0,\n      translateX: 0\n    }),\n    created () {\n      const { titleType, tabStyles } = this;\n      if (titleType === 'iconFont' && tabStyles.iconFontUrl) {\n        dom.addRule('fontFace', {\n          'fontFamily': \"wxcIconFont\",\n          'src': `url('${tabStyles.iconFontUrl}')`\n        });\n      }\n      this.isIPhoneX = Utils.env.isIPhoneX();\n    },\n    methods: {\n      next () {\n        let page = this.currentPage;\n        if (page < this.tabTitles.length - 1) {\n          page++;\n        }\n        this.setPage(page);\n      },\n      prev () {\n        let page = this.currentPage;\n        if (page > 0) {\n          page--;\n        }\n        this.setPage(page);\n      },\n      setPage (page, url = null, animated = true) {\n        if (!this.isTabView) {\n          this.currentPage = page;\n          this._animateTransformX(page, animated);\n          this.$emit('wxcTabBarCurrentTabSelected', { page });\n          this.jumpOut(url);\n          return;\n        }\n        const previousPage = this.currentPage;\n        const currentTabEl = this.$refs[`wxc-tab-title-${page}`][0];\n        const { width } = this.tabStyles;\n        const appearNum = parseInt(750 / width);\n        const tabsNum = this.tabTitles.length;\n        const offset = page > appearNum ? -(750 - width) / 2 : -width * 2;\n\n        if (appearNum < tabsNum) {\n          (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {\n            offset, animated\n          });\n\n          page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {\n            offset: -width * page,\n            animated\n          });\n        }\n\n        this.currentPage = page;\n        this._animateTransformX(page, animated);\n        this.$emit('wxcTabBarCurrentTabSelected', { page });\n      },\n      jumpOut (url) {\n        url && Utils.goToH5Page(url)\n      },\n      _animateTransformX (page, animated) {\n        const { duration, timingFunction } = this;\n        const computedDur = animated ? duration : 0.00001;\n        const containerEl = this.$refs[`tab-container`];\n        const dist = page * 750;\n        animation.transition(containerEl, {\n          styles: {\n            transform: `translateX(${-dist}px)`\n          },\n          duration: computedDur,\n          timingFunction,\n          delay: 0\n        }, () => {\n        });\n      }\n    }\n  };\n</script>\n",null],"sourceRoot":""}]);

// exports


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-minibar[data-v-991a6e22] {\n  width: 10rem;\n  height: 1.2rem;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.left[data-v-991a6e22] {\n  width: 2.4rem;\n  padding-left: 0.42667rem;\n}\n.middle-title[data-v-991a6e22] {\n  font-size: 0.4rem;\n  color: #ffffff;\n  height: 0.48rem;\n  line-height: 0.45333rem;\n}\n.right[data-v-991a6e22] {\n  width: 2.4rem;\n  padding-right: 0.42667rem;\n  -webkit-box-align: end;\n  -webkit-align-items: flex-end;\n          align-items: flex-end;\n}\n.left-button[data-v-991a6e22] {\n  width: 0.28rem;\n  height: 0.48rem;\n}\n.right-button[data-v-991a6e22] {\n  width: 0.42667rem;\n  height: 0.42667rem;\n}\n.icon-text[data-v-991a6e22] {\n  font-size: 0.37333rem;\n  color: #ffffff;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-minibar/index.vue?4b62c0db"],"names":[],"mappings":";AAkCA;EACA,aAAA;EACA,eAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,cAAA;EACA,yBAAA;CACA;AAEA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;EACA,wBAAA;CACA;AAEA;EACA,cAAA;EACA,0BAAA;EACA,uBAAA;EAAA,8BAAA;UAAA,sBAAA;CACA;AAEA;EACA,eAAA;EACA,gBAAA;CACA;AAEA;EACA,kBAAA;EACA,mBAAA;CACA;AAEA;EACA,sBAAA;EACA,eAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A top navigation bar.-->\n\n<template>\n  <div class=\"wxc-minibar\" :style=\"newBarStyle\" v-if=\"show\">\n    <div class=\"left\" @click=\"leftButtonClicked\" aria-label=\"返回\" :accessible=\"true\">\n      <slot name=\"left\">\n        <image :src=\"leftButton\"\n               v-if=\"leftButton && !leftText\"\n               class=\"left-button\"></image>\n        <p v-if=\"leftText\"\n              class=\"icon-text\"\n              :style=\"{ color: textColor }\">{{leftText}}</p>\n      </slot>\n    </div>\n    <slot name=\"middle\">\n      <p class=\"middle-title\" :style=\"{ color: textColor }\">{{title}}</p>\n    </slot>\n    <div class=\"right\" @click=\"rightButtonClicked\">\n      <slot name=\"right\">\n        <image v-if=\"rightButton && !rightText\"\n               class=\"right-button\"\n               :src=\"rightButton\"\n               :aria-hidden=\"true\"></image>\n        <p v-if=\"rightText\"\n              class=\"icon-text\"\n              :style=\"{ color: textColor }\">{{rightText}}</p>\n      </slot>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-minibar {\n    width: 750px;\n    height: 90px;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n  }\n\n  .left {\n    width: 180px;\n    padding-left: 32px;\n  }\n\n  .middle-title {\n    font-size: 30px;\n    color: #ffffff;\n    height: 36px;\n    line-height: 34px;\n  }\n\n  .right {\n    width: 180px;\n    padding-right: 32px;\n    align-items: flex-end;\n  }\n\n  .left-button {\n    width: 21px;\n    height: 36px;\n  }\n\n  .right-button {\n    width: 32px;\n    height: 32px;\n  }\n\n  .icon-text {\n    font-size: 28px;\n    color: #ffffff;\n  }\n</style>\n\n<script>\n  const Navigator = weex.requireModule('navigator');\n  export default {\n    props: {\n      backgroundColor: {\n        type: String,\n        default: '#FFC900'\n      },\n      leftButton: {\n        type: String,\n        default: 'https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png'\n      },\n      textColor: {\n        type: String,\n        default: '#3D3D3D'\n      },\n      rightButton: {\n        type: String,\n        default: ''\n      },\n      title: {\n        type: String,\n        default: '标题'\n      },\n      leftText: {\n        type: String,\n        default: ''\n      },\n      rightText: {\n        type: String,\n        default: ''\n      },\n      useDefaultReturn: {\n        type: Boolean,\n        default: true\n      },\n      show: {\n        type: Boolean,\n        default: true\n      },\n      barStyle: {\n        type: Object\n      }\n    },\n    computed: {\n      newBarStyle () {\n        const { backgroundColor, barStyle } = this;\n        return {\n          backgroundColor,\n          ...barStyle\n        }\n      }\n    },\n    methods: {\n      leftButtonClicked () {\n        if (this.useDefaultReturn) {\n          Navigator.pop({}, e => {\n          });\n        }\n        this.$emit('wxcMinibarLeftButtonClicked', {});\n      },\n      rightButtonClicked () {\n        const hasRightContent = this.rightText || this.rightButton || (this.$slots && this.$slots.right);\n        hasRightContent && this.$emit('wxcMinibarRightButtonClicked', {});\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-city[data-v-a0576d64] {\n  position: fixed;\n  width: 10rem;\n  background-color: #F2F3F4;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-city/index.vue?4f7bcada"],"names":[],"mappings":";AAiNA;EACA,gBAAA;EACA,aAAA;EACA,0BAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/12/27. -->\n<!--A City -->\n\n<template>\n  <div class=\"wxc-city\" ref=\"city\" :style=\"cityExtendStyle\">\n    <wxc-searchbar ref=\"wxc-searchbar\"\n                   v-bind=\"mergeInputConfig\"\n                   @wxcSearchbarInputOnInput=\"onInput\"\n                   @wxcSearchbarInputReturned=\"onSubmit\"\n                   @wxcSearchbarCancelClicked=\"onCancel\"></wxc-searchbar>\n\n    <wxc-tab ref=\"wxc-tab\"\n             v-if=\"showTab\"\n             @wxcTabSwitch=\"onTabSwitch\"></wxc-tab>\n\n    <wxc-indexlist :normal-list=\"normalList\"\n                   :hot-list-config=\"hotListConfig\"\n                   :nav-style=\"{ top: '24px'}\"\n                   :height=\"listHeight\"\n                   :show-index=\"showIndex\"\n                   :only-show-list=\"!showNavHeader || onlyShowList\"\n                   :city-location-config=\"currentCityLocationConfig\"\n                   @wxcIndexlistItemClicked=\"onItemClick\"></wxc-indexlist>\n\n    <wxc-result type=\"noGoods\"\n                :wrap-style=\"{top:'84px'}\"\n                :show=\"true\"\n                :customSet=\"result\"\n                v-if=\"showError\"></wxc-result>\n  </div>\n</template>\n\n<script>\n  import defaultSourceData from './default-data';\n  import * as Util from './util';\n  import Utils from '../utils';\n  import wxcTab from './tab.vue';\n  import WxcSearchbar from '../wxc-searchbar'\n  import WxcResult from '../wxc-result';\n  import WxcIndexlist from '../wxc-indexlist';\n\n  export default {\n    components: { wxcTab, WxcSearchbar, WxcResult, WxcIndexlist },\n    props: {\n      animationType: {\n        type: String,\n        default: 'push'\n      },\n      inputConfig: {\n        type: Object,\n        default: () => ({})\n      },\n      sourceData: {\n        type: Object,\n        default: () => defaultSourceData\n      },\n      cityStyleType: {\n        type: String,\n        default: 'list'\n      },\n      currentLocation: String,\n      cityHeight: {\n        type: Number,\n        default: 0\n      },\n      showTab: {\n        type: Boolean,\n        default: false\n      },\n      showIndex: {\n        type: Boolean,\n        default: true\n      },\n      showNavHeader: {\n        type: Boolean,\n        default: true\n      }\n    },\n    data: () => ({\n      tId: null,\n      saveDefaultSourceData: {},\n      cityData: {},\n      onlyShowList: false,\n      result: {\n        noGoods: {\n          pic: 'https://img.alicdn.com/tfs/TB1SpPHkf2H8KJjy0FcXXaDlFXa-200-200.png',\n          button: '',\n          content: '搜索无结果'\n        }\n      }\n    }),\n    created () {\n      this.cityData = this.sourceData\n      this.saveDefaultSourceData = this.sourceData\n    },\n    computed: {\n      cityExtendStyle () {\n        return Utils.uiStyle.pageTransitionAnimationStyle(this.animationType)\n      },\n      currentCityLocationConfig () {\n        if (this.currentLocation) {\n          return {\n            type: this.cityStyleType,\n            title: '定位',\n            list: [\n              { name: this.currentLocation, isLocation: true }\n            ]\n          }\n        } else {\n          return {};\n        }\n      },\n      normalList () {\n        return Util.getCities(this.cityData.cities)\n      },\n      hotListConfig () {\n        return {\n          type: this.cityStyleType,\n          title: '热门',\n          list: Util.getCities((this.cityData.hotCity))\n        }\n      },\n      showError () {\n        const { normalList, hotListConfig } = this;\n        return (normalList && normalList.length < 1) && (hotListConfig && hotListConfig.list && hotListConfig.list.length < 1)\n      },\n      listHeight () {\n        // 兼容去头逻辑\n        let pageHeight = Utils.env.getPageHeight();\n\n        const { cityHeight } = this;\n        if (cityHeight && !isNaN(cityHeight) && cityHeight > 0) {\n          pageHeight = cityHeight;\n        }\n        // searchInput 84\n        const tabHeight = this.showTab ? 90 : 0;\n        return pageHeight - 84 - tabHeight;\n      },\n      mergeInputConfig () {\n        return {\n          autofocus: false,\n          alwaysShowCancel: true,\n          placeholder: '中文/拼音/首字母',\n          ...this.inputConfig\n        }\n      }\n    },\n    methods: {\n      onTabSwitch (e) {\n        this.$emit('wxcTabSwitch', e);\n      },\n      switchTab (i = 0) {\n        setTimeout(() => {\n          this.$refs['wxc-tab'].switchTab(i)\n        }, 100);\n      },\n      onItemClick (e) {\n        this.$refs['wxc-searchbar'].autoBlur();\n        this.show(false);\n        this.$emit('wxcCityItemSelected', { item: e.item });\n      },\n      onInput (e) {\n        clearTimeout(this.tId);\n        const { cities } = this.cityData;\n        const { value } = e;\n        if (value !== '' && cities && cities.length > 0) {\n          const queryData = Util.query(cities, String(value).trim());\n          this.cityData = {\n            cities: queryData,\n            hotCity: []\n          };\n          this.onlyShowList = true;\n        } else {\n          this.cityData = this.saveDefaultSourceData;\n          this.onlyShowList = false;\n        }\n        this.tId = setTimeout(() => {\n          this.$emit('wxcCityOnInput', {\n            value: e.value\n          });\n        }, 300);\n      },\n      onCancel () {\n        this.autoBlur();\n        this.show(false);\n        this.$emit('wxcCityCanceled', {});\n      },\n      onSubmit (e) {\n        this.autoBlur();\n        this.$emit('wxcCityOnKeyUpEnter', { value: e.value });\n      },\n      autoBlur () {\n        const inputRef = this.$refs['wxc-searchbar'];\n        inputRef && inputRef.autoBlur();\n      },\n      show (status = true, callback = null) {\n        const ref = this.$refs.city\n        if (this.animationType === 'push') {\n          Utils.animation.pageTransitionAnimation(ref, `translateX(${status ? -750 : 750}px)`, status, callback)\n        } else if (this.animationType === 'model') {\n          Utils.animation.pageTransitionAnimation(ref, `translateY(${status ? -Utils.env.getScreenHeight() : Utils.env.getScreenHeight()}px)`, status, callback)\n        }\n      }\n    }\n  };\n</script>\n\n<style scoped>\n  .wxc-city {\n    position: fixed;\n    width: 750px;\n    background-color: #F2F3F4;\n  }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wrapper[data-v-a26f8810]{\n  z-index: 999;\n}\n.g-cover[data-v-a26f8810] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 1;\n}\n.g-popover[data-v-a26f8810] {\n  position: fixed;\n  padding:0.2rem;\n  z-index: 10;\n}\n.u-popover-arrow[data-v-a26f8810] {\n  position: absolute;\n  border-radius: 0.05333rem;\n  width: 0.4rem;\n  height: 0.4rem;\n  background-color: #ffffff;\n}\n.u-popover-inner[data-v-a26f8810] {\n  border-radius: 0.13333rem;\n  background-color: #ffffff;\n}\n.i-btn[data-v-a26f8810] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  margin-left: 0.26667rem;\n  margin-right: 0.26667rem;\n  padding-left: 0.26667rem;\n  padding-right: 0.26667rem;\n  border-bottom-width: 1px;\n  border-bottom-color: #dddddd;\n}\n.i-btn-noborder[data-v-a26f8810] {\n  border-bottom-color: #ffffff;\n}\n.btn-icon[data-v-a26f8810] {\n  width: 0.42667rem;\n  height: 0.42667rem;\n  margin-right: 0.21333rem;\n}\n.btn-text[data-v-a26f8810] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  height: 1.06667rem;\n  font-size: 0.4rem;\n  line-height: 1.06667rem;\n}\n.text-align-center[data-v-a26f8810] {\n  text-align: center;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-popover/index.vue?23bf7844"],"names":[],"mappings":";AA2RA;EACA,aAAA;CACA;AACA;EACA,gBAAA;EACA,OAAA;EACA,SAAA;EACA,QAAA;EACA,UAAA;EACA,qCAAA;EACA,WAAA;CACA;AACA;EACA,gBAAA;EACA,eAAA;EACA,YAAA;CACA;AACA;EACA,mBAAA;EACA,0BAAA;EACA,cAAA;EACA,eAAA;EACA,0BAAA;CACA;AACA;EACA,0BAAA;EACA,0BAAA;CACA;AACA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,0BAAA;EAAA,uCAAA;UAAA,+BAAA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,wBAAA;EACA,yBAAA;EACA,yBAAA;EACA,0BAAA;EACA,yBAAA;EACA,6BAAA;CACA;AACA;EACA,6BAAA;CACA;AACA;EACA,kBAAA;EACA,mBAAA;EACA,yBAAA;CACA;AACA;EACA,oBAAA;EAAA,gBAAA;UAAA,QAAA;EACA,mBAAA;EACA,kBAAA;EACA,wBAAA;CACA;AACA;EACA,mBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 WeexUI Group Holding Limited. -->\n<!-- Created by git@zwwill on 18/02/08. -->\n<!--A popover box with customized contents.-->\n\n<template>\n  <div class=\"wrapper\">\n    <div class=\"g-cover\"\n         ref=\"wxc-cover\"\n         v-if=\"show\"\n         @click=\"hideAction\"\n         :style=\"coverStyle\"></div>\n    <div ref=\"wxc-popover\"\n         class=\"g-popover\"\n         v-if=\"show && buttons.length\"\n         :style=\"contentStyle\">\n      <div class=\"u-popover-arrow\" :style=\"arrowStyle\"></div>\n      <div class=\"u-popover-inner\">\n        <div :class=\"['i-btn',i === buttons.length-1 ? 'i-btn-noborder' : '']\"\n             v-for=\"(item,i) in buttons\"\n             :key=\"i\"\n             @click=\"wxcButtonClicked(i,item.key)\">\n          <image :src=\"item.icon\"\n                 v-if=\"item.icon\"\n                 class=\"btn-icon\"></image>\n          <p class=\"btn-text\" :style=\"textStyle\">{{item.text}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nconst animation = weex.requireModule('animation');\nexport default {\n  props: {\n    buttons: {\n      type: Array,\n      default: []\n    },\n    position: {\n      type: Object,\n      default: () => ({\n        x: 0,\n        y: 0\n      })\n    },\n    arrowPosition: {\n      type: Object,\n      default: () => ({\n        pos: 'top',\n        x: 0,\n        y: 0\n      })\n    },\n    coverColor: {\n      type: String,\n      default: 'rgba(0, 0, 0, 0.4)'\n    },\n    hasAnimation: {\n      type: Boolean,\n      default: true\n    },\n    textStyle: {\n      type: Object,\n      default: () => ({})\n    }\n  },\n  data: () => ({\n    show: false,\n    showIn: false\n  }),\n  computed: {\n    coverStyle () {\n      return this.coverColor ? { backgroundColor: this.coverColor, opacity: this.hasAnimation || !this.showIn ? '0' : '1' } : '';\n    },\n    transformOrigin () {\n      const { x = 0, y = 0, pos = 'top' } = this.arrowPosition;\n      let _origins = [];\n      switch (pos) {\n        case 'top':\n        case 'bottom':\n          _origins = [x < 0 ? 'right' : 'left', pos];\n          break;\n        case 'left':\n        case 'right':\n          _origins = [pos, y < 0 ? 'bottom' : 'top'];\n          break;\n      }\n      return _origins.join(' ');\n    },\n    contentTransform () {\n      const { pos = 'top' } = this.arrowPosition;\n      let { x = 0, y = 0 } = this.arrowPosition;\n      const _translates = ['scale(0)'];\n      if (x >= 0 && x < 22) {\n        x = 22;\n      } else if (x < 0 && x > -22) {\n        x = -22;\n      }\n      if (y >= 0 && y < 22) {\n        y = 22;\n      } else if (y < 0 && y > -22) {\n        y = -22;\n      }\n      switch (pos) {\n        case 'top':\n        case 'bottom':\n          _translates[1] = `translateX(${x < 0 ? (x - 15) : (x + 15)}px)`;\n          break;\n        case 'left':\n        case 'right':\n          _translates[1] = `translateY(${y < 0 ? (y - 15) : (y + 15)}px)`\n          break;\n      }\n      return _translates.join(' ');\n    },\n    contentStyle () {\n      const { x = 0, y = 0 } = this.position;\n      const style = {};\n      x < 0 ? (style.right = `${-x}px`) : (style.left = `${x}px`);\n      y < 0 ? (style.bottom = `${-y}px`) : (style.top = `${y}px`);\n      style.opacity = this.hasAnimation || !this.showIn ? '0' : '1';\n      style.transform = this.hasAnimation || !this.showIn ? this.contentTransform : 'scale(1)';\n      style.transformOrigin = this.transformOrigin;\n      return style;\n    },\n    arrowStyle () {\n      let { x = 0, y = 0 } = this.arrowPosition;\n      const { pos = 'top' } = this.arrowPosition;\n      const style = {};\n      switch (pos) {\n        case 'top':\n          style.top = '6px';\n        case 'bottom': //eslint-disable-line\n          !style.top && (style.bottom = '6px');\n          style.transform = 'scaleX(0.8) rotate(45deg)';\n          if (x >= 0 && x < 22) {\n            x = 22;\n          } else if (x < 0 && x > -22) {\n            x = -22;\n          }\n          x < 0 ? (style.right = `${-x}px`) : (style.left = `${x}px`);\n          break;\n        case 'left':\n          style.left = '6px';\n        case 'right': //eslint-disable-line\n          !style.left && (style.right = '6px');\n          style.transform = 'scaleY(0.8) rotate(45deg)';\n          if (y >= 0 && y < 22) {\n            y = 22;\n          } else if (y < 0 && y > -22) {\n            y = -22;\n          }\n          y < 0 ? (style.bottom = `${-y}px`) : (style.top = `${y}px`);\n          break;\n        default:\n          break;\n      }\n      return style;\n    }\n  },\n  methods: {\n    wxcPopoverShow () {\n      if (this.animationLock) {\n        return;\n      }\n      this.show = true;\n      if (this.hasAnimation) {\n        setTimeout(() => this.wxcPopoverAnimationShow(), 40)\n      } else {\n        setTimeout(() => (this.showIn = true), 40);\n      }\n    },\n    /**\n    * smooth in\n    **/\n    wxcPopoverAnimationShow () {\n      const popoverEl = this.$refs['wxc-popover'];\n      const coverEl = this.$refs['wxc-cover'];\n      if (!coverEl || !popoverEl) {\n        return;\n      }\n      this.setAnimationLock();\n      let a1End = false;\n      let a2End = false;\n      animation.transition(popoverEl, {\n        styles: {\n          opacity: 1,\n          transform: 'scale(1)',\n          transformOrigin: this.transformOrigin\n        },\n        delay: 0,\n        duration: 250,\n        timingFunction: 'ease-out'\n      }, (e) => {\n        a1End = true;\n        if (a1End && a2End) {\n          this.animationLock = false\n        }\n      });\n\n      animation.transition(coverEl, {\n        styles: {\n          opacity: 1\n        },\n        delay: 0,\n        duration: 250,\n        timingFunction: 'ease-in'\n      }, (e) => {\n        a2End = true;\n        if (a1End && a2End) {\n          this.animationLock = false\n        }\n      });\n    },\n    wxcButtonClicked (index, key) {\n      if (this.animationLock) {\n        return;\n      }\n      this.$emit('wxcPopoverButtonClicked', { key, index });\n      this.hideAction();\n    },\n    /**\n       * 隐藏操作\n       */\n    hideAction () {\n      if (this.animationLock) {\n        return;\n      }\n      if (this.hasAnimation) {\n        this.setAnimationLock()\n        const popoverEl = this.$refs['wxc-popover'];\n        const coverEl = this.$refs['wxc-cover'];\n        if (!popoverEl || !coverEl) {\n          return;\n        }\n        let a1End = false;\n        let a2End = false;\n        animation.transition(popoverEl, {\n          styles: {\n            opacity: 0,\n            transform: this.contentTransform,\n            transformOrigin: this.transformOrigin\n          },\n          duration: 250\n        }, () => {\n          a1End = true;\n          if (a1End && a2End) {\n            this.show = false;\n            this.showIn = false;\n            this.animationLock = false\n          }\n        });\n        animation.transition(coverEl, {\n          styles: {\n            opacity: 0\n          },\n          duration: 250\n        }, () => {\n          a2End = true;\n          if (a1End && a2End) {\n            this.show = false;\n            this.showIn = false;\n            this.animationLock = false\n          }\n        });\n      } else {\n        this.show = false;\n        this.showIn = false;\n      }\n    },\n    /**\n       * 设置动画锁\n       */\n    setAnimationLock () {\n      this.animationLock = true;\n    }\n\n  }\n};\n</script>\n\n<style scoped>\n.wrapper{\n  z-index: 999;\n}\n.g-cover {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 1;\n}\n.g-popover {\n  position: fixed;\n  padding:15px;\n  z-index: 10;\n}\n.u-popover-arrow {\n  position: absolute;\n  border-radius: 4px;\n  width: 30px;\n  height: 30px;\n  background-color: #ffffff;\n}\n.u-popover-inner {\n  border-radius: 10px;\n  background-color: #ffffff;\n}\n.i-btn {\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin-left: 20px;\n  margin-right: 20px;\n  padding-left: 20px;\n  padding-right: 20px;\n  border-bottom-width: 1px;\n  border-bottom-color: #dddddd;\n}\n.i-btn-noborder {\n  border-bottom-color: #ffffff;\n}\n.btn-icon {\n  width: 32px;\n  height: 32px;\n  margin-right: 16px;\n}\n.btn-text {\n  flex: 1;\n  height: 80px;\n  font-size: 30px;\n  line-height: 80px;\n}\n.text-align-center {\n  text-align: center;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-lottery-rain[data-v-a7a9618a] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(133, 11, 11, .8);\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-lottery-rain/index.vue?67dfa239"],"names":[],"mappings":";AAeA;EACA,mBAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EACA,wCAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div class=\"wxc-lottery-rain\" :style=\"wrapStyle\">\n    <rain-item key=\"i\"\n               :src=\"src\"\n               :rain-id=\"i\"\n               :ref=\"`rain-item-${i}`\"\n               @wxcLotteryRainCaught=\"wxcLotteryRainCaught\"\n               v-for=\"(src,i) in picList\"></rain-item>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-lottery-rain {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: rgba(133, 11, 11, .8);\n  }\n</style>\n\n<script>\n  import RainItem from './rain-item.vue';\n\n  export default {\n    components: { RainItem },\n    props: {\n      picList: Array,\n      config: Object,\n      wrapStyle: Object\n    },\n    methods: {\n      wxcLotteryRainCaught (e) {\n        this.$emit('wxcLotteryRainCaught', { rainId: e.rainId });\n      },\n      destroy () {\n        const { picList } = this;\n        const length = picList.length;\n        for (let i = 0; i < length; i++) {\n          this.$refs[`rain-item-${i}`][0].destroy();\n        }\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-rich-text[data-v-c98168de] {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n.default-text[data-v-c98168de] {\n  color: #A5A5A5;\n  font-size: 0.32rem;\n  line-height: 0.4rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/index.vue?1b6b12a3"],"names":[],"mappings":";AAoCA;EACA,0BAAA;EAAA,4BAAA;UAAA,oBAAA;EACA,+BAAA;EAAA,8BAAA;EAAA,4BAAA;UAAA,oBAAA;CACA;AAEA;EACA,eAAA;EACA,mBAAA;EACA,oBAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <div>\n    <div class=\"wxc-rich-text\" v-if=\"isNotEmptyArray\">\n      <div v-for=\"v in configList\">\n        <wxc-rich-text-text v-if=\"v.type=='text' && v.value\"\n                            :text-value=\"v.value\"\n                            :text-style=\"v.style\"\n                            :has-text-margin=\"hasTextMargin\"\n                            :text-theme=\"v.theme\"></wxc-rich-text-text>\n\n        <wxc-rich-text-link v-if=\"v.type=='link' && v.href && v.value\"\n                            :link-value=\"v.value\"\n                            :link-href=\"v.href\"\n                            :link-style=\"v.style\"\n                            :has-text-margin=\"hasTextMargin\"\n                            :link-theme=\"v.theme\"\n                            @wxcRichTextLinkClick=\"linkClick\"></wxc-rich-text-link>\n\n        <wxc-rich-text-icon v-if=\"v.type=='icon' && v.src\"\n                            :icon-src=\"v.src\"\n                            :icon-style=\"v.style\"></wxc-rich-text-icon>\n\n        <wxc-rich-text-tag v-if=\"v.type=='tag' && v.value\"\n                           :tag-value=\"v.value\"\n                           :tag-theme=\"v.theme\"\n                           :tag-style=\"v.style\"></wxc-rich-text-tag>\n      </div>\n    </div>\n    <p class=\"default-text\" v-if=\"isString\">{{configList}}</p>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-rich-text {\n    align-items: center;\n    flex-direction: row;\n  }\n\n  .default-text {\n    color: #A5A5A5;\n    font-size: 24px;\n    line-height: 30px;\n  }\n</style>\n\n<script>\n  import Utils from '../utils';\n\n  export default {\n    components: {\n      WxcRichTextText: require('./wxc-rich-text-text.vue'),\n      WxcRichTextLink: require('./wxc-rich-text-link.vue'),\n      WxcRichTextIcon: require('./wxc-rich-text-icon.vue'),\n      WxcRichTextTag: require('./wxc-rich-text-tag.vue')\n    },\n    props: {\n      configList: {\n        type: [Array, String],\n        default: function() {\n          return []\n        }\n      },\n      hasTextMargin: {\n        type: Boolean,\n        default: true\n      }\n    },\n    data: () => ({}),\n    computed: {\n      isNotEmptyArray() {\n        return Utils.isNonEmptyArray(this.configList);\n      },\n      isString() {\n        return Utils.isString(this.configList);\n      }\n    },\n    methods: {\n      linkClick(e) {\n        this.$emit('wxcRichTextLinkClick', e);\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-popup[data-v-ca872182] {\n  position: fixed;\n  width: 10rem;\n}\n.top[data-v-ca872182] {\n  left: 0;\n  right: 0;\n}\n.bottom[data-v-ca872182] {\n  left: 0;\n  right: 0;\n}\n.left[data-v-ca872182] {\n  bottom: 0;\n  top: 0;\n}\n.right[data-v-ca872182] {\n  bottom: 0;\n  top: 0;\n}\n\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-popup/index.vue?172e0764"],"names":[],"mappings":";AA0BA;EACA,gBAAA;EACA,aAAA;CACA;AAEA;EACA,QAAA;EACA,SAAA;CACA;AAEA;EACA,QAAA;EACA,SAAA;CACA;AAEA;EACA,UAAA;EACA,OAAA;CACA;AAEA;EACA,UAAA;EACA,OAAA;CACA","file":"index.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 16/10/25. -->\n<!--A popup box with customized contents.-->\n\n<template>\n  <div>\n    <div @touchend=\"handleTouchEnd\">\n      <wxc-overlay :show=\"haveOverlay && isOverShow\"\n                   v-if=\"show\"\n                   ref=\"overlay\"\n                   v-bind=\"overlayCfg\"\n                   @wxcOverlayBodyClicking=\"wxcOverlayBodyClicking\"></wxc-overlay>\n    </div>\n    <div ref=\"wxc-popup\"\n         v-if=\"show\"\n         :height=\"_height\"\n         :hack=\"isNeedShow\"\n         @click=\"()=>{}\"\n         :class=\"['wxc-popup', pos]\"\n         :style=\"padStyle\">\n      <slot></slot>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n  .wxc-popup {\n    position: fixed;\n    width: 750px;\n  }\n\n  .top {\n    left: 0;\n    right: 0;\n  }\n\n  .bottom {\n    left: 0;\n    right: 0;\n  }\n\n  .left {\n    bottom: 0;\n    top: 0;\n  }\n\n  .right {\n    bottom: 0;\n    top: 0;\n  }\n\n</style>\n\n<script>\n  const animation = weex.requireModule('animation');\n  import WxcOverlay from '../wxc-overlay';\n\n  export default {\n    components: { WxcOverlay },\n    props: {\n      show: {\n        type: Boolean,\n        default: false\n      },\n      pos: {\n        type: String,\n        default: 'bottom'\n      },\n      popupColor: {\n        type: String,\n        default: '#FFFFFF'\n      },\n      overlayCfg: {\n        type: Object,\n        default: () => ({\n          hasAnimation: true,\n          timingFunction: ['ease-in', 'ease-out'],\n          duration: 300,\n          opacity: 0.6\n        })\n      },\n      height: {\n        type: [Number, String],\n        default: 840\n      },\n      standOut: {\n        type: [Number, String],\n        default: 0\n      },\n      width: {\n        type: [Number, String],\n        default: 750\n      },\n      animation: {\n        type: Object,\n        default: () => ({\n          timingFunction: 'ease-in'\n        })\n      }\n    },\n    data: () => ({\n      haveOverlay: true,\n      isOverShow: true\n    }),\n    computed: {\n      isNeedShow() {\n        setTimeout(() => {\n          this.appearPopup(this.show);\n        }, 50);\n        return this.show;\n      },\n      _height() {\n        this.appearPopup(this.show, 150);\n        return this.height;\n      },\n      padStyle() {\n        const { pos, width, height, popupColor, standOut } = this;\n        const stand = parseInt(standOut, 10);\n        let style = {\n          width: `${width}px`,\n          backgroundColor: popupColor\n        };\n        pos === 'top' && (style = {\n          ...style,\n          top: `${-height + stand}px`,\n          height: `${height}px`\n        });\n        pos === 'bottom' && (style = {\n          ...style,\n          bottom: `${-height + stand}px`,\n          height: `${height}px`\n        });\n        pos === 'left' && (style = {\n          ...style,\n          left: `${-width + stand}px`\n        });\n        pos === 'right' && (style = {\n          ...style,\n          right: `${-width + stand}px`\n        });\n        return style;\n      }\n    },\n    methods: {\n      handleTouchEnd(e) {\n        // 在支付宝上面有点击穿透问题\n        const { platform } = weex.config.env;\n        platform === 'Web' && e.preventDefault && e.preventDefault();\n      },\n      hide() {\n        this.appearPopup(false);\n        this.$refs.overlay.appearOverlay(false);\n      },\n      wxcOverlayBodyClicking() {\n        this.isShow && this.appearPopup(false);\n      },\n      appearPopup(bool, duration = 300) {\n        this.isShow = bool;\n        const popupEl = this.$refs['wxc-popup'];\n        if (!popupEl) {\n          return;\n        }\n        animation.transition(popupEl, {\n          styles: {\n            transform: this.getTransform(this.pos, this.width, this.height, !bool)\n          },\n          duration,\n          delay: 0,\n          ...this.animation\n        }, () => {\n          if (!bool) {\n            this.$emit('wxcPopupOverlayClicked', { pos: this.pos });\n          }\n        });\n      },\n      getTransform(pos, width, height, bool) {\n        let _size = pos === 'top' || pos === 'bottom' ? height : width;\n        bool && (_size = 0);\n        let _transform;\n        switch (pos) {\n          case 'top':\n            _transform = `translateY(${_size}px)`;\n            break;\n          case 'bottom':\n            _transform = `translateY(-${_size}px)`;\n            break;\n          case 'left':\n            _transform = `translateX(${_size}px)`;\n            break;\n          case 'right':\n            _transform = `translateX(-${_size}px)`;\n            break;\n        }\n        return _transform;\n      }\n    }\n  }\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(true);
// imports


// module
exports.push([module.i, "\n.wxc-image[data-v-fb43e778] {\n  width: 1.2rem;\n  height: 0.32rem;\n  margin-right: 0.08rem;\n}\n", "", {"version":3,"sources":["/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-icon.vue?5d1d1648"],"names":[],"mappings":";AAaA;EACA,cAAA;EACA,gBAAA;EACA,sBAAA;CACA","file":"wxc-rich-text-icon.vue","sourcesContent":["<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->\n<!-- Created by Tw93 on 17/07/28. -->\n\n<template>\n  <image class=\"wxc-image\"\n         :src=\"iconSrc\"\n         :aria-hidden=\"true\"\n         @load=\"onLoad\"\n         :style=\"{ width: computedStyle.width, height: computedStyle.height }\">\n  </image>\n</template>\n\n<style scoped>\n  .wxc-image {\n    width: 90px;\n    height: 24px;\n    margin-right: 6px;\n  }\n</style>\n\n<script>\n  export default {\n    props: {\n      iconSrc: String,\n      iconStyle: {\n        type: Object,\n        default: () => ({\n          height: 24\n        })\n      }\n    },\n    data: () => ({\n      width: 90\n    }),\n    computed: {\n      computedStyle () {\n        const { width, iconStyle } = this;\n        if (iconStyle && iconStyle.width && iconStyle.height) {\n          return {\n            width: `${iconStyle.width}px`,\n            height: `${iconStyle.height}px`\n          }\n        } else {\n          return {\n            width: `${width}px`,\n            height: `${iconStyle.height}px`\n          }\n        }\n      }\n    },\n    methods: {\n      onLoad (e) {\n        if (e.success && e.size && e.size.naturalWidth > 0) {\n          const width = e.size.naturalWidth;\n          const height = e.size.naturalHeight;\n          this.width = width * (this.iconStyle.height / height);\n        }\n      }\n    }\n  };\n</script>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//

var _type = __webpack_require__(142);

exports.default = {
  props: {
    text: {
      type: String,
      default: '确认'
    },
    size: {
      type: String,
      default: 'full'
    },
    type: {
      type: String,
      default: 'red'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isHighlight: {
      type: Boolean,
      default: false
    },
    btnStyle: Object,
    textStyle: Object,
    disabledStyle: Object
  },
  computed: {
    mrBtnStyle: function mrBtnStyle() {
      var type = this.type,
          disabled = this.disabled,
          btnStyle = this.btnStyle,
          size = this.size,
          disabledStyle = this.disabledStyle;


      var mrBtnStyle = _extends({}, _type.STYLE_MAP[type], _type.BUTTON_STYLE_MAP[size], btnStyle);

      var disabledInStyle = { opacity: 0.2 };
      if (type === 'white') {
        disabledInStyle = { backgroundColor: 'rgba(0, 0, 0, 0.1)' };
      }

      return disabled ? _extends({}, mrBtnStyle, disabledInStyle, disabledStyle, {
        borderWidth: 0
      }) : mrBtnStyle;
    },
    mrTextStyle: function mrTextStyle() {
      var type = this.type,
          disabled = this.disabled,
          textStyle = this.textStyle,
          size = this.size;

      var mrTextStyle = _extends({}, _type.TEXT_STYLE_MAP[type], _type.TEXT_FONTSIZE_STYLE_MAP[size], textStyle);
      return disabled ? _extends({}, mrTextStyle, { color: '#FFFFFF' }) : mrTextStyle;
    }
  },
  methods: {
    onClicked: function onClicked(e) {
      var type = this.type,
          disabled = this.disabled;

      this.$emit('wxcButtonClicked', { e: e, type: type, disabled: disabled });
    }
  }
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    label: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    extraContent: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    hasMargin: {
      type: Boolean,
      default: false
    },
    hasBottomBorder: {
      type: Boolean,
      default: true
    },
    hasArrow: {
      type: Boolean,
      default: false
    },
    arrowIcon: {
      type: String,
      default: 'https://gw.alicdn.com/tfs/TB11zBUpwMPMeJjy1XbXXcwxVXa-22-22.png'
    },
    hasVerticalIndent: {
      type: Boolean,
      default: true
    },
    cellStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    autoAccessible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    cellClicked: function cellClicked(e) {
      var link = this.link;
      this.$emit('wxcCellClicked', { e: e });
      link && _utils2.default.goToH5Page(link, true);
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(16);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { WxcCheckbox: _index2.default },
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      checkedList: []
    };
  },
  created: function created() {
    var _this = this;

    var list = this.list;

    if (list && list.length > 0) {
      list.forEach(function (item, i) {
        item.checked && _this.checkedList.push(item.value);
      });
    }
  },

  methods: {
    wxcCheckBoxItemChecked: function wxcCheckBoxItemChecked(e) {
      if (e.checked) {
        this.checkedList.push(e.value);
      } else {
        var index = this.checkedList.indexOf(e.value);
        this.checkedList.splice(index, 1);
      }
      this.$emit('wxcCheckBoxListChecked', { checkedList: this.checkedList });
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wxcCell = __webpack_require__(7);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _type = __webpack_require__(143);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: { WxcCell: _wxcCell2.default },
  props: {
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    hasBottomBorder: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      require: true
    },
    value: {
      type: [String, Number, Object],
      require: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      icon: [_type.CHECKED, _type.UNCHECKED, _type.CHECKED_DISABLED, _type.UNCHECKED_DISABLED],
      color: '#3D3D3D',
      innerChecked: false
    };
  },
  computed: {
    checkIcon: function checkIcon() {
      var icon = this.icon,
          disabled = this.disabled,
          innerChecked = this.innerChecked,
          config = this.config;

      var mergeIcon = [].concat(_toConsumableArray(icon));
      config.checkedIcon && (mergeIcon[0] = config.checkedIcon);
      config.unCheckedIcon && (mergeIcon[1] = config.unCheckedIcon);
      config.checkedDisabledIcon && (mergeIcon[2] = config.checkedDisabledIcon);
      config.unCheckedDisabledIcon && (mergeIcon[3] = config.unCheckedDisabledIcon);
      if (disabled) {
        return mergeIcon[innerChecked ? 2 : 3];
      } else {
        return mergeIcon[innerChecked ? 0 : 1];
      }
    },
    textColor: function textColor() {
      var innerChecked = this.innerChecked,
          disabled = this.disabled,
          config = this.config;

      var checkedColor = config.checkedColor ? config.checkedColor : '#EE9900';
      return innerChecked && !disabled ? checkedColor : '#3D3D3D';
    }
  },
  watch: {
    checked: function checked(newChecked) {
      this.innerChecked = newChecked;
    }
  },
  created: function created() {
    var checked = this.checked;

    this.innerChecked = checked;
  },

  methods: {
    wxcCellClicked: function wxcCellClicked() {
      var disabled = this.disabled,
          innerChecked = this.innerChecked,
          value = this.value;

      if (!disabled) {
        this.innerChecked = !innerChecked;
        this.$emit('wxcCheckBoxItemChecked', { value: value, checked: this.innerChecked });
      }
    }
  }
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _defaultData = __webpack_require__(144);

var _defaultData2 = _interopRequireDefault(_defaultData);

var _util = __webpack_require__(18);

var Util = _interopRequireWildcard(_util);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _tab = __webpack_require__(163);

var _tab2 = _interopRequireDefault(_tab);

var _wxcSearchbar = __webpack_require__(14);

var _wxcSearchbar2 = _interopRequireDefault(_wxcSearchbar);

var _wxcResult = __webpack_require__(13);

var _wxcResult2 = _interopRequireDefault(_wxcResult);

var _wxcIndexlist = __webpack_require__(10);

var _wxcIndexlist2 = _interopRequireDefault(_wxcIndexlist);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { wxcTab: _tab2.default, WxcSearchbar: _wxcSearchbar2.default, WxcResult: _wxcResult2.default, WxcIndexlist: _wxcIndexlist2.default },
  props: {
    animationType: {
      type: String,
      default: 'push'
    },
    inputConfig: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    sourceData: {
      type: Object,
      default: function _default() {
        return _defaultData2.default;
      }
    },
    cityStyleType: {
      type: String,
      default: 'list'
    },
    currentLocation: String,
    cityHeight: {
      type: Number,
      default: 0
    },
    showTab: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    showNavHeader: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      tId: null,
      saveDefaultSourceData: {},
      cityData: {},
      onlyShowList: false,
      result: {
        noGoods: {
          pic: 'https://img.alicdn.com/tfs/TB1SpPHkf2H8KJjy0FcXXaDlFXa-200-200.png',
          button: '',
          content: '搜索无结果'
        }
      }
    };
  },
  created: function created() {
    this.cityData = this.sourceData;
    this.saveDefaultSourceData = this.sourceData;
  },

  computed: {
    cityExtendStyle: function cityExtendStyle() {
      return _utils2.default.uiStyle.pageTransitionAnimationStyle(this.animationType);
    },
    currentCityLocationConfig: function currentCityLocationConfig() {
      if (this.currentLocation) {
        return {
          type: this.cityStyleType,
          title: '定位',
          list: [{ name: this.currentLocation, isLocation: true }]
        };
      } else {
        return {};
      }
    },
    normalList: function normalList() {
      return Util.getCities(this.cityData.cities);
    },
    hotListConfig: function hotListConfig() {
      return {
        type: this.cityStyleType,
        title: '热门',
        list: Util.getCities(this.cityData.hotCity)
      };
    },
    showError: function showError() {
      var normalList = this.normalList,
          hotListConfig = this.hotListConfig;

      return normalList && normalList.length < 1 && hotListConfig && hotListConfig.list && hotListConfig.list.length < 1;
    },
    listHeight: function listHeight() {
      // 兼容去头逻辑
      var pageHeight = _utils2.default.env.getPageHeight();

      var cityHeight = this.cityHeight;

      if (cityHeight && !isNaN(cityHeight) && cityHeight > 0) {
        pageHeight = cityHeight;
      }
      // searchInput 84
      var tabHeight = this.showTab ? 90 : 0;
      return pageHeight - 84 - tabHeight;
    },
    mergeInputConfig: function mergeInputConfig() {
      return _extends({
        autofocus: false,
        alwaysShowCancel: true,
        placeholder: '中文/拼音/首字母'
      }, this.inputConfig);
    }
  },
  methods: {
    onTabSwitch: function onTabSwitch(e) {
      this.$emit('wxcTabSwitch', e);
    },
    switchTab: function switchTab() {
      var _this = this;

      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      setTimeout(function () {
        _this.$refs['wxc-tab'].switchTab(i);
      }, 100);
    },
    onItemClick: function onItemClick(e) {
      this.$refs['wxc-searchbar'].autoBlur();
      this.show(false);
      this.$emit('wxcCityItemSelected', { item: e.item });
    },
    onInput: function onInput(e) {
      var _this2 = this;

      clearTimeout(this.tId);
      var cities = this.cityData.cities;
      var value = e.value;

      if (value !== '' && cities && cities.length > 0) {
        var queryData = Util.query(cities, String(value).trim());
        this.cityData = {
          cities: queryData,
          hotCity: []
        };
        this.onlyShowList = true;
      } else {
        this.cityData = this.saveDefaultSourceData;
        this.onlyShowList = false;
      }
      this.tId = setTimeout(function () {
        _this2.$emit('wxcCityOnInput', {
          value: e.value
        });
      }, 300);
    },
    onCancel: function onCancel() {
      this.autoBlur();
      this.show(false);
      this.$emit('wxcCityCanceled', {});
    },
    onSubmit: function onSubmit(e) {
      this.autoBlur();
      this.$emit('wxcCityOnKeyUpEnter', { value: e.value });
    },
    autoBlur: function autoBlur() {
      var inputRef = this.$refs['wxc-searchbar'];
      inputRef && inputRef.autoBlur();
    },
    show: function show() {
      var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var ref = this.$refs.city;
      if (this.animationType === 'push') {
        _utils2.default.animation.pageTransitionAnimation(ref, 'translateX(' + (status ? -750 : 750) + 'px)', status, callback);
      } else if (this.animationType === 'model') {
        _utils2.default.animation.pageTransitionAnimation(ref, 'translateY(' + (status ? -_utils2.default.env.getScreenHeight() : _utils2.default.env.getScreenHeight()) + 'px)', status, callback);
      }
    }
  }
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {},
  data: function data() {
    return {
      checkedIndex: 0
    };
  },
  methods: {
    switchTab: function switchTab(index) {
      var animation = weex.requireModule('animation');
      this.checkedIndex = index;
      this.$emit('wxcTabSwitch', {
        index: index
      });
      animation.transition(this.$refs['tab-bar'], {
        styles: {
          transform: 'translateX(' + index * 375 + 'px)'
        },
        duration: 150, // ms
        timingFunction: 'ease',
        delay: 0 // ms
      }, function () {});
    }
  }
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    // 时间戳
    time: {
      type: Number,
      default: 1501200000000
    },
    // 倒计时的间隔,单位为"毫秒"
    interval: {
      type: Number,
      default: 1000
    },
    tpl: {
      type: String,
      default: '{h}:{m}:{s}'
    },
    // 最外层包裹 style
    timeWrapStyle: Object,
    // 数字盒子 style
    timeBoxStyle: Object,
    // : 盒子Style
    dotBoxStyle: Object,
    // 数字文字 Style
    timeTextStyle: Object,
    // : 文字Style
    dotTextStyle: Object
  },
  data: function data() {
    return {
      NOW_DATE: new Date().getTime(),
      completed: false,
      tplIndexOfDays: -1,
      tplIndexOfHours: -1,
      tplIndexOfMinutes: -1,
      tplIndexOfSeconds: -1,
      TIME_WRAP_STYLE: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '12px',
        marginRight: '12px'
      },
      TIME_BOX_STYLE: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        height: '30px',
        width: '30px'
      },
      DOT_BOX_STYLE: {
        width: '18px',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      TIME_TEXT_STYLE: {
        color: '#FFCC80',
        fontSize: '18px'
      },
      DOT_TEXT_STYLE: {
        color: '#333333',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    setInterval(function () {
      _this.NOW_DATE = new Date().getTime();
    }, this.interval);

    this.tplIndexOfDays = this.tpl.indexOf('d');
    this.tplIndexOfHours = this.tpl.indexOf('h');
    this.tplIndexOfMinutes = this.tpl.indexOf('m');
    this.tplIndexOfSeconds = this.tpl.indexOf('s');
  },

  computed: {
    mrTimeWrapStyle: function mrTimeWrapStyle() {
      return _extends({}, this.TIME_WRAP_STYLE, this.timeWrapStyle);
    },
    mrTimeBoxStyle: function mrTimeBoxStyle() {
      return _extends({}, this.TIME_BOX_STYLE, this.timeBoxStyle);
    },
    mrDotBoxStyle: function mrDotBoxStyle() {
      return _extends({}, this.DOT_BOX_STYLE, this.dotBoxStyle);
    },
    mrTimeTextStyle: function mrTimeTextStyle() {
      return _extends({}, this.TIME_TEXT_STYLE, this.timeTextStyle);
    },
    mrDotTextStyle: function mrDotTextStyle() {
      return _extends({}, this.DOT_TEXT_STYLE, this.dotTextStyle);
    },
    countDownData: function countDownData() {
      var timeSpacing = this.time - this.NOW_DATE;

      // 倒计时结束了
      if (timeSpacing < 0) {
        if (this.completed === false) {
          this.$emit('wxcOnComplete');
        }
        this.completed = true;
        return {
          day: '00',
          hour: '00',
          minute: '00',
          second: '00'
        };
      }

      var day = 0;
      var hour = 0;
      var minute = 0;
      var second = 0;

      if (this.tplIndexOfDays !== -1) {
        day = Math.floor(timeSpacing / (24 * 60 * 60 * 1000));
        hour = Math.floor(timeSpacing % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
      } else {
        day = 0;
        hour = Math.floor(timeSpacing / (60 * 60 * 1000));
      }

      if (this.tplIndexOfHours !== -1) {
        hour = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
        minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000));
      } else {
        hour = 0;
        minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 1000));
      }

      if (this.tplIndexOfMinutes !== -1) {
        minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / (60 * 1000));
        second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) % (60 * 1000) / 1000);
      } else {
        minute = 0;
        second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / 1000);
      }

      return {
        day: day < 10 ? '0' + day : '' + day,
        hour: hour < 10 ? '0' + hour : '' + hour,
        minute: minute < 10 ? '0' + minute : '' + minute,
        second: second < 10 ? '0' + second : '' + second
      };
    }
  },

  methods: {
    getDot: function getDot(prevTagIndex) {
      var nextTagIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      if (nextTagIndex === -1) {
        return this.tpl.slice(prevTagIndex + 2);
      }
      return this.tpl.slice(prevTagIndex + 2, nextTagIndex - 1);
    }
  }
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wxcOverlay = __webpack_require__(6);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

var _type = __webpack_require__(145);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { WxcOverlay: _wxcOverlay2.default },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    top: {
      type: Number,
      default: 400
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    mainBtnColor: {
      type: String,
      default: '#EE9900'
    },
    secondBtnColor: {
      type: String,
      default: '#666666'
    },
    showNoPrompt: {
      type: Boolean,
      default: false
    },
    noPromptText: {
      type: String,
      default: '不再提示'
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    left: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      noPromptIcon: _type.UN_CHECKED,
      pageHeight: 1334,
      isWeb: _utils2.default.env.isWeb()
    };
  },
  created: function created() {
    var _weex$config$env = weex.config.env,
        deviceHeight = _weex$config$env.deviceHeight,
        deviceWidth = _weex$config$env.deviceWidth;

    this.pageHeight = deviceHeight / deviceWidth * 750;
  },

  methods: {
    secondaryClicked: function secondaryClicked() {
      this.$emit('wxcDialogCancelBtnClicked', {
        type: 'cancel'
      });
    },
    primaryClicked: function primaryClicked(e) {
      this.$emit('wxcDialogConfirmBtnClicked', {
        type: 'confirm'
      });
    },
    noPromptClicked: function noPromptClicked(e) {
      var isChecked = !this.isChecked;
      this.noPromptIcon = isChecked ? _type.CHECKED : _type.UN_CHECKED;
      this.$emit('wxcDialogNoPromptClicked', { isChecked: isChecked });
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _bindEnv = __webpack_require__(5);

var _bindEnv2 = _interopRequireDefault(_bindEnv);

var _indexWeex = __webpack_require__(4);

var _indexWeex2 = _interopRequireDefault(_indexWeex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var swipeBack = weex.requireModule('swipeBack');
var animation = weex.requireModule('animation');
exports.default = {
  props: {
    sliderId: {
      type: [String, Number],
      default: 1
    },
    panOffset: {
      type: Number,
      default: 80
    },
    cardLength: {
      type: Number,
      default: 1
    },
    selectIndex: {
      type: Number,
      default: 0
    },
    enableSwipe: {
      type: Boolean,
      default: true
    },
    containerS: {
      type: Object,
      default: function _default() {
        return {
          position: 'relative',
          width: 750,
          height: 352
        };
      }
    },
    cardS: {
      type: Object,
      default: function _default() {
        return {
          width: 360,
          height: 300,
          spacing: 0,
          scale: 0.75
        };
      }
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: [Number, String],
      default: 1200
    }
  },
  data: function data() {
    return {
      isMoving: false,
      gesToken: 0,
      startX: 0,
      startTime: 0,
      currentIndex: 0,
      autoPlayTimer: null
    };
  },
  computed: {
    cardList: function cardList() {
      return new Array(this.cardLength + 1).join().split('');
    },
    cardWidth: function cardWidth() {
      return (this.cardLength - 1) * this.cardS.width + this.containerS.width + 235;
    }
  },
  created: function created() {
    this.currentIndex = this.selectIndex;
  },
  mounted: function mounted() {
    var _this = this;

    // ios和页面返回冲突，组件里面将ios系统横滑返回禁止
    if (swipeBack && swipeBack.forbidSwipeBack) {
      swipeBack.forbidSwipeBack(true);
    }

    setTimeout(function () {
      var sliderCtn = _this.$refs['sliderCtn_' + _this.sliderId];
      if (_bindEnv2.default.supportsEB() && sliderCtn && sliderCtn.ref) {
        _indexWeex2.default.prepare && _indexWeex2.default.prepare({
          anchor: sliderCtn.ref,
          eventType: 'pan'
        });
      }
    }, 20);
    this.checkNeedAutoPlay();
  },

  methods: {
    onPanStart: function onPanStart(e) {
      if (_bindEnv2.default.supportsEB()) {
        return;
      }
      this.clearAutoPlay();
      this.startX = e.changedTouches[0].clientX;
      this.startTime = Date.now();
    },
    onPanMove: function onPanMove(e) {
      if (_bindEnv2.default.supportsEB()) {
        return;
      }
      var moveX = e.changedTouches[0].clientX - this.startX;
      var index = this.loopedIndex(this.currentIndex, this.cardLength);
      var cardLength = this.cardLength;
      var currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);

      var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
      sliderCtn && animation.transition(sliderCtn, {
        styles: {
          transform: 'translateX(' + (moveX - currentCardLeft) + 'px)'
        },
        timingFunction: 'ease',
        delay: 0,
        duration: 0
      }, function () {});

      if (this.cardS.scale !== 1) {
        var currentCard = this.$refs['card' + this.loopedIndex(index, cardLength) + '_' + this.sliderId][0];
        currentCard && animation.transition(currentCard, {
          styles: {
            transform: 'scale(' + (1 - Math.abs(moveX) / this.cardS.width * (1 - this.cardS.scale)) + ')'
          },
          timingFunction: 'ease',
          delay: 0,
          duration: 0
        }, function () {});
        // 左边的卡片
        var leftCard = this.$refs['card' + this.loopedIndex(index - 1, cardLength) + '_' + this.sliderId][0];
        // loop 函数负数返回 0，这里有点冲突
        if (leftCard && index !== 0) {
          animation.transition(leftCard, {
            styles: {
              transform: 'scale(' + (1 - Math.abs(moveX - this.cardS.width) / this.cardS.width * (1 - this.cardS.scale)) + ')'
            },
            timingFunction: 'ease',
            delay: 0,
            duration: 0
          }, function () {});
        }
        // 右边卡片
        var rightCard = this.$refs['card' + this.loopedIndex(index + 1, cardLength) + '_' + this.sliderId][0];
        rightCard && animation.transition(rightCard, {
          styles: {
            transform: 'scale(' + (1 - Math.abs(this.cardS.width + moveX) / this.cardS.width * (1 - this.cardS.scale)) + ')'
          },
          timingFunction: 'ease',
          delay: 0,
          duration: 0
        }, function () {});
      }
    },
    onEpPanStart: function onEpPanStart(e) {
      var _this2 = this;

      if (_bindEnv2.default.supportsEB() && e.state === 'start') {
        this.clearAutoPlay();
        setTimeout(function () {
          var sliderCtn = _this2.$refs['sliderCtn_' + _this2.sliderId];
          _this2.bindExp(sliderCtn);
        }, 0);
      }
    },
    onPanEnd: function onPanEnd(e) {
      if (_bindEnv2.default.supportsEB()) {
        return;
      }
      this.panEnd(e);
    },
    panEnd: function panEnd(e) {
      var _this3 = this;

      this.isMoving = true;
      var moveX = e.deltaX;

      if (_utils2.default.env.isWeb()) {
        moveX = e.changedTouches[0].clientX - this.startX;
      }

      var originIndex = this.currentIndex;
      var selectIndex = originIndex;
      var duration = Date.now() - this.startTime;
      var panOffset = this.panOffset || this.cardS.width / 2;
      var isPullMore = selectIndex === this.cardLength - 1 && (moveX < -68 || moveX < -10 && duration < 200);

      if (isPullMore) {
        this.$emit('wxcEpSliderPullMore', { currentIndex: selectIndex });
      }

      if (moveX < -panOffset || moveX < -10 && duration < 200) {
        if (selectIndex !== this.cardLength - 1) {
          selectIndex++;
        }
      } else if (moveX > panOffset || moveX > 10 && duration < 500) {
        if (selectIndex !== 0) {
          selectIndex--;
        }
      }

      this.slideTo(originIndex, selectIndex);
      setTimeout(function () {
        _this3.checkNeedAutoPlay();
      }, 3000);
    },
    slideTo: function slideTo(originIndex, selectIndex) {
      var _this4 = this;

      var currentCardScale = 1;
      var rightCardScale = this.cardS.scale;
      var leftCardScale = this.cardS.scale;
      var duration = selectIndex === 0 && originIndex === this.cardLength - 1 && this.cardLength !== 2 ? 0.00001 : 300;
      this.$emit('wxcEpSliderCurrentIndexSelected', { currentIndex: selectIndex });
      if (originIndex < selectIndex) {
        currentCardScale = this.cardS.scale;
        rightCardScale = 1;
      } else if (originIndex > selectIndex) {
        currentCardScale = this.cardS.scale;
        leftCardScale = 1;
      }
      var currentCard = this.$refs['card' + this.loopedIndex(originIndex, this.cardLength) + '_' + this.sliderId][0];
      currentCard && animation.transition(currentCard, {
        styles: {
          transform: 'scale(' + currentCardScale + ')'
        },
        timingFunction: 'ease',
        duration: duration
      }, function () {});

      var leftCard = this.$refs['card' + this.loopedIndex(originIndex - 1, this.cardLength) + '_' + this.sliderId][0];
      if (this.isMoving && leftCard && originIndex !== 0) {
        animation.transition(leftCard, {
          styles: {
            transform: 'scale(' + leftCardScale + ')'
          },
          timingFunction: 'ease',
          duration: duration
        }, function () {});
      }
      var rightCard = this.$refs['card' + this.loopedIndex(originIndex + 1, this.cardLength) + '_' + this.sliderId][0];
      if (rightCard && originIndex !== this.cardLength - 1) {
        animation.transition(rightCard, {
          styles: {
            transform: 'scale(' + rightCardScale + ')'
          },
          timingFunction: 'ease',
          duration: duration
        }, function () {});
      }

      var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
      sliderCtn && animation.transition(sliderCtn, {
        styles: {
          transform: 'translateX(-' + selectIndex * (this.cardS.width + this.cardS.spacing) + 'px)'
        },
        timingFunction: 'ease',
        duration: duration
      }, function () {
        _this4.isMoving = false;
        if (originIndex !== selectIndex) {
          _this4.currentIndex = selectIndex;
        }
      });
    },

    // 使index维持在0-length之间循环
    loopedIndex: function loopedIndex(index, total) {
      if (index < 0) {
        index = index + (1 - index / total) * total;
      }
      return parseInt(index % total);
    },
    bindExp: function bindExp(element) {
      var _this5 = this;

      if (element && element.ref) {
        if (this.isMoving && this.gesToken !== 0) {
          _indexWeex2.default.unbind({
            eventType: 'pan',
            token: this.gesToken
          });
          this.gesToken = 0;
          return;
        }

        this.startTime = Date.now();
        var index = this.loopedIndex(this.currentIndex, this.cardLength);
        var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
        var currentCard = this.$refs['card' + index + '_' + this.sliderId][0];
        var rightCard = null;
        var leftCard = null;
        var currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);

        // 卡片容器
        var sliderCtnExp = 'x - ' + currentCardLeft;
        var args = [{
          element: sliderCtn.ref,
          property: 'transform.translateX',
          expression: sliderCtnExp
        }];

        if (this.cardS.scale !== 1) {
          var currentCardExp = '1-abs(x)/' + this.cardS.width + '*' + (1 - this.cardS.scale);
          var leftCardExp = '1-abs(x-' + this.cardS.width + ')/' + this.cardS.width + '*' + (1 - this.cardS.scale);
          var rightCardExp = '1-abs(' + this.cardS.width + '+x)/' + this.cardS.width + '*' + (1 - this.cardS.scale);

          args.push({
            element: currentCard.ref,
            property: 'transform.scale',
            expression: currentCardExp
          });

          if (index === 0 && this.$refs['card' + (index + 1) + '_' + this.sliderId]) {
            rightCard = this.$refs['card' + (index + 1) + '_' + this.sliderId][0];
            args.push({
              element: rightCard.ref,
              property: 'transform.scale',
              expression: rightCardExp
            });
          } else if (index === this.cardLength - 1 && this.$refs['card' + (index - 1) + '_' + this.sliderId]) {
            leftCard = this.$refs['card' + (index - 1) + '_' + this.sliderId][0];
            args.push({
              element: leftCard.ref,
              property: 'transform.scale',
              expression: leftCardExp
            });
          } else if (this.$refs['card' + (index - 1) + '_' + this.sliderId]) {
            // 左边卡片
            leftCard = this.$refs['card' + (index - 1) + '_' + this.sliderId][0];
            args.push({
              element: leftCard.ref,
              property: 'transform.scale',
              expression: leftCardExp
            });
            // 右边卡片
            rightCard = this.$refs['card' + (index + 1) + '_' + this.sliderId][0];
            args.push({
              element: rightCard.ref,
              property: 'transform.scale',
              expression: rightCardExp
            });
          }
        }

        var gesTokenObj = _indexWeex2.default.bind({
          anchor: element.ref,
          eventType: 'pan',
          props: args
        }, function (e) {
          if (!_this5.isMoving && (e.state === 'end' || e.state === 'cancel' || e.state === 'exit')) {
            _this5.panEnd(e);
          }
        });

        this.gesToken = gesTokenObj.token;
      }
    },
    checkNeedAutoPlay: function checkNeedAutoPlay() {
      var _this6 = this;

      if (this.autoPlay) {
        this.clearAutoPlay();
        this.autoPlayTimer = setInterval(function () {
          _this6.slideTo(_this6.currentIndex, _this6.loopedIndex(_this6.currentIndex + 1, _this6.cardLength));
        }, parseInt(this.interval));
      }
    },
    clearAutoPlay: function clearAutoPlay() {
      this.autoPlayTimer && clearInterval(this.autoPlayTimer);
    },
    rebind: function rebind() {
      var sliderCtn = this.$refs['sliderCtn_' + this.sliderId];
      if (sliderCtn && sliderCtn.ref) {
        _indexWeex2.default.unbind({
          eventType: 'pan',
          token: this.gesToken
        });
        this.gesToken = 0;
        this.bindExp(sliderCtn);
      }
    },
    manualSetPage: function manualSetPage(selectIndex) {
      var _this7 = this;

      this.clearAutoPlay();
      var step = this.currentIndex < selectIndex ? 1 : -1;
      this.slideTo(this.loopedIndex(selectIndex - step, this.cardLength), selectIndex);
      setTimeout(function () {
        _this7.checkNeedAutoPlay();
      }, 3000);
    }
  }
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _option = __webpack_require__(168);

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { Option: _option2.default },
  props: {
    // 标识, 当界面展示多个grid, 防止v-for :key重复
    id: {
      type: String,
      default: 'one'
    },
    // 列数
    cols: {
      type: Number,
      default: 4
    },
    // 是否单选
    single: {
      type: Boolean,
      default: false
    },
    // 数据
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 选择个数限制
    limit: {
      type: Number
    },
    // 用户自定义样式，用于个性化设置option样式
    customStyles: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      dList: this.initList()
    };
  },

  computed: {
    cHackList: function cHackList() {
      var list = this.list,
          cols = this.cols;

      var remainder = list.length % cols;
      var len = remainder ? cols - remainder : 0;

      return Array.apply(null, { length: len });
    }
  },
  watch: {
    list: function list() {
      this.dList = this.initList();
    }
  },
  created: function created() {
    // 行间距
    this.lineSpacing = this.customStyles.lineSpacing || '12px';
  },

  methods: {
    onSelect: function onSelect(index) {
      var checked = this.dList[index].checked;
      if (this.limit <= this.checkedCount && !checked) {
        this.$emit('overLimit', this.limit);
      } else {
        this.updateList(index);
        this.$emit('select', {
          selectIndex: index,
          checked: !checked,
          checkedList: this.dList.filter(function (item) {
            return item.checked;
          })
        });
      }
    },
    initList: function initList() {
      var single = this.single;
      var checkedCount = 0;

      var dList = this.list.map(function (item, i) {
        var checked = item.checked,
            disabled = item.disabled;

        disabled = !!disabled;
        // disabled为true时认为checked无效，同时单选模式下只认为第一个checked为true的为有效值
        checked = !disabled && !!checked && (!single || checkedCount === 0);
        if (item.checked) checkedCount += 1;
        return _extends({}, item, {
          checked: checked,
          disabled: disabled
        });
      });

      this.checkedCount = checkedCount;
      return dList;
    },
    updateList: function updateList(index) {
      var single = this.single;
      var checkedCount = 0;
      this.dList = this.dList.map(function (item, i) {
        if (single) {
          item.checked = index === i && !item.checked;
        } else {
          if (i === index) item.checked = !item.checked;
        }
        if (item.checked) checkedCount += 1;
        return item;
      });
      this.checkedCount = checkedCount;
    }
  }
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    index: {
      type: Number,
      default: -1
    },
    // 是否选中
    checked: {
      type: Boolean,
      default: false
    },
    // 是否可选
    disabled: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '166px'
    },
    height: {
      type: String,
      default: '72px'
    },
    // 默认 x
    icon: {
      type: String,
      default: 'https://gw.alicdn.com/tfs/TB1IAByhgMPMeJjy1XdXXasrXXa-38-34.png'
    },
    // 正常状态文字色值
    color: {
      type: String,
      default: '#3d3d3d'
    },
    // 选中状态文字色值
    checkedColor: {
      type: String,
      default: '#3d3d3d'
    },
    // 不可选状态文字色值
    disabledColor: {
      type: String,
      default: '#9b9b9b'
    },
    // 正常状态边框色值
    borderColor: {
      type: String,
      default: 'transparent'
    },
    // 选中状态边框色值
    checkedBorderColor: {
      type: String,
      default: '#ffb200'
    },
    // 不可选状态边框色值
    disabledBorderColor: {
      type: String,
      default: 'transparent'
    },
    // 正常状态背景色值
    backgroundColor: {
      type: String,
      default: '#f6f6f6'
    },
    // 选中状态背景色值
    checkedBackgroundColor: {
      type: String,
      default: '#ffffff'
    },
    // 不可选状态背景色值
    disabledBackgroundColor: {
      type: String,
      default: '#f6f6f6'
    }
  },
  computed: {
    cWrapperStyle: function cWrapperStyle() {
      var checked = this.checked,
          disabled = this.disabled,
          width = this.width,
          height = this.height,
          borderColor = this.borderColor,
          checkedBorderColor = this.checkedBorderColor,
          disabledBorderColor = this.disabledBorderColor,
          backgroundColor = this.backgroundColor,
          checkedBackgroundColor = this.checkedBackgroundColor,
          disabledBackgroundColor = this.disabledBackgroundColor;

      return {
        width: width,
        height: height,
        borderColor: disabled ? disabledBorderColor : checked ? checkedBorderColor : borderColor,
        backgroundColor: disabled ? disabledBackgroundColor : checked ? checkedBackgroundColor : backgroundColor
      };
    },
    cTitleStyle: function cTitleStyle() {
      var checked = this.checked,
          disabled = this.disabled,
          color = this.color,
          checkedColor = this.checkedColor,
          disabledColor = this.disabledColor;

      return {
        color: disabled ? disabledColor : checked ? checkedColor : color
      };
    }
  },
  methods: {
    onClick: function onClick() {
      if (!this.disabled) {
        this.$emit('select', this.index);
      }
    }
  }
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//

var _type = __webpack_require__(146);

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dom = weex.requireModule('dom');

exports.default = {
  props: {
    name: {
      default: 'success',
      type: String
    },
    size: {
      default: 'small',
      type: String
    },
    iconStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      Icon: _type2.default
    };
  },
  beforeCreate: function beforeCreate() {
    dom.addRule('fontFace', {
      'fontFamily': "weexUiIconFont",
      'src': "url('https://at.alicdn.com/t/font_520368_r89ekv69euahsemi.ttf')"
    });
  },

  computed: {
    mergeStyle: function mergeStyle() {
      var iconStyle = this.iconStyle,
          size = this.size;

      var fontSize = '48px';
      switch (size) {
        case 'xs':
          fontSize = '24px';
          break;
        case 'small':
          fontSize = '48px';
          break;
        case 'medium':
          fontSize = '72px';
          break;
        case 'big':
          fontSize = '128px';
          break;
        default:
          fontSize = '48px';
      }
      return _extends({
        fontFamily: 'weexUiIconFont',
        fontSize: fontSize
      }, iconStyle);
    }
  },
  methods: {
    itemClicked: function itemClicked(name) {
      this.$emit('wxcIconClicked', {
        name: name
      });
    }
  }
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _format = __webpack_require__(147);

var Format = _interopRequireWildcard(_format);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');
exports.default = {
  props: {
    height: {
      type: [Number, String],
      default: _utils2.default.env.getPageHeight()
    },
    normalList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    onlyShowList: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    needAnimation: {
      type: Boolean,
      default: true
    },
    hotListConfig: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    // 城市选择子组件 特殊情况支持
    cityLocationConfig: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    headerStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    navStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    navTextStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    popStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    popTextStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    itemStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    itemTextStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    itemDescStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    groupWrapStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    groupItemStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    groupItemTextStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    groupItemDescStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  created: function created() {
    this.isIPhoneX = _utils2.default.env.isIPhoneX();
  },

  computed: {
    formatList: function formatList() {
      var normalList = this.normalList,
          hotListConfig = this.hotListConfig,
          cityLocationConfig = this.cityLocationConfig;

      return Format.totalList(normalList, hotListConfig, cityLocationConfig);
    }
  },
  data: function data() {
    return {
      popKeyShow: false,
      popKey: '',
      navOffsetY: 0,
      timer: null
    };
  },
  methods: {
    itemClicked: function itemClicked(item) {
      this.$emit('wxcIndexlistItemClicked', {
        item: item
      });
    },
    go2Key: function go2Key(key) {
      var _this = this;

      var keyEl = this.$refs['index-item-title-' + key][0];
      keyEl && dom.scrollToElement(keyEl, {
        offset: 0,
        animated: this.needAnimation
      });
      this.popKey = key;
      this.popKeyShow = true;
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this.popKeyShow = false;
      }, 600);
    }
  }
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _wxcMask = __webpack_require__(11);

var _wxcMask2 = _interopRequireDefault(_wxcMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    WxcMask: _wxcMask2.default
  },
  props: {
    width: {
      type: [Number, String],
      default: 750
    },
    height: {
      type: [Number, String],
      default: 750
    },
    show: {
      type: Boolean,
      default: false
    },
    imageList: Array,
    indicatorColor: {
      type: Object,
      default: function _default() {
        return {
          'item-color': 'rgba(255, 195, 0, .5)',
          'item-selected-color': '#ffc300',
          'item-size': '20px'
        };
      }
    },
    index: {
      type: [Number, String],
      default: 0
    },
    interval: {
      type: [Number, String],
      default: 3000
    },
    opacity: {
      type: [Number, String],
      default: 0.6
    }
  },
  computed: {
    indicatorStyle: function indicatorStyle() {
      return _extends({
        width: this.width + 'px'
      }, this.indicatorColor);
    }
  },
  methods: {
    maskOverlayClick: function maskOverlayClick() {
      this.$emit('wxcLightboxOverlayClicked', {});
    }
  }
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = __webpack_require__(15);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'default'
    },
    interval: {
      type: [Number, String],
      default: 0
    },
    needMask: {
      type: Boolean,
      default: false
    },
    maskStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      showLoading: false,
      tid: 0
    };
  },
  watch: {
    show: function show() {
      this.setShow();
    }
  },
  computed: {
    loading: function loading() {
      var loading = {};
      switch (this.type) {
        case 'trip':
          loading = {
            url: _type.GIF,
            class: 'trip-loading'
          };
          break;
        default:
          loading = {
            url: _type.BLACK_GIF,
            class: 'default-loading'
          };
      }
      return loading;
    },
    topPosition: function topPosition() {
      return (_utils2.default.env.getPageHeight() - 200) / 2;
    }
  },
  created: function created() {
    this.setShow();
  },

  methods: {
    maskClicked: function maskClicked() {
      this.needMask && this.$emit('wxcLoadingMaskClicked', {});
    },
    setShow: function setShow() {
      var _this = this;

      var interval = this.interval,
          show = this.show,
          showLoading = this.showLoading;

      var stInterval = parseInt(interval);
      clearTimeout(this.tid);
      if (show) {
        if (showLoading) {
          return;
        }
        if (stInterval === 0) {
          this.showLoading = true;
        } else {
          this.tid = setTimeout(function () {
            _this.showLoading = true;
          }, stInterval);
        }
      } else {
        this.showLoading = false;
      }
    }
  }
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rainItem = __webpack_require__(174);

var _rainItem2 = _interopRequireDefault(_rainItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { RainItem: _rainItem2.default },
  props: {
    picList: Array,
    config: Object,
    wrapStyle: Object
  },
  methods: {
    wxcLotteryRainCaught: function wxcLotteryRainCaught(e) {
      this.$emit('wxcLotteryRainCaught', { rainId: e.rainId });
    },
    destroy: function destroy() {
      var picList = this.picList;

      var length = picList.length;
      for (var i = 0; i < length; i++) {
        this.$refs['rain-item-' + i][0].destroy();
      }
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _animate = __webpack_require__(148);

var Ani = _interopRequireWildcard(_animate);

var _config = __webpack_require__(149);

var CFG = _interopRequireWildcard(_config);

var _region = __webpack_require__(150);

var _region2 = _interopRequireDefault(_region);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  props: {
    src: String,
    rainId: [String, Number],
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    // 合并用户配置和默认
    cfg: function cfg() {
      return _extends({}, CFG.DEFAULT, this.config);
    }
  },
  data: function data() {
    return {
      showItem: false,
      hiding: false,
      pos: {},
      showTimer: null,
      hideTimer: null,
      intervalTimer: null
    };
  },
  created: function created() {
    var _cfg = this.cfg,
        width = _cfg.width,
        height = _cfg.height;

    this.pos = _region2.default.get(width, height);
  },
  mounted: function mounted() {
    this.start();
  },

  methods: {
    start: function start() {
      var _this = this;

      var cfg = this.cfg;

      var random = Math.round(Math.random() * cfg.randomTime);
      var showTime = cfg.showTime + random;
      var intervalTime = Math.max(cfg.intervalTime, cfg.showAniTime + showTime + cfg.hideAniTime) + random;

      this.onShow = function () {
        _this.hideTimer = setTimeout(function () {
          _this.hide();
        }, showTime);
      };

      this.onHide = function () {
        _region2.default.remove(_this.pos);
        _this.pos = {};
        _this.showItem = false;
        _this.hiding = false;
        var _cfg2 = _this.cfg,
            width = _cfg2.width,
            height = _cfg2.height;

        _this.pos = _region2.default.get(width, height);
      };

      this.showTimer = setTimeout(function () {
        _this.show();
      }, random);

      this.intervalTimer = setInterval(function () {
        _this.show();
      }, intervalTime);
    },
    hide: function hide() {
      var cfg = this.cfg,
          rainId = this.rainId;

      this.hiding = true;
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      Ani.hidePig(this.$refs['rain-item-' + rainId], cfg.hideAniTime, this.onHide);
    },
    show: function show() {
      var cfg = this.cfg,
          rainId = this.rainId;

      this.showItem = true;
      Ani.showPig(this.$refs['rain-item-' + rainId], cfg.showAniTime, this.onShow);
    },
    caught: function caught() {
      var _this2 = this;

      var rainId = this.rainId,
          hiding = this.hiding;

      if (hiding) return;
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      Ani.shakePig(this.$refs['rain-item-' + rainId], function () {
        _this2.hide();
      });
      this.$emit('wxcLotteryRainCaught', { rainId: rainId });
    },
    destroy: function destroy() {
      _region2.default.remove(this.pos);
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      clearInterval(this.intervalTimer);
      this.showItem = false;
    }
  }
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _wxcOverlay = __webpack_require__(6);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
exports.default = {
  components: { WxcOverlay: _wxcOverlay2.default },
  props: {
    height: {
      type: [String, Number],
      default: 800
    },
    width: {
      type: [String, Number],
      default: 702
    },
    top: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    },
    duration: {
      type: [String, Number],
      default: 300
    },
    hasOverlay: {
      type: Boolean,
      default: true
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    timingFunction: {
      type: Array,
      default: function _default() {
        return ['ease-in', 'ease-out'];
      }
    },
    overlayCfg: {
      type: Object,
      default: function _default() {
        return {
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          canAutoClose: true,
          duration: 300,
          opacity: 0.6
        };
      }
    },
    borderRadius: {
      type: [String, Number],
      default: 0
    },
    overlayCanClose: {
      type: Boolean,
      default: true
    },
    maskBgColor: {
      type: String,
      default: '#ffffff'
    },
    opacity: {
      type: [Number, String],
      default: 0.6
    }
  },
  data: function data() {
    return {
      closeIcon: 'https://gw.alicdn.com/tfs/TB1qDJUpwMPMeJjy1XdXXasrXXa-64-64.png',
      maskTop: 264,
      opened: false
    };
  },
  computed: {
    mergeOverlayCfg: function mergeOverlayCfg() {
      return _extends({}, this.overlayCfg, {
        hasAnimation: this.hasAnimation
      });
    },
    maskStyle: function maskStyle() {
      var width = this.width,
          height = this.height,
          showClose = this.showClose,
          hasAnimation = this.hasAnimation,
          opened = this.opened,
          top = this.top;

      var newHeight = showClose ? height - 0 + 100 : height;
      var _weex$config$env = weex.config.env,
          deviceHeight = _weex$config$env.deviceHeight,
          deviceWidth = _weex$config$env.deviceWidth,
          platform = _weex$config$env.platform;

      var _deviceHeight = deviceHeight || 1334;
      var isWeb = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && platform.toLowerCase() === 'web';
      var navHeight = isWeb ? 0 : 130;
      var pageHeight = _deviceHeight / deviceWidth * 750 - navHeight;
      return {
        width: width + 'px',
        height: newHeight + 'px',
        left: (750 - width) / 2 + 'px',
        top: (top || (pageHeight - height) / 2) + 'px',
        opacity: hasAnimation && !opened ? 0 : 1
      };
    },
    contentStyle: function contentStyle() {
      return {
        width: this.width + 'px',
        backgroundColor: this.maskBgColor,
        height: this.height + 'px',
        borderRadius: this.borderRadius + 'px'
      };
    },
    shouldShow: function shouldShow() {
      var _this = this;

      var show = this.show,
          hasAnimation = this.hasAnimation;

      hasAnimation && setTimeout(function () {
        _this.appearMask(show);
      }, 50);
      return show;
    }
  },
  methods: {
    closeIconClicked: function closeIconClicked() {
      this.appearMask(false);
    },
    wxcOverlayBodyClicking: function wxcOverlayBodyClicking() {
      if (this.hasAnimation) {
        this.appearMask(false);
        this.$emit('wxcOverlayBodyClicking', {});
      }
    },
    wxcOverlayBodyClicked: function wxcOverlayBodyClicked() {
      if (!this.hasAnimation) {
        this.appearMask(false);
        this.$emit('wxcOverlayBodyClicked', {});
      }
    },
    needEmit: function needEmit() {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.opened = bool;
      !bool && this.$emit('wxcMaskSetHidden', {});
    },
    appearMask: function appearMask(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;
      var hasAnimation = this.hasAnimation,
          timingFunction = this.timingFunction;

      var maskEl = this.$refs['wxc-mask'];
      if (hasAnimation && maskEl) {
        animation.transition(maskEl, {
          styles: {
            opacity: bool ? 1 : 0
          },
          duration: duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0
        }, function () {
          _this2.needEmit(bool);
        });
      } else {
        this.needEmit(bool);
      }
    }
  }
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var Navigator = weex.requireModule('navigator');
exports.default = {
  props: {
    backgroundColor: {
      type: String,
      default: '#FFC900'
    },
    leftButton: {
      type: String,
      default: 'https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png'
    },
    textColor: {
      type: String,
      default: '#3D3D3D'
    },
    rightButton: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '标题'
    },
    leftText: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    },
    useDefaultReturn: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    },
    barStyle: {
      type: Object
    }
  },
  computed: {
    newBarStyle: function newBarStyle() {
      var backgroundColor = this.backgroundColor,
          barStyle = this.barStyle;

      return _extends({
        backgroundColor: backgroundColor
      }, barStyle);
    }
  },
  methods: {
    leftButtonClicked: function leftButtonClicked() {
      if (this.useDefaultReturn) {
        Navigator.pop({}, function (e) {});
      }
      this.$emit('wxcMinibarLeftButtonClicked', {});
    },
    rightButtonClicked: function rightButtonClicked() {
      var hasRightContent = this.rightText || this.rightButton || this.$slots && this.$slots.right;
      hasRightContent && this.$emit('wxcMinibarRightButtonClicked', {});
    }
  }
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = __webpack_require__(151);

var _type2 = _interopRequireDefault(_type);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    notice: {
      type: String,
      default: ''
    },
    noticeUrl: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: ''
    },
    lines: {
      type: [Number, String],
      default: 1
    },
    type: {
      type: String,
      default: ''
    },
    spm: {
      type: String,
      default: ''
    }
  },
  computed: {
    contentWidth: function contentWidth() {
      return this.mode ? 605 : 683;
    },
    modeIcon: function modeIcon() {
      var modeIcon = void 0;
      switch (this.mode) {
        case 'link':
          modeIcon = _type2.default.linkIcon;
          break;
        case 'closable':
          modeIcon = _type2.default.closeIcon;
          break;
        default:
          modeIcon = '';
      }
      return modeIcon;
    },
    typeIcon: function typeIcon() {
      var typeIcon = void 0;
      switch (this.type) {
        case 'success':
          typeIcon = _type2.default.successIcon;
          break;
        case 'error':
          typeIcon = _type2.default.errorIcon;
          break;
        case 'info':
          typeIcon = _type2.default.infoIcon;
          break;
        case 'question':
          typeIcon = _type2.default.questionIcon;
          break;
        case 'warn':
          typeIcon = _type2.default.warnIcon;
          break;
        case 'time':
          typeIcon = _type2.default.timeIcon;
          break;
        case 'redbag':
          typeIcon = _type2.default.redbag;
          break;
        default:
          typeIcon = '';
      }
      return typeIcon;
    }
  },
  data: function data() {
    return {
      show: true
    };
  },
  methods: {
    noticeBarClicked: function noticeBarClicked() {
      var mode = this.mode,
          noticeUrl = this.noticeUrl,
          spm = this.spm;

      if (mode === 'link' && noticeUrl) {
        var ttid = weex.config.env.ttid;

        _utils2.default.goToH5Page(noticeUrl, spm, ttid, true);
        this.$emit('wxcNoticebarLinkClicked', { url: noticeUrl });
      }
    },
    noticeIconClicked: function noticeIconClicked() {
      var mode = this.mode;

      if (mode === 'closable') {
        this.show = false;
        this.$emit('wxcNoticebarCloseClicked', {});
      } else {
        this.noticeBarClicked();
      }
    }
  }
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
exports.default = {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    top: {
      type: Number,
      default: 0
    },
    left: _defineProperty({
      default: Number
    }, 'default', 0),
    hasAnimation: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    timingFunction: {
      type: Array,
      default: function _default() {
        return ['ease-in', 'ease-out'];
      }
    },
    opacity: {
      type: [Number, String],
      default: 0.6
    },
    canAutoClose: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    overlayStyle: function overlayStyle() {
      return {
        opacity: this.hasAnimation ? 0 : 1,
        backgroundColor: 'rgba(0, 0, 0,' + this.opacity + ')',
        left: _utils2.default.env.isWeb() ? this.left + 'px' : 0,
        top: this.top
      };
    },
    shouldShow: function shouldShow() {
      var _this = this;

      var show = this.show,
          hasAnimation = this.hasAnimation;

      hasAnimation && setTimeout(function () {
        _this.appearOverlay(show);
      }, 50);
      return show;
    }
  },
  methods: {
    overlayClicked: function overlayClicked(e) {
      this.canAutoClose ? this.appearOverlay(false) : this.$emit('wxcOverlayBodyClicked', {});
    },
    appearOverlay: function appearOverlay(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.duration;
      var hasAnimation = this.hasAnimation,
          timingFunction = this.timingFunction,
          canAutoClose = this.canAutoClose;

      var needEmit = !bool && canAutoClose;
      needEmit && this.$emit('wxcOverlayBodyClicking', {});
      var overlayEl = this.$refs['wxc-overlay'];
      if (hasAnimation && overlayEl) {
        animation.transition(overlayEl, {
          styles: {
            opacity: bool ? 1 : 0
          },
          duration: duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0
        }, function () {
          needEmit && _this2.$emit('wxcOverlayBodyClicked', {});
        });
      } else {
        needEmit && this.$emit('wxcOverlayBodyClicked', {});
      }
    }
  }
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _format = __webpack_require__(152);

var Format = _interopRequireWildcard(_format);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _wxcMinibar = __webpack_require__(12);

var _wxcMinibar2 = _interopRequireDefault(_wxcMinibar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var isWeb = _utils2.default.env.isWeb();

var dom = weex.requireModule('dom');

exports.default = {
  components: { WxcMinibar: _wxcMinibar2.default },
  props: {
    selectedDate: Array,
    animationType: {
      type: String,
      default: 'push'
    },
    dateRange: {
      type: Array,
      required: true,
      default: function _default() {
        return [];
      }
    },
    minibarCfg: {
      type: Object,
      default: function _default() {
        return {
          'title': '选择日期',
          'background-color': '#FFC900',
          'text-color': '#3D3D3D'
        };
      }
    },
    showHeader: {
      type: Boolean,
      default: false
    },
    selectedNote: {
      type: Array,
      default: function _default() {
        return ['开始', '到达', '往返'];
      }
    },
    isRange: {
      type: Boolean,
      default: false
    },
    needDestroy: {
      type: Boolean,
      default: false
    },
    descList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    selectedCellStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    selectedTextStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      isShow: false,
      reSelect: true,
      today: Format.getToDay(),
      departDate: '',
      arriveDate: ''
    };
  },
  computed: {
    calendarExtendStyle: function calendarExtendStyle() {
      return _utils2.default.uiStyle.pageTransitionAnimationStyle(this.animationType);
    },
    monthsArray: function monthsArray() {
      var range = this.dateRange,
          today = this.today,
          departDate = this.departDate,
          arriveDate = this.arriveDate,
          selectedNote = this.selectedNote,
          descList = this.descList;

      var param = { range: range, today: today, departDate: departDate, arriveDate: arriveDate, selectedNote: selectedNote, descList: descList };
      return Format.generateDateCell(param);
    }
  },
  created: function created() {
    this.isIPhoneX = _utils2.default.env.isIPhoneX();
    this.showTitle = isWeb || this.showHeader;
    this.detectShow();
  },
  mounted: function mounted() {
    var _this = this;

    var needDestroy = this.needDestroy;

    var hold = isWeb ? 700 : 100;
    !needDestroy && setTimeout(function () {
      _this.isShow = true;
      _this.scrollToDate();
    }, hold);
  },

  watch: {
    needDestroy: function needDestroy(newVal, preVal) {
      var _this2 = this;

      if (!newVal && newVal !== preVal) {
        setTimeout(function () {
          _this2.isShow = true;
        }, 200);
      }
    }
  },
  methods: {
    minibarLeftButtonClick: function minibarLeftButtonClick() {
      var _this3 = this;

      setTimeout(function () {
        _this3.hide();
        _this3.$emit('wxcPageCalendarBackClicked', {});
      }, 100);
    },
    onClickDate: function onClickDate(datConfig) {
      var self = this;
      if (datConfig.disabled || datConfig.isEmpty) return;

      if (self.reSelect) {
        self.departDate = '';
        self.arriveDate = '';
        self.reSelect = false;
      }

      if (self.isRange) {
        if (self.departDate && Date.parse(self.departDate) <= Date.parse(datConfig.date)) {
          self.arriveDate = datConfig.date;
        } else {
          self.departDate = datConfig.date;
        }
        if (self.departDate && self.arriveDate) {
          self.dispatchDateChange([self.departDate, self.arriveDate]);
        }
      } else {
        self.departDate = datConfig.date;
        self.dispatchDateChange([self.departDate]);
      }
    },
    scrollToDate: function scrollToDate() {
      var _this4 = this;

      setTimeout(function () {
        if (_this4.departDate) {
          var el = _this4.$refs.departDate[0];
          el && dom.getComponentRect && dom.getComponentRect(el, function (e) {
            if (e && e.result) {
              var bottom = e.size.bottom;
              var env = weex.config.env;
              // 误差

              var height = env.deviceHeight / env.deviceWidth * 750 - 50;
              if (bottom > height || bottom === 0) {
                dom.scrollToElement(el, { offset: -146, animated: false });
              }
            }
          });
        }
      }, 10);
    },
    dispatchDateChange: function dispatchDateChange(dateArr) {
      var _this5 = this;

      var duration = isWeb ? 400 : 600;
      setTimeout(function () {
        _this5.hide();
      }, duration);
      this.$emit('wxcPageCalendarDateSelected', {
        date: dateArr
      });
    },
    detectShow: function detectShow() {
      if (this.isRange && this.selectedDate.length >= 2) {
        this.departDate = this.selectedDate[0];
        this.arriveDate = this.selectedDate[1];
      } else if (this.selectedDate.length >= 1) {
        this.departDate = this.selectedDate[0];
        this.arriveDate = '';
      }
    },
    _animate: function _animate(status) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var ref = this.$refs.pageCalendar;
      if (this.animationType === 'push') {
        _utils2.default.animation.pageTransitionAnimation(ref, 'translateX(' + (status ? -750 : 750) + 'px)', status, callback);
      } else if (this.animationType === 'model') {
        _utils2.default.animation.pageTransitionAnimation(ref, 'translateY(' + (status ? -_utils2.default.env.getScreenHeight() : _utils2.default.env.getScreenHeight()) + 'px)', status, callback);
      }
    },
    show: function show() {
      var needDestroy = this.needDestroy;

      needDestroy && (this.isShow = true);
      this.reSelect = true;
      this.detectShow();
      this._animate(true);
      needDestroy && this.scrollToDate();
    },
    hide: function hide() {
      this.needDestroy && (this.isShow = false);
      this.reSelect = false;
      this._animate(false);
      this.$emit('wxcPageCalendarHide', {});
    }
  }
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _indexWeex = __webpack_require__(4);

var _indexWeex2 = _interopRequireDefault(_indexWeex);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _bindEnv = __webpack_require__(5);

var _bindEnv2 = _interopRequireDefault(_bindEnv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    url: {
      type: String,
      default: ''
    },
    needSlider: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      isPanning: false,
      appearMap: [],
      supportAndroid: _bindEnv2.default.supportsEBForAndroid()
    };
  },
  mounted: function mounted() {
    var _this = this;

    setTimeout(function () {
      if (_this.supportAndroid && _this.needSlider) {
        var element = _this.$refs['wxc-pan-item'];
        _indexWeex2.default.prepare && _indexWeex2.default.prepare({
          anchor: element.ref,
          eventType: 'pan'
        });
      }
    }, 300);
  },

  methods: {
    itemClicked: function itemClicked() {
      if (this.isPanning) {
        return;
      }
      this.url && _utils2.default.goToH5Page(this.url, true);
      this.$emit('wxcPanItemClicked', { extId: this.extId });
    },
    dispatchPan: function dispatchPan(e) {
      var _this2 = this;

      if (this.supportAndroid && this.needSlider) {
        if (e.state === 'start') {
          this.isPanning = true;
          var element = this.$refs['wxc-pan-item'];
          element && this.$emit('wxcPanItemPan', { element: element });
        } else if (e.state === 'end') {
          setTimeout(function () {
            _this2.isPanning = false;
          }, 50);
        }
      }
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = __webpack_require__(15);

exports.default = {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 36
    },
    height: {
      type: [Number, String],
      default: 36
    }
  },
  data: function data() {
    return {
      PART: _type.PART
    };
  },
  computed: {
    loadingStyle: function loadingStyle() {
      var height = this.height,
          width = this.width;

      return {
        height: height + 'px',
        width: width + 'px'
      };
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
exports.default = {
  props: {
    buttons: {
      type: Array,
      default: []
    },
    position: {
      type: Object,
      default: function _default() {
        return {
          x: 0,
          y: 0
        };
      }
    },
    arrowPosition: {
      type: Object,
      default: function _default() {
        return {
          pos: 'top',
          x: 0,
          y: 0
        };
      }
    },
    coverColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    textStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      show: false,
      showIn: false
    };
  },
  computed: {
    coverStyle: function coverStyle() {
      return this.coverColor ? { backgroundColor: this.coverColor, opacity: this.hasAnimation || !this.showIn ? '0' : '1' } : '';
    },
    transformOrigin: function transformOrigin() {
      var _arrowPosition = this.arrowPosition,
          _arrowPosition$x = _arrowPosition.x,
          x = _arrowPosition$x === undefined ? 0 : _arrowPosition$x,
          _arrowPosition$y = _arrowPosition.y,
          y = _arrowPosition$y === undefined ? 0 : _arrowPosition$y,
          _arrowPosition$pos = _arrowPosition.pos,
          pos = _arrowPosition$pos === undefined ? 'top' : _arrowPosition$pos;

      var _origins = [];
      switch (pos) {
        case 'top':
        case 'bottom':
          _origins = [x < 0 ? 'right' : 'left', pos];
          break;
        case 'left':
        case 'right':
          _origins = [pos, y < 0 ? 'bottom' : 'top'];
          break;
      }
      return _origins.join(' ');
    },
    contentTransform: function contentTransform() {
      var _arrowPosition$pos2 = this.arrowPosition.pos,
          pos = _arrowPosition$pos2 === undefined ? 'top' : _arrowPosition$pos2;
      var _arrowPosition2 = this.arrowPosition,
          _arrowPosition2$x = _arrowPosition2.x,
          x = _arrowPosition2$x === undefined ? 0 : _arrowPosition2$x,
          _arrowPosition2$y = _arrowPosition2.y,
          y = _arrowPosition2$y === undefined ? 0 : _arrowPosition2$y;

      var _translates = ['scale(0)'];
      if (x >= 0 && x < 22) {
        x = 22;
      } else if (x < 0 && x > -22) {
        x = -22;
      }
      if (y >= 0 && y < 22) {
        y = 22;
      } else if (y < 0 && y > -22) {
        y = -22;
      }
      switch (pos) {
        case 'top':
        case 'bottom':
          _translates[1] = 'translateX(' + (x < 0 ? x - 15 : x + 15) + 'px)';
          break;
        case 'left':
        case 'right':
          _translates[1] = 'translateY(' + (y < 0 ? y - 15 : y + 15) + 'px)';
          break;
      }
      return _translates.join(' ');
    },
    contentStyle: function contentStyle() {
      var _position = this.position,
          _position$x = _position.x,
          x = _position$x === undefined ? 0 : _position$x,
          _position$y = _position.y,
          y = _position$y === undefined ? 0 : _position$y;

      var style = {};
      x < 0 ? style.right = -x + 'px' : style.left = x + 'px';
      y < 0 ? style.bottom = -y + 'px' : style.top = y + 'px';
      style.opacity = this.hasAnimation || !this.showIn ? '0' : '1';
      style.transform = this.hasAnimation || !this.showIn ? this.contentTransform : 'scale(1)';
      style.transformOrigin = this.transformOrigin;
      return style;
    },
    arrowStyle: function arrowStyle() {
      var _arrowPosition3 = this.arrowPosition,
          _arrowPosition3$x = _arrowPosition3.x,
          x = _arrowPosition3$x === undefined ? 0 : _arrowPosition3$x,
          _arrowPosition3$y = _arrowPosition3.y,
          y = _arrowPosition3$y === undefined ? 0 : _arrowPosition3$y;
      var _arrowPosition$pos3 = this.arrowPosition.pos,
          pos = _arrowPosition$pos3 === undefined ? 'top' : _arrowPosition$pos3;

      var style = {};
      switch (pos) {
        case 'top':
          style.top = '6px';
        case 'bottom':
          //eslint-disable-line
          !style.top && (style.bottom = '6px');
          style.transform = 'scaleX(0.8) rotate(45deg)';
          if (x >= 0 && x < 22) {
            x = 22;
          } else if (x < 0 && x > -22) {
            x = -22;
          }
          x < 0 ? style.right = -x + 'px' : style.left = x + 'px';
          break;
        case 'left':
          style.left = '6px';
        case 'right':
          //eslint-disable-line
          !style.left && (style.right = '6px');
          style.transform = 'scaleY(0.8) rotate(45deg)';
          if (y >= 0 && y < 22) {
            y = 22;
          } else if (y < 0 && y > -22) {
            y = -22;
          }
          y < 0 ? style.bottom = -y + 'px' : style.top = y + 'px';
          break;
        default:
          break;
      }
      return style;
    }
  },
  methods: {
    wxcPopoverShow: function wxcPopoverShow() {
      var _this = this;

      if (this.animationLock) {
        return;
      }
      this.show = true;
      if (this.hasAnimation) {
        setTimeout(function () {
          return _this.wxcPopoverAnimationShow();
        }, 40);
      } else {
        setTimeout(function () {
          return _this.showIn = true;
        }, 40);
      }
    },

    /**
    * smooth in
    **/
    wxcPopoverAnimationShow: function wxcPopoverAnimationShow() {
      var _this2 = this;

      var popoverEl = this.$refs['wxc-popover'];
      var coverEl = this.$refs['wxc-cover'];
      if (!coverEl || !popoverEl) {
        return;
      }
      this.setAnimationLock();
      var a1End = false;
      var a2End = false;
      animation.transition(popoverEl, {
        styles: {
          opacity: 1,
          transform: 'scale(1)',
          transformOrigin: this.transformOrigin
        },
        delay: 0,
        duration: 250,
        timingFunction: 'ease-out'
      }, function (e) {
        a1End = true;
        if (a1End && a2End) {
          _this2.animationLock = false;
        }
      });

      animation.transition(coverEl, {
        styles: {
          opacity: 1
        },
        delay: 0,
        duration: 250,
        timingFunction: 'ease-in'
      }, function (e) {
        a2End = true;
        if (a1End && a2End) {
          _this2.animationLock = false;
        }
      });
    },
    wxcButtonClicked: function wxcButtonClicked(index, key) {
      if (this.animationLock) {
        return;
      }
      this.$emit('wxcPopoverButtonClicked', { key: key, index: index });
      this.hideAction();
    },

    /**
       * 隐藏操作
       */
    hideAction: function hideAction() {
      var _this3 = this;

      if (this.animationLock) {
        return;
      }
      if (this.hasAnimation) {
        this.setAnimationLock();
        var popoverEl = this.$refs['wxc-popover'];
        var coverEl = this.$refs['wxc-cover'];
        if (!popoverEl || !coverEl) {
          return;
        }
        var a1End = false;
        var a2End = false;
        animation.transition(popoverEl, {
          styles: {
            opacity: 0,
            transform: this.contentTransform,
            transformOrigin: this.transformOrigin
          },
          duration: 250
        }, function () {
          a1End = true;
          if (a1End && a2End) {
            _this3.show = false;
            _this3.showIn = false;
            _this3.animationLock = false;
          }
        });
        animation.transition(coverEl, {
          styles: {
            opacity: 0
          },
          duration: 250
        }, function () {
          a2End = true;
          if (a1End && a2End) {
            _this3.show = false;
            _this3.showIn = false;
            _this3.animationLock = false;
          }
        });
      } else {
        this.show = false;
        this.showIn = false;
      }
    },

    /**
       * 设置动画锁
       */
    setAnimationLock: function setAnimationLock() {
      this.animationLock = true;
    }
  }
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _wxcOverlay = __webpack_require__(6);

var _wxcOverlay2 = _interopRequireDefault(_wxcOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');
exports.default = {
  components: { WxcOverlay: _wxcOverlay2.default },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    pos: {
      type: String,
      default: 'bottom'
    },
    popupColor: {
      type: String,
      default: '#FFFFFF'
    },
    overlayCfg: {
      type: Object,
      default: function _default() {
        return {
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          duration: 300,
          opacity: 0.6
        };
      }
    },
    height: {
      type: [Number, String],
      default: 840
    },
    standOut: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 750
    },
    animation: {
      type: Object,
      default: function _default() {
        return {
          timingFunction: 'ease-in'
        };
      }
    }
  },
  data: function data() {
    return {
      haveOverlay: true,
      isOverShow: true
    };
  },
  computed: {
    isNeedShow: function isNeedShow() {
      var _this = this;

      setTimeout(function () {
        _this.appearPopup(_this.show);
      }, 50);
      return this.show;
    },
    _height: function _height() {
      this.appearPopup(this.show, 150);
      return this.height;
    },
    padStyle: function padStyle() {
      var pos = this.pos,
          width = this.width,
          height = this.height,
          popupColor = this.popupColor,
          standOut = this.standOut;

      var stand = parseInt(standOut, 10);
      var style = {
        width: width + 'px',
        backgroundColor: popupColor
      };
      pos === 'top' && (style = _extends({}, style, {
        top: -height + stand + 'px',
        height: height + 'px'
      }));
      pos === 'bottom' && (style = _extends({}, style, {
        bottom: -height + stand + 'px',
        height: height + 'px'
      }));
      pos === 'left' && (style = _extends({}, style, {
        left: -width + stand + 'px'
      }));
      pos === 'right' && (style = _extends({}, style, {
        right: -width + stand + 'px'
      }));
      return style;
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // 在支付宝上面有点击穿透问题
      var platform = weex.config.env.platform;

      platform === 'Web' && e.preventDefault && e.preventDefault();
    },
    hide: function hide() {
      this.appearPopup(false);
      this.$refs.overlay.appearOverlay(false);
    },
    wxcOverlayBodyClicking: function wxcOverlayBodyClicking() {
      this.isShow && this.appearPopup(false);
    },
    appearPopup: function appearPopup(bool) {
      var _this2 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

      this.isShow = bool;
      var popupEl = this.$refs['wxc-popup'];
      if (!popupEl) {
        return;
      }
      animation.transition(popupEl, _extends({
        styles: {
          transform: this.getTransform(this.pos, this.width, this.height, !bool)
        },
        duration: duration,
        delay: 0
      }, this.animation), function () {
        if (!bool) {
          _this2.$emit('wxcPopupOverlayClicked', { pos: _this2.pos });
        }
      });
    },
    getTransform: function getTransform(pos, width, height, bool) {
      var _size = pos === 'top' || pos === 'bottom' ? height : width;
      bool && (_size = 0);
      var _transform = void 0;
      switch (pos) {
        case 'top':
          _transform = 'translateY(' + _size + 'px)';
          break;
        case 'bottom':
          _transform = 'translateY(-' + _size + 'px)';
          break;
        case 'left':
          _transform = 'translateX(' + _size + 'px)';
          break;
        case 'right':
          _transform = 'translateX(-' + _size + 'px)';
          break;
      }
      return _transform;
    }
  }
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    barColor: {
      type: String,
      default: '#FFC900'
    },
    barWidth: {
      type: Number,
      default: 600
    },
    barHeight: {
      type: Number,
      default: 8
    },
    barRadius: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    backgroundColor: {
      type: String,
      default: '#f2f3f4'
    }
  },
  computed: {
    runWayStyle: function runWayStyle() {
      var barWidth = this.barWidth,
          barHeight = this.barHeight,
          barRadius = this.barRadius,
          backgroundColor = this.backgroundColor;

      return {
        width: barWidth + 'px',
        height: barHeight + 'px',
        borderRadius: barRadius + 'px',
        backgroundColor: backgroundColor
      };
    },
    progressStyle: function progressStyle() {
      var value = this.value,
          barWidth = this.barWidth,
          barHeight = this.barHeight,
          barColor = this.barColor,
          barRadius = this.barRadius;

      var newValue = value < 0 ? 0 : value > 100 ? 100 : value;
      return {
        backgroundColor: barColor,
        borderRadius: barRadius + 'px',
        height: barHeight + 'px',
        width: newValue / 100 * barWidth + 'px'
      };
    }
  }
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _item = __webpack_require__(186);

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { wxcRadio: _item2.default },
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      checkedIndex: -1
    };
  },
  computed: {
    updateList: function updateList() {
      var checkedIndex = this.checkedIndex,
          list = this.list;

      var updateList = [];
      list && list.forEach(function (item, i) {
        item.checked = i === checkedIndex;
        updateList.push(item);
      });
      return updateList;
    }
  },
  watch: {
    list: function list(newList) {
      this.setListChecked(newList);
    }
  },
  created: function created() {
    this.setListChecked(this.list);
  },

  methods: {
    setListChecked: function setListChecked(list) {
      var _this = this;

      if (list && list.length > 0) {
        list.forEach(function (item, i) {
          item.checked && (_this.checkedIndex = i);
        });
      }
    },
    wxcRadioItemChecked: function wxcRadioItemChecked(i, e) {
      var oldIndex = this.checkedIndex;
      var _list$i = this.list[i],
          value = _list$i.value,
          title = _list$i.title;

      this.checkedIndex = i;
      this.$emit('wxcRadioListChecked', { value: value, title: title, oldIndex: oldIndex, index: i });
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wxcCell = __webpack_require__(7);

var _wxcCell2 = _interopRequireDefault(_wxcCell);

var _type = __webpack_require__(153);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: { WxcCell: _wxcCell2.default },
  props: {
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      require: true
    },
    value: {
      type: [String, Number, Object],
      require: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      icon: [_type.CHECKED, _type.DISABLED]
    };
  },
  computed: {
    radioIcon: function radioIcon() {
      var icon = this.icon,
          disabled = this.disabled,
          checked = this.checked,
          config = this.config;

      var mergeIcon = icon;
      config.checkedIcon && (mergeIcon[0] = config.checkedIcon);
      config.disabledIcon && (mergeIcon[1] = config.disabledIcon);
      return checked ? mergeIcon[disabled ? 1 : 0] : '';
    },
    backgroundColor: function backgroundColor() {
      var disabled = this.disabled;

      return disabled ? '#F2F3F4' : '#FFFFFF';
    },
    color: function color() {
      var disabled = this.disabled,
          checked = this.checked,
          config = this.config;

      var checkedColor = '#EE9900';
      config.checkedColor && (checkedColor = config.checkedColor);
      return checked && !disabled ? checkedColor : '#3D3D3D';
    }
  },
  methods: {
    wxcCellClicked: function wxcCellClicked() {
      var disabled = this.disabled,
          value = this.value;

      if (!disabled) {
        this.$emit('wxcRadioItemChecked', { value: value, disabled: disabled });
      }
    }
  }
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(4);

var _index2 = _interopRequireDefault(_index);

var _bindEnv = __webpack_require__(5);

var _bindEnv2 = _interopRequireDefault(_bindEnv);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var animation = weex.requireModule('animation');

// 减少打包体积


var ICON_ARROW_DOWN = 'https://img.alicdn.com/tfs/TB1A8faeTtYBeNjy1XdXXXXyVXa-48-48.png';

exports.default = {
  props: {
    scrollerRef: String,
    maxTime: {
      type: Number,
      default: 0
    },
    mainText: {
      type: String,
      default: '下拉即可刷新...'
    },
    pullingText: {
      type: String,
      default: '释放即可刷新...'
    },
    refreshingText: {
      type: String,
      default: '加载中...'
    },
    textWidth: {
      type: Number,
      default: 200
    }
  },
  data: function data() {
    return {
      ICON_ARROW_DOWN: ICON_ARROW_DOWN,
      refreshing: false,
      couldUnLash: false
    };
  },

  computed: {
    newStyleFlag: function newStyleFlag() {
      return this.scrollerRef && _bindEnv2.default.supportsEBForIos();
    },
    refresherText: function refresherText() {
      return this.refreshing ? this.refreshingText : this.pText;
    },
    pText: function pText() {
      return this.couldUnLash ? this.pullingText : this.mainText;
    }
  },
  created: function created() {
    this.newStyleFlag && this.animationBinding();
  },
  beforeDestroy: function beforeDestroy() {
    this.bindingsDestroy();
  },

  methods: {
    onRefresh: function onRefresh(event) {
      var _this = this;

      this.$emit('wxcRefresh', event);
      this.refreshing = true;
      this.newStyleFlag && this.cycleGoRound();
      if (this.maxTime <= 0) return;
      this.timeoutSto && clearTimeout(this.timeoutSto);
      this.timeoutSto = setTimeout(function () {
        _this.$emit('wxcTimeout');
        _this.wxcCancel();
      }, this.maxTime);
    },

    /**
     * 取消 refreshing
     */
    wxcCancel: function wxcCancel() {
      this.refreshing = false;
      this.timeoutSto && clearTimeout(this.timeoutSto);
      this.roundingDestroy();
    },

    /**
     * 下拉事件
     */
    onPullingDown: function onPullingDown(event) {
      this.$emit('wxcPullingDown', event);
      var pd = event.pullingDistance * (_utils2.default.env.isIOS() ? -1 : 1);
      pd > (_utils2.default.env.isAndroid() ? 200 : 140) ? this.couldUnLash = true : this.couldUnLash = false;
      if (this.refreshing && pd < 20) {
        this.timeoutSto && clearTimeout(this.timeoutSto);
        this.refreshing = false;
        this.roundingDestroy();
      }
    },

    /**
     * 注册 bindingx
     */
    animationBinding: function animationBinding() {
      var _this2 = this;

      setTimeout(function () {
        // 降级版本取不到，需要注意
        var scroller = _this2.$parent.$refs[_this2.scrollerRef].ref;
        var cover2 = _this2.$refs['cover2'].ref;
        var coverCycle = _this2.$refs['cover-cycle'].ref;

        var bindingResult = _index2.default.bind({
          eventType: 'scroll',
          anchor: scroller,
          props: [{
            element: cover2,
            property: 'transform.rotateZ',
            expression: 'y>-140?(y%75/150*-360):156'
          }, {
            element: coverCycle,
            property: 'opacity',
            expression: 'y<-75 ?1:0'
          }]
        }, function (e) {});
        _this2.bindingToken = bindingResult.token;
      }, 300);
    },

    /**
     * 旋转动作
     */
    cycleGoRound: function cycleGoRound() {
      if (_utils2.default.env.isAndroid()) return;
      var cycle = this.$refs['cycle'].ref;
      this.arrowShow(false);
      if (!cycle) {
        return;
      }
      var roundingResult = _index2.default.bind({
        eventType: 'timing',
        props: [{
          element: cycle,
          property: 'transform.rotateZ',
          expression: 't*0.72'
        }]
      }, function (e) {});
      this.roundingToken = roundingResult.token;
    },

    /**
     * 箭头显隐控制
     */
    arrowShow: function arrowShow() {
      var _show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var arrow = this.$refs['arrow'];
      arrow && animation.transition(arrow, {
        styles: {
          opacity: _show ? 1 : 0,
          transform: _show ? "scale(1)" : "scale(0.5)"
        },
        duration: 300,
        delay: 0
      }, function () {});
    },

    /**
     * 完整 bindingx 销毁
     */
    bindingsDestroy: function bindingsDestroy() {
      if (this.bindingToken !== 0) {
        _index2.default && _index2.default.unbind({
          eventType: 'scroll',
          token: this.bindingToken
        });
        this.bindingToken = 0;
      }
      this.roundingDestroy();
    },

    /**
     * 旋转 bindingx 销毁
     */
    roundingDestroy: function roundingDestroy() {
      if (this.roundingToken !== 0) {
        _index2.default && _index2.default.unbind({
          eventType: 'timing',
          token: this.roundingToken
        });
        this.roundingToken = 0;
      }
      this.arrowShow(true);
    }
  }
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = __webpack_require__(154);

var _type2 = _interopRequireDefault(_type);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    type: {
      type: String,
      default: 'errorPage'
    },
    show: {
      type: Boolean,
      default: true
    },
    wrapStyle: Object,
    paddingTop: {
      type: [Number, String],
      default: 232
    },
    customSet: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    resultType: function resultType() {
      var type = this.type,
          customSet = this.customSet;

      var allTypes = _utils2.default.isEmptyObject(customSet) ? _type2.default : _utils2.default.mergeDeep(_type2.default, customSet);
      var types = allTypes['errorPage'];
      if (Object.keys(allTypes).indexOf(type) > -1) {
        types = allTypes[type];
      }
      return types;
    },
    setPaddingTop: function setPaddingTop() {
      var paddingTop = this.paddingTop;
      return paddingTop + 'px';
    }
  },
  methods: {
    handleTouchEnd: function handleTouchEnd(e) {
      // web上面有点击穿透问题
      var platform = weex.config.env.platform;

      platform === 'Web' && e.preventDefault && e.preventDefault();
    },
    onClick: function onClick() {
      var type = this.type;
      this.$emit('wxcResultButtonClicked', { type: type });
    }
  }
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    WxcRichTextText: __webpack_require__(8),
    WxcRichTextLink: __webpack_require__(191),
    WxcRichTextIcon: __webpack_require__(190),
    WxcRichTextTag: __webpack_require__(17)
  },
  props: {
    configList: {
      type: [Array, String],
      default: function _default() {
        return [];
      }
    },
    hasTextMargin: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    isNotEmptyArray: function isNotEmptyArray() {
      return _utils2.default.isNonEmptyArray(this.configList);
    },
    isString: function isString() {
      return _utils2.default.isString(this.configList);
    }
  },
  methods: {
    linkClick: function linkClick(e) {
      this.$emit('wxcRichTextLinkClick', e);
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    iconSrc: String,
    iconStyle: {
      type: Object,
      default: function _default() {
        return {
          height: 24
        };
      }
    }
  },
  data: function data() {
    return {
      width: 90
    };
  },
  computed: {
    computedStyle: function computedStyle() {
      var width = this.width,
          iconStyle = this.iconStyle;

      if (iconStyle && iconStyle.width && iconStyle.height) {
        return {
          width: iconStyle.width + "px",
          height: iconStyle.height + "px"
        };
      } else {
        return {
          width: width + "px",
          height: iconStyle.height + "px"
        };
      }
    }
  },
  methods: {
    onLoad: function onLoad(e) {
      if (e.success && e.size && e.size.naturalWidth > 0) {
        var width = e.size.naturalWidth;
        var height = e.size.naturalHeight;
        this.width = width * (this.iconStyle.height / height);
      }
    }
  }
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _wxcRichTextText = __webpack_require__(8);

var _wxcRichTextText2 = _interopRequireDefault(_wxcRichTextText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: { WxcRichTextText: _wxcRichTextText2.default },
  props: {
    linkValue: {
      type: [String, Number],
      default: ''
    },
    hasTextMargin: {
      type: Boolean,
      default: true
    },
    linkHref: {
      type: String,
      default: ''
    },
    linkTheme: {
      type: String,
      default: 'black'
    },
    linkStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      defObj: {}
    };
  },
  methods: {
    onLinkClick: function onLinkClick(e) {
      this.$emit('wxcRichTextLinkClick', { element: e, href: this.linkHref });
      _utils2.default.goToH5Page(this.linkHref);
    }
  }
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    tagValue: {
      type: [String, Number],
      default: ''
    },
    tagTheme: {
      type: String,
      default: 'blue'
    },
    tagStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    newTheme: function newTheme() {
      var tagStyle = this.tagStyle;
      var tagValue = this.tagValue;
      var divStyle = {};
      var textStyle = {};
      if (tagStyle && tagStyle.fontSize) {
        textStyle = _extends({}, textStyle, {
          fontSize: tagStyle.fontSize + 'px'
        });
      }
      if (tagStyle && tagStyle.color) {
        textStyle = _extends({}, textStyle, {
          color: tagStyle.color
        });
      }

      if (tagStyle && tagStyle.borderColor) {
        divStyle = _extends({}, divStyle, {
          borderColor: tagStyle.borderColor
        });
      }

      if (tagStyle && tagStyle.borderWidth) {
        divStyle = _extends({}, divStyle, {
          borderWidth: tagStyle.borderWidth + 'px'
        });
      }

      if (tagStyle && tagStyle.borderRadius) {
        divStyle = _extends({}, divStyle, {
          borderRadius: tagStyle.borderRadius + 'px'
        });
      }

      if (tagStyle && tagStyle.backgroundColor) {
        divStyle = _extends({}, divStyle, {
          backgroundColor: tagStyle.backgroundColor
        });
      }

      if (tagStyle && tagStyle.height) {
        divStyle = _extends({}, divStyle, {
          height: tagStyle.height + 'px'
        });
      }

      if (tagStyle && tagStyle.width) {
        divStyle = _extends({}, divStyle, {
          width: tagStyle.width + 'px'
        });
      }

      if (tagValue && tagValue.length === 1) {
        divStyle = _extends({}, divStyle, {
          paddingLeft: 0,
          paddingRight: 0
        });
      }

      return {
        divStyle: divStyle,
        textStyle: textStyle
      };
    }
  }
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    textValue: {
      type: String,
      default: ''
    },
    textTheme: {
      type: String,
      default: 'gray'
    },
    textStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    hasTextMargin: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    themeStyle: function themeStyle() {
      var style = _extends({}, this.textStyle);
      if (style && (style.fontSize || style['font-size'])) {
        style = _extends({}, style, {
          fontSize: (style.fontSize || style['font-size']) + 'px',
          height: (style.fontSize || style['font-size']) * 1.2 + 'px'
        });
      }
      return style;
    }
  }
};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = __webpack_require__(155);

exports.default = {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    alwaysShowCancel: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: 'text'
    },
    returnKeyType: {
      type: String,
      default: 'default'
    },
    mod: {
      type: String,
      default: 'default'
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'gray'
    },
    barStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    defaultValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '搜索'
    },
    cancelLabel: {
      type: String,
      default: '取消 '
    },
    depName: {
      type: String,
      default: '杭州'
    }
  },
  computed: {
    needShowCancel: function needShowCancel() {
      return this.alwaysShowCancel || this.showCancel;
    },
    buttonStyle: function buttonStyle() {
      var barStyle = this.barStyle;

      if (barStyle.backgroundColor) {
        return { backgroundColor: barStyle.backgroundColor };
      }
      return {};
    }
  },
  data: function data() {
    return {
      inputIcon: _type.INPUT_ICON,
      closeIcon: _type.CLOSE_ICON,
      arrowIcon: _type.ARROW_ICON,
      showCancel: false,
      showClose: false,
      value: ''

    };
  },
  created: function created() {
    this.defaultValue && (this.value = this.defaultValue);
    if (this.disabled) {
      this.showCancel = false;
      this.showClose = false;
    }
  },

  methods: {
    onBlur: function onBlur() {
      var self = this;
      setTimeout(function () {
        self.showCancel = false;
        self.detectShowClose();
        self.$emit('wxcSearchbarInputOnBlur', { value: self.value });
      }, 10);
    },
    autoBlur: function autoBlur() {
      this.$refs['search-input'].blur();
    },
    onFocus: function onFocus() {
      if (this.isDisabled) {
        return;
      }
      this.showCancel = true;
      this.detectShowClose();
      this.$emit('wxcSearchbarInputOnFocus', { value: this.value });
    },
    closeClicked: function closeClicked() {
      this.value = '';
      this.showCancel && (this.showCancel = false);
      this.showClose && (this.showClose = false);
      this.$emit('wxcSearchbarCloseClicked', { value: this.value });
      this.$emit('wxcSearchbarInputOnInput', { value: this.value });
    },
    onInput: function onInput(e) {
      this.value = e.value;
      this.showCancel = true;
      this.detectShowClose();
      this.$emit('wxcSearchbarInputOnInput', { value: this.value });
    },
    onSubmit: function onSubmit(e) {
      this.onBlur();
      this.value = e.value;
      this.showCancel = true;
      this.detectShowClose();
      this.$emit('wxcSearchbarInputReturned', { value: this.value });
    },
    cancelClicked: function cancelClicked() {
      this.showCancel && (this.showCancel = false);
      this.showClose && (this.showClose = false);
      this.$emit('wxcSearchbarCancelClicked', { value: this.value });
    },
    detectShowClose: function detectShowClose() {
      this.showClose = this.value.length > 0 && this.showCancel;
    },
    depClicked: function depClicked() {
      this.$emit('wxcSearchbarDepChooseClicked', {});
    },
    inputDisabledClicked: function inputDisabledClicked() {
      this.$emit('wxcSearchbarInputDisabledClicked', {});
    },
    setValue: function setValue(value) {
      this.value = value;
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    list: {
      type: Array,
      required: true
    },
    themeColor: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    cItems: function cItems() {
      return this.adapter(this.list);
    }
  },
  methods: {
    adapter: function adapter(items) {
      var _themeColor = this.themeColor,
          lineColor = _themeColor.lineColor,
          pointInnerColor = _themeColor.pointInnerColor,
          pointBorderColor = _themeColor.pointBorderColor,
          highlightTitleColor = _themeColor.highlightTitleColor,
          highlightPointInnerColor = _themeColor.highlightPointInnerColor,
          highlightPointBorderColor = _themeColor.highlightPointBorderColor;

      var len = items.length;
      var pre = Date.now();

      return items.map(function (item, index) {
        item.key = pre + '_' + index;
        item.__titleLineClass__ = [];
        item.__contentClass__ = [];
        item.__contentLineClass__ = [];
        item.__pointClass__ = [];
        item.__titleTextClass__ = [];
        item.__pointStyle__ = {};
        item.__lineStyle__ = {};
        item.__titleStyle__ = {};

        if (lineColor) item.__lineStyle__.backgroundColor = lineColor;
        if (pointInnerColor) item.__pointStyle__.backgroundColor = pointInnerColor;
        if (pointBorderColor) item.__pointStyle__.borderColor = pointBorderColor;

        if (index === 0) {
          item.__titleLineClass__.push('first-one-title-line');
        }

        if (index === len - 1) {
          item.__titleLineClass__.push('last-one-title-line');
          item.__contentClass__.push('last-one-content');
          item.__contentLineClass__.push('last-one-content-line');
        }

        if (item.highlight) {
          item.__pointClass__.push('highlight-point');
          item.__titleTextClass__.push('text-highlight-title');
          if (highlightTitleColor) item.__titleStyle__.color = highlightTitleColor;
          if (highlightPointInnerColor) item.__pointStyle__.backgroundColor = highlightPointInnerColor;
          if (highlightPointBorderColor) item.__pointStyle__.borderColor = highlightPointBorderColor;
        }
        return item;
      });
    }
  }
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var DOM = weex.requireModule('dom');
var Animation = weex.requireModule('animation');
var OFFSET_ACCURACY = 10;
var SCALE = weex.config.env.platform.toLowerCase() === 'web' ? 2 : 1;

function _toNum(str) {
  return typeof str === 'number' ? str : parseFloat((str || '').replace(/px$/i, ''));
}

function _getHeight(element, callback) {
  if (!element) {
    return;
  }
  if (element.__cacheHeight) {
    element.__cacheHeight && callback && callback(element.__cacheHeight);
  } else {
    DOM.getComponentRect(element, function (res) {
      var height = (parseFloat(res && res.size && res.size.height) || 0) / SCALE;
      height && callback && callback(element.__cacheHeight = height);
    });
  }
}

exports.default = {

  props: {
    position: {
      'type': String,
      'default': 'top'
    },

    height: [String, Number]
  },

  data: function data() {
    return {
      visible: true
    };
  },


  watch: {
    visible: function visible(newVal) {
      newVal ? this._slideIn() : this._slideOut();
    }
  },

  created: function created() {
    this._height = _toNum(this.height) || 0;
    this._isBottom = this.position === 'bottom';
    this._direction = this._isBottom ? 1 : -1;
  },


  methods: {
    _slideOut: function _slideOut() {
      var _this = this;

      this.getHeight(function (height) {
        _this.$emit('slideOut');
        _this.slideY(height * _this._direction * SCALE, function () {
          _this.$emit('slideOutEnd');
        });
      });
    },
    _slideIn: function _slideIn() {
      var _this2 = this;

      this.getHeight(function (height) {
        _this2.$emit('slideIn');
        _this2.slideY(0, function () {
          _this2.$emit('slideInEnd');
        });
      });
    },
    getHeight: function getHeight(callback) {
      return _getHeight(this.$refs.wrapper, callback);
    },
    slideOut: function slideOut() {
      this.visible = false;
    },
    slideIn: function slideIn() {
      this.visible = true;
    },
    slideY: function slideY(y, callback) {
      Animation.transition(this.$refs.wrapper, {
        styles: { transform: 'translateY(' + y + 'px)' },
        duration: 150, //ms
        timingFunction: 'ease',
        delay: 0 //ms
      }, callback);
    }
  },

  handleTouchStart: function handleTouchStart(e) {
    var touch = e.changedTouches[0];
    this._touchParams = {
      pageY: touch.screenY,
      startY: touch.screenY,
      lastPageY: touch.screenY,
      timeStamp: e.timeStamp,
      direction: -1
    };
  },
  handleTouchMove: function handleTouchMove(e, bottomNav) {
    var tp = this._touchParams;
    var touch = e.changedTouches[0];
    var offsetY = void 0;

    // 安卓下滚动的时候经常不触发touchstart事件
    if (!tp || tp.hasEnd) {
      return this._touchParams = {
        pageY: touch.screenY,
        startY: touch.screenY,
        lastPageY: touch.screenY,
        timeStamp: e.timeStamp,
        direction: -1
      };
    }

    offsetY = touch.screenY - tp.pageY;

    tp.lastPageY = tp.pageY;
    tp.lastDirection = tp.direction;
    tp.direction = offsetY > 0 ? 1 : -1;

    if (tp.lastDirection !== tp.direction) {
      tp.startY = tp.lastPageY;
    }

    tp.pageY = touch.screenY;
    tp.offsetY = tp.pageY - tp.startY;

    if (!this.__scrollable && bottomNav) {
      if (tp.offsetY <= -OFFSET_ACCURACY) {
        bottomNav.slideOut();
      } else if (tp.offsetY >= OFFSET_ACCURACY) {
        bottomNav.slideIn();
      }
    }
  },
  handleTouchEnd: function handleTouchEnd() {
    var tp = this._touchParams;
    tp && (tp.hasEnd = true);
  },
  handleScroll: function handleScroll(e, scroller, topNav, bottomNav, startThreshold) {
    var _this3 = this;

    var moveThreshold = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 5;

    var scrollY = e.contentOffset.y;
    var nav = topNav || bottomNav;
    var scrollFn = function scrollFn(maxScrollY) {
      if (-scrollY > maxScrollY) {
        return;
      }
      maxScrollY = Math.abs(maxScrollY);
      if (Math.abs(scrollY) < startThreshold) {
        if (Math.abs(scrollY) >= maxScrollY - OFFSET_ACCURACY) {
          var tp = _this3._touchParams;
          if (!tp) {
            return;
          }
          var offsetY = tp.offsetY;
          if (offsetY < -OFFSET_ACCURACY) {
            bottomNav && bottomNav.slideOut();
          } else if (offsetY > OFFSET_ACCURACY) {
            bottomNav && bottomNav.slideIn();
          }
        } else {
          topNav && topNav.slideIn();
          bottomNav && bottomNav.slideIn();
        }
      } else {
        var _tp = _this3._touchParams;
        if (!_tp) {
          return;
        }
        var _offsetY = _tp.offsetY;
        if (Math.abs(_offsetY) >= moveThreshold) {
          if (_offsetY > 0) {
            topNav && topNav.slideIn();
            bottomNav && bottomNav.slideIn();
          } else {
            topNav && topNav.slideOut();
            bottomNav && bottomNav.slideOut();
          }
        }
      }
    };

    var maxScrollYCheck = function maxScrollYCheck(maxScrollY) {
      if (!_this3.__scrollable) {
        return;
      }
      if (startThreshold) {
        scrollFn(maxScrollY);
      } else {
        nav.getHeight(function (navHeight) {
          startThreshold = navHeight;
          scrollFn(maxScrollY);
        });
      }
    };

    if (!nav) {
      return;
    }

    _getHeight(scroller, function (scrollerHeight) {
      var maxScrollY = e.contentSize.height - scrollerHeight;
      _this3.__scrollable = maxScrollY >= OFFSET_ACCURACY;

      if (bottomNav) {
        bottomNav.getHeight(function (height) {
          _this3.__scrollable = maxScrollY >= height;
          maxScrollYCheck(maxScrollY);
        });
      } else {
        maxScrollYCheck(maxScrollY);
      }
    });
  }
};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _bindEnv = __webpack_require__(5);

var _bindEnv2 = _interopRequireDefault(_bindEnv);

var _indexWeex = __webpack_require__(4);

var _indexWeex2 = _interopRequireDefault(_indexWeex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animation = weex.requireModule('animation'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');

exports.default = {
  data: function data() {
    return {
      env: 'weex',
      diffX1: 0,
      diffX2: 0,
      barWidth: 0,
      preventMoveEvent: true,
      minDist: 0,
      // selectRange: [0, 0],
      blockRadius: 28,
      DPR: 1,
      timeout: 100,
      isAndroid: _utils2.default.env.isAndroid()
    };
  },
  props: {
    selectRange: {
      type: Array,
      default: [0, 0]
    },
    length: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 4
    },
    // 是否双滑块模式
    range: {
      type: Boolean,
      default: false
    },
    // 最小值
    min: {
      type: Number,
      default: 0
    },
    // 最大值
    max: {
      type: Number,
      default: 100
    },
    // 最小取值范围，用于范围选择范围最小差值
    minDiff: {
      type: Number,
      default: 5
    },
    // 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number]
    value: {
      type: [Number, Array],
      default: 0
    },
    // 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number]
    defaultValue: {
      type: [Number, Array],
      default: 0
    },
    // 值为 true 时，滑块为禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    invalidColor: {
      type: String,
      default: '#E0E0E0'
    },
    validColor: {
      type: String,
      default: '#EE9900'
    },
    disabledColor: {
      type: String,
      default: '#AAA'
    }
  },
  watch: {
    value: function value(e) {
      if (!this.range) {
        this.diffX1 = this._getDiffX(e || this.defaultValue);
      } else {
        this.diffX1 = this._getDiffX(e[0] || this.defaultValue[0]);
        this.diffX2 = this._getDiffX(e[1] || this.defaultValue[1]);
        this.barWidth = this.diffX2 - this.diffX1;
      }
    }
  },
  created: function created() {
    if (_utils2.default.env.isWeb()) {
      this.env = 'web';
      this.DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    } else {
      this.DPR = weex.config.env.scale;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.block1 = this.$refs['slide-block-1']; // 左侧滑块
    this.block2 = this.$refs['slide-block-2']; // 右侧滑块
    this.valueBar = this.$refs['value-bar']; // 黄色值条
    this.barContainer = this.$refs['bar-container']; // 滚动条容器

    if (!this.range) {
      this.diffX1 = this._getDiffX(this.value || this.defaultValue);
    } else {
      this.diffX1 = this._getDiffX(this.value[0] || this.defaultValue[0]);
      this.diffX2 = this._getDiffX(this.value[1] || this.defaultValue[1]);
      this.barWidth = this.diffX2 - this.diffX1;
    }

    // 是否支持expresstionBinding
    if (_bindEnv2.default.supportsEB() && _indexWeex2.default.prepare) {
      this.block1 && _indexWeex2.default.prepare({
        anchor: this.block1.ref,
        eventType: 'pan'
      });
      this.block2 && _indexWeex2.default.prepare({
        anchor: this.block2.ref,
        eventType: 'pan'
      });
      this.valueBar && _indexWeex2.default.prepare({
        anchor: this.valueBar.ref,
        eventType: 'pan'
      });
    }

    if (this.range) {
      this.selectRange = this.value || this.defaultValue; // 初始化范围选择返回数据
      this.minDist = this.minDiff / (this.max - this.min) * this.length; // 滑块1、2之前最小间距
    }

    // 由于weex在mounted后渲染是异步的不能确保元素渲染完成，需要异步执行
    setTimeout(function () {
      dom.getComponentRect(_this.barContainer, function (option) {
        var left = option.size.left;

        _this.leftDiffX = left;
      });
    }, 100);
  },


  computed: {
    containerStyle: function containerStyle() {
      return {
        width: this.length + 56 + 'px',
        height: '56px'
      };
    },
    rangeBarStyle: function rangeBarStyle() {
      return {
        width: this.length + 'px',
        height: this.height + 'px',
        flexDirection: 'row',
        backgroundColor: this.invalidColor
      };
    },
    valueBarStyle: function valueBarStyle() {
      var left = 0;
      var width = 0;

      if (!this.range) {
        left = this.diffX1 - this.length;
        width = this.length;
      } else {
        left = this.diffX1;
        width = this.diffX2 - this.diffX1;
      }

      return {
        width: width + 'px',
        height: this.height + 'px',
        transform: 'translateX(' + left + 'px)',
        backgroundColor: this.disabled ? this.disabledColor : this.validColor
      };
    },
    blockStyle1: function blockStyle1() {
      var left = this.diffX1;
      return {
        transform: 'translateX(' + left + 'px)'
      };
    },
    blockStyle2: function blockStyle2() {
      return {
        transform: 'translateX(' + this.diffX2 + 'px)'
      };
    }
  },
  methods: {

    // 更新单选值或最小值
    weexHandler1: function weexHandler1(e) {
      var _this2 = this;

      var self = this;
      switch (e.state) {
        case 'start':
          self.bindBlock1();
          break;
        case 'move':
          dom.getComponentRect(this.block1, function (option) {
            var left = option.size.left;

            var value = _this2._getValue(left - _this2.leftDiffX);
            if (!_this2.range) {
              _this2.$emit('updateValue', value);
            } else {
              _this2.selectRange[0] = value;
              _this2.$emit('updateValue', _this2.selectRange);
            }
          });
          break;
        case 'end':
          break;
        default:
          break;
      }
    },


    // 更新最大值
    weexHandler2: function weexHandler2(e) {
      var _this3 = this;

      var self = this;

      switch (e.state) {
        case 'start':
          self.bindBlock2();
          break;
        case 'move':
          dom.getComponentRect(this.block2, function (option) {
            var left = option.size.left;

            _this3.selectRange[1] = _this3._getValue(left - _this3.leftDiffX);
            _this3.$emit('updateValue', _this3.selectRange);
          });
          break;
        case 'end':
          break;
        default:
          break;
      }
    },
    weexStartHandler1: function weexStartHandler1() {
      var _this4 = this;

      // 由于android端不支持 horizontalpan 的move事件，使用setInterval hack方案
      if (!this.isAndroid) {
        return;
      }
      this.firstInterval = setInterval(function () {
        dom.getComponentRect(_this4.block1, function (option) {
          var left = option.size.left;

          var value = _this4._getValue(left - _this4.leftDiffX);
          if (!_this4.range) {
            _this4.$emit('updateValue', value);
          } else {
            _this4.selectRange[0] = value;
            _this4.$emit('updateValue', _this4.selectRange);
          }
        });
      }, this.timeout);
    },
    weexStartHandler2: function weexStartHandler2() {
      var _this5 = this;

      if (!this.isAndroid) {
        return;
      }
      // 由于android端不支持 horizontalpan 的move事件，使用setInterval hack方案
      this.secondInterval = setInterval(function () {
        dom.getComponentRect(_this5.block2, function (option) {
          var left = option.size.left;

          _this5.selectRange[1] = _this5._getValue(left - _this5.leftDiffX);
          _this5.$emit('updateValue', _this5.selectRange);
        });
      }, this.timeout);
    },


    // 清除定时器
    weexEndHandler: function weexEndHandler() {
      if (!this.isAndroid) {
        return;
      }
      this.firstInterval && clearInterval(this.firstInterval);
      this.secondInterval && clearInterval(this.secondInterval);
    },
    webStartHandler: function webStartHandler(e) {
      if (this.env === 'weex') {
        return;
      }
      this.startX = e.touch.clientX;
      this.startDiffX1 = this.diffX1;
      this.startDiffX2 = this.diffX2;
    },
    webMoveHandler1: function webMoveHandler1(e) {
      if (this.env === 'weex' || this.disabled) {
        return;
      }

      var deltaX = (e.touch.clientX - this.startX) * this.DPR;
      var diff = this.startDiffX1 + deltaX;

      var max = this.length;
      if (this.range) {
        max = this.diffX2 - this.minDist;
      }

      if (diff > 0 && diff < max) {
        this.diffX1 = diff;
        animation.transition(this.block1, {
          styles: {
            transform: 'translateX(' + this.diffX1 + 'px)'
          }
        }, function () {});
        if (!this.range) {
          this.$emit('updateValue', this._getValue(this.diffX1));
        } else {
          this.selectRange[0] = this._getValue(this.diffX1);
          this.$emit('updateValue', this.selectRange);
        }
      }
    },
    webMoveHandler2: function webMoveHandler2(e) {
      if (this.env === 'weex' || this.disabled) {
        return;
      }

      var deltaX = (e.touch.clientX - this.startX) * this.DPR;
      var diff = this.startDiffX2 + deltaX;
      var min = this.diffX1 + this.minDist;
      var max = this.length;

      if (diff > min && diff < max) {
        this.diffX2 = diff;
        animation.transition(this.block2, {
          styles: {
            transform: 'translateX(' + this.diffX2 + 'px)'
          }
        }, function () {});
        if (!this.range) {
          this.$emit('updateValue', this._getValue(this.diffX2));
        } else {
          this.selectRange[1] = this._getValue(this.diffX2);
          this.$emit('updateValue', this.selectRange);
        }
      }
    },
    bindBlock1: function bindBlock1() {
      var self = this;

      // 如果禁用，不行进行表达式绑定
      if (self.disabled) {
        _indexWeex2.default.unbind({
          token: this.gesToken1,
          eventType: 'pan'
        });
        this.gesToken1 = 0;
        return;
      }

      // 初始化按钮&条的大小范围
      var blockMax1 = 0;
      if (self.range) {
        blockMax1 = self.diffX2 - self.minDist;
      } else {
        blockMax1 = self.length;
      }

      var barMax1 = self.diffX2;

      if (!self.range) {

        var startLeft = self.diffX1 - blockMax1 - self.minDist;

        var props = [{
          element: self.block1.ref,
          property: 'transform.translateX',
          expression: 'min(' + blockMax1 + ', max(x + ' + self.diffX1 + ', 0))'
        }, {
          element: self.valueBar.ref,
          property: 'transform.translateX',
          expression: 'min(0, max(x + ' + startLeft + ', -' + blockMax1 + '))'
        }];

        var gesTokenObj = _indexWeex2.default.bind({
          anchor: self.block1.ref,
          eventType: 'pan',
          props: props
        }, function (e) {
          if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
            var range = self.getRange();
            // 限制diffX1范围
            self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);
            self.bindBlock1();
          }
        });
        this.gesToken1 = gesTokenObj.token;
      } else {

        // 选范围
        var _props = [{
          element: self.block1.ref,
          property: 'transform.translateX',
          expression: 'min(' + blockMax1 + ', max(x + ' + self.diffX1 + ', 0))'
        }, {
          element: self.valueBar.ref,
          property: 'transform.translateX',
          expression: 'min(' + blockMax1 + ', max(x + ' + self.diffX1 + ', 0))'
        }, {
          element: self.valueBar.ref,
          property: 'width',
          expression: 'min(' + barMax1 + ', max(0, ' + self.barWidth + ' - x))'
        }];

        var _gesTokenObj = _indexWeex2.default.bind({
          anchor: self.block1.ref,
          eventType: 'pan',
          props: _props
        }, function (e) {
          if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
            var range = self.getRange();
            self.barWidth = self._restrictValue(range.rangeX1, self.barWidth - e.deltaX);
            self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);
            self.bindBlock1();
          }
        });
        this.gesToken1 = _gesTokenObj.token;
      }
    },
    bindBlock2: function bindBlock2() {
      var self = this;

      // 如果禁用，不行进行表达式绑定
      if (self.disabled) {
        _indexWeex2.default.unbind({
          token: this.gesToken2,
          eventType: 'pan'
        });
        this.gesToken2 = 0;
        return;
      }

      // 初始化按钮&条的大小范围
      var blockMax1 = 0;
      if (self.range) {
        blockMax1 = self.diffX2 - self.minDist;
      } else {
        blockMax1 = self.length;
      }

      var blockMax2 = self.length;
      var blockMin2 = self.diffX1 + self.minDist;
      var barMax2 = self.length - self.diffX1;

      var props = [{
        element: self.block2.ref,
        property: 'transform.translateX',
        expression: 'min(' + blockMax2 + ', max(x + ' + self.diffX2 + ', ' + blockMin2 + '))'
      }, {
        element: self.valueBar.ref,
        property: 'width',
        expression: 'min(' + barMax2 + ', max(0, x + ' + self.barWidth + '))'
      }];

      var gesTokenObj = _indexWeex2.default.bind({
        anchor: self.block2.ref,
        eventType: 'pan',
        props: props
      }, function (e) {
        if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
          var range = self.getRange();
          self.barWidth = self._restrictValue([0, self.length - self.diffX1], self.barWidth + e.deltaX);
          self.diffX2 = self._restrictValue(range.rangeX2, self.diffX2 + e.deltaX);
          self.bindBlock2();
        }
      });
      this.gesToken2 = gesTokenObj.token;
    },


    // 获取diffx1 diffx2 取值范围
    getRange: function getRange() {
      if (!this.range) {
        return {
          rangeX1: [0, this.length]
        };
      } else {
        return {
          rangeX1: [0, this.diffX2 - this.minDist],
          rangeX2: [this.diffX1 + this.minDist, this.length]
        };
      }
    },


    // 限制取值范围
    _restrictValue: function _restrictValue(range, value) {
      if (range && range.length && range.length === 2) {
        if (value < range[0]) {
          return range[0];
        } else if (value > range[1]) {
          return range[1];
        } else {
          return value;
        }
      }
      return;
    },


    // 根据x方向偏移量计算value
    _getValue: function _getValue(diffX) {
      return Math.round(diffX / this.length * (this.max - this.min) + this.min);
    },


    // 根据value和length计算x方向偏移值
    _getDiffX: function _getDiffX(value) {
      return (value - this.min) / (this.max - this.min) * this.length;
    }
  }
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _wxcRichTextText = __webpack_require__(8);

var _wxcRichTextText2 = _interopRequireDefault(_wxcRichTextText);

var _wxcRichTextTag = __webpack_require__(17);

var _wxcRichTextTag2 = _interopRequireDefault(_wxcRichTextTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _weex$config$env = weex.config.env,
    appName = _weex$config$env.appName,
    osName = _weex$config$env.osName,
    deviceWidth = _weex$config$env.deviceWidth;

var needHack = (_utils2.default.env.isAlipay() || appName === 'UC' || appName === 'TUnionSDK') && osName !== 'iOS' || _utils2.default.env.isAndroid();
var isPad = osName === 'iOS' && deviceWidth > 1300;

exports.default = {
  components: {
    WxcRichTextText: _wxcRichTextText2.default,
    WxcRichTextTag: _wxcRichTextTag2.default
  },
  props: {
    configList: {
      type: [Array, String],
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      iconWidth: 90,
      iconHeight: 24,
      needHack: needHack
    };
  },
  computed: {
    newList: function newList() {
      var configList = this.configList,
          iconHeight = this.iconHeight,
          iconWidth = this.iconWidth,
          needHack = this.needHack;

      if (_utils2.default.isNonEmptyArray(configList) && configList.length === 2) {
        var r1 = configList[0];
        var r2 = configList[1];
        var iconStyle = r1.style;
        var textStyle = r2.style;
        var style = {};
        var fontSize = 24;
        var tagWidth = iconStyle && iconStyle.width ? iconStyle.width : 24;

        if (textStyle && textStyle.fontSize && !isNaN(textStyle.fontSize)) {
          fontSize = textStyle.fontSize;
          style = {
            fontSize: textStyle.fontSize + 'px',
            lineHeight: Number(textStyle.fontSize * 1.4).toFixed(2) + 'px'
          };
        }

        if (textStyle && textStyle.color) {
          style = _extends({}, style, {
            color: textStyle.color
          });
        }

        if (textStyle && textStyle.lines) {
          style = _extends({}, style, {
            lines: textStyle.lines
          });
        }

        if (r1.type === 'icon' && iconStyle && iconStyle.height && !iconStyle.width) {
          tagWidth = parseInt(iconWidth * (iconStyle.height / iconHeight));
          r1 = _extends({}, r1, {
            style: {
              width: tagWidth + 'px',
              height: iconStyle.height + 'px'
            }
          });
        }

        if (r1.type === 'icon' && !(iconStyle && iconStyle.height)) {
          r1 = _extends({}, r1, {
            style: {
              width: iconWidth + 'px',
              height: iconHeight + 'px'
            }
          });
        }

        if (r1.type === 'tag' && iconStyle && iconStyle.width) {
          r1 = _extends({}, r1, {
            style: _extends({}, iconStyle, { width: null })
          });
        }

        var blank = '';
        var num = Math.ceil(tagWidth / fontSize) + 1;

        if (r1.type === 'tag' && r1.value) {
          num = this.countString(r1.value);
        }

        var tagMoreBlank = (!isPad && num < 7 ? '  ' : '') + (needHack ? '  ' : '') + (isPad && num < 3 ? '    ' : '');
        var iconMoreBlank = num > 2 ? needHack ? '     ' : '   ' : ' ';
        if (r1.type === 'tag') {
          blank = new Array(num).join('  ') + tagMoreBlank;
        } else if (r1.type === 'icon') {
          blank = new Array(num).join('  ') + iconMoreBlank;
        }
        blank += isPad && num > 2 ? '     ' : '';
        var newValue = r2.value ? blank + (' ' + r2.value) : '';

        r2 = _extends({}, r2, {
          style: style,
          value: newValue
        });

        return [r1, r2];
      } else {
        return configList;
      }
    },
    top: function top() {
      var configList = this.configList,
          needHack = this.needHack;

      if (_utils2.default.isNonEmptyArray(configList) && configList.length === 2) {
        var iconStyle = configList[0].style;
        var textStyle = configList[1].style;
        var fontSize = 24;
        var tagHeight = iconStyle && iconStyle.height ? iconStyle.height : 26;
        if (textStyle && textStyle.fontSize) {
          fontSize = textStyle.fontSize;
        }
        var d = needHack ? 1.1 : 1.4;
        return Math.ceil((fontSize * d - tagHeight) / 2);
      } else {
        return 0;
      }
    }
  },
  methods: {
    onLoad: function onLoad(e) {
      if (e.success && e.size && e.size.naturalWidth > 0) {
        var _e$size = e.size,
            naturalWidth = _e$size.naturalWidth,
            naturalHeight = _e$size.naturalHeight;

        this.iconWidth = naturalWidth;
        this.iconHeight = naturalHeight;
      } else {
        var configList = this.configList;

        if (_utils2.default.isNonEmptyArray(configList) && configList.length === 2) {
          var style = configList[0].style;

          if (style && style.height && style.width) {
            this.iconWidth = style.width;
            this.iconHeight = style.height;
          }
        }
      }
    },
    countString: function countString(str) {
      var chineseRegex = /[^ -~]/g;
      return str.replace(chineseRegex, '**').length;
    }
  }
};

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    min: {
      type: [String, Number],
      default: 1
    },
    max: {
      type: [String, Number],
      default: 100
    },
    step: {
      type: [String, Number],
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: [String, Number],
      default: 1
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    disableStyle: function disableStyle() {
      if (this.disabled) {
        return {
          color: '#cccccc'
        };
      }
    },
    valueString: function valueString() {
      return this.value.toString();
    }
  },
  data: function data() {
    return {
      value: 1,
      isLess: false,
      isOver: false
    };
  },
  watch: {
    defaultValue: function defaultValue(newNum) {
      this.value = newNum;
    }
  },
  created: function created() {
    this.value = parseInt(this.defaultValue, 10);
    if (this.disabled) {
      this.isLess = true;
      this.isOver = true;
    }
  },

  methods: {
    minusClicked: function minusClicked() {
      if (this.disabled) {
        return;
      }
      var isMinOver = this.value <= this.min;
      var nowNum = this.value - parseInt(this.step, 10);
      if (isMinOver) {
        this.$emit('wxcStepperValueIsMinOver', { value: this.value });
      } else {
        this.value = nowNum;
        this.resetDisabledStyle();
      }
      // 由于此处已经减step
      if (nowNum <= this.min) {
        this.value = parseInt(this.min, 10);
        this.isLess = true;
      }
      this.$emit('wxcStepperValueChanged', { value: this.value });
    },
    plusClicked: function plusClicked() {
      if (this.disabled) {
        return;
      }
      var isMaxOver = this.value >= this.max;
      var nowNum = this.value + parseInt(this.step, 10);
      if (isMaxOver) {
        this.$emit('wxcStepperValueIsMaxOver', { value: this.value });
      } else {
        this.value = nowNum;
        this.resetDisabledStyle();
      }
      // 由于此处已经加step
      if (nowNum >= this.max) {
        this.value = parseInt(this.max, 10);
        this.isOver = true;
      }
      this.$emit('wxcStepperValueChanged', { value: this.value });
    },
    onInput: function onInput(e) {
      this.correctInputValue(e.value);
    },
    onBlur: function onBlur(e) {
      this.correctInputValue(e.value);
    },
    correctInputValue: function correctInputValue(v) {
      var _this = this;

      var lastValue = this.value;
      if (/^[1-9]\d{0,}$/.test(v) && parseInt(v, 10) >= this.min && parseInt(v, 10) <= this.max) {
        this.value = parseInt(v, 10);
      } else {
        this.value = '';
        setTimeout(function () {
          _this.value = lastValue;
        }, 1);
      }
      this.$emit('wxcStepperValueChanged', { value: this.value });
    },
    resetDisabledStyle: function resetDisabledStyle() {
      this.isLess = false;
      this.isOver = false;
    }
  }
};

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _indexWeex = __webpack_require__(4);

var _indexWeex2 = _interopRequireDefault(_indexWeex);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animation = weex.requireModule("animation"); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    data: {
      type: Array,
      default: []
    },
    height: {
      type: Number,
      default: 90
    },
    styles: {
      type: Object,
      default: {}
    }
  },
  data: function data() {
    return {
      mobileX: 0,
      webStarX: 0,
      saveIdx: null,
      isAndroid: _utils2.default.env.isAndroid()
    };
  },

  methods: {
    special: function special(dom, styles) {
      animation.transition(dom, {
        styles: styles,
        duration: 200, //ms
        timingFunction: "ease",
        delay: 100 //ms
      });
    },
    onRightNode: function onRightNode(pNode, node, i) {
      node.onPress();
      if (pNode.autoClose) this.special(this.$refs.skid[i], {
        transform: "translate(0, 0)"
      });
    },
    onNodeClick: function onNodeClick(node, i) {
      if (this.mobileX < 0) {
        this.mobileX = 0;
        this.special(this.$refs.skid[this.saveIdx], {
          transform: "translate(0, 0)"
        });
        this.isAndroid && this.special(this.$refs.skid[i], {
          transform: "translate(0, 0)"
        });
      } else {
        this.$emit("onNodeClick", node, i);
      }
    },
    onPanEnd: function onPanEnd(e, node, i) {
      if (_utils2.default.env.isWeb()) {
        var webEndX = e.changedTouches[0].pageX;
        this.movingDistance(webEndX - this.webStarX, node, this.$refs.skid[i]);
      }
    },

    onPanStart: function onPanStart(e, node, i) {
      var saveIdx = this.saveIdx;

      if (saveIdx !== i && saveIdx !== null && this.$refs.skid[saveIdx]) {
        this.special(this.$refs.skid[saveIdx], {
          transform: "translate(0, 0)"
        });
        this.mobileX = 0;
      }
      this.saveIdx = i;
      !_utils2.default.env.isWeb() ? this.mobile(e, node, i) : this.web(e, node, i);
      e.stopPropagation();
    },
    web: function web(e, node, i) {
      this.webStarX = e.changedTouches[0].pageX;
    },
    mobile: function mobile(e, node, i) {
      var _this = this;

      var el = this.$refs["skid"][i];
      _indexWeex2.default.bind({
        anchor: el.ref,
        eventType: "pan",
        props: [{
          element: el.ref,
          property: "transform.translateX",
          expression: "x+" + (this.isAndroid ? 0 : this.mobileX)
        }]
      }, function (e) {
        var state = e.state,
            deltaX = e.deltaX;

        if (state === "end") {
          _this.mobileX += deltaX;
          _this.movingDistance(_this.mobileX, node, el);
        }
      });
    },
    movingDistance: function movingDistance(scope, node, el) {
      var len = node.right ? node.right.length : 0;
      var distance = len * -100;
      if (scope < -30) {
        this.special(el, {
          transform: "translate(" + distance + "px, 0)"
        });
        this.mobileX = distance;
      } else {
        this.special(el, {
          transform: "translate(0, 0)"
        });
        this.mobileX = 0;
      }
    }
  }
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');
var animation = weex.requireModule('animation');
exports.default = {
  props: {
    tabTitles: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    tabStyles: {
      type: Object,
      default: function _default() {
        return {
          bgColor: '#FFFFFF',
          titleColor: '#666666',
          activeTitleColor: '#3D3D3D',
          activeBgColor: '#FFFFFF',
          isActiveTitleBold: true,
          iconWidth: 70,
          iconHeight: 70,
          width: 160,
          height: 120,
          fontSize: 24,
          activeBottomColor: '#FFC900',
          activeBottomWidth: 120,
          activeBottomHeight: 6,
          textPaddingLeft: 10,
          textPaddingRight: 10
        };
      }
    },
    titleType: {
      type: String,
      default: 'icon'
    },
    titleUseSlot: {
      type: Boolean,
      default: false
    },
    isTabView: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    timingFunction: {
      type: String,
      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    wrapBgColor: {
      type: String,
      default: '#f2f3f4'
    }
  },
  data: function data() {
    return {
      currentPage: 0,
      translateX: 0
    };
  },
  created: function created() {
    var titleType = this.titleType,
        tabStyles = this.tabStyles;

    if (titleType === 'iconFont' && tabStyles.iconFontUrl) {
      dom.addRule('fontFace', {
        'fontFamily': "wxcIconFont",
        'src': 'url(\'' + tabStyles.iconFontUrl + '\')'
      });
    }
    this.isIPhoneX = _utils2.default.env.isIPhoneX();
  },

  methods: {
    next: function next() {
      var page = this.currentPage;
      if (page < this.tabTitles.length - 1) {
        page++;
      }
      this.setPage(page);
    },
    prev: function prev() {
      var page = this.currentPage;
      if (page > 0) {
        page--;
      }
      this.setPage(page);
    },
    setPage: function setPage(page) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var animated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!this.isTabView) {
        this.currentPage = page;
        this._animateTransformX(page, animated);
        this.$emit('wxcTabBarCurrentTabSelected', { page: page });
        this.jumpOut(url);
        return;
      }
      var previousPage = this.currentPage;
      var currentTabEl = this.$refs['wxc-tab-title-' + page][0];
      var width = this.tabStyles.width;

      var appearNum = parseInt(750 / width);
      var tabsNum = this.tabTitles.length;
      var offset = page > appearNum ? -(750 - width) / 2 : -width * 2;

      if (appearNum < tabsNum) {
        (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {
          offset: offset, animated: animated
        });

        page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {
          offset: -width * page,
          animated: animated
        });
      }

      this.currentPage = page;
      this._animateTransformX(page, animated);
      this.$emit('wxcTabBarCurrentTabSelected', { page: page });
    },
    jumpOut: function jumpOut(url) {
      url && _utils2.default.goToH5Page(url);
    },
    _animateTransformX: function _animateTransformX(page, animated) {
      var duration = this.duration,
          timingFunction = this.timingFunction;

      var computedDur = animated ? duration : 0.00001;
      var containerEl = this.$refs['tab-container'];
      var dist = page * 750;
      animation.transition(containerEl, {
        styles: {
          transform: 'translateX(' + -dist + 'px)'
        },
        duration: computedDur,
        timingFunction: timingFunction,
        delay: 0
      }, function () {});
    }
  }
};

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _bindEnv = __webpack_require__(5);

var _bindEnv2 = _interopRequireDefault(_bindEnv);

var _indexWeex = __webpack_require__(4);

var _indexWeex2 = _interopRequireDefault(_indexWeex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');
var animation = weex.requireModule('animation');
var swipeBack = weex.requireModule('swipeBack');
var expressionBinding = weex.requireModule('expressionBinding');

var isIos = _utils2.default.env.isIOS();

exports.default = {
  props: {
    tabTitles: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    panDist: {
      type: Number,
      default: 200
    },
    spmC: {
      type: [String, Number],
      default: ''
    },
    tabStyles: {
      type: Object,
      default: function _default() {
        return {
          titleColor: '#666666',
          activeTitleColor: '#3D3D3D',
          isActiveTitleBold: true,
          width: 160,
          height: 40,
          fontSize: 24,
          textPaddingLeft: 10,
          textPaddingRight: 10
        };
      }
    },
    titleType: {
      type: String,
      default: 'icon'
    },
    tabPageHeight: {
      type: [String, Number],
      default: 1334
    },
    needSlider: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    timingFunction: {
      type: String,
      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  },
  data: function data() {
    return {
      currentPage: 0,
      isMoving: false,
      deltaX: 0
    };
  },
  mounted: function mounted() {
    // ios 下面禁止左滑出去
    if (swipeBack && swipeBack.forbidSwipeBack) {
      swipeBack.forbidSwipeBack(true);
    }
    if (_bindEnv2.default.supportsEBForIos() && this.needSlider) {
      var tabPageEl = this.$refs['tab-page-wrap'];
      _indexWeex2.default.prepare && _indexWeex2.default.prepare({
        anchor: tabPageEl.ref,
        eventType: 'pan'
      });
    }
  },

  methods: {
    next: function next() {
      var page = this.currentPage;
      if (page < this.tabTitles.length - 1) {
        page++;
      }
      this.setPage(page);
    },
    prev: function prev() {
      var page = this.currentPage;
      if (page > 0) {
        page--;
      }
      this.setPage(page);
    },
    startHandler: function startHandler(e) {
      if (_bindEnv2.default.supportsEBForIos() && this.isTabView && this.needSlider) {
        this.bindExp(this.$refs['tab-page-wrap']);
      }
    },
    bindExp: function bindExp(element) {
      var _this = this;

      if (element && element.ref) {

        if (this.isMoving && this.gesToken !== 0) {
          _indexWeex2.default.unbind({
            eventType: 'pan',
            token: this.gesToken
          });
          this.gesToken = 0;
          return;
        }

        var tabElement = this.$refs['tab-container'];
        var currentPage = this.currentPage,
            panDist = this.panDist;

        var dist = currentPage * 750;

        // x-dist

        var props = [{
          element: tabElement.ref,
          property: 'transform.translateX',
          expression: '{"type":"CallExpression","children":[{"type":"Identifier","value":"min"},{"type":"Arguments","children":[{"type":"NumericLiteral","value":0},{"type":"CallExpression","children":[{"type":"Identifier","value":"max"},{"type":"Arguments","children":[{"type":"NumericLiteral","value":' + -(tabTitles.length - 1) * 750 + '},{"type":"-","children":[{"type":"Identifier","value":"x"},{"type":"NumericLiteral","value":' + dist + '}]}]}]}]}]}'
        }];

        var gesTokenObj = _indexWeex2.default.bind({
          anchor: element.ref,
          eventType: 'pan',
          props: props
        }, function (e) {
          var deltaX = e.deltaX,
              state = e.state;

          if (state === 'end') {
            if (deltaX < -panDist) {
              _this.next();
            } else if (deltaX > panDist) {
              _this.prev();
            } else {
              _this.setPage(currentPage);
            }
          }
        });
        this.gesToken = gesTokenObj.token;
      }
    },
    setPage: function setPage(page) {
      if (this.isMoving === true) {
        return;
      }
      this.isMoving = true;
      var previousPage = this.currentPage;
      var currentTabEl = this.$refs['wxc-tab-title-' + page][0];
      var width = this.tabStyles.width;

      var appearNum = parseInt(750 / width);
      var tabsNum = this.tabTitles.length;
      var computedPage = tabsNum > appearNum ? 2 : page;
      var offset = page > appearNum ? -(750 - width) / 2 : -width * computedPage;

      (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {
        offset: offset
      });

      page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {
        offset: -width * page
      });
      this._animateTransformX(page);
      this.isMoving = false;
      this.currentPage = page;
      this.$emit('wxcTabPageCurrentTabSelected', { page: page });
    },
    _animateTransformX: function _animateTransformX(page) {
      var duration = this.duration,
          timingFunction = this.timingFunction;

      var containerEl = this.$refs['tab-container'];
      var dist = page * 750;
      animation.transition(containerEl, {
        styles: {
          transform: 'translateX(' + -dist + 'px)'
        },
        duration: duration,
        timingFunction: timingFunction,
        delay: 0
      }, function () {});
    }
  }
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _bindEnv = __webpack_require__(5);

var _bindEnv2 = _interopRequireDefault(_bindEnv);

var _indexWeex = __webpack_require__(4);

var _indexWeex2 = _interopRequireDefault(_indexWeex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var dom = weex.requireModule('dom');
var animation = weex.requireModule('animation');
var swipeBack = weex.requireModule('swipeBack');

exports.default = {
  props: {
    tabTitles: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    panDist: {
      type: Number,
      default: 200
    },
    spmC: {
      type: [String, Number],
      default: ''
    },
    titleUseSlot: {
      type: Boolean,
      default: false
    },
    tabStyles: {
      type: Object,
      default: function _default() {
        return {
          bgColor: '#FFFFFF',
          titleColor: '#666666',
          activeTitleColor: '#3D3D3D',
          activeBgColor: '#FFFFFF',
          isActiveTitleBold: true,
          iconWidth: 70,
          iconHeight: 70,
          width: 160,
          height: 120,
          fontSize: 24,
          hasActiveBottom: true,
          activeBottomColor: '#FFC900',
          activeBottomWidth: 120,
          activeBottomHeight: 6,
          textPaddingLeft: 10,
          textPaddingRight: 10,
          leftOffset: 0,
          rightOffset: 0,
          normalBottomColor: '#F2F2F2',
          normalBottomHeight: 0,
          hasRightIcon: false
        };
      }
    },
    titleType: {
      type: String,
      default: 'icon'
    },
    tabPageHeight: {
      type: [String, Number],
      default: 1334
    },
    needSlider: {
      type: Boolean,
      default: true
    },
    isTabView: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 300
    },
    timingFunction: {
      type: String,
      default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    wrapBgColor: {
      type: String,
      default: '#f2f3f4'
    },
    clickAnimation: {
      type: Boolean,
      default: true
    },
    rightIconStyle: {
      type: Object,
      default: function _default() {
        return {
          top: 0,
          right: 0,
          paddingLeft: 20,
          paddingRight: 20
        };
      }
    }
  },
  data: function data() {
    return {
      currentPage: 0,
      gesToken: 0,
      isMoving: false,
      startTime: 0,
      deltaX: 0,
      translateX: 0
    };
  },
  created: function created() {
    var titleType = this.titleType,
        tabStyles = this.tabStyles;

    if (titleType === 'iconFont' && tabStyles.iconFontUrl) {
      dom.addRule('fontFace', {
        'fontFamily': 'wxcIconFont',
        'src': 'url(' + tabStyles.iconFontUrl + ')'
      });
    }
  },
  mounted: function mounted() {
    if (swipeBack && swipeBack.forbidSwipeBack) {
      swipeBack.forbidSwipeBack(true);
    }
    if (_bindEnv2.default.supportsEBForIos() && this.isTabView && this.needSlider) {
      var tabPageEl = this.$refs['tab-page-wrap'];
      _indexWeex2.default.prepare && _indexWeex2.default.prepare({
        anchor: tabPageEl.ref,
        eventType: 'pan'
      });
    }
  },

  methods: {
    next: function next() {
      var page = this.currentPage;
      if (page < this.tabTitles.length - 1) {
        page++;
      }
      this.setPage(page);
    },
    prev: function prev() {
      var page = this.currentPage;
      if (page > 0) {
        page--;
      }
      this.setPage(page);
    },
    startHandler: function startHandler() {
      if (_bindEnv2.default.supportsEBForIos() && this.isTabView && this.needSlider) {
        this.bindExp(this.$refs['tab-page-wrap']);
      }
    },
    bindExp: function bindExp(element) {
      var _this = this;

      if (element && element.ref) {
        if (this.isMoving && this.gesToken !== 0) {
          _indexWeex2.default.unbind({
            eventType: 'pan',
            token: this.gesToken
          });
          this.gesToken = 0;
          return;
        }

        var tabElement = this.$refs['tab-container'];
        var currentPage = this.currentPage,
            panDist = this.panDist;

        var dist = currentPage * 750;

        // x-dist
        var props = [{
          element: tabElement.ref,
          property: 'transform.translateX',
          expression: 'x-' + dist
        }];

        var gesTokenObj = _indexWeex2.default.bind({
          anchor: element.ref,
          eventType: 'pan',
          props: props
        }, function (e) {
          var deltaX = e.deltaX,
              state = e.state;

          if (state === 'end') {
            if (deltaX < -panDist) {
              _this.next();
            } else if (deltaX > panDist) {
              _this.prev();
            } else {
              _this.setPage(currentPage);
            }
          }
        });
        this.gesToken = gesTokenObj.token;
      }
    },
    setPage: function setPage(page) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var animated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!this.isTabView) {
        this.jumpOut(url);
        return;
      }
      if (this.isMoving === true) {
        return;
      }
      this.isMoving = true;
      var previousPage = this.currentPage;
      var currentTabEl = this.$refs['wxc-tab-title-' + page][0];
      var width = this.tabStyles.width;

      var appearNum = parseInt(750 / width);
      var tabsNum = this.tabTitles.length;
      var offset = page > appearNum ? -(750 - width) / 2 : -width * 2;

      if (appearNum < tabsNum) {
        (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {
          offset: offset, animated: animated
        });

        page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {
          offset: -width * page,
          animated: animated
        });
      }

      this.isMoving = false;
      this.currentPage = page;
      this._animateTransformX(page, animated);
      this.$emit('wxcTabPageCurrentTabSelected', { page: page });
    },
    jumpOut: function jumpOut(url) {
      url && _utils2.default.goToH5Page(url);
    },
    _animateTransformX: function _animateTransformX(page, animated) {
      var duration = this.duration,
          timingFunction = this.timingFunction;

      var computedDur = animated ? duration : 0.00001;
      var containerEl = this.$refs['tab-container'];
      var dist = page * 750;
      animation.transition(containerEl, {
        styles: {
          transform: 'translateX(' + -dist + 'px)'
        },
        duration: computedDur,
        timingFunction: timingFunction,
        delay: 0
      }, function () {});
    }
  }
};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: {
    type: {
      type: String,
      default: 'solid'
    },
    value: {
      type: [String, Number],
      default: '测试测试'
    },
    tagColor: {
      type: String,
      default: '#ff5000'
    },
    fontColor: {
      type: String,
      default: '#333333'
    },
    specialIcon: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  },
  computed: {
    showSolid: function showSolid() {
      var type = this.type,
          value = this.value;

      return type === 'solid' && value !== '';
    },
    showHollow: function showHollow() {
      var type = this.type,
          value = this.value;

      return type === 'hollow' && value !== '';
    },
    showSpecial: function showSpecial() {
      var type = this.type,
          value = this.value,
          specialIcon = this.specialIcon;

      return type === 'special' && value !== '' && specialIcon !== '';
    },
    showImage: function showImage() {
      var type = this.type,
          img = this.img;

      return type === 'image' && img !== '';
    },
    tagTextStyle: function tagTextStyle() {
      var tagColor = this.tagColor,
          showSolid = this.showSolid;

      return showSolid ? { backgroundColor: tagColor } : { borderColor: tagColor };
    }
  },
  data: function data() {
    return {
      imgWidth: 90
    };
  },
  methods: {
    onLoad: function onLoad(e) {
      if (e.success && e.size && e.size.naturalWidth > 0) {
        var width = e.size.naturalWidth;
        var height = e.size.naturalHeight;
        this.imgWidth = width * (24 / height);
      }
    }
  }
};

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var STYLE_MAP = exports.STYLE_MAP = {
  red: {
    backgroundColor: '#FF5000'
  },
  yellow: {
    backgroundColor: '#FFC900'
  },
  white: {
    backgroundColor: '#FFFFFF',
    borderColor: '#A5A5A5',
    borderWidth: '1px'
  },
  blue: {
    backgroundColor: '#0F8DE8'
  },
  green: {
    backgroundColor: '#19be6b'
  }
};

var TEXT_STYLE_MAP = exports.TEXT_STYLE_MAP = {
  red: {
    color: '#FFFFFF'
  },
  yellow: {
    color: '#FFFFFF'
  },
  blue: {
    color: '#FFFFFF'
  },
  white: {
    color: '#3D3D3D'
  },
  green: {
    color: '#FFFFFF'
  }
};

var BUTTON_STYLE_MAP = exports.BUTTON_STYLE_MAP = {
  full: {
    width: '702px',
    height: '88px'
  },
  big: {
    width: '339px',
    height: '70px'
  },
  medium: {
    width: '218px',
    height: '60px'
  },
  small: {
    width: '157px',
    height: '44px'
  }
};

var TEXT_FONTSIZE_STYLE_MAP = exports.TEXT_FONTSIZE_STYLE_MAP = {
  full: {
    fontSize: '36px'
  },
  big: {
    fontSize: '32px'
  },
  medium: {
    fontSize: '28px'
  },
  small: {
    fontSize: '24px'
  }
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/10/21.
 */

var CHECKED = exports.CHECKED = 'https://gw.alicdn.com/tfs/TB14fp2pwMPMeJjy1XbXXcwxVXa-72-72.png';
var UNCHECKED = exports.UNCHECKED = 'https://gw.alicdn.com/tfs/TB1U6SbpwMPMeJjy1XcXXXpppXa-72-72.png';
var CHECKED_DISABLED = exports.CHECKED_DISABLED = 'https://gw.alicdn.com/tfs/TB1aPabpwMPMeJjy1XcXXXpppXa-72-72.png';
var UNCHECKED_DISABLED = exports.UNCHECKED_DISABLED = 'https://gw.alicdn.com/tfs/TB1lTuzpwoQMeJjy0FoXXcShVXa-72-72.png';

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by dianwoda on 2018/1/31.
 */
exports.default = {
  hotCity: [{ cityName: '北京', pinYin: 'beijing', py: 'bj' }, { cityName: '上海', pinYin: 'shanghai', py: 'sh' }, { cityName: '天津', pinYin: 'tianjin', py: 'tj' }, { cityName: '青岛', pinYin: 'qingdao', py: 'qd' }, { cityName: '南京', pinYin: 'nanjing', py: 'nj' }, { cityName: '杭州', pinYin: 'hangzhou', py: 'hz' }, { cityName: '厦门', pinYin: 'xiamen', py: 'xm' }, { cityName: '成都', pinYin: 'chengdu', py: 'cd' }, { cityName: '深圳', pinYin: 'shenzhen', py: 'sz' }, { cityName: '广州', pinYin: 'guangzhou', py: 'gz' }, { cityName: '沈阳', pinYin: 'shenyang', py: 'sy' }, { cityName: '武汉', pinYin: 'wuhan', py: 'wh' }],
  cities: [{ cityName: '北京', pinYin: 'beijing', py: 'bj' }, { cityName: '包头', pinYin: 'baotou', py: 'bt' }, { cityName: '北海', pinYin: 'beihai', py: 'bh' }, { cityName: '宝鸡', pinYin: 'baoji', py: 'bj' }, { cityName: '成都', pinYin: 'chengdu', py: 'cd' }, { cityName: '重庆', pinYin: 'chongqing', py: 'cq' }, { cityName: '长沙', pinYin: 'changsha', py: 'cs' }, { cityName: '长春', pinYin: 'changchun', py: 'cc' }, { cityName: '常州', pinYin: 'changzhou', py: 'cz' }, { cityName: '常德', pinYin: 'changde', py: 'cd' }, { cityName: '沧州', pinYin: 'cangzhou', py: 'cz' }, { cityName: '承德', pinYin: 'chengde', py: 'cd' }, { cityName: '长治', pinYin: 'changzhi', py: 'cz' }, { cityName: '滁州', pinYin: 'chuzhou', py: 'cz' }, { cityName: '大连', pinYin: 'dalian', py: 'dl' }, { cityName: '东莞', pinYin: 'dongguan', py: 'dg' }, { cityName: '大同', pinYin: 'datong', py: 'dt' }, { cityName: '达州', pinYin: 'dazhou', py: 'dz' }, { cityName: '鄂尔多斯', pinYin: 'eerduosi', py: 'eeds' }, { cityName: '恩施', pinYin: 'enshi', py: 'es' }, { cityName: '福州', pinYin: 'fuzhou', py: 'fz' }, { cityName: '佛山', pinYin: 'foshan', py: 'fs' }, { cityName: '抚顺', pinYin: 'fushun', py: 'fs' }, { cityName: '抚州', pinYin: 'fuzhou', py: 'fz' }, { cityName: '防城港', pinYin: 'fangchenggang', py: 'fcg' }, { cityName: '广州', pinYin: 'guangzhou', py: 'gz' }, { cityName: '贵阳', pinYin: 'guiyang', py: 'gy' }, { cityName: '桂林', pinYin: 'guilin', py: 'gl' }, { cityName: '广元', pinYin: 'guangyuan', py: 'gy' }, { cityName: '广安', pinYin: 'guangan', py: 'ga' }, { cityName: '杭州', pinYin: 'hangzhou', py: 'hz' }, { cityName: '哈尔滨', pinYin: 'haerbin', py: 'heb' }, { cityName: '合肥', pinYin: 'hefei', py: 'hf' }, { cityName: '呼和浩特', pinYin: 'huhehaote', py: 'hhht' }, { cityName: '海口', pinYin: 'haikou', py: 'hk' }, { cityName: '黄山', pinYin: 'huangshan', py: 'hs' }, { cityName: '呼伦贝尔', pinYin: 'hulunbeier', py: 'hlbe' }, { cityName: '邯郸', pinYin: 'handan', py: 'hd' }, { cityName: '衡阳', pinYin: 'hengyang', py: 'hy' }, { cityName: '汉中', pinYin: 'hanzhong', py: 'hz' }, { cityName: '济南', pinYin: 'jinan', py: 'jn' }, { cityName: '济宁', pinYin: 'jining', py: 'jn' }, { cityName: '九江', pinYin: 'jiujiang', py: 'jj' }, { cityName: '景德镇', pinYin: 'jingdezhen', py: 'jdz' }, { cityName: '吉林', pinYin: 'jilin', py: 'jl' }, { cityName: '江门', pinYin: 'jiangmen', py: 'jm' }, { cityName: '晋城', pinYin: 'jincheng', py: 'jc' }, { cityName: '嘉峪关', pinYin: 'jiayuguan', py: 'jyg' }, { cityName: '酒泉', pinYin: 'jiuquan', py: 'jq' }, { cityName: '昆明', pinYin: 'kunming', py: 'km' }, { cityName: '克拉玛依', pinYin: 'kelamayi', py: 'klmy' }, { cityName: '兰州', pinYin: 'lanzhou', py: 'lz' }, { cityName: '丽江', pinYin: 'lijiang', py: 'lj' }, { cityName: '洛阳', pinYin: 'luoyang', py: 'ly' }, { cityName: '柳州', pinYin: 'liuzhou', py: 'lz' }, { cityName: '泸州', pinYin: 'luzhou', py: 'lz' }, { cityName: '拉萨', pinYin: 'lasa', py: 'ls' }, { cityName: '临汾', pinYin: 'linfen', py: 'lf' }, { cityName: '乐山', pinYin: 'leshan', py: 'ls' }, { cityName: '聊城', pinYin: 'liaocheng', py: 'lc' }, { cityName: '丽水', pinYin: 'lishui', py: 'ls' }, { cityName: '绵阳', pinYin: 'mianyang', py: 'my' }, { cityName: '梅州', pinYin: 'meizhou', py: 'mz' }, { cityName: '眉山', pinYin: 'meishan', py: 'ms' }, { cityName: '南昌', pinYin: 'nanchang', py: 'nc' }, { cityName: '南京', pinYin: 'nanjing', py: 'nj' }, { cityName: '南宁', pinYin: 'nanning', py: 'nn' }, { cityName: '宁波', pinYin: 'ningbo', py: 'nb' }, { cityName: '南通', pinYin: 'nantong', py: 'nt' }, { cityName: '南充', pinYin: 'nanchong', py: 'nc' }, { cityName: '内江', pinYin: 'neijiang', py: 'nj' }, { cityName: '萍乡', pinYin: 'pingxiang', py: 'px' }, { cityName: '攀枝花', pinYin: 'panzhihua', py: 'pzh' }, { cityName: '青岛', pinYin: 'qingdao', py: 'qd' }, { cityName: '泉州', pinYin: 'quanzhou', py: 'qz' }, { cityName: '上海', pinYin: 'shanghai', py: 'sh' }, { cityName: '深圳', pinYin: 'shenzhen', py: 'sz' }, { cityName: '沈阳', pinYin: 'shenyang', py: 'sy' }, { cityName: '石家庄', pinYin: 'shijiazhuang', py: 'sjz' }, { cityName: '苏州', pinYin: 'suzhou', py: 'sz' }, { cityName: '三亚', pinYin: 'sanya', py: 'sy' }, { cityName: '汕头', pinYin: 'shantou', py: 'st' }, { cityName: '上饶', pinYin: 'shangrao', py: 'sr' }, { cityName: '遂宁', pinYin: 'suining', py: 'sn' }, { cityName: '宿迁', pinYin: 'suqian', py: 'sq' }, { cityName: '天津', pinYin: 'tianjin', py: 'tj' }, { cityName: '太原', pinYin: 'taiyuan', py: 'ty' }, { cityName: '台州', pinYin: 'taizhou', py: 'tz' }, { cityName: '唐山', pinYin: 'tangshan', py: 'ts' }, { cityName: '铁岭', pinYin: 'tieling', py: 'tl' }, { cityName: '武汉', pinYin: 'wuhan', py: 'wh' }, { cityName: '无锡', pinYin: 'wuxi', py: 'wx' }, { cityName: '温州', pinYin: 'wenzhou', py: 'wz' }, { cityName: '乌鲁木齐', pinYin: 'wulumuqi', py: 'wlmq' }, { cityName: '威海', pinYin: 'weihai', py: 'wh' }, { cityName: '渭南', pinYin: 'weinan', py: 'wn' }, { cityName: '西安', pinYin: 'xian', py: 'xa' }, { cityName: '厦门', pinYin: 'xiamen', py: 'xm' }, { cityName: '香港', pinYin: 'xianggang', py: 'xg' }, { cityName: '徐州', pinYin: 'xuzhou', py: 'xz' }, { cityName: '西宁', pinYin: 'xining', py: 'xn' }, { cityName: '襄阳', pinYin: 'xiangyang', py: 'xy' }, { cityName: '新余', pinYin: 'xinyu', py: 'xy' }, { cityName: '许昌', pinYin: 'xuchang', py: 'xc' }, { cityName: '信阳', pinYin: 'xinyang', py: 'xy' }, { cityName: '银川', pinYin: 'yinchuan', py: 'yc' }, { cityName: '宜昌', pinYin: 'yichang', py: 'yc' }, { cityName: '烟台', pinYin: 'yantai', py: 'yt' }, { cityName: '扬州', pinYin: 'yangzhou', py: 'yz' }, { cityName: '宜宾', pinYin: 'yibin', py: 'yb' }, { cityName: '运城', pinYin: 'yuncheng', py: 'yc' }, { cityName: '榆林', pinYin: 'yulin', py: 'yl' }, { cityName: '盐城', pinYin: 'yancheng', py: 'yc' }, { cityName: '岳阳', pinYin: 'yueyang', py: 'yy' }, { cityName: '延安', pinYin: 'yanan', py: 'ya' }, { cityName: '鹰潭', pinYin: 'yingtan', py: 'yt' }, { cityName: '永州', pinYin: 'yongzhou', py: 'yz' }, { cityName: '郑州', pinYin: 'zhengzhou', py: 'zz' }, { cityName: '珠海', pinYin: 'zhuhai', py: 'zh' }, { cityName: '张家界', pinYin: 'zhangjiajie', py: 'zzj' }, { cityName: '中山', pinYin: 'zhongshan', py: 'zs' }, { cityName: '遵义', pinYin: 'zunyi', py: 'zy' }, { cityName: '湛江', pinYin: 'zhanjiang', py: 'zj' }, { cityName: '株洲', pinYin: 'zhuzhou', py: 'zz' }, { cityName: '肇庆', pinYin: 'zhaoqing', py: 'zq' }, { cityName: '枣庄', pinYin: 'zaozhuang', py: 'zz' }, { cityName: '舟山', pinYin: 'zhoushan', py: 'zs' }, { cityName: '自贡', pinYin: 'zigong', py: 'zg' }, { cityName: '资阳', pinYin: 'ziyang', py: 'zy' }, { cityName: '张掖', pinYin: 'zhangye', py: 'zy' }]
};

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2016/10/29.
 */

var CHECKED = exports.CHECKED = 'https://gw.alicdn.com/tfs/TB1UT3VpgMPMeJjy1XdXXasrXXa-42-42.png';
var UN_CHECKED = exports.UN_CHECKED = 'https://gw.alicdn.com/tfs/TB1hE3VpgMPMeJjy1XdXXasrXXa-42-42.png';

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  less: '\uE6A5',
  'more_unfold': '\uE6A6',
  back: '\uE697',
  more: '\uE6A7',
  add: '\uE6B9',
  subtract: '\uE6FE',
  close: '\uE69A',
  cry: '\uE69C',
  delete: '\uE69D',
  help: '\uE6A3',
  refresh: '\uE6AA',
  search: '\uE6AC',
  success: '\uE6B1',
  warning: '\uE6B6',
  wrong: '\uE6B7',
  clock: '\uE6BB',
  scanning: '\uE6EC',
  filter: '\uE6F1',
  map: '\uE715',
  play: '\uE719'
};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.totalList = totalList;
exports.getSpecialData = getSpecialData;

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 根据26个字母取每一项首字母对数据进行排序,处理数据变换
 * @return {[array]}
 */
function totalList(source, hotListConfig, cityLocationConfig) {
  var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var res = [];
  LETTERS.split('').forEach(function (letter) {
    var _data = source.filter(function (item) {
      if (item.pinYin) {
        return item.pinYin.slice(0, 1).toLowerCase() === letter.toLowerCase();
      } else if (item.py) {
        return item.py.slice(0, 1).toLowerCase() === letter.toLowerCase();
      } else {
        return false;
      }
    });
    if (_data.length) {
      res.push({
        title: letter,
        data: _data,
        type: 'list'
      });
    }
  });

  // 处理热门数据
  var hotList = getSpecialData(hotListConfig);
  hotList && res.unshift(hotList);

  // 处理特殊定位数据
  var cityLocation = getSpecialData(cityLocationConfig);
  cityLocation && res.unshift(cityLocation);

  return res;
} /**
   * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
   * Created by Tw93 on 17/11/01
   */

function getSpecialData(data) {
  if (data && data.type && data.list && data.list.length > 0) {
    var type = data.type,
        title = data.title,
        list = data.list;

    return {
      title: title,
      type: type,
      data: type === 'group' ? _utils2.default.arrayChunk(list) : list
    };
  } else {
    return null;
  }
}

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showPig = showPig;
exports.hidePig = hidePig;
exports.shakePig = shakePig;

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/09/06.
 * 红包雨动画类
 */

var animation = weex.requireModule('animation');


var isIos = _utils2.default.env.isIOS();

function showPig(ref, duration, callback) {
  ref && animation.transition(ref, {
    styles: {
      transform: 'translate(0, -140px)',
      opacity: 1
    },
    duration: duration,
    timingFunction: 'ease-in'
  }, function () {
    callback && callback();
  });
}

function hidePig(ref, duration, callback) {
  ref && animation.transition(ref, {
    styles: {
      transform: 'translate(0, 0)',
      opacity: 0
    },
    duration: duration,
    timingFunction: 'ease-out'
  }, function () {
    callback && callback();
  });
}

function shakePig(ref, callback) {
  var duration = isIos ? 20 : 10;
  ref && animation.transition(ref, {
    styles: {
      transform: 'rotate(12deg) translate(0, -140px)'
    },
    duration: duration,
    timingFunction: 'ease-in'
  }, function () {
    animation.transition(ref, {
      styles: {
        transform: 'rotate(0) translate(0, -140px)'
      },
      duration: duration,
      timingFunction: 'ease-out'
    }, function () {
      animation.transition(ref, {
        styles: {
          transform: 'rotate(-12deg) translate(0, -140px)'
        },
        duration: duration,
        timingFunction: 'ease-in'
      }, function () {
        animation.transition(ref, {
          styles: {
            transform: 'rotate(0) translate(0, -140px)'
          },
          duration: duration,
          timingFunction: 'ease-out'
        }, function () {
          callback && callback();
        });
      });
    });
  });
}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT = exports.DEFAULT = {
  intervalTime: 400,
  hideAniTime: 300,
  showAniTime: 300,
  showTime: 400,
  randomTime: 300,
  width: 241,
  height: 206
};

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Region = {
  regions: [],
  isCross: function isCross(region) {
    var regions = this.regions;


    region.right = region.left + region.width;
    region.bottom = region.top + region.height;

    for (var i = 0; i < regions.length; i++) {
      var curRegion = regions[i];
      // 两区域相交
      curRegion.right = curRegion.left + curRegion.width;
      curRegion.bottom = curRegion.top + curRegion.height;
      if (!(region.left > curRegion.right || region.right < curRegion.left || region.bottom < curRegion.top || region.top > curRegion.bottom)) {
        return true;
      }
    }
    return false;
  },
  get: function get(width, height) {
    if (!width || !height) {
      return;
    }
    var i = 1000;
    var viewWidth = 750;
    var viewHeight = _utils2.default.env.getPageHeight();
    var wrapWidth = viewWidth - width;
    var wrapHeight = viewHeight - height - 140;
    wrapHeight = wrapHeight < 0 ? 0 : wrapHeight;
    wrapWidth = wrapWidth < 0 ? 0 : wrapWidth;

    var region = {
      left: '-9999px',
      top: '-9999px',
      width: width + 'px',
      height: height + 'px'
    };
    while (i--) {
      region.left = Math.round(Math.random() * wrapWidth) + 'px';
      region.top = Math.round(Math.random() * wrapHeight + height) + 'px';
      if (!this.isCross(region)) {
        this.add(region);
        return region;
      }
    }
  },
  buildRandom: function buildRandom() {
    return new Date().getTime() + '_' + parseInt(Math.random() * 1000000);
  },
  add: function add(region) {
    var regions = this.regions;

    region.id = this.buildRandom();
    regions.push(region);
  },
  remove: function remove(region) {
    var regions = this.regions;

    if (!region) return;
    for (var i = 0; i < regions.length; i++) {
      if (region.id === regions[i].id) {
        regions.splice(i, 1);
      }
    }
  }
}; /**
    * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
    * Created by Tw93 on 2017/09/06.
    * 红包雨区域检测类
    */

exports.default = Region;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by Tw93 on 2016/10/29.
 */

exports.default = {
  closeIcon: 'https://gw.alicdn.com/tfs/TB1THvhpwMPMeJjy1XcXXXpppXa-32-32.png',
  linkIcon: 'https://gw.alicdn.com/tfs/TB1utlZpwMPMeJjy1XdXXasrXXa-32-32.png',
  infoIcon: 'https://gw.alicdn.com/tfs/TB1xdlZpwMPMeJjy1XdXXasrXXa-32-32.png',
  warnIcon: 'https://gw.alicdn.com/tfs/TB1TCvhpwMPMeJjy1XcXXXpppXa-32-32.png',
  successIcon: 'https://gw.alicdn.com/tfs/TB12Em8pwMPMeJjy1XbXXcwxVXa-32-32.png',
  errorIcon: 'https://gw.alicdn.com/tfs/TB1UCvhpwMPMeJjy1XcXXXpppXa-32-32.png',
  questionIcon: 'https://gw.alicdn.com/tfs/TB1vJlZpwMPMeJjy1XdXXasrXXa-32-32.png',
  timeIcon: 'https://gw.alicdn.com/tfs/TB1eSzhpwMPMeJjy1XcXXXpppXa-30-30.png',
  redbag: 'https://gw.alicdn.com/tfs/TB1dCzhpwMPMeJjy1XcXXXpppXa-32-32.png'
};

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getTraditionalHoliday = _getTraditionalHoliday;
exports._isDate = _isDate;
exports._checkHash = _checkHash;
exports.getTime = getTime;
exports._isInRange = _isInRange;
exports._isInSelectRange = _isInSelectRange;
exports._fixNum = _fixNum;
exports._isWeekend = _isWeekend;
exports._isToday = _isToday;
exports._getMonthDays = _getMonthDays;
exports._getPadding = _getPadding;
exports._unique = _unique;
exports.getToDay = getToDay;
exports.getWeekRows = getWeekRows;
exports.generateDateCell = generateDateCell;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2017/07/29.
 */

// 国际节日
var GLOBAL_HOLIDAY = exports.GLOBAL_HOLIDAY = {
  '01-01': '元旦',
  '02-14': '情人',
  '05-01': '劳动',
  '06-01': '儿童',
  '10-01': '国庆',
  '12-25': '圣诞'
};

// 传统节日
var TRADITIONAL_HOLIDAY = {
  '除夕': ['2015-02-18', '2016-02-07', '2017-01-27', '2018-02-15', '2019-02-04', '2020-01-24'],
  '春节': ['2015-02-19', '2016-02-08', '2017-01-28', '2018-02-16', '2019-02-05', '2020-01-25'],
  '元宵': ['2015-03-05', '2016-02-22', '2017-02-11', '2018-03-02', '2019-02-19', '2020-02-08'],
  '清明': ['2015-04-05', '2016-04-04', '2017-04-04', '2018-04-05', '2019-04-05', '2020-04-04'],
  '端午': ['2015-06-20', '2016-06-09', '2017-05-30', '2018-06-18', '2019-06-07', '2020-06-25'],
  '中秋': ['2015-09-27', '2016-09-15', '2017-10-04', '2018-09-24', '2019-09-13', '2020-10-01'],
  '重阳': ['2015-10-21', '2016-10-09', '2017-10-28', '2018-10-17', '2019-10-07', '2020-10-25']
};

// 放假日
var REST_DAYS = ['2017-10-01', '2017-10-02', '2017-10-03', '2017-10-04', '2017-10-05', '2017-10-06', '2017-10-07', '2017-10-08'];

// 工作日
var WORK_DAYS = ['2017-09-30'];

function _getTraditionalHoliday() {
  var HOLIDAY_TEMP = {};

  var keys = Object.keys(TRADITIONAL_HOLIDAY);
  keys.forEach(function (k) {
    var arr = TRADITIONAL_HOLIDAY[k];
    arr.forEach(function (i) {
      HOLIDAY_TEMP[i] = k;
    });
  });
  return HOLIDAY_TEMP;
}

function _isDate(obj) {
  var type = obj === null ? String(obj) : {}.toString.call(obj) || 'object';
  return type === '[object date]';
}

/**
 * 检测Hash
 *
 * @method _checkHash
 * @private
 */
function _checkHash(url, hash) {
  return url && url.match(/#/) && url.replace(/^.*#/, '') === hash;
}

/**
 * 获取当前日期的毫秒数
 * @method getTime
 * @param {String} date
 * @return {Number}
 */
function getTime(date) {
  if (_isDate(date)) {
    return new Date(date).getTime();
  } else {
    try {
      return new Date(date.replace(/-/g, '/')).getTime();
    } catch (e) {
      return 0;
    }
  }
}

function _isInRange(range, date) {
  var start = getTime(range[0]);
  var end = getTime(range[1]);
  var d = getTime(date);
  return start <= d && end >= d;
}

function _isInSelectRange(range, date) {
  var start = getTime(range[0]);
  var end = getTime(range[1]);
  var d = getTime(date);
  return start < d && end > d;
}

function _fixNum(num) {
  return (num < 10 ? '0' : '') + num;
}

/**
 * 是否是周末
 * @method isWeekend
 * @param {String} date
 * @return {Boolean}
 */
function _isWeekend(date) {
  var day = new Date(date.replace(/-/g, '/')).getDay();
  return day === 0 || day === 6;
}

/**
 * 是否是今天
 * @method isToday
 * @param {String} date
 * @return {Boolean}
 */
function _isToday(today, date) {
  return getTime(today) === getTime(date);
}

/**
 * 检查是否是闰年
 * @method _checkLeapYear
 * @param {Number} y 年份
 * @param {Date} t today
 * @protected
 */
function _getMonthDays(y, t) {
  var MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var year = y || t.getFullYear();
  var isLeapYear = false;

  if (year % 100) {
    isLeapYear = !(year % 4);
  } else {
    isLeapYear = !(year % 400);
  }

  if (isLeapYear) {
    MONTH_DAYS[1] = 29;
  } else {
    MONTH_DAYS[1] = 28;
  }
  return MONTH_DAYS;
}

/**
 * 当月1号前面有多少空格
 * @method _getPadding
 * @protected
 */
function _getPadding(year, month) {
  var date = new Date(year + '/' + month + '/1');
  return date.getDay();
}

function _unique(array) {
  return Array.prototype.filter.call(array, function (item, index) {
    return array.indexOf(item) === index;
  });
}

function getToDay() {
  return new Date().getFullYear() + '-' + _fixNum(new Date().getMonth() + 1) + '-' + _fixNum(new Date().getDate());
}

function getWeekRows(y, m, today, dateRange, departDate, arriveDate, selectedNote, descList) {
  var monthDays = _getMonthDays(y, today);
  var padding = _getPadding(y, m, 7);
  var num = monthDays[m - 1] + padding;
  var rows = Math.ceil(num / 7);
  var remain = num % 7;
  var rowsData = [];

  for (var i = 1; i <= rows; i++) {
    var cells = [];

    for (var j = 1; j <= 7; j++) {
      var cell = {};
      // 前后空格
      if (i === 1 && j <= padding || remain && i === rows && j > remain) {
        cell.isEmpty = true;
      } else {
        (function () {
          var d = (i - 1) * 7 + j - padding;
          var date = y + '-' + _fixNum(m) + '-' + _fixNum(d);
          var cls = [];
          var ref = '';
          var cellClass = [];
          var isInRange = _isInRange(dateRange, date);
          var disabled = false;
          var global = _fixNum(m) + '-' + _fixNum(d);
          var note = '';
          var ext = '';
          var isSelected = false;

          if (descList && descList.length > 0) {
            var nowDesc = descList.filter(function (item) {
              return item.date === date;
            });
            if (nowDesc && nowDesc.length > 0) {
              ext = nowDesc[0].value;
              if (nowDesc[0].emphasize) {
                cls.push('calendar-holiday');
              }
            }
          }

          // 国际节日
          if (GLOBAL_HOLIDAY[global]) {
            note = GLOBAL_HOLIDAY[global];
            cls.push('calendar-holiday');
          }

          var tHoliday = _getTraditionalHoliday()[date];

          // 传统节日
          if (tHoliday) {
            note = tHoliday;
            cls.push('calendar-holiday');
          }
          // 放假日
          if (REST_DAYS.indexOf(date) > -1) {
            cls.push('calendar-holiday');
          }

          // 工作日
          if (WORK_DAYS.indexOf(date) > -1) {
            cls.push('calendar-work');
          }

          // 周末
          if (_isWeekend(date)) {
            cls.push('calendar-holiday');
          }

          // 今天
          if (_isToday(today, date)) {
            cls.push('calendar-today');
            note = '今天';
          }

          // 不在日期范围内
          if (!isInRange) {
            disabled = true;
          }

          if (disabled) {
            cls = [];
            cls.push('calendar-disabled');
            cellClass.push('cell-disabled');
          }

          if (!ext && disabled && isInRange) {
            ext = '不可选';
          }

          if (departDate === date || arriveDate === date) {
            note = departDate === date ? selectedNote[0] : selectedNote[1];
            ref = departDate === date ? 'departDate' : 'arriveDate';
            if (departDate === arriveDate && selectedNote.length >= 3) {
              note = selectedNote[2];
            }
            isSelected = true;
            cls.push('item-text-selected');
            cellClass.push('item-row-selected');
          }

          if (departDate && arriveDate && _isInSelectRange([departDate, arriveDate], date)) {
            cellClass.push('calendar-day-include');
          }

          cell = {
            isSelected: isSelected,
            isEmpty: false,
            ref: ref,
            cls: _unique(cls).join(' '),
            cellClass: _unique(cellClass).join(' '),
            note: note,
            date: date,
            ext: ext,
            disabled: disabled,
            text: d
          };
        })();
      }
      cells.push(cell);
    }

    rowsData.push(cells);
  }

  return rowsData;
}

function generateDateCell(_ref) {
  var range = _ref.range,
      today = _ref.today,
      departDate = _ref.departDate,
      arriveDate = _ref.arriveDate,
      selectedNote = _ref.selectedNote,
      descList = _ref.descList;

  var start = new Date(range[0].replace(/-/g, '/'));
  var end = new Date(range[1].replace(/-/g, '/'));
  var startYear = start.getFullYear();
  var startMonth = start.getMonth() + 1;
  var endYear = end.getFullYear();
  var endMonth = end.getMonth() + 1;

  var l = (endYear - startYear) * 12 + endMonth - startMonth + 1;
  var y = startYear;
  var n = startMonth;
  var months = [];

  for (var i = 0; i < l; i++) {
    if (n > 12) {
      n = 1;
      y++;
    }
    months.push.apply(months, [{ title: y + '-' + _fixNum(n) }].concat(_toConsumableArray(getWeekRows(y, n, today, range, departDate, arriveDate, selectedNote, descList))));
    n++;
  }
  return months;
}

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHECKED = exports.CHECKED = 'https://gw.alicdn.com/tfs/TB1Y9vlpwMPMeJjy1XcXXXpppXa-72-72.png';
var DISABLED = exports.DISABLED = 'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png';

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2016/11/4.
 */

exports.default = {
  errorPage: {
    pic: 'https://img.alicdn.com/tfs/TB17blphfDH8KJjy1XcXXcpdXXa-320-320.png',
    content: '抱歉出错了，我们正在全力解决中',
    button: '再试一次',
    title: '出错啦'
  },
  noGoods: {
    pic: 'https://img.alicdn.com/tfs/TB1mPWEeOqAXuNjy1XdXXaYcVXa-320-320.png',
    content: '主人，这里什么都没有找到',
    button: '再试一次',
    title: '暂无商品'
  },
  noNetwork: {
    pic: 'https://img.alicdn.com/tfs/TB1jkA5g9_I8KJjy0FoXXaFnVXa-320-320.png',
    content: '哎呀，没有网络了......',
    button: '刷新一下',
    title: '无网络'
  },
  errorLocation: {
    pic: 'https://img.alicdn.com/tfs/TB1zXXahhrI8KJjy0FpXXb5hVXa-320-320.png',
    content: '哎呀，定位失败了......',
    button: '刷新一下',
    title: '定位失败'
  }
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * CopyRight (C) 2017-2022 Alibaba Group Holding Limited.
 * Created by Tw93 on 2016/10/31.
 */

var INPUT_ICON = exports.INPUT_ICON = "https://gw.alicdn.com/tfs/TB1FZB.pwMPMeJjy1XdXXasrXXa-30-30.png";
var CLOSE_ICON = exports.CLOSE_ICON = "https://gw.alicdn.com/tfs/TB1sZB.pwMPMeJjy1XdXXasrXXa-24-24.png";
var ARROW_ICON = exports.ARROW_ICON = "https://gw.alicdn.com/tfs/TB1vZB.pwMPMeJjy1XdXXasrXXa-24-24.png";

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , undef;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String|Null} The decoded string.
 * @api private
 */
function decode(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, ' '));
  } catch (e) {
    return null;
  }
}

/**
 * Attempts to encode a given input.
 *
 * @param {String} input The string that needs to be encoded.
 * @returns {String|Null} The encoded string.
 * @api private
 */
function encode(input) {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    // In the case if failed decoding, we want to omit the key/value pairs
    // from the result.
    //
    if (key === null || value === null || key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = []
    , value
    , key;

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];

      //
      // Edge cases where we actually want to encode the value to an empty
      // string instead of the stringified value.
      //
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = '';
      }

      key = encodeURIComponent(key);
      value = encodeURIComponent(value);

      //
      // If we failed to encode the strings, we should bail out as we don't
      // want to add invalid strings to the query.
      //
      if (key === null || value === null) continue;
      pairs.push(key +'='+ value);
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var required = __webpack_require__(157)
  , qs = __webpack_require__(156)
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address) {          // Sanitize what is left of the address
    return address.replace('\\', '/');
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var globalVar;

  if (typeof window !== 'undefined') globalVar = window;
  else if (typeof {} !== 'undefined') globalVar = {};
  else if (typeof self !== 'undefined') globalVar = self;
  else globalVar = {};

  var location = globalVar.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} [location] Location defaults for relative paths.
 * @param {Boolean|Function} [parser] Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.qs = qs;

module.exports = Url;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(265)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(95),
  /* template */
  __webpack_require__(221),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-36f80855",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-button/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-36f80855", Component.options)
  } else {
    hotAPI.reload("data-v-36f80855", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(262)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(96),
  /* template */
  __webpack_require__(217),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-289df085",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-cell/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-289df085", Component.options)
  } else {
    hotAPI.reload("data-v-289df085", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(97),
  /* template */
  __webpack_require__(218),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-checkbox-list/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2d0e23fb", Component.options)
  } else {
    hotAPI.reload("data-v-2d0e23fb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(287)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(99),
  /* template */
  __webpack_require__(244),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-a0576d64",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-city/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a0576d64", Component.options)
  } else {
    hotAPI.reload("data-v-a0576d64", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(250)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(100),
  /* template */
  __webpack_require__(203),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-00002f91",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-city/tab.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] tab.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-00002f91", Component.options)
  } else {
    hotAPI.reload("data-v-00002f91", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(284)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(101),
  /* template */
  __webpack_require__(241),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8dcc12f8",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-countdown/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8dcc12f8", Component.options)
  } else {
    hotAPI.reload("data-v-8dcc12f8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(281)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(102),
  /* template */
  __webpack_require__(237),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7a03baeb",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-dialog/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a03baeb", Component.options)
  } else {
    hotAPI.reload("data-v-7a03baeb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(253)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(103),
  /* template */
  __webpack_require__(208),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-15fdfbd4",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-ep-slider/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-15fdfbd4", Component.options)
  } else {
    hotAPI.reload("data-v-15fdfbd4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(272)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(104),
  /* template */
  __webpack_require__(228),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-50bc0536",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-grid-select/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50bc0536", Component.options)
  } else {
    hotAPI.reload("data-v-50bc0536", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(259)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(105),
  /* template */
  __webpack_require__(214),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2289217e",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-grid-select/option.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] option.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2289217e", Component.options)
  } else {
    hotAPI.reload("data-v-2289217e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(271)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(106),
  /* template */
  __webpack_require__(227),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-50ae1a48",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-icon/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50ae1a48", Component.options)
  } else {
    hotAPI.reload("data-v-50ae1a48", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(282)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(107),
  /* template */
  __webpack_require__(239),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8a0583fa",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-indexlist/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8a0583fa", Component.options)
  } else {
    hotAPI.reload("data-v-8a0583fa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(257)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(108),
  /* template */
  __webpack_require__(212),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1f2af058",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-lightbox/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1f2af058", Component.options)
  } else {
    hotAPI.reload("data-v-1f2af058", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(264)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(109),
  /* template */
  __webpack_require__(220),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3681adcf",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-loading/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3681adcf", Component.options)
  } else {
    hotAPI.reload("data-v-3681adcf", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(289)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(110),
  /* template */
  __webpack_require__(246),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-a7a9618a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-lottery-rain/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a7a9618a", Component.options)
  } else {
    hotAPI.reload("data-v-a7a9618a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(279)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(111),
  /* template */
  __webpack_require__(235),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7513c695",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-lottery-rain/rain-item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] rain-item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7513c695", Component.options)
  } else {
    hotAPI.reload("data-v-7513c695", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(266)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(112),
  /* template */
  __webpack_require__(222),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3b9aece2",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-mask/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3b9aece2", Component.options)
  } else {
    hotAPI.reload("data-v-3b9aece2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(286)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(113),
  /* template */
  __webpack_require__(243),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-991a6e22",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-minibar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-991a6e22", Component.options)
  } else {
    hotAPI.reload("data-v-991a6e22", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(270)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(114),
  /* template */
  __webpack_require__(226),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4edbf20e",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-noticebar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4edbf20e", Component.options)
  } else {
    hotAPI.reload("data-v-4edbf20e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(254)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(115),
  /* template */
  __webpack_require__(209),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-16b9703a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-overlay/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16b9703a", Component.options)
  } else {
    hotAPI.reload("data-v-16b9703a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(263)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(116),
  /* template */
  __webpack_require__(219),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3472bf4f",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-page-calendar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3472bf4f", Component.options)
  } else {
    hotAPI.reload("data-v-3472bf4f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(117),
  /* template */
  __webpack_require__(238),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-pan-item/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7f79c426", Component.options)
  } else {
    hotAPI.reload("data-v-7f79c426", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(118),
  /* template */
  __webpack_require__(204),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-part-loading/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-01c9e485", Component.options)
  } else {
    hotAPI.reload("data-v-01c9e485", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(288)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(119),
  /* template */
  __webpack_require__(245),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-a26f8810",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-popover/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a26f8810", Component.options)
  } else {
    hotAPI.reload("data-v-a26f8810", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(291)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(120),
  /* template */
  __webpack_require__(248),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-ca872182",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-popup/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ca872182", Component.options)
  } else {
    hotAPI.reload("data-v-ca872182", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(252)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(121),
  /* template */
  __webpack_require__(206),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0f8938e0",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-progress/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0f8938e0", Component.options)
  } else {
    hotAPI.reload("data-v-0f8938e0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(273)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(122),
  /* template */
  __webpack_require__(229),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-56150864",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-radio/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56150864", Component.options)
  } else {
    hotAPI.reload("data-v-56150864", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(276)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(123),
  /* template */
  __webpack_require__(232),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6f935647",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-radio/item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f935647", Component.options)
  } else {
    hotAPI.reload("data-v-6f935647", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(258)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(124),
  /* template */
  __webpack_require__(213),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2059e45b",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-refresher/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2059e45b", Component.options)
  } else {
    hotAPI.reload("data-v-2059e45b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(260)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(125),
  /* template */
  __webpack_require__(215),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-254bbf80",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-result/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-254bbf80", Component.options)
  } else {
    hotAPI.reload("data-v-254bbf80", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(290)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(126),
  /* template */
  __webpack_require__(247),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-c98168de",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c98168de", Component.options)
  } else {
    hotAPI.reload("data-v-c98168de", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(292)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(127),
  /* template */
  __webpack_require__(249),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-fb43e778",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-icon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] wxc-rich-text-icon.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fb43e778", Component.options)
  } else {
    hotAPI.reload("data-v-fb43e778", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(128),
  /* template */
  __webpack_require__(207),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-rich-text/wxc-rich-text-link.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] wxc-rich-text-link.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14f05176", Component.options)
  } else {
    hotAPI.reload("data-v-14f05176", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(268)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(131),
  /* template */
  __webpack_require__(224),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3c9bb53e",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-searchbar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c9bb53e", Component.options)
  } else {
    hotAPI.reload("data-v-3c9bb53e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(274)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(132),
  /* template */
  __webpack_require__(230),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-61efacbc",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-simple-flow/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61efacbc", Component.options)
  } else {
    hotAPI.reload("data-v-61efacbc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(256)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(133),
  /* template */
  __webpack_require__(211),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1983b04c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-slide-nav/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1983b04c", Component.options)
  } else {
    hotAPI.reload("data-v-1983b04c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(255)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(134),
  /* template */
  __webpack_require__(210),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1797400a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-slider-bar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1797400a", Component.options)
  } else {
    hotAPI.reload("data-v-1797400a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(275)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(135),
  /* template */
  __webpack_require__(231),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6f52a706",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-special-rich-text/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f52a706", Component.options)
  } else {
    hotAPI.reload("data-v-6f52a706", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(280)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(136),
  /* template */
  __webpack_require__(236),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-76fd3d24",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-stepper/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-76fd3d24", Component.options)
  } else {
    hotAPI.reload("data-v-76fd3d24", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(251)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(137),
  /* template */
  __webpack_require__(205),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0acdc68c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-swipe-action/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0acdc68c", Component.options)
  } else {
    hotAPI.reload("data-v-0acdc68c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(285)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(138),
  /* template */
  __webpack_require__(242),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-9576a0a4",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-tab-bar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9576a0a4", Component.options)
  } else {
    hotAPI.reload("data-v-9576a0a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(261)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(139),
  /* template */
  __webpack_require__(216),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-26056765",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-tab-page/full-page.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] full-page.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-26056765", Component.options)
  } else {
    hotAPI.reload("data-v-26056765", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(269)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(140),
  /* template */
  __webpack_require__(225),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3f00baac",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-tab-page/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3f00baac", Component.options)
  } else {
    hotAPI.reload("data-v-3f00baac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(267)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(141),
  /* template */
  __webpack_require__(223),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3c51aaad",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Tw93/www/github/weex-ui/packages/wxc-tag/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c51aaad", Component.options)
  } else {
    hotAPI.reload("data-v-3c51aaad", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: "tab-box weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, _vm._l((['国内', '国际']), function(name, i) {
    return _c('div', {
      key: i,
      staticClass: "tab-item weex-ct weex-div",
      attrs: {
        "weex-type": "div",
        "data-evt-click": ""
      },
      on: {
        "click": _vm.$stopOuterA,
        "weex$tap": function($event) {
          $event.stopPropagation();
          return _vm.switchTab(i)
        }
      }
    }, [_c('p', {
      staticClass: "['tab-item-text', i===checkedIndex && 'text-selected'] weex-el weex-text",
      attrs: {
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(name))])])
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "tab-item-selected-bar weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    ref: "tab-bar",
    staticClass: "tab-item-selected-bar-in weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: "tab-item-active weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-00002f91", module.exports)
  }
}

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [(_vm.show) ? _c('figure', {
    directives: [{
      name: "weex-resize",
      rawName: "v-weex-resize",
      value: ("contain"),
      expression: "\"contain\""
    }],
    staticClass: " weex-el weex-image",
    style: (_vm._px2rem(_vm.loadingStyle, 75)),
    attrs: {
      "src": _vm.PART,
      "resize": "contain",
      "quality": "original",
      "data-img-src": _vm.PART,
      "weex-type": "image"
    }
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-01c9e485", module.exports)
  }
}

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, _vm._l((_vm.data), function(item, i) {
    return _c('div', {
      key: 'skid-' + i,
      ref: "skid",
      refInFor: true,
      staticClass: "wxc-skid weex-ct weex-div",
      style: ({
        width: _vm._px2rem(750 + item.right.length * 100 + 'px', 75),
        height: _vm._px2rem(_vm.height + 'px', 75)
      }),
      attrs: {
        "weex-type": "div",
        "data-evt-click": "",
        "data-evt-touchstart": "",
        "data-evt-horizontalpan": "",
        "data-evt-touchend": ""
      },
      on: {
        "click": _vm.$stopOuterA,
        "touchstart": function($event) {
          $event.stopPropagation();
          return (function (e) { return !_vm.isAndroid && _vm.onPanStart(e, item, i); })($event)
        },
        "horizontalpan": function (e) { return _vm.isAndroid && _vm.onPanStart(e, item, i); },
        "touchend": function($event) {
          $event.stopPropagation();
          return (function (e) { return _vm.onPanEnd(e, item, i); })($event)
        },
        "weex$tap": function($event) {
          $event.stopPropagation();
          return _vm.onNodeClick(item, i)
        }
      }
    }, [_c('div', {
      staticClass: "swipe-action-center border weex-ct weex-div",
      style: (_vm._px2rem(_vm.styles, 75)),
      attrs: {
        "weex-type": "div"
      }
    }, [_vm._t("default", null, {
      "val": {
        item: item,
        index: i
      }
    })], 2), _vm._v(" "), _c('div', {
      staticClass: "swipe-action-right weex-ct weex-div",
      attrs: {
        "weex-type": "div"
      }
    }, _vm._l((item.right), function(child, childIdx) {
      return _c('p', {
        key: 'child-' + childIdx,
        staticClass: "swipe-action-child swipe-action-text weex-el weex-text",
        style: (_vm._processExclusiveStyle(Object.assign({
          lineHeight: _vm.height + 'px'
        }, child.style || {}), 75, 'text')),
        attrs: {
          "weex-type": "text",
          "data-evt-click": ""
        },
        on: {
          "click": _vm.$stopOuterA,
          "weex$tap": function($event) {
            $event.stopPropagation();
            return _vm.onRightNode(item, child, i)
          }
        }
      }, [_vm._v(_vm._s(child.text))])
    }), 0)])
  }), 0)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0acdc68c", module.exports)
  }
}

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-progress weex-ct weex-div",
    style: (_vm._px2rem(_vm.runWayStyle, 75)),
    attrs: {
      "accessible": true,
      "aria-label": ("进度为百分之" + _vm.value),
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: "progress weex-ct weex-div",
    style: (_vm._px2rem(_vm.progressStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0f8938e0", module.exports)
  }
}

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.onLinkClick($event)
      }
    }
  }, [_c('wxc-rich-text-text', {
    attrs: {
      "text-value": _vm.linkValue,
      "has-text-margin": _vm.hasTextMargin,
      "text-style": _vm.linkStyle ? _vm.linkStyle : _vm.defObj,
      "text-theme": _vm.linkTheme ? _vm.linkTheme : 'black'
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-14f05176", module.exports)
  }
}

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    style: (_vm._px2rem(_vm.containerS, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    ref: ("sliderCtn_" + _vm.sliderId),
    staticClass: " weex-ct weex-div",
    style: ({
      width: _vm._px2rem(_vm.cardWidth + 'px', 75),
      height: _vm._px2rem(_vm.cardS.height + 'px', 75),
      transform: _vm._px2rem(("translateX(-" + (_vm.currentIndex * (_vm.cardS.width + _vm.cardS.spacing)) + "px)"), 75)
    }),
    attrs: {
      "weex-type": "div",
      "data-evt-panstart": "",
      "data-evt-panmove": "",
      "data-evt-panend": "",
      "data-evt-horizontalpan": ""
    },
    on: {
      "panstart": function($event) {
        $event.stopPropagation();
        return _vm.onPanStart($event)
      },
      "panmove": function($event) {
        $event.stopPropagation();
        return _vm.onPanMove($event)
      },
      "panend": function($event) {
        $event.stopPropagation();
        return _vm.onPanEnd($event)
      },
      "horizontalpan": _vm.onEpPanStart
    }
  }, [_vm._l((_vm.cardList), function(v, index) {
    return _c('div', {
      ref: ("card" + index + "_" + _vm.sliderId),
      refInFor: true,
      staticClass: "slider weex-ct weex-div",
      style: ({
        transform: _vm._px2rem(("scale(" + (index === _vm.currentIndex ? 1 : _vm.cardS.scale) + ")"), 75),
        left: _vm._px2rem(((index * (_vm.cardS.width + _vm.cardS.spacing)) + "px"), 75),
        marginLeft: _vm._px2rem((((_vm.containerS.width - _vm.cardS.width) / 2) + "px"), 75),
        width: _vm._px2rem(_vm.cardS.width + 'px', 75),
        height: _vm._px2rem(_vm.cardS.height + 'px', 75)
      }),
      attrs: {
        "weex-type": "div"
      }
    }, [_vm._t(("card" + index + "_" + _vm.sliderId), null, {})], 2)
  }), _vm._v(" "), _vm._t("pull-more", null, {})], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-15fdfbd4", module.exports)
  }
}

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [(_vm.show) ? _c('div', {
    ref: "wxc-overlay",
    staticClass: "wxc-overlay weex-ct weex-div",
    style: (_vm._px2rem(_vm.overlayStyle, 75)),
    attrs: {
      "hack": _vm.shouldShow,
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.overlayClicked($event)
      }
    }
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-16b9703a", module.exports)
  }
}

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "bar-container",
    staticClass: "slider-bar-container weex-ct weex-div",
    style: (_vm._px2rem(_vm.containerStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: "range-bar weex-ct weex-div",
    style: (_vm._px2rem(_vm.rangeBarStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    ref: "value-bar",
    staticClass: "value-bar weex-ct weex-div",
    style: (_vm._px2rem(_vm.valueBarStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  })])]), _vm._v(" "), _c('div', {
    ref: "slide-block-1",
    staticClass: "slide-block weex-ct weex-div",
    style: (_vm._px2rem(_vm.blockStyle1, 75)),
    attrs: {
      "prevent-move-event": _vm.preventMoveEvent,
      "weex-type": "div",
      "data-evt-panstart": "",
      "data-evt-panmove": "",
      "data-evt-touchstart": "",
      "data-evt-touchend": "",
      "data-evt-horizontalpan": ""
    },
    on: {
      "panstart": function($event) {
        $event.stopPropagation();
        return _vm.webStartHandler($event)
      },
      "panmove": function($event) {
        $event.stopPropagation();
        return _vm.webMoveHandler1($event)
      },
      "touchstart": function($event) {
        $event.stopPropagation();
        return _vm.weexStartHandler1($event)
      },
      "touchend": function($event) {
        $event.stopPropagation();
        return _vm.weexEndHandler($event)
      },
      "horizontalpan": _vm.weexHandler1
    }
  }, [_c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  })]), _vm._v(" "), (_vm.range) ? _c('div', {
    ref: "slide-block-2",
    staticClass: "slide-block weex-ct weex-div",
    style: (_vm._px2rem(_vm.blockStyle2, 75)),
    attrs: {
      "prevent-move-event": _vm.preventMoveEvent,
      "weex-type": "div",
      "data-evt-panstart": "",
      "data-evt-panmove": "",
      "data-evt-touchstart": "",
      "data-evt-touchend": "",
      "data-evt-horizontalpan": ""
    },
    on: {
      "panstart": function($event) {
        $event.stopPropagation();
        return _vm.webStartHandler($event)
      },
      "panmove": function($event) {
        $event.stopPropagation();
        return _vm.webMoveHandler2($event)
      },
      "touchstart": function($event) {
        $event.stopPropagation();
        return _vm.weexStartHandler2($event)
      },
      "touchend": function($event) {
        $event.stopPropagation();
        return _vm.weexEndHandler($event)
      },
      "horizontalpan": _vm.weexHandler2
    }
  }, [_c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  })]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1797400a", module.exports)
  }
}

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "wrapper",
    staticClass: "slide-nav weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_vm._t("default", null, {})], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1983b04c", module.exports)
  }
}

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-mask', {
    attrs: {
      "width": _vm.width,
      "height": _vm.height,
      "aria-hidden": "true",
      "mask-bg-color": "transparent",
      "overlay-opacity": "0.8",
      "show": _vm.show,
      "opacity": _vm.opacity,
      "show-close": false,
      "data-evt-wxcMaskSetHidden": ""
    },
    on: {
      "wxcMaskSetHidden": _vm.maskOverlayClick
    }
  }, [(_vm.show) ? _c('slider', {
    style: ({
      height: _vm._px2rem(_vm.height + 'px', 75)
    }),
    attrs: {
      "auto-play": "false",
      "index": _vm.index,
      "interval": _vm.interval
    }
  }, [_vm._l((_vm.imageList), function(v, index) {
    return _c('div', {
      key: index,
      staticClass: " weex-ct weex-div",
      style: ({
        height: _vm._px2rem(_vm.height + 'px', 75)
      }),
      attrs: {
        "weex-type": "div"
      }
    }, [_c('figure', {
      directives: [{
        name: "weex-resize",
        rawName: "v-weex-resize",
        value: ("cover"),
        expression: "\"cover\""
      }],
      staticClass: " weex-el weex-image",
      style: ({
        height: _vm._px2rem(_vm.height + 'px', 75),
        width: _vm._px2rem(_vm.width + 'px', 75)
      }),
      attrs: {
        "resize": "cover",
        "src": v.src,
        "data-img-src": v.src,
        "weex-type": "image"
      }
    })])
  }), _vm._v(" "), _c('indicator', {
    staticClass: "indicator",
    style: (_vm._px2rem(_vm.indicatorStyle, 75)),
    attrs: {}
  })], 2) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1f2af058", module.exports)
  }
}

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('refresh', {
    staticClass: "wxc-refresher",
    attrs: {
      "display": _vm.refreshing ? 'show' : 'hide',
      "data-evt-refresh": "",
      "data-evt-pullingdown": ""
    },
    nativeOn: {
      "refresh": function($event) {
        $event.stopPropagation();
        return _vm.onRefresh($event)
      },
      "pullingdown": function($event) {
        $event.stopPropagation();
        return _vm.onPullingDown($event)
      }
    }
  }, [(_vm.newStyleFlag) ? _c('div', {
    ref: "cycle",
    staticClass: "cycle-container weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    ref: "cover1",
    staticClass: "u-cover c1 weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: "u-cover-cycle cover1 weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  })]), _vm._v(" "), _c('div', {
    ref: "cover2",
    staticClass: "u-cover c2 weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    ref: "cover-cycle",
    staticClass: "u-cover-cycle weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  })])]) : _vm._e(), _vm._v(" "), (_vm.newStyleFlag) ? _c('figure', {
    directives: [{
      name: "weex-resize",
      rawName: "v-weex-resize",
      value: ("contain"),
      expression: "\"contain\""
    }],
    ref: "arrow",
    staticClass: "arrow-down weex-el weex-image",
    attrs: {
      "src": _vm.ICON_ARROW_DOWN,
      "resize": "contain",
      "data-img-src": _vm.ICON_ARROW_DOWN,
      "weex-type": "image"
    }
  }) : _c('loading-indicator', {
    staticClass: "indicator",
    attrs: {}
  }), _vm._v(" "), _c('p', {
    staticClass: "u-txt weex-el weex-text",
    style: ({
      width: _vm._px2rem((_vm.textWidth + "px"), 75)
    }),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.refresherText))])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2059e45b", module.exports)
  }
}

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "grid-option weex-ct weex-div",
    style: (_vm._px2rem(_vm.cWrapperStyle, 75)),
    attrs: {
      "accessible": true,
      "aria-label": (_vm.title + "," + (_vm.checked?'已选中':'未选中')),
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.onClick($event)
      }
    }
  }, [(_vm.title) ? _c('p', {
    staticClass: "text-title weex-el weex-text",
    style: (_vm._processExclusiveStyle(_vm.cTitleStyle, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), (_vm.checked && _vm.icon) ? _c('figure', {
    staticClass: "image-checked weex-el weex-image",
    attrs: {
      "src": _vm.icon,
      "data-img-src": _vm.icon,
      "weex-type": "image"
    }
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2289217e", module.exports)
  }
}

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: "wrap weex-ct weex-div",
    style: (_vm._px2rem(_vm.wrapStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: "wxc-result weex-ct weex-div",
    style: ({
      paddingTop: _vm._px2rem(_vm.setPaddingTop, 75)
    }),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('figure', {
    staticClass: "result-image weex-el weex-image",
    attrs: {
      "aria-hidden": true,
      "src": _vm.resultType.pic,
      "data-img-src": _vm.resultType.pic,
      "weex-type": "image"
    }
  }), _vm._v(" "), (_vm.resultType.content) ? _c('div', {
    staticClass: "result-content weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_c('p', {
    staticClass: "content-text weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.resultType.content))]), _vm._v(" "), (_vm.resultType.desc) ? _c('p', {
    staticClass: "content-text content-desc weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.resultType.desc))]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.resultType.button) ? _c('div', {
    staticClass: "result-button weex-ct weex-div",
    attrs: {
      "weex-type": "div",
      "data-evt-touchend": "",
      "data-evt-click": ""
    },
    on: {
      "touchend": function($event) {
        $event.stopPropagation();
        return _vm.handleTouchEnd($event)
      },
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.onClick($event)
      }
    }
  }, [_c('p', {
    staticClass: "button-text weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.resultType.button))])]) : _vm._e()])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-254bbf80", module.exports)
  }
}

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-tab-page weex-ct weex-div",
    style: ({
      height: _vm._px2rem(_vm.tabPageHeight + 'px', 75)
    }),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    ref: "tab-page-wrap",
    staticClass: "tab-page-wrap weex-ct weex-div",
    style: ({
      height: _vm._px2rem(_vm.tabPageHeight + 'px', 75)
    }),
    attrs: {
      "prevent-move-event": true,
      "weex-type": "div",
      "data-evt-horizontalpan": ""
    },
    on: {
      "horizontalpan": _vm.startHandler
    }
  }, [_c('div', {
    ref: "tab-container",
    staticClass: "tab-container weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_vm._t("default", null, {})], 2)]), _vm._v(" "), _c('scroller', {
    ref: "tab-title-list",
    staticClass: "tab-title-list",
    style: ({
      backgroundColor: _vm.tabStyles.bgColor,
      height: _vm._px2rem(_vm.tabStyles.height + 'px', 75),
      top: _vm._px2rem(_vm.tabStyles.top + 'px', 75)
    }),
    attrs: {
      "show-scrollbar": false,
      "scroll-direction": "horizontal",
      "data-spm": _vm.spmC
    }
  }, _vm._l((_vm.tabTitles), function(v, index) {
    return _c('div', {
      key: index,
      ref: 'wxc-tab-title-' + index,
      refInFor: true,
      staticClass: "title-item weex-ct weex-div",
      style: ({
        width: _vm._px2rem(_vm.tabStyles.width + 'px', 75),
        height: _vm._px2rem(_vm.tabStyles.height + 'px', 75),
        backgroundColor: _vm.currentPage == index ? _vm.tabStyles.activeBgColor : _vm.tabStyles.bgColor
      }),
      attrs: {
        "accessible": true,
        "aria-label": ("" + (v.title?v.title:'标签'+index)),
        "weex-type": "div",
        "data-evt-click": ""
      },
      on: {
        "click": _vm.$stopOuterA,
        "weex$tap": function($event) {
          $event.stopPropagation();
          return _vm.setPage(index, v.url)
        }
      }
    }, [(_vm.titleType == 'icon') ? _c('figure', {
      staticClass: " weex-el weex-image",
      style: ({
        width: _vm._px2rem(_vm.tabStyles.iconWidth + 'px', 75),
        height: _vm._px2rem(_vm.tabStyles.iconHeight + 'px', 75)
      }),
      attrs: {
        "src": _vm.currentPage == index ? v.activeIcon : v.icon,
        "data-img-src": _vm.currentPage == index ? v.activeIcon : v.icon,
        "weex-type": "image"
      }
    }) : _vm._e(), _vm._v(" "), _c('p', {
      staticClass: "tab-text weex-el weex-text",
      style: ({
        fontSize: _vm._px2rem(_vm.tabStyles.fontSize + 'px', 75),
        fontWeight: _vm.currentPage == index && _vm.tabStyles.isActiveTitleBold ? 'bold' : 'normal',
        color: _vm.currentPage == index ? _vm.tabStyles.activeTitleColor : _vm.tabStyles.titleColor,
        paddingLeft: _vm._px2rem((_vm.tabStyles.textPaddingLeft ? _vm.tabStyles.textPaddingLeft : 10) + 'px', 75),
        paddingRight: _vm._px2rem((_vm.tabStyles.textPaddingRight ? _vm.tabStyles.textPaddingRight : 10) + 'px', 75)
      }),
      attrs: {
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(v.title))]), _vm._v(" "), (_vm.tabStyles.hasActiveBottom) ? _c('div', {
      staticClass: "border-bottom weex-ct weex-div",
      style: ({
        width: _vm._px2rem(_vm.tabStyles.activeBottomWidth + 'px', 75),
        left: _vm._px2rem((_vm.tabStyles.width - _vm.tabStyles.activeBottomWidth) / 2 + 'px', 75),
        height: _vm._px2rem(_vm.tabStyles.activeBottomHeight + 'px', 75),
        backgroundColor: _vm.currentPage == index ? _vm.tabStyles.activeBottomColor : 'transparent'
      }),
      attrs: {
        "weex-type": "div"
      }
    }) : _vm._e()])
  }), 0)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-26056765", module.exports)
  }
}

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    class: ['wxc-cell', _vm.hasTopBorder && 'cell-top-border', _vm.hasBottomBorder && 'cell-bottom-border', _vm.hasMargin && 'cell-margin', _vm.hasVerticalIndent && 'cell-indent', _vm.desc && 'has-desc'],
    style: (_vm._px2rem(_vm.cellStyle, 75)),
    attrs: {
      "accessible": _vm.autoAccessible,
      "aria-label": (_vm.label + "," + _vm.title + "," + _vm.desc),
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.cellClicked($event)
      }
    }
  }, [_vm._t("label", [(_vm.label) ? _c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_c('p', {
    staticClass: "cell-label-text weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.label))])]) : _vm._e()], {}), _vm._v(" "), _c('div', {
    staticClass: "cell-title weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_vm._t("title", [_c('p', {
    staticClass: "cell-content weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), (_vm.desc) ? _c('p', {
    staticClass: "cell-desc-text weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.desc))]) : _vm._e()], {})], 2), _vm._v(" "), _vm._t("value", null, {}), _vm._v(" "), _vm._t("default", null, {}), _vm._v(" "), (_vm.extraContent) ? _c('p', {
    staticClass: "extra-content-text weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.extraContent))]) : _vm._e(), _vm._v(" "), (_vm.hasArrow) ? _c('figure', {
    staticClass: "cell-arrow-icon weex-el weex-image",
    attrs: {
      "src": _vm.arrowIcon,
      "aria-hidden": true,
      "data-img-src": _vm.arrowIcon,
      "weex-type": "image"
    }
  }) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-289df085", module.exports)
  }
}

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, _vm._l((_vm.list), function(item, i) {
    return _c('wxc-checkbox', _vm._b({
      key: i,
      attrs: {
        "config": _vm.config,
        "data-evt-wxcCheckBoxItemChecked": ""
      },
      on: {
        "wxcCheckBoxItemChecked": _vm.wxcCheckBoxItemChecked
      }
    }, 'wxc-checkbox', item, false))
  }), 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2d0e23fb", module.exports)
  }
}

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "pageCalendar",
    staticClass: "wxc-page-calendar weex-ct weex-div",
    style: (_vm._px2rem(_vm.calendarExtendStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('wxc-minibar', _vm._b({
    attrs: {
      "show": _vm.showTitle,
      "use-default-return": false,
      "data-evt-wxcMinibarLeftButtonClicked": ""
    },
    on: {
      "wxcMinibarLeftButtonClicked": _vm.minibarLeftButtonClick
    }
  }, 'wxc-minibar', _vm.minibarCfg, false)), _vm._v(" "), (_vm.isShow) ? _c('div', {
    staticClass: "calendar-weekday weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, _vm._l((['日', '一', '二', '三', '四', '五', '六']), function(week, k) {
    return _c('p', {
      key: k,
      staticClass: "flex-item weekday-text weex-el weex-text",
      attrs: {
        "aria-label": ("周" + week),
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(week))])
  }), 0) : _vm._e(), _vm._v(" "), (_vm.isShow) ? _c('list', {
    staticClass: "calendar-list",
    attrs: {}
  }, [_vm._l((_vm.monthsArray), function(month, index) {
    return _c('section', {
      key: index,
      staticClass: " weex-ct weex-cell",
      class: [!month.title && 'calendar-row'],
      attrs: {
        "weex-type": "cell"
      }
    }, [(month.title) ? _c('p', {
      staticClass: "month-text weex-el weex-text",
      attrs: {
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(month.title))]) : _vm._l((month), function(cell, rowIndex) {
      return _c('div', {
        key: (index + "-" + rowIndex),
        ref: cell.ref,
        refInFor: true,
        staticClass: " weex-ct weex-div",
        class: ['row-item', cell.cellClass],
        style: (cell.isSelected ? _vm._px2rem(_vm.selectedCellStyle, 75) : {}),
        attrs: {
          "accessible": true,
          "aria-label": ((cell.text?cell.text:'') + "," + (cell.note?cell.note:'') + "," + (cell.ext?cell.ext:'')),
          "weex-type": "div",
          "data-evt-click": ""
        },
        on: {
          "click": _vm.$stopOuterA,
          "weex$tap": function($event) {
            $event.stopPropagation();
            return _vm.onClickDate(cell)
          }
        }
      }, [_c('p', {
        staticClass: " weex-el weex-text",
        class: ['calendar-note', cell.cls],
        style: (cell.isSelected ? _vm._processExclusiveStyle(_vm.selectedTextStyle, 75, 'text') : {}),
        attrs: {
          "weex-type": "text"
        }
      }, [_vm._v(_vm._s(cell.note))]), _vm._v(" "), _c('p', {
        staticClass: " weex-el weex-text",
        class: ['calendar-day', cell.cls],
        style: (cell.isSelected ? _vm._processExclusiveStyle(_vm.selectedTextStyle, 75, 'text') : {}),
        attrs: {
          "weex-type": "text"
        }
      }, [_vm._v(_vm._s(cell.text))]), _vm._v(" "), _c('p', {
        staticClass: " weex-el weex-text",
        class: ['calendar-ext', cell.cls],
        style: (cell.isSelected ? _vm._processExclusiveStyle(_vm.selectedTextStyle, 75, 'text') : {}),
        attrs: {
          "weex-type": "text"
        }
      }, [_vm._v(_vm._s(cell.ext))])])
    })], 2)
  }), _vm._v(" "), (_vm.isIPhoneX) ? _c('section', {
    staticClass: "iphone-x weex-ct weex-cell",
    attrs: {
      "weex-type": "cell"
    }
  }) : _vm._e()], 2) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3472bf4f", module.exports)
  }
}

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    class: ['loading-container', _vm.showLoading && _vm.needMask && 'loading-need-mask'],
    style: (_vm._px2rem(_vm.maskStyle, 75)),
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.maskClicked($event)
      }
    }
  }, [(_vm.showLoading) ? _c('div', {
    staticClass: "wxc-loading weex-ct weex-div",
    style: ({
      top: _vm._px2rem(_vm.topPosition + 'px', 75)
    }),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: " weex-ct weex-div",
    class: ['loading-box', _vm.loading.class],
    attrs: {
      "aria-hidden": true,
      "weex-type": "div"
    }
  }, [_c('figure', {
    directives: [{
      name: "weex-resize",
      rawName: "v-weex-resize",
      value: ("contain"),
      expression: "\"contain\""
    }],
    staticClass: "loading-trip-image weex-el weex-image",
    attrs: {
      "src": _vm.loading.url,
      "resize": "contain",
      "quality": "original",
      "data-img-src": _vm.loading.url,
      "weex-type": "image"
    }
  }), _vm._v(" "), (_vm.loadingText) ? _c('p', {
    staticClass: "loading-text weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.loadingText))]) : _vm._e()])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3681adcf", module.exports)
  }
}

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    class: ['wxc-btn', _vm.isHighlight && !_vm.disabled && 'wxc-btn-highlight'],
    style: (_vm._px2rem(_vm.mrBtnStyle, 75)),
    attrs: {
      "accessible": true,
      "aria-label": _vm.text,
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.onClicked($event)
      }
    }
  }, [_c('p', {
    staticClass: "btn-text weex-el weex-text",
    style: (_vm._processExclusiveStyle(_vm.mrTextStyle, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.text))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-36f80855", module.exports)
  }
}

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [(_vm.show) ? _c('wxc-overlay', _vm._b({
    attrs: {
      "show": _vm.show && _vm.hasOverlay,
      "can-auto-close": _vm.overlayCanClose,
      "opacity": _vm.opacity,
      "data-evt-wxcOverlayBodyClicking": "",
      "data-evt-wxcOverlayBodyClicked": ""
    },
    on: {
      "wxcOverlayBodyClicking": _vm.wxcOverlayBodyClicking,
      "wxcOverlayBodyClicked": _vm.wxcOverlayBodyClicked
    }
  }, 'wxc-overlay', _vm.mergeOverlayCfg, false)) : _vm._e(), _vm._v(" "), (_vm.show) ? _c('div', {
    ref: "wxc-mask",
    staticClass: "wxc-mask weex-ct weex-div",
    style: (_vm._px2rem(_vm.maskStyle, 75)),
    attrs: {
      "hack": _vm.shouldShow,
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: " weex-ct weex-div",
    style: (_vm._px2rem(_vm.contentStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_vm._t("default", null, {})], 2), _vm._v(" "), (_vm.showClose) ? _c('div', {
    staticClass: "mask-bottom weex-ct weex-div",
    style: ({
      width: _vm._px2rem(_vm.width + 'px', 75)
    }),
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.closeIconClicked($event)
      }
    }
  }, [_c('figure', {
    staticClass: "mask-close-icon weex-el weex-image",
    attrs: {
      "src": _vm.closeIcon,
      "aria-label": "关闭",
      "data-img-src": _vm.closeIcon,
      "weex-type": "image"
    }
  })]) : _vm._e()]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3b9aece2", module.exports)
  }
}

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [(_vm.showSolid || _vm.showHollow) ? _c('div', {
    staticClass: " weex-ct weex-div",
    class: ['tag-item', 'tag-border', _vm.showHollow && 'tag-hollow'],
    style: (_vm._px2rem(_vm.tagTextStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('p', {
    staticClass: "tag-text weex-el weex-text",
    style: ({
      color: _vm.fontColor
    }),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.value))])]) : _vm._e(), _vm._v(" "), (_vm.showImage) ? _c('figure', {
    staticClass: "tag-image weex-el weex-image",
    style: ({
      width: _vm._px2rem(_vm.imgWidth + 'px', 75)
    }),
    attrs: {
      "src": _vm.img,
      "aria-hidden": true,
      "data-img-src": _vm.img,
      "weex-type": "image",
      "data-evt-load": ""
    },
    on: {
      "load": _vm.onLoad
    }
  }) : _vm._e(), _vm._v(" "), (_vm.showSpecial) ? _c('div', {
    staticClass: "tag-special tag-border weex-ct weex-div",
    style: ({
      borderColor: _vm.tagColor
    }),
    attrs: {
      "accessible": true,
      "aria-label": _vm.value,
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: "tag-left weex-ct weex-div",
    style: ({
      backgroundColor: _vm.tagColor
    }),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('figure', {
    staticClass: "left-image weex-el weex-image",
    attrs: {
      "src": _vm.specialIcon,
      "data-img-src": _vm.specialIcon,
      "weex-type": "image"
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "tag-text weex-el weex-text",
    style: ({
      color: _vm.fontColor
    }),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.value))])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c51aaad", module.exports)
  }
}

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [(_vm.mod === 'default') ? _c('div', {
    staticClass: " weex-ct weex-div",
    class: ['wxc-search-bar', 'wxc-search-bar-' + _vm.theme],
    style: (_vm._px2rem(_vm.barStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('input', {
    ref: "search-input",
    class: ['search-bar-input', 'search-bar-input-' + _vm.theme],
    style: ({
      width: _vm._px2rem(_vm.needShowCancel ? '624px' : '710px', 75)
    }),
    attrs: {
      "return-key-type": _vm.returnKeyType,
      "autofocus": _vm.autofocus,
      "disabled": _vm.disabled,
      "type": _vm.inputType,
      "placeholder": _vm.placeholder,
      "data-evt-blur": "",
      "data-evt-focus": "",
      "data-evt-input": "",
      "data-evt-return": ""
    },
    domProps: {
      "value": _vm.value
    },
    nativeOn: {
      "blur": function($event) {
        $event.stopPropagation();
        return _vm.onBlur($event)
      },
      "focus": function($event) {
        $event.stopPropagation();
        return _vm.onFocus($event)
      },
      "input": function($event) {
        $event.stopPropagation();
        return _vm.onInput($event)
      },
      "return": function($event) {
        $event.stopPropagation();
        return _vm.onSubmit($event)
      }
    }
  }), _vm._v(" "), (_vm.disabled) ? _c('div', {
    staticClass: "disabled-input weex-ct weex-div",
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.inputDisabledClicked($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), _c('figure', {
    staticClass: "search-bar-icon weex-el weex-image",
    attrs: {
      "aria-hidden": true,
      "src": _vm.inputIcon,
      "data-img-src": _vm.inputIcon,
      "weex-type": "image"
    }
  }), _vm._v(" "), (_vm.showClose) ? _c('figure', {
    staticClass: "search-bar-close weex-el weex-image",
    attrs: {
      "aria-hidden": true,
      "src": _vm.closeIcon,
      "data-img-src": _vm.closeIcon,
      "weex-type": "image",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.closeClicked($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.needShowCancel) ? _c('p', {
    staticClass: " weex-el weex-text",
    class: ['search-bar-button', 'search-bar-button-' + _vm.theme],
    style: (_vm._processExclusiveStyle(_vm.buttonStyle, 75, 'text')),
    attrs: {
      "weex-type": "text",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.cancelClicked($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.cancelLabel))]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.mod === 'hasDep') ? _c('div', {
    staticClass: " weex-ct weex-div",
    class: ['wxc-search-bar', 'wxc-search-bar-' + _vm.theme],
    style: (_vm._px2rem(_vm.barStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('input', {
    class: ['search-bar-input', 'input-has-dep', 'search-bar-input-' + _vm.theme],
    attrs: {
      "disabled": _vm.disabled,
      "autofocus": _vm.autofocus,
      "return-key-type": _vm.returnKeyType,
      "type": _vm.inputType,
      "placeholder": _vm.placeholder,
      "data-evt-blur": "",
      "data-evt-focus": "",
      "data-evt-input": "",
      "data-evt-return": ""
    },
    domProps: {
      "value": _vm.value
    },
    nativeOn: {
      "blur": function($event) {
        $event.stopPropagation();
        return _vm.onBlur($event)
      },
      "focus": function($event) {
        $event.stopPropagation();
        return _vm.onFocus($event)
      },
      "input": function($event) {
        $event.stopPropagation();
        return _vm.onInput($event)
      },
      "return": function($event) {
        $event.stopPropagation();
        return _vm.onSubmit($event)
      }
    }
  }), _vm._v(" "), (_vm.disabled) ? _c('div', {
    staticClass: "disabled-input has-dep-disabled weex-ct weex-div",
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.inputDisabledClicked($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: " weex-ct weex-div",
    class: ['bar-dep', '.bar-dep-' + _vm.theme],
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.depClicked($event)
      }
    }
  }, [_c('p', {
    staticClass: "dep-text weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.depName))]), _vm._v(" "), _c('figure', {
    staticClass: "dep-arrow weex-el weex-image",
    attrs: {
      "src": _vm.arrowIcon,
      "aria-hidden": true,
      "data-img-src": _vm.arrowIcon,
      "weex-type": "image"
    }
  })]), _vm._v(" "), _c('figure', {
    staticClass: "search-bar-icon icon-has-dep weex-el weex-image",
    attrs: {
      "aria-hidden": true,
      "src": _vm.inputIcon,
      "data-img-src": _vm.inputIcon,
      "weex-type": "image"
    }
  })]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c9bb53e", module.exports)
  }
}

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-tab-page weex-ct weex-div",
    style: ({
      height: _vm._px2rem(_vm.tabPageHeight + 'px', 75),
      backgroundColor: _vm.wrapBgColor
    }),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('scroller', {
    ref: "tab-title-list",
    staticClass: "tab-title-list",
    style: ({
      backgroundColor: _vm.tabStyles.bgColor,
      height: _vm._px2rem(_vm.tabStyles.height + 'px', 75),
      paddingLeft: _vm._px2rem((_vm.tabStyles.leftOffset ? _vm.tabStyles.leftOffset : 0) + 'px', 75),
      paddingRight: _vm._px2rem(_vm.tabStyles.rightOffset, 75)
    }),
    attrs: {
      "show-scrollbar": false,
      "scroll-direction": "horizontal",
      "data-spm": _vm.spmC
    }
  }, [_vm._l((_vm.tabTitles), function(v, index) {
    return _c('div', {
      key: index,
      ref: 'wxc-tab-title-' + index,
      refInFor: true,
      staticClass: "title-item weex-ct weex-div",
      style: ({
        width: _vm._px2rem(_vm.tabStyles.width + 'px', 75),
        height: _vm._px2rem(_vm.tabStyles.height + 'px', 75),
        backgroundColor: _vm.currentPage === index ? _vm.tabStyles.activeBgColor : _vm.tabStyles.bgColor,
        borderBottomWidth: _vm._px2rem(_vm.tabStyles.normalBottomHeight, 75),
        borderBottomColor: _vm.tabStyles.normalBottomColor
      }),
      attrs: {
        "accessible": true,
        "aria-label": ("" + (v.title?v.title:'标签'+index)),
        "weex-type": "div",
        "data-evt-click": ""
      },
      on: {
        "click": _vm.$stopOuterA,
        "weex$tap": function($event) {
          $event.stopPropagation();
          return _vm.setPage(index, v.url, _vm.clickAnimation)
        }
      }
    }, [(_vm.titleType === 'icon' && !_vm.titleUseSlot) ? _c('figure', {
      staticClass: " weex-el weex-image",
      style: ({
        width: _vm._px2rem(_vm.tabStyles.iconWidth + 'px', 75),
        height: _vm._px2rem(_vm.tabStyles.iconHeight + 'px', 75)
      }),
      attrs: {
        "src": _vm.currentPage === index ? v.activeIcon : v.icon,
        "data-img-src": _vm.currentPage === index ? v.activeIcon : v.icon,
        "weex-type": "image"
      }
    }) : _vm._e(), _vm._v(" "), (_vm.titleType === 'iconFont' && v.codePoint && !_vm.titleUseSlot) ? _c('p', {
      staticClass: "icon-font weex-el weex-text",
      style: ({
        fontFamily: 'wxcIconFont',
        fontSize: _vm._px2rem(_vm.tabStyles.iconFontSize + 'px', 75),
        color: _vm.currentPage === index ? _vm.tabStyles.activeIconFontColor : _vm.tabStyles.iconFontColor
      }),
      attrs: {
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(v.codePoint))]) : _vm._e(), _vm._v(" "), (!_vm.titleUseSlot) ? _c('p', {
      staticClass: "tab-text weex-el weex-text",
      style: ({
        fontSize: _vm._px2rem(_vm.tabStyles.fontSize + 'px', 75),
        fontWeight: _vm.currentPage === index && _vm.tabStyles.isActiveTitleBold ? 'bold' : 'normal',
        color: _vm.currentPage === index ? _vm.tabStyles.activeTitleColor : _vm.tabStyles.titleColor,
        paddingLeft: _vm._px2rem((_vm.tabStyles.textPaddingLeft ? _vm.tabStyles.textPaddingLeft : 10) + 'px', 75),
        paddingRight: _vm._px2rem((_vm.tabStyles.textPaddingRight ? _vm.tabStyles.textPaddingRight : 10) + 'px', 75)
      }),
      attrs: {
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(v.title))]) : _vm._e(), _vm._v(" "), (_vm.tabStyles.hasActiveBottom && !_vm.titleUseSlot) ? _c('div', {
      staticClass: "border-bottom weex-ct weex-div",
      style: ({
        width: _vm._px2rem(_vm.tabStyles.activeBottomWidth + 'px', 75),
        left: _vm._px2rem((_vm.tabStyles.width - _vm.tabStyles.activeBottomWidth) / 2 + 'px', 75),
        height: _vm._px2rem(_vm.tabStyles.activeBottomHeight + 'px', 75),
        backgroundColor: _vm.currentPage === index ? _vm.tabStyles.activeBottomColor : 'transparent'
      }),
      attrs: {
        "weex-type": "div"
      }
    }) : _vm._e(), _vm._v(" "), (_vm.titleUseSlot) ? _vm._t(("tab-title-" + index), null, {}) : _vm._e()], 2)
  }), _vm._v(" "), (_vm.tabStyles.hasRightIcon) ? _c('div', {
    staticClass: "rightIcon weex-ct weex-div",
    style: ({
      top: _vm._px2rem(_vm.rightIconStyle.top, 75),
      right: _vm._px2rem(_vm.rightIconStyle.right, 75),
      paddingLeft: _vm._px2rem(_vm.rightIconStyle.paddingLeft, 75),
      paddingRight: _vm._px2rem(_vm.rightIconStyle.paddingRight, 75)
    }),
    attrs: {
      "weex-type": "div"
    }
  }, [_vm._t("rightIcon", null, {})], 2) : _vm._e()], 2), _vm._v(" "), _c('div', {
    ref: "tab-page-wrap",
    staticClass: "tab-page-wrap weex-ct weex-div",
    style: ({
      height: _vm._px2rem(_vm.tabPageHeight - _vm.tabStyles.height + 'px', 75)
    }),
    attrs: {
      "weex-type": "div",
      "data-evt-horizontalpan": ""
    },
    on: {
      "horizontalpan": _vm.startHandler
    }
  }, [_c('div', {
    ref: "tab-container",
    staticClass: "tab-container weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_vm._t("default", null, {})], 2)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3f00baac", module.exports)
  }
}

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: "wxc-noticebar weex-ct weex-div",
    attrs: {
      "accessible": true,
      "aria-label": _vm.notice,
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.noticeBarClicked($event)
      }
    }
  }, [(_vm.typeIcon) ? _c('figure', {
    staticClass: "type-ICON weex-el weex-image",
    attrs: {
      "src": _vm.typeIcon,
      "data-img-src": _vm.typeIcon,
      "weex-type": "image"
    }
  }) : _vm._e(), _vm._v(" "), _c('p', {
    staticClass: "noticebar-content weex-el weex-text",
    style: ({
      width: _vm._px2rem(_vm.contentWidth + 'px', 75),
      webkitLineClamp: _vm.lines,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.notice))]), _vm._v(" "), (_vm.modeIcon) ? _c('div', {
    staticClass: "more-click-content weex-ct weex-div",
    attrs: {
      "mode": _vm.mode,
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.noticeIconClicked($event)
      }
    }
  }, [_c('figure', {
    staticClass: "mode-ICON weex-el weex-image",
    attrs: {
      "src": _vm.modeIcon,
      "data-img-src": _vm.modeIcon,
      "weex-type": "image"
    }
  })]) : _vm._e()]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4edbf20e", module.exports)
  }
}

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "icon-font weex-el weex-text",
    style: (_vm._processExclusiveStyle(_vm.mergeStyle, 75, 'text')),
    attrs: {
      "weex-type": "text",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.itemClicked(_vm.name)
      }
    }
  }, [_vm._v(_vm._s(_vm.Icon[_vm.name]))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-50ae1a48", module.exports)
  }
}

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "grid-select weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_vm._l((_vm.dList), function(item, index) {
    return _c('option', _vm._b({
      key: index,
      style: ({
        marginTop: _vm._px2rem(index >= _vm.cols ? _vm.lineSpacing : null, 75)
      }),
      attrs: {
        "index": index,
        "data-evt-select": ""
      },
      on: {
        "select": function($event) {
          return _vm.onSelect(index)
        }
      }
    }, 'option', Object.assign({}, _vm.customStyles, item), false))
  }), _vm._v(" "), _vm._l((_vm.cHackList), function(item, index) {
    return _c('option', _vm._b({
      key: _vm.id + index,
      style: ({
        opacity: 0,
        marginTop: _vm._px2rem(_vm.dList.length >= _vm.cols ? _vm.lineSpacing : null, 75)
      }),
      attrs: {}
    }, 'option', Object.assign({}, _vm.customStyles, item), false))
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-50bc0536", module.exports)
  }
}

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, _vm._l((_vm.updateList), function(item, i) {
    return _c('wxc-radio', _vm._b({
      key: i,
      attrs: {
        "config": _vm.config,
        "data-evt-wxcRadioItemChecked": ""
      },
      on: {
        "wxcRadioItemChecked": function($event) {
          return _vm.wxcRadioItemChecked(i, $event)
        }
      }
    }, 'wxc-radio', item, false))
  }), 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-56150864", module.exports)
  }
}

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "root weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, _vm._l((_vm.cItems), function(item, index) {
    return _c('div', {
      key: item.key,
      staticClass: " weex-ct weex-div",
      attrs: {
        "accessible": true,
        "aria-label": ((item.title) + "," + (item.desc?item.desc:'') + "," + (item.date?item.date:'') + "," + (item.highlight?'已完成':'等待完成')),
        "weex-type": "div"
      }
    }, [_c('div', {
      staticClass: "title flex-row weex-ct weex-div",
      attrs: {
        "weex-type": "div"
      }
    }, [_c('div', {
      staticClass: "line weex-ct weex-div",
      class: item.__titleLineClass__,
      style: (_vm._px2rem(item.__lineStyle__, 75)),
      attrs: {
        "weex-type": "div"
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "point weex-ct weex-div",
      class: item.__pointClass__,
      style: (_vm._px2rem(item.__pointStyle__, 75)),
      attrs: {
        "weex-type": "div"
      }
    }), _vm._v(" "), _c('p', {
      staticClass: "text-title full-rest weex-el weex-text",
      class: item.__titleTextClass__,
      style: (_vm._processExclusiveStyle(item.__titleStyle__, 75, 'text')),
      attrs: {
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(item.title))])]), _vm._v(" "), _c('div', {
      staticClass: "content flex-row weex-ct weex-div",
      class: item.__contentClass__,
      attrs: {
        "weex-type": "div"
      }
    }, [_c('div', {
      staticClass: "line weex-ct weex-div",
      class: item.__contentLineClass__,
      style: (_vm._px2rem(item.__lineStyle__, 75)),
      attrs: {
        "weex-type": "div"
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "full-rest weex-ct weex-div",
      attrs: {
        "weex-type": "div"
      }
    }, [(item.desc) ? _c('p', {
      staticClass: "text-desc weex-el weex-text",
      attrs: {
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(item.desc))]) : _vm._e(), _vm._v(" "), (item.date) ? _c('p', {
      staticClass: "text-date weex-el weex-text",
      attrs: {
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(item.date))]) : _vm._e()])])])
  }), 0)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-61efacbc", module.exports)
  }
}

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-special-rich-text weex-ct weex-div",
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.$emit('wxcSpecialRichTextClick')
      }
    }
  }, [_c('div', {
    staticClass: "tag-div weex-ct weex-div",
    style: (_vm._px2rem(Object.assign({
      top: _vm.top + 'px'
    }, _vm.newList[0].tagDivStyle), 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [(_vm.newList[0] && _vm.newList[0].type === 'icon' && _vm.newList[0].src) ? _c('figure', {
    staticClass: "wxc-image weex-el weex-image",
    style: (_vm._px2rem(_vm.newList[0].style, 75)),
    attrs: {
      "src": _vm.newList[0].src,
      "quality": "original",
      "original": true,
      "aria-hidden": true,
      "data-img-src": _vm.newList[0].src,
      "weex-type": "image",
      "data-evt-load": ""
    },
    on: {
      "load": _vm.onLoad
    }
  }) : _vm._e(), _vm._v(" "), (_vm.newList[0] && _vm.newList[0].type === 'tag' && _vm.newList[0].value) ? _c('wxc-rich-text-tag', {
    attrs: {
      "tag-value": _vm.newList[0].value,
      "tag-theme": _vm.newList[0].theme,
      "tag-style": _vm.newList[0].style
    }
  }) : _vm._e()], 1), _vm._v(" "), (_vm.newList[0] && _vm.newList[0].type === 'text' && _vm.newList[0].value) ? _c('p', {
    staticClass: " weex-el weex-text",
    class: ['wxc-text', _vm.newList[0].theme],
    style: (_vm._processExclusiveStyle(_vm.newList[0].style, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.newList[0].value))]) : _vm._e(), _vm._v(" "), (_vm.newList[1] && _vm.newList[1].value) ? _c('p', {
    staticClass: " weex-el weex-text",
    class: ['wxc-text', _vm.newList[1].theme],
    style: (_vm._processExclusiveStyle(_vm.newList[1].style, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.newList[1].value))]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6f52a706", module.exports)
  }
}

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-cell', {
    attrs: {
      "has-top-border": _vm.hasTopBorder,
      "cell-style": {
        backgroundColor: _vm.backgroundColor
      },
      "accessible": true,
      "aria-label": (_vm.title + ",状态为" + (_vm.checked?'已选中':'未选中') + "," + (_vm.disabled?'不可更改':'')),
      "data-evt-wxcCellClicked": ""
    },
    on: {
      "wxcCellClicked": _vm.wxcCellClicked
    }
  }, [_c('p', {
    staticClass: "title-text weex-el weex-text",
    style: ({
      color: _vm.color
    }),
    attrs: {
      "slot": "title",
      "weex-type": "text"
    },
    slot: "title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), (_vm.radioIcon) ? _c('figure', {
    staticClass: "radio weex-el weex-image",
    attrs: {
      "slot": "value",
      "src": _vm.radioIcon,
      "data-img-src": _vm.radioIcon,
      "weex-type": "image"
    },
    slot: "value"
  }) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6f935647", module.exports)
  }
}

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wxc-cell', {
    attrs: {
      "has-top-border": _vm.hasTopBorder,
      "has-bottom-border": _vm.hasBottomBorder,
      "accessible": true,
      "aria-label": (_vm.title + ",状态为" + (_vm.checked ? '已选中' : '未选中') + "," + (_vm.disabled ? '不可更改' : '点击可切换')),
      "data-evt-wxcCellClicked": ""
    },
    on: {
      "wxcCellClicked": _vm.wxcCellClicked
    }
  }, [_c('p', {
    staticClass: "title-text weex-el weex-text",
    style: ({
      color: _vm.textColor
    }),
    attrs: {
      "slot": "title",
      "weex-type": "text"
    },
    slot: "title"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('figure', {
    staticClass: "checkbox weex-el weex-image",
    attrs: {
      "slot": "value",
      "src": _vm.checkIcon,
      "data-img-src": _vm.checkIcon,
      "weex-type": "image"
    },
    slot: "value"
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-702739a6", module.exports)
  }
}

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: " weex-el weex-text",
    class: ['wxc-text', _vm.textTheme, _vm.hasTextMargin ? 'margin-text' : ''],
    style: (_vm._processExclusiveStyle(_vm.themeStyle, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.textValue))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-72879af8", module.exports)
  }
}

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.showItem && _vm.src) ? _c('figure', {
    ref: ("rain-item-" + _vm.rainId),
    staticClass: "rain-item weex-el weex-image",
    style: (_vm._px2rem(_vm.pos, 75)),
    attrs: {
      "src": _vm.src,
      "data-img-src": _vm.src,
      "weex-type": "image",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.caught($event)
      }
    }
  }) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7513c695", module.exports)
  }
}

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-stepper weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: "stepper-minus weex-ct weex-div",
    attrs: {
      "aria-label": "减数",
      "accessible": true,
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.minusClicked($event)
      }
    }
  }, [_c('p', {
    staticClass: "stepper-icon weex-el weex-text",
    style: ({
      color: _vm.isLess ? '#cccccc' : '#666666'
    }),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v("-")])]), _vm._v(" "), _c('input', {
    staticClass: "stepper-input",
    style: (_vm._px2rem(_vm.disableStyle, 75)),
    attrs: {
      "type": "number",
      "disabled": _vm.disabled || _vm.readOnly,
      "data-evt-input": "",
      "data-evt-blur": ""
    },
    domProps: {
      "value": _vm.valueString
    },
    nativeOn: {
      "input": function($event) {
        $event.stopPropagation();
        return _vm.onInput($event)
      },
      "blur": function($event) {
        $event.stopPropagation();
        return _vm.onBlur($event)
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "stepper-plus weex-ct weex-div",
    attrs: {
      "aria-label": "加数",
      "accessible": true,
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.plusClicked($event)
      }
    }
  }, [_c('p', {
    staticClass: "stepper-icon weex-el weex-text",
    style: ({
      color: _vm.isOver ? '#cccccc' : '#666666'
    }),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v("+")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-76fd3d24", module.exports)
  }
}

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [(_vm.show) ? _c('wxc-overlay', {
    attrs: {
      "left": _vm.left,
      "show": true,
      "hasAnimation": false
    }
  }) : _vm._e(), _vm._v(" "), (_vm.show) ? _c('div', {
    staticClass: "dialog-box weex-ct weex-div",
    style: ({
      top: _vm._px2rem(_vm.top + 'px', 75),
      left: _vm._px2rem((_vm.isWeb ? _vm.left : 0) + 96 + 'px', 75)
    }),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: "dialog-content weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_vm._t("title", [_c('p', {
    staticClass: "content-title weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.title))])], {}), _vm._v(" "), _vm._t("content", [_c('p', {
    staticClass: "content-subtext weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.content))])], {}), _vm._v(" "), (_vm.showNoPrompt) ? _c('div', {
    staticClass: "no-prompt weex-ct weex-div",
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.noPromptClicked($event)
      }
    }
  }, [_c('figure', {
    staticClass: "no-prompt-icon weex-el weex-image",
    attrs: {
      "src": _vm.noPromptIcon,
      "data-img-src": _vm.noPromptIcon,
      "weex-type": "image"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "no-prompt-text weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.noPromptText))])]) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [(!_vm.single) ? _c('div', {
    staticClass: "footer-btn cancel weex-ct weex-div",
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.secondaryClicked($event)
      }
    }
  }, [_c('p', {
    staticClass: "btn-text weex-el weex-text",
    style: ({
      color: _vm.secondBtnColor
    }),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.cancelText))])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "footer-btn confirm weex-ct weex-div",
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.primaryClicked($event)
      }
    }
  }, [_c('p', {
    staticClass: "btn-text weex-el weex-text",
    style: ({
      color: _vm.mainBtnColor
    }),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.confirmText))])])])]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7a03baeb", module.exports)
  }
}

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [(_vm.supportAndroid) ? _c('div', {
    ref: "wxc-pan-item",
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div",
      "data-evt-horizontalpan": "",
      "weex-appear": "",
      "data-evt-appear": "",
      "data-evt-disappear": "",
      "data-evt-click": ""
    },
    on: {
      "horizontalpan": _vm.dispatchPan,
      "appear": function($event) {
        $event.stopPropagation();
        return _vm.onItemAppear($event)
      },
      "disappear": function($event) {
        $event.stopPropagation();
        return _vm.onItemDisAppear($event)
      },
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.itemClicked($event)
      }
    }
  }, [_vm._t("default", null, {})], 2) : _c('div', {
    ref: "wxc-pan-item",
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.itemClicked($event)
      }
    }
  }, [_vm._t("default", null, {})], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7f79c426", module.exports)
  }
}

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_c('list', {
    staticClass: "index-list",
    style: ({
      height: _vm._px2rem(_vm.height + 'px', 75)
    }),
    attrs: {}
  }, [_c('section', {
    staticClass: " weex-ct weex-cell",
    attrs: {
      "weex-type": "cell"
    }
  }, [_vm._t("head", null, {})], 2), _vm._v(" "), _vm._l((_vm.formatList), function(v, i) {
    return _c('section', {
      key: i,
      ref: 'index-item-title-' + v.title,
      refInFor: true,
      staticClass: " weex-ct weex-cell",
      attrs: {
        "weex-type": "cell"
      }
    }, [(!_vm.onlyShowList) ? _c('p', {
      staticClass: " weex-el weex-text",
      class: ['index-list-title', v.type && v.type == 'group' && 'group-title'],
      style: (_vm._processExclusiveStyle(_vm.headerStyle, 75, 'text')),
      attrs: {
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(v.title))]) : _vm._e(), _vm._v(" "), (v.type && v.type === 'group' && !_vm.onlyShowList) ? _c('div', {
      staticClass: "group weex-ct weex-div",
      style: (_vm._px2rem(_vm.groupWrapStyle, 75)),
      attrs: {
        "weex-type": "div"
      }
    }, _vm._l((v.data), function(group, index) {
      return _c('div', {
        key: index,
        staticClass: "group-list weex-ct weex-div",
        attrs: {
          "weex-type": "div"
        }
      }, _vm._l((group), function(item, i) {
        return _c('div', {
          key: i,
          staticClass: "group-item weex-ct weex-div",
          style: (_vm._px2rem(_vm.groupItemStyle, 75)),
          attrs: {
            "accessible": true,
            "aria-label": ((item.name) + "," + (item.desc?item.desc:'')),
            "weex-type": "div",
            "data-evt-click": ""
          },
          on: {
            "click": _vm.$stopOuterA,
            "weex$tap": function($event) {
              $event.stopPropagation();
              return _vm.itemClicked(item)
            }
          }
        }, [(item.isLocation) ? _c('figure', {
          staticClass: "location-icon weex-el weex-image",
          attrs: {
            "src": "https://gw.alicdn.com/tfs/TB1JUiUPFXXXXXUXXXXXXXXXXXX-32-32.png",
            "data-img-src": "https://gw.alicdn.com/tfs/TB1JUiUPFXXXXXUXXXXXXXXXXXX-32-32.png",
            "weex-type": "image"
          }
        }) : _vm._e(), _vm._v(" "), _c('div', {
          staticClass: " weex-ct weex-div",
          attrs: {
            "weex-type": "div"
          }
        }, [_c('p', {
          staticClass: "item-name weex-el weex-text",
          style: (_vm._processExclusiveStyle(_vm.groupItemTextStyle, 75, 'text')),
          attrs: {
            "weex-type": "text"
          }
        }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), (item.desc) ? _c('p', {
          staticClass: "item-desc weex-el weex-text",
          style: (_vm._processExclusiveStyle(_vm.groupItemDescStyle, 75, 'text')),
          attrs: {
            "weex-type": "text"
          }
        }, [_vm._v(_vm._s(item.desc))]) : _vm._e()])])
      }), 0)
    }), 0) : _vm._e(), _vm._v(" "), (v.type === 'list') ? _c('div', {
      staticClass: " weex-ct weex-div",
      attrs: {
        "weex-type": "div"
      }
    }, _vm._l((v.data), function(item, index) {
      return _c('div', {
        key: index,
        staticClass: "index-list-item weex-ct weex-div",
        style: (_vm._px2rem(_vm.itemStyle, 75)),
        attrs: {
          "accessible": true,
          "aria-label": ((item.name) + "," + (item.desc?item.desc:'')),
          "weex-type": "div",
          "data-evt-click": ""
        },
        on: {
          "click": _vm.$stopOuterA,
          "weex$tap": function($event) {
            $event.stopPropagation();
            return _vm.itemClicked(item)
          }
        }
      }, [_c('p', {
        staticClass: "title weex-el weex-text",
        style: (_vm._processExclusiveStyle(_vm.itemTextStyle, 75, 'text')),
        attrs: {
          "weex-type": "text"
        }
      }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('p', {
        staticClass: "desc weex-el weex-text",
        style: (_vm._processExclusiveStyle(_vm.itemDescStyle, 75, 'text')),
        attrs: {
          "weex-type": "text"
        }
      }, [_vm._v(_vm._s(item.desc))])])
    }), 0) : _vm._e()])
  }), _vm._v(" "), (_vm.isIPhoneX) ? _c('section', {
    staticClass: "iphone-x weex-ct weex-cell",
    attrs: {
      "weex-type": "cell"
    }
  }) : _vm._e()], 2), _vm._v(" "), (_vm.showIndex && !_vm.onlyShowList) ? _c('div', {
    staticClass: "index-list-nav weex-ct weex-div",
    style: (_vm._px2rem(_vm.navStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, _vm._l((_vm.formatList), function(item, index) {
    return _c('p', {
      key: index,
      staticClass: "list-nav-key weex-el weex-text",
      style: (_vm._processExclusiveStyle(_vm.navTextStyle, 75, 'text')),
      attrs: {
        "title": item.title,
        "weex-type": "text",
        "data-evt-click": ""
      },
      on: {
        "click": _vm.$stopOuterA,
        "weex$tap": function($event) {
          $event.stopPropagation();
          return _vm.go2Key(item.title)
        }
      }
    }, [_vm._v(_vm._s(item.title))])
  }), 0) : _vm._e(), _vm._v(" "), (_vm.popKeyShow) ? _c('div', {
    staticClass: "index-list-pop weex-ct weex-div",
    style: (_vm._px2rem(_vm.popStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('p', {
    staticClass: "list-pop-text weex-el weex-text",
    style: (_vm._processExclusiveStyle(_vm.popTextStyle, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.popKey))])]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8a0583fa", module.exports)
  }
}

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    class: ['wxc-tag', 'border-' + _vm.tagTheme],
    style: (_vm._px2rem(_vm.newTheme.divStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('p', {
    staticClass: " weex-el weex-text",
    class: ['tag-text', _vm.tagTheme],
    style: (_vm._processExclusiveStyle(_vm.newTheme.textStyle, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.tagValue))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8c80ddc2", module.exports)
  }
}

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    style: (_vm._px2rem(_vm.mrTimeWrapStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: "time-dot-wrap weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [(_vm.tplIndexOfDays !== -1) ? _c('div', {
    staticClass: " weex-ct weex-div",
    style: (_vm._px2rem(_vm.mrTimeBoxStyle, 75)),
    attrs: {
      "accessible": true,
      "aria-label": ((_vm.countDownData.day) + "天"),
      "weex-type": "div"
    }
  }, [_c('p', {
    staticClass: " weex-el weex-text",
    style: (_vm._processExclusiveStyle(_vm.mrTimeTextStyle, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.countDownData.day))])]) : _vm._e(), _vm._v(" "), (_vm.tplIndexOfDays !== -1) ? _c('div', {
    staticClass: " weex-ct weex-div",
    style: (_vm._px2rem(_vm.mrDotBoxStyle, 75)),
    attrs: {
      "aria-hidden": true,
      "weex-type": "div"
    }
  }, [_c('p', {
    staticClass: " weex-el weex-text",
    style: (_vm._processExclusiveStyle(_vm.mrDotTextStyle, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfDays, _vm.tplIndexOfHours)))])]) : _vm._e(), _vm._v(" "), (_vm.tplIndexOfHours !== -1) ? _c('div', {
    staticClass: " weex-ct weex-div",
    style: (_vm._px2rem(_vm.mrTimeBoxStyle, 75)),
    attrs: {
      "accessible": true,
      "aria-label": ((_vm.countDownData.hour) + "时"),
      "weex-type": "div"
    }
  }, [_c('p', {
    staticClass: " weex-el weex-text",
    style: (_vm._processExclusiveStyle(_vm.mrTimeTextStyle, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.countDownData.hour))])]) : _vm._e(), _vm._v(" "), (_vm.tplIndexOfHours !== -1) ? _c('div', {
    staticClass: " weex-ct weex-div",
    style: (_vm._px2rem(_vm.mrDotBoxStyle, 75)),
    attrs: {
      "aria-hidden": true,
      "weex-type": "div"
    }
  }, [_c('p', {
    staticClass: " weex-el weex-text",
    style: (_vm._processExclusiveStyle(_vm.mrDotTextStyle, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfHours, _vm.tplIndexOfMinutes)))])]) : _vm._e(), _vm._v(" "), (_vm.tplIndexOfMinutes !== -1) ? _c('div', {
    staticClass: " weex-ct weex-div",
    style: (_vm._px2rem(_vm.mrTimeBoxStyle, 75)),
    attrs: {
      "accessible": true,
      "aria-label": ((_vm.countDownData.minute) + "分"),
      "weex-type": "div"
    }
  }, [_c('p', {
    staticClass: " weex-el weex-text",
    style: (_vm._processExclusiveStyle(_vm.mrTimeTextStyle, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.countDownData.minute))])]) : _vm._e(), _vm._v(" "), (_vm.tplIndexOfMinutes !== -1) ? _c('div', {
    staticClass: " weex-ct weex-div",
    style: (_vm._px2rem(_vm.mrDotBoxStyle, 75)),
    attrs: {
      "aria-hidden": true,
      "weex-type": "div"
    }
  }, [_c('p', {
    staticClass: " weex-el weex-text",
    style: (_vm._processExclusiveStyle(_vm.mrDotTextStyle, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfMinutes, _vm.tplIndexOfSeconds)))])]) : _vm._e(), _vm._v(" "), (_vm.tplIndexOfSeconds !== -1) ? _c('div', {
    staticClass: " weex-ct weex-div",
    style: (_vm._px2rem(_vm.mrTimeBoxStyle, 75)),
    attrs: {
      "accessible": true,
      "aria-label": ((_vm.countDownData.second) + "秒"),
      "weex-type": "div"
    }
  }, [_c('p', {
    staticClass: " weex-el weex-text",
    style: (_vm._processExclusiveStyle(_vm.mrTimeTextStyle, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.countDownData.second))])]) : _vm._e(), _vm._v(" "), (_vm.tplIndexOfSeconds !== -1) ? _c('div', {
    staticClass: " weex-ct weex-div",
    style: (_vm._px2rem(_vm.mrDotBoxStyle, 75)),
    attrs: {
      "aria-hidden": true,
      "weex-type": "div"
    }
  }, [_c('p', {
    staticClass: " weex-el weex-text",
    style: (_vm._processExclusiveStyle(_vm.mrDotTextStyle, 75, 'text')),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.getDot(_vm.tplIndexOfSeconds, -1)))])]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8dcc12f8", module.exports)
  }
}

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-tab-page weex-ct weex-div",
    style: ({
      backgroundColor: _vm.wrapBgColor
    }),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    ref: "tab-page-wrap",
    staticClass: "tab-page-wrap weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    ref: "tab-container",
    staticClass: "tab-container weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_vm._t("default", null, {})], 2)]), _vm._v(" "), _c('div', {
    staticClass: "tab-title-list weex-ct weex-div",
    style: ({
      backgroundColor: _vm.tabStyles.bgColor,
      height: _vm._px2rem(_vm.tabStyles.height + (_vm.isIPhoneX ? 78 : 0) + 'px', 75),
      paddingBottom: _vm._px2rem(_vm.isIPhoneX ? '78px' : '0', 75)
    }),
    attrs: {
      "weex-type": "div"
    }
  }, _vm._l((_vm.tabTitles), function(v, index) {
    return _c('div', {
      key: index,
      ref: 'wxc-tab-title-' + index,
      refInFor: true,
      staticClass: "title-item weex-ct weex-div",
      style: ({
        width: _vm._px2rem(_vm.tabStyles.width + 'px', 75),
        height: _vm._px2rem(_vm.tabStyles.height + 'px', 75),
        backgroundColor: _vm.currentPage == index ? _vm.tabStyles.activeBgColor : _vm.tabStyles.bgColor
      }),
      attrs: {
        "accessible": true,
        "aria-label": ("" + (v.title?v.title:'标签'+index)),
        "weex-type": "div",
        "data-evt-click": ""
      },
      on: {
        "click": _vm.$stopOuterA,
        "weex$tap": function($event) {
          $event.stopPropagation();
          return _vm.setPage(index, v.url)
        }
      }
    }, [(_vm.titleType === 'icon' && !_vm.titleUseSlot) ? _c('figure', {
      staticClass: " weex-el weex-image",
      style: ({
        width: _vm._px2rem(_vm.tabStyles.iconWidth + 'px', 75),
        height: _vm._px2rem(_vm.tabStyles.iconHeight + 'px', 75)
      }),
      attrs: {
        "src": _vm.currentPage == index ? v.activeIcon : v.icon,
        "data-img-src": _vm.currentPage == index ? v.activeIcon : v.icon,
        "weex-type": "image"
      }
    }) : _vm._e(), _vm._v(" "), (_vm.titleType === 'iconFont' && v.codePoint && !_vm.titleUseSlot) ? _c('p', {
      staticClass: " weex-el weex-text",
      style: ({
        fontFamily: 'wxcIconFont',
        fontSize: _vm._px2rem(_vm.tabStyles.iconFontSize + 'px', 75),
        marginBottom: _vm._px2rem(_vm.tabStyles.iconFontMarginBottom ? _vm.tabStyles.iconFontMarginBottom + 'px' : '8px', 75),
        color: _vm.currentPage == index ? _vm.tabStyles.activeIconFontColor : _vm.tabStyles.iconFontColor
      }),
      attrs: {
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(v.codePoint))]) : _vm._e(), _vm._v(" "), (!_vm.titleUseSlot) ? _c('p', {
      staticClass: "tab-text weex-el weex-text",
      style: ({
        fontSize: _vm._px2rem(_vm.tabStyles.fontSize + 'px', 75),
        fontWeight: _vm.currentPage == index && _vm.tabStyles.isActiveTitleBold ? 'bold' : 'normal',
        color: _vm.currentPage == index ? _vm.tabStyles.activeTitleColor : _vm.tabStyles.titleColor,
        paddingLeft: _vm._px2rem(_vm.tabStyles.textPaddingLeft + 'px', 75),
        paddingRight: _vm._px2rem(_vm.tabStyles.textPaddingRight + 'px', 75)
      }),
      attrs: {
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(v.title))]) : _vm._e(), _vm._v(" "), (v.badge && !_vm.titleUseSlot) ? _c('div', {
      staticClass: "desc-tag weex-ct weex-div",
      attrs: {
        "weex-type": "div"
      }
    }, [_c('p', {
      staticClass: "desc-text weex-el weex-text",
      attrs: {
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(v.badge))])]) : _vm._e(), _vm._v(" "), (v.dot && !v.badge && !_vm.titleUseSlot) ? _c('div', {
      staticClass: "dot weex-ct weex-div",
      attrs: {
        "weex-type": "div"
      }
    }) : _vm._e(), _vm._v(" "), (_vm.titleUseSlot) ? _vm._t(("tab-title-" + index), null, {}) : _vm._e()], 2)
  }), 0)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9576a0a4", module.exports)
  }
}

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.show) ? _c('div', {
    staticClass: "wxc-minibar weex-ct weex-div",
    style: (_vm._px2rem(_vm.newBarStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: "left weex-ct weex-div",
    attrs: {
      "aria-label": "返回",
      "accessible": true,
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.leftButtonClicked($event)
      }
    }
  }, [_vm._t("left", [(_vm.leftButton && !_vm.leftText) ? _c('figure', {
    staticClass: "left-button weex-el weex-image",
    attrs: {
      "src": _vm.leftButton,
      "data-img-src": _vm.leftButton,
      "weex-type": "image"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.leftText) ? _c('p', {
    staticClass: "icon-text weex-el weex-text",
    style: ({
      color: _vm.textColor
    }),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.leftText))]) : _vm._e()], {})], 2), _vm._v(" "), _vm._t("middle", [_c('p', {
    staticClass: "middle-title weex-el weex-text",
    style: ({
      color: _vm.textColor
    }),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.title))])], {}), _vm._v(" "), _c('div', {
    staticClass: "right weex-ct weex-div",
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.rightButtonClicked($event)
      }
    }
  }, [_vm._t("right", [(_vm.rightButton && !_vm.rightText) ? _c('figure', {
    staticClass: "right-button weex-el weex-image",
    attrs: {
      "src": _vm.rightButton,
      "aria-hidden": true,
      "data-img-src": _vm.rightButton,
      "weex-type": "image"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.rightText) ? _c('p', {
    staticClass: "icon-text weex-el weex-text",
    style: ({
      color: _vm.textColor
    }),
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.rightText))]) : _vm._e()], {})], 2)], 2) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-991a6e22", module.exports)
  }
}

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "city",
    staticClass: "wxc-city weex-ct weex-div",
    style: (_vm._px2rem(_vm.cityExtendStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('wxc-searchbar', _vm._b({
    ref: "wxc-searchbar",
    attrs: {
      "data-evt-wxcSearchbarInputOnInput": "",
      "data-evt-wxcSearchbarInputReturned": "",
      "data-evt-wxcSearchbarCancelClicked": ""
    },
    on: {
      "wxcSearchbarInputOnInput": _vm.onInput,
      "wxcSearchbarInputReturned": _vm.onSubmit,
      "wxcSearchbarCancelClicked": _vm.onCancel
    }
  }, 'wxc-searchbar', _vm.mergeInputConfig, false)), _vm._v(" "), (_vm.showTab) ? _c('wxc-tab', {
    ref: "wxc-tab",
    attrs: {
      "data-evt-wxcTabSwitch": ""
    },
    on: {
      "wxcTabSwitch": _vm.onTabSwitch
    }
  }) : _vm._e(), _vm._v(" "), _c('wxc-indexlist', {
    attrs: {
      "normal-list": _vm.normalList,
      "hot-list-config": _vm.hotListConfig,
      "nav-style": {
        top: '24px'
      },
      "height": _vm.listHeight,
      "show-index": _vm.showIndex,
      "only-show-list": !_vm.showNavHeader || _vm.onlyShowList,
      "city-location-config": _vm.currentCityLocationConfig,
      "data-evt-wxcIndexlistItemClicked": ""
    },
    on: {
      "wxcIndexlistItemClicked": _vm.onItemClick
    }
  }), _vm._v(" "), (_vm.showError) ? _c('wxc-result', {
    attrs: {
      "type": "noGoods",
      "wrap-style": {
        top: '84px'
      },
      "show": true,
      "customSet": _vm.result
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a0576d64", module.exports)
  }
}

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [(_vm.show) ? _c('div', {
    ref: "wxc-cover",
    staticClass: "g-cover weex-ct weex-div",
    style: (_vm._px2rem(_vm.coverStyle, 75)),
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.hideAction($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.show && _vm.buttons.length) ? _c('div', {
    ref: "wxc-popover",
    staticClass: "g-popover weex-ct weex-div",
    style: (_vm._px2rem(_vm.contentStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: "u-popover-arrow weex-ct weex-div",
    style: (_vm._px2rem(_vm.arrowStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "u-popover-inner weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, _vm._l((_vm.buttons), function(item, i) {
    return _c('div', {
      key: i,
      staticClass: " weex-ct weex-div",
      class: ['i-btn', i === _vm.buttons.length - 1 ? 'i-btn-noborder' : ''],
      attrs: {
        "weex-type": "div",
        "data-evt-click": ""
      },
      on: {
        "click": _vm.$stopOuterA,
        "weex$tap": function($event) {
          $event.stopPropagation();
          return _vm.wxcButtonClicked(i, item.key)
        }
      }
    }, [(item.icon) ? _c('figure', {
      staticClass: "btn-icon weex-el weex-image",
      attrs: {
        "src": item.icon,
        "data-img-src": item.icon,
        "weex-type": "image"
      }
    }) : _vm._e(), _vm._v(" "), _c('p', {
      staticClass: "btn-text weex-el weex-text",
      style: (_vm._processExclusiveStyle(_vm.textStyle, 75, 'text')),
      attrs: {
        "weex-type": "text"
      }
    }, [_vm._v(_vm._s(item.text))])])
  }), 0)]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a26f8810", module.exports)
  }
}

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wxc-lottery-rain weex-ct weex-div",
    style: (_vm._px2rem(_vm.wrapStyle, 75)),
    attrs: {
      "weex-type": "div"
    }
  }, _vm._l((_vm.picList), function(src, i) {
    return _c('rain-item', {
      key: "i",
      ref: ("rain-item-" + i),
      refInFor: true,
      attrs: {
        "src": src,
        "rain-id": i,
        "data-evt-wxcLotteryRainCaught": ""
      },
      on: {
        "wxcLotteryRainCaught": _vm.wxcLotteryRainCaught
      }
    })
  }), 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a7a9618a", module.exports)
  }
}

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [(_vm.isNotEmptyArray) ? _c('div', {
    staticClass: "wxc-rich-text weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, _vm._l((_vm.configList), function(v) {
    return _c('div', {
      staticClass: " weex-ct weex-div",
      attrs: {
        "weex-type": "div"
      }
    }, [(v.type == 'text' && v.value) ? _c('wxc-rich-text-text', {
      attrs: {
        "text-value": v.value,
        "text-style": v.style,
        "has-text-margin": _vm.hasTextMargin,
        "text-theme": v.theme
      }
    }) : _vm._e(), _vm._v(" "), (v.type == 'link' && v.href && v.value) ? _c('wxc-rich-text-link', {
      attrs: {
        "link-value": v.value,
        "link-href": v.href,
        "link-style": v.style,
        "has-text-margin": _vm.hasTextMargin,
        "link-theme": v.theme,
        "data-evt-wxcRichTextLinkClick": ""
      },
      on: {
        "wxcRichTextLinkClick": _vm.linkClick
      }
    }) : _vm._e(), _vm._v(" "), (v.type == 'icon' && v.src) ? _c('wxc-rich-text-icon', {
      attrs: {
        "icon-src": v.src,
        "icon-style": v.style
      }
    }) : _vm._e(), _vm._v(" "), (v.type == 'tag' && v.value) ? _c('wxc-rich-text-tag', {
      attrs: {
        "tag-value": v.value,
        "tag-theme": v.theme,
        "tag-style": v.style
      }
    }) : _vm._e()], 1)
  }), 0) : _vm._e(), _vm._v(" "), (_vm.isString) ? _c('p', {
    staticClass: "default-text weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v(_vm._s(_vm.configList))]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c98168de", module.exports)
  }
}

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div"
    }
  }, [_c('div', {
    staticClass: " weex-ct weex-div",
    attrs: {
      "weex-type": "div",
      "data-evt-touchend": ""
    },
    on: {
      "touchend": function($event) {
        $event.stopPropagation();
        return _vm.handleTouchEnd($event)
      }
    }
  }, [(_vm.show) ? _c('wxc-overlay', _vm._b({
    ref: "overlay",
    attrs: {
      "show": _vm.haveOverlay && _vm.isOverShow,
      "data-evt-wxcOverlayBodyClicking": ""
    },
    on: {
      "wxcOverlayBodyClicking": _vm.wxcOverlayBodyClicking
    }
  }, 'wxc-overlay', _vm.overlayCfg, false)) : _vm._e()], 1), _vm._v(" "), (_vm.show) ? _c('div', {
    ref: "wxc-popup",
    staticClass: " weex-ct weex-div",
    class: ['wxc-popup', _vm.pos],
    style: (_vm._px2rem(_vm.padStyle, 75)),
    attrs: {
      "height": _vm._height,
      "hack": _vm.isNeedShow,
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return (function () {})($event)
      }
    }
  }, [_vm._t("default", null, {})], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ca872182", module.exports)
  }
}

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('figure', {
    staticClass: "wxc-image weex-el weex-image",
    style: ({
      width: _vm._px2rem(_vm.computedStyle.width, 75),
      height: _vm._px2rem(_vm.computedStyle.height, 75)
    }),
    attrs: {
      "src": _vm.iconSrc,
      "aria-hidden": true,
      "data-img-src": _vm.iconSrc,
      "weex-type": "image",
      "data-evt-load": ""
    },
    on: {
      "load": _vm.onLoad
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-fb43e778", module.exports)
  }
}

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(52);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1858feee", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-00002f91\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tab.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-00002f91\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tab.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("32ac15c6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0acdc68c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0acdc68c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(54);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("186388ac", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0f8938e0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0f8938e0\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(55);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ead596ba", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-15fdfbd4\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-15fdfbd4\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(56);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4b911ce5", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-16b9703a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-16b9703a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(57);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("567523ba", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1797400a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1797400a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(58);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("c0cfa84e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1983b04c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1983b04c\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(59);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("33266570", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1f2af058\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1f2af058\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(60);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4fab4fd8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2059e45b\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2059e45b\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(61);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("69b395ea", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2289217e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./option.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2289217e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./option.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(62);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("96f56d98", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-254bbf80\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-254bbf80\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(63);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("051eba10", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-26056765\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./full-page.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-26056765\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./full-page.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(64);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6797c86e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-289df085\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-289df085\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f6ea0b40", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3472bf4f\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3472bf4f\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("48edcb10", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3681adcf\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3681adcf\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(67);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("00e38f99", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-36f80855\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-36f80855\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("960613a4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3b9aece2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3b9aece2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(69);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1859affb", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c51aaad\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c51aaad\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(70);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6a40101b", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c9bb53e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c9bb53e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("dd2b0192", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3f00baac\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3f00baac\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("63d97c5d", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4edbf20e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4edbf20e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(73);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("9fc7c82c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50ae1a48\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50ae1a48\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(74);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4989684e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50bc0536\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-50bc0536\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(75);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4a18e1f8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-56150864\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-56150864\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(76);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("d66e99cc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-61efacbc\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-61efacbc\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(77);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("412a9ce5", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6f52a706\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6f52a706\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(78);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("45ad8f62", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6f935647\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./item.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6f935647\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./item.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(79);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("29375d0e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-702739a6\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-702739a6\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(80);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("466dc11a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72879af8\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wxc-rich-text-text.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72879af8\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wxc-rich-text-text.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(81);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2f12917e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7513c695\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./rain-item.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7513c695\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./rain-item.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(82);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("550e21f3", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-76fd3d24\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-76fd3d24\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(83);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("cbc8643a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a03baeb\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7a03baeb\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(84);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("cd5c3df4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8a0583fa\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8a0583fa\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(85);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6e291dfc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8c80ddc2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wxc-rich-text-tag.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8c80ddc2\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wxc-rich-text-tag.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(86);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("29bdfa3c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8dcc12f8\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8dcc12f8\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(87);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("13ffc7ac", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9576a0a4\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9576a0a4\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(88);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("d84ce2a6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-991a6e22\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-991a6e22\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(89);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("69aef11c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a0576d64\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a0576d64\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(90);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("43a88217", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a26f8810\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a26f8810\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(91);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2b536f2c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a7a9618a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a7a9618a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(92);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1eaf39bc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c98168de\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c98168de\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(93);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f5b5a398", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ca872182\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ca872182\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(94);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("77f78f68", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fb43e778\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wxc-rich-text-icon.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fb43e778\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./wxc-rich-text-icon.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 293 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.web.js.map