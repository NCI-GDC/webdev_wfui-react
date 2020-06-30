import React from 'react';
import { Dropzone, Button } from '../../components/';

class Example extends React.Component {
    constructor() {
        super();
        this.dropzone = undefined;
        this.onDrop = this.onDrop.bind(this);
        this.state = { files: [] };
    }
    onDrop(acceptedFiles) {
        this.setState({
            files: acceptedFiles,
        });
    }
    render() {
        return (
            <div>
                {this.state.files.length > 0 ? (
                    <div>
                        <div>
                            {this.state.files.map(file => (
                                <img src={file.preview} />
                            ))}
                        </div>
                        <Button
                            variant="primary"
                            onClick={() => {
                                this.setState({ files: [] });
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <Dropzone
                        ref={node => {
                            this.dropzone = node;
                        }}
                        onDrop={this.onDrop}
                    >
                        <div>
                            Try dropping some files here, or click to select
                            files to upload.
                        </div>
                    </Dropzone>
                )}
            </div>
        );
    }
}
export default <Example />;
