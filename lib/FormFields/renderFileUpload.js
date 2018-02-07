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
            accept: generateAcceptText(props)
        };
        _this.getFileKey = _this.getFileKey.bind(_this);
        _this.renderFile = _this.renderFile.bind(_this);
        _this.renderRemoveBtn = _this.renderRemoveBtn.bind(_this);
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
                txtRemove = _props.txtRemove;

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
                            type: ''
                        });
                    }
                },
                txtRemove
            );
        }
    }, {
        key: 'renderFile',
        value: function renderFile() {
            var _props2 = this.props,
                input = _props2.input,
                onRemove = _props2.onRemove,
                review = _props2.review,
                txtRemove = _props2.txtRemove,
                apiHost = _props2.apiHost,
                apiFileDownload = _props2.apiFileDownload,
                appId = _props2.appId;


            if (input.value) {
                var filePath = input.value.id ? '//' + apiHost + apiFileDownload + input.value.id + '?appid=' + appId : input.value.blobPath;

                // Image File
                if (input.value.type.indexOf('image') === 0) {
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
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props3 = this.props,
                className = _props3.className,
                globalError = _props3.globalError,
                name = _props3.name,
                placeholder = _props3.placeholder,
                label = _props3.label,
                required = _props3.required,
                help = _props3.help,
                input = _props3.input,
                onUpload = _props3.onUpload,
                onRemove = _props3.onRemove,
                maxFileSize = _props3.maxFileSize,
                disabled = _props3.disabled,
                _props3$meta = _props3.meta,
                touched = _props3$meta.touched,
                error = _props3$meta.error,
                review = _props3.review,
                preview = _props3.preview,
                fileTypes = _props3.fileTypes,
                txtRemove = _props3.txtRemove,
                txtUpload = _props3.txtUpload,
                errorFileType = _props3.errorFileType,
                errorFileSize = _props3.errorFileSize,
                errorReject = _props3.errorReject;
            var _state = this.state,
                accept = _state.accept,
                fileError = _state.fileError;


            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': globalError }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview })
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
                    this.renderFile(),
                    _react2.default.createElement(
                        _reactDropzone2.default,
                        {
                            className: 'render-file-upload',
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
                                    _this3.setState({ fileError: '' });
                                    var _name = acceptedFiles[0].name;
                                    var reader = new FileReader();
                                    reader.readAsDataURL(acceptedFiles[0]);
                                    reader.onloadend = function () {
                                        var value = {
                                            name: _name,
                                            blobPath: acceptedFiles[0].preview,
                                            data: reader.result,
                                            type: acceptedFiles[0].type
                                        };
                                        input.onChange(value);
                                        onUpload(acceptedFiles[0], input);
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
    appId: _propTypes2.default.string,
    apiHost: _propTypes2.default.string,
    apiFileDownload: _propTypes2.default.string,
    onUpload: _propTypes2.default.func,
    onRemove: _propTypes2.default.func,
    mimeTypes: _propTypes2.default.object,
    txtRemove: _propTypes2.default.string,
    txtUpload: _propTypes2.default.string,
    errorFileType: _propTypes2.default.string,
    errorFileSize: _propTypes2.default.string,
    errorReject: _propTypes2.default.string
};
renderFileUpload.defaultProps = {
    appId: '',
    apiHost: '',
    apiFileDownload: '/file/file',
    onUpload: function onUpload() {},
    onRemove: function onRemove() {},
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