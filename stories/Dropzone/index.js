import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Story from 'raw!./Story.src';
import { Dropzone } from '../../src/';

storiesOf('Dropzone', module)
  .addWithInfo(
    'Default View',
    () => Story,
    { scope: { Dropzone }, source: true, static: true },
);
