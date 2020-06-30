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
import { Overlay, Popover } from 'react-bootstrap';

var DrawerPopover =
/*#__PURE__*/
function (_Component) {
  _inherits(DrawerPopover, _Component);

  function DrawerPopover() {
    _classCallCheck(this, DrawerPopover);

    return _possibleConstructorReturn(this, _getPrototypeOf(DrawerPopover).apply(this, arguments));
  }

  _createClass(DrawerPopover, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          show = _this$props.show,
          target = _this$props.target,
          placement = _this$props.placement,
          handleClose = _this$props.handleClose,
          variant = _this$props.variant,
          bsRole = _this$props.bsRole,
          children = _this$props.children;
      console.log('title', title);
      return React.createElement(Overlay, {
        show: show,
        target: target,
        placement: placement
      }, React.createElement(Popover, {
        bsRole: bsRole,
        variant: variant,
        id: "popover",
        onClick: handleClose
      }, title && title.length ? React.createElement(Popover.Title, null, title) : null, React.createElement(Popover.Content, null, children)));
    }
  }]);

  return DrawerPopover;
}(Component);

DrawerPopover.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
  show: PropTypes.bool,
  target: PropTypes.shape({}),
  handleClose: PropTypes.func,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  variant: PropTypes.string,
  bsRole: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
};
DrawerPopover.defaultProps = {
  title: null,
  show: false,
  variant: '',
  bsRole: 'popover',
  placement: 'bottom'
};
export default DrawerPopover;