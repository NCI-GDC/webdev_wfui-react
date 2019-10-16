import React from 'react';
import { storiesOf } from '@storybook/react';
import Story from './Story';
import StoryGrid from 'raw!./StoryGrid.src';
import { DraggableWithContext as Draggable } from '../../src/';

storiesOf('Draggable', module)
    .add('Default View', () => Story, {
        scope: { Draggable },
        source: true,
        static: true,
    })
    .add('Grid', () => StoryGrid, {
        scope: { Draggable },
        source: true,
        static: true,
    });
