import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Story from 'raw!./Story.src';
import StoryPie from 'raw!./StoryPie.src';
import Test from '../../src/Test';
import Pie from '../../src/Pie/pie';

storiesOf('Testing', module)
  .addWithInfo(
    'Prop Injection',
    () => Story,
    { scope: { Test } }
  ).addWithInfo(
    'Pie',
    () => StoryPie,
    { scope: { Pie } }
);

