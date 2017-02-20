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
};

@DragDropContext(HTML5Backend)
class Draggable extends React.Component {
    constructor() {
        super();
        this.state = { items: [], columnWidth: 300 }
        this.onHandleMoveItem = this.onHandleMoveItem.bind(this);
        this.onHandleEndDrag = this.onHandleEndDrag.bind(this);
    }
    componentWillMount() {
        this.setItems(this.props);
    }
    componentWillReceiveProps(props) {
        this.setItems(props);
    }
    setItems(props) {
        const { children, type } = props;
        if (children) {
            this.setState({
                items: children.length ? children.map((child, i) => {
                    return React.cloneElement(
                        child,
                        Object.assign({}, child.props, {
                            moveItem : this.onHandleMoveItem,
                            endDrag : this.onHandleEndDrag,
                            key: i,
                            index: i,
                            type,
                        }),
                    )
                }) : [children]
            });
        }
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
        const { className, type, columnCount } = this.props;
        const { items } = this.state;
        return (
            <div className={classNames(className, 'wfui-draggable')} >
                <ul
                    style={
                        type==='grid' ?
                        {...style.container, columnCount, MozColumnCount:columnCount } : {...style.container}
                    }
                >
                    {items.map((item, i) => {
                        return item;
                    })}
                </ul>
            </div>
        )
    }
}

Draggable.propTypes = {
    children: React.PropTypes.node,
    type: React.PropTypes.oneOf(['stack', 'grid']).isRequired,
    columnCount: React.PropTypes.number,
    onHandleEndDrag: React.PropTypes.func,
};

Draggable.defaultProps = {
    type: 'stack',
    onHandleEndDrag: () => undefined,
    columnCount: 3,
}

Draggable.Item = DraggableItem;
Draggable.Handle = DraggableHandle;

export default Draggable;
