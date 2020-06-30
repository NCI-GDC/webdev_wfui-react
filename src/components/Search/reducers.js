const transformAutocomplete = data => {
    if (!data) return [];

    const len = Math.min(3, data.length / 2);
    const autocomplete = [];

    for (let i = 0; i < len; i++) {
        autocomplete.push({
            keyword: data[2 * i],
            count: data[2 * i + 1],
        });
    }

    return autocomplete;
};

/**
 * Reducer for Auto complete in project search
 */
export const autocompleteReducer = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_AUTOCOMPLETE':
            return transformAutocomplete(action.payload);
        default:
            return state;
    }
};

/**
 * Reducer for project search
 */
export const searchReducer = (
    state = { results: [], all: true, keyword: '' },
    action
) => {
    switch (action.type) {
        case 'RECEIVE_SEARCH':
            return {
                results: !action.results
                    ? []
                    : action.results.map(item => item.doc.permalink_s),
                all: !action.keyword || !action.keyword.trim(),
                keyword: action.keyword,
            };
        default:
            return state;
    }
};
