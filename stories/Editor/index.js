import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Dropdown, MenuItem } from 'react-bootstrap';
import StoryBasicExample from 'raw!./StoryBasicExample.src';
import { DraftJS, Editor, draftToHtml, htmlToDraft } from '../../src/';
import { Controlled as CodeMirror } from '../../src/';

const { EditorState, convertToRaw, ContentState, convertFromHTML, Modifier } = DraftJS;

storiesOf('Editor', module).addWithInfo(
    'React DraftJS Editor conversion of content from and to HTML',
    () => StoryBasicExample,
    {
        scope: {
            Editor,
            draftToHtml,
            htmlToDraft,
            EditorState,
            convertToRaw,
            ContentState,
            convertFromHTML,
            Modifier,
            Dropdown,
            MenuItem,
            CodeMirror
        },
        source: true,
        static: true,
    },
);
