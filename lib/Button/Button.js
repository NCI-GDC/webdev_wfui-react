function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import Icon from '../Icon/Icon';

var CustomButton = function CustomButton(props) {
  var icon = props.icon,
      iconPosition = props.iconPosition,
      className = props.className,
      children = props.children,
      plus = props.plus;

  var newProps = _extends({}, props);

  delete newProps.children;
  delete newProps.icon;
  delete newProps.iconPosition;
  delete newProps.plus;

  if (plus) {
    return React.createElement(Button, _extends({}, newProps, {
      className: classNames(className, "btn-plus btn-plus-pre btn-icon btn-icon-pre")
    }), React.createElement(Icon, {
      icon: "plus-circle",
      className: "btn-icon-container"
    }), children);
  }

  if (icon && icon.length) {
    if (iconPosition === 'post') {
      return React.createElement(Button, _extends({}, newProps, {
        className: classNames(className, "btn-".concat(icon, " btn-").concat(icon, "-post btn-icon btn-icon-post"))
      }), children, React.createElement(Icon, {
        icon: props.icon,
        className: "btn-icon-container"
      }));
    }

    return React.createElement(Button, _extends({}, newProps, {
      className: classNames(className, "btn-".concat(icon, " btn-").concat(icon, "-pre btn-icon btn-icon-pre"))
    }), React.createElement(Icon, {
      icon: props.icon,
      className: "btn-icon-container"
    }), children);
  }

  return React.createElement(Button, props);
};

CustomButton.prototype = {
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  plus: PropTypes.bool
};
CustomButton.defaultProps = {
  iconPosition: 'pre',
  plus: false
};
export default CustomButton;