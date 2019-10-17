import { storiesOf } from '@storybook/react';
import Story from './Story';
import StoryGrid from './StoryGrid';

storiesOf('Draggable', module)
    .add('Default View', () => Story)
    .add('Grid', () => StoryGrid);
