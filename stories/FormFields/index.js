import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { storiesOf } from '@kadira/storybook';
import * as FormFields from '../../src/FormFields';
import StoryFacit from 'raw!./StoryFacit.src';
import '../../src/FormFields/index.scss';

const store = createStore(combineReducers(
    {
        form: formReducer,
    }),
    {},
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f),
);

storiesOf('FormFields', module)
.addWithInfo(
    'Type 1',
    () => StoryFacit,
    { scope: { Provider, store, FormFields, Field, FieldArray, reduxForm } }
);
