function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* global FileReader */

/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Col, FormGroup, ControlLabel, HelpBlock, ReactCodeMirror, Utils, FormControl } from '../index';
import { connect } from 'react-redux';
import S from 'string';
import * as actionCreators from '../../actions';
var CodeMirror = ReactCodeMirror.Controlled;

var renderCodeMirror =
/*#__PURE__*/
function (_React$Component) {
  _inherits(renderCodeMirror, _React$Component);

  function renderCodeMirror(props) {
    var _this;

    _classCallCheck(this, renderCodeMirror);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(renderCodeMirror).call(this));
    _this.touched = false;
    _this.state = {
      pandocParseFailed: false,
      bodyText: props.input.value
    };
    _this.onHandleChange = _this.onHandleChange.bind(_assertThisInitialized(_this));
    _this.stripHTMLTimer = undefined;
    return _this;
  }

  _createClass(renderCodeMirror, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
          parseWithPandoc = _this$props.parseWithPandoc,
          input = _this$props.input,
          pandocParseFailed = _this$props.pandocParseFailed,
          isIE = _this$props.isIE,
          enableMarkdownParser = _this$props.enableMarkdownParser;
      this.setState({
        bodyText: input.value
      });
    }
  }, {
    key: "onHandleChange",
    value: function onHandleChange(editor, data, value) {
      var _this2 = this;

      var input = this.props.input;
      this.setState({
        bodyText: value
      });
      this.touched = true;

      if (this.stripHTMLTimer) {
        clearTimeout(this.stripHTMLTimer);
      } // Strip HTML Tag


      this.stripHTMLTimer = setTimeout(function () {
        var _value = S(value).stripTags('object', 'script', 'style', 'embed', 'object', 'iframe', 'canvas').s;
        input.onChange(_value);

        _this2.setState({
          bodyText: _value
        });
      }, 1000); // Update redux form state 1s after when typing is stopped.
      // Did this due to the performance issue on CodeMirror x Redux conbination.

      if (this.setReduxFormTimer) clearTimeout(this.setReduxFormTimer);
      this.setReduxFormTimer = setTimeout(function () {
        input.onChange(value);
      }, 10);
    }
  }, {
    key: "renderTextLimit",
    value: function renderTextLimit() {
      var _this$props2 = this.props,
          textLimit = _this$props2.textLimit,
          wordLimit = _this$props2.wordLimit,
          input = _this$props2.input,
          preview = _this$props2.preview;

      if (wordLimit && !preview) {
        var words = input && input.value ? input.value.replace(/\n/g, ' ').split(' ').filter(function (f) {
          return f;
        }).length : 0;
        return React.createElement("span", {
          className: "wfui-form-char-count"
        }, "".concat(words, " / ").concat(wordLimit, " words"));
      }

      if (textLimit && !preview) {
        return React.createElement("span", {
          className: "wfui-form-char-count"
        }, "".concat(input && input.value ? input.value.length : 0, " / ").concat(textLimit, " characters"));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          className = _this$props3.className,
          label = _this$props3.label,
          input = _this$props3.input,
          required = _this$props3.required,
          disabled = _this$props3.disabled,
          preview = _this$props3.preview,
          descDisplay = _this$props3.descDisplay,
          fullWidth = _this$props3.fullWidth,
          _this$props3$meta = _this$props3.meta,
          touched = _this$props3$meta.touched,
          error = _this$props3$meta.error,
          data = _this$props3$meta.data,
          help = _this$props3.help,
          globalError = _this$props3.globalError,
          textLimitLabel = _this$props3.textLimitLabel,
          showErrors = _this$props3.showErrors;
      var bodyText = this.state.bodyText;
      return React.createElement(Form.Row, {
        className: classNames(className, 'wfui-form-item', {
          'wfui-form-item-error': (this.touched || showErrors) && (error || globalError)
        }, {
          'wfui-form-disabled': disabled
        }, {
          'wfui-form-preview': preview
        }, {
          'wfui-form-item-full-width': fullWidth
        }, {
          'wfui-form-with-description': descDisplay
        })
      }, label && React.createElement(Col, {
        xs: 12,
        className: "wfui-form-label"
      }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
        className: "required"
      }, " *"), textLimitLabel ? React.createElement("span", {
        className: "text-muted"
      }, textLimitLabel) : null)), React.createElement(FormGroup, {
        as: Col,
        xs: 12,
        lg: descDisplay && !preview ? 6 : 12,
        className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-textarea") // validationState={
        //     (this.touched || showErrors) && (error || globalError)
        //         ? 'error'
        //         : null
        // }

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
          _this3.touched = true;
        },
        onBeforeChange: this.onHandleChange
      })) : React.createElement("div", {
        className: "wfui-form-textarea-preview-value"
      }, input.value), (this.touched || showErrors) && error && React.createElement(Form.Control.Feedback, {
        className: "wfui-form-error",
        type: "invalid"
      }, React.createElement("span", null, error), this.renderTextLimit()), (this.touched || showErrors) && globalError && React.createElement(Form.Control.Feedback, {
        className: "wfui-form-error",
        type: "invalid"
      }, React.createElement("span", null, globalError), this.renderTextLimit()), !((this.touched || showErrors) && (error || globalError)) && this.renderTextLimit(), help && !preview && React.createElement(HelpBlock, {
        className: "wfui-form-help text-muted"
      }, React.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: help
        }
      }))), descDisplay && !preview ? React.createElement(Col, {
        className: "wfui-form-description",
        xs: 12,
        lg: 6
      }, cloneElement(descDisplay)) : null);
    }
  }]);

  return renderCodeMirror;
}(React.Component);

renderCodeMirror.propTypes = {
  enableMarkdownParser: PropTypes.bool
};
renderCodeMirror.defaultProps = {
  enableMarkdownParser: true
};
export default connect(function (state, props) {
  var pandocParseFailed = props.pandocParseFailed,
      isIE = props.isIE;
  var fetchPandoc;

  if (pandocParseFailed || isIE) {
    fetchPandoc = {
      status: 'success'
    };
  } else {
    fetchPandoc = Utils.fetchSelector('parseHTMLToMD')(state) || {};
  }

  return {
    fetchPandoc: fetchPandoc
  };
}, actionCreators)(renderCodeMirror);