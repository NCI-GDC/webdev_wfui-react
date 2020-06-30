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

var SwitchButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SwitchButton, _React$Component);

  function SwitchButton(props) {
    var _this;

    _classCallCheck(this, SwitchButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SwitchButton).call(this, props));
    _this.state = {
      advanced: false
    };
    return _this;
  }

  _createClass(SwitchButton, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _onChange = _this$props.onChange,
          label = _this$props.label,
          id = _this$props.id,
          disabled = _this$props.disabled,
          name = _this$props.name;
      var advanced = this.state.advanced;
      return React.createElement("div", {
        className: "switch-container"
      }, label && label.length ? React.createElement("span", {
        className: "switch-title"
      }, label) : null, React.createElement("label", {
        htmlFor: id || 'switch',
        className: "switch-btn ".concat(disabled ? 'disabled' : '')
      }, React.createElement("input", {
        name: name,
        type: "checkbox",
        id: id || 'switch',
        className: "switch-input",
        value: advanced,
        disabled: disabled,
        onChange: function onChange() {
          _this2.setState({
            advanced: !advanced
          });

          _onChange(!advanced);
        }
      }), React.createElement("div", {
        className: "switch-slider round ".concat(disabled ? 'disabled' : '')
      }, React.createElement("span", {
        className: "on"
      }, "ON"), React.createElement("span", {
        className: "off"
      }, "OFF"))));
    }
  }]);

  return SwitchButton;
}(React.Component);

SwitchButton.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string
};
SwitchButton.defaultProps = {
  onChange: function onChange(f) {
    return f;
  },
  name: 'advance'
};
export default SwitchButton;