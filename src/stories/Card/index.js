/* eslint import/no-unresolved: 0 */
/* eslint import/no-webpack-loader-syntax: 0 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryBasicExample from 'raw!./StoryBasicExample.src';
import Card from '../../components/Card/Card';
import '../../components/Card/index.scss';

storiesOf('Card', module)
    .add(
        'Basic Example',
        () => StoryBasicExample,
        { scope: { Card } },
    );
