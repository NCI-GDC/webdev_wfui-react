'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Drawer = require('./Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrawerButton = function (_Component) {
    _inherits(DrawerButton, _Component);

    function DrawerButton() {
        _classCallCheck(this, DrawerButton);

        return _possibleConstructorReturn(this, (DrawerButton.__proto__ || Object.getPrototypeOf(DrawerButton)).apply(this, arguments));
    }

    _createClass(DrawerButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                placement = _props.placement,
                children = _props.children,
                popoverTitle = _props.popoverTitle,
                props = _objectWithoutProperties(_props, ['placement', 'children', 'popoverTitle']);

            return _react2.default.createElement(
                _Drawer2.default,
                null,
                _react2.default.createElement(_Drawer2.default.Button, props),
                _react2.default.createElement(
                    _Drawer2.default.Popover,
                    { title: popoverTitle, placement: placement },
                    children
                )
            );
        }
    }]);

    return DrawerButton;
}(_react.Component);

DrawerButton.propTypes = {
    bsStyle: _react.PropTypes.string,
    title: _react.PropTypes.string,
    isIcon: _react.PropTypes.bool,
    icon: _react.PropTypes.string,
    image: _react.PropTypes.string,
    useCaret: _react.PropTypes.bool,
    placement: _react.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    popoverTitle: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.arrayOf(_react.PropTypes.element)]),
    children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.element), _react.PropTypes.element])
};

DrawerButton.defaultProps = {
    bsStyle: 'default',
    title: '',
    isIcon: false,
    icon: '',
    image: null,
    useCaret: false,
    placement: 'bottom',
    popoverTitle: null
};

exports.default = DrawerButton;