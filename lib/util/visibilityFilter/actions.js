/**
 * Change visibilityFilter state
 */
export var resetFilter = function resetFilter(skipURLSwitch) {
  return function (dispatch, getState) {
    return dispatch({
      type: 'RESET_FILTER',
      prevState: getState().visibilityFilter,
      skipURLSwitch: skipURLSwitch
    });
  };
};
export var changeFilter = function changeFilter(filter) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'category';
  var skipURLSwitch = arguments.length > 2 ? arguments[2] : undefined;
  return function (dispatch) {
    return dispatch({
      type: 'CHANGE_FILTER',
      key: key,
      filter: filter,
      skipURLSwitch: skipURLSwitch
    });
  };
};
export var toggleFilter = function toggleFilter(filter) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'category';
  var skipURLSwitch = arguments.length > 2 ? arguments[2] : undefined;
  return function (dispatch) {
    return dispatch({
      type: 'TOGGLE_FILTER',
      key: key,
      filter: filter,
      skipURLSwitch: skipURLSwitch
    });
  };
};
export var selectLocation = function selectLocation(province) {
  return function (dispatch) {
    return dispatch({
      type: 'SELECT_PROVINCE',
      province: province
    });
  };
};
export var changeTerm = function changeTerm(term) {
  return function (dispatch) {
    return dispatch({
      type: 'CHANGE_TERM',
      term: term
    });
  };
};