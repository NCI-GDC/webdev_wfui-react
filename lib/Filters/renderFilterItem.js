function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var RenderTextFilter = function RenderTextFilter(_ref3) {
  var name = _ref3.name,
      category = _ref3.category,
      onHandleChange = _ref3.onHandleChange,
      placeholder = _ref3.placeholder;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      initialized = _useState2[0],
      setInitialized = _useState2[1];

  var _useState3 = useState(category && category[name] || ''),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  useEffect(function () {
    if (!initialized) {
      if (category && category[name]) {
        setInitialized(true);
        setValue(category && category[name] || '');
      }
    }
  }, [category, initialized, name, value]);

  var debouce = _.debounce(function (e) {
    onHandleChange(e);
  }, 150);

  var onChange = function onChange(e) {
    setValue(e.target.value);
    debouce({
      target: {
        value: e.target.value
      }
    });
  };

  return React.createElement("div", null, React.createElement(FormControl, {
    type: "text",
    name: name,
    id: name,
    value: value,
    onChange: onChange,
    placeholder: placeholder || ''
  }), value && React.createElement(Icon, {
    className: "input-clear",
    name: "times",
    bsSize: "xsmall",
    onClick: onChange
  }));
};

export var renderTextFilter = RenderTextFilter;