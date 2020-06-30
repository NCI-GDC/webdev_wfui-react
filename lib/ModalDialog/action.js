export var showModal = function showModal(key, props) {
  return function (dispatch) {
    return dispatch({
      type: 'SHOW_MODAL',
      key: key,
      props: props
    });
  };
};
export var hideModal = function hideModal(key) {
  return function (dispatch) {
    return dispatch({
      type: 'HIDE_MODAL',
      key: key
    });
  };
};