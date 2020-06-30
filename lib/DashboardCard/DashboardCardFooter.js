import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

var DashboardCardFooter = function DashboardCardFooter(_ref) {
  var role = _ref.role,
      className = _ref.className,
      children = _ref.children;
  if (!children) return null;
  var elems = [];

  if (Array.isArray(children)) {
    children.forEach(function (item) {
      if (Array.isArray(item)) {
        item.forEach(function (i) {
          return elems.push(i);
        });
      } else if (item) {
        elems.push(item);
      }
    });
  } else if (children) {
    elems.push(children);
  }

  return React.createElement("div", {
    role: role,
    className: classNames(className, 'form-box-footer')
  }, React.createElement("ul", {
    className: "form-box-links"
  }, elems && elems.map(function (elem, key) {
    return React.createElement("li", {
      key: key
    }, cloneElement(elem));
  })));
};

DashboardCardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  role: PropTypes.string
};
DashboardCardFooter.defaultProps = {
  role: 'footer',
  hover: false
};
export default DashboardCardFooter;