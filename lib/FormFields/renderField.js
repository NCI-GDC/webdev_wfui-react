function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* global FileReader */

/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Form, Col } from '../index';
/**
 * Reusable field component.
 */

var renderField = function renderField(_ref) {
  var className = _ref.className,
      inline = _ref.inline,
      input = _ref.input,
      label = _ref.label,
      postfix = _ref.postfix,
      help = _ref.help,
      placeholder = _ref.placeholder,
      maxlength = _ref.maxlength,
      max = _ref.max,
      min = _ref.min,
      onHandleChange = _ref.onHandleChange,
      _onChange = _ref.onChange,
      required = _ref.required,
      disabled = _ref.disabled,
      preview = _ref.preview,
      globalError = _ref.globalError,
      descDisplay = _ref.descDisplay,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error,
      data = _ref$meta.data,
      fullWidth = _ref.fullWidth;
  return React.createElement(Form.Row, {
    className: classNames(className, 'wfui-form-item', {
      'wfui-form-item-error': touched && (error || globalError)
    }, {
      'wfui-form-item-warning': touched && data && data.warning
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
    }, {
      'wfui-form-with-description': descDisplay
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
    lg: inline ? descDisplay && !preview ? 4 : 10 : descDisplay && !preview ? 6 : 12,
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-input"),
    validationState: touched && (error || globalError) ? 'error' : null
  }, React.createElement(FormControl, _extends({}, input, {
    placeholder: placeholder || placeholder === '' ? placeholder : label,
    maxLength: maxlength,
    min: min,
    max: max,
    disabled: disabled,
    onChange: function onChange(e) {
      input.onChange(e);
      if (_onChange) _onChange(e, input);
      if (onHandleChange) onHandleChange(e, input);
    },
    isInvalid: touched && (error || globalError),
    isValid: touched && data && data.warning,
    className: classNames({
      'is-valid-warning': touched && data && data.warning
    })
  })), postfix && React.createElement("div", {
    className: "wfui-form-postfix"
  }, postfix), React.createElement(FormControl.Feedback, null), touched && error && React.createElement(Form.Control.Feedback, {
    className: "wfui-form-error",
    type: "invalid"
  }, Array.isArray(error) ? error.map(function (item) {
    return React.createElement("div", null, item);
  }) : error), touched && globalError && React.createElement(Form.Control.Feedback, {
    className: "wfui-form-error",
    type: "invalid"
  }, React.createElement("span", null, Array.isArray(globalError) ? globalError.join(', ') : globalError)), touched && data && data.warning && React.createElement(Form.Control.Feedback, {
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
    lg: 6
  }, cloneElement(descDisplay)) : null);
};

export default renderField;