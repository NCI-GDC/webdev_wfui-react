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

    dispatch({ type: 'FETCH_REQUEST', requestId: init.requestId });
    const promise = new Promise((resolve, reject) => {

        let fetchTimer;
        const timer5s = setTimeout(() => { dispatch({ type: 'FETCH_REQUEST_5S', requestId: init.requestId }); }, 5000);
        const timer8s = setTimeout(() => { dispatch({ type: 'FETCH_REQUEST_8S', requestId: init.requestId }); }, 8000);
        const timeout = setTimeout(() => {
            dispatch({ type: 'FETCH_REQUEST_TIMEOUT', requestId: init.requestId });
            reject('timeout');
            clearTimeout(fetchTimer);
        }, init.timeout || 300000);

        const wrappedFetch = (n) => {
            global.fetch(input, init)
            .then((response) => {
                clearTimeout(timer5s);
                clearTimeout(timer8s);
                clearTimeout(timeout);
                if (response.ok) {
                    dispatch({ type: 'FETCH_SUCCESS', requestId: init.requestId });
                } else {
                    dispatch({ type: 'FETCH_FAILURE', requestId: init.requestId, statusText: response.statusText });
                }
                return hasCanceled ? reject({ isCanceled: true }) : resolve(response);
            })
            .catch((error) => {
                if (n > 0) {
                fetchTimer = setTimeout(() => {
                    console.log(`Retry connecting to ${input}`);
                    wrappedFetch(n - 1);
                }, init.retryDelay || 3000);
                } else {
                    dispatch({ type: 'FETCH_RETRY_FAILURE', requestId: init.requestId, statusText: error.message });
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


/**
 * This reducer will add fetching state of specific API calles.
 * @param {Object} state - redux state.
 * @param {Object} action - redux payload
 * @param {string} requestId - Unique ID for each API request.
 */
export const wfuiFetchReducer = (state, action, requestId) => {
    // Return if it's not object
    if (!((!!state) && (state.constructor === Object))) return state;
    // Return if it's not the same requestId.
    if (action.requestId !== requestId) return state;

    const _state = JSON.parse(JSON.stringify(state));
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
        default :
            return _state;
    }
}
