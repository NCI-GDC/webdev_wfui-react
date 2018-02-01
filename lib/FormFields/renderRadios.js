'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderRadios = function renderRadios(_ref) {
    var className = _ref.className,
        label = _ref.label,
        options = _ref.options,
        input = _ref.input,
        help = _ref.help,
        required = _ref.required,
        disabled = _ref.disabled,
        preview = _ref.preview,
        globalError = _ref.globalError,
        _ref$meta = _ref.meta,
        touched = _ref$meta.touched,
        error = _ref$meta.error;
    return _react2.default.createElement(
        'div',
        {
            className: (0, _classnames2.default)(className, 'wfui-form-item', {
                'wfui-form-item-error': error || globalError
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
            {
                className: 'wfui-form-radios',
                validationState: touched && (error || globalError) ? 'error' : null
            },
            options.map(function (option, i) {
                var _key = typeof option === 'string' ? option : option.key;
                var _option = typeof option === 'string' ? option : option.value;
                return _react2.default.createElement(
                    _index.Radio,
                    {
                        className: input.value === _key ? 'active' : '',
                        key: i,
                        name: input.name,
                        value: _key,
                        checked: input.value === _key,
                        disabled: disabled,
                        onClick: function onClick(e) {
                            return input.onChange(e.target.value);
                        }
                    },
                    _option
                );
            }),
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
            help && _react2.default.createElement('div', {
                className: 'wfui-form-description',
                dangerouslySetInnerHTML: { __html: help }
            })
        )
    );
};

exports.default = renderRadios;