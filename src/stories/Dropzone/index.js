import React from 'react';
import { storiesOf } from '@storybook/react';
import Story from './Story';
import { Dropzone } from '../../src/';

storiesOf('Dropzone', module)
  .add(
    'Default View',
    () => Story,
    { scope: { Dropzone }, source: true, static: true },
);
