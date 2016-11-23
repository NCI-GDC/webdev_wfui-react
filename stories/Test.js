import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Test, Test2 } from '../src/Test/Test';

storiesOf('Testing', module)
  .addWithInfo(
    'Prop Injection',
    () => (
        <Test2>
            <span>
                lol
            </span>
            <div>
                <div> div1 </div>
                <div> div2 </div>
                <div> div3 </div>
            </div>
        </Test2>
    ),
    { inline: true },
);
