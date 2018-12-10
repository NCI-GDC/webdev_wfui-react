import React from 'react';
import { configure, setAddon } from '@kadira/storybook';
import InfoAddon from '../addon/oicr-react-storybook-addon-info';
import '../addon/oicr-react-storybook-addon-info/styles/custom.css';
import '../addon/oicr-react-storybook-addon-info/styles/codemirror.css';
import '../addon/oicr-react-storybook-addon-info/styles/monokai.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
setAddon(InfoAddon);

function loadStories() {
    require('../stories/Test');
    require('../stories/ReactBootstrap');
    require('../stories/ReactMarkdown');
    require('../stories/Card');
    require('../stories/DashboardCard');
    require('../stories/Editor');
    require('../stories/IsotopeGrid');
    require('../stories/Drawer');
    require('../stories/GroupsDrawer');
    require('../stories/UserDrawer');
    require('../stories/FilteredList');
    require('../stories/FilteredTable');
    require('../stories/ResponsiveFilteredTable');
    require('../stories/TwitterFeed');
    require('../stories/Spinner');
    require('../stories/PasswordValidator');
    require('../stories/Notification');
    require('../stories/Dropzone');
    require('../stories/Draggable');
    require('../stories/DashboardBox');
    require('../stories/TimezonePicker');
    // require('../stories/CaGForms');
    require('../stories/FullCalendar');
    require('../stories/DisqusFeed');
    require('../stories/LoadingComponent');
    require('../stories/Search');
    require('../stories/FormFields');
    require('../stories/Dropdown');
}

configure(loadStories, module);
