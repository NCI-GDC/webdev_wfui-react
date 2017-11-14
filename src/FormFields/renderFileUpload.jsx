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
            filename: '',
            fileError: '',
            data: '',
            filetype: '',
            accept: generateAcceptText(props),
        };
    }
    componentWillMount() {
        const { file, input } = this.props;
        if (file) {
            this.setState({
                filename: file.filename,
                data: file.data,
                filetype: file.filetype,
            });
        }
        input.onChange(file ? file.filename : '');
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
            maxFileSize,
            disabled,
            meta: { touched, error },
            review,
            fileTypes,
            txtRemove,
            txtUpload,
            errorFileType,
            errorFileSize,
            errorReject,
        } = this.props;
        const { accept, fileError, data, filetype, filename } = this.state;

        return (
            <div
                className={classNames(
                    className,
                    'wfui-form-item',
                    { 'wfui-form-item-error': globalError },
                    { 'wfui-form-disabled': disabled },
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
                    {input.value && (
                        <div className="btn-group">
                            <a
                                className={`btn btn-default ${review
                                    ? 'review-page'
                                    : ''} ${filetype === 'application/pdf'
                                    ? 'link-pdf'
                                    : 'link-doc'}`}
                                type="button"
                                href={data}
                                target="_blank"
                            >
                                <span>{filename}</span>
                            </a>
                            {input.value &&
                                !review && (
                                    <a
                                        className="btn btn-danger remove-file"
                                        type="button"
                                        onClick={() => {
                                            input.onChange('');
                                            this.setState({
                                                filename: '',
                                                date: '',
                                                filetype: '',
                                            });
                                        }}
                                    >
                                        {txtRemove}
                                    </a>
                                )}
                        </div>
                    )}
                    <Dropzone
                        name={`${name}`}
                        multiple={false}
                        maxSize={maxFileSize}
                        style={{
                            width: '100%',
                            borderStyle: 'none',
                            display: input.value || disabled ? 'none' : 'block',
                        }}
                        accept={accept}
                        onDrop={(acceptedFiles, rejectedFiles) => {
                            if (acceptedFiles.length > 0) {
                                this.setState({ fileError: '' });
                                const filename = acceptedFiles[0].name;
                                this.setState({
                                    filename,
                                    data: acceptedFiles[0].preview,
                                    filetype: acceptedFiles[0].type,
                                });
                                input.onChange(filename);
                                onUpload({
                                    name: input.name,
                                    file: {
                                        filename,
                                        data: acceptedFiles[0].preview,
                                        filetype: acceptedFiles[0].type,
                                    },
                                });
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
                                            maxFileSize,
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
    onUpload: PropTypes.func,
    mimeTypes: PropTypes.object,
    txtRemove: PropTypes.string,
    txtUpload: PropTypes.string,
    errorFileType: PropTypes.string,
    errorFileSize: PropTypes.string,
    errorReject: PropTypes.string,
};
renderFileUpload.defaultProps = {
    onUpload: () => {},
    txtRemove: 'Remove',
    txtUpload: 'Upload',
    errorFileType: 'Only files with the following extensions are allowed:',
    errorFileSize:
        'The file is exceeding the maximum file size of <i>{maxFileSize}</i>',
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
