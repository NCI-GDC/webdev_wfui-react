import { storiesOf } from '@storybook/react';
import StoryBasicExample from './StoryBasicExample';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

storiesOf('Editor', module).add(
    'React DraftJS Editor conversion of content from and to HTML',
    () => StoryBasicExample
);
