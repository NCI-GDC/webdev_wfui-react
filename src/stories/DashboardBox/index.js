import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { storiesOf } from '@storybook/react';
import Story from './Story';
import StoryDraggableDashboard from 'raw!./StoryDraggableDashboard.src';
import { Draggable } from '../../src/';
import DashboardBox from '../../components/DashboardBox/DashboardBox';
import imageFile from './icon.svg';
import '../../components/DashboardBox/index.scss';

storiesOf('DashboardBox', module)
.add(
    'Default View',
    () => Story,
    { scope: { DashboardBox, imageFile }, source: true, static: true },
).add(
    'Draggable Grid View',
    () => StoryDraggableDashboard,
    { scope: { Draggable, DashboardBox, Glyphicon, imageFile }, source: true, static: true },
);
