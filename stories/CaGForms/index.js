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
import '../../src/CaGForms/Description/description.scss';
import '../../src/CaGForms/Grid/grid.scss';
import '../../src/CaGForms/InputField/input_field.scss';
import '../../src/CaGForms/InputTable/input_table.scss';
import '../../src/CaGForms/Listbox/listbox.scss';
import '../../src/CaGForms/Selection/selection.scss';

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
