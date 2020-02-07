/* eslint react/prop-types : 0 */
import React from 'react';
import { FormControl, Icon } from '../index';
/**
 * Reusable field component.
 */

export var renderSelectFilter = function renderSelectFilter(_ref) {
  var name = _ref.name,
      category = _ref.category,
      onHandleChange = _ref.onHandleChange,
      items = _ref.items,
      capitalize = _ref.capitalize;
  return React.createElement(FormControl, {
    name: name,
    id: name,
    as: "select",
    onChange: onHandleChange,
    value: category && category[name] || '',
    selected: category && category[name] || ''
  }, items.map(function (item, idx) {
    return React.createElement("option", {
      key: idx,
      value: idx === 0 ? item.value || '' : item.value || item,
      className: capitalize ? 'text-capitalize' : ''
    }, item.label || item);
  }));
};
export var renderDateFilter = function renderDateFilter(_ref2) {
  var name = _ref2.name,
      category = _ref2.category,
      onHandleChange = _ref2.onHandleChange;
  return React.createElement(FormControl, {
    type: "date",
    name: name,
    id: name,
    value: category && category[name] || '',
    onChange: onHandleChange
  });
};
export var renderTextFilter = function renderTextFilter(_ref3) {
  var name = _ref3.name,
      category = _ref3.category,
      onHandleChange = _ref3.onHandleChange,
      placeholder = _ref3.placeholder;
  var value = category && category[name] || '';
  return React.createElement("div", null, React.createElement(FormControl, {
    type: "text",
    name: name,
    id: name,
    value: value,
    onChange: onHandleChange,
    placeholder: placeholder || ''
  }), value && React.createElement(Icon, {
    className: "input-clear",
    name: "times",
    bsSize: "xsmall",
    onClick: onHandleChange
  }));
};