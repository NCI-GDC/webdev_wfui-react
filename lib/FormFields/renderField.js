function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* global FileReader */

/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Row, Col } from '../index';
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
      type = _ref.type,
      maxlength = _ref.maxlength,
      max = _ref.max,
      min = _ref.min,
      onHandleChange = _ref.onHandleChange,
      required = _ref.required,
      disabled = _ref.disabled,
      preview = _ref.preview,
      globalError = _ref.globalError,
      descDisplay = _ref.descDisplay,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error,
      fullWidth = _ref.fullWidth;
  return React.createElement(Row, {
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
  }, label && React.createElement(Col, {
    xs: 12,
    sm: inline ? 2 : 12,
    className: "wfui-form-label"
  }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
    className: "required"
  }, " *"))), React.createElement(FormGroup, {
    as: Col,
    xs: 12,
    sm: inline ? 10 : 12,
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-input"),
    validationState: touched && (error || globalError) ? 'error' : null
  }, React.createElement(FormControl, _extends({}, input, {
    placeholder: placeholder || placeholder === '' ? placeholder : label,
    type: type,
    maxLength: maxlength,
    min: min,
    max: max,
    disabled: disabled,
    onChange: function onChange(e) {
      input.onChange(e);
      if (onHandleChange) onHandleChange(e);
    }
  })), postfix && React.createElement("div", {
    className: "wfui-form-postfix"
  }, postfix), React.createElement(FormControl.Feedback, null), touched && error && React.createElement(HelpBlock, {
    className: "wfui-form-error"
  }, React.createElement("span", null, error)), touched && globalError && React.createElement(HelpBlock, {
    className: "wfui-form-error"
  }, React.createElement("span", null, globalError)), help && !preview && React.createElement("div", {
    className: "wfui-form-help",
    dangerouslySetInnerHTML: {
      __html: help
    }
  })), descDisplay && !preview ? React.createElement(Col, {
    xs: 12,
    sm: {
      span: inline ? 10 : 12,
      offset: inline ? 2 : 0
    }
  }, cloneElement(descDisplay)) : '');
};

export default renderField;