function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { Field } from 'react-final-form';
import React from 'react';

var identity = function identity(value) {
  return value;
};
/* This wraps react-final-form's <Field/> component.
 * The identity function ensures form values never get set to null,
 * but rather, empty strings.
 *
 * See https://github.com/final-form/react-final-form/issues/130
 */


export default (function (props) {
  return React.createElement(Field, _extends({
    parse: identity
  }, props));
});