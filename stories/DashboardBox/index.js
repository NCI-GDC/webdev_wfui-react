import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { storiesOf } from '@kadira/storybook';
import Story from 'raw!./Story.src';
import StoryDraggableDashboard from 'raw!./StoryDraggableDashboard.src';
import { Draggable } from '../../src/';
import DashboardBox from '../../src/DashboardBox/DashboardBox';

storiesOf('DashboardBox', module)
.addWithInfo(
    'Default View',
    () => Story,
    { scope: { DashboardBox }, source: true, static: true },
).addWithInfo(
    'Draggable Grid View',
    () => StoryDraggableDashboard,
    { scope: { Draggable, DashboardBox, Glyphicon }, source: true, static: true },
);
