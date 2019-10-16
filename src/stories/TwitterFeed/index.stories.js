import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryDefaultView from './StoryDefaultView';
import StoryLimitedTo2 from './StoryLimitedTo2';
import StoryFrench from './StoryFrench';

storiesOf('TwitterFeed', module)
  .add(
    'default view',
    () => StoryDefaultView
).add(
    'Limited to 2 Tweets',
    () => StoryLimitedTo2
).add(
    'French Language',
    () => StoryFrench
);
