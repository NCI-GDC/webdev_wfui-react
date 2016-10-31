import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TabbedList from '../src/TabbedList/TabbedList';
import Tab from '../src/TabbedList/Tab';

storiesOf('Tabbed List', module)
  .addWithInfo(
    'Basic',
    () => (
        <TabbedList className="Basic">
            <Tab className="Tab-Class" title="Tab 1">
                Tab content
            </Tab>
            <Tab active className="Tab-Class-2" title="Tab 2">
                Second tab content
            </Tab>
        </TabbedList>
    ),
    { inline: true }
);
