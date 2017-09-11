'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _index = require('../index');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _index2 = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var renderSelectionHybridRadio = function (_React$Component) {
    _inherits(renderSelectionHybridRadio, _React$Component);

    function renderSelectionHybridRadio(props) {
        _classCallCheck(this, renderSelectionHybridRadio);

        var _this = _possibleConstructorReturn(this, (renderSelectionHybridRadio.__proto__ || Object.getPrototypeOf(renderSelectionHybridRadio)).call(this));

        _this.onHandleChange = _this.onHandleChange.bind(_this);
        _this.state = {
            options: _this.parseOptions(props)
        };
        return _this;
    }

    _createClass(renderSelectionHybridRadio, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.options.join('') !== nextProps.options.join('')) {
                this.setState({ options: this.parseOptions(nextProps) });
            }
        }
    }, {
        key: 'onHandleChange',
        value: function onHandleChange(value) {
            var _props = this.props,
                name = _props.name,
                input = _props.input,
                fieldMap = _props.fieldMap;


            var radioCid = fieldMap['_radio'].cid;
            var childComponents = _lodash2.default.get(this.props, name);
            var radioProps = childComponents[radioCid];

            // Reset input fields logic
            var exceptions = ['_radio', value];
            Object.keys(fieldMap).map(function (key) {
                if (!exceptions.includes(key)) {
                    // Reset value
                    var fieldProps = childComponents[fieldMap[key].cid];
                    fieldProps.input.onChange('');
                }
            });

            radioProps.input.onChange(value);
        }
    }, {
        key: 'parseOptions',
        value: function parseOptions(props) {
            return props.options.map(function (option) {
                return {
                    key: props.getOptKey(option),
                    value: props.getOptVal(option)
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                className = _props2.className,
                name = _props2.name,
                label = _props2.label,
                required = _props2.required,
                help = _props2.help,
                globalError = _props2.globalError,
                fieldMap = _props2.fieldMap,
                columnCount = _props2.columnCount,
                disabled = _props2.disabled;
            var options = this.state.options;


            var radioCid = fieldMap['_radio'].cid;
            var childComponents = _lodash2.default.get(this.props, name);
            var radioProps = childComponents[radioCid];

            var components = [];
            var allTouched = true;
            var allPristine = true;
            Object.keys(childComponents).map(function (key) {
                var props = childComponents[key];
                allTouched = allTouched && props.meta.touched;
                allPristine = allPristine && props.meta.pristine;
                components.push((0, _index2.renderField)(props));
            });

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': globalError }) },
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
                    { className: 'wfui-radios-hybrid column-count-' + columnCount, validationState: allTouched && globalError ? 'error' : null },
                    options.map(function (option, i) {
                        var _key = typeof option === 'string' ? option : option.key;
                        var _option = typeof option === 'string' ? option : option.value;
                        var renderRadio = _react2.default.createElement(
                            _index.Radio,
                            {
                                key: i,
                                className: radioProps.input.value === _key ? 'active' : '',
                                name: name + '.' + radioCid,
                                value: _key,
                                checked: radioProps.input.value === _key,
                                onClick: function onClick(e) {
                                    return _this2.onHandleChange(e.target.value);
                                },
                                disabled: disabled
                            },
                            _option,
                            fieldMap[_key] && _react2.default.createElement(
                                'div',
                                { key: i, className: 'radioHybrid' },
                                _react2.default.createElement(_reduxForm.Field, _extends({}, fieldMap[_key], {
                                    name: name + '.' + fieldMap[_key].cid,
                                    type: fieldMap[_key].field_type || 'text',
                                    component: _index2.renderField,
                                    onFocus: function onFocus() {
                                        _this2.onHandleChange(_key);
                                    } // Change radio when it's focused.
                                }))
                            )
                        );

                        return renderRadio;
                    }),
                    _react2.default.createElement(
                        _index.HelpBlock,
                        null,
                        ' ',
                        allTouched && globalError && _react2.default.createElement(
                            'span',
                            null,
                            globalError
                        ),
                        ' '
                    ),
                    help && _react2.default.createElement('div', { className: 'wfui-form-description', dangerouslySetInnerHTML: { __html: help } })
                )
            );
        }
    }]);

    return renderSelectionHybridRadio;
}(_react2.default.Component);

exports.default = renderSelectionHybridRadio;