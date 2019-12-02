import { storiesOf } from '@storybook/react';
import StoryBasicExample from './StoryBasicExample';

import '!style-loader!css-loader!sass-loader!../../components/bootstrap-styles.scss';

storiesOf('SwitchButton', module).add('Basic Example', () => StoryBasicExample);
