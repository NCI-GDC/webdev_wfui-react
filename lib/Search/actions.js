'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSearchResult = exports.getAutocomplete = undefined;

var _util = require('../util');

/**
 * Fetch autocomplete from database
 */
var getAutocomplete = exports.getAutocomplete = function getAutocomplete(config, _ref) {
    var _ref$keyword = _ref.keyword,
        keyword = _ref$keyword === undefined ? '' : _ref$keyword,
        _ref$typeInclude = _ref.typeInclude,
        typeInclude = _ref$typeInclude === undefined ? [] : _ref$typeInclude;
    return function (dispatch) {
        var req = (0, _util.wfuiFetch)('//' + (config.API_HOST || 'localhost') + (config.API_SEARCH || '/content/search'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'app-id': config.APP_ID
            },
            body: JSON.stringify({ type: 'facet', keyword: keyword, typeInclude: typeInclude }),
            requestId: 'getAutocomplete',
            credentials: 'include'
        }, dispatch);
        return req.promise.then(function (_ref2) {
            var res = _ref2.res,
                data = _ref2.data;

            if (res.ok) {
                dispatch({ type: 'RECEIVE_AUTOCOMPLETE', payload: data[0]['_text_'] });
                return Promise.resolve(data[0]);
            }
            return Promise.reject(res.statusText);
        }).catch(function (err) {
            console.log(err);
        });
    };
};

/**
 * Fetch search result from database
 */
var getSearchResult = exports.getSearchResult = function getSearchResult(config, _ref3) {
    var _ref3$keyword = _ref3.keyword,
        keyword = _ref3$keyword === undefined ? '' : _ref3$keyword,
        _ref3$typeInclude = _ref3.typeInclude,
        typeInclude = _ref3$typeInclude === undefined ? [] : _ref3$typeInclude,
        _ref3$keywordQuotes = _ref3.keywordQuotes,
        keywordQuotes = _ref3$keywordQuotes === undefined ? false : _ref3$keywordQuotes;
    return function (dispatch) {
        if (!keyword || !keyword.trim()) {
            dispatch({ type: 'RECEIVE_SEARCH', result: [], keyword: keyword });
        }
        var req = (0, _util.wfuiFetch)('//' + (config.API_HOST || 'localhost') + (config.API_SEARCH || '/content/search'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'app-id': config.APP_ID
            },
            body: JSON.stringify({ keyword: keyword.trim(), typeInclude: typeInclude, keywordQuotes: keywordQuotes }),
            requestId: 'getSearchResult',
            credentials: 'include'
        }, dispatch);
        return req.promise.then(function (_ref4) {
            var res = _ref4.res,
                data = _ref4.data;

            if (res.ok) {
                dispatch({ type: 'RECEIVE_SEARCH', results: data, keyword: keyword });
                return Promise.resolve(data);
            }
            return Promise.reject(res.statusText);
        }).catch(function (err) {
            console.log(err);
        });
    };
};