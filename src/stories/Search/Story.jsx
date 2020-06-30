/* global window */
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { autocompleteReducer, searchReducer } from '../../components/Search/reducers';
import SearchContainer from '../../components/Search/SearchContainer';

import { visibilityFilterReducer } from '../../components/util/visibilityFilter';

const store = createStore(combineReducers(
    {
        visibilityFilter: visibilityFilterReducer,
        search: searchReducer,
        autocomplete: autocompleteReducer,
    }),
    {},
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f),
);

const example = (
    <Provider store={store}>
        <SearchContainer
            config={{
                API_HOST: 'api.nextlabs.oicr.on.ca',
                APP_ID: '59f9de915e76e3c7c896e45b',
            }}
            typeInclude={['jobs']}
        />
    </Provider>
);
export default example;