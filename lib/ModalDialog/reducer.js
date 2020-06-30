function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Reducer for modal
 */
export var modalReducer = function modalReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  var _state = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case 'SHOW_MODAL':
      _state[action.key] = _extends({
        show: true
      }, action.props);
      return _state;

    case 'HIDE_MODAL':
      _state[action.key] = {
        show: false
      };
      return _state;

    default:
      return state;
  }
};