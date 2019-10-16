import React from 'react';
import { storiesOf } from '@storybook/react';
import DisqusFeed from '../../components/DisqusFeed/index.js.js';
import StoryDefaultView from 'raw!./StoryDefaultView.src';

storiesOf('DisqusFeed', module)
  .add(
    'default view',
    () => StoryDefaultView,
    { scope: { DisqusFeed } },
)