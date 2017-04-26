import { createSelector } from 'reselect';

const _fetchSelector = state => state.fetch;

export const fetchSelector = requestId => (
    createSelector(
        _fetchSelector,
        fetch => (fetch[requestId]),
    )
);
