function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* global FileReader */

/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import moment from 'moment';
import { FormGroup, ControlLabel, HelpBlock, Form, Col } from '../index';

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
    lg: inline ? 2 : 12,
    className: "wfui-form-label"
  }, React.createElement(ControlLabel, null, label, required && React.createElement("b", {
    className: "required"
  }, " *"))), React.createElement(FormGroup, {
    as: Col,
    xs: 12,
    lg: inline && label ? descDisplay && !preview ? 4 : 10 : descDisplay && !preview ? 6 : 12,
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-date ").concat(touched && (error || globalError) ? 'wfui-form-with-error' : ''),
    validationState: touched && (error || globalError) ? 'error' : null
  }, !disabled ? React.createElement("div", {
    className: "wfui-form-datepicker"
  }, React.createElement(DatePicker, _extends({}, datePickerProps, {
    className: "form-control",
    utcOffset: datePickerProps.utcOffset ? datePickerProps.utcOffset : Number(utcOffsetNumber) / 100,
    selected: input.value ? moment(input.value).toDate() : '',
    onChange: input.onChange,
    onBlur: input.onBlur,
    placeholderText: placeholder || 'Choose Date'
  })), React.createElement("span", {
    className: "timezone"
  }, "".concat(timeZone, " ").concat(utcOffsetNumber))) : React.createElement("p", {
    className: "date-value"
  }, input.value ? new Date(input.value).toString() : ''), touched && error && React.createElement(Form.Control.Feedback, {
    className: "wfui-form-error",
    type: "invalid"
  }, React.createElement("span", null, error)), touched && globalError && React.createElement(Form.Control.Feedback, {
    className: "wfui-form-error",
    type: "invalid"
  }, React.createElement("span", null, globalError)), help && !preview && React.createElement(HelpBlock, {
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