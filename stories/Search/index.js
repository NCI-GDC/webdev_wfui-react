/* global window */
import React from 'react';
import thunk from 'redux-thunk';
import { storiesOf } from '@kadira/storybook';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import Story from 'raw!./Story.src';
import { autocompleteReducer, searchReducer } from '../../src/Search/reducers';
import SearchContainer from '../../src/Search/SearchContainer';

import { visibilityFilterReducer } from '../../src/util/visibilityFilter';

const store = createStore(combineReducers(
    {
        visibilityFilter: visibilityFilterReducer,
        search: searchReducer,
        autocomplete: autocompleteReducer,
    }),
    {},
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f),
);

storiesOf('Search', module)
.addWithInfo(
    'Basic',
    () => Story,
    { scope: { Provider, SearchContainer, store } },
);
