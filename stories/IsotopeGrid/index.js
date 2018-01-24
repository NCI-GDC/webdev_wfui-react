import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { storiesOf } from '@kadira/storybook';
import IsotopeGrid from '../../src/IsotopeGrid/IsotopeGrid';
import StoryBasicExample from 'raw!./StoryBasicExample.src';

storiesOf('IsotopeGrid', module).addWithInfo('Basic Example', () => StoryBasicExample, {
    scope: { IsotopeGrid, Button, ButtonGroup },
});
