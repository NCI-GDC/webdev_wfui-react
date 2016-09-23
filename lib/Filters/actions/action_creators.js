'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var filter = exports.filter = function filter(_filter, value) {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: _filter,
        keyword: value
    };
};

var resetfilter = exports.resetfilter = function resetfilter(filter) {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: filter
    };
};