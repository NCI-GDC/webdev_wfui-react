'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global FileReader */
/* eslint react/prop-types : 0 */


var renderPhoto = function (_React$Component) {
    _inherits(renderPhoto, _React$Component);

    function renderPhoto(props) {
        _classCallCheck(this, renderPhoto);

        var _this = _possibleConstructorReturn(this, (renderPhoto.__proto__ || Object.getPrototypeOf(renderPhoto)).call(this));

        _this.state = { value: props.input.value };
        return _this;
    }

    _createClass(renderPhoto, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                className = _props.className,
                input = _props.input,
                label = _props.label,
                required = _props.required,
                help = _props.help,
                placeholder = _props.placeholder,
                type = _props.type,
                maxlength = _props.maxlength,
                onStateChange = _props.onStateChange,
                disabled = _props.disabled,
                preview = _props.preview,
                descDisplay = _props.descDisplay,
                _props$meta = _props.meta,
                touched = _props$meta.touched,
                error = _props$meta.error;
            var value = this.state.value;


            return value ? _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', {
                        'wfui-form-item-error': error
                    }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview })
                },
                _react2.default.createElement(
                    'div',
                    { className: 'wfui-form-label' },
                    label && _react2.default.createElement(
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
                    'div',
                    {
                        className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-desctipton' : '') + ' wfui-form-photo file-chosen'
                    },
                    _react2.default.createElement(
                        'p',
                        { className: 'image-preview' },
                        _react2.default.createElement('img', { style: { height: 100 }, src: value.src })
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'image-alt' },
                        _react2.default.createElement(_index.FormControl, {
                            value: value.title,
                            placeholder: placeholder || placeholder === '' ? placeholder : label,
                            type: type,
                            maxLength: maxlength,
                            onChange: function onChange(e) {
                                var newValue = Object.assign({}, value, {
                                    title: e.target.value
                                });
                                _this2.setState({ value: newValue });
                                onStateChange(newValue);
                                input.onChange(newValue);
                            },
                            disabled: disabled
                        })
                    ),
                    !disabled && _react2.default.createElement(
                        _index.Button,
                        {
                            className: 'btn-remove',
                            onClick: function onClick() {
                                input.onChange();
                                onStateChange();
                                _this2.setState({ value: undefined });
                            }
                        },
                        'Remove Image'
                    )
                ),
                descDisplay ? (0, _react.cloneElement)(descDisplay) : ''
            ) : _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(className, 'wfui-form-item') },
                _react2.default.createElement(
                    'div',
                    { className: 'wfui-form-label' },
                    label && _react2.default.createElement(
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
                    _reactDropzone2.default,
                    _extends({}, input, {
                        name: input.name,
                        accept: 'image/png,image/jpeg,image/pjpeg,image/gif',
                        className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-desctipton' : '') + ' wfui-form-photo choose-file',
                        onDrop: function onDrop(acceptedFiles) {
                            var reader = new FileReader();
                            reader.readAsDataURL(acceptedFiles[0]);
                            reader.onloadend = function () {
                                var newValue = Object.assign({}, value, {
                                    src: reader.result
                                });
                                _this2.setState({ value: newValue });
                                onStateChange(newValue);
                                return input.onChange(newValue);
                            };
                            _this2.setState({ hasFile: true });
                        }
                    }),
                    'Choose File'
                ),
                touched && error && _react2.default.createElement(
                    _index.HelpBlock,
                    { className: 'wfui-form-error' },
                    _react2.default.createElement(
                        'span',
                        null,
                        error
                    )
                ),
                help && _react2.default.createElement('div', { className: 'wfui-form-help', dangerouslySetInnerHTML: { __html: help } }),
                descDisplay ? (0, _react.cloneElement)(descDisplay) : ''
            );
        }
    }]);

    return renderPhoto;
}(_react2.default.Component);

renderPhoto.propTypes = {
    onStateChange: _propTypes2.default.func
};
renderPhoto.defaultProps = {
    onStateChange: function onStateChange(f) {
        return f;
    }
};

exports.default = renderPhoto;