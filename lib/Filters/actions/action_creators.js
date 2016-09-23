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

var resetFilter = exports.resetFilter = function resetFilter() {
    return {
        type: 'RESET_VISIBILITY_FILTER'
    };
};