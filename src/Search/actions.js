import { wfuiFetch } from '../util';

/**
 * Fetch autocomplete from database
 */
export const getAutocomplete = (config, { keyword = '', typeInclude = [] }) => (
    (dispatch) => {
        const req = wfuiFetch(`//${config.API_HOST || 'localhost'}${config.API_SEARCH || '/content/search'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'app-id': config.APP_ID,
            },
            body: JSON.stringify({ type: 'facet', keyword, typeInclude }),
            requestId: 'getAutocomplete',
            credentials: 'include',
        }, dispatch);
        return req.promise.then(({ res, data }) => {
            if (res.ok) {
                dispatch({ type: 'RECEIVE_AUTOCOMPLETE', payload: data[0]['_text_'] });
                return Promise.resolve(data[0]);
            }
            return Promise.reject(res.statusText);
        })
        .catch((err) => {
            console.log(err);
        });
    }
);

/**
 * Fetch search result from database
 */
export const getSearchResult = (config, { keyword = '', typeInclude = [], keywordQuotes = false }) => (
    (dispatch) => {
        if (!keyword || !keyword.trim()) {
            dispatch({ type: 'RECEIVE_SEARCH', result: [], keyword });
        }
        const req = wfuiFetch(`//${config.API_HOST || 'localhost'}${config.API_SEARCH || '/content/search'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'app-id': config.APP_ID,
            },
            body: JSON.stringify({ keyword: keyword.trim(), typeInclude, keywordQuotes }),
            requestId: 'getSearchResult',
            credentials: 'include',
        }, dispatch);
        return req.promise.then(({ res, data }) => {
            if (res.ok) {
                dispatch({ type: 'RECEIVE_SEARCH', results: data, keyword });
                return Promise.resolve(data);
            }
            return Promise.reject(res.statusText);
        })
        .catch((err) => {
            console.log(err);
        });
    }
);