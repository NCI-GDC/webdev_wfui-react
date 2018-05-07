/**
 * Change visibilityFilter state
 */
export const resetFilter = () => (dispatch, getState) =>
    dispatch({ type: 'RESET_FILTER', prevState: getState().visibilityFilter });
export const changeFilter = (filter, key = 'category') => dispatch =>
    dispatch({ type: 'CHANGE_FILTER', key, filter });
export const toggleFilter = (filter, key = 'category') => dispatch =>
    dispatch({ type: 'TOGGLE_FILTER', key, filter });
export const selectLocation = province => dispatch =>
    dispatch({ type: 'SELECT_PROVINCE', province });

export const changeTerm = term => dispatch =>
    dispatch({ type: 'CHANGE_TERM', term });
