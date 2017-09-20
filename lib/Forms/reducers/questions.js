'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Reducer for entire structore, including variables.
 */
var questionsReducer = exports.questionsReducer = function questionsReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case 'RECEIVE_FETCH_DATA':
            if (action.requestId === 'getForm') {
                return action.data.sections || state;
            }
            return state;
        default:
            return state;
    }
};