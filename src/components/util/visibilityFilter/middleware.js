/* global window */
import urlParse from 'url-parse';
import merge from 'deepmerge';

const switchurl = state => {
    const flattenedState = Object.keys(state).reduce(
        (obj, key) =>
            ({
                
                ...obj,
                ...(typeof state[key] === 'string'
                    ? { [key]: state[key] }
                    : state[key])
            }),
        {}
    );
    const parsedURL = urlParse(window.location.href.split('#/').pop(), true);
    const mergedQuery = { ...parsedURL.query, ...flattenedState };
    const urlString = Object.keys(mergedQuery).reduce((s, k) => {
        if (mergedQuery[k]) {
            if (Array.isArray(mergedQuery[k])) {
                return mergedQuery[k].length
                    ? `${s}&${k}=${encodeURIComponent(
                          mergedQuery[k].join(',')
                      )}`
                    : s;
            }
            return `${s}&${k}=${encodeURIComponent(mergedQuery[k])}`;
        }
        return s;
    }, '');

    if (window) {
        if (!window.location.origin) {
            // IE10
            window.location.origin = `${window.location.protocol}//${
                window.location.hostname
            }${window.location.port ? `:${window.location.port}` : ''}`;
        }
        window.location.replace(
            `${window.location.origin}${
                window.location.pathname
            }${window.location.hash.split('?')[0] || '#/'}?${urlString}`
        );
    }
};

const resetObject = obj => {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            obj[key] = resetObject(obj[key]);
        } else {
            obj[key] = '';
        }
    });
    return obj;
};

// Middle ware
export const urlSwithcerMiddleware = store => next => action => {
    const result = next(action);
    switch (action.type) {
        case 'RESET_FILTER':
            // This logic will ensure to reset all values that are set to visibility filter.
            const resetCurrentState = resetObject(action.prevState);
            const merged = merge.all([
                resetCurrentState, // Nullified current filter
                store.getState().visibilityFilter, // Default state.
            ]);
            switchurl(merged);
            return result;
        case 'REFYDRATE_FILTER':
        case 'CHANGE_FILTER':
        case 'TOGGLE_FILTER':
        case 'CHANGE_TERM':
            switchurl(store.getState().visibilityFilter);
            return result;
        default:
            return result;
    }
};
