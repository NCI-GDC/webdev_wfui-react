function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classNames from 'classnames';
import DraggableItem from './DraggableItem';
import DraggableHandle from './DraggableHandle';
var style = {
  list: {
    border: '1px dotted #aaa',
    marginBottom: 10,
    padding: 10
  },
  container: {
    listStyleType: 'none',
    paddingLeft: 0
  }
};

var Draggable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Draggable, _React$Component);

  function Draggable() {
    var _this;

    _classCallCheck(this, Draggable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Draggable).call(this));
    _this.state = {
      items: [],
      columnWidth: 300
    };
    _this.onHandleMoveItem = _this.onHandleMoveItem.bind(_assertThisInitialized(_this));
    _this.onHandleEndDrag = _this.onHandleEndDrag.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Draggable, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setItems(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.setItems(props);
    }
  }, {
    key: "setItems",
    value: function setItems(props) {
      var children = props.children,
          type = props.type;

      if (children) {
        this.setState({
          items: children.length ? children.map(function (child, i) {
            return child;
          }) : [children]
        });
      }
    }
  }, {
    key: "onHandleEndDrag",
    value: function onHandleEndDrag() {
      var onHandleEndDrag = this.props.onHandleEndDrag;
      var items = this.state.items;
      this.props.onHandleEndDrag({
        items: items
      });
    }
  }, {
    key: "onHandleMoveItem",
    value: function onHandleMoveItem(dragIndex, hoverIndex) {
      var onHandleItemMove = this.props.onHandleItemMove;
      var items = this.state.items;
      var dragItem = items[dragIndex];

      if (dragIndex !== hoverIndex) {
        onHandleItemMove(dragIndex, hoverIndex);
      }

      var newItems = this.state.items;
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragItem);
      this.setState({
        items: newItems
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          type = _this$props.type,
          columnCount = _this$props.columnCount;
      var items = this.state.items;
      return React.createElement("div", {
        className: classNames(className, 'wfui-draggable')
      }, React.createElement("ul", {
        style: type === 'grid' ? _extends({}, style.container, {
          columnCount: columnCount,
          MozColumnCount: columnCount
        }) : _extends({}, style.container)
      }, items.map(function (item, i) {
        return React.cloneElement(item, _extends({}, item.props, {
          moveItem: _this2.onHandleMoveItem,
          endDrag: _this2.onHandleEndDrag,
          key: i,
          index: i,
          type: type
        }));
      })));
    }
  }]);

  return Draggable;
}(React.Component);

Draggable.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['stack', 'grid']).isRequired,
  columnCount: PropTypes.number,
  onHandleEndDrag: PropTypes.func,
  onHandleItemMove: PropTypes.func
};
Draggable.defaultProps = {
  type: 'stack',
  onHandleEndDrag: function onHandleEndDrag() {
    return undefined;
  },
  onHandleItemMove: function onHandleItemMove() {
    return undefined;
  },
  columnCount: 3
};
Draggable.Item = DraggableItem;
Draggable.Handle = DraggableHandle;
export default Draggable;

var withContext = function withContext(props) {
  return React.createElement(DndProvider, {
    backend: HTML5Backend
  }, React.createElement(Draggable, {
    props: props
  }, props.children));
};

withContext.Item = DraggableItem;
withContext.Handle = DraggableHandle;
export { withContext };