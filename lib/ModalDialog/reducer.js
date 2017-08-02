'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Reducer for modal
 */
var modalReducer = exports.modalReducer = function modalReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var _state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'SHOW_MODAL':
            _state[action.key] = Object.assign({}, { show: true }, action.props);
            return _state;
        case 'HIDE_MODAL':
            _state[action.key] = { show: false };
            return _state;
        default:
            return state;
    }
};