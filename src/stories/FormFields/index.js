import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reduxForm, Field, Fields, FieldArray } from 'redux-form';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import * as FormFields from '../../components/FormFields';
import StoryFormField from 'raw!./StoryFormField.src';
import StoryDisabled from 'raw!./StoryDisabled.src';
import StoryPreview from 'raw!./StoryPreview.src';
import '../../components/FormFields/index.scss';
import { fetchReducer } from '../../components/util/wfuiFetch/reducer';

// import { WebFormWithContext, reducers } from '../../src/Forms/';

// Modal Dialog
import { modalReducer } from '../../components/ModalDialog/reducer';

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
    .add('Regular', () => StoryFormField, {
        scope: {
            Provider,
            store,
            FormFields,
            Field,
            Fields,
            FieldArray,
            reduxForm,
            IntlProvider,
        },
    })
    .add('Disabled', () => StoryDisabled, {
        scope: { Provider, store, FormFields, Field, FieldArray, reduxForm },
    })
    .add('Preview', () => StoryPreview, {
        scope: { Provider, store, FormFields, Field, FieldArray, reduxForm },
    });
// .add('Webform', () => StoryWebform, {
//     scope: { React, Provider, store, WebForm: WebFormWithContext },
// });
