'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDom = require('react-dom');

var _ItemTypes = require('./ItemTypes');

var _ItemTypes2 = _interopRequireDefault(_ItemTypes);

var _DraggableHandle = require('./DraggableHandle');

var _DraggableHandle2 = _interopRequireDefault(_DraggableHandle);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        var id = monitor.getItem().id;
        var hoverIndex = props.index;

        if (!monitor.isOver({ shallow: true })) return;

        // Determine rectangle on screen
        var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();

        // Get vertical middle
        var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        var clientOffset = monitor.getClientOffset();

        // Get Pixels to the top
        var hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Draggin downwards
        if (props.type === 'stack') {
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
        }

        // Perform the action
        props.moveItem(dragIndex, hoverIndex);

        // Replace original index to hover index.
        monitor.getItem().index = hoverIndex;
    }
};

var DraggableItem = (_dec = (0, _reactDnd.DropTarget)(_ItemTypes2.default.Item, itemTarget, function (connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}), _dec2 = (0, _reactDnd.DragSource)(_ItemTypes2.default.Item, itemSource, function (connect, monitor) {
    var dragItem = monitor.getItem();
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        // isDragging: monitor.isDragging(), not working well
        dragIndex: dragItem && dragItem.index
    };
}), _dec(_class = _dec2(_class = function (_React$Component) {
    _inherits(DraggableItem, _React$Component);

    function DraggableItem() {
        _classCallCheck(this, DraggableItem);

        var _this = _possibleConstructorReturn(this, (DraggableItem.__proto__ || Object.getPrototypeOf(DraggableItem)).call(this));

        _this.state = { hasHandle: false };
        return _this;
    }

    _createClass(DraggableItem, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            var children = props.children;

            var hasHandle = false;
            if (children.length) {
                children.forEach(function (child, i) {
                    if (child.type == _DraggableHandle2.default) {
                        hasHandle = true;
                    }
                });
            } else {
                if (children.type == _DraggableHandle2.default) {
                    hasHandle = true;
                }
            }
            this.setState({ hasHandle: hasHandle });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                children = _props.children,
                text = _props.text,
                isDragging = _props.isDragging,
                dragIndex = _props.dragIndex,
                index = _props.index,
                connectDragSource = _props.connectDragSource,
                connectDropTarget = _props.connectDropTarget,
                connectDragPreview = _props.connectDragPreview;
            var hasHandle = this.state.hasHandle;

            var opacity = dragIndex === index ? 0.3 : 1;
            var classes = 'wfui-draggable-item';

            // Make only DraggableHandle enable to drag.
            if (hasHandle) {
                return connectDragPreview(connectDropTarget(_react2.default.createElement(
                    'li',
                    { className: (0, _classnames2.default)(className, classes), style: { opacity: opacity, breakInside: 'avoid', pageBreakInside: 'avoid' } },
                    children.map(function (child, i) {
                        if (child.type == _DraggableHandle2.default) {
                            return connectDragSource(_react2.default.createElement(
                                'div',
                                { key: i, className: 'wfui-draggable-handle' },
                                child
                            ));
                        }
                        return _react2.default.createElement(
                            'div',
                            { key: i },
                            child
                        );
                    })
                )));
            }
            // Entire content is draggable.
            return connectDragPreview(connectDragSource(connectDropTarget(_react2.default.createElement(
                'li',
                { className: (0, _classnames2.default)(className, classes), style: { opacity: opacity, breakInside: 'avoid', pageBreakInside: 'avoid' } },
                children
            ))));
        }
    }]);

    return DraggableItem;
}(_react2.default.Component)) || _class) || _class);


DraggableItem.propTypes = {
    children: _react2.default.PropTypes.node.isRequired,
    type: _react2.default.PropTypes.oneOf(['stack', 'grid']).isRequired,
    moveItem: _react2.default.PropTypes.func,
    endDrag: _react2.default.PropTypes.func
};
DraggableItem.defaultProps = {
    type: 'stack',
    moveItem: function moveItem() {
        return undefined;
    },
    endDrag: function endDrag() {
        return undefined;
    }
};

exports.default = DraggableItem;