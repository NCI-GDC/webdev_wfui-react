function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, FormGroup, ControlLabel, HelpBlock, Col } from '../index';

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
      inline = _ref.inline,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error,
      data = _ref$meta.data,
      _onChange = _ref.onChange;
  return React.createElement(Form.Row, {
    className: classNames(className, 'wfui-form-item wfui-form-singlecheckbox', {
      'wfui-form-item-error': touched && (error || globalError)
    }, {
      'wfui-form-item-warning': touched && data && data.warning
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
  }, React.createElement(ControlLabel, null, label)), React.createElement(FormGroup, {
    as: Col,
    xs: 12,
    lg: inline && label ? descDisplay && !preview ? 4 : 10 : descDisplay && !preview ? 6 : 12,
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-single-checkbox"),
    validationState: touched && (error || globalError) ? 'error' : null
  }, React.createElement(Form.Check, {
    type: "checkbox",
    isInvalid: touched && (error || globalError),
    isValid: touched && data && data.warning,
    className: classNames('wfui-form-checkbox-container', {
      active: input.checked,
      disabled: disabled,
      preview: preview,
      'is-valid-warning': touched && data && data.warning
    })
  }, React.createElement(Form.Check.Label, null, React.createElement(Form.Check.Input, _extends({
    type: "checkbox"
  }, input, {
    onChange: function onChange(e) {
      input.onChange(e);
      if (typeof _onChange === 'function') _onChange(e, input);
    },
    disabled: disabled
  })), React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: option
    }
  }), ' ', required && React.createElement("b", {
    className: "required"
  }, "*")), touched && error && React.createElement(Form.Control.Feedback, {
    className: "wfui-form-error",
    type: "invalid"
  }, Array.isArray(error) ? error.map(function (item) {
    return React.createElement("div", null, item);
  }) : error), touched && data && data.warning && React.createElement(Form.Control.Feedback, {
    className: "wfui-form-warning",
    type: "valid"
  }, Array.isArray(data.warning) ? data.warning.map(function (item) {
    return React.createElement("div", null, item);
  }) : data.warning), touched && globalError && React.createElement(Form.Control.Feedback, {
    className: "wfui-form-error",
    type: "invalid"
  }, React.createElement("span", null, Array.isArray(globalError) ? globalError.join(', ') : globalError))), help && !preview && React.createElement(HelpBlock, {
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

export default renderSingleCheckbox;