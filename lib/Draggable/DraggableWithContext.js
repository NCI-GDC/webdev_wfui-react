'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _Draggable = require('./Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(_Draggable2.default);