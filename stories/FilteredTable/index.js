import React from 'react';
import { Button } from 'react-bootstrap';
import { storiesOf } from '@kadira/storybook';
import StoryICGCTesting from 'raw!./StoryICGCTesting.src';
import StoryPerformance from 'raw!./StoryPerformance.src';
import FilteredTable from '../../src/FilteredTable/1/FilteredTable';
import FilteredTableV2 from '../../src/FilteredTable/2/FilteredTable';
import '../../src/FilteredTable/2/fixed-data-table.min.css';

storiesOf('FilteredTable', module)
    .addWithInfo('ICGC Testing', () => StoryICGCTesting, {
        scope: { FilteredTable },
        source: true,
        static: true,
    })
    .addWithInfo('Benchmark (v1)', () => StoryPerformance, {
        scope: { FilteredTable, Button },
        source: true,
        static: true,
    })
    .addWithInfo('Benchmark (v2)', () => StoryPerformance, {
        scope: { FilteredTable: FilteredTableV2, Button },
        source: true,
        static: true,
    });
