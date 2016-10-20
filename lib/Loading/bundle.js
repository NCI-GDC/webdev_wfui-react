'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _loading = require('../../src/Loading/loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = require('../../dist/wfui.bundle.css');

//WFUI


_reactDom2.default.render(_react2.default.createElement(_loading2.default, { width: '100px', height: '100px' }), document.getElementById('loading'));