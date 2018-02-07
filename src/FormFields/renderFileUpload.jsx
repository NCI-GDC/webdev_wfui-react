import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { FormGroup, ControlLabel, HelpBlock } from '../index';

const generateAcceptText = props => {
    if (!props.fileTypes) return '';
    const list = props.fileTypes.reduce(
        (types, type) =>
            props.mimeTypes[type] ? props.mimeTypes[type].concat(types) : types,
        [],
    );
    return list.join(',');
};

class renderFileUpload extends React.Component {
    constructor(props) {
        super();
        this.state = {
            file: false,
            fileError: '',
            data: '',
            type: '',
            accept: generateAcceptText(props),
        };
        this.getFileKey = this.getFileKey.bind(this);
        this.renderFile = this.renderFile.bind(this);
        this.renderRemoveBtn = this.renderRemoveBtn.bind(this);
    }
    getFileKey(mime) {
        const { mimeTypes } = this.props;
        let key = '';
        Object.keys(mimeTypes).forEach(k => {
            if (mimeTypes[k].includes(mime)) {
                key = k;
            }
        });
        return key ? `file-${key}` : '';
    }
    renderRemoveBtn() {
        const { input, onRemove, txtRemove } = this.props;
        return (
            <a
                className="btn btn-danger remove-file"
                type="button"
                onClick={() => {
                    input.onChange('');
                    onRemove(input);
                    this.setState({
                        name: '',
                        date: '',
                        type: '',
                    });
                }}
            >
                {txtRemove}
            </a>
        );
    }
    renderFile() {
        const {
            input,
            onRemove,
            review,
            txtRemove,
            apiHost,
            apiFileDownload,
            appId,
        } = this.props;

        if (input.value) {
            const filePath = input.value.id
                ? `//${apiHost}${apiFileDownload}${
                      input.value.id
                  }?appid=${appId}`
                : input.value.blobPath;

            // Image File
            if (input.value.type.indexOf('image') === 0) {
                return (
                    <div>
                        <a
                            className={`${
                                review ? 'review-page' : ''
                            } ${this.getFileKey(input.value.type)}`}
                            type="button"
                            href={filePath}
                            target="_blank"
                        >
                            <img
                                src={filePath}
                                alt={input.value.name}
                                width="150"
                            />
                        </a>
                        {!review && this.renderRemoveBtn()}
                    </div>
                );
            }

            // None Image File
            return (
                <div className="btn-group">
                    <a
                        className={`btn btn-default ${
                            review ? 'review-page' : ''
                        } ${this.getFileKey(input.value.type)}`}
                        type="button"
                        href={filePath}
                        target="_blank"
                    >
                        {input.value.name}
                    </a>
                    {!review && this.renderRemoveBtn()}
                </div>
            );
        }
    }
    render() {
        const {
            className,
            globalError,
            name,
            placeholder,
            label,
            required,
            help,
            input,
            onUpload,
            onRemove,
            maxFileSize,
            disabled,
            meta: { touched, error },
            review,
            preview,
            fileTypes,
            txtRemove,
            txtUpload,
            errorFileType,
            errorFileSize,
            errorReject,
            attrs,
        } = this.props;
        const { accept, fileError } = this.state;

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    { 'wfui-form-item-error': globalError },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                )}
            >
                <ControlLabel>{label}</ControlLabel>
                {required && <b className="required"> *</b>}
                <FormGroup
                    className={'wfui-file-upload'}
                    validationState={
                        touched && (error || globalError || fileError)
                            ? 'error'
                            : null
                    }
                >
                    {this.renderFile()}
                    <Dropzone
                        className="render-file-upload"
                        name={`${input.name}`}
                        multiple={false}
                        maxSize={maxFileSize}
                        style={{
                            width: '100%',
                            borderStyle: 'none',
                            display: input.value ? 'none' : 'block',
                        }}
                        {...attrs}
                        accept={accept}
                        onDrop={(acceptedFiles, rejectedFiles) => {
                            if (acceptedFiles.length > 0) {
                                this.setState({ fileError: '' });
                                const name = acceptedFiles[0].name;
                                const reader = new FileReader();
                                reader.readAsDataURL(acceptedFiles[0]);
                                reader.onloadend = () => {
                                    const value = {
                                        name,
                                        blobPath: acceptedFiles[0].preview,
                                        data: reader.result,
                                        type: acceptedFiles[0].type,
                                    };
                                    input.onChange(value);
                                    onUpload(acceptedFiles[0], input);
                                };
                            } else {
                                input.onChange('');
                                if (!accept.includes(rejectedFiles[0].type)) {
                                    this.setState({
                                        fileError: `${errorFileType} ${fileTypes.join(
                                            ', ',
                                        )}`,
                                    });
                                } else if (
                                    rejectedFiles[0].size > maxFileSize
                                ) {
                                    this.setState({
                                        fileError: `${errorFileSize.replace(
                                            '{maxFileSize}',
                                            Math.round(maxFileSize / 1000000),
                                        )}`,
                                    });
                                } else {
                                    this.setState({
                                        fileError: errorReject,
                                    });
                                }
                            }
                        }}
                    >
                        <div
                            className="input-group"
                            style={{ position: 'relative' }}
                        >
                            <span
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 10,
                                    cursor: 'pointer',
                                }}
                            />
                            <input
                                type="text"
                                className="wfui-input-field__input form-control"
                                {...input}
                                placeholder={placeholder}
                            />
                            <span className="input-group-btn">
                                <button className="btn btn-info" type="button">
                                    {txtUpload}
                                </button>
                            </span>
                        </div>
                    </Dropzone>
                    {fileError && (
                        <HelpBlock className="wfui-form-error">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: fileError,
                                }}
                            />
                        </HelpBlock>
                    )}
                    {touched &&
                        globalError && (
                            <HelpBlock className="wfui-form-error">
                                <span>{globalError}</span>
                            </HelpBlock>
                        )}
                    {help && (
                        <div
                            className="wfui-form-description"
                            dangerouslySetInnerHTML={{ __html: help }}
                        />
                    )}
                </FormGroup>
            </div>
        );
    }
}
renderFileUpload.propTypes = {
    appId: PropTypes.string,
    apiHost: PropTypes.string,
    apiFileDownload: PropTypes.string,
    onUpload: PropTypes.func,
    onRemove: PropTypes.func,
    mimeTypes: PropTypes.object,
    txtRemove: PropTypes.string,
    txtUpload: PropTypes.string,
    errorFileType: PropTypes.string,
    errorFileSize: PropTypes.string,
    errorReject: PropTypes.string,
};
renderFileUpload.defaultProps = {
    appId: '',
    apiHost: '',
    apiFileDownload: '/file/file',
    onUpload: () => {},
    onRemove: () => {},
    txtRemove: 'Remove',
    txtUpload: 'Upload',
    errorFileType: 'Only files with the following extensions are allowed:',
    errorFileSize:
        'The file is exceeding the maximum file size of <i>{maxFileSize} MB</i>',
    errorReject: 'The file is rejected to upload.',
    mimeTypes: {
        pdf: ['application/pdf'],
        word: [
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        xls: [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ],
        ppt: [
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        ],
        txt: ['text/plain'],
        png: ['image/png'],
        jpg: ['image/jpeg', 'image/pjpeg'],
        gif: ['image/gif'],
    },
};

export default renderFileUpload;
