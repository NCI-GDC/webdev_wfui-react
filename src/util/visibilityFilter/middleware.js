/* global window */
import { getParameterByName } from '../url';

const switchurl = (state) => {
    const { category, show, sort, term } = state;

    let urlString = '';
    const mode = getParameterByName('mode');
    if (mode) {
        urlString += `&mode=${mode}`;
    }
    if (category && Object.keys(category).length > 0) {
        Object.keys(category).forEach((key) => {
            urlString += `&${key}=${encodeURI(category[key].join(','))}`;
        });
    }
    if (show && Object.keys(show).length > 0) {
        urlString += Object.keys(show).map(key => (`&${key}=${show[key]}`)).join('');
    }
    if (sort && Object.keys(sort).length > 0) {
        urlString += Object.keys(sort).map(key => (`&${key}=${sort[key]}`)).join('');
    }
    if (term && term.q && term.q.length > 0) {
        urlString += `&q=${encodeURI(term.q)}`;
    }
    if (getParameterByName('pager')) {
        urlString += '&pager=true';
    }

    if (window) {
        if (!window.location.origin) { // IE10
           window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        window.location.replace(`${window.location.origin}${window.location.pathname}#/?${urlString}`);
    }
};

// Middle ware
export const urlSwithcerMiddleware = store => next => (action) => {
    const result = next(action);
    switch (action.type) {
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
