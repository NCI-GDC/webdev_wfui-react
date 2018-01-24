/* eslint import/no-unresolved: 0 */
/* eslint import/no-webpack-loader-syntax: 0 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StoryBasicExample from 'raw!./StoryBasicExample.src';
import DashboardCard from '../../src/DashboardCard/DashboardCard';
import '../../src/DashboardCard/index.scss';

storiesOf('DashboardCard', module).addWithInfo('Basic Example', () => StoryBasicExample, {
    scope: { DashboardCard },
});
