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
            filename: '',
            fileError: '',
            data: '',
            filetype: '',
            accept: generateAcceptText(props)
        };
        return _this;
    }

    _createClass(renderFileUpload, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                file = _props.file,
                input = _props.input;

            if (file) {
                this.setState({
                    filename: file.filename,
                    data: file.data,
                    filetype: file.filetype
                });
            }
            input.onChange(file ? file.filename : '');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                className = _props2.className,
                globalError = _props2.globalError,
                name = _props2.name,
                placeholder = _props2.placeholder,
                label = _props2.label,
                required = _props2.required,
                help = _props2.help,
                input = _props2.input,
                onUpload = _props2.onUpload,
                maxFileSize = _props2.maxFileSize,
                disabled = _props2.disabled,
                _props2$meta = _props2.meta,
                touched = _props2$meta.touched,
                error = _props2$meta.error,
                review = _props2.review,
                fileTypes = _props2.fileTypes,
                txtRemove = _props2.txtRemove,
                txtUpload = _props2.txtUpload,
                errorFileType = _props2.errorFileType,
                errorFileSize = _props2.errorFileSize,
                errorReject = _props2.errorReject;
            var _state = this.state,
                accept = _state.accept,
                fileError = _state.fileError,
                data = _state.data,
                filetype = _state.filetype,
                filename = _state.filename;


            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': globalError }, { 'wfui-form-disabled': disabled })
                },
                _react2.default.createElement(
                    _index.ControlLabel,
                    null,
                    label
                ),
                required && _react2.default.createElement(
                    'b',
                    { className: 'required' },
                    ' *'
                ),
                _react2.default.createElement(
                    _index.FormGroup,
                    {
                        className: 'wfui-file-upload',
                        validationState: touched && (error || globalError || fileError) ? 'error' : null
                    },
                    input.value && _react2.default.createElement(
                        'div',
                        { className: 'btn-group' },
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'btn btn-default ' + (review ? 'review-page' : '') + ' ' + (filetype === 'application/pdf' ? 'link-pdf' : 'link-doc'),
                                type: 'button',
                                href: data,
                                target: '_blank'
                            },
                            _react2.default.createElement(
                                'span',
                                null,
                                filename
                            )
                        ),
                        input.value && !review && _react2.default.createElement(
                            'a',
                            {
                                className: 'btn btn-danger remove-file',
                                type: 'button',
                                onClick: function onClick() {
                                    input.onChange('');
                                    _this2.setState({
                                        filename: '',
                                        date: '',
                                        filetype: ''
                                    });
                                }
                            },
                            txtRemove
                        )
                    ),
                    _react2.default.createElement(
                        _reactDropzone2.default,
                        {
                            name: '' + input.name,
                            multiple: false,
                            maxSize: maxFileSize,
                            style: {
                                width: '100%',
                                borderStyle: 'none',
                                display: input.value || disabled ? 'none' : 'block'
                            },
                            accept: accept,
                            onDrop: function onDrop(acceptedFiles, rejectedFiles) {
                                if (acceptedFiles.length > 0) {
                                    _this2.setState({ fileError: '' });
                                    var _filename = acceptedFiles[0].name;
                                    _this2.setState({
                                        filename: _filename,
                                        data: acceptedFiles[0].preview,
                                        filetype: acceptedFiles[0].type
                                    });
                                    input.onChange(_filename);
                                    onUpload({
                                        name: input.name,
                                        file: {
                                            filename: _filename,
                                            data: acceptedFiles[0].preview,
                                            filetype: acceptedFiles[0].type
                                        }
                                    });
                                } else {
                                    input.onChange('');
                                    if (!accept.includes(rejectedFiles[0].type)) {
                                        _this2.setState({
                                            fileError: errorFileType + ' ' + fileTypes.join(', ')
                                        });
                                    } else if (rejectedFiles[0].size > maxFileSize) {
                                        _this2.setState({
                                            fileError: '' + errorFileSize.replace('{maxFileSize}', Math.round(maxFileSize / 1000000))
                                        });
                                    } else {
                                        _this2.setState({
                                            fileError: errorReject
                                        });
                                    }
                                }
                            }
                        },
                        _react2.default.createElement(
                            'div',
                            {
                                className: 'input-group',
                                style: { position: 'relative' }
                            },
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
                                placeholder: placeholder
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
                        )
                    ),
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
                    help && _react2.default.createElement('div', {
                        className: 'wfui-form-description',
                        dangerouslySetInnerHTML: { __html: help }
                    })
                )
            );
        }
    }]);

    return renderFileUpload;
}(_react2.default.Component);

renderFileUpload.propTypes = {
    onUpload: _propTypes2.default.func,
    mimeTypes: _propTypes2.default.object,
    txtRemove: _propTypes2.default.string,
    txtUpload: _propTypes2.default.string,
    errorFileType: _propTypes2.default.string,
    errorFileSize: _propTypes2.default.string,
    errorReject: _propTypes2.default.string
};
renderFileUpload.defaultProps = {
    onUpload: function onUpload() {},
    txtRemove: 'Remove',
    txtUpload: 'Upload',
    errorFileType: 'Only files with the following extensions are allowed:',
    errorFileSize: 'The file is exceeding the maximum file size of <i>{maxFileSize} MB</i>',
    errorReject: 'The file is rejected to upload.',
    mimeTypes: {
        pdf: ['application/pdf'],
        word: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        xls: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        ppt: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
        txt: ['text/plain'],
        png: ['image/png'],
        jpg: ['image/jpeg', 'image/pjpeg'],
        gif: ['image/gif']
    }
};

exports.default = renderFileUpload;