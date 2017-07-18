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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardHover = function (_React$Component) {
    _inherits(CardHover, _React$Component);

    function CardHover() {
        _classCallCheck(this, CardHover);

        return _possibleConstructorReturn(this, (CardHover.__proto__ || Object.getPrototypeOf(CardHover)).apply(this, arguments));
    }

    _createClass(CardHover, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                hover = _props.hover,
                className = _props.className,
                children = _props.children,
                role = _props.role,
                animation = _props.animation,
                middle = _props.middle,
                hoverOpacity = _props.hoverOpacity,
                backgroundColor = _props.backgroundColor;

            var style = {};
            if (hover) {
                if (hoverOpacity && typeof hoverOpacity === 'number') style.opacity = hoverOpacity;
                if (backgroundColor && typeof backgroundColor === 'string') style.backgroundColor = backgroundColor;
            }

            return _react2.default.createElement(
                'div',
                {
                    role: role,
                    className: (0, _classnames2.default)(className, 'wfui-card-hover', 'card-' + animation, { active: hover }),
                    style: style
                },
                middle ? _react2.default.createElement(
                    'div',
                    { className: 'middle' },
                    children
                ) : _react2.default.createElement(
                    'div',
                    null,
                    children
                )
            );
        }
    }]);

    return CardHover;
}(_react2.default.Component);

CardHover.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    role: _propTypes2.default.string,
    hover: _propTypes2.default.bool,
    animation: _propTypes2.default.string,
    hoverOpacity: _propTypes2.default.number,
    backgroundColor: _propTypes2.default.string,
    middle: _propTypes2.default.bool
};

CardHover.defaultProps = {
    role: 'hover',
    hover: false,
    animation: 'fade'
};

exports.default = CardHover;