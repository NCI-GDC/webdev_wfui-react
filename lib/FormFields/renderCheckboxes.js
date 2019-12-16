function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormControl, Form, FormGroup, ControlLabel, HelpBlock, Col } from '../index';

var renderCheckboxes = function renderCheckboxes(_ref) {
  var className = _ref.className,
      label = _ref.label,
      options = _ref.options,
      input = _ref.input,
      help = _ref.help,
      required = _ref.required,
      disabled = _ref.disabled,
      preview = _ref.preview,
      globalError = _ref.globalError,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error,
      data = _ref$meta.data,
      descDisplay = _ref.descDisplay,
      fullWidth = _ref.fullWidth,
      _onChange = _ref.onChange,
      inline = _ref.inline;
  return React.createElement(Form.Row, {
    className: classNames(className, 'wfui-form-item', {
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
  }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
    className: "required"
  }, " *"))), React.createElement(FormGroup, {
    as: Col,
    xs: 12,
    lg: inline && label ? descDisplay && !preview ? 4 : 10 : descDisplay && !preview ? 6 : 12,
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-checkboxes"),
    validationState: touched && (error || globalError) ? 'error' : null
  }, React.createElement(FormControl, {
    isInvalid: touched && (error || globalError),
    isValid: touched && data && data.warning,
    className: classNames('d-none', 'custom-form-control', {
      'is-valid-warning': touched && data && data.warning
    })
  }), React.createElement("div", {
    className: "wfui-form-checkbox-group-container custom-form-control-wrapper"
  }, options.map(function (option, i) {
    var _key = typeof option === 'string' ? option : option.key;

    var _option = typeof option === 'string' ? option : option.value;

    return React.createElement(Form.Check, {
      type: "checkbox",
      key: i,
      className: "wfui-form-checkbox-container".concat(input.value && input.value.includes(_key) ? ' active' : '').concat(disabled ? ' disabled' : '').concat(preview ? ' preview' : '')
    }, React.createElement(Form.Check.Label, null, React.createElement(Form.Check.Input, {
      type: "checkbox",
      name: input.name,
      value: _key,
      checked: input.value && input.value.includes(_key),
      disabled: disabled,
      onChange: function onChange(e) {
        var newValue = _toConsumableArray(input.value);

        if (e.target.checked) {
          newValue.push(_key);
        } else {
          newValue.splice(newValue.indexOf(_key), 1);
        }

        input.onBlur();
        input.onChange(newValue);
        if (typeof _onChange === 'function') _onChange(newValue, input);
      },
      isInvalid: touched && (error || globalError)
    }), React.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: _option
      }
    }), option.required && React.createElement("b", {
      className: "required"
    }, " *")));
  })), touched && error && React.createElement(Form.Control.Feedback, {
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
    lg: {
      span: 6,
      offset: 0
    }
  }, cloneElement(descDisplay)) : null);
};

export default renderCheckboxes;