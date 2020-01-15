/* eslint import/no-webpack-loader-syntax: off */
import { storiesOf } from '@storybook/react';
import StoryBasicExample from './StoryBasicExample';
import StoryAnimateExample from './StoryAnimateExample';

storiesOf('IsotopeGrid', module)
    .add('Basic Example', () => StoryBasicExample)
    .add('With Animated Height', () => StoryAnimateExample);
