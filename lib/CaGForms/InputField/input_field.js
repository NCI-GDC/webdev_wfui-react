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
/**
 * Input field
 */

var InputField =
/*#__PURE__*/
function (_Component) {
  _inherits(InputField, _Component);

  function InputField() {
    var _this;

    _classCallCheck(this, InputField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputField).call(this));
    _this.state = {
      value: ''
    };
    return _this;
  }

  _createClass(InputField, [{
    key: "onHandleBlur",
    value: function onHandleBlur(e) {
      var _this$props = this.props,
          onBlur = _this$props.onBlur,
          onHandleChange = _this$props.onHandleChange,
          preview = _this$props.preview,
          type = _this$props.type,
          min = _this$props.min,
          max = _this$props.max;
      var val = e.target.value; // if(type == "number"){
      //   val = (typeof min != "undefined") ? Math.max(min, Number(val)) : Number(val);
      //   val = (typeof max != "undefined") ? Math.min(max, Number(val)) : Number(val);
      // }

      this.setState({
        value: val
      });

      if (onHandleChange && !preview) {
        onHandleChange(e, val);
      }

      if (onBlur) {
        onBlur(e, val);
      }
    }
  }, {
    key: "onHandleFocus",
    value: function onHandleFocus(e) {
      var onHandleFocus = this.props.onHandleFocus;

      if (onHandleFocus) {
        onHandleFocus(e);
      }
    }
  }, {
    key: "onHandleClick",
    value: function onHandleClick(e) {
      var stopPropagation = this.props.stopPropagation;
      if (stopPropagation) e.stopPropagation();
    }
  }, {
    key: "onHandleChange",
    value: function onHandleChange(e) {
      var val = e.target.value;
      this.setState({
        value: val
      });
      var _this$props2 = this.props,
          onHandleChange = _this$props2.onHandleChange,
          preview = _this$props2.preview;

      if (onHandleChange && !preview) {
        onHandleChange(e, val);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        value: this.props.value
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.setState({
        value: props.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          label = _this$props3.label,
          type = _this$props3.type,
          defaultValue = _this$props3.defaultValue,
          placeholder = _this$props3.placeholder,
          postfix = _this$props3.postfix,
          prefix = _this$props3.prefix,
          name = _this$props3.name,
          className = _this$props3.className,
          errors = _this$props3.errors,
          description = _this$props3.description,
          preview = _this$props3.preview,
          hideField = _this$props3.hideField,
          maxLength = _this$props3.maxLength,
          onBlur = _this$props3.onBlur,
          min = _this$props3.min,
          max = _this$props3.max;
      var value = this.state.value;

      if (prefix) {
        var prefixField = React.createElement("span", {
          className: "wfui-input-field__prefix"
        }, prefix);
      }

      if (postfix) {
        var postfixField = React.createElement("span", {
          className: "wfui-input-field__postfix"
        }, postfix);
      } // check error flag


      var errorClassName = '';

      if (errors) {
        errorClassName += ' wfui-input-field__input--theme-error';
      }

      var inputFieldElement = hideField ? '' : React.createElement("span", null, prefixField, React.createElement("input", {
        className: "wfui-input-field__input".concat(errorClassName),
        type: type,
        defaultValue: defaultValue,
        value: value,
        placeholder: placeholder,
        name: name,
        onChange: this.onHandleChange.bind(this),
        onClick: this.onHandleClick.bind(this),
        onBlur: this.onHandleBlur.bind(this),
        disabled: preview,
        maxLength: maxLength,
        min: min,
        max: max
      }), postfixField);
      return React.createElement("div", {
        className: "wfui-input-field"
      }, description, React.createElement("div", {
        className: "wfui-input-field--".concat(type, " ").concat(className)
      }, React.createElement("label", {
        className: "wfui-input-field__label",
        dangerouslySetInnerHTML: {
          __html: label.replace(/\n/g, '<br/>')
        }
      }), inputFieldElement));
    }
  }]);

  return InputField;
}(Component);
/**
 * Property types
 */


InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'email']),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  postfix: PropTypes.string,
  prefix: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  stopPropagation: PropTypes.bool
};
InputField.defaultProps = {
  label: '',
  type: 'text',
  name: '',
  placeholder: '',
  defaultValue: '',
  postfix: '',
  prefix: '',
  className: '',
  errors: '',
  stopPropagation: false
};
export default InputField;