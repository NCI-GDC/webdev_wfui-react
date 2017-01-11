'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _DrawerToggle = require('./DrawerToggle');

var _DrawerToggle2 = _interopRequireDefault(_DrawerToggle);

var _DrawerPopover = require('./DrawerPopover');

var _DrawerPopover2 = _interopRequireDefault(_DrawerPopover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TOGGLE_ROLE = _DrawerToggle2.default.defaultProps.bsRole;
var POPOVER_ROLE = _DrawerPopover2.default.defaultProps.bsRole;

var Drawer = function (_React$Component) {
    _inherits(Drawer, _React$Component);

    function Drawer(props) {
        _classCallCheck(this, Drawer);

        var _this = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, props));

        _this.togglePopover = _this.togglePopover.bind(_this);
        _this.closePopover = _this.closePopover.bind(_this);

        _this.state = { show: false };
        return _this;
    }

    _createClass(Drawer, [{
        key: 'togglePopover',
        value: function togglePopover(e) {
            this.setState({ target: e.target, show: !this.state.show });
        }
    }, {
        key: 'closePopover',
        value: function closePopover() {
            this.setState({ show: false });
        }
    }, {
        key: 'renderToggle',
        value: function renderToggle(child, key) {
            return (0, _react.cloneElement)(child, { handleClick: this.togglePopover, key: key });
        }
    }, {
        key: 'renderPopover',
        value: function renderPopover(child, key) {
            var _state = this.state,
                show = _state.show,
                target = _state.target;

            return (0, _react.cloneElement)(child, {
                show: show,
                target: target,
                handleClose: this.closePopover,
                key: key
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                Component = _props.componentClass,
                children = _props.children;


            return _react2.default.createElement(
                Component,
                null,
                children.map(function (child, key) {
                    switch (child.props.bsRole) {
                        case TOGGLE_ROLE:
                            return _this2.renderToggle(child, key);
                        case POPOVER_ROLE:
                            return _this2.renderPopover(child, key);
                        default:
                            return child;
                    }
                })
            );
        }
    }]);

    return Drawer;
}(_react2.default.Component);

Drawer.Button = _DrawerToggle2.default;
Drawer.Popover = _DrawerPopover2.default;

Drawer.propTypes = {
    componentClass: _react.PropTypes.func,
    children: _react.PropTypes.arrayOf(function (propValue) {
        if (propValue.length !== 2) {
            return new Error('The Drawer Component requires exactly two children Drawer.Button and Drawer.Popover');
        } else if (!propValue[0].props.bsRole === TOGGLE_ROLE) {
            return new Error('The first child of Drawer Component should be Drawer.Button');
        } else if (!propValue[1].props.bsRole === POPOVER_ROLE) {
            return new Error('The second child of Drawer Component should be Drawer.Popover');
        }
        return null;
    }).isRequired
};

Drawer.defaultProps = {
    componentClass: _reactBootstrap.ButtonToolbar
};

exports.default = Drawer;