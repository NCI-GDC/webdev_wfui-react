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

var _reactDatepicker = require('react-datepicker');

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderDate = function renderDate(_ref) {
    var className = _ref.className,
        label = _ref.label,
        placeholder = _ref.placeholder,
        input = _ref.input,
        help = _ref.help,
        required = _ref.required,
        disabled = _ref.disabled,
        preview = _ref.preview,
        descDisplay = _ref.descDisplay,
        fullWidth = _ref.fullWidth,
        timeZone = _ref.timeZone,
        _ref$meta = _ref.meta,
        touched = _ref$meta.touched,
        error = _ref$meta.error,
        utcOffsetNumber = _ref.utcOffsetNumber,
        datePickerProps = _ref.datePickerProps;
    return _react2.default.createElement(
        'div',
        {
            className: (0, _classnames2.default)(className, 'wfui-form-item', {
                'wfui-form-item-error': touched && error
            }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview }, { 'wfui-form-item-full-width': fullWidth })
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
                className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description') + ' wfui-form-date',
                validationState: touched && error ? 'error' : null
            },
            !disabled ? _react2.default.createElement(
                'div',
                { className: 'wfui-form-datepicker' },
                _react2.default.createElement(_reactDatepicker2.default, _extends({}, datePickerProps, {
                    utcOffset: datePickerProps.utcOffset ? datePickerProps.utcOffset : Number(utcOffsetNumber) / 100,
                    selected: input.value ? (0, _moment2.default)(input.value) : null,
                    onChange: input.onChange
                })),
                _react2.default.createElement(
                    'span',
                    { className: 'timezone' },
                    timeZone,
                    ' (',
                    utcOffsetNumber,
                    ')'
                )
            ) : _react2.default.createElement(
                'p',
                { className: 'date-value' },
                input.value ? new Date(input.value).toString() : ''
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
        ),
        descDisplay && !preview ? (0, _react.cloneElement)(descDisplay) : ''
    );
};

renderDate.propTypes = {
    datePickerProps: _propTypes2.default.object
};
renderDate.defaultProps = {
    datePickerProps: {
        timeFormat: 'HH:mm',
        dateFormat: 'YYYY-MM-DD HH:mm',
        showTimeSelect: true
    },
    utcOffsetNumber: new Date().toString().match(/([-\+][0-9]+)\s/)[1],
    timeZone: new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1]
};

exports.default = renderDate;