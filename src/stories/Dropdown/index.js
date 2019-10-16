import React from 'react';
import { storiesOf } from '@storybook/react';
import Story from './Story';
import { ButtonToolbar, WFUIDropdown, Dropdown, MenuItem, Glyphicon } from '../../src/';

storiesOf('Dropdown', module)
  .add(
    'React Bootstrap Dropdown',
    () => Story,
    { scope: { ButtonToolbar, Dropdown, MenuItem, Glyphicon }, source: true, static: true },
).add(
    'Customized Dropdown',
    () => Story,
    { scope: { ButtonToolbar, Dropdown: WFUIDropdown, MenuItem, Glyphicon }, source: true, static: true },
);
