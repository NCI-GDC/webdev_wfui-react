function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
import { Row, Col, Image } from 'react-bootstrap';

var DefaultGroupsItem =
/*#__PURE__*/
function (_Component) {
  _inherits(DefaultGroupsItem, _Component);

  function DefaultGroupsItem() {
    _classCallCheck(this, DefaultGroupsItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(DefaultGroupsItem).apply(this, arguments));
  }

  _createClass(DefaultGroupsItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          icon = _this$props.icon,
          link = _this$props.link,
          title = _this$props.title,
          size = _this$props.size;
      return React.createElement("div", {
        className: "col-xs-3"
      }, React.createElement("div", {
        className: "popover-content__card"
      }, React.createElement("a", {
        href: link
      }, React.createElement(Row, null, React.createElement(Col, {
        xs: 12
      }, React.createElement(Image, {
        src: icon,
        width: size,
        height: size
      }))), React.createElement("h4", null, title))));
    }
  }]);

  return DefaultGroupsItem;
}(Component);

DefaultGroupsItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
  size: PropTypes.number
};
DefaultGroupsItem.defaultProps = {
  size: 32
};
export default DefaultGroupsItem;