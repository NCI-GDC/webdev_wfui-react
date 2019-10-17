import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryDescription from './StoryDescription';
import StoryGrid from './StoryGrid';
import StoryInputField from './StoryInputField';
import StoryInputTable from './StoryInputTable';
import StoryListbox from './StoryListbox';
import StorySelection from './StorySelection';
import { Description, Grid, InputField, InputTable, Listbox, ListboxOption, Selection } from '../../components/';

// Load Styles for development
// import '../../components/CaGForms/Description/description.scss';
// import '../../components/CaGForms/Grid/grid.scss';
// import '../../components/CaGForms/InputField/input_field.scss';
// import '../../components/CaGForms/InputTable/input_table.scss';
// import '../../components/CaGForms/Listbox/listbox.scss';
// import '../../components/CaGForms/Selection/selection.scss';

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
