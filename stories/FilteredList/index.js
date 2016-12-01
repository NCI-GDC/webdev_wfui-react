import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FilteredList from '../../src/FilteredList/FilteredList';
import StoryBasicExample from './StoryBasicExample';
import StoryRealUseCase from './StoryRealUseCase';
import StoryCustomContainer from './StoryCustomContainer';

storiesOf('FilteredList', module)
  .addWithInfo(
    'Basic Example',
    () => StoryBasicExample,
    { source: true, static: true },
)
.addWithInfo(
    'Real Use Case',
    () => StoryRealUseCase,
    { source: true, static: true },
)
.addWithInfo(
    'Custom Container',
    () => StoryCustomContainer,
    { source: true, static: true },
);