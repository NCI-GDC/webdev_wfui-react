import { storiesOf } from '@storybook/react';
import StoryBasicExample from './StoryBasicExample';

storiesOf('Editor', module).add(
    'React DraftJS Editor conversion of content from and to HTML',
    () => StoryBasicExample
);
