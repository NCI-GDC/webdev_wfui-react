import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StoryDescription from 'raw!./StoryDescription.src';
import StoryGrid from 'raw!./StoryGrid.src';
import StoryInputField from 'raw!./StoryInputField.src';
import StoryInputTable from 'raw!./StoryInputTable.src';
import StoryListbox from 'raw!./StoryListbox.src';
import StorySelection from 'raw!./StorySelection.src';
import { Description, Grid, InputField, InputTable, Listbox, ListboxOption, Selection } from '../../src/';

// Load Styles for development
require('../../src/CaGForms/Description/description.scss');
require('../../src/CaGForms/Grid/grid.scss');
require('../../src/CaGForms/InputField/input_field.scss');
require('../../src/CaGForms/InputTable/input_table.scss');
require('../../src/CaGForms/Listbox/listbox.scss');
require('../../src/CaGForms/Selection/selection.scss');

storiesOf('CaG Forms', module)
.addWithInfo(
    'Description',
    () => StoryDescription,
    { scope: { Description }, source: true, static: true },
)
.addWithInfo(
    'Grid',
    () => StoryGrid,
    { scope: { Description, Grid, Selection }, source: true, static: true },
)
.addWithInfo(
    'InputField',
    () => StoryInputField,
    { scope: { Description, InputField }, source: true, static: true },
)
.addWithInfo(
    'InputTable',
    () => StoryInputTable,
    { scope: { Description, InputTable, InputField }, source: true, static: true },
)
.addWithInfo(
    'Listbox',
    () => StoryListbox,
    { scope: { Listbox, ListboxOption }, source: true, static: true },
)
.addWithInfo(
    'Selection',
    () => StorySelection,
    { scope: { Selection, InputTable, InputField }, source: true, static: true },
);
