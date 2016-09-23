'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Reducer for visibility filter
 */
var visibilityFilterReducer = function visibilityFilterReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? { pageFilter: 1 } : arguments[0];
    var action = arguments[1];

    switch (action.type) {

        case 'SET_VISIBILITY_FILTER':
            var newState = JSON.parse(JSON.stringify(state));
            if (typeof action.checked == 'undefined') {
                newState[action.filter] = action.keyword;
            } else {
                newState[action.filter][action.keyword] = action.checked;
            }
            return newState;

        case 'RESET_VISIBILITY_FILTER':
            var newState = JSON.parse(JSON.stringify(state));
            Object.keys(newState).map(function (key, i) {
                newState[key] = "";
            });
            return newState;

    }
    return state;
};
exports.default = visibilityFilterReducer;