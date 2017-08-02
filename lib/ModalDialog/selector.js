'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modalsSelector = undefined;

var _reselect = require('reselect');

var _modalsSelector = function _modalsSelector(state) {
    return state.modals;
};
var modalsSelector = exports.modalsSelector = function modalsSelector(key) {
    return (0, _reselect.createSelector)(_modalsSelector, function (modals) {
        return modals[key];
    });
};