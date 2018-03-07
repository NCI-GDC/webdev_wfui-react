import React from 'react';
import { storiesOf } from '@kadira/storybook';
import StoryBasicExample from 'raw!./StoryBasicExample.src';
import { DraftJS, Editor, draftToHtml, htmlToDraft } from '../../src/';

const { EditorState, convertToRaw, ContentState } = DraftJS;

storiesOf('Editor', module).addWithInfo(
    'React DraftJS Editor conversion of content from and to HTML',
    () => StoryBasicExample,
    {
        scope: { Editor, draftToHtml, htmlToDraft, EditorState, convertToRaw, ContentState },
        source: true,
        static: true,
    },
);
