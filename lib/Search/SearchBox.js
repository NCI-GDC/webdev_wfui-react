import React from 'react';
import PropTypes from 'prop-types';

var SearchBox = function SearchBox(_ref) {
  var value = _ref.value,
      onInputChange = _ref.onInputChange,
      onSearchSubmit = _ref.onSearchSubmit,
      onReset = _ref.onReset,
      textSubmit = _ref.textSubmit,
      placeholder = _ref.placeholder;
  return React.createElement("form", {
    id: "cbw-search-jobs",
    className: "form-inline webform-search"
  }, React.createElement("div", {
    className: "form-group"
  }, React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "search-jobs-keyword",
    placeholder: placeholder,
    value: value,
    onChange: onInputChange,
    autoComplete: "off"
  })), value && React.createElement("a", {
    className: "search-reset",
    onClick: onReset
  }, React.createElement("span", {
    className: "sr-only"
  }, "Reset")), " ", React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    onClick: onSearchSubmit
  }, textSubmit));
};

SearchBox.propTypes = {
  value: PropTypes.string,
  onInputChange: PropTypes.func,
  onSearchSubmit: PropTypes.func,
  onReset: PropTypes.func,
  textSubmit: PropTypes.string,
  placeholder: PropTypes.string
};
SearchBox.defaultProps = {
  value: '',
  onInputChange: function onInputChange(f) {
    return f;
  },
  onSearchSubmit: function onSearchSubmit(f) {
    return f;
  },
  OnReset: function OnReset(f) {
    return f;
  },
  intl: function intl(f) {
    return f;
  },
  textSubmit: 'Search',
  placeholder: ''
};
export default SearchBox;