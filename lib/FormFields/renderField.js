'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global FileReader */
/* eslint react/prop-types : 0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reusable field component.
 */
var renderField = function renderField(_ref) {
    var className = _ref.className,
        inline = _ref.inline,
        input = _ref.input,
        label = _ref.label,
        postfix = _ref.postfix,
        help = _ref.help,
        placeholder = _ref.placeholder,
        type = _ref.type,
        maxlength = _ref.maxlength,
        max = _ref.max,
        min = _ref.min,
        onHandleChange = _ref.onHandleChange,
        required = _ref.required,
        disabled = _ref.disabled,
        preview = _ref.preview,
        globalError = _ref.globalError,
        descDisplay = _ref.descDisplay,
        _ref$meta = _ref.meta,
        touched = _ref$meta.touched,
        error = _ref$meta.error,
        fullWidth = _ref.fullWidth;
    return _react2.default.createElement(
        'div',
        {
            className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': touched && (error || globalError) }, { 'wfui-form-inline': inline }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview }, { answered: input.value }, { 'wfui-form-item-full-width': fullWidth })
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
                className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description') + ' wfui-form-input',
                validationState: touched && (error || globalError) ? 'error' : null
            },
            _react2.default.createElement(_index.FormControl, _extends({}, input, {
                placeholder: placeholder || placeholder === '' ? placeholder : label,
                type: type,
                maxLength: maxlength,
                min: min,
                max: max,
                disabled: disabled,
                onChange: function onChange(e) {
                    input.onChange(e);
                    if (onHandleChange) onHandleChange(e);
                }
            })),
            postfix && _react2.default.createElement(
                'div',
                { className: 'wfui-form-postfix' },
                postfix
            ),
            _react2.default.createElement(_index.FormControl.Feedback, null),
            touched && error && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    error
                )
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
};

exports.default = renderField;