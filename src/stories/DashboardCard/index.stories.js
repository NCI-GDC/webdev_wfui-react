/* eslint import/no-unresolved: 0 */
/* eslint import/no-webpack-loader-syntax: 0 */
import { storiesOf } from '@storybook/react';
import StoryBasicExample from './StoryBasicExample';
// import '../../components/DashboardCard/index.scss';

storiesOf('DashboardCard', module).add('Basic Example', () => StoryBasicExample, );
