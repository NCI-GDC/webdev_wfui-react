import { storiesOf } from '@storybook/react';
import StoryBasicExample from './StoryBasicExample';
import StoryRealUseCase from './StoryRealUseCase';
import StoryCustomContainer from './StoryCustomContainer';

storiesOf('FilteredList', module)
    .add('Basic Example', () => StoryBasicExample)
    .add('Real Use Case', () => StoryRealUseCase)
    .add('Custom Container', () => StoryCustomContainer);
