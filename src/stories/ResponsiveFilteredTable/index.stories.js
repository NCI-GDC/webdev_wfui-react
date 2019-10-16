import React from 'react';
import { Button, MenuItem } from 'react-bootstrap';
import { storiesOf } from '@storybook/react';
import StoryPerformance from './StoryPerformance';
// import '../../components/FilteredTable/2/fixed-data-table.min.css';
// import '../../components/FilteredTable/2/custom-data-table.css';

storiesOf('ResponsiveFilteredTable', module).add('Benchmark', () => StoryPerformance);
