'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrawerToggle = function (_Component) {
    _inherits(DrawerToggle, _Component);

    function DrawerToggle() {
        _classCallCheck(this, DrawerToggle);

        return _possibleConstructorReturn(this, (DrawerToggle.__proto__ || Object.getPrototypeOf(DrawerToggle)).apply(this, arguments));
    }

    _createClass(DrawerToggle, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                isIcon = _props.isIcon,
                icon = _props.icon,
                image = _props.image,
                title = _props.title,
                useCaret = _props.useCaret,
                bsStyle = _props.bsStyle,
                bsRole = _props.bsRole,
                handleClick = _props.handleClick;


            return _react2.default.createElement(
                _reactBootstrap.Button,
                { bsStyle: bsStyle, bsRole: bsRole, onClick: handleClick },
                isIcon && _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: icon }),
                image && _react2.default.createElement(_reactBootstrap.Image, { src: image }),
                title,
                useCaret ? _react2.default.createElement('span', { className: 'caret' }) : null
            );
        }
    }]);

    return DrawerToggle;
}(_react.Component);

DrawerToggle.propTypes = {
    handleClick: _react.PropTypes.func,
    bsStyle: _react.PropTypes.string,
    title: _react.PropTypes.string,
    isIcon: _react.PropTypes.bool,
    icon: _react.PropTypes.string,
    image: _react.PropTypes.string,
    useCaret: _react.PropTypes.bool,
    bsRole: _react.PropTypes.string
};

DrawerToggle.defaultProps = {
    bsStyle: '',
    title: '',
    isIcon: false,
    icon: null,
    image: null,
    useCaret: false,
    bsRole: 'button'
};

exports.default = DrawerToggle;