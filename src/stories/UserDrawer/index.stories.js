/* eslint import/no-webpack-loader-syntax: off */
import { storiesOf } from '@storybook/react';
import StoryBasicExample from './StoryBasicExample';
import '!style-loader!css-loader!sass-loader!../../components/UserDrawer/index.scss';

storiesOf('UserDrawer', module).add('Basic Example', () => StoryBasicExample);
