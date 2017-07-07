'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.urlSwithcerMiddleware = undefined;

var _url = require('../url');

var switchurl = function switchurl(state) {
    var category = state.category,
        show = state.show,
        sort = state.sort,
        term = state.term;


    var urlString = '';
    var mode = (0, _url.getParameterByName)('mode');
    if (mode) {
        urlString += '&mode=' + mode;
    }
    if (category && Object.keys(category).length > 0) {
        Object.keys(category).forEach(function (key) {
            urlString += '&' + key + '=' + encodeURI(category[key].join(','));
        });
    }
    if (show && Object.keys(show).length > 0) {
        urlString += Object.keys(show).map(function (key) {
            return '&' + key + '=' + show[key];
        }).join('');
    }
    if (sort && Object.keys(sort).length > 0) {
        urlString += Object.keys(sort).map(function (key) {
            return '&' + key + '=' + sort[key];
        }).join('');
    }
    if (term && term.q && term.q.length > 0) {
        urlString += '&q=' + encodeURI(term.q);
    }
    if ((0, _url.getParameterByName)('pager')) {
        urlString += '&pager=true';
    }

    if (window) {
        if (!window.location.origin) {
            // IE10
            window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
        window.location.replace('' + window.location.origin + window.location.pathname + '#/?' + urlString);
    }
};

// Middle ware
/* global window */
var urlSwithcerMiddleware = exports.urlSwithcerMiddleware = function urlSwithcerMiddleware(store) {
    return function (next) {
        return function (action) {
            var result = next(action);
            switch (action.type) {
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