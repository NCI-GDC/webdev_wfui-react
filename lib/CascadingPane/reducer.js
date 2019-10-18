/**
 * Reducer for Cascading Pane
 */
var defaultState = {
  navData: [],
  mainData: [],
  subData: {}
};
export var cascadingPaneReducer = function cascadingPaneReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  var _state = JSON.parse(JSON.stringify(state));

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