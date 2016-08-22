'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _React$createElement, _React$createElement2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _input_field = require('../../src/InputField/input_field');

var _input_field2 = _interopRequireDefault(_input_field);

var _input_table = require('../../src/InputTable/input_table');

var _input_table2 = _interopRequireDefault(_input_table);

var _description = require('../../src/Description/description');

var _description2 = _interopRequireDefault(_description);

var _listbox = require('../../src/Listbox/listbox');

var _listbox2 = _interopRequireDefault(_listbox);

var _listbox_option = require('../../src/Listbox/listbox_option');

var _listbox_option2 = _interopRequireDefault(_listbox_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var css = require('../../dist/wfui.bundle.css');

var config = {
    label: "1. What is your weight measurement?",
    description: _react2.default.createElement(_description2.default, { type: 'theme-blue', content: '<div><b>Before you begin</b><ol><li>Adjust your scale to zero</li><li>Weigh yourself with your clothes off, or wear light clothing. Remember to remove your shoes</li><li>Step on the scale. Make sure both feet are fully on the scale.</li></ol></div>' }),
    fieldLabel: 'Enter your Weight:',
    fieldType: 'or'
};
var config1 = {
    label: 'Cancer Type',
    placeholder: '- Select one -'
};

_reactDom2.default.render(_react2.default.createElement(_input_table2.default, _extends({}, config, { children: [_react2.default.createElement(_input_field2.default, { error: true, type: 'text', suffix: 'pounds' }), _react2.default.createElement(_input_field2.default, { type: 'text', suffix: 'kilograms' }), _react2.default.createElement(_input_field2.default, { type: 'text', suffix: 'kilograms' }), _react2.default.createElement(_input_field2.default, (_React$createElement = { type: 'text' }, _defineProperty(_React$createElement, 'type', "number"), _defineProperty(_React$createElement, 'suffix', 'kilograms'), _defineProperty(_React$createElement, 'min', 0), _defineProperty(_React$createElement, 'max', 10), _React$createElement)), _react2.default.createElement(_input_field2.default, (_React$createElement2 = { type: 'text' }, _defineProperty(_React$createElement2, 'type', "number"), _defineProperty(_React$createElement2, 'suffix', 'kilograms'), _defineProperty(_React$createElement2, 'min', -10), _defineProperty(_React$createElement2, 'max', 10), _React$createElement2))] })), document.getElementById('app'));