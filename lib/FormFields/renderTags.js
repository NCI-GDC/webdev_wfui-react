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
import TagsInput from 'react-tagsinput';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Form, Col } from '../index';

var renderTags =
/*#__PURE__*/
function (_React$Component) {
  _inherits(renderTags, _React$Component);

  function renderTags(props) {
    var _this;

    _classCallCheck(this, renderTags);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(renderTags).call(this, props));
    _this.state = {
      tags: props.input.value || [],
      suggestions: props.suggestions || []
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(renderTags, [{
    key: "handleChange",
    value: function handleChange(tags) {
      var _this$props = this.props,
          input = _this$props.input,
          onChange = _this$props.onChange;
      this.setState({
        tags: tags
      });
      input.onChange(tags);
      if (typeof onChange === 'function') onChange(tags, input);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          label = _this$props2.label,
          input = _this$props2.input,
          placeholder = _this$props2.placeholder,
          help = _this$props2.help,
          globalError = _this$props2.globalError,
          required = _this$props2.required,
          withContext = _this$props2.withContext,
          disabled = _this$props2.disabled,
          preview = _this$props2.preview,
          descDisplay = _this$props2.descDisplay,
          fullWidth = _this$props2.fullWidth,
          inline = _this$props2.inline,
          _this$props2$meta = _this$props2.meta,
          touched = _this$props2$meta.touched,
          error = _this$props2$meta.error,
          data = _this$props2$meta.data,
          showErrors = _this$props2.showErrors;
      var _this$state = this.state,
          suggestions = _this$state.suggestions,
          tags = _this$state.tags;
      return React.createElement(Form.Row, {
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
      }, label && React.createElement(Col, {
        xs: 12,
        lg: inline ? 2 : 12,
        className: "wfui-form-label"
      }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
        className: "required"
      }, " *"))), React.createElement(FormGroup, {
        as: Col,
        xs: 12,
        lg: inline && label ? descDisplay && !preview ? 4 : 10 : descDisplay && !preview ? 6 : 12,
        className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-tags") // validationState={(touched || showErrors) && error ? 'error' : null}

      }, React.createElement(FormControl, {
        isInvalid: (touched || showErrors) && (error || globalError),
        isValid: (touched || showErrors) && data && data.warning,
        className: classNames('d-none', {
          'is-valid-warning': (touched || showErrors) && data && data.warning
        })
      }), React.createElement("div", {
        className: "custom-form-control-wrapper"
      }, disabled ? React.createElement("div", null, input.value ? React.createElement("ul", null, input.value.map(function (tag, i) {
        return React.createElement("li", {
          key: i
        }, tag);
      })) : React.createElement("span", {
        className: "no-item"
      }, "( No Items )")) : React.createElement(TagsInput, {
        value: tags,
        onChange: this.handleChange
      })), (touched || showErrors) && error && React.createElement(Form.Control.Feedback, {
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

  return renderTags;
}(React.Component);

renderTags.propTypes = {
  placeholder: PropTypes.string,
  withContext: PropTypes.bool,
  descDisplay: PropTypes.element,
  fullWidth: PropTypes.bool
};
renderTags.defaultProps = {
  placeholder: 'Add keyword',
  fullWidth: false
};
export default renderTags;