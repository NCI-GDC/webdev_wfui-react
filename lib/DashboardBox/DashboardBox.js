function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Button, DropdownButton, Panel } from 'react-bootstrap';
import classNames from 'classnames';
import { MenuItem, Glyphicon } from '..';

var DashboardBox =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DashboardBox, _React$Component);

  function DashboardBox() {
    _classCallCheck(this, DashboardBox);

    return _possibleConstructorReturn(this, _getPrototypeOf(DashboardBox).apply(this, arguments));
  }

  _createClass(DashboardBox, [{
    key: "renderConfigs",
    value: function renderConfigs() {
      var configs = this.props.configs;
      return React.createElement(DropdownButton, {
        variant: "link",
        title: React.createElement(Glyphicon, {
          glyph: "cog"
        }),
        id: "wfui-dashboardBox-config",
        noCaret: true,
        pullRight: true
      }, configs.map(function (item, idx) {
        return React.createElement(MenuItem, {
          key: idx,
          href: item.href,
          onClick: item.onClick
        }, item.name);
      }));
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var _this$props = this.props,
          imageURL = _this$props.imageURL,
          title = _this$props.title,
          buttons = _this$props.buttons,
          configs = _this$props.configs;
      return React.createElement("header", {
        className: "widget__header"
      }, React.createElement("h2", {
        className: "widget__header__title"
      }, React.createElement("div", {
        className: "widget__header__title__img_container"
      }, imageURL && React.createElement("img", {
        src: imageURL,
        width: "32",
        height: "32",
        alt: "".concat(title, " Logo")
      })), React.createElement("div", {
        className: "widget__header__title__text"
      }, title)), React.createElement("div", {
        className: "widget__header__buttons"
      }, buttons && buttons.map(function (item, idx) {
        return React.createElement(Button, {
          key: idx,
          variant: item.variant || 'primary',
          href: item.href,
          onClick: item.onClick
        }, item.name);
      }), configs && this.renderConfigs()));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          children = _this$props2.children;
      return React.createElement("div", {
        className: classNames(className, 'widget wfui-dashboardBox')
      }, this.renderHeader(), React.createElement("div", {
        className: "widget__body",
        style: {
          overflowX: 'auto'
        }
      }, children));
    }
  }]);

  return DashboardBox;
}(React.Component);

DashboardBox.propTypes = {
  title: PropTypes.string,
  imageURL: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
    variant: PropTypes.string
  })),
  configs: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func
  })),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
DashboardBox.defaultTypes = {
  title: '',
  imageURL: '',
  buttons: [],
  configs: [],
  children: []
};
export default DashboardBox;