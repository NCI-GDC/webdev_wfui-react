import { createSelector } from 'reselect';

const _modalsSelector = state => state.modals;
export const modalsSelector = key => (
    createSelector(
        _modalsSelector,
        modals => (modals && modals[key]),
    )
);
