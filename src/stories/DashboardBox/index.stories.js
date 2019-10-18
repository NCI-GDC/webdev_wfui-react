/* eslint import/no-webpack-loader-syntax: off */
import { storiesOf } from '@storybook/react';
import Story from './Story';
import StoryDraggableDashboard from './StoryDraggableDashboard';
import '!style-loader!css-loader!sass-loader!../../components/DashboardBox/index.scss';

storiesOf('DashboardBox', module)
    .add('Default View', () => Story)
    .add('Draggable Grid View', () => StoryDraggableDashboard);
