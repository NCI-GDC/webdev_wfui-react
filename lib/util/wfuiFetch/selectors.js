import { createSelector } from 'reselect';

var _fetchSelector = function _fetchSelector(state) {
  return state.fetch;
};

export var fetchSelector = function fetchSelector(requestId) {
  return createSelector(_fetchSelector, function (fetch) {
    if (fetch) {
      return fetch[requestId];
    }

    console.error("fetch state doesn't exist. Check if you properly set fetchReducer.");
    return undefined;
  });
};