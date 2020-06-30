import { createSelector } from 'reselect';

const _fetchSelector = state => state.fetch;

export const fetchSelector = requestId =>
    createSelector(
        _fetchSelector,
        fetch => {
            if (fetch) {
                return fetch[requestId];
            }
            console.error(
                "fetch state doesn't exist. Check if you properly set fetchReducer."
            );
            return undefined;
        }
    );
