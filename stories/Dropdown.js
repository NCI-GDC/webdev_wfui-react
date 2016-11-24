import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Dropdown from '../src/Dropdown/Dropdown';
import DropdownItem from '../src/Dropdown/DropdownItem';

storiesOf('Dropdown', module)
  .addWithInfo(
    'Basic',
    () => (
        <div>
            Empty dopdown Component
        </div>
    ),
    { inline: true },
);
