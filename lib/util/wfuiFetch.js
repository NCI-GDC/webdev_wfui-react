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
    var appId = init.headers && init.headers['app-id'] || 0;

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
 */
var fetchReducer = exports.fetchReducer = function fetchReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];


    // Return if request Id doesn't exist
    if (!action.requestId) return state;

    var _state = JSON.parse(JSON.stringify(state));

    if (!_state[action.requestId]) _state[action.requestId] = { isFetching: false, fetch5s: false, fetch8s: false, status: '', error: '', timeout: false, retried: false, lastUpdated: false };
    var lastUpdate = new Date().getTime();
    switch (action.type) {
        case 'FETCH_INIT':
            _state[action.requestId].status = _state[action.requestId].error = '';
            _state[action.requestId].isFetching = _state[action.requestId].fetch5s = _state[action.requestId].fetch8s = _state[action.requestId].timeout = _state[action.requestId].retried = false;
            _state[action.requestId].lastUpdated = lastUpdate;
            return _state;
        case 'FETCH_REQUEST':
            _state[action.requestId].isFetching = true;
            _state[action.requestId].status = _state[action.requestId].error = '';
            _state[action.requestId].fetch5s = _state[action.requestId].fetch8s = _state[action.requestId].timeout = _state[action.requestId].retried = false;
            _state[action.requestId].lastUpdated = lastUpdate;
            return _state;
        case 'FETCH_REQUEST_5S':
            _state[action.requestId].fetch5s = true;
            _state[action.requestId].lastUpdated = lastUpdate;
            return _state;
        case 'FETCH_REQUEST_8S':
            _state[action.requestId].fetch8s = true;
            _state[action.requestId].lastUpdated = lastUpdate;
            return _state;
        case 'FETCH_REQUEST_TIMEOUT':
            _state[action.requestId].isFetching = _state[action.requestId].fetch5s = _state[action.requestId].fetch8s = false;
            _state[action.requestId].status = 'fail';
            _state[action.requestId].timeout = true;
            _state[action.requestId].lastUpdated = lastUpdate;
            return _state;
        case 'FETCH_SUCCESS':
            _state[action.requestId].isFetching = _state[action.requestId].fetch5s = _state[action.requestId].fetch8s = false;
            _state[action.requestId].status = 'success';
            _state[action.requestId].lastUpdated = lastUpdate;
            return _state;
        case 'FETCH_FAILURE':
            _state[action.requestId].isFetching = _state[action.requestId].fetch5s = _state[action.requestId].fetch8s = false;
            _state[action.requestId].status = 'fail';
            _state[action.requestId].error = action.statusText;
            _state[action.requestId].lastUpdated = lastUpdate;
            return _state;
        case 'FETCH_RETRY_FAILURE':
            _state[action.requestId].isFetching = _state[action.requestId].fetch5s = _state[action.requestId].fetch8s = false;
            _state[action.requestId].status = 'fail';
            _state[action.requestId].retried = true;
            _state[action.requestId].lastUpdated = lastUpdate;
            return _state;
        default:
            return _state;
    }
};