function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import { Field } from './Field';

var Fields = function Fields(_ref) {
  var names = _ref.names,
      subscription = _ref.subscription,
      _ref$fieldsState = _ref.fieldsState,
      fieldsState = _ref$fieldsState === void 0 ? {} : _ref$fieldsState,
      children = _ref.children,
      originalRender = _ref.originalRender;

  if (!names.length) {
    return (originalRender || children)(fieldsState);
  }

  var _names = _toArray(names),
      name = _names[0],
      rest = _names.slice(1);

  return React.createElement(Field, {
    name: name,
    subscription: subscription
  }, function (fieldState) {
    return React.createElement(Fields, {
      names: rest,
      subscription: subscription,
      originalRender: originalRender || children,
      fieldsState: _extends({}, fieldsState, _defineProperty({}, name, fieldState))
    });
  });
};

export default Fields;