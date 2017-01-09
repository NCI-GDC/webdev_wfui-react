import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Story from 'raw!./Story.src';
import { NotificationSystem } from '../../src/';

storiesOf('Notification', module)
  .addWithInfo(
    'Default View',
    () => Story,
    { scope: { NotificationSystem }, source: true, static: true },
);
