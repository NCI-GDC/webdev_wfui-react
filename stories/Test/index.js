import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Story from 'raw!./Story.src';
import Test from '../../src/Test';

storiesOf('Testing', module).addWithInfo('Prop Injection', () => Story, {
    scope: { Test },
});
