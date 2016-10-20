'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _input_field = require('../../src/InputField/input_field');

var _input_field2 = _interopRequireDefault(_input_field);

var _description = require('../../src/Description/description');

var _description2 = _interopRequireDefault(_description);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = require('../../dist/wfui.bundle.css');

_reactDom2.default.render(_react2.default.createElement(_input_field2.default, { type: 'text', name: 'input1', errors: true, label: 'Type Text:', description: _react2.default.createElement(_description2.default, { content: 'This is description' }) }), document.getElementById('input1'));
_reactDom2.default.render(_react2.default.createElement(_input_field2.default, { type: 'email', name: 'input2', label: 'Type Email:' }), document.getElementById('input2'));
_reactDom2.default.render(_react2.default.createElement(_input_field2.default, { type: 'number', name: 'input3', errors: 1, max: 10, label: 'Type Number:' }), document.getElementById('input3'));
_reactDom2.default.render(_react2.default.createElement(_input_field2.default, { label: 'Enter your weight:', postfix: 'pounds' }), document.getElementById('input4'));