'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('../index');

var _index2 = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var renderTableFormat = function (_React$Component) {
    _inherits(renderTableFormat, _React$Component);

    function renderTableFormat() {
        _classCallCheck(this, renderTableFormat);

        return _possibleConstructorReturn(this, (renderTableFormat.__proto__ || Object.getPrototypeOf(renderTableFormat)).apply(this, arguments));
    }

    _createClass(renderTableFormat, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _props = this.props,
                name = _props.name,
                logic = _props.logic;

            // If logic is "or"

            if (logic === 'or') {
                var childComponents = _lodash2.default.get(this.props, name);
                var nextChildComponents = nextProps[name];

                // Modify other fields when user edit one of the fields.
                Object.keys(childComponents).map(function (cid) {
                    if (childComponents[cid].input.value !== nextChildComponents[cid].input.value) {
                        var modifyingCid = cid;
                        var targetCid = Object.keys(childComponents).filter(function (n) {
                            return n !== cid;
                        });

                        if (nextChildComponents[modifyingCid].input.value && modifyingCid && targetCid.length > 0) {
                            targetCid.map(function (cid) {
                                nextChildComponents[cid].input.onChange('');
                            });
                        }
                    }
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                className = _props2.className,
                limits = _props2.limits,
                name = _props2.name,
                label = _props2.label,
                required = _props2.required,
                help = _props2.help,
                globalError = _props2.globalError,
                logic = _props2.logic,
                fieldMap = _props2.fieldMap,
                disabled = _props2.disabled,
                preview = _props2.preview,
                descDisplay = _props2.descDisplay;


            var components = [];
            var allTouched = true;
            var allPristine = true;
            var childComponents = _lodash2.default.get(this.props, name);

            Object.keys(childComponents).map(function (key) {
                var props = childComponents[key];
                allTouched = allTouched && props.meta.touched;
                allPristine = allPristine && props.meta.pristine;
                components.push(props);
            });

            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-form-item', { 'wfui-form-item-error': globalError }, { 'wfui-form-disabled': disabled }, { 'wfui-form-preview': preview })
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
                        className: 'wfui-form-field ' + (descDisplay ? 'wfui-form-field-with-desctipton' : 'wfui-form-field-no-desctipton') + ' wfui-table-format multiple-inputs-' + Object.keys(fieldMap).length,
                        validationState: allTouched && globalError ? 'error' : null
                    },
                    _react2.default.createElement(
                        'ul',
                        { className: 'wfui-input-table__ul' },
                        Object.keys(fieldMap).map(function (key, i) {
                            var lists = [];

                            lists.push(_react2.default.createElement(
                                'li',
                                { className: 'wfui-input-table__li' },
                                _react2.default.createElement(_reduxForm.Field, _extends({
                                    key: i
                                }, fieldMap[key], {
                                    name: name + '.' + key,
                                    type: fieldMap[key].field_type || 'text',
                                    component: _index2.renderField,
                                    disabled: disabled
                                }))
                            ));
                            if (Object.keys(fieldMap).length - 1 > i) {
                                lists.push(_react2.default.createElement(
                                    'li',
                                    { className: 'wfui-input-table__li' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'wfui-input-table__condition' },
                                        logic
                                    )
                                ));
                            }
                            return lists;
                        })
                    ),
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
                    help && _react2.default.createElement('div', {
                        className: 'wfui-form-help',
                        dangerouslySetInnerHTML: { __html: help }
                    })
                ),
                descDisplay ? (0, _react.cloneElement)(descDisplay) : ''
            );
        }
    }]);

    return renderTableFormat;
}(_react2.default.Component);

exports.default = renderTableFormat;