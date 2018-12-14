'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../index');

var _RenderFee = require('./RenderFee');

var _RenderFee2 = _interopRequireDefault(_RenderFee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/prop-types : 0 */
/* global document */


var renderEventSelect = function (_React$Component) {
    _inherits(renderEventSelect, _React$Component);

    function renderEventSelect() {
        _classCallCheck(this, renderEventSelect);

        var _this = _possibleConstructorReturn(this, (renderEventSelect.__proto__ || Object.getPrototypeOf(renderEventSelect)).call(this));

        _this.state = { checked: true };
        _this.onHandleClick = _this.onHandleClick.bind(_this);
        _this.isChecked = _this.isChecked.bind(_this);
        return _this;
    }

    _createClass(renderEventSelect, [{
        key: 'isChecked',
        value: function isChecked(event) {
            var _this2 = this;

            var checked = event.fees.reduce(function (result, fee) {
                if (result) return result;
                var feeProps = _lodash2.default.get(_this2.props, fee.name);
                if (feeProps.input && feeProps.input.value) {
                    return true;
                }
                return false;
            }, false);
            return checked;
        }
    }, {
        key: 'onHandleClick',
        value: function onHandleClick(e, event) {
            var disabled = this.props.disabled;

            e.stopPropagation();
            if (!disabled) {
                var _props = this.props,
                    name = _props.name,
                    changeFieldValue = _props.changeFieldValue;


                this.isChecked(event);
                if (!this.isChecked(event)) {
                    event.fees.forEach(function (fee) {
                        changeFieldValue('' + fee.name, true);
                    });
                } else {
                    event.fees.forEach(function (fee) {
                        changeFieldValue('' + fee.name, false);
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                className = _props2.className,
                disabled = _props2.disabled,
                preview = _props2.preview,
                events = _props2.events,
                label = _props2.label,
                required = _props2.required,
                help = _props2.help,
                globalError = _props2.globalError,
                input = _props2.input,
                name = _props2.name,
                names = _props2.names,
                feeCategories = _props2.feeCategories;


            var allTouched = false;
            var allPristine = true;

            if (names && names.length) {
                names.forEach(function (name) {
                    var props = _lodash2.default.get(_this3.props, name);
                    allTouched = allTouched && props.meta.touched;
                    allPristine = allPristine && props.meta.pristine;
                });
            }

            if (!events || events.length === 0) return null;

            // const date = new Date();
            var event = events[0];

            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': globalError }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview })
                },
                _react2.default.createElement(
                    _index.FormGroup,
                    {
                        className: 'wfui-form-field wfui-table-event',
                        validationState: !allPristine && globalError ? 'error' : null
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'wfui-table' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'table',
                                { className: 'table table-striped' },
                                _react2.default.createElement(
                                    'thead',
                                    null,
                                    _react2.default.createElement(
                                        'tr',
                                        null,
                                        _react2.default.createElement(
                                            'th',
                                            { colSpan: disabled ? '1' : '2' },
                                            _react2.default.createElement(
                                                _index.ControlLabel,
                                                null,
                                                label,
                                                required && _react2.default.createElement(
                                                    'b',
                                                    { className: 'required' },
                                                    ' ',
                                                    '*'
                                                )
                                            )
                                        ),
                                        feeCategories.map(function (feeCat, i) {
                                            return _react2.default.createElement(
                                                'th',
                                                {
                                                    key: i,
                                                    className: (0, _classnames2.default)('event-price', 'category-' + feeCat.category)
                                                },
                                                feeCat.title
                                            );
                                        })
                                    )
                                ),
                                _react2.default.createElement(
                                    'tbody',
                                    null,
                                    events.map(function (event, i) {
                                        return _react2.default.createElement(
                                            'tr',
                                            {
                                                onClick: function onClick(e) {
                                                    return _this3.onHandleClick(e, event);
                                                },
                                                key: i,
                                                className: (0, _classnames2.default)({
                                                    acitve: _this3.isChecked(event),
                                                    disabled: disabled,
                                                    preview: preview
                                                })
                                            },
                                            !disabled && _react2.default.createElement(
                                                'td',
                                                { className: 'event-checkbox' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'wfui-selection checkbox' },
                                                    _react2.default.createElement('input', {
                                                        type: 'checkbox',
                                                        className: 'wfui-selection__input-checkbox',
                                                        checked: _this3.isChecked(event),
                                                        onChange: function onChange(e) {
                                                            return _this3.onHandleClick(e, event);
                                                        }
                                                    })
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'td',
                                                { className: 'event-details' },
                                                _react2.default.createElement(
                                                    'b',
                                                    { className: 'event-title' },
                                                    event.title
                                                ),
                                                _react2.default.createElement('div', {
                                                    className: 'event-description',
                                                    dangerouslySetInnerHTML: {
                                                        __html: event.description
                                                    }
                                                })
                                            ),
                                            feeCategories.map(function (feeCat, i) {
                                                var fee = event.fees.find(function (fee) {
                                                    return fee.variable.lastIndexOf(feeCat.category, 0) === 0;
                                                });
                                                return _react2.default.createElement(_RenderFee2.default, {
                                                    fee: fee,
                                                    currency: 'CAD',
                                                    feeIntlId: 'admin_form_builder.question_type.fee.fee_text'
                                                });
                                            })
                                        );
                                    })
                                )
                            )
                        )
                    ),
                    !allPristine && _react2.default.createElement(
                        _index.HelpBlock,
                        null,
                        ' ',
                        globalError && _react2.default.createElement(
                            'span',
                            null,
                            globalError
                        ),
                        ' '
                    ),
                    help && !preview && _react2.default.createElement('div', {
                        className: 'wfui-form-help',
                        dangerouslySetInnerHTML: { __html: help }
                    })
                )
            );
        }
    }]);

    return renderEventSelect;
}(_react2.default.Component);

exports.default = renderEventSelect;