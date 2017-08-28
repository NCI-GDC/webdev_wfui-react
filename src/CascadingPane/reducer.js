/**
 * Reducer for Cascading Pane
 */

const defaultState = { navData: [], mainData: [], subData: {} };
export const cascadingPaneReducer = (state = defaultState, action) => {
    let _state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'RECEIVE_CASCADING_MENU':
            _state.navData = action.payload;
            return _state;
        case 'RECEIVE_CASCADING_MAINVIEW':
            _state.mainData = action.payload;
            return _state;
        case 'RECEIVE_CASCADING_SUBVIEW':
            _state.subData = action.payload;
            return _state;
        default:
            return state;
    }
};
