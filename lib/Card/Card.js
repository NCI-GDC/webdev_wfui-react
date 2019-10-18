function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CardBody from './CardBody';
import CardHover from './CardHover';
var BODY_ROLE = CardBody.defaultProps.role;
var HOVER_ROLE = CardHover.defaultProps.role;

var Card =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card(props) {
    var _this;

    _classCallCheck(this, Card);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Card).call(this, props));
    _this.state = {
      hover: false
    };
    return _this;
  }

  _createClass(Card, [{
    key: "renderChild",
    value: function renderChild(child, key) {
      var hover = this.state.hover;
      return cloneElement(child, {
        hover: hover,
        key: key
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          cardStyle = _this$props.cardStyle;
      return React.createElement("div", {
        className: classNames(className, 'wfui-card wfui-card-container'),
        onMouseOver: function onMouseOver() {
          return _this2.setState({
            hover: true
          });
        },
        onMouseLeave: function onMouseLeave() {
          return _this2.setState({
            hover: false
          });
        },
        style: cardStyle || {}
      }, children && (Array.isArray(children) && children.map(function (child, key) {
        switch (child.props.role) {
          case BODY_ROLE:
          case HOVER_ROLE:
            return _this2.renderChild(child, key);

          default:
            return child;
        }
      }) || this.renderChild(children, 0)));
    }
  }]);

  return Card;
}(React.Component);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cardStyle: PropTypes.object
};
Card.Body = CardBody;
Card.Hover = CardHover;
export default Card;