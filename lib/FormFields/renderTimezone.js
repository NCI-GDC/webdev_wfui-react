'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global FileReader */
/* eslint react/prop-types : 0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTimezone = require('react-timezone');

var _reactTimezone2 = _interopRequireDefault(_reactTimezone);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderTimezone = function renderTimezone(_ref) {
    var className = _ref.className,
        label = _ref.label,
        placeholder = _ref.placeholder,
        input = _ref.input,
        help = _ref.help,
        required = _ref.required,
        disabled = _ref.disabled,
        preview = _ref.preview,
        _ref$meta = _ref.meta,
        touched = _ref$meta.touched,
        error = _ref$meta.error;
    return _react2.default.createElement(
        'div',
        {
            className: (0, _classnames2.default)(className, 'wfui-form-item', {
                'wfui-form-item-error': error
            }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview })
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
            { validationState: touched && error ? 'error' : null },
            !disabled ? _react2.default.createElement(_reactTimezone2.default, _extends({
                className: 'wfui-form-timezone'
            }, input, {
                onChange: function onChange(timezone) {
                    return input.onChange(timezone);
                },
                inputProps: {
                    placeholder: placeholder
                }
            })) : _react2.default.createElement(
                'p',
                { className: 'timezone-value' },
                input.value
            ),
            touched && error && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    error
                )
            )
        )
    );
};

exports.default = renderTimezone;