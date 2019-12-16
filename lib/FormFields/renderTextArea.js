function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* global FileReader */

/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, ControlLabel, HelpBlock, Form, Col, FormControl } from '../index';

var renderTextArea = function renderTextArea(_ref) {
  var className = _ref.className,
      input = _ref.input,
      label = _ref.label,
      help = _ref.help,
      placeholder = _ref.placeholder,
      onHandleChange = _ref.onHandleChange,
      required = _ref.required,
      disabled = _ref.disabled,
      preview = _ref.preview,
      globalError = _ref.globalError,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error,
      data = _ref$meta.data,
      rows = _ref.rows,
      readOnly = _ref.readOnly,
      descDisplay = _ref.descDisplay,
      fullWidth = _ref.fullWidth,
      textLimit = _ref.textLimit,
      textLimitLabel = _ref.textLimitLabel,
      _onChange = _ref.onChange,
      inline = _ref.inline;
  return preview ? React.createElement(Form.Row, {
    className: classNames(className, 'wfui-form-item', {
      'wfui-form-item-error': touched && (error || globalError)
    }, {
      'wfui-form-item-warning': touched && data.warning
    }, {
      'wfui-form-disabled': disabled
    }, {
      'wfui-form-preview': preview
    }, {
      answered: input.value
    }, {
      'wfui-form-item-full-width': fullWidth
    })
  }, label && React.createElement(Col, {
    xs: 12,
    lg: inline ? 2 : 12,
    className: "wfui-form-label"
  }, React.createElement(ControlLabel, null, label, textLimitLabel ? React.createElement("span", {
    className: "text-muted"
  }, textLimitLabel) : null, required && React.createElement("b", {
    className: "required"
  }, " *"))), React.createElement(FormGroup, {
    as: Col,
    xs: 12,
    lg: inline ? 10 : 12,
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-textarea")
  }, React.createElement("div", {
    className: "wfui-form-textarea-preview-value"
  }, input.value))) : React.createElement(Form.Row, {
    className: classNames(className, 'wfui-form-item', {
      'wfui-form-item-error': touched && (error || globalError)
    }, {
      'wfui-form-disabled': disabled
    }, {
      'wfui-form-preview': preview
    }, {
      answered: input.value
    }, {
      'wfui-form-item-full-width': fullWidth
    })
  }, label && React.createElement(Col, {
    xs: 12,
    lg: inline ? 2 : 12,
    className: "wfui-form-label"
  }, React.createElement(ControlLabel, null, label, textLimitLabel ? React.createElement("span", {
    className: "text-muted"
  }, textLimitLabel) : null, required && React.createElement("b", {
    className: "required"
  }, " *"))), React.createElement(FormGroup, {
    as: Col,
    xs: 12,
    lg: inline ? descDisplay ? 4 : 10 : descDisplay ? 6 : 12,
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-textarea"),
    validationState: touched && (error || globalError) ? 'error' : null
  }, React.createElement(FormControl, _extends({}, input, {
    placeholder: placeholder || placeholder === '' ? placeholder : label,
    disabled: readOnly ? false : disabled,
    readOnly: readOnly,
    onChange: function onChange(e) {
      input.onChange(e);
      if (_onChange) _onChange(e, input);
      if (onHandleChange) onHandleChange(e, input);
    },
    as: "textarea",
    rows: rows || (disabled || preview ? 0 : 5),
    isInvalid: touched && (error || globalError),
    isValid: touched && data.warning,
    className: classNames({
      'is-valid-warning': touched && data.warning
    })
  })), touched && error && React.createElement(Form.Control.Feedback, {
    className: "wfui-form-error",
    type: "invalid"
  }, Array.isArray(error) ? error.map(function (item) {
    return React.createElement("div", null, item);
  }) : error, textLimit && !preview ? React.createElement("span", {
    className: "wfui-form-char-count"
  }, "".concat(input && input.value ? input.value.length : 0, " / ").concat(textLimit, " characters")) : null), touched && globalError && React.createElement(Form.Control.Feedback, {
    className: "wfui-form-error",
    type: "invalid"
  }, React.createElement("span", null, Array.isArray(globalError) ? globalError.join(', ') : globalError), textLimit && !preview ? React.createElement("span", {
    className: "wfui-form-char-count"
  }, "".concat(input && input.value ? input.value.length : 0, " / ").concat(textLimit, " characters")) : null), !(touched && (error || globalError)) && textLimit && !preview ? React.createElement("span", {
    className: "wfui-form-char-count text-muted"
  }, "".concat(input && input.value ? input.value.length : 0, " / ").concat(textLimit, " characters")) : null, touched && data.warning && React.createElement(Form.Control.Feedback, {
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
};

export default renderTextArea;