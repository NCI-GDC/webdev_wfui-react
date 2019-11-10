import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, FormGroup, ControlLabel, HelpBlock, Col } from '../index';

var renderRadios = function renderRadios(_ref) {
  var className = _ref.className,
      label = _ref.label,
      options = _ref.options,
      input = _ref.input,
      help = _ref.help,
      required = _ref.required,
      disabled = _ref.disabled,
      preview = _ref.preview,
      globalError = _ref.globalError,
      descDisplay = _ref.descDisplay,
      fullWidth = _ref.fullWidth,
      booleanValue = _ref.booleanValue,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error,
      inline = _ref.inline;
  return React.createElement(Form.Row, {
    className: classNames(className, 'wfui-form-item', {
      'wfui-form-item-error': touched && (error || globalError)
    }, {
      'wfui-form-disabled': disabled
    }, {
      'wfui-form-preview': preview
    }, {
      'wfui-form-item-full-width': fullWidth
    })
  }, label && React.createElement(Col, {
    xs: 12,
    md: inline ? 2 : 12,
    className: "wfui-form-label"
  }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
    className: "required"
  }, " *"))), React.createElement(FormGroup, {
    as: Col,
    xs: 12,
    md: inline && label ? descDisplay && !preview ? 4 : 10 : descDisplay && !preview ? 6 : 12,
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-radios"),
    validationState: touched && (error || globalError) ? 'error' : null
  }, React.createElement("div", {
    className: "wfui-form-radio-group-container"
  }, options.map(function (option, i) {
    var _key = typeof option === 'string' || typeof option === 'number' ? option : option.key;

    var _option = typeof option === 'string' || typeof option === 'number' ? option : option.value;

    var checked = input.value == _key;

    if (typeof input.value === 'boolean') {
      checked = _key === (input.value ? 'true' : 'false');
    }

    return React.createElement(Form.Check, {
      type: "radio",
      className: "wfui-form-radio-container".concat(checked ? ' active' : '').concat(disabled ? ' disabled' : '').concat(preview ? ' preview' : ''),
      key: i
    }, React.createElement(Form.Check.Label, null, React.createElement(Form.Check.Input, {
      type: "radio",
      name: input.name,
      value: _key,
      checked: checked,
      disabled: disabled,
      onChange: function onChange(e) {
        if (booleanValue && (e.target.value === 'true' || e.target.value === 'false')) {
          input.onChange(e.target.value === 'true');
        } else {
          input.onChange(e.target.value);
        }
      }
    }), _option));
  })), touched && error && React.createElement(HelpBlock, {
    className: "wfui-form-error"
  }, React.createElement("span", null, error)), touched && globalError && React.createElement(HelpBlock, {
    className: "wfui-form-error"
  }, React.createElement("span", null, globalError)), help && !preview && React.createElement(HelpBlock, {
    className: "wfui-form-help text-muted"
  }, React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: help
    }
  }))), descDisplay && !preview ? React.createElement(Col, {
    className: "wfui-form-description",
    xs: 12,
    md: {
      span: 6,
      offset: 0
    }
  }, cloneElement(descDisplay)) : null);
};

export default renderRadios;