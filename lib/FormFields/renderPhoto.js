function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global FileReader */

/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Col, Button, FormControl, ControlLabel, HelpBlock } from '../index';

var renderPhoto =
/*#__PURE__*/
function (_React$Component) {
  _inherits(renderPhoto, _React$Component);

  function renderPhoto(props) {
    var _this;

    _classCallCheck(this, renderPhoto);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(renderPhoto).call(this));
    _this.state = {
      value: props.input.value
    };
    return _this;
  }

  _createClass(renderPhoto, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          input = _this$props.input,
          inline = _this$props.inline,
          label = _this$props.label,
          required = _this$props.required,
          help = _this$props.help,
          placeholder = _this$props.placeholder,
          type = _this$props.type,
          maxlength = _this$props.maxlength,
          onStateChange = _this$props.onStateChange,
          disabled = _this$props.disabled,
          preview = _this$props.preview,
          descDisplay = _this$props.descDisplay,
          fullWidth = _this$props.fullWidth,
          _this$props$meta = _this$props.meta,
          touched = _this$props$meta.touched,
          error = _this$props$meta.error;
      var value = this.state.value;
      return value ? React.createElement(Form.Row, {
        className: classNames(className, 'wfui-form-item', {
          'wfui-form-item-error': error
        }, {
          'wfui-form-disabled': disabled
        }, {
          'wfui-form-preview': preview
        }, {
          'wfui-form-item-full-width': fullWidth
        })
      }, label && React.createElement(Col, {
        xs: 12,
        lg: inline ? 2 : 12,
        className: "wfui-form-label"
      }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
        className: "required"
      }, " *"))), React.createElement(Col, {
        xs: 12,
        lg: inline && label ? descDisplay && !preview ? 4 : 10 : descDisplay && !preview ? 6 : 12,
        className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-photo file-chosen")
      }, React.createElement("p", {
        className: "image-preview"
      }, React.createElement("img", {
        style: {
          height: 100
        },
        src: value.src
      })), React.createElement("p", {
        className: "image-alt"
      }, React.createElement(FormControl, {
        value: value.title,
        placeholder: placeholder || placeholder === '' ? placeholder : label,
        type: type,
        maxLength: maxlength,
        onChange: function onChange(e) {
          var newValue = _extends({}, value, {
            title: e.target.value
          });

          _this2.setState({
            value: newValue
          });

          onStateChange(newValue, input);
          input.onChange(newValue);
        },
        disabled: disabled
      })), !disabled && React.createElement(Button, {
        variant: "primary",
        className: "btn-remove",
        onClick: function onClick() {
          input.onChange();
          onStateChange(undefined, input);

          _this2.setState({
            value: undefined
          });
        }
      }, "Remove Image")), descDisplay && !preview ? React.createElement(Col, {
        className: "wfui-form-description",
        xs: 12,
        lg: {
          span: 6,
          offset: 0
        }
      }, cloneElement(descDisplay)) : null) : React.createElement(Form.Row, {
        className: classNames(className, 'wfui-form-item')
      }, label && React.createElement(Col, {
        xs: 12,
        lg: inline ? 2 : 12,
        className: "wfui-form-label"
      }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
        className: "required"
      }, " *"))), React.createElement(Col, {
        xs: 12,
        lg: inline && label ? descDisplay && !preview ? 4 : 10 : descDisplay && !preview ? 6 : 12,
        className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-photo")
      }, React.createElement(Dropzone, _extends({}, input, {
        name: input.name,
        accept: "image/png,image/jpeg,image/pjpeg,image/gif",
        className: "btn btn-primary choose-file",
        onDrop: function onDrop(acceptedFiles) {
          var reader = new FileReader();
          reader.readAsDataURL(acceptedFiles[0]);

          reader.onloadend = function () {
            var newValue = _extends({}, value, {
              src: reader.result
            });

            _this2.setState({
              value: newValue
            });

            onStateChange(newValue);
            return input.onChange(newValue);
          };

          _this2.setState({
            hasFile: true
          });
        }
      }), "Choose File"), touched && error && React.createElement(HelpBlock, {
        className: "wfui-form-error"
      }, React.createElement("span", null, error)), help && !preview && React.createElement(HelpBlock, {
        className: "wfui-form-help text-muted"
      }, React.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: help
        }
      }))), descDisplay && !preview ? React.createElement(Col, {
        className: "wfui-form-description",
        xs: 12,
        lg: {
          span: 6,
          offset: 0
        }
      }, cloneElement(descDisplay)) : null);
    }
  }]);

  return renderPhoto;
}(React.Component);

renderPhoto.propTypes = {
  onStateChange: PropTypes.func,
  fullWidth: PropTypes.bool
};
renderPhoto.defaultProps = {
  onStateChange: function onStateChange(f) {
    return f;
  },
  fullWidth: false
};
export default renderPhoto;