import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Story from 'raw!./Story.src';
import StoryGrid from 'raw!./StoryGrid.src';
import { DraggableWithContext as Draggable } from '../../src/';

storiesOf('Draggable', module)
    .addWithInfo('Default View', () => Story, {
        scope: { Draggable },
        source: true,
        static: true,
    })
    .addWithInfo('Grid', () => StoryGrid, {
        scope: { Draggable },
        source: true,
        static: true,
    });
