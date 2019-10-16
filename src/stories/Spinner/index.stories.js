import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryType1 from './StoryType1';
import StoryType2 from './StoryType2';

storiesOf('Spinner', module)
.add(
    'Type 1',
    () => StoryType1,
)
.add(
    'Type 2',
    () => StoryType2,
);
