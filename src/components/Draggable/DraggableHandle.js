import React from 'react';
import PropTypes from 'prop-types';
/**
 * Allow to specify draggable area.
 */
const DraggableHandle = props => <div>{props.children}</div>;
DraggableHandle.propTypes = {
    children: PropTypes.node,
};

export default DraggableHandle;
