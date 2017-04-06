import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DisqusFeed from '../../src/DisqusFeed/index.js';
import StoryDefaultView from 'raw!./StoryDefaultView.src';

storiesOf('DisqusFeed', module)
  .addWithInfo(
    'default view',
    () => StoryDefaultView,
    { scope: { DisqusFeed } },
)