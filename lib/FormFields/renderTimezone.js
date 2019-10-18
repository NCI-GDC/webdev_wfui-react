function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* global FileReader */

/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import TimezonePicker from 'react-timezone';
import classNames from 'classnames';
import { FormGroup, ControlLabel, HelpBlock } from '../index';

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
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error;
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
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-time-zone"),
    validationState: touched && error ? 'error' : null
  }, !disabled ? React.createElement(TimezonePicker, _extends({
    className: "wfui-form-timezone"
  }, input, {
    onChange: function onChange(timezone) {
      return input.onChange(timezone);
    },
    inputProps: {
      placeholder: placeholder
    }
  })) : React.createElement("p", {
    className: "timezone-value"
  }, input.value), touched && error && React.createElement(HelpBlock, {
    className: "wfui-form-error"
  }, React.createElement("span", null, error))), descDisplay && !preview ? cloneElement(descDisplay) : '');
};

export default renderTimezone;