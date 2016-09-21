(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WFUI"] = factory();
	else
		root["WFUI"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(9);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//WFUI
	__webpack_require__(2);
	__webpack_require__(4);
	__webpack_require__(5);

	//Vendors
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*! jQuery v1.8.3 jquery.com | jquery.org/license */
	(function (e, t) {
	  function _(e) {
	    var t = M[e] = {};return v.each(e.split(y), function (e, n) {
	      t[n] = !0;
	    }), t;
	  }function H(e, n, r) {
	    if (r === t && e.nodeType === 1) {
	      var i = "data-" + n.replace(P, "-$1").toLowerCase();r = e.getAttribute(i);if (typeof r == "string") {
	        try {
	          r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : D.test(r) ? v.parseJSON(r) : r;
	        } catch (s) {}v.data(e, n, r);
	      } else r = t;
	    }return r;
	  }function B(e) {
	    var t;for (t in e) {
	      if (t === "data" && v.isEmptyObject(e[t])) continue;if (t !== "toJSON") return !1;
	    }return !0;
	  }function et() {
	    return !1;
	  }function tt() {
	    return !0;
	  }function ut(e) {
	    return !e || !e.parentNode || e.parentNode.nodeType === 11;
	  }function at(e, t) {
	    do {
	      e = e[t];
	    } while (e && e.nodeType !== 1);return e;
	  }function ft(e, t, n) {
	    t = t || 0;if (v.isFunction(t)) return v.grep(e, function (e, r) {
	      var i = !!t.call(e, r, e);return i === n;
	    });if (t.nodeType) return v.grep(e, function (e, r) {
	      return e === t === n;
	    });if (typeof t == "string") {
	      var r = v.grep(e, function (e) {
	        return e.nodeType === 1;
	      });if (it.test(t)) return v.filter(t, r, !n);t = v.filter(t, r);
	    }return v.grep(e, function (e, r) {
	      return v.inArray(e, t) >= 0 === n;
	    });
	  }function lt(e) {
	    var t = ct.split("|"),
	        n = e.createDocumentFragment();if (n.createElement) while (t.length) {
	      n.createElement(t.pop());
	    }return n;
	  }function Lt(e, t) {
	    return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t));
	  }function At(e, t) {
	    if (t.nodeType !== 1 || !v.hasData(e)) return;var n,
	        r,
	        i,
	        s = v._data(e),
	        o = v._data(t, s),
	        u = s.events;if (u) {
	      delete o.handle, o.events = {};for (n in u) {
	        for (r = 0, i = u[n].length; r < i; r++) {
	          v.event.add(t, n, u[n][r]);
	        }
	      }
	    }o.data && (o.data = v.extend({}, o.data));
	  }function Ot(e, t) {
	    var n;if (t.nodeType !== 1) return;t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), n === "object" ? (t.parentNode && (t.outerHTML = e.outerHTML), v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : n === "input" && Et.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : n === "option" ? t.selected = e.defaultSelected : n === "input" || n === "textarea" ? t.defaultValue = e.defaultValue : n === "script" && t.text !== e.text && (t.text = e.text), t.removeAttribute(v.expando);
	  }function Mt(e) {
	    return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : [];
	  }function _t(e) {
	    Et.test(e.type) && (e.defaultChecked = e.checked);
	  }function Qt(e, t) {
	    if (t in e) return t;var n = t.charAt(0).toUpperCase() + t.slice(1),
	        r = t,
	        i = Jt.length;while (i--) {
	      t = Jt[i] + n;if (t in e) return t;
	    }return r;
	  }function Gt(e, t) {
	    return e = t || e, v.css(e, "display") === "none" || !v.contains(e.ownerDocument, e);
	  }function Yt(e, t) {
	    var n,
	        r,
	        i = [],
	        s = 0,
	        o = e.length;for (; s < o; s++) {
	      n = e[s];if (!n.style) continue;i[s] = v._data(n, "olddisplay"), t ? (!i[s] && n.style.display === "none" && (n.style.display = ""), n.style.display === "" && Gt(n) && (i[s] = v._data(n, "olddisplay", nn(n.nodeName)))) : (r = Dt(n, "display"), !i[s] && r !== "none" && v._data(n, "olddisplay", r));
	    }for (s = 0; s < o; s++) {
	      n = e[s];if (!n.style) continue;if (!t || n.style.display === "none" || n.style.display === "") n.style.display = t ? i[s] || "" : "none";
	    }return e;
	  }function Zt(e, t, n) {
	    var r = Rt.exec(t);return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
	  }function en(e, t, n, r) {
	    var i = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
	        s = 0;for (; i < 4; i += 2) {
	      n === "margin" && (s += v.css(e, n + $t[i], !0)), r ? (n === "content" && (s -= parseFloat(Dt(e, "padding" + $t[i])) || 0), n !== "margin" && (s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0)) : (s += parseFloat(Dt(e, "padding" + $t[i])) || 0, n !== "padding" && (s += parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0));
	    }return s;
	  }function tn(e, t, n) {
	    var r = t === "width" ? e.offsetWidth : e.offsetHeight,
	        i = !0,
	        s = v.support.boxSizing && v.css(e, "boxSizing") === "border-box";if (r <= 0 || r == null) {
	      r = Dt(e, t);if (r < 0 || r == null) r = e.style[t];if (Ut.test(r)) return r;i = s && (v.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0;
	    }return r + en(e, t, n || (s ? "border" : "content"), i) + "px";
	  }function nn(e) {
	    if (Wt[e]) return Wt[e];var t = v("<" + e + ">").appendTo(i.body),
	        n = t.css("display");t.remove();if (n === "none" || n === "") {
	      Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), { frameBorder: 0, width: 0, height: 0 }));if (!Ht || !Pt.createElement) Ht = (Pt.contentWindow || Pt.contentDocument).document, Ht.write("<!doctype html><html><body>"), Ht.close();t = Ht.body.appendChild(Ht.createElement(e)), n = Dt(t, "display"), i.body.removeChild(Pt);
	    }return Wt[e] = n, n;
	  }function fn(e, t, n, r) {
	    var i;if (v.isArray(t)) v.each(t, function (t, i) {
	      n || sn.test(e) ? r(e, i) : fn(e + "[" + ((typeof i === "undefined" ? "undefined" : _typeof(i)) == "object" ? t : "") + "]", i, n, r);
	    });else if (!n && v.type(t) === "object") for (i in t) {
	      fn(e + "[" + i + "]", t[i], n, r);
	    } else r(e, t);
	  }function Cn(e) {
	    return function (t, n) {
	      typeof t != "string" && (n = t, t = "*");var r,
	          i,
	          s,
	          o = t.toLowerCase().split(y),
	          u = 0,
	          a = o.length;if (v.isFunction(n)) for (; u < a; u++) {
	        r = o[u], s = /^\+/.test(r), s && (r = r.substr(1) || "*"), i = e[r] = e[r] || [], i[s ? "unshift" : "push"](n);
	      }
	    };
	  }function kn(e, n, r, i, s, o) {
	    s = s || n.dataTypes[0], o = o || {}, o[s] = !0;var u,
	        a = e[s],
	        f = 0,
	        l = a ? a.length : 0,
	        c = e === Sn;for (; f < l && (c || !u); f++) {
	      u = a[f](n, r, i), typeof u == "string" && (!c || o[u] ? u = t : (n.dataTypes.unshift(u), u = kn(e, n, r, i, u, o)));
	    }return (c || !u) && !o["*"] && (u = kn(e, n, r, i, "*", o)), u;
	  }function Ln(e, n) {
	    var r,
	        i,
	        s = v.ajaxSettings.flatOptions || {};for (r in n) {
	      n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);
	    }i && v.extend(!0, e, i);
	  }function An(e, n, r) {
	    var i,
	        s,
	        o,
	        u,
	        a = e.contents,
	        f = e.dataTypes,
	        l = e.responseFields;for (s in l) {
	      s in r && (n[l[s]] = r[s]);
	    }while (f[0] === "*") {
	      f.shift(), i === t && (i = e.mimeType || n.getResponseHeader("content-type"));
	    }if (i) for (s in a) {
	      if (a[s] && a[s].test(i)) {
	        f.unshift(s);break;
	      }
	    }if (f[0] in r) o = f[0];else {
	      for (s in r) {
	        if (!f[0] || e.converters[s + " " + f[0]]) {
	          o = s;break;
	        }u || (u = s);
	      }o = o || u;
	    }if (o) return o !== f[0] && f.unshift(o), r[o];
	  }function On(e, t) {
	    var n,
	        r,
	        i,
	        s,
	        o = e.dataTypes.slice(),
	        u = o[0],
	        a = {},
	        f = 0;e.dataFilter && (t = e.dataFilter(t, e.dataType));if (o[1]) for (n in e.converters) {
	      a[n.toLowerCase()] = e.converters[n];
	    }for (; i = o[++f];) {
	      if (i !== "*") {
	        if (u !== "*" && u !== i) {
	          n = a[u + " " + i] || a["* " + i];if (!n) for (r in a) {
	            s = r.split(" ");if (s[1] === i) {
	              n = a[u + " " + s[0]] || a["* " + s[0]];if (n) {
	                n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0], o.splice(f--, 0, i));break;
	              }
	            }
	          }if (n !== !0) if (n && e["throws"]) t = n(t);else try {
	            t = n(t);
	          } catch (l) {
	            return { state: "parsererror", error: n ? l : "No conversion from " + u + " to " + i };
	          }
	        }u = i;
	      }
	    }return { state: "success", data: t };
	  }function Fn() {
	    try {
	      return new e.XMLHttpRequest();
	    } catch (t) {}
	  }function In() {
	    try {
	      return new e.ActiveXObject("Microsoft.XMLHTTP");
	    } catch (t) {}
	  }function $n() {
	    return setTimeout(function () {
	      qn = t;
	    }, 0), qn = v.now();
	  }function Jn(e, t) {
	    v.each(t, function (t, n) {
	      var r = (Vn[t] || []).concat(Vn["*"]),
	          i = 0,
	          s = r.length;for (; i < s; i++) {
	        if (r[i].call(e, t, n)) return;
	      }
	    });
	  }function Kn(e, t, n) {
	    var r,
	        i = 0,
	        s = 0,
	        o = Xn.length,
	        u = v.Deferred().always(function () {
	      delete a.elem;
	    }),
	        a = function a() {
	      var t = qn || $n(),
	          n = Math.max(0, f.startTime + f.duration - t),
	          r = n / f.duration || 0,
	          i = 1 - r,
	          s = 0,
	          o = f.tweens.length;for (; s < o; s++) {
	        f.tweens[s].run(i);
	      }return u.notifyWith(e, [f, i, n]), i < 1 && o ? n : (u.resolveWith(e, [f]), !1);
	    },
	        f = u.promise({ elem: e, props: v.extend({}, t), opts: v.extend(!0, { specialEasing: {} }, n), originalProperties: t, originalOptions: n, startTime: qn || $n(), duration: n.duration, tweens: [], createTween: function createTween(t, n, r) {
	        var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);return f.tweens.push(i), i;
	      }, stop: function stop(t) {
	        var n = 0,
	            r = t ? f.tweens.length : 0;for (; n < r; n++) {
	          f.tweens[n].run(1);
	        }return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this;
	      } }),
	        l = f.props;Qn(l, f.opts.specialEasing);for (; i < o; i++) {
	      r = Xn[i].call(f, e, l, f.opts);if (r) return r;
	    }return Jn(f, l), v.isFunction(f.opts.start) && f.opts.start.call(e, f), v.fx.timer(v.extend(a, { anim: f, queue: f.opts.queue, elem: e })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always);
	  }function Qn(e, t) {
	    var n, r, i, s, o;for (n in e) {
	      r = v.camelCase(n), i = t[r], s = e[n], v.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = v.cssHooks[r];if (o && "expand" in o) {
	        s = o.expand(s), delete e[r];for (n in s) {
	          n in e || (e[n] = s[n], t[n] = i);
	        }
	      } else t[r] = i;
	    }
	  }function Gn(e, t, n) {
	    var r,
	        i,
	        s,
	        o,
	        u,
	        a,
	        f,
	        l,
	        c,
	        h = this,
	        p = e.style,
	        d = {},
	        m = [],
	        g = e.nodeType && Gt(e);n.queue || (l = v._queueHooks(e, "fx"), l.unqueued == null && (l.unqueued = 0, c = l.empty.fire, l.empty.fire = function () {
	      l.unqueued || c();
	    }), l.unqueued++, h.always(function () {
	      h.always(function () {
	        l.unqueued--, v.queue(e, "fx").length || l.empty.fire();
	      });
	    })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], v.css(e, "display") === "inline" && v.css(e, "float") === "none" && (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) === "inline" ? p.display = "inline-block" : p.zoom = 1)), n.overflow && (p.overflow = "hidden", v.support.shrinkWrapBlocks || h.done(function () {
	      p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2];
	    }));for (r in t) {
	      s = t[r];if (Un.exec(s)) {
	        delete t[r], a = a || s === "toggle";if (s === (g ? "hide" : "show")) continue;m.push(r);
	      }
	    }o = m.length;if (o) {
	      u = v._data(e, "fxshow") || v._data(e, "fxshow", {}), "hidden" in u && (g = u.hidden), a && (u.hidden = !g), g ? v(e).show() : h.done(function () {
	        v(e).hide();
	      }), h.done(function () {
	        var t;v.removeData(e, "fxshow", !0);for (t in d) {
	          v.style(e, t, d[t]);
	        }
	      });for (r = 0; r < o; r++) {
	        i = m[r], f = h.createTween(i, g ? u[i] : 0), d[i] = u[i] || v.style(e, i), i in u || (u[i] = f.start, g && (f.end = f.start, f.start = i === "width" || i === "height" ? 1 : 0));
	      }
	    }
	  }function Yn(e, t, n, r, i) {
	    return new Yn.prototype.init(e, t, n, r, i);
	  }function Zn(e, t) {
	    var n,
	        r = { height: e },
	        i = 0;t = t ? 1 : 0;for (; i < 4; i += 2 - t) {
	      n = $t[i], r["margin" + n] = r["padding" + n] = e;
	    }return t && (r.opacity = r.width = e), r;
	  }function tr(e) {
	    return v.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1;
	  }var n,
	      r,
	      i = e.document,
	      s = e.location,
	      o = e.navigator,
	      u = e.jQuery,
	      a = e.$,
	      f = Array.prototype.push,
	      l = Array.prototype.slice,
	      c = Array.prototype.indexOf,
	      h = Object.prototype.toString,
	      p = Object.prototype.hasOwnProperty,
	      d = String.prototype.trim,
	      v = function v(e, t) {
	    return new v.fn.init(e, t, n);
	  },
	      m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
	      g = /\S/,
	      y = /\s+/,
	      b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	      w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
	      E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	      S = /^[\],:{}\s]*$/,
	      x = /(?:^|:|,)(?:\s*\[)+/g,
	      T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	      N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
	      C = /^-ms-/,
	      k = /-([\da-z])/gi,
	      L = function L(e, t) {
	    return (t + "").toUpperCase();
	  },
	      A = function A() {
	    i.addEventListener ? (i.removeEventListener("DOMContentLoaded", A, !1), v.ready()) : i.readyState === "complete" && (i.detachEvent("onreadystatechange", A), v.ready());
	  },
	      O = {};v.fn = v.prototype = { constructor: v, init: function init(e, n, r) {
	      var s, o, u, a;if (!e) return this;if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;if (typeof e == "string") {
	        e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? s = [null, e, null] : s = w.exec(e);if (s && (s[1] || !n)) {
	          if (s[1]) return n = n instanceof v ? n[0] : n, a = n && n.nodeType ? n.ownerDocument || n : i, e = v.parseHTML(s[1], a, !0), E.test(s[1]) && v.isPlainObject(n) && this.attr.call(e, n, !0), v.merge(this, e);o = i.getElementById(s[2]);if (o && o.parentNode) {
	            if (o.id !== s[2]) return r.find(e);this.length = 1, this[0] = o;
	          }return this.context = i, this.selector = e, this;
	        }return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
	      }return v.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), v.makeArray(e, this));
	    }, selector: "", jquery: "1.8.3", length: 0, size: function size() {
	      return this.length;
	    }, toArray: function toArray() {
	      return l.call(this);
	    }, get: function get(e) {
	      return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e];
	    }, pushStack: function pushStack(e, t, n) {
	      var r = v.merge(this.constructor(), e);return r.prevObject = this, r.context = this.context, t === "find" ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r;
	    }, each: function each(e, t) {
	      return v.each(this, e, t);
	    }, ready: function ready(e) {
	      return v.ready.promise().done(e), this;
	    }, eq: function eq(e) {
	      return e = +e, e === -1 ? this.slice(e) : this.slice(e, e + 1);
	    }, first: function first() {
	      return this.eq(0);
	    }, last: function last() {
	      return this.eq(-1);
	    }, slice: function slice() {
	      return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","));
	    }, map: function map(e) {
	      return this.pushStack(v.map(this, function (t, n) {
	        return e.call(t, n, t);
	      }));
	    }, end: function end() {
	      return this.prevObject || this.constructor(null);
	    }, push: f, sort: [].sort, splice: [].splice }, v.fn.init.prototype = v.fn, v.extend = v.fn.extend = function () {
	    var e,
	        n,
	        r,
	        i,
	        s,
	        o,
	        u = arguments[0] || {},
	        a = 1,
	        f = arguments.length,
	        l = !1;typeof u == "boolean" && (l = u, u = arguments[1] || {}, a = 2), (typeof u === "undefined" ? "undefined" : _typeof(u)) != "object" && !v.isFunction(u) && (u = {}), f === a && (u = this, --a);for (; a < f; a++) {
	      if ((e = arguments[a]) != null) for (n in e) {
	        r = u[n], i = e[n];if (u === i) continue;l && i && (v.isPlainObject(i) || (s = v.isArray(i))) ? (s ? (s = !1, o = r && v.isArray(r) ? r : []) : o = r && v.isPlainObject(r) ? r : {}, u[n] = v.extend(l, o, i)) : i !== t && (u[n] = i);
	      }
	    }return u;
	  }, v.extend({ noConflict: function noConflict(t) {
	      return e.$ === v && (e.$ = a), t && e.jQuery === v && (e.jQuery = u), v;
	    }, isReady: !1, readyWait: 1, holdReady: function holdReady(e) {
	      e ? v.readyWait++ : v.ready(!0);
	    }, ready: function ready(e) {
	      if (e === !0 ? --v.readyWait : v.isReady) return;if (!i.body) return setTimeout(v.ready, 1);v.isReady = !0;if (e !== !0 && --v.readyWait > 0) return;r.resolveWith(i, [v]), v.fn.trigger && v(i).trigger("ready").off("ready");
	    }, isFunction: function isFunction(e) {
	      return v.type(e) === "function";
	    }, isArray: Array.isArray || function (e) {
	      return v.type(e) === "array";
	    }, isWindow: function isWindow(e) {
	      return e != null && e == e.window;
	    }, isNumeric: function isNumeric(e) {
	      return !isNaN(parseFloat(e)) && isFinite(e);
	    }, type: function type(e) {
	      return e == null ? String(e) : O[h.call(e)] || "object";
	    }, isPlainObject: function isPlainObject(e) {
	      if (!e || v.type(e) !== "object" || e.nodeType || v.isWindow(e)) return !1;try {
	        if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf")) return !1;
	      } catch (n) {
	        return !1;
	      }var r;for (r in e) {}return r === t || p.call(e, r);
	    }, isEmptyObject: function isEmptyObject(e) {
	      var t;for (t in e) {
	        return !1;
	      }return !0;
	    }, error: function error(e) {
	      throw new Error(e);
	    }, parseHTML: function parseHTML(e, t, n) {
	      var r;return !e || typeof e != "string" ? null : (typeof t == "boolean" && (n = t, t = 0), t = t || i, (r = E.exec(e)) ? [t.createElement(r[1])] : (r = v.buildFragment([e], t, n ? null : []), v.merge([], (r.cacheable ? v.clone(r.fragment) : r.fragment).childNodes)));
	    }, parseJSON: function parseJSON(t) {
	      if (!t || typeof t != "string") return null;t = v.trim(t);if (e.JSON && e.JSON.parse) return e.JSON.parse(t);if (S.test(t.replace(T, "@").replace(N, "]").replace(x, ""))) return new Function("return " + t)();v.error("Invalid JSON: " + t);
	    }, parseXML: function parseXML(n) {
	      var r, i;if (!n || typeof n != "string") return null;try {
	        e.DOMParser ? (i = new DOMParser(), r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n));
	      } catch (s) {
	        r = t;
	      }return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && v.error("Invalid XML: " + n), r;
	    }, noop: function noop() {}, globalEval: function globalEval(t) {
	      t && g.test(t) && (e.execScript || function (t) {
	        e.eval.call(e, t);
	      })(t);
	    }, camelCase: function camelCase(e) {
	      return e.replace(C, "ms-").replace(k, L);
	    }, nodeName: function nodeName(e, t) {
	      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
	    }, each: function each(e, n, r) {
	      var i,
	          s = 0,
	          o = e.length,
	          u = o === t || v.isFunction(e);if (r) {
	        if (u) {
	          for (i in e) {
	            if (n.apply(e[i], r) === !1) break;
	          }
	        } else for (; s < o;) {
	          if (n.apply(e[s++], r) === !1) break;
	        }
	      } else if (u) {
	        for (i in e) {
	          if (n.call(e[i], i, e[i]) === !1) break;
	        }
	      } else for (; s < o;) {
	        if (n.call(e[s], s, e[s++]) === !1) break;
	      }return e;
	    }, trim: d && !d.call("﻿ ") ? function (e) {
	      return e == null ? "" : d.call(e);
	    } : function (e) {
	      return e == null ? "" : (e + "").replace(b, "");
	    }, makeArray: function makeArray(e, t) {
	      var n,
	          r = t || [];return e != null && (n = v.type(e), e.length == null || n === "string" || n === "function" || n === "regexp" || v.isWindow(e) ? f.call(r, e) : v.merge(r, e)), r;
	    }, inArray: function inArray(e, t, n) {
	      var r;if (t) {
	        if (c) return c.call(t, e, n);r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;for (; n < r; n++) {
	          if (n in t && t[n] === e) return n;
	        }
	      }return -1;
	    }, merge: function merge(e, n) {
	      var r = n.length,
	          i = e.length,
	          s = 0;if (typeof r == "number") for (; s < r; s++) {
	        e[i++] = n[s];
	      } else while (n[s] !== t) {
	        e[i++] = n[s++];
	      }return e.length = i, e;
	    }, grep: function grep(e, t, n) {
	      var r,
	          i = [],
	          s = 0,
	          o = e.length;n = !!n;for (; s < o; s++) {
	        r = !!t(e[s], s), n !== r && i.push(e[s]);
	      }return i;
	    }, map: function map(e, n, r) {
	      var i,
	          s,
	          o = [],
	          u = 0,
	          a = e.length,
	          f = e instanceof v || a !== t && typeof a == "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));if (f) for (; u < a; u++) {
	        i = n(e[u], u, r), i != null && (o[o.length] = i);
	      } else for (s in e) {
	        i = n(e[s], s, r), i != null && (o[o.length] = i);
	      }return o.concat.apply([], o);
	    }, guid: 1, proxy: function proxy(e, n) {
	      var r, i, s;return typeof n == "string" && (r = e[n], n = e, e = r), v.isFunction(e) ? (i = l.call(arguments, 2), s = function s() {
	        return e.apply(n, i.concat(l.call(arguments)));
	      }, s.guid = e.guid = e.guid || v.guid++, s) : t;
	    }, access: function access(e, n, r, i, s, o, u) {
	      var a,
	          f = r == null,
	          l = 0,
	          c = e.length;if (r && (typeof r === "undefined" ? "undefined" : _typeof(r)) == "object") {
	        for (l in r) {
	          v.access(e, n, l, r[l], 1, o, i);
	        }s = 1;
	      } else if (i !== t) {
	        a = u === t && v.isFunction(i), f && (a ? (a = n, n = function n(e, t, _n2) {
	          return a.call(v(e), _n2);
	        }) : (n.call(e, i), n = null));if (n) for (; l < c; l++) {
	          n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u);
	        }s = 1;
	      }return s ? e : f ? n.call(e) : c ? n(e[0], r) : o;
	    }, now: function now() {
	      return new Date().getTime();
	    } }), v.ready.promise = function (t) {
	    if (!r) {
	      r = v.Deferred();if (i.readyState === "complete") setTimeout(v.ready, 1);else if (i.addEventListener) i.addEventListener("DOMContentLoaded", A, !1), e.addEventListener("load", v.ready, !1);else {
	        i.attachEvent("onreadystatechange", A), e.attachEvent("onload", v.ready);var n = !1;try {
	          n = e.frameElement == null && i.documentElement;
	        } catch (s) {}n && n.doScroll && function o() {
	          if (!v.isReady) {
	            try {
	              n.doScroll("left");
	            } catch (e) {
	              return setTimeout(o, 50);
	            }v.ready();
	          }
	        }();
	      }
	    }return r.promise(t);
	  }, v.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (e, t) {
	    O["[object " + t + "]"] = t.toLowerCase();
	  }), n = v(i);var M = {};v.Callbacks = function (e) {
	    e = typeof e == "string" ? M[e] || _(e) : v.extend({}, e);var n,
	        r,
	        i,
	        s,
	        o,
	        u,
	        a = [],
	        f = !e.once && [],
	        l = function l(t) {
	      n = e.memory && t, r = !0, u = s || 0, s = 0, o = a.length, i = !0;for (; a && u < o; u++) {
	        if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
	          n = !1;break;
	        }
	      }i = !1, a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable());
	    },
	        c = { add: function add() {
	        if (a) {
	          var t = a.length;(function r(t) {
	            v.each(t, function (t, n) {
	              var i = v.type(n);i === "function" ? (!e.unique || !c.has(n)) && a.push(n) : n && n.length && i !== "string" && r(n);
	            });
	          })(arguments), i ? o = a.length : n && (s = t, l(n));
	        }return this;
	      }, remove: function remove() {
	        return a && v.each(arguments, function (e, t) {
	          var n;while ((n = v.inArray(t, a, n)) > -1) {
	            a.splice(n, 1), i && (n <= o && o--, n <= u && u--);
	          }
	        }), this;
	      }, has: function has(e) {
	        return v.inArray(e, a) > -1;
	      }, empty: function empty() {
	        return a = [], this;
	      }, disable: function disable() {
	        return a = f = n = t, this;
	      }, disabled: function disabled() {
	        return !a;
	      }, lock: function lock() {
	        return f = t, n || c.disable(), this;
	      }, locked: function locked() {
	        return !f;
	      }, fireWith: function fireWith(e, t) {
	        return t = t || [], t = [e, t.slice ? t.slice() : t], a && (!r || f) && (i ? f.push(t) : l(t)), this;
	      }, fire: function fire() {
	        return c.fireWith(this, arguments), this;
	      }, fired: function fired() {
	        return !!r;
	      } };return c;
	  }, v.extend({ Deferred: function Deferred(e) {
	      var t = [["resolve", "done", v.Callbacks("once memory"), "resolved"], ["reject", "fail", v.Callbacks("once memory"), "rejected"], ["notify", "progress", v.Callbacks("memory")]],
	          n = "pending",
	          r = { state: function state() {
	          return n;
	        }, always: function always() {
	          return i.done(arguments).fail(arguments), this;
	        }, then: function then() {
	          var e = arguments;return v.Deferred(function (n) {
	            v.each(t, function (t, r) {
	              var s = r[0],
	                  o = e[t];i[r[1]](v.isFunction(o) ? function () {
	                var e = o.apply(this, arguments);e && v.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n : this, [e]);
	              } : n[s]);
	            }), e = null;
	          }).promise();
	        }, promise: function promise(e) {
	          return e != null ? v.extend(e, r) : r;
	        } },
	          i = {};return r.pipe = r.then, v.each(t, function (e, s) {
	        var o = s[2],
	            u = s[3];r[s[1]] = o.add, u && o.add(function () {
	          n = u;
	        }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = o.fire, i[s[0] + "With"] = o.fireWith;
	      }), r.promise(i), e && e.call(i, i), i;
	    }, when: function when(e) {
	      var t = 0,
	          n = l.call(arguments),
	          r = n.length,
	          i = r !== 1 || e && v.isFunction(e.promise) ? r : 0,
	          s = i === 1 ? e : v.Deferred(),
	          o = function o(e, t, n) {
	        return function (r) {
	          t[e] = this, n[e] = arguments.length > 1 ? l.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n);
	        };
	      },
	          u,
	          a,
	          f;if (r > 1) {
	        u = new Array(r), a = new Array(r), f = new Array(r);for (; t < r; t++) {
	          n[t] && v.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i;
	        }
	      }return i || s.resolveWith(f, n), s.promise();
	    } }), v.support = function () {
	    var t,
	        n,
	        r,
	        s,
	        o,
	        u,
	        a,
	        f,
	        l,
	        c,
	        h,
	        p = i.createElement("div");p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0];if (!n || !r || !n.length) return {};s = i.createElement("select"), o = s.appendChild(i.createElement("option")), u = p.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = { leadingWhitespace: p.firstChild.nodeType === 3, tbody: !p.getElementsByTagName("tbody").length, htmlSerialize: !!p.getElementsByTagName("link").length, style: /top/.test(r.getAttribute("style")), hrefNormalized: r.getAttribute("href") === "/a", opacity: /^0.5/.test(r.style.opacity), cssFloat: !!r.style.cssFloat, checkOn: u.value === "on", optSelected: o.selected, getSetAttribute: p.className !== "t", enctype: !!i.createElement("form").enctype, html5Clone: i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", boxModel: i.compatMode === "CSS1Compat", submitBubbles: !0, changeBubbles: !0, focusinBubbles: !1, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0, boxSizingReliable: !0, pixelPosition: !1 }, u.checked = !0, t.noCloneChecked = u.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !o.disabled;try {
	      delete p.test;
	    } catch (d) {
	      t.deleteExpando = !1;
	    }!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", h = function h() {
	      t.noCloneEvent = !1;
	    }), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", h)), u = i.createElement("input"), u.value = "t", u.setAttribute("type", "radio"), t.radioValue = u.value === "t", u.setAttribute("checked", "checked"), u.setAttribute("name", "t"), p.appendChild(u), a = i.createDocumentFragment(), a.appendChild(p.lastChild), t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = u.checked, a.removeChild(u), a.appendChild(p);if (p.attachEvent) for (l in { submit: !0, change: !0, focusin: !0 }) {
	      f = "on" + l, c = f in p, c || (p.setAttribute(f, "return;"), c = typeof p[f] == "function"), t[l + "Bubbles"] = c;
	    }return v(function () {
	      var n,
	          r,
	          s,
	          o,
	          u = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
	          a = i.getElementsByTagName("body")[0];if (!a) return;n = i.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", a.insertBefore(n, a.firstChild), r = i.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = r.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = s[0].offsetHeight === 0, s[0].style.display = "", s[1].style.display = "none", t.reliableHiddenOffsets = c && s[0].offsetHeight === 0, r.innerHTML = "", r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = r.offsetWidth === 4, t.doesNotIncludeMarginInBodyOffset = a.offsetTop !== 1, e.getComputedStyle && (t.pixelPosition = (e.getComputedStyle(r, null) || {}).top !== "1%", t.boxSizingReliable = (e.getComputedStyle(r, null) || { width: "4px" }).width === "4px", o = i.createElement("div"), o.style.cssText = r.style.cssText = u, o.style.marginRight = o.style.width = "0", r.style.width = "1px", r.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), typeof r.style.zoom != "undefined" && (r.innerHTML = "", r.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = r.offsetWidth === 3, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks = r.offsetWidth !== 3, n.style.zoom = 1), a.removeChild(n), n = r = s = o = null;
	    }), a.removeChild(p), n = r = s = o = u = a = p = null, t;
	  }();var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	      P = /([A-Z])/g;v.extend({ cache: {}, deletedIds: [], uuid: 0, expando: "jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""), noData: { embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0 }, hasData: function hasData(e) {
	      return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando], !!e && !B(e);
	    }, data: function data(e, n, r, i) {
	      if (!v.acceptData(e)) return;var s,
	          o,
	          u = v.expando,
	          a = typeof n == "string",
	          f = e.nodeType,
	          l = f ? v.cache : e,
	          c = f ? e[u] : e[u] && u;if ((!c || !l[c] || !i && !l[c].data) && a && r === t) return;c || (f ? e[u] = c = v.deletedIds.pop() || v.guid++ : c = u), l[c] || (l[c] = {}, f || (l[c].toJSON = v.noop));if ((typeof n === "undefined" ? "undefined" : _typeof(n)) == "object" || typeof n == "function") i ? l[c] = v.extend(l[c], n) : l[c].data = v.extend(l[c].data, n);return s = l[c], i || (s.data || (s.data = {}), s = s.data), r !== t && (s[v.camelCase(n)] = r), a ? (o = s[n], o == null && (o = s[v.camelCase(n)])) : o = s, o;
	    }, removeData: function removeData(e, t, n) {
	      if (!v.acceptData(e)) return;var r,
	          i,
	          s,
	          o = e.nodeType,
	          u = o ? v.cache : e,
	          a = o ? e[v.expando] : v.expando;if (!u[a]) return;if (t) {
	        r = n ? u[a] : u[a].data;if (r) {
	          v.isArray(t) || (t in r ? t = [t] : (t = v.camelCase(t), t in r ? t = [t] : t = t.split(" ")));for (i = 0, s = t.length; i < s; i++) {
	            delete r[t[i]];
	          }if (!(n ? B : v.isEmptyObject)(r)) return;
	        }
	      }if (!n) {
	        delete u[a].data;if (!B(u[a])) return;
	      }o ? v.cleanData([e], !0) : v.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null;
	    }, _data: function _data(e, t, n) {
	      return v.data(e, t, n, !0);
	    }, acceptData: function acceptData(e) {
	      var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];return !t || t !== !0 && e.getAttribute("classid") === t;
	    } }), v.fn.extend({ data: function data(e, n) {
	      var r,
	          i,
	          s,
	          o,
	          u,
	          a = this[0],
	          f = 0,
	          l = null;if (e === t) {
	        if (this.length) {
	          l = v.data(a);if (a.nodeType === 1 && !v._data(a, "parsedAttrs")) {
	            s = a.attributes;for (u = s.length; f < u; f++) {
	              o = s[f].name, o.indexOf("data-") || (o = v.camelCase(o.substring(5)), H(a, o, l[o]));
	            }v._data(a, "parsedAttrs", !0);
	          }
	        }return l;
	      }return (typeof e === "undefined" ? "undefined" : _typeof(e)) == "object" ? this.each(function () {
	        v.data(this, e);
	      }) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", v.access(this, function (n) {
	        if (n === t) return l = this.triggerHandler("getData" + i, [r[0]]), l === t && a && (l = v.data(a, e), l = H(a, e, l)), l === t && r[1] ? this.data(r[0]) : l;r[1] = n, this.each(function () {
	          var t = v(this);t.triggerHandler("setData" + i, r), v.data(this, e, n), t.triggerHandler("changeData" + i, r);
	        });
	      }, null, n, arguments.length > 1, null, !1));
	    }, removeData: function removeData(e) {
	      return this.each(function () {
	        v.removeData(this, e);
	      });
	    } }), v.extend({ queue: function queue(e, t, n) {
	      var r;if (e) return t = (t || "fx") + "queue", r = v._data(e, t), n && (!r || v.isArray(n) ? r = v._data(e, t, v.makeArray(n)) : r.push(n)), r || [];
	    }, dequeue: function dequeue(e, t) {
	      t = t || "fx";var n = v.queue(e, t),
	          r = n.length,
	          i = n.shift(),
	          s = v._queueHooks(e, t),
	          o = function o() {
	        v.dequeue(e, t);
	      };i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire();
	    }, _queueHooks: function _queueHooks(e, t) {
	      var n = t + "queueHooks";return v._data(e, n) || v._data(e, n, { empty: v.Callbacks("once memory").add(function () {
	          v.removeData(e, t + "queue", !0), v.removeData(e, n, !0);
	        }) });
	    } }), v.fn.extend({ queue: function queue(e, n) {
	      var r = 2;return typeof e != "string" && (n = e, e = "fx", r--), arguments.length < r ? v.queue(this[0], e) : n === t ? this : this.each(function () {
	        var t = v.queue(this, e, n);v._queueHooks(this, e), e === "fx" && t[0] !== "inprogress" && v.dequeue(this, e);
	      });
	    }, dequeue: function dequeue(e) {
	      return this.each(function () {
	        v.dequeue(this, e);
	      });
	    }, delay: function delay(e, t) {
	      return e = v.fx ? v.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
	        var r = setTimeout(t, e);n.stop = function () {
	          clearTimeout(r);
	        };
	      });
	    }, clearQueue: function clearQueue(e) {
	      return this.queue(e || "fx", []);
	    }, promise: function promise(e, n) {
	      var r,
	          i = 1,
	          s = v.Deferred(),
	          o = this,
	          u = this.length,
	          a = function a() {
	        --i || s.resolveWith(o, [o]);
	      };typeof e != "string" && (n = e, e = t), e = e || "fx";while (u--) {
	        r = v._data(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a));
	      }return a(), s.promise(n);
	    } });var j,
	      F,
	      I,
	      q = /[\t\r\n]/g,
	      R = /\r/g,
	      U = /^(?:button|input)$/i,
	      z = /^(?:button|input|object|select|textarea)$/i,
	      W = /^a(?:rea|)$/i,
	      X = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	      V = v.support.getSetAttribute;v.fn.extend({ attr: function attr(e, t) {
	      return v.access(this, v.attr, e, t, arguments.length > 1);
	    }, removeAttr: function removeAttr(e) {
	      return this.each(function () {
	        v.removeAttr(this, e);
	      });
	    }, prop: function prop(e, t) {
	      return v.access(this, v.prop, e, t, arguments.length > 1);
	    }, removeProp: function removeProp(e) {
	      return e = v.propFix[e] || e, this.each(function () {
	        try {
	          this[e] = t, delete this[e];
	        } catch (n) {}
	      });
	    }, addClass: function addClass(e) {
	      var t, n, r, i, s, o, u;if (v.isFunction(e)) return this.each(function (t) {
	        v(this).addClass(e.call(this, t, this.className));
	      });if (e && typeof e == "string") {
	        t = e.split(y);for (n = 0, r = this.length; n < r; n++) {
	          i = this[n];if (i.nodeType === 1) if (!i.className && t.length === 1) i.className = e;else {
	            s = " " + i.className + " ";for (o = 0, u = t.length; o < u; o++) {
	              s.indexOf(" " + t[o] + " ") < 0 && (s += t[o] + " ");
	            }i.className = v.trim(s);
	          }
	        }
	      }return this;
	    }, removeClass: function removeClass(e) {
	      var n, r, i, s, o, u, a;if (v.isFunction(e)) return this.each(function (t) {
	        v(this).removeClass(e.call(this, t, this.className));
	      });if (e && typeof e == "string" || e === t) {
	        n = (e || "").split(y);for (u = 0, a = this.length; u < a; u++) {
	          i = this[u];if (i.nodeType === 1 && i.className) {
	            r = (" " + i.className + " ").replace(q, " ");for (s = 0, o = n.length; s < o; s++) {
	              while (r.indexOf(" " + n[s] + " ") >= 0) {
	                r = r.replace(" " + n[s] + " ", " ");
	              }
	            }i.className = e ? v.trim(r) : "";
	          }
	        }
	      }return this;
	    }, toggleClass: function toggleClass(e, t) {
	      var n = typeof e === "undefined" ? "undefined" : _typeof(e),
	          r = typeof t == "boolean";return v.isFunction(e) ? this.each(function (n) {
	        v(this).toggleClass(e.call(this, n, this.className, t), t);
	      }) : this.each(function () {
	        if (n === "string") {
	          var i,
	              s = 0,
	              o = v(this),
	              u = t,
	              a = e.split(y);while (i = a[s++]) {
	            u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i);
	          }
	        } else if (n === "undefined" || n === "boolean") this.className && v._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : v._data(this, "__className__") || "";
	      });
	    }, hasClass: function hasClass(e) {
	      var t = " " + e + " ",
	          n = 0,
	          r = this.length;for (; n < r; n++) {
	        if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0) return !0;
	      }return !1;
	    }, val: function val(e) {
	      var n,
	          r,
	          i,
	          s = this[0];if (!arguments.length) {
	        if (s) return n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()], n && "get" in n && (r = n.get(s, "value")) !== t ? r : (r = s.value, typeof r == "string" ? r.replace(R, "") : r == null ? "" : r);return;
	      }return i = v.isFunction(e), this.each(function (r) {
	        var s,
	            o = v(this);if (this.nodeType !== 1) return;i ? s = e.call(this, r, o.val()) : s = e, s == null ? s = "" : typeof s == "number" ? s += "" : v.isArray(s) && (s = v.map(s, function (e) {
	          return e == null ? "" : e + "";
	        })), n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()];if (!n || !("set" in n) || n.set(this, s, "value") === t) this.value = s;
	      });
	    } }), v.extend({ valHooks: { option: { get: function get(e) {
	          var t = e.attributes.value;return !t || t.specified ? e.value : e.text;
	        } }, select: { get: function get(e) {
	          var t,
	              n,
	              r = e.options,
	              i = e.selectedIndex,
	              s = e.type === "select-one" || i < 0,
	              o = s ? null : [],
	              u = s ? i + 1 : r.length,
	              a = i < 0 ? u : s ? i : 0;for (; a < u; a++) {
	            n = r[a];if ((n.selected || a === i) && (v.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !v.nodeName(n.parentNode, "optgroup"))) {
	              t = v(n).val();if (s) return t;o.push(t);
	            }
	          }return o;
	        }, set: function set(e, t) {
	          var n = v.makeArray(t);return v(e).find("option").each(function () {
	            this.selected = v.inArray(v(this).val(), n) >= 0;
	          }), n.length || (e.selectedIndex = -1), n;
	        } } }, attrFn: {}, attr: function attr(e, n, r, i) {
	      var s,
	          o,
	          u,
	          a = e.nodeType;if (!e || a === 3 || a === 8 || a === 2) return;if (i && v.isFunction(v.fn[n])) return v(e)[n](r);if (typeof e.getAttribute == "undefined") return v.prop(e, n, r);u = a !== 1 || !v.isXMLDoc(e), u && (n = n.toLowerCase(), o = v.attrHooks[n] || (X.test(n) ? F : j));if (r !== t) {
	        if (r === null) {
	          v.removeAttr(e, n);return;
	        }return o && "set" in o && u && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r);
	      }return o && "get" in o && u && (s = o.get(e, n)) !== null ? s : (s = e.getAttribute(n), s === null ? t : s);
	    }, removeAttr: function removeAttr(e, t) {
	      var n,
	          r,
	          i,
	          s,
	          o = 0;if (t && e.nodeType === 1) {
	        r = t.split(y);for (; o < r.length; o++) {
	          i = r[o], i && (n = v.propFix[i] || i, s = X.test(i), s || v.attr(e, i, ""), e.removeAttribute(V ? i : n), s && n in e && (e[n] = !1));
	        }
	      }
	    }, attrHooks: { type: { set: function set(e, t) {
	          if (U.test(e.nodeName) && e.parentNode) v.error("type property can't be changed");else if (!v.support.radioValue && t === "radio" && v.nodeName(e, "input")) {
	            var n = e.value;return e.setAttribute("type", t), n && (e.value = n), t;
	          }
	        } }, value: { get: function get(e, t) {
	          return j && v.nodeName(e, "button") ? j.get(e, t) : t in e ? e.value : null;
	        }, set: function set(e, t, n) {
	          if (j && v.nodeName(e, "button")) return j.set(e, t, n);e.value = t;
	        } } }, propFix: { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" }, prop: function prop(e, n, r) {
	      var i,
	          s,
	          o,
	          u = e.nodeType;if (!e || u === 3 || u === 8 || u === 2) return;return o = u !== 1 || !v.isXMLDoc(e), o && (n = v.propFix[n] || n, s = v.propHooks[n]), r !== t ? s && "set" in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get" in s && (i = s.get(e, n)) !== null ? i : e[n];
	    }, propHooks: { tabIndex: { get: function get(e) {
	          var n = e.getAttributeNode("tabindex");return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t;
	        } } } }), F = { get: function get(e, n) {
	      var r,
	          i = v.prop(e, n);return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t;
	    }, set: function set(e, t, n) {
	      var r;return t === !1 ? v.removeAttr(e, n) : (r = v.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n;
	    } }, V || (I = { name: !0, id: !0, coords: !0 }, j = v.valHooks.button = { get: function get(e, n) {
	      var r;return r = e.getAttributeNode(n), r && (I[n] ? r.value !== "" : r.specified) ? r.value : t;
	    }, set: function set(e, t, n) {
	      var r = e.getAttributeNode(n);return r || (r = i.createAttribute(n), e.setAttributeNode(r)), r.value = t + "";
	    } }, v.each(["width", "height"], function (e, t) {
	    v.attrHooks[t] = v.extend(v.attrHooks[t], { set: function set(e, n) {
	        if (n === "") return e.setAttribute(t, "auto"), n;
	      } });
	  }), v.attrHooks.contenteditable = { get: j.get, set: function set(e, t, n) {
	      t === "" && (t = "false"), j.set(e, t, n);
	    } }), v.support.hrefNormalized || v.each(["href", "src", "width", "height"], function (e, n) {
	    v.attrHooks[n] = v.extend(v.attrHooks[n], { get: function get(e) {
	        var r = e.getAttribute(n, 2);return r === null ? t : r;
	      } });
	  }), v.support.style || (v.attrHooks.style = { get: function get(e) {
	      return e.style.cssText.toLowerCase() || t;
	    }, set: function set(e, t) {
	      return e.style.cssText = t + "";
	    } }), v.support.optSelected || (v.propHooks.selected = v.extend(v.propHooks.selected, { get: function get(e) {
	      var t = e.parentNode;return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
	    } })), v.support.enctype || (v.propFix.enctype = "encoding"), v.support.checkOn || v.each(["radio", "checkbox"], function () {
	    v.valHooks[this] = { get: function get(e) {
	        return e.getAttribute("value") === null ? "on" : e.value;
	      } };
	  }), v.each(["radio", "checkbox"], function () {
	    v.valHooks[this] = v.extend(v.valHooks[this], { set: function set(e, t) {
	        if (v.isArray(t)) return e.checked = v.inArray(v(e).val(), t) >= 0;
	      } });
	  });var $ = /^(?:textarea|input|select)$/i,
	      J = /^([^\.]*|)(?:\.(.+)|)$/,
	      K = /(?:^|\s)hover(\.\S+|)\b/,
	      Q = /^key/,
	      G = /^(?:mouse|contextmenu)|click/,
	      Y = /^(?:focusinfocus|focusoutblur)$/,
	      Z = function Z(e) {
	    return v.event.special.hover ? e : e.replace(K, "mouseenter$1 mouseleave$1");
	  };v.event = { add: function add(e, n, r, i, s) {
	      var o, _u, a, f, l, c, h, p, d, m, g;if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = v._data(e))) return;r.handler && (d = r, r = d.handler, s = d.selector), r.guid || (r.guid = v.guid++), a = o.events, a || (o.events = a = {}), _u = o.handle, _u || (o.handle = _u = function u(e) {
	        return typeof v == "undefined" || !!e && v.event.triggered === e.type ? t : v.event.dispatch.apply(_u.elem, arguments);
	      }, _u.elem = e), n = v.trim(Z(n)).split(" ");for (f = 0; f < n.length; f++) {
	        l = J.exec(n[f]) || [], c = l[1], h = (l[2] || "").split(".").sort(), g = v.event.special[c] || {}, c = (s ? g.delegateType : g.bindType) || c, g = v.event.special[c] || {}, p = v.extend({ type: c, origType: l[1], data: i, handler: r, guid: r.guid, selector: s, needsContext: s && v.expr.match.needsContext.test(s), namespace: h.join(".") }, d), m = a[c];if (!m) {
	          m = a[c] = [], m.delegateCount = 0;if (!g.setup || g.setup.call(e, i, h, _u) === !1) e.addEventListener ? e.addEventListener(c, _u, !1) : e.attachEvent && e.attachEvent("on" + c, _u);
	        }g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), s ? m.splice(m.delegateCount++, 0, p) : m.push(p), v.event.global[c] = !0;
	      }e = null;
	    }, global: {}, remove: function remove(e, t, n, r, i) {
	      var s,
	          o,
	          u,
	          a,
	          f,
	          l,
	          c,
	          h,
	          p,
	          d,
	          m,
	          g = v.hasData(e) && v._data(e);if (!g || !(h = g.events)) return;t = v.trim(Z(t || "")).split(" ");for (s = 0; s < t.length; s++) {
	        o = J.exec(t[s]) || [], u = a = o[1], f = o[2];if (!u) {
	          for (u in h) {
	            v.event.remove(e, u + t[s], n, r, !0);
	          }continue;
	        }p = v.event.special[u] || {}, u = (r ? p.delegateType : p.bindType) || u, d = h[u] || [], l = d.length, f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;for (c = 0; c < d.length; c++) {
	          m = d[c], (i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.namespace)) && (!r || r === m.selector || r === "**" && m.selector) && (d.splice(c--, 1), m.selector && d.delegateCount--, p.remove && p.remove.call(e, m));
	        }d.length === 0 && l !== d.length && ((!p.teardown || p.teardown.call(e, f, g.handle) === !1) && v.removeEvent(e, u, g.handle), delete h[u]);
	      }v.isEmptyObject(h) && (delete g.handle, v.removeData(e, "events", !0));
	    }, customEvent: { getData: !0, setData: !0, changeData: !0 }, trigger: function trigger(n, r, s, o) {
	      if (!s || s.nodeType !== 3 && s.nodeType !== 8) {
	        var u,
	            a,
	            f,
	            l,
	            c,
	            h,
	            p,
	            d,
	            m,
	            g,
	            y = n.type || n,
	            b = [];if (Y.test(y + v.event.triggered)) return;y.indexOf("!") >= 0 && (y = y.slice(0, -1), a = !0), y.indexOf(".") >= 0 && (b = y.split("."), y = b.shift(), b.sort());if ((!s || v.event.customEvent[y]) && !v.event.global[y]) return;n = (typeof n === "undefined" ? "undefined" : _typeof(n)) == "object" ? n[v.expando] ? n : new v.Event(y, n) : new v.Event(y), n.type = y, n.isTrigger = !0, n.exclusive = a, n.namespace = b.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = y.indexOf(":") < 0 ? "on" + y : "";if (!s) {
	          u = v.cache;for (f in u) {
	            u[f].events && u[f].events[y] && v.event.trigger(n, r, u[f].handle.elem, !0);
	          }return;
	        }n.result = t, n.target || (n.target = s), r = r != null ? v.makeArray(r) : [], r.unshift(n), p = v.event.special[y] || {};if (p.trigger && p.trigger.apply(s, r) === !1) return;m = [[s, p.bindType || y]];if (!o && !p.noBubble && !v.isWindow(s)) {
	          g = p.delegateType || y, l = Y.test(g + y) ? s : s.parentNode;for (c = s; l; l = l.parentNode) {
	            m.push([l, g]), c = l;
	          }c === (s.ownerDocument || i) && m.push([c.defaultView || c.parentWindow || e, g]);
	        }for (f = 0; f < m.length && !n.isPropagationStopped(); f++) {
	          l = m[f][0], n.type = m[f][1], d = (v._data(l, "events") || {})[n.type] && v._data(l, "handle"), d && d.apply(l, r), d = h && l[h], d && v.acceptData(l) && d.apply && d.apply(l, r) === !1 && n.preventDefault();
	        }return n.type = y, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && (y !== "click" || !v.nodeName(s, "a")) && v.acceptData(s) && h && s[y] && (y !== "focus" && y !== "blur" || n.target.offsetWidth !== 0) && !v.isWindow(s) && (c = s[h], c && (s[h] = null), v.event.triggered = y, s[y](), v.event.triggered = t, c && (s[h] = c)), n.result;
	      }return;
	    }, dispatch: function dispatch(n) {
	      n = v.event.fix(n || e.event);var r,
	          i,
	          s,
	          o,
	          u,
	          a,
	          f,
	          c,
	          h,
	          p,
	          d = (v._data(this, "events") || {})[n.type] || [],
	          m = d.delegateCount,
	          g = l.call(arguments),
	          y = !n.exclusive && !n.namespace,
	          b = v.event.special[n.type] || {},
	          w = [];g[0] = n, n.delegateTarget = this;if (b.preDispatch && b.preDispatch.call(this, n) === !1) return;if (m && (!n.button || n.type !== "click")) for (s = n.target; s != this; s = s.parentNode || this) {
	        if (s.disabled !== !0 || n.type !== "click") {
	          u = {}, f = [];for (r = 0; r < m; r++) {
	            c = d[r], h = c.selector, u[h] === t && (u[h] = c.needsContext ? v(h, this).index(s) >= 0 : v.find(h, this, null, [s]).length), u[h] && f.push(c);
	          }f.length && w.push({ elem: s, matches: f });
	        }
	      }d.length > m && w.push({ elem: this, matches: d.slice(m) });for (r = 0; r < w.length && !n.isPropagationStopped(); r++) {
	        a = w[r], n.currentTarget = a.elem;for (i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) {
	          c = a.matches[i];if (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) n.data = c.data, n.handleObj = c, o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g), o !== t && (n.result = o, o === !1 && (n.preventDefault(), n.stopPropagation()));
	        }
	      }return b.postDispatch && b.postDispatch.call(this, n), n.result;
	    }, props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function filter(e, t) {
	        return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e;
	      } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function filter(e, n) {
	        var r,
	            s,
	            o,
	            u = n.button,
	            a = n.fromElement;return e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || i, s = r.documentElement, o = r.body, e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e;
	      } }, fix: function fix(e) {
	      if (e[v.expando]) return e;var t,
	          n,
	          r = e,
	          s = v.event.fixHooks[e.type] || {},
	          o = s.props ? this.props.concat(s.props) : this.props;e = v.Event(r);for (t = o.length; t;) {
	        n = o[--t], e[n] = r[n];
	      }return e.target || (e.target = r.srcElement || i), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e;
	    }, special: { load: { noBubble: !0 }, focus: { delegateType: "focusin" }, blur: { delegateType: "focusout" }, beforeunload: { setup: function setup(e, t, n) {
	          v.isWindow(this) && (this.onbeforeunload = n);
	        }, teardown: function teardown(e, t) {
	          this.onbeforeunload === t && (this.onbeforeunload = null);
	        } } }, simulate: function simulate(e, t, n, r) {
	      var i = v.extend(new v.Event(), n, { type: e, isSimulated: !0, originalEvent: {} });r ? v.event.trigger(i, null, t) : v.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
	    } }, v.event.handle = v.event.dispatch, v.removeEvent = i.removeEventListener ? function (e, t, n) {
	    e.removeEventListener && e.removeEventListener(t, n, !1);
	  } : function (e, t, n) {
	    var r = "on" + t;e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null), e.detachEvent(r, n));
	  }, v.Event = function (e, t) {
	    if (!(this instanceof v.Event)) return new v.Event(e, t);e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? tt : et) : this.type = e, t && v.extend(this, t), this.timeStamp = e && e.timeStamp || v.now(), this[v.expando] = !0;
	  }, v.Event.prototype = { preventDefault: function preventDefault() {
	      this.isDefaultPrevented = tt;var e = this.originalEvent;if (!e) return;e.preventDefault ? e.preventDefault() : e.returnValue = !1;
	    }, stopPropagation: function stopPropagation() {
	      this.isPropagationStopped = tt;var e = this.originalEvent;if (!e) return;e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0;
	    }, stopImmediatePropagation: function stopImmediatePropagation() {
	      this.isImmediatePropagationStopped = tt, this.stopPropagation();
	    }, isDefaultPrevented: et, isPropagationStopped: et, isImmediatePropagationStopped: et }, v.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (e, t) {
	    v.event.special[e] = { delegateType: t, bindType: t, handle: function handle(e) {
	        var n,
	            r = this,
	            i = e.relatedTarget,
	            s = e.handleObj,
	            o = s.selector;if (!i || i !== r && !v.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;return n;
	      } };
	  }), v.support.submitBubbles || (v.event.special.submit = { setup: function setup() {
	      if (v.nodeName(this, "form")) return !1;v.event.add(this, "click._submit keypress._submit", function (e) {
	        var n = e.target,
	            r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form : t;r && !v._data(r, "_submit_attached") && (v.event.add(r, "submit._submit", function (e) {
	          e._submit_bubble = !0;
	        }), v._data(r, "_submit_attached", !0));
	      });
	    }, postDispatch: function postDispatch(e) {
	      e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && v.event.simulate("submit", this.parentNode, e, !0));
	    }, teardown: function teardown() {
	      if (v.nodeName(this, "form")) return !1;v.event.remove(this, "._submit");
	    } }), v.support.changeBubbles || (v.event.special.change = { setup: function setup() {
	      if ($.test(this.nodeName)) {
	        if (this.type === "checkbox" || this.type === "radio") v.event.add(this, "propertychange._change", function (e) {
	          e.originalEvent.propertyName === "checked" && (this._just_changed = !0);
	        }), v.event.add(this, "click._change", function (e) {
	          this._just_changed && !e.isTrigger && (this._just_changed = !1), v.event.simulate("change", this, e, !0);
	        });return !1;
	      }v.event.add(this, "beforeactivate._change", function (e) {
	        var t = e.target;$.test(t.nodeName) && !v._data(t, "_change_attached") && (v.event.add(t, "change._change", function (e) {
	          this.parentNode && !e.isSimulated && !e.isTrigger && v.event.simulate("change", this.parentNode, e, !0);
	        }), v._data(t, "_change_attached", !0));
	      });
	    }, handle: function handle(e) {
	      var t = e.target;if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.handler.apply(this, arguments);
	    }, teardown: function teardown() {
	      return v.event.remove(this, "._change"), !$.test(this.nodeName);
	    } }), v.support.focusinBubbles || v.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
	    var n = 0,
	        r = function r(e) {
	      v.event.simulate(t, e.target, v.event.fix(e), !0);
	    };v.event.special[t] = { setup: function setup() {
	        n++ === 0 && i.addEventListener(e, r, !0);
	      }, teardown: function teardown() {
	        --n === 0 && i.removeEventListener(e, r, !0);
	      } };
	  }), v.fn.extend({ on: function on(e, n, r, i, s) {
	      var o, u;if ((typeof e === "undefined" ? "undefined" : _typeof(e)) == "object") {
	        typeof n != "string" && (r = r || n, n = t);for (u in e) {
	          this.on(u, n, r, e[u], s);
	        }return this;
	      }r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));if (i === !1) i = et;else if (!i) return this;return s === 1 && (o = i, i = function i(e) {
	        return v().off(e), o.apply(this, arguments);
	      }, i.guid = o.guid || (o.guid = v.guid++)), this.each(function () {
	        v.event.add(this, e, i, r, n);
	      });
	    }, one: function one(e, t, n, r) {
	      return this.on(e, t, n, r, 1);
	    }, off: function off(e, n, r) {
	      var i, s;if (e && e.preventDefault && e.handleObj) return i = e.handleObj, v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;if ((typeof e === "undefined" ? "undefined" : _typeof(e)) == "object") {
	        for (s in e) {
	          this.off(s, n, e[s]);
	        }return this;
	      }if (n === !1 || typeof n == "function") r = n, n = t;return r === !1 && (r = et), this.each(function () {
	        v.event.remove(this, e, r, n);
	      });
	    }, bind: function bind(e, t, n) {
	      return this.on(e, null, t, n);
	    }, unbind: function unbind(e, t) {
	      return this.off(e, null, t);
	    }, live: function live(e, t, n) {
	      return v(this.context).on(e, this.selector, t, n), this;
	    }, die: function die(e, t) {
	      return v(this.context).off(e, this.selector || "**", t), this;
	    }, delegate: function delegate(e, t, n, r) {
	      return this.on(t, e, n, r);
	    }, undelegate: function undelegate(e, t, n) {
	      return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n);
	    }, trigger: function trigger(e, t) {
	      return this.each(function () {
	        v.event.trigger(e, t, this);
	      });
	    }, triggerHandler: function triggerHandler(e, t) {
	      if (this[0]) return v.event.trigger(e, t, this[0], !0);
	    }, toggle: function toggle(e) {
	      var t = arguments,
	          n = e.guid || v.guid++,
	          r = 0,
	          i = function i(n) {
	        var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;return v._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1;
	      };i.guid = n;while (r < t.length) {
	        t[r++].guid = n;
	      }return this.click(i);
	    }, hover: function hover(e, t) {
	      return this.mouseenter(e).mouseleave(t || e);
	    } }), v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
	    v.fn[t] = function (e, n) {
	      return n == null && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
	    }, Q.test(t) && (v.event.fixHooks[t] = v.event.keyHooks), G.test(t) && (v.event.fixHooks[t] = v.event.mouseHooks);
	  }), function (e, t) {
	    function nt(e, t, n, r) {
	      n = n || [], t = t || g;var i,
	          s,
	          a,
	          f,
	          l = t.nodeType;if (!e || typeof e != "string") return n;if (l !== 1 && l !== 9) return [];a = o(t);if (!a && !r) if (i = R.exec(e)) if (f = i[1]) {
	        if (l === 9) {
	          s = t.getElementById(f);if (!s || !s.parentNode) return n;if (s.id === f) return n.push(s), n;
	        } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f) return n.push(s), n;
	      } else {
	        if (i[2]) return S.apply(n, x.call(t.getElementsByTagName(e), 0)), n;if ((f = i[3]) && Z && t.getElementsByClassName) return S.apply(n, x.call(t.getElementsByClassName(f), 0)), n;
	      }return vt(e.replace(j, "$1"), t, n, r, a);
	    }function rt(e) {
	      return function (t) {
	        var n = t.nodeName.toLowerCase();return n === "input" && t.type === e;
	      };
	    }function it(e) {
	      return function (t) {
	        var n = t.nodeName.toLowerCase();return (n === "input" || n === "button") && t.type === e;
	      };
	    }function st(e) {
	      return N(function (t) {
	        return t = +t, N(function (n, r) {
	          var i,
	              s = e([], n.length, t),
	              o = s.length;while (o--) {
	            n[i = s[o]] && (n[i] = !(r[i] = n[i]));
	          }
	        });
	      });
	    }function ot(e, t, n) {
	      if (e === t) return n;var r = e.nextSibling;while (r) {
	        if (r === t) return -1;r = r.nextSibling;
	      }return 1;
	    }function ut(e, t) {
	      var n,
	          r,
	          s,
	          o,
	          u,
	          a,
	          f,
	          l = L[d][e + " "];if (l) return t ? 0 : l.slice(0);u = e, a = [], f = i.preFilter;while (u) {
	        if (!n || (r = F.exec(u))) r && (u = u.slice(r[0].length) || u), a.push(s = []);n = !1;if (r = I.exec(u)) s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = r[0].replace(j, " ");for (o in i.filter) {
	          (r = J[o].exec(u)) && (!f[o] || (r = f[o](r))) && (s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = o, n.matches = r);
	        }if (!n) break;
	      }return t ? u.length : u ? nt.error(e) : L(e, a).slice(0);
	    }function at(e, t, r) {
	      var i = t.dir,
	          s = r && t.dir === "parentNode",
	          o = w++;return t.first ? function (t, n, r) {
	        while (t = t[i]) {
	          if (s || t.nodeType === 1) return e(t, n, r);
	        }
	      } : function (t, r, u) {
	        if (!u) {
	          var a,
	              f = b + " " + o + " ",
	              l = f + n;while (t = t[i]) {
	            if (s || t.nodeType === 1) {
	              if ((a = t[d]) === l) return t.sizset;if (typeof a == "string" && a.indexOf(f) === 0) {
	                if (t.sizset) return t;
	              } else {
	                t[d] = l;if (e(t, r, u)) return t.sizset = !0, t;t.sizset = !1;
	              }
	            }
	          }
	        } else while (t = t[i]) {
	          if (s || t.nodeType === 1) if (e(t, r, u)) return t;
	        }
	      };
	    }function ft(e) {
	      return e.length > 1 ? function (t, n, r) {
	        var i = e.length;while (i--) {
	          if (!e[i](t, n, r)) return !1;
	        }return !0;
	      } : e[0];
	    }function lt(e, t, n, r, i) {
	      var s,
	          o = [],
	          u = 0,
	          a = e.length,
	          f = t != null;for (; u < a; u++) {
	        if (s = e[u]) if (!n || n(s, r, i)) o.push(s), f && t.push(u);
	      }return o;
	    }function ct(e, t, n, r, i, s) {
	      return r && !r[d] && (r = ct(r)), i && !i[d] && (i = ct(i, s)), N(function (s, o, u, a) {
	        var f,
	            l,
	            c,
	            h = [],
	            p = [],
	            d = o.length,
	            v = s || dt(t || "*", u.nodeType ? [u] : u, []),
	            m = e && (s || !t) ? lt(v, h, e, u, a) : v,
	            g = n ? i || (s ? e : d || r) ? [] : o : m;n && n(m, g, u, a);if (r) {
	          f = lt(g, p), r(f, [], u, a), l = f.length;while (l--) {
	            if (c = f[l]) g[p[l]] = !(m[p[l]] = c);
	          }
	        }if (s) {
	          if (i || e) {
	            if (i) {
	              f = [], l = g.length;while (l--) {
	                (c = g[l]) && f.push(m[l] = c);
	              }i(null, g = [], f, a);
	            }l = g.length;while (l--) {
	              (c = g[l]) && (f = i ? T.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c));
	            }
	          }
	        } else g = lt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : S.apply(o, g);
	      });
	    }function ht(e) {
	      var t,
	          n,
	          r,
	          s = e.length,
	          o = i.relative[e[0].type],
	          u = o || i.relative[" "],
	          a = o ? 1 : 0,
	          f = at(function (e) {
	        return e === t;
	      }, u, !0),
	          l = at(function (e) {
	        return T.call(t, e) > -1;
	      }, u, !0),
	          h = [function (e, n, r) {
	        return !o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r));
	      }];for (; a < s; a++) {
	        if (n = i.relative[e[a].type]) h = [at(ft(h), n)];else {
	          n = i.filter[e[a].type].apply(null, e[a].matches);if (n[d]) {
	            r = ++a;for (; r < s; r++) {
	              if (i.relative[e[r].type]) break;
	            }return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, a < r && ht(e.slice(a, r)), r < s && ht(e = e.slice(r)), r < s && e.join(""));
	          }h.push(n);
	        }
	      }return ft(h);
	    }function pt(e, t) {
	      var r = t.length > 0,
	          s = e.length > 0,
	          o = function o(u, a, f, l, h) {
	        var p,
	            d,
	            v,
	            m = [],
	            y = 0,
	            w = "0",
	            x = u && [],
	            T = h != null,
	            N = c,
	            C = u || s && i.find.TAG("*", h && a.parentNode || a),
	            k = b += N == null ? 1 : Math.E;T && (c = a !== g && a, n = o.el);for (; (p = C[w]) != null; w++) {
	          if (s && p) {
	            for (d = 0; v = e[d]; d++) {
	              if (v(p, a, f)) {
	                l.push(p);break;
	              }
	            }T && (b = k, n = ++o.el);
	          }r && ((p = !v && p) && y--, u && x.push(p));
	        }y += w;if (r && w !== y) {
	          for (d = 0; v = t[d]; d++) {
	            v(x, m, a, f);
	          }if (u) {
	            if (y > 0) while (w--) {
	              !x[w] && !m[w] && (m[w] = E.call(l));
	            }m = lt(m);
	          }S.apply(l, m), T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l);
	        }return T && (b = k, c = N), x;
	      };return o.el = 0, r ? N(o) : o;
	    }function dt(e, t, n) {
	      var r = 0,
	          i = t.length;for (; r < i; r++) {
	        nt(e, t[r], n);
	      }return n;
	    }function vt(e, t, n, r, s) {
	      var o,
	          u,
	          f,
	          l,
	          c,
	          h = ut(e),
	          p = h.length;if (!r && h.length === 1) {
	        u = h[0] = h[0].slice(0);if (u.length > 2 && (f = u[0]).type === "ID" && t.nodeType === 9 && !s && i.relative[u[1].type]) {
	          t = i.find.ID(f.matches[0].replace($, ""), t, s)[0];if (!t) return n;e = e.slice(u.shift().length);
	        }for (o = J.POS.test(e) ? -1 : u.length - 1; o >= 0; o--) {
	          f = u[o];if (i.relative[l = f.type]) break;if (c = i.find[l]) if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
	            u.splice(o, 1), e = r.length && u.join("");if (!e) return S.apply(n, x.call(r, 0)), n;break;
	          }
	        }
	      }return a(e, h)(r, t, s, n, z.test(e)), n;
	    }function mt() {}var n,
	        r,
	        i,
	        s,
	        o,
	        u,
	        a,
	        f,
	        l,
	        c,
	        h = !0,
	        p = "undefined",
	        d = ("sizcache" + Math.random()).replace(".", ""),
	        m = String,
	        g = e.document,
	        y = g.documentElement,
	        b = 0,
	        w = 0,
	        E = [].pop,
	        S = [].push,
	        x = [].slice,
	        T = [].indexOf || function (e) {
	      var t = 0,
	          n = this.length;for (; t < n; t++) {
	        if (this[t] === e) return t;
	      }return -1;
	    },
	        N = function N(e, t) {
	      return e[d] = t == null || t, e;
	    },
	        C = function C() {
	      var e = {},
	          t = [];return N(function (n, r) {
	        return t.push(n) > i.cacheLength && delete e[t.shift()], e[n + " "] = r;
	      }, e);
	    },
	        k = C(),
	        L = C(),
	        A = C(),
	        O = "[\\x20\\t\\r\\n\\f]",
	        M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
	        _ = M.replace("w", "w#"),
	        D = "([*^$|!~]?=)",
	        P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]",
	        H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)",
	        B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)",
	        j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
	        F = new RegExp("^" + O + "*," + O + "*"),
	        I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"),
	        q = new RegExp(H),
	        R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
	        U = /^:not/,
	        z = /[\x20\t\r\n\f]*[+~]/,
	        W = /:not\($/,
	        X = /h\d/i,
	        V = /input|select|textarea|button/i,
	        $ = /\\(?!\\)/g,
	        J = { ID: new RegExp("^#(" + M + ")"), CLASS: new RegExp("^\\.(" + M + ")"), NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"), TAG: new RegExp("^(" + M.replace("w", "w*") + ")"), ATTR: new RegExp("^" + P), PSEUDO: new RegExp("^" + H), POS: new RegExp(B, "i"), CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"), needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i") },
	        K = function K(e) {
	      var t = g.createElement("div");try {
	        return e(t);
	      } catch (n) {
	        return !1;
	      } finally {
	        t = null;
	      }
	    },
	        Q = K(function (e) {
	      return e.appendChild(g.createComment("")), !e.getElementsByTagName("*").length;
	    }),
	        G = K(function (e) {
	      return e.innerHTML = "<a href='#'></a>", e.firstChild && _typeof(e.firstChild.getAttribute) !== p && e.firstChild.getAttribute("href") === "#";
	    }),
	        Y = K(function (e) {
	      e.innerHTML = "<select></select>";var t = _typeof(e.lastChild.getAttribute("multiple"));return t !== "boolean" && t !== "string";
	    }),
	        Z = K(function (e) {
	      return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !e.getElementsByClassName || !e.getElementsByClassName("e").length ? !1 : (e.lastChild.className = "e", e.getElementsByClassName("e").length === 2);
	    }),
	        et = K(function (e) {
	      e.id = d + 0, e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>", y.insertBefore(e, y.firstChild);var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;return r = !g.getElementById(d), y.removeChild(e), t;
	    });try {
	      x.call(y.childNodes, 0)[0].nodeType;
	    } catch (tt) {
	      x = function x(e) {
	        var t,
	            n = [];for (; t = this[e]; e++) {
	          n.push(t);
	        }return n;
	      };
	    }nt.matches = function (e, t) {
	      return nt(e, null, null, t);
	    }, nt.matchesSelector = function (e, t) {
	      return nt(t, null, null, [e]).length > 0;
	    }, s = nt.getText = function (e) {
	      var t,
	          n = "",
	          r = 0,
	          i = e.nodeType;if (i) {
	        if (i === 1 || i === 9 || i === 11) {
	          if (typeof e.textContent == "string") return e.textContent;for (e = e.firstChild; e; e = e.nextSibling) {
	            n += s(e);
	          }
	        } else if (i === 3 || i === 4) return e.nodeValue;
	      } else for (; t = e[r]; r++) {
	        n += s(t);
	      }return n;
	    }, o = nt.isXML = function (e) {
	      var t = e && (e.ownerDocument || e).documentElement;return t ? t.nodeName !== "HTML" : !1;
	    }, u = nt.contains = y.contains ? function (e, t) {
	      var n = e.nodeType === 9 ? e.documentElement : e,
	          r = t && t.parentNode;return e === r || !!(r && r.nodeType === 1 && n.contains && n.contains(r));
	    } : y.compareDocumentPosition ? function (e, t) {
	      return t && !!(e.compareDocumentPosition(t) & 16);
	    } : function (e, t) {
	      while (t = t.parentNode) {
	        if (t === e) return !0;
	      }return !1;
	    }, nt.attr = function (e, t) {
	      var n,
	          r = o(e);return r || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : r || Y ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? typeof e[t] == "boolean" ? e[t] ? t : null : n.specified ? n.value : null : null);
	    }, i = nt.selectors = { cacheLength: 50, createPseudo: N, match: J, attrHandle: G ? {} : { href: function href(e) {
	          return e.getAttribute("href", 2);
	        }, type: function type(e) {
	          return e.getAttribute("type");
	        } }, find: { ID: r ? function (e, t, n) {
	          if (_typeof(t.getElementById) !== p && !n) {
	            var r = t.getElementById(e);return r && r.parentNode ? [r] : [];
	          }
	        } : function (e, n, r) {
	          if (_typeof(n.getElementById) !== p && !r) {
	            var i = n.getElementById(e);return i ? i.id === e || _typeof(i.getAttributeNode) !== p && i.getAttributeNode("id").value === e ? [i] : t : [];
	          }
	        }, TAG: Q ? function (e, t) {
	          if (_typeof(t.getElementsByTagName) !== p) return t.getElementsByTagName(e);
	        } : function (e, t) {
	          var n = t.getElementsByTagName(e);if (e === "*") {
	            var r,
	                i = [],
	                s = 0;for (; r = n[s]; s++) {
	              r.nodeType === 1 && i.push(r);
	            }return i;
	          }return n;
	        }, NAME: et && function (e, t) {
	          if (_typeof(t.getElementsByName) !== p) return t.getElementsByName(name);
	        }, CLASS: Z && function (e, t, n) {
	          if (_typeof(t.getElementsByClassName) !== p && !n) return t.getElementsByClassName(e);
	        } }, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(e) {
	          return e[1] = e[1].replace($, ""), e[3] = (e[4] || e[5] || "").replace($, ""), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4);
	        }, CHILD: function CHILD(e) {
	          return e[1] = e[1].toLowerCase(), e[1] === "nth" ? (e[2] || nt.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * (e[2] === "even" || e[2] === "odd")), e[4] = +(e[6] + e[7] || e[2] === "odd")) : e[2] && nt.error(e[0]), e;
	        }, PSEUDO: function PSEUDO(e) {
	          var t, n;if (J.CHILD.test(e[0])) return null;if (e[3]) e[2] = e[3];else if (t = e[4]) q.test(t) && (n = ut(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)), e[2] = t;return e.slice(0, 3);
	        } }, filter: { ID: r ? function (e) {
	          return e = e.replace($, ""), function (t) {
	            return t.getAttribute("id") === e;
	          };
	        } : function (e) {
	          return e = e.replace($, ""), function (t) {
	            var n = _typeof(t.getAttributeNode) !== p && t.getAttributeNode("id");return n && n.value === e;
	          };
	        }, TAG: function TAG(e) {
	          return e === "*" ? function () {
	            return !0;
	          } : (e = e.replace($, "").toLowerCase(), function (t) {
	            return t.nodeName && t.nodeName.toLowerCase() === e;
	          });
	        }, CLASS: function CLASS(e) {
	          var t = k[d][e + " "];return t || (t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && k(e, function (e) {
	            return t.test(e.className || _typeof(e.getAttribute) !== p && e.getAttribute("class") || "");
	          });
	        }, ATTR: function ATTR(e, t, n) {
	          return function (r, i) {
	            var s = nt.attr(r, e);return s == null ? t === "!=" : t ? (s += "", t === "=" ? s === n : t === "!=" ? s !== n : t === "^=" ? n && s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) === n : t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0;
	          };
	        }, CHILD: function CHILD(e, t, n, r) {
	          return e === "nth" ? function (e) {
	            var t,
	                i,
	                s = e.parentNode;if (n === 1 && r === 0) return !0;if (s) {
	              i = 0;for (t = s.firstChild; t; t = t.nextSibling) {
	                if (t.nodeType === 1) {
	                  i++;if (e === t) break;
	                }
	              }
	            }return i -= r, i === n || i % n === 0 && i / n >= 0;
	          } : function (t) {
	            var n = t;switch (e) {case "only":case "first":
	                while (n = n.previousSibling) {
	                  if (n.nodeType === 1) return !1;
	                }if (e === "first") return !0;n = t;case "last":
	                while (n = n.nextSibling) {
	                  if (n.nodeType === 1) return !1;
	                }return !0;}
	          };
	        }, PSEUDO: function PSEUDO(e, t) {
	          var n,
	              r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);return r[d] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function (e, n) {
	            var i,
	                s = r(e, t),
	                o = s.length;while (o--) {
	              i = T.call(e, s[o]), e[i] = !(n[i] = s[o]);
	            }
	          }) : function (e) {
	            return r(e, 0, n);
	          }) : r;
	        } }, pseudos: { not: N(function (e) {
	          var t = [],
	              n = [],
	              r = a(e.replace(j, "$1"));return r[d] ? N(function (e, t, n, i) {
	            var s,
	                o = r(e, null, i, []),
	                u = e.length;while (u--) {
	              if (s = o[u]) e[u] = !(t[u] = s);
	            }
	          }) : function (e, i, s) {
	            return t[0] = e, r(t, null, s, n), !n.pop();
	          };
	        }), has: N(function (e) {
	          return function (t) {
	            return nt(e, t).length > 0;
	          };
	        }), contains: N(function (e) {
	          return function (t) {
	            return (t.textContent || t.innerText || s(t)).indexOf(e) > -1;
	          };
	        }), enabled: function enabled(e) {
	          return e.disabled === !1;
	        }, disabled: function disabled(e) {
	          return e.disabled === !0;
	        }, checked: function checked(e) {
	          var t = e.nodeName.toLowerCase();return t === "input" && !!e.checked || t === "option" && !!e.selected;
	        }, selected: function selected(e) {
	          return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
	        }, parent: function parent(e) {
	          return !i.pseudos.empty(e);
	        }, empty: function empty(e) {
	          var t;e = e.firstChild;while (e) {
	            if (e.nodeName > "@" || (t = e.nodeType) === 3 || t === 4) return !1;e = e.nextSibling;
	          }return !0;
	        }, header: function header(e) {
	          return X.test(e.nodeName);
	        }, text: function text(e) {
	          var t, n;return e.nodeName.toLowerCase() === "input" && (t = e.type) === "text" && ((n = e.getAttribute("type")) == null || n.toLowerCase() === t);
	        }, radio: rt("radio"), checkbox: rt("checkbox"), file: rt("file"), password: rt("password"), image: rt("image"), submit: it("submit"), reset: it("reset"), button: function button(e) {
	          var t = e.nodeName.toLowerCase();return t === "input" && e.type === "button" || t === "button";
	        }, input: function input(e) {
	          return V.test(e.nodeName);
	        }, focus: function focus(e) {
	          var t = e.ownerDocument;return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
	        }, active: function active(e) {
	          return e === e.ownerDocument.activeElement;
	        }, first: st(function () {
	          return [0];
	        }), last: st(function (e, t) {
	          return [t - 1];
	        }), eq: st(function (e, t, n) {
	          return [n < 0 ? n + t : n];
	        }), even: st(function (e, t) {
	          for (var n = 0; n < t; n += 2) {
	            e.push(n);
	          }return e;
	        }), odd: st(function (e, t) {
	          for (var n = 1; n < t; n += 2) {
	            e.push(n);
	          }return e;
	        }), lt: st(function (e, t, n) {
	          for (var r = n < 0 ? n + t : n; --r >= 0;) {
	            e.push(r);
	          }return e;
	        }), gt: st(function (e, t, n) {
	          for (var r = n < 0 ? n + t : n; ++r < t;) {
	            e.push(r);
	          }return e;
	        }) } }, f = y.compareDocumentPosition ? function (e, t) {
	      return e === t ? (l = !0, 0) : (!e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition : e.compareDocumentPosition(t) & 4) ? -1 : 1;
	    } : function (e, t) {
	      if (e === t) return l = !0, 0;if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;var n,
	          r,
	          i = [],
	          s = [],
	          o = e.parentNode,
	          u = t.parentNode,
	          a = o;if (o === u) return ot(e, t);if (!o) return -1;if (!u) return 1;while (a) {
	        i.unshift(a), a = a.parentNode;
	      }a = u;while (a) {
	        s.unshift(a), a = a.parentNode;
	      }n = i.length, r = s.length;for (var f = 0; f < n && f < r; f++) {
	        if (i[f] !== s[f]) return ot(i[f], s[f]);
	      }return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1);
	    }, [0, 0].sort(f), h = !l, nt.uniqueSort = function (e) {
	      var t,
	          n = [],
	          r = 1,
	          i = 0;l = h, e.sort(f);if (l) {
	        for (; t = e[r]; r++) {
	          t === e[r - 1] && (i = n.push(r));
	        }while (i--) {
	          e.splice(n[i], 1);
	        }
	      }return e;
	    }, nt.error = function (e) {
	      throw new Error("Syntax error, unrecognized expression: " + e);
	    }, a = nt.compile = function (e, t) {
	      var n,
	          r = [],
	          i = [],
	          s = A[d][e + " "];if (!s) {
	        t || (t = ut(e)), n = t.length;while (n--) {
	          s = ht(t[n]), s[d] ? r.push(s) : i.push(s);
	        }s = A(e, pt(i, r));
	      }return s;
	    }, g.querySelectorAll && function () {
	      var e,
	          t = vt,
	          n = /'|\\/g,
	          r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
	          i = [":focus"],
	          s = [":active"],
	          u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;K(function (e) {
	        e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || i.push(":checked");
	      }), K(function (e) {
	        e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled");
	      }), i = new RegExp(i.join("|")), vt = function vt(e, r, s, o, u) {
	        if (!o && !u && !i.test(e)) {
	          var a,
	              f,
	              l = !0,
	              c = d,
	              h = r,
	              p = r.nodeType === 9 && e;if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
	            a = ut(e), (l = r.getAttribute("id")) ? c = l.replace(n, "\\$&") : r.setAttribute("id", c), c = "[id='" + c + "'] ", f = a.length;while (f--) {
	              a[f] = c + a[f].join("");
	            }h = z.test(e) && r.parentNode || r, p = a.join(",");
	          }if (p) try {
	            return S.apply(s, x.call(h.querySelectorAll(p), 0)), s;
	          } catch (v) {} finally {
	            l || r.removeAttribute("id");
	          }
	        }return t(e, r, s, o, u);
	      }, u && (K(function (t) {
	        e = u.call(t, "div");try {
	          u.call(t, "[test!='']:sizzle"), s.push("!=", H);
	        } catch (n) {}
	      }), s = new RegExp(s.join("|")), nt.matchesSelector = function (t, n) {
	        n = n.replace(r, "='$1']");if (!o(t) && !s.test(n) && !i.test(n)) try {
	          var a = u.call(t, n);if (a || e || t.document && t.document.nodeType !== 11) return a;
	        } catch (f) {}return nt(n, null, null, [t]).length > 0;
	      });
	    }(), i.pseudos.nth = i.pseudos.eq, i.filters = mt.prototype = i.pseudos, i.setFilters = new mt(), nt.attr = v.attr, v.find = nt, v.expr = nt.selectors, v.expr[":"] = v.expr.pseudos, v.unique = nt.uniqueSort, v.text = nt.getText, v.isXMLDoc = nt.isXML, v.contains = nt.contains;
	  }(e);var nt = /Until$/,
	      rt = /^(?:parents|prev(?:Until|All))/,
	      it = /^.[^:#\[\.,]*$/,
	      st = v.expr.match.needsContext,
	      ot = { children: !0, contents: !0, next: !0, prev: !0 };v.fn.extend({ find: function find(e) {
	      var t,
	          n,
	          r,
	          i,
	          s,
	          o,
	          u = this;if (typeof e != "string") return v(e).filter(function () {
	        for (t = 0, n = u.length; t < n; t++) {
	          if (v.contains(u[t], this)) return !0;
	        }
	      });o = this.pushStack("", "find", e);for (t = 0, n = this.length; t < n; t++) {
	        r = o.length, v.find(e, this[t], o);if (t > 0) for (i = r; i < o.length; i++) {
	          for (s = 0; s < r; s++) {
	            if (o[s] === o[i]) {
	              o.splice(i--, 1);break;
	            }
	          }
	        }
	      }return o;
	    }, has: function has(e) {
	      var t,
	          n = v(e, this),
	          r = n.length;return this.filter(function () {
	        for (t = 0; t < r; t++) {
	          if (v.contains(this, n[t])) return !0;
	        }
	      });
	    }, not: function not(e) {
	      return this.pushStack(ft(this, e, !1), "not", e);
	    }, filter: function filter(e) {
	      return this.pushStack(ft(this, e, !0), "filter", e);
	    }, is: function is(e) {
	      return !!e && (typeof e == "string" ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length > 0 : this.filter(e).length > 0);
	    }, closest: function closest(e, t) {
	      var n,
	          r = 0,
	          i = this.length,
	          s = [],
	          o = st.test(e) || typeof e != "string" ? v(e, t || this.context) : 0;for (; r < i; r++) {
	        n = this[r];while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
	          if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
	            s.push(n);break;
	          }n = n.parentNode;
	        }
	      }return s = s.length > 1 ? v.unique(s) : s, this.pushStack(s, "closest", e);
	    }, index: function index(e) {
	      return e ? typeof e == "string" ? v.inArray(this[0], v(e)) : v.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
	    }, add: function add(e, t) {
	      var n = typeof e == "string" ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e),
	          r = v.merge(this.get(), n);return this.pushStack(ut(n[0]) || ut(r[0]) ? r : v.unique(r));
	    }, addBack: function addBack(e) {
	      return this.add(e == null ? this.prevObject : this.prevObject.filter(e));
	    } }), v.fn.andSelf = v.fn.addBack, v.each({ parent: function parent(e) {
	      var t = e.parentNode;return t && t.nodeType !== 11 ? t : null;
	    }, parents: function parents(e) {
	      return v.dir(e, "parentNode");
	    }, parentsUntil: function parentsUntil(e, t, n) {
	      return v.dir(e, "parentNode", n);
	    }, next: function next(e) {
	      return at(e, "nextSibling");
	    }, prev: function prev(e) {
	      return at(e, "previousSibling");
	    }, nextAll: function nextAll(e) {
	      return v.dir(e, "nextSibling");
	    }, prevAll: function prevAll(e) {
	      return v.dir(e, "previousSibling");
	    }, nextUntil: function nextUntil(e, t, n) {
	      return v.dir(e, "nextSibling", n);
	    }, prevUntil: function prevUntil(e, t, n) {
	      return v.dir(e, "previousSibling", n);
	    }, siblings: function siblings(e) {
	      return v.sibling((e.parentNode || {}).firstChild, e);
	    }, children: function children(e) {
	      return v.sibling(e.firstChild);
	    }, contents: function contents(e) {
	      return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.merge([], e.childNodes);
	    } }, function (e, t) {
	    v.fn[e] = function (n, r) {
	      var i = v.map(this, t, n);return nt.test(e) || (r = n), r && typeof r == "string" && (i = v.filter(r, i)), i = this.length > 1 && !ot[e] ? v.unique(i) : i, this.length > 1 && rt.test(e) && (i = i.reverse()), this.pushStack(i, e, l.call(arguments).join(","));
	    };
	  }), v.extend({ filter: function filter(e, t, n) {
	      return n && (e = ":not(" + e + ")"), t.length === 1 ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(e, t);
	    }, dir: function dir(e, n, r) {
	      var i = [],
	          s = e[n];while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !v(s).is(r))) {
	        s.nodeType === 1 && i.push(s), s = s[n];
	      }return i;
	    }, sibling: function sibling(e, t) {
	      var n = [];for (; e; e = e.nextSibling) {
	        e.nodeType === 1 && e !== t && n.push(e);
	      }return n;
	    } });var ct = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	      ht = / jQuery\d+="(?:null|\d+)"/g,
	      pt = /^\s+/,
	      dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	      vt = /<([\w:]+)/,
	      mt = /<tbody/i,
	      gt = /<|&#?\w+;/,
	      yt = /<(?:script|style|link)/i,
	      bt = /<(?:script|object|embed|option|style)/i,
	      wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i"),
	      Et = /^(?:checkbox|radio)$/,
	      St = /checked\s*(?:[^=]|=\s*.checked.)/i,
	      xt = /\/(java|ecma)script/i,
	      Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
	      Nt = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""] },
	      Ct = lt(i),
	      kt = Ct.appendChild(i.createElement("div"));Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead, Nt.th = Nt.td, v.support.htmlSerialize || (Nt._default = [1, "X<div>", "</div>"]), v.fn.extend({ text: function text(e) {
	      return v.access(this, function (e) {
	        return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e));
	      }, null, e, arguments.length);
	    }, wrapAll: function wrapAll(e) {
	      if (v.isFunction(e)) return this.each(function (t) {
	        v(this).wrapAll(e.call(this, t));
	      });if (this[0]) {
	        var t = v(e, this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
	          var e = this;while (e.firstChild && e.firstChild.nodeType === 1) {
	            e = e.firstChild;
	          }return e;
	        }).append(this);
	      }return this;
	    }, wrapInner: function wrapInner(e) {
	      return v.isFunction(e) ? this.each(function (t) {
	        v(this).wrapInner(e.call(this, t));
	      }) : this.each(function () {
	        var t = v(this),
	            n = t.contents();n.length ? n.wrapAll(e) : t.append(e);
	      });
	    }, wrap: function wrap(e) {
	      var t = v.isFunction(e);return this.each(function (n) {
	        v(this).wrapAll(t ? e.call(this, n) : e);
	      });
	    }, unwrap: function unwrap() {
	      return this.parent().each(function () {
	        v.nodeName(this, "body") || v(this).replaceWith(this.childNodes);
	      }).end();
	    }, append: function append() {
	      return this.domManip(arguments, !0, function (e) {
	        (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(e);
	      });
	    }, prepend: function prepend() {
	      return this.domManip(arguments, !0, function (e) {
	        (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(e, this.firstChild);
	      });
	    }, before: function before() {
	      if (!ut(this[0])) return this.domManip(arguments, !1, function (e) {
	        this.parentNode.insertBefore(e, this);
	      });if (arguments.length) {
	        var e = v.clean(arguments);return this.pushStack(v.merge(e, this), "before", this.selector);
	      }
	    }, after: function after() {
	      if (!ut(this[0])) return this.domManip(arguments, !1, function (e) {
	        this.parentNode.insertBefore(e, this.nextSibling);
	      });if (arguments.length) {
	        var e = v.clean(arguments);return this.pushStack(v.merge(this, e), "after", this.selector);
	      }
	    }, remove: function remove(e, t) {
	      var n,
	          r = 0;for (; (n = this[r]) != null; r++) {
	        if (!e || v.filter(e, [n]).length) !t && n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), v.cleanData([n])), n.parentNode && n.parentNode.removeChild(n);
	      }return this;
	    }, empty: function empty() {
	      var e,
	          t = 0;for (; (e = this[t]) != null; t++) {
	        e.nodeType === 1 && v.cleanData(e.getElementsByTagName("*"));while (e.firstChild) {
	          e.removeChild(e.firstChild);
	        }
	      }return this;
	    }, clone: function clone(e, t) {
	      return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function () {
	        return v.clone(this, e, t);
	      });
	    }, html: function html(e) {
	      return v.access(this, function (e) {
	        var n = this[0] || {},
	            r = 0,
	            i = this.length;if (e === t) return n.nodeType === 1 ? n.innerHTML.replace(ht, "") : t;if (typeof e == "string" && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace || !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
	          e = e.replace(dt, "<$1></$2>");try {
	            for (; r < i; r++) {
	              n = this[r] || {}, n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
	            }n = 0;
	          } catch (s) {}
	        }n && this.empty().append(e);
	      }, null, e, arguments.length);
	    }, replaceWith: function replaceWith(e) {
	      return ut(this[0]) ? this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this : v.isFunction(e) ? this.each(function (t) {
	        var n = v(this),
	            r = n.html();n.replaceWith(e.call(this, t, r));
	      }) : (typeof e != "string" && (e = v(e).detach()), this.each(function () {
	        var t = this.nextSibling,
	            n = this.parentNode;v(this).remove(), t ? v(t).before(e) : v(n).append(e);
	      }));
	    }, detach: function detach(e) {
	      return this.remove(e, !0);
	    }, domManip: function domManip(e, n, r) {
	      e = [].concat.apply([], e);var i,
	          s,
	          o,
	          u,
	          a = 0,
	          f = e[0],
	          l = [],
	          c = this.length;if (!v.support.checkClone && c > 1 && typeof f == "string" && St.test(f)) return this.each(function () {
	        v(this).domManip(e, n, r);
	      });if (v.isFunction(f)) return this.each(function (i) {
	        var s = v(this);e[0] = f.call(this, i, n ? s.html() : t), s.domManip(e, n, r);
	      });if (this[0]) {
	        i = v.buildFragment(e, this, l), o = i.fragment, s = o.firstChild, o.childNodes.length === 1 && (o = s);if (s) {
	          n = n && v.nodeName(s, "tr");for (u = i.cacheable || c - 1; a < c; a++) {
	            r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") : this[a], a === u ? o : v.clone(o, !0, !0));
	          }
	        }o = s = null, l.length && v.each(l, function (e, t) {
	          t.src ? v.ajax ? v.ajax({ url: t.src, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) : v.error("no ajax") : v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, "")), t.parentNode && t.parentNode.removeChild(t);
	        });
	      }return this;
	    } }), v.buildFragment = function (e, n, r) {
	    var s,
	        o,
	        u,
	        a = e[0];return n = n || i, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, e.length === 1 && typeof a == "string" && a.length < 512 && n === i && a.charAt(0) === "<" && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.html5Clone || !wt.test(a)) && (o = !0, s = v.fragments[a], u = s !== t), s || (s = n.createDocumentFragment(), v.clean(e, n, s, r), o && (v.fragments[a] = u && s)), { fragment: s, cacheable: o };
	  }, v.fragments = {}, v.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
	    v.fn[e] = function (n) {
	      var r,
	          i = 0,
	          s = [],
	          o = v(n),
	          u = o.length,
	          a = this.length === 1 && this[0].parentNode;if ((a == null || a && a.nodeType === 11 && a.childNodes.length === 1) && u === 1) return o[t](this[0]), this;for (; i < u; i++) {
	        r = (i > 0 ? this.clone(!0) : this).get(), v(o[i])[t](r), s = s.concat(r);
	      }return this.pushStack(s, e, o.selector);
	    };
	  }), v.extend({ clone: function clone(e, t, n) {
	      var r, i, s, o;v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (kt.innerHTML = e.outerHTML, kt.removeChild(o = kt.firstChild));if ((!v.support.noCloneEvent || !v.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !v.isXMLDoc(e)) {
	        Ot(e, o), r = Mt(e), i = Mt(o);for (s = 0; r[s]; ++s) {
	          i[s] && Ot(r[s], i[s]);
	        }
	      }if (t) {
	        At(e, o);if (n) {
	          r = Mt(e), i = Mt(o);for (s = 0; r[s]; ++s) {
	            At(r[s], i[s]);
	          }
	        }
	      }return r = i = null, o;
	    }, clean: function clean(e, t, n, r) {
	      var s,
	          o,
	          u,
	          a,
	          f,
	          l,
	          c,
	          h,
	          p,
	          d,
	          m,
	          g,
	          y = t === i && Ct,
	          b = [];if (!t || typeof t.createDocumentFragment == "undefined") t = i;for (s = 0; (u = e[s]) != null; s++) {
	        typeof u == "number" && (u += "");if (!u) continue;if (typeof u == "string") if (!gt.test(u)) u = t.createTextNode(u);else {
	          y = y || lt(t), c = t.createElement("div"), y.appendChild(c), u = u.replace(dt, "<$1></$2>"), a = (vt.exec(u) || ["", ""])[1].toLowerCase(), f = Nt[a] || Nt._default, l = f[0], c.innerHTML = f[1] + u + f[2];while (l--) {
	            c = c.lastChild;
	          }if (!v.support.tbody) {
	            h = mt.test(u), p = a === "table" && !h ? c.firstChild && c.firstChild.childNodes : f[1] === "<table>" && !h ? c.childNodes : [];for (o = p.length - 1; o >= 0; --o) {
	              v.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o]);
	            }
	          }!v.support.leadingWhitespace && pt.test(u) && c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild), u = c.childNodes, c.parentNode.removeChild(c);
	        }u.nodeType ? b.push(u) : v.merge(b, u);
	      }c && (u = c = y = null);if (!v.support.appendChecked) for (s = 0; (u = b[s]) != null; s++) {
	        v.nodeName(u, "input") ? _t(u) : typeof u.getElementsByTagName != "undefined" && v.grep(u.getElementsByTagName("input"), _t);
	      }if (n) {
	        m = function m(e) {
	          if (!e.type || xt.test(e.type)) return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e);
	        };for (s = 0; (u = b[s]) != null; s++) {
	          if (!v.nodeName(u, "script") || !m(u)) n.appendChild(u), typeof u.getElementsByTagName != "undefined" && (g = v.grep(v.merge([], u.getElementsByTagName("script")), m), b.splice.apply(b, [s + 1, 0].concat(g)), s += g.length);
	        }
	      }return b;
	    }, cleanData: function cleanData(e, t) {
	      var n,
	          r,
	          i,
	          s,
	          o = 0,
	          u = v.expando,
	          a = v.cache,
	          f = v.support.deleteExpando,
	          l = v.event.special;for (; (i = e[o]) != null; o++) {
	        if (t || v.acceptData(i)) {
	          r = i[u], n = r && a[r];if (n) {
	            if (n.events) for (s in n.events) {
	              l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle);
	            }a[r] && (delete a[r], f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, v.deletedIds.push(r));
	          }
	        }
	      }
	    } }), function () {
	    var e, t;v.uaMatch = function (e) {
	      e = e.toLowerCase();var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];return { browser: t[1] || "", version: t[2] || "0" };
	    }, e = v.uaMatch(o.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), v.browser = t, v.sub = function () {
	      function e(t, n) {
	        return new e.fn.init(t, n);
	      }v.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function (r, i) {
	        return i && i instanceof v && !(i instanceof e) && (i = e(i)), v.fn.init.call(this, r, i, t);
	      }, e.fn.init.prototype = e.fn;var t = e(i);return e;
	    };
	  }();var Dt,
	      Pt,
	      Ht,
	      Bt = /alpha\([^)]*\)/i,
	      jt = /opacity=([^)]*)/,
	      Ft = /^(top|right|bottom|left)$/,
	      It = /^(none|table(?!-c[ea]).+)/,
	      qt = /^margin/,
	      Rt = new RegExp("^(" + m + ")(.*)$", "i"),
	      Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"),
	      zt = new RegExp("^([-+])=(" + m + ")", "i"),
	      Wt = { BODY: "block" },
	      Xt = { position: "absolute", visibility: "hidden", display: "block" },
	      Vt = { letterSpacing: 0, fontWeight: 400 },
	      $t = ["Top", "Right", "Bottom", "Left"],
	      Jt = ["Webkit", "O", "Moz", "ms"],
	      Kt = v.fn.toggle;v.fn.extend({ css: function css(e, n) {
	      return v.access(this, function (e, n, r) {
	        return r !== t ? v.style(e, n, r) : v.css(e, n);
	      }, e, n, arguments.length > 1);
	    }, show: function show() {
	      return Yt(this, !0);
	    }, hide: function hide() {
	      return Yt(this);
	    }, toggle: function toggle(e, t) {
	      var n = typeof e == "boolean";return v.isFunction(e) && v.isFunction(t) ? Kt.apply(this, arguments) : this.each(function () {
	        (n ? e : Gt(this)) ? v(this).show() : v(this).hide();
	      });
	    } }), v.extend({ cssHooks: { opacity: { get: function get(e, t) {
	          if (t) {
	            var n = Dt(e, "opacity");return n === "" ? "1" : n;
	          }
	        } } }, cssNumber: { fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": v.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function style(e, n, r, i) {
	      if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;var s,
	          o,
	          u,
	          a = v.camelCase(n),
	          f = e.style;n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a)), u = v.cssHooks[n] || v.cssHooks[a];if (r === t) return u && "get" in u && (s = u.get(e, !1, i)) !== t ? s : f[n];o = typeof r === "undefined" ? "undefined" : _typeof(r), o === "string" && (s = zt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n)), o = "number");if (r == null || o === "number" && isNaN(r)) return;o === "number" && !v.cssNumber[a] && (r += "px");if (!u || !("set" in u) || (r = u.set(e, r, i)) !== t) try {
	        f[n] = r;
	      } catch (l) {}
	    }, css: function css(e, n, r, i) {
	      var s,
	          o,
	          u,
	          a = v.camelCase(n);return n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a)), u = v.cssHooks[n] || v.cssHooks[a], u && "get" in u && (s = u.get(e, !0, i)), s === t && (s = Dt(e, n)), s === "normal" && n in Vt && (s = Vt[n]), r || i !== t ? (o = parseFloat(s), r || v.isNumeric(o) ? o || 0 : s) : s;
	    }, swap: function swap(e, t, n) {
	      var r,
	          i,
	          s = {};for (i in t) {
	        s[i] = e.style[i], e.style[i] = t[i];
	      }r = n.call(e);for (i in t) {
	        e.style[i] = s[i];
	      }return r;
	    } }), e.getComputedStyle ? Dt = function Dt(t, n) {
	    var r,
	        i,
	        s,
	        o,
	        u = e.getComputedStyle(t, null),
	        a = t.style;return u && (r = u.getPropertyValue(n) || u[n], r === "" && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)), Ut.test(r) && qt.test(n) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = u.width, a.width = i, a.minWidth = s, a.maxWidth = o)), r;
	  } : i.documentElement.currentStyle && (Dt = function Dt(e, t) {
	    var n,
	        r,
	        i = e.currentStyle && e.currentStyle[t],
	        s = e.style;return i == null && s && s[t] && (i = s[t]), Ut.test(i) && !Ft.test(t) && (n = s.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), s.left = t === "fontSize" ? "1em" : i, i = s.pixelLeft + "px", s.left = n, r && (e.runtimeStyle.left = r)), i === "" ? "auto" : i;
	  }), v.each(["height", "width"], function (e, t) {
	    v.cssHooks[t] = { get: function get(e, n, r) {
	        if (n) return e.offsetWidth === 0 && It.test(Dt(e, "display")) ? v.swap(e, Xt, function () {
	          return tn(e, t, r);
	        }) : tn(e, t, r);
	      }, set: function set(e, n, r) {
	        return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && v.css(e, "boxSizing") === "border-box") : 0);
	      } };
	  }), v.support.opacity || (v.cssHooks.opacity = { get: function get(e, t) {
	      return jt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
	    }, set: function set(e, t) {
	      var n = e.style,
	          r = e.currentStyle,
	          i = v.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
	          s = r && r.filter || n.filter || "";n.zoom = 1;if (t >= 1 && v.trim(s.replace(Bt, "")) === "" && n.removeAttribute) {
	        n.removeAttribute("filter");if (r && !r.filter) return;
	      }n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i;
	    } }), v(function () {
	    v.support.reliableMarginRight || (v.cssHooks.marginRight = { get: function get(e, t) {
	        return v.swap(e, { display: "inline-block" }, function () {
	          if (t) return Dt(e, "marginRight");
	        });
	      } }), !v.support.pixelPosition && v.fn.position && v.each(["top", "left"], function (e, t) {
	      v.cssHooks[t] = { get: function get(e, n) {
	          if (n) {
	            var r = Dt(e, t);return Ut.test(r) ? v(e).position()[t] + "px" : r;
	          }
	        } };
	    });
	  }), v.expr && v.expr.filters && (v.expr.filters.hidden = function (e) {
	    return e.offsetWidth === 0 && e.offsetHeight === 0 || !v.support.reliableHiddenOffsets && (e.style && e.style.display || Dt(e, "display")) === "none";
	  }, v.expr.filters.visible = function (e) {
	    return !v.expr.filters.hidden(e);
	  }), v.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
	    v.cssHooks[e + t] = { expand: function expand(n) {
	        var r,
	            i = typeof n == "string" ? n.split(" ") : [n],
	            s = {};for (r = 0; r < 4; r++) {
	          s[e + $t[r] + t] = i[r] || i[r - 2] || i[0];
	        }return s;
	      } }, qt.test(e) || (v.cssHooks[e + t].set = Zt);
	  });var rn = /%20/g,
	      sn = /\[\]$/,
	      on = /\r?\n/g,
	      un = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	      an = /^(?:select|textarea)/i;v.fn.extend({ serialize: function serialize() {
	      return v.param(this.serializeArray());
	    }, serializeArray: function serializeArray() {
	      return this.map(function () {
	        return this.elements ? v.makeArray(this.elements) : this;
	      }).filter(function () {
	        return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type));
	      }).map(function (e, t) {
	        var n = v(this).val();return n == null ? null : v.isArray(n) ? v.map(n, function (e, n) {
	          return { name: t.name, value: e.replace(on, "\r\n") };
	        }) : { name: t.name, value: n.replace(on, "\r\n") };
	      }).get();
	    } }), v.param = function (e, n) {
	    var r,
	        i = [],
	        s = function s(e, t) {
	      t = v.isFunction(t) ? t() : t == null ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
	    };n === t && (n = v.ajaxSettings && v.ajaxSettings.traditional);if (v.isArray(e) || e.jquery && !v.isPlainObject(e)) v.each(e, function () {
	      s(this.name, this.value);
	    });else for (r in e) {
	      fn(r, e[r], n, s);
	    }return i.join("&").replace(rn, "+");
	  };var ln,
	      cn,
	      hn = /#.*$/,
	      pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
	      dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	      vn = /^(?:GET|HEAD)$/,
	      mn = /^\/\//,
	      gn = /\?/,
	      yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	      bn = /([?&])_=[^&]*/,
	      wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
	      En = v.fn.load,
	      Sn = {},
	      xn = {},
	      Tn = ["*/"] + ["*"];try {
	    cn = s.href;
	  } catch (Nn) {
	    cn = i.createElement("a"), cn.href = "", cn = cn.href;
	  }ln = wn.exec(cn.toLowerCase()) || [], v.fn.load = function (e, n, r) {
	    if (typeof e != "string" && En) return En.apply(this, arguments);if (!this.length) return this;var i,
	        s,
	        o,
	        u = this,
	        a = e.indexOf(" ");return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)), v.isFunction(n) ? (r = n, n = t) : n && (typeof n === "undefined" ? "undefined" : _typeof(n)) == "object" && (s = "POST"), v.ajax({ url: e, type: s, dataType: "html", data: n, complete: function complete(e, t) {
	        r && u.each(r, o || [e.responseText, t, e]);
	      } }).done(function (e) {
	      o = arguments, u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e);
	    }), this;
	  }, v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
	    v.fn[t] = function (e) {
	      return this.on(t, e);
	    };
	  }), v.each(["get", "post"], function (e, n) {
	    v[n] = function (e, r, i, s) {
	      return v.isFunction(r) && (s = s || i, i = r, r = t), v.ajax({ type: n, url: e, data: r, success: i, dataType: s });
	    };
	  }), v.extend({ getScript: function getScript(e, n) {
	      return v.get(e, t, n, "script");
	    }, getJSON: function getJSON(e, t, n) {
	      return v.get(e, t, n, "json");
	    }, ajaxSetup: function ajaxSetup(e, t) {
	      return t ? Ln(e, v.ajaxSettings) : (t = e, e = v.ajaxSettings), Ln(e, t), e;
	    }, ajaxSettings: { url: cn, isLocal: dn.test(ln[1]), global: !0, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", processData: !0, async: !0, accepts: { xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": Tn }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText" }, converters: { "* text": e.String, "text html": !0, "text json": v.parseJSON, "text xml": v.parseXML }, flatOptions: { context: !0, url: !0 } }, ajaxPrefilter: Cn(Sn), ajaxTransport: Cn(xn), ajax: function ajax(e, n) {
	      function T(e, n, s, a) {
	        var l,
	            y,
	            b,
	            w,
	            S,
	            T = n;if (E === 2) return;E = 2, u && clearTimeout(u), o = t, i = a || "", x.readyState = e > 0 ? 4 : 0, s && (w = An(c, x, s));if (e >= 200 && e < 300 || e === 304) c.ifModified && (S = x.getResponseHeader("Last-Modified"), S && (v.lastModified[r] = S), S = x.getResponseHeader("Etag"), S && (v.etag[r] = S)), e === 304 ? (T = "notmodified", l = !0) : (l = On(c, w), T = l.state, y = l.data, b = l.error, l = !b);else {
	          b = T;if (!T || e) T = "error", e < 0 && (e = 0);
	        }x.status = e, x.statusText = (n || T) + "", l ? d.resolveWith(h, [y, T, x]) : d.rejectWith(h, [x, T, b]), x.statusCode(g), g = t, f && p.trigger("ajax" + (l ? "Success" : "Error"), [x, c, l ? y : b]), m.fireWith(h, [x, T]), f && (p.trigger("ajaxComplete", [x, c]), --v.active || v.event.trigger("ajaxStop"));
	      }(typeof e === "undefined" ? "undefined" : _typeof(e)) == "object" && (n = e, e = t), n = n || {};var r,
	          i,
	          s,
	          o,
	          u,
	          a,
	          f,
	          l,
	          c = v.ajaxSetup({}, n),
	          h = c.context || c,
	          p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event,
	          d = v.Deferred(),
	          m = v.Callbacks("once memory"),
	          g = c.statusCode || {},
	          b = {},
	          w = {},
	          E = 0,
	          S = "canceled",
	          x = { readyState: 0, setRequestHeader: function setRequestHeader(e, t) {
	          if (!E) {
	            var n = e.toLowerCase();e = w[n] = w[n] || e, b[e] = t;
	          }return this;
	        }, getAllResponseHeaders: function getAllResponseHeaders() {
	          return E === 2 ? i : null;
	        }, getResponseHeader: function getResponseHeader(e) {
	          var n;if (E === 2) {
	            if (!s) {
	              s = {};while (n = pn.exec(i)) {
	                s[n[1].toLowerCase()] = n[2];
	              }
	            }n = s[e.toLowerCase()];
	          }return n === t ? null : n;
	        }, overrideMimeType: function overrideMimeType(e) {
	          return E || (c.mimeType = e), this;
	        }, abort: function abort(e) {
	          return e = e || S, o && o.abort(e), T(0, e), this;
	        } };d.promise(x), x.success = x.done, x.error = x.fail, x.complete = m.add, x.statusCode = function (e) {
	        if (e) {
	          var t;if (E < 2) for (t in e) {
	            g[t] = [g[t], e[t]];
	          } else t = e[x.status], x.always(t);
	        }return this;
	      }, c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"), c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y), c.crossDomain == null && (a = wn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === ln[1] && a[2] === ln[2] && (a[3] || (a[1] === "http:" ? 80 : 443)) == (ln[3] || (ln[1] === "http:" ? 80 : 443)))), c.data && c.processData && typeof c.data != "string" && (c.data = v.param(c.data, c.traditional)), kn(Sn, c, n, x);if (E === 2) return x;f = c.global, c.type = c.type.toUpperCase(), c.hasContent = !vn.test(c.type), f && v.active++ === 0 && v.event.trigger("ajaxStart");if (!c.hasContent) {
	        c.data && (c.url += (gn.test(c.url) ? "&" : "?") + c.data, delete c.data), r = c.url;if (c.cache === !1) {
	          var N = v.now(),
	              C = c.url.replace(bn, "$1_=" + N);c.url = C + (C === c.url ? (gn.test(c.url) ? "&" : "?") + "_=" + N : "");
	        }
	      }(c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType), c.ifModified && (r = r || c.url, v.lastModified[r] && x.setRequestHeader("If-Modified-Since", v.lastModified[r]), v.etag[r] && x.setRequestHeader("If-None-Match", v.etag[r])), x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Tn + "; q=0.01" : "") : c.accepts["*"]);for (l in c.headers) {
	        x.setRequestHeader(l, c.headers[l]);
	      }if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && E !== 2) {
	        S = "abort";for (l in { success: 1, error: 1, complete: 1 }) {
	          x[l](c[l]);
	        }o = kn(xn, c, n, x);if (!o) T(-1, "No Transport");else {
	          x.readyState = 1, f && p.trigger("ajaxSend", [x, c]), c.async && c.timeout > 0 && (u = setTimeout(function () {
	            x.abort("timeout");
	          }, c.timeout));try {
	            E = 1, o.send(b, T);
	          } catch (k) {
	            if (!(E < 2)) throw k;T(-1, k);
	          }
	        }return x;
	      }return x.abort();
	    }, active: 0, lastModified: {}, etag: {} });var Mn = [],
	      _n = /\?/,
	      Dn = /(=)\?(?=&|$)|\?\?/,
	      Pn = v.now();v.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
	      var e = Mn.pop() || v.expando + "_" + Pn++;return this[e] = !0, e;
	    } }), v.ajaxPrefilter("json jsonp", function (n, r, i) {
	    var s,
	        o,
	        u,
	        a = n.data,
	        f = n.url,
	        l = n.jsonp !== !1,
	        c = l && Dn.test(f),
	        h = l && !c && typeof a == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(a);if (n.dataTypes[0] === "jsonp" || c || h) return s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, o = e[s], c ? n.url = f.replace(Dn, "$1" + s) : h ? n.data = a.replace(Dn, "$1" + s) : l && (n.url += (_n.test(f) ? "&" : "?") + n.jsonp + "=" + s), n.converters["script json"] = function () {
	      return u || v.error(s + " was not called"), u[0];
	    }, n.dataTypes[0] = "json", e[s] = function () {
	      u = arguments;
	    }, i.always(function () {
	      e[s] = o, n[s] && (n.jsonpCallback = r.jsonpCallback, Mn.push(s)), u && v.isFunction(o) && o(u[0]), u = o = t;
	    }), "script";
	  }), v.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /javascript|ecmascript/ }, converters: { "text script": function textScript(e) {
	        return v.globalEval(e), e;
	      } } }), v.ajaxPrefilter("script", function (e) {
	    e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1);
	  }), v.ajaxTransport("script", function (e) {
	    if (e.crossDomain) {
	      var n,
	          r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;return { send: function send(s, o) {
	          n = i.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, i) {
	            if (i || !n.readyState || /loaded|complete/.test(n.readyState)) n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, i || o(200, "success");
	          }, r.insertBefore(n, r.firstChild);
	        }, abort: function abort() {
	          n && n.onload(0, 1);
	        } };
	    }
	  });var Hn,
	      Bn = e.ActiveXObject ? function () {
	    for (var e in Hn) {
	      Hn[e](0, 1);
	    }
	  } : !1,
	      jn = 0;v.ajaxSettings.xhr = e.ActiveXObject ? function () {
	    return !this.isLocal && Fn() || In();
	  } : Fn, function (e) {
	    v.extend(v.support, { ajax: !!e, cors: !!e && "withCredentials" in e });
	  }(v.ajaxSettings.xhr()), v.support.ajax && v.ajaxTransport(function (n) {
	    if (!n.crossDomain || v.support.cors) {
	      var _r;return { send: function send(i, s) {
	          var o,
	              u,
	              a = n.xhr();n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);if (n.xhrFields) for (u in n.xhrFields) {
	            a[u] = n.xhrFields[u];
	          }n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");try {
	            for (u in i) {
	              a.setRequestHeader(u, i[u]);
	            }
	          } catch (f) {}a.send(n.hasContent && n.data || null), _r = function r(e, i) {
	            var u, f, l, c, h;try {
	              if (_r && (i || a.readyState === 4)) {
	                _r = t, o && (a.onreadystatechange = v.noop, Bn && delete Hn[o]);if (i) a.readyState !== 4 && a.abort();else {
	                  u = a.status, l = a.getAllResponseHeaders(), c = {}, h = a.responseXML, h && h.documentElement && (c.xml = h);try {
	                    c.text = a.responseText;
	                  } catch (p) {}try {
	                    f = a.statusText;
	                  } catch (p) {
	                    f = "";
	                  }!u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204);
	                }
	              }
	            } catch (d) {
	              i || s(-1, d);
	            }c && s(u, f, c, l);
	          }, n.async ? a.readyState === 4 ? setTimeout(_r, 0) : (o = ++jn, Bn && (Hn || (Hn = {}, v(e).unload(Bn)), Hn[o] = _r), a.onreadystatechange = _r) : _r();
	        }, abort: function abort() {
	          _r && _r(0, 1);
	        } };
	    }
	  });var qn,
	      Rn,
	      Un = /^(?:toggle|show|hide)$/,
	      zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"),
	      Wn = /queueHooks$/,
	      Xn = [Gn],
	      Vn = { "*": [function (e, t) {
	      var n,
	          r,
	          i = this.createTween(e, t),
	          s = zn.exec(t),
	          o = i.cur(),
	          u = +o || 0,
	          a = 1,
	          f = 20;if (s) {
	        n = +s[2], r = s[3] || (v.cssNumber[e] ? "" : "px");if (r !== "px" && u) {
	          u = v.css(i.elem, e, !0) || n || 1;do {
	            a = a || ".5", u /= a, v.style(i.elem, e, u + r);
	          } while (a !== (a = i.cur() / o) && a !== 1 && --f);
	        }i.unit = r, i.start = u, i.end = s[1] ? u + (s[1] + 1) * n : n;
	      }return i;
	    }] };v.Animation = v.extend(Kn, { tweener: function tweener(e, t) {
	      v.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");var n,
	          r = 0,
	          i = e.length;for (; r < i; r++) {
	        n = e[r], Vn[n] = Vn[n] || [], Vn[n].unshift(t);
	      }
	    }, prefilter: function prefilter(e, t) {
	      t ? Xn.unshift(e) : Xn.push(e);
	    } }), v.Tween = Yn, Yn.prototype = { constructor: Yn, init: function init(e, t, n, r, i, s) {
	      this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (v.cssNumber[n] ? "" : "px");
	    }, cur: function cur() {
	      var e = Yn.propHooks[this.prop];return e && e.get ? e.get(this) : Yn.propHooks._default.get(this);
	    }, run: function run(e) {
	      var t,
	          n = Yn.propHooks[this.prop];return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Yn.propHooks._default.set(this), this;
	    } }, Yn.prototype.init.prototype = Yn.prototype, Yn.propHooks = { _default: { get: function get(e) {
	        var t;return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = v.css(e.elem, e.prop, !1, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop];
	      }, set: function set(e) {
	        v.fx.step[e.prop] ? v.fx.step[e.prop](e) : e.elem.style && (e.elem.style[v.cssProps[e.prop]] != null || v.cssHooks[e.prop]) ? v.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
	      } } }, Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = { set: function set(e) {
	      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
	    } }, v.each(["toggle", "show", "hide"], function (e, t) {
	    var n = v.fn[t];v.fn[t] = function (r, i, s) {
	      return r == null || typeof r == "boolean" || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) : this.animate(Zn(t, !0), r, i, s);
	    };
	  }), v.fn.extend({ fadeTo: function fadeTo(e, t, n, r) {
	      return this.filter(Gt).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r);
	    }, animate: function animate(e, t, n, r) {
	      var i = v.isEmptyObject(e),
	          s = v.speed(t, n, r),
	          o = function o() {
	        var t = Kn(this, v.extend({}, e), s);i && t.stop(!0);
	      };return i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o);
	    }, stop: function stop(e, n, r) {
	      var i = function i(e) {
	        var t = e.stop;delete e.stop, t(r);
	      };return typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
	        var t = !0,
	            n = e != null && e + "queueHooks",
	            s = v.timers,
	            o = v._data(this);if (n) o[n] && o[n].stop && i(o[n]);else for (n in o) {
	          o[n] && o[n].stop && Wn.test(n) && i(o[n]);
	        }for (n = s.length; n--;) {
	          s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r), t = !1, s.splice(n, 1));
	        }(t || !r) && v.dequeue(this, e);
	      });
	    } }), v.each({ slideDown: Zn("show"), slideUp: Zn("hide"), slideToggle: Zn("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
	    v.fn[e] = function (e, n, r) {
	      return this.animate(t, e, n, r);
	    };
	  }), v.speed = function (e, t, n) {
	    var r = e && (typeof e === "undefined" ? "undefined" : _typeof(e)) == "object" ? v.extend({}, e) : { complete: n || !n && t || v.isFunction(e) && e, duration: e, easing: n && t || t && !v.isFunction(t) && t };r.duration = v.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in v.fx.speeds ? v.fx.speeds[r.duration] : v.fx.speeds._default;if (r.queue == null || r.queue === !0) r.queue = "fx";return r.old = r.complete, r.complete = function () {
	      v.isFunction(r.old) && r.old.call(this), r.queue && v.dequeue(this, r.queue);
	    }, r;
	  }, v.easing = { linear: function linear(e) {
	      return e;
	    }, swing: function swing(e) {
	      return .5 - Math.cos(e * Math.PI) / 2;
	    } }, v.timers = [], v.fx = Yn.prototype.init, v.fx.tick = function () {
	    var e,
	        n = v.timers,
	        r = 0;qn = v.now();for (; r < n.length; r++) {
	      e = n[r], !e() && n[r] === e && n.splice(r--, 1);
	    }n.length || v.fx.stop(), qn = t;
	  }, v.fx.timer = function (e) {
	    e() && v.timers.push(e) && !Rn && (Rn = setInterval(v.fx.tick, v.fx.interval));
	  }, v.fx.interval = 13, v.fx.stop = function () {
	    clearInterval(Rn), Rn = null;
	  }, v.fx.speeds = { slow: 600, fast: 200, _default: 400 }, v.fx.step = {}, v.expr && v.expr.filters && (v.expr.filters.animated = function (e) {
	    return v.grep(v.timers, function (t) {
	      return e === t.elem;
	    }).length;
	  });var er = /^(?:body|html)$/i;v.fn.offset = function (e) {
	    if (arguments.length) return e === t ? this : this.each(function (t) {
	      v.offset.setOffset(this, e, t);
	    });var n,
	        r,
	        i,
	        s,
	        o,
	        u,
	        a,
	        f = { top: 0, left: 0 },
	        l = this[0],
	        c = l && l.ownerDocument;if (!c) return;return (r = c.body) === l ? v.offset.bodyOffset(l) : (n = c.documentElement, v.contains(n, l) ? (typeof l.getBoundingClientRect != "undefined" && (f = l.getBoundingClientRect()), i = tr(c), s = n.clientTop || r.clientTop || 0, o = n.clientLeft || r.clientLeft || 0, u = i.pageYOffset || n.scrollTop, a = i.pageXOffset || n.scrollLeft, { top: f.top + u - s, left: f.left + a - o }) : f);
	  }, v.offset = { bodyOffset: function bodyOffset(e) {
	      var t = e.offsetTop,
	          n = e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.css(e, "marginTop")) || 0, n += parseFloat(v.css(e, "marginLeft")) || 0), { top: t, left: n };
	    }, setOffset: function setOffset(e, t, n) {
	      var r = v.css(e, "position");r === "static" && (e.style.position = "relative");var i = v(e),
	          s = i.offset(),
	          o = v.css(e, "top"),
	          u = v.css(e, "left"),
	          a = (r === "absolute" || r === "fixed") && v.inArray("auto", [o, u]) > -1,
	          f = {},
	          l = {},
	          c,
	          h;a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0), v.isFunction(t) && (t = t.call(e, n, s)), t.top != null && (f.top = t.top - s.top + c), t.left != null && (f.left = t.left - s.left + h), "using" in t ? t.using.call(e, f) : i.css(f);
	    } }, v.fn.extend({ position: function position() {
	      if (!this[0]) return;var e = this[0],
	          t = this.offsetParent(),
	          n = this.offset(),
	          r = er.test(t[0].nodeName) ? { top: 0, left: 0 } : t.offset();return n.top -= parseFloat(v.css(e, "marginTop")) || 0, n.left -= parseFloat(v.css(e, "marginLeft")) || 0, r.top += parseFloat(v.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0, { top: n.top - r.top, left: n.left - r.left };
	    }, offsetParent: function offsetParent() {
	      return this.map(function () {
	        var e = this.offsetParent || i.body;while (e && !er.test(e.nodeName) && v.css(e, "position") === "static") {
	          e = e.offsetParent;
	        }return e || i.body;
	      });
	    } }), v.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, n) {
	    var r = /Y/.test(n);v.fn[e] = function (i) {
	      return v.access(this, function (e, i, s) {
	        var o = tr(e);if (s === t) return o ? n in o ? o[n] : o.document.documentElement[i] : e[i];o ? o.scrollTo(r ? v(o).scrollLeft() : s, r ? s : v(o).scrollTop()) : e[i] = s;
	      }, e, i, arguments.length, null);
	    };
	  }), v.each({ Height: "height", Width: "width" }, function (e, n) {
	    v.each({ padding: "inner" + e, content: n, "": "outer" + e }, function (r, i) {
	      v.fn[i] = function (i, s) {
	        var o = arguments.length && (r || typeof i != "boolean"),
	            u = r || (i === !0 || s === !0 ? "margin" : "border");return v.access(this, function (n, r, i) {
	          var s;return v.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement, Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? v.css(n, r, i, u) : v.style(n, r, i, u);
	        }, n, o ? i : t, o, null);
	      };
	    });
	  }), e.jQuery = e.$ = v, "function" == "function" && __webpack_require__(3) && __webpack_require__(3).jQuery && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return v;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(window);

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * wfui.js
	 * A modified version of atlassian.js from the Atlassian AUI package. For use
	 * with the OICR WFUI package.
	 */

	/*! Atlassian UI and the Atlassian Design Guidelines are created by Atlassian. See https://developer.atlassian.com/display/AUI/ for API documentation and https://developer.atlassian.com/design/ for license details. */

	/**
	 * A collection of Atlassian JavaScript UI components.
	 *
	 * AUI components/functions should be assumed Private unless included in the API documentation at http://developer.atlassian.com/display/AUI
	 *
	 * @module WFUIJS
	 * @requires jQuery
	 */
	(function () {

	    'use strict';

	    if (typeof jQuery === 'undefined') {
	        throw new Error('jQuery is required for WFUIJS to function.');
	    }

	    if (typeof window.console === 'undefined') {
	        window.console = {
	            messages: [],

	            log: function log(text) {
	                this.messages.push(text);
	            },

	            show: function show() {
	                alert(this.messages.join('\n'));
	                this.messages = [];
	            }
	        };
	    } else {
	        // Firebug console - show not required to do anything.
	        console.show = function () {};
	    }

	    /**
	     * WFUIJS contains utility methods, used by various components. It also provides the namespacing for all AUI components.
	     *
	     * @class WFUIJS
	     * @requires jQuery
	     */
	    window.WFUIJS = function () {
	        var included = [];
	        var uniqueID;
	        var uniqueIDstring;
	        var uniqueIDcounter = 0;

	        function escapeHtmlReplacement(str) {
	            var special = {
	                '<': '&lt;',
	                '>': '&gt;',
	                '&': '&amp;',
	                '\'': '&#39;',
	                '`': '&#96;'
	            };

	            if (typeof special[str] === 'string') {
	                return special[str];
	            }

	            return '&quot;';
	        }

	        var ESCAPE_HTML_SPECIAL_CHARS = /[&"'<>`]/g;
	        var res = {
	            /**
	             * Returns an HTMLElement reference.
	             * @method $
	             * @param {String | HTMLElement |Array} el Accepts a string to use as an ID for getting a DOM reference, an actual DOM reference, or an Array of IDs and/or HTMLElements.
	             * @return {HTMLElement | Array} A DOM reference to an HTML element or an array of HTMLElements.
	             */
	            $: jQuery,

	            /**
	             * Logs the given object to the console.
	             * @param obj object to log
	             */
	            log: function log() {
	                if (typeof console !== 'undefined' && console.log) {
	                    Function.prototype.apply.apply(console.log, [console, arguments]);
	                }
	            },

	            /**
	             * Logs the given object to the console as a warning.
	             * @param obj object to log
	             */
	            warn: function warn() {
	                if (typeof console !== 'undefined' && console.warn) {
	                    Function.prototype.apply.apply(console.warn, [console, arguments]);
	                }
	            },

	            /**
	             * Logs the given object to the console as an error.
	             * @param obj object to log
	             */
	            error: function error() {
	                if (typeof console !== 'undefined' && console.error) {
	                    Function.prototype.apply.apply(console.error, [console, arguments]);
	                }
	            },

	            /**
	             * Calls e.preventDefault. This is designed for event handlers that only need to prevent the default browser
	             * action, eg:
	             * WFUIJS.$(".my-class").click(WFUIJS.preventDefault)
	             * @param e jQuery event
	             */
	            preventDefault: function preventDefault(e) {
	                e.preventDefault();
	            },

	            /**
	             * Prevent further handling of an event. Returns false, which you should use as the return value of your event handler:
	             * return WFUIJS.stopEvent(e);
	             * @param e jQuery event
	             * @deprecated use WFUIJS.preventDefault() instead
	             */
	            stopEvent: function stopEvent(e) {
	                e.stopPropagation();
	                return false; // required for JWebUnit pop-up links to work properly
	            },

	            include: function include(url) {
	                if (!this.contains(included, url)) {
	                    included.push(url);
	                    var s = document.createElement('script');
	                    s.src = url;
	                    this.$('body').append(s);
	                }
	            },

	            /**
	             * Shortcut function to toggle class name of an element.
	             * @method toggleClassName
	             * @param {String | HTMLElement} element The HTMLElement or an ID to toggle class name on.
	             * @param {String} className The class name to remove or add.
	             */
	            toggleClassName: function toggleClassName(element, className) {
	                if (!(element = this.$(element))) {
	                    return;
	                }

	                element.toggleClass(className);
	            },

	            /**
	             * Shortcut function adds or removes 'hidden' classname to an element based on a passed boolean.
	             * @method setVisible
	             * @param {String | HTMLElement} element The HTMLElement or an ID to show or hide.
	             * @param {boolean} show true to show, false to hide
	             */
	            setVisible: function setVisible(element, show) {
	                if (!(element = this.$(element))) {
	                    return;
	                }
	                // aliased for use inside function below
	                var $ = this.$;

	                $(element).each(function () {
	                    var isHidden = $(this).hasClass('hidden');

	                    if (isHidden && show) {
	                        $(this).removeClass('hidden');
	                    } else if (!isHidden && !show) {
	                        $(this).addClass('hidden');
	                    }
	                });
	            },

	            /**
	             * Shortcut function adds or removes 'current' classname to an element based on a passed boolean.
	             * @param {String | HTMLElement} element The HTMLElement or an ID to show or hide.
	             * @param {boolean} show true to add 'current' class, false to remove
	             */
	            setCurrent: function setCurrent(element, current) {
	                if (!(element = this.$(element))) {
	                    return;
	                }

	                if (current) {
	                    element.addClass('current');
	                } else {
	                    element.removeClass('current');
	                }
	            },

	            /**
	             * Shortcut function to see if passed element is currently visible on screen.
	             * @method isVisible
	             * @param {String | HTMLElement} element The HTMLElement or an jQuery selector to check.
	             */
	            isVisible: function isVisible(element) {
	                return !this.$(element).hasClass('hidden');
	            },

	            /**
	             * Shortcut function to see if passed element is truncated/clipped, eg. with text-overflow: ellipsis
	             * @method isClipped
	             * @param {String | HTMLElement} element The HTMLElement or an jQuery selector to check.
	             */
	            isClipped: function isClipped(el) {
	                el = WFUIJS.$(el);
	                return el.prop('scrollWidth') > el.prop('clientWidth');
	            },

	            /**
	             * Adds functions to the list of methods to be run on initialisation. Wraps
	             * error handling around the provided function so its failure won't prevent
	             * other init functions running.
	             * @method toInit
	             * @param {Function} func Function to be call on initialisation.
	             * @return WFUIJS object.
	             */
	            toInit: function toInit(func) {
	                var ajs = this;

	                this.$(function () {
	                    try {
	                        func.apply(this, arguments);
	                    } catch (ex) {
	                        ajs.log('Failed to run init function: ' + ex + '\n' + func.toString());
	                    }
	                });

	                return this;
	            },

	            /**
	             * Finds the index of an element in the array.
	             * @method indexOf
	             * @param item Array element which will be searched.
	             * @param fromIndex (optional) the index from which the item will be searched. Negative values will search from the
	             * end of the array.
	             * @return a zero based index of the element.
	             */
	            indexOf: function indexOf(array, item, fromIndex) {
	                var length = array.length;

	                if (fromIndex === null) {
	                    fromIndex = 0;
	                } else if (fromIndex < 0) {
	                    fromIndex = Math.max(0, length + fromIndex);
	                }

	                for (var i = fromIndex; i < length; i++) {
	                    if (array[i] === item) {
	                        return i;
	                    }
	                }

	                return -1;
	            },

	            /**
	             * Looks for an element inside the array.
	             * @method contains
	             * @param item Array element which will be searched.
	             * @return {Boolean} Is element in array.
	             */
	            contains: function contains(array, item) {
	                return this.indexOf(array, item) > -1;
	            },

	            /**
	             * Clones the element specified by the selector and removes the id attribute
	             * @param selector a jQuery selector
	             */
	            clone: function clone(selector) {
	                return WFUIJS.$(selector).clone().removeAttr('id');
	            },

	            /**
	             * Similar to Javascript's in-built escape() function, but where the built-in escape()
	             * might encode unicode charaters as %uHHHH, this function will leave them as-is.
	             *
	             * NOTE: this function does not do html-escaping, see WFUIJS.escapeHtml()
	             */
	            escape: function (_escape) {
	                function escape(_x) {
	                    return _escape.apply(this, arguments);
	                }

	                escape.toString = function () {
	                    return _escape.toString();
	                };

	                return escape;
	            }(function (string) {
	                return escape(string).replace(/%u\w{4}/gi, function (w) {
	                    return unescape(w);
	                });
	            }),

	            /**
	             * Sanitise a string for use with innerHTML or as an attribute.
	             *
	             * @param {String} str
	             */
	            escapeHtml: function escapeHtml(str) {
	                return str.replace(ESCAPE_HTML_SPECIAL_CHARS, escapeHtmlReplacement);
	            },

	            /**
	             * Generate a unique ID string, checking the ID is not present in the DOM before returning.
	             * Note uniqueID, uniqueIDstring, uniqueIDcounter = 0; set at top of file.
	             * @param {string} prefix Optional. String to prepend to ID instead of default AUI prefix.
	             */
	            id: function id(prefix) {
	                uniqueID = uniqueIDcounter++ + '';
	                uniqueIDstring = prefix ? prefix + uniqueID : 'wfui-uid-' + uniqueID;

	                if (!document.getElementById(uniqueIDstring)) {
	                    return uniqueIDstring;
	                } else {
	                    uniqueIDstring = uniqueIDstring + '-' + new Date().getTime();

	                    if (!document.getElementById(uniqueIDstring)) {
	                        return uniqueIDstring;
	                    } else {
	                        // if we still have a clash, something is deeply weird and needs attention.
	                        throw new Error('ERROR: timestamped fallback ID ' + uniqueIDstring + ' exists. WFUIJS.id stopped.');
	                    }
	                }
	            },

	            /**
	             * Apply a unique ID to the element. Preserves ID if the element already has one.
	             * @private
	             * @param {HTMLElement} el Selector to find target element.
	             * @param {string} prefix Optional. String to prepend to ID instead of default AUI prefix.
	             */
	            _addID: function _addID(el, prefix) {
	                var element = WFUIJS.$(el);
	                var addprefix = prefix || false;

	                element.each(function () {
	                    var $el = WFUIJS.$(this);

	                    if (!$el.attr('id')) {
	                        $el.attr('id', WFUIJS.id(addprefix));
	                    }
	                });
	            },

	            /**
	             * Enables or disables any matching elements.
	             */
	            enable: function enable(el, b) {
	                var $el = WFUIJS.$(el);

	                if (typeof b === 'undefined') {
	                    b = true;
	                }

	                return $el.each(function () {
	                    this.disabled = !b;
	                });
	            },

	            // Adapted from:
	            // Simple JavaScript Templating
	            // John Resig - http://ejohn.org/ - MIT Licensed
	            tmpl: function tmpl(namespace, tpl, data) {
	                if (!WFUIJS.tplCache[namespace]) WFUIJS.tplCache[namespace] = {};
	                // Figure out if we're getting a template, or if we need to
	                // load the template - and be sure to cache the result.
	                var fn = !/\W/.test(tpl) ? WFUIJS.tplCache[namespace][tpl] = WFUIJS.tplCache[namespace][tpl] || WFUIJS.tmpl(namespace, WFUIJS.templates[namespace][tpl]) :

	                // Generate a reusable function that will serve as a template
	                // generator (and which will be cached).
	                new Function("data", "with(data){var p=[];" + "p.push('" + tpl.replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "',(typeof $1 != 'undefined') ? $1 : '','").split("<%").join("');").split("%>").join("p.push('") + "');return p.join('');}");

	                // Provide some basic currying to the user
	                return data ? fn(data) : fn;
	            },

	            // Process a special WFUIJS template object (or a regular string)
	            tplData: function tplData(data) {
	                if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') return data;

	                return WFUIJS.tmpl(data.namespace, data.template, data.data);
	            },

	            camelCase: function camelCase(input) {
	                return input.toLowerCase().replace(/_(.)/g, function (match, group1) {
	                    return group1.toUpperCase();
	                });
	            },

	            tplCache: {},

	            // A set of initialization functions for WFUI components that will be 
	            // called upon page ready
	            inits: [],

	            // A set of client-side templates
	            templates: {},

	            // The set of WFUI components (widgets, etc.) on the current page
	            components: [],

	            // WFUI Backbone utils and components
	            BB: {}
	        };

	        if (typeof WFUIJS !== 'undefined') {
	            for (var i in WFUIJS) {
	                res[i] = WFUIJS[i];
	            }
	        }

	        /**
	         * Creates DOM object
	         * @method WFUIJS
	         * @param {String} element tag name
	         * @return {jQuery object}
	         * @usage var a = WFUIJS("div");
	         */
	        var result = function result() {
	            var res = null;

	            if (arguments.length && typeof arguments[0] === 'string') {
	                res = WFUIJS.$(document.createElement(arguments[0]));

	                if (arguments.length === 2) {
	                    res.html(arguments[1]);
	                }
	            }

	            return res;
	        };

	        for (var j in res) {
	            result[j] = res[j];
	        }

	        return result;
	    }();

	    WFUIJS.$(function () {
	        // Create the bridge between WFUI in Drupal and WFUI in JS:
	        // Merge the Drupal wfui object with WFUIJS
	        var Drupal = Drupal || { settings: {} };
	        WFUIJS.$.extend(WFUIJS, Drupal.settings.wfui);

	        WFUIJS.$(function () {
	            WFUIJS.$.each(WFUIJS.inits, function () {
	                this.call();
	            });
	        });
	    });
	})();

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	// Allow WFUI to use a newer version of jQuery alongside the older version used
	// by Drupal

	// For this to work, the script loading order must be as follows, with nothing
	// loaded in between the scripts, otherwise there could be jQuery problems:
	// 1. jquery-1.8.3.js
	// 2. wfui.js
	// 3. wfui-jquery-noconflict.js
	// 
	$.noConflict(true);

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	/*! jQuery UI - v1.11.4+CommonJS - 2015-08-28
	* http://jqueryui.com
	* Includes: widget.js
	* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */

	(function (factory) {
		// if ( typeof define === "function" && define.amd ) {

		// 	// AMD. Register as an anonymous module.
		// 	define([ "jquery" ], factory );

		// } else if ( typeof exports === "object" ) {

		// 	// Node/CommonJS
		// 	factory( require( "jquery" ) );

		// } else {

		// 	// Browser globals
		// 	factory( jQuery );
		// }
		factory(WFUIJS.$);
	})(function ($) {
		/*!
	  * jQuery UI Widget 1.11.4
	  * http://jqueryui.com
	  *
	  * Copyright jQuery Foundation and other contributors
	  * Released under the MIT license.
	  * http://jquery.org/license
	  *
	  * http://api.jqueryui.com/jQuery.widget/
	  */

		var widget_uuid = 0,
		    widget_slice = Array.prototype.slice;

		$.cleanData = function (orig) {
			return function (elems) {
				var events, elem, i;
				for (i = 0; (elem = elems[i]) != null; i++) {
					try {

						// Only trigger remove when necessary to save time
						events = $._data(elem, "events");
						if (events && events.remove) {
							$(elem).triggerHandler("remove");
						}

						// http://bugs.jquery.com/ticket/8235
					} catch (e) {}
				}
				orig(elems);
			};
		}($.cleanData);

		$.widget = function (name, base, prototype) {
			var fullName,
			    existingConstructor,
			    constructor,
			    basePrototype,

			// proxiedPrototype allows the provided prototype to remain unmodified
			// so that it can be used as a mixin for multiple widgets (#8876)
			proxiedPrototype = {},
			    namespace = name.split(".")[0];

			name = name.split(".")[1];
			fullName = namespace + "-" + name;

			if (!prototype) {
				prototype = base;
				base = $.Widget;
			}

			// create selector for plugin
			$.expr[":"][fullName.toLowerCase()] = function (elem) {
				return !!$.data(elem, fullName);
			};

			$[namespace] = $[namespace] || {};
			existingConstructor = $[namespace][name];
			constructor = $[namespace][name] = function (options, element) {
				// allow instantiation without "new" keyword
				if (!this._createWidget) {
					return new constructor(options, element);
				}

				// allow instantiation without initializing for simple inheritance
				// must use "new" keyword (the code above always passes args)
				if (arguments.length) {
					this._createWidget(options, element);
				}
			};
			// extend with the existing constructor to carry over any static properties
			$.extend(constructor, existingConstructor, {
				version: prototype.version,
				// copy the object used to create the prototype in case we need to
				// redefine the widget later
				_proto: $.extend({}, prototype),
				// track widgets that inherit from this widget in case this widget is
				// redefined after a widget inherits from it
				_childConstructors: []
			});

			basePrototype = new base();
			// we need to make the options hash a property directly on the new instance
			// otherwise we'll modify the options hash on the prototype that we're
			// inheriting from
			basePrototype.options = $.widget.extend({}, basePrototype.options);
			$.each(prototype, function (prop, value) {
				if (!$.isFunction(value)) {
					proxiedPrototype[prop] = value;
					return;
				}
				proxiedPrototype[prop] = function () {
					var _super = function _super() {
						return base.prototype[prop].apply(this, arguments);
					},
					    _superApply = function _superApply(args) {
						return base.prototype[prop].apply(this, args);
					};
					return function () {
						var __super = this._super,
						    __superApply = this._superApply,
						    returnValue;

						this._super = _super;
						this._superApply = _superApply;

						returnValue = value.apply(this, arguments);

						this._super = __super;
						this._superApply = __superApply;

						return returnValue;
					};
				}();
			});
			constructor.prototype = $.widget.extend(basePrototype, {
				// TODO: remove support for widgetEventPrefix
				// always use the name + a colon as the prefix, e.g., draggable:start
				// don't prefix for widgets that aren't DOM-based
				widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
			}, proxiedPrototype, {
				constructor: constructor,
				namespace: namespace,
				widgetName: name,
				widgetFullName: fullName
			});

			// If this widget is being redefined then we need to find all widgets that
			// are inheriting from it and redefine all of them so that they inherit from
			// the new version of this widget. We're essentially trying to replace one
			// level in the prototype chain.
			if (existingConstructor) {
				$.each(existingConstructor._childConstructors, function (i, child) {
					var childPrototype = child.prototype;

					// redefine the child widget using the same prototype that was
					// originally used, but inherit from the new version of the base
					$.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
				});
				// remove the list of existing child constructors from the old constructor
				// so the old child constructors can be garbage collected
				delete existingConstructor._childConstructors;
			} else {
				base._childConstructors.push(constructor);
			}

			$.widget.bridge(name, constructor);

			return constructor;
		};

		$.widget.extend = function (target) {
			var input = widget_slice.call(arguments, 1),
			    inputIndex = 0,
			    inputLength = input.length,
			    key,
			    value;
			for (; inputIndex < inputLength; inputIndex++) {
				for (key in input[inputIndex]) {
					value = input[inputIndex][key];
					if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
						// Clone objects
						if ($.isPlainObject(value)) {
							target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) :
							// Don't extend strings, arrays, etc. with objects
							$.widget.extend({}, value);
							// Copy everything else by reference
						} else {
							target[key] = value;
						}
					}
				}
			}
			return target;
		};

		$.widget.bridge = function (name, object) {
			var fullName = object.prototype.widgetFullName || name;
			$.fn[name] = function (options) {
				var isMethodCall = typeof options === "string",
				    args = widget_slice.call(arguments, 1),
				    returnValue = this;

				if (isMethodCall) {
					this.each(function () {
						var methodValue,
						    instance = $.data(this, fullName);
						if (options === "instance") {
							returnValue = instance;
							return false;
						}
						if (!instance) {
							return $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + options + "'");
						}
						if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
							return $.error("no such method '" + options + "' for " + name + " widget instance");
						}
						methodValue = instance[options].apply(instance, args);
						if (methodValue !== instance && methodValue !== undefined) {
							returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
							return false;
						}
					});
				} else {

					// Allow multiple hashes to be passed on init
					if (args.length) {
						options = $.widget.extend.apply(null, [options].concat(args));
					}

					this.each(function () {
						var instance = $.data(this, fullName);
						if (instance) {
							instance.option(options || {});
							if (instance._init) {
								instance._init();
							}
						} else {
							$.data(this, fullName, new object(options, this));
						}
					});
				}

				return returnValue;
			};
		};

		$.Widget = function () /* options, element */{};
		$.Widget._childConstructors = [];

		$.Widget.prototype = {
			widgetName: "widget",
			widgetEventPrefix: "",
			defaultElement: "<div>",
			options: {
				disabled: false,

				// callbacks
				create: null
			},
			_createWidget: function _createWidget(options, element) {
				element = $(element || this.defaultElement || this)[0];
				this.element = $(element);
				this.uuid = widget_uuid++;
				this.eventNamespace = "." + this.widgetName + this.uuid;

				this.bindings = $();
				this.hoverable = $();
				this.focusable = $();

				if (element !== this) {
					$.data(element, this.widgetFullName, this);
					this._on(true, this.element, {
						remove: function remove(event) {
							if (event.target === element) {
								this.destroy();
							}
						}
					});
					this.document = $(element.style ?
					// element within the document
					element.ownerDocument :
					// element is window or document
					element.document || element);
					this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
				}

				this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);

				this._create();
				this._trigger("create", null, this._getCreateEventData());
				this._init();
			},
			_getCreateOptions: $.noop,
			_getCreateEventData: $.noop,
			_create: $.noop,
			_init: $.noop,

			destroy: function destroy() {
				this._destroy();
				// we can probably remove the unbind calls in 2.0
				// all event bindings should go through this._on()
				this.element.unbind(this.eventNamespace).removeData(this.widgetFullName)
				// support: jquery <1.6.3
				// http://bugs.jquery.com/ticket/9413
				.removeData($.camelCase(this.widgetFullName));
				this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled");

				// clean up events and states
				this.bindings.unbind(this.eventNamespace);
				this.hoverable.removeClass("ui-state-hover");
				this.focusable.removeClass("ui-state-focus");
			},
			_destroy: $.noop,

			widget: function widget() {
				return this.element;
			},

			option: function option(key, value) {
				var options = key,
				    parts,
				    curOption,
				    i;

				if (arguments.length === 0) {
					// don't return a reference to the internal hash
					return $.widget.extend({}, this.options);
				}

				if (typeof key === "string") {
					// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
					options = {};
					parts = key.split(".");
					key = parts.shift();
					if (parts.length) {
						curOption = options[key] = $.widget.extend({}, this.options[key]);
						for (i = 0; i < parts.length - 1; i++) {
							curOption[parts[i]] = curOption[parts[i]] || {};
							curOption = curOption[parts[i]];
						}
						key = parts.pop();
						if (arguments.length === 1) {
							return curOption[key] === undefined ? null : curOption[key];
						}
						curOption[key] = value;
					} else {
						if (arguments.length === 1) {
							return this.options[key] === undefined ? null : this.options[key];
						}
						options[key] = value;
					}
				}

				this._setOptions(options);

				return this;
			},
			_setOptions: function _setOptions(options) {
				var key;

				for (key in options) {
					this._setOption(key, options[key]);
				}

				return this;
			},
			_setOption: function _setOption(key, value) {
				this.options[key] = value;

				if (key === "disabled") {
					this.widget().toggleClass(this.widgetFullName + "-disabled", !!value);

					// If the widget is becoming disabled, then nothing is interactive
					if (value) {
						this.hoverable.removeClass("ui-state-hover");
						this.focusable.removeClass("ui-state-focus");
					}
				}

				return this;
			},

			enable: function enable() {
				return this._setOptions({ disabled: false });
			},
			disable: function disable() {
				return this._setOptions({ disabled: true });
			},

			_on: function _on(suppressDisabledCheck, element, handlers) {
				var delegateElement,
				    instance = this;

				// no suppressDisabledCheck flag, shuffle arguments
				if (typeof suppressDisabledCheck !== "boolean") {
					handlers = element;
					element = suppressDisabledCheck;
					suppressDisabledCheck = false;
				}

				// no element argument, shuffle and use this.element
				if (!handlers) {
					handlers = element;
					element = this.element;
					delegateElement = this.widget();
				} else {
					element = delegateElement = $(element);
					this.bindings = this.bindings.add(element);
				}

				$.each(handlers, function (event, handler) {
					function handlerProxy() {
						// allow widgets to customize the disabled handling
						// - disabled as an array instead of boolean
						// - disabled class as method for disabling individual parts
						if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))) {
							return;
						}
						return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
					}

					// copy the guid so direct unbinding works
					if (typeof handler !== "string") {
						handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++;
					}

					var match = event.match(/^([\w:-]*)\s*(.*)$/),
					    eventName = match[1] + instance.eventNamespace,
					    selector = match[2];
					if (selector) {
						delegateElement.delegate(selector, eventName, handlerProxy);
					} else {
						element.bind(eventName, handlerProxy);
					}
				});
			},

			_off: function _off(element, eventName) {
				eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
				element.unbind(eventName).undelegate(eventName);

				// Clear the stack to avoid memory leaks (#10056)
				this.bindings = $(this.bindings.not(element).get());
				this.focusable = $(this.focusable.not(element).get());
				this.hoverable = $(this.hoverable.not(element).get());
			},

			_delay: function _delay(handler, delay) {
				function handlerProxy() {
					return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
				}
				var instance = this;
				return setTimeout(handlerProxy, delay || 0);
			},

			_hoverable: function _hoverable(element) {
				this.hoverable = this.hoverable.add(element);
				this._on(element, {
					mouseenter: function mouseenter(event) {
						$(event.currentTarget).addClass("ui-state-hover");
					},
					mouseleave: function mouseleave(event) {
						$(event.currentTarget).removeClass("ui-state-hover");
					}
				});
			},

			_focusable: function _focusable(element) {
				this.focusable = this.focusable.add(element);
				this._on(element, {
					focusin: function focusin(event) {
						$(event.currentTarget).addClass("ui-state-focus");
					},
					focusout: function focusout(event) {
						$(event.currentTarget).removeClass("ui-state-focus");
					}
				});
			},

			_trigger: function _trigger(type, event, data) {
				var prop,
				    orig,
				    callback = this.options[type];

				data = data || {};
				event = $.Event(event);
				event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
				// the original event may come from any element
				// so we need to reset the target on the new event
				event.target = this.element[0];

				// copy original event properties over to the new event
				orig = event.originalEvent;
				if (orig) {
					for (prop in orig) {
						if (!(prop in event)) {
							event[prop] = orig[prop];
						}
					}
				}

				this.element.trigger(event, data);
				return !($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented());
			}
		};

		$.each({ show: "fadeIn", hide: "fadeOut" }, function (method, defaultEffect) {
			$.Widget.prototype["_" + method] = function (element, options, callback) {
				if (typeof options === "string") {
					options = { effect: options };
				}
				var hasOptions,
				    effectName = !options ? method : options === true || typeof options === "number" ? defaultEffect : options.effect || defaultEffect;
				options = options || {};
				if (typeof options === "number") {
					options = { duration: options };
				}
				hasOptions = !$.isEmptyObject(options);
				options.complete = callback;
				if (options.delay) {
					element.delay(options.delay);
				}
				if (hasOptions && $.effects && $.effects.effect[effectName]) {
					element[method](options);
				} else if (effectName !== method && element[effectName]) {
					element[effectName](options.duration, options.easing, callback);
				} else {
					element.queue(function (next) {
						$(this)[method]();
						if (callback) {
							callback.call(element[0]);
						}
						next();
					});
				}
			};
		});

		var widget = $.widget;
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	/*
	 * jQuery Iframe Transport Plugin
	 * https://github.com/blueimp/jQuery-File-Upload
	 *
	 * Copyright 2011, Sebastian Tschan
	 * https://blueimp.net
	 *
	 * Licensed under the MIT license:
	 * http://www.opensource.org/licenses/MIT
	 */

	/* global define, require, window, document */

	(function (factory) {
	    'use strict';
	    // if (typeof define === 'function' && define.amd) {
	    //     // Register as an anonymous AMD module:
	    //     define(['jquery'], factory);
	    // } else if (typeof exports === 'object') {
	    //     // Node/CommonJS:
	    //     factory(require('jquery'));
	    // } else {
	    //     // Browser globals:
	    //     factory(window.jQuery);
	    // }

	    factory(WFUIJS.$);
	})(function ($) {
	    'use strict';

	    // Helper variable to create unique names for the transport iframes:

	    var counter = 0;

	    // The iframe transport accepts four additional options:
	    // options.fileInput: a jQuery collection of file input fields
	    // options.paramName: the parameter name for the file form data,
	    //  overrides the name property of the file input field(s),
	    //  can be a string or an array of strings.
	    // options.formData: an array of objects with name and value properties,
	    //  equivalent to the return data of .serializeArray(), e.g.:
	    //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
	    // options.initialIframeSrc: the URL of the initial iframe src,
	    //  by default set to "javascript:false;"
	    $.ajaxTransport('iframe', function (options) {
	        if (options.async) {
	            // javascript:false as initial iframe src
	            // prevents warning popups on HTTPS in IE6:
	            /*jshint scripturl: true */
	            var initialIframeSrc = options.initialIframeSrc || 'javascript:false;',

	            /*jshint scripturl: false */
	            form,
	                iframe,
	                addParamChar;
	            return {
	                send: function send(_, completeCallback) {
	                    form = $('<form style="display:none;"></form>');
	                    form.attr('accept-charset', options.formAcceptCharset);
	                    addParamChar = /\?/.test(options.url) ? '&' : '?';
	                    // XDomainRequest only supports GET and POST:
	                    if (options.type === 'DELETE') {
	                        options.url = options.url + addParamChar + '_method=DELETE';
	                        options.type = 'POST';
	                    } else if (options.type === 'PUT') {
	                        options.url = options.url + addParamChar + '_method=PUT';
	                        options.type = 'POST';
	                    } else if (options.type === 'PATCH') {
	                        options.url = options.url + addParamChar + '_method=PATCH';
	                        options.type = 'POST';
	                    }
	                    // IE versions below IE8 cannot set the name property of
	                    // elements that have already been added to the DOM,
	                    // so we set the name along with the iframe HTML markup:
	                    counter += 1;
	                    iframe = $('<iframe src="' + initialIframeSrc + '" name="iframe-transport-' + counter + '"></iframe>').bind('load', function () {
	                        var fileInputClones,
	                            paramNames = $.isArray(options.paramName) ? options.paramName : [options.paramName];
	                        iframe.unbind('load').bind('load', function () {
	                            var response;
	                            // Wrap in a try/catch block to catch exceptions thrown
	                            // when trying to access cross-domain iframe contents:
	                            try {
	                                response = iframe.contents();
	                                // Google Chrome and Firefox do not throw an
	                                // exception when calling iframe.contents() on
	                                // cross-domain requests, so we unify the response:
	                                if (!response.length || !response[0].firstChild) {
	                                    throw new Error();
	                                }
	                            } catch (e) {
	                                response = undefined;
	                            }
	                            // The complete callback returns the
	                            // iframe content document as response object:
	                            completeCallback(200, 'success', { 'iframe': response });
	                            // Fix for IE endless progress bar activity bug
	                            // (happens on form submits to iframe targets):
	                            $('<iframe src="' + initialIframeSrc + '"></iframe>').appendTo(form);
	                            window.setTimeout(function () {
	                                // Removing the form in a setTimeout call
	                                // allows Chrome's developer tools to display
	                                // the response result
	                                form.remove();
	                            }, 0);
	                        });
	                        form.prop('target', iframe.prop('name')).prop('action', options.url).prop('method', options.type);
	                        if (options.formData) {
	                            $.each(options.formData, function (index, field) {
	                                $('<input type="hidden"/>').prop('name', field.name).val(field.value).appendTo(form);
	                            });
	                        }
	                        if (options.fileInput && options.fileInput.length && options.type === 'POST') {
	                            fileInputClones = options.fileInput.clone();
	                            // Insert a clone for each file input field:
	                            options.fileInput.after(function (index) {
	                                return fileInputClones[index];
	                            });
	                            if (options.paramName) {
	                                options.fileInput.each(function (index) {
	                                    $(this).prop('name', paramNames[index] || options.paramName);
	                                });
	                            }
	                            // Appending the file input fields to the hidden form
	                            // removes them from their original location:
	                            form.append(options.fileInput).prop('enctype', 'multipart/form-data')
	                            // enctype must be set as encoding for IE:
	                            .prop('encoding', 'multipart/form-data');
	                            // Remove the HTML5 form attribute from the input(s):
	                            options.fileInput.removeAttr('form');
	                        }
	                        form.submit();
	                        // Insert the file input fields at their original location
	                        // by replacing the clones with the originals:
	                        if (fileInputClones && fileInputClones.length) {
	                            options.fileInput.each(function (index, input) {
	                                var clone = $(fileInputClones[index]);
	                                // Restore the original name and form properties:
	                                $(input).prop('name', clone.prop('name')).attr('form', clone.attr('form'));
	                                clone.replaceWith(input);
	                            });
	                        }
	                    });
	                    form.append(iframe).appendTo(document.body);
	                },
	                abort: function abort() {
	                    if (iframe) {
	                        // javascript:false as iframe src aborts the request
	                        // and prevents warning popups on HTTPS in IE6.
	                        // concat is used to avoid the "Script URL" JSLint error:
	                        iframe.unbind('load').prop('src', initialIframeSrc);
	                    }
	                    if (form) {
	                        form.remove();
	                    }
	                }
	            };
	        }
	    });

	    // The iframe transport returns the iframe content document as response.
	    // The following adds converters from iframe to text, json, html, xml
	    // and script.
	    // Please note that the Content-Type for JSON responses has to be text/plain
	    // or text/html, if the browser doesn't include application/json in the
	    // Accept header, else IE will show a download dialog.
	    // The Content-Type for XML responses on the other hand has to be always
	    // application/xml or text/xml, so IE properly parses the XML response.
	    // See also
	    // https://github.com/blueimp/jQuery-File-Upload/wiki/Setup#content-type-negotiation
	    $.ajaxSetup({
	        converters: {
	            'iframe text': function iframeText(iframe) {
	                return iframe && $(iframe[0].body).text();
	            },
	            'iframe json': function iframeJson(iframe) {
	                return iframe && $.parseJSON($(iframe[0].body).text());
	            },
	            'iframe html': function iframeHtml(iframe) {
	                return iframe && $(iframe[0].body).html();
	            },
	            'iframe xml': function iframeXml(iframe) {
	                var xmlDoc = iframe && iframe[0];
	                return xmlDoc && $.isXMLDoc(xmlDoc) ? xmlDoc : $.parseXML(xmlDoc.XMLDocument && xmlDoc.XMLDocument.xml || $(xmlDoc.body).html());
	            },
	            'iframe script': function iframeScript(iframe) {
	                return iframe && $.globalEval($(iframe[0].body).text());
	            }
	        }
	    });
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	/*
	 * jQuery File Upload Plugin
	 * https://github.com/blueimp/jQuery-File-Upload
	 *
	 * Copyright 2010, Sebastian Tschan
	 * https://blueimp.net
	 *
	 * Licensed under the MIT license:
	 * http://www.opensource.org/licenses/MIT
	 */

	/* jshint nomen:false */
	/* global define, require, window, document, location, Blob, FormData */

	(function (factory) {
	    'use strict';
	    // if (typeof define === 'function' && define.amd) {
	    //     // Register as an anonymous AMD module:
	    //     define([
	    //         'jquery',
	    //         'jquery.ui.widget'
	    //     ], factory);
	    // } else if (typeof exports === 'object') {
	    //     // Node/CommonJS:
	    //     factory(
	    //         require('jquery'),
	    //         require('./vendor/jquery.ui.widget')
	    //     );
	    // } else {
	    //     // Browser globals:
	    //     factory(window.jQuery);
	    // }

	    factory(WFUIJS.$);
	})(function ($) {
	    'use strict';

	    // Detect file input support, based on
	    // http://viljamis.com/blog/2012/file-upload-support-on-mobile/

	    $.support.fileInput = !(new RegExp(
	    // Handle devices which give false positives for the feature detection:
	    '(Android (1\\.[0156]|2\\.[01]))' + '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' + '|(w(eb)?OSBrowser)|(webOS)' + '|(Kindle/(1\\.0|2\\.[05]|3\\.0))').test(window.navigator.userAgent) ||
	    // Feature detection for all other devices:
	    $('<input type="file">').prop('disabled'));

	    // The FileReader API is not actually used, but works as feature detection,
	    // as some Safari versions (5?) support XHR file uploads via the FormData API,
	    // but not non-multipart XHR file uploads.
	    // window.XMLHttpRequestUpload is not available on IE10, so we check for
	    // window.ProgressEvent instead to detect XHR2 file upload capability:
	    $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
	    $.support.xhrFormDataFileUpload = !!window.FormData;

	    // Detect support for Blob slicing (required for chunked uploads):
	    $.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

	    // Helper function to create drag handlers for dragover/dragenter/dragleave:
	    function getDragHandler(type) {
	        var isDragOver = type === 'dragover';
	        return function (e) {
	            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
	            var dataTransfer = e.dataTransfer;
	            if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 && this._trigger(type, $.Event(type, { delegatedEvent: e })) !== false) {
	                e.preventDefault();
	                if (isDragOver) {
	                    dataTransfer.dropEffect = 'copy';
	                }
	            }
	        };
	    }

	    // The fileupload widget listens for change events on file input fields defined
	    // via fileInput setting and paste or drop events of the given dropZone.
	    // In addition to the default jQuery Widget methods, the fileupload widget
	    // exposes the "add" and "send" methods, to add or directly send files using
	    // the fileupload API.
	    // By default, files added via file input selection, paste, drag & drop or
	    // "add" method are uploaded immediately, but it is possible to override
	    // the "add" callback option to queue file uploads.
	    $.widget('blueimp.fileupload', {

	        options: {
	            // The drop target element(s), by the default the complete document.
	            // Set to null to disable drag & drop support:
	            dropZone: $(document),
	            // The paste target element(s), by the default undefined.
	            // Set to a DOM node or jQuery object to enable file pasting:
	            pasteZone: undefined,
	            // The file input field(s), that are listened to for change events.
	            // If undefined, it is set to the file input fields inside
	            // of the widget element on plugin initialization.
	            // Set to null to disable the change listener.
	            fileInput: undefined,
	            // By default, the file input field is replaced with a clone after
	            // each input field change event. This is required for iframe transport
	            // queues and allows change events to be fired for the same file
	            // selection, but can be disabled by setting the following option to false:
	            replaceFileInput: true,
	            // The parameter name for the file form data (the request argument name).
	            // If undefined or empty, the name property of the file input field is
	            // used, or "files[]" if the file input name property is also empty,
	            // can be a string or an array of strings:
	            paramName: undefined,
	            // By default, each file of a selection is uploaded using an individual
	            // request for XHR type uploads. Set to false to upload file
	            // selections in one request each:
	            singleFileUploads: true,
	            // To limit the number of files uploaded with one XHR request,
	            // set the following option to an integer greater than 0:
	            limitMultiFileUploads: undefined,
	            // The following option limits the number of files uploaded with one
	            // XHR request to keep the request size under or equal to the defined
	            // limit in bytes:
	            limitMultiFileUploadSize: undefined,
	            // Multipart file uploads add a number of bytes to each uploaded file,
	            // therefore the following option adds an overhead for each file used
	            // in the limitMultiFileUploadSize configuration:
	            limitMultiFileUploadSizeOverhead: 512,
	            // Set the following option to true to issue all file upload requests
	            // in a sequential order:
	            sequentialUploads: false,
	            // To limit the number of concurrent uploads,
	            // set the following option to an integer greater than 0:
	            limitConcurrentUploads: undefined,
	            // Set the following option to true to force iframe transport uploads:
	            forceIframeTransport: false,
	            // Set the following option to the location of a redirect url on the
	            // origin server, for cross-domain iframe transport uploads:
	            redirect: undefined,
	            // The parameter name for the redirect url, sent as part of the form
	            // data and set to 'redirect' if this option is empty:
	            redirectParamName: undefined,
	            // Set the following option to the location of a postMessage window,
	            // to enable postMessage transport uploads:
	            postMessage: undefined,
	            // By default, XHR file uploads are sent as multipart/form-data.
	            // The iframe transport is always using multipart/form-data.
	            // Set to false to enable non-multipart XHR uploads:
	            multipart: true,
	            // To upload large files in smaller chunks, set the following option
	            // to a preferred maximum chunk size. If set to 0, null or undefined,
	            // or the browser does not support the required Blob API, files will
	            // be uploaded as a whole.
	            maxChunkSize: undefined,
	            // When a non-multipart upload or a chunked multipart upload has been
	            // aborted, this option can be used to resume the upload by setting
	            // it to the size of the already uploaded bytes. This option is most
	            // useful when modifying the options object inside of the "add" or
	            // "send" callbacks, as the options are cloned for each file upload.
	            uploadedBytes: undefined,
	            // By default, failed (abort or error) file uploads are removed from the
	            // global progress calculation. Set the following option to false to
	            // prevent recalculating the global progress data:
	            recalculateProgress: true,
	            // Interval in milliseconds to calculate and trigger progress events:
	            progressInterval: 100,
	            // Interval in milliseconds to calculate progress bitrate:
	            bitrateInterval: 500,
	            // By default, uploads are started automatically when adding files:
	            autoUpload: true,

	            // Error and info messages:
	            messages: {
	                uploadedBytes: 'Uploaded bytes exceed file size'
	            },

	            // Translation function, gets the message key to be translated
	            // and an object with context specific data as arguments:
	            i18n: function i18n(message, context) {
	                message = this.messages[message] || message.toString();
	                if (context) {
	                    $.each(context, function (key, value) {
	                        message = message.replace('{' + key + '}', value);
	                    });
	                }
	                return message;
	            },

	            // Additional form data to be sent along with the file uploads can be set
	            // using this option, which accepts an array of objects with name and
	            // value properties, a function returning such an array, a FormData
	            // object (for XHR file uploads), or a simple object.
	            // The form of the first fileInput is given as parameter to the function:
	            formData: function formData(form) {
	                return form.serializeArray();
	            },

	            // The add callback is invoked as soon as files are added to the fileupload
	            // widget (via file input selection, drag & drop, paste or add API call).
	            // If the singleFileUploads option is enabled, this callback will be
	            // called once for each file in the selection for XHR file uploads, else
	            // once for each file selection.
	            //
	            // The upload starts when the submit method is invoked on the data parameter.
	            // The data object contains a files property holding the added files
	            // and allows you to override plugin options as well as define ajax settings.
	            //
	            // Listeners for this callback can also be bound the following way:
	            // .bind('fileuploadadd', func);
	            //
	            // data.submit() returns a Promise object and allows to attach additional
	            // handlers using jQuery's Deferred callbacks:
	            // data.submit().done(func).fail(func).always(func);
	            add: function add(e, data) {
	                if (e.isDefaultPrevented()) {
	                    return false;
	                }
	                if (data.autoUpload || data.autoUpload !== false && $(this).fileupload('option', 'autoUpload')) {
	                    data.process().done(function () {
	                        data.submit();
	                    });
	                }
	            },

	            // Other callbacks:

	            // Callback for the submit event of each file upload:
	            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

	            // Callback for the start of each file upload request:
	            // send: function (e, data) {}, // .bind('fileuploadsend', func);

	            // Callback for successful uploads:
	            // done: function (e, data) {}, // .bind('fileuploaddone', func);

	            // Callback for failed (abort or error) uploads:
	            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

	            // Callback for completed (success, abort or error) requests:
	            // always: function (e, data) {}, // .bind('fileuploadalways', func);

	            // Callback for upload progress events:
	            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

	            // Callback for global upload progress events:
	            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

	            // Callback for uploads start, equivalent to the global ajaxStart event:
	            // start: function (e) {}, // .bind('fileuploadstart', func);

	            // Callback for uploads stop, equivalent to the global ajaxStop event:
	            // stop: function (e) {}, // .bind('fileuploadstop', func);

	            // Callback for change events of the fileInput(s):
	            // change: function (e, data) {}, // .bind('fileuploadchange', func);

	            // Callback for paste events to the pasteZone(s):
	            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

	            // Callback for drop events of the dropZone(s):
	            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

	            // Callback for dragover events of the dropZone(s):
	            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

	            // Callback for the start of each chunk upload request:
	            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

	            // Callback for successful chunk uploads:
	            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

	            // Callback for failed (abort or error) chunk uploads:
	            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

	            // Callback for completed (success, abort or error) chunk upload requests:
	            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

	            // The plugin options are used as settings object for the ajax calls.
	            // The following are jQuery ajax settings required for the file uploads:
	            processData: false,
	            contentType: false,
	            cache: false,
	            timeout: 0
	        },

	        // A list of options that require reinitializing event listeners and/or
	        // special initialization code:
	        _specialOptions: ['fileInput', 'dropZone', 'pasteZone', 'multipart', 'forceIframeTransport'],

	        _blobSlice: $.support.blobSlice && function () {
	            var slice = this.slice || this.webkitSlice || this.mozSlice;
	            return slice.apply(this, arguments);
	        },

	        _BitrateTimer: function _BitrateTimer() {
	            this.timestamp = Date.now ? Date.now() : new Date().getTime();
	            this.loaded = 0;
	            this.bitrate = 0;
	            this.getBitrate = function (now, loaded, interval) {
	                var timeDiff = now - this.timestamp;
	                if (!this.bitrate || !interval || timeDiff > interval) {
	                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
	                    this.loaded = loaded;
	                    this.timestamp = now;
	                }
	                return this.bitrate;
	            };
	        },

	        _isXHRUpload: function _isXHRUpload(options) {
	            return !options.forceIframeTransport && (!options.multipart && $.support.xhrFileUpload || $.support.xhrFormDataFileUpload);
	        },

	        _getFormData: function _getFormData(options) {
	            var formData;
	            if ($.type(options.formData) === 'function') {
	                return options.formData(options.form);
	            }
	            if ($.isArray(options.formData)) {
	                return options.formData;
	            }
	            if ($.type(options.formData) === 'object') {
	                formData = [];
	                $.each(options.formData, function (name, value) {
	                    formData.push({ name: name, value: value });
	                });
	                return formData;
	            }
	            return [];
	        },

	        _getTotal: function _getTotal(files) {
	            var total = 0;
	            $.each(files, function (index, file) {
	                total += file.size || 1;
	            });
	            return total;
	        },

	        _initProgressObject: function _initProgressObject(obj) {
	            var progress = {
	                loaded: 0,
	                total: 0,
	                bitrate: 0
	            };
	            if (obj._progress) {
	                $.extend(obj._progress, progress);
	            } else {
	                obj._progress = progress;
	            }
	        },

	        _initResponseObject: function _initResponseObject(obj) {
	            var prop;
	            if (obj._response) {
	                for (prop in obj._response) {
	                    if (obj._response.hasOwnProperty(prop)) {
	                        delete obj._response[prop];
	                    }
	                }
	            } else {
	                obj._response = {};
	            }
	        },

	        _onProgress: function _onProgress(e, data) {
	            if (e.lengthComputable) {
	                var now = Date.now ? Date.now() : new Date().getTime(),
	                    loaded;
	                if (data._time && data.progressInterval && now - data._time < data.progressInterval && e.loaded !== e.total) {
	                    return;
	                }
	                data._time = now;
	                loaded = Math.floor(e.loaded / e.total * (data.chunkSize || data._progress.total)) + (data.uploadedBytes || 0);
	                // Add the difference from the previously loaded state
	                // to the global loaded counter:
	                this._progress.loaded += loaded - data._progress.loaded;
	                this._progress.bitrate = this._bitrateTimer.getBitrate(now, this._progress.loaded, data.bitrateInterval);
	                data._progress.loaded = data.loaded = loaded;
	                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(now, loaded, data.bitrateInterval);
	                // Trigger a custom progress event with a total data property set
	                // to the file size(s) of the current upload and a loaded data
	                // property calculated accordingly:
	                this._trigger('progress', $.Event('progress', { delegatedEvent: e }), data);
	                // Trigger a global progress event for all current file uploads,
	                // including ajax calls queued for sequential file uploads:
	                this._trigger('progressall', $.Event('progressall', { delegatedEvent: e }), this._progress);
	            }
	        },

	        _initProgressListener: function _initProgressListener(options) {
	            var that = this,
	                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
	            // Accesss to the native XHR object is required to add event listeners
	            // for the upload progress event:
	            if (xhr.upload) {
	                $(xhr.upload).bind('progress', function (e) {
	                    var oe = e.originalEvent;
	                    // Make sure the progress event properties get copied over:
	                    e.lengthComputable = oe.lengthComputable;
	                    e.loaded = oe.loaded;
	                    e.total = oe.total;
	                    that._onProgress(e, options);
	                });
	                options.xhr = function () {
	                    return xhr;
	                };
	            }
	        },

	        _isInstanceOf: function _isInstanceOf(type, obj) {
	            // Cross-frame instanceof check
	            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
	        },

	        _initXHRData: function _initXHRData(options) {
	            var that = this,
	                formData,
	                file = options.files[0],

	            // Ignore non-multipart setting if not supported:
	            multipart = options.multipart || !$.support.xhrFileUpload,
	                paramName = $.type(options.paramName) === 'array' ? options.paramName[0] : options.paramName;
	            options.headers = $.extend({}, options.headers);
	            if (options.contentRange) {
	                options.headers['Content-Range'] = options.contentRange;
	            }
	            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
	                options.headers['Content-Disposition'] = 'attachment; filename="' + encodeURI(file.name) + '"';
	            }
	            if (!multipart) {
	                options.contentType = file.type || 'application/octet-stream';
	                options.data = options.blob || file;
	            } else if ($.support.xhrFormDataFileUpload) {
	                if (options.postMessage) {
	                    // window.postMessage does not allow sending FormData
	                    // objects, so we just add the File/Blob objects to
	                    // the formData array and let the postMessage window
	                    // create the FormData object out of this array:
	                    formData = this._getFormData(options);
	                    if (options.blob) {
	                        formData.push({
	                            name: paramName,
	                            value: options.blob
	                        });
	                    } else {
	                        $.each(options.files, function (index, file) {
	                            formData.push({
	                                name: $.type(options.paramName) === 'array' && options.paramName[index] || paramName,
	                                value: file
	                            });
	                        });
	                    }
	                } else {
	                    if (that._isInstanceOf('FormData', options.formData)) {
	                        formData = options.formData;
	                    } else {
	                        formData = new FormData();
	                        $.each(this._getFormData(options), function (index, field) {
	                            formData.append(field.name, field.value);
	                        });
	                    }
	                    if (options.blob) {
	                        formData.append(paramName, options.blob, file.name);
	                    } else {
	                        $.each(options.files, function (index, file) {
	                            // This check allows the tests to run with
	                            // dummy objects:
	                            if (that._isInstanceOf('File', file) || that._isInstanceOf('Blob', file)) {
	                                formData.append($.type(options.paramName) === 'array' && options.paramName[index] || paramName, file, file.uploadName || file.name);
	                            }
	                        });
	                    }
	                }
	                options.data = formData;
	            }
	            // Blob reference is not needed anymore, free memory:
	            options.blob = null;
	        },

	        _initIframeSettings: function _initIframeSettings(options) {
	            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
	            // Setting the dataType to iframe enables the iframe transport:
	            options.dataType = 'iframe ' + (options.dataType || '');
	            // The iframe transport accepts a serialized array as form data:
	            options.formData = this._getFormData(options);
	            // Add redirect url to form data on cross-domain uploads:
	            if (options.redirect && targetHost && targetHost !== location.host) {
	                options.formData.push({
	                    name: options.redirectParamName || 'redirect',
	                    value: options.redirect
	                });
	            }
	        },

	        _initDataSettings: function _initDataSettings(options) {
	            if (this._isXHRUpload(options)) {
	                if (!this._chunkedUpload(options, true)) {
	                    if (!options.data) {
	                        this._initXHRData(options);
	                    }
	                    this._initProgressListener(options);
	                }
	                if (options.postMessage) {
	                    // Setting the dataType to postmessage enables the
	                    // postMessage transport:
	                    options.dataType = 'postmessage ' + (options.dataType || '');
	                }
	            } else {
	                this._initIframeSettings(options);
	            }
	        },

	        _getParamName: function _getParamName(options) {
	            var fileInput = $(options.fileInput),
	                paramName = options.paramName;
	            if (!paramName) {
	                paramName = [];
	                fileInput.each(function () {
	                    var input = $(this),
	                        name = input.prop('name') || 'files[]',
	                        i = (input.prop('files') || [1]).length;
	                    while (i) {
	                        paramName.push(name);
	                        i -= 1;
	                    }
	                });
	                if (!paramName.length) {
	                    paramName = [fileInput.prop('name') || 'files[]'];
	                }
	            } else if (!$.isArray(paramName)) {
	                paramName = [paramName];
	            }
	            return paramName;
	        },

	        _initFormSettings: function _initFormSettings(options) {
	            // Retrieve missing options from the input field and the
	            // associated form, if available:
	            if (!options.form || !options.form.length) {
	                options.form = $(options.fileInput.prop('form'));
	                // If the given file input doesn't have an associated form,
	                // use the default widget file input's form:
	                if (!options.form.length) {
	                    options.form = $(this.options.fileInput.prop('form'));
	                }
	            }
	            options.paramName = this._getParamName(options);
	            if (!options.url) {
	                options.url = options.form.prop('action') || location.href;
	            }
	            // The HTTP request method must be "POST" or "PUT":
	            options.type = (options.type || $.type(options.form.prop('method')) === 'string' && options.form.prop('method') || '').toUpperCase();
	            if (options.type !== 'POST' && options.type !== 'PUT' && options.type !== 'PATCH') {
	                options.type = 'POST';
	            }
	            if (!options.formAcceptCharset) {
	                options.formAcceptCharset = options.form.attr('accept-charset');
	            }
	        },

	        _getAJAXSettings: function _getAJAXSettings(data) {
	            var options = $.extend({}, this.options, data);
	            this._initFormSettings(options);
	            this._initDataSettings(options);
	            return options;
	        },

	        // jQuery 1.6 doesn't provide .state(),
	        // while jQuery 1.8+ removed .isRejected() and .isResolved():
	        _getDeferredState: function _getDeferredState(deferred) {
	            if (deferred.state) {
	                return deferred.state();
	            }
	            if (deferred.isResolved()) {
	                return 'resolved';
	            }
	            if (deferred.isRejected()) {
	                return 'rejected';
	            }
	            return 'pending';
	        },

	        // Maps jqXHR callbacks to the equivalent
	        // methods of the given Promise object:
	        _enhancePromise: function _enhancePromise(promise) {
	            promise.success = promise.done;
	            promise.error = promise.fail;
	            promise.complete = promise.always;
	            return promise;
	        },

	        // Creates and returns a Promise object enhanced with
	        // the jqXHR methods abort, success, error and complete:
	        _getXHRPromise: function _getXHRPromise(resolveOrReject, context, args) {
	            var dfd = $.Deferred(),
	                promise = dfd.promise();
	            context = context || this.options.context || promise;
	            if (resolveOrReject === true) {
	                dfd.resolveWith(context, args);
	            } else if (resolveOrReject === false) {
	                dfd.rejectWith(context, args);
	            }
	            promise.abort = dfd.promise;
	            return this._enhancePromise(promise);
	        },

	        // Adds convenience methods to the data callback argument:
	        _addConvenienceMethods: function _addConvenienceMethods(e, data) {
	            var that = this,
	                getPromise = function getPromise(args) {
	                return $.Deferred().resolveWith(that, args).promise();
	            };
	            data.process = function (resolveFunc, rejectFunc) {
	                if (resolveFunc || rejectFunc) {
	                    data._processQueue = this._processQueue = (this._processQueue || getPromise([this])).pipe(function () {
	                        if (data.errorThrown) {
	                            return $.Deferred().rejectWith(that, [data]).promise();
	                        }
	                        return getPromise(arguments);
	                    }).pipe(resolveFunc, rejectFunc);
	                }
	                return this._processQueue || getPromise([this]);
	            };
	            data.submit = function () {
	                if (this.state() !== 'pending') {
	                    data.jqXHR = this.jqXHR = that._trigger('submit', $.Event('submit', { delegatedEvent: e }), this) !== false && that._onSend(e, this);
	                }
	                return this.jqXHR || that._getXHRPromise();
	            };
	            data.abort = function () {
	                if (this.jqXHR) {
	                    return this.jqXHR.abort();
	                }
	                this.errorThrown = 'abort';
	                that._trigger('fail', null, this);
	                return that._getXHRPromise(false);
	            };
	            data.state = function () {
	                if (this.jqXHR) {
	                    return that._getDeferredState(this.jqXHR);
	                }
	                if (this._processQueue) {
	                    return that._getDeferredState(this._processQueue);
	                }
	            };
	            data.processing = function () {
	                return !this.jqXHR && this._processQueue && that._getDeferredState(this._processQueue) === 'pending';
	            };
	            data.progress = function () {
	                return this._progress;
	            };
	            data.response = function () {
	                return this._response;
	            };
	        },

	        // Parses the Range header from the server response
	        // and returns the uploaded bytes:
	        _getUploadedBytes: function _getUploadedBytes(jqXHR) {
	            var range = jqXHR.getResponseHeader('Range'),
	                parts = range && range.split('-'),
	                upperBytesPos = parts && parts.length > 1 && parseInt(parts[1], 10);
	            return upperBytesPos && upperBytesPos + 1;
	        },

	        // Uploads a file in multiple, sequential requests
	        // by splitting the file up in multiple blob chunks.
	        // If the second parameter is true, only tests if the file
	        // should be uploaded in chunks, but does not invoke any
	        // upload requests:
	        _chunkedUpload: function _chunkedUpload(options, testOnly) {
	            options.uploadedBytes = options.uploadedBytes || 0;
	            var that = this,
	                file = options.files[0],
	                fs = file.size,
	                ub = options.uploadedBytes,
	                mcs = options.maxChunkSize || fs,
	                slice = this._blobSlice,
	                dfd = $.Deferred(),
	                promise = dfd.promise(),
	                jqXHR,
	                _upload;
	            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) || options.data) {
	                return false;
	            }
	            if (testOnly) {
	                return true;
	            }
	            if (ub >= fs) {
	                file.error = options.i18n('uploadedBytes');
	                return this._getXHRPromise(false, options.context, [null, 'error', file.error]);
	            }
	            // The chunk upload method:
	            _upload = function upload() {
	                // Clone the options object for each chunk upload:
	                var o = $.extend({}, options),
	                    currentLoaded = o._progress.loaded;
	                o.blob = slice.call(file, ub, ub + mcs, file.type);
	                // Store the current chunk size, as the blob itself
	                // will be dereferenced after data processing:
	                o.chunkSize = o.blob.size;
	                // Expose the chunk bytes position range:
	                o.contentRange = 'bytes ' + ub + '-' + (ub + o.chunkSize - 1) + '/' + fs;
	                // Process the upload data (the blob and potential form data):
	                that._initXHRData(o);
	                // Add progress listeners for this chunk upload:
	                that._initProgressListener(o);
	                jqXHR = (that._trigger('chunksend', null, o) !== false && $.ajax(o) || that._getXHRPromise(false, o.context)).done(function (result, textStatus, jqXHR) {
	                    ub = that._getUploadedBytes(jqXHR) || ub + o.chunkSize;
	                    // Create a progress event if no final progress event
	                    // with loaded equaling total has been triggered
	                    // for this chunk:
	                    if (currentLoaded + o.chunkSize - o._progress.loaded) {
	                        that._onProgress($.Event('progress', {
	                            lengthComputable: true,
	                            loaded: ub - o.uploadedBytes,
	                            total: ub - o.uploadedBytes
	                        }), o);
	                    }
	                    options.uploadedBytes = o.uploadedBytes = ub;
	                    o.result = result;
	                    o.textStatus = textStatus;
	                    o.jqXHR = jqXHR;
	                    that._trigger('chunkdone', null, o);
	                    that._trigger('chunkalways', null, o);
	                    if (ub < fs) {
	                        // File upload not yet complete,
	                        // continue with the next chunk:
	                        _upload();
	                    } else {
	                        dfd.resolveWith(o.context, [result, textStatus, jqXHR]);
	                    }
	                }).fail(function (jqXHR, textStatus, errorThrown) {
	                    o.jqXHR = jqXHR;
	                    o.textStatus = textStatus;
	                    o.errorThrown = errorThrown;
	                    that._trigger('chunkfail', null, o);
	                    that._trigger('chunkalways', null, o);
	                    dfd.rejectWith(o.context, [jqXHR, textStatus, errorThrown]);
	                });
	            };
	            this._enhancePromise(promise);
	            promise.abort = function () {
	                return jqXHR.abort();
	            };
	            _upload();
	            return promise;
	        },

	        _beforeSend: function _beforeSend(e, data) {
	            if (this._active === 0) {
	                // the start callback is triggered when an upload starts
	                // and no other uploads are currently running,
	                // equivalent to the global ajaxStart event:
	                this._trigger('start');
	                // Set timer for global bitrate progress calculation:
	                this._bitrateTimer = new this._BitrateTimer();
	                // Reset the global progress values:
	                this._progress.loaded = this._progress.total = 0;
	                this._progress.bitrate = 0;
	            }
	            // Make sure the container objects for the .response() and
	            // .progress() methods on the data object are available
	            // and reset to their initial state:
	            this._initResponseObject(data);
	            this._initProgressObject(data);
	            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
	            data._progress.total = data.total = this._getTotal(data.files) || 1;
	            data._progress.bitrate = data.bitrate = 0;
	            this._active += 1;
	            // Initialize the global progress values:
	            this._progress.loaded += data.loaded;
	            this._progress.total += data.total;
	        },

	        _onDone: function _onDone(result, textStatus, jqXHR, options) {
	            var total = options._progress.total,
	                response = options._response;
	            if (options._progress.loaded < total) {
	                // Create a progress event if no final progress event
	                // with loaded equaling total has been triggered:
	                this._onProgress($.Event('progress', {
	                    lengthComputable: true,
	                    loaded: total,
	                    total: total
	                }), options);
	            }
	            response.result = options.result = result;
	            response.textStatus = options.textStatus = textStatus;
	            response.jqXHR = options.jqXHR = jqXHR;
	            this._trigger('done', null, options);
	        },

	        _onFail: function _onFail(jqXHR, textStatus, errorThrown, options) {
	            var response = options._response;
	            if (options.recalculateProgress) {
	                // Remove the failed (error or abort) file upload from
	                // the global progress calculation:
	                this._progress.loaded -= options._progress.loaded;
	                this._progress.total -= options._progress.total;
	            }
	            response.jqXHR = options.jqXHR = jqXHR;
	            response.textStatus = options.textStatus = textStatus;
	            response.errorThrown = options.errorThrown = errorThrown;
	            this._trigger('fail', null, options);
	        },

	        _onAlways: function _onAlways(jqXHRorResult, textStatus, jqXHRorError, options) {
	            // jqXHRorResult, textStatus and jqXHRorError are added to the
	            // options object via done and fail callbacks
	            this._trigger('always', null, options);
	        },

	        _onSend: function _onSend(e, data) {
	            if (!data.submit) {
	                this._addConvenienceMethods(e, data);
	            }
	            var that = this,
	                jqXHR,
	                aborted,
	                slot,
	                pipe,
	                options = that._getAJAXSettings(data),
	                send = function send() {
	                that._sending += 1;
	                // Set timer for bitrate progress calculation:
	                options._bitrateTimer = new that._BitrateTimer();
	                jqXHR = jqXHR || ((aborted || that._trigger('send', $.Event('send', { delegatedEvent: e }), options) === false) && that._getXHRPromise(false, options.context, aborted) || that._chunkedUpload(options) || $.ajax(options)).done(function (result, textStatus, jqXHR) {
	                    that._onDone(result, textStatus, jqXHR, options);
	                }).fail(function (jqXHR, textStatus, errorThrown) {
	                    that._onFail(jqXHR, textStatus, errorThrown, options);
	                }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
	                    that._onAlways(jqXHRorResult, textStatus, jqXHRorError, options);
	                    that._sending -= 1;
	                    that._active -= 1;
	                    if (options.limitConcurrentUploads && options.limitConcurrentUploads > that._sending) {
	                        // Start the next queued upload,
	                        // that has not been aborted:
	                        var nextSlot = that._slots.shift();
	                        while (nextSlot) {
	                            if (that._getDeferredState(nextSlot) === 'pending') {
	                                nextSlot.resolve();
	                                break;
	                            }
	                            nextSlot = that._slots.shift();
	                        }
	                    }
	                    if (that._active === 0) {
	                        // The stop callback is triggered when all uploads have
	                        // been completed, equivalent to the global ajaxStop event:
	                        that._trigger('stop');
	                    }
	                });
	                return jqXHR;
	            };
	            this._beforeSend(e, options);
	            if (this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending) {
	                if (this.options.limitConcurrentUploads > 1) {
	                    slot = $.Deferred();
	                    this._slots.push(slot);
	                    pipe = slot.pipe(send);
	                } else {
	                    this._sequence = this._sequence.pipe(send, send);
	                    pipe = this._sequence;
	                }
	                // Return the piped Promise object, enhanced with an abort method,
	                // which is delegated to the jqXHR object of the current upload,
	                // and jqXHR callbacks mapped to the equivalent Promise methods:
	                pipe.abort = function () {
	                    aborted = [undefined, 'abort', 'abort'];
	                    if (!jqXHR) {
	                        if (slot) {
	                            slot.rejectWith(options.context, aborted);
	                        }
	                        return send();
	                    }
	                    return jqXHR.abort();
	                };
	                return this._enhancePromise(pipe);
	            }
	            return send();
	        },

	        _onAdd: function _onAdd(e, data) {
	            var that = this,
	                result = true,
	                options = $.extend({}, this.options, data),
	                files = data.files,
	                filesLength = files.length,
	                limit = options.limitMultiFileUploads,
	                limitSize = options.limitMultiFileUploadSize,
	                overhead = options.limitMultiFileUploadSizeOverhead,
	                batchSize = 0,
	                paramName = this._getParamName(options),
	                paramNameSet,
	                paramNameSlice,
	                fileSet,
	                i,
	                j = 0;
	            if (!filesLength) {
	                return false;
	            }
	            if (limitSize && files[0].size === undefined) {
	                limitSize = undefined;
	            }
	            if (!(options.singleFileUploads || limit || limitSize) || !this._isXHRUpload(options)) {
	                fileSet = [files];
	                paramNameSet = [paramName];
	            } else if (!(options.singleFileUploads || limitSize) && limit) {
	                fileSet = [];
	                paramNameSet = [];
	                for (i = 0; i < filesLength; i += limit) {
	                    fileSet.push(files.slice(i, i + limit));
	                    paramNameSlice = paramName.slice(i, i + limit);
	                    if (!paramNameSlice.length) {
	                        paramNameSlice = paramName;
	                    }
	                    paramNameSet.push(paramNameSlice);
	                }
	            } else if (!options.singleFileUploads && limitSize) {
	                fileSet = [];
	                paramNameSet = [];
	                for (i = 0; i < filesLength; i = i + 1) {
	                    batchSize += files[i].size + overhead;
	                    if (i + 1 === filesLength || batchSize + files[i + 1].size + overhead > limitSize || limit && i + 1 - j >= limit) {
	                        fileSet.push(files.slice(j, i + 1));
	                        paramNameSlice = paramName.slice(j, i + 1);
	                        if (!paramNameSlice.length) {
	                            paramNameSlice = paramName;
	                        }
	                        paramNameSet.push(paramNameSlice);
	                        j = i + 1;
	                        batchSize = 0;
	                    }
	                }
	            } else {
	                paramNameSet = paramName;
	            }
	            data.originalFiles = files;
	            $.each(fileSet || files, function (index, element) {
	                var newData = $.extend({}, data);
	                newData.files = fileSet ? element : [element];
	                newData.paramName = paramNameSet[index];
	                that._initResponseObject(newData);
	                that._initProgressObject(newData);
	                that._addConvenienceMethods(e, newData);
	                result = that._trigger('add', $.Event('add', { delegatedEvent: e }), newData);
	                return result;
	            });
	            return result;
	        },

	        _replaceFileInput: function _replaceFileInput(data) {
	            var input = data.fileInput,
	                inputClone = input.clone(true),
	                restoreFocus = input.is(document.activeElement);
	            // Add a reference for the new cloned file input to the data argument:
	            data.fileInputClone = inputClone;
	            $('<form></form>').append(inputClone)[0].reset();
	            // Detaching allows to insert the fileInput on another form
	            // without loosing the file input value:
	            input.after(inputClone).detach();
	            // If the fileInput had focus before it was detached,
	            // restore focus to the inputClone.
	            if (restoreFocus) {
	                inputClone.focus();
	            }
	            // Avoid memory leaks with the detached file input:
	            $.cleanData(input.unbind('remove'));
	            // Replace the original file input element in the fileInput
	            // elements set with the clone, which has been copied including
	            // event handlers:
	            this.options.fileInput = this.options.fileInput.map(function (i, el) {
	                if (el === input[0]) {
	                    return inputClone[0];
	                }
	                return el;
	            });
	            // If the widget has been initialized on the file input itself,
	            // override this.element with the file input clone:
	            if (input[0] === this.element[0]) {
	                this.element = inputClone;
	            }
	        },

	        _handleFileTreeEntry: function _handleFileTreeEntry(entry, path) {
	            var that = this,
	                dfd = $.Deferred(),
	                errorHandler = function errorHandler(e) {
	                if (e && !e.entry) {
	                    e.entry = entry;
	                }
	                // Since $.when returns immediately if one
	                // Deferred is rejected, we use resolve instead.
	                // This allows valid files and invalid items
	                // to be returned together in one set:
	                dfd.resolve([e]);
	            },
	                successHandler = function successHandler(entries) {
	                that._handleFileTreeEntries(entries, path + entry.name + '/').done(function (files) {
	                    dfd.resolve(files);
	                }).fail(errorHandler);
	            },
	                readEntries = function readEntries() {
	                dirReader.readEntries(function (results) {
	                    if (!results.length) {
	                        successHandler(entries);
	                    } else {
	                        entries = entries.concat(results);
	                        readEntries();
	                    }
	                }, errorHandler);
	            },
	                dirReader,
	                entries = [];
	            path = path || '';
	            if (entry.isFile) {
	                if (entry._file) {
	                    // Workaround for Chrome bug #149735
	                    entry._file.relativePath = path;
	                    dfd.resolve(entry._file);
	                } else {
	                    entry.file(function (file) {
	                        file.relativePath = path;
	                        dfd.resolve(file);
	                    }, errorHandler);
	                }
	            } else if (entry.isDirectory) {
	                dirReader = entry.createReader();
	                readEntries();
	            } else {
	                // Return an empy list for file system items
	                // other than files or directories:
	                dfd.resolve([]);
	            }
	            return dfd.promise();
	        },

	        _handleFileTreeEntries: function _handleFileTreeEntries(entries, path) {
	            var that = this;
	            return $.when.apply($, $.map(entries, function (entry) {
	                return that._handleFileTreeEntry(entry, path);
	            })).pipe(function () {
	                return Array.prototype.concat.apply([], arguments);
	            });
	        },

	        _getDroppedFiles: function _getDroppedFiles(dataTransfer) {
	            dataTransfer = dataTransfer || {};
	            var items = dataTransfer.items;
	            if (items && items.length && (items[0].webkitGetAsEntry || items[0].getAsEntry)) {
	                return this._handleFileTreeEntries($.map(items, function (item) {
	                    var entry;
	                    if (item.webkitGetAsEntry) {
	                        entry = item.webkitGetAsEntry();
	                        if (entry) {
	                            // Workaround for Chrome bug #149735:
	                            entry._file = item.getAsFile();
	                        }
	                        return entry;
	                    }
	                    return item.getAsEntry();
	                }));
	            }
	            return $.Deferred().resolve($.makeArray(dataTransfer.files)).promise();
	        },

	        _getSingleFileInputFiles: function _getSingleFileInputFiles(fileInput) {
	            fileInput = $(fileInput);
	            var entries = fileInput.prop('webkitEntries') || fileInput.prop('entries'),
	                files,
	                value;
	            if (entries && entries.length) {
	                return this._handleFileTreeEntries(entries);
	            }
	            files = $.makeArray(fileInput.prop('files'));
	            if (!files.length) {
	                value = fileInput.prop('value');
	                if (!value) {
	                    return $.Deferred().resolve([]).promise();
	                }
	                // If the files property is not available, the browser does not
	                // support the File API and we add a pseudo File object with
	                // the input value as name with path information removed:
	                files = [{ name: value.replace(/^.*\\/, '') }];
	            } else if (files[0].name === undefined && files[0].fileName) {
	                // File normalization for Safari 4 and Firefox 3:
	                $.each(files, function (index, file) {
	                    file.name = file.fileName;
	                    file.size = file.fileSize;
	                });
	            }
	            return $.Deferred().resolve(files).promise();
	        },

	        _getFileInputFiles: function _getFileInputFiles(fileInput) {
	            if (!(fileInput instanceof $) || fileInput.length === 1) {
	                return this._getSingleFileInputFiles(fileInput);
	            }
	            return $.when.apply($, $.map(fileInput, this._getSingleFileInputFiles)).pipe(function () {
	                return Array.prototype.concat.apply([], arguments);
	            });
	        },

	        _onChange: function _onChange(e) {
	            var that = this,
	                data = {
	                fileInput: $(e.target),
	                form: $(e.target.form)
	            };
	            this._getFileInputFiles(data.fileInput).always(function (files) {
	                data.files = files;
	                if (that.options.replaceFileInput) {
	                    that._replaceFileInput(data);
	                }
	                if (that._trigger('change', $.Event('change', { delegatedEvent: e }), data) !== false) {
	                    that._onAdd(e, data);
	                }
	            });
	        },

	        _onPaste: function _onPaste(e) {
	            var items = e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.items,
	                data = { files: [] };
	            if (items && items.length) {
	                $.each(items, function (index, item) {
	                    var file = item.getAsFile && item.getAsFile();
	                    if (file) {
	                        data.files.push(file);
	                    }
	                });
	                if (this._trigger('paste', $.Event('paste', { delegatedEvent: e }), data) !== false) {
	                    this._onAdd(e, data);
	                }
	            }
	        },

	        _onDrop: function _onDrop(e) {
	            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
	            var that = this,
	                dataTransfer = e.dataTransfer,
	                data = {};
	            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
	                e.preventDefault();
	                this._getDroppedFiles(dataTransfer).always(function (files) {
	                    data.files = files;
	                    if (that._trigger('drop', $.Event('drop', { delegatedEvent: e }), data) !== false) {
	                        that._onAdd(e, data);
	                    }
	                });
	            }
	        },

	        _onDragOver: getDragHandler('dragover'),

	        _onDragEnter: getDragHandler('dragenter'),

	        _onDragLeave: getDragHandler('dragleave'),

	        _initEventHandlers: function _initEventHandlers() {
	            if (this._isXHRUpload(this.options)) {
	                this._on(this.options.dropZone, {
	                    dragover: this._onDragOver,
	                    drop: this._onDrop,
	                    // event.preventDefault() on dragenter is required for IE10+:
	                    dragenter: this._onDragEnter,
	                    // dragleave is not required, but added for completeness:
	                    dragleave: this._onDragLeave
	                });
	                this._on(this.options.pasteZone, {
	                    paste: this._onPaste
	                });
	            }
	            if ($.support.fileInput) {
	                this._on(this.options.fileInput, {
	                    change: this._onChange
	                });
	            }
	        },

	        _destroyEventHandlers: function _destroyEventHandlers() {
	            this._off(this.options.dropZone, 'dragenter dragleave dragover drop');
	            this._off(this.options.pasteZone, 'paste');
	            this._off(this.options.fileInput, 'change');
	        },

	        _setOption: function _setOption(key, value) {
	            var reinit = $.inArray(key, this._specialOptions) !== -1;
	            if (reinit) {
	                this._destroyEventHandlers();
	            }
	            this._super(key, value);
	            if (reinit) {
	                this._initSpecialOptions();
	                this._initEventHandlers();
	            }
	        },

	        _initSpecialOptions: function _initSpecialOptions() {
	            var options = this.options;
	            if (options.fileInput === undefined) {
	                options.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]');
	            } else if (!(options.fileInput instanceof $)) {
	                options.fileInput = $(options.fileInput);
	            }
	            if (!(options.dropZone instanceof $)) {
	                options.dropZone = $(options.dropZone);
	            }
	            if (!(options.pasteZone instanceof $)) {
	                options.pasteZone = $(options.pasteZone);
	            }
	        },

	        _getRegExp: function _getRegExp(str) {
	            var parts = str.split('/'),
	                modifiers = parts.pop();
	            parts.shift();
	            return new RegExp(parts.join('/'), modifiers);
	        },

	        _isRegExpOption: function _isRegExpOption(key, value) {
	            return key !== 'url' && $.type(value) === 'string' && /^\/.*\/[igm]{0,3}$/.test(value);
	        },

	        _initDataAttributes: function _initDataAttributes() {
	            var that = this,
	                options = this.options,
	                data = this.element.data();
	            // Initialize options set via HTML5 data-attributes:
	            $.each(this.element[0].attributes, function (index, attr) {
	                var key = attr.name.toLowerCase(),
	                    value;
	                if (/^data-/.test(key)) {
	                    // Convert hyphen-ated key to camelCase:
	                    key = key.slice(5).replace(/-[a-z]/g, function (str) {
	                        return str.charAt(1).toUpperCase();
	                    });
	                    value = data[key];
	                    if (that._isRegExpOption(key, value)) {
	                        value = that._getRegExp(value);
	                    }
	                    options[key] = value;
	                }
	            });
	        },

	        _create: function _create() {
	            this._initDataAttributes();
	            this._initSpecialOptions();
	            this._slots = [];
	            this._sequence = this._getXHRPromise(true);
	            this._sending = this._active = 0;
	            this._initProgressObject(this);
	            this._initEventHandlers();
	        },

	        // This method is exposed to the widget API and allows to query
	        // the number of active uploads:
	        active: function active() {
	            return this._active;
	        },

	        // This method is exposed to the widget API and allows to query
	        // the widget upload progress.
	        // It returns an object with loaded, total and bitrate properties
	        // for the running uploads:
	        progress: function progress() {
	            return this._progress;
	        },

	        // This method is exposed to the widget API and allows adding files
	        // using the fileupload API. The data parameter accepts an object which
	        // must have a files property and can contain additional options:
	        // .fileupload('add', {files: filesList});
	        add: function add(data) {
	            var that = this;
	            if (!data || this.options.disabled) {
	                return;
	            }
	            if (data.fileInput && !data.files) {
	                this._getFileInputFiles(data.fileInput).always(function (files) {
	                    data.files = files;
	                    that._onAdd(null, data);
	                });
	            } else {
	                data.files = $.makeArray(data.files);
	                this._onAdd(null, data);
	            }
	        },

	        // This method is exposed to the widget API and allows sending files
	        // using the fileupload API. The data parameter accepts an object which
	        // must have a files or fileInput property and can contain additional options:
	        // .fileupload('send', {files: filesList});
	        // The method returns a Promise object for the file upload call.
	        send: function send(data) {
	            if (data && !this.options.disabled) {
	                if (data.fileInput && !data.files) {
	                    var that = this,
	                        dfd = $.Deferred(),
	                        promise = dfd.promise(),
	                        jqXHR,
	                        aborted;
	                    promise.abort = function () {
	                        aborted = true;
	                        if (jqXHR) {
	                            return jqXHR.abort();
	                        }
	                        dfd.reject(null, 'abort', 'abort');
	                        return promise;
	                    };
	                    this._getFileInputFiles(data.fileInput).always(function (files) {
	                        if (aborted) {
	                            return;
	                        }
	                        if (!files.length) {
	                            dfd.reject();
	                            return;
	                        }
	                        data.files = files;
	                        jqXHR = that._onSend(null, data);
	                        jqXHR.then(function (result, textStatus, jqXHR) {
	                            dfd.resolve(result, textStatus, jqXHR);
	                        }, function (jqXHR, textStatus, errorThrown) {
	                            dfd.reject(jqXHR, textStatus, errorThrown);
	                        });
	                    });
	                    return this._enhancePromise(promise);
	                }
	                data.files = $.makeArray(data.files);
	                if (data.files.length) {
	                    return this._onSend(null, data);
	                }
	            }
	            return this._getXHRPromise(false, data && data.context);
	        }

	    });
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(10);

	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);

/***/ },
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */,
/* 12 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 14 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 15 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 18 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 19 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;