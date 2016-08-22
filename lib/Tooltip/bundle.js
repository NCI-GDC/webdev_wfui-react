'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tooltip = require('../../src/Tooltip/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = require('../../dist/wfui.bundle.css');

_reactDom2.default.render(_react2.default.createElement(_tooltip2.default, { name: 'tooltip', content: 'content', is_link: false, href: 'http://www.google.ca', description: 'text tooltip 1', position: 'right' }), document.getElementById("tooltip"));