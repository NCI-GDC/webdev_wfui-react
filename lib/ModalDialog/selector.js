import { createSelector } from 'reselect';

var _modalsSelector = function _modalsSelector(state) {
  return state.modals;
};

export var modalsSelector = function modalsSelector(key) {
  return createSelector(_modalsSelector, function (modals) {
    return modals && modals[key];
  });
};