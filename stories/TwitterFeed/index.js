import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TwitterFeed from '../../src/TwitterFeed/TwitterFeed';
import StoryDefaultView from 'raw!./StoryDefaultView.src';
import StoryLimitedTo2 from 'raw!./StoryLimitedTo2.src';
import StoryFrench from 'raw!./StoryFrench.src';

storiesOf('TwitterFeed', module)
  .addWithInfo(
    'default view',
    () => StoryDefaultView,
    { scope: { TwitterFeed } },
).addWithInfo(
    'Limited to 2 Tweets',
    () => StoryLimitedTo2,
    { scope: { TwitterFeed } },
).addWithInfo(
    'French Language',
    () => StoryFrench,
    { scope: { TwitterFeed } }
);
