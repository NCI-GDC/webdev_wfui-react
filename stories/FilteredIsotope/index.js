import React from 'react';
import {
    Button, ButtonGroup,
} from 'react-bootstrap';
import { storiesOf } from '@kadira/storybook';
import FilteredIsotope from '../../src/FilteredIsotope/FilteredIsotope';
import StoryBasicExample from 'raw!./StoryBasicExample.src';

storiesOf('FilteredIsotope', module)
  .addWithInfo(
    'Basic Example',
    () => StoryBasicExample,
    { scope: { FilteredIsotope, Button, ButtonGroup } },
);
