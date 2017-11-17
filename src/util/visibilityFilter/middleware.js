/* global window */
import urlParse from 'url-parse';

const switchurl = state => {
    const flattenedState = Object.keys(state).reduce(
        (obj, key) =>
            Object.assign(
                {},
                obj,
                typeof state[key] === 'string'
                    ? { [key]: state[key] }
                    : state[key],
            ),
        {},
    );
    const parsedURL = urlParse(window.location.href.split('#/').pop(), true);
    const mergedQuery = Object.assign({}, parsedURL.query, flattenedState);
    const urlString = Object.keys(mergedQuery).reduce((s, k) => {
        if (mergedQuery[k]) {
            if (Array.isArray(mergedQuery[k])) {
                return mergedQuery[k].length ? `${s}&${k}=${encodeURI(mergedQuery[k].join(','))}` : s;
            }
            return `${s}&${k}=${encodeURI(mergedQuery[k])}`;
        }
        return s;
    }, '');

    if (window) {
        if (!window.location.origin) {
            // IE10
            window.location.origin =
                window.location.protocol +
                '//' +
                window.location.hostname +
                (window.location.port ? ':' + window.location.port : '');
        }
        window.location.replace(
            `${window.location.origin}${window.location
                .pathname}${window.location.hash.split('?')[0] ||
                '#/'}?${urlString}`,
        );
    }
};

// Middle ware
export const urlSwithcerMiddleware = store => next => action => {
    const result = next(action);
    switch (action.type) {
        case 'RESET_FILTER':
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
