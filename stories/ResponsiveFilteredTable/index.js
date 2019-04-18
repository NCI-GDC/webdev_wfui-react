import React from 'react';
import { Button, MenuItem } from 'react-bootstrap';
import { storiesOf } from '@kadira/storybook';
import StoryPerformance from 'raw!./StoryPerformance.src';
import { ResponsiveFilteredTable } from '../../src/FilteredTable/2/FilteredTable';
import '../../src/FilteredTable/2/fixed-data-table.min.css';
import '../../src/FilteredTable/2/custom-data-table.css';
import Dropdown from '../../src/WFUIDropdown/WFUIDropdown';

storiesOf('ResponsiveFilteredTable', module).addWithInfo('Benchmark', () => StoryPerformance, {
    scope: { FilteredTable: ResponsiveFilteredTable, Button, Dropdown, MenuItem },
    source: true,
    static: true,
});
