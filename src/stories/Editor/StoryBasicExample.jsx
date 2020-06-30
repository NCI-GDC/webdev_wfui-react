import React from 'react';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { DraftJS, Editor, draftToHtml, htmlToDraft, ReactCodeMirror } from '../../components/';

const { EditorState, convertToRaw, ContentState, convertFromHTML, Modifier } = DraftJS;
const { 'Controlled': CodeMirror } = ReactCodeMirror;

class CustomMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            cursorLine: 0,
            cursorChar: 0,
        }
        this.addToken = this.addToken.bind(this);
    }
    addToken(eventKey) {
        const { editorState, onChange } = this.props;
        const contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            eventKey,
            editorState.getCurrentInlineStyle(),
        );
        onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    }
    render() {
        const { open } = this.state;
        return (
            <Dropdown id="rdw-token-wrapper" className="rdw-token-wrapper" onSelect={this.addToken}>
                <Dropdown.Toggle>
                    <span>Add Variable</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <MenuItem className="rdw-dropdownoption-default" eventKey="[1]">Token 1</MenuItem>
                    <MenuItem className="rdw-dropdownoption-default" eventKey="[2]">Token 2</MenuItem>
                    <MenuItem className="rdw-dropdownoption-default" eventKey="[3]">Token 3</MenuItem>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

class EditorConvertToHTML extends React.Component {
    constructor() {
        super();
        const html = '';
        const contentBlock = convertFromHTML(html);
        if (contentBlock && contentBlock.contentBlocks) {
            console.log('here', contentBlock);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks, contentBlock.entityMap);
            const editorState = EditorState.createWithContent(contentState);
            if (ContentState.getEnthty) {
                this.state = {
                    editorState: EditorState.createWithContent(contentState),
                    mode: true,
                };
            } else {
                this.state = {
                    editorState: EditorState.createWithContent(contentState),
                    htmlState: '',
                    mode: true,
                };
            }
        } else {
            this.state = {
                editorState: EditorState.createEmpty(),
                htmlState: '',
                mode: true,
            };
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }


    onEditorStateChange(editorState) {
        this.setState({ editorState });
    }

    render() {
        const { editorState, mode, htmlState } = this.state;
        console.log('htmlState', htmlState);
        return (
            <div>
                <button
                    onClick={() => {
                        if (mode) {
                            this.setState({ mode: false, htmlState: draftToHtml(convertToRaw(editorState.getCurrentContent())) });
                        } else {
                            const contentBlock = htmlToDraft(htmlState);
                            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                            this.setState({ mode: true, editorState: EditorState.createWithContent(contentState) });
                        }
                    }}>Button</button>
                {mode ? (
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        toolbarCustomButtons={[<CustomMenu />]}
                        hashtag={{ separator: ' ', hashCharacter: '[' }}
                    />
                ) : (
                        <CodeMirror
                            value={htmlState}
                            options={{ lineWrapping: true, lineNumbers: true }}
                            onBeforeChange={(editor, data, value) => this.setState({ htmlState: value })}
                            onCursor={(editor, data) => this.setState({ cursorLine: data.line || 0, cursorChar: data.ch || 0 })}
                        />
                    )}
            </div>
        );
    }
}

export default <EditorConvertToHTML />;