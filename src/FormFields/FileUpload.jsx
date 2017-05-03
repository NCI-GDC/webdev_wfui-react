import React from 'react';
import { Dropzone } from 'wfui-react';

/**
 * Reducer
 */
export const filesReducer = (state = {}, action) => {
    const _state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'UPLOAD_FILE':
            _state[action.name] = action.file;
            return _state;
        default:
            return state;
    }
};

/**
 * Action
 */
export const uploadFile = (values) => {
    return (dispatch) => {
        dispatch({
            type: 'UPLOAD_FILE',
            file: values.file,
            name: values.name,
        });
    };
};

/**
 * Component
 */
export class FileUploadField extends React.Component {
    constructor() {
        super();
        this.state = { file: false, filename: '', fileError: '', data: '', filetype: '' };
    }
    componentWillMount() {
        const { file, input } = this.props;
        if (file) {
            this.setState({ filename: file.filename, data: file.data, filetype: file.filetype });
        }
        input.onChange(file ? file.filename : '');
    }
    render() {
        const { name, required, onUpload, maxFileSize, accept, disabled, meta: { touched, error }, input, label, placeholder, helpblock , review} = this.props;        
        const { fileError, data, filetype, filename } = this.state;

        if (disabled || input.value) {
            return(
                <div className="form-fields">
                <div className="wfui-type-input-field">
                    <div className="wfui-input-field">
                        <div className="wfui-input-field__body input-file">
                            <label className="wfui-input-field__label control-label">{label}: {required && <span className="form-required" title="This field is required."> *</span>}</label>
                            <div className="btn-group">
                                <a className={`btn btn-default ${review ? 'review-page' : ''} ${filetype === 'application/pdf' ? 'link-pdf' : 'link-doc'}`} type="button" href={data} target="_blank" >
                                    <span>{filename}</span>
                                </a>
                                {input.value && !review && <a className="btn btn-danger remove-file" type="button" onClick={() => {
                                    input.onChange('');
                                    this.setState({ filename: '', date: '', filetype: '' });
                                }}>Remove</a>}
                            </div>
                        </div>
                    </div>
                </div>
                </div>      
            );
        }
        else {
        return (
            <div className="form-fields">
                <div className="wfui-type-input-field">
                    <div className="wfui-input-field">
                        <div className="wfui-input-field__body input-file">
                            <label className="wfui-input-field__label control-label">{label}: {required && <span className="form-required" title="This field is required."> *</span>}</label>
                            <Dropzone
                                name={`${name}_file`}
                                multiple={false}
                                maxSize={maxFileSize}
                                style={{
                                    width: '100%',
                                    borderStyle: 'none',
                                }}
                                accept={accept}
                                onDrop={( acceptedFiles, rejectedFiles ) => {
                                    if (acceptedFiles.length > 0) {
                                        this.setState({ fileError: '' });
                                        const filename = acceptedFiles[0].name;
                                        this.setState({ filename, data: acceptedFiles[0].preview, filetype: acceptedFiles[0].type });
                                        input.onChange(filename);
                                        onUpload({ name: input.name, file: { filename, data: acceptedFiles[0].preview, filetype: acceptedFiles[0].type } });

                                        {/*const reader = new FileReader();
                                        reader.readAsDataURL(acceptedFiles[0]); 
                                        reader.onloadend = () => {
                                            onUpload({ name, file: { filename, data: reader.result } });
                                        };*/}

                                    } else {
                                        input.onChange('');
                                        if (!accept.includes(rejectedFiles[0].type)) {
                                            this.setState({ fileError: 'Only files with the following extensions are allowed: pdf, doc, docx' });
                                        } else if (rejectedFiles[0].size > maxFileSize ) {
                                            this.setState({ fileError: `The file is exceeding the maximum file size of <i>${maxFileSize}</i>` });
                                        } else {
                                            this.setState({ fileError: 'The file is rejected to upload.' });
                                        }
                                    }
                                }}
                            >
                                <div className="input-group" style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 10, cursor: 'pointer' }}></span>
                                    <input type="text" className="wfui-input-field__input form-control" {...input} placeholder={placeholder} />
                                    <span className="input-group-btn">
                                        <button className="btn btn-info" type="button">Upload</button>
                                    </span>
                                </div>
                                { !fileError && touched && error && <div className="messages alert-danger" >{error}</div> }
                                { fileError && <div className="messages alert-danger" dangerouslySetInnerHTML={{ __html: fileError }} /> }
                            </Dropzone>
                        </div>
                        <div className="wfui-grid__description">
                            { helpblock && <p className="help-block" dangerouslySetInnerHTML={{ __html: helpblock }} /> }
                        </div>
                    </div>
                </div>
            </div>
        );
        }
    }
}
FileUploadField.propTypes = {
    onUpload: React.PropTypes.func,
};
FileUploadField.defaultProps = {
    onUpload: () => {},
};
