import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Story from 'raw!./Story.src';
import { ButtonToolbar, WFUIDropdown, Dropdown, MenuItem, Glyphicon } from '../../src/';

storiesOf('Dropdown', module)
  .addWithInfo(
    'React Bootstrap Dropdown',
    () => Story,
    { scope: { ButtonToolbar, Dropdown, MenuItem, Glyphicon }, source: true, static: true },
).addWithInfo(
    'Customized Dropdown',
    () => Story,
    { scope: { ButtonToolbar, Dropdown: WFUIDropdown, MenuItem, Glyphicon }, source: true, static: true },
);
