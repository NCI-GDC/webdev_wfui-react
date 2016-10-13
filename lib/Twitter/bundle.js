'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _twitter = require('../../src/Twitter/twitter');

var _twitter2 = _interopRequireDefault(_twitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_twitter2.default, { twitterAccount: 'GA4GH' }), document.getElementById('twitter'));
_reactDom2.default.render(_react2.default.createElement(_twitter2.default, { twitterAccount: 'GA4GH', title: 'test', followLinkText: 'test' }), document.getElementById('twitter'));