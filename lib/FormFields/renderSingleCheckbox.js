function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, FormGroup, ControlLabel, HelpBlock, Checkbox } from '../index';

var renderSingleCheckbox = function renderSingleCheckbox(_ref) {
  var className = _ref.className,
      label = _ref.label,
      option = _ref.option,
      input = _ref.input,
      help = _ref.help,
      required = _ref.required,
      disabled = _ref.disabled,
      preview = _ref.preview,
      globalError = _ref.globalError,
      descDisplay = _ref.descDisplay,
      fullWidth = _ref.fullWidth,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error,
      _onChange = _ref.onChange;
  return React.createElement("div", {
    className: classNames(className, 'wfui-form-item wfui-form-singlecheckbox', {
      'wfui-form-item-error': touched && (error || globalError)
    }, {
      'wfui-form-disabled': disabled
    }, {
      'wfui-form-preview': preview
    }, {
      'wfui-form-item-full-width': fullWidth
    })
  }, label && React.createElement("div", {
    className: "wfui-form-label"
  }, React.createElement(ControlLabel, null, label)), React.createElement(FormGroup, {
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-single-checkbox"),
    validationState: touched && (error || globalError) ? 'error' : null
  }, React.createElement(Form.Check, {
    type: "checkbox",
    className: input.checked ? 'active' : ''
  }, React.createElement(Form.Check.Label, null, React.createElement(Form.Check.Input, _extends({
    type: "checkbox"
  }, input, {
    onChange: function onChange(e) {
      input.onChange(e);
      if (typeof _onChange === 'function') _onChange(e);
    },
    disabled: disabled
  })), React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: option
    }
  }), ' ', required && React.createElement("b", {
    className: "required"
  }, "*"))), touched && error && React.createElement(HelpBlock, {
    className: "wfui-form-error"
  }, React.createElement("span", null, error)), touched && globalError && React.createElement(HelpBlock, {
    className: "wfui-form-error"
  }, React.createElement("span", null, globalError)), help && !preview && React.createElement("div", {
    className: "wfui-form-help",
    dangerouslySetInnerHTML: {
      __html: help
    }
  })), descDisplay && !preview ? cloneElement(descDisplay) : '');
};

export default renderSingleCheckbox;