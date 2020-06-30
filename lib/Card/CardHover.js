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
import classNames from 'classnames';

var CardHover =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CardHover, _React$Component);

  function CardHover() {
    _classCallCheck(this, CardHover);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardHover).apply(this, arguments));
  }

  _createClass(CardHover, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          hover = _this$props.hover,
          className = _this$props.className,
          children = _this$props.children,
          role = _this$props.role,
          animation = _this$props.animation,
          middle = _this$props.middle,
          hoverOpacity = _this$props.hoverOpacity,
          backgroundColor = _this$props.backgroundColor;
      var style = {};

      if (hover) {
        if (hoverOpacity && typeof hoverOpacity === 'number') style.opacity = hoverOpacity;
        if (backgroundColor && typeof backgroundColor === 'string') style.backgroundColor = backgroundColor;
      }

      return React.createElement("div", {
        role: role,
        className: classNames(className, 'wfui-card-hover', "card-".concat(animation), {
          active: hover
        }),
        style: style
      }, middle ? React.createElement("div", {
        className: "middle"
      }, children) : React.createElement("div", null, children));
    }
  }]);

  return CardHover;
}(React.Component);

CardHover.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  role: PropTypes.string,
  hover: PropTypes.bool,
  animation: PropTypes.string,
  hoverOpacity: PropTypes.number,
  backgroundColor: PropTypes.string,
  middle: PropTypes.bool
};
CardHover.defaultProps = {
  role: 'hover',
  hover: false,
  animation: 'none'
};
export default CardHover;