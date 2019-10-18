/* eslint import/no-webpack-loader-syntax: off */

import { storiesOf } from '@storybook/react';
import StoryDescription from './StoryDescription';
import StoryGrid from './StoryGrid';
import StoryInputField from './StoryInputField';
import StoryInputTable from './StoryInputTable';
import StoryListbox from './StoryListbox';
import StorySelection from './StorySelection';
import { Description, Grid } from '../../components';

// Load Styles for development
import '!style-loader!css-loader!sass-loader!../../components/CaGForms/Description/description.scss';
import '!style-loader!css-loader!sass-loader!../../components/CaGForms/Grid/grid.scss';
import '!style-loader!css-loader!sass-loader!../../components/CaGForms/InputField/input_field.scss';
import '!style-loader!css-loader!sass-loader!../../components/CaGForms/InputTable/input_table.scss';
import '!style-loader!css-loader!sass-loader!../../components/CaGForms/Listbox/listbox.scss';
import '!style-loader!css-loader!sass-loader!../../components/CaGForms/Selection/selection.scss';

storiesOf('CaG Forms', module)
    .add('Description', () => StoryDescription)
    .add('Grid', () => StoryGrid)
    .add('InputField', () => StoryInputField)
    .add('InputTable', () => StoryInputTable)
    .add('Listbox', () => StoryListbox)
    .add('Selection', () => StorySelection);
