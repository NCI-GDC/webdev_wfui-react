/* eslint import/no-unresolved: 0 */
/* eslint import/no-webpack-loader-syntax: 0 */
import { storiesOf } from '@storybook/react';
import StoryBasicExample from './StoryBasicExample';

storiesOf('Drawer', module)
    .add(
        'Basic Example',
        () => StoryBasicExample
    );
