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

var renderTextArea = function renderTextArea(_ref) {
    var className = _ref.className,
        input = _ref.input,
        label = _ref.label,
        help = _ref.help,
        placeholder = _ref.placeholder,
        type = _ref.type,
        onHandleChange = _ref.onHandleChange,
        required = _ref.required,
        disabled = _ref.disabled,
        preview = _ref.preview,
        globalError = _ref.globalError,
        _ref$meta = _ref.meta,
        touched = _ref$meta.touched,
        error = _ref$meta.error,
        rows = _ref.rows,
        readOnly = _ref.readOnly,
        descDisplay = _ref.descDisplay,
        fullWidth = _ref.fullWidth,
        textLimit = _ref.textLimit,
        textLimitLabel = _ref.textLimitLabel,
        autoComplete = _ref.autoComplete,
        showErrors = _ref.showErrors;
    return preview ? _react2.default.createElement(
        'div',
        {
            className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': (touched || showErrors) && (error || globalError) }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview }, { answered: input.value }, { 'wfui-form-item-full-width': fullWidth })
        },
        label && _react2.default.createElement(
            'div',
            { className: 'wfui-form-label' },
            _react2.default.createElement(
                _index.ControlLabel,
                null,
                label,
                textLimitLabel ? _react2.default.createElement(
                    'span',
                    { className: 'text-muted' },
                    textLimitLabel
                ) : null,
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
                className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description') + ' wfui-form-textarea'
            },
            _react2.default.createElement(
                'div',
                { className: 'wfui-form-textarea-preview-value' },
                input.value
            )
        )
    ) : _react2.default.createElement(
        'div',
        {
            className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': (touched || showErrors) && (error || globalError) }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview }, { answered: input.value }, { 'wfui-form-item-full-width': fullWidth })
        },
        label && _react2.default.createElement(
            'div',
            { className: 'wfui-form-label' },
            _react2.default.createElement(
                _index.ControlLabel,
                null,
                label,
                textLimitLabel ? _react2.default.createElement(
                    'span',
                    { className: 'text-muted' },
                    textLimitLabel
                ) : null,
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
                className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description') + ' wfui-form-textarea',
                validationState: (touched || showErrors) && (error || globalError) ? 'error' : null
            },
            _react2.default.createElement(_index.FormControl, _extends({}, input, {
                type: type,
                placeholder: placeholder || placeholder === '' ? placeholder : label,
                disabled: readOnly ? false : disabled,
                readOnly: readOnly,
                onChange: function onChange(e) {
                    input.onChange(e);
                    if (onHandleChange) onHandleChange(e);
                },
                autoComplete: autoComplete,
                componentClass: 'textarea',
                rows: rows || (disabled || preview ? 0 : 5)
            })),
            _react2.default.createElement(_index.FormControl.Feedback, null),
            (touched || showErrors) && error && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    error
                ),
                textLimit && !preview ? _react2.default.createElement(
                    'span',
                    { className: 'wfui-form-char-count' },
                    (input && input.value ? input.value.length : 0) + ' / ' + textLimit + ' characters'
                ) : null
            ),
            (touched || showErrors) && globalError && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    globalError
                ),
                textLimit && !preview ? _react2.default.createElement(
                    'span',
                    { className: 'wfui-form-char-count' },
                    (input && input.value ? input.value.length : 0) + ' / ' + textLimit + ' characters'
                ) : null
            ),
            !((touched || showErrors) && (error || globalError)) && textLimit && !preview ? _react2.default.createElement(
                'span',
                { className: 'wfui-form-char-count' },
                (input && input.value ? input.value.length : 0) + ' / ' + textLimit + ' characters'
            ) : null,
            help && !preview && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-help' },
                _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: help } })
            )
        ),
        descDisplay && !preview ? (0, _react.cloneElement)(descDisplay) : ''
    );
};

exports.default = renderTextArea;