function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* eslint react/prop-types : 0 */
import _ from 'lodash';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as ReactCodeMirror from 'react-codemirror2';
import { Form, FormGroup, ControlLabel, HelpBlock, FormControl } from '../index';
import sanitizeHtml from 'sanitize-html';
var CodeMirror = ReactCodeMirror.Controlled;

var renderCodeMirror =
/*#__PURE__*/
function (_React$Component) {
  _inherits(renderCodeMirror, _React$Component);

  function renderCodeMirror(props) {
    var _this;

    _classCallCheck(this, renderCodeMirror);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(renderCodeMirror).call(this));
    _this.onHandleChange = _this.onHandleChange.bind(_assertThisInitialized(_this));
    var initValue = props.input.value || props.defaultValue;
    _this.state = {
      bodyText: initValue
    };
    props.input.onChange(initValue);
    return _this;
  }

  _createClass(renderCodeMirror, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var input = this.props.input;
      var bodyText = this.state.bodyText;

      if (nextProps.input.value && !_.isEqual(nextProps.input.value, bodyText)) {
        this.setState({
          bodyText: nextProps.input.value
        });
      }
    }
  }, {
    key: "onHandleChange",
    value: function onHandleChange(editor, data, value) {
      var input = this.props.input;
      this.setState({
        bodyText: value
      });
      input.onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          label = _this$props.label,
          input = _this$props.input,
          required = _this$props.required,
          disabled = _this$props.disabled,
          preview = _this$props.preview,
          descDisplay = _this$props.descDisplay,
          fullWidth = _this$props.fullWidth,
          globalError = _this$props.globalError,
          _this$props$meta = _this$props.meta,
          touched = _this$props$meta.touched,
          error = _this$props$meta.error,
          data = _this$props$meta.data,
          onCursor = _this$props.onCursor,
          help = _this$props.help,
          defaultValue = _this$props.defaultValue,
          showErrors = _this$props.showErrors;
      var bodyText = this.state.bodyText;
      return React.createElement("div", {
        className: classNames(className, 'wfui-form-item', {
          'wfui-form-item-error': (touched || showErrors) && error
        }, {
          'wfui-form-item-warning': (touched || showErrors) && data && data.warning
        }, {
          'wfui-form-disabled': disabled
        }, {
          'wfui-form-preview': preview
        }, {
          'wfui-form-item-full-width': fullWidth
        })
      }, label && React.createElement("div", {
        className: "wfui-form-label"
      }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
        className: "required"
      }, " *"))), React.createElement(FormGroup, {
        className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-date") // validationState={(touched || showErrors) && error ? 'error' : null}

      }, React.createElement(FormControl, {
        isInvalid: (this.touched || showErrors) && (error || globalError),
        isValid: (this.touched || showErrors) && data && data.warning,
        className: classNames('d-none', 'custom-form-control', {
          'is-valid-warning': (this.touched || showErrors) && data && data.warning
        })
      }), !disabled ? React.createElement("div", {
        className: "wfui-quill"
      }, React.createElement(CodeMirror, {
        value: bodyText,
        options: {
          lineWrapping: true,
          lineNumbers: true
        },
        onBlur: function onBlur(e) {
          _this2.touched = true;
        },
        onBeforeChange: this.onHandleChange,
        onCursor: onCursor
      })) : React.createElement("p", {
        className: "wfui-value"
      }, bodyText), (touched || showErrors) && error && React.createElement(Form.Control.Feedback, {
        className: "wfui-form-error",
        type: "invalid"
      }, Array.isArray(error) ? error.map(function (item) {
        return React.createElement("div", null, item);
      }) : error), (touched || showErrors) && globalError && React.createElement(Form.Control.Feedback, {
        className: "wfui-form-error",
        type: "invalid"
      }, React.createElement("span", null, Array.isArray(globalError) ? globalError.join(', ') : globalError)), (touched || showErrors) && data && data.warning && React.createElement(Form.Control.Feedback, {
        className: "wfui-form-warning",
        type: "valid"
      }, Array.isArray(data.warning) ? data.warning.map(function (item) {
        return React.createElement("div", null, item);
      }) : data.warning), help && !preview && React.createElement(HelpBlock, {
        className: "wfui-form-help"
      }, React.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: sanitizeHtml(help)
        }
      }))), descDisplay && !preview ? cloneElement(descDisplay) : '');
    }
  }]);

  return renderCodeMirror;
}(React.Component);

renderCodeMirror.propTypes = {
  onCursor: PropTypes.func
};
renderCodeMirror.defaultProps = {
  onCursor: function onCursor(f) {
    return f;
  }
};
export default renderCodeMirror;