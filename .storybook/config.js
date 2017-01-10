import React from 'react';
import { configure, setAddon } from '@kadira/storybook';
import InfoAddon from '../addon/oicr-react-storybook-addon-info';
import '../addon/oicr-react-storybook-addon-info/styles/custom.css';
import '../addon/oicr-react-storybook-addon-info/styles/codemirror.css';
import '../addon/oicr-react-storybook-addon-info/styles/monokai.min.css';
import 'bootstrap/dist/css/bootstrap.css';
setAddon(InfoAddon);

function loadStories() {
  require('../stories/Test');
  require('../stories/ReactBootstrap');
  require('../stories/Drawer');
  require('../stories/GroupsDrawer');
  require('../stories/UserDrawer');
  require('../stories/FilteredList');
  require('../stories/FilteredTable');
  require('../stories/TwitterFeed');
  require('../stories/Spinner');
  require('../stories/PasswordValidator');
  require('../stories/Notification');
  require('../stories/Dropzone');
  require('../stories/Draggable');
  require('../stories/DashboardBox');
  require('../stories/TimezonePicker');
  require('../stories/CaGForms');
  require('../stories/FullCalendar');
}

configure(loadStories, module);
