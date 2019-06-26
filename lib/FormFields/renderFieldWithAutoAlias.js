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

var _reactIntl = require('react-intl');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _index = require('../index');

var _renderSingleCheckbox = require('./renderSingleCheckbox');

var _renderSingleCheckbox2 = _interopRequireDefault(_renderSingleCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global FileReader */
/* eslint react/prop-types : 0 */


/**
 * Reusable field component.
 */
var renderFieldWithAutoAlias = function (_React$Component) {
    _inherits(renderFieldWithAutoAlias, _React$Component);

    function renderFieldWithAutoAlias() {
        _classCallCheck(this, renderFieldWithAutoAlias);

        return _possibleConstructorReturn(this, (renderFieldWithAutoAlias.__proto__ || Object.getPrototypeOf(renderFieldWithAutoAlias)).call(this));
    }

    _createClass(renderFieldWithAutoAlias, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var input = this.props.input;
        }
    }, {
        key: 'renderAutoAlias',
        value: function renderAutoAlias() {
            var _props = this.props,
                input = _props.input,
                intl = _props.intl,
                onHandleAliasChecked = _props.onHandleAliasChecked;


            return _react2.default.createElement(_reduxForm.Field, {
                name: input.name + '.alias',
                type: 'checkbox',
                component: _renderSingleCheckbox2.default,
                option: intl.formatMessage({
                    id: 'content_manager.columnLabels.published_autoalias'
                }),
                onChange: onHandleAliasChecked,
                placeholder: ''
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                className = _props2.className,
                inline = _props2.inline,
                input = _props2.input,
                label = _props2.label,
                postfix = _props2.postfix,
                help = _props2.help,
                placeholder = _props2.placeholder,
                type = _props2.type,
                maxlength = _props2.maxlength,
                max = _props2.max,
                min = _props2.min,
                onHandleChange = _props2.onHandleChange,
                required = _props2.required,
                disabled = _props2.disabled,
                preview = _props2.preview,
                globalError = _props2.globalError,
                descDisplay = _props2.descDisplay,
                _props2$meta = _props2.meta,
                touched = _props2$meta.touched,
                error = _props2$meta.error,
                fullWidth = _props2.fullWidth;


            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', {
                        'wfui-form-item-error': touched && (error || globalError)
                    }, { 'wfui-form-inline': inline }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview }, { answered: input.value }, { 'wfui-form-item-full-width': fullWidth })
                },
                label && _react2.default.createElement(
                    'div',
                    { className: 'wfui-form-label wfui-form-autoalias-label' },
                    _react2.default.createElement(
                        _index.ControlLabel,
                        null,
                        label,
                        required && _react2.default.createElement(
                            'b',
                            { className: 'required' },
                            ' *'
                        )
                    ),
                    this.renderAutoAlias()
                ),
                _react2.default.createElement(
                    _index.FormGroup,
                    {
                        className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description') + ' wfui-form-input',
                        validationState: touched && (error || globalError) ? 'error' : null
                    },
                    _react2.default.createElement(_index.FormControl, _extends({}, input, {
                        value: input.value && input.value.value,
                        name: input.name + '.value',
                        placeholder: placeholder || placeholder === '' ? placeholder : label,
                        type: type,
                        maxLength: maxlength,
                        min: min,
                        max: max,
                        disabled: disabled || input.value && input.value.alias,
                        onChange: function onChange(e) {
                            input.onChange(_extends({}, input.value, {
                                value: e.target.value
                            }));
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
        }
    }]);

    return renderFieldWithAutoAlias;
}(_react2.default.Component);

exports.default = (0, _reactIntl.injectIntl)(renderFieldWithAutoAlias);