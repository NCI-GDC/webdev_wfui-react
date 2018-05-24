import React, { cloneElement } from 'react';
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
            src: '',
            file: false,
            fileError: '',
            data: '',
            type: '',
            accept: generateAcceptText(props),
            removing: [],
            initialValue: props.input.value,
        };
        this.getFileKey = this.getFileKey.bind(this);
        this.renderFile = this.renderFile.bind(this);
        this.renderRemoveBtn = this.renderRemoveBtn.bind(this);
        this.renderDropzone = this.renderDropzone.bind(this);
        this.renderDisabledDropzone = this.renderDisabledDropzone.bind(this);
        this.renderChildComponets = this.renderChildComponets.bind(this);
        this.setFile(props);
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
        const { input, onRemove, txtRemove, disabled } = this.props;
        const { removing } = this.state;
        if (!disabled) {
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
                            removing: input.value.id
                                ? removing.concat(input.value.id)
                                : removing,
                        });
                    }}
                >
                    {txtRemove}
                </a>
            );
        }
        return null;
    }
    componentWillReceiveProps(nextProps) {
        const { fileTypes, input } = this.props;
        if (nextProps.fileTypes !== fileTypes) {
            this.setState({ accept: generateAcceptText(nextProps) });
        }
        if (
            JSON.stringify(input.value) !==
            JSON.stringify(nextProps.input.value)
        ) {
            this.setFile(nextProps);
        }
    }
    setFile(props) {
        const { input, fileDownloadPath } = props;

        if (input.value.id) {
            // If images is from image API.
            this.setState({
                src: fileDownloadPath.replace(':id', input.value.id),
            });
        } else if (input.value.blobPath) {
            // If images is blob object just uploaded.
            this.setState({ src: input.value.blobPath });
        } else if (input.value.src) {
            // Verify
            fetch(input.value.src).then(res => {
                if (res.ok) {
                    this.setState({ src: input.value.src });
                } else {
                    this.setState({ src: input.value.src });
                }
            });
        }
    }
    renderFile() {
        const {
            input,
            onRemove,
            review,
            txtRemove,
            fileDownloadPath,
        } = this.props;
        const { src } = this.state;

        if (input.value && Object.keys(input.value).length) {
            // Image File
            if (input.value.type && input.value.type.indexOf('image') === 0) {
                return (
                    <div>
                        {src ? (
                            <a
                                className={`${
                                    review ? 'review-page' : ''
                                } ${this.getFileKey(input.value.type)}`}
                                type="button"
                                href={src}
                                target="_blank"
                            >
                                <img
                                    src={src}
                                    alt={input.value.name}
                                    width="150"
                                />
                            </a>
                        ) : (
                            <span>The image is not available.</span>
                        )}
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
                        href={src}
                        target="_blank"
                    >
                        {input.value.name}
                    </a>
                    {!review && this.renderRemoveBtn()}
                </div>
            );
        }
    }
    renderChildComponets() {
        const {
            componentId,
            placeholder,
            input,
            onUpload,
            maxFileSize,
            fileTypes,
            txtUpload,
            maxFileSizeText,
            allowedExtensionText,
            errorFileType,
            errorFileSize,
            errorReject,
            attrs,
            disabled,
        } = this.props;
        const { accept, removing } = this.state;

        const child = [
            <div
                className="input-group"
                style={{ position: 'relative' }}
                key="input-group"
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
                    value=""
                    placeholder={placeholder}
                    disabled={disabled}
                />
                <span className="input-group-btn">
                    <button className="btn btn-primary" type="button">
                        {txtUpload}
                    </button>
                </span>
            </div>,
            <p
                className="wfui-form-file-upload-spec"
                key="wfui-form-file-upload-spec"
            >
                <span className="filesize">
                    {maxFileSizeText.replace(
                        '{maxFileSize}',
                        Math.floor(maxFileSize / 1000000),
                    )}
                </span>
                <span className="filetypes">
                    {allowedExtensionText.replace(
                        '{fileTypes}',
                        fileTypes.join(', '),
                    )}
                </span>
            </p>,
        ];
        if (removing) {
            child.push(
                removing.map((fileid, i) => (
                    <input
                        key={i}
                        name={input.name}
                        className={`render-file-upload-removing-file file-upload-componentid-${componentId}`}
                        type="hidden"
                        value={fileid}
                    />
                )),
            );
        }
        return child;
    }
    renderDisabledDropzone() {
        const {
            componentId,
            placeholder,
            input,
            onUpload,
            maxFileSize,
            fileTypes,
            txtUpload,
            maxFileSizeText,
            allowedExtensionText,
            errorFileType,
            errorFileSize,
            errorReject,
            attrs,
            disabled,
            preview,
        } = this.props;
        const { accept, removing } = this.state;

        return (
            <div
                className="render-file-upload file-upload-componentid-undefined"
                style={{
                    width: '100%',
                    borderStyle: 'none',
                    display:
                        input.value && Object.keys(input.value).length
                            ? 'none'
                            : 'block',
                }}
            >
                {!preview && this.renderChildComponets()}
            </div>
        );
    }
    renderDropzone() {
        const {
            componentId,
            placeholder,
            input,
            onUpload,
            maxFileSize,
            fileTypes,
            txtUpload,
            maxFileSizeText,
            allowedExtensionText,
            errorFileType,
            errorFileSize,
            errorReject,
            attrs,
        } = this.props;
        const { accept, removing, initialValue } = this.state;

        return (
            <Dropzone
                className={`render-file-upload file-upload-componentid-${componentId}`}
                name={`${input.name}`}
                multiple={false}
                maxSize={maxFileSize}
                style={{
                    width: '100%',
                    borderStyle: 'none',
                    display:
                        input.value && Object.keys(input.value).length
                            ? 'none'
                            : 'block',
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
                            if (initialValue.src) {
                                value.src = initialValue.src;
                            }
                            input.onChange(value);
                            onUpload(value, input, acceptedFiles[0]);
                        };
                    } else {
                        input.onChange('');
                        if (!accept.includes(rejectedFiles[0].type)) {
                            this.setState({
                                fileError: `${errorFileType} ${fileTypes.join(
                                    ', ',
                                )}`,
                            });
                        } else if (rejectedFiles[0].size > maxFileSize) {
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
                {this.renderChildComponets()}
            </Dropzone>
        );
    }
    render() {
        const {
            className,
            globalError,
            label,
            required,
            help,
            input,
            maxFileSize,
            disabled,
            meta: { touched, error },
            review,
            preview,
            descDisplay,
            fullWidth,
        } = this.props;
        const { fileError } = this.state;

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    { 'wfui-form-item-error': globalError },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                    { answered: input.value },
                    { 'wfui-form-item-full-width': fullWidth },
                )}
            >
                {label && (
                    <div className="wfui-form-label">
                        <ControlLabel>
                            {label}
                            {required && <b className="required"> *</b>}
                        </ControlLabel>
                    </div>
                )}
                <FormGroup
                    className={`wfui-form-field ${
                        descDisplay
                            ? 'wfui-form-field-with-desctipton'
                            : 'wfui-form-field-no-desctipton'
                    } wfui-file-upload`}
                    validationState={
                        touched && (error || globalError || fileError)
                            ? 'error'
                            : null
                    }
                >
                    {this.renderFile()}
                    {!disabled
                        ? this.renderDropzone()
                        : this.renderDisabledDropzone()}
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
                    {help &&
                        !preview && (
                            <div
                                className="wfui-form-help"
                                dangerouslySetInnerHTML={{ __html: help }}
                            />
                        )}
                </FormGroup>
                {descDisplay && !preview ? cloneElement(descDisplay) : ''}
            </div>
        );
    }
}
renderFileUpload.propTypes = {
    onUpload: PropTypes.func,
    onRemove: PropTypes.func,
    mimeTypes: PropTypes.object,
    txtRemove: PropTypes.string,
    txtUpload: PropTypes.string,
    maxFileSizeText: PropTypes.string,
    errorFileType: PropTypes.string,
    errorFileSize: PropTypes.string,
    errorReject: PropTypes.string,
    fileDownloadPath: PropTypes.string.isRequired,
    fullWidth: PropTypes.bool,
};
renderFileUpload.defaultProps = {
    onUpload: () => {},
    onRemove: () => {},
    txtRemove: 'Remove',
    txtUpload: 'Upload',
    errorFileType: 'Only files with the following extensions are allowed:',
    errorFileSize:
        'The file is exceeding the maximum file size of <i>{maxFileSize} MB</i>',
    errorReject: 'The file is rejected to upload.',
    maxFileSizeText: 'Max file size: {maxFileSize}MB',
    allowedExtensionText: 'Allowed extensions: {fileTypes}',
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
    fileDownloadPath: '',
    fullWidth: false,
};

export default renderFileUpload;
