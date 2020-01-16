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

var _reactDatepicker = require('react-datepicker');

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global FileReader */
/* eslint react/prop-types : 0 */


var isISOString = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/;
var dateFormatString = /([12]\d{3}-(0*[1-9]|1[0-2])-(0*[1-9]|[12]\d|3[01]))/;

var renderDate = function (_React$Component) {
    _inherits(renderDate, _React$Component);

    function renderDate() {
        _classCallCheck(this, renderDate);

        var _this = _possibleConstructorReturn(this, (renderDate.__proto__ || Object.getPrototypeOf(renderDate)).call(this));

        _this.state = {
            touched: false
        };
        return _this;
    }

    _createClass(renderDate, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                className = _props.className,
                label = _props.label,
                placeholder = _props.placeholder,
                input = _props.input,
                help = _props.help,
                required = _props.required,
                disabled = _props.disabled,
                preview = _props.preview,
                descDisplay = _props.descDisplay,
                globalError = _props.globalError,
                fullWidth = _props.fullWidth,
                timeZone = _props.timeZone,
                error = _props.meta.error,
                utcOffsetNumber = _props.utcOffsetNumber,
                datePickerProps = _props.datePickerProps,
                showErrors = _props.showErrors;
            var touched = this.state.touched;

            /**
             * If UI is with time, do timezone convertion. If not, use UTC all the time.
             */

            var utcOffset = 0;
            if (datePickerProps.showTimeSelect) {
                utcOffset = datePickerProps.utcOffset ? datePickerProps.utcOffset : Number(utcOffsetNumber) / 100;
            }
            var selectedValue = void 0;
            if (datePickerProps.showTimeSelect) {
                selectedValue = input.value ? (0, _moment2.default)(input.value) : null;
            } else {
                selectedValue = input.value ? _moment2.default.utc(input.value) : null;
            }

            var convertToISOString = function convertToISOString(e) {
                if (!isNaN(e._d)) {
                    if (datePickerProps.showTimeSelect) {
                        /**
                            Calendar with time (Localtime)
                        */
                        input.onChange(e._d.toISOString());
                    } else {
                        /**
                            Calendar without time (UTC)
                        */

                        // There is a bug in DatePicker that the Moment object is not UTC. In that case, use e._i ('20XX-XX-XX' string) to get new ISOString.
                        if (e._isValid && !e._isUTC && e._i) {
                            input.onChange(new Date(e._i).toISOString());
                        } else {
                            input.onChange(e._d.toISOString());
                        }
                    }
                }
            };

            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', {
                        'wfui-form-item-error': (touched || showErrors) && (error || globalError)
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
                        validationState: (touched || showErrors) && (error || globalError) ? 'error' : null
                    },
                    !disabled ? _react2.default.createElement(
                        'div',
                        { className: 'wfui-form-datepicker' },
                        _react2.default.createElement(_reactDatepicker2.default, _extends({}, datePickerProps, {
                            utcOffset: utcOffset,
                            selected: selectedValue,
                            onChangeRaw: function onChangeRaw(e) {
                                input.onChange(e.target.value);
                            },
                            onSelect: convertToISOString,
                            onChange: convertToISOString,
                            onBlur: function onBlur(e) {
                                _this2.setState({ touched: true });
                                // This logic is needed when user manually type date string in UI and not exactly following the format 20XX-XX-XX (something like 2020-1-1 )
                                if (!input.value.match(isISOString) && input.value.match(dateFormatString)) {
                                    var parsedDate = new Date(input.value);
                                    if (!isNaN(parsedDate)) {
                                        if (datePickerProps.showTimeSelect) {
                                            /**
                                                Calendar with time (Localtime)
                                                ---------------------------
                                                new Date with the string and get ISO string.
                                            */
                                            input.onChange(parsedDate.toISOString());
                                        } else {
                                            /**
                                                Calendar without time (UTC)
                                                ---------------------------
                                                There is a bug in a browser that new Date('2020-01-01') and new Date('2020-1-1') generates different time.
                                                So use Date.UTC to make sure that time is always 00:00:00
                                             */
                                            var dates = input.value.split('-');
                                            input.onChange(new Date(Date.UTC(Number(dates[0]), Number(dates[1] - 1), Number(dates[2]), 0, 0, 0)).toISOString());
                                        }
                                    }
                                }
                            },
                            placeholderText: placeholder
                        })),
                        datePickerProps.showTimeSelect && _react2.default.createElement(
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
                    (touched || showErrors) && error && _react2.default.createElement(
                        _index.HelpBlock,
                        { className: 'wfui-form-error' },
                        _react2.default.createElement(
                            'span',
                            null,
                            error
                        )
                    ),
                    (touched || showErrors) && globalError && _react2.default.createElement(
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

    return renderDate;
}(_react2.default.Component);

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