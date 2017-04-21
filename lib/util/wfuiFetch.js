'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Thsi wfuiFetch adds following features to native fetch function.
 * - Cancellable promise
 * - Added timeout
 * - Retry connecting when it's failed.
 * - Dispatch request states.
 * @param {string} input - Request url
 * @param {object} init - Request options.
 * @param {function} dispatch - dispatch function from redux.
 */
var wfuiFetch = exports.wfuiFetch = function wfuiFetch(input, init) {
    var dispatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (f) {
        return f;
    };

    var hasCanceled = false;
    var appId = init.headers && init.headers.app_id || 0;

    dispatch({ type: 'FETCH_REQUEST', requestId: init.requestId, appId: appId });
    var promise = new Promise(function (resolve, reject) {

        var fetchTimer = void 0;
        var timer5s = setTimeout(function () {
            dispatch({ type: 'FETCH_REQUEST_5S', requestId: init.requestId, appId: appId });
        }, 5000);
        var timer8s = setTimeout(function () {
            dispatch({ type: 'FETCH_REQUEST_8S', requestId: init.requestId, appId: appId });
        }, 8000);
        var timeout = setTimeout(function () {
            dispatch({ type: 'FETCH_REQUEST_TIMEOUT', requestId: init.requestId, appId: appId });
            reject('timeout');
            clearTimeout(fetchTimer);
        }, init.timeout || 300000);

        var wrappedFetch = function wrappedFetch(n) {
            global.fetch(input, init).then(function (response) {
                clearTimeout(timer5s);
                clearTimeout(timer8s);
                clearTimeout(timeout);
                if (response.ok) {
                    dispatch({ type: 'FETCH_SUCCESS', requestId: init.requestId, appId: appId });
                } else {
                    dispatch({ type: 'FETCH_FAILURE', requestId: init.requestId, statusText: response.statusText, appId: appId });
                }
                return hasCanceled ? reject({ isCanceled: true }) : resolve(response);
            }).catch(function (error) {
                if (n > 0) {
                    fetchTimer = setTimeout(function () {
                        console.log('Retry connecting to ' + input);
                        wrappedFetch(n - 1);
                    }, init.retryDelay || 3000);
                } else {
                    dispatch({ type: 'FETCH_RETRY_FAILURE', requestId: init.requestId, statusText: error.message, appId: appId });
                    return hasCanceled ? reject({ isCanceled: true }) : reject(error);
                }
            });
        };
        wrappedFetch(init.retryCount || 0);
    });
    return {
        promise: promise,
        abort: function abort() {
            hasCanceled = true;
        }
    };
};

/**
 * This reducer will add fetching state of specific API calles.
 * @param {Object} state - redux state.
 * @param {Object} action - redux payload
 * @param {string} requestId - Unique ID for each API request.
 */
var wfuiFetchReducer = exports.wfuiFetchReducer = function wfuiFetchReducer(state, action, requestId) {
    // Return if it's not object
    if (!(!!state && state.constructor === Object)) return state;
    // Return if it's not the same requestId.
    if (action.requestId !== requestId) return state;

    var _state = JSON.parse(JSON.stringify(state));
    if (!_state.fetch) _state.fetch = { isFetching: false, fetch5s: false, fetch8s: false, status: '', error: '', timeout: false, retried: false };

    switch (action.type) {
        case 'FETCH_REQUEST':
            _state.fetch.isFetching = true;
            _state.fetch.status = _state.fetch.error = '';
            _state.fetch.fetch5s = _state.fetch.fetch8s = _state.fetch.timeout = _state.fetch.retried;
            return _state;
        case 'FETCH_REQUEST_5S':
            _state.fetch.fetch5s = true;
            return _state;
        case 'FETCH_REQUEST_8S':
            _state.fetch.fetch8s = true;
            return _state;
        case 'FETCH_REQUEST_TIMEOUT':
            _state.fetch.isFetching = _state.fetch.fetch5s = _state.fetch.fetch8s = false;
            _state.fetch.status = 'fail';
            _state.fetch.timeout = true;
            return _state;
        case 'FETCH_SUCCESS':
            _state.fetch.isFetching = _state.fetch.fetch5s = _state.fetch.fetch8s = false;
            _state.fetch.status = 'success';
            return _state;
        case 'FETCH_FAILURE':
            _state.fetch.isFetching = _state.fetch.fetch5s = _state.fetch.fetch8s = false;
            _state.fetch.status = 'fail';
            _state.fetch.error = action.statusText;
            return _state;
        case 'FETCH_RETRY_FAILURE':
            _state.fetch.isFetching = _state.fetch.fetch5s = _state.fetch.fetch8s = false;
            _state.fetch.status = 'fail';
            _state.fetch.retried = true;
            return _state;
        default:
            return _state;
    }
};