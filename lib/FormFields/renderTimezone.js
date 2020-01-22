function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* global FileReader */

/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import TimezonePicker from 'react-timezone';
import classNames from 'classnames';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Form, Col } from '../index';

var renderTimezone = function renderTimezone(_ref) {
  var className = _ref.className,
      label = _ref.label,
      placeholder = _ref.placeholder,
      input = _ref.input,
      help = _ref.help,
      required = _ref.required,
      disabled = _ref.disabled,
      preview = _ref.preview,
      descDisplay = _ref.descDisplay,
      fullWidth = _ref.fullWidth,
      _onChange = _ref.onChange,
      globalError = _ref.globalError,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error,
      data = _ref$meta.data,
      inline = _ref.inline,
      showErrors = _ref.showErrors;
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
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-time-zone"),
    validationState: (touched || showErrors) && error ? 'error' : null
  }, React.createElement(FormControl, {
    isInvalid: (touched || showErrors) && (error || globalError),
    isValid: (touched || showErrors) && data && data.warning,
    className: classNames('d-none', 'custom-form-control', {
      'is-valid-warning': (touched || showErrors) && data && data.warning
    })
  }), React.createElement("div", {
    className: "custom-form-control-wrapper"
  }, !disabled ? React.createElement(TimezonePicker, _extends({
    className: "wfui-form-timezone"
  }, input, {
    onChange: function onChange(timezone) {
      input.onChange(timezone);
      if (typeof _onChange === 'function') _onChange(timezone, input);
    },
    inputProps: {
      placeholder: placeholder
    }
  })) : React.createElement("p", {
    className: "timezone-value"
  }, input.value)), (touched || showErrors) && error && React.createElement(Form.Control.Feedback, {
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
};

export default renderTimezone;