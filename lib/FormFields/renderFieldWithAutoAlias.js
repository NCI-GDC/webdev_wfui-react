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
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { Field } from 'redux-form';
import { FormFields, FormGroup, FormControl, ControlLabel, HelpBlock } from '../index';
import renderSingleCheckbox from './renderSingleCheckbox';
/**
 * Reusable field component.
 */

var renderFieldWithAutoAlias =
/*#__PURE__*/
function (_React$Component) {
  _inherits(renderFieldWithAutoAlias, _React$Component);

  function renderFieldWithAutoAlias() {
    _classCallCheck(this, renderFieldWithAutoAlias);

    return _possibleConstructorReturn(this, _getPrototypeOf(renderFieldWithAutoAlias).apply(this, arguments));
  }

  _createClass(renderFieldWithAutoAlias, [{
    key: "renderAutoAlias",
    value: function renderAutoAlias() {
      var _this$props = this.props,
          input = _this$props.input,
          onHandleAliasChecked = _this$props.onHandleAliasChecked,
          autoAliasText = _this$props.autoAliasText;
      return React.createElement(Field, {
        name: "".concat(input.name, ".alias"),
        type: "checkbox",
        component: renderSingleCheckbox,
        option: autoAliasText,
        onChange: onHandleAliasChecked,
        placeholder: ""
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          inline = _this$props2.inline,
          input = _this$props2.input,
          label = _this$props2.label,
          postfix = _this$props2.postfix,
          help = _this$props2.help,
          placeholder = _this$props2.placeholder,
          type = _this$props2.type,
          maxlength = _this$props2.maxlength,
          max = _this$props2.max,
          min = _this$props2.min,
          onHandleChange = _this$props2.onHandleChange,
          required = _this$props2.required,
          disabled = _this$props2.disabled,
          preview = _this$props2.preview,
          globalError = _this$props2.globalError,
          descDisplay = _this$props2.descDisplay,
          _this$props2$meta = _this$props2.meta,
          touched = _this$props2$meta.touched,
          error = _this$props2$meta.error,
          fullWidth = _this$props2.fullWidth;
      return React.createElement("div", {
        className: classNames(className, 'wfui-form-item', {
          'wfui-form-item-error': touched && (error || globalError)
        }, {
          'wfui-form-inline': inline
        }, {
          'wfui-form-disabled': disabled
        }, {
          'wfui-form-preview': preview
        }, {
          answered: input.value
        }, {
          'wfui-form-item-full-width': fullWidth
        })
      }, label && React.createElement("div", {
        className: "wfui-form-label wfui-form-autoalias-label"
      }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
        className: "required"
      }, " *"))), React.createElement(FormGroup, {
        className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-input"),
        validationState: touched && (error || globalError) ? 'error' : null
      }, React.createElement(FormControl, _extends({}, input, {
        value: input.value && input.value.value,
        name: "".concat(input.name, ".value"),
        placeholder: placeholder || placeholder === '' ? placeholder : label,
        type: type,
        maxLength: maxlength,
        min: min,
        max: max,
        disabled: disabled || input.value && input.value.alias,
        onBlur: function onBlur(e) {
          input.onBlur(Object.assign({}, {
            alias: input.value.alias,
            value: input.value.value
          }, {
            value: e.target.value
          }));
        },
        onChange: function onChange(e) {
          input.onChange(Object.assign({}, {
            alias: input.value.alias,
            value: input.value.value
          }, {
            value: e.target.value
          }));
          if (onHandleChange) onHandleChange(e);
        }
      })), postfix && React.createElement("div", {
        className: "wfui-form-postfix"
      }, postfix), !disabled && this.renderAutoAlias(), React.createElement(FormControl.Feedback, null), touched && error && React.createElement(HelpBlock, {
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

  return renderFieldWithAutoAlias;
}(React.Component);

renderFieldWithAutoAlias.propTypes = {
  autoAliasText: PropTypes.string
};
renderFieldWithAutoAlias.defaultProps = {
  autoAliasText: 'Automatic alias'
};
export default injectIntl(renderFieldWithAutoAlias);