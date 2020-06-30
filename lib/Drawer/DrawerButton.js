function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
import Drawer from './Drawer';

var DrawerButton =
/*#__PURE__*/
function (_Component) {
  _inherits(DrawerButton, _Component);

  function DrawerButton() {
    _classCallCheck(this, DrawerButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(DrawerButton).apply(this, arguments));
  }

  _createClass(DrawerButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          placement = _this$props.placement,
          children = _this$props.children,
          popoverTitle = _this$props.popoverTitle,
          props = _objectWithoutProperties(_this$props, ["placement", "children", "popoverTitle"]);

      return React.createElement(Drawer, null, React.createElement(Drawer.Button, props), React.createElement(Drawer.Popover, {
        title: popoverTitle,
        placement: placement
      }, children));
    }
  }]);

  return DrawerButton;
}(Component);

DrawerButton.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  isIcon: PropTypes.bool,
  icon: PropTypes.string,
  image: PropTypes.string,
  useCaret: PropTypes.bool,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  popoverTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
};
DrawerButton.defaultProps = {
  variant: 'default',
  title: '',
  isIcon: false,
  icon: '',
  image: null,
  useCaret: false,
  placement: 'bottom',
  popoverTitle: null
};
export default DrawerButton;