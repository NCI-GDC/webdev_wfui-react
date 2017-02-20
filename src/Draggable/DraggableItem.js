import React from 'react';
import { DragDropContext, DropTarget, DragSource} from 'react-dnd';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import DraggableHandle from './DraggableHandle';
import classNames from 'classnames';

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
        }
    },
    endDrag(props) {
        props.endDrag()
    }
}

const itemTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Return if dragging by itself.
        if (dragIndex === hoverIndex) {
            return;
        }
        
        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get Pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Draggin downwards
        if(props.type === 'stack' ){
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
        }

        // Perform the action
        props.moveItem(dragIndex, hoverIndex);

        // Replace original index to hover index.
        monitor.getItem().index = hoverIndex;
    }
}

@DropTarget(ItemTypes.Item, itemTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.Item, itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
}))
class DraggableItem extends React.Component {
    constructor() {
        super();
        this.state = { hasHandle: false };
    }
    componentWillMount() {
        const { children } = this.props;
        if(children.length){
            children.forEach( (child, i) => {
                if(child.type == DraggableHandle){
                    this.setState({ hasHandle: true });
                }
            });
        } else {
            if(children.type == DraggableHandle){
                this.setState({ hasHandle: true });
            }
        }
    }
    render() {
        const { className, children, text, isDragging, connectDragSource, connectDropTarget, connectDragPreview} = this.props;
        const { hasHandle } = this.state;
        const opacity = isDragging ? 0.3 : 1;
        const classes = 'wfui-draggable-item';
        
        // Make only DraggableHandle enable to drag.
        if( hasHandle ){
            return connectDragPreview(connectDropTarget(
                <li className={classNames(className, classes)} style={{ opacity, breakInside:'avoid', pageBreakInside: 'avoid', overflowX: 'auto' }}>
                    {children.map((child, i) => {
                        if(child.type == DraggableHandle){
                            return connectDragSource(<div key={i} className="wfui-draggable-handle">{child}</div>);
                        }
                        return <div key={i}>{child}</div>;
                    })}
                </li>
            ));
        }
        // Entire content is draggable.
        return connectDragSource(connectDropTarget(
            <li className={classNames(className, classes)} style={{ opacity, breakInside:'avoid', pageBreakInside: 'avoid', overflowX: 'auto' }}>{ children }</li>
        ));
    }
}

DraggableItem.propTypes = {
    children: React.PropTypes.node.isRequired,
    type: React.PropTypes.oneOf(['stack', 'grid']).isRequired,
    moveItem: React.PropTypes.func,
    endDrag: React.PropTypes.func,
};
DraggableItem.defaultProps = {
    type: 'stack',
    moveItem: () => undefined,
    endDrag: () => undefined,
};

export default DraggableItem;