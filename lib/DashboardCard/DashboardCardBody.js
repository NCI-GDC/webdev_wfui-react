import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

var DashboardCardBody = function DashboardCardBody(_ref) {
  var role = _ref.role,
      className = _ref.className,
      children = _ref.children,
      isList = _ref.isList,
      items = _ref.items,
      itemDisplay = _ref.itemDisplay;
  return isList ? React.createElement("div", {
    role: role,
    className: classNames(className, 'form-box-body')
  }, React.createElement("ul", {
    className: "form-box-body-list"
  }, Array.isArray(items) && itemDisplay && items.map(function (item, key) {
    return React.createElement("li", {
      key: key
    }, cloneElement(itemDisplay, {
      item: item
    }));
  }))) : React.createElement("div", {
    role: role,
    className: classNames(className, 'form-box-body')
  }, children);
};

DashboardCardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  role: PropTypes.string,
  isList: PropTypes.bool,
  items: PropTypes.array,
  itemDisplay: PropTypes.element
};
DashboardCardBody.defaultProps = {
  role: 'body',
  isList: false
};
export default DashboardCardBody;