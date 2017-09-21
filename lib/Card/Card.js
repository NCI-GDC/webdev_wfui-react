'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CardBody = require('./CardBody');

var _CardBody2 = _interopRequireDefault(_CardBody);

var _CardHover = require('./CardHover');

var _CardHover2 = _interopRequireDefault(_CardHover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BODY_ROLE = _CardBody2.default.defaultProps.role;
var HOVER_ROLE = _CardHover2.default.defaultProps.role;

var Card = function (_React$Component) {
    _inherits(Card, _React$Component);

    function Card(props) {
        _classCallCheck(this, Card);

        var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

        _this.state = { hover: false };
        return _this;
    }

    _createClass(Card, [{
        key: 'renderChild',
        value: function renderChild(child, key) {
            var hover = this.state.hover;

            return (0, _react.cloneElement)(child, {
                hover: hover,
                key: key
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                className = _props.className,
                children = _props.children,
                cardStyle = _props.cardStyle;

            console.log(children);
            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)(className, 'wfui-card wfui-card-container'),
                    onMouseOver: function onMouseOver() {
                        return _this2.setState({ hover: true });
                    },
                    onMouseLeave: function onMouseLeave() {
                        return _this2.setState({ hover: false });
                    },
                    style: cardStyle || {}
                },
                children && (Array.isArray(children) && children.map(function (child, key) {
                    switch (child.props.role) {
                        case BODY_ROLE:
                        case HOVER_ROLE:
                            return _this2.renderChild(child, key);
                        default:
                            return child;
                    }
                }) || this.renderChild(children, 0))
            );
        }
    }]);

    return Card;
}(_react2.default.Component);

Card.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    cardStyle: _propTypes2.default.object
};

Card.Body = _CardBody2.default;
Card.Hover = _CardHover2.default;

exports.default = Card;