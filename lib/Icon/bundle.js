'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _icon = require('../../src/Icon/icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = require('../../dist/wfui.bundle.css');

//WFUI


_reactDom2.default.render(_react2.default.createElement(_icon2.default, { data: { name: 'spinner', size: '1x', is_spinning: true } }), document.getElementById('icon1'));
_reactDom2.default.render(_react2.default.createElement(_icon2.default, { data: { name: 'envelope', size: '2x' } }), document.getElementById('icon2'));
_reactDom2.default.render(_react2.default.createElement(_icon2.default, { data: { name: 'info', size: '3x' } }), document.getElementById('icon3'));
_reactDom2.default.render(_react2.default.createElement(_icon2.default, { data: { name: 'tag', size: '4x' } }), document.getElementById('icon4'));
_reactDom2.default.render(_react2.default.createElement(_icon2.default, { data: { name: 'times', size: '5x' } }), document.getElementById('icon5'));