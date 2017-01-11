import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StoryBasicExample from 'raw!./StoryBasicExample.src';
import GroupsDrawer from '../../src/GroupsDrawer/GroupsDrawer';
import imageFile from './icon.svg';

storiesOf('GroupsDrawer', module)
    .addWithInfo(
        'Basic Example',
        () => StoryBasicExample,
        { scope: { GroupsDrawer, imageFile } },
    );