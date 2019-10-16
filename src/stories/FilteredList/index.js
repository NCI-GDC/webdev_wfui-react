import React from 'react';
import { storiesOf } from '@storybook/react';
import FilteredList from '../../components/FilteredList/FilteredList';
import StoryBasicExample from 'raw!./StoryBasicExample.src';
import StoryRealUseCase from 'raw!./StoryRealUseCase.src';
import StoryCustomContainer from 'raw!./StoryCustomContainer.src';

storiesOf('FilteredList', module)
  .add(
    'Basic Example',
    () => StoryBasicExample,
    { scope: { FilteredList } },
)
.add(
    'Real Use Case',
    () => StoryRealUseCase,
    { scope: { FilteredList } },
)
.add(
    'Custom Container',
    () => StoryCustomContainer,
    { scope: { FilteredList } },
);