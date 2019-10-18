import React from 'react';
import PropTypes from 'prop-types';
/**
 * Allow to specify draggable area.
 */

var DraggableHandle = function DraggableHandle(props) {
  return React.createElement("div", null, props.children);
};

DraggableHandle.propTypes = {
  children: PropTypes.node
};
export default DraggableHandle;