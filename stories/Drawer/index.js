/* eslint import/no-unresolved: 0 */
/* eslint import/no-webpack-loader-syntax: 0 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StoryBasicExample from 'raw!./StoryBasicExample.src';
import DrawerButton from '../../src/Drawer/DrawerButton';

storiesOf('Drawer', module)
    .addWithInfo(
        'Basic Example',
        () => StoryBasicExample,
        { scope: { DrawerButton } },
    );
