'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.urlSwithcerMiddleware = undefined;

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* global window */


var switchurl = function switchurl(state) {
    var flattenedState = Object.keys(state).reduce(function (obj, key) {
        return Object.assign({}, obj, typeof state[key] === 'string' ? _defineProperty({}, key, state[key]) : state[key]);
    }, {});
    var parsedURL = (0, _urlParse2.default)(window.location.href.split('#/').pop(), true);
    var mergedQuery = Object.assign({}, parsedURL.query, flattenedState);
    var urlString = Object.keys(mergedQuery).reduce(function (s, k) {
        if (mergedQuery[k]) {
            return s + '&' + k + '=' + encodeURI(Array.isArray(mergedQuery[k]) ? mergedQuery[k].join(',') : mergedQuery[k]);
        }
        return s;
    }, '');

    if (window) {
        if (!window.location.origin) {
            // IE10
            window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
        window.location.replace('' + window.location.origin + window.location.pathname + (window.location.hash.split('?')[0] || '#/') + '?' + urlString);
    }
};

// Middle ware
var urlSwithcerMiddleware = exports.urlSwithcerMiddleware = function urlSwithcerMiddleware(store) {
    return function (next) {
        return function (action) {
            var result = next(action);
            switch (action.type) {
                case 'RESET_FILTER':
                case 'REFYDRATE_FILTER':
                case 'CHANGE_FILTER':
                case 'TOGGLE_FILTER':
                case 'CHANGE_TERM':
                    switchurl(store.getState().visibilityFilter);
                    return result;
                default:
                    return result;
            }
        };
    };
};