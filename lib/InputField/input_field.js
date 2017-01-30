"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Input field
 */
var InputField = function (_Component) {
  _inherits(InputField, _Component);

  function InputField() {
    _classCallCheck(this, InputField);

    var _this = _possibleConstructorReturn(this, (InputField.__proto__ || Object.getPrototypeOf(InputField)).call(this));

    _this.state = { value: "" };
    return _this;
  }

  _createClass(InputField, [{
    key: "onHandleBlur",
    value: function onHandleBlur(e) {
      var _props = this.props,
          onBlur = _props.onBlur,
          onHandleChange = _props.onHandleChange,
          preview = _props.preview,
          type = _props.type,
          min = _props.min,
          max = _props.max;

      var val = e.target.value;
      // if(type == "number"){
      //   val = (typeof min != "undefined") ? Math.max(min, Number(val)) : Number(val);
      //   val = (typeof max != "undefined") ? Math.min(max, Number(val)) : Number(val);
      // }
      this.setState({ value: val });
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

      this.setState({ value: val });
      var _props2 = this.props,
          onHandleChange = _props2.onHandleChange,
          preview = _props2.preview;

      if (onHandleChange && !preview) {
        onHandleChange(e, val);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({ value: this.props.value });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.setState({ value: props.value });
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props,
          label = _props3.label,
          type = _props3.type,
          defaultValue = _props3.defaultValue,
          placeholder = _props3.placeholder,
          postfix = _props3.postfix,
          prefix = _props3.prefix,
          name = _props3.name,
          className = _props3.className,
          errors = _props3.errors,
          description = _props3.description,
          preview = _props3.preview,
          hideField = _props3.hideField,
          maxLength = _props3.maxLength,
          onBlur = _props3.onBlur,
          min = _props3.min,
          max = _props3.max;
      var value = this.state.value;


      if (prefix) {
        var prefixField = _react2.default.createElement(
          "span",
          { className: "wfui-input-field__prefix" },
          prefix
        );
      }
      if (postfix) {
        var postfixField = _react2.default.createElement(
          "span",
          { className: "wfui-input-field__postfix" },
          postfix
        );
      }
      //check error flag
      var errorClassName = '';
      if (errors) {
        errorClassName += ' wfui-input-field__input--theme-error';
      }
      var inputFieldElement = hideField ? "" : _react2.default.createElement(
        "span",
        null,
        prefixField,
        _react2.default.createElement("input", { className: "wfui-input-field__input" + errorClassName, type: type, defaultValue: defaultValue, value: value, placeholder: placeholder, name: name, onChange: this.onHandleChange.bind(this), onClick: this.onHandleClick.bind(this), onBlur: this.onHandleBlur.bind(this), disabled: preview, maxLength: maxLength, min: min, max: max }),
        postfixField
      );
      return _react2.default.createElement(
        "div",
        { className: "wfui-input-field" },
        description,
        _react2.default.createElement(
          "div",
          { className: "wfui-input-field--" + type + ' ' + className },
          _react2.default.createElement("label", { className: "wfui-input-field__label", dangerouslySetInnerHTML: { __html: label.replace(/\n/g, "<br/>") } }),
          inputFieldElement
        )
      );
    }
  }]);

  return InputField;
}(_react.Component);

/**
 * Property types
 */


InputField.propTypes = {
  label: _react2.default.PropTypes.string,
  type: _react2.default.PropTypes.oneOf(['text', 'number', 'email']),
  name: _react2.default.PropTypes.string,
  placeholder: _react2.default.PropTypes.string,
  defaultValue: _react2.default.PropTypes.string,
  postfix: _react2.default.PropTypes.string,
  prefix: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  errors: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool]),
  stopPropagation: _react2.default.PropTypes.bool
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

exports.default = InputField;