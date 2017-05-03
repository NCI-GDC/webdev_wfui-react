'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileUploadField = exports.uploadFile = exports.filesReducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wfuiReact = require('wfui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Reducer
 */
var filesReducer = exports.filesReducer = function filesReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var _state = JSON.parse(JSON.stringify(state));
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
var uploadFile = exports.uploadFile = function uploadFile(values) {
    return function (dispatch) {
        dispatch({
            type: 'UPLOAD_FILE',
            file: values.file,
            name: values.name
        });
    };
};

/**
 * Component
 */

var FileUploadField = exports.FileUploadField = function (_React$Component) {
    _inherits(FileUploadField, _React$Component);

    function FileUploadField() {
        _classCallCheck(this, FileUploadField);

        var _this = _possibleConstructorReturn(this, (FileUploadField.__proto__ || Object.getPrototypeOf(FileUploadField)).call(this));

        _this.state = { file: false, filename: '', fileError: '', data: '', filetype: '' };
        return _this;
    }

    _createClass(FileUploadField, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                file = _props.file,
                input = _props.input;

            if (file) {
                this.setState({ filename: file.filename, data: file.data, filetype: file.filetype });
            }
            input.onChange(file ? file.filename : '');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                name = _props2.name,
                required = _props2.required,
                onUpload = _props2.onUpload,
                maxFileSize = _props2.maxFileSize,
                accept = _props2.accept,
                disabled = _props2.disabled,
                _props2$meta = _props2.meta,
                touched = _props2$meta.touched,
                error = _props2$meta.error,
                input = _props2.input,
                label = _props2.label,
                placeholder = _props2.placeholder,
                helpblock = _props2.helpblock,
                review = _props2.review;
            var _state2 = this.state,
                fileError = _state2.fileError,
                data = _state2.data,
                filetype = _state2.filetype,
                filename = _state2.filename;


            if (disabled || input.value) {
                return _react2.default.createElement(
                    'div',
                    { className: 'form-fields' },
                    _react2.default.createElement(
                        'div',
                        { className: 'wfui-type-input-field' },
                        _react2.default.createElement(
                            'div',
                            { className: 'wfui-input-field' },
                            _react2.default.createElement(
                                'div',
                                { className: 'wfui-input-field__body input-file' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'wfui-input-field__label control-label' },
                                    label,
                                    ': ',
                                    required && _react2.default.createElement(
                                        'span',
                                        { className: 'form-required', title: 'This field is required.' },
                                        ' *'
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'btn-group' },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'btn btn-default ' + (review ? 'review-page' : '') + ' ' + (filetype === 'application/pdf' ? 'link-pdf' : 'link-doc'), type: 'button', href: data, target: '_blank' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            filename
                                        )
                                    ),
                                    input.value && !review && _react2.default.createElement(
                                        'a',
                                        { className: 'btn btn-danger remove-file', type: 'button', onClick: function onClick() {
                                                input.onChange('');
                                                _this2.setState({ filename: '', date: '', filetype: '' });
                                            } },
                                        'Remove'
                                    )
                                )
                            )
                        )
                    )
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { className: 'form-fields' },
                    _react2.default.createElement(
                        'div',
                        { className: 'wfui-type-input-field' },
                        _react2.default.createElement(
                            'div',
                            { className: 'wfui-input-field' },
                            _react2.default.createElement(
                                'div',
                                { className: 'wfui-input-field__body input-file' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'wfui-input-field__label control-label' },
                                    label,
                                    ': ',
                                    required && _react2.default.createElement(
                                        'span',
                                        { className: 'form-required', title: 'This field is required.' },
                                        ' *'
                                    )
                                ),
                                _react2.default.createElement(
                                    _wfuiReact.Dropzone,
                                    {
                                        name: name + '_file',
                                        multiple: false,
                                        maxSize: maxFileSize,
                                        style: {
                                            width: '100%',
                                            borderStyle: 'none'
                                        },
                                        accept: accept,
                                        onDrop: function onDrop(acceptedFiles, rejectedFiles) {
                                            if (acceptedFiles.length > 0) {
                                                _this2.setState({ fileError: '' });
                                                var _filename = acceptedFiles[0].name;
                                                _this2.setState({ filename: _filename, data: acceptedFiles[0].preview, filetype: acceptedFiles[0].type });
                                                input.onChange(_filename);
                                                onUpload({ name: input.name, file: { filename: _filename, data: acceptedFiles[0].preview, filetype: acceptedFiles[0].type } });

                                                {/*const reader = new FileReader();
                                                    reader.readAsDataURL(acceptedFiles[0]); 
                                                    reader.onloadend = () => {
                                                       onUpload({ name, file: { filename, data: reader.result } });
                                                    };*/}
                                            } else {
                                                input.onChange('');
                                                if (!accept.includes(rejectedFiles[0].type)) {
                                                    _this2.setState({ fileError: 'Only files with the following extensions are allowed: pdf, doc, docx' });
                                                } else if (rejectedFiles[0].size > maxFileSize) {
                                                    _this2.setState({ fileError: 'The file is exceeding the maximum file size of <i>' + maxFileSize + '</i>' });
                                                } else {
                                                    _this2.setState({ fileError: 'The file is rejected to upload.' });
                                                }
                                            }
                                        }
                                    },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group', style: { position: 'relative' } },
                                        _react2.default.createElement('span', { style: { position: 'absolute', width: '100%', height: '100%', zIndex: 10, cursor: 'pointer' } }),
                                        _react2.default.createElement('input', _extends({ type: 'text', className: 'wfui-input-field__input form-control' }, input, { placeholder: placeholder })),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'input-group-btn' },
                                            _react2.default.createElement(
                                                'button',
                                                { className: 'btn btn-info', type: 'button' },
                                                'Upload'
                                            )
                                        )
                                    ),
                                    !fileError && touched && error && _react2.default.createElement(
                                        'div',
                                        { className: 'messages alert-danger' },
                                        error
                                    ),
                                    fileError && _react2.default.createElement('div', { className: 'messages alert-danger', dangerouslySetInnerHTML: { __html: fileError } })
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'wfui-grid__description' },
                                helpblock && _react2.default.createElement('p', { className: 'help-block', dangerouslySetInnerHTML: { __html: helpblock } })
                            )
                        )
                    )
                );
            }
        }
    }]);

    return FileUploadField;
}(_react2.default.Component);

FileUploadField.propTypes = {
    onUpload: _react2.default.PropTypes.func
};
FileUploadField.defaultProps = {
    onUpload: function onUpload() {}
};