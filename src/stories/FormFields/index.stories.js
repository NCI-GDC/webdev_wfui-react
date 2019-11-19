/* eslint import/no-webpack-loader-syntax: off */
import { storiesOf } from '@storybook/react';
import StoryFormField from './StoryFormField';
import StoryDisabled from './StoryDisabled';
import StoryPreview from './StoryPreview';
import 'bootstrap/dist/css/bootstrap.css';
import '!style-loader!css-loader!sass-loader!../../components/Button/index.scss';
import '!style-loader!css-loader!sass-loader!../../components/FormFields/index.scss';

// import { WebFormWithContext, reducers } from '../../components/Forms/';

storiesOf('FormFields', module)
    .add('Regular', () => StoryFormField)
    .add('Disabled', () => StoryDisabled)
    .add('Preview', () => StoryPreview);

// .add('Webform', () => StoryWebform, {
//     scope: { React, Provider, store, WebForm: WebFormWithContext },
// });
