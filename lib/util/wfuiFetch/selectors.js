'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchSelector = undefined;

var _reselect = require('reselect');

var _fetchSelector = function _fetchSelector(state) {
    return state.fetch;
};

var fetchSelector = exports.fetchSelector = function fetchSelector(requestId) {
    return (0, _reselect.createSelector)(_fetchSelector, function (fetch) {
        if (fetch) {
            return fetch[requestId];
        } else {
            console.error('fetch state doesn\'t exist. Check if you properly set fetchReducer.');
            return undefined;
        }
    });
};