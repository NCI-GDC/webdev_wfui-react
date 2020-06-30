import React, { Component } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

var Icon = function Icon(props) {
  return React.createElement(FontAwesomeIcon, {
    className: props.className,
    icon: props.icon || props.name || props.glyph
  });
};

export default Icon;