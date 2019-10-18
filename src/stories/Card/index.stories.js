/* eslint import/no-webpack-loader-syntax: off */
/* eslint import/no-unresolved: 0 */

import { storiesOf } from '@storybook/react';
import StoryBasicExample from './StoryBasicExample';
import '!style-loader!css-loader!sass-loader!../../components/Card/index.scss';

storiesOf('Card', module).add('Basic Example', () => StoryBasicExample);
