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
export const wfuiFetch = (input, init, dispatch = f => f) => {
    let hasCanceled = false;
    const appId = (init.headers && init.headers['app-id']) || 0;

    dispatch({ type: 'FETCH_REQUEST', requestId: init.requestId, appId });
    const promise = new Promise((resolve, reject) => {
        let fetchTimer;
        const timer5s = setTimeout(() => {
            dispatch({
                type: 'FETCH_REQUEST_5S',
                requestId: init.requestId,
                appId,
            });
        }, 5000);
        const timer8s = setTimeout(() => {
            dispatch({
                type: 'FETCH_REQUEST_8S',
                requestId: init.requestId,
                appId,
            });
        }, 8000);
        const timeout = setTimeout(() => {
            dispatch({
                type: 'FETCH_REQUEST_TIMEOUT',
                requestId: init.requestId,
                appId,
            });
            reject('timeout');
            clearTimeout(fetchTimer);
        }, init.timeout || 300000);

        // Add no-cache to header
        const _init = JSON.parse(JSON.stringify(init));
        if (!_init.headers) _init.header = {};
        _init.headers = Object.assign({}, _init.headers, {
            pragma: 'no-cache',
            'cache-control': 'no-cache',
        });

        const wrappedFetch = (n) => {
            global
                .fetch(input, _init)
                .then((response) => {
                    clearTimeout(timer5s);
                    clearTimeout(timer8s);
                    clearTimeout(timeout);

                    if (hasCanceled) return reject({ isCanceled: true });

                    const contentType = response.headers.get('content-type');

                    const resetData = (requestId) => {
                        // Need to be tested well
                        // dispatch({
                        //     type: 'FETCH_DATA_RESET',
                        //     requestId,
                        //     appId,
                        // });
                    };

                    // Need to have more statement.
                    if (response.ok) {
                        const processData = (data) => {
                            dispatch({
                                type: 'RECEIVE_FETCH_DATA',
                                requestId: init.requestId,
                                appId,
                                data,
                            });
                            dispatch({
                                type: 'FETCH_SUCCESS',
                                requestId: init.requestId,
                                appId,
                                data,
                            });
                            resetData(init.requestId);
                            resolve({ res: response, data });
                        };

                        if (
                            // JSON
                            contentType &&
                            contentType.indexOf('application/json') !== -1
                        ) {
                            return response.json().then(processData);
                        } else if (
                            // Text
                            contentType &&
                            contentType.indexOf('text/') !== -1
                        ) {
                            return response.text().then(processData);
                        }
                        // Blob
                        response.blob().then(processData);
                    } else {
                        // JSON
                        if (
                            contentType &&
                            contentType.indexOf('application/json') !== -1
                        ) {
                            return response.json().then((data) => {
                                const statusText = data;
                                let parsedData = {};
                                if (!statusText.type) {
                                    const keys = Object.keys(statusText).filter(key => !statusText[key].ok).join(', ');
                                    const orig = Object.keys(statusText)
                                        .filter(key => !statusText[key].ok) // only failed ones.
                                        .map((key) => {
                                            const obj = statusText[key];
                                            if (
                                                !statusText.type &&
                                                obj.data.type
                                            ) {
                                                statusText.type = obj.data.type; // set error type.
                                            }
                                            return Object.assign({}, obj, {
                                                key,
                                            });
                                        });

                                    parsedData = {
                                        orig,
                                        keys,
                                    };
                                }
                                dispatch({
                                    type: 'FETCH_FAILURE',
                                    requestId: init.requestId,
                                    statusText,
                                    data: parsedData,
                                    appId,
                                });
                                resetData(init.requestId);
                                resolve({ res: response, data: statusText });
                            });
                        }

                        // Text
                        return response.text().then((data) => {
                            let statusText = data;
                            try {
                                statusText = JSON.parse(data);
                            } catch (e) {
                                /**/
                            }
                            dispatch({
                                type: 'FETCH_FAILURE',
                                requestId: init.requestId,
                                statusText,
                                appId,
                            });
                            resolve({ res: response, data: statusText });
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    if (n > 0) {
                        fetchTimer = setTimeout(() => {
                            console.log(`Retry connecting to ${input}`);
                            wrappedFetch(n - 1);
                        }, init.retryDelay || 3000);
                    } else {
                        dispatch({
                            type: 'FETCH_RETRY_FAILURE',
                            requestId: init.requestId,
                            statusText: error.message,
                            appId,
                        });
                        return hasCanceled
                            ? reject({ isCanceled: true })
                            : reject(error);
                    }
                });
        };
        wrappedFetch(init.retryCount || 0);
    });
    return {
        promise,
        abort() {
            hasCanceled = true;
        },
    };
};

export * from './reducer';
export * from './selectors';
export * from './utils';
