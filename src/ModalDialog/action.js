export const showModal = (key, props) => (
    dispatch => dispatch({ type: 'SHOW_MODAL', key, props })
);

export const hideModal = key => (
    dispatch => dispatch({ type: 'HIDE_MODAL', key })
);
