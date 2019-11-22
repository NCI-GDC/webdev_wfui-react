import { storiesOf } from '@storybook/react';
import StoryBasicExample from './StoryBasicExample';

import 'bootstrap/dist/css/bootstrap.css';
import '!style-loader!css-loader!sass-loader!../../components/styles.scss';

storiesOf('AdvanceModeButton', module).add(
    'Basic Example',
    () => StoryBasicExample
);
