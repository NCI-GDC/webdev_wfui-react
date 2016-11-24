import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Test, Test2 } from '../src/Test/Test';

storiesOf('Testing', module)
  .addWithInfo(
    'Prop Injection',
    () => (
        <Test2 lol={<li>hel</li>}>
            <Test />
        </Test2>
    ),
    { inline: true },
);
