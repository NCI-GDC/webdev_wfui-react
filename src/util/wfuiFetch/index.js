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
        const timer5s = setTimeout(() => { dispatch({ type: 'FETCH_REQUEST_5S', requestId: init.requestId, appId }); }, 5000);
        const timer8s = setTimeout(() => { dispatch({ type: 'FETCH_REQUEST_8S', requestId: init.requestId, appId }); }, 8000);
        const timeout = setTimeout(() => {
            dispatch({ type: 'FETCH_REQUEST_TIMEOUT', requestId: init.requestId, appId });
            reject('timeout');
            clearTimeout(fetchTimer);
        }, init.timeout || 300000);

        const wrappedFetch = (n) => {
            global.fetch(input, init)
            .then((response) => {
                clearTimeout(timer5s);
                clearTimeout(timer8s);
                clearTimeout(timeout);
                // Need to have more statement.
                if (response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        return response.json().then((data) => {
                            dispatch({ type: 'FETCH_SUCCESS', requestId: init.requestId, appId });
                            resolve({ res: response, data });
                        });
                    } else if (contentType && contentType.indexOf('text/') !== -1) {
                        return response.text().then((data) => {
                            dispatch({ type: 'FETCH_SUCCESS', requestId: init.requestId, appId });
                            resolve({ res: response, data });
                        });
                    } else {
                        return response.blob().then((data) => {
                            dispatch({ type: 'FETCH_SUCCESS', requestId: init.requestId, appId });
                            resolve({ res: response, data });
                        });
                    }
                } else {
                    dispatch({ type: 'FETCH_FAILURE', requestId: init.requestId, statusText: response.statusText, appId });
                }
                return hasCanceled ? reject({ isCanceled: true }) : resolve({ res: response });
            })
            .catch((error) => {
                if (n > 0) {
                fetchTimer = setTimeout(() => {
                    console.log(`Retry connecting to ${input}`);
                    wrappedFetch(n - 1);
                }, init.retryDelay || 3000);
                } else {
                    dispatch({ type: 'FETCH_RETRY_FAILURE', requestId: init.requestId, statusText: error.message, appId });
                    return hasCanceled ? reject({ isCanceled: true }) : reject(error);
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
