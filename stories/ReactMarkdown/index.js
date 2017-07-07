import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ReactMarkdown from 'react-markdown';
import Story from 'raw!./Story.src';

storiesOf('ReactMarkdown', module)
.addWithInfo(
    'React Markdown',
    () => Story,
    { scope: { ReactMarkdown } },
);
