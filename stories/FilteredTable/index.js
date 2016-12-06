import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StoryICGCTesting from './StoryICGCTesting';

storiesOf('FilteredTable', module)
  .addWithInfo(
    'ICGC Testing',
    () => StoryICGCTesting,
    { source: true, static: true },
);

