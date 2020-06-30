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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import BaseDropdownToggle from 'react-overlays/DropdownToggle';
import React from 'react';
import Button from 'react-bootstrap/cjs/Button';
import { createBootstrapComponent } from 'react-bootstrap/cjs/ThemeProvider';
import { Popper, Reference } from 'react-popper';

var wrapRef = function wrapRef(props) {
  var ref = props.ref;

  props.ref = ref.__wrapped || (ref.__wrapped = function (r) {
    return ref(findDOMNode(r));
  });

  return props;
};

var DropdownToggle =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DropdownToggle, _React$Component);

  function DropdownToggle() {
    _classCallCheck(this, DropdownToggle);

    return _possibleConstructorReturn(this, _getPrototypeOf(DropdownToggle).apply(this, arguments));
  }

  _createClass(DropdownToggle, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          bsPrefix = _this$props.bsPrefix,
          split = _this$props.split,
          className = _this$props.className,
          children = _this$props.children,
          childBsPrefix = _this$props.childBsPrefix,
          Component = _this$props.as,
          props = _objectWithoutProperties(_this$props, ["bsPrefix", "split", "className", "children", "childBsPrefix", "as"]);

      if (childBsPrefix !== undefined) {
        props.bsPrefix = childBsPrefix;
      } // This intentionally forwards size and variant (if set) to the
      // underlying component, to allow it to render size and style variants.


      return React.createElement(BaseDropdownToggle, null, function (_ref) {
        var toggle = _ref.toggle,
            toggleProps = _ref.props;
        return React.createElement(Reference, null, function (_ref2) {
          var ref = _ref2.ref;
          return React.createElement(Component, _extends({
            onClick: toggle,
            className: classNames(className, bsPrefix, split && "".concat(bsPrefix, "-split"))
          }, wrapRef(toggleProps), {
            ref: ref
          }, props), children);
        });
      });
    }
  }]);

  return DropdownToggle;
}(React.Component); // Needs to be a class FTM, because it needs to accept a ref that can be used with findDOMNode


_defineProperty(DropdownToggle, "propTypes", {
  /**
   * @default 'dropdown-toggle'
   */
  bsPrefix: PropTypes.string,

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y(PropTypes.any),
  split: PropTypes.bool,
  as: PropTypes.elementType,

  /**
   * to passthrough to the underlying button or whatever from DropdownButton
   * @private
   */
  childBsPrefix: PropTypes.string
});

_defineProperty(DropdownToggle, "defaultProps", {
  as: Button
});

export default createBootstrapComponent(DropdownToggle, 'dropdown-toggle');