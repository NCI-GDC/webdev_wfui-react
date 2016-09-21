'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _containercounter = require('../../src/ContainerCounter/containercounter');

var _containercounter2 = _interopRequireDefault(_containercounter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var css = require('../../dist/wfui.bundle.css');

var elementNode = _react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(
    'ul',
    null,
    _react2.default.createElement(
      'li',
      null,
      'hi'
    ),
    _react2.default.createElement(
      'li',
      null,
      'tom'
    )
  )
);
var props1 = { content: elementNode, isCounter: true };
var props2 = { content: elementNode, isCounter: false };

_reactDom2.default.render(_react2.default.createElement(_containercounter2.default, { data: props1 }), document.getElementById('container1'));
_reactDom2.default.render(_react2.default.createElement(_containercounter2.default, { data: props2 }), document.getElementById('container2'));