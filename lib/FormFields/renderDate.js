function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* global FileReader */

/* eslint react/prop-types : 0 */
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import moment from 'moment';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Form, Col } from '../index';
import { useState } from 'react';
import sanitizeHtml from 'sanitize-html';
var isISOString = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/;
var dateFormatString = /([12]\d{3}-(0*[1-9]|1[0-2])-(0*[1-9]|[12]\d|3[01]))/;

var isValidDate = function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
};

var RenderDate = function RenderDate(_ref) {
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
      error = _ref$meta.error,
      data = _ref$meta.data,
      utcOffsetNumber = _ref.utcOffsetNumber,
      datePickerProps = _ref.datePickerProps,
      onChange = _ref.onChange,
      inline = _ref.inline,
      showErrors = _ref.showErrors;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      touched = _useState2[0],
      setTouched = _useState2[1];
  /**
   * If UI is with time, do timezone convertion. If not, use UTC all the time.
   */


  var utcOffset = datePickerProps.utcOffset ? datePickerProps.utcOffset : Number(utcOffsetNumber) / 100;
  var selectedValue = input.value ? moment(input.value).toDate() : '';

  var convertToISOString = function convertToISOString(e) {
    if (e !== null && isValidDate(new Date(e))) {
      input.onChange(e.toISOString());
    }
  };

  return React.createElement(Form.Row, {
    className: classNames(className, 'wfui-form-item', {
      'wfui-form-item-error': (touched || showErrors) && (error || globalError)
    }, {
      'wfui-form-item-warning': (touched || showErrors) && data && data.warning
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
    className: "wfui-form-field ".concat(descDisplay ? 'wfui-form-field-with-description' : 'wfui-form-field-no-description', " wfui-form-date ").concat((touched || showErrors) && (error || globalError) ? 'wfui-form-with-error' : '') // validationState={(touched || showErrors) && (error || globalError) ? 'error' : null}

  }, React.createElement(FormControl, {
    isInvalid: (touched || showErrors) && (error || globalError),
    isValid: (touched || showErrors) && data && data.warning,
    className: classNames('d-none', 'custom-form-control', {
      'is-valid-warning': (touched || showErrors) && data && data.warning
    })
  }), !disabled ? React.createElement("div", {
    className: "wfui-form-datepicker custom-form-control-wrapper"
  }, React.createElement(DatePicker, _extends({}, datePickerProps, {
    className: "form-control",
    utcOffset: utcOffset,
    selected: selectedValue,
    onChangeRaw: function onChangeRaw(e) {
      if (e.target.value !== null && isValidDate(new Date(e))) {
        input.onChange(e.target.value);
      }
    },
    showYearDropdown: true,
    showMonthDropdown: true,
    dropdownMode: "select",
    onSelect: convertToISOString,
    onChange: convertToISOString,
    onBlur: function onBlur(e) {
      setTouched(true); // This logic is needed when user manually type date string in UI and not exactly following the format 20XX-XX-XX (something like 2020-1-1 )

      if (!input.value.match(isISOString) && input.value.match(dateFormatString)) {
        var parsedDate = new Date(input.value);

        if (!isNaN(parsedDate)) {
          input.onChange(parsedDate.toISOString());
        }
      }
    },
    placeholderText: placeholder || 'Choose Date'
  })), datePickerProps.showTimeSelect && React.createElement("span", {
    className: "timezone"
  }, "".concat(timeZone, " ").concat(utcOffsetNumber))) : React.createElement("p", {
    className: "date-value"
  }, input.value ? new Date(input.value).toString() : ''), (touched || showErrors) && error && React.createElement(Form.Control.Feedback, {
    className: "wfui-form-error",
    type: "invalid"
  }, Array.isArray(error) ? error.map(function (item) {
    return React.createElement("div", null, item);
  }) : error), (touched || showErrors) && globalError && React.createElement(Form.Control.Feedback, {
    className: "wfui-form-error",
    type: "invalid"
  }, React.createElement("span", null, Array.isArray(globalError) ? globalError.join(', ') : globalError)), (touched || showErrors) && data && data.warning && React.createElement(Form.Control.Feedback, {
    className: "wfui-form-warning",
    type: "valid"
  }, Array.isArray(data.warning) ? data.warning.map(function (item) {
    return React.createElement("div", null, item);
  }) : data.warning), help && !preview && React.createElement(HelpBlock, {
    className: "wfui-form-help text-muted"
  }, React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: sanitizeHtml(help)
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

RenderDate.propTypes = {
  datePickerProps: PropTypes.object
};
RenderDate.defaultProps = {
  datePickerProps: {
    timeFormat: 'HH:mm',
    dateFormat: 'yyyy-MM-dd HH:mm',
    showTimeSelect: true
  },
  utcOffsetNumber: new Date().toString().match(/([-\+][0-9]+)\s/)[1],
  timeZone: new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1]
};
export default RenderDate;