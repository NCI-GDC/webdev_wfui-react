import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryDescription from 'raw!./StoryDescription.src';
import StoryGrid from 'raw!./StoryGrid.src';
import StoryInputField from 'raw!./StoryInputField.src';
import StoryInputTable from 'raw!./StoryInputTable.src';
import StoryListbox from 'raw!./StoryListbox.src';
import StorySelection from 'raw!./StorySelection.src';
import { Description, Grid, InputField, InputTable, Listbox, ListboxOption, Selection } from '../../src/';

// Load Styles for development
import '../../components/CaGForms/Description/description.scss';
import '../../components/CaGForms/Grid/grid.scss';
import '../../components/CaGForms/InputField/input_field.scss';
import '../../components/CaGForms/InputTable/input_table.scss';
import '../../components/CaGForms/Listbox/listbox.scss';
import '../../components/CaGForms/Selection/selection.scss';

storiesOf('CaG Forms', module)
.add(
    'Description',
    () => StoryDescription,
    { scope: { Description }, source: true, static: true },
)
.add(
    'Grid',
    () => StoryGrid,
    { scope: { Description, Grid, Selection }, source: true, static: true },
)
.add(
    'InputField',
    () => StoryInputField,
    { scope: { Description, InputField }, source: true, static: true },
)
.add(
    'InputTable',
    () => StoryInputTable,
    { scope: { Description, InputTable, InputField }, source: true, static: true },
)
.add(
    'Listbox',
    () => StoryListbox,
    { scope: { Listbox, ListboxOption }, source: true, static: true },
)
.add(
    'Selection',
    () => StorySelection,
    { scope: { Selection, InputTable, InputField }, source: true, static: true },
);
