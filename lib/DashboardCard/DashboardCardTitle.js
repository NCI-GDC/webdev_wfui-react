import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

var DashboardCardTitle = function DashboardCardTitle(_ref) {
  var role = _ref.role,
      className = _ref.className,
      title = _ref.title,
      image = _ref.image,
      imageAlt = _ref.imageAlt,
      left = _ref.left;
  return React.createElement("div", {
    role: role,
    className: classNames(className, 'form-box-title')
  }, React.createElement("div", {
    className: "form-box-title-box"
  }, image && React.createElement("img", {
    src: image,
    className: "form-box-title-image img-responsive",
    alt: imageAlt || 'title image'
  }), React.createElement("h2", {
    className: "form-box-title-text ".concat(left ? 'text-left' : 'text-center')
  }, title)));
};

DashboardCardTitle.propTypes = {
  title: PropTypes.node.isRequired,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  className: PropTypes.string,
  role: PropTypes.string,
  left: PropTypes.bool
};
DashboardCardTitle.defaultProps = {
  role: 'title',
  left: false
};
export default DashboardCardTitle;