'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Allow to specify draggable area.
 */
var DraggableHandle = function DraggableHandle(props) {
  return _react2.default.createElement(
    'div',
    null,
    props.children
  );
};
DraggableHandle.propTypes = {
  children: _react2.default.PropTypes.node
};

exports.default = DraggableHandle;