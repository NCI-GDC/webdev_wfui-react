import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, FormGroup, ControlLabel, HelpBlock, Radio } from '../index';

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
      error = _ref$meta.error;
  return React.createElement("div", {
    className: classNames(className, 'wfui-form-item', {
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
  }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
    className: "required"
  }, " *"))), React.createElement(FormGroup, {
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-radios"),
    validationState: touched && (error || globalError) ? 'error' : null
  }, options.map(function (option, i) {
    var _key = typeof option === 'string' || typeof option === 'number' ? option : option.key;

    var _option = typeof option === 'string' || typeof option === 'number' ? option : option.value;

    var checked = input.value == _key;

    if (typeof input.value === 'boolean') {
      checked = _key === (input.value ? 'true' : 'false');
    }

    return React.createElement(Form.Check, {
      type: "radio",
      className: checked ? 'active' : '',
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
};

export default renderRadios;