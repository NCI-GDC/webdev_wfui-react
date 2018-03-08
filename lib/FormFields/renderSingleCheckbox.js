'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderSingleCheckbox = function renderSingleCheckbox(_ref) {
    var className = _ref.className,
        label = _ref.label,
        option = _ref.option,
        input = _ref.input,
        help = _ref.help,
        required = _ref.required,
        disabled = _ref.disabled,
        preview = _ref.preview,
        globalError = _ref.globalError,
        descDisplay = _ref.descDisplay,
        _ref$meta = _ref.meta,
        touched = _ref$meta.touched,
        error = _ref$meta.error;
    return _react2.default.createElement(
        'div',
        {
            className: (0, _classnames2.default)(className, 'wfui-form-item wfui-form-singlecheckbox', { 'wfui-form-item-error': error || globalError }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview })
        },
        _react2.default.createElement(
            'div',
            { className: 'wfui-form-label' },
            label && _react2.default.createElement(
                _index.ControlLabel,
                null,
                label
            )
        ),
        _react2.default.createElement(
            _index.FormGroup,
            {
                className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-desctipton' : '') + ' wfui-form-single-checkbox',
                validationState: touched && (error || globalError) ? 'error' : null
            },
            _react2.default.createElement(
                _index.Checkbox,
                _extends({ className: input.checked ? 'active' : '' }, input, { disabled: disabled }),
                option,
                ' ',
                required && _react2.default.createElement(
                    'b',
                    { className: 'required' },
                    '*'
                )
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
            touched && globalError && _react2.default.createElement(
                _index.HelpBlock,
                { className: 'wfui-form-error' },
                _react2.default.createElement(
                    'span',
                    null,
                    globalError
                )
            ),
            help && _react2.default.createElement('div', { className: 'wfui-form-help', dangerouslySetInnerHTML: { __html: help } })
        ),
        descDisplay ? (0, _react.cloneElement)(descDisplay) : ''
    );
};

exports.default = renderSingleCheckbox;