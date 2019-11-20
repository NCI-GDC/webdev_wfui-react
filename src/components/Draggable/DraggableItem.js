import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, DropTarget, DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import ItemTypes from './ItemTypes';
import DraggableHandle from './DraggableHandle';

const style = {
    list: {
        border: '1px dotted #aaa',
        marginBottom: 10,
        padding: 10,
    },
    container: {
        border: '1px dotted #aaa',
        listStyleType: 'none',
        padding: 20,
    },
};

const itemSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        };
    },
    endDrag(props) {
        props.endDrag();
    },
};

const itemTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const { id } = monitor.getItem();
        const hoverIndex = props.index;

        if (!monitor.isOver({ shallow: true })) return;

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(
            component
        ).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get Pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Draggin downwards
        if (props.type === 'stack') {
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
        }

        // Perform the action
        props.moveItem(dragIndex, hoverIndex);

        // Replace original index to hover index.
        monitor.getItem().index = hoverIndex;
    },
};

class DraggableItem extends React.Component {
    constructor() {
        super();
        this.state = { hasHandle: false };
    }

    componentWillReceiveProps(props) {
        const { children } = props;
        let hasHandle = false;
        if (children.length) {
            children.forEach((child, i) => {
                if (child.type == DraggableHandle) {
                    hasHandle = true;
                }
            });
        } else if (children.type == DraggableHandle) {
            hasHandle = true;
        }
        this.setState({ hasHandle });
    }

    render() {
        const {
            id,
            className,
            children,
            text,
            isDragging,
            dragIndex,
            index,
            connectDragSource,
            connectDropTarget,
            connectDragPreview,
        } = this.props;
        const { hasHandle } = this.state;
        const opacity = dragIndex === index ? 0.3 : 1;
        const classes = 'wfui-draggable-item';

        // Make only DraggableHandle enable to drag.
        if (hasHandle) {
            return connectDragPreview(
                connectDropTarget(
                    <li
                        id={id}
                        className={classNames(className, classes)}
                        style={{
                            opacity,
                            breakInside: 'avoid',
                            pageBreakInside: 'avoid',
                        }}
                    >
                        {children.map((child, i) => {
                            if (child.type == DraggableHandle) {
                                return connectDragSource(
                                    <div
                                        key={i}
                                        className="wfui-form-addAnother-draggable wfui-draggable-handle"
                                    >
                                        {child}
                                    </div>
                                );
                            }
                            if (child.props.type === 'DeleteButton') {
                                return (
                                    <div
                                        className="wfui-form-addAnother-delete wfui-draggable-delete"
                                        key={i}
                                    >
                                        {child}
                                    </div>
                                );
                            }
                            return (
                                <div
                                    className="wfui-form-addAnother-content wfui-draggable-content"
                                    key={i}
                                >
                                    {child}
                                </div>
                            );
                        })}
                    </li>
                )
            );
        }
        // Entire content is draggable.
        return connectDragPreview(
            connectDragSource(
                connectDropTarget(
                    <li
                        id={id}
                        className={classNames(className, classes)}
                        style={{
                            opacity,
                            breakInside: 'avoid',
                            pageBreakInside: 'avoid',
                        }}
                    >
                        {children}
                    </li>
                )
            )
        );
    }
}

DraggableItem.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['stack', 'grid']).isRequired,
    id: PropTypes.string,
    moveItem: PropTypes.func,
    endDrag: PropTypes.func,
};
DraggableItem.defaultProps = {
    type: 'stack',
    id: '',
    moveItem: () => undefined,
    endDrag: () => undefined,
};

export default DragSource(ItemTypes.Item, itemSource, (connect, monitor) => {
    const dragItem = monitor.getItem();
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        // isDragging: monitor.isDragging(), not working well
        dragIndex: dragItem && dragItem.index,
    };
})(
    DropTarget(ItemTypes.Item, itemTarget, connect => ({
        connectDropTarget: connect.dropTarget(),
    }))(DraggableItem)
);
