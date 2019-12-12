import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import {
    FormGroup,
    ControlLabel,
    HelpBlock,
    Form,
    Col,
    Button,
} from '../index';

const generateAcceptText = props => {
    if (!props.fileTypes) return '';
    const list = props.fileTypes.reduce(
        (types, type) =>
            props.mimeTypes[type] ? props.mimeTypes[type].concat(types) : types,
        []
    );
    return list.join(',');
};

class renderFileUpload extends React.Component {
    constructor(props) {
        super();
        this.state = {
            src: this.setFile(props),
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
                <Button
                    variant="danger"
                    className="remove-file"
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
                </Button>
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
        const { input, fileDownloadPath, fallbackPath } = props;

        let src = '';
        if (input.value.blobPath) {
            // Check if blob is available at the moment.
            fetch(input.value.blobPath)
                .then(res => {
                    // If images is blob object just uploaded.
                    src = input.value.blobPath;
                    this.setState({ src });
                })
                .catch(err => {
                    input.onChange('');
                });
        } else if (input.value.data) {
            src = input.value.data;
            this.setState({ src });
        } else if (input.value.id) {
            // If images is from image API.
            src = fileDownloadPath.replace(':id', input.value.id);
            this.setState({ src });
        } else if (input.value.src) {
            // Verify
            fetch(input.value.src).then(res => {
                if (res.ok) {
                    this.setState({ src: input.value.src });
                } else {
                    this.setState({
                        src: `${fallbackPath}${encodeURI(input.value.src)}`,
                    });
                }
            });
        }

        return src;
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
                    {input.value.name && (
                        <a
                            className={`btn btn-outline-primary ${
                                review ? 'review-page' : ''
                            } ${this.getFileKey(input.value.type)}`}
                            href={src}
                            target="_blank"
                        >
                            {input.value.name}
                        </a>
                    )}
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
                        left: 0,
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
                <div className="input-group-append">
                    <Button variant="primary">{txtUpload}</Button>
                </div>
            </div>,
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
                ))
            );
        }
        return child;
    }

    renderDisabledDropzone() {
        const { input, preview } = this.props;

        if (
            preview &&
            (!input.value || Object.keys(input.value).length === 0)
        ) {
            return <span className="no-item">( No File )</span>;
        }
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
                {this.renderChildComponets()}
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
            isPublic,
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
                        const { name } = acceptedFiles[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(acceptedFiles[0]);
                        reader.onloadend = () => {
                            const value = {
                                name,
                                blobPath: acceptedFiles[0].preview,
                                data: reader.result,
                                type: acceptedFiles[0].type,
                                size: acceptedFiles[0].size,
                                isPublic,
                            };
                            if (initialValue.src) {
                                value.src = initialValue.src;
                            }
                            if (initialValue.id) {
                                value.id = initialValue.id;
                            }
                            input.onChange(value);
                            onUpload(value, input, acceptedFiles[0]);
                        };
                    } else {
                        input.onChange('');
                        if (!accept.includes(rejectedFiles[0].type)) {
                            this.setState({
                                fileError: `${errorFileType} ${fileTypes.join(
                                    ', '
                                )}`,
                            });
                        } else if (rejectedFiles[0].size > maxFileSize) {
                            this.setState({
                                fileError: `${errorFileSize.replace(
                                    '{maxFileSize}',
                                    Math.round(maxFileSize / 1000000)
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
            meta: { touched, error, data },
            preview,
            descDisplay,
            maxFileSizeText,
            allowedExtensionText,
            fileTypes,
            fullWidth,
            inline,
        } = this.props;
        const { fileError } = this.state;

        const fileSizeTextConvert = Math.floor(maxFileSize / 1000000);

        return (
            <Form.Row
                className={classNames(
                    className,
                    'wfui-form-item',
                    {
                        'wfui-form-item-error':
                            touched && (error || globalError),
                    },
                    {
                        'wfui-form-item-warning': touched && data.warning,
                    },
                    { 'wfui-form-disabled': disabled },
                    { 'wfui-form-preview': preview },
                    { answered: input.value },
                    { 'wfui-form-item-full-width': fullWidth }
                )}
            >
                {label && (
                    <Col
                        xs={12}
                        lg={inline ? 2 : 12}
                        className="wfui-form-label"
                    >
                        <ControlLabel>
                            {label}
                            {required && <b className="required"> *</b>}
                        </ControlLabel>
                    </Col>
                )}
                <FormGroup
                    as={Col}
                    xs={12}
                    lg={
                        inline
                            ? descDisplay && !preview
                                ? 4
                                : 10
                            : descDisplay && !preview
                            ? 6
                            : 12
                    }
                    className={`wfui-form-field ${
                        descDisplay
                            ? 'wfui-form-field-with-description'
                            : 'wfui-form-field-no-description'
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
                    {!preview && (
                        <p
                            className="wfui-form-file-upload-spec"
                            key="wfui-form-file-upload-spec"
                        >
                            <span className="filesize">
                                {maxFileSizeText
                                    .replace(
                                        '{maxFileSize}',
                                        fileSizeTextConvert > 1000
                                            ? Math.floor(
                                                  fileSizeTextConvert / 1000
                                              )
                                            : fileSizeTextConvert
                                    )
                                    .replace(
                                        '{unit}',
                                        fileSizeTextConvert > 1000 ? 'GB' : 'MB'
                                    )}
                            </span>
                            {fileTypes && fileTypes.length > 0 && (
                                <span className="filetypes">
                                    {allowedExtensionText.replace(
                                        '{fileTypes}',
                                        fileTypes.join(', ')
                                    )}
                                </span>
                            )}
                        </p>
                    )}
                    {fileError && (
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: fileError,
                                }}
                            />
                        </Form.Control.Feedback>
                    )}
                    {touched && data.warning && (
                        <Form.Control.Feedback
                            className="wfui-form-warning"
                            type="valid"
                        >
                            <span>{data.warning}</span>
                        </Form.Control.Feedback>
                    )}
                    {touched && globalError && (
                        <Form.Control.Feedback
                            className="wfui-form-error"
                            type="invalid"
                        >
                            <span>{globalError}</span>
                        </Form.Control.Feedback>
                    )}
                    {help && !preview && (
                        <HelpBlock className="wfui-form-help text-muted">
                            <div dangerouslySetInnerHTML={{ __html: help }} />
                        </HelpBlock>
                    )}
                </FormGroup>
                {descDisplay && !preview ? (
                    <Col
                        className="wfui-form-description"
                        xs={12}
                        lg={{ span: 6, offset: 0 }}
                    >
                        {cloneElement(descDisplay)}
                    </Col>
                ) : null}
            </Form.Row>
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
    isPublic: PropTypes.bool,
};
renderFileUpload.defaultProps = {
    onUpload: () => {},
    onRemove: () => {},
    maxFileSize: 100000000,
    txtRemove: 'Remove',
    txtUpload: 'Upload',
    errorFileType: 'Only files with the following extensions are allowed:',
    errorFileSize:
        'The file is exceeding the maximum file size of <i>{maxFileSize} MB</i>',
    errorReject: 'The file is rejected to upload.',
    maxFileSizeText: 'Max file size: {maxFileSize}{unit}',
    allowedExtensionText: 'Allowed extensions: {fileTypes}',
    mimeTypes: {
        pdf: ['application/pdf'],
        doc: ['application/msword'],
        dot: ['application/msword'],
        docx: [
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        dotx: [
            'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
        ],
        docm: ['application/vnd.ms-word.document.macroEnabled.12'],
        dotm: ['application/vnd.ms-word.template.macroEnabled.12'],
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
        svg: ['image/svg+xml'],
    },
    fileDownloadPath: '',
    fallbackPath: '',
    fullWidth: false,
    isPublic: false,
};

export default renderFileUpload;
