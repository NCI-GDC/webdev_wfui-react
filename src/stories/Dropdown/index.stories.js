import { storiesOf } from '@storybook/react';
import Story from './Story';
import Story2 from './Story2';

storiesOf('Dropdown', module)
    .add('React Bootstrap Dropdown', () => Story)
    .add('Customized Dropdown', () => Story2);
