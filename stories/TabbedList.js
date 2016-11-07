import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TabbedList from '../src/TabbedList/TabbedList';
import Tab from '../src/TabbedList/Tab';

storiesOf('TabbedList', module)
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
    { inline: true })
    .addWithInfo(
    'Different default tab',
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
    { inline: true })
    .addWithInfo(
    'With classes',
    () => (
        <TabbedList className="outer-class">
            <Tab className="tab-1-class" title="Tab 1">
                The div surrounding this tag will have the class tab-1-class,
            </Tab>
            <Tab className="tab-2-class" title="Tab 2">
                And the outer div wil have the class outer-class!
            </Tab>
        </TabbedList>
    ),
    { inline: true }
);
