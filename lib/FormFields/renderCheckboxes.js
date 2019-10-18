function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, FormGroup, ControlLabel, HelpBlock, Checkbox } from '../index';

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
      descDisplay = _ref.descDisplay,
      fullWidth = _ref.fullWidth;
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
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-checkboxes"),
    validationState: touched && (error || globalError) ? 'error' : null
  }, options.map(function (option, i) {
    var _key = typeof option === 'string' ? option : option.key;

    var _option = typeof option === 'string' ? option : option.value;

    return React.createElement(Form.Check, {
      type: "checkbox",
      key: i,
      name: input.name,
      value: _key,
      disabled: disabled,
      checked: input.value && input.value.includes(_key),
      className: input.value && input.value.includes(_key) ? 'active' : '',
      onChange: function onChange(e) {
        var newValue = _toConsumableArray(input.value);

        if (e.target.checked) {
          newValue.push(_key);
        } else {
          newValue.splice(newValue.indexOf(_key), 1);
        }

        input.onBlur();
        return input.onChange(newValue);
      }
    }, React.createElement(Form.Check.Label, null, React.createElement(Form.Check.Input, {
      type: "checkbox"
    }), React.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: _option
      }
    }), option.required && React.createElement("b", {
      className: "required"
    }, " *")));
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

export default renderCheckboxes;