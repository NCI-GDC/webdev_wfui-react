import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StoryDefaultView from 'raw!./StoryDefaultView.src';
import PasswordValidator from '../../src/PasswordValidator/PasswordValidator';

storiesOf('Password Validator', module)
  .addWithInfo(
    'Default View',
    () => StoryDefaultView,
    { scope: { PasswordValidator }, source: true, static: true },
);