function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* global window */
import urlParse from 'url-parse';
import merge from 'deepmerge';

var switchurl = function switchurl(state) {
  var flattenedState = Object.keys(state).reduce(function (obj, key) {
    return _extends({}, obj, {}, typeof state[key] === 'string' ? _defineProperty({}, key, state[key]) : state[key]);
  }, {});
  var parsedURL = urlParse(window.location.href.split('#/').pop(), true);

  var mergedQuery = _extends({}, parsedURL.query, {}, flattenedState);

  var urlString = Object.keys(mergedQuery).reduce(function (s, k) {
    if (mergedQuery[k]) {
      if (Array.isArray(mergedQuery[k])) {
        return mergedQuery[k].length ? "".concat(s, "&").concat(k, "=").concat(encodeURIComponent(mergedQuery[k].join(','))) : s;
      }

      return "".concat(s, "&").concat(k, "=").concat(encodeURIComponent(mergedQuery[k]));
    }

    return s;
  }, '');

  if (window) {
    if (!window.location.origin) {
      // IE10
      window.location.origin = "".concat(window.location.protocol, "//").concat(window.location.hostname).concat(window.location.port ? ":".concat(window.location.port) : '');
    }

    window.location.replace("".concat(window.location.origin).concat(window.location.pathname).concat(window.location.hash.split('?')[0] || '#/', "?").concat(urlString));
  }
};

var resetObject = function resetObject(obj) {
  Object.keys(obj).forEach(function (key) {
    if (_typeof(obj[key]) === 'object' && obj[key] !== null) {
      obj[key] = resetObject(obj[key]);
    } else {
      obj[key] = '';
    }
  });
  return obj;
}; // Middle ware


export var urlSwithcerMiddleware = function urlSwithcerMiddleware(store) {
  return function (next) {
    return function (action) {
      var result = next(action);

      switch (action.type) {
        case 'RESET_FILTER':
          // This logic will ensure to reset all values that are set to visibility filter.
          var resetCurrentState = resetObject(action.prevState);
          var merged = merge.all([resetCurrentState, // Nullified current filter
          store.getState().visibilityFilter // Default state.
          ]);

          if (!action.skipURLSwitch) {
            switchurl(merged);
          }

          return result;

        case 'REFYDRATE_FILTER':
        case 'CHANGE_FILTER':
        case 'TOGGLE_FILTER':
        case 'CHANGE_TERM':
          if (!action.skipURLSwitch) {
            switchurl(store.getState().visibilityFilter);
          }

          return result;

        default:
          return result;
      }
    };
  };
};