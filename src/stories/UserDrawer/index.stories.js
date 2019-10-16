import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryBasicExample from './StoryBasicExample';

storiesOf('UserDrawer', module)
    .add(
        'Basic Example',
        () => StoryBasicExample,
    );
