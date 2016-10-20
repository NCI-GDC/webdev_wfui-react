'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _listbox = require('../../src/Listbox/listbox');

var _listbox2 = _interopRequireDefault(_listbox);

var _listbox_option = require('../../src/Listbox/listbox_option');

var _listbox_option2 = _interopRequireDefault(_listbox_option);

var _input_field = require('../../src/InputField/input_field');

var _input_field2 = _interopRequireDefault(_input_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = require('../../dist/wfui.bundle.css');

var config1 = {
	label: 'Cancer Type',
	placeholder: '- Select one -',
	value: 2
};
var config2 = {
	label: 'Leg Injury Location',
	placeholder: '- Select a location -',
	defaultOption: 'Left Leg',
	errors: 1
};
var config3 = {
	label: 'Cancer cause',
	defaultOption: 'Left Leg2',
	errors: true
};

_reactDom2.default.render(_react2.default.createElement(
	_listbox2.default,
	config1,
	_react2.default.createElement(_listbox_option2.default, { value: '1', label: 'Brain' }),
	_react2.default.createElement(_listbox_option2.default, { value: '2', label: 'Leg' })
), document.getElementById('id1'));
_reactDom2.default.render(_react2.default.createElement(
	_listbox2.default,
	config2,
	_react2.default.createElement(_listbox_option2.default, { value: '1', label: 'Right Leg' }),
	_react2.default.createElement(_listbox_option2.default, { value: '2', label: 'Left Leg' })
), document.getElementById('id2'));
_reactDom2.default.render(_react2.default.createElement(
	_listbox2.default,
	config3,
	_react2.default.createElement(_listbox_option2.default, { value: '1', label: 'Right Leg' }),
	_react2.default.createElement(_listbox_option2.default, { value: '2', label: 'Left Leg2' })
), document.getElementById('id3'));