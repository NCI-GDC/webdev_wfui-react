import { storiesOf } from '@storybook/react';
import StoryICGCTesting from './StoryICGCTesting';
import StoryPerformance from './StoryPerformance';

storiesOf('FilteredTable', module)
    .add('ICGC Testing', () => StoryICGCTesting)
    .add('Benchmark (v1)', () => StoryPerformance)
    .add('Benchmark (v2)', () => StoryPerformance);
