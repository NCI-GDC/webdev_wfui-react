import { storiesOf } from '@storybook/react';
import StoryICGCTesting from './StoryICGCTesting';
import StoryPerformance from './StoryPerformance';
import '../../components/FilteredTable/2/fixed-data-table.min.css';
import '../../components/FilteredTable/2/custom-data-table.css';

storiesOf('FilteredTable', module)
    .add('ICGC Testing', () => StoryICGCTesting)
    .add('Benchmark (v1)', () => StoryPerformance)
    .add('Benchmark (v2)', () => StoryPerformance);
