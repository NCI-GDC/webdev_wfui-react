/**
 * Reducer for modal
 */
export const modalReducer = (state = {}, action) => {
    const _state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'SHOW_MODAL':
            _state[action.key] = { show: true, ...action.props };
            return _state;
        case 'HIDE_MODAL':
            _state[action.key] = { show: false };
            return _state;
        default:
            return state;
    }
};
