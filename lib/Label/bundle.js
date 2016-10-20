'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _label = require('../../src/Label/label');

var _label2 = _interopRequireDefault(_label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = require('../../dist/wfui.bundle.css');

_reactDom2.default.render(_react2.default.createElement(_label2.default, { name: 'label', content: 'content', is_link: true, href: 'http://www.google.ca', is_closeable: true }), document.getElementById("label"));
_reactDom2.default.render(_react2.default.createElement(_label2.default, { name: 'label2', content: 'content2', is_link: false, is_closeable: true }), document.getElementById("label2"));
_reactDom2.default.render(_react2.default.createElement(_label2.default, { name: 'label3', content: 'content3', is_link: false, is_closeable: false }), document.getElementById("label3"));
_reactDom2.default.render(_react2.default.createElement(_label2.default, { name: 'label4', content: 'content4', is_link: true, href: 'http://www.google.ca', is_closeable: false }), document.getElementById("label4"));