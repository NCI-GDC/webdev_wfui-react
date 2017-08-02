'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var showModal = exports.showModal = function showModal(key, props) {
    return function (dispatch) {
        return dispatch({ type: 'SHOW_MODAL', key: key, props: props });
    };
};

var hideModal = exports.hideModal = function hideModal(key) {
    return function (dispatch) {
        return dispatch({ type: 'HIDE_MODAL', key: key });
    };
};