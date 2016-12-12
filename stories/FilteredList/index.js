import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FilteredList from '../../src/FilteredList/FilteredList';
import StoryBasicExample from 'raw!./StoryBasicExample.src';
import StoryRealUseCase from 'raw!./StoryRealUseCase.src';
import StoryCustomContainer from 'raw!./StoryCustomContainer.src';

storiesOf('FilteredList', module)
  .addWithInfo(
    'Basic Example',
    () => StoryBasicExample,
    { scope: { FilteredList } },
)
.addWithInfo(
    'Real Use Case',
    () => StoryRealUseCase,
    { scope: { FilteredList } },
)
.addWithInfo(
    'Custom Container',
    () => StoryCustomContainer,
    { scope: { FilteredList } },
);