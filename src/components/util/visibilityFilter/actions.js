/**
 * Change visibilityFilter state
 */
export const resetFilter = (skipURLSwitch) => (dispatch, getState) =>
    dispatch({ type: 'RESET_FILTER', prevState: getState().visibilityFilter, skipURLSwitch });
export const changeFilter = (filter, key = 'category', skipURLSwitch) => dispatch =>
    dispatch({ type: 'CHANGE_FILTER', key, filter, skipURLSwitch });
export const toggleFilter = (filter, key = 'category', skipURLSwitch) => dispatch =>
    dispatch({ type: 'TOGGLE_FILTER', key, filter, skipURLSwitch });
export const selectLocation = province => dispatch =>
    dispatch({ type: 'SELECT_PROVINCE', province });

export const changeTerm = term => dispatch =>
    dispatch({ type: 'CHANGE_TERM', term });
