/* eslint import/no-unresolved: 0 */
/* eslint import/no-webpack-loader-syntax: 0 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryBasicExample from 'raw!./StoryBasicExample.src';
import DrawerButton from '../../components/Drawer/DrawerButton';

storiesOf('Drawer', module)
    .add(
        'Basic Example',
        () => StoryBasicExample,
        { scope: { DrawerButton } },
    );
