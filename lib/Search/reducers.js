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


export var autocompleteReducer = function autocompleteReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

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

export var searchReducer = function searchReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    results: [],
    all: true,
    keyword: ''
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

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