import { storiesOf } from '@storybook/react';
import Story from './Story';
import StoryError from './StoryError';
import StoryFail from './StoryFail';
import StoryIgnoreError from './StoryIgnoreError';

storiesOf('LoadingComponent', module)
    .add('Load Success', () => Story)
    .add('Load Fail (API returns error)', () => StoryError)
    .add('Load Fail (Timeout or failed to fetch)', () => StoryFail)
    .add(
        'Load Success with API returns error + Ignore',
        () => StoryIgnoreError
    );
