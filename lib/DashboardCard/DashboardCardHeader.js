import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

var DashboardCardHeader = function DashboardCardHeader(_ref) {
  var role = _ref.role,
      className = _ref.className,
      children = _ref.children;
  return React.createElement("div", {
    role: role,
    className: classNames(className, 'form-box-header')
  }, React.createElement("div", {
    className: "form-box-header-box"
  }, children));
};

DashboardCardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  role: PropTypes.string
};
DashboardCardHeader.defaultProps = {
  role: 'header',
  hover: false
};
export default DashboardCardHeader;