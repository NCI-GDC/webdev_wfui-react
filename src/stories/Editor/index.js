import React from 'react';
import { storiesOf } from '@storybook/react';
import { Dropdown, MenuItem } from 'react-bootstrap';
import StoryBasicExample from 'raw!./StoryBasicExample.src';
import { DraftJS, Editor, draftToHtml, htmlToDraft, ReactCodeMirror } from '../../src/';

const { EditorState, convertToRaw, ContentState, convertFromHTML, Modifier } = DraftJS;
const { 'Controlled': CodeMirror } = ReactCodeMirror;

storiesOf('Editor', module).add(
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
