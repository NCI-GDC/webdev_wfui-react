import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { storiesOf } from '@kadira/storybook';
import * as FormFields from '../../src/FormFields';
import StoryFormField from 'raw!./StoryFormField.src';
import StoryDisabled from 'raw!./StoryDisabled.src';
import StoryPreview from 'raw!./StoryPreview.src';
import '../../src/FormFields/index.scss';
import { fetchReducer } from '../../src/util/wfuiFetch/reducer';

// import { WebFormWithContext, reducers } from '../../src/Forms/';

// Modal Dialog
import { modalReducer } from '../../src/ModalDialog/reducer';

const store = createStore(
    combineReducers({
        form: formReducer,
        fetch: fetchReducer,
        modal: modalReducer,
    }),
    {},
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
);

storiesOf('FormFields', module)
    .addWithInfo('Regular', () => StoryFormField, {
        scope: { Provider, store, FormFields, Field, FieldArray, reduxForm },
    })
    .addWithInfo('Disabled', () => StoryDisabled, {
        scope: { Provider, store, FormFields, Field, FieldArray, reduxForm },
    })
    .addWithInfo('Preview', () => StoryPreview, {
        scope: { Provider, store, FormFields, Field, FieldArray, reduxForm },
    });
// .addWithInfo('Webform', () => StoryWebform, {
//     scope: { React, Provider, store, WebForm: WebFormWithContext },
// });
