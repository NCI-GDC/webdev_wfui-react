import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Spinner from '../../src/Spinner/Spinner';
import StoryType1 from 'raw!./StoryType1.src';
import StoryType2 from 'raw!./StoryType2.src';

storiesOf('Spinner', module)
.addWithInfo(
    'Type 1',
    () => StoryType1,
    { scope: { Spinner } }
)
.addWithInfo(
    'Type 2',
    () => StoryType2,
    { scope: { Spinner } }
);
