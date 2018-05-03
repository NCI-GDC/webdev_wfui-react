'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var generateAcceptText = function generateAcceptText(props) {
    if (!props.fileTypes) return '';
    var list = props.fileTypes.reduce(function (types, type) {
        return props.mimeTypes[type] ? props.mimeTypes[type].concat(types) : types;
    }, []);
    return list.join(',');
};

var renderFileUpload = function (_React$Component) {
    _inherits(renderFileUpload, _React$Component);

    function renderFileUpload(props) {
        _classCallCheck(this, renderFileUpload);

        var _this = _possibleConstructorReturn(this, (renderFileUpload.__proto__ || Object.getPrototypeOf(renderFileUpload)).call(this));

        _this.state = {
            file: false,
            fileError: '',
            data: '',
            type: '',
            accept: generateAcceptText(props),
            removing: []
        };
        _this.getFileKey = _this.getFileKey.bind(_this);
        _this.renderFile = _this.renderFile.bind(_this);
        _this.renderRemoveBtn = _this.renderRemoveBtn.bind(_this);
        _this.renderDropzone = _this.renderDropzone.bind(_this);
        _this.renderDisabledDropzone = _this.renderDisabledDropzone.bind(_this);
        _this.renderChildComponets = _this.renderChildComponets.bind(_this);
        return _this;
    }

    _createClass(renderFileUpload, [{
        key: 'getFileKey',
        value: function getFileKey(mime) {
            var mimeTypes = this.props.mimeTypes;

            var key = '';
            Object.keys(mimeTypes).forEach(function (k) {
                if (mimeTypes[k].includes(mime)) {
                    key = k;
                }
            });
            return key ? 'file-' + key : '';
        }
    }, {
        key: 'renderRemoveBtn',
        value: function renderRemoveBtn() {
            var _this2 = this;

            var _props = this.props,
                input = _props.input,
                onRemove = _props.onRemove,
                txtRemove = _props.txtRemove,
                disabled = _props.disabled;
            var removing = this.state.removing;

            if (!disabled) {
                return _react2.default.createElement(
                    'a',
                    {
                        className: 'btn btn-danger remove-file',
                        type: 'button',
                        onClick: function onClick() {
                            input.onChange('');
                            onRemove(input);

                            _this2.setState({
                                name: '',
                                date: '',
                                type: '',
                                removing: input.value.id ? removing.concat(input.value.id) : removing
                            });
                        }
                    },
                    txtRemove
                );
            }
            return null;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var fileTypes = this.props.fileTypes;

            if (nextProps.fileTypes !== fileTypes) {
                this.setState({ accept: generateAcceptText(nextProps) });
            }
        }
    }, {
        key: 'renderFile',
        value: function renderFile() {
            var _props2 = this.props,
                input = _props2.input,
                onRemove = _props2.onRemove,
                review = _props2.review,
                txtRemove = _props2.txtRemove,
                fileDownloadPath = _props2.fileDownloadPath;


            if (input.value && Object.keys(input.value).length) {
                var filePath = input.value.id ? fileDownloadPath.replace(':id', input.value.id) : input.value.blobPath || input.value.src;

                // Image File
                if (input.value.type && input.value.type.indexOf('image') === 0) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'a',
                            {
                                className: (review ? 'review-page' : '') + ' ' + this.getFileKey(input.value.type),
                                type: 'button',
                                href: filePath,
                                target: '_blank'
                            },
                            _react2.default.createElement('img', {
                                src: filePath,
                                alt: input.value.name,
                                width: '150'
                            })
                        ),
                        !review && this.renderRemoveBtn()
                    );
                }

                // None Image File
                return _react2.default.createElement(
                    'div',
                    { className: 'btn-group' },
                    _react2.default.createElement(
                        'a',
                        {
                            className: 'btn btn-default ' + (review ? 'review-page' : '') + ' ' + this.getFileKey(input.value.type),
                            type: 'button',
                            href: filePath,
                            target: '_blank'
                        },
                        input.value.name
                    ),
                    !review && this.renderRemoveBtn()
                );
            }
        }
    }, {
        key: 'renderChildComponets',
        value: function renderChildComponets() {
            var _props3 = this.props,
                componentId = _props3.componentId,
                placeholder = _props3.placeholder,
                input = _props3.input,
                onUpload = _props3.onUpload,
                maxFileSize = _props3.maxFileSize,
                fileTypes = _props3.fileTypes,
                txtUpload = _props3.txtUpload,
                maxFileSizeText = _props3.maxFileSizeText,
                allowedExtensionText = _props3.allowedExtensionText,
                errorFileType = _props3.errorFileType,
                errorFileSize = _props3.errorFileSize,
                errorReject = _props3.errorReject,
                attrs = _props3.attrs,
                disabled = _props3.disabled;
            var _state = this.state,
                accept = _state.accept,
                removing = _state.removing;


            var child = [_react2.default.createElement(
                'div',
                { className: 'input-group', style: { position: 'relative' } },
                _react2.default.createElement('span', {
                    style: {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        zIndex: 10,
                        cursor: 'pointer'
                    }
                }),
                _react2.default.createElement('input', _extends({
                    type: 'text',
                    className: 'wfui-input-field__input form-control'
                }, input, {
                    value: '',
                    placeholder: placeholder,
                    disabled: disabled
                })),
                _react2.default.createElement(
                    'span',
                    { className: 'input-group-btn' },
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-info', type: 'button' },
                        txtUpload
                    )
                )
            ), _react2.default.createElement(
                'p',
                { className: 'wfui-form-file-upload-spec' },
                _react2.default.createElement(
                    'span',
                    { className: 'filesize' },
                    maxFileSizeText.replace('{maxFileSize}', Math.floor(maxFileSize / 1000000))
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'filetypes' },
                    allowedExtensionText.replace('{fileTypes}', fileTypes.join(', '))
                )
            )];
            if (removing) {
                child.push(removing.map(function (fileid, i) {
                    return _react2.default.createElement('input', {
                        key: i,
                        name: input.name,
                        className: 'render-file-upload-removing-file file-upload-componentid-' + componentId,
                        type: 'hidden',
                        value: fileid
                    });
                }));
            }
            return child;
        }
    }, {
        key: 'renderDisabledDropzone',
        value: function renderDisabledDropzone() {
            var _props4 = this.props,
                componentId = _props4.componentId,
                placeholder = _props4.placeholder,
                input = _props4.input,
                onUpload = _props4.onUpload,
                maxFileSize = _props4.maxFileSize,
                fileTypes = _props4.fileTypes,
                txtUpload = _props4.txtUpload,
                maxFileSizeText = _props4.maxFileSizeText,
                allowedExtensionText = _props4.allowedExtensionText,
                errorFileType = _props4.errorFileType,
                errorFileSize = _props4.errorFileSize,
                errorReject = _props4.errorReject,
                attrs = _props4.attrs,
                disabled = _props4.disabled,
                preview = _props4.preview;
            var _state2 = this.state,
                accept = _state2.accept,
                removing = _state2.removing;


            return _react2.default.createElement(
                'div',
                {
                    className: 'render-file-upload file-upload-componentid-undefined',
                    style: {
                        width: '100%',
                        borderStyle: 'none',
                        display: input.value && Object.keys(input.value).length ? 'none' : 'block'
                    }
                },
                !preview && this.renderChildComponets()
            );
        }
    }, {
        key: 'renderDropzone',
        value: function renderDropzone() {
            var _this3 = this;

            var _props5 = this.props,
                componentId = _props5.componentId,
                placeholder = _props5.placeholder,
                input = _props5.input,
                onUpload = _props5.onUpload,
                maxFileSize = _props5.maxFileSize,
                fileTypes = _props5.fileTypes,
                txtUpload = _props5.txtUpload,
                maxFileSizeText = _props5.maxFileSizeText,
                allowedExtensionText = _props5.allowedExtensionText,
                errorFileType = _props5.errorFileType,
                errorFileSize = _props5.errorFileSize,
                errorReject = _props5.errorReject,
                attrs = _props5.attrs;
            var _state3 = this.state,
                accept = _state3.accept,
                removing = _state3.removing;


            return _react2.default.createElement(
                _reactDropzone2.default,
                _extends({
                    className: 'render-file-upload file-upload-componentid-' + componentId,
                    name: '' + input.name,
                    multiple: false,
                    maxSize: maxFileSize,
                    style: {
                        width: '100%',
                        borderStyle: 'none',
                        display: input.value && Object.keys(input.value).length ? 'none' : 'block'
                    }
                }, attrs, {
                    accept: accept,
                    onDrop: function onDrop(acceptedFiles, rejectedFiles) {
                        if (acceptedFiles.length > 0) {
                            _this3.setState({ fileError: '' });
                            var name = acceptedFiles[0].name;
                            var reader = new FileReader();
                            reader.readAsDataURL(acceptedFiles[0]);
                            reader.onloadend = function () {
                                var value = {
                                    name: name,
                                    blobPath: acceptedFiles[0].preview,
                                    data: reader.result,
                                    type: acceptedFiles[0].type
                                };
                                if (input.value.src) {
                                    value.src = input.value.src;
                                }
                                input.onChange(value);
                                onUpload(value, input, acceptedFiles[0]);
                            };
                        } else {
                            input.onChange('');
                            if (!accept.includes(rejectedFiles[0].type)) {
                                _this3.setState({
                                    fileError: errorFileType + ' ' + fileTypes.join(', ')
                                });
                            } else if (rejectedFiles[0].size > maxFileSize) {
                                _this3.setState({
                                    fileError: '' + errorFileSize.replace('{maxFileSize}', Math.round(maxFileSize / 1000000))
                                });
                            } else {
                                _this3.setState({
                                    fileError: errorReject
                                });
                            }
                        }
                    }
                }),
                this.renderChildComponets()
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props6 = this.props,
                className = _props6.className,
                globalError = _props6.globalError,
                label = _props6.label,
                required = _props6.required,
                help = _props6.help,
                input = _props6.input,
                maxFileSize = _props6.maxFileSize,
                disabled = _props6.disabled,
                _props6$meta = _props6.meta,
                touched = _props6$meta.touched,
                error = _props6$meta.error,
                review = _props6.review,
                preview = _props6.preview,
                descDisplay = _props6.descDisplay,
                fullWidth = _props6.fullWidth;
            var fileError = this.state.fileError;


            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': globalError }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview }, { answered: input.value }, { 'wfui-form-item-full-width': fullWidth })
                },
                label && _react2.default.createElement(
                    'div',
                    { className: 'wfui-form-label' },
                    _react2.default.createElement(
                        _index.ControlLabel,
                        null,
                        label,
                        required && _react2.default.createElement(
                            'b',
                            { className: 'required' },
                            ' *'
                        )
                    )
                ),
                _react2.default.createElement(
                    _index.FormGroup,
                    {
                        className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-desctipton' : 'wfui-form-field-no-desctipton') + ' wfui-file-upload',
                        validationState: touched && (error || globalError || fileError) ? 'error' : null
                    },
                    this.renderFile(),
                    !disabled ? this.renderDropzone() : this.renderDisabledDropzone(),
                    fileError && _react2.default.createElement(
                        _index.HelpBlock,
                        { className: 'wfui-form-error' },
                        _react2.default.createElement('span', {
                            dangerouslySetInnerHTML: {
                                __html: fileError
                            }
                        })
                    ),
                    touched && globalError && _react2.default.createElement(
                        _index.HelpBlock,
                        { className: 'wfui-form-error' },
                        _react2.default.createElement(
                            'span',
                            null,
                            globalError
                        )
                    ),
                    help && !preview && _react2.default.createElement('div', {
                        className: 'wfui-form-help',
                        dangerouslySetInnerHTML: { __html: help }
                    })
                ),
                descDisplay && !preview ? (0, _react.cloneElement)(descDisplay) : ''
            );
        }
    }]);

    return renderFileUpload;
}(_react2.default.Component);

renderFileUpload.propTypes = {
    onUpload: _propTypes2.default.func,
    onRemove: _propTypes2.default.func,
    mimeTypes: _propTypes2.default.object,
    txtRemove: _propTypes2.default.string,
    txtUpload: _propTypes2.default.string,
    maxFileSizeText: _propTypes2.default.string,
    errorFileType: _propTypes2.default.string,
    errorFileSize: _propTypes2.default.string,
    errorReject: _propTypes2.default.string,
    fileDownloadPath: _propTypes2.default.string.isRequired,
    fullWidth: _propTypes2.default.bool
};
renderFileUpload.defaultProps = {
    onUpload: function onUpload() {},
    onRemove: function onRemove() {},
    txtRemove: 'Remove',
    txtUpload: 'Upload',
    errorFileType: 'Only files with the following extensions are allowed:',
    errorFileSize: 'The file is exceeding the maximum file size of <i>{maxFileSize} MB</i>',
    errorReject: 'The file is rejected to upload.',
    maxFileSizeText: 'Max file size: {maxFileSize}MB',
    allowedExtensionText: 'Allowed extensions: {fileTypes}',
    mimeTypes: {
        pdf: ['application/pdf'],
        word: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        xls: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        ppt: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
        txt: ['text/plain'],
        png: ['image/png'],
        jpg: ['image/jpeg', 'image/pjpeg'],
        gif: ['image/gif']
    },
    fileDownloadPath: '',
    fullWidth: false
};

exports.default = renderFileUpload;