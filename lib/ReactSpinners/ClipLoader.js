function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n                  ", ";\n                  ", "\n              "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n             {\n                background: transparent !important;\n                width: ", ";\n                height: ", ";\n                border-radius: 100%;\n                border: 2px solid;\n                border-color: ", ";\n                border-bottom-color: transparent;\n                display: inline-block;\n                animation: ", " 0.75s 0s infinite linear;\n                animation-fill-mode: both;\n            }\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            0% {transform: rotate(0deg) scale(1)} \n            50% {transform: rotate(180deg) scale(0.8)}\n            100% {transform: rotate(360deg) scale(1)}\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import createEmotion from 'create-emotion';

var Loader =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Loader, _React$Component);

  function Loader(props) {
    var _this;

    _classCallCheck(this, Loader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Loader).call(this));
    _this.emotion = createEmotion(props.context);
    var keyframes = _this.emotion.keyframes;
    _this.clip = keyframes(_templateObject());
    return _this;
  }

  _createClass(Loader, [{
    key: "style",
    value: function style() {
      var _this$props = this.props,
          size = _this$props.size,
          sizeUnit = _this$props.sizeUnit,
          color = _this$props.color,
          className = _this$props.className;
      var css = this.emotion.css;
      var style = css(_templateObject2(), "".concat(size).concat(sizeUnit), "".concat(size).concat(sizeUnit), color, this.clip);
      return className ? css(_templateObject3(), style, className) : style;
    }
  }, {
    key: "render",
    value: function render() {
      var loading = this.props.loading;
      return loading ? React.createElement("div", {
        className: this.style()
      }) : null;
    }
  }]);

  return Loader;
}(React.Component);

Loader.propTypes = {
  loading: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
  sizeUnit: PropTypes.string,
  className: PropTypes.string
};
Loader.defaultProps = {
  loading: true,
  color: '#9B9B9B',
  size: 35,
  sizeUnit: 'px',
  className: ''
};
var Component = onlyUpdateForKeys(['loading', 'color', 'size', 'sizeUnit', 'className'])(Loader);
Component.defaultProps = Loader.defaultProps;
export default Component;