import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classNames from 'classnames';
import withDragDropContext from './WithDndContext';
import DraggableItem from './DraggableItem';
import DraggableHandle from './DraggableHandle';

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

class Draggable extends React.Component {
    constructor() {
        super();
        this.state = { items: [], columnWidth: 300 };
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
                items: children.length
                    ? children.map((child, i) => {
                          return child;
                      })
                    : [children],
            });
        }
    }

    onHandleEndDrag() {
        const { onHandleEndDrag } = this.props;
        const { items } = this.state;
        this.props.onHandleEndDrag({ items });
    }

    onHandleMoveItem(dragIndex, hoverIndex) {
        const { onHandleItemMove } = this.props;
        const { items } = this.state;
        const dragItem = items[dragIndex];
        if (dragIndex !== hoverIndex) {
            onHandleItemMove(dragIndex, hoverIndex);
        }

        const newItems = this.state.items;
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, dragItem);
        this.setState({ items: newItems });
    }

    render() {
        const { className, type, columnCount } = this.props;
        const { items } = this.state;
        return (
            <div className={classNames(className, 'wfui-draggable')}>
                <ul
                    style={
                        type === 'grid'
                            ? {
                                  ...style.container,
                                  columnCount,
                                  MozColumnCount: columnCount,
                              }
                            : { ...style.container }
                    }
                >
                    {items.map((item, i) => {
                        return React.cloneElement(item, {
                            ...item.props,
                            moveItem: this.onHandleMoveItem,
                            endDrag: this.onHandleEndDrag,
                            key: i,
                            index: i,
                            type,
                        });
                    })}
                </ul>
            </div>
        );
    }
}

Draggable.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(['stack', 'grid']).isRequired,
    columnCount: PropTypes.number,
    onHandleEndDrag: PropTypes.func,
    onHandleItemMove: PropTypes.func,
};

Draggable.defaultProps = {
    type: 'stack',
    onHandleEndDrag: () => undefined,
    onHandleItemMove: () => undefined,
    columnCount: 3,
};

Draggable.Item = DraggableItem;
Draggable.Handle = DraggableHandle;

export default Draggable;

const withContext = withDragDropContext(Draggable);

export { withContext };
