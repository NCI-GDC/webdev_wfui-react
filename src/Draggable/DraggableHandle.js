import React from 'react';
/**
 * Allow to specify draggable area.
 */
const DraggableHandle = props => <div>{ props.children }</div>;
DraggableHandle.propTypes = {
    children: React.PropTypes.node,
};

export default DraggableHandle;
