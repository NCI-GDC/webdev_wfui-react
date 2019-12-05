/* eslint import/no-webpack-loader-syntax: off */
import { storiesOf } from '@storybook/react';
import StoryBasicExample from './StoryBasicExample';
import StoryAnimateExample from './StoryAnimateExample';

import '!style-loader!css-loader!sass-loader!../../components/bootstrap-styles.scss';

storiesOf('IsotopeGrid', module)
    .add('Basic Example', () => StoryBasicExample)
    .add('With Animated Height', () => StoryAnimateExample);
