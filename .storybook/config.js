import React from 'react';
import { configure, setAddon } from '@kadira/storybook';
import InfoAddon from '../addon/extend-addon-info';
setAddon(InfoAddon);

function loadStories() {
  require('../stories/TwitterFeed');
  require('../stories/Spinner');
  require('../stories/ReactBootstrap');
  require('../stories/FilteredList');
  require('../stories/FilteredTable');
  require('../stories/TabbedList');
  require('../stories/Test');
}

configure(loadStories, module);
