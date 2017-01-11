import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableItem from './DraggableItem';
import DraggableHandle from './DraggableHandle';
import update from 'react/lib/update';
import classNames from 'classnames';

const style = {
    list: {
        border: '1px dotted #aaa',
        marginBottom: 10,
        padding: 10,
    },
    container: {
        listStyleType: 'none',
        paddingLeft: 0,
    },
    grid: {
        columnWidth: 300,
    }
};

@DragDropContext(HTML5Backend)
class Draggable extends React.Component {
    constructor() {
        super();
        this.onHandleMoveItem = this.onHandleMoveItem.bind(this);
        this.onHandleEndDrag = this.onHandleEndDrag.bind(this);
    }
    componentWillMount() {
        const { children, type } = this.props;
        this.setState({
            items: children.map((child, i) => {
                return React.cloneElement(
                    child,
                    Object.assign({}, child.props, {
                        moveItem : this.onHandleMoveItem,
                        endDrag : this.onHandleEndDrag,
                        key: i,
                        type,
                    }),
                )
            })
        });
    }
    onHandleEndDrag() {
        const { onHandleEndDrag } = this.props;
        const { items } = this.state;
        this.props.onHandleEndDrag({ items });
    }
    onHandleMoveItem(dragIndex, hoverIndex) {

        const { items } = this.state;
        const dragItem = items[dragIndex];

        this.setState(update(this.state, {
            items: {
                $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragItem]
                ]
            }
        }));
    }
    render() {
        const { className, type } = this.props;
        const { items } = this.state;
        return (
            <ul className={classNames(className, 'wfui-draggable')} style={ type==='grid' ? {...style.container, ...style.grid} : {...style.container} } >
                {items.map((item, i) => {
                    return React.cloneElement( item, Object.assign({}, item.props, { index: i }) )
                })}
            </ul>
        )
    }
}

Draggable.propTypes = {
    children: React.PropTypes.node,
    type: React.PropTypes.oneOf(['stack', 'grid']).isRequired,
    onHandleEndDrag: React.PropTypes.func,
};

Draggable.defaultProps = {
    type: 'stack',
    onHandleEndDrag: () => undefined,
}

Draggable.Item = DraggableItem;
Draggable.Handle = DraggableHandle;

export default Draggable;
