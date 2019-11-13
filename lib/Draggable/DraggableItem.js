function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, DropTarget, DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import ItemTypes from './ItemTypes';
import DraggableHandle from './DraggableHandle';
var style = {
  list: {
    border: '1px dotted #aaa',
    marginBottom: 10,
    padding: 10
  },
  container: {
    border: '1px dotted #aaa',
    listStyleType: 'none',
    padding: 20
  }
};
var itemSource = {
  beginDrag: function beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  },
  endDrag: function endDrag(props) {
    props.endDrag();
  }
};
var itemTarget = {
  hover: function hover(props, monitor, component) {
    var dragIndex = monitor.getItem().index;

    var _monitor$getItem = monitor.getItem(),
        id = _monitor$getItem.id;

    var hoverIndex = props.index;
    if (!monitor.isOver({
      shallow: true
    })) return; // Determine rectangle on screen

    var hoverBoundingRect = findDOMNode(component).getBoundingClientRect(); // Get vertical middle

    var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; // Determine mouse position

    var clientOffset = monitor.getClientOffset(); // Get Pixels to the top

    var hoverClientY = clientOffset.y - hoverBoundingRect.top; // Draggin downwards

    if (props.type === 'stack') {
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      } // Dragging upwards


      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
    } // Perform the action


    props.moveItem(dragIndex, hoverIndex); // Replace original index to hover index.

    monitor.getItem().index = hoverIndex;
  }
};

var DraggableItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DraggableItem, _React$Component);

  function DraggableItem() {
    var _this;

    _classCallCheck(this, DraggableItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DraggableItem).call(this));
    _this.state = {
      hasHandle: false
    };
    return _this;
  }

  _createClass(DraggableItem, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var children = props.children;
      var hasHandle = false;

      if (children.length) {
        children.forEach(function (child, i) {
          if (child.type == DraggableHandle) {
            hasHandle = true;
          }
        });
      } else if (children.type == DraggableHandle) {
        hasHandle = true;
      }

      this.setState({
        hasHandle: hasHandle
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          id = _this$props.id,
          className = _this$props.className,
          children = _this$props.children,
          text = _this$props.text,
          isDragging = _this$props.isDragging,
          dragIndex = _this$props.dragIndex,
          index = _this$props.index,
          connectDragSource = _this$props.connectDragSource,
          connectDropTarget = _this$props.connectDropTarget,
          connectDragPreview = _this$props.connectDragPreview;
      var hasHandle = this.state.hasHandle;
      var opacity = dragIndex === index ? 0.3 : 1;
      var classes = 'wfui-draggable-item'; // Make only DraggableHandle enable to drag.

      if (hasHandle) {
        return connectDragPreview(connectDropTarget(React.createElement("li", {
          id: id,
          className: classNames(className, classes),
          style: {
            opacity: opacity,
            breakInside: 'avoid',
            pageBreakInside: 'avoid'
          }
        }, children.map(function (child, i) {
          if (child.type == DraggableHandle) {
            return connectDragSource(React.createElement("div", {
              key: i,
              className: "wfui-form-addAnother-draggable wfui-draggable-handle"
            }, child));
          }

          if (child.type === 'DeleteButton') {
            return React.createElement("div", {
              className: "wfui-form-addAnother-delete wfui-draggable-delete",
              key: i
            }, child);
          }

          return React.createElement("div", {
            className: "wfui-form-addAnother-content wfui-draggable-content",
            key: i
          }, child);
        }))));
      } // Entire content is draggable.


      return connectDragPreview(connectDragSource(connectDropTarget(React.createElement("li", {
        id: id,
        className: classNames(className, classes),
        style: {
          opacity: opacity,
          breakInside: 'avoid',
          pageBreakInside: 'avoid'
        }
      }, children))));
    }
  }]);

  return DraggableItem;
}(React.Component);

DraggableItem.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['stack', 'grid']).isRequired,
  id: PropTypes.string,
  moveItem: PropTypes.func,
  endDrag: PropTypes.func
};
DraggableItem.defaultProps = {
  type: 'stack',
  id: '',
  moveItem: function moveItem() {
    return undefined;
  },
  endDrag: function endDrag() {
    return undefined;
  }
};
export default DragSource(ItemTypes.Item, itemSource, function (connect, monitor) {
  var dragItem = monitor.getItem();
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    // isDragging: monitor.isDragging(), not working well
    dragIndex: dragItem && dragItem.index
  };
})(DropTarget(ItemTypes.Item, itemTarget, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
})(DraggableItem));