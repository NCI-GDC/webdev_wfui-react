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
                if (response.ok) {
                    dispatch({ type: 'FETCH_SUCCESS', requestId: init.requestId, appId });
                } else {
                    dispatch({ type: 'FETCH_FAILURE', requestId: init.requestId, statusText: response.statusText, appId });
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

/**
 * This reducer will add fetching state of specific API calles.
 * @param {Object} state - redux state.
 * @param {Object} action - redux payload
 */
export const fetchReducer = (state = {}, action) => {

    // Return if request Id doesn't exist
    if (!action.requestId) return state;

    const _state = JSON.parse(JSON.stringify(state));

    if (!_state[action.requestId]) _state[action.requestId] = { isFetching: false, fetch5s: false, fetch8s: false, status: '', error: '', timeout: false, retried: false, lastUpdated: false };
    const lastUpdate = new Date().getTime();
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
        default :
            return _state;
    }
};