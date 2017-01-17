import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Story from 'raw!./Story.src';
import { TimezonePicker } from '../../src/';

storiesOf('Timezone Picker', module)
  .addWithInfo(
    'Default View',
    () => Story,
    { scope: { TimezonePicker }, source: true, static: true },
);
