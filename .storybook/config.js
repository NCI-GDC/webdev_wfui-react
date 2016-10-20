import React from 'react';
import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

setAddon(infoAddon);

function loadStories() {
  require('../stories/TwitterFeed');
  require('../stories/Spinner');
}

configure(loadStories, module);
