/**
 * Change visibilityFilter state
 */
export var resetFilter = function resetFilter() {
  return function (dispatch, getState) {
    return dispatch({
      type: 'RESET_FILTER',
      prevState: getState().visibilityFilter
    });
  };
};
export var changeFilter = function changeFilter(filter) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'category';
  return function (dispatch) {
    return dispatch({
      type: 'CHANGE_FILTER',
      key: key,
      filter: filter
    });
  };
};
export var toggleFilter = function toggleFilter(filter) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'category';
  return function (dispatch) {
    return dispatch({
      type: 'TOGGLE_FILTER',
      key: key,
      filter: filter
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