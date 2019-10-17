import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { storiesOf } from '@storybook/react';
import StoryFormField from './StoryFormField';
import StoryDisabled from './StoryDisabled';
import StoryPreview from './StoryPreview';
// import '../../components/FormFields/index.scss';

// import { WebFormWithContext, reducers } from '../../components/Forms/';

storiesOf('FormFields', module)
    .add('Regular', () => StoryFormField)
    .add('Disabled', () => StoryDisabled)
    .add('Preview', () => StoryPreview);
// .add('Webform', () => StoryWebform, {
//     scope: { React, Provider, store, WebForm: WebFormWithContext },
// });
