'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _DraggableItem = require('./DraggableItem');

var _DraggableItem2 = _interopRequireDefault(_DraggableItem);

var _DraggableHandle = require('./DraggableHandle');

var _DraggableHandle2 = _interopRequireDefault(_DraggableHandle);

var _update = require('react/lib/update');

var _update2 = _interopRequireDefault(_update);

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
        listStyleType: 'none',
        paddingLeft: 0
    },
    grid: {
        columnWidth: 300
    }
};

var Draggable = (_dec = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default), _dec(_class = function (_React$Component) {
    _inherits(Draggable, _React$Component);

    function Draggable() {
        _classCallCheck(this, Draggable);

        var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this));

        _this.onHandleMoveItem = _this.onHandleMoveItem.bind(_this);
        _this.onHandleEndDrag = _this.onHandleEndDrag.bind(_this);
        return _this;
    }

    _createClass(Draggable, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var _props = this.props,
                children = _props.children,
                type = _props.type;

            this.setState({
                items: children.map(function (child, i) {
                    return _react2.default.cloneElement(child, Object.assign({}, child.props, {
                        moveItem: _this2.onHandleMoveItem,
                        endDrag: _this2.onHandleEndDrag,
                        key: i,
                        type: type
                    }));
                })
            });
        }
    }, {
        key: 'onHandleEndDrag',
        value: function onHandleEndDrag() {
            var onHandleEndDrag = this.props.onHandleEndDrag;
            var items = this.state.items;

            this.props.onHandleEndDrag({ items: items });
        }
    }, {
        key: 'onHandleMoveItem',
        value: function onHandleMoveItem(dragIndex, hoverIndex) {
            var items = this.state.items;

            var dragItem = items[dragIndex];

            this.setState((0, _update2.default)(this.state, {
                items: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]]
                }
            }));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                className = _props2.className,
                type = _props2.type;
            var items = this.state.items;

            return _react2.default.createElement(
                'ul',
                { className: (0, _classnames2.default)(className, 'wfui-draggable'), style: type === 'grid' ? _extends({}, style.container, style.grid) : _extends({}, style.container) },
                items.map(function (item, i) {
                    return _react2.default.cloneElement(item, Object.assign({}, item.props, { index: i }));
                })
            );
        }
    }]);

    return Draggable;
}(_react2.default.Component)) || _class);


Draggable.propTypes = {
    children: _react2.default.PropTypes.node,
    type: _react2.default.PropTypes.oneOf(['stack', 'grid']).isRequired,
    onHandleEndDrag: _react2.default.PropTypes.func
};

Draggable.defaultProps = {
    type: 'stack',
    onHandleEndDrag: function onHandleEndDrag() {
        return undefined;
    }
};

Draggable.Item = _DraggableItem2.default;
Draggable.Handle = _DraggableHandle2.default;

exports.default = Draggable;