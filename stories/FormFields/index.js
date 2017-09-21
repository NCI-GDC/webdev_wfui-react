import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { storiesOf } from '@kadira/storybook';
import * as FormFields from '../../src/FormFields';
import StoryFacit from 'raw!./StoryFacit.src';
import StoryWebform from 'raw!./StoryWebform.src';

import '../../src/FormFields/index.scss';
import { fetchReducer } from '../../src/util/wfuiFetch/reducer';
import { WebForm, reducers } from '../../src/Forms/';

// Modal Dialog
import { modalReducer } from '../../src/ModalDialog/reducer';

import '../../src/Forms/index.scss';

const store = createStore(combineReducers(
    {
        ...reducers,
        form: formReducer,
        fetch: fetchReducer,
        modal: modalReducer,
    }),
    {},
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f),
);

storiesOf('FormFields', module)
.addWithInfo(
    'Type 1',
    () => StoryFacit,
    { scope: { Provider, store, FormFields, Field, FieldArray, reduxForm } }
)
.addWithInfo(
    'Webform',
    () => StoryWebform,
    { scope: { React, Provider, store, WebForm } }
);
