'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Change visibilityFilter state
 */
var resetFilter = exports.resetFilter = function resetFilter() {
    return function (dispatch) {
        return dispatch({ type: 'RESET_FILTER' });
    };
};
var changeFilter = exports.changeFilter = function changeFilter(filter) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'category';
    return function (dispatch) {
        return dispatch({ type: 'CHANGE_FILTER', key: key, filter: filter });
    };
};
var toggleFilter = exports.toggleFilter = function toggleFilter(filter) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'category';
    return function (dispatch) {
        return dispatch({ type: 'TOGGLE_FILTER', key: key, filter: filter });
    };
};
var selectLocation = exports.selectLocation = function selectLocation(province) {
    return function (dispatch) {
        return dispatch({ type: 'SELECT_PROVINCE', province: province });
    };
};

var changeTerm = exports.changeTerm = function changeTerm(term) {
    return function (dispatch) {
        return dispatch({ type: 'CHANGE_TERM', term: term });
    };
};