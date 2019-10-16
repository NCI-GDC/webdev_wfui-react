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
                API_HOST: '192.168.56.103:3000',
                APP_ID: '58becec11c79582d0462184c',
            }}
            typeInclude={['jobs']}
        />
    </Provider>
);
export default example;