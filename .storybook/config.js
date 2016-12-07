import React from 'react';
import { configure, setAddon } from '@kadira/storybook';
import InfoAddon from '../addon/custom-react-storybook-addon-info';
import '../addon/custom-react-storybook-addon-info/styles/custom.css';
import '../addon/custom-react-storybook-addon-info/styles/codemirror.css';
import '../addon/custom-react-storybook-addon-info/styles/monokai.min.css';
import 'bootstrap/dist/css/bootstrap.css';
setAddon(InfoAddon);

function loadStories() {
  require('../stories/ReactBootstrap');
  require('../stories/FilteredList');
  require('../stories/FilteredTable');
  require('../stories/TwitterFeed');
  require('../stories/Spinner');
}

configure(loadStories, module);
