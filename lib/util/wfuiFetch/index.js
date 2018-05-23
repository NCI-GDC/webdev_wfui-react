'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reducer = require('./reducer');

Object.keys(_reducer).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _reducer[key];
        }
    });
});

var _selectors = require('./selectors');

Object.keys(_selectors).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _selectors[key];
        }
    });
});

var _utils = require('./utils');

Object.keys(_utils).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _utils[key];
        }
    });
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
            dispatch({
                type: 'FETCH_REQUEST_5S',
                requestId: init.requestId,
                appId: appId
            });
        }, 5000);
        var timer8s = setTimeout(function () {
            dispatch({
                type: 'FETCH_REQUEST_8S',
                requestId: init.requestId,
                appId: appId
            });
        }, 8000);
        var timeout = setTimeout(function () {
            dispatch({
                type: 'FETCH_REQUEST_TIMEOUT',
                requestId: init.requestId,
                appId: appId
            });
            reject('timeout');
            clearTimeout(fetchTimer);
        }, init.timeout || 300000);

        // Add no-cache to header
        var _init = JSON.parse(JSON.stringify(init));
        if (!_init.headers) _init.header = {};
        _init.headers = Object.assign({}, _init.headers, {
            pragma: 'no-cache',
            'cache-control': 'no-cache'
        });

        var wrappedFetch = function wrappedFetch(n) {
            global.fetch(input, _init).then(function (response) {
                clearTimeout(timer5s);
                clearTimeout(timer8s);
                clearTimeout(timeout);

                if (hasCanceled) return reject({ isCanceled: true });

                var contentType = response.headers.get('content-type');

                // Need to have more statement.
                if (response.ok) {
                    var processData = function processData(data) {
                        dispatch({
                            type: 'RECEIVE_FETCH_DATA',
                            requestId: init.requestId,
                            appId: appId,
                            data: data
                        });
                        dispatch({
                            type: 'FETCH_SUCCESS',
                            requestId: init.requestId,
                            appId: appId,
                            data: data
                        });
                        resolve({ res: response, data: data });
                    };

                    if (
                    // JSON
                    contentType && contentType.indexOf('application/json') !== -1) {
                        return response.json().then(processData);
                    } else if (
                    // Text
                    contentType && contentType.indexOf('text/') !== -1) {
                        return response.text().then(processData);
                    }
                    // Blob
                    response.blob().then(processData);
                } else {
                    // JSON
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        return response.json().then(function (data) {
                            var statusText = data;
                            var parsedData = {};
                            if (!statusText.type) {
                                var orig = Object.keys(statusText).filter(function (key) {
                                    return !statusText[key].ok;
                                }) // only failed ones.
                                .map(function (key) {
                                    var obj = statusText[key];
                                    if (!statusText.type && obj.data.type) {
                                        statusText.type = obj.data.type; // set error type.
                                    }
                                    return Object.assign({}, obj, {
                                        key: key
                                    });
                                });

                                parsedData = {
                                    orig: orig,
                                    keys: Object.keys(statusText).filter(function (key) {
                                        return !statusText[key].ok;
                                    }).join(', ')
                                };
                            }
                            dispatch({
                                type: 'FETCH_FAILURE',
                                requestId: init.requestId,
                                statusText: statusText,
                                data: parsedData,
                                appId: appId
                            });
                            resolve({ res: response, data: statusText });
                        });
                    }

                    // Text
                    return response.text().then(function (data) {
                        var statusText = data;
                        try {
                            statusText = JSON.parse(data);
                        } catch (e) {
                            /**/
                        }
                        dispatch({
                            type: 'FETCH_FAILURE',
                            requestId: init.requestId,
                            statusText: statusText,
                            appId: appId
                        });
                        resolve({ res: response, data: statusText });
                    });
                }
            }).catch(function (error) {
                if (n > 0) {
                    fetchTimer = setTimeout(function () {
                        console.log('Retry connecting to ' + input);
                        wrappedFetch(n - 1);
                    }, init.retryDelay || 3000);
                } else {
                    dispatch({
                        type: 'FETCH_RETRY_FAILURE',
                        requestId: init.requestId,
                        statusText: error.message,
                        appId: appId
                    });
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