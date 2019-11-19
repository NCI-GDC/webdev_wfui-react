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
import { FormGroup, ControlLabel, HelpBlock } from '../index';

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
      if (typeof onChange === 'function') onChange(tags);
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
          _this$props2$meta = _this$props2.meta,
          touched = _this$props2$meta.touched,
          error = _this$props2$meta.error;
      var _this$state = this.state,
          suggestions = _this$state.suggestions,
          tags = _this$state.tags;
      return React.createElement("div", {
        className: classNames(className, 'wfui-form-item', {
          'wfui-form-item-error': touched && error
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
        className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-tags"),
        validationState: touched && error ? 'error' : null
      }, disabled ? React.createElement("div", null, input.value ? React.createElement("ul", null, input.value.map(function (tag, i) {
        return React.createElement("li", {
          key: i
        }, tag);
      })) : React.createElement("span", {
        className: "no-item"
      }, "( No Items )")) : React.createElement(TagsInput, {
        value: tags,
        onChange: this.handleChange
      }), touched && error && React.createElement(HelpBlock, {
        className: "wfui-form-error"
      }, React.createElement("span", null, error)), touched && globalError && React.createElement(HelpBlock, {
        className: "wfui-form-error"
      }, React.createElement("span", null, globalError)), help && !preview && React.createElement("div", {
        className: "wfui-form-help",
        dangerouslySetInnerHTML: {
          __html: help
        }
      })), descDisplay && !preview ? cloneElement(descDisplay) : '');
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