/* eslint import/no-unresolved: 0 */
/* eslint import/no-webpack-loader-syntax: 0 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StoryBasicExample from 'raw!./StoryBasicExample.src';
import Card from '../../src/Card/Card';
import '../../src/Card/index.scss';

storiesOf('Card', module)
    .addWithInfo(
        'Basic Example',
        () => StoryBasicExample,
        { scope: { Card } },
    );
