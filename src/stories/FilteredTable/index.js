import React from 'react';
import { Button, MenuItem } from 'react-bootstrap';
import { storiesOf } from '@storybook/react';
import StoryICGCTesting from 'raw!./StoryICGCTesting.src';
import StoryPerformance from 'raw!./StoryPerformance.src';
import FilteredTable from '../../components/FilteredTable/1/FilteredTable';
import FilteredTableV2 from '../../components/FilteredTable/2/FilteredTable';
import '../../components/FilteredTable/2/fixed-data-table.min.css';
import '../../components/FilteredTable/2/custom-data-table.css';
import Dropdown from '../../components/WFUIDropdown/WFUIDropdown';

storiesOf('FilteredTable', module)
    .add('ICGC Testing', () => StoryICGCTesting, {
        scope: { FilteredTable },
        source: true,
        static: true,
    })
    .add('Benchmark (v1)', () => StoryPerformance, {
        scope: { FilteredTable, Button },
        source: true,
        static: true,
    })
    .add('Benchmark (v2)', () => StoryPerformance, {
        scope: { FilteredTable: FilteredTableV2, Button, Dropdown, MenuItem },
        source: true,
        static: true,
    });
