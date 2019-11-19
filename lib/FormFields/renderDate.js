function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* global FileReader */

/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import moment from 'moment';
import { FormGroup, ControlLabel, HelpBlock } from '../index';

var renderDate = function renderDate(_ref) {
  var className = _ref.className,
      label = _ref.label,
      placeholder = _ref.placeholder,
      input = _ref.input,
      help = _ref.help,
      required = _ref.required,
      disabled = _ref.disabled,
      preview = _ref.preview,
      descDisplay = _ref.descDisplay,
      globalError = _ref.globalError,
      fullWidth = _ref.fullWidth,
      timeZone = _ref.timeZone,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error,
      utcOffsetNumber = _ref.utcOffsetNumber,
      datePickerProps = _ref.datePickerProps,
      _onChange = _ref.onChange;
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
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-date"),
    validationState: touched && (error || globalError) ? 'error' : null
  }, !disabled ? React.createElement("div", {
    className: "wfui-form-datepicker"
  }, React.createElement(DatePicker, _extends({}, datePickerProps, {
    utcOffset: datePickerProps.utcOffset ? datePickerProps.utcOffset : Number(utcOffsetNumber) / 100,
    selected: input.value ? moment(input.value).toDate() : '',
    onChange: function onChange(e) {
      input.onChange(e);
      if (typeof _onChange === 'function') _onChange(e);
    },
    onBlur: input.onBlur,
    placeholderText: placeholder
  })), React.createElement("span", {
    className: "timezone"
  }, timeZone, ' ', "(", utcOffsetNumber, ")")) : React.createElement("p", {
    className: "date-value"
  }, input.value ? new Date(input.value).toString() : ''), touched && error && React.createElement(HelpBlock, {
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

renderDate.propTypes = {
  datePickerProps: PropTypes.object
};
renderDate.defaultProps = {
  datePickerProps: {
    timeFormat: 'HH:mm',
    dateFormat: 'yyyy-MM-dd HH:mm',
    showTimeSelect: true
  },
  utcOffsetNumber: new Date().toString().match(/([-\+][0-9]+)\s/)[1],
  timeZone: new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1]
};
export default renderDate;