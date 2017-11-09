'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Reducer for Visibility Filter
 */
var defaultState = { category: {}, sort: { order: 'desc' }, term: { q: '' } };
var visibilityFilterReducer = exports.visibilityFilterReducer = function visibilityFilterReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    var _state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'RESET_FILTER':
            return defaultState;
        case 'REFYDRATE_FILTER':
            return action.visibilityFilter;
        case 'CHANGE_TERM':
            _state.term.q = action.term;
            return _state;
        case 'TOGGLE_FILTER':
            {
                if (!_state[action.key]) return _state;

                if (!_state[action.key][action.filter.key]) _state[action.key][action.filter.key] = [];
                var idx = _state[action.key][action.filter.key].indexOf(action.filter.value);
                if (idx !== -1) {
                    _state[action.key][action.filter.key].splice(idx, 1);
                    if (_state[action.key][action.filter.key].length === 0) delete _state[action.key][action.filter.key];
                } else {
                    _state[action.key][action.filter.key].push(action.filter.value);
                }
                return _state;
            }
        case 'CHANGE_FILTER':
            if (!_state[action.key]) return _state;
            action.filter.forEach(function (a) {
                _state[action.key][a.key] = a.value;
                // if (!a.value || a.value.length === 0) delete _state[action.key][a.key];
            });
            return _state;
        case 'SELECT_PROVINCE':
            _state.category = { province: [action.province] };
            return _state;
        default:
            return state;
    }
};