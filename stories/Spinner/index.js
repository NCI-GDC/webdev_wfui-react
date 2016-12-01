import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Spinner from '../../src/Spinner/Spinner';

storiesOf('Spinner', module)
  .addWithInfo(
    'Type 1',
        () => (
            <Spinner type={1} fontSize="20" margin="100px auto" />
        ),
        { source: true, static: true }
    )
    .addWithInfo(
    'Type 2',
    () => (
        <Spinner type={2} fontSize="20" margin="20px" />
    ),
    { source: true, static: true }
);
