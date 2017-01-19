import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StoryBasicExample from 'raw!./StoryBasicExample.src';
import UserDrawer from '../../src/UserDrawer/UserDrawer';

storiesOf('UserDrawer', module)
    .addWithInfo(
        'Basic Example',
        () => StoryBasicExample,
        { scope: { UserDrawer } },
    );
