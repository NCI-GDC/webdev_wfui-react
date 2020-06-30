/* global window */
import React from 'react';
import PropTypes from 'prop-types';

var Autocomplete = function Autocomplete(_ref) {
  var autocomplete = _ref.autocomplete,
      onClickTerm = _ref.onClickTerm,
      textNoResult = _ref.textNoResult;
  return React.createElement("div", {
    className: "navbar-form"
  }, React.createElement("div", {
    className: "form-group"
  }, React.createElement("ul", {
    id: "ui-autocomplete",
    className: "autocomplete-ps ui-menu ui-widget ui-widget-content ui-autocomplete ui-front"
  }, (!autocomplete || autocomplete.length === 0) && React.createElement("li", {
    className: "ui-menu-item"
  }, textNoResult), autocomplete && autocomplete.map(function (item, idx) {
    return React.createElement("li", {
      key: idx,
      className: "ui-menu-item"
    }, React.createElement("div", {
      className: "ui-menu-item-wrapper"
    }, React.createElement("a", {
      onClick: onClickTerm,
      "data-keyword": item.keyword
    }, "".concat(item.keyword, " (").concat(item.count, ")"))));
  }))));
};

Autocomplete.propTypes = {
  autocomplete: PropTypes.arrayOf(PropTypes.shape({
    keyword: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  })),
  onClickTerm: PropTypes.func,
  textNoResult: PropTypes.string
};
Autocomplete.defaultProps = {
  onClickTerm: function onClickTerm(f) {
    return f;
  },
  intl: function intl(f) {
    return f;
  },
  textNoResult: 'No results available'
};
export default Autocomplete;