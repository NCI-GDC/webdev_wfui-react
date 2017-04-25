import React from 'react';
import { storiesOf } from '@kadira/storybook';
import LoadingComponent from '../../src/LoadingComponent/LoadingComponent';
import Spinner from '../../src/Spinner/Spinner';
import Story from 'raw!./Story.src';
import StoryError from 'raw!./StoryError.src';
import StoryFail from 'raw!./StoryFail.src';

storiesOf('LoadingComponent', module)
.addWithInfo(
    'Load Success',
    () => Story,
    { scope: { LoadingComponent, Spinner } },
)
.addWithInfo(
    'Load Fail (API returns error)',
    () => StoryError,
    { scope: { LoadingComponent, Spinner } },
)
.addWithInfo(
    'Load Fail (Timeout or failed to fetch)',
    () => StoryFail,
    { scope: { LoadingComponent, Spinner } },
);