'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var transformAutocomplete = function transformAutocomplete(data) {
    if (!data) return [];

    var len = Math.min(3, data.length / 2);
    var autocomplete = [];

    for (var i = 0; i < len; i++) {
        autocomplete.push({
            keyword: data[2 * i],
            count: data[2 * i + 1]
        });
    }

    return autocomplete;
};

/**
 * Reducer for Auto complete in project search
 */
var autocompleteReducer = exports.autocompleteReducer = function autocompleteReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

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
var searchReducer = exports.searchReducer = function searchReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { results: [], all: true, keyword: '' };
    var action = arguments[1];

    switch (action.type) {
        case 'RECEIVE_SEARCH':
            return {
                results: !action.results ? [] : action.results.map(function (item) {
                    return item.doc.permalink_s;
                }),
                all: !action.keyword || !action.keyword.trim(),
                keyword: action.keyword
            };
        default:
            return state;
    }
};