import { storiesOf } from '@storybook/react';
import StoryDefaultView from './StoryDefaultView';
import StoryValidateWithView from './StoryValidateWithView';

storiesOf('Password Validator', module)
    .add('Default View', () => StoryDefaultView)
    .add('Validate With ...', () => StoryValidateWithView);
