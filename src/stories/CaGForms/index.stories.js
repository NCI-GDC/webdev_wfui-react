/* eslint import/no-webpack-loader-syntax: off */

import { storiesOf } from '@storybook/react';
import StoryDescription from './StoryDescription';
import StoryGrid from './StoryGrid';
import StoryInputField from './StoryInputField';
import StoryInputTable from './StoryInputTable';
import StoryListbox from './StoryListbox';
import StorySelection from './StorySelection';
import { Description, Grid } from '../../components';

import '!style-loader!css-loader!sass-loader!../../styles/_wfui-bootstrap-styles.scss';

storiesOf('CaG Forms', module)
    .add('Description', () => StoryDescription)
    .add('Grid', () => StoryGrid)
    .add('InputField', () => StoryInputField)
    .add('InputTable', () => StoryInputTable)
    .add('Listbox', () => StoryListbox)
    .add('Selection', () => StorySelection);
