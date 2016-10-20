import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Spinner from '../src/Spinner/Spinner';

storiesOf('Spinner', module)
  .addWithInfo(
    'Basic', 
    () => (
        <Spinner type="Basic" />
    ),
    { inline: true }
);