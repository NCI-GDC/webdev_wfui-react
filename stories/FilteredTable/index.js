import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StoryICGCTesting from 'raw!./StoryICGCTesting.src';
import FilteredTable from '../../src/FilteredTable/FilteredTable';

storiesOf('FilteredTable', module)
  .addWithInfo(
    'ICGC Testing',
    () => StoryICGCTesting,
    { scope: { FilteredTable }, source: true, static: true },
);

