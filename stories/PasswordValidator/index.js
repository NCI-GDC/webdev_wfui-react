import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StoryDefaultView from 'raw!./StoryDefaultView.src';
import StoryValidateWithView from 'raw!./StoryValidateWithView.src';
import PasswordValidator from '../../src/PasswordValidator/PasswordValidator';

storiesOf('Password Validator', module)
    .addWithInfo('Default View', () => StoryDefaultView, {
        scope: { PasswordValidator },
        source: true,
        static: true,
    })
    .addWithInfo('Validate With ...', () => StoryValidateWithView, {
        scope: { PasswordValidator },
        source: true,
        static: true,
    });
