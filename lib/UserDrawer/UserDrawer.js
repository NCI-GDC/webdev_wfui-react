'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _DrawerButton = require('../Drawer/DrawerButton');

var _DrawerButton2 = _interopRequireDefault(_DrawerButton);

var _Spinner = require('../Spinner/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultSpinner = _react2.default.createElement(
    'div',
    { className: 'groups-drawer', style: { width: '100px', height: '50px' } },
    _react2.default.createElement(_Spinner2.default, { type: 1, fontSize: '10', margin: '40px' })
);

var UserDrawer = function (_Component) {
    _inherits(UserDrawer, _Component);

    function UserDrawer() {
        _classCallCheck(this, UserDrawer);

        return _possibleConstructorReturn(this, (UserDrawer.__proto__ || Object.getPrototypeOf(UserDrawer)).apply(this, arguments));
    }

    _createClass(UserDrawer, [{
        key: 'renderSpinner',
        value: function renderSpinner() {
            return this.props.spinnerFormat;
        }
    }, {
        key: 'renderUserMenu',
        value: function renderUserMenu() {
            var userMenu = this.props.userMenu;

            var menuItems = userMenu.map(function (menu) {
                return _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                        'a',
                        { href: menu.link },
                        menu.icon ? _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: menu.icon }) : null,
                        menu.title
                    )
                );
            });

            return _react2.default.createElement(
                'div',
                { className: 'clearfix row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-md-12' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'links-list--no-wrap list-unstyled' },
                        menuItems
                    )
                )
            );
        }
    }, {
        key: 'renderUserInfo',
        value: function renderUserInfo() {
            var userInfo = this.props.userInfo;

            return _react2.default.createElement(
                'div',
                { className: 'popover-title' },
                userInfo.image ? _react2.default.createElement('img', { width: 40, height: 40, src: userInfo.image }) : '',
                _react2.default.createElement(
                    'span',
                    { className: 'is-lower-case is-aligned-left' },
                    _react2.default.createElement(
                        'h3',
                        null,
                        userInfo.email
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                userInfo = _props.userInfo,
                userMenu = _props.userMenu,
                props = _objectWithoutProperties(_props, ['userInfo', 'userMenu']);

            if (!userInfo.uid) {
                return _react2.default.createElement(
                    _reactBootstrap.Button,
                    _extends({ disabled: true }, props),
                    _react2.default.createElement(_Spinner2.default, { type: 1, fontSize: '5', margin: '20px' })
                );
            }

            return _react2.default.createElement(
                _DrawerButton2.default,
                _extends({}, props, { title: userInfo.email }),
                _react2.default.createElement(
                    'div',
                    { className: 'users-drawer' },
                    this.renderUserInfo()
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'popover-content' },
                    userMenu.length > 0 ? this.renderUserMenu() : this.renderSpinner()
                )
            );
        }
    }]);

    return UserDrawer;
}(_react.Component);

UserDrawer.propTypes = {
    userMenu: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        icon: _react.PropTypes.string,
        title: _react.PropTypes.string,
        link: _react.PropTypes.string
    })),
    userInfo: _react.PropTypes.shape({
        uid: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        email: _react.PropTypes.string,
        name: _react.PropTypes.string,
        image: _react.PropTypes.string
    }),
    useCaret: _react.PropTypes.bool,
    spinnerFormat: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.arrayOf(_react.PropTypes.element)])
};

UserDrawer.defaultProps = {
    userMenu: [],
    userInfo: {
        uid: 0,
        email: '',
        name: '',
        image: ''
    },
    spinnerFormat: defaultSpinner,
    useCaret: true,
    bsStyle: 'link'
};

exports.default = UserDrawer;