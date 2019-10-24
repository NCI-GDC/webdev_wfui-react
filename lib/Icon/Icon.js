import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

var Icon = function Icon(props) {
  return React.createElement(FontAwesomeIcon, {
    icon: props.icon || props.name || props.glyph
  });
};

export default Icon;