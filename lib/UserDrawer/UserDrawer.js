function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import DrawerButton from '../Drawer/DrawerButton';
import Spinner from '../Spinner/Spinner';
import Icon from '../Icon/Icon';
var defaultSpinner = React.createElement("div", {
  className: "groups-drawer",
  style: {
    width: '100px',
    height: '50px'
  }
}, React.createElement(Spinner, {
  type: 1,
  fontSize: "10",
  margin: "40px"
}));

var UserDrawer =
/*#__PURE__*/
function (_Component) {
  _inherits(UserDrawer, _Component);

  function UserDrawer() {
    _classCallCheck(this, UserDrawer);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserDrawer).apply(this, arguments));
  }

  _createClass(UserDrawer, [{
    key: "renderSpinner",
    value: function renderSpinner() {
      return this.props.spinnerFormat;
    }
  }, {
    key: "renderUserMenu",
    value: function renderUserMenu() {
      var _this$props = this.props,
          userMenu = _this$props.userMenu,
          listClassName = _this$props.listClassName;
      var menuItems = userMenu.map(function (menu, idx) {
        return React.createElement("li", {
          key: idx
        }, React.createElement("a", {
          href: menu.link
        }, menu.icon ? React.createElement(Icon, {
          name: menu.icon
        }) : null, menu.title));
      });
      return React.createElement("div", {
        className: "clearfix row"
      }, React.createElement("div", {
        className: "col-md-12"
      }, React.createElement("ul", {
        className: "links-list--no-wrap list-unstyled ".concat(listClassName)
      }, menuItems)));
    }
  }, {
    key: "renderUserInfo",
    value: function renderUserInfo() {
      var userInfo = this.props.userInfo;
      return React.createElement("div", {
        className: "popover-title"
      }, userInfo.image ? React.createElement("img", {
        width: 40,
        height: 40,
        src: userInfo.image
      }) : '', React.createElement("span", {
        className: "is-lower-case is-aligned-left"
      }, React.createElement("h3", null, userInfo.email)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          userInfo = _this$props2.userInfo,
          userMenu = _this$props2.userMenu,
          props = _objectWithoutProperties(_this$props2, ["userInfo", "userMenu"]);

      if (!userInfo.uid) {
        return React.createElement(Button, _extends({
          disabled: true
        }, props), React.createElement(Spinner, {
          type: 1,
          fontSize: "5",
          margin: "20px"
        }));
      }

      return React.createElement(DrawerButton, _extends({}, props, {
        title: userInfo.email
      }), React.createElement("div", {
        className: "users-drawer"
      }, this.renderUserInfo()), React.createElement("div", {
        className: "popover-body"
      }, userMenu.length > 0 ? this.renderUserMenu() : this.renderSpinner()));
    }
  }]);

  return UserDrawer;
}(Component);

UserDrawer.propTypes = {
  userMenu: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string
  })),
  userInfo: PropTypes.shape({
    uid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    email: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string
  }),
  useCaret: PropTypes.bool,
  spinnerFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  listClassName: PropTypes.string
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
  variant: 'link',
  listClassName: ''
};
export default UserDrawer;