import { storiesOf } from '@storybook/react';
import StoryPerformance from './StoryPerformance';

storiesOf('ResponsiveFilteredTable', module).add(
    'Benchmark',
    () => StoryPerformance
);
