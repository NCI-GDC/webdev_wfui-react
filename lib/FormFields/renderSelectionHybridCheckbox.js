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

var _reduxForm = require('redux-form');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('../index');

var _index2 = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var renderSelectionHybridCheckbox = function (_React$Component) {
    _inherits(renderSelectionHybridCheckbox, _React$Component);

    function renderSelectionHybridCheckbox(props) {
        _classCallCheck(this, renderSelectionHybridCheckbox);

        var _this = _possibleConstructorReturn(this, (renderSelectionHybridCheckbox.__proto__ || Object.getPrototypeOf(renderSelectionHybridCheckbox)).call(this));

        var exclusives = [];
        var options = [];
        _this.state = _this.parseOptionsAndSpecials(props);
        _this.onHandleChange = _this.onHandleChange.bind(_this);
        return _this;
    }

    _createClass(renderSelectionHybridCheckbox, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.options.join('') !== nextProps.options.join('')) {
                this.setState(this.parseOptionsAndSpecials(nextProps));
            }
        }
    }, {
        key: 'onHandleChange',
        value: function onHandleChange(values, checkedValue) {
            var _props = this.props,
                name = _props.name,
                input = _props.input,
                fieldMap = _props.fieldMap;
            var exclusives = this.state.exclusives;


            var checkboxCid = fieldMap && fieldMap._checkbox && fieldMap._checkbox.cid;
            var childComponents = _lodash2.default.get(this.props, name);
            var checkboxProps = childComponents[checkboxCid];

            var nextValues = values;
            // Exclusive feature
            if (exclusives.length > 0) {
                if (checkedValue !== false && exclusives.includes(checkedValue)) {
                    nextValues = [checkedValue];
                } else if (checkedValue !== false && !exclusives.includes(checkedValue)) {
                    nextValues = values.filter(function (value) {
                        return !exclusives.includes(value);
                    });
                }
            }

            // Reset Value if it's not checked.
            Object.keys(fieldMap).forEach(function (key) {
                if (key !== '_checkbox' && !nextValues.includes(key)) {
                    var fieldProps = childComponents[fieldMap[key].cid];
                    fieldProps.input.onChange('');
                }
            });

            checkboxProps.input.onChange(nextValues);
        }
    }, {
        key: 'parseOptionsAndSpecials',
        value: function parseOptionsAndSpecials(props) {
            var exclusives = [];
            var options = [];

            if (props.options) {
                props.options.forEach(function (option) {
                    var key = props.getOptKey(option);
                    var special = props.getOptSpecial(option);
                    if (special.includes('exclusive')) {
                        exclusives.push(key);
                    }
                    options.push({
                        key: key,
                        value: props.getOptVal(option)
                    });
                });
            }
            return { options: options, exclusives: exclusives };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            // const { questionId, className, label, input, help, required, disabled, fieldMap, meta: { touched, error } } = this.props;
            var _props2 = this.props,
                className = _props2.className,
                name = _props2.name,
                label = _props2.label,
                required = _props2.required,
                help = _props2.help,
                globalError = _props2.globalError,
                fieldMap = _props2.fieldMap,
                disabled = _props2.disabled,
                columnCount = _props2.columnCount,
                preview = _props2.preview,
                descDisplay = _props2.descDisplay,
                fullWidth = _props2.fullWidth;
            var options = this.state.options;


            var checkboxCid = fieldMap && fieldMap._checkbox && fieldMap._checkbox.cid;
            var childComponents = _lodash2.default.get(this.props, name);
            var checkboxProps = childComponents[checkboxCid];

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
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': allTouched && globalError }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview }, { 'wfui-form-item-full-width': fullWidth })
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
                        className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description') + ' wfui-checkboxes-hybrid column-count-' + columnCount,
                        validationState: allTouched && globalError ? 'error' : null
                    },
                    options.map(function (option, i) {
                        var _key = typeof option === 'string' ? option : option.key;
                        var _option = typeof option === 'string' ? option : option.value;
                        var renderCheckbox = _react2.default.createElement(
                            _index.Checkbox,
                            {
                                key: i,
                                name: name + '.' + checkboxCid,
                                value: _key,
                                disabled: disabled,
                                checked: checkboxProps.input.value && checkboxProps.input.value.includes(_key),
                                className: (checkboxProps.input.value && checkboxProps.input.value.includes(_key) ? 'active' : '') + ' ' + (fieldMap[_key] ? 'checkbox-with-checkboxHybrid' : ''),
                                onChange: function onChange(e) {
                                    var newValue = [].concat(_toConsumableArray(checkboxProps.input.value));
                                    if (e.target.checked) {
                                        newValue.push(_key);
                                    } else {
                                        newValue.splice(newValue.indexOf(_key), 1);
                                    }
                                    return _this2.onHandleChange(newValue, e.target.checked && e.target.value);
                                }
                            },
                            _react2.default.createElement('span', {
                                dangerouslySetInnerHTML: {
                                    __html: _option
                                }
                            }),
                            _react2.default.createElement(
                                'div',
                                { key: i, className: 'checkboxHybrid' },
                                fieldMap[_key] && _react2.default.createElement(_reduxForm.Field, _extends({}, fieldMap[_key], {
                                    name: name + '.' + fieldMap[_key].cid,
                                    type: fieldMap[_key].field_type || 'text',
                                    component: _index2.renderField,
                                    disabled: disabled,
                                    onFocus: function onFocus() {
                                        var newValue = [].concat(_toConsumableArray(checkboxProps.input.value));
                                        var checked = false;
                                        if (!newValue.includes(_key)) {
                                            checked = true;
                                            newValue.push(_key);
                                        }
                                        _this2.onHandleChange(newValue, checked && _key);
                                    }
                                }))
                            )
                        );
                        return renderCheckbox;
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
                    help && !preview && _react2.default.createElement('div', {
                        className: 'wfui-form-help',
                        dangerouslySetInnerHTML: { __html: help }
                    })
                ),
                descDisplay && !preview ? (0, _react.cloneElement)(descDisplay) : ''
            );
        }
    }]);

    return renderSelectionHybridCheckbox;
}(_react2.default.Component);

renderSelectionHybridCheckbox.propTypes = {
    name: _propTypes2.default.string,
    label: _propTypes2.default.string,
    help: _propTypes2.default.string,
    globalError: _propTypes2.default.string,
    fieldMap: _propTypes2.default.object,
    required: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    descDisplay: _propTypes2.default.element,
    fullWidth: _propTypes2.default.bool
};

renderSelectionHybridCheckbox.defaultProps = {
    fullWidth: false
};

exports.default = renderSelectionHybridCheckbox;