import { storiesOf } from '@storybook/react';
import Story from './Story';
import StoryDraggableDashboard from './StoryDraggableDashboard';
// import '../../components/DashboardBox/index.scss';

storiesOf('DashboardBox', module)
.add(
    'Default View',
    () => Story
).add(
    'Draggable Grid View',
    () => StoryDraggableDashboard
);
