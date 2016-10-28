import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Test, Test2 } from '../src/Test/Test';

storiesOf('Test', module)
  .addWithInfo(
    'Basic',
    () => (
        <Test2 itemAsProp={<Test var1="hi" var2="hello" />} />
    ),
    { inline: true }
);
