import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TabbedList from '../src/Dropdown/Dropdown';
import Tab from '../src/Dropdown/DropdownItem';

storiesOf('Dropdown', module)
  .addWithInfo(
    'Basic',
    () => (
        <TabbedList className="Basic">
            <Tab className="Tab-Class" title="Tab 1">
                Tab content
            </Tab>
            <Tab className="Tab-Class-2" title="Tab 2">
                Second tab content
            </Tab>
        </TabbedList>
    ),
    { inline: true },
);
