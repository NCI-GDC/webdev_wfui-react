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
            _state[action.requestId].data = undefined;
            _state[action.requestId].requestId = action.requestId;
            return _state;
        case 'FETCH_REQUEST':
            _state[action.requestId].isFetching = true;
            _state[action.requestId].status = _state[action.requestId].error = '';
            _state[action.requestId].fetch5s = _state[action.requestId].fetch8s = _state[action.requestId].timeout = _state[action.requestId].retried = false;
            _state[action.requestId].lastUpdated = lastUpdate;
            _state[action.requestId].data = undefined;
            _state[action.requestId].requestId = action.requestId;
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
            _state[action.requestId].data = action.data;
            return _state;
        case 'FETCH_FAILURE':
            _state[action.requestId].isFetching = _state[action.requestId].fetch5s = _state[action.requestId].fetch8s = false;
            _state[action.requestId].status = 'fail';
            _state[action.requestId].data = action.data || {};
            _state[action.requestId].error = action.statusText;
            _state[action.requestId].lastUpdated = lastUpdate;
            return _state;
        case 'FETCH_RETRY_FAILURE':
            _state[action.requestId].isFetching = _state[action.requestId].fetch5s = _state[action.requestId].fetch8s = false;
            _state[action.requestId].status = 'fail';
            _state[action.requestId].data = action.data || {};
            _state[action.requestId].error = action.statusText;
            _state[action.requestId].retried = true;
            _state[action.requestId].lastUpdated = lastUpdate;
            return _state;
        case 'FETCH_DATA_RESET':
            _state[action.requestId].data = undefined;
            return _state;
        default :
            return _state;
    }
};